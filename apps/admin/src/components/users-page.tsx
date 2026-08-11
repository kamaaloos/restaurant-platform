"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";
import { getStoredUser } from "@/lib/session";
import type { StaffUser } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import {
  useSelectedBranch,
} from "@/hooks/use-selected-branch";
import {
  RestaurantSelect,
  useSelectedRestaurant,
} from "@/hooks/use-selected-restaurant";

const ROLE_OPTIONS: Record<string, string[]> = {
  PLATFORM_ADMIN: [
    "RESTAURANT_OWNER",
    "BRANCH_MANAGER",
    "WAITER",
    "CHEF",
    "CASHIER",
  ],
  RESTAURANT_OWNER: ["BRANCH_MANAGER", "WAITER", "CHEF", "CASHIER"],
  BRANCH_MANAGER: ["WAITER", "CHEF", "CASHIER"],
};

type UserForm = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  active: boolean;
  branchId: string;
};

const emptyForm = (role: string): UserForm => ({
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  role,
  active: true,
  branchId: "",
});

export function UsersPage() {
  const queryClient = useQueryClient();
  const currentUser = getStoredUser();
  const isPlatformAdmin = currentUser?.role === "PLATFORM_ADMIN";
  const isOwner = currentUser?.role === "RESTAURANT_OWNER";
  const canManage =
    isPlatformAdmin ||
    isOwner ||
    currentUser?.role === "BRANCH_MANAGER";

  const allowedRoles =
    ROLE_OPTIONS[currentUser?.role ?? ""] ?? ROLE_OPTIONS.BRANCH_MANAGER;

  const {
    restaurantId,
    setRestaurantId,
    restaurants,
    isLoading: restaurantsLoading,
  } = useSelectedRestaurant();
  const { branches, isLoading: branchesLoading } =
    useSelectedBranch(restaurantId);

  const [filterBranchId, setFilterBranchId] = React.useState<string>("");
  const [form, setForm] = React.useState<UserForm>(() =>
    emptyForm(allowedRoles[0] ?? "CASHIER"),
  );
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  // Owners are locked to their restaurant; platform admin picks one.
  const scopedRestaurantId = isPlatformAdmin
    ? restaurantId
    : (currentUser?.restaurantId ?? restaurantId);

  React.useEffect(() => {
    if (!isPlatformAdmin && currentUser?.restaurantId) {
      setRestaurantId(currentUser.restaurantId);
    }
  }, [isPlatformAdmin, currentUser?.restaurantId, setRestaurantId]);

  const usersQuery = useQuery({
    queryKey: ["admin-users", scopedRestaurantId, filterBranchId],
    queryFn: () =>
      adminApi.listUsers({
        // Platform admin filters explicitly; owner/manager are scoped by JWT,
        // but still send restaurantId when known so the request is intentional.
        restaurantId: scopedRestaurantId || undefined,
        branchId: filterBranchId || undefined,
      }),
    enabled: canManage && !!scopedRestaurantId,
  });

  function resetForm() {
    setForm(emptyForm(allowedRoles[0] ?? "CASHIER"));
    setEditingId(null);
    setError(null);
  }

  function startEdit(user: StaffUser) {
    setEditingId(user.id);
    setForm({
      email: user.email,
      password: "",
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      role: allowedRoles.includes(user.role)
        ? user.role
        : (allowedRoles[0] ?? user.role),
      active: user.active,
      branchId: user.branchId ?? "",
    });
    setSuccess(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const saveUser = useMutation({
    mutationFn: async () => {
      const payload = {
        email: form.email.trim(),
        firstName: form.firstName.trim() || undefined,
        lastName: form.lastName.trim() || undefined,
        role: form.role,
        restaurantId: scopedRestaurantId || undefined,
        branchId: form.branchId || undefined,
      };

      if (editingId) {
        return adminApi.updateUser(editingId, {
          ...payload,
          password: form.password.trim() || undefined,
          active: form.active,
          branchId: form.branchId || null,
        });
      }

      if (!form.password.trim()) {
        throw new Error("Password is required for new users.");
      }

      return adminApi.createUser({
        ...payload,
        password: form.password,
      });
    },
    onSuccess: (user) => {
      const wasEdit = !!editingId;
      resetForm();
      setSuccess(
        wasEdit ? `Updated ${user.email}.` : `Created ${user.email}.`,
      );
      void queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (err: Error) => {
      setSuccess(null);
      setError(err.message);
    },
  });

  const deactivateUser = useMutation({
    mutationFn: (id: string) => adminApi.deleteUser(id),
    onSuccess: (user) => {
      if (editingId === user.id) resetForm();
      setSuccess(`Deactivated ${user.email}.`);
      void queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (err: Error) => {
      setSuccess(null);
      setError(err.message);
    },
  });

  const inputClass =
    "h-11 rounded-md border border-[var(--line)] bg-[var(--paper)] px-3";

  const users = usersQuery.data ?? [];
  const roleGroups = React.useMemo(() => {
    const map = new Map<string, StaffUser[]>();
    for (const user of users) {
      const list = map.get(user.role) ?? [];
      list.push(user);
      map.set(user.role, list);
    }
    return [...map.entries()];
  }, [users]);

  if (!canManage) {
    return (
      <div>
        <PageHeader
          title="Users"
          subtitle="You do not have permission to manage staff accounts."
        />
      </div>
    );
  }

  if (!isPlatformAdmin && !scopedRestaurantId) {
    return (
      <div>
        <PageHeader
          title="Users"
          subtitle="Your account is not assigned to a restaurant. Ask a platform admin to fix this."
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Users"
        subtitle={
          isPlatformAdmin
            ? "View and manage staff for a selected restaurant. Filter by branch to classify who works where."
            : "View and manage staff for your restaurant branches."
        }
      />

      <div className="mb-4 grid max-w-3xl gap-3 md:grid-cols-2">
        {isPlatformAdmin ? (
          <RestaurantSelect
            restaurantId={restaurantId}
            onChange={(id) => {
              setRestaurantId(id);
              setFilterBranchId("");
            }}
            restaurants={restaurants}
            disabled={restaurantsLoading}
          />
        ) : (
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              Restaurant
            </span>
            <input
              className={`${inputClass} w-full opacity-80`}
              value={
                restaurants.find((r) => r.id === scopedRestaurantId)?.name ??
                "Your restaurant"
              }
              readOnly
            />
          </label>
        )}

        <label className="block space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            Filter by branch
          </span>
          <select
            value={filterBranchId}
            onChange={(e) => setFilterBranchId(e.target.value)}
            disabled={branchesLoading || !scopedRestaurantId}
            className={`${inputClass} w-full`}
          >
            <option value="">All branches</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <form
        className="mb-8 grid gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!scopedRestaurantId && form.role !== "PLATFORM_ADMIN") {
            setError("Select a restaurant first.");
            return;
          }
          saveUser.mutate();
        }}
      >
        <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">
            {editingId ? "Edit user" : "New user"}
          </h2>
          {editingId ? (
            <Button type="button" variant="outline" size="sm" onClick={resetForm}>
              Cancel edit
            </Button>
          ) : null}
        </div>

        <input
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          type="email"
          placeholder="Email"
          className={inputClass}
          required
        />
        <input
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          type="password"
          placeholder={
            editingId ? "New password (optional)" : "Password (min 8)"
          }
          minLength={editingId ? undefined : 8}
          className={inputClass}
          required={!editingId}
        />
        <input
          value={form.firstName}
          onChange={(e) =>
            setForm((f) => ({ ...f, firstName: e.target.value }))
          }
          placeholder="First name"
          className={inputClass}
        />
        <input
          value={form.lastName}
          onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
          placeholder="Last name"
          className={inputClass}
        />
        <select
          value={form.role}
          onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
          className={inputClass}
        >
          {allowedRoles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <select
          value={form.branchId}
          onChange={(e) => setForm((f) => ({ ...f, branchId: e.target.value }))}
          className={inputClass}
        >
          <option value="">
            {form.role === "RESTAURANT_OWNER"
              ? "No branch (owner)"
              : "Select branch (recommended)"}
          </option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
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
          disabled={saveUser.isPending || !scopedRestaurantId}
        >
          {saveUser.isPending
            ? "Saving…"
            : editingId
              ? "Save changes"
              : "Create user"}
        </Button>
        {error ? (
          <p className="md:col-span-2 text-sm text-[var(--danger)]">{error}</p>
        ) : null}
        {success ? (
          <p className="md:col-span-2 text-sm text-[var(--accent)]">{success}</p>
        ) : null}
      </form>

      {!scopedRestaurantId && isPlatformAdmin ? (
        <p className="text-[var(--muted)]">
          Select a restaurant to view its users.
        </p>
      ) : usersQuery.isLoading ? (
        <p className="text-[var(--muted)]">Loading users…</p>
      ) : usersQuery.isError ? (
        <p className="text-[var(--danger)]">
          {(usersQuery.error as Error).message}
        </p>
      ) : users.length === 0 ? (
        <p className="text-[var(--muted)]">No users for this scope yet.</p>
      ) : (
        <div className="space-y-8">
          {roleGroups.map(([role, group]) => (
            <section key={role}>
              <h3 className="mb-3 font-[family-name:var(--font-display)] text-2xl">
                {role.replaceAll("_", " ")}{" "}
                <span className="text-base text-[var(--muted)]">
                  ({group.length})
                </span>
              </h3>
              <div className="overflow-x-auto rounded-xl border border-[var(--line)]">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="bg-[var(--surface-2)] text-[var(--muted)]">
                    <tr>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">Name</th>
                      <th className="px-4 py-3 font-medium">Branch</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.map((user) => (
                      <tr
                        key={user.id}
                        className="border-t border-[var(--line)] bg-[var(--surface)]"
                      >
                        <td className="px-4 py-3 font-medium">{user.email}</td>
                        <td className="px-4 py-3">
                          {[user.firstName, user.lastName]
                            .filter(Boolean)
                            .join(" ") || "—"}
                        </td>
                        <td className="px-4 py-3">
                          {user.branch?.name ?? "—"}
                        </td>
                        <td className="px-4 py-3">
                          {user.active ? "Active" : "Inactive"}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => startEdit(user)}
                            >
                              Edit
                            </Button>
                            {user.active && user.id !== currentUser?.id ? (
                              <Button
                                type="button"
                                size="sm"
                                variant="danger"
                                disabled={deactivateUser.isPending}
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      `Deactivate ${user.email}?`,
                                    )
                                  ) {
                                    deactivateUser.mutate(user.id);
                                  }
                                }}
                              >
                                Deactivate
                              </Button>
                            ) : null}
                            {!user.active ? (
                              <Button
                                type="button"
                                size="sm"
                                variant="secondary"
                                onClick={() =>
                                  adminApi
                                    .updateUser(user.id, { active: true })
                                    .then(() => {
                                      setSuccess(`Reactivated ${user.email}.`);
                                      void queryClient.invalidateQueries({
                                        queryKey: ["admin-users"],
                                      });
                                    })
                                    .catch((err: Error) => setError(err.message))
                                }
                              >
                                Reactivate
                              </Button>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
