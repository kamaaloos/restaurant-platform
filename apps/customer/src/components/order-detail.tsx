"use client";

import Link from "next/link";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { customerApi } from "@/lib/api";
import { extractApiMessage } from "@/lib/errors";
import { LocaleControls, useCurrency } from "@/lib/currency-provider";
import { moneyLocale, statusMessageKey } from "@/lib/i18n/helpers";
import { useLocale } from "@/lib/i18n/locale-provider";
import { formatMoney } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useCustomerRealtime } from "@/hooks/use-customer-realtime";

const STEPS = ["NEW", "ACCEPTED", "PREPARING", "READY", "SERVED", "COMPLETED"];

function canGuestCancel(status: string, payments?: { status: string }[]) {
  if (status !== "PENDING_PAYMENT" && status !== "NEW") return false;
  const settled = (payments ?? []).some(
    (p) => p.status === "PAID" || p.status === "PARTIALLY_REFUNDED",
  );
  return !settled;
}

export function OrderTracking({
  token,
  orderId,
}: {
  token: string;
  orderId: string;
}) {
  const { t, locale } = useLocale();
  const { currency, convertFromBase } = useCurrency();
  const moneyLoc = moneyLocale(locale);
  const queryClient = useQueryClient();
  const [confirmCancel, setConfirmCancel] = useState(false);
  useCustomerRealtime(token);

  const orderQuery = useQuery({
    queryKey: ["order", token, orderId],
    queryFn: () => customerApi.getOrder(token, orderId),
    refetchInterval: 20_000,
  });

  const cancel = useMutation({
    mutationFn: () => customerApi.cancelOrder(token, orderId),
    onSuccess: () => {
      setConfirmCancel(false);
      toast.success(t("orderCancelled"));
      void queryClient.invalidateQueries({
        queryKey: ["order", token, orderId],
      });
      void queryClient.invalidateQueries({ queryKey: ["orders", token] });
    },
    onError: (error) => {
      toast.error(extractApiMessage(error, t("couldNotCancel")));
    },
  });

  function labelFor(status: string) {
    const key = statusMessageKey(status);
    return key ? t(key) : status;
  }

  function money(amount: number | string, base: string) {
    return formatMoney(convertFromBase(amount, base), currency, moneyLoc);
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
          <Link href={`/t/${token}`}>{t("backToMenu")}</Link>
        </Button>
      </div>
    );
  }

  const order = orderQuery.data;
  const currentIndex = STEPS.indexOf(order.status);
  const finished =
    order.status === "COMPLETED" || order.status === "CANCELLED";
  const showCancel = canGuestCancel(
    order.status,
    order.payments ?? (order.payment ? [order.payment] : []),
  );

  return (
    <div className="mx-auto min-h-screen max-w-3xl bg-[var(--paper)] px-4 py-6 text-[var(--ink)]">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-[family-name:var(--font-display)] text-3xl">
          {t("orderStatus")}
        </h1>
        <div className="flex items-center gap-2">
          <LocaleControls />
          <Button asChild variant="ghost">
            <Link href={`/t/${token}/orders`}>{t("allOrders")}</Link>
          </Button>
        </div>
      </div>

      <section className="mt-8 rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-5">
        <p className="text-sm text-[var(--muted)]">{t("current")}</p>
        <p className="mt-1 font-[family-name:var(--font-display)] text-3xl">
          {labelFor(order.status)}
        </p>

        <ol className="mt-8 space-y-3">
          {STEPS.map((step, index) => {
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
                {money(Number(item.price) * item.quantity, order.currency)}
              </p>
            </div>
            {item.modifiers.length > 0 ? (
              <p className="mt-1 text-xs text-[var(--muted)]">
                {item.modifiers.map((m) => m.optionName).join(" · ")}
              </p>
            ) : null}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-[var(--muted)]">{t("total")}</p>
        <p className="text-xl font-semibold">
          {money(order.total, order.currency)}
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
          <Link href={`/t/${token}`}>{t("orderMore")}</Link>
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
