/** Labels reserved for platform apps / infra — never treat as a restaurant slug. */
const RESERVED_SUBDOMAINS = new Set([
  "www",
  "www2",
  "customer",
  "dugsi",
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

export function normalizeHostname(
  host: string | null | undefined,
): string {
  return (host ?? "").split(":")[0]?.trim().toLowerCase() ?? "";
}

/** Apex or www — corporate multi-product home, not restaurant marketing. */
export function isApexOrWwwHost(
  host: string | null | undefined,
  rootDomain: string | null | undefined,
): boolean {
  const root = rootDomain?.trim().toLowerCase();
  if (!root) return false;
  const hostname = normalizeHostname(host);
  return hostname === root || hostname === `www.${root}`;
}

/**
 * Host that serves the restaurant platform marketing landing
 * (default: customer.{rootDomain}, e.g. customer.maylesoft.com).
 */
export function isRestaurantMarketingHost(
  host: string | null | undefined,
  rootDomain: string | null | undefined,
  marketingHost?: string | null,
): boolean {
  const hostname = normalizeHostname(host);
  const explicit = marketingHost?.trim().toLowerCase();
  if (explicit) return hostname === explicit.split(":")[0];

  const root = rootDomain?.trim().toLowerCase();
  if (root && hostname === `customer.${root}`) return true;

  // Local dev: show landing on localhost when not using tenant subdomains.
  if (
    !root &&
    (hostname === "localhost" || hostname === "127.0.0.1")
  ) {
    return true;
  }

  return false;
}

export function restaurantMarketingOrigin(
  rootDomain: string | null | undefined,
  marketingHost?: string | null,
): string {
  const explicit = marketingHost?.trim();
  if (explicit) {
    const host = explicit.replace(/^https?:\/\//i, "").split("/")[0];
    return `https://${host}`;
  }
  const root = rootDomain?.trim().toLowerCase();
  if (root) return `https://customer.${root}`;
  return "http://localhost:3001";
}
