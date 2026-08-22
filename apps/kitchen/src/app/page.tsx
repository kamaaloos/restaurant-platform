"use client";

import { Suspense } from "react";
import { PairingForm } from "@/components/pairing-form";
import { LanguageSwitcher, useLocale } from "@/lib/i18n/locale-provider";

export default function HomePage() {
  const { t } = useLocale();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(23,32,39,0.04)_25%,transparent_25%),linear-gradient(225deg,rgba(23,32,39,0.04)_25%,transparent_25%),linear-gradient(45deg,rgba(23,32,39,0.04)_25%,transparent_25%),linear-gradient(315deg,rgba(23,32,39,0.04)_25%,transparent_25%)] bg-[length:24px_24px] bg-[position:0_0,0_12px,12px_-12px,-12px_0]"
      />

      <section className="relative mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
        <div className="mb-6 flex justify-end">
          <LanguageSwitcher />
        </div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--heat)]">
          {t("stationDisplay")}
        </p>
        <h1 className="mb-4 font-[family-name:var(--font-display)] text-7xl leading-none tracking-wide text-[var(--ink)] md:text-8xl">
          {t("kitchenDisplay")}
        </h1>
        <p className="mb-10 max-w-xl text-lg text-[var(--muted)]">
          {t("homeBody")}
        </p>
        <Suspense fallback={<p className="text-[var(--muted)]">{t("loading")}</p>}>
          <PairingForm />
        </Suspense>
      </section>
    </main>
  );
}
