import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { siteConfig } from "@/config/site";

const publicLinks = [
  { label: "Product", href: "/product" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Team", href: "/team" },
  { label: "Season notes", href: "/season-notes" },
  { label: "About", href: "/about" },
] as const;

const workspaceLinks = [
  { label: "Command", href: "/dashboard" },
  { label: "Incidents", href: "/new" },
  { label: "Fields", href: "/fields" },
  { label: "Market", href: "/market" },
  { label: "Weather", href: "/weather" },
] as const;

const supportLinks = [
  { label: "Help", href: "/help" },
  { label: "Journal", href: "/blog" },
  { label: "Security", href: "/security" },
  { label: "Talk to sales", href: "/demo" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;

export function MarketingFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-bg-elevated/90">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))]">
        <div className="ops-panel rounded-3xl p-5">
          <BrandMark className="text-xs" />
          <p className="ops-eyebrow mt-4">Field operating system</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">
            {siteConfig.description}
          </p>
          <p className="mt-5 text-sm text-ink-muted">
            Live at{" "}
            <a href="https://ibrahimos.top" className="text-ink hover:text-accent">
              {siteConfig.domain}
            </a>
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="text-ink hover:text-accent"
            >
              {siteConfig.supportEmail}
            </a>
          </p>
        </div>
        <FooterColumn title="Public" links={publicLinks} />
        <FooterColumn title="Workspace" links={workspaceLinks} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          <FooterColumn title="Support" links={supportLinks} />
          <div className="ops-panel rounded-3xl p-5">
            <p className="ops-eyebrow">Access</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href={siteConfig.ctas.primary.href} className="text-ink hover:text-accent">
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
                <Link href={siteConfig.ctas.tertiary.href} className="text-ink hover:text-accent">
                  {siteConfig.ctas.tertiary.label}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-ink-muted sm:px-6">
          <p>
            © {siteConfig.foundedYear} {siteConfig.brandName}
            {siteConfig.legalEntity ? ` · ${siteConfig.legalEntity}` : ""}
            {` · ${siteConfig.domain}`}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-accent">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-accent">
              Terms
            </Link>
            <Link href="/dashboard" className="hover:text-accent">
              Command
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div className="ops-panel rounded-3xl p-5">
      <p className="ops-eyebrow">{title}</p>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-ink hover:text-accent">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
