/**
 * Browser-facing API base for the public site. Inlined at build time via
 * NEXT_PUBLIC_API_URL (static export). Defaults to the production API.
 */
export const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.heistbrokerage.com"
).replace(/\/$/, "");

export async function postJson<T = unknown>(
  path: string,
  body: unknown,
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  const json = text ? JSON.parse(text) : {};
  if (!res.ok) {
    const msg =
      (json as { error?: { message?: string } })?.error?.message ??
      res.statusText;
    throw new Error(msg);
  }
  return json as T;
}
