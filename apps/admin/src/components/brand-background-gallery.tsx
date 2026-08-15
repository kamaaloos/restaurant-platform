"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ImageUploadButton } from "@/components/image-upload-button";
import {
  BRAND_BACKGROUND_PRESETS,
  brandBackgroundPreviewSrc,
} from "@/lib/brand-backgrounds";

const CUSTOMER_URL =
  process.env.NEXT_PUBLIC_CUSTOMER_URL ?? "http://localhost:3001";

export function BrandBackgroundGallery({
  urls,
  onChange,
  inputClass,
}: {
  urls: string[];
  onChange: (urls: string[]) => void;
  inputClass: string;
}) {
  const [customUrl, setCustomUrl] = React.useState("");

  function addUrl(raw: string) {
    const url = raw.trim();
    if (!url || urls.includes(url)) return;
    if (urls.length >= 12) return;
    onChange([...urls, url]);
  }

  function removeAt(index: number) {
    onChange(urls.filter((_, i) => i !== index));
  }

  function move(index: number, delta: number) {
    const next = index + delta;
    if (next < 0 || next >= urls.length) return;
    const copy = [...urls];
    const [item] = copy.splice(index, 1);
    copy.splice(next, 0, item);
    onChange(copy);
  }

  return (
    <div className="md:col-span-2 space-y-3">
      <div>
        <p className="text-sm font-medium text-[var(--muted)]">
          Menu background reel
        </p>
        <p className="mt-1 text-xs text-[var(--muted)]">
          Add up to 12 images. Order = cinematic crossfade order. Empty = default
          scenes.
        </p>
      </div>

      {urls.length > 0 ? (
        <ul className="space-y-2">
          {urls.map((url, index) => {
            const preview = brandBackgroundPreviewSrc(url, CUSTOMER_URL);
            return (
              <li
                key={`${url}-${index}`}
                className="flex flex-wrap items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--paper)] p-2"
              >
                {preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={preview}
                    alt=""
                    className="h-14 w-20 rounded object-cover"
                  />
                ) : (
                  <div className="grid h-14 w-20 place-items-center rounded bg-[var(--surface-2)] text-xs text-[var(--muted)]">
                    ?
                  </div>
                )}
                <p className="min-w-0 flex-1 truncate text-xs text-[var(--muted)]">
                  {url}
                </p>
                <div className="flex flex-wrap gap-1">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={index === 0}
                    onClick={() => move(index, -1)}
                  >
                    ↑
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={index === urls.length - 1}
                    onClick={() => move(index, 1)}
                  >
                    ↓
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => removeAt(index)}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-[var(--muted)]">No custom backgrounds yet.</p>
      )}

      <div className="flex flex-wrap gap-2">
        {BRAND_BACKGROUND_PRESETS.map((preset) => (
          <button
            key={preset.path}
            type="button"
            disabled={urls.includes(preset.path) || urls.length >= 12}
            onClick={() => addUrl(preset.path)}
            className="overflow-hidden rounded-lg border border-[var(--line)] disabled:opacity-40"
            title={`Add ${preset.label}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brandBackgroundPreviewSrc(preset.path, CUSTOMER_URL)!}
              alt={preset.label}
              className="h-14 w-20 object-cover"
            />
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <ImageUploadButton
          label="Upload background"
          onUploaded={(url) => addUrl(url)}
        />
        <input
          value={customUrl}
          onChange={(e) => setCustomUrl(e.target.value)}
          placeholder="Or paste image URL"
          className={`${inputClass} min-w-[12rem] flex-1`}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!customUrl.trim() || urls.length >= 12}
          onClick={() => {
            addUrl(customUrl);
            setCustomUrl("");
          }}
        >
          Add URL
        </Button>
      </div>
    </div>
  );
}
