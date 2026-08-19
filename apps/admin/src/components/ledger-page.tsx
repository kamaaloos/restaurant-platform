"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";
import { PageHeader } from "@/components/page-header";
import {
  useSelectedBranch,
} from "@/hooks/use-selected-branch";
import {
  RestaurantSelect,
  useSelectedRestaurant,
} from "@/hooks/use-selected-restaurant";
import { getStoredUser } from "@/lib/session";

const PAGE_SIZE = 50;


function formatCurrency(n: number) {
  return n.toFixed(2);
}

export function LedgerPage() {
  const user = getStoredUser();
  const {
    restaurantId,
    setRestaurantId,
    restaurants,
    isLoading: restaurantsLoading,
  } = useSelectedRestaurant();
  const { branches, isLoading: branchesLoading } =
    useSelectedBranch(restaurantId);
  const [branchId, setBranchId] = React.useState("");

  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [page, setPage] = React.useState(0);

  const summaryQuery = useQuery({
    queryKey: ["ledger-summary", restaurantId, branchId, from, to],
    queryFn: () =>
      adminApi.ledgerSummary({
        branchId: branchId || undefined,
        from: from || undefined,
        to: to || undefined,
      }),
    enabled: !!restaurantId,
  });

  const entriesQuery = useQuery({
    queryKey: ["ledger-entries", restaurantId, branchId, from, to, page],
    queryFn: () =>
      adminApi.ledgerEntries({
        branchId: branchId || undefined,
        from: from || undefined,
        to: to || undefined,
        skip: page * PAGE_SIZE,
        take: PAGE_SIZE,
      }),
    enabled: !!restaurantId,
  });

  const isPlatformAdmin = user?.role === "PLATFORM_ADMIN";
  const totalPages = Math.ceil((entriesQuery.data?.total ?? 0) / PAGE_SIZE);

  return (
    <div className="space-y-6">
      <PageHeader title="Ledger" subtitle="Journal entries and financial summary" />

      <div className="flex flex-wrap gap-3 items-end">
        {isPlatformAdmin && (
          <RestaurantSelect
            restaurantId={restaurantId}
            onChange={setRestaurantId}
            restaurants={restaurants}
            disabled={restaurantsLoading}
          />
        )}
        <label className="block space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            Branch
          </span>
          <select
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            disabled={branchesLoading}
            className="h-11 w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
          >
            <option value="">All branches</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col text-sm">
          From
          <input
            type="date"
            value={from}
            onChange={(e) => { setFrom(e.target.value); setPage(0); }}
            className="border rounded px-2 py-1"
          />
        </label>
        <label className="flex flex-col text-sm">
          To
          <input
            type="date"
            value={to}
            onChange={(e) => { setTo(e.target.value); setPage(0); }}
            className="border rounded px-2 py-1"
          />
        </label>
      </div>

      {/* Summary */}
      {summaryQuery.data && summaryQuery.data.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {summaryQuery.data.map((s) => (
            <div
              key={s.category}
              className="rounded-lg border p-4 text-center"
            >
              <div className="text-xs text-muted-foreground uppercase">
                {s.category}
              </div>
              <div className="text-lg font-semibold text-green-700">
                +{formatCurrency(s.totalDebit)}
              </div>
              {s.totalCredit > 0 && (
                <div className="text-sm text-red-600">
                  -{formatCurrency(s.totalCredit)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Entries table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead>
            <tr className="bg-muted/50">
              <th className="px-3 py-2 text-left">Date</th>
              <th className="px-3 py-2 text-left">Category</th>
              <th className="px-3 py-2 text-left">Description</th>
              <th className="px-3 py-2 text-right">Debit</th>
              <th className="px-3 py-2 text-right">Credit</th>
            </tr>
          </thead>
          <tbody>
            {entriesQuery.data?.entries.map((e) => (
              <tr key={e.id} className="border-t">
                <td className="px-3 py-2 whitespace-nowrap">
                  {new Date(e.date).toLocaleDateString()}
                </td>
                <td className="px-3 py-2">{e.category}</td>
                <td className="px-3 py-2">{e.description}</td>
                <td className="px-3 py-2 text-right font-mono">
                  {Number(e.debit) > 0 ? formatCurrency(Number(e.debit)) : ""}
                </td>
                <td className="px-3 py-2 text-right font-mono text-red-600">
                  {Number(e.credit) > 0 ? formatCurrency(Number(e.credit)) : ""}
                </td>
              </tr>
            ))}
            {entriesQuery.data?.entries.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-8 text-center text-muted-foreground">
                  No journal entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2 justify-center">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-sm">
            {page + 1} / {totalPages}
          </span>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
