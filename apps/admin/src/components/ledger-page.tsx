"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";
import { PageHeader } from "@/components/page-header";
import {
  ReportMetricCard,
  ReportPageShell,
  reportCategoryTone,
  reportPanelClass,
} from "@/components/report-page-shell";
import { Button } from "@/components/ui/button";
import { useSelectedBranch } from "@/hooks/use-selected-branch";
import {
  RestaurantSelect,
  useSelectedRestaurant,
} from "@/hooks/use-selected-restaurant";
import { getStoredUser } from "@/lib/session";
import { formatMoney } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/locale-provider";
import type { MessageKey } from "@/lib/i18n/messages";
import { downloadReportPdf } from "@/lib/export-report-pdf";

const PAGE_SIZE = 50;

const CATEGORY_KEYS: Record<string, MessageKey> = {
  REVENUE: "ledgerCatRevenue",
  TIPS: "ledgerCatTips",
  REFUND: "ledgerCatRefund",
  TAX: "ledgerCatTax",
  ADJUSTMENT: "ledgerCatAdjustment",
};

const CHANNEL_KEYS: Record<string, MessageKey> = {
  CASH: "ledgerChannelCash",
  TERMINAL: "ledgerChannelTerminal",
  ONLINE: "ledgerChannelOnline",
  COUNTER: "ledgerChannelCounter",
};

function csvEscape(value: string | number) {
  const s = String(value);
  if (/[",\n]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

export function LedgerPage() {
  const { t } = useLocale();
  const user = getStoredUser();
  const {
    restaurantId,
    setRestaurantId,
    restaurants,
    isLoading: restaurantsLoading,
  } = useSelectedRestaurant();
  const { branches, isLoading: branchesLoading } =
    useSelectedBranch(restaurantId);
  const [branchId, setBranchId] = React.useState("");
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [page, setPage] = React.useState(0);

  const filterParams = {
    restaurantId: restaurantId || undefined,
    branchId: branchId || undefined,
    from: from || undefined,
    to: to || undefined,
  };

  const summaryQuery = useQuery({
    queryKey: ["ledger-summary", restaurantId, branchId, from, to],
    queryFn: () => adminApi.ledgerSummary(filterParams),
    enabled: !!restaurantId,
  });

  const entriesQuery = useQuery({
    queryKey: ["ledger-entries", restaurantId, branchId, from, to, page],
    queryFn: () =>
      adminApi.ledgerEntries({
        ...filterParams,
        skip: page * PAGE_SIZE,
        take: PAGE_SIZE,
      }),
    enabled: !!restaurantId,
  });

  const isPlatformAdmin = user?.role === "PLATFORM_ADMIN";
  const totalPages = Math.ceil((entriesQuery.data?.total ?? 0) / PAGE_SIZE);
  const summary = summaryQuery.data;
  const currency = summary?.totals.currency ?? "EUR";
  const restaurantName =
    restaurants.find((r) => r.id === restaurantId)?.name ?? "";

  function exportCsv() {
    const entries = entriesQuery.data?.entries ?? [];
    const header = [
      t("ledgerDate"),
      t("ledgerCategory"),
      t("ledgerDescription"),
      t("ledgerChannel"),
      t("ledgerDebit"),
      t("ledgerCredit"),
    ];
    const rows = entries.map((e) => [
      new Date(e.date).toISOString(),
      e.category,
      e.description,
      e.payment?.channel ?? "",
      Number(e.debit),
      Number(e.credit),
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map(csvEscape).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ledger-${from || "all"}-${to || "all"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function exportPdf() {
    if (!summary) return;

    const allEntries = await adminApi.ledgerEntries({
      ...filterParams,
      skip: 0,
      take: 50_000,
    });

    const money = (n: number) => formatMoney(n, currency);
    const channelLabel = (channel: string) =>
      t(CHANNEL_KEYS[channel] ?? "ledgerChannel");
    const categoryLabel = (category: string) =>
      t(CATEGORY_KEYS[category] ?? "ledgerCategory");

    downloadReportPdf({
      filename: `ledger-${from || "all"}-${to || "all"}.pdf`,
      title: t("ledgerTitle"),
      subtitle: restaurantName,
      meta: [
        `${t("ledgerFrom")}: ${from || "—"}  ${t("ledgerTo")}: ${to || "—"}`,
        `${t("ledgerNetSales")}: ${money(summary.totals.netSales)}  ${t("ledgerTips")}: ${money(summary.totals.tips)}  ${t("ledgerRefunds")}: ${money(summary.totals.refunds)}  ${t("ledgerTaxCollected")}: ${money(summary.totals.taxCollected)}  ${t("ledgerNetExTax")}: ${money(summary.totals.netExTax)}`,
      ],
      sections: [
        {
          title: t("ledgerByChannel"),
          head: [
            [
              t("ledgerChannel"),
              t("ledgerAmount"),
              t("ledgerTip"),
              t("ledgerPayments"),
            ],
          ],
          body: summary.salesByChannel.map((row) => [
            channelLabel(row.channel),
            money(row.amount),
            money(row.tipAmount),
            row.count,
          ]),
        },
        {
          title: t("ledgerTitle"),
          head: [
            [
              t("ledgerDate"),
              t("ledgerCategory"),
              t("ledgerDescription"),
              t("ledgerChannel"),
              t("ledgerDebit"),
              t("ledgerCredit"),
            ],
          ],
          body: allEntries.entries.map((e) => [
            new Date(e.date).toLocaleDateString(),
            categoryLabel(e.category),
            e.description,
            e.payment?.channel ? channelLabel(e.payment.channel) : "—",
            Number(e.debit) > 0 ? money(Number(e.debit)) : "",
            Number(e.credit) > 0 ? money(Number(e.credit)) : "",
          ]),
          foot: [
            [
              t("salesTotalRow"),
              "",
              "",
              "",
              money(summary.totals.revenue + summary.totals.tips),
              money(summary.totals.refunds),
            ],
          ],
        },
      ],
    });
  }

  return (
    <ReportPageShell>
    <div className="space-y-6">
      <PageHeader title={t("ledgerTitle")} subtitle={t("ledgerSubtitle")} />

      <div className="flex flex-wrap items-end gap-3">
        {isPlatformAdmin ? (
          <RestaurantSelect
            restaurantId={restaurantId}
            onChange={setRestaurantId}
            restaurants={restaurants}
            disabled={restaurantsLoading}
          />
        ) : null}
        <label className="block space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            {t("branch")}
          </span>
          <select
            value={branchId}
            onChange={(e) => {
              setBranchId(e.target.value);
              setPage(0);
            }}
            disabled={branchesLoading}
            className="h-11 w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
          >
            <option value="">{t("ledgerAllBranches")}</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col text-sm">
          {t("ledgerFrom")}
          <input
            type="date"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setPage(0);
            }}
            className="rounded border border-[var(--line)] bg-[var(--paper)] px-2 py-1"
          />
        </label>
        <label className="flex flex-col text-sm">
          {t("ledgerTo")}
          <input
            type="date"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setPage(0);
            }}
            className="rounded border border-[var(--line)] bg-[var(--paper)] px-2 py-1"
          />
        </label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={exportCsv}
          disabled={!entriesQuery.data?.entries.length}
        >
          {t("ledgerExportCsv")}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => void exportPdf()}
          disabled={!summary?.totals}
        >
          {t("exportPdf")}
        </Button>
      </div>

      {summary ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            <ReportMetricCard
              label={t("ledgerNetSales")}
              value={formatMoney(summary.totals.netSales, currency)}
              tone="emerald"
            />
            <ReportMetricCard
              label={t("ledgerTips")}
              value={formatMoney(summary.totals.tips, currency)}
              tone="amber"
            />
            <ReportMetricCard
              label={t("ledgerRefunds")}
              value={formatMoney(summary.totals.refunds, currency)}
              tone="rose"
            />
            <ReportMetricCard
              label={t("ledgerTaxCollected")}
              value={formatMoney(summary.totals.taxCollected, currency)}
              hint={t("ledgerTaxRate", {
                rate: summary.totals.taxRatePercent,
              })}
              tone="sky"
            />
            <ReportMetricCard
              label={t("ledgerNetExTax")}
              value={formatMoney(summary.totals.netExTax, currency)}
              tone="olive"
            />
          </div>

          {summary.categories.length > 0 ? (
            <div>
              <h2 className="mb-2 text-sm font-semibold text-[var(--muted)]">
                {t("ledgerByCategory")}
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {summary.categories.map((s) => (
                  <ReportMetricCard
                    key={s.category}
                    label={t(CATEGORY_KEYS[s.category] ?? "ledgerCategory")}
                    value={`+${formatMoney(s.totalDebit, currency)}`}
                    secondaryValue={
                      s.totalCredit > 0
                        ? `−${formatMoney(s.totalCredit, currency)}`
                        : undefined
                    }
                    secondaryTone={s.totalCredit > 0 ? "rose" : undefined}
                    tone={reportCategoryTone(s.category)}
                    align="center"
                  />
                ))}
              </div>
            </div>
          ) : null}

          {summary.salesByChannel.length > 0 ? (
            <div>
              <h2 className="mb-2 text-sm font-semibold text-[var(--muted)]">
                {t("ledgerByChannel")}
              </h2>
              <div className={`overflow-x-auto ${reportPanelClass}`}>
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-[var(--surface-2)] text-left">
                      <th className="px-3 py-2">{t("ledgerChannel")}</th>
                      <th className="px-3 py-2 text-right">{t("ledgerAmount")}</th>
                      <th className="px-3 py-2 text-right">{t("ledgerTip")}</th>
                      <th className="px-3 py-2 text-right">
                        {t("ledgerPayments")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.salesByChannel.map((row) => (
                      <tr key={row.channel} className="border-t border-[var(--line)]">
                        <td className="px-3 py-2">
                          {t(CHANNEL_KEYS[row.channel] ?? "ledgerChannel")}
                        </td>
                        <td className="px-3 py-2 text-right font-mono">
                          {formatMoney(row.amount, currency)}
                        </td>
                        <td className="px-3 py-2 text-right font-mono">
                          {formatMoney(row.tipAmount, currency)}
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums">
                          {row.count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className={`overflow-x-auto ${reportPanelClass}`}>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[var(--surface-2)] text-left">
              <th className="px-3 py-2">{t("ledgerDate")}</th>
              <th className="px-3 py-2">{t("ledgerCategory")}</th>
              <th className="px-3 py-2">{t("ledgerDescription")}</th>
              <th className="px-3 py-2">{t("ledgerChannel")}</th>
              <th className="px-3 py-2 text-right">{t("ledgerDebit")}</th>
              <th className="px-3 py-2 text-right">{t("ledgerCredit")}</th>
            </tr>
          </thead>
          <tbody>
            {entriesQuery.data?.entries.map((e) => (
              <tr key={e.id} className="border-t border-[var(--line)]">
                <td className="whitespace-nowrap px-3 py-2">
                  {new Date(e.date).toLocaleDateString()}
                </td>
                <td className="px-3 py-2">
                  {t(CATEGORY_KEYS[e.category] ?? "ledgerCategory")}
                </td>
                <td className="px-3 py-2">{e.description}</td>
                <td className="px-3 py-2">
                  {e.payment?.channel
                    ? t(CHANNEL_KEYS[e.payment.channel] ?? "ledgerChannel")
                    : "—"}
                </td>
                <td className="px-3 py-2 text-right font-mono">
                  {Number(e.debit) > 0
                    ? formatMoney(Number(e.debit), currency)
                    : ""}
                </td>
                <td className="px-3 py-2 text-right font-mono text-[var(--danger)]">
                  {Number(e.credit) > 0
                    ? formatMoney(Number(e.credit), currency)
                    : ""}
                </td>
              </tr>
            ))}
            {entriesQuery.data?.entries.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-3 py-8 text-center text-[var(--muted)]"
                >
                  {t("ledgerNoEntries")}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {totalPages > 1 ? (
        <div className="flex items-center justify-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            {t("ledgerPrev")}
          </Button>
          <span className="text-sm">
            {page + 1} / {totalPages}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            {t("ledgerNext")}
          </Button>
        </div>
      ) : null}
    </div>
    </ReportPageShell>
  );
}

