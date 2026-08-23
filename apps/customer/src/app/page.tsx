import { headers } from "next/headers";
import { LandingMarketing } from "@/components/landing-marketing";
import { MayleSoftHub } from "@/components/maylesoft-hub";
import { PortfolioPage } from "@/components/portfolio/portfolio-page";
import { RetailLanding } from "@/components/retail-landing";
import {
  isApexOrWwwHost,
  isPortfolioHost,
  isRestaurantMarketingHost,
  isRetailMarketingHost,
} from "@/lib/tenant-host";

export default async function HomePage() {
  const headerList = await headers();
  const host = headerList.get("host");
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
  const marketingHost = process.env.NEXT_PUBLIC_MARKETING_HOST;
  const portfolioHost = process.env.NEXT_PUBLIC_PORTFOLIO_HOST;
  const retailHost = process.env.NEXT_PUBLIC_RETAIL_HOST;

  if (isPortfolioHost(host, rootDomain, portfolioHost)) {
    return <PortfolioPage />;
  }

  if (isRetailMarketingHost(host, rootDomain, retailHost)) {
    return <RetailLanding />;
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
