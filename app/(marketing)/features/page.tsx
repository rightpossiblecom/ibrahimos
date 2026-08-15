import type { Metadata } from "next";
import { MarketingCtaBand } from "@/components/MarketingCtaBand";
import { MarketingPageHero } from "@/components/MarketingPageHero";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Features" };

export default function FeaturesPage() {
  return (
    <>
      <main>
        <MarketingPageHero
          eyebrow="Features"
          title="Everything you need to run the season"
          body="Assistant, disease checks, records, weather, and market prices — one farm OS instead of scattered notebooks and group chats."
        />
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <ul className="grid gap-8 sm:grid-cols-2">
            {siteConfig.capabilities.map((item) => (
              <li key={item.title} className="border-l-2 border-accent pl-4">
                <h2 className="font-display text-xl font-semibold text-ink">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <MarketingCtaBand
        title="Open the features in your workspace"
        body="Log in to run a disease check, or create an account to keep farm records."
      />
    </>
  );
}
