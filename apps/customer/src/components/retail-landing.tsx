"use client";

import * as React from "react";
import Image from "next/image";
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
import { RetailCinematicBackdrop } from "@/components/retail-cinematic-backdrop";
import { LanguageSwitcher, useLocale } from "@/lib/i18n/locale-provider";
import type { MessageKey } from "@/lib/i18n/messages";
import { mayleSoftHubOrigin } from "@/lib/tenant-host";

const ROOT_DOMAIN =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN?.trim() || "maylesoft.com";
const HUB_URL = mayleSoftHubOrigin(ROOT_DOMAIN);
const CONTACT_MAIL =
  "mailto:contact@maylesoft.com?subject=MayleSoft%20Retail%20demo";
const UPDATE_FEED_PATH = "/latest.json";

const APP_SHOTS = [
  {
    src: "/images/retail/dashboard.png",
    labelKey: "retailScreenDashboard" as const,
  },
  {
    src: "/images/retail/categories.png",
    labelKey: "retailScreenCategories" as const,
  },
] as const;

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

function AppScreenshot({
  src,
  label,
  priority = false,
  float = true,
  className = "",
}: {
  src: string;
  label: string;
  priority?: boolean;
  float?: boolean;
  className?: string;
}) {
  return (
    <figure className={`group ${className}`}>
      <div
        className={`retail-screen-frame overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#0b1220] ${
          float ? "landing-float" : ""
        }`}
      >
        <Image
          src={src}
          alt={label}
          width={1280}
          height={800}
          priority={priority}
          className="h-auto w-full object-cover object-top"
        />
      </div>
      <figcaption className="mt-3 text-center text-sm font-medium text-[var(--retail-muted)]">
        {label}
      </figcaption>
    </figure>
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
      className="retail-page landing-page relative isolate min-h-screen overflow-x-hidden text-[var(--retail-ink)]"
      dir={dir}
    >
      <section className="relative isolate overflow-hidden">
        <RetailCinematicBackdrop tone="hero" />

        <header className="relative z-20 border-b border-white/10 bg-[#070b14]/45 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:flex-nowrap sm:px-6 sm:py-4">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand/maylesoft-logo.png"
                alt="MayleSoft"
                className="h-11 w-11 rounded-2xl object-cover shadow-sm ring-1 ring-white/15"
              />
              <span className="truncate font-[family-name:var(--font-display)] text-lg tracking-tight text-white sm:text-2xl">
                {t("retailBrand")}
              </span>
            </Link>
            <div className="flex w-full items-center gap-2 sm:w-auto sm:justify-end sm:gap-3">
              <LanguageSwitcher />
              <a
                href="#download"
                className="inline-flex items-center justify-center rounded-full bg-[var(--retail-accent-strong)] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
              >
                {t("retailDownloadCta")}
              </a>
            </div>
          </div>
        </header>

        <div className="relative z-10 px-4 pb-20 pt-12 sm:px-6 sm:pb-28 sm:pt-16">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--retail-accent)]">
                {t("retailEyebrow")}
              </p>
              <h1 className="mt-4 max-w-xl text-balance font-[family-name:var(--font-display)] text-[2.35rem] leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
                {t("retailTitle")}
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--retail-muted)] sm:text-lg">
                {t("retailLead")}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={installerHref ?? "#download"}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--retail-accent-strong)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#0ea5e9]/30 transition hover:brightness-110"
                >
                  <Download className="h-4 w-4" />
                  {t("retailDownloadCta")}
                </a>
                <a
                  href="#screens"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/12"
                >
                  {t("retailCtaSecondary")}
                </a>
              </div>
              <p className="mt-5 flex items-center gap-2 text-sm text-[var(--retail-muted)]">
                <Monitor className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                {t("retailPlatformNote")}
              </p>
            </div>

            <AppScreenshot
              src={APP_SHOTS[0].src}
              label={t(APP_SHOTS[0].labelKey)}
              priority
            />
          </div>
        </div>
      </section>

      <main className="relative z-10 bg-[var(--landing-paper)] text-[var(--landing-ink)]">
        <section
          id="screens"
          className="border-b border-[var(--landing-line)] px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-[var(--landing-accent)]">
              {t("retailScreensEyebrow")}
            </p>
            <h2 className="mt-3 text-center font-[family-name:var(--font-display)] text-2xl tracking-tight sm:text-4xl">
              {t("retailScreensTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-[var(--landing-muted)]">
              {t("retailScreensBody")}
            </p>
            <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
              {APP_SHOTS.map(({ src, labelKey }) => (
                <AppScreenshot
                  key={src}
                  src={src}
                  label={t(labelKey)}
                  float={false}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          id="features"
          className="border-b border-[var(--landing-line)] bg-white/35 px-4 py-16 sm:px-6 sm:py-24"
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

        <section id="download" className="px-4 py-16 sm:px-6 sm:py-24">
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

        <section className="border-t border-[var(--landing-line)] px-4 py-16 sm:px-6 sm:py-20">
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

      <footer className="relative z-10 border-t border-[var(--landing-line)] bg-[var(--landing-paper)] px-4 py-8 text-center text-sm text-[var(--landing-muted)] sm:px-6">
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
