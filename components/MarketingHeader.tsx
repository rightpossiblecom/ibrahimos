import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { siteConfig } from "@/config/site";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <BrandMark />
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-muted transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={siteConfig.ctas.secondary.href}
            className="hidden text-sm font-medium text-accent-deep sm:inline-block"
          >
            {siteConfig.ctas.secondary.label}
          </Link>
          <Link
            href={siteConfig.ctas.primary.href}
            className="rounded-md bg-gold px-3 py-2 text-sm font-semibold text-gold-ink transition-opacity hover:opacity-90"
          >
            {siteConfig.ctas.primary.label}
          </Link>
        </div>
      </div>
    </header>
  );
}
