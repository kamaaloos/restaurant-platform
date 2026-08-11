"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/** Table-service food scenes that stream behind the waiter board. */
const TABLE_SCENES = [
  "/images/waiter-table-bg.jpg",
  "/images/menu/margherita.jpg",
  "/images/menu/grilled-fish.jpg",
  "/images/menu/pasta-bolognese.jpg",
  "/images/menu/salad-greek.jpg",
  "/images/menu/suqaar.jpg",
  "/images/menu/soor-salmon.jpg",
  "/images/menu/tiramisu.jpg",
] as const;

const ROTATE_MS = 9_000;

/** Dining-table food photo backdrop with slow cinematic drift. */
export function DiningBackdrop() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % TABLE_SCENES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="waiter-bg-drift absolute inset-[-10%]">
        {TABLE_SCENES.map((src, i) => (
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

      <div className="absolute inset-0 bg-[var(--paper)]/58" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--paper)]/50 via-transparent to-[var(--signal-soft)]/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(29,111,191,0.14),transparent_55%)]" />
    </div>
  );
}
