import { LegalPageShell } from "@/components/legal-page-shell";

export default function PrivacyPage() {
  return (
    <LegalPageShell
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="This page explains, at a high level, how MayleSoft handles information across its websites and cloud platforms."
    >
      <section>
        <h2 className="text-xl font-semibold text-[#1c1917]">Information we collect</h2>
        <p className="mt-2">
          We may collect business account details, contact information, support
          messages, usage data, and technical information needed to run and
          secure our services.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[#1c1917]">How we use information</h2>
        <p className="mt-2">
          We use information to provide our products, improve performance,
          support customers, maintain security, and communicate about service
          updates.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[#1c1917]">Data protection</h2>
        <p className="mt-2">
          We take reasonable technical and operational measures to protect data
          from unauthorized access, misuse, or loss. Access is limited to the
          people and systems required to operate the service.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[#1c1917]">Contact about privacy</h2>
        <p className="mt-2">
          For privacy-related questions, requests, or concerns, email{" "}
          <a className="font-medium text-[#c45c26]" href="mailto:contact@maylesoft.com">
            contact@maylesoft.com
          </a>
          .
        </p>
      </section>
    </LegalPageShell>
  );
}
