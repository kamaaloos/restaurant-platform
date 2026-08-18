"use client";

import {
  BarChart3,
  ChefHat,
  Check,
  LayoutGrid,
  Monitor,
  Shield,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";
import Image from "next/image";
import { LocaleControls } from "@/lib/currency-provider";
import { useLocale } from "@/lib/i18n/locale-provider";
import type { MessageKey } from "@/lib/i18n/messages";
import { LandingPhotoBackdrop } from "@/components/landing-photo-backdrop";

const ADMIN_URL =
  process.env.NEXT_PUBLIC_ADMIN_URL ?? "https://admin.maylesoft.com";
const DEMO_MAIL = "mailto:hello@maylesoft.com?subject=MayleSoft%20demo";

function ProductMock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`landing-float landing-glass-mock relative mx-auto w-full max-w-md overflow-hidden rounded-[1.5rem] sm:rounded-[1.75rem] ${className}`}
    >
      <div className="flex min-h-[18rem] sm:min-h-[22rem]">
        <aside className="flex w-14 flex-col gap-2.5 bg-[#1c1917]/95 px-2 py-4 text-[0.6rem] text-white/55 sm:w-36 sm:gap-3 sm:px-3 sm:py-5 sm:text-xs">
          <div className="mb-2 flex items-center gap-2 px-1">
            <Image
              src="/images/brand/maylesoft-logo.png"
              alt=""
              width={36}
              height={36}
              className="h-8 w-8 rounded-full object-cover sm:h-9 sm:w-9"
            />
            <p className="hidden text-[0.7rem] font-semibold tracking-wide text-white sm:block sm:text-sm">
              MayleSoft
            </p>
          </div>
          {["Dashboard", "Orders", "Tables", "Menu", "Staff"].map((label, i) => (
            <span
              key={label}
              className={`rounded-lg px-2 py-1.5 ${
                i === 1 ? "bg-white/12 text-white" : ""
              }`}
            >
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{label.slice(0, 1)}</span>
            </span>
          ))}
        </aside>
        <div className="flex flex-1 flex-col bg-[#faf7f2]/95 p-3.5 sm:p-5">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--landing-muted)]">
            Table 5
          </p>
          <h3 className="mt-1 font-[family-name:var(--font-body)] text-base font-semibold text-[var(--landing-ink)] sm:text-lg">
            Checkout
          </h3>
          <ul className="mt-3.5 flex-1 space-y-2 text-xs text-[var(--landing-ink)] sm:mt-4 sm:space-y-2.5 sm:text-sm">
            <li className="flex justify-between gap-3 border-b border-[var(--landing-line)] pb-2">
              <span>Margherita</span>
              <span className="text-[var(--landing-muted)]">€12.50</span>
            </li>
            <li className="flex justify-between gap-3 border-b border-[var(--landing-line)] pb-2">
              <span>Pasta Carbonara</span>
              <span className="text-[var(--landing-muted)]">€14.90</span>
            </li>
            <li className="flex justify-between gap-3 border-b border-[var(--landing-line)] pb-2">
              <span>House lemonade</span>
              <span className="text-[var(--landing-muted)]">€3.27</span>
            </li>
          </ul>
          <div className="mt-3.5 flex items-center justify-between text-sm font-medium">
            <span>Total</span>
            <span>€30.67</span>
          </div>
          <button
            type="button"
            tabIndex={-1}
            className="mt-3 w-full rounded-xl bg-[var(--landing-accent)] py-2.5 text-sm font-semibold text-white sm:py-3"
          >
            Pay €30.67
          </button>
        </div>
      </div>
    </div>
  );
}

const FEATURE_ITEMS: {
  icon: typeof Monitor;
  titleKey: MessageKey;
  bodyKey: MessageKey;
}[] = [
  { icon: Monitor, titleKey: "landingFeatPosTitle", bodyKey: "landingFeatPosBody" },
  {
    icon: LayoutGrid,
    titleKey: "landingFeatTablesTitle",
    bodyKey: "landingFeatTablesBody",
  },
  {
    icon: ChefHat,
    titleKey: "landingFeatKitchenTitle",
    bodyKey: "landingFeatKitchenBody",
  },
  {
    icon: Smartphone,
    titleKey: "landingFeatOnlineTitle",
    bodyKey: "landingFeatOnlineBody",
  },
  {
    icon: BarChart3,
    titleKey: "landingFeatReportsTitle",
    bodyKey: "landingFeatReportsBody",
  },
  { icon: Users, titleKey: "landingFeatStaffTitle", bodyKey: "landingFeatStaffBody" },
];

const TRUST_ITEMS: {
  icon: typeof Sparkles;
  key: MessageKey;
}[] = [
  { icon: Sparkles, key: "landingTrustEasy" },
  { icon: Check, key: "landingTrustAllInOne" },
  { icon: Smartphone, key: "landingTrustDevices" },
  { icon: Shield, key: "landingTrustSecure" },
];

const STAT_KEYS = [
  ["landingStat1Value", "landingStat1Label"],
  ["landingStat2Value", "landingStat2Label"],
  ["landingStat3Value", "landingStat3Label"],
] as const;

const PRODUCT_BULLETS: MessageKey[] = [
  "landingProductBullet1",
  "landingProductBullet2",
  "landingProductBullet3",
  "landingProductBullet4",
];

const QUOTE_KEYS = [
  ["landingQuote1", "landingQuote1By"],
  ["landingQuote2", "landingQuote2By"],
  ["landingQuote3", "landingQuote3By"],
] as const;

function CtaButton({
  href,
  primary,
  title,
  subtitle,
}: {
  href: string;
  primary?: boolean;
  title: string;
  subtitle?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex w-full flex-col items-start rounded-2xl px-5 py-3.5 text-left transition sm:w-auto sm:px-6 ${
        primary
          ? "bg-[var(--landing-accent)] text-white hover:brightness-110"
          : "border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/16"
      }`}
    >
      <span className="text-sm font-semibold">{title}</span>
      {subtitle ? (
        <span
          className={`mt-0.5 text-xs ${primary ? "text-white/80" : "text-white/65"}`}
        >
          {subtitle}
        </span>
      ) : null}
    </a>
  );
}

export function LandingMarketing() {
  const { t } = useLocale();

  return (
    <div className="landing-page bg-[var(--landing-cream)] text-[var(--landing-ink)]">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:flex-nowrap sm:gap-4 sm:px-6 sm:py-5">
          <a href="#" className="landing-brand-zoom flex items-center">
            <Image
              src="/images/brand/maylesoft-logo.png"
              alt="MayleSoft"
              width={80}
              height={80}
              className="h-12 w-12 rounded-full object-cover ring-1 ring-white/20 sm:h-[4.5rem] sm:w-[4.5rem]"
              priority
            />
            <span className="sr-only">MayleSoft</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
            <a href="#features" className="transition hover:text-white">
              {t("landingNavFeatures")}
            </a>
            <a href="#product" className="transition hover:text-white">
              {t("landingNavProduct")}
            </a>
            <a href="#how" className="transition hover:text-white">
              {t("landingNavHow")}
            </a>
            <a href="#stories" className="transition hover:text-white">
              {t("landingNavAbout")}
            </a>
          </nav>
          <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end sm:gap-3">
            <div className="min-w-0 flex-1 sm:flex-none [&_button]:border-white/30 [&_button]:bg-white/10 [&_button]:text-white [&_select]:border-white/30 [&_select]:bg-white/10 [&_select]:text-white">
              <LocaleControls />
            </div>
            <a
              href={ADMIN_URL}
              className="hidden text-sm text-white/90 transition hover:text-white sm:inline"
            >
              {t("landingNavLogin")}
            </a>
            <a
              href={DEMO_MAIL}
              className="shrink-0 rounded-full bg-[var(--landing-accent)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              {t("landingNavDemo")}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24 sm:pt-32">
        <LandingPhotoBackdrop tone="hero" startIndex={0} />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-8 px-4 pb-8 sm:gap-12 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:gap-10 lg:pb-12">
          <div>
            <h1 className="max-w-3xl text-balance font-[family-name:var(--font-body)] text-[2.35rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.5rem]">
              <span className="landing-hero-line1 block">{t("landingHeroLine1")}</span>
              <span className="landing-hero-line2 mt-2 block text-[var(--landing-accent)]">
                {t("landingHeroLine2")}
              </span>
            </h1>
            <p className="landing-hero-lead mt-5 max-w-xl text-sm leading-relaxed text-white/82 sm:mt-6 sm:text-lg">
              {t("landingHeroLead")}
            </p>
            <div className="landing-hero-cta mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
              <CtaButton
                href={DEMO_MAIL}
                primary
                title={t("landingCtaTrial")}
                subtitle={t("landingCtaTrialSub")}
              />
              <CtaButton
                href={DEMO_MAIL}
                title={t("landingCtaDemo")}
                subtitle={t("landingCtaDemoSub")}
              />
            </div>
          </div>
          <div className="landing-hero-mock mx-auto w-full max-w-sm lg:block lg:max-w-none">
            <ProductMock />
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 border-t border-white/10 bg-[#14100c]/55 backdrop-blur-md">
          <ul className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-white/10 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6">
            {STAT_KEYS.map(([valueKey, labelKey]) => (
              <li key={valueKey} className="py-6 text-center sm:py-10">
                <p className="font-[family-name:var(--font-body)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  {t(valueKey)}
                </p>
                <p className="mt-2 text-sm text-white/65">{t(labelKey)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Trust */}
      <section className="border-b border-[var(--landing-line)] bg-[var(--landing-cream)]">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-5 px-4 py-10 sm:grid-cols-4 sm:gap-8 sm:px-6 sm:py-14">
          {TRUST_ITEMS.map(({ icon: Icon, key }) => (
            <li key={key} className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--landing-accent)]/12 text-[var(--landing-accent)]">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <p className="text-sm font-semibold text-[var(--landing-ink)]">
                {t(key)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Product — mock left, checklist right */}
      <section
        id="product"
        className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:gap-12 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-16"
      >
        <ProductMock className="lg:order-1" />
        <div className="lg:order-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--landing-accent)]">
            {t("landingProductEyebrow")}
          </p>
          <h2 className="mt-3 text-balance font-[family-name:var(--font-body)] text-2xl font-semibold tracking-tight sm:text-4xl">
            {t("landingProductTitle")}
          </h2>
          <ul className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
            {PRODUCT_BULLETS.map((key) => (
              <li
                key={key}
                className="flex items-start gap-3 text-[var(--landing-muted)]"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--landing-accent)]/15 text-[var(--landing-accent)]">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
                </span>
                <span className="text-sm leading-relaxed sm:text-base">{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-y border-[var(--landing-line)] bg-[#f3efe8] px-4 py-16 sm:px-6 sm:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="mx-auto max-w-2xl text-center font-[family-name:var(--font-body)] text-2xl font-semibold tracking-tight sm:text-4xl">
            {t("landingFeaturesTitle")}
          </h2>
          <div className="mt-8 grid gap-4 sm:mt-14 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURE_ITEMS.map(({ icon: Icon, titleKey, bodyKey }) => (
              <article
                key={titleKey}
                className="rounded-2xl border border-[var(--landing-line)] bg-white/80 p-5 backdrop-blur-sm sm:p-6"
              >
                <Icon
                  className="h-10 w-10 text-[var(--landing-accent)]"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {t(titleKey)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--landing-muted)]">
                  {t(bodyKey)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How */}
      <section
        id="how"
        className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-28"
      >
        <LandingPhotoBackdrop tone="soft" startIndex={4} />
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--landing-accent)]">
            {t("landingHowEyebrow")}
          </p>
          <h2 className="mt-3 text-balance font-[family-name:var(--font-body)] text-2xl font-semibold tracking-tight sm:text-4xl">
            {t("landingHowTitle")}
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-[var(--landing-muted)]">
            {t("landingHowBody")}
          </p>
          <div className="mt-8 grid gap-6 sm:mt-12 sm:gap-10 sm:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">{t("landingHowTableTitle")}</h3>
              <p className="mt-2 text-[var(--landing-muted)]">
                {t("landingHowTableBody")}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                {t("landingHowWalkInTitle")}
              </h3>
              <p className="mt-2 text-[var(--landing-muted)]">
                {t("landingHowWalkInBody")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stories */}
      <section
        id="stories"
        className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:gap-12 sm:px-6 sm:py-28 lg:grid-cols-[1fr_1.1fr] lg:gap-16"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--landing-accent)]">
            {t("landingStoriesEyebrow")}
          </p>
          <h2 className="mt-3 text-balance font-[family-name:var(--font-body)] text-2xl font-semibold tracking-tight sm:text-4xl">
            {t("landingStoriesTitle")}
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-[var(--landing-muted)]">
            {t("landingStoriesBody")}
          </p>
          <p className="mt-6 text-sm font-semibold text-[var(--landing-accent)]">
            {t("landingStoriesRating")}
          </p>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {QUOTE_KEYS.map(([quoteKey, byKey]) => (
            <blockquote
              key={quoteKey}
              className="rounded-2xl border border-[var(--landing-line)] bg-white/70 p-4 sm:p-5"
            >
              <p className="italic leading-relaxed text-[var(--landing-ink)]/90">
                “{t(quoteKey)}”
              </p>
              <footer className="mt-3 text-sm font-medium text-[var(--landing-muted)]">
                {t(byKey)}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#1c1917] px-4 py-16 text-center text-white sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <Image
            src="/images/brand/maylesoft-logo.png"
            alt="MayleSoft"
            width={96}
            height={96}
            className="mx-auto h-20 w-20 rounded-full object-cover ring-1 ring-white/15"
          />
          <h2 className="mt-4 text-balance font-[family-name:var(--font-body)] text-2xl font-semibold tracking-tight sm:text-4xl">
            {t("landingFinalTitle")}
          </h2>
          <p className="mt-4 text-white/70">{t("landingFinalBody")}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
            <CtaButton
              href={DEMO_MAIL}
              primary
              title={t("landingCtaTrial")}
              subtitle={t("landingCtaTrialSub")}
            />
            <CtaButton
              href={DEMO_MAIL}
              title={t("landingCtaDemo")}
              subtitle={t("landingCtaDemoSub")}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
