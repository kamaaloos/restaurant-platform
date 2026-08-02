"use client";

import Link from "next/link";
import { Bell, Receipt, ShoppingBag } from "lucide-react";
import { selectCartCount, useCartStore } from "@/stores/cart-store";
import { Button } from "@/components/ui/button";
import { customerApi } from "@/lib/api";
import { extractApiMessage } from "@/lib/errors";
import { useLocale } from "@/lib/i18n/locale-provider";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function TableChrome({
  token,
  restaurantName,
  tableNumber,
  currency,
  capabilities,
}: {
  token: string;
  restaurantName: string;
  tableNumber: string;
  currency: string;
  capabilities?: {
    callWaiter?: boolean;
    requestBill?: boolean;
    liveTracking?: boolean;
  };
}) {
  const { t } = useLocale();
  const count = useCartStore((s) => selectCartCount(s.lines));
  const canCall = capabilities?.callWaiter !== false;
  const canBill = capabilities?.requestBill !== false;

  const callWaiter = useMutation({
    mutationFn: () =>
      customerApi.createServiceRequest(token, {
        type: "CALL_WAITER",
        note: t("assistanceNote"),
      }),
    onSuccess: () => toast.success(t("waiterNotified")),
    onError: (err) =>
      toast.error(extractApiMessage(err, t("somethingWentWrong"))),
  });

  const requestBill = useMutation({
    mutationFn: () =>
      customerApi.createServiceRequest(token, { type: "REQUEST_BILL" }),
    onSuccess: () => toast.success(t("billRequested")),
    onError: (err) =>
      toast.error(extractApiMessage(err, t("somethingWentWrong"))),
  });

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-[var(--line-soft)] bg-[color-mix(in_oklab,var(--paper)_90%,transparent)] backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--forest)]">
              {restaurantName}
            </p>
            <p className="text-xs tracking-[0.14em] text-[var(--muted)] uppercase">
              {t("tableLabel", { number: tableNumber })}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            {canCall ? (
              <Button
                variant="ghost"
                size="icon"
                aria-label={t("callWaiter")}
                onClick={() => callWaiter.mutate()}
                disabled={callWaiter.isPending}
                className="text-[var(--forest)]"
              >
                <Bell className="h-5 w-5" />
              </Button>
            ) : null}
            {canBill ? (
              <Button
                variant="ghost"
                size="icon"
                aria-label={t("requestBill")}
                onClick={() => requestBill.mutate()}
                disabled={requestBill.isPending}
                className="text-[var(--forest)]"
              >
                <Receipt className="h-5 w-5" />
              </Button>
            ) : null}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-[var(--forest)] text-[var(--forest)]"
            >
              <Link href={`/t/${token}/cart`} className="relative gap-2">
                <ShoppingBag className="h-4 w-4" />
                {t("cart")}
                {count > 0 ? ` (${count})` : ""}
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <span className="sr-only">{currency}</span>
    </>
  );
}
