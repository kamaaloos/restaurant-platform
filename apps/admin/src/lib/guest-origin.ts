/**
 * Guest ordering origin for QR / walk-in / pickup links.
 *
 * Apex and www are the MayleSoft product hub — table QR must never use them.
 * Prefer the restaurant subdomain, then customer.{root}, then a rewritten
 * NEXT_PUBLIC_CUSTOMER_URL.
 */
export function restaurantGuestOrigin(restaurantSlug?: string | null): string {
  const root = process.env.NEXT_PUBLIC_ROOT_DOMAIN?.trim().toLowerCase() ?? "";
  const slug = restaurantSlug?.trim().toLowerCase();

  if (root && slug) {
    return `https://${slug}.${root}`;
  }

  const marketing = process.env.NEXT_PUBLIC_MARKETING_HOST?.trim();
  if (marketing) {
    const host = marketing.replace(/^https?:\/\//i, "").split("/")[0];
    return `https://${host}`;
  }

  if (root) {
    return `https://customer.${root}`;
  }

  const fallback = (
    process.env.NEXT_PUBLIC_CUSTOMER_URL ?? "http://localhost:3001"
  ).replace(/\/$/, "");

  return rewriteApexToCustomerGuest(fallback, root);
}

export function rewriteApexToCustomerGuest(
  origin: string,
  rootDomain: string,
): string {
  if (!rootDomain) return origin.replace(/\/$/, "");
  try {
    const url = new URL(origin.includes("://") ? origin : `https://${origin}`);
    const host = url.hostname.toLowerCase();
    if (host === rootDomain || host === `www.${rootDomain}`) {
      url.hostname = `customer.${rootDomain}`;
    }
    return url.origin;
  } catch {
    return origin.replace(/\/$/, "");
  }
}
