"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cashierApi } from "@/lib/api";
import { collectTerminalPayment, getTerminalMode } from "@/lib/terminal";
import { formatMoney, formatWalkInQueueCode, shortId } from "@/lib/utils";
import type { Order, OrderItem, Payment } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { TerminalReaderSettings } from "@/components/terminal-reader-settings";
import { openReceiptWindow } from "@/components/receipt-view";
import { openPickupTicketWindow } from "@/components/pickup-ticket-view";
import { NewWalkInPanel } from "@/components/new-walk-in-panel";
import { MenuAvailabilityPanel } from "@/components/menu-availability-panel";
import {
  BranchSelect,
  useSelectedBranch,
} from "@/hooks/use-selected-branch";
import { useCashierRealtime } from "@/hooks/use-cashier-realtime";
import { getStoredUser } from "@/lib/session";

type PayMethod = "CASH" | "CARD" | "CARD_MANUAL" | "ONLINE";

const ONLINE_ENV =
  process.env.NEXT_PUBLIC_ONLINE_PAYMENTS === "1" ||
  process.env.NEXT_PUBLIC_ONLINE_PAYMENTS === "true";

const TERMINAL_ENV =
  process.env.NEXT_PUBLIC_STRIPE_TERMINAL === "1" ||
  process.env.NEXT_PUBLIC_STRIPE_TERMINAL === "true";

function orderPayments(order: Order): Payment[] {
  if (order.payments?.length) return order.payments;
  return order.payment ? [order.payment] : [];
}

/** Cover toward order.total (excludes tip). */
function paymentCover(payment: Payment): number {
  return Math.max(0, Number(payment.amount) - Number(payment.tipAmount ?? 0));
}

/**
 * Settled cover (PAID / partial refund) — not PENDING holds.
 * Refunds apply tip-first, then to order cover.
 */
function settledCover(order: Order): number {
  let total = 0;
  for (const payment of orderPayments(order)) {
    if (
      payment.status !== "PAID" &&
      payment.status !== "PARTIALLY_REFUNDED"
    ) {
      continue;
    }
    const tip = Number(payment.tipAmount ?? 0);
    const refunded = Number(payment.refundedAmount ?? 0);
    const cover = paymentCover(payment);
    const coverRefunded = Math.max(0, refunded - tip);
    total += Math.max(0, cover - coverRefunded);
  }
  return Number(total.toFixed(2));
}

/**
 * What the guest still owes for till display.
 * PENDING payments reserve capacity on the API but are not "paid" yet —
 * those tickets belong in Needs payment, not Settled.
 */
function amountOwed(order: Order): number {
  return Number(Math.max(0, Number(order.total) - settledCover(order)).toFixed(2));
}

function needsPayment(order: Order): boolean {
  if (order.status === "PENDING_PAYMENT") return true;
  if (amountOwed(order) > 0.001) return true;
  return orderPayments(order).some(
    (p) => p.status === "PENDING" || p.status === "FAILED",
  );
}

/** Remaining creatable payment room (respects PENDING holds — matches API). */
function orderBalance(order: Order) {
  if (order.balanceDue != null) return Number(order.balanceDue);
  return amountOwed(order);
}

/**
 * Items already claimed by a payment.
 * PENDING / PAID / PARTIALLY_REFUNDED / REFUNDED own lines (full refund does not reopen).
 * FAILED / VOIDED free lines.
 */
function allocatedItemIds(order: Order): Set<string> {
  const ids = new Set<string>();
  for (const payment of orderPayments(order)) {
    if (
      payment.status !== "PENDING" &&
      payment.status !== "PAID" &&
      payment.status !== "PARTIALLY_REFUNDED" &&
      payment.status !== "REFUNDED"
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
  const [statusMsg, setStatusMsg] = React.useState<string | null>(null);
  const [tips, setTips] = React.useState<Record<string, string>>({});
  const [selectedItems, setSelectedItems] = React.useState<
    Record<string, string[]>
  >({});
  const { connected } = useCashierRealtime(branchId || null);

  const dayRange = React.useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    return { from: start.toISOString(), to: end.toISOString() };
  }, []);

  const providerQuery = useQuery({
    queryKey: ["payment-provider-config"],
    queryFn: () => cashierApi.paymentConfig(),
  });

  const onlineEnabled =
    ONLINE_ENV || providerQuery.data?.onlineEnabled === true;
  const terminalEnabled =
    TERMINAL_ENV || providerQuery.data?.terminalEnabled === true;
  const provider = providerQuery.data?.provider ?? "none";

  const ordersQuery = useQuery({
    queryKey: ["cashier-orders", branchId],
    queryFn: () => cashierApi.listOrders(branchId),
    enabled: !!branchId,
    refetchInterval: connected ? false : 8_000,
  });

  const todayPaidQuery = useQuery({
    queryKey: ["cashier-today-paid", branchId, dayRange.from],
    queryFn: () =>
      cashierApi.listTodayPaid(branchId, dayRange.from, dayRange.to),
    enabled: !!branchId,
    refetchInterval: connected ? false : 8_000,
  });

  const invalidateTill = () => {
    void queryClient.invalidateQueries({
      queryKey: ["cashier-orders", branchId],
    });
    void queryClient.invalidateQueries({
      queryKey: ["cashier-today-paid", branchId, dayRange.from],
    });
  };

  const selectedBranch = branches.find((b) => b.id === branchId);
  const branchLabel = selectedBranch?.name ?? undefined;
  const restaurantId =
    selectedBranch?.restaurantId ?? getStoredUser()?.restaurantId ?? null;

  const pay = useMutation({
    mutationFn: async (input: {
      orderId: string;
      method: PayMethod;
      tipAmount?: number;
      orderItemIds?: string[];
    }) => {
      let payment = await cashierApi.createPayment(input);
      if (payment.clientSecret) {
        setStatusMsg(
          getTerminalMode() === "simulated"
            ? "Simulated reader: presenting test card 4242… (no tap UI)"
            : "Waiting for card on Terminal reader…",
        );
        await collectTerminalPayment(payment.clientSecret);
        setStatusMsg("Waiting for Stripe webhook confirmation…");
        payment = await cashierApi.waitForTerminalPaid(
          input.orderId,
          payment.id,
        );
        setStatusMsg("Card payment succeeded.");
      }
      return payment;
    },
    onSuccess: (payment, vars) => {
      setError(null);
      setSelectedItems((prev) => ({ ...prev, [vars.orderId]: [] }));
      if (payment.checkoutUrl) {
        window.open(payment.checkoutUrl, "_blank", "noopener,noreferrer");
      } else if (payment.status === "PAID") {
        openReceiptWindow(vars.orderId, branchLabel);
      }
      invalidateTill();
      window.setTimeout(() => setStatusMsg(null), 2500);
    },
    onError: (err: Error) => {
      setStatusMsg(null);
      setError(err.message);
    },
  });

  const recordPendingCash = useMutation({
    mutationFn: (input: {
      orderId: string;
      tipAmount?: number;
      orderItemIds?: string[];
    }) => cashierApi.createPendingCash(input),
    onSuccess: () => {
      setError(null);
      invalidateTill();
    },
    onError: (err: Error) => setError(err.message),
  });

  const markPaid = useMutation({
    mutationFn: (paymentId: string) => cashierApi.markPaid(paymentId),
    onSuccess: (payment) => {
      setError(null);
      if (payment.status === "PAID") {
        openReceiptWindow(payment.orderId, branchLabel);
      }
      invalidateTill();
    },
    onError: (err: Error) => setError(err.message),
  });

  const refund = useMutation({
    mutationFn: (paymentId: string) => cashierApi.refundPayment(paymentId),
    onSuccess: () => {
      setError(null);
      invalidateTill();
    },
    onError: (err: Error) => setError(err.message),
  });

  const orders = ordersQuery.data ?? [];
  const todayPaid = todayPaidQuery.data ?? [];
  const unpaid = orders.filter((o) => needsPayment(o));
  const settled = orders.filter((o) => !needsPayment(o));
  const currency =
    orders[0]?.currency ??
    todayPaid[0]?.currency ??
    orders[0]?.payment?.currency ??
    "EUR";
  const unpaidTotal = unpaid.reduce((sum, o) => sum + amountOwed(o), 0);
  const paidTotal = settled.reduce((sum, o) => sum + settledCover(o), 0);
  const todaySales = todayPaid.reduce((sum, o) => sum + settledCover(o), 0);

  function tipFor(orderId: string) {
    const raw = tips[orderId]?.trim();
    if (!raw) return 0;
    const n = Number(raw);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }

  function printReceipt(orderId: string) {
    openReceiptWindow(orderId, branchLabel);
  }

  return (
    <div>
      <PageHeader
        title="Payments"
        subtitle={`Split by item · tips · refunds · ONLINE via ${provider}${
          terminalEnabled ? " · CARD via Terminal" : ""
        }.`}
      />

      <TerminalReaderSettings enabled={terminalEnabled} />

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

      {branchId ? (
        <>
          <NewWalkInPanel
            branchId={branchId}
            branchName={branchLabel}
            restaurantId={restaurantId}
          />
          <MenuAvailabilityPanel restaurantId={restaurantId} />
        </>
      ) : null}

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
          label="Today's paid"
          value={formatMoney(todaySales, currency)}
          hint={`${todayPaid.length} closed`}
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

      {statusMsg ? (
        <p className="mb-4 rounded-md border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--ink)]">
          {statusMsg}
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
                  const canCreatePayment = orderBalance(order) > 0.001;
                  return (
                    <OrderCard
                      key={order.id}
                      order={order}
                      busy={
                        pay.isPending ||
                        markPaid.isPending ||
                        recordPendingCash.isPending
                      }
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
                      onPay={
                        canCreatePayment
                          ? (method) => {
                              const ids = selectedItems[order.id] ?? [];
                              pay.mutate({
                                orderId: order.id,
                                method,
                                tipAmount: tipFor(order.id) || undefined,
                                orderItemIds: ids.length ? ids : undefined,
                              });
                            }
                          : undefined
                      }
                      onPend={
                        canCreatePayment
                          ? () => {
                              const ids = selectedItems[order.id] ?? [];
                              recordPendingCash.mutate({
                                orderId: order.id,
                                tipAmount: tipFor(order.id) || undefined,
                                orderItemIds: ids.length ? ids : undefined,
                              });
                            }
                          : undefined
                      }
                      onMarkPaid={
                        pending &&
                        (pending.method === "CASH" ||
                          pending.method === "CARD_MANUAL") &&
                        pending.provider !== "stripe"
                          ? () => markPaid.mutate(pending.id)
                          : undefined
                      }
                      onReconcileTerminal={
                        pending?.provider === "stripe" &&
                        pending.method === "CARD"
                          ? () => {
                              setStatusMsg(
                                "Checking Stripe PaymentIntent status…",
                              );
                              void cashierApi
                                .confirmTerminal(pending.id)
                                .then((payment) => {
                                  setStatusMsg(null);
                                  if (payment.status === "PAID") {
                                    openReceiptWindow(
                                      payment.orderId,
                                      branchLabel,
                                    );
                                  }
                                  invalidateTill();
                                })
                                .catch((err: Error) => {
                                  setStatusMsg(null);
                                  setError(err.message);
                                });
                            }
                          : undefined
                      }
                      onPrintTicket={
                        order.mode === "WALK_IN" || order.queueNumber != null
                          ? () =>
                              openPickupTicketWindow(order.id, branchLabel)
                          : undefined
                      }
                      onlineEnabled={onlineEnabled}
                      terminalEnabled={terminalEnabled}
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
                      onPrintReceipt={() => printReceipt(order.id)}
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

          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Today&apos;s paid ({todayPaid.length})
            </h2>
            {todayPaidQuery.isLoading ? (
              <p className="text-[var(--muted)]">Loading today&apos;s paid…</p>
            ) : todayPaidQuery.isError ? (
              <p className="text-[var(--danger)]">
                {(todayPaidQuery.error as Error).message}
              </p>
            ) : todayPaid.length === 0 ? (
              <p className="text-[var(--muted)]">
                No closed paid orders yet today.
              </p>
            ) : (
              <div className="space-y-3">
                {todayPaid.map((order) => {
                  const refundable = orderPayments(order).find(
                    (p) =>
                      p.status === "PAID" || p.status === "PARTIALLY_REFUNDED",
                  );
                  return (
                    <OrderCard
                      key={order.id}
                      order={order}
                      busy={refund.isPending}
                      onPrintReceipt={() => printReceipt(order.id)}
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
  onReconcileTerminal,
  onRefund,
  onPrintReceipt,
  onPrintTicket,
  onlineEnabled,
  terminalEnabled,
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
  onReconcileTerminal?: () => void;
  onRefund?: () => void;
  onPrintReceipt?: () => void;
  onPrintTicket?: () => void;
  onlineEnabled?: boolean;
  terminalEnabled?: boolean;
}) {
  const currency = order.currency ?? order.payment?.currency ?? "USD";
  const total = Number(order.total);
  const due = amountOwed(order);
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
              ? (formatWalkInQueueCode(order.queueNumber) ?? "—")
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
          <span className="mt-1 block text-xs text-[var(--muted)]">
            Split is by whole line items (not per unit of quantity).
          </span>
        </label>
      ) : null}

      {(onPay ||
        onPend ||
        onMarkPaid ||
        onReconcileTerminal ||
        onRefund ||
        onPrintReceipt ||
        onPrintTicket) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {onPay ? (
            <>
              <Button size="sm" disabled={busy} onClick={() => onPay("CASH")}>
                {selected.length ? "Pay selected cash" : "Pay cash"}
              </Button>
              {terminalEnabled ? (
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={busy}
                  onClick={() => onPay("CARD")}
                >
                  {selected.length
                    ? "Pay selected (Terminal)"
                    : "Pay card (Terminal)"}
                </Button>
              ) : null}
              <Button
                size="sm"
                variant="outline"
                disabled={busy}
                onClick={() => onPay("CARD_MANUAL")}
              >
                {selected.length ? "Pay selected (manual card)" : "Card manual"}
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
          {onReconcileTerminal ? (
            <Button
              size="sm"
              variant="outline"
              disabled={busy}
              onClick={onReconcileTerminal}
            >
              Check Stripe
            </Button>
          ) : null}
          {onPrintTicket ? (
            <Button
              size="sm"
              variant="outline"
              disabled={busy}
              onClick={onPrintTicket}
            >
              Print ticket
            </Button>
          ) : null}
          {onPrintReceipt ? (
            <Button
              size="sm"
              variant="outline"
              disabled={busy}
              onClick={onPrintReceipt}
            >
              Print receipt
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
