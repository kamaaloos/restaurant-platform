"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/** Food + atmosphere reel — add waiter/guest shots under /images/landing/ later. */
export const LANDING_SCENES = [
  "/images/login-fruits-bg.jpg",
  "/images/menu/bariis.jpg",
  "/images/menu/suqaar.jpg",
  "/images/menu/grilled-fish.jpg",
  "/images/menu/sambusa.jpg",
  "/images/menu/margherita.jpg",
  "/images/menu/tiramisu.jpg",
  "/images/menu/pasta-salmon.jpg",
] as const;

const SCENE_MS = 8_000;

function SceneImage({
  src,
  active,
  priority,
}: {
  src: string;
  active: boolean;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt=""
      fill
      priority={priority}
      sizes="100vw"
      className={`object-cover transition-opacity duration-[1600ms] ease-out ${
        active ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

type LandingPhotoBackdropProps = {
  /** Offset into the reel so stacked sections don’t sync perfectly. */
  startIndex?: number;
  /** Dark hero scrub vs light paper wash for text sections. */
  tone?: "hero" | "paper";
  className?: string;
};

export function LandingPhotoBackdrop({
  startIndex = 0,
  tone = "hero",
  className = "",
}: LandingPhotoBackdropProps) {
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
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <div className="menu-bg-drift absolute inset-[-8%]">
        {LANDING_SCENES.map((src, i) => (
          <SceneImage
            key={src}
            src={src}
            active={i === sceneIndex}
            priority={i === startIndex % LANDING_SCENES.length}
          />
        ))}
      </div>
      {tone === "hero" ? (
        <div className="absolute inset-0 bg-gradient-to-t from-[#132418]/[92%] via-[#234128]/55 to-[#234128]/30" />
      ) : (
        <>
          <div className="absolute inset-0 bg-[var(--paper)]/82" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--paper)]/90" />
        </>
      )}
    </div>
  );
}
