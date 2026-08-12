"use client";

import * as React from "react";
<<<<<<< HEAD
import { formatMoney, formatWalkInQueueCode, shortId } from "@/lib/utils";
=======
import { formatMoney, shortId } from "@/lib/utils";
>>>>>>> Update restaurant platform apps and backend
import type { Order, Payment } from "@/lib/types";
import { Button } from "@/components/ui/button";

/** Finnish standard VAT — menu prices are treated as VAT-inclusive. */
const VAT_RATE = 0.22;

function vatBreakdown(grossInclusive: number) {
  const gross = Number(grossInclusive.toFixed(2));
  const net = Number((gross / (1 + VAT_RATE)).toFixed(2));
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

export function openReceiptWindow(orderId: string, branchName?: string) {
  const qs = branchName
    ? `?branchName=${encodeURIComponent(branchName)}`
    : "";
  window.open(`/receipt/${orderId}${qs}`, "_blank", "noopener,noreferrer");
}

export function ReceiptView({
  order,
  branchName,
  autoPrint = false,
}: {
  order: Order;
  branchName?: string | null;
  autoPrint?: boolean;
}) {
  const currency = order.currency ?? order.payment?.currency ?? "EUR";
  const payments = paymentsOf(order).filter(
    (p) => p.status === "PAID" || p.status === "PARTIALLY_REFUNDED",
  );
  const tips = tipTotal(payments);
  const { net, vat, gross } = vatBreakdown(Number(order.total));
  const paidAt =
    payments
      .map((p) => p.paidAt)
      .filter(Boolean)
      .sort()
      .at(-1) ?? order.createdAt;

  const title =
    order.mode === "WALK_IN" || order.queueNumber != null
<<<<<<< HEAD
      ? `${formatWalkInQueueCode(order.queueNumber) ?? "—"} · Walk-in`
=======
      ? `#${order.queueNumber ?? "—"} · Walk-in`
>>>>>>> Update restaurant platform apps and backend
      : `Table ${order.table?.number ?? "—"}`;

  React.useEffect(() => {
    if (!autoPrint) return;
    const t = window.setTimeout(() => window.print(), 400);
    return () => window.clearTimeout(t);
  }, [autoPrint, order.id]);

  return (
    <div className="mx-auto max-w-md">
      <div className="no-print mb-4 flex flex-wrap gap-2">
        <Button type="button" onClick={() => window.print()}>
          Print
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => window.close()}
        >
          Close
        </Button>
      </div>

      <article
        id="receipt"
        className="rounded-xl border border-[var(--line)] bg-white px-5 py-6 text-[var(--ink)] shadow-sm print:rounded-none print:border-0 print:shadow-none"
      >
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Receipt
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-2xl">
            {branchName || "Restaurant"}
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">{title}</p>
        </header>

        <dl className="mt-4 space-y-1 border-y border-dashed border-[var(--line)] py-3 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-[var(--muted)]">Guest</dt>
            <dd>{order.customerName || "Guest"}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-[var(--muted)]">Order</dt>
            <dd className="font-mono text-xs">{shortId(order.id)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-[var(--muted)]">Paid</dt>
            <dd>{new Date(paidAt!).toLocaleString()}</dd>
          </div>
        </dl>

        <ul className="mt-3 space-y-2 text-sm">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between gap-3">
              <span>
                {item.quantity}× {item.menuItem?.name ?? "Item"}
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
            <span>Net (excl. VAT)</span>
            <span>{formatMoney(net, currency)}</span>
          </div>
          <div className="flex justify-between">
            <span>VAT 22%</span>
            <span>{formatMoney(vat, currency)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total (incl. VAT)</span>
            <span>{formatMoney(gross, currency)}</span>
          </div>
          {tips > 0.001 ? (
            <div className="flex justify-between">
              <span>Tip</span>
              <span>{formatMoney(tips, currency)}</span>
            </div>
          ) : null}
          {payments.map((p) => (
            <div key={p.id} className="flex justify-between text-[var(--muted)]">
              <span>
                {p.method}
                {p.status === "PARTIALLY_REFUNDED" ? " (partial refund)" : ""}
              </span>
              <span>{formatMoney(Number(p.amount), currency)}</span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-[var(--muted)]">
          Thank you — please keep this receipt.
        </p>
      </article>
    </div>
  );
}
