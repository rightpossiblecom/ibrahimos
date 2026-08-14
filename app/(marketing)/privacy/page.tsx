import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  const entity = siteConfig.legalEntity || siteConfig.brandName;

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
        Privacy
      </h1>
      <p className="mt-6 leading-relaxed text-ink-muted">
        {entity} (“we”) operates {siteConfig.brandName}. This page explains how
        we handle information you share when you create an account or contact us.
      </p>
      <h2 className="mt-10 font-display text-xl font-semibold text-ink">
        What we collect
      </h2>
      <p className="mt-3 leading-relaxed text-ink-muted">
        When you create an account or contact us, we collect the details you
        submit — typically name, email, and optional phone, farm or organisation
        name, and message.
      </p>
      <h2 className="mt-10 font-display text-xl font-semibold text-ink">
        How we use it
      </h2>
      <p className="mt-3 leading-relaxed text-ink-muted">
        We use your details to respond to requests, share product updates you
        asked for, and improve how we introduce {siteConfig.brandName} to
        farmers and partners.
      </p>
      <h2 className="mt-10 font-display text-xl font-semibold text-ink">
        Contact
      </h2>
      <p className="mt-3 leading-relaxed text-ink-muted">
        Questions about privacy:{" "}
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
