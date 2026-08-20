import type { Metadata } from "next";
import { PortfolioPage } from "@/components/portfolio/portfolio-page";
import { PORTFOLIO_HERO } from "@/components/portfolio/portfolio-data";

export const metadata: Metadata = {
  title: `${PORTFOLIO_HERO.displayName} — Senior Software Engineer & Quality Leader`,
  description:
    "25+ years engineering mission-critical software for telecommunications, aerospace, energy, and enterprise systems. Full-stack development, test management, and quality engineering leadership.",
  openGraph: {
    title: `${PORTFOLIO_HERO.displayName} — Portfolio`,
    description: PORTFOLIO_HERO.headline,
    type: "profile",
  },
};

export default function Page() {
  return <PortfolioPage />;
}
