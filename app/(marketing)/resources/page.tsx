import type { Metadata } from "next";
import Link from "next/link";
import { MarketingCtaBand } from "@/components/MarketingCtaBand";
import { MarketingPageHero } from "@/components/MarketingPageHero";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Resources" };

export default function ResourcesPage() {
  return (
    <>
      <main>
        <MarketingPageHero
          eyebrow="Resources"
          title="Help, guides, and product notes"
          body="Everything around the farm OS — how it works, how we handle data, and season writing from the field."
        />
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {siteConfig.resources.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border border-line bg-bg-elevated p-6 transition-colors hover:border-accent"
              >
                <h2 className="font-display text-xl font-semibold text-ink">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.body}
                </p>
                <p className="mt-4 text-sm font-medium text-accent">Open →</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <MarketingCtaBand
        title="Ready to use the product?"
        body="Log in to your workspace, or create an account in a minute."
      />
    </>
  );
}
