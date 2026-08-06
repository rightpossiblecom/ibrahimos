import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MarketingCtaBand } from "@/components/MarketingCtaBand";
import { ProductPreview } from "@/components/ProductPreview";
import { siteConfig } from "@/config/site";
import { getProductMedia } from "@/lib/product-assets";

export const metadata: Metadata = {
  title: "Product",
};

function MediaGate({
  title,
  body,
  paths,
}: {
  title: string;
  body: string;
  paths: string[];
}) {
  return (
    <div className="border border-line bg-bg-elevated px-6 py-8">
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{body}</p>
      <ul className="mt-4 list-inside list-disc text-sm text-ink-muted">
        {paths.map((p) => (
          <li key={p}>
            <code className="text-ink">{p}</code>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProductPage() {
  const media = getProductMedia();
  const shotCount = media.screenshots.length;

  return (
    <>
      <main>
        <section className="border-b border-line bg-bg-elevated">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Product
            </p>
            <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {siteConfig.brandName} in practice
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={siteConfig.ctas.primary.href}
                className="rounded-md bg-gold px-4 py-2.5 text-sm font-semibold text-gold-ink"
              >
                {siteConfig.ctas.primary.label}
              </Link>
              <Link
                href={siteConfig.ctas.tertiary.href}
                className="rounded-md border border-line bg-bg px-4 py-2.5 text-sm font-semibold text-ink"
              >
                {siteConfig.ctas.tertiary.label}
              </Link>
            </div>
          </div>
        </section>

        {/* Order lock: video → screenshots → registration → copy */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Walkthrough
          </h2>
          {media.demoVideo ? (
            <video
              className="mt-6 aspect-video w-full border border-line bg-ink"
              controls
              preload="metadata"
              src={media.demoVideo}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="mt-6">
              <MediaGate
                title="Demo video required"
                body="Drop the product walkthrough here. Cloud Grant Phase 09 cannot pass without it (or a written owner waiver)."
                paths={["public/product/demo.mp4"]}
              />
            </div>
          )}
        </section>

        <section className="border-t border-line bg-bg">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Screenshots
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              Product gallery
            </h2>
            {shotCount >= 4 ? (
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {media.screenshots.map((src, i) => (
                  <figure
                    key={src}
                    className="relative aspect-[4/3] overflow-hidden border border-line bg-bg-elevated"
                  >
                    <Image
                      src={src}
                      alt={`${siteConfig.brandName} screenshot ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <figcaption className="absolute bottom-0 left-0 right-0 bg-ink/70 px-3 py-2 text-xs text-white">
                      Shot {String(i + 1).padStart(2, "0")}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="mt-10 space-y-6">
                <MediaGate
                  title="≥4 screenshots required"
                  body={`Found ${shotCount}. Add shot-01… files under public/product/. Illustrative UI below is not a substitute for Phase 09.`}
                  paths={[
                    "public/product/shot-01.png",
                    "public/product/shot-02.png",
                    "public/product/shot-03.png",
                    "public/product/shot-04.png",
                  ]}
                />
                <div className="grid gap-6 lg:grid-cols-3">
                  <ProductPreview variant="overview" />
                  <ProductPreview variant="assessment" />
                  <ProductPreview variant="market" />
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="border-t border-line bg-bg-elevated">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Registration
            </h2>
            <div className="mt-3 max-w-2xl space-y-1 text-sm text-ink-muted">
              <p className="font-medium text-ink">{siteConfig.legalEntity}</p>
              <p>Registration No. {siteConfig.cacNumber}</p>
              <p>Nature of business: {siteConfig.natureOfBusiness}</p>
              <p>TIN: {siteConfig.tin}</p>
              <p>{siteConfig.businessAddress}</p>
            </div>
            {media.cacImage ? (
              <div className="mt-6 space-y-4">
                <div className="overflow-hidden border border-line bg-bg">
                  <Image
                    src={media.cacImage}
                    alt="Registration certificate"
                    width={1200}
                    height={800}
                    className="h-auto w-full object-contain"
                  />
                </div>
                {media.cacPdf ? (
                  <a
                    href={media.cacPdf}
                    className="inline-block text-sm font-medium text-accent hover:underline"
                    download
                  >
                    Download registration PDF
                  </a>
                ) : null}
              </div>
            ) : (
              <div className="mt-6">
                <MediaGate
                  title="CAC / registration image required"
                  body="Embed a visible certificate image (not PDF-only). Optional PDF download may follow the image."
                  paths={[
                    "public/product/cac-certificate.jpg",
                    "public/product/cac-certificate.png",
                    "public/cac-certificate.pdf (optional)",
                  ]}
                />
              </div>
            )}
          </div>
        </section>

        <section className="border-t border-line bg-bg">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="font-display text-3xl font-semibold text-ink">
              How a case moves through {siteConfig.brandName}
            </h2>
            <ol className="mt-10 grid gap-10 md:grid-cols-3">
              {siteConfig.howItWorks.map((step, index) => (
                <li key={step.title}>
                  <p className="font-display text-2xl font-semibold text-accent">
                    {String(index + 1).padStart(2, "0")}
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

        <section className="border-t border-line bg-bg-elevated">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="font-display text-3xl font-semibold text-ink">
              Capabilities
            </h2>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2">
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
      </main>
      <MarketingCtaBand
        title="Request a product demo"
        body="See disease intake, farm overview, and conversion flows on a live walkthrough."
      />
    </>
  );
}
