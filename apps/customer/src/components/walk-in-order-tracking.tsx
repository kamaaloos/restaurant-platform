"use client";

import Link from "next/link";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { customerApi } from "@/lib/api";
import { extractApiMessage } from "@/lib/errors";
import { moneyLocale, statusMessageKey } from "@/lib/i18n/helpers";
import { LocaleControls, useCurrency } from "@/lib/currency-provider";
import { useLocale } from "@/lib/i18n/locale-provider";
<<<<<<< HEAD
import { formatMoney, formatWalkInQueueCode } from "@/lib/utils";
=======
import { formatMoney } from "@/lib/utils";
>>>>>>> Update restaurant platform apps and backend
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

function canGuestCancel(status: string, payments?: { status: string }[]) {
  if (status !== "PENDING_PAYMENT" && status !== "NEW") return false;
  const settled = (payments ?? []).some(
    (p) => p.status === "PAID" || p.status === "PARTIALLY_REFUNDED",
  );
  return !settled;
}

export function WalkInOrderTracking({
  branchId,
  orderId,
}: {
  branchId: string;
  orderId: string;
}) {
  const { t, locale } = useLocale();
  const { currency, convertFromBase } = useCurrency();
  const moneyLoc = moneyLocale(locale);
  const queryClient = useQueryClient();
  const [confirmCancel, setConfirmCancel] = useState(false);

  const orderQuery = useQuery({
    queryKey: ["walk-in-order", branchId, orderId],
    queryFn: () => customerApi.getWalkInOrder(branchId, orderId),
    refetchInterval: 8_000,
  });

  const providerQuery = useQuery({
    queryKey: ["payment-provider-config"],
    queryFn: () => customerApi.paymentConfig(),
  });
  const onlineEnabled = providerQuery.data?.onlineEnabled === true;

  const pay = useMutation({
    mutationFn: (method: "CARD_MANUAL" | "CASH" | "ONLINE") =>
      customerApi.payWalkInOrder(branchId, orderId, method),
    onSuccess: (result) => {
      if (result.payment.checkoutUrl) {
        window.location.href = result.payment.checkoutUrl;
        return;
      }
      toast.success(t("paymentSuccess"));
      void queryClient.invalidateQueries({
        queryKey: ["walk-in-order", branchId, orderId],
      });
    },
    onError: (error) => {
      toast.error(extractApiMessage(error, t("couldNotPay")));
    },
  });

  const cancel = useMutation({
    mutationFn: () => customerApi.cancelWalkInOrder(branchId, orderId),
    onSuccess: () => {
      setConfirmCancel(false);
      toast.success(t("orderCancelled"));
      void queryClient.invalidateQueries({
        queryKey: ["walk-in-order", branchId, orderId],
      });
    },
    onError: (error) => {
      toast.error(extractApiMessage(error, t("couldNotCancel")));
    },
  });

  function labelFor(status: string) {
    if (status === "READY") return t("statusReadyPickup");
    const key = statusMessageKey(status);
    return key ? t(key) : status;
  }

  if (orderQuery.isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-[var(--muted)]">
        {t("loadingOrder")}
      </div>
    );
  }

  if (orderQuery.isError || !orderQuery.data) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="mb-6 flex justify-end">
          <LocaleControls />
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl">
          {t("orderNotFound")}
        </h1>
        <Button asChild className="mt-6" variant="secondary">
          <Link href={`/w/${branchId}`}>{t("backToMenu")}</Link>
        </Button>
      </div>
    );
  }

  const order = orderQuery.data;
  const awaitingPay = order.status === "PENDING_PAYMENT";
  const finished =
    order.status === "COMPLETED" || order.status === "CANCELLED";
  const showCancel = canGuestCancel(
    order.status,
    order.payments ?? (order.payment ? [order.payment] : []),
  );
  const steps = order.tracking?.steps ?? [
    "PENDING_PAYMENT",
    "NEW",
    "ACCEPTED",
    "PREPARING",
    "READY",
    "COMPLETED",
  ];
  const currentIndex = steps.indexOf(order.status);

  return (
    <div className="mx-auto min-h-screen max-w-3xl bg-[var(--paper)] px-4 py-6 text-[var(--ink)]">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-[family-name:var(--font-display)] text-3xl">
          {t("yourOrder")}
        </h1>
        <div className="flex items-center gap-2">
          <LocaleControls />
          <Button asChild variant="ghost">
            <Link href={`/pickup/${branchId}`}>{t("tvBoard")}</Link>
          </Button>
        </div>
      </div>

      {order.queueNumber != null ? (
        <section className="mt-8 rounded-3xl border border-[var(--accent)] bg-[var(--accent-soft)] p-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
            {t("pickupNumber")}
          </p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-5xl tabular-nums leading-none sm:text-6xl md:text-7xl">
            {formatWalkInQueueCode(order.queueNumber) ?? "—"}
          </p>
          <p className="mt-4 text-lg">{labelFor(order.status)}</p>
        </section>
      ) : null}

      {awaitingPay ? (
        <section className="mt-6 rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-5">
          <p className="text-sm text-[var(--muted)]">{t("kitchenAfterPay")}</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {onlineEnabled ? (
              <Button
                className="flex-1"
                disabled={pay.isPending}
                onClick={() => pay.mutate("ONLINE")}
              >
                {pay.isPending ? t("sending") : t("payWithCard")}
              </Button>
            ) : (
              <Button
                className="flex-1"
                disabled={pay.isPending}
                onClick={() => pay.mutate("CARD_MANUAL")}
              >
                {pay.isPending ? t("sending") : `${t("payWithCard")} (manual)`}
              </Button>
            )}
            <Button
              className="flex-1"
              variant="secondary"
              disabled={pay.isPending}
              onClick={() => pay.mutate("CASH")}
            >
              {t("payNow")} (Cash)
            </Button>
            {onlineEnabled ? (
              <Button
                className="flex-1"
                variant="outline"
                disabled={pay.isPending}
                onClick={() =>
                  toast.message(t("payAtCounterHint"), {
                    description: "Pay by card on the Terminal at the counter.",
                  })
                }
              >
                Card at counter
              </Button>
            ) : null}
          </div>
          <p className="mt-3 text-sm text-[var(--muted)]">
            {t("payAtCounterHint")}
          </p>
        </section>
      ) : null}

      <section className="mt-8 rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-5">
        <ol className="space-y-3">
          {steps.map((step, index) => {
            const done = currentIndex >= index && order.status !== "CANCELLED";
            return (
              <li key={step} className="flex items-center gap-3 text-sm">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                    done
                      ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                      : "bg-[var(--surface-2)] text-[var(--muted)]"
                  }`}
                >
                  {index + 1}
                </span>
                <span className={done ? "text-[var(--ink)]" : "text-[var(--muted)]"}>
                  {labelFor(step)}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      <ul className="mt-6 space-y-3">
        {order.items.map((item) => (
          <li
            key={item.id}
            className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3"
          >
            <div className="flex justify-between gap-3">
              <p>
                {item.quantity}× {item.menuItem.name}
              </p>
              <p>
                {formatMoney(
                  convertFromBase(
                    Number(item.price) * item.quantity,
                    order.currency,
                  ),
                  currency,
                  moneyLoc,
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-[var(--muted)]">{t("total")}</p>
        <p className="text-xl font-semibold">
          {formatMoney(
            convertFromBase(order.total, order.currency),
            currency,
            moneyLoc,
          )}
        </p>
      </div>

      {showCancel ? (
        <Button
          className="mt-8 w-full"
          variant="outline"
          disabled={cancel.isPending}
          onClick={() => setConfirmCancel(true)}
        >
          {t("cancelOrder")}
        </Button>
      ) : null}

      {!finished ? (
        <Button
          asChild
          className={`w-full ${showCancel ? "mt-3" : "mt-8"}`}
          variant="secondary"
        >
          <Link href={`/w/${branchId}`}>{t("orderMore")}</Link>
        </Button>
      ) : null}

      <ConfirmDialog
        open={confirmCancel}
        onOpenChange={setConfirmCancel}
        title={t("cancelOrder")}
        description={t("cancelOrderConfirm")}
        confirmLabel={t("cancelOrder")}
        cancelLabel={t("close")}
        pending={cancel.isPending}
        onConfirm={() => cancel.mutate()}
      />
    </div>
  );
}
