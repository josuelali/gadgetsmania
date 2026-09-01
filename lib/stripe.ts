import Stripe from "stripe";
import { validateStripeRuntime } from "./stripe-runtime.js";

let client: Stripe | undefined;

export function getStripeClient() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) throw new Error("STRIPE_SECRET_KEY is required");
  const stripeMode = process.env.STRIPE_MODE;
  if (stripeMode !== "test" && stripeMode !== "live")
    throw new Error("STRIPE_MODE must be test or live");
  validateStripeRuntime({
    stripeSecretKey: apiKey,
    stripeMode,
    vercelEnv: process.env.VERCEL_ENV,
  });
  client ??= new Stripe(apiKey, {
    apiVersion: "2026-07-29.dahlia",
    appInfo: { name: "GadgetsMania Global Ranking", version: "1.0.0" },
    maxNetworkRetries: 2,
    timeout: 20_000,
  });
  return client;
}
