import Link from "next/link";
import { MarketingCtaBand } from "@/components/MarketingCtaBand";
import { ProductPreview } from "@/components/ProductPreview";
import { demoFlow } from "@/config/demo-flow";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden">
        <div className="hero-atmosphere absolute inset-0" aria-hidden />
        <div className="hero-grain absolute inset-0" aria-hidden />
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-6xl flex-col justify-end px-4 pb-16 pt-24 sm:px-6 sm:pb-24">
          <p className="font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
            {siteConfig.brandName}
          </p>
          <h1 className="mt-4 max-w-xl font-display text-2xl font-medium leading-snug text-white/95 sm:text-3xl">
            One farm. One assistant. Every season.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
            {siteConfig.tagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={siteConfig.ctas.primary.href}
              className="rounded-md bg-gold px-5 py-3 text-sm font-semibold text-gold-ink hover:opacity-90"
            >
              {siteConfig.ctas.primary.label}
            </Link>
            <Link
              href={siteConfig.ctas.secondary.href}
              className="rounded-md border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20"
            >
              {siteConfig.ctas.secondary.label}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Stats / capability bar — exactly 4 */}
      <section className="border-t border-line bg-bg-elevated">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {siteConfig.capabilityStats.map((stat) => (
            <div key={stat.label} className="border-l-2 border-accent pl-4">
              <p className="font-display text-xl font-semibold text-ink">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Trust / launch strip */}
      <section className="border-t border-line bg-accent-deep">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold">
              {siteConfig.launchStrip.eyebrow}
            </p>
            <p className="mt-1 text-sm text-white/80">
              {siteConfig.launchStrip.note}
            </p>
          </div>
          <p className="text-sm font-medium text-white">
            {siteConfig.launchStrip.places.join(" · ")}
          </p>
        </div>
      </section>

      {/* 4. Problem */}
      <section className="border-t border-line bg-bg">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            The problem
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-ink sm:text-4xl">
            Farming still runs on guesswork. That costs harvests.
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {siteConfig.problems.map((problem, index) => (
              <li key={problem}>
                <p className="font-display text-3xl font-semibold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">
                  {problem}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Product showcase */}
      <section className="border-t border-line bg-bg-elevated">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Product showcase
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              What {siteConfig.brandName} produces
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Farm overview, disease assessments with treatment plans, and market
              context — the outputs operators walk through on a demo recording.
            </p>
            <Link
              href="/product"
              className="mt-6 inline-block text-sm font-semibold text-accent hover:underline"
            >
              Open the product page
            </Link>
          </div>
          <ProductPreview variant="assessment" />
        </div>
      </section>

      {/* 6. How it works */}
      <section className="border-t border-line bg-bg">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
            From field question to next action
          </h2>
          <ol className="mt-10 grid gap-10 md:grid-cols-3">
            {siteConfig.howItWorks.map((step, index) => (
              <li key={step.title}>
                <p className="font-display text-2xl font-semibold text-accent-deep">
                  {index + 1}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. Pipeline / process */}
      <section className="border-t border-line bg-bg-elevated">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            AI pipeline
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
            Multi-stage analysis on every case
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {demoFlow.pipelineSteps.map((step, index) => (
              <li
                key={step.id}
                className="border border-line bg-bg px-4 py-5"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Stage {index + 1}
                </p>
                <p className="mt-3 text-sm font-medium leading-relaxed text-ink">
                  {step.label}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. Who it's for */}
      <section className="border-t border-line bg-bg">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Who it&apos;s for
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
            From a few plots to multi-farm ops
          </h2>
          <ul className="mt-10 border-y border-line">
            {siteConfig.audiences.map((audience) => (
              <li
                key={audience}
                className="border-b border-line py-5 text-lg text-ink-muted last:border-b-0"
              >
                {audience}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. Features grid */}
      <section className="border-t border-line bg-bg-elevated">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Features
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
            Six capabilities that run the season
          </h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.capabilities.map((item) => (
              <li key={item.title} className="border-l-2 border-accent pl-4">
                <h3 className="font-display text-xl font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10. Testimonials */}
      <section className="border-t border-line bg-bg">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            From the field
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
            Farmers who run the season here
          </h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
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
        </div>
      </section>

      {/* 11. Pricing preview */}
      <section className="border-t border-line bg-bg-elevated">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Pricing
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
            Start free. Upgrade when the field needs more.
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-ink-muted">
            Log in to use Free. Create an account for Premium disease scans and
            yield tools. Enterprise is for multi-farm ops.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {siteConfig.pricing.map((tier) => (
              <article
                key={tier.name}
                className="flex flex-col border border-line bg-bg p-6"
              >
                <h3 className="font-display text-xl font-semibold text-ink">
                  {tier.name}
                </h3>
                <p className="mt-2 font-display text-2xl font-semibold text-accent-deep">
                  {tier.priceLabel}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                  {tier.blurb}
                </p>
                <Link
                  href={tier.cta.href}
                  className={
                    tier.name === "Premium"
                      ? "mt-6 inline-flex justify-center rounded-md bg-gold px-4 py-2.5 text-center text-sm font-semibold text-gold-ink"
                      : "mt-6 inline-flex justify-center rounded-md border border-line bg-bg-elevated px-4 py-2.5 text-center text-sm font-semibold text-ink"
                  }
                >
                  {tier.cta.label}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Get started */}
      <section className="border-t border-line bg-bg">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Get started
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
            Open the farm OS
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {(
              [
                ["primary", "Already farming with IbrahimOS? Open your fields and records."],
                ["secondary", "New here? Create an account and run your first disease check."],
                ["tertiary", "Cooperatives and commercial teams — talk through multi-farm ops."],
              ] as const
            ).map(([key, blurb]) => {
              const cta = siteConfig.ctas[key];
              return (
                <article
                  key={key}
                  className="flex flex-col border border-line bg-bg-elevated p-6"
                >
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {cta.label}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                    {blurb}
                  </p>
                  <Link
                    href={cta.href}
                    className="mt-6 inline-flex justify-center rounded-md bg-accent px-4 py-2.5 text-center text-sm font-semibold text-white"
                  >
                    {cta.label}
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 13. FAQ */}
      <section className="border-t border-line bg-bg-elevated">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
            Common questions
          </h2>
          <dl className="mt-10 space-y-8">
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
        </div>
      </section>

      {/* 14. Final CTA banner */}
      <MarketingCtaBand
        title={`Bring ${siteConfig.brandName} to your farm`}
        body="Log in to open your fields, or create an account to start a disease check today."
      />
    </>
  );
}
