"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const DEFAULT_SCENES = [
  "/images/login-fruits-bg.jpg",
  "/images/menu/bariis.jpg",
  "/images/menu/suqaar.jpg",
  "/images/menu/grilled-fish.jpg",
  "/images/menu/margherita.jpg",
  "/images/menu/sambusa.jpg",
] as const;

const ROTATE_MS = 9_000;

function SceneImage({
  src,
  active,
  priority,
}: {
  src: string;
  active: boolean;
  priority?: boolean;
}) {
  const isRemote = /^https?:\/\//i.test(src);
  const className = `object-cover transition-opacity duration-[1800ms] ease-out ${
    active ? "opacity-100" : "opacity-0"
  }`;

  if (isRemote) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        className={`absolute inset-0 h-full w-full ${className}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt=""
      fill
      priority={priority}
      className={className}
      sizes="100vw"
    />
  );
}

/**
 * Cinematic menu backdrop (Ken Burns drift + slow crossfade).
 * Uses restaurant custom reel when provided; otherwise platform defaults.
 */
export function FruitsBackdrop({
  imageUrl,
  imageUrls,
}: {
  imageUrl?: string | null;
  imageUrls?: string[] | null;
}) {
  const scenes = useMemo(() => {
    const custom = (imageUrls ?? [])
      .map((u) => u?.trim())
      .filter((u): u is string => !!u);
    if (custom.length) return custom;
    const single = imageUrl?.trim();
    if (single) return [single];
    return [...DEFAULT_SCENES];
  }, [imageUrl, imageUrls]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [scenes]);

  useEffect(() => {
    if (scenes.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % scenes.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [scenes]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="menu-bg-drift absolute inset-[-10%]">
        {scenes.map((src, i) => (
          <SceneImage
            key={`${src}-${i}`}
            src={src}
            active={i === index}
            priority={i === 0}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[var(--paper)]/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--paper)]/40 via-transparent to-[var(--paper)]/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,color-mix(in_oklab,var(--gold)_18%,transparent),transparent_55%)]" />
    </div>
  );
}
