"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LocaleControls } from "@/lib/currency-provider";
import { useLocale } from "@/lib/i18n/locale-provider";
import type { MessageKey } from "@/lib/i18n/messages";

/** Food + atmosphere reel — add waiter/guest shots under /images/landing/ later. */
export const LANDING_SCENES = [
  "/images/login-fruits-bg.jpg",
  "/images/menu/bariis.jpg",
  "/images/menu/suqaar.jpg",
  "/images/menu/grilled-fish.jpg",
  "/images/menu/sambusa.jpg",
  "/images/menu/margherita.jpg",
  "/images/menu/tiramisu.jpg",
  "/images/menu/pasta-salmon.jpg",
] as const;

const PROMO_KEYS: MessageKey[] = [
  "landingPromoSpecials",
  "landingPromoOffers",
  "landingPromoWeekend",
  "landingPromoFresh",
];

const SCENE_MS = 8_000;
const PROMO_MS = 5_000;

function SceneImage({
  src,
  active,
  priority,
}: {
  src: string;
  active: boolean;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt=""
      fill
      priority={priority}
      sizes="100vw"
      className={`object-cover transition-opacity duration-[1600ms] ease-out ${
        active ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

export function LandingHero() {
  const { t } = useLocale();
  const [sceneIndex, setSceneIndex] = useState(0);
  const [promoIndex, setPromoIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSceneIndex((i) => (i + 1) % LANDING_SCENES.length);
    }, SCENE_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPromoIndex((i) => (i + 1) % PROMO_KEYS.length);
    }, PROMO_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden text-[var(--accent-foreground)]">
      <div className="absolute inset-0" aria-hidden>
        <div className="menu-bg-drift absolute inset-[-8%]">
          {LANDING_SCENES.map((src, i) => (
            <SceneImage
              key={src}
              src={src}
              active={i === sceneIndex}
              priority={i === 0}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#132418]/[92%] via-[#234128]/55 to-[#234128]/30" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col px-4 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-8">
        <div className="flex justify-end">
          <div className="rounded-full bg-black/25 px-2 py-1 backdrop-blur-sm [&_button]:text-[var(--accent-foreground)] [&_select]:text-[var(--accent-foreground)]">
            <LocaleControls />
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-end sm:justify-center">
          <p className="animate-menu-fade-up text-sm font-medium uppercase tracking-[0.28em] text-[var(--gold)]">
            {t("landingBrand")}
          </p>
          <h1 className="animate-menu-fade-up mt-4 font-[family-name:var(--font-display)] text-5xl leading-[1.08] sm:text-6xl md:text-7xl">
            {t("landingTitle")}
          </h1>
          <p className="animate-menu-fade-up mt-4 max-w-md text-base text-white/80 sm:text-lg">
            {t("landingLead")}
          </p>

          <p
            key={PROMO_KEYS[promoIndex]}
            className="landing-promo-fade mt-8 font-[family-name:var(--font-display)] text-2xl text-[var(--gold)] sm:text-3xl"
          >
            {t(PROMO_KEYS[promoIndex])}
          </p>

          <a
            href="#how-it-works"
            className="mt-10 inline-flex w-fit items-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-medium tracking-wide text-white backdrop-blur-sm transition hover:bg-white/18"
          >
            {t("landingCta")}
            <span aria-hidden>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
