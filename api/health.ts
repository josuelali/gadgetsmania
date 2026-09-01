import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../lib/db.js";
import { allowMethods } from "../lib/http.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!allowMethods(req, res, ["GET"])) return;
  try {
    await db.query("SELECT 1");
    return res.status(200).json({ status: "ok", payments: "test_only" });
  } catch {
    return res.status(503).json({ status: "unavailable" });
  }
}
