"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { customerApi } from "@/lib/api";
import { LocaleControls } from "@/lib/currency-provider";
import { useLocale } from "@/lib/i18n/locale-provider";
import { useRestaurantBrand } from "@/lib/restaurant-brand";
import { isReservedTenantSlug } from "@/lib/tenant-host";

export default function TenantHomePage() {
  const { t } = useLocale();
  const params = useParams<{ slug: string }>();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const reserved = isReservedTenantSlug(slug);

  const tenantQuery = useQuery({
    queryKey: ["customer-tenant", slug],
    queryFn: () => customerApi.getTenant(slug),
    enabled: !!slug && !reserved,
    retry: false,
  });

  useRestaurantBrand(tenantQuery.data?.restaurant);

  if (reserved) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-16 text-[var(--ink)]">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
          {t("homeEyebrow")}
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl">
          {t("tenantNotFoundTitle")}
        </h1>
        <p className="mt-4 max-w-lg text-[var(--muted)]">
          {t("tenantNotFoundBody")}
        </p>
      </main>
    );
  }

  if (tenantQuery.isLoading) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-16 text-[var(--ink)]">
        <p className="text-[var(--muted)]">{t("loadingMenu")}</p>
      </main>
    );
  }

  if (tenantQuery.isError || !tenantQuery.data) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-16 text-[var(--ink)]">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
          {t("homeEyebrow")}
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl">
          {t("tenantNotFoundTitle")}
        </h1>
        <p className="mt-4 max-w-lg text-[var(--muted)]">
          {t("tenantNotFoundBody")}
        </p>
      </main>
    );
  }

  const { restaurant, branches } = tenantQuery.data;

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-12 text-[var(--ink)]">
      <div className="mb-8 flex justify-end">
        <LocaleControls />
      </div>

      <header className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        {restaurant.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={restaurant.logoUrl}
            alt=""
            className="h-16 w-16 rounded-full object-cover ring-2 ring-[var(--accent)]/35"
          />
        ) : null}
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
            {t("tenantEyebrow")}
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl">
            {restaurant.name}
          </h1>
          <p className="mt-3 max-w-lg text-[var(--muted)]">{t("tenantBody")}</p>
        </div>
      </header>

      <section className="mt-12">
        <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-[var(--muted)]">
          {t("tenantBranches")}
        </h2>
        {branches.length === 0 ? (
          <p className="mt-4 text-[var(--muted)]">{t("tenantNoBranches")}</p>
        ) : (
          <ul className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {branches.map((branch) => (
              <li key={branch.id} className="py-4">
                <p className="font-[family-name:var(--font-display)] text-xl">
                  {branch.name}
                </p>
                {branch.address ? (
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {branch.address}
                  </p>
                ) : null}
                {branch.phone ? (
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {branch.phone}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-6 text-sm text-[var(--muted)]">{t("tenantScanHint")}</p>
      </section>
    </main>
  );
}
