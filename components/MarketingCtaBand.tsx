import Link from "next/link";
import { siteConfig } from "@/config/site";

export function MarketingCtaBand({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <section className="border-t border-line bg-accent-deep">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold text-white">
            {title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/80">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={siteConfig.ctas.primary.href}
            className="rounded-md bg-gold px-5 py-3 text-sm font-semibold text-gold-ink hover:opacity-90"
          >
            {siteConfig.ctas.primary.label}
          </Link>
          <Link
            href={siteConfig.ctas.secondary.href}
            className="rounded-md border border-white/35 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            {siteConfig.ctas.secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
