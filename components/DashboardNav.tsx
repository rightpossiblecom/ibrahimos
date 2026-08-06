"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/new", label: "New assessment" },
  { href: "/fields", label: "Fields" },
  { href: "/market", label: "Market" },
  { href: "/weather", label: "Weather" },
  { href: "/account", label: "Account" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full flex-col border-b border-line bg-bg-elevated md:w-56 md:border-b-0 md:border-r md:min-h-full">
      <div className="border-b border-line px-4 py-4">
        <p className="font-display text-lg font-semibold text-accent-deep">
          {siteConfig.brandName}
        </p>
        <p className="mt-0.5 text-xs text-ink-muted">Farm OS</p>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-2 py-3 md:flex-col" aria-label="Dashboard">
        {links.map((link) => {
          const active =
            pathname === link.href ||
            (link.href !== "/dashboard" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={
                active
                  ? "whitespace-nowrap rounded-md bg-accent px-3 py-2 text-sm font-medium text-white"
                  : "whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-ink-muted hover:bg-bg hover:text-ink"
              }
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
