import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getTenantSlugFromHost,
  isApexOrWwwHost,
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
  const host = request.headers.get("host");
  const { pathname } = request.nextUrl;

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
    return NextResponse.next();
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
