"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";
import { getStoredUser } from "@/lib/session";
import type { Restaurant } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { ImageUploadButton } from "@/components/image-upload-button";
import { BrandBackgroundGallery } from "@/components/brand-background-gallery";

const CUSTOMER_URL =
  process.env.NEXT_PUBLIC_CUSTOMER_URL ?? "http://localhost:3001";

/** Apex used for Pattern B tenant hosts (alhuda.maylesoft.com). */
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN?.trim() || "";

function guestBaseUrl(restaurantSlug?: string | null) {
  if (ROOT_DOMAIN && restaurantSlug) {
    return `https://${restaurantSlug}.${ROOT_DOMAIN}`;
  }
  return CUSTOMER_URL.replace(/\/$/, "");
}

const DEFAULT_BRAND = {
  accent: "#c9a86a",
  button: "#234128",
  paper: "#f8f5ef",
} as const;

type RestaurantFormState = {
  name: string;
  slug: string;
  email: string;
  phone: string;
  address: string;
  logoUrl: string;
  brandAccent: string;
  brandButton: string;
  brandPaper: string;
  brandBackgroundUrls: string[];
  active: boolean;
};

const emptyForm: RestaurantFormState = {
  name: "",
  slug: "",
  email: "",
  phone: "",
  address: "",
  logoUrl: "",
  brandAccent: DEFAULT_BRAND.accent,
  brandButton: DEFAULT_BRAND.button,
  brandPaper: DEFAULT_BRAND.paper,
  brandBackgroundUrls: [],
  active: true,
};

function backgroundUrlsFromRestaurant(restaurant: Restaurant): string[] {
  const gallery = (restaurant.brandBackgroundUrls ?? []).filter(Boolean);
  if (gallery.length) return gallery;
  return restaurant.brandBackgroundUrl ? [restaurant.brandBackgroundUrl] : [];
}

function brandFieldsFromRestaurant(restaurant: Restaurant): Pick<
  RestaurantFormState,
  | "logoUrl"
  | "brandAccent"
  | "brandButton"
  | "brandPaper"
  | "brandBackgroundUrls"
> {
  return {
    logoUrl: restaurant.logoUrl ?? "",
    brandAccent: restaurant.brandAccent ?? DEFAULT_BRAND.accent,
    brandButton: restaurant.brandButton ?? DEFAULT_BRAND.button,
    brandPaper: restaurant.brandPaper ?? DEFAULT_BRAND.paper,
    brandBackgroundUrls: backgroundUrlsFromRestaurant(restaurant),
  };
}

export function RestaurantsPage() {
  const queryClient = useQueryClient();
  const user = getStoredUser();
  const isPlatformAdmin = user?.role === "PLATFORM_ADMIN";

  const [form, setForm] = React.useState<RestaurantFormState>(emptyForm);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const [branchRestaurantId, setBranchRestaurantId] = React.useState("");
  const [branchName, setBranchName] = React.useState("");
  const [branchError, setBranchError] = React.useState<string | null>(null);
  const [branchSuccess, setBranchSuccess] = React.useState<string | null>(null);

  const restaurantsQuery = useQuery({
    queryKey: ["admin-restaurants"],
    queryFn: () => adminApi.listRestaurants(),
  });

  const branchesQuery = useQuery({
    queryKey: ["admin-branches"],
    queryFn: () => adminApi.listBranches(),
  });

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setError(null);
  }

  function startEdit(restaurant: Restaurant) {
    setEditingId(restaurant.id);
    setForm({
      name: restaurant.name,
      slug: restaurant.slug ?? "",
      email: restaurant.email ?? "",
      phone: restaurant.phone ?? "",
      address: restaurant.address ?? "",
      active: restaurant.active !== false,
      ...brandFieldsFromRestaurant(restaurant),
    });
    setError(null);
    setSuccess(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const saveRestaurant = useMutation({
    mutationFn: async () => {
      const body = {
        name: form.name.trim(),
        slug: form.slug.trim().toLowerCase() || undefined,
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim() || undefined,
        logoUrl: form.logoUrl.trim() || null,
        brandAccent: form.brandAccent.trim() || null,
        brandButton: form.brandButton.trim() || null,
        brandPaper: form.brandPaper.trim() || null,
        brandBackgroundUrls: form.brandBackgroundUrls,
        brandBackgroundUrl: form.brandBackgroundUrls[0] ?? null,
      };
      if (editingId) {
        return adminApi.updateRestaurant(editingId, {
          ...body,
          active: form.active,
        });
      }
      return adminApi.createRestaurant(body);
    },
    onSuccess: (restaurant) => {
      const wasEdit = !!editingId;
      resetForm();
      setSuccess(
        wasEdit
          ? `Updated “${restaurant.name}”.`
          : `Created “${restaurant.name}”. Add a branch next.`,
      );
      if (!wasEdit) setBranchRestaurantId(restaurant.id);
      void queryClient.invalidateQueries({ queryKey: ["admin-restaurants"] });
    },
    onError: (err: Error) => {
      setSuccess(null);
      setError(err.message);
    },
  });

  const deleteRestaurant = useMutation({
    mutationFn: (id: string) => adminApi.deleteRestaurant(id),
    onSuccess: (restaurant) => {
      if (editingId === restaurant.id) resetForm();
      setSuccess(`Deactivated “${restaurant.name}”.`);
      void queryClient.invalidateQueries({ queryKey: ["admin-restaurants"] });
    },
    onError: (err: Error) => {
      setSuccess(null);
      setError(err.message);
    },
  });

  const createBranch = useMutation({
    mutationFn: () =>
      adminApi.createBranch({
        name: branchName.trim(),
        restaurantId: branchRestaurantId,
      }),
    onSuccess: (branch) => {
      setBranchName("");
      setBranchError(null);
      const restaurant = restaurantsQuery.data?.find(
        (r) => r.id === branch.restaurantId,
      );
      const base = guestBaseUrl(restaurant?.slug);
      setBranchSuccess(
        `Branch “${branch.name}” created. Walk-in: ${base}/w/${branch.walkInToken}`,
      );
      void queryClient.invalidateQueries({ queryKey: ["admin-branches"] });
    },
    onError: (err: Error) => {
      setBranchSuccess(null);
      setBranchError(err.message);
    },
  });

  const rotateWalkIn = useMutation({
    mutationFn: (id: string) => adminApi.rotateWalkInToken(id),
    onSuccess: (branch) => {
      setBranchError(null);
      const restaurant = restaurantsQuery.data?.find(
        (r) => r.id === branch.restaurantId,
      );
      const base = guestBaseUrl(restaurant?.slug);
      setBranchSuccess(
        `Rotated walk-in link for “${branch.name}”: ${base}/w/${branch.walkInToken}`,
      );
      void queryClient.invalidateQueries({ queryKey: ["admin-branches"] });
    },
    onError: (err: Error) => setBranchError(err.message),
  });

  const [ownerBrand, setOwnerBrand] = React.useState<{
    logoUrl: string;
    brandAccent: string;
    brandButton: string;
    brandPaper: string;
    brandBackgroundUrls: string[];
  }>({
    logoUrl: "",
    brandAccent: DEFAULT_BRAND.accent,
    brandButton: DEFAULT_BRAND.button,
    brandPaper: DEFAULT_BRAND.paper,
    brandBackgroundUrls: [],
  });
  const [brandError, setBrandError] = React.useState<string | null>(null);
  const [brandSuccess, setBrandSuccess] = React.useState<string | null>(null);

  const restaurants = restaurantsQuery.data ?? [];
  const branches = branchesQuery.data ?? [];
  const isOwner = user?.role === "RESTAURANT_OWNER";
  const canCreateBranch = isPlatformAdmin || isOwner;
  const ownedRestaurantId =
    user?.restaurantId ??
    (restaurants.length === 1 ? restaurants[0].id : "");
  const ownedRestaurant =
    restaurants.find((r) => r.id === ownedRestaurantId) ?? restaurants[0];
  const ownerBranches = ownedRestaurantId
    ? branches.filter((b) => b.restaurantId === ownedRestaurantId)
    : branches;

  React.useEffect(() => {
    if (!ownedRestaurant) return;
    setOwnerBrand(brandFieldsFromRestaurant(ownedRestaurant));
  }, [
    ownedRestaurant?.id,
    ownedRestaurant?.logoUrl,
    ownedRestaurant?.brandAccent,
    ownedRestaurant?.brandButton,
    ownedRestaurant?.brandPaper,
    ownedRestaurant?.brandBackgroundUrl,
    ownedRestaurant?.brandBackgroundUrls,
  ]);

  const saveOwnerBrand = useMutation({
    mutationFn: () => {
      if (!ownedRestaurantId) throw new Error("No restaurant assigned");
      return adminApi.updateRestaurant(ownedRestaurantId, {
        logoUrl: ownerBrand.logoUrl.trim() || null,
        brandAccent: ownerBrand.brandAccent.trim() || null,
        brandButton: ownerBrand.brandButton.trim() || null,
        brandPaper: ownerBrand.brandPaper.trim() || null,
        brandBackgroundUrls: ownerBrand.brandBackgroundUrls,
        brandBackgroundUrl: ownerBrand.brandBackgroundUrls[0] ?? null,
      });
    },
    onSuccess: () => {
      setBrandError(null);
      setBrandSuccess("Customer brand saved.");
      void queryClient.invalidateQueries({ queryKey: ["admin-restaurants"] });
    },
    onError: (err: Error) => {
      setBrandSuccess(null);
      setBrandError(err.message);
    },
  });

  React.useEffect(() => {
    if (isOwner && ownedRestaurantId) {
      setBranchRestaurantId(ownedRestaurantId);
      return;
    }
    if (!branchRestaurantId && restaurants.length > 0) {
      setBranchRestaurantId(restaurants[0].id);
    }
  }, [restaurants, branchRestaurantId, isOwner, ownedRestaurantId]);

  const inputClass =
    "h-11 rounded-md border border-[var(--line)] bg-[var(--paper)] px-3";

  return (
    <div>
      <PageHeader
        title={isPlatformAdmin ? "Restaurants" : "Branches"}
        subtitle={
          isPlatformAdmin
            ? "Create, edit, and deactivate restaurants. Add branches after creating a restaurant."
            : `Add and manage branches${ownedRestaurant ? ` for ${ownedRestaurant.name}` : ""}.`
        }
      />

      {isPlatformAdmin ? (
        <form
          className="mb-8 grid gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            saveRestaurant.mutate();
          }}
        >
          <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold">
              {editingId ? "Edit restaurant" : "New restaurant"}
            </h2>
            {editingId ? (
              <Button type="button" variant="outline" size="sm" onClick={resetForm}>
                Cancel edit
              </Button>
            ) : null}
          </div>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Restaurant name"
            className={`${inputClass} md:col-span-2`}
            required
          />
          <div className="md:col-span-2 space-y-1.5">
            <input
              value={form.slug}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  slug: e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9-]/g, ""),
                }))
              }
              placeholder="Subdomain slug (e.g. alhuda)"
              className={inputClass}
              pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
              title="Lowercase letters, numbers, and hyphens"
            />
            <p className="text-xs text-[var(--muted)]">
              {ROOT_DOMAIN
                ? `Guest site: https://${form.slug.trim() || "slug"}.${ROOT_DOMAIN}`
                : "Used for guest subdomain (set NEXT_PUBLIC_ROOT_DOMAIN on admin + customer)."}
            </p>
          </div>
          <input
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            type="email"
            placeholder="Contact email"
            className={inputClass}
            required
          />
          <input
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            placeholder="Phone"
            className={inputClass}
            required
          />
          <input
            value={form.address}
            onChange={(e) =>
              setForm((f) => ({ ...f, address: e.target.value }))
            }
            placeholder="Address (optional)"
            className={`${inputClass} md:col-span-2`}
          />
          <div className="md:col-span-2 space-y-2">
            <span className="text-sm font-medium text-[var(--muted)]">Logo</span>
            <div className="flex flex-wrap items-center gap-2">
              <ImageUploadButton
                label="Upload logo"
                onUploaded={(url) => setForm((f) => ({ ...f, logoUrl: url }))}
              />
              <input
                value={form.logoUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, logoUrl: e.target.value }))
                }
                placeholder="Or paste logo URL"
                className={`${inputClass} min-w-[12rem] flex-1`}
              />
            </div>
            {form.logoUrl.trim() ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={form.logoUrl.trim()}
                alt=""
                className="h-16 w-16 rounded-full object-cover ring-2 ring-[var(--accent)]/40"
              />
            ) : null}
          </div>
          <div className="md:col-span-2 grid gap-3 sm:grid-cols-3">
            <label className="space-y-1.5 text-sm">
              <span className="font-medium text-[var(--muted)]">Accent</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={form.brandAccent}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, brandAccent: e.target.value }))
                  }
                  className="h-10 w-12 cursor-pointer rounded border border-[var(--line)] bg-transparent p-1"
                />
                <input
                  value={form.brandAccent}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, brandAccent: e.target.value }))
                  }
                  className={inputClass}
                  pattern="^#[0-9A-Fa-f]{6}$"
                  placeholder="#c9a86a"
                />
              </div>
            </label>
            <label className="space-y-1.5 text-sm">
              <span className="font-medium text-[var(--muted)]">Button</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={form.brandButton}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, brandButton: e.target.value }))
                  }
                  className="h-10 w-12 cursor-pointer rounded border border-[var(--line)] bg-transparent p-1"
                />
                <input
                  value={form.brandButton}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, brandButton: e.target.value }))
                  }
                  className={inputClass}
                  pattern="^#[0-9A-Fa-f]{6}$"
                  placeholder="#234128"
                />
              </div>
            </label>
            <label className="space-y-1.5 text-sm">
              <span className="font-medium text-[var(--muted)]">Paper</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={form.brandPaper}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, brandPaper: e.target.value }))
                  }
                  className="h-10 w-12 cursor-pointer rounded border border-[var(--line)] bg-transparent p-1"
                />
                <input
                  value={form.brandPaper}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, brandPaper: e.target.value }))
                  }
                  className={inputClass}
                  pattern="^#[0-9A-Fa-f]{6}$"
                  placeholder="#f8f5ef"
                />
              </div>
            </label>
          </div>
          <BrandBackgroundGallery
            urls={form.brandBackgroundUrls}
            onChange={(brandBackgroundUrls) =>
              setForm((f) => ({ ...f, brandBackgroundUrls }))
            }
            inputClass={inputClass}
          />
          {editingId ? (
            <label className="md:col-span-2 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) =>
                  setForm((f) => ({ ...f, active: e.target.checked }))
                }
              />
              Active
            </label>
          ) : null}
          <Button
            type="submit"
            className="md:col-span-2"
            disabled={saveRestaurant.isPending}
          >
            {saveRestaurant.isPending
              ? "Saving…"
              : editingId
                ? "Save changes"
                : "Create restaurant"}
          </Button>
          {error ? (
            <p className="md:col-span-2 text-sm text-[var(--danger)]">{error}</p>
          ) : null}
          {success ? (
            <p className="md:col-span-2 text-sm text-[var(--accent)]">
              {success}
            </p>
          ) : null}
        </form>
      ) : null}

      {isOwner && ownedRestaurantId ? (
        <form
          className="mb-8 grid gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            saveOwnerBrand.mutate();
          }}
        >
          <h2 className="md:col-span-2 text-lg font-semibold">
            Customer brand
          </h2>
          <p className="md:col-span-2 text-sm text-[var(--muted)]">
            Logo, colors, and cinematic background reel for the guest menu.
          </p>
          <div className="md:col-span-2 space-y-2">
            <span className="text-sm font-medium text-[var(--muted)]">Logo</span>
            <div className="flex flex-wrap items-center gap-2">
              <ImageUploadButton
                label="Upload logo"
                onUploaded={(url) =>
                  setOwnerBrand((b) => ({ ...b, logoUrl: url }))
                }
              />
              <input
                value={ownerBrand.logoUrl}
                onChange={(e) =>
                  setOwnerBrand((b) => ({ ...b, logoUrl: e.target.value }))
                }
                placeholder="Or paste logo URL"
                className={`${inputClass} min-w-[12rem] flex-1`}
              />
            </div>
            {ownerBrand.logoUrl.trim() ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={ownerBrand.logoUrl.trim()}
                alt=""
                className="h-16 w-16 rounded-full object-cover ring-2 ring-[var(--accent)]/40"
              />
            ) : null}
          </div>
          <div className="md:col-span-2 grid gap-3 sm:grid-cols-3">
            <label className="space-y-1.5 text-sm">
              <span className="font-medium text-[var(--muted)]">Accent</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={ownerBrand.brandAccent}
                  onChange={(e) =>
                    setOwnerBrand((b) => ({
                      ...b,
                      brandAccent: e.target.value,
                    }))
                  }
                  className="h-10 w-12 cursor-pointer rounded border border-[var(--line)] bg-transparent p-1"
                />
                <input
                  value={ownerBrand.brandAccent}
                  onChange={(e) =>
                    setOwnerBrand((b) => ({
                      ...b,
                      brandAccent: e.target.value,
                    }))
                  }
                  className={inputClass}
                  pattern="^#[0-9A-Fa-f]{6}$"
                />
              </div>
            </label>
            <label className="space-y-1.5 text-sm">
              <span className="font-medium text-[var(--muted)]">Button</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={ownerBrand.brandButton}
                  onChange={(e) =>
                    setOwnerBrand((b) => ({
                      ...b,
                      brandButton: e.target.value,
                    }))
                  }
                  className="h-10 w-12 cursor-pointer rounded border border-[var(--line)] bg-transparent p-1"
                />
                <input
                  value={ownerBrand.brandButton}
                  onChange={(e) =>
                    setOwnerBrand((b) => ({
                      ...b,
                      brandButton: e.target.value,
                    }))
                  }
                  className={inputClass}
                  pattern="^#[0-9A-Fa-f]{6}$"
                />
              </div>
            </label>
            <label className="space-y-1.5 text-sm">
              <span className="font-medium text-[var(--muted)]">Paper</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={ownerBrand.brandPaper}
                  onChange={(e) =>
                    setOwnerBrand((b) => ({
                      ...b,
                      brandPaper: e.target.value,
                    }))
                  }
                  className="h-10 w-12 cursor-pointer rounded border border-[var(--line)] bg-transparent p-1"
                />
                <input
                  value={ownerBrand.brandPaper}
                  onChange={(e) =>
                    setOwnerBrand((b) => ({
                      ...b,
                      brandPaper: e.target.value,
                    }))
                  }
                  className={inputClass}
                  pattern="^#[0-9A-Fa-f]{6}$"
                />
              </div>
            </label>
          </div>
          <BrandBackgroundGallery
            urls={ownerBrand.brandBackgroundUrls}
            onChange={(brandBackgroundUrls) =>
              setOwnerBrand((b) => ({ ...b, brandBackgroundUrls }))
            }
            inputClass={inputClass}
          />
          <Button
            type="submit"
            className="md:col-span-2"
            disabled={saveOwnerBrand.isPending}
          >
            {saveOwnerBrand.isPending ? "Saving…" : "Save brand"}
          </Button>
          {brandError ? (
            <p className="md:col-span-2 text-sm text-[var(--danger)]">
              {brandError}
            </p>
          ) : null}
          {brandSuccess ? (
            <p className="md:col-span-2 text-sm text-[var(--accent)]">
              {brandSuccess}
            </p>
          ) : null}
        </form>
      ) : null}

      {canCreateBranch ? (
        <form
          className="mb-8 grid gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            createBranch.mutate();
          }}
        >
          <h2 className="md:col-span-2 text-lg font-semibold">New branch</h2>
          {isOwner ? (
            <p className="md:col-span-2 text-sm text-[var(--muted)]">
              Restaurant:{" "}
              <span className="font-medium text-[var(--ink)]">
                {ownedRestaurant?.name ?? "—"}
              </span>
            </p>
          ) : (
            <select
              value={branchRestaurantId}
              onChange={(e) => setBranchRestaurantId(e.target.value)}
              className={inputClass}
              required
            >
              {restaurants.length === 0 ? (
                <option value="">No restaurants yet</option>
              ) : (
                restaurants.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                    {r.active === false ? " (inactive)" : ""}
                  </option>
                ))
              )}
            </select>
          )}
          <input
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            placeholder="Branch name (e.g. Helsinki Downtown)"
            className={`${inputClass}${isOwner ? " md:col-span-2" : ""}`}
            required
          />
          <Button
            type="submit"
            className="md:col-span-2"
            disabled={
              createBranch.isPending ||
              !branchRestaurantId ||
              restaurants.length === 0
            }
          >
            {createBranch.isPending ? "Creating…" : "Create branch"}
          </Button>
          {branchError ? (
            <p className="md:col-span-2 text-sm text-[var(--danger)]">
              {branchError}
            </p>
          ) : null}
          {branchSuccess ? (
            <p className="md:col-span-2 text-sm text-[var(--accent)]">
              {branchSuccess}
            </p>
          ) : null}
        </form>
      ) : (
        <p className="mb-8 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]">
          Branch creation is limited to restaurant owners and platform admins.
        </p>
      )}

      {isPlatformAdmin ? (
        restaurantsQuery.isLoading ? (
          <p className="text-[var(--muted)]">Loading restaurants…</p>
        ) : restaurantsQuery.isError ? (
          <p className="text-[var(--danger)]">
            {(restaurantsQuery.error as Error).message}
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-[var(--line)]">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-[var(--surface-2)] text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Branches</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((restaurant) => {
                  const count = branches.filter(
                    (b) => b.restaurantId === restaurant.id,
                  ).length;
                  const active = restaurant.active !== false;
                  return (
                    <tr
                      key={restaurant.id}
                      className="border-t border-[var(--line)] bg-[var(--surface)]"
                    >
                      <td className="px-4 py-3 font-medium">
                        <div>{restaurant.name}</div>
                        {restaurant.slug ? (
                          <div className="mt-0.5 font-mono text-xs font-normal text-[var(--muted)]">
                            {ROOT_DOMAIN
                              ? `${restaurant.slug}.${ROOT_DOMAIN}`
                              : restaurant.slug}
                          </div>
                        ) : null}
                      </td>
                      <td className="px-4 py-3">{restaurant.email ?? "—"}</td>
                      <td className="px-4 py-3">{restaurant.phone ?? "—"}</td>
                      <td className="px-4 py-3">{count}</td>
                      <td className="px-4 py-3">
                        {active ? "Active" : "Inactive"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => startEdit(restaurant)}
                          >
                            Edit
                          </Button>
                          {active ? (
                            <Button
                              type="button"
                              size="sm"
                              variant="danger"
                              disabled={deleteRestaurant.isPending}
                              onClick={() => {
                                if (
                                  window.confirm(
                                    `Deactivate “${restaurant.name}”? You can reactivate it later by editing.`,
                                  )
                                ) {
                                  deleteRestaurant.mutate(restaurant.id);
                                }
                              }}
                            >
                              Deactivate
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              size="sm"
                              variant="secondary"
                              disabled={saveRestaurant.isPending}
                              onClick={() =>
                                adminApi
                                  .updateRestaurant(restaurant.id, {
                                    active: true,
                                  })
                                  .then(() => {
                                    setSuccess(
                                      `Reactivated “${restaurant.name}”.`,
                                    );
                                    void queryClient.invalidateQueries({
                                      queryKey: ["admin-restaurants"],
                                    });
                                  })
                                  .catch((err: Error) => setError(err.message))
                              }
                            >
                              Reactivate
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      ) : branchesQuery.isLoading ? (
        <p className="text-[var(--muted)]">Loading branches…</p>
      ) : branchesQuery.isError ? (
        <p className="text-[var(--danger)]">
          {(branchesQuery.error as Error).message}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--line)]">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-[var(--surface-2)] text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3 font-medium">Branch</th>
                <th className="px-4 py-3 font-medium">Restaurant</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {ownerBranches.length === 0 ? (
                <tr className="border-t border-[var(--line)] bg-[var(--surface)]">
                  <td
                    colSpan={3}
                    className="px-4 py-6 text-[var(--muted)]"
                  >
                    No branches yet. Create one above.
                  </td>
                </tr>
              ) : (
                ownerBranches.map((branch) => {
                  const restaurantName =
                    restaurants.find((r) => r.id === branch.restaurantId)
                      ?.name ?? "—";
                  return (
                    <tr
                      key={branch.id}
                      className="border-t border-[var(--line)] bg-[var(--surface)]"
                    >
                      <td className="px-4 py-3 font-medium">{branch.name}</td>
                      <td className="px-4 py-3">{restaurantName}</td>
                      <td className="px-4 py-3">
                        {branch.active !== false ? "Active" : "Inactive"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {(isPlatformAdmin ? branches : ownerBranches).length > 0 ? (
        <div className="mt-10">
          <h2 className="mb-3 text-lg font-semibold">Walk-in guest links</h2>
          <p className="mb-4 text-sm text-[var(--muted)]">
            Share these opaque URLs with guests. Rotating invalidates the old
            link. Pickup TV pairing uses the same token in the path.
          </p>
          <div className="space-y-3">
            {(isPlatformAdmin ? branches : ownerBranches).map((branch) => {
              const restaurant = restaurants.find(
                (r) => r.id === branch.restaurantId,
              );
              const walkInUrl = `${guestBaseUrl(restaurant?.slug)}/w/${branch.walkInToken}`;
              const restaurantName = restaurant?.name ?? "Restaurant";
              return (
                <article
                  key={branch.id}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4"
                >
                  <p className="font-medium">
                    {restaurantName} · {branch.name}
                  </p>
                  <p className="mt-2 break-all font-mono text-xs text-[var(--muted)]">
                    {walkInUrl}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      type="button"
                      onClick={() => void navigator.clipboard.writeText(walkInUrl)}
                    >
                      Copy walk-in URL
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      type="button"
                      disabled={rotateWalkIn.isPending}
                      onClick={() => rotateWalkIn.mutate(branch.id)}
                    >
                      Rotate walk-in token
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
