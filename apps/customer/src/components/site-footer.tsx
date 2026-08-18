import { headers } from "next/headers";
import { isApexOrWwwHost } from "@/lib/tenant-host";

export async function SiteFooter() {
  const host = (await headers()).get("host");
  if (isApexOrWwwHost(host, process.env.NEXT_PUBLIC_ROOT_DOMAIN)) {
    return null;
  }

  return (
    <footer className="relative z-10 border-t border-[var(--line)] bg-[var(--paper)]/75 px-4 py-6 text-center text-xs leading-relaxed text-[var(--muted)] backdrop-blur-sm">
      <p>
        © 2026 MayleSoft Restaurant Platform · Designed by Eng. Hasan Kamaal
      </p>
    </footer>
  );
}
