"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";

const STORAGE_KEY = "admin.selectedBranchId";

export function useSelectedBranch(restaurantId?: string) {
  const [branchId, setBranchIdState] = React.useState("");

  const branchesQuery = useQuery({
    queryKey: ["admin-branches"],
    queryFn: () => adminApi.listBranches(),
  });

  const allBranches = branchesQuery.data ?? [];
  const branches = React.useMemo(() => {
    if (!restaurantId) return allBranches;
    return allBranches.filter((b) => b.restaurantId === restaurantId);
  }, [allBranches, restaurantId]);

  React.useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem(STORAGE_KEY)
        : null;
    if (stored) setBranchIdState(stored);
  }, []);

  React.useEffect(() => {
    if (!branches.length) {
      if (branchId) {
        setBranchIdState("");
        localStorage.removeItem(STORAGE_KEY);
      }
      return;
    }

    if (branchId && branches.some((b) => b.id === branchId)) return;

    const next = branches[0].id;
    setBranchIdState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, [branches, branchId]);

  function setBranchId(next: string) {
    setBranchIdState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  return {
    branchId,
    setBranchId,
    branches,
    allBranches,
    isLoading: branchesQuery.isLoading,
    error: branchesQuery.error as Error | null,
  };
}

export function BranchSelect({
  branchId,
  onChange,
  branches,
  disabled,
}: {
  branchId: string;
  onChange: (id: string) => void;
  branches: Array<{ id: string; name: string; restaurantId?: string }>;
  disabled?: boolean;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
        Branch
      </span>
      <select
        value={branchId}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || branches.length === 0}
        className="h-11 w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
        required
      >
        {branches.length === 0 ? (
          <option value="">No branches for this restaurant</option>
        ) : (
          branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))
        )}
      </select>
    </label>
  );
}
