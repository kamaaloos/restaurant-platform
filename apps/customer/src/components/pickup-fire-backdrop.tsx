"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/** Flaming grill / fast-food stills that stream behind the pickup TV. */
const FIRE_SCENES = [
  "/images/pickup-fire-bg-1.jpg",
  "/images/pickup-fire-bg-2.jpg",
  "/images/pickup-fire-bg-3.jpg",
  "/images/menu/bur.jpg",
  "/images/menu/sambusa.jpg",
  "/images/menu/margherita.jpg",
] as const;

const ROTATE_MS = 8_000;

/** Cinematic fast-food fire backdrop with slow Ken Burns drift. */
export function PickupFireBackdrop() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % FIRE_SCENES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="pickup-fire-drift absolute inset-[-12%]">
        {FIRE_SCENES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={i === 0}
            className={`object-cover transition-opacity duration-[1600ms] ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            sizes="100vw"
          />
        ))}
      </div>

      {/* Ember wash — keep board numbers readable */}
      <div className="absolute inset-0 bg-[var(--paper)]/52" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--paper)]/40 via-transparent to-[#3a1208]/45" />
      <div className="pickup-fire-glow absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_115%,rgba(220,80,20,0.28),transparent_58%)]" />
    </div>
  );
}
