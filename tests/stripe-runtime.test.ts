import assert from "node:assert/strict";
import test from "node:test";
import {
  getPaymentsHealthStatus,
  validateStripeRuntime,
} from "../lib/stripe-runtime.js";

test("reports the configured payment environment without exposing secrets", () => {
  assert.equal(getPaymentsHealthStatus("test"), "test_only");
  assert.equal(getPaymentsHealthStatus("live"), "live");
  assert.equal(getPaymentsHealthStatus(undefined), "test_only");
});

test("accepts test keys in Preview", () => {
  assert.doesNotThrow(() =>
    validateStripeRuntime({
      stripeSecretKey: "rk_test_example_key_value",
      stripeMode: "test",
      vercelEnv: "preview",
    }),
  );
});

test("rejects Live keys in Preview", () => {
  assert.throws(() =>
    validateStripeRuntime({
      stripeSecretKey: "rk_live_example_key_value",
      stripeMode: "test",
      vercelEnv: "preview",
    }),
  );
});

test("rejects Live mode outside Production", () => {
  assert.throws(() =>
    validateStripeRuntime({
      stripeSecretKey: "rk_live_example_key_value",
      stripeMode: "live",
      vercelEnv: "preview",
    }),
  );
});

test("accepts Live keys only with Live mode in Production", () => {
  assert.doesNotThrow(() =>
    validateStripeRuntime({
      stripeSecretKey: "rk_live_example_key_value",
      stripeMode: "live",
      vercelEnv: "production",
    }),
  );
});

test("rejects Test mode in Production", () => {
  assert.throws(() =>
    validateStripeRuntime({
      stripeSecretKey: "rk_test_example_key_value",
      stripeMode: "test",
      vercelEnv: "production",
    }),
  );
});
