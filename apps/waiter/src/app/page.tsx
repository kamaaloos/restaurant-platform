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
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(15,28,46,0.12) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      <section className="relative mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
        <div className="mb-6 flex justify-end">
          <LanguageSwitcher />
        </div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--signal)]">
          {t("floorTablet")}
        </p>
        <h1 className="mb-4 font-[family-name:var(--font-display)] text-7xl leading-none tracking-wide text-[var(--ink)] md:text-8xl">
          {t("waiterDisplay")}
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
