import { Suspense } from "react";
import { PairingForm } from "@/components/pairing-form";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(23,32,39,0.04)_25%,transparent_25%),linear-gradient(225deg,rgba(23,32,39,0.04)_25%,transparent_25%),linear-gradient(45deg,rgba(23,32,39,0.04)_25%,transparent_25%),linear-gradient(315deg,rgba(23,32,39,0.04)_25%,transparent_25%)] bg-[length:24px_24px] bg-[position:0_0,0_12px,12px_-12px,-12px_0]"
      />

      <section className="relative mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--heat)]">
          Station display
        </p>
        <h1 className="mb-4 font-[family-name:var(--font-display)] text-7xl leading-none tracking-wide text-[var(--ink)] md:text-8xl">
          Kitchen Display
        </h1>
        <p className="mb-10 max-w-xl text-lg text-[var(--muted)]">
          Pair this screen with a kitchen device token to show live tickets and
          advance orders from the line.
        </p>
        <Suspense fallback={<p className="text-[var(--muted)]">Loading…</p>}>
          <PairingForm />
        </Suspense>
      </section>
    </main>
  );
}
