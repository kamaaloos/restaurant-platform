"use client";

import * as React from "react";
import { formatMoney, formatWalkInQueueCode, shortId } from "@/lib/utils";
import type { Order } from "@/lib/types";
import { Button } from "@/components/ui/button";

export function openPickupTicketWindow(orderId: string, branchName?: string) {
  const qs = new URLSearchParams({ print: "1" });
  if (branchName) qs.set("branchName", branchName);
  window.open(
    `/ticket/${orderId}?${qs.toString()}`,
    "_blank",
    "noopener,noreferrer",
  );
}

export function PickupTicketView({
  order,
  branchName,
  autoPrint = false,
}: {
  order: Order;
  branchName?: string | null;
  autoPrint?: boolean;
}) {
  const currency = order.currency ?? "EUR";
  const queue = formatWalkInQueueCode(order.queueNumber) ?? "—";

  React.useEffect(() => {
    if (!autoPrint) return;
    const t = window.setTimeout(() => window.print(), 400);
    return () => window.clearTimeout(t);
  }, [autoPrint, order.id]);

  return (
    <div className="mx-auto max-w-sm">
      <div className="no-print mb-4 flex flex-wrap gap-2">
        <Button type="button" onClick={() => window.print()}>
          Print ticket
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
        className="rounded-xl border border-[var(--line)] bg-white px-5 py-6 text-center text-[var(--ink)] shadow-sm print:rounded-none print:border-0 print:shadow-none"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Pickup ticket
        </p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-xl">
          {branchName || "Restaurant"}
        </h1>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
          Your number
        </p>
        <p className="mt-1 font-[family-name:var(--font-display)] text-5xl leading-none tracking-tight sm:text-6xl">
          {queue}
        </p>
        <p className="mt-3 text-sm text-[var(--muted)]">
          {order.customerName || "Guest"} · Walk-in
        </p>

        <ul className="mt-5 space-y-1.5 border-y border-dashed border-[var(--line)] py-3 text-left text-sm">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between gap-3">
              <span>
                {item.quantity}× {item.menuItem?.name ?? "Item"}
              </span>
              <span className="tabular-nums text-[var(--muted)]">
                {formatMoney(Number(item.price) * item.quantity, currency)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-3 flex justify-between text-sm font-semibold">
          <span>Total</span>
          <span className="tabular-nums">
            {formatMoney(Number(order.total), currency)}
          </span>
        </div>

        <p className="mt-5 text-xs text-[var(--muted)]">
          Pay at the counter · Order {shortId(order.id)}
        </p>
      </article>
    </div>
  );
}
