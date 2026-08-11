import Image from "next/image";

/** Soft fruit photo wash — same treatment as the admin login page. */
export function FruitsBackdrop({
  animate = false,
}: {
  animate?: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className={
          animate
            ? "login-bg-drift absolute inset-[-8%]"
            : "absolute inset-0"
        }
      >
        <Image
          src="/images/login-fruits-bg.jpg"
          alt=""
          fill
          priority={animate}
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-white/55 backdrop-blur-[1.5px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--paper)]/35 via-transparent to-[var(--paper)]/50" />
    </div>
  );
}
