"use client";

import * as React from "react";
import QRCode from "qrcode";

export function PairingQr({ url, label }: { url: string; label?: string }) {
  const [dataUrl, setDataUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    void QRCode.toDataURL(url, {
      width: 180,
      margin: 1,
      color: { dark: "#121820", light: "#0000" },
    }).then((value) => {
      if (!cancelled) setDataUrl(value);
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  if (!dataUrl) {
    return (
      <div className="h-[180px] w-[180px] animate-pulse rounded-md bg-[var(--surface-2)]" />
    );
  }

  return (
    <div className="inline-flex flex-col items-start gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dataUrl}
        alt={label ?? "QR"}
        width={180}
        height={180}
        className="rounded-md border border-[var(--line)] bg-white p-2"
      />
      <a
        href={url}
        className="max-w-[220px] break-all text-xs text-[var(--accent)] underline"
        target="_blank"
        rel="noreferrer"
      >
        {url}
      </a>
    </div>
  );
}
