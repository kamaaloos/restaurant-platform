import { LegalPageShell } from "@/components/legal-page-shell";

export default function AboutPage() {
  return (
    <LegalPageShell
      eyebrow="Company"
      title="About MayleSoft"
      intro="MayleSoft builds modern cloud software for operators who need reliable systems, clean workflows, and practical tools that help real teams move faster."
    >
      <section>
        <h2 className="text-xl font-semibold text-[#1c1917]">What we do</h2>
        <p className="mt-2">
          We design and deliver business software for restaurants, schools, and
          growing service organizations. Our products focus on everyday
          operations: orders, payments, classrooms, reporting, and team
          coordination.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[#1c1917]">Our approach</h2>
        <p className="mt-2">
          We believe software should feel calm, fast, and dependable. That
          means clear interfaces, mobile-friendly workflows, cloud access, and
          systems that work well under real-world pressure.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[#1c1917]">Who we serve</h2>
        <p className="mt-2">
          MayleSoft is built for founders, managers, administrators, and teams
          who want professional software without unnecessary complexity. We aim
          to support organizations that are growing and want better digital
          operations.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[#1c1917]">Contact</h2>
        <p className="mt-2">
          For partnerships, product inquiries, or support, contact{" "}
          <a className="font-medium text-[#c45c26]" href="mailto:contact@maylesoft.com">
            contact@maylesoft.com
          </a>
          .
        </p>
      </section>
    </LegalPageShell>
  );
}
