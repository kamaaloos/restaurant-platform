"use client";

import { LocaleControls } from "@/lib/currency-provider";
import { useLocale } from "@/lib/i18n/locale-provider";

export default function HomePage() {
  const { t } = useLocale();

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
    </main>
  );
}
