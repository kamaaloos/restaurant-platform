"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const RETAIL_SCENES = [
  {
    src: "/images/retail/dashboard.png",
    alt: "MayleSoft Retail dashboard",
  },
  {
    src: "/images/retail/categories.png",
    alt: "MayleSoft Retail categories",
  },
] as const;

const SCENE_MS = 10_000;

export function RetailCinematicBackdrop({ tone = "hero" }: { tone?: "hero" | "soft" }) {
  const reduceMotion = useReducedMotion();
  const [sceneIndex, setSceneIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setSceneIndex((i) => (i + 1) % RETAIL_SCENES.length);
    }, SCENE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="retail-cinematic-drift absolute inset-[-10%]">
        {RETAIL_SCENES.map((scene, i) => (
          <Image
            key={scene.src}
            src={scene.src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover object-top transition-opacity duration-[2800ms] ease-in-out ${
              i === sceneIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {tone === "hero" ? (
        <>
          <div className="absolute inset-0 bg-[#070b14]/88" />
          <div className="absolute inset-0 bg-linear-to-br from-[#0b1220]/95 via-[#0d1628]/78 to-[#101828]/55" />
          <div className="retail-pos-glow absolute inset-0" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_78%_28%,rgba(56,189,248,0.18),transparent_58%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_18%_72%,rgba(14,165,233,0.12),transparent_60%)]" />
          <div className="retail-scanlines absolute inset-0 opacity-[0.08]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[#f7f3ec]/92" />
      )}

      {!reduceMotion ? (
        <>
          <motion.div
            className="absolute -left-[8%] top-[10%] h-[420px] w-[420px] rounded-full bg-[#38bdf8]/18 blur-[110px]"
            animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.12, 0.94, 1] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[4%] top-[18%] h-[360px] w-[360px] rounded-full bg-[#0ea5e9]/14 blur-[100px]"
            animate={{ x: [0, -50, 35, 0], y: [0, 35, -25, 0], scale: [1, 0.92, 1.1, 1] }}
            transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      ) : null}
    </div>
  );
}
