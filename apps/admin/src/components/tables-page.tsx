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
import { restaurantGuestOrigin } from "@/lib/guest-origin";
import { useLocale } from "@/lib/i18n/locale-provider";
import { TABLE_STATUS_MESSAGE } from "@/lib/i18n/labels";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function TablesPage() {
  const queryClient = useQueryClient();
  const { t, locale, dir } = useLocale();
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
  const [editingId, setEditingId] = React.useState<string | null>(null);
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

  const update = useMutation({
    mutationFn: () =>
      adminApi.updateTable(editingId!, {
        number: number.trim(),
        seats: Number(seats),
      }),
    onSuccess: () => {
      setEditingId(null);
      setNumber("");
      setSeats("4");
      setError(null);
      void queryClient.invalidateQueries({ queryKey: ["admin-tables"] });
    },
    onError: (err: Error) => setError(err.message),
  });

  const remove = useMutation({
    mutationFn: (id: string) => adminApi.deleteTable(id),
    onSuccess: () => {
      setError(null);
      if (editingId) {
        setEditingId(null);
        setNumber("");
        setSeats("4");
      }
      void queryClient.invalidateQueries({ queryKey: ["admin-tables"] });
    },
    onError: (err: Error) => setError(err.message),
  });

  function startEdit(table: { id: string; number: string; seats: number }) {
    setEditingId(table.id);
    setNumber(table.number);
    setSeats(String(table.seats));
    setError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setNumber("");
    setSeats("4");
    setError(null);
  }

  const rotateQr = useMutation({
    mutationFn: (id: string) => adminApi.rotateTableQr(id),
    onSuccess: () => {
      setError(null);
      void queryClient.invalidateQueries({ queryKey: ["admin-tables"] });
    },
    onError: (err: Error) => setError(err.message),
  });

  const selectedRestaurant = restaurants.find((r) => r.id === restaurantId);
  const restaurantName = selectedRestaurant?.name ?? t("restaurant");
  const branchName = branches.find((b) => b.id === branchId)?.name ?? "";
  const guestOrigin = restaurantGuestOrigin(selectedRestaurant?.slug);

  async function copyQrLink(token: string) {
    const url = `${guestOrigin}/t/${token}`;
    await navigator.clipboard.writeText(url);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 2000);
  }

  async function printTableQr(tableNumber: string, token: string) {
    const url = `${guestOrigin}/t/${token}`;
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
<html lang="${escapeHtml(locale)}" dir="${dir}">
<head>
  <title>${escapeHtml(t("qrPrintTitle", { number: tableNumber }))}</title>
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
  <h1>${escapeHtml(t("colTable"))} ${escapeHtml(tableNumber)}</h1>
  <p>${escapeHtml(restaurantName)}${branchName ? ` · ${escapeHtml(branchName)}` : ""}</p>
  <img src="${qr}" alt="${escapeHtml(t("qrPrintTitle", { number: tableNumber }))}" />
  <p class="hint">${escapeHtml(t("printScanToOrder"))}</p>
  <button onclick="window.print()">${escapeHtml(t("printButton"))}</button>
</body>
</html>`);
    w.document.close();
  }

  return (
    <div>
      <PageHeader
        title={t("tablesTitle")}
        subtitle={t("tablesSubtitle")}
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
        className="mb-8 grid gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 md:grid-cols-[1fr_120px_auto_auto]"
        onSubmit={(e) => {
          e.preventDefault();
          if (!branchId) {
            setError(t("selectBranchFirst"));
            return;
          }
          if (editingId) update.mutate();
          else create.mutate();
        }}
      >
        <input
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder={t("tableNumberPlaceholder")}
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
        <Button
          type="submit"
          disabled={create.isPending || update.isPending || !branchId}
        >
          {editingId
            ? update.isPending
              ? t("saving")
              : t("saveTable")
            : create.isPending
              ? t("creating")
              : t("addTable")}
        </Button>
        {editingId ? (
          <Button type="button" variant="outline" onClick={cancelEdit}>
            {t("cancel")}
          </Button>
        ) : (
          <span className="hidden md:block" />
        )}
        {error ? (
          <p className="md:col-span-4 text-sm text-[var(--danger)]">{error}</p>
        ) : null}
      </form>

      {!branchId && branchesLoading ? (
        <p className="text-[var(--muted)]">{t("loadingBranches")}</p>
      ) : tablesQuery.isLoading ? (
        <p className="text-[var(--muted)]">{t("loadingTables")}</p>
      ) : tablesQuery.isError ? (
        <p className="text-[var(--danger)]">
          {(tablesQuery.error as Error).message}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--line)]">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-[var(--surface-2)] text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3 font-medium">{t("colTable")}</th>
                <th className="px-4 py-3 font-medium">{t("colSeats")}</th>
                <th className="px-4 py-3 font-medium">{t("status")}</th>
                <th className="px-4 py-3 font-medium">{t("colQrToken")}</th>
                <th className="px-4 py-3 font-medium">{t("colManage")}</th>
                <th className="px-4 py-3 font-medium">{t("colQr")}</th>
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
                  <td className="px-4 py-3">
                    {TABLE_STATUS_MESSAGE[table.status]
                      ? t(TABLE_STATUS_MESSAGE[table.status])
                      : table.status}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    {shortId(table.qrToken)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-nowrap gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => startEdit(table)}
                      >
                        {t("edit")}
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        disabled={remove.isPending || table.status === "OCCUPIED"}
                        title={
                          table.status === "OCCUPIED"
                            ? t("occupiedCannotDelete")
                            : t("deleteTable")
                        }
                        onClick={() => {
                          if (
                            window.confirm(
                              t("confirmDeleteTable", { number: table.number }),
                            )
                          ) {
                            remove.mutate(table.id);
                          }
                        }}
                      >
                        {t("delete")}
                      </Button>
                    </div>
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
                              ? t("copied")
                              : t("copyQrLink")}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              void printTableQr(table.number, table.qrToken!)
                            }
                          >
                            {t("printQr")}
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
                              t("confirmRotateQr", { number: table.number }),
                            )
                          ) {
                            rotateQr.mutate(table.id);
                          }
                        }}
                      >
                        {t("rotateQr")}
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
