import type { Metadata } from "next";
import { MarketingCtaBand } from "@/components/MarketingCtaBand";
import { MarketingPageHero } from "@/components/MarketingPageHero";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Help" };

export default function HelpPage() {
  return (
    <>
      <main>
        <MarketingPageHero
          eyebrow="Help center"
          title="Common questions"
          body={`Cannot find it? Write ${siteConfig.supportEmail} and we will get back to you.`}
        />
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <dl className="space-y-8">
            {siteConfig.faqs.map((item) => (
              <div key={item.q} className="border-b border-line pb-8 last:border-0">
                <dt className="font-display text-lg font-semibold text-ink">
                  {item.q}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
      <MarketingCtaBand
        title="Still stuck?"
        body="Log in and open a field check, or talk to sales for a cooperative walkthrough."
      />
    </>
  );
}
