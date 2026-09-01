import assert from "node:assert/strict";
import test from "node:test";
import { safeServerErrorLog } from "../lib/http.js";

test("server error logs keep safe Stripe diagnostics", () => {
  const log = safeServerErrorLog(
    {
      name: "StripePermissionError",
      type: "StripeInvalidRequestError",
      code: "permission_denied",
      statusCode: 403,
      requestId: "req_safe123",
      message: "The API key lacks access to this resource",
    },
    "local-request-id",
  );

  assert.deepEqual(log, {
    requestId: "local-request-id",
    name: "StripePermissionError",
    type: "StripeInvalidRequestError",
    code: "permission_denied",
    statusCode: 403,
    providerRequestId: "req_safe123",
    message: "The API key lacks access to this resource",
  });
});

test("server error logs redact secrets, database URLs and personal data", () => {
  const stripeKey = ["rk", "live", "secretvalue"].join("_");
  const webhookSecret = ["whsec", "secretvalue"].join("_");
  const databaseUrl =
    "postgres" + "ql://user:password@db.example.com/name";
  const log = safeServerErrorLog(
    {
      name: "Error",
      type: "api_error",
      code: "bad_value",
      statusCode: 500,
      requestId: "req_123",
      message: `${stripeKey} ${webhookSecret} ${databaseUrl} owner@example.com Bearer token-value`,
      headers: { authorization: "should-never-be-read" },
      payload: { contactEmail: "should-never-be-read@example.com" },
    },
    "local-request-id",
  );
  const serialized = JSON.stringify(log);

  assert.doesNotMatch(serialized, /secretvalue|password|owner@example|token-value/);
  assert.doesNotMatch(serialized, /authorization|headers|payload|should-never-be-read/);
  assert.match(serialized, /\[redacted\]/);
});
