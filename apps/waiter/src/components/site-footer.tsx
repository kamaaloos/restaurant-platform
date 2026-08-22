"use client";

import { useLocale } from "@/lib/i18n/locale-provider";

export function SiteFooter() {
  const { t } = useLocale();
  return (
    <footer className="relative z-10 border-t border-[var(--line)] bg-[var(--surface)]/85 px-4 py-6 text-center text-xs leading-relaxed text-[var(--muted)] backdrop-blur-md">
      <p>{t("footer")}</p>
    </footer>
  );
}
