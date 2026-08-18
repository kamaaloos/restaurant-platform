"use client";

import Link from "next/link";
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
import { restaurantMarketingOrigin } from "@/lib/tenant-host";

const ROOT_DOMAIN =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN?.trim() || "maylesoft.com";
const MARKETING_HOST = process.env.NEXT_PUBLIC_MARKETING_HOST;
const CONTACT_MAIL = "mailto:hello@maylesoft.com?subject=MayleSoft%20inquiry";

const RESTAURANT_URL = restaurantMarketingOrigin(ROOT_DOMAIN, MARKETING_HOST);
const DUGSI_URL = `https://dugsi.${ROOT_DOMAIN}`;

const TRUST_FEATURES = [
  { icon: Zap, label: "Fast cloud platform" },
  { icon: Shield, label: "Secure" },
  { icon: Smartphone, label: "Mobile friendly" },
  { icon: Globe, label: "Multi-language" },
  { icon: Cloud, label: "Cloud hosted" },
  { icon: BarChart3, label: "Real-time analytics" },
] as const;

const STATS = [
  { value: "500+", label: "Businesses" },
  { value: "25K+", label: "Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
] as const;

const PRODUCTS = [
  {
    icon: UtensilsCrossed,
    name: "Restaurant platform",
    gradient: "from-[#e07a3a]/20 via-[#f4a261]/10 to-transparent",
    features: [
      "QR ordering",
      "Kitchen display",
      "POS & till",
      "Waiter display",
      "Table management",
      "Pickup TV",
    ],
    href: RESTAURANT_URL,
    cta: "Open platform",
  },
  {
    icon: GraduationCap,
    name: "Dugsi",
    gradient: "from-[#2d6a4f]/15 via-[#40916c]/10 to-transparent",
    features: [
      "Students",
      "Teachers",
      "Attendance",
      "Exams",
      "Finance",
      "Reports",
    ],
    href: DUGSI_URL,
    cta: "Open Dugsi",
  },
] as const;

const COMING_SOON = [
  { icon: Stethoscope, name: "Clinic management" },
  { icon: ShoppingCart, name: "Retail POS" },
  { icon: Truck, name: "Logistics" },
  { icon: Building2, name: "HR & payroll" },
] as const;

function RestaurantDashboardMock() {
  return (
    <div className="hub-glass hub-screenshot-mock overflow-hidden rounded-3xl p-1 shadow-xl">
      <div className="flex min-h-[16rem] overflow-hidden rounded-[1.35rem] bg-[#faf7f2] sm:min-h-[18rem]">
        <aside className="hidden w-28 shrink-0 flex-col gap-2 bg-[#1c1917] p-3 text-[0.65rem] text-white/55 sm:flex">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-[#e07a3a]/80" />
            <span className="font-semibold text-white/90">POS</span>
          </div>
          {["Dashboard", "Orders", "Tables", "Menu"].map((l, i) => (
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
            Today
          </p>
          <h4 className="mt-1 text-lg font-semibold text-[#1c1917]">
            Live floor
          </h4>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[
              ["Open orders", "12"],
              ["Tables", "8/14"],
              ["Kitchen wait", "6m"],
              ["Revenue", "€2.4k"],
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

function DugsiDashboardMock() {
  return (
    <div className="hub-glass hub-screenshot-mock overflow-hidden rounded-3xl p-1 shadow-xl">
      <div className="min-h-[16rem] overflow-hidden rounded-[1.35rem] bg-[#f0f7f4] p-4 sm:min-h-[18rem] sm:p-5">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#52796f]">
          Spring term
        </p>
        <h4 className="mt-1 text-lg font-semibold text-[#1c1917]">
          Students overview
        </h4>
        <ul className="mt-4 space-y-2">
          {[
            ["Grade 7A", "32 enrolled", "98% attendance"],
            ["Grade 8B", "28 enrolled", "96% attendance"],
            ["Grade 9C", "30 enrolled", "97% attendance"],
          ].map(([grade, enrolled, att]) => (
            <li
              key={grade}
              className="flex items-center justify-between rounded-xl border border-[#1c1917]/8 bg-white/85 px-3 py-2.5 text-sm"
            >
              <div>
                <p className="font-medium text-[#1c1917]">{grade}</p>
                <p className="text-xs text-[#6b6560]">{enrolled}</p>
              </div>
              <span className="text-xs font-medium text-[#2d6a4f]">{att}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function MayleSoftHub() {
  return (
    <div className="hub-page bg-[#f8f5ef] text-[#1c1917]">
      <div className="hub-mesh pointer-events-none fixed inset-0 -z-10" aria-hidden />

      <header className="sticky top-0 z-50 border-b border-[#1c1917]/6 bg-[#f8f5ef]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
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
          <Link
            href={CONTACT_MAIL}
            className="rounded-full border border-[#1c1917]/12 bg-white/70 px-4 py-2 text-sm font-medium transition hover:border-[#e07a3a]/40 hover:bg-white"
          >
            Contact
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
        <div className="hub-blob hub-blob-a" aria-hidden />
        <div className="hub-blob hub-blob-b" aria-hidden />

        <div className="relative mx-auto max-w-6xl text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/brand/maylesoft-logo.png"
            alt=""
            className="landing-brand-zoom mx-auto h-20 w-20 rounded-3xl object-cover shadow-lg ring-4 ring-white/60 sm:h-24 sm:w-24"
          />

          <p className="landing-hero-line1 mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-[#e07a3a]">
            One platform. Multiple businesses.
          </p>
          <h1 className="landing-hero-line2 mx-auto mt-5 max-w-4xl font-[family-name:var(--font-display)] text-[2.75rem] leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            Build smarter businesses with modern software.
          </h1>
          <p className="landing-hero-lead mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#6b6560] sm:text-lg">
            Modern cloud software for restaurants, schools, healthcare, retail,
            and growing organizations.
          </p>
          <p className="landing-hero-lead mt-4 text-sm font-medium text-[#1c1917]/70 sm:text-base">
            Restaurant POS · School management · More coming
          </p>

          <div className="landing-hero-cta mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#products"
              className="inline-flex items-center gap-2 rounded-full bg-[#e07a3a] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#e07a3a]/25 transition hover:brightness-110"
            >
              Explore products
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href={CONTACT_MAIL}
              className="inline-flex items-center rounded-full border border-[#1c1917]/12 bg-white/80 px-6 py-3.5 text-sm font-semibold transition hover:bg-white"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[#1c1917]/6 bg-white/40 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
            Why MayleSoft?
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TRUST_FEATURES.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="hub-card-lift flex items-center gap-4 rounded-2xl border border-[#1c1917]/8 bg-white/75 px-5 py-4 shadow-sm backdrop-blur-sm"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e07a3a]/12 text-[#e07a3a]">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="font-medium">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="products" className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#e07a3a]">
            Our products
          </p>
          <h2 className="mt-3 text-center font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
            Premium platforms, ready today
          </h2>

          <ul className="mt-12 grid gap-6 lg:grid-cols-2">
            {PRODUCTS.map(({ icon: Icon, name, gradient, features, href, cta }) => (
              <li key={name}>
                <article
                  className={`hub-card-lift group flex h-full flex-col rounded-3xl border border-[#1c1917]/8 bg-gradient-to-br ${gradient} bg-white/90 p-8 shadow-xl shadow-[#1c1917]/6`}
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1c1917] text-white shadow-md">
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                    {name}
                  </h3>
                  <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                    {features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-[#6b6560]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#e07a3a]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={href}
                    className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#1c1917] px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-[#e07a3a]"
                  >
                    {cta}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-[#1c1917]/6 bg-[#f3efe8] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-[family-name:var(--font-display)] text-3xl tracking-tight">
            The MayleSoft ecosystem
          </h2>
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2d6a4f]">
                Available today
              </p>
              <ul className="mt-4 space-y-3">
                {PRODUCTS.map(({ icon: Icon, name }) => (
                  <li
                    key={name}
                    className="flex items-center gap-3 rounded-2xl border border-[#1c1917]/8 bg-white/80 px-4 py-3 shadow-sm"
                  >
                    <Icon className="h-5 w-5 text-[#e07a3a]" strokeWidth={1.75} />
                    <span className="font-medium">{name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b6560]">
                Coming soon
              </p>
              <ul className="mt-4 space-y-3">
                {COMING_SOON.map(({ icon: Icon, name }) => (
                  <li
                    key={name}
                    className="flex items-center gap-3 rounded-2xl border border-dashed border-[#1c1917]/15 bg-white/50 px-4 py-3 text-[#6b6560]"
                  >
                    <Icon className="h-5 w-5 opacity-60" strokeWidth={1.75} />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#6b6560]">
            Trusted by growing businesses
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map(({ value, label }) => (
              <li
                key={label}
                className="rounded-3xl border border-[#1c1917]/8 bg-white/80 px-4 py-8 text-center shadow-sm"
              >
                <p className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-[#e07a3a] sm:text-4xl">
                  {value}
                </p>
                <p className="mt-2 text-sm font-medium text-[#6b6560]">
                  {label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white/50 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
            Built for real operations
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[#6b6560]">
            Clean dashboards your team actually uses — from the floor to the
            classroom.
          </p>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-semibold text-[#1c1917]">
                Restaurant dashboard
              </p>
              <RestaurantDashboardMock />
            </div>
            <div>
              <p className="mb-4 text-sm font-semibold text-[#1c1917]">
                Dugsi dashboard
              </p>
              <DugsiDashboardMock />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-24 sm:px-6">
        <div className="hub-cta-glow absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
            Ready to transform your business?
          </h2>
          <p className="mt-4 text-lg text-[#6b6560]">
            Explore our platforms today.
          </p>
          <a
            href="#products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#e07a3a] px-8 py-4 text-base font-semibold text-white shadow-xl shadow-[#e07a3a]/30 transition hover:brightness-110"
          >
            Get started
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>

      <footer className="border-t border-[#1c1917]/8 bg-[#1c1917] px-4 py-14 text-white/75 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-[family-name:var(--font-display)] text-2xl text-white">
              MayleSoft
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              Modern cloud software for restaurants, schools, and growing
              organizations.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
              Products
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href={RESTAURANT_URL} className="hover:text-white">
                  Restaurant
                </Link>
              </li>
              <li>
                <Link href={DUGSI_URL} className="hover:text-white">
                  Dugsi
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
              Company
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href={CONTACT_MAIL} className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <span className="text-white/40">About</span>
              </li>
              <li>
                <span className="text-white/40">Privacy</span>
              </li>
              <li>
                <span className="text-white/40">Terms</span>
              </li>
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-8 text-center text-xs text-white/40">
          © 2026 MayleSoft · Designed by Eng. Hasan Kamaal
        </p>
      </footer>
    </div>
  );
}
