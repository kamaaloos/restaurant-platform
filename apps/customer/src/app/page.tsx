"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { customerApi } from "@/lib/api";
import { LocaleControls } from "@/lib/currency-provider";
import { useLocale } from "@/lib/i18n/locale-provider";

export default function HomePage() {
  const { t } = useLocale();
  const demoToken = "c295c2df-cc43-49bd-8bd5-5f7484fa9061";

  const branchesQuery = useQuery({
    queryKey: ["walk-in-branches"],
    queryFn: () => customerApi.listWalkInBranches(),
  });

  const firstBranch = branchesQuery.data?.[0];

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-16 text-[var(--ink)]">
      <div className="mb-6 flex justify-end">
        <LocaleControls />
      </div>
      <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
        {t("homeEyebrow")}
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl leading-tight">
        {t("homeTitle")}
      </h1>
      <p className="mt-4 max-w-lg text-[var(--muted)]">{t("homeBody")}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={`/t/${demoToken}`}
          className="inline-flex h-12 items-center rounded-xl bg-[var(--accent)] px-5 text-[var(--accent-foreground)]"
        >
          {t("openDemoTable")}
        </Link>
        {firstBranch ? (
          <>
            <Link
              href={`/w/${firstBranch.walkInToken}`}
              className="inline-flex h-12 items-center rounded-xl border border-[var(--line)] bg-[var(--surface)] px-5"
            >
              {t("walkIn")} · {firstBranch.name}
            </Link>
            <Link
              href={`/pickup/${firstBranch.walkInToken}`}
              className="inline-flex h-12 items-center rounded-xl border border-[var(--line)] bg-[var(--surface)] px-5"
            >
              {t("pickupTv")}
            </Link>
          </>
        ) : null}
      </div>

      {branchesQuery.data && branchesQuery.data.length > 1 ? (
        <ul className="mt-10 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            {t("allWalkInBranches")}
          </p>
          {branchesQuery.data.map((branch) => (
            <li key={branch.walkInToken}>
              <Link
                href={`/w/${branch.walkInToken}`}
                className="text-[var(--accent)] underline-offset-2 hover:underline"
              >
                {branch.restaurant.name} · {branch.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  );
}
