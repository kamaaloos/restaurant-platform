"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cashierApi } from "@/lib/api";
import {
  connectTerminalReader,
  getSelectedReaderId,
  getTerminalMode,
  setSelectedReaderId,
  setTerminalMode,
  type TerminalMode,
} from "@/lib/terminal";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/locale-provider";

/**
 * Pair / select a physical Stripe Terminal reader via /api/payments/terminal/*.
 * Simulated remains default for local + CI (no hardware required).
 */
export function TerminalReaderSettings({ enabled }: { enabled: boolean }) {
  const { t } = useLocale();
  const queryClient = useQueryClient();
  const [mode, setMode] = React.useState<TerminalMode>("simulated");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [code, setCode] = React.useState("");
  const [label, setLabel] = React.useState("Counter 1");
  const [message, setMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    setMode(getTerminalMode());
    setSelectedId(getSelectedReaderId());
  }, []);

  const configQuery = useQuery({
    queryKey: ["payment-provider-config"],
    queryFn: () => cashierApi.paymentConfig(),
    enabled,
  });

  const readersQuery = useQuery({
    queryKey: ["terminal-readers"],
    queryFn: () => cashierApi.listTerminalReaders(),
    enabled: enabled && mode === "physical",
  });

  const register = useMutation({
    mutationFn: () =>
      cashierApi.registerTerminalReader({
        registrationCode: code.trim(),
        label: label.trim() || "Reader",
      }),
    onSuccess: (reader) => {
      setSelectedReaderId(reader.id);
      setSelectedId(reader.id);
      setCode("");
      setMessage(
        t("registeredReader", { label: reader.label ?? reader.id }),
      );
      void queryClient.invalidateQueries({ queryKey: ["terminal-readers"] });
    },
    onError: (err) => {
      setMessage(err instanceof Error ? err.message : t("registerFailed"));
    },
  });

  const connect = useMutation({
    mutationFn: () => connectTerminalReader(),
    onSuccess: (result) => {
      setSelectedReaderId(result.readerId);
      setSelectedId(result.readerId);
      setMessage(
        result.mode === "physical"
          ? t("connectedPhysical", { label: result.readerLabel })
          : t("connectedSimulated", { label: result.readerLabel }),
      );
    },
    onError: (err) => {
      setMessage(err instanceof Error ? err.message : t("connectFailed"));
    },
  });

  if (!enabled) return null;

  const locationId = configQuery.data?.terminalLocationId;

  function applyMode(next: TerminalMode) {
    setTerminalMode(next);
    setMode(next);
    setMessage(
      next === "simulated" ? t("usingSimulated") : t("physicalModeHint"),
    );
  }

  return (
    <details className="mb-6 rounded-xl border border-[var(--line)] bg-[var(--surface)]/88 p-4 backdrop-blur-md">
      <summary className="cursor-pointer text-sm font-semibold">
        {t("stripeTerminalReader")}
      </summary>
      <div className="mt-3 space-y-3 text-sm">
        <p className="text-[var(--muted)]">{t("terminalHelp")}</p>

        <p className="text-xs text-[var(--muted)]">
          {t("location")}{" "}
          <span className="font-mono text-[var(--ink)]">
            {locationId ?? t("notConfigured")}
          </span>
        </p>

        {!locationId && mode === "physical" ? (
          <p className="text-[var(--danger)]">{t("noLocationWarning")}</p>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={mode === "simulated" ? "default" : "secondary"}
            type="button"
            onClick={() => applyMode("simulated")}
          >
            {t("simulated")}
          </Button>
          <Button
            size="sm"
            variant={mode === "physical" ? "default" : "secondary"}
            type="button"
            onClick={() => applyMode("physical")}
          >
            {t("physical")}
          </Button>
          <Button
            size="sm"
            variant="outline"
            type="button"
            disabled={connect.isPending}
            onClick={() => connect.mutate()}
          >
            {connect.isPending ? t("connecting") : t("connectTest")}
          </Button>
        </div>

        {mode === "physical" ? (
          <>
            <label className="block">
              <span className="text-[var(--muted)]">{t("preferredReader")}</span>
              <select
                className="mt-1 h-10 w-full max-w-md rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
                value={selectedId ?? ""}
                onChange={(e) => {
                  const id = e.target.value || null;
                  setSelectedReaderId(id);
                  setSelectedId(id);
                }}
              >
                <option value="">{t("firstDiscovered")}</option>
                {(readersQuery.data ?? []).map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label ?? r.id} · {r.status}
                    {r.serialNumber ? ` · ${r.serialNumber}` : ""}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex flex-wrap items-end gap-2">
              <label className="block">
                <span className="text-[var(--muted)]">
                  {t("registrationCode")}
                </span>
                <input
                  className="mt-1 h-10 w-40 rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="xxxx-xxxx"
                />
              </label>
              <label className="block">
                <span className="text-[var(--muted)]">{t("label")}</span>
                <input
                  className="mt-1 h-10 w-40 rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                />
              </label>
              <Button
                size="sm"
                type="button"
                disabled={!code.trim() || register.isPending || !locationId}
                onClick={() => register.mutate()}
              >
                {register.isPending ? t("registering") : t("registerReader")}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                type="button"
                onClick={() => void readersQuery.refetch()}
              >
                {t("refreshList")}
              </Button>
            </div>
          </>
        ) : null}

        {message ? (
          <p className="text-xs text-[var(--muted)]">{message}</p>
        ) : null}
      </div>
    </details>
  );
}
