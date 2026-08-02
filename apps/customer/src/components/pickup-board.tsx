"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { customerApi } from "@/lib/api";
import { usePickupBoardRealtime } from "@/hooks/use-pickup-board-realtime";
import type { PickupBoardEntry } from "@/lib/types";
import {
  clearStoredDeviceToken,
  getStoredDeviceToken,
  setStoredDeviceToken,
} from "@/lib/device-token";
import {
  LanguageSwitcher,
  useLocale,
} from "@/lib/i18n/locale-provider";
import { Button } from "@/components/ui/button";

export function PickupBoardExperience({ branchId }: { branchId: string }) {
  const { t } = useLocale();
  const searchParams = useSearchParams();
  const [deviceToken, setDeviceToken] = React.useState<string | null>(null);
  const [tokenInput, setTokenInput] = React.useState("");
  const [pairError, setPairError] = React.useState<string | null>(null);
  const [pairing, setPairing] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setDeviceToken(getStoredDeviceToken());
    setHydrated(true);
  }, []);

  const pair = React.useCallback(
    async (raw: string) => {
      const token = raw.trim();
      if (!token) return;
      setPairing(true);
      setPairError(null);
      try {
        await customerApi.getPickupBoard(branchId, token);
        setStoredDeviceToken(token);
        setDeviceToken(token);
        setTokenInput("");
      } catch (err) {
        setPairError(
          err instanceof Error ? err.message : t("somethingWentWrong"),
        );
      } finally {
        setPairing(false);
      }
    },
    [branchId, t],
  );

  React.useEffect(() => {
    const fromQuery = searchParams.get("token")?.trim();
    if (!fromQuery || !hydrated) return;
    void pair(fromQuery);
  }, [searchParams, hydrated, pair]);

  const { connected } = usePickupBoardRealtime(branchId, deviceToken);

  const boardQuery = useQuery({
    queryKey: ["pickup-board", branchId, deviceToken],
    queryFn: () => customerApi.getPickupBoard(branchId, deviceToken!),
    enabled: !!deviceToken,
    refetchInterval: connected ? 30_000 : 8_000,
  });

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[var(--paper)] px-6 py-8 text-[var(--muted)]">
        {t("loading")}
      </div>
    );
  }

  if (!deviceToken) {
    return (
      <div className="min-h-screen bg-[var(--paper)] px-6 py-16 text-[var(--ink)]">
        <div className="mx-auto max-w-xl">
          <div className="mb-6 flex justify-end">
            <LanguageSwitcher />
          </div>
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
            {t("pickupBoardTitle")}
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl leading-none">
            {t("pairDeviceTitle")}
          </h1>
          <p className="mt-3 text-[var(--muted)]">{t("pairDeviceBody")}</p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              void pair(tokenInput);
            }}
          >
            <label className="block space-y-2">
              <span className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                {t("deviceTokenLabel")}
              </span>
              <input
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder={t("pairDevicePlaceholder")}
                className="h-14 w-full rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 text-lg outline-none ring-[var(--accent)] placeholder:text-[var(--muted)] focus:ring-2"
                autoComplete="off"
                spellCheck={false}
                required
              />
            </label>
            {pairError ? (
              <p className="text-[var(--danger)]">{pairError}</p>
            ) : null}
            <Button type="submit" className="w-full" size="lg" disabled={pairing}>
              {pairing ? t("pairing") : t("pairDeviceCta")}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  const board = boardQuery.data;

  return (
    <div className="min-h-screen bg-[var(--paper)] px-6 py-8 text-[var(--ink)]">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
            {t("pickupBoardTitle")}
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-5xl leading-none">
            {board?.restaurant.name ?? t("yourOrder")}
          </h1>
          <p className="mt-2 text-[var(--muted)]">
            {board?.branch.name ?? t("loading")}
          </p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <LanguageSwitcher />
          <p className="text-sm text-[var(--muted)]">
            {t("live")}:{" "}
            <span className={connected ? "text-[var(--accent)]" : undefined}>
              {connected ? t("connected") : t("polling")}
            </span>
          </p>
          <button
            type="button"
            className="text-sm text-[var(--muted)] underline"
            onClick={() => {
              clearStoredDeviceToken();
              setDeviceToken(null);
            }}
          >
            {t("unpairDevice")}
          </button>
        </div>
      </header>

      {boardQuery.isError ? (
        <div className="space-y-4">
          <p className="text-[var(--danger)]">
            {(boardQuery.error as Error).message}
          </p>
          <Button
            variant="secondary"
            onClick={() => {
              clearStoredDeviceToken();
              setDeviceToken(null);
            }}
          >
            {t("unpairDevice")}
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          <BoardColumn
            title={t("preparingColumn")}
            hint={t("preparingHint")}
            entries={board?.preparing ?? []}
            tone="preparing"
          />
          <BoardColumn
            title={t("readyColumn")}
            hint={t("readyHint")}
            entries={board?.ready ?? []}
            tone="ready"
          />
        </div>
      )}
    </div>
  );
}

function BoardColumn({
  title,
  hint,
  entries,
  tone,
}: {
  title: string;
  hint: string;
  entries: PickupBoardEntry[];
  tone: "preparing" | "ready";
}) {
  return (
    <section
      className={`rounded-3xl border p-6 ${
        tone === "ready"
          ? "border-[var(--accent)] bg-[var(--accent-soft)]"
          : "border-[var(--line)] bg-[var(--surface)]"
      }`}
    >
      <h2 className="font-[family-name:var(--font-display)] text-4xl">
        {title}
      </h2>
      <p className="mt-1 text-sm text-[var(--muted)]">{hint}</p>

      {entries.length === 0 ? (
        <p className="mt-10 text-center text-lg text-[var(--muted)]">—</p>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {entries.map((entry) => (
            <li
              key={entry.orderId}
              className={`flex min-h-28 items-center justify-center rounded-2xl text-center font-[family-name:var(--font-display)] text-5xl tabular-nums ${
                tone === "ready"
                  ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                  : "bg-[var(--paper)] text-[var(--ink)]"
              }`}
            >
              {entry.queueNumber}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
