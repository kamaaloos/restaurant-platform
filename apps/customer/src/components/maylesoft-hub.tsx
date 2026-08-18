"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Cloud,
  Globe,
  GraduationCap,
  Shield,
  ShoppingCart,
  Smartphone,
  Stethoscope,
  Truck,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import { HubAuroraBackground } from "@/components/hub-aurora-background";
import { LanguageSwitcher, useLocale } from "@/lib/i18n/locale-provider";
import type { MessageKey } from "@/lib/i18n/messages";
import { restaurantMarketingOrigin } from "@/lib/tenant-host";

const ROOT_DOMAIN =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN?.trim() || "maylesoft.com";
const MARKETING_HOST = process.env.NEXT_PUBLIC_MARKETING_HOST;
const CONTACT_MAIL = "mailto:contact@maylesoft.com?subject=MayleSoft%20inquiry";

const RESTAURANT_URL = restaurantMarketingOrigin(ROOT_DOMAIN, MARKETING_HOST);
const DUGSI_URL = `https://dugsi.${ROOT_DOMAIN}`;

const HERO_WORDS: MessageKey[] = [
  "hubHeroWordRestaurants",
  "hubHeroWordSchools",
  "hubHeroWordHealthcare",
  "hubHeroWordRetail",
];

const TRUST_FEATURES: { icon: typeof Zap; key: MessageKey }[] = [
  { icon: Zap, key: "hubFeatFast" },
  { icon: Shield, key: "hubFeatSecure" },
  { icon: Smartphone, key: "hubFeatMobile" },
  { icon: Globe, key: "hubFeatLanguage" },
  { icon: Cloud, key: "hubFeatCloud" },
  { icon: BarChart3, key: "hubFeatAnalytics" },
];

const STATS: { value: string; key: MessageKey }[] = [
  { value: "500+", key: "hubStatBusinesses" },
  { value: "25K+", key: "hubStatUsers" },
  { value: "99.9%", key: "hubStatUptime" },
  { value: "24/7", key: "hubStatSupport" },
];

const RESTAURANT_FEATURES: MessageKey[] = [
  "hubFeatureQr",
  "hubFeatureKds",
  "hubFeaturePos",
  "hubFeatureWaiter",
  "hubFeatureTables",
  "hubFeaturePickup",
];

const DUGSI_FEATURES: MessageKey[] = [
  "hubFeatureStudents",
  "hubFeatureTeachers",
  "hubFeatureAttendance",
  "hubFeatureExams",
  "hubFeatureFinance",
  "hubFeatureReports",
];

const COMING_SOON: { icon: typeof Stethoscope; key: MessageKey }[] = [
  { icon: Stethoscope, key: "hubSoonClinic" },
  { icon: ShoppingCart, key: "hubSoonRetail" },
  { icon: Truck, key: "hubSoonLogistics" },
  { icon: Building2, key: "hubSoonHr" },
];

function HeroWording() {
  const { t, locale } = useLocale();
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((n) => (n + 1) % HERO_WORDS.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const word = t(HERO_WORDS[index]);

  return (
    <h1 className="mx-auto mt-5 max-w-4xl font-[family-name:var(--font-display)] text-[2.75rem] leading-[1.15] tracking-tight sm:text-6xl lg:text-[4.25rem]">
      <span className="landing-hero-line2">{t("hubHeroTitleBefore")} </span>
      <span className="relative inline-flex h-[1.2em] min-w-[4.5ch] items-center overflow-hidden align-bottom">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`${locale}-${HERO_WORDS[index]}`}
            initial={reduceMotion ? false : { y: "70%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={reduceMotion ? undefined : { y: "-70%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="hub-hero-word whitespace-nowrap"
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="landing-hero-line2"> {t("hubHeroTitleAfter")}</span>
    </h1>
  );
}

function RestaurantDashboardMock({
  t,
}: {
  t: (key: MessageKey) => string;
}) {
  const nav = [
    t("hubMockDashboard"),
    t("hubMockOrders"),
    t("hubMockTables"),
    t("hubMockMenu"),
  ];

  return (
    <div className="hub-glass hub-screenshot-mock overflow-hidden rounded-3xl p-1 shadow-xl">
      <div className="flex min-h-64 overflow-hidden rounded-[1.35rem] bg-[#faf7f2] sm:min-h-72">
        <aside className="hidden w-28 shrink-0 flex-col gap-2 bg-[#1c1917] p-3 text-[0.65rem] text-white/55 sm:flex">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-[#e07a3a]/80" />
            <span className="font-semibold text-white/90">POS</span>
          </div>
          {nav.map((l, i) => (
            <span
              key={l}
              className={`rounded-lg px-2 py-1.5 ${i === 0 ? "bg-white/12 text-white" : ""}`}
            >
              {l}
            </span>
          ))}
        </aside>
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#6b6560]">
            {t("hubMockToday")}
          </p>
          <h4 className="mt-1 text-lg font-semibold text-[#1c1917]">
            {t("hubMockLiveFloor")}
          </h4>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[
              [t("hubMockOpenOrders"), "12"],
              [t("hubMockTables"), "8/14"],
              [t("hubMockKitchenWait"), "6m"],
              [t("hubMockRevenue"), "€2.4k"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="rounded-xl border border-[#1c1917]/8 bg-white/80 px-3 py-2.5"
              >
                <p className="text-[0.65rem] text-[#6b6560]">{k}</p>
                <p className="text-sm font-semibold text-[#1c1917]">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DugsiDashboardMock({ t }: { t: (key: MessageKey) => string }) {
  return (
    <div className="hub-glass hub-screenshot-mock overflow-hidden rounded-3xl p-1 shadow-xl">
      <div className="min-h-64 overflow-hidden rounded-[1.35rem] bg-[#f0f7f4] p-4 sm:min-h-72 sm:p-5">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#52796f]">
          {t("hubMockSpring")}
        </p>
        <h4 className="mt-1 text-lg font-semibold text-[#1c1917]">
          {t("hubMockStudents")}
        </h4>
        <ul className="mt-4 space-y-2">
          {[
            ["7A", "32", "98%"],
            ["8B", "28", "96%"],
            ["9C", "30", "97%"],
          ].map(([grade, enrolled, att]) => (
            <li
              key={grade}
              className="flex items-center justify-between rounded-xl border border-[#1c1917]/8 bg-white/85 px-3 py-2.5 text-sm"
            >
              <div>
                <p className="font-medium text-[#1c1917]">{grade}</p>
                <p className="text-xs text-[#6b6560]">
                  {enrolled} {t("hubMockEnrolled")}
                </p>
              </div>
              <span className="text-xs font-medium text-[#2d6a4f]">
                {att} {t("hubMockAttendance")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function MayleSoftHub() {
  const { t, dir } = useLocale();

  const products = [
    {
      icon: UtensilsCrossed,
      nameKey: "hubProductRestaurant" as const,
      gradient: "from-[#e07a3a]/20 via-[#f4a261]/10 to-transparent",
      features: RESTAURANT_FEATURES,
      href: RESTAURANT_URL,
      ctaKey: "hubCtaRestaurant" as const,
    },
    {
      icon: GraduationCap,
      nameKey: "hubProductDugsi" as const,
      gradient: "from-[#2d6a4f]/15 via-[#40916c]/10 to-transparent",
      features: DUGSI_FEATURES,
      href: DUGSI_URL,
      ctaKey: "hubCtaDugsi" as const,
    },
  ];

  return (
    <div
      className="hub-page relative isolate min-h-screen overflow-x-hidden text-[#1c1917]"
      dir={dir}
    >
      <HubAuroraBackground />

      <header className="sticky top-0 z-50 border-b border-[#1c1917]/6 bg-[#f8f5ef]/55 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/brand/maylesoft-logo.png"
              alt="MayleSoft"
              className="h-11 w-11 rounded-2xl object-cover shadow-sm"
            />
            <span className="font-[family-name:var(--font-display)] text-xl tracking-tight sm:text-2xl">
              MayleSoft
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hub-lang">
              <LanguageSwitcher />
            </div>
            <Link
              href={CONTACT_MAIL}
              className="hub-glass rounded-full px-4 py-2 text-sm font-medium transition hover:border-[#e07a3a]/40 hover:bg-white/80"
            >
              {t("hubContact")}
            </Link>
          </div>
        </div>
      </header>

      <section className="relative z-10 overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
        <div className="relative mx-auto max-w-6xl text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/brand/maylesoft-logo.png"
            alt=""
            className="landing-brand-zoom mx-auto h-20 w-20 rounded-3xl object-cover shadow-lg ring-4 ring-white/60 sm:h-24 sm:w-24"
          />

          <p className="landing-hero-line1 mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-[#e07a3a]">
            {t("hubHeroEyebrow")}
          </p>
          <HeroWording />
          <p className="landing-hero-lead mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#6b6560] sm:text-lg">
            {t("hubHeroLead")}
          </p>
          <p className="landing-hero-lead mt-4 text-sm font-medium text-[#1c1917]/70 sm:text-base">
            {t("hubHeroPills")}
          </p>

          <div className="landing-hero-cta mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#products"
              className="inline-flex items-center gap-2 rounded-full bg-[#e07a3a] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#e07a3a]/25 transition hover:brightness-110"
            >
              {t("hubExploreProducts")}
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href={CONTACT_MAIL}
              className="hub-glass inline-flex items-center rounded-full px-6 py-3.5 text-sm font-semibold transition hover:bg-white/80"
            >
              {t("hubContactUs")}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-[#1c1917]/6 bg-white/20 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
            {t("hubWhyTitle")}
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TRUST_FEATURES.map(({ icon: Icon, key }) => (
              <li
                key={key}
                className="hub-card-lift hub-glass flex items-center gap-4 rounded-2xl px-5 py-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e07a3a]/12 text-[#e07a3a]">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="font-medium">{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="products" className="relative z-10 px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#e07a3a]">
            {t("hubProductsEyebrow")}
          </p>
          <h2 className="mt-3 text-center font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
            {t("hubProductsTitle")}
          </h2>

          <ul className="mt-12 grid gap-6 lg:grid-cols-2">
            {products.map(
              ({ icon: Icon, nameKey, gradient, features, href, ctaKey }) => (
                <li key={nameKey}>
                  <article className="hub-card-lift hub-glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-8">
                    <div
                      className={`pointer-events-none absolute inset-0 bg-linear-to-br ${gradient}`}
                      aria-hidden
                    />
                    <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1c1917] text-white shadow-md">
                      <Icon className="h-7 w-7" strokeWidth={1.5} />
                    </span>
                    <h3 className="relative mt-6 text-2xl font-semibold tracking-tight">
                      {t(nameKey)}
                    </h3>
                    <ul className="relative mt-5 flex flex-1 flex-col gap-2.5">
                      {features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-sm text-[#6b6560]"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#e07a3a]" />
                          {t(f)}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={href}
                      className="relative mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#1c1917] px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-[#e07a3a]"
                    >
                      {t(ctaKey)}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                  </article>
                </li>
              ),
            )}
          </ul>
        </div>
      </section>

      <section className="relative z-10 border-y border-[#1c1917]/6 bg-[#1c1917]/3 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-[family-name:var(--font-display)] text-3xl tracking-tight">
            {t("hubEcosystemTitle")}
          </h2>
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2d6a4f]">
                {t("hubAvailableToday")}
              </p>
              <ul className="mt-4 space-y-3">
                {products.map(({ icon: Icon, nameKey }) => (
                  <li
                    key={nameKey}
                    className="hub-glass flex items-center gap-3 rounded-2xl px-4 py-3"
                  >
                    <Icon className="h-5 w-5 text-[#e07a3a]" strokeWidth={1.75} />
                    <span className="font-medium">{t(nameKey)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b6560]">
                {t("hubComingSoon")}
              </p>
              <ul className="mt-4 space-y-3">
                {COMING_SOON.map(({ icon: Icon, key }) => (
                  <li
                    key={key}
                    className="flex items-center gap-3 rounded-2xl border border-dashed border-[#1c1917]/15 bg-white/30 px-4 py-3 text-[#6b6560] backdrop-blur-md"
                  >
                    <Icon className="h-5 w-5 opacity-60" strokeWidth={1.75} />
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#6b6560]">
            {t("hubTrustedEyebrow")}
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map(({ value, key }) => (
              <li key={key} className="hub-glass rounded-3xl px-4 py-8 text-center">
                <p className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-[#e07a3a] sm:text-4xl">
                  {value}
                </p>
                <p className="mt-2 text-sm font-medium text-[#6b6560]">{t(key)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative z-10 bg-white/15 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
            {t("hubScreensTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[#6b6560]">
            {t("hubScreensBody")}
          </p>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-semibold text-[#1c1917]">
                {t("hubRestaurantDash")}
              </p>
              <RestaurantDashboardMock t={t} />
            </div>
            <div>
              <p className="mb-4 text-sm font-semibold text-[#1c1917]">
                {t("hubDugsiDash")}
              </p>
              <DugsiDashboardMock t={t} />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 overflow-hidden px-4 py-24 sm:px-6">
        <div className="hub-cta-glow absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
            {t("hubCtaTitle")}
          </h2>
          <p className="mt-4 text-lg text-[#6b6560]">{t("hubCtaBody")}</p>
          <a
            href="#products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#e07a3a] px-8 py-4 text-base font-semibold text-white shadow-xl shadow-[#e07a3a]/30 transition hover:brightness-110"
          >
            {t("hubGetStarted")}
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>

      <footer className="relative z-10 border-t border-[#1c1917]/8 bg-[#1c1917] px-4 py-14 text-white/75 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-[family-name:var(--font-display)] text-2xl text-white">
              MayleSoft
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              {t("hubFooterBlurb")}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
              {t("hubFooterProducts")}
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href={RESTAURANT_URL} className="hover:text-white">
                  {t("hubProductRestaurant")}
                </Link>
              </li>
              <li>
                <Link href={DUGSI_URL} className="hover:text-white">
                  {t("hubProductDugsi")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
              {t("hubFooterCompany")}
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href={CONTACT_MAIL} className="hover:text-white">
                  {t("hubContact")}
                </Link>
              </li>
              <li>
                <span className="text-white/40">{t("hubFooterAbout")}</span>
              </li>
              <li>
                <span className="text-white/40">{t("hubFooterPrivacy")}</span>
              </li>
              <li>
                <span className="text-white/40">{t("hubFooterTerms")}</span>
              </li>
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-8 text-center text-xs text-white/40">
          {t("hubFooterCredit")}
        </p>
      </footer>
    </div>
  );
}
