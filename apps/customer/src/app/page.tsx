import { headers } from "next/headers";
import { LandingMarketing } from "@/components/landing-marketing";
import { MayleSoftHub } from "@/components/maylesoft-hub";
import { PortfolioPage } from "@/components/portfolio/portfolio-page";
import {
  isApexOrWwwHost,
  isPortfolioHost,
  isRestaurantMarketingHost,
} from "@/lib/tenant-host";

export default async function HomePage() {
  const headerList = await headers();
  const host = headerList.get("host");
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
  const marketingHost = process.env.NEXT_PUBLIC_MARKETING_HOST;
  const portfolioHost = process.env.NEXT_PUBLIC_PORTFOLIO_HOST;

  if (isPortfolioHost(host, rootDomain, portfolioHost)) {
    return <PortfolioPage />;
  }

  if (isRestaurantMarketingHost(host, rootDomain, marketingHost)) {
    return <LandingMarketing />;
  }

  if (isApexOrWwwHost(host, rootDomain)) {
    return <MayleSoftHub />;
  }

  // Vercel previews and other non-tenant hosts: keep the restaurant landing.
  return <LandingMarketing />;
}
