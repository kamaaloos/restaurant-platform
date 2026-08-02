import { Suspense } from "react";
import { PairingForm } from "@/components/pairing-form";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(15,28,46,0.12) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      <section className="relative mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--signal)]">
          Floor tablet
        </p>
        <h1 className="mb-4 font-[family-name:var(--font-display)] text-7xl leading-none tracking-wide text-[var(--ink)] md:text-8xl">
          Waiter Display
        </h1>
        <p className="mb-10 max-w-xl text-lg text-[var(--muted)]">
          Pair this tablet with a waiter device token to pick up ready tickets,
          clear table calls, and complete service.
        </p>
        <Suspense fallback={<p className="text-[var(--muted)]">Loading…</p>}>
          <PairingForm />
        </Suspense>
      </section>
    </main>
  );
}
