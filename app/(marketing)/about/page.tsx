import type { Metadata } from "next";
import { MarketingCtaBand } from "@/components/MarketingCtaBand";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <main>
        <section className="border-b border-line bg-bg-elevated">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              About {siteConfig.brandName}
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Built for African farms first
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              {siteConfig.mission}
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              {siteConfig.description} We design for first-time smartphone users
              and commercial operators alike — offline-friendly habits, local
              crops, and advice that sounds like an experienced extension
              officer, not a generic chatbot.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-ink">
            The problems we attack
          </h2>
          <ol className="mt-8 space-y-6">
            {siteConfig.problems.map((problem, index) => (
              <li
                key={problem}
                className="flex gap-4 border-l-2 border-accent pl-4"
              >
                <span className="font-display text-lg font-semibold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="leading-relaxed text-ink-muted">{problem}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-y border-line bg-bg-elevated">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Who it&apos;s for
            </h2>
            <ul className="mt-8 space-y-4">
              {siteConfig.audiences.map((audience) => (
                <li
                  key={audience}
                  className="border-b border-line pb-4 text-base text-ink-muted last:border-0"
                >
                  {audience}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-ink">
            North star
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            Increase farmer profit per season. Every surface in {siteConfig.brandName}{" "}
            — from disease checks to market prices — exists to help farmers produce
            more, lose less, and earn more.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Founded {siteConfig.foundedYear}. Reach us at{" "}
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="font-medium text-accent hover:underline"
            >
              {siteConfig.supportEmail}
            </a>
            .
          </p>
        </section>
      </main>
      <MarketingCtaBand
        title="Work with us on early access"
        body="Cooperatives, commercial farms, and partners can book a walkthrough of the full farm OS."
      />
    </>
  );
}
