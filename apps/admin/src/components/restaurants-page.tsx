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
import { restaurantGuestOrigin } from "@/lib/guest-origin";
import { DEFAULT_QR_FRAME, DEFAULT_QR_MODULE, qrPrintColors } from "@/lib/qr-print-card";
import { useLocale } from "@/lib/i18n/locale-provider";

/** Apex used for Pattern B tenant hosts (alhuda.maylesoft.com). */
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN?.trim() || "";

function guestBaseUrl(restaurantSlug?: string | null) {
  return restaurantGuestOrigin(restaurantSlug);
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
  qrFrameColor: string;
  qrModuleColor: string;
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
  qrFrameColor: DEFAULT_QR_FRAME,
  qrModuleColor: DEFAULT_QR_MODULE,
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
  | "qrFrameColor"
  | "qrModuleColor"
> {
  const qr = qrPrintColors(restaurant);
  return {
    logoUrl: restaurant.logoUrl ?? "",
    brandAccent: restaurant.brandAccent ?? DEFAULT_BRAND.accent,
    brandButton: restaurant.brandButton ?? DEFAULT_BRAND.button,
    brandPaper: restaurant.brandPaper ?? DEFAULT_BRAND.paper,
    brandBackgroundUrls: backgroundUrlsFromRestaurant(restaurant),
    qrFrameColor: qr.frame,
    qrModuleColor: qr.module,
  };
}

export function RestaurantsPage() {
  const queryClient = useQueryClient();
  const { t } = useLocale();
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
        qrFrameColor: form.qrFrameColor.trim() || null,
        qrModuleColor: form.qrModuleColor.trim() || null,
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
          ? t("restaurantUpdated", { name: restaurant.name })
          : t("restaurantCreated", { name: restaurant.name }),
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
      setSuccess(t("restaurantDeactivated", { name: restaurant.name }));
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
        t("branchCreated", {
          name: branch.name,
          url: `${base}/w/${branch.walkInToken}`,
        }),
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
        t("walkInRotated", {
          name: branch.name,
          url: `${base}/w/${branch.walkInToken}`,
        }),
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
    qrFrameColor: string;
    qrModuleColor: string;
  }>({
    logoUrl: "",
    brandAccent: DEFAULT_BRAND.accent,
    brandButton: DEFAULT_BRAND.button,
    brandPaper: DEFAULT_BRAND.paper,
    brandBackgroundUrls: [],
    qrFrameColor: DEFAULT_QR_FRAME,
    qrModuleColor: DEFAULT_QR_MODULE,
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
    ownedRestaurant?.qrFrameColor,
    ownedRestaurant?.qrModuleColor,
  ]);

  const saveOwnerBrand = useMutation({
    mutationFn: () => {
      if (!ownedRestaurantId) throw new Error(t("noRestaurantAssigned"));
      return adminApi.updateRestaurant(ownedRestaurantId, {
        logoUrl: ownerBrand.logoUrl.trim() || null,
        brandAccent: ownerBrand.brandAccent.trim() || null,
        brandButton: ownerBrand.brandButton.trim() || null,
        brandPaper: ownerBrand.brandPaper.trim() || null,
        brandBackgroundUrls: ownerBrand.brandBackgroundUrls,
        brandBackgroundUrl: ownerBrand.brandBackgroundUrls[0] ?? null,
        qrFrameColor: ownerBrand.qrFrameColor.trim() || null,
        qrModuleColor: ownerBrand.qrModuleColor.trim() || null,
      });
    },
    onSuccess: () => {
      setBrandError(null);
      setBrandSuccess(t("customerBrandSaved"));
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
        title={isPlatformAdmin ? t("restaurantsTitle") : t("branchesTitle")}
        subtitle={
          isPlatformAdmin
            ? t("restaurantsSubtitle")
            : ownedRestaurant
              ? t("branchesSubtitleNamed", { name: ownedRestaurant.name })
              : t("branchesSubtitle")
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
              {editingId ? t("editRestaurant") : t("newRestaurant")}
            </h2>
            {editingId ? (
              <Button type="button" variant="outline" size="sm" onClick={resetForm}>
                {t("cancelEdit")}
              </Button>
            ) : null}
          </div>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder={t("restaurantNamePlaceholder")}
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
              placeholder={t("slugPlaceholder")}
              className={inputClass}
              pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
              title={t("slugTitle")}
            />
            <p className="text-xs text-[var(--muted)]">
              {ROOT_DOMAIN
                ? t("guestSite", {
                    url: `https://${form.slug.trim() || "slug"}.${ROOT_DOMAIN}`,
                  })
                : t("slugHintNoDomain")}
            </p>
          </div>
          <input
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            type="email"
            placeholder={t("contactEmail")}
            className={inputClass}
            required
          />
          <input
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            placeholder={t("phonePlaceholder")}
            className={inputClass}
            required
          />
          <input
            value={form.address}
            onChange={(e) =>
              setForm((f) => ({ ...f, address: e.target.value }))
            }
            placeholder={t("addressOptional")}
            className={`${inputClass} md:col-span-2`}
          />
          <div className="md:col-span-2 space-y-2">
            <span className="text-sm font-medium text-[var(--muted)]">{t("logo")}</span>
            <div className="flex flex-wrap items-center gap-2">
              <ImageUploadButton
                label={t("uploadLogo")}
                onUploaded={(url) => setForm((f) => ({ ...f, logoUrl: url }))}
              />
              <input
                value={form.logoUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, logoUrl: e.target.value }))
                }
                placeholder={t("pasteLogoUrl")}
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
              <span className="font-medium text-[var(--muted)]">{t("accent")}</span>
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
              <span className="font-medium text-[var(--muted)]">{t("buttonColor")}</span>
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
              <span className="font-medium text-[var(--muted)]">{t("paper")}</span>
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
          <div className="md:col-span-2 space-y-2">
            <p className="text-sm font-medium">{t("qrStyleTitle")}</p>
            <p className="text-xs text-[var(--muted)]">{t("qrStyleBody")}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1.5 text-sm">
                <span className="font-medium text-[var(--muted)]">{t("qrFrameColor")}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.qrFrameColor}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, qrFrameColor: e.target.value }))
                    }
                    className="h-10 w-12 cursor-pointer rounded border border-[var(--line)] bg-transparent p-1"
                  />
                  <input
                    value={form.qrFrameColor}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, qrFrameColor: e.target.value }))
                    }
                    className={inputClass}
                    pattern="^#[0-9A-Fa-f]{6}$"
                  />
                </div>
              </label>
              <label className="space-y-1.5 text-sm">
                <span className="font-medium text-[var(--muted)]">{t("qrModuleColor")}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.qrModuleColor}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, qrModuleColor: e.target.value }))
                    }
                    className="h-10 w-12 cursor-pointer rounded border border-[var(--line)] bg-transparent p-1"
                  />
                  <input
                    value={form.qrModuleColor}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, qrModuleColor: e.target.value }))
                    }
                    className={inputClass}
                    pattern="^#[0-9A-Fa-f]{6}$"
                  />
                </div>
              </label>
            </div>
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
              {t("active")}
            </label>
          ) : null}
          <Button
            type="submit"
            className="md:col-span-2"
            disabled={saveRestaurant.isPending}
          >
            {saveRestaurant.isPending
              ? t("saving")
              : editingId
                ? t("saveChanges")
                : t("createRestaurant")}
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
            {t("customerBrand")}
          </h2>
          <p className="md:col-span-2 text-sm text-[var(--muted)]">
            {t("customerBrandBody")}
          </p>
          <div className="md:col-span-2 space-y-2">
            <span className="text-sm font-medium text-[var(--muted)]">{t("logo")}</span>
            <div className="flex flex-wrap items-center gap-2">
              <ImageUploadButton
                label={t("uploadLogo")}
                onUploaded={(url) =>
                  setOwnerBrand((b) => ({ ...b, logoUrl: url }))
                }
              />
              <input
                value={ownerBrand.logoUrl}
                onChange={(e) =>
                  setOwnerBrand((b) => ({ ...b, logoUrl: e.target.value }))
                }
                placeholder={t("pasteLogoUrl")}
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
              <span className="font-medium text-[var(--muted)]">{t("accent")}</span>
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
              <span className="font-medium text-[var(--muted)]">{t("buttonColor")}</span>
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
              <span className="font-medium text-[var(--muted)]">{t("paper")}</span>
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
          <div className="md:col-span-2 space-y-2">
            <p className="text-sm font-medium">{t("qrStyleTitle")}</p>
            <p className="text-xs text-[var(--muted)]">{t("qrStyleBody")}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1.5 text-sm">
                <span className="font-medium text-[var(--muted)]">{t("qrFrameColor")}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={ownerBrand.qrFrameColor}
                    onChange={(e) =>
                      setOwnerBrand((b) => ({
                        ...b,
                        qrFrameColor: e.target.value,
                      }))
                    }
                    className="h-10 w-12 cursor-pointer rounded border border-[var(--line)] bg-transparent p-1"
                  />
                  <input
                    value={ownerBrand.qrFrameColor}
                    onChange={(e) =>
                      setOwnerBrand((b) => ({
                        ...b,
                        qrFrameColor: e.target.value,
                      }))
                    }
                    className={inputClass}
                    pattern="^#[0-9A-Fa-f]{6}$"
                  />
                </div>
              </label>
              <label className="space-y-1.5 text-sm">
                <span className="font-medium text-[var(--muted)]">{t("qrModuleColor")}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={ownerBrand.qrModuleColor}
                    onChange={(e) =>
                      setOwnerBrand((b) => ({
                        ...b,
                        qrModuleColor: e.target.value,
                      }))
                    }
                    className="h-10 w-12 cursor-pointer rounded border border-[var(--line)] bg-transparent p-1"
                  />
                  <input
                    value={ownerBrand.qrModuleColor}
                    onChange={(e) =>
                      setOwnerBrand((b) => ({
                        ...b,
                        qrModuleColor: e.target.value,
                      }))
                    }
                    className={inputClass}
                    pattern="^#[0-9A-Fa-f]{6}$"
                  />
                </div>
              </label>
            </div>
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
            {saveOwnerBrand.isPending ? t("saving") : t("saveBrand")}
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
          <h2 className="md:col-span-2 text-lg font-semibold">{t("newBranch")}</h2>
          {isOwner ? (
            <p className="md:col-span-2 text-sm text-[var(--muted)]">
              {t("restaurantColon")}{" "}
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
                <option value="">{t("noRestaurantsYet")}</option>
              ) : (
                restaurants.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                    {r.active === false ? t("inactiveSuffix") : ""}
                  </option>
                ))
              )}
            </select>
          )}
          <input
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            placeholder={t("branchNamePlaceholder")}
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
            {createBranch.isPending ? t("creating") : t("createBranch")}
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
          {t("branchCreateRestricted")}
        </p>
      )}

      {isPlatformAdmin ? (
        restaurantsQuery.isLoading ? (
          <p className="text-[var(--muted)]">{t("loadingRestaurants")}</p>
        ) : restaurantsQuery.isError ? (
          <p className="text-[var(--danger)]">
            {(restaurantsQuery.error as Error).message}
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-[var(--line)]">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-[var(--surface-2)] text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3 font-medium">{t("name")}</th>
                  <th className="px-4 py-3 font-medium">{t("email")}</th>
                  <th className="px-4 py-3 font-medium">{t("phone")}</th>
                  <th className="px-4 py-3 font-medium">{t("colBranches")}</th>
                  <th className="px-4 py-3 font-medium">{t("status")}</th>
                  <th className="px-4 py-3 font-medium">{t("actions")}</th>
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
                        {active ? t("active") : t("inactive")}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => startEdit(restaurant)}
                          >
                            {t("edit")}
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
                                    t("confirmDeactivateRestaurant", {
                                      name: restaurant.name,
                                    }),
                                  )
                                ) {
                                  deleteRestaurant.mutate(restaurant.id);
                                }
                              }}
                            >
                              {t("deactivate")}
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
                                      t("restaurantReactivated", {
                                        name: restaurant.name,
                                      }),
                                    );
                                    void queryClient.invalidateQueries({
                                      queryKey: ["admin-restaurants"],
                                    });
                                  })
                                  .catch((err: Error) => setError(err.message))
                              }
                            >
                              {t("reactivate")}
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
        <p className="text-[var(--muted)]">{t("loadingBranches")}</p>
      ) : branchesQuery.isError ? (
        <p className="text-[var(--danger)]">
          {(branchesQuery.error as Error).message}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--line)]">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-[var(--surface-2)] text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3 font-medium">{t("colBranch")}</th>
                <th className="px-4 py-3 font-medium">{t("restaurant")}</th>
                <th className="px-4 py-3 font-medium">{t("status")}</th>
              </tr>
            </thead>
            <tbody>
              {ownerBranches.length === 0 ? (
                <tr className="border-t border-[var(--line)] bg-[var(--surface)]">
                  <td
                    colSpan={3}
                    className="px-4 py-6 text-[var(--muted)]"
                  >
                    {t("noBranchesYet")}
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
                        {branch.active !== false ? t("active") : t("inactive")}
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
          <h2 className="mb-3 text-lg font-semibold">{t("walkInGuestLinks")}</h2>
          <p className="mb-4 text-sm text-[var(--muted)]">
            {t("walkInGuestLinksBody")}
          </p>
          <div className="space-y-3">
            {(isPlatformAdmin ? branches : ownerBranches).map((branch) => {
              const restaurant = restaurants.find(
                (r) => r.id === branch.restaurantId,
              );
              const walkInUrl = `${guestBaseUrl(restaurant?.slug)}/w/${branch.walkInToken}`;
              const restaurantName = restaurant?.name ?? t("restaurant");
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
                      {t("copyWalkInUrl")}
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      type="button"
                      disabled={rotateWalkIn.isPending}
                      onClick={() => rotateWalkIn.mutate(branch.id)}
                    >
                      {t("rotateWalkInToken")}
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
