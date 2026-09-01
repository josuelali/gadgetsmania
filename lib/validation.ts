import { z } from "zod";

export const categories = [
  "ai",
  "mobile",
  "gaming",
  "home",
  "creator",
  "accessories",
] as const;

const httpUrl = z
  .string()
  .trim()
  .url()
  .max(500)
  .refine((value) => {
    const url = new URL(value);
    return (
      (url.protocol === "https:" || url.protocol === "http:") &&
      !["localhost", "127.0.0.1", "0.0.0.0", "::1"].includes(
        url.hostname.toLowerCase(),
      )
    );
  }, "Only public HTTP(S) URLs are accepted");

export const checkoutSchema = z
  .object({
    idempotencyKey: z.string().uuid(),
    entryId: z.string().uuid().optional(),
    name: z.string().trim().min(2).max(90).optional(),
    websiteUrl: httpUrl.optional(),
    imageUrl: httpUrl.optional(),
    description: z.string().trim().min(10).max(240).optional(),
    category: z.enum(categories).optional(),
    contactEmail: z.string().trim().email().max(254),
    amountCents: z.number().int().min(1_000).max(100_000),
  })
  .superRefine((value, ctx) => {
    if (!value.entryId) {
      for (const key of [
        "name",
        "websiteUrl",
        "description",
        "category",
      ] as const) {
        if (!value[key])
          ctx.addIssue({
            code: "custom",
            path: [key],
            message: `${key} is required for a new entry`,
          });
      }
    }
  });

export const rankingQuerySchema = z.object({
  period: z.enum(["daily", "historical"]).default("daily"),
  category: z.enum(categories).optional(),
  search: z.string().trim().max(80).optional(),
});

export function normalizeWebsiteUrl(value: string) {
  const url = new URL(value);
  url.hash = "";
  url.hostname = url.hostname.toLowerCase().replace(/^www\./, "");
  url.pathname = url.pathname.replace(/\/+$/, "") || "/";
  [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "ref",
  ].forEach((key) => url.searchParams.delete(key));
  url.searchParams.sort();
  return url.toString();
}

export function integrationIdentifier(idempotencyKey: string) {
  const letters = idempotencyKey
    .replaceAll("-", "")
    .slice(0, 8)
    .split("")
    .map((char) => String.fromCharCode(97 + Number.parseInt(char, 16)))
    .join("");
  return `gadgetsmania_${letters}`;
}
