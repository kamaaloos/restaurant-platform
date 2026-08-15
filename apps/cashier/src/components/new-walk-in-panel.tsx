"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cashierApi } from "@/lib/api";
import { resolveMenuImage } from "@/lib/menu-images";
import { formatMoney, formatWalkInQueueCode } from "@/lib/utils";
import type { Order } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { openPickupTicketWindow } from "@/components/pickup-ticket-view";

type CartLine = { menuItemId: string; quantity: number };

type MenuItemRow = Awaited<
  ReturnType<typeof cashierApi.listMenuItems>
>[number];

function groupByCategory(items: MenuItemRow[]) {
  const map = new Map<
    string,
    { id: string; name: string; order: number; items: MenuItemRow[] }
  >();

  for (const item of items) {
    const id = item.category?.id ?? item.categoryId ?? "other";
    const name = item.category?.name ?? "Other";
    const order = item.category?.displayOrder ?? 999;
    const group = map.get(id) ?? { id, name, order, items: [] };
    group.items.push(item);
    map.set(id, group);
  }

  return [...map.values()]
    .sort(
      (a, b) =>
        a.order - b.order || a.name.localeCompare(b.name, undefined, {
          sensitivity: "base",
        }),
    )
    .map((group) => ({
      ...group,
      items: [...group.items].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
      ),
    }));
}

export function NewWalkInPanel({
  branchId,
  branchName,
  restaurantId,
}: {
  branchId: string;
  branchName?: string;
  restaurantId?: string | null;
}) {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const [customerName, setCustomerName] = React.useState("");
  const [cart, setCart] = React.useState<Record<string, number>>({});
  const [created, setCreated] = React.useState<Order | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<
    string | "all"
  >("all");

  const menuQuery = useQuery({
    queryKey: ["cashier-menu", restaurantId ?? "self"],
    queryFn: () => cashierApi.listMenuItems(restaurantId ?? undefined),
    enabled: open && !!branchId,
  });

  const create = useMutation({
    mutationFn: () => {
      const items: CartLine[] = Object.entries(cart)
        .filter(([, qty]) => qty > 0)
        .map(([menuItemId, quantity]) => ({ menuItemId, quantity }));
      if (items.length === 0) {
        throw new Error("Add at least one item");
      }
      return cashierApi.createWalkInOrder({
        branchId,
        customerName: customerName.trim() || undefined,
        items,
      });
    },
    onSuccess: (order) => {
      setError(null);
      setCreated(order);
      setCart({});
      setCustomerName("");
      void queryClient.invalidateQueries({
        queryKey: ["cashier-orders", branchId],
      });
    },
    onError: (err: Error) => setError(err.message),
  });

  const items = (menuQuery.data ?? []).filter(
    (item) => item.active && item.available !== false,
  );
  const categories = React.useMemo(() => groupByCategory(items), [items]);
  const visibleCategories = React.useMemo(
    () =>
      selectedCategoryId === "all"
        ? categories
        : categories.filter((c) => c.id === selectedCategoryId),
    [categories, selectedCategoryId],
  );
  const currency = "EUR";
  const lines = items.filter((item) => (cart[item.id] ?? 0) > 0);
  const total = lines.reduce(
    (sum, item) => sum + Number(item.price) * (cart[item.id] ?? 0),
    0,
  );

  function setQty(id: string, qty: number) {
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  }

  function resetPanel() {
    setCreated(null);
    setError(null);
    setCart({});
    setCustomerName("");
    setSelectedCategoryId("all");
  }

  if (!open) {
    return (
      <div className="mb-6">
        <Button type="button" onClick={() => setOpen(true)}>
          New walk-in
        </Button>
      </div>
    );
  }

  if (created) {
    return (
      <section className="mb-6 rounded-xl border border-[var(--accent)] bg-[var(--accent-soft)] px-4 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
          Walk-in created · pay at till
        </p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-5xl leading-none tracking-tight text-[var(--ink)] sm:text-6xl">
          {formatWalkInQueueCode(created.queueNumber) ?? "—"}
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {created.customerName || "Guest"} ·{" "}
          {formatMoney(Number(created.total), created.currency ?? currency)}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            type="button"
            onClick={() => openPickupTicketWindow(created.id, branchName)}
          >
            Print pickup ticket
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              resetPanel();
              setOpen(false);
            }}
          >
            Done
          </Button>
          <Button type="button" variant="ghost" onClick={resetPanel}>
            Another walk-in
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-6 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            New walk-in
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Assign pickup number, print ticket, then take payment.
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            resetPanel();
            setOpen(false);
          }}
        >
          Close
        </Button>
      </div>

      <label className="mb-3 block max-w-sm space-y-1.5">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
          Guest name (optional)
        </span>
        <input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Guest"
          className="h-11 w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
        />
      </label>

      {error ? (
        <p className="mb-3 rounded-md bg-[var(--danger-soft)] px-3 py-2 text-sm text-[var(--danger)]">
          {error}
        </p>
      ) : null}

      {menuQuery.isLoading ? (
        <p className="text-sm text-[var(--muted)]">Loading menu…</p>
      ) : menuQuery.isError ? (
        <p className="text-sm text-[var(--danger)]">
          {(menuQuery.error as Error).message}
        </p>
      ) : items.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">No active menu items.</p>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategoryId("all")}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                selectedCategoryId === "all"
                  ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                  : "border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--accent)]"
              }`}
            >
              All
              <span className="ms-1.5 opacity-70">{items.length}</span>
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategoryId(category.id)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  selectedCategoryId === category.id
                    ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                    : "border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--accent)]"
                }`}
              >
                {category.name}
                <span className="ms-1.5 opacity-70">
                  {category.items.length}
                </span>
              </button>
            ))}
          </div>

          <div className="max-h-[28rem] space-y-4 overflow-y-auto rounded-md border border-[var(--line)] bg-[var(--paper)] p-3">
            {visibleCategories.map((category) => (
              <section key={category.id} className="space-y-2">
                <h3 className="sticky top-0 z-10 -mx-1 rounded-md bg-[var(--surface-2)] px-2 py-2 text-sm font-semibold tracking-wide text-[var(--ink)]">
                  {category.name}
                  <span className="ms-2 text-xs font-normal text-[var(--muted)]">
                    {category.items.length}
                  </span>
                </h3>
                <ul className="space-y-1.5">
                  {category.items.map((item) => {
                    const qty = cart[item.id] ?? 0;
                    const image = resolveMenuImage(item.imageUrl, item.name);
                    return (
                      <li
                        key={item.id}
                        className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-[var(--surface)]"
                      >
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-[var(--surface-2)]">
                          {image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={image}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="grid h-full w-full place-items-center text-sm font-semibold text-[var(--muted)]">
                              {item.name.slice(0, 1)}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {item.name}
                          </p>
                          <p className="text-xs text-[var(--muted)]">
                            {formatMoney(Number(item.price), currency)}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-1.5">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            disabled={qty === 0}
                            onClick={() => setQty(item.id, qty - 1)}
                            aria-label={`Decrease ${item.name}`}
                          >
                            −
                          </Button>
                          <span className="w-6 text-center text-sm tabular-nums">
                            {qty}
                          </span>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => setQty(item.id, qty + 1)}
                            aria-label={`Increase ${item.name}`}
                          >
                            +
                          </Button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm">
          <span className="text-[var(--muted)]">Cart · </span>
          <span className="font-semibold tabular-nums">
            {formatMoney(total, currency)}
          </span>
          <span className="text-[var(--muted)]">
            {" "}
            · {lines.reduce((n, i) => n + (cart[i.id] ?? 0), 0)} items
          </span>
        </p>
        <Button
          type="button"
          disabled={create.isPending || lines.length === 0 || !branchId}
          onClick={() => create.mutate()}
        >
          {create.isPending ? "Creating…" : "Create & assign number"}
        </Button>
      </div>
    </section>
  );
}
