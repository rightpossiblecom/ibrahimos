import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MarketingCtaBand } from "@/components/MarketingCtaBand";
import { FadeUp } from "@/components/motion";
import { siteConfig } from "@/config/site";
import { getProductMedia } from "@/lib/product-assets";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Upload field photos. Get a diagnosis. Run the crew. IbrahimOS names the threat, prices the response, and tracks recovery for commercial farm managers.",
};

export const dynamic = "force-dynamic";

export default function ProductPage() {
  const media = getProductMedia();

  return (
    <>
      <main>
        {/* Hero Section */}
        <FadeUp>
        <section className="border-b border-line">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="ops-eyebrow">Product</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
              Upload field photos. Get a diagnosis. Run the crew.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
              You send evidence from the block. IbrahimOS names the threat, prices the
              response, and tracks recovery. That keeps a Kaduna maize season from
              slipping while the spray plan sits in WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-gold-ink"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-full border border-line bg-panel px-4 py-2.5 text-sm font-semibold text-ink"
              >
                Sign up
              </Link>
            </div>
          </div>
        </section>
        </FadeUp>

        {/* The Problem Section */}
        <section className="border-b border-line bg-bg-elevated/20">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <p className="ops-eyebrow">The Problem</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              What is broken about farm threat management right now
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              <div className="rounded-3xl border border-line bg-bg-elevated p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <span className="font-bold">!</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">Silent Spread</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Diseases and pests spread across hectares silently. By the time a manager notices yellowing leaves, entire blocks are already compromised.
                </p>
              </div>

              <div className="rounded-3xl border border-line bg-bg-elevated p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <span className="font-bold">!</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">Delayed Response</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Consulting agronomists and formulating a spray or containment plan takes days. Every day of delay means more crop loss.
                </p>
              </div>

              <div className="rounded-3xl border border-line bg-bg-elevated p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <span className="font-bold">!</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">WhatsApp Coordination</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Crew schedules, chemical dosages, and spray logs are scattered across chat groups. Handovers fail, and treatments are missed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Solution Section */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <p className="ops-eyebrow">The Solution</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              Expert diagnostics and crew command in one desk
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div className="rounded-3xl border border-line bg-bg-elevated p-8 shadow-sm">
                <h3 className="font-display text-2xl font-semibold text-accent">For Managers: The Command Desk</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">
                  Upload field photos and coordinates. IbrahimOS instantly diagnoses the crop threat, scores severity, and generates an agronomist-grade response plan with precise chemical dosages.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-ink-muted">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Instant crop disease and pest identification
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Severity scoring and field containment plans
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Precise chemical, fertilizer, and water recommendations
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-line bg-bg-elevated p-8 shadow-sm">
                <h3 className="font-display text-2xl font-semibold text-accent">For Crews: Field Operations</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">
                  Coordinate your field team on a shared dashboard. Assign spray tasks, log treatments, and track block-by-block recovery on a live interactive map.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-ink-muted">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Task assignment and tracking for field crews
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Live interactive field maps with block status
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Historical recovery logs for compliance and audits
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How We Achieve It Section */}
        <section className="border-b border-line bg-bg-elevated/40">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <p className="ops-eyebrow">How We Achieve It</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              Four rooms on the same incident
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-ink-muted leading-relaxed">
              A seamless flow from field intake to command plans, field status, and crew coordinates.
            </p>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {(media.screenshots.length >= 4
                ? media.screenshots.slice(0, 4)
                : [
                    "/product/desk-command.png",
                    "/product/desk-incident.png",
                    "/product/desk-intake.png",
                    "/product/desk-fields.png",
                  ]
              ).map((src, index) => {
                const labels = [
                  "Command Room — Response plans and agronomist guides",
                  "Incident Room — Active threats and severity scores",
                  "Intake Room — Photo evidence and field notes",
                  "Field Room — Interactive block maps and recovery status"
                ];
                return (
                  <figure
                    key={src}
                    className="overflow-hidden rounded-3xl border border-line bg-bg-elevated shadow-sm"
                  >
                    <img
                      src={src}
                      alt={`${siteConfig.brandName} screenshot ${index + 1}`}
                      className="h-auto w-full object-cover object-top"
                    />
                    <figcaption className="border-t border-line px-4 py-3 text-xs text-ink-muted font-medium bg-panel">
                      {labels[index] || `${siteConfig.brandName} Room`}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>

        {media.demoVideo ? (
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 border-b border-line">
            <p className="ops-eyebrow">Product Media</p>
            <h2 className="font-display text-2xl font-semibold text-ink mt-2">Walkthrough</h2>
            <video
              className="mt-6 aspect-video w-full rounded-3xl border border-line bg-ink shadow-lg"
              controls
              preload="metadata"
              src={media.demoVideo}
            >
              Your browser does not support the video tag.
            </video>
          </section>
        ) : null}

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 border-b border-line">
          <h2 className="font-display text-3xl font-semibold text-ink">
            How a case moves through IbrahimOS
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {siteConfig.howItWorks.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-line bg-bg-elevated/50 p-6">
                <p className="font-display text-2xl font-semibold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <p className="ops-eyebrow">Company</p>
            <div className="mt-3 max-w-2xl space-y-1 text-sm text-ink-muted">
              <p className="font-medium text-ink">{siteConfig.legalEntity}</p>
              {media.cacImage ? (
                <div className="mt-4 overflow-hidden rounded-2xl border border-line max-w-xl shadow-md">
                  <Image
                    src={media.cacImage}
                    alt="Registration certificate"
                    width={1200}
                    height={800}
                    className="h-auto w-full object-contain"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </main>
      <MarketingCtaBand
        title="Open IbrahimOS"
        body="Create an account, then log in with anything. The Kaduna sample fills the Incident Room."
      />
    </>
  );
}
