"use client";

import { useEffect, useMemo, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";
import {
  ArrowRight,
  Bell,
  Cake,
  Coffee,
  CupSoda,
  Fish,
  IceCreamCone,
  Info,
  LayoutGrid,
  Leaf,
  Pizza,
  Receipt,
  Salad,
  Search,
  ShoppingBag,
  Soup,
  UtensilsCrossed,
  Wine,
  X,
} from "lucide-react";

import { customerApi } from "@/lib/api";
import { extractApiMessage } from "@/lib/errors";
import { resolveMenuImage } from "@/lib/menu-images";
import { localizedCategoryName, moneyLocale } from "@/lib/i18n/helpers";
import {
  formatMenuIndex,
  localizedMenuItemDescription,
  localizedMenuItemName,
} from "@/lib/i18n/menu-items";
import type { Locale } from "@/lib/i18n/locales";
import { useLocale } from "@/lib/i18n/locale-provider";
import { LocaleControls, useCurrency } from "@/lib/currency-provider";
import { formatMoney } from "@/lib/utils";
import {
  selectCartCount,
  selectCartTotal,
  useCartStore,
} from "@/stores/cart-store";
import { Button } from "@/components/ui/button";
import { FruitsBackdrop } from "@/components/fruits-backdrop";
import type { MenuItem, ModifierGroup } from "@/lib/types";
import { useCustomerRealtime } from "@/hooks/use-customer-realtime";

export function MenuExperience({
  token,
  branchId,
}: {
  token?: string;
  branchId?: string;
}) {
  const { t, locale } = useLocale();
  const { currency, convertFromBase } = useCurrency();
  const queryClient = useQueryClient();
  const walkIn = !!branchId && !token;
  const scope = token ?? `walk-in:${branchId}`;
  const basePath = walkIn ? `/w/${branchId}` : `/t/${token}`;
  const moneyLoc = moneyLocale(locale);

  useCustomerRealtime(token ?? "");
  const setToken = useCartStore((s) => s.setToken);
  const addLine = useCartStore((s) => s.addLine);
  const cartCount = useCartStore((s) => selectCartCount(s.lines));
  const cartTotal = useCartStore((s) => selectCartTotal(s.lines));

  const menuQuery = useQuery({
    queryKey: ["menu", scope],
    queryFn: () =>
      walkIn
        ? customerApi.getWalkInMenu(branchId!)
        : customerApi.getMenu(token!),
    enabled: !!scope,
    refetchInterval: 20_000,
  });

  const serviceRequestsQuery = useQuery({
    queryKey: ["service-requests", token],
    queryFn: () => customerApi.listServiceRequests(token!),
    enabled: !!token && !walkIn,
    refetchInterval: 15_000,
  });

  const openCallWaiter = (serviceRequestsQuery.data ?? []).some(
    (r) => r.type === "CALL_WAITER",
  );
  const openRequestBill = (serviceRequestsQuery.data ?? []).some(
    (r) => r.type === "REQUEST_BILL",
  );

  useEffect(() => {
    setToken(scope);
  }, [scope, setToken]);

  const [activeCategory, setActiveCategory] = useState<string | "all">("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);
  const searchRef = useRef<HTMLInputElement>(null);

  const categories = menuQuery.data?.categories ?? [];
  const baseCurrency = menuQuery.data?.restaurant.currency ?? "EUR";
  const capabilities = menuQuery.data?.capabilities;
  const money = (amount: number | string) =>
    formatMoney(convertFromBase(amount, baseCurrency), currency, moneyLoc);

  const invalidateServiceRequests = () =>
    void queryClient.invalidateQueries({
      queryKey: ["service-requests", token],
    });

  const callWaiter = useMutation({
    mutationFn: () =>
      customerApi.createServiceRequest(token!, {
        type: "CALL_WAITER",
        note: t("assistanceNote"),
      }),
    onSuccess: () => {
      toast.success(t("waiterNotified"));
      invalidateServiceRequests();
    },
    onError: (err) => {
      invalidateServiceRequests();
      toast.error(extractApiMessage(err, t("somethingWentWrong")));
    },
  });

  const requestBill = useMutation({
    mutationFn: () =>
      customerApi.createServiceRequest(token!, { type: "REQUEST_BILL" }),
    onSuccess: () => {
      toast.success(t("billRequested"));
      invalidateServiceRequests();
    },
    onError: (err) => {
      invalidateServiceRequests();
      toast.error(extractApiMessage(err, t("somethingWentWrong")));
    },
  });

  const selectedModifierOptions = useMemo(() => {
    if (!selected) return [];
    return selected.modifierGroups
      .flatMap((g) => g.options)
      .filter((o) => selectedOptions.includes(o.id));
  }, [selected, selectedOptions]);

  const modifierDelta = useMemo(
    () =>
      selectedModifierOptions.reduce((sum, o) => sum + Number(o.priceDelta), 0),
    [selectedModifierOptions],
  );

  const unitPrice = selected ? Number(selected.price) + modifierDelta : 0;
  const lineTotal = unitPrice * quantity;

  const filteredCategories = useMemo(() => {
    const q = search.trim().toLowerCase();
    return categories
      .map((category) => ({
        ...category,
        menuItems: category.menuItems.filter((item) => {
          if (!q) return true;
          const localized = localizedMenuItemName(
            item.name,
            locale,
            item.imageUrl,
          ).toLowerCase();
          const localizedDesc = (
            localizedMenuItemDescription(
              item.name,
              locale,
              item.imageUrl,
              item.description,
            ) ?? ""
          ).toLowerCase();
          return (
            item.name.toLowerCase().includes(q) ||
            localized.includes(q) ||
            localizedDesc.includes(q) ||
            (item.description?.toLowerCase().includes(q) ?? false)
          );
        }),
      }))
      .filter((category) => {
        if (activeCategory === "all") return true;
        return category.id === activeCategory;
      });
  }, [categories, activeCategory, search, locale]);

  const heroImages = useMemo(() => {
    const seen = new Set<string>();
    const urls: string[] = [];
    for (const item of categories.flatMap((c) => c.menuItems)) {
      const url = resolveMenuImage(item.imageUrl);
      if (!url || seen.has(url)) continue;
      seen.add(url);
      urls.push(url);
    }
    return urls;
  }, [categories]);

  const selectedImage = selected
    ? resolveMenuImage(selected.imageUrl)
    : null;

  function openItem(item: MenuItem) {
    setSelected(item);
    setSelectedOptions([]);
    setNotes("");
    setQuantity(1);
  }

  function closeItem() {
    setSelected(null);
    setSelectedOptions([]);
    setNotes("");
    setQuantity(1);
  }

  function toggleOption(group: ModifierGroup, optionId: string) {
    setSelectedOptions((prev) => {
      const inGroup = group.options.map((o) => o.id);
      const withoutGroup = prev.filter((id) => !inGroup.includes(id));
      const currentlySelected = prev.filter((id) => inGroup.includes(id));

      if (currentlySelected.includes(optionId)) {
        return withoutGroup.concat(
          currentlySelected.filter((id) => id !== optionId),
        );
      }

      if (group.maxSelect <= 1) {
        return [...withoutGroup, optionId];
      }

      if (currentlySelected.length >= group.maxSelect) {
        return prev;
      }

      return [...withoutGroup, ...currentlySelected, optionId];
    });
  }

  function addSelected() {
    if (!selected) return;
    if (selected.available === false) {
      toast.error(t("itemUnavailable"));
      return;
    }

    for (const group of selected.modifierGroups) {
      const count = selectedOptions.filter((id) =>
        group.options.some((o) => o.id === id),
      ).length;
      const min = group.required ? Math.max(group.minSelect, 1) : group.minSelect;
      if (count < min) {
        toast.error(
          t("selectOptions", { min, group: group.name }),
        );
        return;
      }
    }

    addLine({
      menuItemId: selected.id,
      name: selected.name,
      unitPrice,
      quantity,
      notes: notes.trim() || undefined,
      modifierOptionIds: selectedOptions,
      modifierLabels: selectedModifierOptions.map((o) => o.name),
      imageUrl: selected.imageUrl,
    });
    toast.success(
      t("addedToCart", {
        qty: quantity,
        name: localizedMenuItemName(
          selected.name,
          locale,
          selected.imageUrl,
        ),
      }),
    );
    closeItem();
  }

  if (menuQuery.isLoading) {
    return (
      <div className="relative min-h-screen px-4 py-10">
        <FruitsBackdrop />
        <div className="relative z-10">
          <div className="mx-auto h-10 w-48 animate-pulse rounded bg-[var(--surface-2)]" />
          <div className="mx-auto mt-8 h-40 max-w-3xl animate-pulse rounded-[28px] bg-[var(--surface-2)]" />
        </div>
      </div>
    );
  }

  if (menuQuery.isError || !menuQuery.data) {
    return (
      <div className="relative min-h-screen">
        <FruitsBackdrop />
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-16">
          <div className="mb-6 flex justify-end">
            <LocaleControls />
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--forest)]">
            {t("tableNotFound")}
          </h1>
          <p className="mt-2 text-[var(--muted)]">
            {(menuQuery.error as Error)?.message ?? t("invalidQr")}
          </p>
        </div>
      </div>
    );
  }

  const menu = menuQuery.data;
  const tableLabel = walkIn
    ? menu.branch.name
    : t("tableLabel", { number: menu.table?.number ?? "—" });
  const canCall = !walkIn && capabilities?.callWaiter !== false;
  const canBill = !walkIn && capabilities?.requestBill !== false;

  let itemIndex = 0;

  return (
    <div className="relative min-h-screen text-[var(--ink)]">
      <FruitsBackdrop />
      <div className="relative z-10">
      <header className="relative mx-auto max-w-3xl px-4 pt-5">
        <BotanicalAccent className="pointer-events-none absolute left-0 top-2 h-28 w-20 opacity-[0.14] text-[var(--forest)]" />
        <BotanicalAccent className="pointer-events-none absolute right-0 top-2 h-28 w-20 scale-x-[-1] opacity-[0.14] text-[var(--forest)]" />

        <div className="relative z-10 flex items-start justify-between gap-2">
          <IconCircle
            aria-label={t("searchMenu")}
            onClick={() => searchRef.current?.focus()}
          >
            <Search className="h-4 w-4" strokeWidth={1.75} />
          </IconCircle>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <LocaleControls />
            {canCall ? (
              <IconCircle
                aria-label={t("callWaiter")}
                onClick={() => {
                  if (!openCallWaiter) callWaiter.mutate();
                }}
                disabled={callWaiter.isPending}
                active={openCallWaiter}
              >
                <Bell className="h-4 w-4" strokeWidth={1.75} />
              </IconCircle>
            ) : null}
            {canBill ? (
              <IconCircle
                aria-label={t("requestBill")}
                onClick={() => {
                  if (!openRequestBill) requestBill.mutate();
                }}
                disabled={requestBill.isPending}
                active={openRequestBill}
              >
                <Receipt className="h-4 w-4" strokeWidth={1.75} />
              </IconCircle>
            ) : null}
            <Link
              href={`${basePath}/cart`}
              aria-label={t("cart")}
              title={t("cart")}
              className="group relative grid h-10 w-10 place-items-center rounded-full border border-[var(--forest)]/20 bg-white text-[var(--forest)] shadow-[var(--shadow-soft)] transition hover:border-[var(--gold)]"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.75} />
              <HeaderTooltip label={t("cart")} />
            </Link>
          </div>
        </div>

        <div className="relative z-10 mt-2 text-center">
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--forest)] md:text-5xl">
            {menu.restaurant.name}
          </h1>
          <GoldFlourish className="mx-auto mt-3" />
          <p className="mt-3 text-xs font-medium tracking-[0.28em] text-[var(--muted)] uppercase">
            {t("authenticCuisine")}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--gold)] bg-[var(--surface)] px-3.5 py-1.5 text-sm font-medium tracking-[0.14em] text-[var(--forest)] uppercase">
            <UtensilsCrossed className="h-3.5 w-3.5 text-[var(--gold)]" />
            {tableLabel}
          </div>
        </div>
      </header>

      <main
        className={`mx-auto max-w-3xl px-4 pt-6 ${cartCount > 0 ? "pb-36" : "pb-20"}`}
      >
        <section className="animate-menu-fade-up flex items-center gap-4 overflow-hidden rounded-[28px] border border-[var(--gold)]/45 bg-white px-5 py-5 shadow-[var(--shadow-soft)]">
          <div className="min-w-0 flex-1">
            <p className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[var(--forest)]">
              {t("welcome")}
            </p>
            <p className="mt-1 text-base leading-relaxed text-[var(--muted)]">
              {walkIn ? t("welcomeBodyWalkIn") : t("welcomeBodyTable")}
            </p>
            <div className="mt-4">
              {!walkIn && capabilities?.liveTracking !== false ? (
                <Button asChild size="sm" className="gap-2 uppercase tracking-wide">
                  <Link href={`${basePath}/orders`}>
                    <UtensilsCrossed className="h-3.5 w-3.5" />
                    {t("trackOrders")}
                  </Link>
                </Button>
              ) : walkIn ? (
                <Button asChild size="sm" className="gap-2 uppercase tracking-wide">
                  <Link href={`/pickup/${branchId}`}>{t("pickupBoard")}</Link>
                </Button>
              ) : null}
            </div>
          </div>
          <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full border-2 border-[var(--gold)]/55 bg-[var(--surface-2)] shadow-[var(--shadow-soft)] sm:h-48 sm:w-48">
            <RotatingHeroImage images={heroImages} />
          </div>
        </section>

        <section className="mt-5 rounded-[28px] border-2 border-[var(--gold)] bg-[var(--surface)] p-4 shadow-[var(--shadow-lift)] sm:p-6">
          <label className="relative block">
            <span className="sr-only">{t("searchMenu")}</span>
            <Search
              className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]"
              aria-hidden
            />
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("searchMenu")}
              className="h-12 w-full rounded-full border border-[var(--gold)]/35 bg-white ps-11 pe-4 text-base outline-none ring-[var(--gold)] placeholder:text-[var(--muted)] focus:ring-2"
            />
          </label>

          <nav
            className="mt-4 flex gap-2 overflow-x-auto pb-1"
            aria-label={t("menu")}
          >
            <CategoryPill
              active={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
              label={t("allCategories")}
              icon={<LayoutGrid className="h-3.5 w-3.5" />}
            />
            {categories.map((c) => (
              <CategoryPill
                key={c.id}
                active={activeCategory === c.id}
                onClick={() => setActiveCategory(c.id)}
                label={localizedCategoryName(c.name, t)}
                icon={categoryIcon(c.name)}
              />
            ))}
          </nav>

          {categories.length === 0 ? (
            <p className="mt-16 text-center font-[family-name:var(--font-display)] text-2xl text-[var(--muted)]">
              {t("comingSoon")}
            </p>
          ) : (
            <div className="mt-8 space-y-12">
              {filteredCategories.map((category) => (
                <section key={category.id} className="animate-menu-fade-up">
                  <CategoryHeading
                    title={localizedCategoryName(category.name, t)}
                  />
                  {category.menuItems.length === 0 ? (
                    <p className="mt-8 text-center font-[family-name:var(--font-display)] text-2xl text-[var(--muted)]">
                      {search.trim() ? t("noSearchResults") : t("comingSoon")}
                    </p>
                  ) : (
                    <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-12">
                      {category.menuItems.map((item) => {
                        itemIndex += 1;
                        return (
                          <li key={item.id} className="pt-16 sm:pt-20">
                            <MenuItemCard
                              index={itemIndex}
                              item={item}
                              locale={locale}
                              priceLabel={money(item.price)}
                              tapForDetails={t("tapForDetails")}
                              soldOutLabel={t("soldOut")}
                              onOpen={() => openItem(item)}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          )}
        </section>
      </main>

      {cartCount > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-30 px-4 pb-5">
          <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-full border border-[var(--gold)] bg-[var(--surface)] px-3 py-2.5 shadow-[var(--shadow-lift)]">
            <div className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--forest)] text-[var(--accent-foreground)]">
              <ShoppingBag className="h-4 w-4" strokeWidth={1.75} />
              <span className="absolute -right-0.5 -top-0.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-[var(--gold)] px-1 text-[10px] font-bold text-[var(--forest)]">
                {cartCount}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold tracking-[0.12em] text-[var(--forest)] uppercase">
                {cartCount}{" "}
                {cartCount === 1 ? t("item") : t("items")} · {t("viewYourOrder")}
              </p>
            </div>
            <div className="hidden h-8 w-px border-l border-dashed border-[var(--gold)]/70 sm:block" />
            <p className="hidden shrink-0 text-base font-semibold tracking-wide text-[var(--forest)] sm:block">
              {money(cartTotal)}{" "}
              <span className="text-xs tracking-[0.14em] text-[var(--muted)] uppercase">
                {t("total")}
              </span>
            </p>
            <Button asChild size="sm" className="shrink-0 gap-1.5 uppercase tracking-wide">
              <Link href={`${basePath}/cart`}>
                {t("viewOrder")}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      ) : null}

      <Dialog.Root
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) closeItem();
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-[color-mix(in_oklab,var(--forest)_45%,black)]/50" />
          <Dialog.Content className="animate-menu-soft-in fixed inset-x-0 bottom-0 z-50 max-h-[92vh] overflow-y-auto rounded-t-[28px] border border-[var(--gold)]/40 bg-[var(--paper)] outline-none sm:inset-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[28px]">
            {selected ? (
              <>
                {selectedImage ? (
                  <div className="relative h-56 w-full overflow-hidden sm:h-64">
                    <Image
                      src={selectedImage}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 512px"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--paper)] via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="h-8" />
                )}

                <div className="px-5 pb-6 pt-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Dialog.Title className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[var(--forest)]">
                        {localizedMenuItemName(
                          selected.name,
                          locale,
                          selected.imageUrl,
                        )}
                      </Dialog.Title>
                      <Dialog.Description className="mt-2 text-base leading-relaxed text-[var(--muted)]">
                        {localizedMenuItemDescription(
                          selected.name,
                          locale,
                          selected.imageUrl,
                          selected.description,
                        ) ?? t("customizeDish")}
                      </Dialog.Description>
                      <p className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--forest)]">
                        {money(selected.price)}
                      </p>
                      {selected.available === false ? (
                        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--danger)]">
                          {t("soldOut")}
                        </p>
                      ) : null}
                    </div>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        aria-label={t("close")}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--gold)]/40 text-[var(--forest)] hover:bg-[var(--surface-2)]"
                      >
                        <X className="h-4 w-4" strokeWidth={1.75} />
                      </button>
                    </Dialog.Close>
                  </div>

                  <div className="mt-6 space-y-6">
                    {selected.modifierGroups.map((group) => (
                      <div key={group.id}>
                        <p className="font-[family-name:var(--font-display)] text-2xl text-[var(--forest)]">
                          {group.name}
                          {group.required ? (
                            <span className="ms-2 font-[family-name:var(--font-body)] text-sm tracking-wide text-[var(--gold)] uppercase">
                              {t("required")}
                            </span>
                          ) : null}
                        </p>
                        <div className="mt-3 space-y-2">
                          {group.options.map((option) => {
                            const checked = selectedOptions.includes(option.id);
                            return (
                              <label
                                key={option.id}
                                className={`flex cursor-pointer items-center justify-between rounded-[24px] border px-4 py-3 transition ${
                                  checked
                                    ? "border-[var(--forest)] bg-[var(--gold-soft)]"
                                    : "border-[var(--gold)]/35 bg-white"
                                }`}
                              >
                                <span className="flex items-center gap-3 text-base">
                                  <span
                                    className={`grid h-4 w-4 place-items-center rounded-full border ${
                                      checked
                                        ? "border-[var(--forest)]"
                                        : "border-[var(--muted)]"
                                    }`}
                                    aria-hidden
                                  >
                                    {checked ? (
                                      <span className="h-2 w-2 rounded-full bg-[var(--forest)]" />
                                    ) : null}
                                  </span>
                                  <input
                                    type={
                                      group.maxSelect <= 1 ? "radio" : "checkbox"
                                    }
                                    name={group.id}
                                    checked={checked}
                                    onChange={() =>
                                      toggleOption(group, option.id)
                                    }
                                    className="sr-only"
                                  />
                                  {option.name}
                                </span>
                                {Number(option.priceDelta) > 0 ? (
                                  <span className="text-base text-[var(--muted)]">
                                    +
                                    {money(option.priceDelta)}
                                  </span>
                                ) : null}
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    <div>
                      <p className="font-[family-name:var(--font-display)] text-2xl text-[var(--forest)]">
                        {t("specialRequests")}
                      </p>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="mt-3 w-full rounded-[24px] border border-[var(--gold)]/35 bg-white px-4 py-3 text-base outline-none focus:ring-2 focus:ring-[var(--gold)]"
                        rows={2}
                        placeholder={t("specialRequestsPlaceholder")}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <p className="font-[family-name:var(--font-display)] text-2xl text-[var(--forest)]">
                        {t("quantity")}
                      </p>
                      <div className="flex items-center gap-3 rounded-full border border-[var(--gold)]/40 bg-white px-2 py-1">
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          aria-label={t("quantity")}
                          className="grid h-9 w-9 place-items-center rounded-full text-[var(--forest)] hover:bg-[var(--surface-2)]"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-base font-semibold">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => q + 1)}
                          aria-label={t("quantity")}
                          className="grid h-9 w-9 place-items-center rounded-full text-[var(--forest)] hover:bg-[var(--surface-2)]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {selected.available === false ? (
                    <Button className="mt-8 w-full" size="lg" disabled>
                      {t("soldOut")}
                    </Button>
                  ) : (
                    <Button className="mt-8 w-full" size="lg" onClick={addSelected}>
                      {t("add")} {money(lineTotal)}
                    </Button>
                  )}
                </div>
              </>
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      </div>
    </div>
  );
}

const HERO_ROTATE_MS = 7_000;

function RotatingHeroImage({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [images]);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, HERO_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [images]);

  if (images.length === 0) return <HeroPlateFallback />;

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          className={`object-cover transition-opacity duration-1000 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          sizes="192px"
          unoptimized
          priority={i === 0}
        />
      ))}
    </>
  );
}

function HeroPlateFallback() {
  return (
    <svg
      viewBox="0 0 160 160"
      className="h-full w-full"
      aria-hidden
    >
      <circle cx="80" cy="80" r="80" fill="#234128" />
      <circle cx="80" cy="80" r="62" fill="#1a331f" />
      <circle cx="80" cy="80" r="52" fill="#f3ebe0" />
      <ellipse cx="80" cy="78" rx="34" ry="28" fill="#c9a86a" opacity="0.9" />
      <ellipse cx="68" cy="72" rx="12" ry="9" fill="#43664b" />
      <ellipse cx="92" cy="74" rx="11" ry="8" fill="#5f7a55" />
      <ellipse cx="80" cy="88" rx="14" ry="10" fill="#8a6b3d" />
      <circle cx="74" cy="70" r="3" fill="#f8f5ef" opacity="0.5" />
    </svg>
  );
}

function categoryIcon(name: string) {
  const n = name.toLowerCase().trim();
  const cls = "h-3.5 w-3.5";

  // Most specific matches first — never rotate icons by index.
  if (/salad|salata/.test(n)) return <Salad className={cls} />;
  if (/shake|smoothie|milkshake/.test(n)) return <IceCreamCone className={cls} />;
  if (/soft\s*drink|soda|cola|fanta|juice|cold\s*drink/.test(n)) {
    return <CupSoda className={cls} />;
  }
  if (
    /hot\s*drink|coffee|tea|espresso|cappuccino|latte|chocolate|shaah/.test(n)
  ) {
    return <Coffee className={cls} />;
  }
  if (/wine|beer|alcohol|cocktail|\bbar\b/.test(n)) {
    return <Wine className={cls} />;
  }
  if (/drink|beverage/.test(n)) return <CupSoda className={cls} />;
  if (/desert|dessert|sweet|cake|ice\s*cream|tiramisu/.test(n)) {
    return <Cake className={cls} />;
  }
  if (/soup|maraq/.test(n)) return <Soup className={cls} />;
  if (/fish|seafood|salmon|tuna/.test(n)) return <Fish className={cls} />;
  if (/pizza/.test(n)) return <Pizza className={cls} />;
  if (/start|alkur|appet|starter|lisuk/.test(n)) {
    return <Leaf className={cls} />;
  }
  if (
    /main|meal|dish|soor|bariis|suqaar|\bbur\b|pasta|lasagna|mains/.test(n)
  ) {
    return <UtensilsCrossed className={cls} />;
  }

  return <UtensilsCrossed className={cls} />;
}

function HeaderTooltip({ label }: { label: string }) {
  return (
    <span
      role="tooltip"
      className="pointer-events-none absolute start-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[var(--gold)]/40 bg-[var(--forest)] px-2.5 py-1 text-[11px] font-medium tracking-wide text-white opacity-0 shadow-[var(--shadow-soft)] transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      {label}
    </span>
  );
}

function IconCircle({
  children,
  className = "",
  active = false,
  "aria-label": ariaLabel,
  title,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  /** Open service request — stay red until waiter marks done. */
  active?: boolean;
}) {
  const label = title ?? (typeof ariaLabel === "string" ? ariaLabel : undefined);
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={active}
      title={label}
      className={`group relative grid h-10 w-10 place-items-center rounded-full border shadow-[var(--shadow-soft)] transition disabled:opacity-50 ${
        active
          ? "border-[var(--danger)] bg-[var(--danger)] text-white hover:border-[var(--danger)]"
          : "border-[var(--forest)]/20 bg-white text-[var(--forest)] hover:border-[var(--gold)]"
      } ${className}`}
      {...props}
    >
      {children}
      {label ? <HeaderTooltip label={label} /> : null}
    </button>
  );
}

function GoldFlourish({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <span className="h-px w-10 bg-[var(--gold)]" />
      <span className="font-[family-name:var(--font-display)] text-lg leading-none text-[var(--gold)]">
        ∞
      </span>
      <span className="h-px w-10 bg-[var(--gold)]" />
    </div>
  );
}

function BotanicalAccent({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 160" fill="none" aria-hidden className={className}>
      <path
        d="M58 148C58 110 42 88 22 62C40 70 54 86 62 108C70 86 88 68 108 58C86 86 74 112 70 148"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <ellipse
        cx="34"
        cy="58"
        rx="10"
        ry="16"
        transform="rotate(-28 34 58)"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />
      <ellipse
        cx="96"
        cy="52"
        rx="10"
        ry="15"
        transform="rotate(24 96 52)"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />
    </svg>
  );
}

function CategoryHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 px-1">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-[var(--gold)]" />
      <span className="text-[var(--gold)]" aria-hidden>
        ❧
      </span>
      <h2 className="shrink-0 font-[family-name:var(--font-display)] text-4xl font-semibold text-[var(--forest)]">
        {title}
      </h2>
      <span className="text-[var(--gold)]" aria-hidden>
        ❧
      </span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[var(--gold)] to-[var(--gold)]" />
    </div>
  );
}

function CategoryPill({
  label,
  active,
  onClick,
  icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-base transition ${
        active
          ? "border-[var(--forest)] bg-[var(--forest)] text-white"
          : "border-[var(--forest)]/25 bg-[var(--surface)] text-[var(--forest)] hover:border-[var(--gold)]"
      }`}
    >
      <span className={active ? "text-[var(--gold)]" : "text-[var(--forest)]"}>
        {icon}
      </span>
      {label}
    </button>
  );
}

function MenuItemCard({
  index,
  item,
  locale,
  priceLabel,
  tapForDetails,
  soldOutLabel,
  onOpen,
}: {
  index: number;
  item: MenuItem;
  locale: Locale;
  priceLabel: string;
  tapForDetails: string;
  soldOutLabel: string;
  onOpen: () => void;
}) {
  const image = resolveMenuImage(item.imageUrl);
  const title = localizedMenuItemName(item.name, locale, item.imageUrl);
  const description = localizedMenuItemDescription(
    item.name,
    locale,
    item.imageUrl,
    item.description,
  );
  const indexLabel = formatMenuIndex(index, locale);
  const soldOut = item.available === false;
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-disabled={soldOut}
      className={`group relative flex h-full w-full flex-col overflow-visible rounded-[24px] border border-[var(--gold)]/55 bg-[var(--surface)] px-3 pb-3 pt-16 text-start shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] sm:pt-20 ${
        soldOut ? "opacity-70" : ""
      }`}
    >
      {soldOut ? (
        <span className="absolute start-3 top-3 z-20 rounded-full bg-[var(--forest)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
          {soldOutLabel}
        </span>
      ) : null}
      <div className="pointer-events-none absolute left-1/2 top-0 z-10 h-36 w-36 -translate-x-1/2 -translate-y-1/2 sm:h-40 sm:w-40">
        {image ? (
          <div className="relative h-full w-full overflow-hidden rounded-full bg-[var(--surface)] shadow-[0_10px_28px_rgba(0,0,0,0.18)] ring-[3px] ring-[var(--surface)]">
            <Image
              src={image}
              alt=""
              fill
              className={`object-cover ${soldOut ? "grayscale" : ""}`}
              sizes="160px"
              unoptimized
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-[var(--surface)] shadow-[0_10px_28px_rgba(0,0,0,0.12)] ring-[3px] ring-[var(--surface)]">
            <span className="font-[family-name:var(--font-display)] text-3xl text-[var(--forest)]/25">
              {title.slice(0, 1)}
            </span>
          </div>
        )}
        <span className="pointer-events-none absolute end-0 top-0 grid h-6 w-6 place-items-center rounded-full border border-[var(--gold)]/50 bg-[var(--surface)] text-[var(--forest)] shadow-sm">
          <Info className="h-3 w-3" strokeWidth={1.75} />
        </span>
      </div>

      <div className="mt-2 flex flex-1 flex-col px-0.5">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-[var(--forest)] sm:text-xl">
          {indexLabel}. {title}
        </h3>
        {description ? (
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
            {description}
          </p>
        ) : (
          <p className="mt-1 text-sm text-[var(--muted)]">
            {soldOut ? soldOutLabel : tapForDetails}
          </p>
        )}
        <div className="mt-auto pt-3 text-center">
          <GoldFlourish />
          <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--forest)]">
            {soldOut ? soldOutLabel : priceLabel}
          </p>
        </div>
      </div>
    </button>
  );
}
