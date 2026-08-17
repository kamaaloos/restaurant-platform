"use client";

import { LocaleControls } from "@/lib/currency-provider";
import { useLocale } from "@/lib/i18n/locale-provider";
import { LandingPhotoBackdrop } from "@/components/landing-photo-backdrop";

const ADMIN_URL =
  process.env.NEXT_PUBLIC_ADMIN_URL ?? "https://admin.maylesoft.com";
const DEMO_MAIL = "mailto:hello@maylesoft.com?subject=MayleSoft%20demo";

function ProductMock() {
  return (
    <div className="landing-float relative mx-auto w-full max-w-md overflow-hidden rounded-[1.75rem] border border-[var(--landing-line)] bg-white shadow-[var(--landing-shadow)]">
      <div className="flex min-h-[22rem]">
        <aside className="flex w-[4.5rem] flex-col gap-3 bg-[#1c1917] px-2 py-5 text-[0.65rem] text-white/55 sm:w-36 sm:px-3 sm:text-xs">
          <p className="mb-2 px-1 text-[0.7rem] font-semibold tracking-wide text-white sm:text-sm">
            MayleSoft
          </p>
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
        <div className="flex flex-1 flex-col bg-[#faf7f2] p-4 sm:p-5">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--landing-muted)]">
            Table 5
          </p>
          <h3 className="mt-1 font-[family-name:var(--font-body)] text-lg font-semibold text-[var(--landing-ink)]">
            Checkout
          </h3>
          <ul className="mt-4 flex-1 space-y-2.5 text-sm text-[var(--landing-ink)]">
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
          <div className="mt-4 flex items-center justify-between text-sm font-medium">
            <span>Total</span>
            <span>€30.67</span>
          </div>
          <button
            type="button"
            tabIndex={-1}
            className="mt-3 w-full rounded-xl bg-[var(--landing-accent)] py-3 text-sm font-semibold text-white"
          >
            Pay €30.67
          </button>
        </div>
      </div>
    </div>
  );
}

const FEATURE_KEYS = [
  ["landingFeatPosTitle", "landingFeatPosBody"],
  ["landingFeatTablesTitle", "landingFeatTablesBody"],
  ["landingFeatKitchenTitle", "landingFeatKitchenBody"],
  ["landingFeatOnlineTitle", "landingFeatOnlineBody"],
  ["landingFeatReportsTitle", "landingFeatReportsBody"],
  ["landingFeatStaffTitle", "landingFeatStaffBody"],
] as const;

const TRUST_KEYS = [
  "landingTrustEasy",
  "landingTrustAllInOne",
  "landingTrustDevices",
  "landingTrustSecure",
] as const;

const QUOTE_KEYS = [
  ["landingQuote1", "landingQuote1By"],
  ["landingQuote2", "landingQuote2By"],
  ["landingQuote3", "landingQuote3By"],
] as const;

export function LandingMarketing() {
  const { t } = useLocale();

  return (
    <div className="landing-page bg-[var(--landing-cream)] text-[var(--landing-ink)]">
      {/* Nav */}
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <a href="#" className="flex items-center gap-2 text-white">
            <span className="landing-brand-zoom text-lg font-semibold tracking-tight">
              MayleSoft
            </span>
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
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block [&_button]:border-white/30 [&_button]:bg-white/10 [&_button]:text-white [&_select]:border-white/30 [&_select]:bg-white/10 [&_select]:text-white">
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
              className="rounded-full bg-[var(--landing-accent)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              {t("landingNavDemo")}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-28 sm:justify-center sm:pb-24 sm:pt-32">
        <LandingPhotoBackdrop tone="hero" startIndex={0} />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
          <h1 className="landing-fade-up max-w-3xl font-[family-name:var(--font-body)] text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {t("landingHeroLine1")}{" "}
            <span className="text-[var(--landing-accent)]">
              {t("landingHeroLine2")}
            </span>
          </h1>
          <p className="landing-fade-up mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {t("landingHeroLead")}
          </p>
          <div className="landing-fade-up mt-9 flex flex-wrap gap-3">
            <a
              href={DEMO_MAIL}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--landing-accent)] px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              {t("landingCtaTrial")}
              <span aria-hidden>→</span>
            </a>
            <a
              href="#product"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/16"
            >
              {t("landingCtaWatch")}
            </a>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-b border-[var(--landing-line)] bg-[var(--landing-cream)]">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:grid-cols-4 sm:px-6 sm:py-14">
          {TRUST_KEYS.map((key) => (
            <li key={key} className="text-center sm:text-left">
              <p className="text-sm font-semibold text-[var(--landing-ink)]">
                {t(key)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Product */}
      <section
        id="product"
        className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-16"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--landing-accent)]">
            {t("landingProductEyebrow")}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-body)] text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("landingProductTitle")}
          </h2>
          <ul className="mt-8 space-y-3 text-[var(--landing-muted)]">
            <li className="flex gap-3">
              <span className="mt-1 text-[var(--landing-accent)]">✓</span>
              {t("landingProductBullet1")}
            </li>
            <li className="flex gap-3">
              <span className="mt-1 text-[var(--landing-accent)]">✓</span>
              {t("landingProductBullet2")}
            </li>
            <li className="flex gap-3">
              <span className="mt-1 text-[var(--landing-accent)]">✓</span>
              {t("landingProductBullet3")}
            </li>
            <li className="flex gap-3">
              <span className="mt-1 text-[var(--landing-accent)]">✓</span>
              {t("landingProductBullet4")}
            </li>
          </ul>
        </div>
        <ProductMock />
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-y border-[var(--landing-line)] bg-[#f3efe8] px-4 py-20 sm:px-6 sm:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="mx-auto max-w-2xl text-center font-[family-name:var(--font-body)] text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("landingFeaturesTitle")}
          </h2>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURE_KEYS.map(([titleKey, bodyKey]) => (
              <article
                key={titleKey}
                className="rounded-2xl border border-[var(--landing-line)] bg-white/80 p-6 backdrop-blur-sm"
              >
                <h3 className="text-lg font-semibold tracking-tight">
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
        className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28"
      >
        <LandingPhotoBackdrop tone="soft" startIndex={4} />
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--landing-accent)]">
            {t("landingHowEyebrow")}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-body)] text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("landingHowTitle")}
          </h2>
          <p className="mt-5 max-w-xl text-[var(--landing-muted)] leading-relaxed">
            {t("landingHowBody")}
          </p>
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
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
        className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1fr_1.1fr] lg:gap-16"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--landing-accent)]">
            {t("landingStoriesEyebrow")}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-body)] text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("landingStoriesTitle")}
          </h2>
          <p className="mt-5 max-w-md text-[var(--landing-muted)] leading-relaxed">
            {t("landingStoriesBody")}
          </p>
          <p className="mt-6 text-sm font-semibold text-[var(--landing-accent)]">
            {t("landingStoriesRating")}
          </p>
        </div>
        <div className="space-y-4">
          {QUOTE_KEYS.map(([quoteKey, byKey]) => (
            <blockquote
              key={quoteKey}
              className="rounded-2xl border border-[var(--landing-line)] bg-white/70 p-5"
            >
              <p className="text-[var(--landing-ink)]/90 italic leading-relaxed">
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
      <section className="bg-[#1c1917] px-4 py-20 text-center text-white sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-[family-name:var(--font-body)] text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("landingFinalTitle")}
          </h2>
          <p className="mt-4 text-white/70">{t("landingFinalBody")}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={DEMO_MAIL}
              className="rounded-full bg-[var(--landing-accent)] px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              {t("landingCtaTrial")}
            </a>
            <a
              href={DEMO_MAIL}
              className="rounded-full border border-white/35 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {t("landingNavDemo")}
            </a>
          </div>
          <p className="mt-6 text-xs text-white/45">{t("landingFinalNote")}</p>
        </div>
      </section>
    </div>
  );
}
