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

export function serverError(res: VercelResponse, error: unknown) {
  const requestId = crypto.randomUUID();
  console.error("GadgetsMania API error", {
    requestId,
    name: error instanceof Error ? error.name : "UnknownError",
  });
  return res.status(500).json({ error: "internal_error", requestId });
}
