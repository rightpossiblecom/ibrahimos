"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardNav } from "@/components/DashboardNav";
import { useDesk } from "@/lib/use-desk";
import { getSession, type Session } from "@/lib/session";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { live, incident } = useDesk();
  const [ready, setReady] = useState(false);
  const [session, setSessionState] = useState<Session | null>(null);

  useEffect(() => {
    const current = getSession();
    if (!current) {
      router.replace("/login");
      return;
    }

    const timer = window.setTimeout(() => {
      setSessionState(current);
      setReady(true);
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [router]);

  useEffect(() => {
    const html = document.documentElement;
    const { body } = document;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, []);

  if (!ready || !session) {
    return (
      <div className="flex min-h-full flex-1 items-center justify-center px-4">
        <div className="ops-panel rounded-3xl px-5 py-4 text-sm text-ink-muted">
          Loading precision command workspace...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-20 flex flex-col bg-bg md:flex-row">
      <DashboardNav sessionEmail={session.email} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-line bg-bg/88 px-4 backdrop-blur-xl sm:px-6">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink">
            Command
          </p>
          <div className="flex min-w-0 items-center gap-3">
            <p className="truncate text-xs text-ink-muted">{session.email}</p>
            <span
              className={
                live
                  ? "rounded-full border border-accent/30 bg-accent/12 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent"
                  : "rounded-full border border-line px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink-muted"
              }
            >
              {live ? "Live" : "Idle"}
            </span>
          </div>
        </header>
        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
          <section className="px-4 pt-4 sm:px-6">
            <div className="ops-panel rounded-3xl px-4 py-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="ops-eyebrow">Command layer</p>
                  <h1 className="mt-2 font-display text-xl font-semibold uppercase tracking-[0.16em] text-ink">
                    Precision command
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm text-ink-muted">
                    {live && incident
                      ? `${incident.field.name}, ${incident.field.location.split(",")[0] ?? "Kaduna"}. Open incidents, crew work, weather, and market sit on the same desk.`
                      : "No case on the desk yet. Open an incident to bring Command online."}
                  </p>
                </div>
                <div className="grid w-full gap-3 sm:w-auto sm:grid-cols-2">
                  <div className="ops-metric rounded-2xl px-4 py-3">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                      Operator
                    </p>
                    <p className="mt-2 text-sm font-medium text-ink">{session.email}</p>
                  </div>
                  <div className="ops-metric rounded-2xl px-4 py-3">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                      Status
                    </p>
                    <p className="mt-2 text-sm font-medium text-ink">
                      {live ? "Incident desk live" : "Desk idle"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {children}
        </div>
      </div>
    </div>
  );
}
