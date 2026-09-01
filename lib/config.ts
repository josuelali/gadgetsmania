import { z } from "zod";

const serverSchema = z.object({
  DATABASE_URL: z
    .string()
    .url()
    .refine(
      (value) =>
        value.startsWith("postgres://") || value.startsWith("postgresql://"),
      "DATABASE_URL must be PostgreSQL",
    ),
  STRIPE_SECRET_KEY: z
    .string()
    .min(16)
    .refine(
      (value) => value.startsWith("rk_test_") || value.startsWith("sk_test_"),
      "Only Stripe test keys are accepted before launch",
    ),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_"),
  PUBLIC_SITE_URL: z.string().url(),
});

export function getServerConfig() {
  return serverSchema.parse(process.env);
}

export function getPublicOrigin(req?: {
  headers?: Record<string, string | string[] | undefined>;
}) {
  if (process.env.PUBLIC_SITE_URL)
    return new URL(process.env.PUBLIC_SITE_URL).origin;
  const host = req?.headers?.["x-forwarded-host"] || req?.headers?.host;
  const value = Array.isArray(host) ? host[0] : host;
  if (!value) throw new Error("PUBLIC_SITE_URL is required");
  return `https://${value}`;
}
