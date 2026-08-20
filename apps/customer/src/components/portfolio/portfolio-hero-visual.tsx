"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { PORTFOLIO_HERO } from "@/components/portfolio/portfolio-data";

const FLOATERS = [
  { label: "React", top: "6%", left: "4%", delay: 0 },
  { label: "Next.js", top: "14%", right: "0%", delay: 0.4 },
  { label: "NestJS", top: "48%", left: "-2%", delay: 0.8 },
  { label: "TypeScript", bottom: "22%", right: "-2%", delay: 1.2 },
  { label: "Java", bottom: "8%", left: "10%", delay: 0.6 },
  { label: "Docker", top: "62%", right: "8%", delay: 1.5 },
] as const;

export function PortfolioHeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[380px] sm:max-w-[420px] lg:max-w-none">
      <div
        className="absolute inset-[8%] rounded-[2rem] bg-gradient-to-br from-teal-400/30 via-sky-500/15 to-transparent blur-2xl"
        aria-hidden
      />
      <motion.div
        className="absolute inset-[4%] rounded-[2.2rem] border border-teal-400/20"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 56, repeat: Infinity, ease: "linear" }
        }
        aria-hidden
      />
      <motion.div
        className="absolute inset-[10%] rounded-[1.8rem] border border-dashed border-sky-400/15"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 72, repeat: Infinity, ease: "linear" }
        }
        aria-hidden
      />

      <div className="absolute inset-[12%] overflow-hidden rounded-[1.6rem] border border-white/12 bg-[#0f172a]/70 shadow-[0_28px_80px_rgba(0,0,0,0.5)]">
        <Image
          src={PORTFOLIO_HERO.photoSrc}
          alt={PORTFOLIO_HERO.photoAlt}
          fill
          priority
          sizes="(max-width: 1024px) 380px, 440px"
          className="object-cover object-[50%_18%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0b1120]/85 via-[#0b1120]/15 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <p className="portfolio-display text-xl font-semibold text-white sm:text-2xl">
            {PORTFOLIO_HERO.displayName}
          </p>
          <p className="mt-1 text-xs text-teal-300/90 sm:text-sm">
            Senior Software Engineer · Quality Leader
          </p>
        </div>
      </div>

      {FLOATERS.map((item) => (
        <motion.span
          key={item.label}
          className="absolute z-10 rounded-full border border-white/10 bg-[#0b1120]/92 px-3 py-1.5 text-[11px] font-medium text-slate-300 shadow-lg backdrop-blur-sm"
          style={{
            top: "top" in item ? item.top : undefined,
            left: "left" in item ? item.left : undefined,
            right: "right" in item ? item.right : undefined,
            bottom: "bottom" in item ? item.bottom : undefined,
          }}
          animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
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
