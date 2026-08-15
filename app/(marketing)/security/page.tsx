import type { Metadata } from "next";
import { MarketingCtaBand } from "@/components/MarketingCtaBand";
import { MarketingPageHero } from "@/components/MarketingPageHero";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Security" };

export default function SecurityPage() {
  return (
    <>
      <main>
        <MarketingPageHero
          eyebrow="Security"
          title="How we handle farm data"
          body={siteConfig.security.intro}
        />
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {siteConfig.security.points.map((item) => (
              <article
                key={item.title}
                className="border border-line bg-bg-elevated p-6"
              >
                <h2 className="font-display text-xl font-semibold text-ink">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <MarketingCtaBand
        title="Questions on data?"
        body={`Write ${siteConfig.supportEmail} or log in to review what sits in your workspace.`}
      />
    </>
  );
}
