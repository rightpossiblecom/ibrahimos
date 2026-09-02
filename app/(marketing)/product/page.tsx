import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MarketingCtaBand } from "@/components/MarketingCtaBand";
import { siteConfig } from "@/config/site";
import { getProductMedia } from "@/lib/product-assets";

export const metadata: Metadata = {
  title: "Product",
};

export const dynamic = "force-dynamic";

export default function ProductPage() {
  const media = getProductMedia();

  return (
    <>
      <main>
        <section className="border-b border-line">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="ops-eyebrow">Product</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
              Upload field evidence. IbrahimOS diagnoses the threat, builds the response plan, and tracks recovery.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
              A commercial farm manager opens an incident, waits for the command plan, then deploys the crew. The first buyer is a farm running 20–500 hectares. The live case is North Block 04 in Kaduna.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-gold-ink"
              >
                Log in
              </Link>
              <Link
                href="/dashboard"
                className="rounded-full border border-line bg-panel px-4 py-2.5 text-sm font-semibold text-ink"
              >
                Open Command
              </Link>
            </div>
          </div>
        </section>

        {media.demoVideo ? (
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <h2 className="font-display text-2xl font-semibold text-ink">Walkthrough</h2>
            <video
              className="mt-6 aspect-video w-full rounded-3xl border border-line bg-ink"
              controls
              preload="metadata"
              src={media.demoVideo}
            >
              Your browser does not support the video tag.
            </video>
          </section>
        ) : null}

        <section className="border-t border-line bg-bg-elevated/40">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <p className="ops-eyebrow">The desk</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              Four rooms on the same incident
            </h2>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {(media.screenshots.length >= 4
                ? media.screenshots.slice(0, 4)
                : [
                    "/product/desk-command.png",
                    "/product/desk-incident.png",
                    "/product/desk-intake.png",
                    "/product/desk-fields.png",
                  ]
              ).map((src, index) => (
                <figure
                  key={src}
                  className="overflow-hidden rounded-3xl border border-line bg-bg-elevated"
                >
                  {/* Plain img so Next's optimizer cannot keep a stale shot-01 cache */}
                  <img
                    src={src}
                    alt={`${siteConfig.brandName} screenshot ${index + 1}`}
                    className="h-auto w-full object-cover object-top"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-ink">
            How a case moves through IbrahimOS
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {siteConfig.howItWorks.map((step, index) => (
              <li key={step.title}>
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
                <div className="mt-4 overflow-hidden rounded-2xl border border-line">
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
