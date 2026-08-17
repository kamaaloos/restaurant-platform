"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Cinematic dining reel — swap for real Nordic interior / service video later.
 * Drop assets under public/images/landing/ (e.g. dining-room.jpg, waiter-serve.jpg).
 */
type LandingMedia =
  | { type: "video"; src: string; poster?: string }
  | { type: "image"; src: string };

/**
 * Drop your real assets in `public/images/landing/` using this convention:
 * - `/images/landing/hero-video.mp4`
 * - `/images/landing/hero-poster.jpg`
 * - `/images/landing/dining-room.jpg`
 * - `/images/landing/waiter-serving.jpg`
 *
 * The first item can be a looping MP4; remaining images crossfade behind it.
 */
export const LANDING_MEDIA: readonly LandingMedia[] = [
  {
    type: "video",
    src: "/images/landing/hero-video.mp4",
    poster: "/images/landing/hero-poster.jpg",
  },
  { type: "image", src: "/images/landing/dining-room.jpg" },
  { type: "image", src: "/images/landing/waiter-serving.jpg" },
  { type: "image", src: "/images/landing/table-setting.jpg" },
  { type: "image", src: "/images/login-fruits-bg.jpg" },
  { type: "image", src: "/images/menu/grilled-fish.jpg" },
  { type: "image", src: "/images/menu/bariis.jpg" },
  { type: "image", src: "/images/menu/suqaar.jpg" },
] as const;

const SCENE_MS = 12_000;

export function LandingPhotoBackdrop({
  startIndex = 0,
  tone = "hero",
}: {
  startIndex?: number;
  tone?: "hero" | "soft";
}) {
  const [sceneIndex, setSceneIndex] = useState(
    startIndex % LANDING_MEDIA.length,
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setSceneIndex((i) => (i + 1) % LANDING_MEDIA.length);
    }, SCENE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="landing-cinematic-drift absolute inset-[-8%]">
        {LANDING_MEDIA.map((item, i) => (
          item.type === "video" ? (
            <video
              key={item.src}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-3000 ease-in-out ${
                i === sceneIndex ? "opacity-100" : "opacity-0"
              }`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={item.poster}
            >
              <source src={item.src} type="video/mp4" />
            </video>
          ) : (
            <Image
              key={item.src}
              src={item.src}
              alt=""
              fill
              priority={i === startIndex % LANDING_MEDIA.length}
              sizes="100vw"
              className={`object-cover transition-opacity duration-3000 ease-in-out ${
                i === sceneIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          )
        ))}
      </div>
      {tone === "hero" ? (
        <>
          <div className="absolute inset-0 bg-linear-to-r from-[#14100c]/92 via-[#1a1510]/72 to-[#1a1510]/35" />
          <div className="landing-warm-glow absolute inset-0" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,rgba(224,122,58,0.12),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_40%,rgba(0,0,0,0.45)_100%)]" />
        </>
      ) : (
        <div className="absolute inset-0 bg-(--landing-cream)/90" />
      )}
    </div>
  );
}
