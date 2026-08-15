"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";
import {
  LOCAL_MENU_IMAGE_OPTIONS,
  menuImagePreviewSrc,
} from "@/lib/menu-images";
import type { MenuCategory, MenuItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { ImageUploadButton } from "@/components/image-upload-button";
import {
  RestaurantSelect,
  useSelectedRestaurant,
} from "@/hooks/use-selected-restaurant";

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

  React.useEffect(() => {
    setFilterCategoryId("all");
    setEditingCategory(null);
    setEditingItemId(null);
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
      if (!name) throw new Error("Category name is required");
      if (editingCategory) {
        return adminApi.updateCategory(editingCategory.id, { name });
      }
      if (!restaurantId) throw new Error("Select a restaurant first.");
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
      if (!restaurantId) throw new Error("Select a restaurant first.");
      if (!itemForm.categoryId) throw new Error("Select a category.");
      const price = Number(itemForm.price);
      if (!Number.isFinite(price) || price < 0.01) {
        throw new Error("Enter a valid price.");
      }

      const payload = {
        categoryId: itemForm.categoryId,
        name: itemForm.name.trim(),
        description: itemForm.description.trim() || undefined,
        imageUrl: itemForm.imageUrl.trim() || undefined,
        price,
        active: itemForm.active,
      };

      if (!payload.name) throw new Error("Item name is required");

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
    onSuccess: () => {
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
        `Delete category "${category.name}"? It must have no menu items.`,
      )
    ) {
      return;
    }
    deleteCategory.mutate(category.id);
  }

  function confirmDeleteItem(item: MenuItem) {
    if (
      !window.confirm(
        `Deactivate "${item.name}"? It will be hidden from the customer menu.`,
      )
    ) {
      return;
    }
    deleteItem.mutate(item.id);
  }

  const items = itemsQuery.data ?? [];

  return (
    <div>
      <PageHeader
        title="Menu"
        subtitle="Manage catalog items. Mark sold out when finished; activate again when available."
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
              setError("Select a restaurant first.");
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
              {editingCategory ? "Edit category" : "New category"}
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
                Cancel
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
            placeholder="Category name"
            className="h-11 w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
            required
          />
          <Button
            type="submit"
            disabled={saveCategory.isPending || !restaurantId}
          >
            {saveCategory.isPending
              ? "Saving…"
              : editingCategory
                ? "Update category"
                : "Add category"}
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
              {editingItemId ? "Edit item" : "New item"}
            </h2>
            {editingItemId ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={cancelEditItem}
              >
                Cancel
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
              Select category
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
            placeholder="Item name"
            className="h-11 w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
            required
          />
          <textarea
            value={itemForm.description}
            onChange={(e) =>
              setItemForm((f) => ({ ...f, description: e.target.value }))
            }
            placeholder="Description (optional)"
            className="min-h-24 w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3 py-2"
          />
          <div className="space-y-2">
            <select
              value={
                LOCAL_MENU_IMAGE_OPTIONS.some((o) => o.key === itemForm.imageUrl)
                  ? itemForm.imageUrl
                  : itemForm.imageUrl
                    ? "__custom__"
                    : ""
              }
              onChange={(e) => {
                const v = e.target.value;
                if (v === "__custom__") {
                  setItemForm((f) => ({
                    ...f,
                    imageUrl: /^https?:\/\//i.test(f.imageUrl)
                      ? f.imageUrl
                      : "https://",
                  }));
                  return;
                }
                setItemForm((f) => ({ ...f, imageUrl: v }));
              }}
              className="h-11 w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
            >
              <option value="">No image</option>
              {LOCAL_MENU_IMAGE_OPTIONS.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
              <option value="__custom__">Custom URL…</option>
            </select>
            {itemForm.imageUrl &&
            !LOCAL_MENU_IMAGE_OPTIONS.some((o) => o.key === itemForm.imageUrl) ? (
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
            <ImageUploadButton
              label="Upload menu photo"
              onUploaded={(url) =>
                setItemForm((f) => ({ ...f, imageUrl: url }))
              }
            />
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
            placeholder="Price"
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
            Active on customer menu
          </label>
          <Button
            type="submit"
            disabled={
              saveItem.isPending || !itemForm.categoryId || !restaurantId
            }
          >
            {saveItem.isPending
              ? "Saving…"
              : editingItemId
                ? "Update item"
                : "Add item"}
          </Button>
        </form>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            Categories
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
              All items
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
                    Edit
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    disabled={deleteCategory.isPending}
                    onClick={() => confirmDeleteCategory(category)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="rounded-xl border border-[var(--line)] bg-[var(--surface)]">
          {!restaurantId || restaurantsLoading ? (
            <p className="p-4 text-[var(--muted)]">Loading restaurant…</p>
          ) : itemsQuery.isLoading ? (
            <p className="p-4 text-[var(--muted)]">Loading items…</p>
          ) : itemsQuery.isError ? (
            <p className="p-4 text-[var(--danger)]">
              {(itemsQuery.error as Error).message}
            </p>
          ) : items.length === 0 ? (
            <p className="p-4 text-[var(--muted)]">No items yet.</p>
          ) : (
            <ul className="divide-y divide-[var(--line)]">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
                >
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
                        No img
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
                        {item.active ? "On menu" : "Hidden"} ·{" "}
                        {item.available !== false ? "Available" : "Sold out"} ·{" "}
                        {Number(item.price).toFixed(2)}
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
                      Edit
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
                        ? "Mark sold out"
                        : "Mark available"}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      disabled={toggleItemActive.isPending}
                      onClick={() => toggleItemActive.mutate(item)}
                    >
                      {item.active ? "Hide from menu" : "Show on menu"}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      disabled={deleteItem.isPending}
                      onClick={() => confirmDeleteItem(item)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
