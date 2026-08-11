"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { customerApi } from "@/lib/api";
import { LocaleControls, useCurrency } from "@/lib/currency-provider";
import { moneyLocale, statusMessageKey } from "@/lib/i18n/helpers";
import { useLocale } from "@/lib/i18n/locale-provider";
import { formatMoney } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCustomerRealtime } from "@/hooks/use-customer-realtime";

export function OrdersExperience({ token }: { token: string }) {
  const { t, locale } = useLocale();
  const { currency, convertFromBase } = useCurrency();
  const moneyLoc = moneyLocale(locale);
  useCustomerRealtime(token);
  const ordersQuery = useQuery({
    queryKey: ["orders", token],
    queryFn: () => customerApi.listOrders(token),
  });

  function labelFor(status: string) {
    const key = statusMessageKey(status);
    return key ? t(key) : status;
  }

  return (
    <div className="mx-auto min-h-screen max-w-3xl bg-[var(--paper)] px-4 py-6 text-[var(--ink)]">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-[family-name:var(--font-display)] text-3xl">
          {t("yourOrders")}
        </h1>
        <div className="flex items-center gap-2">
          <LocaleControls />
          <Button asChild variant="ghost">
            <Link href={`/t/${token}`}>{t("menu")}</Link>
          </Button>
        </div>
      </div>

      {ordersQuery.isLoading ? (
        <p className="mt-10 text-[var(--muted)]">{t("loading")}</p>
      ) : null}

      <ul className="mt-8 space-y-3">
        {(ordersQuery.data ?? []).map((order) => (
          <li key={order.id}>
            <Link
              href={`/t/${token}/orders/${order.id}`}
              className="block rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-4 transition hover:border-[var(--accent)]/40"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{labelFor(order.status)}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    {new Date(order.createdAt).toLocaleTimeString(moneyLoc)}
                  </p>
                </div>
                <p className="font-medium">
                  {formatMoney(
                    convertFromBase(order.total, order.currency),
                    currency,
                    moneyLoc,
                  )}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {!ordersQuery.isLoading && (ordersQuery.data?.length ?? 0) === 0 ? (
        <p className="mt-10 text-[var(--muted)]">{t("noActiveOrders")}</p>
      ) : null}
    </div>
  );
}
