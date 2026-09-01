import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../lib/db.js";
import { allowMethods, serverError } from "../lib/http.js";
import { rankingQuerySchema } from "../lib/validation.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!allowMethods(req, res, ["GET"])) return;
  const parsed = rankingQuerySchema.safeParse({
    period: Array.isArray(req.query.period)
      ? req.query.period[0]
      : req.query.period,
    category: Array.isArray(req.query.category)
      ? req.query.category[0]
      : req.query.category,
    search: Array.isArray(req.query.search)
      ? req.query.search[0]
      : req.query.search,
  });
  if (!parsed.success) return res.status(400).json({ error: "invalid_query" });

  const { period, category, search } = parsed.data;
  const values: unknown[] = [];
  const filters = ["e.status = 'active'"];
  if (category) {
    values.push(category);
    filters.push(`e.category = $${values.length}`);
  }
  if (search) {
    values.push(`%${search}%`);
    filters.push(
      `(e.name ILIKE $${values.length} OR e.description ILIKE $${values.length})`,
    );
  }
  values.push(period === "daily");

  try {
    const result = await db.query({
      text: `
        SELECT e.id, e.name, e.website_url AS "websiteUrl", e.image_url AS "imageUrl",
               e.description, e.category, e.is_curated AS "isCurated",
               COALESCE(SUM(b.amount_cents) FILTER (
                 WHERE b.status = 'paid' AND ($${values.length}::boolean = false OR b.paid_at >= date_trunc('day', now()))
               ), 0)::integer AS "paidCents",
               COUNT(b.id) FILTER (
                 WHERE b.status = 'paid' AND ($${values.length}::boolean = false OR b.paid_at >= date_trunc('day', now()))
               )::integer AS "boostCount"
        FROM entries e
        LEFT JOIN boost_orders b ON b.entry_id = e.id
        WHERE ${filters.join(" AND ")}
        GROUP BY e.id
        ORDER BY "paidCents" DESC, e.is_curated ASC, e.created_at ASC
        LIMIT 100`,
      values,
    });
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=30, stale-while-revalidate=60",
    );
    return res.status(200).json({ period, entries: result.rows });
  } catch (error) {
    return serverError(res, error);
  }
}
