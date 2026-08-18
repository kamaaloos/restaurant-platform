import { LegalPageShell } from "@/components/legal-page-shell";

export default function TermsPage() {
  return (
    <LegalPageShell
      eyebrow="Terms"
      title="Terms of Service"
      intro="These terms provide a simple overview of how MayleSoft services are offered and used."
    >
      <section>
        <h2 className="text-xl font-semibold text-[#1c1917]">Service access</h2>
        <p className="mt-2">
          Access to MayleSoft platforms may require an active subscription,
          authorized account access, and compliance with account and security
          requirements.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[#1c1917]">Acceptable use</h2>
        <p className="mt-2">
          Customers must use the platform lawfully and responsibly. Abuse,
          unauthorized access attempts, disruption of service, or misuse of
          data is not permitted.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[#1c1917]">Availability and updates</h2>
        <p className="mt-2">
          We aim to keep services available and reliable, but we may update,
          improve, or maintain the platform from time to time. Features may
          evolve as products grow.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[#1c1917]">Contact</h2>
        <p className="mt-2">
          If you need clarification about service terms, please email{" "}
          <a className="font-medium text-[#c45c26]" href="mailto:contact@maylesoft.com">
            contact@maylesoft.com
          </a>
          .
        </p>
      </section>
    </LegalPageShell>
  );
}
