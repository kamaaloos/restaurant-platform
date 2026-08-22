"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";
import {
  LOCAL_MENU_IMAGE_OPTIONS,
  isRemoteMenuImage,
  menuImagePreviewSrc,
  uniqueRemoteMenuImages,
} from "@/lib/menu-images";
import type { MenuCategory, MenuItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { ImageUploadButton } from "@/components/image-upload-button";
import { MenuModifiersPanel } from "@/components/menu-modifiers-panel";
import {
  RestaurantSelect,
  useSelectedRestaurant,
} from "@/hooks/use-selected-restaurant";
import { useLocale } from "@/lib/i18n/locale-provider";

type ItemFormState = {
  categoryId: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  active: boolean;
};

const emptyItemForm = (categoryId = ""): ItemFormState => ({
  categoryId,
  name: "",
  description: "",
  imageUrl: "",
  price: "",
  active: true,
});

export function MenuPage() {
  const queryClient = useQueryClient();
  const { t } = useLocale();
  const {
    restaurantId,
    setRestaurantId,
    restaurants,
    isLoading: restaurantsLoading,
  } = useSelectedRestaurant();

  const [filterCategoryId, setFilterCategoryId] = React.useState<string>("all");
  const [categoryName, setCategoryName] = React.useState("");
  const [editingCategory, setEditingCategory] =
    React.useState<MenuCategory | null>(null);
  const [editingItemId, setEditingItemId] = React.useState<string | null>(null);
  const [modifiersItemId, setModifiersItemId] = React.useState<string | null>(
    null,
  );
  const [itemForm, setItemForm] = React.useState<ItemFormState>(emptyItemForm());
  const [error, setError] = React.useState<string | null>(null);

  const categoriesQuery = useQuery({
    queryKey: ["admin-categories", restaurantId],
    queryFn: () => adminApi.listCategories(restaurantId),
    enabled: !!restaurantId,
  });

  const itemsQuery = useQuery({
    queryKey: ["admin-items", restaurantId, filterCategoryId],
    queryFn: () =>
      adminApi.listItems({
        restaurantId,
        categoryId:
          filterCategoryId === "all" ? undefined : filterCategoryId,
      }),
    enabled: !!restaurantId,
  });

  const categories = categoriesQuery.data ?? [];
  const items = itemsQuery.data ?? [];
  const selectedRestaurant = restaurants.find((r) => r.id === restaurantId);
  const photoLibrary = uniqueRemoteMenuImages(
    selectedRestaurant?.menuImageUrls,
    items.map((item) => item.imageUrl),
  );

  async function persistPhotoLibrary(urls: string[]) {
    if (!restaurantId) return;
    await adminApi.updateRestaurant(restaurantId, {
      menuImageUrls: uniqueRemoteMenuImages(urls).slice(0, 80),
    });
    void queryClient.invalidateQueries({ queryKey: ["admin-restaurants"] });
  }

  React.useEffect(() => {
    setFilterCategoryId("all");
    setEditingCategory(null);
    setEditingItemId(null);
    setModifiersItemId(null);
    setItemForm(emptyItemForm());
    setError(null);
  }, [restaurantId]);

  React.useEffect(() => {
    if (editingItemId) return;
    if (itemForm.categoryId) return;
    if (filterCategoryId !== "all") {
      setItemForm((f) => ({ ...f, categoryId: filterCategoryId }));
      return;
    }
    if (categories[0]) {
      setItemForm((f) => ({ ...f, categoryId: categories[0].id }));
    }
  }, [categories, filterCategoryId, editingItemId, itemForm.categoryId]);

  function invalidateMenu() {
    void queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    void queryClient.invalidateQueries({ queryKey: ["admin-items"] });
  }

  const saveCategory = useMutation({
    mutationFn: async () => {
      const name = (editingCategory?.name ?? categoryName).trim();
      if (!name) throw new Error(t("categoryNameRequired"));
      if (editingCategory) {
        return adminApi.updateCategory(editingCategory.id, { name });
      }
      if (!restaurantId) throw new Error(t("selectRestaurantFirst"));
      return adminApi.createCategory({ name, restaurantId });
    },
    onSuccess: (category) => {
      setCategoryName("");
      setEditingCategory(null);
      setFilterCategoryId(category.id);
      setError(null);
      invalidateMenu();
    },
    onError: (err: Error) => setError(err.message),
  });

  const deleteCategory = useMutation({
    mutationFn: (id: string) => adminApi.deleteCategory(id),
    onSuccess: (_, id) => {
      if (filterCategoryId === id) setFilterCategoryId("all");
      if (editingCategory?.id === id) setEditingCategory(null);
      setError(null);
      invalidateMenu();
    },
    onError: (err: Error) => setError(err.message),
  });

  const saveItem = useMutation({
    mutationFn: async () => {
      if (!restaurantId) throw new Error(t("selectRestaurantFirst"));
      if (!itemForm.categoryId) throw new Error(t("selectCategory"));
      const price = Number(itemForm.price);
      if (!Number.isFinite(price) || price < 0.01) {
        throw new Error(t("enterValidPrice"));
      }

      const payload = {
        categoryId: itemForm.categoryId,
        name: itemForm.name.trim(),
        description: itemForm.description.trim() || undefined,
        imageUrl: itemForm.imageUrl.trim() || undefined,
        price,
        active: itemForm.active,
      };

      if (!payload.name) throw new Error(t("itemNameRequired"));

      if (editingItemId) {
        return adminApi.updateItem(editingItemId, {
          ...payload,
          description: itemForm.description.trim() || null,
          imageUrl: itemForm.imageUrl.trim() || null,
        });
      }

      return adminApi.createItem({
        ...payload,
        restaurantId,
      });
    },
    onSuccess: (item) => {
      if (isRemoteMenuImage(item.imageUrl)) {
        void persistPhotoLibrary([...photoLibrary, item.imageUrl!]);
      }
      setEditingItemId(null);
      setItemForm(
        emptyItemForm(
          filterCategoryId === "all"
            ? categories[0]?.id ?? ""
            : filterCategoryId,
        ),
      );
      setError(null);
      invalidateMenu();
    },
    onError: (err: Error) => setError(err.message),
  });

  const deleteItem = useMutation({
    mutationFn: (id: string) => adminApi.deleteItem(id),
    onSuccess: (_, id) => {
      if (editingItemId === id) {
        setEditingItemId(null);
        setItemForm(
          emptyItemForm(
            filterCategoryId === "all"
              ? categories[0]?.id ?? ""
              : filterCategoryId,
          ),
        );
      }
      setError(null);
      invalidateMenu();
    },
    onError: (err: Error) => setError(err.message),
  });

  const toggleItemActive = useMutation({
    mutationFn: (item: MenuItem) =>
      adminApi.updateItem(item.id, { active: !item.active }),
    onSuccess: () => {
      setError(null);
      invalidateMenu();
    },
    onError: (err: Error) => setError(err.message),
  });

  const toggleItemAvailable = useMutation({
    mutationFn: (item: MenuItem) =>
      adminApi.setItemAvailability(item.id, !(item.available !== false)),
    onSuccess: () => {
      setError(null);
      invalidateMenu();
    },
    onError: (err: Error) => setError(err.message),
  });

  function startEditItem(item: MenuItem) {
    setEditingItemId(item.id);
    setItemForm({
      categoryId: item.categoryId,
      name: item.name,
      description: item.description ?? "",
      imageUrl: item.imageUrl ?? "",
      price: String(Number(item.price)),
      active: item.active,
    });
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEditItem() {
    setEditingItemId(null);
    setItemForm(
      emptyItemForm(
        filterCategoryId === "all"
          ? categories[0]?.id ?? ""
          : filterCategoryId,
      ),
    );
  }

  function confirmDeleteCategory(category: MenuCategory) {
    if (
      !window.confirm(
        t("confirmDeleteCategory", { name: category.name }),
      )
    ) {
      return;
    }
    deleteCategory.mutate(category.id);
  }

  function confirmDeleteItem(item: MenuItem) {
    if (
      !window.confirm(
        t("confirmDeactivateItem", { name: item.name }),
      )
    ) {
      return;
    }
    deleteItem.mutate(item.id);
  }

  return (
    <div>
      <PageHeader
        title={t("menuTitle")}
        subtitle={t("menuSubtitle")}
      />

      <div className="mb-4 max-w-md">
        <RestaurantSelect
          restaurantId={restaurantId}
          onChange={setRestaurantId}
          restaurants={restaurants}
          disabled={restaurantsLoading}
        />
      </div>

      {error ? (
        <p className="mb-4 rounded-md bg-[var(--danger-soft)] px-3 py-2 text-sm text-[var(--danger)]">
          {error}
        </p>
      ) : null}

      <div className="mb-8 grid gap-4 lg:grid-cols-2">
        <form
          className="space-y-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!restaurantId) {
              setError(t("selectRestaurantFirst"));
              return;
            }
            if (editingCategory) {
              saveCategory.mutate();
              return;
            }
            saveCategory.mutate();
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-semibold">
              {editingCategory ? t("editCategory") : t("newCategory")}
            </h2>
            {editingCategory ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditingCategory(null);
                  setCategoryName("");
                }}
              >
                {t("cancel")}
              </Button>
            ) : null}
          </div>
          <input
            value={editingCategory ? editingCategory.name : categoryName}
            onChange={(e) => {
              if (editingCategory) {
                setEditingCategory({
                  ...editingCategory,
                  name: e.target.value,
                });
              } else {
                setCategoryName(e.target.value);
              }
            }}
            placeholder={t("categoryNamePlaceholder")}
            className="h-11 w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
            required
          />
          <Button
            type="submit"
            disabled={saveCategory.isPending || !restaurantId}
          >
            {saveCategory.isPending
              ? t("saving")
              : editingCategory
                ? t("updateCategory")
                : t("addCategory")}
          </Button>
        </form>

        <form
          className="space-y-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4"
          onSubmit={(e) => {
            e.preventDefault();
            saveItem.mutate();
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-semibold">
              {editingItemId ? t("editItem") : t("newItem")}
            </h2>
            {editingItemId ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={cancelEditItem}
              >
                {t("cancel")}
              </Button>
            ) : null}
          </div>
          <select
            value={itemForm.categoryId}
            onChange={(e) =>
              setItemForm((f) => ({ ...f, categoryId: e.target.value }))
            }
            className="h-11 w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
            required
          >
            <option value="" disabled>
              {t("selectCategory")}
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            value={itemForm.name}
            onChange={(e) =>
              setItemForm((f) => ({ ...f, name: e.target.value }))
            }
            placeholder={t("itemNamePlaceholder")}
            className="h-11 w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
            required
          />
          <textarea
            value={itemForm.description}
            onChange={(e) =>
              setItemForm((f) => ({ ...f, description: e.target.value }))
            }
            placeholder={t("descriptionOptional")}
            className="min-h-24 w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3 py-2"
          />
          <div className="space-y-2">
            <p className="text-sm font-medium">{t("menuPhotoLibrary")}</p>
            <p className="text-xs text-[var(--muted)]">
              {t("menuPhotoLibraryBody")}
            </p>
            {photoLibrary.length === 0 ? (
              <p className="text-sm text-[var(--muted)]">{t("menuPhotoEmpty")}</p>
            ) : (
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                {photoLibrary.map((url) => {
                  const selected = itemForm.imageUrl === url;
                  return (
                    <button
                      key={url}
                      type="button"
                      onClick={() =>
                        setItemForm((f) => ({
                          ...f,
                          imageUrl: selected ? "" : url,
                        }))
                      }
                      className={`overflow-hidden rounded-lg ring-2 ${
                        selected
                          ? "ring-[var(--accent)]"
                          : "ring-transparent hover:ring-[var(--line)]"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt=""
                        className="aspect-square h-16 w-full object-cover sm:h-20"
                      />
                    </button>
                  );
                })}
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2">
              <ImageUploadButton
                label={t("uploadMenuPhoto")}
                restaurantId={restaurantId}
                onUploaded={(url) => {
                  setItemForm((f) => ({ ...f, imageUrl: url }));
                  void persistPhotoLibrary([...photoLibrary, url]);
                }}
              />
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setItemForm((f) => ({ ...f, imageUrl: "" }))}
              >
                {t("noImage")}
              </Button>
            </div>
            <details className="rounded-md border border-[var(--line)] bg-[var(--paper)] px-3 py-2">
              <summary className="cursor-pointer text-sm text-[var(--muted)]">
                {t("samplePhotos")}
              </summary>
              <select
                value={
                  LOCAL_MENU_IMAGE_OPTIONS.some(
                    (o) => o.key === itemForm.imageUrl,
                  )
                    ? itemForm.imageUrl
                    : ""
                }
                onChange={(e) =>
                  setItemForm((f) => ({ ...f, imageUrl: e.target.value }))
                }
                className="mt-2 h-11 w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
              >
                <option value="">{t("noImage")}</option>
                {LOCAL_MENU_IMAGE_OPTIONS.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </details>
            {itemForm.imageUrl &&
            !LOCAL_MENU_IMAGE_OPTIONS.some(
              (o) => o.key === itemForm.imageUrl,
            ) &&
            !photoLibrary.includes(itemForm.imageUrl) ? (
              <input
                value={itemForm.imageUrl}
                onChange={(e) =>
                  setItemForm((f) => ({ ...f, imageUrl: e.target.value }))
                }
                placeholder="https://…"
                className="h-11 w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
                type="url"
              />
            ) : null}
            {menuImagePreviewSrc(itemForm.imageUrl) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={menuImagePreviewSrc(itemForm.imageUrl)!}
                alt=""
                className="h-20 w-20 rounded-lg object-cover"
              />
            ) : null}
          </div>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={itemForm.price}
            onChange={(e) =>
              setItemForm((f) => ({ ...f, price: e.target.value }))
            }
            placeholder={t("pricePlaceholder")}
            className="h-11 w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
            required
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={itemForm.active}
              onChange={(e) =>
                setItemForm((f) => ({ ...f, active: e.target.checked }))
              }
            />
            {t("activeOnCustomerMenu")}
          </label>
          <Button
            type="submit"
            disabled={
              saveItem.isPending || !itemForm.categoryId || !restaurantId
            }
          >
            {saveItem.isPending
              ? t("saving")
              : editingItemId
                ? t("updateItem")
                : t("addItem")}
          </Button>
        </form>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            {t("categories")}
          </p>
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => setFilterCategoryId("all")}
              className={`block w-full rounded-md px-3 py-2 text-left text-sm font-medium ${
                filterCategoryId === "all"
                  ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "hover:bg-[var(--surface-2)]"
              }`}
            >
              {t("allItems")}
            </button>
            {categories.map((category) => (
              <div
                key={category.id}
                className={`rounded-md ${
                  filterCategoryId === category.id
                    ? "bg-[var(--accent-soft)]"
                    : "hover:bg-[var(--surface-2)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setFilterCategoryId(category.id)}
                  className={`block w-full px-3 pt-2 text-left text-sm font-medium ${
                    filterCategoryId === category.id
                      ? "text-[var(--accent)]"
                      : ""
                  }`}
                >
                  {category.name}
                </button>
                <div className="flex gap-1 px-2 pb-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditingCategory(category);
                      setCategoryName(category.name);
                    }}
                  >
                    {t("edit")}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    disabled={deleteCategory.isPending}
                    onClick={() => confirmDeleteCategory(category)}
                  >
                    {t("delete")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="rounded-xl border border-[var(--line)] bg-[var(--surface)]">
          {!restaurantId || restaurantsLoading ? (
            <p className="p-4 text-[var(--muted)]">{t("loadingRestaurant")}</p>
          ) : itemsQuery.isLoading ? (
            <p className="p-4 text-[var(--muted)]">{t("loadingItems")}</p>
          ) : itemsQuery.isError ? (
            <p className="p-4 text-[var(--danger)]">
              {(itemsQuery.error as Error).message}
            </p>
          ) : items.length === 0 ? (
            <p className="p-4 text-[var(--muted)]">{t("noItemsYet")}</p>
          ) : (
            <ul className="divide-y divide-[var(--line)]">
              {items.map((item) => (
                <li key={item.id} className="px-4 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    {menuImagePreviewSrc(item.imageUrl) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={menuImagePreviewSrc(item.imageUrl)!}
                        alt=""
                        className="h-14 w-14 shrink-0 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-[var(--surface-2)] text-xs text-[var(--muted)]">
                        {t("noImg")}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold">{item.name}</p>
                      {item.description ? (
                        <p className="truncate text-sm text-[var(--muted)]">
                          {item.description}
                        </p>
                      ) : null}
                      <p className="text-sm text-[var(--muted)]">
                        {item.active ? t("onMenu") : t("hidden")} ·{" "}
                        {item.available !== false
                          ? t("available")
                          : t("soldOut")}{" "}
                        · {Number(item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => startEditItem(item)}
                    >
                      {t("edit")}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setModifiersItemId((id) =>
                          id === item.id ? null : item.id,
                        )
                      }
                    >
                      Modifiers
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant={
                        item.available !== false ? "outline" : "default"
                      }
                      disabled={
                        toggleItemAvailable.isPending || !item.active
                      }
                      onClick={() => toggleItemAvailable.mutate(item)}
                    >
                      {item.available !== false
                        ? t("markSoldOut")
                        : t("markAvailable")}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      disabled={toggleItemActive.isPending}
                      onClick={() => toggleItemActive.mutate(item)}
                    >
                      {item.active ? t("hideFromMenu") : t("showOnMenu")}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      disabled={deleteItem.isPending}
                      onClick={() => confirmDeleteItem(item)}
                    >
                      {t("delete")}
                    </Button>
                  </div>
                  </div>
                  {modifiersItemId === item.id ? (
                    <MenuModifiersPanel
                      menuItemId={item.id}
                      itemName={item.name}
                      onClose={() => setModifiersItemId(null)}
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
