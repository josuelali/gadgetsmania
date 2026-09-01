import assert from "node:assert/strict";
import test from "node:test";
import {
  checkoutSchema,
  integrationIdentifier,
  normalizeWebsiteUrl,
  rankingQuerySchema,
} from "../lib/validation.js";

test("normalizes product URLs and removes tracking", () => {
  assert.equal(
    normalizeWebsiteUrl(
      "https://WWW.Example.com/product/?utm_source=x&b=2&a=1#details",
    ),
    "https://example.com/product?a=1&b=2",
  );
});

test("requires complete data for a new listing", () => {
  const result = checkoutSchema.safeParse({
    idempotencyKey: crypto.randomUUID(),
    contactEmail: "owner@example.com",
    amountCents: 1_000,
  });
  assert.equal(result.success, false);
});

test("accepts a valid boost and rejects amounts below ten euros", () => {
  const valid = {
    idempotencyKey: crypto.randomUUID(),
    entryId: crypto.randomUUID(),
    contactEmail: "supporter@example.com",
    amountCents: 1_000,
  };
  assert.equal(checkoutSchema.safeParse(valid).success, true);
  assert.equal(
    checkoutSchema.safeParse({ ...valid, amountCents: 999 }).success,
    false,
  );
});

test("rejects localhost URLs", () => {
  const result = checkoutSchema.safeParse({
    idempotencyKey: crypto.randomUUID(),
    name: "Local gadget",
    websiteUrl: "http://localhost:3000/gadget",
    description: "This description is long enough.",
    category: "ai",
    contactEmail: "owner@example.com",
    amountCents: 1_000,
  });
  assert.equal(result.success, false);
});

test("uses stable Stripe integration identifiers with eight-letter suffix", () => {
  const identifier = integrationIdentifier(
    "12345678-1234-4234-8234-123456789abc",
  );
  assert.match(identifier, /^gadgetsmania_[a-p]{8}$/);
});

test("defaults ranking period to daily", () => {
  assert.deepEqual(rankingQuerySchema.parse({}), { period: "daily" });
});
