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

function overviewLinks(role: string | undefined) {
  const isPlatformAdmin = role === "PLATFORM_ADMIN";
  return [
    {
      href: "/restaurants",
      title: isPlatformAdmin ? "Restaurants" : "Branches",
      body: isPlatformAdmin
        ? "Create restaurants and branches."
        : "Add and manage branches for your restaurant.",
    },
    {
      href: "/tables",
      title: "Tables",
      body: "Create tables and copy customer QR links.",
    },
    {
      href: "/devices",
      title: "Devices",
      body: "Create kitchen/waiter devices; pair with short-lived QR codes.",
    },
    {
      href: "/menu",
      title: "Menu",
      body: "Add categories and items for the QR menu.",
    },
  ];
}

export function OverviewPage() {
  const user = getStoredUser();
  const LINKS = overviewLinks(user?.role);
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
        title="Overview"
        subtitle={`Signed in as ${user?.email ?? "…"} (${user?.role ?? "…"})`}
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
        <StatCard label="Tables" value={tablesQuery.data?.length ?? "—"} />
        <StatCard label="Devices" value={devicesQuery.data?.length ?? "—"} />
        <StatCard
          label="Categories"
          value={categoriesQuery.data?.length ?? "—"}
        />
      </div>

      <section className="mb-8">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Kitchen service</h2>
            <p className="text-sm text-[var(--muted)]">
              Live ticket pressure for the selected branch
            </p>
          </div>
          {!branchId ? (
            <p className="text-sm text-[var(--muted)]">Select a branch</p>
          ) : null}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard label="New" value={kitchen?.new ?? "—"} />
          <StatCard label="Preparing" value={kitchen?.preparing ?? "—"} />
          <StatCard label="Ready" value={kitchen?.ready ?? "—"} />
          <StatCard
            label="Avg prep"
            value={
              kitchen?.averagePrepTimeMinutes != null
                ? `${kitchen.averagePrepTimeMinutes}m`
                : "—"
            }
          />
          <StatCard
            label="Oldest ticket"
            value={
              kitchen ? `${kitchen.longestWaitingMinutes}m` : "—"
            }
            hot={!!kitchen && kitchen.longestWaitingMinutes >= 12}
          />
        </div>
        {kitchen ? (
          <p className="mt-3 text-sm text-[var(--muted)]">
            {kitchen.open} open · avg wait {kitchen.averageWaitMinutes}m ·{" "}
            {kitchen.accepted} accepted
          </p>
        ) : null}
      </section>

      <section className="mb-8">
        <div className="mb-3">
          <h2 className="text-lg font-semibold">Latency SLOs</h2>
          <p className="text-sm text-[var(--muted)]">
            4h lookback · prep PREPARING→READY · pay created→paid · scrape{" "}
            <code className="text-xs">/api/metrics</code>
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Prep p95"
            value={
              kitchen?.prepP95Seconds != null
                ? formatSeconds(kitchen.prepP95Seconds)
                : "—"
            }
            hot={kitchen?.prepSlo === "breach"}
          />
          <StatCard
            label="Prep SLO"
            value={sloLabel(kitchen?.prepSlo)}
            hot={kitchen?.prepSlo === "breach"}
          />
          <StatCard
            label="Pay settle p95"
            value={
              kitchen?.paymentSettleP95Seconds != null
                ? formatSeconds(kitchen.paymentSettleP95Seconds)
                : "—"
            }
            hot={kitchen?.paymentSlo === "breach"}
          />
          <StatCard
            label="Pay SLO"
            value={sloLabel(kitchen?.paymentSlo)}
            hot={kitchen?.paymentSlo === "breach"}
          />
        </div>
        {kitchen ? (
          <p className="mt-3 text-sm text-[var(--muted)]">
            Thresholds · prep {formatSeconds(kitchen.sloPrepThresholdSeconds)} ·
            pay {formatSeconds(kitchen.sloPaymentThresholdSeconds)}
            {kitchen.averagePaymentSettleSeconds != null
              ? ` · avg settle ${formatSeconds(kitchen.averagePaymentSettleSeconds)}`
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
        <h2 className="font-semibold">Quick ops loop</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[var(--muted)]">
          <li>Create a table and copy its QR ordering link.</li>
          <li>Create KITCHEN and WAITER devices; pair tokens on those apps.</li>
          <li>Keep the menu current so customers can order.</li>
        </ol>
      </div>
    </div>
  );
}

function formatSeconds(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return s === 0 ? `${m}m` : `${m}m ${s}s`;
}

function sloLabel(
  status: "ok" | "breach" | "insufficient_data" | undefined,
): string {
  if (status === "ok") return "OK";
  if (status === "breach") return "Breach";
  if (status === "insufficient_data") return "No data";
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
