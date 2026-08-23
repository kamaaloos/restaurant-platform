"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Download,
  Monitor,
  Shield,
  ShoppingCart,
  Users,
  WifiOff,
} from "lucide-react";
import { LanguageSwitcher, useLocale } from "@/lib/i18n/locale-provider";
import type { MessageKey } from "@/lib/i18n/messages";
import { mayleSoftHubOrigin } from "@/lib/tenant-host";

const ROOT_DOMAIN =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN?.trim() || "maylesoft.com";
const HUB_URL = mayleSoftHubOrigin(ROOT_DOMAIN);
const CONTACT_MAIL =
  "mailto:contact@maylesoft.com?subject=MayleSoft%20Retail%20demo";
const UPDATE_FEED_PATH = "/latest.json";

type RetailRelease = {
  version: string;
  platform: string;
  fileName: string;
  downloadUrl: string;
  releasedAt?: string;
  notes?: string;
};

const FEATURES: {
  icon: typeof Monitor;
  titleKey: MessageKey;
  bodyKey: MessageKey;
}[] = [
  {
    icon: WifiOff,
    titleKey: "retailFeatOfflineTitle",
    bodyKey: "retailFeatOfflineBody",
  },
  {
    icon: ShoppingCart,
    titleKey: "retailFeatPosTitle",
    bodyKey: "retailFeatPosBody",
  },
  {
    icon: Boxes,
    titleKey: "retailFeatInventoryTitle",
    bodyKey: "retailFeatInventoryBody",
  },
  {
    icon: Users,
    titleKey: "retailFeatStaffTitle",
    bodyKey: "retailFeatStaffBody",
  },
  {
    icon: BarChart3,
    titleKey: "retailFeatReportsTitle",
    bodyKey: "retailFeatReportsBody",
  },
  {
    icon: Shield,
    titleKey: "retailFeatLocalTitle",
    bodyKey: "retailFeatLocalBody",
  },
];

function PosMock() {
  const { t } = useLocale();
  return (
    <div className="landing-float landing-glass-mock relative mx-auto w-full max-w-lg overflow-hidden rounded-[1.5rem]">
      <div className="flex min-h-[18rem] sm:min-h-[22rem]">
        <aside className="flex w-16 flex-col gap-2 bg-[#1c1917]/95 px-2 py-4 text-[0.65rem] text-white/55 sm:w-40 sm:px-3 sm:py-5 sm:text-xs">
          <p className="mb-2 px-1 text-[0.7rem] font-semibold tracking-wide text-white sm:text-sm">
            MayleSoft
          </p>
          {[
            t("retailMockSell"),
            t("retailMockProducts"),
            t("retailMockStock"),
            t("retailMockStaff"),
            t("retailMockReports"),
          ].map((label, i) => (
            <span
              key={label}
              className={`rounded-lg px-2 py-1.5 ${
                i === 0 ? "bg-white/12 text-white" : ""
              }`}
            >
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{label.slice(0, 1)}</span>
            </span>
          ))}
        </aside>
        <div className="flex flex-1 flex-col bg-[#faf7f2]/95 p-3.5 sm:p-5">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--landing-muted)]">
            {t("retailMockRegister")}
          </p>
          <h3 className="mt-1 font-[family-name:var(--font-body)] text-base font-semibold text-[var(--landing-ink)] sm:text-lg">
            {t("retailMockCheckout")}
          </h3>
          <ul className="mt-3.5 flex-1 space-y-2 text-xs text-[var(--landing-ink)] sm:mt-4 sm:space-y-2.5 sm:text-sm">
            <li className="flex justify-between gap-3 border-b border-[var(--landing-line)] pb-2">
              <span>{t("retailMockItem1")}</span>
              <span className="text-[var(--landing-muted)]">€4.50</span>
            </li>
            <li className="flex justify-between gap-3 border-b border-[var(--landing-line)] pb-2">
              <span>{t("retailMockItem2")}</span>
              <span className="text-[var(--landing-muted)]">€12.00</span>
            </li>
            <li className="flex justify-between gap-3 border-b border-[var(--landing-line)] pb-2">
              <span>{t("retailMockItem3")}</span>
              <span className="text-[var(--landing-muted)]">€2.20</span>
            </li>
          </ul>
          <div className="mt-3.5 flex items-center justify-between text-sm font-medium">
            <span>{t("retailMockTotal")}</span>
            <span>€18.70</span>
          </div>
          <button
            type="button"
            tabIndex={-1}
            className="mt-3 w-full rounded-xl bg-[var(--landing-accent)] py-2.5 text-sm font-semibold text-white sm:py-3"
          >
            {t("retailMockPay")}
          </button>
        </div>
      </div>
    </div>
  );
}

function useRetailRelease() {
  const [release, setRelease] = React.useState<RetailRelease | null>(null);
  const [status, setStatus] = React.useState<"loading" | "ready" | "error">(
    "loading",
  );

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(UPDATE_FEED_PATH, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as RetailRelease;
        if (
          !data?.version ||
          !data?.downloadUrl ||
          typeof data.downloadUrl !== "string"
        ) {
          throw new Error("invalid feed");
        }
        if (!cancelled) {
          setRelease(data);
          setStatus("ready");
        }
      } catch {
        if (!cancelled) {
          setRelease(null);
          setStatus("error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { release, status };
}

export function RetailLanding() {
  const { t, dir } = useLocale();
  const { release, status } = useRetailRelease();
  const installerHref = release?.downloadUrl ?? null;

  return (
    <div
      className="landing-page relative isolate min-h-screen overflow-x-hidden text-[var(--landing-ink)]"
      dir={dir}
    >
      <div className="landing-aurora pointer-events-none absolute inset-0 -z-10" aria-hidden />

      <header className="sticky top-0 z-50 border-b border-[var(--landing-line)] bg-[var(--landing-paper)]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:flex-nowrap sm:px-6 sm:py-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/brand/maylesoft-logo.png"
              alt="MayleSoft"
              className="h-11 w-11 rounded-2xl object-cover shadow-sm"
            />
            <span className="truncate font-[family-name:var(--font-display)] text-lg tracking-tight sm:text-2xl">
              {t("retailBrand")}
            </span>
          </Link>
          <div className="flex w-full items-center gap-2 sm:w-auto sm:justify-end sm:gap-3">
            <LanguageSwitcher />
            <a
              href="#download"
              className="inline-flex items-center justify-center rounded-full bg-[var(--landing-ink)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--landing-accent)]"
            >
              {t("retailDownloadCta")}
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--landing-accent)]">
                {t("retailEyebrow")}
              </p>
              <h1 className="mt-4 max-w-xl text-balance font-[family-name:var(--font-display)] text-[2.35rem] leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                {t("retailTitle")}
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--landing-muted)] sm:text-lg">
                {t("retailLead")}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={installerHref ?? "#download"}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--landing-accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--landing-accent)]/25 transition hover:brightness-110"
                >
                  <Download className="h-4 w-4" />
                  {t("retailDownloadCta")}
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--landing-line)] bg-white/60 px-6 py-3.5 text-sm font-semibold backdrop-blur transition hover:bg-white"
                >
                  {t("retailCtaSecondary")}
                </a>
              </div>
              <p className="mt-5 flex items-center gap-2 text-sm text-[var(--landing-muted)]">
                <Monitor className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                {t("retailPlatformNote")}
              </p>
            </div>
            <PosMock />
          </div>
        </section>

        <section
          id="features"
          className="border-y border-[var(--landing-line)] bg-white/35 px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-[var(--landing-accent)]">
              {t("retailFeaturesEyebrow")}
            </p>
            <h2 className="mt-3 text-center font-[family-name:var(--font-display)] text-2xl tracking-tight sm:text-4xl">
              {t("retailFeaturesTitle")}
            </h2>
            <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map(({ icon: Icon, titleKey, bodyKey }) => (
                <li
                  key={titleKey}
                  className="rounded-3xl border border-[var(--landing-line)] bg-white/55 p-5 backdrop-blur sm:p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--landing-accent)]/12 text-[var(--landing-accent)]">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">
                    {t(titleKey)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--landing-muted)]">
                    {t(bodyKey)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="download"
          className="border-b border-[var(--landing-line)] px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-[var(--landing-line)] bg-white/60 p-6 backdrop-blur sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--landing-accent)]">
              {t("retailDownloadEyebrow")}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl tracking-tight sm:text-4xl">
              {t("retailDownloadTitle")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--landing-muted)] sm:text-lg">
              {t("retailDownloadBody")}
            </p>

            {status === "loading" ? (
              <p className="mt-8 text-sm text-[var(--landing-muted)]">
                {t("retailDownloadLoading")}
              </p>
            ) : null}

            {status === "ready" && release ? (
              <div className="mt-8 space-y-4">
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--landing-muted)]">
                  <span>
                    {t("retailDownloadVersion").replace(
                      "{version}",
                      release.version,
                    )}
                  </span>
                  <span aria-hidden>·</span>
                  <span>{t("retailDownloadPlatform")}</span>
                  {release.fileName ? (
                    <>
                      <span aria-hidden>·</span>
                      <span className="font-mono text-xs sm:text-sm">
                        {release.fileName}
                      </span>
                    </>
                  ) : null}
                </div>
                {release.notes ? (
                  <p className="text-sm text-[var(--landing-muted)]">
                    {release.notes}
                  </p>
                ) : null}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={release.downloadUrl}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--landing-accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--landing-accent)]/25 transition hover:brightness-110"
                  >
                    <Download className="h-4 w-4" />
                    {t("retailDownloadCta")}
                  </a>
                  <a
                    href={UPDATE_FEED_PATH}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--landing-line)] bg-white/70 px-6 py-3.5 text-sm font-semibold transition hover:bg-white"
                  >
                    {t("retailDownloadFeed")}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ) : null}

            {status === "error" ? (
              <div className="mt-8 space-y-4">
                <p className="text-sm text-[var(--landing-muted)]">
                  {t("retailDownloadUnavailable")}
                </p>
                <a
                  href={CONTACT_MAIL}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--landing-ink)] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--landing-accent)]"
                >
                  {t("retailContact")}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ) : null}
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight sm:text-4xl">
              {t("retailFinalTitle")}
            </h2>
            <p className="mt-3 text-base text-[var(--landing-muted)] sm:mt-4 sm:text-lg">
              {t("retailFinalBody")}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {installerHref ? (
                <a
                  href={installerHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--landing-accent)] px-8 py-4 text-base font-semibold text-white transition hover:brightness-110"
                >
                  <Download className="h-5 w-5" />
                  {t("retailDownloadCta")}
                </a>
              ) : null}
              <a
                href={CONTACT_MAIL}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--landing-ink)] px-8 py-4 text-base font-semibold text-white transition hover:bg-[var(--landing-accent)]"
              >
                {t("retailCtaPrimary")}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--landing-line)] bg-[var(--landing-paper)]/80 px-4 py-10 text-center text-sm text-[var(--landing-muted)] sm:px-6">
        <p>
          <a href={HUB_URL} className="font-medium text-[var(--landing-ink)] hover:underline">
            MayleSoft
          </a>
          {" · "}
          {t("retailFooterCredit")}
        </p>
      </footer>
    </div>
  );
}
