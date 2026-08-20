import { headers } from "next/headers";
import { isApexOrWwwHost, isPortfolioHost } from "@/lib/tenant-host";

export async function SiteFooter() {
  const headerList = await headers();
  const host = headerList.get("host");
  const pathname = headerList.get("x-pathname") ?? "";
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
  const portfolioHost = process.env.NEXT_PUBLIC_PORTFOLIO_HOST;

  if (isPortfolioHost(host, rootDomain, portfolioHost)) {
    return null;
  }

  if (pathname.startsWith("/portfolio")) {
    return null;
  }

  if (isApexOrWwwHost(host, rootDomain)) {
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
