import type { Metadata } from "next";
import { MarketingCtaBand } from "@/components/MarketingCtaBand";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Team",
  description: `The people behind ${siteConfig.brandName}: ${siteConfig.team
    .map((member) => `${member.name}, ${member.role}`)
    .join("; ")}. ${siteConfig.legalEntity}, CAC ${siteConfig.cacNumber}.`,
};

export default function TeamPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brandName,
    legalName: siteConfig.legalEntity,
    foundingDate: String(siteConfig.foundedYear),
    email: siteConfig.supportEmail,
    url: `https://${siteConfig.domain}/team`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "53, Behind Yoruba Chief Palace Gwako",
      addressLocality: "Gwagwalada",
      addressRegion: "FCT",
      addressCountry: "NG",
    },
    identifier: [
      { "@type": "PropertyValue", name: "CAC", value: siteConfig.cacNumber },
      { "@type": "PropertyValue", name: "TIN", value: siteConfig.tin },
    ],
    sameAs: siteConfig.team.map((member) => member.linkedin).filter(Boolean),
    founder: siteConfig.team.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
      description: member.bio,
      sameAs: member.linkedin,
      worksFor: {
        "@type": "Organization",
        name: siteConfig.brandName,
        legalName: siteConfig.legalEntity,
      },
    })),
    employee: siteConfig.team.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
      description: member.bio,
      sameAs: member.linkedin,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <section className="border-b border-line bg-bg-elevated">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Team
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Who builds {siteConfig.brandName}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              {siteConfig.legalEntity} is a registered Nigerian agribusiness. We
              build {siteConfig.brandName} so farm managers can upload field
              evidence, get a diagnosis, and run the response from one desk.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Company
          </h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <Fact label="Legal name" value={siteConfig.legalEntity} />
            <Fact label="Product" value={siteConfig.brandName} />
            <Fact label="CAC" value={siteConfig.cacNumber} />
            <Fact label="TIN" value={siteConfig.tin} />
            <Fact label="Founded" value={String(siteConfig.foundedYear)} />
            <Fact label="Email" value={siteConfig.supportEmail} href={`mailto:${siteConfig.supportEmail}`} />
            <div className="sm:col-span-2">
              <Fact label="Registered address" value={siteConfig.businessAddress} />
            </div>
          </dl>
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-ink">People</h2>
          <ul className="mt-8 space-y-8">
            {siteConfig.team.map((member) => (
              <li key={member.name} className="border border-line bg-bg-elevated p-6">
                <p className="font-display text-xl font-semibold text-ink">{member.name}</p>
                <p className="mt-1 text-sm font-medium text-accent">{member.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{member.bio}</p>
                {member.linkedin ? (
                  <a
                    href={member.linkedin}
                    className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn profile
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <MarketingCtaBand
        title="Talk to the team"
        body="Create an account for your farm, or write the founders if you run a cooperative or partner program."
      />
    </>
  );
}

function Fact({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="border border-line bg-bg-elevated px-4 py-3">
      <dt className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-ink">
        {href ? (
          <a href={href} className="text-accent hover:underline">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
