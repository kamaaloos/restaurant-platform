"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/** Cinematic notes-and-coins stills — same streaming style as kitchen/waiter food backdrops. */
const MONEY_SCENES = [
  "/images/cashier-money-bg-1.jpg",
  "/images/cashier-money-bg-2.jpg",
  "/images/cashier-money-bg-3.jpg",
] as const;

const ROTATE_MS = 9_000;

export function CurrencyBackdrop() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % MONEY_SCENES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="cashier-currency-backdrop pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="cashier-money-drift absolute inset-[-10%]">
        {MONEY_SCENES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={i === 0}
            className={`object-cover transition-opacity duration-[1800ms] ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            sizes="100vw"
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[var(--paper)]/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--paper)]/50 via-transparent to-[var(--accent-soft)]/35" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(15,118,110,0.16),transparent_55%)]" />
    </div>
  );
}
