"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";
import { PageHeader } from "@/components/page-header";
import {
  ReportMetricCard,
  ReportPageShell,
  reportPanelClass,
} from "@/components/report-page-shell";
import { Button } from "@/components/ui/button";
import { useSelectedBranch } from "@/hooks/use-selected-branch";
import {
  RestaurantSelect,
  useSelectedRestaurant,
} from "@/hooks/use-selected-restaurant";
import { getStoredUser } from "@/lib/session";
import { formatMoney, shortId } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/locale-provider";
import { downloadReportPdf } from "@/lib/export-report-pdf";

const PAGE_SIZE = 100;

function formatDateInput(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function todayInput() {
  return formatDateInput(new Date());
}

function startOfMonthInput(d = new Date()) {
  return formatDateInput(new Date(d.getFullYear(), d.getMonth(), 1));
}

function startOfYearInput(d = new Date()) {
  return formatDateInput(new Date(d.getFullYear(), 0, 1));
}

function lastYearFromInput(d = new Date()) {
  const y = d.getFullYear() - 1;
  return `${y}-01-01`;
}

function lastYearToInput(d = new Date()) {
  const y = d.getFullYear() - 1;
  return `${y}-12-31`;
}

function csvEscape(value: string | number) {
  const s = String(value);
  if (/[",\n]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

/** e.g. Monday 01.02.2021, 14:00 */
function formatSoldAt(iso: string, locale?: string) {
  const d = new Date(iso);
  const weekday = d.toLocaleDateString(locale || undefined, { weekday: "long" });
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const capitalized =
    weekday.charAt(0).toUpperCase() + weekday.slice(1);
  return `${capitalized} ${day}.${month}.${year}, ${hours}:${minutes}`;
}

export function SalesReportPage() {
  const { t, locale } = useLocale();
  const dateLocale =
    locale === "fi"
      ? "fi-FI"
      : locale === "ar"
        ? "ar"
        : locale === "so"
          ? "so-SO"
          : "en-GB";

  function formatLineDate(iso: string) {
    return formatSoldAt(iso, dateLocale);
  }
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
  const [from, setFrom] = React.useState(lastYearFromInput);
  const [to, setTo] = React.useState(lastYearToInput);
  const [page, setPage] = React.useState(0);
  const [selectedProduct, setSelectedProduct] = React.useState<{
    productName: string;
    categoryName: string;
  } | null>(null);
  const detailRef = React.useRef<HTMLElement | null>(null);

  const isPlatformAdmin = user?.role === "PLATFORM_ADMIN";

  React.useEffect(() => {
    setPage(0);
    setSelectedProduct(null);
  }, [restaurantId, branchId, from, to]);

  React.useEffect(() => {
    setPage(0);
  }, [selectedProduct]);

  const reportQuery = useQuery({
    queryKey: [
      "product-sales",
      restaurantId,
      branchId,
      from,
      to,
      page,
      selectedProduct?.productName,
      selectedProduct?.categoryName,
    ],
    queryFn: () =>
      adminApi.productSales({
        restaurantId: restaurantId || undefined,
        branchId: branchId || undefined,
        from: from || undefined,
        to: to || undefined,
        skip: page * PAGE_SIZE,
        take: PAGE_SIZE,
        productName: selectedProduct?.productName,
        categoryName: selectedProduct?.categoryName,
      }),
    enabled: !!restaurantId,
  });

  const report = reportQuery.data;
  const currency = report?.currency ?? "EUR";
  const linesTotal = report?.linesTotal ?? 0;
  const totalPages = Math.max(1, Math.ceil(linesTotal / PAGE_SIZE));
  const rangeFrom = linesTotal === 0 ? 0 : page * PAGE_SIZE + 1;
  const rangeTo = Math.min(linesTotal, (page + 1) * PAGE_SIZE);
  const restaurantName =
    restaurants.find((r) => r.id === restaurantId)?.name ?? "";

  const byProductTotals = React.useMemo(() => {
    const rows = report?.byProduct ?? [];
    return rows.reduce(
      (acc, row) => {
        acc.quantitySold += row.quantitySold;
        acc.grossTotal = Number((acc.grossTotal + row.grossTotal).toFixed(2));
        acc.netExTax = Number((acc.netExTax + row.netExTax).toFixed(2));
        acc.taxAmount = Number((acc.taxAmount + row.taxAmount).toFixed(2));
        return acc;
      },
      { quantitySold: 0, grossTotal: 0, netExTax: 0, taxAmount: 0 },
    );
  }, [report?.byProduct]);

  function selectProduct(productName: string, categoryName: string) {
    setSelectedProduct({ productName, categoryName });
    window.setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function clearProductFilter() {
    setSelectedProduct(null);
  }

  async function exportCsv() {
    const full = await adminApi.productSales({
      restaurantId: restaurantId || undefined,
      branchId: branchId || undefined,
      from: from || undefined,
      to: to || undefined,
      productName: selectedProduct?.productName,
      categoryName: selectedProduct?.categoryName,
    });
    const lines = full.lines ?? [];
    const header = [
      t("salesColProduct"),
      t("salesColCategory"),
      t("salesColQty"),
      t("salesColTaxRate"),
      t("salesColNet"),
      t("salesColTax"),
      t("salesColTotal"),
      t("salesColPaymentId"),
      t("salesColCashier"),
      t("salesColDate"),
    ];
    const rows = lines.map((line) => [
      line.productName,
      line.categoryName,
      line.quantity,
      `${line.taxRatePercent}%`,
      line.netExTax,
      line.taxAmount,
      line.grossTotal,
      line.paymentId,
      line.cashierName ?? "",
      formatLineDate(line.soldAt),
    ]);
    const totalRow = [
      t("salesTotalRow"),
      "",
      full.summary.quantitySold,
      `${full.taxRatePercent}%`,
      full.summary.netExTax,
      full.summary.taxAmount,
      full.summary.grossTotal,
      "",
      "",
      "",
    ];
    const csv = [header, ...rows, totalRow]
      .map((row) => row.map(csvEscape).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `product-sales-${from || "all"}-${to || "all"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function exportPdf() {
    const full = await adminApi.productSales({
      restaurantId: restaurantId || undefined,
      branchId: branchId || undefined,
      from: from || undefined,
      to: to || undefined,
      productName: selectedProduct?.productName,
      categoryName: selectedProduct?.categoryName,
    });

    const money = (n: number) => formatMoney(n, full.currency);
    const productLabel = selectedProduct
      ? t("salesProductDetail", { product: selectedProduct.productName })
      : t("salesTitle");

    downloadReportPdf({
      filename: `product-sales-${selectedProduct?.productName ?? "all"}-${from || "all"}-${to || "all"}.pdf`,
      title: productLabel,
      subtitle: restaurantName,
      meta: [
        `${t("ledgerFrom")}: ${from || "—"}  ${t("ledgerTo")}: ${to || "—"}`,
        selectedProduct
          ? `${t("salesColCategory")}: ${selectedProduct.categoryName}`
          : "",
        `${t("salesSummaryQty")}: ${full.summary.quantitySold}  ${t("salesColNet")}: ${money(full.summary.netExTax)}  ${t("salesColTax")}: ${money(full.summary.taxAmount)}  ${t("salesColTotal")}: ${money(full.summary.grossTotal)}`,
      ].filter(Boolean),
      sections: [
        {
          title: t("salesByProduct"),
          head: [
            [
              t("salesColProduct"),
              t("salesColCategory"),
              t("salesColQty"),
              t("salesColTaxRate"),
              t("salesColNet"),
              t("salesColTax"),
              t("salesColTotal"),
            ],
          ],
          body: full.byProduct.map((row) => [
            row.productName,
            row.categoryName,
            row.quantitySold,
            `${full.taxRatePercent}%`,
            money(row.netExTax),
            money(row.taxAmount),
            money(row.grossTotal),
          ]),
          foot: [
            [
              t("salesTotalRow"),
              "",
              full.summary.quantitySold,
              `${full.taxRatePercent}%`,
              money(full.summary.netExTax),
              money(full.summary.taxAmount),
              money(full.summary.grossTotal),
            ],
          ],
        },
        {
          title: t("salesDetailLines"),
          head: [
            [
              t("salesColProduct"),
              t("salesColCategory"),
              t("salesColQty"),
              t("salesColTaxRate"),
              t("salesColNet"),
              t("salesColTax"),
              t("salesColTotal"),
              t("salesColPaymentId"),
              t("salesColCashier"),
              t("salesColDate"),
            ],
          ],
          body: full.lines.map((line) => [
            line.productName,
            line.categoryName,
            line.quantity,
            `${line.taxRatePercent}%`,
            money(line.netExTax),
            money(line.taxAmount),
            money(line.grossTotal),
            shortId(line.paymentId),
            line.cashierName ?? "—",
            formatLineDate(line.soldAt),
          ]),
          foot: [
            [
              t("salesTotalRow"),
              "",
              full.summary.quantitySold,
              `${full.taxRatePercent}%`,
              money(full.summary.netExTax),
              money(full.summary.taxAmount),
              money(full.summary.grossTotal),
              "",
              "",
              "",
            ],
          ],
        },
      ],
    });
  }

  function applyLastYear() {
    setFrom(lastYearFromInput());
    setTo(lastYearToInput());
  }

  return (
    <ReportPageShell>
    <div className="space-y-6">
      <PageHeader title={t("salesTitle")} subtitle={t("salesSubtitle")} />

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
            onChange={(e) => setBranchId(e.target.value)}
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
            onChange={(e) => setFrom(e.target.value)}
            className="rounded border border-[var(--line)] bg-[var(--paper)] px-2 py-1"
          />
        </label>
        <label className="flex flex-col text-sm">
          {t("ledgerTo")}
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="rounded border border-[var(--line)] bg-[var(--paper)] px-2 py-1"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={applyLastYear}
          >
            {t("salesPresetLastYear")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const d = todayInput();
              setFrom(d);
              setTo(d);
            }}
          >
            {t("salesPresetToday")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setFrom(startOfMonthInput());
              setTo(todayInput());
            }}
          >
            {t("salesPresetMonth")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setFrom(startOfYearInput());
              setTo(todayInput());
            }}
          >
            {t("salesPresetYear")}
          </Button>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => void exportCsv()}
          disabled={!linesTotal}
        >
          {t("ledgerExportCsv")}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => void exportPdf()}
          disabled={!linesTotal}
        >
          {t("exportPdf")}
        </Button>
      </div>

      {reportQuery.isLoading ? (
        <p className="text-sm text-[var(--muted)]">{t("salesLoading")}</p>
      ) : null}

      {report ? (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <ReportMetricCard
              label={t("salesSummaryQty")}
              value={String(report.summary.quantitySold)}
              tone="gold"
              align="center"
            />
            <ReportMetricCard
              label={t("salesColNet")}
              value={formatMoney(report.summary.netExTax, currency)}
              tone="olive"
              align="center"
            />
            <ReportMetricCard
              label={t("salesColTax")}
              value={formatMoney(report.summary.taxAmount, currency)}
              hint={t("ledgerTaxRate", { rate: report.taxRatePercent })}
              tone="sky"
              align="center"
            />
            <ReportMetricCard
              label={t("salesColTotal")}
              value={formatMoney(report.summary.grossTotal, currency)}
              tone="emerald"
              align="center"
            />
          </div>

          {report.byProduct.length > 0 ? (
            <section>
              <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
                <h2 className="text-sm font-semibold text-[var(--muted)]">
                  {t("salesByProduct")}
                </h2>
                <p className="text-xs text-[var(--muted)]">
                  {t("salesClickProduct")}
                </p>
              </div>
              <div className={`overflow-x-auto ${reportPanelClass}`}>
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-[var(--surface-2)] text-left">
                      <th className="px-3 py-2">{t("salesColProduct")}</th>
                      <th className="px-3 py-2">{t("salesColCategory")}</th>
                      <th className="px-3 py-2 text-right">{t("salesColQty")}</th>
                      <th className="px-3 py-2 text-right">{t("salesColTaxRate")}</th>
                      <th className="px-3 py-2 text-right">{t("salesColNet")}</th>
                      <th className="px-3 py-2 text-right">{t("salesColTax")}</th>
                      <th className="px-3 py-2 text-right">{t("salesColTotal")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.byProduct.map((row) => {
                      const active =
                        selectedProduct?.productName === row.productName &&
                        selectedProduct?.categoryName === row.categoryName;
                      return (
                        <tr
                          key={`${row.categoryName}-${row.productName}`}
                          className={`border-t border-[var(--line)] cursor-pointer transition ${
                            active
                              ? "bg-emerald-50/90 ring-1 ring-inset ring-emerald-300"
                              : "hover:bg-amber-50/70"
                          }`}
                          onClick={() =>
                            selectProduct(row.productName, row.categoryName)
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              selectProduct(row.productName, row.categoryName);
                            }
                          }}
                          tabIndex={0}
                          role="button"
                          aria-pressed={active}
                        >
                          <td className="px-3 py-2 font-medium text-[var(--accent)] underline-offset-2 hover:underline">
                            {row.productName}
                          </td>
                          <td className="px-3 py-2 text-[var(--muted)]">
                            {row.categoryName}
                          </td>
                          <td className="px-3 py-2 text-right tabular-nums">
                            {row.quantitySold}
                          </td>
                          <td className="px-3 py-2 text-right tabular-nums">
                            {report.taxRatePercent}%
                          </td>
                          <td className="px-3 py-2 text-right font-mono">
                            {formatMoney(row.netExTax, currency)}
                          </td>
                          <td className="px-3 py-2 text-right font-mono">
                            {formatMoney(row.taxAmount, currency)}
                          </td>
                          <td className="px-3 py-2 text-right font-mono">
                            {formatMoney(row.grossTotal, currency)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-[var(--line)] bg-[var(--surface-2)] font-semibold">
                      <td className="px-3 py-2">{t("salesTotalRow")}</td>
                      <td className="px-3 py-2" />
                      <td className="px-3 py-2 text-right tabular-nums">
                        {byProductTotals.quantitySold}
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums">
                        {report.taxRatePercent}%
                      </td>
                      <td className="px-3 py-2 text-right font-mono">
                        {formatMoney(byProductTotals.netExTax, currency)}
                      </td>
                      <td className="px-3 py-2 text-right font-mono">
                        {formatMoney(byProductTotals.taxAmount, currency)}
                      </td>
                      <td className="px-3 py-2 text-right font-mono">
                        {formatMoney(byProductTotals.grossTotal, currency)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </section>
          ) : null}

          <section ref={detailRef}>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-[var(--muted)]">
                  {selectedProduct
                    ? t("salesProductDetail", {
                        product: selectedProduct.productName,
                      })
                    : t("salesDetailLines")}
                </h2>
                {selectedProduct ? (
                  <p className="text-xs text-[var(--muted)]">
                    {selectedProduct.categoryName}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {selectedProduct ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={clearProductFilter}
                  >
                    {t("salesShowAllProducts")}
                  </Button>
                ) : null}
                {linesTotal > 0 ? (
                  <span className="text-xs text-[var(--muted)]">
                    {t("salesShowingLines", {
                      from: rangeFrom,
                      to: rangeTo,
                      total: linesTotal,
                    })}
                  </span>
                ) : null}
              </div>
            </div>
            {linesTotal === 0 ? (
              <p className="text-sm text-[var(--muted)]">{t("salesNoLines")}</p>
            ) : (
              <>
                <div className={`overflow-x-auto ${reportPanelClass}`}>
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-[var(--surface-2)] text-left">
                        <th className="px-3 py-2">{t("salesColProduct")}</th>
                        <th className="px-3 py-2">{t("salesColCategory")}</th>
                        <th className="px-3 py-2 text-right">{t("salesColQty")}</th>
                        <th className="px-3 py-2 text-right">{t("salesColTaxRate")}</th>
                        <th className="px-3 py-2 text-right">{t("salesColNet")}</th>
                        <th className="px-3 py-2 text-right">{t("salesColTax")}</th>
                        <th className="px-3 py-2 text-right">{t("salesColTotal")}</th>
                        <th className="px-3 py-2">{t("salesColPaymentId")}</th>
                        <th className="px-3 py-2">{t("salesColCashier")}</th>
                        <th className="px-3 py-2">{t("salesColDate")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.lines.map((line, index) => (
                        <tr
                          key={`${line.orderId}-${line.productName}-${index}`}
                          className="border-t border-[var(--line)]"
                        >
                          <td className="px-3 py-2">{line.productName}</td>
                          <td className="px-3 py-2 text-[var(--muted)]">
                            {line.categoryName}
                          </td>
                          <td className="px-3 py-2 text-right tabular-nums">
                            {line.quantity}
                          </td>
                          <td className="px-3 py-2 text-right tabular-nums">
                            {line.taxRatePercent}%
                          </td>
                          <td className="px-3 py-2 text-right font-mono">
                            {formatMoney(line.netExTax, currency)}
                          </td>
                          <td className="px-3 py-2 text-right font-mono">
                            {formatMoney(line.taxAmount, currency)}
                          </td>
                          <td className="px-3 py-2 text-right font-mono">
                            {formatMoney(line.grossTotal, currency)}
                          </td>
                          <td
                            className="px-3 py-2 font-mono text-xs text-[var(--muted)]"
                            title={line.paymentId}
                          >
                            {shortId(line.paymentId)}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            {line.cashierName ?? "—"}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-[var(--muted)]">
                            {formatLineDate(line.soldAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-[var(--line)] bg-[var(--surface-2)] font-semibold">
                        <td className="px-3 py-2">{t("salesTotalRow")}</td>
                        <td className="px-3 py-2" />
                        <td className="px-3 py-2 text-right tabular-nums">
                          {report.summary.quantitySold}
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums">
                          {report.taxRatePercent}%
                        </td>
                        <td className="px-3 py-2 text-right font-mono">
                          {formatMoney(report.summary.netExTax, currency)}
                        </td>
                        <td className="px-3 py-2 text-right font-mono">
                          {formatMoney(report.summary.taxAmount, currency)}
                        </td>
                        <td className="px-3 py-2 text-right font-mono">
                          {formatMoney(report.summary.grossTotal, currency)}
                        </td>
                        <td className="px-3 py-2" />
                        <td className="px-3 py-2" />
                        <td className="px-3 py-2" />
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {totalPages > 1 ? (
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={page === 0}
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                    >
                      {t("ledgerPrev")}
                    </Button>
                    <span className="text-sm tabular-nums">
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
              </>
            )}
          </section>
        </>
      ) : null}
    </div>
    </ReportPageShell>
  );
}

