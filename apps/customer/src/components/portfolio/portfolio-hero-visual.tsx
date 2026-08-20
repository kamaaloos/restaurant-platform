"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HERO_TECH_ICONS } from "@/components/portfolio/portfolio-data";

const FLOATERS = [
  { label: "React", top: "8%", left: "12%", delay: 0 },
  { label: "Next.js", top: "18%", right: "8%", delay: 0.4 },
  { label: "NestJS", top: "42%", left: "2%", delay: 0.8 },
  { label: "TypeScript", bottom: "28%", right: "4%", delay: 1.2 },
  { label: "Java", bottom: "12%", left: "18%", delay: 0.6 },
  { label: "Docker", top: "58%", right: "18%", delay: 1.5 },
] as const;

export function PortfolioHeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px] lg:max-w-none">
      {/* Soft orb */}
      <div
        className="absolute inset-[12%] rounded-full bg-gradient-to-br from-teal-400/25 via-sky-500/10 to-transparent blur-2xl"
        aria-hidden
      />
      <motion.div
        className="absolute inset-[18%] rounded-full border border-teal-400/20"
        animate={
          reduceMotion
            ? undefined
            : { rotate: 360 }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 48, repeat: Infinity, ease: "linear" }
        }
        aria-hidden
      />
      <motion.div
        className="absolute inset-[28%] rounded-full border border-dashed border-sky-400/15"
        animate={
          reduceMotion
            ? undefined
            : { rotate: -360 }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 64, repeat: Infinity, ease: "linear" }
        }
        aria-hidden
      />

      {/* Core architecture card */}
      <div className="absolute inset-[22%] flex flex-col justify-center gap-3 rounded-[2rem] border border-white/10 bg-[#0f172a]/80 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-400/80">
          Architecture
        </p>
        <div className="space-y-2 font-mono text-[11px] leading-relaxed text-slate-400 sm:text-xs">
          <p>
            <span className="text-sky-300">client</span>
            <span className="text-slate-600"> → </span>
            Next.js / React
          </p>
          <p>
            <span className="text-teal-300">api</span>
            <span className="text-slate-600"> → </span>
            NestJS · REST
          </p>
          <p>
            <span className="text-violet-300">data</span>
            <span className="text-slate-600"> → </span>
            PostgreSQL
          </p>
          <p>
            <span className="text-amber-300">quality</span>
            <span className="text-slate-600"> → </span>
            CI · Tests · UAT
          </p>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {HERO_TECH_ICONS.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/8 bg-white/5 px-2 py-0.5 text-[10px] text-slate-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Floating tech chips */}
      {FLOATERS.map((item) => (
        <motion.span
          key={item.label}
          className="absolute z-10 rounded-full border border-white/10 bg-[#0b1120]/90 px-3 py-1.5 text-[11px] font-medium text-slate-300 shadow-lg backdrop-blur-sm"
          style={{
            top: "top" in item ? item.top : undefined,
            left: "left" in item ? item.left : undefined,
            right: "right" in item ? item.right : undefined,
            bottom: "bottom" in item ? item.bottom : undefined,
          }}
          animate={
            reduceMotion
              ? undefined
              : { y: [0, -8, 0] }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 3.6,
                  delay: item.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        >
          {item.label}
        </motion.span>
      ))}
    </div>
  );
}
