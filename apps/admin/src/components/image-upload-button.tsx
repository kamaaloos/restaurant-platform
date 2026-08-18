"use client";

import * as React from "react";
import { adminApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/locale-provider";

export function ImageUploadButton({
  onUploaded,
  label,
  restaurantId,
}: {
  onUploaded: (url: string) => void;
  label?: string;
  restaurantId?: string;
}) {
  const { t } = useLocale();
  const buttonLabel = label ?? t("uploadImage");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onPick(file: File | null) {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const result = await adminApi.uploadImage(
        file,
        restaurantId ? { restaurantId } : undefined,
      );
      onUploaded(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("uploadFailed"));
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-1">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => void onPick(e.target.files?.[0] ?? null)}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
      >
        {busy ? t("uploading") : buttonLabel}
      </Button>
      {error ? <p className="text-xs text-[var(--danger)]">{error}</p> : null}
    </div>
  );
}
