"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDesk } from "@/lib/use-desk";

const links = [
  { href: "/dashboard", label: "Command", code: "CMD", match: ["/dashboard", "/projects/"] },
  { href: "/new", label: "Incidents", code: "INC", match: ["/new"] },
  { href: "/fields", label: "Fields", code: "FLD", match: ["/fields"] },
  { href: "/market", label: "Market", code: "MKT", match: ["/market"] },
  { href: "/weather", label: "Weather", code: "WX", match: ["/weather"] },
  { href: "/account", label: "Account", code: "ACC", match: ["/account"] },
] as const;

export function DashboardNav({ sessionEmail }: { sessionEmail: string }) {
  const pathname = usePathname();
  const { live } = useDesk();

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-line bg-bg-elevated/90 backdrop-blur-xl md:h-full md:w-72 md:shrink-0 md:overflow-y-auto md:border-b-0 md:border-r">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 md:hidden">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink">
          IBRAHIMOS/OPS
        </p>
        <p className="truncate text-xs text-ink-muted">{sessionEmail}</p>
      </div>
      <div className="hidden border-b border-line p-4 md:block">
        <div className="ops-panel rounded-3xl p-4">
          <p className="ops-eyebrow">Workspace</p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <div>
              <p className="font-display text-lg font-semibold uppercase tracking-[0.18em] text-ink">
                IBRAHIMOS/OPS
              </p>
              <p className="mt-1 text-xs text-ink-muted">Precision Command Console</p>
            </div>
            <div
              className={
                live
                  ? "rounded-full border border-accent/30 bg-accent/12 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent"
                  : "rounded-full border border-line px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink-muted"
              }
            >
              {live ? "Live" : "Idle"}
            </div>
          </div>
          <p className="mt-4 text-xs text-ink-muted">{sessionEmail}</p>
        </div>
      </div>
      <nav
        className="flex gap-2 overflow-x-auto px-4 py-3 md:flex-col md:overflow-visible md:p-4"
        aria-label="Dashboard"
      >
        {links.map((link) => {
          const active = link.match.some((value) => {
            if (value.endsWith("/")) {
              return pathname.startsWith(value);
            }

            return pathname === value || pathname.startsWith(`${value}/`);
          });
          return (
            <Link
              key={link.href}
              href={link.href}
              className={
                active
                  ? "ops-glow flex min-w-0 shrink-0 items-center gap-3 rounded-2xl bg-accent px-3 py-3 text-gold-ink"
                  : "flex min-w-0 shrink-0 items-center gap-3 rounded-2xl border border-line bg-panel px-3 py-3 text-ink transition-colors hover:border-accent/35 hover:text-accent"
              }
            >
              <span
                className={
                  active
                    ? "rounded-full bg-gold-ink/10 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em]"
                    : "rounded-full border border-line px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink-muted"
                }
              >
                {link.code}
              </span>
              <span className="truncate text-sm font-semibold">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
