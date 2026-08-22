"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  exchangeDevicePairingCode,
  looksLikePairingCode,
} from "@org/shared";
import { waiterApi } from "@/lib/api";
import { setStoredDeviceToken } from "@/lib/device-token";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/locale-provider";

async function resolveDeviceToken(raw: string, enterPairing: string) {
  const value = raw.trim();
  if (!value) throw new Error(enterPairing);
  if (looksLikePairingCode(value)) {
    const paired = await exchangeDevicePairingCode(value);
    return paired.token;
  }
  return value;
}

export function PairingForm() {
  const { t } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);

  React.useEffect(() => {
    const fromCode = searchParams.get("code");
    const fromToken = searchParams.get("token");
    if (fromCode) setToken(fromCode);
    else if (fromToken) setToken(fromToken);
  }, [searchParams]);

  React.useEffect(() => {
    const fromCode = searchParams.get("code")?.trim();
    const fromToken = searchParams.get("token")?.trim();
    const raw = fromCode || fromToken;
    if (!raw) return;

    let cancelled = false;
    setPending(true);
    void resolveDeviceToken(raw, t("enterPairing"))
      .then(async (deviceToken) => {
        await waiterApi.me(deviceToken);
        if (cancelled) return;
        setStoredDeviceToken(deviceToken);
        router.replace("/display");
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message || t("qrPairingFailed"));
        setPending(false);
      });

    return () => {
      cancelled = true;
    };
  }, [searchParams, router, t]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setPending(true);

    try {
      const deviceToken = await resolveDeviceToken(token, t("enterPairing"));
      await waiterApi.me(deviceToken);
      setStoredDeviceToken(deviceToken);
      router.push("/display");
    } catch (err) {
      setError(err instanceof Error ? err.message : t("pairingFailed"));
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-xl space-y-5">
      <label className="block space-y-2">
        <span className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
          {t("pairingLabel")}
        </span>
        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder={t("pairingPlaceholder")}
          className="h-14 w-full rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 text-lg text-[var(--ink)] outline-none ring-[var(--signal)] placeholder:text-[var(--muted)] focus:ring-2"
          autoComplete="off"
          spellCheck={false}
          required
        />
      </label>

      {error ? (
        <p className="rounded-lg bg-[var(--danger-soft)] px-4 py-3 text-[var(--danger)]">
          {error}
        </p>
      ) : null}

      <Button type="submit" size="touch" className="w-full" disabled={pending}>
        {pending ? t("pairingPending") : t("pairingSubmit")}
      </Button>
    </form>
  );
}
