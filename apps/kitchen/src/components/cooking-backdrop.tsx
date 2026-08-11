"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const FOOD_SCENES = [
  "/images/kitchen-cooking-bg.jpg",
  "/images/menu/grilled-fish.jpg",
  "/images/menu/suqaar.jpg",
  "/images/menu/pasta-bolognese.jpg",
  "/images/menu/soor-salmon.jpg",
  "/images/menu/margherita.jpg",
] as const;

const ROTATE_MS = 9_000;

/** Warm cooking-food photo backdrop with slow cinematic drift. */
export function CookingBackdrop() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % FOOD_SCENES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="kitchen-bg-drift absolute inset-[-10%]">
        {FOOD_SCENES.map((src, i) => (
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

      {/* Soft paper wash so tickets stay readable */}
      <div className="absolute inset-0 bg-[var(--paper)]/58" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--paper)]/45 via-transparent to-[var(--heat-soft)]/35" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(196,92,38,0.18),transparent_55%)]" />
    </div>
  );
}
