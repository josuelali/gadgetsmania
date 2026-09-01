import Stripe from "stripe";

let client: Stripe | undefined;

export function getStripeClient() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) throw new Error("STRIPE_SECRET_KEY is required");
  if (!apiKey.startsWith("rk_test_") && !apiKey.startsWith("sk_test_"))
    throw new Error("Only Stripe test mode is allowed before launch");
  client ??= new Stripe(apiKey, {
    apiVersion: "2026-07-29.dahlia",
    appInfo: { name: "GadgetsMania Global Ranking", version: "1.0.0" },
    maxNetworkRetries: 2,
    timeout: 20_000,
  });
  return client;
}
