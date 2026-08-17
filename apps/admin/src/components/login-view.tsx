"use client";

import Image from "next/image";
import { Fraunces } from "next/font/google";
import { BrandMark, LoginForm } from "@/components/login-form";
import { LanguageSwitcher, useLocale } from "@/lib/i18n/locale-provider";

const loginDisplay = Fraunces({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-login-display",
});

export function LoginView() {
  const { t } = useLocale();

  return (
    <main
      className={`${loginDisplay.variable} relative flex flex-1 items-center justify-center overflow-hidden px-4 py-8 sm:px-6`}
    >
      <div className="absolute inset-x-0 top-4 z-20 flex justify-end px-4 sm:px-6">
        <LanguageSwitcher className="w-auto [&_select]:min-w-[8.5rem]" />
      </div>
      <div className="login-card-in relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-white shadow-[0_24px_80px_rgba(18,24,32,0.14)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div className="relative hidden min-h-[34rem] overflow-hidden lg:block">
          <div className="login-hero-kenburns absolute inset-0">
            <Image
              src="/images/login-hero.jpg"
              alt={t("loginHeroAlt")}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 520px, 100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
          <div className="login-fade-up login-fade-up-delay-1 absolute inset-x-0 bottom-0 p-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
              {t("loginHeroKicker")}
            </p>
            <p className="mt-2 max-w-sm font-[family-name:var(--font-login-display)] text-3xl leading-tight tracking-tight">
              {t("loginHeroBody")}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 md:px-12">
          <div className="mx-auto w-full max-w-sm">
            <div className="login-fade-up">
              <BrandMark />
            </div>
            <div className="login-fade-up login-fade-up-delay-1">
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                {t("loginKicker")}
              </p>
              <h1 className="mt-2 font-[family-name:var(--font-login-display)] text-5xl tracking-tight text-[var(--ink)]">
                {t("loginHeadline")}
              </h1>
              <p className="mt-3 text-[var(--muted)]">{t("loginBody")}</p>
            </div>
            <div className="login-fade-up login-fade-up-delay-2 mt-8">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
