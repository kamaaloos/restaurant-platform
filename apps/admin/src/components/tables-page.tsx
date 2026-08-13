"use client";

import * as React from "react";
import QRCode from "qrcode";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";
import { shortId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import {
  BranchSelect,
  useSelectedBranch,
} from "@/hooks/use-selected-branch";
import {
  RestaurantSelect,
  useSelectedRestaurant,
} from "@/hooks/use-selected-restaurant";

const CUSTOMER_URL =
  process.env.NEXT_PUBLIC_CUSTOMER_URL ?? "http://localhost:3001";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function TablesPage() {
  const queryClient = useQueryClient();
  const {
    restaurantId,
    setRestaurantId,
    restaurants,
    isLoading: restaurantsLoading,
  } = useSelectedRestaurant();
  const { branchId, setBranchId, branches, isLoading: branchesLoading } =
    useSelectedBranch(restaurantId);
  const [number, setNumber] = React.useState("");
  const [seats, setSeats] = React.useState("4");
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState<string | null>(null);

  const tablesQuery = useQuery({
    queryKey: ["admin-tables", branchId],
    queryFn: () => adminApi.listTables(branchId),
    enabled: !!branchId,
  });

  const create = useMutation({
    mutationFn: () =>
      adminApi.createTable({
        number: number.trim(),
        seats: Number(seats),
        branchId,
      }),
    onSuccess: () => {
      setNumber("");
      setSeats("4");
      setError(null);
      void queryClient.invalidateQueries({ queryKey: ["admin-tables"] });
    },
    onError: (err: Error) => setError(err.message),
  });

  const rotateQr = useMutation({
    mutationFn: (id: string) => adminApi.rotateTableQr(id),
    onSuccess: () => {
      setError(null);
      void queryClient.invalidateQueries({ queryKey: ["admin-tables"] });
    },
    onError: (err: Error) => setError(err.message),
  });

  const restaurantName =
    restaurants.find((r) => r.id === restaurantId)?.name ?? "Restaurant";
  const branchName = branches.find((b) => b.id === branchId)?.name ?? "";

  async function copyQrLink(token: string) {
    const url = `${CUSTOMER_URL}/t/${token}`;
    await navigator.clipboard.writeText(url);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 2000);
  }

  async function printTableQr(tableNumber: string, token: string) {
    const url = `${CUSTOMER_URL}/t/${token}`;
    const qr = await QRCode.toDataURL(url, {
      width: 512,
      margin: 2,
      color: { dark: "#111111", light: "#ffffff" },
    });
    const w = window.open(
      "",
      "_blank",
      "noopener,noreferrer,width=480,height=720",
    );
    if (!w) return;
    w.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>Table ${escapeHtml(tableNumber)} QR</title>
  <style>
    body { font-family: Georgia, serif; text-align: center; padding: 32px; color: #111; }
    h1 { font-size: 28px; margin: 0 0 4px; }
    p { margin: 4px 0; color: #444; }
    img { width: 280px; height: 280px; margin: 24px 0; }
    .hint { font-size: 13px; }
    @media print { button { display: none; } }
  </style>
</head>
<body>
  <h1>Table ${escapeHtml(tableNumber)}</h1>
  <p>${escapeHtml(restaurantName)}${branchName ? ` · ${escapeHtml(branchName)}` : ""}</p>
  <img src="${qr}" alt="Table ${escapeHtml(tableNumber)} QR" />
  <p class="hint">Scan to order</p>
  <button onclick="window.print()">Print</button>
</body>
</html>`);
    w.document.close();
  }

  return (
    <div>
      <PageHeader
        title="Tables"
        subtitle="Create floor tables and copy customer QR ordering links."
      />

      <div className="mb-4 grid max-w-3xl gap-3 md:grid-cols-2">
        <RestaurantSelect
          restaurantId={restaurantId}
          onChange={setRestaurantId}
          restaurants={restaurants}
          disabled={restaurantsLoading}
        />
        <BranchSelect
          branchId={branchId}
          onChange={setBranchId}
          branches={branches}
          disabled={branchesLoading || !restaurantId}
        />
      </div>

      <form
        className="mb-8 grid gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 md:grid-cols-[1fr_120px_auto]"
        onSubmit={(e) => {
          e.preventDefault();
          if (!branchId) {
            setError("Select a branch first.");
            return;
          }
          create.mutate();
        }}
      >
        <input
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Table number (e.g. A3)"
          className="h-11 rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
          required
        />
        <input
          type="number"
          min={1}
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          className="h-11 rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
          required
        />
        <Button type="submit" disabled={create.isPending || !branchId}>
          {create.isPending ? "Creating…" : "Add table"}
        </Button>
        {error ? (
          <p className="md:col-span-3 text-sm text-[var(--danger)]">{error}</p>
        ) : null}
      </form>

      {!branchId && branchesLoading ? (
        <p className="text-[var(--muted)]">Loading branches…</p>
      ) : tablesQuery.isLoading ? (
        <p className="text-[var(--muted)]">Loading tables…</p>
      ) : tablesQuery.isError ? (
        <p className="text-[var(--danger)]">
          {(tablesQuery.error as Error).message}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--line)]">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-[var(--surface-2)] text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3 font-medium">Table</th>
                <th className="px-4 py-3 font-medium">Seats</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">QR token</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(tablesQuery.data ?? []).map((table) => (
                <tr
                  key={table.id}
                  className="border-t border-[var(--line)] bg-[var(--surface)]"
                >
                  <td className="px-4 py-3 font-semibold">{table.number}</td>
                  <td className="px-4 py-3">{table.seats}</td>
                  <td className="px-4 py-3">{table.status}</td>
                  <td className="px-4 py-3 font-mono text-xs">
                    {shortId(table.qrToken)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {table.qrToken ? (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => void copyQrLink(table.qrToken!)}
                          >
                            {copied === table.qrToken
                              ? "Copied"
                              : "Copy QR link"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              void printTableQr(table.number, table.qrToken!)
                            }
                          >
                            Print QR
                          </Button>
                        </>
                      ) : null}
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={rotateQr.isPending}
                        onClick={() => {
                          if (
                            window.confirm(
                              `Rotate QR for table ${table.number}? Old links will stop working.`,
                            )
                          ) {
                            rotateQr.mutate(table.id);
                          }
                        }}
                      >
                        Rotate QR
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
