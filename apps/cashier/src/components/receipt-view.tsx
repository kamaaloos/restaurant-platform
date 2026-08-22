"use client";

import * as React from "react";
import { formatMoney, formatWalkInQueueCode, shortId } from "@/lib/utils";
import { getStoredUser } from "@/lib/session";
import type { Order, Payment } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/locale-provider";

const DEFAULT_TAX_RATE = 0.22;

function taxRateFromOrder(order: Order): number {
  const raw = order.taxRatePercent;
  if (raw == null || raw === "") return DEFAULT_TAX_RATE;
  const percent = Number(raw);
  if (!Number.isFinite(percent) || percent < 0) return DEFAULT_TAX_RATE;
  return percent / 100;
}

function vatBreakdown(grossInclusive: number, taxRate: number) {
  const gross = Number(grossInclusive.toFixed(2));
  const net = Number((gross / (1 + taxRate)).toFixed(2));
  const vat = Number((gross - net).toFixed(2));
  return { net, vat, gross };
}

function paymentsOf(order: Order): Payment[] {
  if (order.payments?.length) return order.payments;
  return order.payment ? [order.payment] : [];
}

function tipTotal(payments: Payment[]): number {
  return payments
    .filter((p) => p.status === "PAID" || p.status === "PARTIALLY_REFUNDED")
    .reduce((sum, p) => sum + Number(p.tipAmount ?? 0), 0);
}

function cashierLabel(payments: Payment[]): string | null {
  for (const p of [...payments].reverse()) {
    const u = p.receivedBy;
    if (!u) continue;
    const name = [u.firstName, u.lastName].filter(Boolean).join(" ").trim();
    if (name) return name;
    if (u.email) return u.email;
  }
  return null;
}

function formatStaffLabel(user: {
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
} | null | undefined): string | null {
  if (!user) return null;
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  if (name) return name;
  return user.email?.trim() || null;
}

export function openReceiptWindow(
  orderId: string,
  branchName?: string,
  receivedBy?: string | null,
) {
  const params = new URLSearchParams();
  if (branchName) params.set("branchName", branchName);
  const fromArg = receivedBy?.trim();
  const fromSession = formatStaffLabel(getStoredUser());
  const staff = fromArg || fromSession;
  if (staff) params.set("receivedBy", staff);
  const qs = params.toString() ? `?${params.toString()}` : "";
  window.open(`/receipt/${orderId}${qs}`, "_blank", "noopener,noreferrer");
}

export function ReceiptView({
  order,
  branchName,
  receivedByFallback = null,
  autoPrint = false,
}: {
  order: Order;
  branchName?: string | null;
  /** Used when payment.receivedBy is missing (session / query). */
  receivedByFallback?: string | null;
  autoPrint?: boolean;
}) {
  const { t } = useLocale();
  const currency = order.currency ?? order.payment?.currency ?? "EUR";
  const taxRate = taxRateFromOrder(order);
  const taxPercentLabel = Number((taxRate * 100).toFixed(2));
  const payments = paymentsOf(order).filter(
    (p) => p.status === "PAID" || p.status === "PARTIALLY_REFUNDED",
  );
  const tips = tipTotal(payments);
  const receivedBy =
    cashierLabel(payments) || receivedByFallback?.trim() || null;
  const { net, vat, gross } = vatBreakdown(Number(order.total), taxRate);
  const paidAt =
    payments
      .map((p) => p.paidAt)
      .filter(Boolean)
      .sort()
      .at(-1) ?? order.createdAt;

  const title =
    order.mode === "WALK_IN" || order.queueNumber != null
      ? t("walkInTitle", {
          queue: formatWalkInQueueCode(order.queueNumber) ?? "—",
        })
      : t("tableLabel", { number: order.table?.number ?? "—" });

  React.useEffect(() => {
    if (!autoPrint) return;
    const timer = window.setTimeout(() => window.print(), 400);
    return () => window.clearTimeout(timer);
  }, [autoPrint, order.id]);

  return (
    <div className="mx-auto max-w-md">
      <div className="no-print mb-4 flex flex-wrap gap-2">
        <Button type="button" onClick={() => window.print()}>
          {t("print")}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => window.close()}
        >
          {t("close")}
        </Button>
      </div>

      <article
        id="receipt"
        className="rounded-xl border border-[var(--line)] bg-white px-5 py-6 text-[var(--ink)] shadow-sm print:rounded-none print:border-0 print:shadow-none"
      >
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            {t("receipt")}
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-2xl">
            {branchName || t("restaurant")}
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">{title}</p>
        </header>

        <dl className="mt-4 space-y-1 border-y border-dashed border-[var(--line)] py-3 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-[var(--muted)]">{t("guest")}</dt>
            <dd>{order.customerName || t("guest")}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-[var(--muted)]">{t("order")}</dt>
            <dd className="font-mono text-xs">{shortId(order.id)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-[var(--muted)]">{t("paid")}</dt>
            <dd>{new Date(paidAt!).toLocaleString()}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-[var(--muted)]">{t("receivedBy")}</dt>
            <dd>{receivedBy || "—"}</dd>
          </div>
        </dl>

        <ul className="mt-3 space-y-2 text-sm">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between gap-3">
              <span>
                {item.quantity}× {item.menuItem?.name ?? t("item")}
                {item.notes ? (
                  <span className="block text-xs text-[var(--muted)]">
                    {item.notes}
                  </span>
                ) : null}
              </span>
              <span className="shrink-0">
                {formatMoney(Number(item.price) * item.quantity, currency)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 space-y-1 border-t border-dashed border-[var(--line)] pt-3 text-sm">
          <div className="flex justify-between">
            <span>{t("netExclVat")}</span>
            <span>{formatMoney(net, currency)}</span>
          </div>
          <div className="flex justify-between">
            <span>{t("vatPercent", { percent: taxPercentLabel })}</span>
            <span>{formatMoney(vat, currency)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>{t("totalInclVat")}</span>
            <span>{formatMoney(gross, currency)}</span>
          </div>
          {tips > 0.001 ? (
            <div className="flex justify-between">
              <span>{t("tip")}</span>
              <span>{formatMoney(tips, currency)}</span>
            </div>
          ) : null}
          {payments.map((p) => (
            <div key={p.id} className="flex justify-between text-[var(--muted)]">
              <span>
                {p.method}
                {p.status === "PARTIALLY_REFUNDED" ? t("partialRefund") : ""}
              </span>
              <span>{formatMoney(Number(p.amount), currency)}</span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-[var(--muted)]">
          {t("thankYou")}
        </p>
      </article>
    </div>
  );
}
