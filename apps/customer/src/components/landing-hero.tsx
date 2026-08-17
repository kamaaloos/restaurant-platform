"use client";

import { useEffect, useState } from "react";
import { LocaleControls } from "@/lib/currency-provider";
import { useLocale } from "@/lib/i18n/locale-provider";
import { LOCALES, LOCALE_META, type Locale } from "@/lib/i18n/locales";
import { translate, type MessageKey } from "@/lib/i18n/messages";
import { LandingPhotoBackdrop } from "@/components/landing-photo-backdrop";

const PROMO_KEYS: MessageKey[] = [
  "landingPromoSpecials",
  "landingPromoOffers",
  "landingPromoWeekend",
  "landingPromoFresh",
];

/** Showcase cycle: English → Finnish → Arabic → Somali */
const SHOWCASE_LOCALES: Locale[] = [...LOCALES];

const LOCALE_MS = 4_200;

export function LandingHero() {
  const { t } = useLocale();
  const [localeIndex, setLocaleIndex] = useState(0);
  const [promoIndex, setPromoIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setLocaleIndex((i) => {
        const next = (i + 1) % SHOWCASE_LOCALES.length;
        if (next === 0) {
          setPromoIndex((p) => (p + 1) % PROMO_KEYS.length);
        }
        return next;
      });
    }, LOCALE_MS);
    return () => window.clearInterval(id);
  }, []);

  const showcaseLocale = SHOWCASE_LOCALES[localeIndex]!;
  const dir = LOCALE_META[showcaseLocale].dir;
  const st = (key: MessageKey) => translate(showcaseLocale, key);
  const promoKey = PROMO_KEYS[promoIndex]!;

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden text-[var(--accent-foreground)]">
      <LandingPhotoBackdrop tone="hero" startIndex={0} />

      <div className="relative z-10 flex flex-1 flex-col px-4 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-8">
        <div className="flex justify-end">
          <div className="rounded-full bg-black/25 px-2 py-1 backdrop-blur-sm [&_button]:text-[var(--accent-foreground)] [&_select]:text-[var(--accent-foreground)]">
            <LocaleControls />
          </div>
        </div>

        <div
          className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-end sm:justify-center"
          dir={dir}
          lang={LOCALE_META[showcaseLocale].htmlLang}
        >
          <p className="landing-brand-zoom text-sm font-medium uppercase tracking-[0.28em] text-[var(--gold)]">
            {st("landingBrand")}
          </p>

          <div
            key={`copy-${showcaseLocale}-${promoKey}`}
            className="landing-promo-fade"
          >
            <h1
              className={`mt-4 font-[family-name:var(--font-display)] text-5xl leading-[1.08] sm:text-6xl md:text-7xl ${
                showcaseLocale === "ar"
                  ? "font-[family-name:var(--font-arabic)]"
                  : ""
              }`}
            >
              {st("landingTitle")}
            </h1>
            <p
              className={`mt-4 max-w-md text-base text-white/80 sm:text-lg ${
                showcaseLocale === "ar"
                  ? "font-[family-name:var(--font-arabic)]"
                  : ""
              }`}
            >
              {st("landingLead")}
            </p>
            <p
              className={`mt-8 font-[family-name:var(--font-display)] text-2xl text-[var(--gold)] sm:text-3xl ${
                showcaseLocale === "ar"
                  ? "font-[family-name:var(--font-arabic)]"
                  : ""
              }`}
            >
              {st(promoKey)}
            </p>
          </div>

          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/45">
            {LOCALE_META[showcaseLocale].nativeLabel}
          </p>

          <a
            href="#how-it-works"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-medium tracking-wide text-white backdrop-blur-sm transition hover:bg-white/18"
          >
            {t("landingCta")}
            <span aria-hidden>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
