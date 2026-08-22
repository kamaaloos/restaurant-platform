"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { customerApi } from "@/lib/api";
import { extractApiMessage } from "@/lib/errors";
import { useLocale } from "@/lib/i18n/locale-provider";
import { Button } from "@/components/ui/button";

export function TablePinGate({
  token,
  children,
}: {
  token: string;
  children: React.ReactNode;
}) {
  const { t } = useLocale();
  const queryClient = useQueryClient();
  const [pin, setPin] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const presenceQuery = useQuery({
    queryKey: ["table-presence", token],
    queryFn: () => customerApi.getTablePresence(token),
    retry: false,
  });

  const verify = useMutation({
    mutationFn: () => customerApi.verifyTablePin(token, pin.trim()),
    onSuccess: () => {
      setError(null);
      setPin("");
      void queryClient.invalidateQueries({ queryKey: ["table-presence", token] });
      void queryClient.invalidateQueries({ queryKey: ["menu", token] });
    },
    onError: (err: Error) => setError(extractApiMessage(err, t("tablePinInvalid"))),
  });

  if (presenceQuery.isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4 text-[var(--muted)]">
        {t("loading")}
      </div>
    );
  }

  if (presenceQuery.data?.verified) {
    return <>{children}</>;
  }

  if (presenceQuery.data && !presenceQuery.data.pinConfigured) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-xl font-semibold">{t("tablePinNotConfiguredTitle")}</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">
          {t("tablePinNotConfiguredBody")}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-bold">{t("tablePinTitle")}</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">{t("tablePinBody")}</p>
      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (pin.trim().length !== 6) {
            setError(t("tablePinInvalid"));
            return;
          }
          verify.mutate();
        }}
      >
        <label className="block space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            {t("tablePinLabel")}
          </span>
          <input
            inputMode="numeric"
            autoComplete="off"
            maxLength={6}
            value={pin}
            onChange={(e) => {
              setPin(e.target.value.replace(/\D/g, ""));
              setError(null);
            }}
            className="h-12 w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-3 text-center text-2xl font-semibold tracking-[0.3em]"
            placeholder="••••"
          />
        </label>
        {error ? (
          <p className="text-sm text-[var(--danger)]" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" className="w-full" disabled={verify.isPending}>
          {verify.isPending ? t("loading") : t("tablePinSubmit")}
        </Button>
      </form>
    </div>
  );
}
