"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";

import { customerApi } from "@/lib/api";
import { extractApiMessage } from "@/lib/errors";
import { moneyLocale } from "@/lib/i18n/helpers";
import {
  LanguageSwitcher,
  useLocale,
} from "@/lib/i18n/locale-provider";
import { formatMoney } from "@/lib/utils";
import {
  selectCartTotal,
  useCartStore,
} from "@/stores/cart-store";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export function CartExperience({
  token,
  branchId,
}: {
  token?: string;
  branchId?: string;
}) {
  const { t, locale } = useLocale();
  const moneyLoc = moneyLocale(locale);
  const walkIn = !!branchId && !token;
  const scope = token ?? `walk-in:${branchId}`;
  const basePath = walkIn ? `/w/${branchId}` : `/t/${token}`;
  const router = useRouter();
  const lines = useCartStore((s) => s.lines);
  const updateQty = useCartStore((s) => s.updateQty);
  const clear = useCartStore((s) => s.clear);
  const total = useCartStore((s) => selectCartTotal(s.lines));
  const [name, setName] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const submittingRef = useRef(false);
  /** Skip empty-cart redirect once after place-order (clear races with /orders nav). */
  const suppressEmptyCartRedirect = useRef(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // After a successful order + browser Back, don't leave them on an empty cart.
  useEffect(() => {
    if (!hydrated) return;
    if (lines.length > 0) return;
    if (suppressEmptyCartRedirect.current) {
      suppressEmptyCartRedirect.current = false;
      return;
    }
    const cameFromCheckout = sessionStorage.getItem(`cart.ordered.${scope}`);
    if (!cameFromCheckout) return;
    sessionStorage.removeItem(`cart.ordered.${scope}`);
    router.replace(basePath);
  }, [hydrated, lines.length, router, scope, basePath]);

  const menuQuery = useQuery({
    queryKey: ["menu", scope],
    queryFn: () =>
      walkIn
        ? customerApi.getWalkInMenu(branchId!)
        : customerApi.getMenu(token!),
  });

  const currency = menuQuery.data?.restaurant.currency ?? "EUR";
  const isEmpty = hydrated && lines.length === 0;

  const placeOrder = useMutation({
    mutationFn: async () => {
      if (submittingRef.current) {
        throw new Error(t("orderInProgress"));
      }

      const currentLines = useCartStore.getState().lines;
      if (currentLines.length === 0) {
        throw new Error(t("emptyCartTitle"));
      }

      submittingRef.current = true;

      const body = {
        customerName: name.trim() || undefined,
        items: currentLines.map((line) => ({
          menuItemId: line.menuItemId,
          quantity: line.quantity,
          notes: line.notes,
          modifierOptionIds: line.modifierOptionIds,
        })),
      };

      return walkIn
        ? customerApi.placeWalkInOrder(branchId!, body)
        : customerApi.placeOrder(token!, body);
    },
    onSuccess: (order) => {
      suppressEmptyCartRedirect.current = true;
      clear();
      sessionStorage.setItem(`cart.ordered.${scope}`, "1");
      toast.success(
        walkIn && order.queueNumber != null
          ? t("orderAwaitingPayment", { number: order.queueNumber })
          : t("orderPlaced"),
      );
      setConfirmOpen(false);
      router.replace(`${basePath}/orders/${order.id}`);
    },
    onError: (error) => {
      toast.error(extractApiMessage(error, t("couldNotPlaceOrder")));
    },
    onSettled: () => {
      submittingRef.current = false;
    },
  });

  const busy = placeOrder.isPending;

  function requestCheckout() {
    if (busy || lines.length === 0 || submittingRef.current) return;
    setConfirmOpen(true);
  }

  function confirmCheckout() {
    if (busy || lines.length === 0 || submittingRef.current) return;
    placeOrder.mutate();
  }

  if (!hydrated) {
    return (
      <div className="mx-auto min-h-screen max-w-3xl bg-[var(--paper)] px-4 py-6 text-[var(--muted)]">
        {t("loadingCart")}
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-3xl bg-[var(--paper)] px-4 py-6 text-[var(--ink)]">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-[family-name:var(--font-display)] text-3xl">
          {t("cartTitle")}
        </h1>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button asChild variant="ghost" disabled={busy}>
            <Link href={basePath}>{t("menu")}</Link>
          </Button>
        </div>
      </div>

      {isEmpty ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-[var(--surface-2)] text-[var(--accent)]">
            <ShoppingBag className="h-7 w-7" aria-hidden />
          </div>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-2xl">
            {t("emptyCartTitle")}
          </h2>
          <p className="mt-2 max-w-sm text-[var(--muted)]">
            {t("emptyCartBody")}
          </p>
          <Button asChild className="mt-6" size="lg">
            <Link href={basePath}>{t("backToMenu")}</Link>
          </Button>
        </div>
      ) : (
        <fieldset disabled={busy} className="min-w-0 border-0 p-0">
          <ul className="mt-8 space-y-3">
            {lines.map((line) => (
              <li
                key={line.key}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{line.name}</p>
                    {line.modifierLabels.length > 0 ? (
                      <p className="mt-1 text-xs text-[var(--muted)]">
                        {line.modifierLabels.join(" · ")}
                      </p>
                    ) : null}
                    {line.notes ? (
                      <p className="mt-1 text-xs text-[var(--muted)]">
                        {t("notePrefix")} {line.notes}
                      </p>
                    ) : null}
                  </div>
                  <p className="font-medium">
                    {formatMoney(
                      line.unitPrice * line.quantity,
                      currency,
                      moneyLoc,
                    )}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    type="button"
                    onClick={() => updateQty(line.key, line.quantity - 1)}
                  >
                    −
                  </Button>
                  <span className="w-8 text-center text-sm">{line.quantity}</span>
                  <Button
                    size="sm"
                    variant="secondary"
                    type="button"
                    onClick={() => updateQty(line.key, line.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <label className="mt-6 block text-sm font-medium" htmlFor="guest">
            {t("customerNameOptional")}
          </label>
          <input
            id="guest"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2 disabled:opacity-60"
            placeholder={t("guestPlaceholder")}
            autoComplete="name"
          />

          <div className="mt-6 flex items-center justify-between border-t border-[var(--line)] pt-4">
            <p className="text-[var(--muted)]">{t("total")}</p>
            <p className="text-xl font-semibold">
              {formatMoney(total, currency, moneyLoc)}
            </p>
          </div>

          <Button
            className="mt-4 w-full"
            size="lg"
            type="button"
            disabled={busy || lines.length === 0}
            onClick={requestCheckout}
          >
            {busy ? t("sending") : t("placeOrder")}
          </Button>
        </fieldset>
      )}

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={(open) => {
          if (busy) return;
          setConfirmOpen(open);
        }}
        title={t("confirmOrder")}
        description={
          walkIn ? t("confirmOrderBodyWalkIn") : t("confirmOrderBody")
        }
        confirmLabel={t("placeOrder")}
        cancelLabel={t("cancel")}
        pending={busy}
        onConfirm={confirmCheckout}
      />
    </div>
  );
}
