"use client";

import * as React from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { PortfolioBackdrop } from "@/components/portfolio/portfolio-backdrop";
import { PortfolioHeroVisual } from "@/components/portfolio/portfolio-hero-visual";
import {
  CAREER_ROLES,
  FEATURED_PROJECTS,
  JOURNEY_MILESTONES,
  NAV_SECTIONS,
  PLATFORM_PRODUCTS,
  PORTFOLIO_CONTACT,
  PORTFOLIO_HERO,
  PORTFOLIO_STATS,
  SELECTED_ACHIEVEMENTS,
  SKILL_CATEGORIES,
  WORKED_WITH,
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
          {PORTFOLIO_HERO.displayName}
        </button>

        <nav className="hidden items-center gap-7 lg:flex">
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/8 bg-[#0b1120]/95 px-4 py-4 lg:hidden">
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

      {/* Hero — balanced two-column */}
      <section
        id="hero"
        className="relative z-10 flex min-h-screen flex-col justify-center px-4 pb-16 pt-28 sm:px-6"
      >
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <motion.div
            className="order-2 lg:order-1"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-medium text-teal-400/90">Hello,</p>
            <h1 className="portfolio-display mt-2 text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              I&apos;m {PORTFOLIO_HERO.displayName}.
            </h1>
            <p className="mt-4 text-base font-medium text-slate-300 sm:text-lg">
              {PORTFOLIO_HERO.roles.join(" · ")}
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-[1.05rem]">
              {PORTFOLIO_HERO.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
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

            {/* Credibility — Worked with */}
            <div className="mt-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Worked with
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                {WORKED_WITH.map((org) => (
                  <span
                    key={org.name}
                    title={org.name}
                    className="portfolio-logo-mark text-sm font-semibold tracking-wide text-slate-500 transition-colors hover:text-slate-300 sm:text-base"
                  >
                    {org.short}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="order-1 mx-auto w-full max-w-[320px] sm:max-w-[380px] lg:order-2 lg:mx-0 lg:max-w-none"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.12 }}
          >
            <PortfolioHeroVisual />
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="mx-auto mt-16 grid w-full max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-4"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
        >
          {PORTFOLIO_STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#0b1120]/90 px-4 py-5 text-center sm:px-5 sm:py-6"
            >
              <p className="portfolio-display text-3xl font-semibold text-white sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">
                {stat.label}
              </p>
              {"detail" in stat && stat.detail ? (
                <p className="mt-2 text-[11px] leading-snug text-slate-600">
                  {stat.detail}
                </p>
              ) : null}
            </div>
          ))}
        </motion.div>
      </section>

      {/* Selected Achievements */}
      <section className="relative z-10 px-4 py-20 sm:px-6 sm:py-24">
        <motion.div
          className="mx-auto max-w-6xl"
          variants={fadeUp}
          {...motionProps}
        >
          <SectionHeading
            eyebrow="Selected Achievements"
            title="What recruiters remember"
            description="High-signal outcomes from a career spanning telecom, space, energy, and modern SaaS."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SELECTED_ACHIEVEMENTS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="portfolio-glass rounded-2xl p-5 sm:p-6"
                  variants={fadeUp}
                  initial={reduceMotion ? false : "hidden"}
                  whileInView={reduceMotion ? undefined : "visible"}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                >
                  <Icon className="h-5 w-5 text-teal-400" />
                  <h3 className="mt-4 text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {item.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="relative z-10 px-4 py-20 sm:px-6 sm:py-24">
        <motion.div
          className="mx-auto max-w-6xl"
          variants={fadeUp}
          {...motionProps}
        >
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-400/90">
                About
              </p>
              <h2 className="portfolio-display mt-3 text-3xl font-semibold text-white sm:text-4xl">
                Engineering you can trust in production
              </h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-slate-400 sm:text-lg">
              <p>
                Software engineering isn&apos;t just writing code—it&apos;s
                understanding business problems, designing scalable solutions,
                and delivering software people can trust.
              </p>
              <p>
                What makes my background unique is the combination of hands-on
                software engineering and quality engineering leadership. I
                don&apos;t simply build applications—I build software that is
                reliable, maintainable, and production-ready.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Journey strip */}
      <section className="relative z-10 px-4 py-12 sm:px-6">
        <motion.div
          className="mx-auto max-w-6xl overflow-x-auto"
          variants={fadeUp}
          {...motionProps}
        >
          <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Career Journey
          </p>
          <div className="flex min-w-[640px] items-stretch justify-between gap-2">
            {JOURNEY_MILESTONES.map((step, index) => (
              <React.Fragment key={step.year}>
                <div className="flex flex-1 flex-col items-center text-center">
                  <span className="text-sm font-semibold text-teal-300">
                    {step.year}
                  </span>
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.6)]" />
                  <p className="mt-3 max-w-[7.5rem] text-xs leading-snug text-slate-400">
                    {step.label}
                  </p>
                </div>
                {index < JOURNEY_MILESTONES.length - 1 ? (
                  <div
                    className="mt-[1.65rem] h-px flex-1 bg-gradient-to-r from-teal-400/50 to-slate-700"
                    aria-hidden
                  />
                ) : null}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        className="relative z-10 px-4 py-20 sm:px-6 sm:py-24"
      >
        <motion.div
          className="mx-auto max-w-6xl"
          variants={fadeUp}
          {...motionProps}
        >
          <SectionHeading
            eyebrow="Experience"
            title="25+ years of mission-critical delivery"
            description="From carrier-grade telecom and ESA satellite systems to enterprise energy platforms and SaaS products."
          />

          <div className="relative mt-14 space-y-6">
            <div
              className="absolute bottom-0 left-[1.35rem] top-0 w-px bg-linear-to-b from-teal-400/60 via-slate-700/80 to-transparent"
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
                    delay: reduceMotion ? 0 : index * 0.05,
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
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p
                        className="text-xs font-semibold uppercase tracking-[0.18em]"
                        style={{ color: role.accent }}
                      >
                        {role.period}
                      </p>
                      <p className="text-sm text-slate-500">{role.location}</p>
                    </div>
                    <h3 className="portfolio-display mt-2 text-2xl font-semibold text-white">
                      {role.company}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-teal-300/90">
                      {role.title}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
                      {role.summary}
                    </p>
                    <ul className="mt-5 space-y-2">
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
                      <p className="mt-5 border-t border-white/8 pt-4 text-xs leading-relaxed text-slate-500">
                        {role.technologies.join(" · ")}
                      </p>
                    ) : null}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Platforms */}
      <section
        id="platforms"
        className="relative z-10 px-4 py-20 sm:px-6 sm:py-24"
      >
        <motion.div
          className="mx-auto max-w-6xl"
          variants={fadeUp}
          {...motionProps}
        >
          <SectionHeading
            eyebrow="Platforms"
            title="Software platforms built and shipping"
            description="Enterprise SaaS products I've designed and developed—live today, with the next verticals on the roadmap."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {PLATFORM_PRODUCTS.filter((p) => p.status === "live").map(
              (product, index) => {
                const Icon = product.icon;
                return (
                  <motion.article
                    key={product.id}
                    className="portfolio-glass portfolio-card-lift flex flex-col rounded-3xl p-6 sm:p-8"
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
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {product.tagline}
                    </p>
                    <h3 className="portfolio-display mt-2 text-2xl font-semibold text-white">
                      {product.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      {product.description}
                    </p>
                    <p className="mt-4 text-sm font-medium text-teal-200/80">
                      Result — {product.result}
                    </p>
                    <p className="mt-5 text-xs leading-relaxed text-slate-500">
                      Tech · {product.tech.join(" · ")}
                    </p>
                    {PLATFORM_LINKS[product.id] ? (
                      <a
                        href={PLATFORM_LINKS[product.id]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-teal-300/90 transition-colors hover:text-teal-200"
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

          <div className="mt-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Coming Soon
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PLATFORM_PRODUCTS.filter((p) => p.status === "coming").map(
                (product) => {
                  const Icon = product.icon;
                  return (
                    <article
                      key={product.id}
                      className="portfolio-glass rounded-2xl p-5"
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
                    </article>
                  );
                },
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Skills — premium columns, not badge walls */}
      <section id="skills" className="relative z-10 px-4 py-20 sm:px-6 sm:py-24">
        <motion.div
          className="mx-auto max-w-6xl"
          variants={fadeUp}
          {...motionProps}
        >
          <SectionHeading
            eyebrow="Skills"
            title="Focused depth, not a badge wall"
            description="Curated capabilities across engineering, quality, and architecture."
          />

          <div className="mt-14 grid gap-0 overflow-hidden rounded-3xl border border-white/8 md:grid-cols-3">
            {SKILL_CATEGORIES.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.title}
                  className={`bg-[#0b1120]/70 p-7 sm:p-8 ${
                    index > 0 ? "border-t border-white/8 md:border-l md:border-t-0" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-teal-400" />
                    <h3 className="text-lg font-semibold text-white">
                      {category.title}
                    </h3>
                  </div>
                  <ul className="mt-6 space-y-2.5">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-slate-400"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="relative z-10 px-4 py-20 sm:px-6 sm:py-24"
      >
        <motion.div
          className="mx-auto max-w-6xl"
          variants={fadeUp}
          {...motionProps}
        >
          <SectionHeading
            eyebrow="Selected Projects"
            title="Impact at enterprise and mission scale"
            description="Programs where engineering depth and quality leadership met real operational stakes."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {FEATURED_PROJECTS.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.article
                  key={project.id}
                  className="portfolio-glass portfolio-card-lift flex flex-col rounded-3xl p-6 sm:p-7"
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
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {project.tagline}
                  </p>
                  {project.company ? (
                    <p className="mt-2 text-sm text-slate-500">{project.company}</p>
                  ) : null}
                  <h3 className="portfolio-display mt-1 text-xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-teal-300/90">Role · {project.role}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-400">
                    {project.description}
                  </p>
                  <p className="mt-4 text-sm font-medium text-slate-300">
                    Result — {project.result}
                  </p>
                  <p className="mt-5 border-t border-white/8 pt-4 text-xs leading-relaxed text-slate-500">
                    {project.technologies.join(" · ")}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative z-10 px-4 pb-24 pt-8 sm:px-6 sm:pb-28"
      >
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
            © {new Date().getFullYear()} {PORTFOLIO_HERO.displayName} · Portfolio
          </p>
        </motion.div>
      </section>
    </div>
  );
}
