"use client";

import Link from "next/link";

export function LegalPageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f8f5ef] px-4 py-10 text-[#1c1917] sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-[#1c1917]/10 bg-white/80 px-4 py-2 text-sm font-medium text-[#1c1917] shadow-sm backdrop-blur-sm transition hover:bg-white"
        >
          Back to MayleSoft
        </Link>

        <section className="mt-8 rounded-[2rem] border border-[#1c1917]/8 bg-white/70 p-6 shadow-xl shadow-[#1c1917]/5 backdrop-blur-sm sm:mt-10 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e07a3a]">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6b6560] sm:text-base">
            {intro}
          </p>

          <div className="mt-10 space-y-8 text-sm leading-7 text-[#3e3a36] sm:text-base">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
