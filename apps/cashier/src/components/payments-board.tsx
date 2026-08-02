"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cashierApi } from "@/lib/api";
import { formatMoney, shortId } from "@/lib/utils";
import type { Order, OrderItem, Payment } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import {
  BranchSelect,
  useSelectedBranch,
} from "@/hooks/use-selected-branch";
import { useCashierRealtime } from "@/hooks/use-cashier-realtime";

type PayMethod = "CASH" | "CARD" | "ONLINE";

const ONLINE_ENV =
  process.env.NEXT_PUBLIC_ONLINE_PAYMENTS === "1" ||
  process.env.NEXT_PUBLIC_ONLINE_PAYMENTS === "true";

function orderBalance(order: Order) {
  if (order.balanceDue != null) return Number(order.balanceDue);
  if (!order.payment) return Number(order.total);
  if (
    order.payment.status === "PENDING" ||
    order.payment.status === "FAILED"
  ) {
    return Number(order.total);
  }
  return 0;
}

function orderPayments(order: Order): Payment[] {
  if (order.payments?.length) return order.payments;
  return order.payment ? [order.payment] : [];
}

function allocatedItemIds(order: Order): Set<string> {
  const ids = new Set<string>();
  for (const payment of orderPayments(order)) {
    if (
      payment.status !== "PENDING" &&
      payment.status !== "PAID" &&
      payment.status !== "PARTIALLY_REFUNDED"
    ) {
      continue;
    }
    const lines = (payment as Payment & { lines?: { orderItemId: string }[] })
      .lines;
    for (const line of lines ?? []) ids.add(line.orderItemId);
  }
  return ids;
}

export function PaymentsBoard() {
  const queryClient = useQueryClient();
  const { branchId, setBranchId, branches, isLoading: branchesLoading } =
    useSelectedBranch();
  const [error, setError] = React.useState<string | null>(null);
  const [tips, setTips] = React.useState<Record<string, string>>({});
  const [selectedItems, setSelectedItems] = React.useState<
    Record<string, string[]>
  >({});
  const { connected } = useCashierRealtime(branchId || null);

  const providerQuery = useQuery({
    queryKey: ["payment-provider-config"],
    queryFn: () => cashierApi.paymentConfig(),
  });

  const onlineEnabled =
    ONLINE_ENV || providerQuery.data?.onlineEnabled === true;
  const provider = providerQuery.data?.provider ?? "none";

  const ordersQuery = useQuery({
    queryKey: ["cashier-orders", branchId],
    queryFn: () => cashierApi.listOrders(branchId),
    enabled: !!branchId,
    refetchInterval: connected ? false : 8_000,
  });

  const pay = useMutation({
    mutationFn: (input: {
      orderId: string;
      method: PayMethod;
      tipAmount?: number;
      orderItemIds?: string[];
      status: "PAID" | "PENDING";
    }) => cashierApi.createPayment(input),
    onSuccess: (payment, vars) => {
      setError(null);
      setSelectedItems((prev) => ({ ...prev, [vars.orderId]: [] }));
      if (payment.checkoutUrl) {
        window.open(payment.checkoutUrl, "_blank", "noopener,noreferrer");
      }
      void queryClient.invalidateQueries({ queryKey: ["cashier-orders"] });
    },
    onError: (err: Error) => setError(err.message),
  });

  const markPaid = useMutation({
    mutationFn: (paymentId: string) => cashierApi.markPaid(paymentId),
    onSuccess: () => {
      setError(null);
      void queryClient.invalidateQueries({ queryKey: ["cashier-orders"] });
    },
    onError: (err: Error) => setError(err.message),
  });

  const refund = useMutation({
    mutationFn: (paymentId: string) => cashierApi.refundPayment(paymentId),
    onSuccess: () => {
      setError(null);
      void queryClient.invalidateQueries({ queryKey: ["cashier-orders"] });
    },
    onError: (err: Error) => setError(err.message),
  });

  const orders = ordersQuery.data ?? [];
  const unpaid = orders.filter((o) => orderBalance(o) > 0.001);
  const settled = orders.filter((o) => orderBalance(o) <= 0.001);
  const currency =
    orders[0]?.currency ?? orders[0]?.payment?.currency ?? "USD";
  const unpaidTotal = unpaid.reduce((sum, o) => sum + orderBalance(o), 0);
  const paidTotal = settled.reduce((sum, o) => {
    return (
      sum +
      orderPayments(o)
        .filter((p) => p.status === "PAID" || p.status === "PARTIALLY_REFUNDED")
        .reduce((s, p) => s + Number(p.amount) - Number(p.refundedAmount ?? 0), 0)
    );
  }, 0);

  function tipFor(orderId: string) {
    const raw = tips[orderId]?.trim();
    if (!raw) return 0;
    const n = Number(raw);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }

  return (
    <div>
      <PageHeader
        title="Payments"
        subtitle={`Split by item · tips · refunds · ONLINE via ${provider}.`}
      />

      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-md flex-1">
          <BranchSelect
            branchId={branchId}
            onChange={setBranchId}
            branches={branches}
            disabled={branchesLoading}
          />
        </div>
        <p className="text-sm text-[var(--muted)]">
          Live feed:{" "}
          <span className={connected ? "text-[var(--accent)]" : ""}>
            {connected ? "connected" : "polling"}
          </span>
        </p>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <Stat
          label="Open unpaid"
          value={formatMoney(unpaidTotal, currency)}
          hint={`${unpaid.length} orders`}
        />
        <Stat
          label="Paid on floor"
          value={formatMoney(paidTotal, currency)}
          hint={`${settled.length} orders`}
        />
        <Stat
          label="Till total"
          value={formatMoney(unpaidTotal + paidTotal, currency)}
          hint="Active tickets"
        />
      </div>

      {error ? (
        <p className="mb-4 rounded-md bg-[var(--danger-soft)] px-3 py-2 text-sm text-[var(--danger)]">
          {error}
        </p>
      ) : null}

      {!branchId && branchesLoading ? (
        <p className="text-[var(--muted)]">Loading branches…</p>
      ) : ordersQuery.isLoading ? (
        <p className="text-[var(--muted)]">Loading orders…</p>
      ) : ordersQuery.isError ? (
        <p className="text-[var(--danger)]">
          {(ordersQuery.error as Error).message}
        </p>
      ) : (
        <div className="space-y-8">
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Needs payment ({unpaid.length})
            </h2>
            {unpaid.length === 0 ? (
              <p className="text-[var(--muted)]">No open unpaid orders.</p>
            ) : (
              <div className="space-y-3">
                {unpaid.map((order) => {
                  const pending = orderPayments(order).find(
                    (p) => p.status === "PENDING",
                  );
                  return (
                    <OrderCard
                      key={order.id}
                      order={order}
                      busy={pay.isPending || markPaid.isPending}
                      tipValue={tips[order.id] ?? ""}
                      selectedIds={selectedItems[order.id] ?? []}
                      onTipChange={(value) =>
                        setTips((prev) => ({ ...prev, [order.id]: value }))
                      }
                      onToggleItem={(itemId) =>
                        setSelectedItems((prev) => {
                          const current = prev[order.id] ?? [];
                          const next = current.includes(itemId)
                            ? current.filter((id) => id !== itemId)
                            : [...current, itemId];
                          return { ...prev, [order.id]: next };
                        })
                      }
                      onPay={(method) => {
                        const ids = selectedItems[order.id] ?? [];
                        pay.mutate({
                          orderId: order.id,
                          method,
                          tipAmount: tipFor(order.id) || undefined,
                          orderItemIds: ids.length ? ids : undefined,
                          status: method === "ONLINE" ? "PENDING" : "PAID",
                        });
                      }}
                      onPend={() =>
                        pay.mutate({
                          orderId: order.id,
                          method: "CASH",
                          tipAmount: tipFor(order.id) || undefined,
                          orderItemIds: (selectedItems[order.id] ?? []).length
                            ? selectedItems[order.id]
                            : undefined,
                          status: "PENDING",
                        })
                      }
                      onMarkPaid={
                        pending && pending.provider !== "stripe"
                          ? () => markPaid.mutate(pending.id)
                          : undefined
                      }
                      onlineEnabled={onlineEnabled}
                    />
                  );
                })}
              </div>
            )}
          </section>

          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Settled ({settled.length})
            </h2>
            {settled.length === 0 ? (
              <p className="text-[var(--muted)]">No settled active orders.</p>
            ) : (
              <div className="space-y-3">
                {settled.map((order) => {
                  const refundable = orderPayments(order).find(
                    (p) =>
                      p.status === "PAID" || p.status === "PARTIALLY_REFUNDED",
                  );
                  return (
                    <OrderCard
                      key={order.id}
                      order={order}
                      busy={refund.isPending}
                      onRefund={
                        refundable
                          ? () => {
                              if (
                                window.confirm(
                                  `Refund remaining balance for ${shortId(order.id)}?`,
                                )
                              ) {
                                refund.mutate(refundable.id);
                              }
                            }
                          : undefined
                      }
                    />
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-1 font-[family-name:var(--font-display)] text-2xl">
        {value}
      </p>
      <p className="text-xs text-[var(--muted)]">{hint}</p>
    </div>
  );
}

function OrderCard({
  order,
  busy,
  tipValue,
  selectedIds,
  onTipChange,
  onToggleItem,
  onPay,
  onPend,
  onMarkPaid,
  onRefund,
  onlineEnabled,
}: {
  order: Order;
  busy: boolean;
  tipValue?: string;
  selectedIds?: string[];
  onTipChange?: (value: string) => void;
  onToggleItem?: (itemId: string) => void;
  onPay?: (method: PayMethod) => void;
  onPend?: () => void;
  onMarkPaid?: () => void;
  onRefund?: () => void;
  onlineEnabled?: boolean;
}) {
  const currency = order.currency ?? order.payment?.currency ?? "USD";
  const total = Number(order.total);
  const due = orderBalance(order);
  const tip = Number(tipValue || 0) || 0;
  const allocated = allocatedItemIds(order);
  const selected = (selectedIds ?? [])
    .map((id) => order.items.find((item) => item.id === id))
    .filter(Boolean) as OrderItem[];
  const selectedCover = selected.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );
  const cover = selected.length ? selectedCover : due;
  const charge = cover + tip;
  const payments = orderPayments(order);

  return (
    <article className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold">
            {order.mode === "WALK_IN" || order.queueNumber != null
              ? `#${order.queueNumber ?? "—"}`
              : `Table ${order.table?.number ?? "—"}`}{" "}
            · {order.status}
            {order.mode === "WALK_IN" ? " · Walk-in" : ""}
          </p>
          <p className="text-sm text-[var(--muted)]">
            {order.customerName || "Guest"} · {shortId(order.id)}
            {payments.length
              ? ` · ${payments.length} payment${payments.length > 1 ? "s" : ""}`
              : " · no payment"}
          </p>
        </div>
        <div className="text-right">
          <p className="font-[family-name:var(--font-display)] text-2xl">
            {formatMoney(due > 0 ? charge : total, currency)}
          </p>
          {due > 0 && due < total ? (
            <p className="text-xs text-[var(--muted)]">
              Due {formatMoney(due, currency)} of {formatMoney(total, currency)}
            </p>
          ) : null}
        </div>
      </div>

      <ul className="mt-3 space-y-1 border-t border-[var(--line)] pt-3 text-sm text-[var(--muted)]">
        {order.items.map((item) => {
          const taken = allocated.has(item.id);
          const checked = selectedIds?.includes(item.id) ?? false;
          return (
            <li key={item.id} className="flex items-center justify-between gap-3">
              <label className="flex flex-1 items-center gap-2">
                {onToggleItem && !taken ? (
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleItem(item.id)}
                  />
                ) : (
                  <span className="inline-block w-4 text-center">
                    {taken ? "✓" : ""}
                  </span>
                )}
                <span className={taken ? "line-through opacity-60" : ""}>
                  {item.quantity}× {item.menuItem?.name ?? "Item"}
                  {item.seatNumber != null ? ` · seat ${item.seatNumber}` : ""}
                </span>
              </label>
              <span>
                {formatMoney(Number(item.price) * item.quantity, currency)}
              </span>
            </li>
          );
        })}
        <li className="flex justify-between gap-3 pt-1 font-semibold text-[var(--ink)]">
          <span>Order</span>
          <span>{formatMoney(total, currency)}</span>
        </li>
        {due > 0 ? (
          <li className="flex justify-between gap-3 text-[var(--ink)]">
            <span>{selected.length ? "Selected" : "Balance due"}</span>
            <span>{formatMoney(cover, currency)}</span>
          </li>
        ) : null}
        {tip > 0 ? (
          <li className="flex justify-between gap-3 text-[var(--ink)]">
            <span>Tip</span>
            <span>{formatMoney(tip, currency)}</span>
          </li>
        ) : null}
      </ul>

      {onPay && onTipChange ? (
        <label className="mt-3 block text-sm">
          <span className="text-[var(--muted)]">
            Tip (optional){selected.length ? " · on this split" : ""}
          </span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={tipValue}
            onChange={(e) => onTipChange(e.target.value)}
            className="mt-1 h-10 w-full max-w-[10rem] rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
            placeholder="0.00"
          />
        </label>
      ) : null}

      {(onPay || onPend || onMarkPaid || onRefund) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {onPay ? (
            <>
              <Button size="sm" disabled={busy} onClick={() => onPay("CASH")}>
                {selected.length ? "Pay selected cash" : "Pay cash"}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                disabled={busy}
                onClick={() => onPay("CARD")}
              >
                {selected.length ? "Pay selected card" : "Pay card"}
              </Button>
              {onlineEnabled ? (
                <Button
                  size="sm"
                  variant="outline"
                  disabled={busy}
                  onClick={() => onPay("ONLINE")}
                >
                  Pay online
                </Button>
              ) : null}
            </>
          ) : null}
          {onPend && due > 0.001 ? (
            <Button size="sm" variant="outline" disabled={busy} onClick={onPend}>
              Record pending
            </Button>
          ) : null}
          {onMarkPaid ? (
            <Button size="sm" disabled={busy} onClick={onMarkPaid}>
              Mark paid
            </Button>
          ) : null}
          {onRefund ? (
            <Button
              size="sm"
              variant="outline"
              disabled={busy}
              onClick={onRefund}
            >
              Refund
            </Button>
          ) : null}
        </div>
      )}
    </article>
  );
}
