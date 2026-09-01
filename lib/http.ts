import type { VercelRequest, VercelResponse } from "@vercel/node";

export function allowMethods(
  req: VercelRequest,
  res: VercelResponse,
  methods: string[],
) {
  if (!req.method || !methods.includes(req.method)) {
    res.setHeader("Allow", methods.join(", "));
    res.status(405).json({ error: "method_not_allowed" });
    return false;
  }
  return true;
}

export function noStore(res: VercelResponse) {
  res.setHeader("Cache-Control", "private, no-store, max-age=0");
}

export function clientError(
  res: VercelResponse,
  status: number,
  code: string,
  message: string,
) {
  return res.status(status).json({ error: code, message });
}

const REDACTED = "[redacted]";

function sanitizeLogValue(value: unknown) {
  if (typeof value !== "string") return undefined;
  return value
    .replace(/postgres(?:ql)?:\/\/[^\s"']+/gi, REDACTED)
    .replace(/\b(?:sk|rk)_(?:live|test)_[A-Za-z0-9_-]+\b/g, REDACTED)
    .replace(/\bwhsec_[A-Za-z0-9_-]+\b/g, REDACTED)
    .replace(/\bBearer\s+[^\s,;]+/gi, `Bearer ${REDACTED}`)
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, REDACTED)
    .replace(/[\r\n\t]+/g, " ")
    .slice(0, 500);
}

type ErrorDetails = {
  name?: unknown;
  type?: unknown;
  code?: unknown;
  statusCode?: unknown;
  requestId?: unknown;
  message?: unknown;
};

export function safeServerErrorLog(error: unknown, requestId: string) {
  const details: ErrorDetails =
    typeof error === "object" && error !== null ? error : {};
  return {
    requestId,
    name: sanitizeLogValue(details.name) ?? "UnknownError",
    type: sanitizeLogValue(details.type),
    code: sanitizeLogValue(details.code),
    statusCode:
      typeof details.statusCode === "number" ? details.statusCode : undefined,
    providerRequestId: sanitizeLogValue(details.requestId),
    message: sanitizeLogValue(details.message) ?? "Unknown server error",
  };
}

export function serverError(res: VercelResponse, error: unknown) {
  const requestId = crypto.randomUUID();
  console.error("GadgetsMania API error", safeServerErrorLog(error, requestId));
  return res.status(500).json({ error: "internal_error", requestId });
}
