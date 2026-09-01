import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../lib/db.js";
import { allowMethods, serverError } from "../lib/http.js";
import { getStripeClient } from "../lib/stripe.js";

export const config = { api: { bodyParser: false } };

async function readRawBody(req: VercelRequest) {
  const chunks: Buffer[] = [];
  for await (const chunk of req)
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  return Buffer.concat(chunks);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!allowMethods(req, res, ["POST"])) return;
  const signature = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (typeof signature !== "string" || !webhookSecret)
    return res.status(400).json({ error: "invalid_signature" });

  let event;
  try {
    event = getStripeClient().webhooks.constructEvent(
      await readRawBody(req),
      signature,
      webhookSecret,
    );
  } catch {
    return res.status(400).json({ error: "invalid_signature" });
  }

  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const inserted = await client.query(
      `INSERT INTO webhook_events (stripe_event_id, event_type) VALUES ($1, $2)
       ON CONFLICT (stripe_event_id) DO NOTHING RETURNING stripe_event_id`,
      [event.id, event.type],
    );
    if (!inserted.rowCount) {
      await client.query("COMMIT");
      return res.status(200).json({ received: true, duplicate: true });
    }

    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      const session = event.data.object;
      if (session.payment_status === "paid") {
        const paid = await client.query(
          `UPDATE boost_orders SET status = 'paid', paid_at = COALESCE(paid_at, now()), updated_at = now()
           WHERE stripe_checkout_session_id = $1 AND status IN ('creating', 'open') RETURNING entry_id`,
          [session.id],
        );
        if (paid.rowCount)
          await client.query(
            "UPDATE entries SET status = 'active', updated_at = now() WHERE id = $1",
            [paid.rows[0].entry_id],
          );
      }
    } else if (event.type === "checkout.session.expired") {
      await client.query(
        "UPDATE boost_orders SET status = 'expired', updated_at = now() WHERE stripe_checkout_session_id = $1 AND status = 'open'",
        [event.data.object.id],
      );
    }

    await client.query("COMMIT");
    return res.status(200).json({ received: true });
  } catch (error) {
    await client.query("ROLLBACK");
    return serverError(res, error);
  } finally {
    client.release();
  }
}
