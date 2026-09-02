import type { Metadata } from "next";
import { MarketingCtaBand } from "@/components/MarketingCtaBand";
import { MarketingPageHero } from "@/components/MarketingPageHero";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "How it works" };

export default function HowItWorksPage() {
  return (
    <>
      <main>
        <MarketingPageHero
          eyebrow="How it works"
          title="Open an incident. Wait for the plan. Deploy the crew."
          body="Three steps from field evidence to a priced response with hectares, deadline, and recovery."
        />
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <ol className="grid gap-8 md:grid-cols-3">
            {siteConfig.howItWorks.map((step, index) => (
              <li key={step.title} className="border-l-2 border-accent pl-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Step {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold text-ink">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <MarketingCtaBand
        title="Run the Kaduna incident"
        body="Log in and open the sample. Command fills when the wait ends."
      />
    </>
  );
}
