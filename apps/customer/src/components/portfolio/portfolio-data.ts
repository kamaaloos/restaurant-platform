import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Code2,
  FlaskConical,
  Globe2,
  GraduationCap,
  Layers,
  Radio,
  Rocket,
  Satellite,
  ShieldCheck,
  ShoppingCart,
  Stethoscope,
  Truck,
  UtensilsCrossed,
  Zap,
} from "lucide-react";

/** Edit these links when you have live profiles or a CV PDF. */
export const PORTFOLIO_CONTACT = {
  email: "contact@maylesoft.com",
  linkedin: "",
  github: "",
  cvUrl: "",
} as const;

export const PORTFOLIO_HERO = {
  displayName: "Hasan Kamal",
  photoSrc: "/images/portfolio/hasan-kamal.png",
  photoAlt: "Portrait of Hasan Kamal",
  headline: "Building Reliable Software. Delivering Quality at Scale.",
  roles: [
    "Senior Software Engineer",
    "Full-Stack Developer",
    "Test Manager",
    "Quality Engineering Leader",
  ],
  intro:
    "For more than 25 years, I've helped organizations design, build, test, and deliver mission-critical software—from telecommunications infrastructure and enterprise systems to European space technology and modern SaaS platforms.",
} as const;

export const PORTFOLIO_STATS = [
  { value: "25+", label: "Years" },
  { value: "5", label: "Countries" },
  { value: "100+", label: "Projects" },
  { value: "4", label: "Domains", detail: "Telecom · Energy · Space · Enterprise" },
] as const;

/** Employer credibility strip — show immediately on the homepage. */
export const WORKED_WITH = [
  { name: "Nokia", short: "Nokia" },
  { name: "European Space Agency", short: "ESA" },
  { name: "Equinor", short: "Equinor" },
  { name: "TietoEnator", short: "TietoEnator" },
  { name: "Space Systems Finland", short: "SSF" },
] as const;

export const SELECTED_ACHIEVEMENTS = [
  {
    icon: Zap,
    title: "25+ years in software engineering",
    detail: "End-to-end delivery across telecom, aerospace, energy, and SaaS.",
  },
  {
    icon: Satellite,
    title: "ESA GOCE satellite mission",
    detail: "Mission-critical software validation for Earth observation systems.",
  },
  {
    icon: Radio,
    title: "Carrier-grade telecom software",
    detail: "Integration and QA for global mobile network platforms at Nokia.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise QA leadership",
    detail: "Led testing programs for critical systems at Equinor and TietoEnator.",
  },
  {
    icon: Code2,
    title: "Full-stack enterprise applications",
    detail: "Architected and shipped production systems from concept to support.",
  },
  {
    icon: Rocket,
    title: "Mission-critical delivery across Europe",
    detail: "Finland, Norway, and remote consulting for multi-country programs.",
  },
] as const;

export type CareerRole = {
  id: string;
  company: string;
  location: string;
  title: string;
  period: string;
  year: string;
  icon: LucideIcon;
  accent: string;
  summary: string;
  highlights: string[];
  technologies?: string[];
};

/** Chronological journey (newest first for experience detail). */
export const CAREER_ROLES: CareerRole[] = [
  {
    id: "maylesoft",
    company: "MayleSoft",
    location: "Founder · Europe",
    title: "Founder & Principal Engineer",
    period: "2022 – Present",
    year: "2022",
    icon: Rocket,
    accent: "#2dd4bf",
    summary:
      "Building a multi-product SaaS platform for restaurants, schools, and upcoming verticals—owning architecture, full-stack delivery, quality, and product direction.",
    highlights: [
      "Designed and shipped MayleSoft Restaurant (QR ordering, KDS, POS, waiter, pickup)",
      "Launched MayleSoft Dugsi for school operations",
      "Cloud-native stack with Next.js, NestJS, and modern DevOps practices",
      "Roadmap for Clinic, Retail, Logistics, and HR platforms",
    ],
    technologies: [
      "TypeScript",
      "React",
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Docker",
      "CI/CD",
    ],
  },
  {
    id: "consultant",
    company: "Independent Consultant",
    location: "Remote · Europe",
    title: "Full-Stack Developer & QA Consultant",
    period: "2011 – 2022",
    year: "2011",
    icon: Globe2,
    accent: "#38bdf8",
    summary:
      "Partnered with businesses to transform ideas into production-ready applications—from architecture and development to testing, deployment, and long-term support.",
    highlights: [
      "Delivered end-to-end software from requirements to production support",
      "Built scalable front-end and back-end architectures",
      "Automated testing and continuous quality assurance",
      "Integration, performance, and user acceptance testing",
    ],
    technologies: [
      "Java",
      "JavaScript",
      "TypeScript",
      "React",
      "PHP",
      "MySQL",
      "REST APIs",
    ],
  },
  {
    id: "equinor",
    company: "Equinor (Statoil)",
    location: "Stavanger, Norway",
    title: "Test Manager",
    period: "2007 – 2010",
    year: "2007",
    icon: Building2,
    accent: "#818cf8",
    summary:
      "Led quality assurance for enterprise-scale systems at one of Europe's largest energy companies.",
    highlights: [
      "Enterprise test strategy and end-to-end integration testing",
      "Risk, defect metrics, and executive status reporting",
      "Cross-domain solution architecture and integration reviews",
    ],
  },
  {
    id: "tieto",
    company: "TietoEnator",
    location: "Espoo, Finland",
    title: "Test Manager",
    period: "2006 – 2007",
    year: "2006",
    icon: Layers,
    accent: "#a78bfa",
    summary:
      "Enterprise test and integration strategies for large multi-team Nordic implementations.",
    highlights: [
      "Directed integration planning and release readiness",
      "Introduced open-source technologies to reduce delivery cost",
      "Executive reporting on quality metrics and risk",
    ],
  },
  {
    id: "ssf",
    company: "Space Systems Finland",
    location: "Espoo, Finland",
    title: "Test Manager",
    period: "2004 – 2006",
    year: "2004",
    icon: Satellite,
    accent: "#c084fc",
    summary:
      "Mission-critical testing for the European Space Agency's GOCE satellite mission.",
    highlights: [
      "Software integration and I/O vector testing for ESA GOCE",
      "Test automation, environments, and documentation standards",
      "Oracle database validation and UAT support",
    ],
  },
  {
    id: "nokia",
    company: "Nokia Networks",
    location: "Helsinki, Finland",
    title: "Senior Systems Engineer / QA Engineer",
    period: "1997 – 2003",
    year: "1997",
    icon: Radio,
    accent: "#34d399",
    summary:
      "Carrier-grade telecommunications software—integration, testing, and quality for global network operators.",
    highlights: [
      "Functional, system, integration, and regression testing",
      "Defect identification and production readiness",
      "Continuous improvement of QA processes",
    ],
  },
];

/** Compact journey strip (oldest → newest). */
export const JOURNEY_MILESTONES = [
  { year: "1997", label: "Nokia Networks" },
  { year: "2004", label: "Space Systems Finland" },
  { year: "2006", label: "TietoEnator" },
  { year: "2007", label: "Equinor" },
  { year: "2011", label: "Independent Consultant" },
  { year: "2022", label: "Founder · MayleSoft" },
] as const;

export type SkillCategory = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

/** Premium skill columns — curated, not badge walls. */
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Software Engineering",
    icon: Code2,
    items: [
      "Java",
      "C / C++",
      "C#",
      "Python",
      "Ada",
      "TypeScript",
      "PHP",
      "React",
      "Next.js",
      "NestJS",
      "React Native",
      "Spring",
    ],
  },
  {
    title: "Quality Engineering",
    icon: FlaskConical,
    items: [
      "Test Strategy",
      "Automation",
      "Selenium",
      "JUnit",
      "Jest",
      "Playwright",
      "Performance",
      "Integration",
      "UAT",
      "Release Readiness",
    ],
  },
  {
    title: "Architecture",
    icon: Layers,
    items: [
      "REST APIs",
      "Microservices",
      "Cloud-ready",
      "Docker",
      "CI/CD",
      "PostgreSQL",
      "MySQL",
      "Oracle",
      "Solution Design",
      "System Integration",
    ],
  },
];

export type PlatformProduct = {
  id: string;
  name: string;
  tagline: string;
  status: "live" | "coming";
  description: string;
  result: string;
  icon: LucideIcon;
  accent: string;
  tech: string[];
  highlights: string[];
};

export const PLATFORM_PRODUCTS: PlatformProduct[] = [
  {
    id: "restaurant",
    name: "Restaurant Platform",
    tagline: "Enterprise SaaS",
    status: "live",
    description:
      "Designed and developed a cloud-based restaurant management platform supporting POS, kitchen operations, QR dine-in, waiter workflows, reporting, and multi-branch administration.",
    result:
      "Modern architecture built for scalability, security, and operational efficiency across guest, kitchen, and staff apps.",
    icon: UtensilsCrossed,
    accent: "#2dd4bf",
    tech: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "WebSockets",
      "CI/CD",
    ],
    highlights: [
      "QR table ordering",
      "Kitchen display",
      "POS / cashier",
      "Waiter app",
      "Multi-branch admin",
    ],
  },
  {
    id: "dugsi",
    name: "Dugsi School Platform",
    tagline: "Education SaaS",
    status: "live",
    description:
      "Built a school operations platform covering students, teachers, attendance, exams, finance, and reporting—designed for clarity, reliability, and multi-role access.",
    result:
      "Unified operations surface that reduces admin overhead and keeps academic and financial data consistent.",
    icon: GraduationCap,
    accent: "#38bdf8",
    tech: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "REST APIs"],
    highlights: [
      "Students & teachers",
      "Attendance",
      "Exams",
      "Finance",
      "Reporting",
    ],
  },
  {
    id: "clinic",
    name: "Clinic / Healthcare",
    tagline: "Coming soon",
    status: "coming",
    description: "Practice operations for clinics and outpatient care.",
    result: "On the MayleSoft product roadmap.",
    icon: Stethoscope,
    accent: "#a78bfa",
    tech: [],
    highlights: ["Appointments", "Patient records", "Billing"],
  },
  {
    id: "retail",
    name: "Retail",
    tagline: "Coming soon",
    status: "coming",
    description: "Inventory, sales, and store operations for retail businesses.",
    result: "On the MayleSoft product roadmap.",
    icon: ShoppingCart,
    accent: "#f472b6",
    tech: [],
    highlights: ["Inventory", "POS", "Stock control"],
  },
  {
    id: "logistics",
    name: "Logistics",
    tagline: "Coming soon",
    status: "coming",
    description: "Fleet, delivery, and warehouse coordination.",
    result: "On the MayleSoft product roadmap.",
    icon: Truck,
    accent: "#fbbf24",
    tech: [],
    highlights: ["Dispatch", "Tracking", "Warehousing"],
  },
  {
    id: "hr",
    name: "HR / Workforce",
    tagline: "Coming soon",
    status: "coming",
    description: "People operations for growing organizations.",
    result: "On the MayleSoft product roadmap.",
    icon: Building2,
    accent: "#94a3b8",
    tech: [],
    highlights: ["People ops", "Scheduling", "Payroll-ready"],
  },
];

export type FeaturedProject = {
  id: string;
  title: string;
  tagline: string;
  company?: string;
  role: string;
  icon: LucideIcon;
  accent: string;
  description: string;
  result: string;
  technologies: string[];
};

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "goce",
    title: "ESA GOCE Mission",
    tagline: "Aerospace · Mission-critical",
    company: "Space Systems Finland",
    role: "Test Manager",
    icon: Satellite,
    accent: "#a78bfa",
    description:
      "Led software integration and validation activities supporting the European Space Agency's GOCE Earth observation satellite—systems designed to operate hundreds of kilometers above Earth.",
    result:
      "Mission readiness through disciplined integration testing, automation, and environment management.",
    technologies: [
      "Integration Testing",
      "Test Automation",
      "Oracle",
      "System Validation",
    ],
  },
  {
    id: "equinor-platform",
    title: "Enterprise Energy Systems",
    tagline: "Energy · Enterprise QA",
    company: "Equinor (Statoil)",
    role: "Test Manager",
    icon: ShieldCheck,
    accent: "#38bdf8",
    description:
      "Directed enterprise testing for critical business systems at one of Europe's largest energy companies—covering integration strategy, risk management, and executive reporting.",
    result:
      "Reliable release readiness across complex, multi-domain integrations.",
    technologies: [
      "E2E Testing",
      "Integration Strategy",
      "Risk Management",
      "Solution Architecture",
    ],
  },
  {
    id: "nokia-telecom",
    title: "Carrier-Grade Telecom Platforms",
    tagline: "Telecommunications",
    company: "Nokia Networks",
    role: "Senior Systems / QA Engineer",
    icon: Radio,
    accent: "#34d399",
    description:
      "Contributed to development, integration, and quality assurance of carrier-grade networking software used by global mobile operators.",
    result:
      "Production-ready releases for systems that demanded exceptional reliability and performance.",
    technologies: [
      "System Integration",
      "Regression Testing",
      "Release Validation",
      "Telecom Software",
    ],
  },
];

export const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "platforms", label: "Platforms" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;
