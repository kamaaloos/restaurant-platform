/**
 * Browser `fetch` treats a host without `http(s)://` as a relative path.
 * From `/t/{token}` that becomes `/t/maylesoft.com/customer/...` (404).
 */
function normalizeAbsoluteUrl(raw: string | undefined, fallback: string): string {
  const value = (raw ?? fallback).trim();
  if (!value) return fallback.replace(/\/$/, "");
  const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withScheme.replace(/\/$/, "");
}

export function getApiBaseUrl() {
  const url = normalizeAbsoluteUrl(
    process.env.NEXT_PUBLIC_API_URL,
    "http://localhost:3000/api",
  );
  try {
    const parsed = new URL(url);
    // Nest is mounted at /api. A host-only env value 404s as /customer/tenants/:slug.
    if (parsed.pathname === "" || parsed.pathname === "/") {
      parsed.pathname = "/api";
      return parsed.toString().replace(/\/$/, "");
    }
  } catch {
    /* keep normalized host */
  }
  return url;
}

export function getWsBaseUrl() {
  return normalizeAbsoluteUrl(
    process.env.NEXT_PUBLIC_WS_URL,
    "http://localhost:3000",
  );
}
