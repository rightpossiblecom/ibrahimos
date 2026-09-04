import Link from "next/link";
import { FadeUp } from "@/components/motion";
import { siteConfig } from "@/config/site";

export function MarketingCtaBand({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <FadeUp>
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="ops-panel overflow-hidden rounded-[2rem] px-6 py-12 sm:px-10">
          <p className="ops-eyebrow">Open the desk</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-ink sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">{body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={siteConfig.ctas.primary.href}
              className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-gold-ink"
            >
              {siteConfig.ctas.primary.label}
            </Link>
            <Link
              href="/product"
              className="rounded-full border border-line bg-panel px-5 py-3 text-sm font-semibold text-ink"
            >
              See the product
            </Link>
          </div>
        </div>
      </div>
    </section>
    </FadeUp>
  );
}
