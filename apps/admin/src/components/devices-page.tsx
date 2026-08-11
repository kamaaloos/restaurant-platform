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

const KITCHEN_URL =
  process.env.NEXT_PUBLIC_KITCHEN_URL ?? "http://localhost:3002";
const WAITER_URL =
  process.env.NEXT_PUBLIC_WAITER_URL ?? "http://localhost:3003";
const CUSTOMER_URL =
  process.env.NEXT_PUBLIC_CUSTOMER_URL ?? "http://localhost:3001";

const EXPIRY_WARN_MS = 2 * 24 * 60 * 60 * 1000;

export function DevicesPage() {
  const queryClient = useQueryClient();
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
    if (!expiresAt) return { label: "No expiry set", urgent: false, expired: false };
    const ms = new Date(expiresAt).getTime() - Date.now();
    const label = `Expires ${new Date(expiresAt).toLocaleDateString()}`;
    if (ms <= 0)
      return {
        label: `Expired ${new Date(expiresAt).toLocaleDateString()}`,
        urgent: true,
        expired: true,
      };
    if (ms < EXPIRY_WARN_MS) return { label, urgent: true, expired: false };
    return { label, urgent: false, expired: false };
  }

  return (
    <div>
      <PageHeader
        title="Devices"
        subtitle="Pair displays with a short-lived QR code. Long-lived tokens are shown only when created or rotated."
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
            setError("Select a branch first.");
            return;
          }
          create.mutate();
        }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Device name (e.g. Kitchen TV 1)"
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
              {type}
            </option>
          ))}
        </select>
        <Button type="submit" disabled={create.isPending || !branchId}>
          {create.isPending ? "Creating…" : "Create device"}
        </Button>
        {error ? (
          <p className="md:col-span-3 text-sm text-[var(--danger)]">{error}</p>
        ) : null}
      </form>

      {devicesQuery.isLoading ? (
        <p className="text-[var(--muted)]">Loading devices…</p>
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
                      {device.deviceType} · {device.status}
                      {device.lastSeen
                        ? ` · last seen ${new Date(device.lastSeen).toLocaleString()}`
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
                      {expiry.urgent ? " — rotate soon" : ""}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={issueCode.isPending}
                      onClick={() => issueCode.mutate(device.id)}
                    >
                      {codeActive ? "Refresh code" : "Issue pairing code"}
                    </Button>
                    <Button
                      size="sm"
                      variant={expiry.urgent ? "default" : "secondary"}
                      disabled={rotate.isPending}
                      onClick={() => rotate.mutate(device.id)}
                    >
                      {expiry.urgent ? "Rotate now" : "Rotate token"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={revoke.isPending}
                      onClick={() => {
                        if (
                          window.confirm(
                            `Revoke ${device.name}? The tablet must be re-paired after rotate.`,
                          )
                        ) {
                          revoke.mutate(device.id);
                        }
                      }}
                    >
                      Revoke
                    </Button>
                  </div>
                </div>

                <p className="mt-3 break-all rounded-md bg-[var(--paper)] px-3 py-2 font-mono text-xs text-[var(--muted)]">
                  Token preview {device.tokenPreview}…
                  {revealed ? (
                    <>
                      {" "}
                      <span className="text-[var(--ink)]">{revealed}</span>
                      <button
                        type="button"
                        className="ml-3 text-[var(--accent)] underline"
                        onClick={() => void copyText(revealed)}
                      >
                        {copied === revealed ? "Copied" : "Copy token"}
                      </button>
                    </>
                  ) : (
                    <span className="ml-2">
                      (full token shown only after create/rotate)
                    </span>
                  )}
                </p>

                {codeActive && device.pairingCode ? (
                  <p className="mt-2 break-all rounded-md bg-[var(--paper)] px-3 py-2 font-mono text-sm">
                    Pairing code{" "}
                    <span className="font-semibold tracking-widest">
                      {device.pairingCode}
                    </span>
                    <span className="ml-2 text-xs text-[var(--muted)]">
                      expires{" "}
                      {new Date(device.pairingCodeExpiresAt!).toLocaleTimeString()}
                    </span>
                    <button
                      type="button"
                      className="ml-3 text-[var(--accent)] underline"
                      onClick={() => void copyText(device.pairingCode!)}
                    >
                      {copied === device.pairingCode ? "Copied" : "Copy code"}
                    </button>
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    No active pairing code — issue one to show a QR.
                  </p>
                )}

                {hint ? (
                  <div className="mt-4 flex flex-wrap items-start gap-4">
                    {pair ? (
                      <PairingQr
                        url={pair}
                        label={`${device.name} pairing`}
                      />
                    ) : null}
                    <p className="text-sm text-[var(--muted)]">
                      Scan with the tablet camera, or open{" "}
                      <a
                        className="font-medium text-[var(--accent)] underline"
                        href={hint}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {hint}
                      </a>{" "}
                      and paste the pairing code (one-time, ~10 minutes).
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
