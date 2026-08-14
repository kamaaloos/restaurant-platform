import * as React from "react";

export type RestaurantBrand = {
  logoUrl?: string | null;
  brandAccent?: string | null;
  brandButton?: string | null;
  brandPaper?: string | null;
};

const BRAND_KEYS = [
  "--paper",
  "--surface",
  "--surface-2",
  "--surface-3",
  "--forest",
  "--primary",
  "--muted",
  "--line",
  "--line-soft",
  "--accent",
  "--accent-green",
  "--accent-soft",
  "--accent-foreground",
  "--gold",
  "--gold-soft",
] as const;

function isHex(value: string | null | undefined): value is string {
  return !!value && /^#[0-9A-Fa-f]{6}$/.test(value);
}

/** Apply restaurant brand colors to :root CSS variables. */
export function applyRestaurantBrand(brand?: RestaurantBrand | null) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  for (const key of BRAND_KEYS) {
    root.style.removeProperty(key);
  }

  if (!brand) return;

  if (isHex(brand.brandPaper)) {
    const paper = brand.brandPaper;
    root.style.setProperty("--paper", paper);
    root.style.setProperty(
      "--surface",
      `color-mix(in oklab, ${paper} 88%, white)`,
    );
    root.style.setProperty(
      "--surface-2",
      `color-mix(in oklab, ${paper} 82%, #2d2d2d)`,
    );
    root.style.setProperty(
      "--surface-3",
      `color-mix(in oklab, ${paper} 72%, #2d2d2d)`,
    );
    root.style.setProperty("--accent-foreground", paper);
  }

  if (isHex(brand.brandAccent)) {
    const accent = brand.brandAccent;
    root.style.setProperty("--accent", accent);
    root.style.setProperty("--gold", accent);
    root.style.setProperty(
      "--accent-soft",
      `color-mix(in oklab, ${accent} 16%, transparent)`,
    );
    root.style.setProperty(
      "--gold-soft",
      `color-mix(in oklab, ${accent} 22%, transparent)`,
    );
  }

  if (isHex(brand.brandButton)) {
    const button = brand.brandButton;
    root.style.setProperty("--forest", button);
    root.style.setProperty("--primary", button);
    root.style.setProperty(
      "--accent-green",
      `color-mix(in oklab, ${button} 78%, white)`,
    );
    root.style.setProperty(
      "--muted",
      `color-mix(in oklab, ${button} 45%, #6b7280)`,
    );
    root.style.setProperty(
      "--line",
      `color-mix(in oklab, ${button} 20%, transparent)`,
    );
    root.style.setProperty(
      "--line-soft",
      `color-mix(in oklab, ${button} 18%, transparent)`,
    );
  }
}

export function clearRestaurantBrand() {
  applyRestaurantBrand(null);
}

export function useRestaurantBrand(brand?: RestaurantBrand | null) {
  React.useEffect(() => {
    applyRestaurantBrand(brand);
    return () => clearRestaurantBrand();
  }, [
    brand?.logoUrl,
    brand?.brandAccent,
    brand?.brandButton,
    brand?.brandPaper,
  ]);
}
