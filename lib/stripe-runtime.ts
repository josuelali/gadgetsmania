export type StripeRuntimeConfig = {
  stripeSecretKey: string;
  stripeMode: "test" | "live";
  vercelEnv?: string;
};

export function validateStripeRuntime({
  stripeSecretKey,
  stripeMode,
  vercelEnv,
}: StripeRuntimeConfig) {
  const isProduction = vercelEnv === "production";
  const isTestKey =
    stripeSecretKey.startsWith("rk_test_") ||
    stripeSecretKey.startsWith("sk_test_");
  const isLiveKey =
    stripeSecretKey.startsWith("rk_live_") ||
    stripeSecretKey.startsWith("sk_live_");

  if (stripeMode === "live") {
    if (!isProduction)
      throw new Error("STRIPE_MODE=live is allowed only in Vercel Production");
    if (!isLiveKey)
      throw new Error("Stripe Live mode requires an rk_live_ or sk_live_ key");
    return;
  }

  if (isProduction)
    throw new Error("Vercel Production requires STRIPE_MODE=live");
  if (!isTestKey)
    throw new Error("Preview and local environments require an rk_test_ or sk_test_ key");
}
