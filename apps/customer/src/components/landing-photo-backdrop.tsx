"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/** Prefer Nordic food / warm interiors we already ship; swap for real venue photos later. */
export const LANDING_SCENES = [
  "/images/login-fruits-bg.jpg",
  "/images/menu/grilled-fish.jpg",
  "/images/menu/bariis.jpg",
  "/images/menu/sambusa.jpg",
  "/images/menu/margherita.jpg",
  "/images/menu/pasta-salmon.jpg",
  "/images/menu/suqaar.jpg",
  "/images/menu/tiramisu.jpg",
] as const;

const SCENE_MS = 9_000;

export function LandingPhotoBackdrop({
  startIndex = 0,
  tone = "hero",
}: {
  startIndex?: number;
  tone?: "hero" | "soft";
}) {
  const [sceneIndex, setSceneIndex] = useState(
    startIndex % LANDING_SCENES.length,
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setSceneIndex((i) => (i + 1) % LANDING_SCENES.length);
    }, SCENE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="landing-ken-burns absolute inset-[-6%]">
        {LANDING_SCENES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={i === startIndex % LANDING_SCENES.length}
            sizes="100vw"
            className={`object-cover transition-opacity duration-[2000ms] ease-out ${
              i === sceneIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      {tone === "hero" ? (
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1510]/88 via-[#1a1510]/55 to-[#1a1510]/25" />
      ) : (
        <div className="absolute inset-0 bg-[var(--landing-cream)]/90" />
      )}
    </div>
  );
}
