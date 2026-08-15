"use client";

import Image from "next/image";

/** Soft photo wash behind the customer menu — brand can override the image. */
export function FruitsBackdrop({
  imageUrl,
}: {
  imageUrl?: string | null;
}) {
  const src = imageUrl?.trim() || "/images/login-fruits-bg.jpg";
  const isRemote = /^https?:\/\//i.test(src);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0">
        {isRemote ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" className="h-full w-full object-cover" />
        ) : (
          <Image
            src={src}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
      </div>
      <div className="absolute inset-0 bg-[var(--paper)]/55 backdrop-blur-[1.5px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--paper)]/40 via-transparent to-[var(--paper)]/55" />
    </div>
  );
}
