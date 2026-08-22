"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { cashierApi } from "@/lib/api";
import { useLocale } from "@/lib/i18n/locale-provider";

const STORAGE_KEY = "cashier.selectedBranchId";

export function useSelectedBranch() {
  const [branchId, setBranchIdState] = React.useState("");

  const branchesQuery = useQuery({
    queryKey: ["cashier-branches"],
    queryFn: () => cashierApi.listBranches(),
  });

  React.useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem(STORAGE_KEY)
        : null;
    if (stored) setBranchIdState(stored);
  }, []);

  React.useEffect(() => {
    const branches = branchesQuery.data;
    if (!branches?.length) return;
    if (branchId && branches.some((b) => b.id === branchId)) return;
    const next = branches[0].id;
    setBranchIdState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, [branchesQuery.data, branchId]);

  function setBranchId(next: string) {
    setBranchIdState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  return {
    branchId,
    setBranchId,
    branches: branchesQuery.data ?? [],
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
  branches: Array<{ id: string; name: string }>;
  disabled?: boolean;
}) {
  const { t } = useLocale();

  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
        {t("branch")}
      </span>
      <select
        value={branchId}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || branches.length === 0}
        className="h-11 w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
        required
      >
        {branches.length === 0 ? (
          <option value="">{t("noBranchesAvailable")}</option>
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
