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
          title="See the field. Get a plan. Keep the season."
          body="Three steps from a yellow leaf or a planting date to something you can do before the next rain."
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
        title="Try the three steps on your crop"
        body="Log in and run a check, or create an account to keep the record."
      />
    </>
  );
}
