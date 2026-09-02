import Link from "next/link";
import { MarketingCtaBand } from "@/components/MarketingCtaBand";
import { ProductPreview } from "@/components/ProductPreview";
import { siteConfig } from "@/config/site";
import { formatNgn } from "@/lib/format-currency";

export default function HomePage() {
  const incident = siteConfig.demoIncident;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="hero-atmosphere absolute inset-0" aria-hidden />
        <div className="hero-grain absolute inset-0" aria-hidden />
        <div className="relative z-10 mx-auto grid max-w-7xl items-end gap-10 px-4 pb-16 pt-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:pb-20">
          <div>
            <p className="ops-eyebrow">Field response system</p>
            <h1 className="mt-5 max-w-xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
              Stop crop damage before it becomes a season loss.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
              Upload field photos and notes. IbrahimOS diagnoses the threat, calculates the response, assigns the work, and tracks recovery.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-gold-ink"
              >
                Open Incident Room
              </Link>
              <Link
                href="/product"
                className="rounded-full border border-line bg-panel px-5 py-3 text-sm font-semibold text-ink"
              >
                See the workflow
              </Link>
            </div>
          </div>
          <ProductPreview variant="command" />
        </div>
      </section>

      <section className="border-b border-line bg-bg-elevated/70">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {siteConfig.capabilityStats.map((stat) => (
            <div key={stat.label} className="ops-metric rounded-2xl p-4">
              <p className="font-display text-2xl font-semibold text-ink">{stat.value}</p>
              <p className="mt-1 text-sm text-ink-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className="ops-eyebrow">How it works</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-ink sm:text-4xl">
          Evidence in. Crew, cost, and deadline out.
        </h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {siteConfig.howItWorks.map((step, index) => (
            <li key={step.title} className="ops-panel rounded-3xl p-6">
              <p className="font-display text-2xl font-semibold text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-line bg-bg-elevated/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <p className="ops-eyebrow">Precision Command</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
            The desk after the diagnosis
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.capabilities.map((item) => (
              <li key={item.title} className="ops-panel rounded-3xl p-6">
                <h3 className="font-display text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className="ops-eyebrow">Live case</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
          {incident.field.name}, Kaduna
        </h2>
        <p className="mt-3 max-w-2xl text-base text-ink-muted">
          {incident.field.totalHectares} hectares of maize. {incident.threat} across {incident.zones.length} zones. {incident.affectedHectares} ha at risk. {formatNgn(incident.responseCost)} to respond before the {incident.responseWindowHours}-hour window closes.
        </p>
        <div className="mt-8">
          <ProductPreview variant="incident" />
        </div>
      </section>

      <section className="border-t border-line bg-bg-elevated/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <p className="ops-eyebrow">Pricing</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
            Start on one farm. Add more blocks later.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {siteConfig.pricing.map((tier) => (
              <article key={tier.name} className="ops-panel flex flex-col rounded-3xl p-6">
                <h3 className="font-display text-xl font-semibold text-ink">{tier.name}</h3>
                <p className="mt-2 font-display text-2xl font-semibold text-accent">{tier.priceLabel}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{tier.blurb}</p>
                <Link
                  href={tier.cta.href}
                  className={
                    tier.name === "Premium"
                      ? "mt-6 inline-flex justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-gold-ink"
                      : "mt-6 inline-flex justify-center rounded-full border border-line bg-panel px-4 py-2.5 text-sm font-semibold text-ink"
                  }
                >
                  {tier.cta.label}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <p className="ops-eyebrow">FAQ</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink">Common questions</h2>
        <dl className="mt-10 space-y-8">
          {siteConfig.faqs.map((item) => (
            <div key={item.q} className="border-b border-line pb-8 last:border-0">
              <dt className="font-display text-lg font-semibold text-ink">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <MarketingCtaBand
        title="Open the Kaduna incident"
        body="Log in with any email. Use the sample. Watch Command fill with hectares, cost, crew, and recovery."
      />
    </>
  );
}
