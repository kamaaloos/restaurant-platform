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
import {
  buildTableQrPrintHtml,
  escapeHtml,
  hexColor,
  qrPrintColors,
  DEFAULT_QR_FRAME,
  DEFAULT_QR_MODULE,
} from "@/lib/qr-print-card";
import { useLocale } from "@/lib/i18n/locale-provider";
import { TABLE_STATUS_MESSAGE } from "@/lib/i18n/labels";
import { ImageUploadButton } from "@/components/image-upload-button";

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="space-y-1.5 text-sm">
      <span className="font-medium text-[var(--muted)]">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={hexColor(value, "#000000")}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-12 cursor-pointer rounded border border-[var(--line)] bg-transparent p-1"
        />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 min-w-0 flex-1 rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
          pattern="^#[0-9A-Fa-f]{6}$"
        />
      </div>
    </label>
  );
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
  const [copiedPin, setCopiedPin] = React.useState<string | null>(null);
  const [orderPinByTableId, setOrderPinByTableId] = React.useState<
    Record<string, string>
  >({});
  const [qrFrameColor, setQrFrameColor] = React.useState(DEFAULT_QR_FRAME);
  const [qrModuleColor, setQrModuleColor] = React.useState(DEFAULT_QR_MODULE);
  const [qrLogoUrl, setQrLogoUrl] = React.useState("");

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
    onSuccess: (table) => {
      setNumber("");
      setSeats("4");
      setError(null);
      if (table.orderPin) {
        setOrderPinByTableId((prev) => ({
          ...prev,
          [table.id]: table.orderPin!,
        }));
      }
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
    onSuccess: (table) => {
      setError(null);
      if (table.orderPin) {
        setOrderPinByTableId((prev) => ({
          ...prev,
          [table.id]: table.orderPin!,
        }));
      }
      void queryClient.invalidateQueries({ queryKey: ["admin-tables"] });
    },
    onError: (err: Error) => setError(err.message),
  });

  const selectedRestaurant = restaurants.find((r) => r.id === restaurantId);
  const restaurantName = selectedRestaurant?.name ?? t("restaurant");
  const branchName = branches.find((b) => b.id === branchId)?.name ?? "";
  const guestOrigin = restaurantGuestOrigin(selectedRestaurant?.slug);

  React.useEffect(() => {
    const colors = qrPrintColors(selectedRestaurant);
    setQrFrameColor(colors.frame);
    setQrModuleColor(colors.module);
    setQrLogoUrl(selectedRestaurant?.logoUrl ?? "");
  }, [
    selectedRestaurant?.id,
    selectedRestaurant?.qrFrameColor,
    selectedRestaurant?.qrModuleColor,
    selectedRestaurant?.logoUrl,
  ]);

  const saveQrStyle = useMutation({
    mutationFn: () => {
      if (!restaurantId) throw new Error(t("selectRestaurantFirst"));
      return adminApi.updateRestaurant(restaurantId, {
        qrFrameColor: hexColor(qrFrameColor, DEFAULT_QR_FRAME),
        qrModuleColor: hexColor(qrModuleColor, DEFAULT_QR_MODULE),
        logoUrl: qrLogoUrl.trim() || null,
      });
    },
    onSuccess: () => {
      setError(null);
      void queryClient.invalidateQueries({ queryKey: ["admin-restaurants"] });
    },
    onError: (err: Error) => setError(err.message),
  });

  async function copyQrLink(token: string) {
    const url = `${guestOrigin}/t/${token}`;
    await navigator.clipboard.writeText(url);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 2000);
  }

  async function copyTablePin(tableId: string, pin: string) {
    await navigator.clipboard.writeText(pin);
    setCopiedPin(tableId);
    window.setTimeout(() => setCopiedPin(null), 2000);
  }

  async function printTableQr(
    tableId: string,
    tableNumber: string,
    token: string,
  ) {
    const orderPin = orderPinByTableId[tableId];
    if (!orderPin) {
      setError(t("printNeedsPin"));
      return;
    }
    // Open synchronously from the click. `noopener` makes window.open()
    // return null while still leaving a blank about:blank tab.
    const w = window.open("", "_blank", "width=480,height=780");
    if (!w) {
      setError(t("printPopupBlocked"));
      return;
    }
    w.document.write(
      `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;text-align:center;padding:48px;color:#444">${escapeHtml(t("loadingTables"))}</body></html>`,
    );
    w.document.close();

    try {
      const url = `${guestOrigin}/t/${token}`;
      const frame = hexColor(qrFrameColor, DEFAULT_QR_FRAME);
      const moduleColor = hexColor(qrModuleColor, DEFAULT_QR_MODULE);
      const qr = await QRCode.toDataURL(url, {
        width: 640,
        margin: 1,
        errorCorrectionLevel: "H",
        color: { dark: moduleColor, light: "#ffffff" },
      });
      const logoRaw = qrLogoUrl.trim();
      const logoUrl = logoRaw
        ? new URL(logoRaw, window.location.origin).href
        : "";
      const placeLine = [restaurantName, branchName].filter(Boolean).join(" · ");
      w.document.open();
      w.document.write(
        buildTableQrPrintHtml({
          locale,
          dir,
          title: t("qrPrintTitle", { number: tableNumber }),
          scanLabel: t("qrScanMe"),
          tableLabel: t("colTable"),
          tableNumber,
          pinLabel: t("qrPinLabel"),
          orderPin,
          placeLine,
          printLabel: t("printButton"),
          qrDataUrl: qr,
          logoUrl: logoUrl || null,
          frameColor: frame,
        }),
      );
      w.document.close();
      w.focus();
    } catch (err) {
      w.close();
      setError(err instanceof Error ? err.message : t("printPopupBlocked"));
    }
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

      <section className="mb-8 max-w-3xl space-y-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
        <div>
          <h2 className="text-lg font-semibold">{t("qrStyleTitle")}</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">{t("qrStyleBody")}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <ColorField
            label={t("qrFrameColor")}
            value={qrFrameColor}
            onChange={setQrFrameColor}
          />
          <ColorField
            label={t("qrModuleColor")}
            value={qrModuleColor}
            onChange={setQrModuleColor}
          />
        </div>
        <div className="space-y-2">
          <span className="text-sm font-medium text-[var(--muted)]">
            {t("logo")}
          </span>
          <p className="text-xs text-[var(--muted)]">{t("qrLogoHint")}</p>
          <div className="flex flex-wrap items-center gap-2">
            <ImageUploadButton
              label={t("uploadLogo")}
              onUploaded={(url) => setQrLogoUrl(url)}
            />
            <input
              value={qrLogoUrl}
              onChange={(e) => setQrLogoUrl(e.target.value)}
              placeholder={t("pasteLogoUrl")}
              className="h-11 min-w-[12rem] flex-1 rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
            />
          </div>
          {qrLogoUrl.trim() ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={qrLogoUrl.trim()}
              alt=""
              className="h-14 w-14 rounded-lg bg-white object-contain p-1 ring-2 ring-[var(--line)]"
            />
          ) : null}
        </div>
        <Button
          type="button"
          variant="outline"
          disabled={!restaurantId || saveQrStyle.isPending}
          onClick={() => saveQrStyle.mutate()}
        >
          {saveQrStyle.isPending
            ? t("saving")
            : saveQrStyle.isSuccess
              ? t("qrStyleSaved")
              : t("saveQrStyle")}
        </Button>
      </section>

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
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-[var(--surface-2)] text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3 font-medium">{t("colTable")}</th>
                <th className="px-4 py-3 font-medium">{t("colSeats")}</th>
                <th className="px-4 py-3 font-medium">{t("status")}</th>
                <th className="px-4 py-3 font-medium">{t("colQrToken")}</th>
                <th className="px-4 py-3 font-medium">{t("colOrderPin")}</th>
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
                    {orderPinByTableId[table.id] ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-sm tracking-widest">
                          {orderPinByTableId[table.id]}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            void copyTablePin(
                              table.id,
                              orderPinByTableId[table.id]!,
                            )
                          }
                        >
                          {copiedPin === table.id
                            ? t("copied")
                            : t("copyTablePin")}
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-[var(--muted)]">
                        {t("orderPinRotateHint")}
                      </span>
                    )}
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
                              void printTableQr(
                                table.id,
                                table.number,
                                table.qrToken!,
                              )
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
