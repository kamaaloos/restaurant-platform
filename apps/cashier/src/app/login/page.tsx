"use client";

import { LoginForm } from "@/components/login-form";
import { LanguageSwitcher, useLocale } from "@/lib/i18n/locale-provider";

export default function LoginPage() {
  const { t } = useLocale();

  return (
    <main className="relative z-10 mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-16">
      <div className="mb-6 flex justify-end">
        <LanguageSwitcher />
      </div>
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
        {t("loginKicker")}
      </p>
      <h1 className="mb-3 font-[family-name:var(--font-display)] text-5xl tracking-tight">
        {t("loginHeadline")}
      </h1>
      <p className="mb-8 text-[var(--muted)]">{t("loginBody")}</p>
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]/90 p-6 shadow-sm backdrop-blur-sm">
        <LoginForm />
      </div>
    </main>
  );
}
