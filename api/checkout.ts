import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../lib/db.js";
import {
  allowMethods,
  clientError,
  noStore,
  serverError,
} from "../lib/http.js";
import { getStripeClient } from "../lib/stripe.js";
import {
  checkoutSchema,
  integrationIdentifier,
  normalizeWebsiteUrl,
} from "../lib/validation.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!allowMethods(req, res, ["POST"])) return;
  noStore(res);
  const parsed = checkoutSchema.safeParse(req.body);
  if (!parsed.success)
    return clientError(
      res,
      400,
      "invalid_request",
      parsed.error.issues[0]?.message ?? "Invalid request",
    );

  const input = parsed.data;
  const client = await db.connect();
  let orderId: string | undefined;
  let entryId: string | undefined;
  try {
    await client.query("BEGIN");
    const previous = await client.query(
      'SELECT id, checkout_url AS "checkoutUrl", status FROM boost_orders WHERE idempotency_key = $1 FOR UPDATE',
      [input.idempotencyKey],
    );
    if (previous.rowCount) {
      await client.query("COMMIT");
      const order = previous.rows[0];
      if (order.checkoutUrl)
        return res
          .status(200)
          .json({ checkoutUrl: order.checkoutUrl, reused: true });
      return clientError(
        res,
        409,
        "request_in_progress",
        "This checkout request is still being created",
      );
    }

    if (input.entryId) {
      const entry = await client.query(
        "SELECT id FROM entries WHERE id = $1 AND status = 'active'",
        [input.entryId],
      );
      if (!entry.rowCount) {
        await client.query("ROLLBACK");
        return clientError(
          res,
          404,
          "entry_not_found",
          "The selected gadget is not active",
        );
      }
      entryId = entry.rows[0].id;
    } else {
      const normalizedUrl = normalizeWebsiteUrl(input.websiteUrl!);
      const inserted = await client.query(
        `INSERT INTO entries (name, website_url, normalized_url, image_url, description, category, contact_email)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id`,
        [
          input.name,
          input.websiteUrl,
          normalizedUrl,
          input.imageUrl ?? null,
          input.description,
          input.category,
          input.contactEmail,
        ],
      );
      entryId = inserted.rows[0].id;
    }

    const order = await client.query(
      `INSERT INTO boost_orders (entry_id, idempotency_key, amount_cents)
       VALUES ($1, $2, $3) RETURNING id`,
      [entryId, input.idempotencyKey, input.amountCents],
    );
    orderId = order.rows[0].id;
    await client.query("COMMIT");

    if (!orderId || !entryId)
      throw new Error("Checkout order identifiers were not created");

    const origin = new URL(
      process.env.PUBLIC_SITE_URL || "https://gadgetsmania.org",
    ).origin;
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        customer_email: input.contactEmail,
        integration_identifier: integrationIdentifier(input.idempotencyKey),
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "eur",
              unit_amount: input.amountCents,
              product_data: {
                name: input.entryId
                  ? "GadgetsManía ranking boost"
                  : "GadgetsManía listing + ranking boost",
                description:
                  "One-time visibility boost. Ranking position depends on total verified paid boosts.",
              },
            },
          },
        ],
        metadata: { orderId, entryId },
        payment_intent_data: { metadata: { orderId, entryId } },
        success_url: `${origin}/payment/success/?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/payment/cancel/`,
      },
      { idempotencyKey: `gm_checkout_${input.idempotencyKey}` },
    );

    if (!session.url) throw new Error("Stripe Checkout did not return a URL");
    await db.query(
      `UPDATE boost_orders SET stripe_checkout_session_id = $1, checkout_url = $2, status = 'open', updated_at = now() WHERE id = $3`,
      [session.id, session.url, orderId],
    );
    return res.status(201).json({ checkoutUrl: session.url });
  } catch (error: unknown) {
    try {
      await client.query("ROLLBACK");
    } catch {
      /* transaction may already be closed */
    }
    if (orderId) {
      await db
        .query(
          "UPDATE boost_orders SET status = 'failed', updated_at = now() WHERE id = $1 AND status = 'creating'",
          [orderId],
        )
        .catch(() => undefined);
    }
    if (entryId) {
      await db
        .query(
          `DELETE FROM entries e
         WHERE e.id = $1 AND e.status = 'pending_payment'
           AND NOT EXISTS (
             SELECT 1 FROM boost_orders b
             WHERE b.entry_id = e.id AND b.status IN ('creating', 'open', 'paid')
           )`,
          [entryId],
        )
        .catch(() => undefined);
    }
    if (
      typeof error === "object" &&
      error &&
      "code" in error &&
      error.code === "23505"
    ) {
      return clientError(
        res,
        409,
        "duplicate_entry",
        "This website is already listed. Boost the existing entry instead.",
      );
    }
    return serverError(res, error);
  } finally {
    client.release();
  }
}
