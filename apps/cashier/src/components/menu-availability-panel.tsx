"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cashierApi } from "@/lib/api";
import { formatMoney } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/locale-provider";

export function MenuAvailabilityPanel({
  restaurantId,
}: {
  restaurantId?: string | null;
}) {
  const { t } = useLocale();
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const menuQuery = useQuery({
    queryKey: ["cashier-menu", restaurantId ?? "self"],
    queryFn: () => cashierApi.listMenuItems(restaurantId ?? undefined),
    enabled: open,
  });

  const toggle = useMutation({
    mutationFn: (item: { id: string; available: boolean }) =>
      cashierApi.setItemAvailability(item.id, !item.available),
    onSuccess: () => {
      setError(null);
      void queryClient.invalidateQueries({ queryKey: ["cashier-menu"] });
    },
    onError: (err: Error) => setError(err.message),
  });

  if (!open) {
    return (
      <div className="mb-4">
        <Button type="button" variant="outline" onClick={() => setOpen(true)}>
          {t("menuAvailability")}
        </Button>
      </div>
    );
  }

  return (
    <section className="mb-6 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            {t("menuAvailability")}
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {t("menuAvailabilityHint")}
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setOpen(false)}
        >
          {t("close")}
        </Button>
      </div>

      {error ? (
        <p className="mb-3 rounded-md bg-[var(--danger-soft)] px-3 py-2 text-sm text-[var(--danger)]">
          {error}
        </p>
      ) : null}

      {menuQuery.isLoading ? (
        <p className="text-sm text-[var(--muted)]">{t("loadingMenu")}</p>
      ) : menuQuery.isError ? (
        <p className="text-sm text-[var(--danger)]">
          {(menuQuery.error as Error).message}
        </p>
      ) : (
        <ul className="max-h-80 divide-y divide-[var(--line)] overflow-y-auto rounded-md border border-[var(--line)] bg-[var(--paper)]">
          {(menuQuery.data ?? [])
            .filter((item) => item.active)
            .map((item) => {
            const available = item.available !== false;
            return (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 px-3 py-2"
              >
                <div className="min-w-0">
                  <p
                    className={`truncate text-sm font-medium ${
                      available ? "" : "text-[var(--muted)] line-through"
                    }`}
                  >
                    {item.name}
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    {item.category?.name ? `${item.category.name} · ` : ""}
                    {formatMoney(Number(item.price), "EUR")} ·{" "}
                    {available ? t("available") : t("soldOut")}
                  </p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant={available ? "outline" : "default"}
                  disabled={toggle.isPending}
                  onClick={() =>
                    toggle.mutate({
                      id: item.id,
                      available,
                    })
                  }
                >
                  {available ? t("soldOut") : t("available")}
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
