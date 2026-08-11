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

/**
 * Pair / select a physical Stripe Terminal reader via /api/payments/terminal/*.
 * Simulated remains default for local + CI (no hardware required).
 */
export function TerminalReaderSettings({ enabled }: { enabled: boolean }) {
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
        `Registered ${reader.label ?? reader.id} via /payments/terminal/readers/register`,
      );
      void queryClient.invalidateQueries({ queryKey: ["terminal-readers"] });
    },
    onError: (err) => {
      setMessage(err instanceof Error ? err.message : "Register failed");
    },
  });

  const connect = useMutation({
    mutationFn: () => connectTerminalReader(),
    onSuccess: (result) => {
      setSelectedReaderId(result.readerId);
      setSelectedId(result.readerId);
      setMessage(
        result.mode === "physical"
          ? `Connected to ${result.readerLabel} (token from /payments/terminal/connection-token).`
          : `Connected simulated reader ${result.readerLabel}.`,
      );
    },
    onError: (err) => {
      setMessage(err instanceof Error ? err.message : "Connect failed");
    },
  });

  if (!enabled) return null;

  const locationId = configQuery.data?.terminalLocationId;

  function applyMode(next: TerminalMode) {
    setTerminalMode(next);
    setMode(next);
    setMessage(
      next === "simulated"
        ? "Using simulated reader (local/CI)."
        : "Physical mode — register/select a reader, then Connect.",
    );
  }

  return (
    <details className="mb-6 rounded-xl border border-[var(--line)] bg-[var(--surface)]/88 p-4 backdrop-blur-md">
      <summary className="cursor-pointer text-sm font-semibold">
        Stripe Terminal reader
      </summary>
      <div className="mt-3 space-y-3 text-sm">
        <p className="text-[var(--muted)]">
          All Terminal traffic goes through{" "}
          <code className="text-xs">/api/payments/terminal/*</code> (connection
          token, reader list, register). Simulated needs no hardware. Physical:
          set <code className="text-xs">PAYMENT_PROVIDER=stripe</code>,{" "}
          <code className="text-xs">STRIPE_TERMINAL=1</code>, and{" "}
          <code className="text-xs">STRIPE_TERMINAL_LOCATION_ID</code> on the
          API, then register the device pairing code here.
        </p>

        <p className="text-xs text-[var(--muted)]">
          Location:{" "}
          <span className="font-mono text-[var(--ink)]">
            {locationId ?? "not configured"}
          </span>
        </p>

        {!locationId && mode === "physical" ? (
          <p className="text-[var(--danger)]">
            No location configured — register/connect will fail until Location
            ID is set.
          </p>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={mode === "simulated" ? "default" : "secondary"}
            type="button"
            onClick={() => applyMode("simulated")}
          >
            Simulated
          </Button>
          <Button
            size="sm"
            variant={mode === "physical" ? "default" : "secondary"}
            type="button"
            onClick={() => applyMode("physical")}
          >
            Physical
          </Button>
          <Button
            size="sm"
            variant="outline"
            type="button"
            disabled={connect.isPending}
            onClick={() => connect.mutate()}
          >
            {connect.isPending ? "Connecting…" : "Connect / test"}
          </Button>
        </div>

        {mode === "physical" ? (
          <>
            <label className="block">
              <span className="text-[var(--muted)]">Preferred reader</span>
              <select
                className="mt-1 h-10 w-full max-w-md rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
                value={selectedId ?? ""}
                onChange={(e) => {
                  const id = e.target.value || null;
                  setSelectedReaderId(id);
                  setSelectedId(id);
                }}
              >
                <option value="">First discovered at location</option>
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
                <span className="text-[var(--muted)]">Registration code</span>
                <input
                  className="mt-1 h-10 w-40 rounded-md border border-[var(--line)] bg-[var(--paper)] px-3"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="xxxx-xxxx"
                />
              </label>
              <label className="block">
                <span className="text-[var(--muted)]">Label</span>
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
                {register.isPending ? "Registering…" : "Register reader"}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                type="button"
                onClick={() => void readersQuery.refetch()}
              >
                Refresh list
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
