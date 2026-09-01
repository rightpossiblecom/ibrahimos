import type { Metadata } from "next";
import Link from "next/link";
import { MarketingCtaBand } from "@/components/MarketingCtaBand";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Pricing",
};

export default function PricingPage() {
  return (
    <>
      <main>
        <section className="border-b border-line bg-bg-elevated">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Pricing
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Simple plans for growing farms
            </h1>
            <p className="mt-4 max-w-xl text-lg text-ink-muted">
              Start free with core records and weather. Move to Premium when
              disease scans and yield tools become daily habits. Enterprise covers
              multi-farm operations.
            </p>
            <p className="mt-4 max-w-xl text-sm text-ink-muted">
              Log in for Free. Create an account for Premium. Talk to sales for
              multi-farm Enterprise.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {siteConfig.pricing.map((tier) => (
              <article
                key={tier.name}
                className="flex flex-col border border-line bg-bg-elevated p-6"
              >
                <h2 className="font-display text-xl font-semibold text-ink">
                  {tier.name}
                </h2>
                <p className="mt-2 font-display text-3xl font-semibold text-accent">
                  {tier.priceLabel}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
                  {tier.blurb}
                </p>
                <Link
                  href={tier.cta.href}
                  className={
                    tier.name === "Premium"
                      ? "mt-8 inline-flex justify-center rounded-md bg-gold px-4 py-2.5 text-center text-sm font-semibold text-gold-ink"
                      : "mt-8 inline-flex justify-center rounded-md border border-line bg-bg px-4 py-2.5 text-center text-sm font-semibold text-ink"
                  }
                >
                  {tier.cta.label}
                </Link>
              </article>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-ink-muted">
            Marketplace and financing modules sit alongside Premium — disease
            detection, unlimited AI, and yield prediction — when your farm is
            ready for them.
          </p>
        </section>
      </main>
      <MarketingCtaBand
        title="Not sure which plan?"
        body="Log in to try Free, or talk to sales and we will map Premium to how your farm actually runs."
      />
    </>
  );
}
