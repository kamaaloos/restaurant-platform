"use client";

import * as React from "react";
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { PortfolioBackdrop } from "@/components/portfolio/portfolio-backdrop";
import {
  CAREER_ROLES,
  EXPERTISE_PILLARS,
  FEATURED_PROJECTS,
  NAV_SECTIONS,
  PLATFORM_PRODUCTS,
  PORTFOLIO_CONTACT,
  PORTFOLIO_HERO,
  PORTFOLIO_STATS,
  SKILL_CATEGORIES,
  WHY_HIRE,
} from "@/components/portfolio/portfolio-data";

const ROOT_DOMAIN =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN?.trim() || "maylesoft.com";
const MAYLESOFT_HREF = `https://${ROOT_DOMAIN}`;
const PLATFORM_LINKS: Record<string, string> = {
  restaurant: `https://customer.${ROOT_DOMAIN}`,
  dugsi: `https://dugsi.${ROOT_DOMAIN}`,
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-400/90">
        {eyebrow}
      </p>
      <h2 className="portfolio-display mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function PortfolioNav() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/8 bg-[#0b1120]/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={() => scrollTo("hero")}
          className="portfolio-display text-lg font-semibold text-white sm:text-xl"
        >
          {PORTFOLIO_HERO.name.split(" ").slice(-2).join(" ")}
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_SECTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              {item.label}
            </button>
          ))}
          <a
            href={MAYLESOFT_HREF}
            className="text-sm text-slate-500 transition-colors hover:text-white"
          >
            MayleSoft
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/8 bg-[#0b1120]/95 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV_SECTIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className="rounded-lg px-3 py-2 text-left text-sm text-slate-300 hover:bg-white/5"
              >
                {item.label}
              </button>
            ))}
            <a
              href={MAYLESOFT_HREF}
              className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-white/5"
            >
              Back to MayleSoft
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function PortfolioPage() {
  const reduceMotion = useReducedMotion();
  const motionProps = reduceMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
      };

  const emailHref = `mailto:${PORTFOLIO_CONTACT.email}?subject=Portfolio%20inquiry`;

  return (
    <div className="portfolio-theme relative min-h-screen overflow-x-hidden text-slate-200">
      <PortfolioBackdrop />
      <PortfolioNav />

      {/* Hero */}
      <section
        id="hero"
        className="relative z-10 flex min-h-screen flex-col justify-center px-4 pb-20 pt-28 sm:px-6"
      >
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-medium text-teal-400/90">
              Hi, I&apos;m {PORTFOLIO_HERO.name}
            </p>
            <h1 className="portfolio-display mt-4 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {PORTFOLIO_HERO.headline}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-400 sm:text-lg">
              {PORTFOLIO_HERO.roles}
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-300/90 sm:text-lg">
              {PORTFOLIO_HERO.intro}
            </p>
            <blockquote className="portfolio-quote mt-8 max-w-2xl border-l-2 border-teal-400/60 pl-5 text-base italic text-slate-300 sm:text-lg">
              &ldquo;{PORTFOLIO_HERO.quote}&rdquo;
            </blockquote>

            <div className="mt-10 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("platforms")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="portfolio-btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              >
                View My Work
                <ArrowDown className="h-4 w-4" />
              </button>
              {PORTFOLIO_CONTACT.cvUrl ? (
                <a
                  href={PORTFOLIO_CONTACT.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-btn-secondary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                >
                  Download CV
                  <Download className="h-4 w-4" />
                </a>
              ) : (
                <a
                  href={emailHref}
                  className="portfolio-btn-secondary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                >
                  Get in Touch
                  <Mail className="h-4 w-4" />
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {PORTFOLIO_STATS.map((stat) => (
              <div key={stat.label} className="portfolio-stat-card rounded-2xl p-4 sm:p-5">
                <p className="portfolio-display text-2xl font-semibold text-white sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-2">
            {EXPERTISE_PILLARS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 sm:text-sm"
              >
                <Icon className="h-3.5 w-3.5 text-teal-400" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative z-10 px-4 py-24 sm:px-6 sm:py-28">
        <motion.div
          className="mx-auto max-w-6xl"
          variants={fadeUp}
          {...motionProps}
        >
          <SectionHeading
            eyebrow="About Me"
            title="Engineering quality into every stage"
            description="Software engineering isn't just writing code—it's understanding business problems, designing scalable solutions, and delivering software people can trust."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="portfolio-glass rounded-3xl p-6 sm:p-8">
              <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
                Throughout my career, I&apos;ve worked across every stage of the
                Software Development Life Cycle—from requirements gathering and
                system architecture to development, testing, deployment, and
                production support.
              </p>
              <p className="mt-5 text-base leading-relaxed text-slate-400">
                What makes my background unique is the combination of software
                engineering and quality engineering. I don&apos;t simply build
                applications—I build software that is reliable, maintainable, and
                production-ready.
              </p>
            </div>
            <div className="portfolio-glass rounded-3xl p-6 sm:p-8">
              <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
                My experience spans telecommunications, aerospace, enterprise
                software, and modern web development—giving me a broad
                perspective on solving complex technical challenges.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Nokia Networks — carrier-grade telecom systems",
                  "Space Systems Finland — ESA GOCE satellite mission",
                  "TietoEnator & Equinor — enterprise integration at scale",
                  "Independent consulting — full-stack delivery 2011–2022",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate-400 sm:text-base"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Career timeline */}
      <section id="career" className="relative z-10 px-4 py-24 sm:px-6 sm:py-28">
        <motion.div
          className="mx-auto max-w-6xl"
          variants={fadeUp}
          {...motionProps}
        >
          <SectionHeading
            eyebrow="Career Journey"
            title="25+ years of mission-critical delivery"
            description="From telecommunications and aerospace to energy and enterprise consulting—a progression from QA engineer to test manager, architect, and full-stack developer."
          />

          <div className="relative mt-16 space-y-8">
            <div
              className="absolute bottom-0 left-[1.35rem] top-0 w-px bg-gradient-to-b from-teal-400/60 via-slate-700/80 to-transparent"
              aria-hidden
            />

            {CAREER_ROLES.map((role, index) => {
              const Icon = role.icon;

              return (
                <motion.article
                  key={role.id}
                  className="relative pl-14 sm:pl-16"
                  variants={fadeUp}
                  initial={reduceMotion ? false : "hidden"}
                  whileInView={reduceMotion ? undefined : "visible"}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: reduceMotion ? 0 : index * 0.06,
                  }}
                >
                  <span
                    className="absolute left-3 top-7 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0b1120] sm:left-4"
                    style={{ backgroundColor: role.accent }}
                    aria-hidden
                  >
                    <Icon className="h-3.5 w-3.5 text-[#0b1120]" />
                  </span>

                  <div className="portfolio-glass portfolio-card-lift rounded-3xl p-6 sm:p-8">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p
                              className="text-xs font-semibold uppercase tracking-[0.18em]"
                              style={{ color: role.accent }}
                            >
                              {role.period}
                            </p>
                            <h3 className="portfolio-display mt-2 text-2xl font-semibold text-white">
                              {role.company}
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                              {role.location}
                            </p>
                          </div>
                        </div>
                        <p className="mt-3 text-sm font-medium text-teal-300/90">
                          {role.title}
                        </p>
                        <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
                          {role.summary}
                        </p>
                        <ul className="mt-5 space-y-2.5">
                          {role.highlights.map((point) => (
                            <li
                              key={point}
                              className="flex items-start gap-2.5 text-sm text-slate-400"
                            >
                              <span
                                className="mt-2 h-1 w-1 shrink-0 rounded-full"
                                style={{ backgroundColor: role.accent }}
                              />
                              {point}
                            </li>
                          ))}
                        </ul>
                        {role.technologies ? (
                          <div className="mt-6 flex flex-wrap gap-2">
                            {role.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-full border border-white/8 bg-white/5 px-2.5 py-1 text-xs text-slate-400"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        ) : null}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Platforms */}
      <section id="platforms" className="relative z-10 px-4 py-24 sm:px-6 sm:py-28">
        <motion.div
          className="mx-auto max-w-6xl"
          variants={fadeUp}
          {...motionProps}
        >
          <SectionHeading
            eyebrow="MayleSoft Platforms"
            title="Software platforms built and shipping"
            description="Multi-product platforms I've designed and developed—live products today, with the next verticals already on the roadmap."
          />

          <div className="mt-14">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400/90">
              Live
            </p>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              {PLATFORM_PRODUCTS.filter((p) => p.status === "live").map(
                (product, index) => {
                  const Icon = product.icon;
                  return (
                    <motion.article
                      key={product.id}
                      className="portfolio-glass portfolio-card-lift rounded-3xl p-6 sm:p-7"
                      variants={fadeUp}
                      initial={reduceMotion ? false : "hidden"}
                      whileInView={reduceMotion ? undefined : "visible"}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-2xl"
                          style={{ backgroundColor: `${product.accent}22` }}
                        >
                          <Icon
                            className="h-6 w-6"
                            style={{ color: product.accent }}
                          />
                        </div>
                        <span className="rounded-full border border-teal-400/30 bg-teal-400/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-300">
                          Live
                        </span>
                      </div>
                      <h3 className="portfolio-display mt-5 text-2xl font-semibold text-white">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        {product.description}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {product.highlights.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/8 bg-white/5 px-2.5 py-1 text-xs text-slate-400"
                          >
                            {item}
                          </span>
                        ))}
                      </ul>
                      {PLATFORM_LINKS[product.id] ? (
                        <a
                          href={PLATFORM_LINKS[product.id]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-teal-300/90 transition-colors hover:text-teal-200"
                        >
                          Visit platform
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      ) : null}
                    </motion.article>
                  );
                },
              )}
            </div>
          </div>

          <div className="mt-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Coming Soon
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PLATFORM_PRODUCTS.filter((p) => p.status === "coming").map(
                (product, index) => {
                  const Icon = product.icon;
                  return (
                    <motion.article
                      key={product.id}
                      className="portfolio-glass rounded-2xl p-5"
                      variants={fadeUp}
                      initial={reduceMotion ? false : "hidden"}
                      whileInView={reduceMotion ? undefined : "visible"}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: index * 0.06 }}
                    >
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${product.accent}18` }}
                      >
                        <Icon
                          className="h-5 w-5"
                          style={{ color: product.accent }}
                        />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-white">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-500">
                        {product.description}
                      </p>
                    </motion.article>
                  );
                },
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Skills */}
      <section id="skills" className="relative z-10 px-4 py-24 sm:px-6 sm:py-28">
        <motion.div
          className="mx-auto max-w-6xl"
          variants={fadeUp}
          {...motionProps}
        >
          <SectionHeading
            eyebrow="Core Expertise"
            title="Depth across engineering and quality"
            description="Technologies, methodologies, and leadership capabilities shaped by decades of enterprise delivery."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SKILL_CATEGORIES.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  className="portfolio-glass portfolio-card-lift rounded-3xl p-6 sm:p-7"
                  variants={fadeUp}
                  initial={reduceMotion ? false : "hidden"}
                  whileInView={reduceMotion ? undefined : "visible"}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400/10 text-teal-400">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-semibold text-white">
                      {category.title}
                    </h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/8 bg-[#0b1120]/40 px-3 py-1.5 text-xs text-slate-300 sm:text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="portfolio-glass mt-8 rounded-3xl p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Methodologies
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Agile",
                "Scrum",
                "Waterfall",
                "DevOps",
                "SDLC",
                "Release Management",
                "Cross-functional Collaboration",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-teal-400/20 bg-teal-400/5 px-3 py-1.5 text-xs text-teal-200/90 sm:text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative z-10 px-4 py-24 sm:px-6 sm:py-28">
        <motion.div
          className="mx-auto max-w-6xl"
          variants={fadeUp}
          {...motionProps}
        >
          <SectionHeading
            eyebrow="Featured Work"
            title="Impact at enterprise and mission scale"
            description="Selected programs where quality engineering and software delivery came together."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {FEATURED_PROJECTS.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.article
                  key={project.id}
                  className="portfolio-glass portfolio-card-lift group flex flex-col rounded-3xl p-6 sm:p-7"
                  variants={fadeUp}
                  initial={reduceMotion ? false : "hidden"}
                  whileInView={reduceMotion ? undefined : "visible"}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: `${project.accent}22` }}
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{ color: project.accent }}
                    />
                  </div>
                  {project.company ? (
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {project.company}
                    </p>
                  ) : null}
                  <h3 className="portfolio-display mt-2 text-xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {project.subtitle}
                  </p>
                  <p className="mt-4 text-sm font-medium text-teal-300/90">
                    Role: {project.role}
                  </p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {project.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-slate-400"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-400/80" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  {project.technologies ? (
                    <div className="mt-5 flex flex-wrap gap-2 border-t border-white/8 pt-5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs text-slate-500"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Why hire */}
      <section className="relative z-10 px-4 py-24 sm:px-6 sm:py-28">
        <motion.div
          className="mx-auto max-w-6xl"
          variants={fadeUp}
          {...motionProps}
        >
          <div className="portfolio-glass overflow-hidden rounded-3xl p-6 sm:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-400/90">
                  Why Clients Hire Me
                </p>
                <h2 className="portfolio-display mt-3 text-3xl font-semibold text-white sm:text-4xl">
                  Senior delivery with a quality-first mindset
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-400">
                  A rare combination of hands-on engineering, test leadership,
                  and enterprise architecture—built over 25+ years across Europe
                  and North America-aligned delivery practices.
                </p>
              </div>
              <ul className="space-y-3">
                {WHY_HIRE.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3 text-sm text-slate-300 sm:text-base"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative z-10 px-4 pb-24 pt-8 sm:px-6 sm:pb-28">
        <motion.div
          className="mx-auto max-w-6xl text-center"
          variants={fadeUp}
          {...motionProps}
        >
          <SectionHeading
            eyebrow="Contact"
            title="Let's build reliable software together"
            description="Open to senior engineering, quality leadership, architecture, and consulting conversations."
          />

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href={emailHref}
              className="portfolio-btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            >
              <Mail className="h-4 w-4" />
              {PORTFOLIO_CONTACT.email}
            </a>
            {PORTFOLIO_CONTACT.linkedin ? (
              <a
                href={PORTFOLIO_CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-btn-secondary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
              </a>
            ) : null}
            {PORTFOLIO_CONTACT.github ? (
              <a
                href={PORTFOLIO_CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-btn-secondary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              >
                <Github className="h-4 w-4" />
                GitHub
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
              </a>
            ) : null}
            {PORTFOLIO_CONTACT.cvUrl ? (
              <a
                href={PORTFOLIO_CONTACT.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-btn-secondary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            ) : null}
          </div>

          <p className="mt-16 text-xs text-slate-600">
            © {new Date().getFullYear()} {PORTFOLIO_HERO.name} · Portfolio
          </p>
        </motion.div>
      </section>
    </div>
  );
}
