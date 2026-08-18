"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type BlobAnimate = Exclude<HTMLMotionProps<"div">["animate"], undefined>;

const BLOBS: { className: string; animate: BlobAnimate; duration: number }[] = [
  {
    className:
      "absolute -left-[12%] top-[4%] h-[500px] w-[500px] rounded-full bg-[#e07a3a]/30 blur-[120px]",
    animate: { x: [0, 80, -40, 0], y: [0, -60, 40, 0], scale: [1, 1.2, 0.9, 1] },
    duration: 32,
  },
  {
    className:
      "absolute -right-[10%] top-[8%] h-[460px] w-[460px] rounded-full bg-[#f4a261]/28 blur-[120px]",
    animate: { x: [0, -70, 50, 0], y: [0, 50, -40, 0], scale: [1, 0.9, 1.15, 1] },
    duration: 38,
  },
  {
    className:
      "absolute left-[22%] top-[18%] h-[380px] w-[520px] rounded-full bg-[#f8e1c5]/55 blur-[100px]",
    animate: { x: [0, 40, -60, 0], y: [0, -30, 50, 0], scale: [1, 1.1, 0.95, 1] },
    duration: 28,
  },
  {
    className:
      "absolute bottom-[6%] left-[4%] hidden h-[360px] w-[360px] rounded-full bg-[#c45c26]/22 blur-[120px] md:block",
    animate: { x: [0, 50, -30, 0], y: [0, -40, 20, 0], scale: [1, 1.15, 0.88, 1] },
    duration: 40,
  },
  {
    className:
      "absolute right-[12%] bottom-[18%] hidden h-[300px] w-[300px] rounded-full bg-[#e9c46a]/22 blur-[100px] md:block",
    animate: { x: [0, -40, 30, 0], y: [0, 30, -50, 0], scale: [1, 0.92, 1.18, 1] },
    duration: 34,
  },
];

const PARTICLES = [
  { left: "8%", size: 2, delay: 0, duration: 22 },
  { left: "16%", size: 1.5, delay: 4, duration: 18 },
  { left: "24%", size: 2.5, delay: 8, duration: 26 },
  { left: "33%", size: 1.5, delay: 2, duration: 20 },
  { left: "41%", size: 2, delay: 11, duration: 24 },
  { left: "52%", size: 1.5, delay: 6, duration: 19 },
  { left: "61%", size: 2, delay: 14, duration: 27 },
  { left: "70%", size: 1.5, delay: 3, duration: 21 },
  { left: "78%", size: 2.5, delay: 9, duration: 23 },
  { left: "86%", size: 1.5, delay: 16, duration: 25 },
  { left: "93%", size: 2, delay: 5, duration: 18 },
  { left: "47%", size: 1.5, delay: 12, duration: 28 },
] as const;

export function HubAuroraBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Layer 1 — cream mesh */}
      <div className="hub-mesh absolute inset-0" />

      {/* Layer 2 — drifting light blobs */}
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className={blob.className}
          animate={reduceMotion ? undefined : blob.animate}
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: blob.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      ))}

      {/* Soft horizon arc */}
      <motion.div
        className="absolute left-1/2 top-[38%] h-[42vh] w-[140vw] -translate-x-1/2 rounded-[50%] bg-[#e07a3a]/18 blur-[90px]"
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.06, 0.97, 1], opacity: [0.55, 0.75, 0.5, 0.55] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 36, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* Layer 3 — floating particles */}
      {!reduceMotion &&
        PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute -bottom-3 rounded-full bg-[#e07a3a]/45"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
            }}
            animate={{ y: [0, -1100], opacity: [0, 0.55, 0] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

      {/* Layer 4 overlays — grain + vignette */}
      <div className="hub-grain absolute inset-0" />
      <div className="hub-vignette absolute inset-0" />
    </div>
  );
}
