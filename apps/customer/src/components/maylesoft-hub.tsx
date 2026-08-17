import Link from "next/link";
import { restaurantMarketingOrigin } from "@/lib/tenant-host";

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN?.trim() || "maylesoft.com";
const MARKETING_HOST = process.env.NEXT_PUBLIC_MARKETING_HOST;

const RESTAURANT_URL = restaurantMarketingOrigin(ROOT_DOMAIN, MARKETING_HOST);
const DUGSI_URL = `https://dugsi.${ROOT_DOMAIN}`;

const PRODUCTS = [
  {
    name: "Restaurant platform",
    description:
      "QR ordering, kitchen and waiter displays, tables, till, and admin — for restaurants and cafés.",
    href: RESTAURANT_URL,
    cta: "Open restaurant platform",
  },
  {
    name: "Dugsi",
    description: "School and education management on MayleSoft.",
    href: DUGSI_URL,
    cta: "Open Dugsi",
  },
] as const;

export function MayleSoftHub() {
  return (
    <div className="min-h-screen bg-[var(--landing-cream,#f7f3ec)] text-[var(--landing-ink,#1c1917)]">
      <header className="mx-auto flex max-w-4xl items-center justify-between px-4 py-8 sm:px-6">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/brand/maylesoft-logo.png"
            alt=""
            className="h-12 w-12 rounded-xl object-cover"
          />
          <span className="font-[family-name:var(--font-display)] text-2xl tracking-tight">
            MayleSoft
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 pb-20 pt-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--landing-accent,#e07a3a)]">
          Products
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight tracking-tight sm:text-5xl">
          Software for restaurants, schools, and more.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--landing-muted,#6b6560)]">
          {ROOT_DOMAIN} is the home for MayleSoft products. Choose the platform
          you need — each runs on its own subdomain.
        </p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {PRODUCTS.map((product) => (
            <li
              key={product.name}
              className="flex flex-col rounded-2xl border border-[var(--landing-line,color-mix(in_oklab,#1c1917_10%,transparent))] bg-white/80 p-6 shadow-sm backdrop-blur-sm"
            >
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--landing-muted,#6b6560)]">
                {product.description}
              </p>
              <Link
                href={product.href}
                className="mt-6 inline-flex w-fit rounded-full bg-[var(--landing-accent,#e07a3a)] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                {product.cta}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
