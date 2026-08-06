import type { Metadata } from "next";
import Link from "next/link";
import { MarketingCtaBand } from "@/components/MarketingCtaBand";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Team",
};

export default function TeamPage() {
  const hasTeam = siteConfig.team.length >= 2;

  return (
    <>
      <main>
        <section className="border-b border-line bg-bg-elevated">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Team
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              People behind {siteConfig.brandName}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              {siteConfig.legalEntity
                ? `${siteConfig.legalEntity} builds `
                : ""}
              an Africa-first farm operating system — agronomy, product, and
              partnerships working toward more profit per season for farmers.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          {hasTeam ? (
            <ul className="space-y-8">
              {siteConfig.team.map((member) => (
                <li key={member.name} className="border border-line bg-bg-elevated p-6">
                  <p className="font-display text-xl font-semibold text-ink">
                    {member.name}
                  </p>
                  <p className="mt-1 text-sm font-medium text-accent">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {member.bio}
                  </p>
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <div className="border border-line bg-bg-elevated px-6 py-8">
              <h2 className="font-display text-xl font-semibold text-ink">
                Owner action required
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">
                Cloud Grant ship rules require ≥2 real people with name, role,
                bio, and LinkedIn URL in{" "}
                <code className="text-ink">config/site.ts</code>. We will not
                invent founders. Send two profiles and they will render here.
              </p>
              <p className="mt-4 text-sm text-ink-muted">
                Contact:{" "}
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="font-medium text-accent hover:underline"
                >
                  {siteConfig.supportEmail}
                </a>
              </p>
              <Link
                href={siteConfig.ctas.secondary.href}
                className="mt-6 inline-block text-sm font-semibold text-accent hover:underline"
              >
                {siteConfig.ctas.secondary.label}
              </Link>
            </div>
          )}
        </section>
      </main>
      <MarketingCtaBand
        title="Talk to the team"
        body="Book a demo for your farm, cooperative, or partner program."
      />
    </>
  );
}
