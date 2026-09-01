import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../../lib/db.js";
import { allowMethods, clientError, serverError } from "../../lib/http.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!allowMethods(req, res, ["GET"])) return;
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  if (!id || !/^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(id))
    return clientError(res, 400, "invalid_entry", "Invalid entry");
  try {
    const result = await db.query(
      "SELECT website_url FROM entries WHERE id = $1 AND status = 'active'",
      [id],
    );
    if (!result.rowCount)
      return clientError(res, 404, "entry_not_found", "Entry not found");
    let referrerHost: string | null = null;
    try {
      if (req.headers.referer)
        referrerHost = new URL(req.headers.referer).hostname.slice(0, 255);
    } catch {
      /* ignore malformed referrer */
    }
    await db.query(
      "INSERT INTO outbound_clicks (entry_id, referrer_host) VALUES ($1, $2)",
      [id, referrerHost],
    );
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Referrer-Policy", "no-referrer");
    return res.redirect(302, result.rows[0].website_url);
  } catch (error) {
    return serverError(res, error);
  }
}
