"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";
import { DEVICE_TYPES } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { PairingQr } from "@/components/pairing-qr";
import {
  BranchSelect,
  useSelectedBranch,
} from "@/hooks/use-selected-branch";
import {
  RestaurantSelect,
  useSelectedRestaurant,
} from "@/hooks/use-selected-restaurant";
import { useLocale } from "@/lib/i18n/locale-provider";
import { DEVICE_TYPE_MESSAGE } from "@/lib/i18n/labels";

const KITCHEN_URL =
  process.env.NEXT_PUBLIC_KITCHEN_URL ?? "http://localhost:3002";
const WAITER_URL =
  process.env.NEXT_PUBLIC_WAITER_URL ?? "http://localhost:3003";
const CUSTOMER_URL =
  process.env.NEXT_PUBLIC_CUSTOMER_URL ?? "http://localhost:3001";

const EXPIRY_WARN_MS = 2 * 24 * 60 * 60 * 1000;

export function DevicesPage() {
  const queryClient = useQueryClient();
  const { t, locale } = useLocale();
  const {
    restaurantId,
    setRestaurantId,
    restaurants,
    isLoading: restaurantsLoading,
  } = useSelectedRestaurant();
  const { branchId, setBranchId, branches, isLoading: branchesLoading } =
    useSelectedBranch(restaurantId);
  const [name, setName] = React.useState("");
  const [deviceType, setDeviceType] = React.useState<string>("KITCHEN");
  const [error, setError] = React.useState<string | null>(null);
  const [revealedTokens, setRevealedTokens] = React.useState<
    Record<string, string>
  >({});
  const [copied, setCopied] = React.useState<string | null>(null);

  const devicesQuery = useQuery({
    queryKey: ["admin-devices", branchId],
    queryFn: () => adminApi.listDevices(branchId),
    enabled: !!branchId,
  });

  const create = useMutation({
    mutationFn: () =>
      adminApi.createDevice({
        name: name.trim(),
        deviceType,
        branchId,
      }),
    onSuccess: (device) => {
      setName("");
      setError(null);
      if (device.token) {
        setRevealedTokens((prev) => ({ ...prev, [device.id]: device.token! }));
      }
      void queryClient.invalidateQueries({ queryKey: ["admin-devices"] });
    },
    onError: (err: Error) => setError(err.message),
  });

  const rotate = useMutation({
    mutationFn: (id: string) => adminApi.rotateDeviceToken(id),
    onSuccess: (device) => {
      if (device.token) {
        setRevealedTokens((prev) => ({ ...prev, [device.id]: device.token! }));
      }
      void queryClient.invalidateQueries({ queryKey: ["admin-devices"] });
    },
    onError: (err: Error) => setError(err.message),
  });

  const issueCode = useMutation({
    mutationFn: (id: string) => adminApi.issueDevicePairingCode(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-devices"] });
    },
    onError: (err: Error) => setError(err.message),
  });

  const revoke = useMutation({
    mutationFn: (id: string) => adminApi.revokeDevice(id),
    onSuccess: (device) => {
      setRevealedTokens((prev) => {
        const next = { ...prev };
        delete next[device.id];
        return next;
      });
      void queryClient.invalidateQueries({ queryKey: ["admin-devices"] });
    },
    onError: (err: Error) => setError(err.message),
  });

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(() => setCopied(null), 2000);
  }

  function walkInKey(deviceBranchId: string) {
    return (
      branches.find((b) => b.id === deviceBranchId)?.walkInToken ??
      deviceBranchId
    );
  }

  function pairUrl(type: string, code: string, deviceBranchId: string) {
    if (type === "KITCHEN")
      return `${KITCHEN_URL}/?code=${encodeURIComponent(code)}`;
    if (type === "WAITER")
      return `${WAITER_URL}/?code=${encodeURIComponent(code)}`;
    if (type === "CUSTOMER_DISPLAY")
      return `${CUSTOMER_URL}/pickup/${walkInKey(deviceBranchId)}?code=${encodeURIComponent(code)}`;
    return null;
  }

  function pairHint(type: string, deviceBranchId: string) {
    if (type === "KITCHEN") return KITCHEN_URL;
    if (type === "WAITER") return WAITER_URL;
    if (type === "CUSTOMER_DISPLAY")
      return `${CUSTOMER_URL}/pickup/${walkInKey(deviceBranchId)}`;
    return null;
  }

  function expiryInfo(expiresAt: string | null) {
    if (!expiresAt) return { label: t("noExpirySet"), urgent: false, expired: false };
    const ms = new Date(expiresAt).getTime() - Date.now();
    const date = new Date(expiresAt).toLocaleDateString(locale);
    const label = t("expiresOn", { date });
    if (ms <= 0)
      return {
        label: t("expiredOn", { date }),
        urgent: true,
        expired: true,
      };
    if (ms < EXPIRY_WARN_MS) return { label, urgent: true, expired: false };
    return { label, urgent: false, expired: false };
  }

  return (
    <div>
      <PageHeader
        title={t("devicesTitle")}
        subtitle={t("devicesSubtitle")}
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
        className="mb-8 grid gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 md:grid-cols-[1fr_180px_auto]"
        onSubmit={(e) => {
          e.preventDefault();
          if (!branchId) {
            setError(t("selectBranchFirst"));
            return;
          }
          create.mutate();
        }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("deviceNamePlaceholder")}
          className="h-11 rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
          required
        />
        <select
          value={deviceType}
          onChange={(e) => setDeviceType(e.target.value)}
          className="h-11 rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
        >
          {DEVICE_TYPES.map((type) => (
            <option key={type} value={type}>
              {DEVICE_TYPE_MESSAGE[type]
                ? t(DEVICE_TYPE_MESSAGE[type])
                : type}
            </option>
          ))}
        </select>
        <Button type="submit" disabled={create.isPending || !branchId}>
          {create.isPending ? t("creating") : t("createDevice")}
        </Button>
        {error ? (
          <p className="md:col-span-3 text-sm text-[var(--danger)]">{error}</p>
        ) : null}
      </form>

      {devicesQuery.isLoading ? (
        <p className="text-[var(--muted)]">{t("loadingDevices")}</p>
      ) : devicesQuery.isError ? (
        <p className="text-[var(--danger)]">
          {(devicesQuery.error as Error).message}
        </p>
      ) : (
        <div className="space-y-3">
          {(devicesQuery.data ?? []).map((device) => {
            const revealed = revealedTokens[device.id];
            const hint = pairHint(device.deviceType, device.branchId);
            const expiry = expiryInfo(device.tokenExpiresAt);
            const codeActive =
              !!device.pairingCode &&
              !!device.pairingCodeExpiresAt &&
              new Date(device.pairingCodeExpiresAt).getTime() > Date.now();
            const pair =
              codeActive && device.pairingCode
                ? pairUrl(device.deviceType, device.pairingCode, device.branchId)
                : null;
            return (
              <article
                key={device.id}
                className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{device.name}</h2>
                    <p className="text-sm text-[var(--muted)]">
                      {DEVICE_TYPE_MESSAGE[device.deviceType]
                        ? t(DEVICE_TYPE_MESSAGE[device.deviceType])
                        : device.deviceType}{" "}
                      · {device.status}
                      {device.lastSeen
                        ? ` · ${t("lastSeen", {
                            when: new Date(device.lastSeen).toLocaleString(
                              locale,
                            ),
                          })}`
                        : ""}
                    </p>
                    <p
                      className={`mt-1 text-sm ${
                        expiry.urgent
                          ? "font-medium text-[var(--danger)]"
                          : "text-[var(--muted)]"
                      }`}
                    >
                      {expiry.label}
                      {expiry.urgent ? t("rotateSoon") : ""}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={issueCode.isPending}
                      onClick={() => issueCode.mutate(device.id)}
                    >
                      {codeActive ? t("refreshCode") : t("issuePairingCode")}
                    </Button>
                    <Button
                      size="sm"
                      variant={expiry.urgent ? "default" : "secondary"}
                      disabled={rotate.isPending}
                      onClick={() => rotate.mutate(device.id)}
                    >
                      {expiry.urgent ? t("rotateNow") : t("rotateToken")}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={revoke.isPending}
                      onClick={() => {
                        if (
                          window.confirm(
                            t("confirmRevokeDevice", { name: device.name }),
                          )
                        ) {
                          revoke.mutate(device.id);
                        }
                      }}
                    >
                      {t("revoke")}
                    </Button>
                  </div>
                </div>

                <p className="mt-3 break-all rounded-md bg-[var(--paper)] px-3 py-2 font-mono text-xs text-[var(--muted)]">
                  {t("tokenPreview")} {device.tokenPreview}…
                  {revealed ? (
                    <>
                      {" "}
                      <span className="text-[var(--ink)]">{revealed}</span>
                      <button
                        type="button"
                        className="ml-3 text-[var(--accent)] underline"
                        onClick={() => void copyText(revealed)}
                      >
                        {copied === revealed ? t("copied") : t("copyToken")}
                      </button>
                    </>
                  ) : (
                    <span className="ml-2">{t("fullTokenHint")}</span>
                  )}
                </p>

                {codeActive && device.pairingCode ? (
                  <p className="mt-2 break-all rounded-md bg-[var(--paper)] px-3 py-2 font-mono text-sm">
                    {t("pairingCode")}{" "}
                    <span className="font-semibold tracking-widest">
                      {device.pairingCode}
                    </span>
                    <span className="ml-2 text-xs text-[var(--muted)]">
                      {t("expiresAt", {
                        time: new Date(
                          device.pairingCodeExpiresAt!,
                        ).toLocaleTimeString(locale),
                      })}
                    </span>
                    <button
                      type="button"
                      className="ml-3 text-[var(--accent)] underline"
                      onClick={() => void copyText(device.pairingCode!)}
                    >
                      {copied === device.pairingCode
                        ? t("copied")
                        : t("copyCode")}
                    </button>
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    {t("noActivePairingCode")}
                  </p>
                )}

                {hint ? (
                  <div className="mt-4 flex flex-wrap items-start gap-4">
                    {pair ? (
                      <PairingQr
                        url={pair}
                        label={t("pairingQrAlt", { name: device.name })}
                      />
                    ) : null}
                    <p className="text-sm text-[var(--muted)]">
                      {t("scanTabletHint", { url: hint })}
                    </p>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
