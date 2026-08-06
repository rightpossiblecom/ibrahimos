import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { siteConfig } from "@/config/site";

export function MarketingFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-bg-elevated">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <BrandMark className="text-lg" />
          <p className="mt-2 max-w-xs text-sm text-ink-muted">
            {siteConfig.tagline}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Explore
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Get started
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href={siteConfig.ctas.primary.href}
                className="text-ink hover:text-accent"
              >
                {siteConfig.ctas.primary.label}
              </Link>
            </li>
            <li>
              <Link
                href={siteConfig.ctas.secondary.href}
                className="text-ink hover:text-accent"
              >
                {siteConfig.ctas.secondary.label}
              </Link>
            </li>
            <li>
              <Link
                href={siteConfig.ctas.tertiary.href}
                className="text-ink hover:text-accent"
              >
                {siteConfig.ctas.tertiary.label}
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-sm text-ink-muted">
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="hover:text-accent"
            >
              {siteConfig.supportEmail}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-ink-muted sm:px-6">
          <p>
            © {siteConfig.foundedYear} {siteConfig.brandName}
            {siteConfig.legalEntity ? ` · ${siteConfig.legalEntity}` : ""}
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-accent">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-accent">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
