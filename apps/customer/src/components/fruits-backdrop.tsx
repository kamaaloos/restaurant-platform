import Image from "next/image";

/** Soft fruit photo wash — matches admin login / menu atmosphere. */
export function FruitsBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0">
        <Image
          src="/images/login-fruits-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-[var(--paper)]/55 backdrop-blur-[1.5px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--paper)]/40 via-transparent to-[var(--paper)]/55" />
    </div>
  );
}
