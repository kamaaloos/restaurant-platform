/** Customer-app public paths usable as restaurant menu backdrops. */
export const BRAND_BACKGROUND_PRESETS = [
  { path: "/images/login-fruits-bg.jpg", label: "Fruits" },
  { path: "/images/pickup-fire-bg-1.jpg", label: "Grill A" },
  { path: "/images/pickup-fire-bg-2.jpg", label: "Grill B" },
  { path: "/images/pickup-fire-bg-3.jpg", label: "Grill C" },
] as const;

export function brandBackgroundPreviewSrc(
  value: string | null | undefined,
  customerBaseUrl?: string,
): string | null {
  if (!value?.trim()) return null;
  const raw = value.trim();
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith("/")) {
    const base = (customerBaseUrl ?? "").replace(/\/$/, "");
    return base ? `${base}${raw}` : raw;
  }
  return raw;
}
