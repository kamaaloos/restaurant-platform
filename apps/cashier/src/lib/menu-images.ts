/**
 * Resolve menu photos the same way as the customer app.
 * Local keys (`menu/margherita.jpg`) are served from the customer
 * project's `/images/menu/…` so cashier doesn't ship duplicate assets.
 */

const CUSTOMER_URL = (
  process.env.NEXT_PUBLIC_CUSTOMER_URL ?? "http://localhost:3001"
).replace(/\/$/, "");

export function resolveMenuImage(
  imageUrl: string | null | undefined,
): string | null {
  if (!imageUrl?.trim()) return null;
  const raw = imageUrl.trim();
  if (/^https?:\/\//i.test(raw)) return raw;

  if (raw.startsWith("/images/menu/")) {
    return `${CUSTOMER_URL}${raw}`;
  }

  if (raw.startsWith("/")) return raw;

  const key = raw.startsWith("menu/") ? raw : `menu/${raw.replace(/^\//, "")}`;
  const file = key.replace(/^menu\//, "");
  return `${CUSTOMER_URL}/images/menu/${file}`;
}
