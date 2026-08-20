import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getTenantSlugFromHost,
  isApexOrWwwHost,
  isPortfolioHost,
  restaurantMarketingOrigin,
} from "@/lib/tenant-host";

function isGuestOrderingPath(pathname: string) {
  return (
    pathname === "/t" ||
    pathname === "/w" ||
    pathname === "/pickup" ||
    pathname.startsWith("/t/") ||
    pathname.startsWith("/w/") ||
    pathname.startsWith("/pickup/")
  );
}

export function middleware(request: NextRequest) {
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
  const portfolioHost = process.env.NEXT_PUBLIC_PORTFOLIO_HOST;
  const host = request.headers.get("host");
  const { pathname } = request.nextUrl;

  if (isPortfolioHost(host, rootDomain, portfolioHost)) {
    if (pathname === "/portfolio" || pathname.startsWith("/r/")) {
      return NextResponse.redirect(new URL("/", request.url), 308);
    }

    if (pathname === "/" || pathname === "") {
      const url = request.nextUrl.clone();
      url.pathname = "/portfolio";
      const res = NextResponse.rewrite(url);
      res.headers.set("x-pathname", "/");
      return res;
    }

    if (
      !pathname.startsWith("/_next") &&
      !pathname.startsWith("/api") &&
      !pathname.includes(".")
    ) {
      return NextResponse.redirect(new URL("/", request.url), 308);
    }

    const res = NextResponse.next();
    res.headers.set("x-pathname", pathname);
    return res;
  }

  // Apex/www is the product hub. Guest QR routes belong on customer.{root}.
  if (isApexOrWwwHost(host, rootDomain) && isGuestOrderingPath(pathname)) {
    const dest = restaurantMarketingOrigin(
      rootDomain,
      process.env.NEXT_PUBLIC_MARKETING_HOST,
    );
    return NextResponse.redirect(
      new URL(`${pathname}${request.nextUrl.search}`, dest),
      308,
    );
  }

  const slug = getTenantSlugFromHost(host, rootDomain);

  if (!slug) {
    const res = NextResponse.next();
    res.headers.set("x-pathname", pathname);
    return res;
  }

  // Already on tenant route, or static / Next internals
  if (
    pathname.startsWith("/r/") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    const res = NextResponse.next();
    res.headers.set("x-tenant-slug", slug);
    return res;
  }

  if (pathname === "/" || pathname === "") {
    const url = request.nextUrl.clone();
    url.pathname = `/r/${slug}`;
    const res = NextResponse.rewrite(url);
    res.headers.set("x-tenant-slug", slug);
    return res;
  }

  const res = NextResponse.next();
  res.headers.set("x-tenant-slug", slug);
  return res;
}

export const config = {
  matcher: [
    /*
     * Match all paths except Next internals and common static files.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
