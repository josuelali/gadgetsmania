import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../lib/db.js";
import {
  allowMethods,
  clientError,
  noStore,
  serverError,
} from "../lib/http.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!allowMethods(req, res, ["GET"])) return;
  noStore(res);
  const sessionId = Array.isArray(req.query.session_id)
    ? req.query.session_id[0]
    : req.query.session_id;
  if (!sessionId || !/^cs_(test|live)_[A-Za-z0-9_]{10,255}$/.test(sessionId))
    return clientError(res, 400, "invalid_session", "Invalid Checkout Session");
  try {
    const result = await db.query(
      `SELECT b.status, b.amount_cents AS "amountCents", e.name
       FROM boost_orders b JOIN entries e ON e.id = b.entry_id
       WHERE b.stripe_checkout_session_id = $1`,
      [sessionId],
    );
    if (!result.rowCount)
      return clientError(res, 404, "not_found", "Checkout not found");
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return serverError(res, error);
  }
}
