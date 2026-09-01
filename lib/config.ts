import { z } from "zod";
import { validateStripeRuntime } from "./stripe-runtime.js";

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
    .min(16),
  STRIPE_MODE: z.enum(["test", "live"]),
  VERCEL_ENV: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_"),
  PUBLIC_SITE_URL: z.string().url(),
}).superRefine((value, ctx) => {
  try {
    validateStripeRuntime({
      stripeSecretKey: value.STRIPE_SECRET_KEY,
      stripeMode: value.STRIPE_MODE,
      vercelEnv: value.VERCEL_ENV,
    });
  } catch (error) {
    ctx.addIssue({
      code: "custom",
      path: ["STRIPE_SECRET_KEY"],
      message: error instanceof Error ? error.message : "Invalid Stripe runtime configuration",
    });
  }
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
