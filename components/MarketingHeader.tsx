"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/BrandMark";
import { siteConfig } from "@/config/site";

const publicNav = [
  { label: "Product", href: "/product", match: ["/product"] },
  { label: "How it works", href: "/how-it-works", match: ["/how-it-works"] },
  { label: "Pricing", href: "/pricing", match: ["/pricing"] },
  { label: "Team", href: "/team", match: ["/team"] },
] as const;

const appNav = [
  { label: "Command", href: "/dashboard", match: ["/dashboard", "/projects/"] },
  { label: "Incidents", href: "/new", match: ["/new"] },
  { label: "Fields", href: "/fields", match: ["/fields"] },
  { label: "Market", href: "/market", match: ["/market"] },
  { label: "Weather", href: "/weather", match: ["/weather"] },
] as const;

export function MarketingHeader() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const pathname = usePathname();
  const navGroups = [
    { title: "Public", items: publicNav },
    { title: "Workspace", items: appNav },
  ];

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/80 bg-bg/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        <BrandMark />
        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-2 xl:flex xl:flex-wrap"
          aria-label="Primary"
        >
          {[...publicNav, ...appNav].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={navItemClass(ready && isActive(pathname, item.match))}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link
            href={siteConfig.ctas.secondary.href}
            className="hidden text-sm font-medium text-ink-muted transition-colors hover:text-ink lg:inline-block"
          >
            {siteConfig.ctas.secondary.label}
          </Link>
          <Link
            href={siteConfig.ctas.primary.href}
            className="rounded-full bg-gold px-3 py-2 text-sm font-semibold text-gold-ink transition-transform duration-150 ease-out hover:opacity-90 active:scale-[0.97]"
          >
            {siteConfig.ctas.primary.label}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel text-sm font-semibold text-ink xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>
      {open ? (
        <nav
          className="border-t border-line bg-bg px-4 py-4 xl:hidden"
          aria-label="Mobile"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            {navGroups.map((group) => (
              <div key={group.title} className="ops-panel rounded-2xl p-3">
                <p className="ops-eyebrow px-1">{group.title}</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={mobileNavItemClass(ready && isActive(pathname, item.match))}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href={siteConfig.ctas.primary.href}
                className="inline-flex justify-center rounded-full bg-gold px-4 py-3 text-sm font-semibold text-gold-ink"
                onClick={() => setOpen(false)}
              >
                {siteConfig.ctas.primary.label}
              </Link>
              <Link
                href={siteConfig.ctas.secondary.href}
                className="inline-flex justify-center rounded-full border border-line bg-panel px-4 py-3 text-sm font-semibold text-ink"
                onClick={() => setOpen(false)}
              >
                {siteConfig.ctas.secondary.label}
              </Link>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function isActive(pathname: string, match: readonly string[]) {
  return match.some((value) => {
    if (value.endsWith("/")) {
      return pathname.startsWith(value);
    }

    return pathname === value || pathname.startsWith(`${value}/`);
  });
}

function navItemClass(active: boolean) {
  return active
    ? "ops-glow rounded-full bg-accent px-3 py-2 text-sm font-semibold text-gold-ink"
    : "rounded-full border border-line bg-panel px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:border-accent/40 hover:text-ink";
}

function mobileNavItemClass(active: boolean) {
  return active
    ? "rounded-2xl bg-accent px-3 py-3 text-sm font-semibold text-gold-ink"
    : "rounded-2xl border border-line bg-panel-strong px-3 py-3 text-sm font-medium text-ink";
}
