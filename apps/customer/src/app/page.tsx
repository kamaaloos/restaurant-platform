"use client";

import { LandingHero } from "@/components/landing-hero";
import { LandingPhotoBackdrop } from "@/components/landing-photo-backdrop";
import { useLocale } from "@/lib/i18n/locale-provider";

export default function HomePage() {
  const { t } = useLocale();

  return (
    <div className="bg-[var(--paper)] text-[var(--ink)]">
      <LandingHero />

      <section
        id="how-it-works"
        className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28"
      >
        <LandingPhotoBackdrop tone="paper" startIndex={3} />

        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="landing-brand-zoom text-sm uppercase tracking-[0.2em] text-[var(--forest)]">
            {t("landingBrand")}
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
            {t("landingHowEyebrow")}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl">
            {t("landingHowTitle")}
          </h2>
          <p className="mt-5 max-w-xl text-[var(--muted)] leading-relaxed">
            {t("landingHowBody")}
          </p>

          <div className="mt-12 space-y-8 border-t border-[var(--line)] pt-10">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl">
                {t("landingHowTableTitle")}
              </h3>
              <p className="mt-2 max-w-lg text-[var(--muted)]">
                {t("landingHowTableBody")}
              </p>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl">
                {t("landingHowWalkInTitle")}
              </h3>
              <p className="mt-2 max-w-lg text-[var(--muted)]">
                {t("landingHowWalkInBody")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
