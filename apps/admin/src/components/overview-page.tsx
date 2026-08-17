"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";
import { getStoredUser } from "@/lib/session";
import { PageHeader } from "@/components/page-header";
import {
  BranchSelect,
  useSelectedBranch,
} from "@/hooks/use-selected-branch";
import {
  RestaurantSelect,
  useSelectedRestaurant,
} from "@/hooks/use-selected-restaurant";
import { useLocale } from "@/lib/i18n/locale-provider";
import { ROLE_MESSAGE } from "@/lib/i18n/labels";
import type { MessageKey } from "@/lib/i18n/messages";

function overviewLinks(
  role: string | undefined,
  t: (key: MessageKey) => string,
) {
  const isPlatformAdmin = role === "PLATFORM_ADMIN";
  return [
    {
      href: "/restaurants",
      title: isPlatformAdmin ? t("navRestaurants") : t("navBranches"),
      body: isPlatformAdmin
        ? t("overviewLinkRestaurantsBody")
        : t("overviewLinkBranchesBody"),
    },
    {
      href: "/tables",
      title: t("navTables"),
      body: t("overviewLinkTablesBody"),
    },
    {
      href: "/devices",
      title: t("navDevices"),
      body: t("overviewLinkDevicesBody"),
    },
    {
      href: "/menu",
      title: t("navMenu"),
      body: t("overviewLinkMenuBody"),
    },
  ];
}

export function OverviewPage() {
  const { t } = useLocale();
  const user = getStoredUser();
  const roleLabel = user?.role
    ? ROLE_MESSAGE[user.role]
      ? t(ROLE_MESSAGE[user.role])
      : user.role
    : "…";
  const LINKS = overviewLinks(user?.role, t);
  const {
    restaurantId,
    setRestaurantId,
    restaurants,
    isLoading: restaurantsLoading,
  } = useSelectedRestaurant();
  const { branchId, setBranchId, branches, isLoading: branchesLoading } =
    useSelectedBranch(restaurantId);

  const tablesQuery = useQuery({
    queryKey: ["admin-tables", branchId],
    queryFn: () => adminApi.listTables(branchId),
    enabled: !!branchId,
  });
  const devicesQuery = useQuery({
    queryKey: ["admin-devices", branchId],
    queryFn: () => adminApi.listDevices(branchId),
    enabled: !!branchId,
  });
  const categoriesQuery = useQuery({
    queryKey: ["admin-categories", restaurantId],
    queryFn: () => adminApi.listCategories(restaurantId),
    enabled: !!restaurantId,
  });
  const kitchenQuery = useQuery({
    queryKey: ["admin-kitchen-dashboard", branchId],
    queryFn: () => adminApi.kitchenDashboard(branchId),
    enabled: !!branchId,
    refetchInterval: 20_000,
  });

  const kitchen = kitchenQuery.data;

  return (
    <div>
      <PageHeader
        title={t("overviewTitle")}
        subtitle={t("overviewSignedIn", {
          email: user?.email ?? "…",
          role: roleLabel,
        })}
      />

      <div className="mb-6 grid max-w-3xl gap-3 md:grid-cols-2">
        <RestaurantSelect
          restaurantId={restaurantId}
          onChange={setRestaurantId}
          restaurants={restaurants}
          disabled={restaurantsLoading}
        />
        <BranchSelect
          branchId={branchId}
          onChange={setBranchId}
          branches={branches}
          disabled={branchesLoading || !restaurantId}
        />
      </div>
      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        <StatCard
          label={t("navTables")}
          value={tablesQuery.data?.length ?? "—"}
        />
        <StatCard
          label={t("navDevices")}
          value={devicesQuery.data?.length ?? "—"}
        />
        <StatCard
          label={t("categories")}
          value={categoriesQuery.data?.length ?? "—"}
        />
      </div>

      <section className="mb-8">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">{t("kitchenService")}</h2>
            <p className="text-sm text-[var(--muted)]">
              {t("kitchenServiceBody")}
            </p>
          </div>
          {!branchId ? (
            <p className="text-sm text-[var(--muted)]">{t("selectABranch")}</p>
          ) : null}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard label={t("kitchenNew")} value={kitchen?.new ?? "—"} />
          <StatCard
            label={t("kitchenPreparing")}
            value={kitchen?.preparing ?? "—"}
          />
          <StatCard label={t("kitchenReady")} value={kitchen?.ready ?? "—"} />
          <StatCard
            label={t("kitchenAvgPrep")}
            value={
              kitchen?.averagePrepTimeMinutes != null
                ? t("minutesUnit", { m: kitchen.averagePrepTimeMinutes })
                : "—"
            }
          />
          <StatCard
            label={t("kitchenOldestTicket")}
            value={
              kitchen
                ? t("minutesUnit", { m: kitchen.longestWaitingMinutes })
                : "—"
            }
            hot={!!kitchen && kitchen.longestWaitingMinutes >= 12}
          />
        </div>
        {kitchen ? (
          <p className="mt-3 text-sm text-[var(--muted)]">
            {t("kitchenOpenSummary", {
              open: kitchen.open,
              wait: kitchen.averageWaitMinutes,
              accepted: kitchen.accepted,
            })}
          </p>
        ) : null}
      </section>

      <section className="mb-8">
        <div className="mb-3">
          <h2 className="text-lg font-semibold">{t("latencySlos")}</h2>
          <p className="text-sm text-[var(--muted)]">{t("latencySlosBody")}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label={t("prepP95")}
            value={
              kitchen?.prepP95Seconds != null
                ? formatSeconds(kitchen.prepP95Seconds, t)
                : "—"
            }
            hot={kitchen?.prepSlo === "breach"}
          />
          <StatCard
            label={t("prepSlo")}
            value={sloLabel(kitchen?.prepSlo, t)}
            hot={kitchen?.prepSlo === "breach"}
          />
          <StatCard
            label={t("paySettleP95")}
            value={
              kitchen?.paymentSettleP95Seconds != null
                ? formatSeconds(kitchen.paymentSettleP95Seconds, t)
                : "—"
            }
            hot={kitchen?.paymentSlo === "breach"}
          />
          <StatCard
            label={t("paySlo")}
            value={sloLabel(kitchen?.paymentSlo, t)}
            hot={kitchen?.paymentSlo === "breach"}
          />
        </div>
        {kitchen ? (
          <p className="mt-3 text-sm text-[var(--muted)]">
            {t("sloThresholds", {
              prep: formatSeconds(kitchen.sloPrepThresholdSeconds, t),
              pay: formatSeconds(kitchen.sloPaymentThresholdSeconds, t),
            })}
            {kitchen.averagePaymentSettleSeconds != null
              ? t("sloAvgSettle", {
                  settle: formatSeconds(
                    kitchen.averagePaymentSettleSeconds,
                    t,
                  ),
                })
              : ""}
          </p>
        ) : null}
      </section>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent)]"
          >
            <h2 className="text-lg font-semibold">{link.title}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{link.body}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
        <h2 className="font-semibold">{t("quickOps")}</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[var(--muted)]">
          <li>{t("quickOps1")}</li>
          <li>{t("quickOps2")}</li>
          <li>{t("quickOps3")}</li>
        </ol>
      </div>
    </div>
  );
}

function formatSeconds(
  seconds: number,
  t: (key: MessageKey, vars?: Record<string, string | number>) => string,
): string {
  if (seconds < 60) return t("secondsUnit", { n: Math.round(seconds) });
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return s === 0
    ? t("minutesUnit", { m })
    : t("minutesSeconds", { m, s });
}

function sloLabel(
  status: "ok" | "breach" | "insufficient_data" | undefined,
  t: (key: MessageKey) => string,
): string {
  if (status === "ok") return t("sloOk");
  if (status === "breach") return t("sloBreach");
  if (status === "insufficient_data") return t("sloNoData");
  return "—";
}

function StatCard({
  label,
  value,
  hot = false,
}: {
  label: string;
  value: string | number;
  hot?: boolean;
}) {
  return (
    <div
      className={
        hot
          ? "rounded-xl border border-[var(--danger)] bg-[var(--danger-soft)] px-4 py-5"
          : "rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-5"
      }
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-2 font-[family-name:var(--font-display)] text-3xl tracking-tight">
        {value}
      </p>
    </div>
  );
}
