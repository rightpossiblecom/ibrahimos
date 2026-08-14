import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms",
};

export default function TermsPage() {
  const entity = siteConfig.legalEntity || siteConfig.brandName;

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
        Terms
      </h1>
      <p className="mt-6 leading-relaxed text-ink-muted">
        By using the {siteConfig.brandName} website and product operated by{" "}
        {entity}, you agree to these terms.
      </p>
      <h2 className="mt-10 font-display text-xl font-semibold text-ink">
        The product
      </h2>
      <p className="mt-3 leading-relaxed text-ink-muted">
        {siteConfig.brandName} is a farm operating system for records, weather,
        and crop advice. Assessments are decision-support tools, not a licensed
        agronomy guarantee. You remain responsible for field decisions.
      </p>
      <h2 className="mt-10 font-display text-xl font-semibold text-ink">
        Acceptable use
      </h2>
      <p className="mt-3 leading-relaxed text-ink-muted">
        Do not misuse the site, attempt to disrupt services, or submit false
        contact information intended to harm others.
      </p>
      <h2 className="mt-10 font-display text-xl font-semibold text-ink">
        Contact
      </h2>
      <p className="mt-3 leading-relaxed text-ink-muted">
        Questions about these terms:{" "}
        <a
          href={`mailto:${siteConfig.supportEmail}`}
          className="font-medium text-accent hover:underline"
        >
          {siteConfig.supportEmail}
        </a>
        .
      </p>
    </main>
  );
}
