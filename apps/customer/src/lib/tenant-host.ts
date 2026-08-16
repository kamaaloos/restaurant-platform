/** Labels reserved for platform apps / infra — never treat as a restaurant slug. */
const RESERVED_SUBDOMAINS = new Set([
  "www",
  "www2",
  "order",
  "orders",
  "admin",
  "kitchen",
  "waiter",
  "cashier",
  "till",
  "api",
  "app",
  "mail",
  "ftp",
  "cdn",
  "static",
  "assets",
  "blog",
  "docs",
  "status",
  "auth",
  "login",
  "staging",
  "preview",
  "dev",
  "test",
]);

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Parse restaurant slug from Host when using Pattern B
 * (e.g. alhuda.maylesoft.com → "alhuda").
 *
 * @param host Header value, may include port
 * @param rootDomain e.g. "maylesoft.com" (no protocol)
 */
export function getTenantSlugFromHost(
  host: string | null | undefined,
  rootDomain: string | null | undefined,
): string | null {
  const root = rootDomain?.trim().toLowerCase();
  if (!root) return null;

  const hostname = (host ?? "").split(":")[0]?.trim().toLowerCase() ?? "";
  if (!hostname) return null;

  if (hostname === root || hostname === `www.${root}`) return null;

  const suffix = `.${root}`;
  if (!hostname.endsWith(suffix)) return null;

  const sub = hostname.slice(0, -suffix.length);
  if (!sub || sub.includes(".")) return null; // only one label: slug.root
  if (RESERVED_SUBDOMAINS.has(sub)) return null;
  if (!SLUG_RE.test(sub)) return null;

  return sub;
}
