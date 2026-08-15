import type { Metadata } from "next";
import { MarketingCtaBand } from "@/components/MarketingCtaBand";
import { MarketingPageHero } from "@/components/MarketingPageHero";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Customers" };

export default function CustomersPage() {
  return (
    <>
      <main>
        <MarketingPageHero
          eyebrow="Customers"
          title="Farms that run the season here"
          body="Growers, cooperative secretaries, and operations leads using IbrahimOS for disease calls, records, and market timing."
        />
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <ul className="grid gap-8 md:grid-cols-3">
            {siteConfig.testimonials.map((item) => (
              <li key={item.name} className="border border-line bg-bg-elevated p-6">
                <p className="text-sm leading-relaxed text-ink-muted">
                  “{item.quote}”
                </p>
                <p className="mt-6 font-semibold text-ink">{item.name}</p>
                <p className="mt-1 text-xs text-ink-muted">{item.role}</p>
              </li>
            ))}
          </ul>
          <p className="mt-12 text-sm text-ink-muted">
            Farms across {siteConfig.launchStrip.places.join(", ")}.
          </p>
        </section>
      </main>
      <MarketingCtaBand
        title="Bring your farm onto IbrahimOS"
        body="Log in to open your fields, or create an account to start a disease check today."
      />
    </>
  );
}
