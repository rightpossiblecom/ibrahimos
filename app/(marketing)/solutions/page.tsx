import type { Metadata } from "next";
import { MarketingCtaBand } from "@/components/MarketingCtaBand";
import { MarketingPageHero } from "@/components/MarketingPageHero";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Solutions" };

export default function SolutionsPage() {
  return (
    <>
      <main>
        <MarketingPageHero
          eyebrow="Solutions"
          title="Built for how African farms actually run"
          body="Same product, different density — a first smartphone on a two-plot farm, or a manager scheduling labour across fields."
        />
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {siteConfig.solutions.map((item) => (
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
        title="Find the seat that fits your farm"
        body="Log in for a single plot, or talk to sales for cooperative and multi-farm ops."
      />
    </>
  );
}
