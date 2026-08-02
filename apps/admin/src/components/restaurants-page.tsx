"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";
import { getStoredUser } from "@/lib/session";
import type { Restaurant } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";

const CUSTOMER_URL =
  process.env.NEXT_PUBLIC_CUSTOMER_URL ?? "http://localhost:3001";

type RestaurantFormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  active: boolean;
};

const emptyForm: RestaurantFormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  active: true,
};

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
      email: restaurant.email ?? "",
      phone: restaurant.phone ?? "",
      address: restaurant.address ?? "",
      active: restaurant.active !== false,
    });
    setError(null);
    setSuccess(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const saveRestaurant = useMutation({
    mutationFn: async () => {
      const body = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim() || undefined,
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
      setBranchSuccess(
        `Branch “${branch.name}” created. Walk-in: ${CUSTOMER_URL}/w/${branch.walkInToken}`,
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
      setBranchSuccess(
        `Rotated walk-in link for “${branch.name}”: ${CUSTOMER_URL}/w/${branch.walkInToken}`,
      );
      void queryClient.invalidateQueries({ queryKey: ["admin-branches"] });
    },
    onError: (err: Error) => setBranchError(err.message),
  });

  const restaurants = restaurantsQuery.data ?? [];
  const branches = branchesQuery.data ?? [];
  const canCreateBranch =
    isPlatformAdmin || user?.role === "RESTAURANT_OWNER";

  React.useEffect(() => {
    if (!branchRestaurantId && restaurants.length > 0) {
      setBranchRestaurantId(restaurants[0].id);
    }
  }, [restaurants, branchRestaurantId]);

  const inputClass =
    "h-11 rounded-md border border-[var(--line)] bg-[var(--paper)] px-3";

  return (
    <div>
      <PageHeader
        title="Restaurants"
        subtitle="Platform admins can create, edit, and deactivate restaurants. Add branches after creating a restaurant."
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
      ) : (
        <p className="mb-8 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]">
          Ask a platform admin to create or edit restaurants. You can manage the
          one assigned to your account.
        </p>
      )}

      {canCreateBranch ? (
        <form
          className="mb-8 grid gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            createBranch.mutate();
          }}
        >
          <h2 className="md:col-span-2 text-lg font-semibold">New branch</h2>
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
          <input
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            placeholder="Branch name (e.g. Helsinki Downtown)"
            className={inputClass}
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
      ) : null}

      {restaurantsQuery.isLoading ? (
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
                {isPlatformAdmin ? (
                  <th className="px-4 py-3 font-medium">Actions</th>
                ) : null}
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
                    <td className="px-4 py-3 font-medium">{restaurant.name}</td>
                    <td className="px-4 py-3">{restaurant.email ?? "—"}</td>
                    <td className="px-4 py-3">{restaurant.phone ?? "—"}</td>
                    <td className="px-4 py-3">{count}</td>
                    <td className="px-4 py-3">
                      {active ? "Active" : "Inactive"}
                    </td>
                    {isPlatformAdmin ? (
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
                    ) : null}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {branches.length > 0 ? (
        <div className="mt-10">
          <h2 className="mb-3 text-lg font-semibold">Walk-in guest links</h2>
          <p className="mb-4 text-sm text-[var(--muted)]">
            Share these opaque URLs with guests. Rotating invalidates the old
            link. Pickup TV pairing uses the same token in the path.
          </p>
          <div className="space-y-3">
            {branches.map((branch) => {
              const walkInUrl = `${CUSTOMER_URL}/w/${branch.walkInToken}`;
              const restaurantName =
                restaurants.find((r) => r.id === branch.restaurantId)?.name ??
                "Restaurant";
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
