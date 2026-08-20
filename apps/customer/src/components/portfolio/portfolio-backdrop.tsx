"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type BlobAnimate = Exclude<HTMLMotionProps<"div">["animate"], undefined>;

const BLOBS: { className: string; animate: BlobAnimate; duration: number }[] = [
  {
    className:
      "absolute -left-[15%] top-[8%] h-[480px] w-[480px] rounded-full bg-teal-500/20 blur-[120px]",
    animate: { x: [0, 60, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.15, 0.92, 1] },
    duration: 34,
  },
  {
    className:
      "absolute -right-[12%] top-[12%] h-[420px] w-[420px] rounded-full bg-sky-500/18 blur-[110px]",
    animate: { x: [0, -50, 40, 0], y: [0, 35, -25, 0], scale: [1, 0.9, 1.12, 1] },
    duration: 40,
  },
  {
    className:
      "absolute bottom-[10%] left-[20%] h-[360px] w-[520px] rounded-full bg-cyan-400/10 blur-[100px]",
    animate: { x: [0, 35, -45, 0], y: [0, -25, 35, 0], scale: [1, 1.08, 0.94, 1] },
    duration: 30,
  },
];

const PARTICLES = [
  { left: "10%", delay: 0, duration: 24 },
  { left: "22%", delay: 5, duration: 20 },
  { left: "35%", delay: 2, duration: 26 },
  { left: "48%", delay: 8, duration: 22 },
  { left: "61%", delay: 3, duration: 28 },
  { left: "74%", delay: 11, duration: 21 },
  { left: "86%", delay: 6, duration: 25 },
] as const;

export function PortfolioBackdrop() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="portfolio-mesh absolute inset-0" />

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

      <motion.div
        className="absolute left-1/2 top-[42%] h-[38vh] w-[130vw] -translate-x-1/2 rounded-[50%] bg-teal-400/10 blur-[90px]"
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.05, 0.98, 1], opacity: [0.4, 0.65, 0.35, 0.4] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 32, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {!reduceMotion &&
        PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute -bottom-2 h-1 w-1 rounded-full bg-teal-300/50"
            style={{ left: p.left }}
            animate={{ y: [0, -900], opacity: [0, 0.6, 0] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

      <div className="portfolio-grain absolute inset-0" />
      <div className="portfolio-vignette absolute inset-0" />
    </div>
  );
}
