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
  Users,
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
  name: "Eng. Hassan Kamal",
  headline: "Building Reliable Software. Delivering Quality at Scale.",
  roles:
    "Senior Software Engineer • Full-Stack Developer • Test Manager • Quality Engineering Leader",
  intro:
    "For more than 25 years, I've helped organizations design, build, test, and deliver mission-critical software—from telecommunications infrastructure and enterprise systems to European space technology and modern web applications.",
  subIntro:
    "My experience spans the complete Software Development Life Cycle (SDLC), combining software engineering expertise with quality leadership to create scalable, reliable, and high-performing digital solutions.",
  quote:
    "Quality isn't the final step—it's engineered into every stage of development.",
} as const;

export const PORTFOLIO_STATS = [
  { value: "25+", label: "Years Experience" },
  { value: "5", label: "Industries Served" },
  { value: "Enterprise", label: "Scale Delivery" },
  { value: "Full SDLC", label: "End-to-End Ownership" },
] as const;

export type CareerRole = {
  id: string;
  company: string;
  location: string;
  title: string;
  period: string;
  icon: LucideIcon;
  accent: string;
  summary: string;
  highlights: string[];
  technologies?: string[];
};

export const CAREER_ROLES: CareerRole[] = [
  {
    id: "consultant",
    company: "Freelance Consultant",
    location: "Remote · Europe",
    title: "Full-Stack Application Developer & QA Consultant",
    period: "Jan 2011 – Jun 2022",
    icon: Rocket,
    accent: "#2dd4bf",
    summary:
      "Partnered with businesses to transform ideas into production-ready applications—from architecture and development to testing, deployment, and long-term support.",
    highlights: [
      "Delivered end-to-end software development from requirements to production support",
      "Built modern web and enterprise applications with scalable front-end and back-end architectures",
      "Automated testing and continuous quality assurance across the SDLC",
      "Performed unit, integration, functional, performance, and UAT",
      "Translated business requirements into secure, maintainable technical solutions",
      "Provided technical consulting and troubleshooting across multiple industries",
    ],
    technologies: [
      "Java",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "NestJS",
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
    period: "Dec 2007 – Nov 2010",
    icon: Building2,
    accent: "#38bdf8",
    summary:
      "Led quality assurance for enterprise-scale systems at one of Europe's largest energy companies—coordinating cross-functional teams, integration strategies, and executive reporting.",
    highlights: [
      "Led testing for enterprise-scale projects aligned with business objectives",
      "Defined test strategies for integration, E2E, system, regression, and UAT",
      "Managed risks, defect reporting, testing metrics, and executive status reporting",
      "Designed high-level solution architectures and cross-domain integration strategies",
      "Presented solution designs, demos, and proof-of-concept implementations",
    ],
  },
  {
    id: "tieto",
    company: "TietoEnator",
    location: "Espoo, Finland",
    title: "Test Manager",
    period: "Aug 2006 – Nov 2007",
    icon: Layers,
    accent: "#818cf8",
    summary:
      "Developed enterprise test and integration strategies for large multi-team Nordic implementations—improving delivery efficiency through better methodologies and open-source adoption.",
    highlights: [
      "Developed enterprise Test and Integration Strategies for multi-team projects",
      "Directed end-to-end testing, integration planning, and release readiness",
      "Designed high-level technical solutions aligned with business requirements",
      "Evaluated and introduced open-source technologies to reduce costs",
      "Delivered executive reporting on quality metrics and risk management",
    ],
  },
  {
    id: "ssf",
    company: "Space Systems Finland",
    location: "Espoo, Finland",
    title: "Test Manager",
    period: "Jan 2004 – Jul 2006",
    icon: Satellite,
    accent: "#a78bfa",
    summary:
      "Managed mission-critical testing for the European Space Agency's GOCE satellite mission—validating software and hardware systems designed to operate hundreds of kilometers above Earth.",
    highlights: [
      "Managed software integration and I/O vector testing for ESA's GOCE mission",
      "Planned, executed, and reported mission-critical testing activities",
      "Developed testing processes, documentation standards, and automation tools",
      "Built and maintained integration and system test environments",
      "Mentored test engineers and supported Oracle database validation with TOAD",
      "Assisted business users with UAT and delivered end-user training",
    ],
  },
  {
    id: "nokia",
    company: "Nokia Networks",
    location: "Helsinki, Finland",
    title: "Senior Systems Engineer / QA Engineer",
    period: "1997 – Dec 2003",
    icon: Radio,
    accent: "#34d399",
    summary:
      "Built the engineering foundation of my career during the rapid expansion of global telecommunications—integrating and testing carrier-grade networking systems for exceptional reliability.",
    highlights: [
      "Participated in development, integration, and testing of telecom software systems",
      "Executed functional, system, integration, and regression testing across platforms",
      "Collaborated with developers and architects to resolve complex technical issues",
      "Contributed to releases by identifying defects, validating fixes, and ensuring readiness",
      "Supported continuous improvement initiatives for QA processes and methodologies",
    ],
  },
];

export type SkillCategory = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    icon: Code2,
    items: [
      "Java",
      "JavaScript",
      "TypeScript",
      "C / C++",
      "C#",
      "Python",
      "Ada",
      "PHP",
      "SQL",
      "XML",
    ],
  },
  {
    title: "Development",
    icon: Layers,
    items: [
      "React",
      "Next.js",
      "NestJS",
      "React Native",
      "Expo",
      "Spring",
      "REST APIs",
      "MySQL",
      "Oracle",
      "Apache",
      "Tomcat",
      "Git",
    ],
  },
  {
    title: "Quality Engineering",
    icon: FlaskConical,
    items: [
      "Test Management",
      "Test Automation",
      "Selenium",
      "JUnit",
      "Jest",
      "Playwright",
      "Integration Testing",
      "Performance Testing",
      "Load Testing",
      "UAT",
      "Regression Testing",
      "CI/CD",
    ],
  },
  {
    title: "Leadership",
    icon: Users,
    items: [
      "Technical Leadership",
      "Project Delivery",
      "Stakeholder Management",
      "Agile",
      "Scrum",
      "Solution Architecture",
      "Risk Management",
      "Mentoring",
    ],
  },
];

export type PlatformProduct = {
  id: string;
  name: string;
  status: "live" | "coming";
  description: string;
  icon: LucideIcon;
  accent: string;
  href?: string;
  highlights: string[];
};

export const PLATFORM_PRODUCTS: PlatformProduct[] = [
  {
    id: "restaurant",
    name: "MayleSoft Restaurant",
    status: "live",
    description:
      "End-to-end restaurant operations — QR dine-in, kitchen display, waiter, cashier, and walk-in pickup in one platform.",
    icon: UtensilsCrossed,
    accent: "#2dd4bf",
    highlights: [
      "QR table ordering",
      "Kitchen display system",
      "POS / cashier",
      "Waiter & table management",
      "Walk-in pickup",
    ],
  },
  {
    id: "dugsi",
    name: "MayleSoft Dugsi",
    status: "live",
    description:
      "School management for attendance, exams, finance, teachers, and student records.",
    icon: GraduationCap,
    accent: "#38bdf8",
    highlights: [
      "Students & teachers",
      "Attendance",
      "Exams & grades",
      "Finance",
      "Reporting",
    ],
  },
  {
    id: "clinic",
    name: "Clinic / Healthcare",
    status: "coming",
    description: "Practice operations for clinics and outpatient care.",
    icon: Stethoscope,
    accent: "#a78bfa",
    highlights: ["Appointments", "Patient records", "Billing"],
  },
  {
    id: "retail",
    name: "Retail",
    status: "coming",
    description: "Inventory, sales, and store operations for retail businesses.",
    icon: ShoppingCart,
    accent: "#f472b6",
    highlights: ["Inventory", "POS", "Stock control"],
  },
  {
    id: "logistics",
    name: "Logistics",
    status: "coming",
    description: "Fleet, delivery, and warehouse coordination.",
    icon: Truck,
    accent: "#fbbf24",
    highlights: ["Dispatch", "Tracking", "Warehousing"],
  },
  {
    id: "hr",
    name: "HR / Workforce",
    status: "coming",
    description: "People operations for growing organizations.",
    icon: Building2,
    accent: "#94a3b8",
    highlights: ["People ops", "Scheduling", "Payroll-ready"],
  },
];

export type FeaturedProject = {
  id: string;
  title: string;
  subtitle: string;
  company?: string;
  role: string;
  icon: LucideIcon;
  accent: string;
  points: string[];
  technologies?: string[];
};

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "goce",
    title: "European Space Agency GOCE Mission",
    subtitle: "Mission-critical software testing supporting satellite operations.",
    company: "Space Systems Finland",
    role: "Test Manager",
    icon: Satellite,
    accent: "#a78bfa",
    points: [
      "Flight software and integration testing",
      "Mission readiness validation",
      "Test automation and environment management",
      "Oracle database validation",
    ],
  },
  {
    id: "equinor-platform",
    title: "Enterprise Energy Platform",
    subtitle: "Quality leadership for critical business systems at scale.",
    company: "Equinor (Statoil)",
    role: "Test Manager",
    icon: ShieldCheck,
    accent: "#38bdf8",
    points: [
      "Enterprise integration and E2E testing",
      "Cross-domain system integration",
      "Executive reporting and risk management",
      "Solution architecture reviews",
    ],
  },
  {
    id: "enterprise-web",
    title: "Enterprise Web Applications",
    subtitle: "Full-stack delivery from concept to production for private clients.",
    role: "Full-Stack Developer",
    icon: Globe2,
    accent: "#2dd4bf",
    points: [
      "Built secure, scalable enterprise applications",
      "Automated testing and performance optimization",
      "REST API design and database architecture",
      "Long-term consulting and production support",
    ],
    technologies: [
      "Java",
      "TypeScript",
      "React",
      "Next.js",
      "NestJS",
      "PHP",
      "MySQL",
      "REST APIs",
    ],
  },
];

export const WHY_HIRE = [
  "25+ years of industry experience across telecom, aerospace, energy, and enterprise software",
  "Full SDLC expertise—from requirements and architecture to deployment and support",
  "Unique blend of software engineering and quality engineering leadership",
  "Enterprise architecture and integration knowledge at global scale",
  "Mission-critical systems experience including ESA satellite programs",
  "Strong stakeholder communication and executive-level reporting",
  "Proven delivery record with Nokia, Equinor, TietoEnator, and Space Systems Finland",
] as const;

export const EXPERTISE_PILLARS = [
  { icon: Code2, label: "Software Engineering" },
  { icon: FlaskConical, label: "Quality Engineering" },
  { icon: Layers, label: "Solution Architecture" },
  { icon: Zap, label: "Test Automation" },
] as const;

export const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "career", label: "Career" },
  { id: "platforms", label: "Platforms" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;
