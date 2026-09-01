"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardNav } from "@/components/DashboardNav";
import { getSession, type Session } from "@/lib/session";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
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
    <div className="flex min-h-full flex-1 flex-col md:flex-row">
      <DashboardNav sessionEmail={session.email} />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="border-b border-line px-4 py-4 sm:px-6">
          <div className="ops-panel rounded-3xl px-4 py-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="ops-eyebrow">Command layer</p>
                <h1 className="mt-2 font-display text-xl font-semibold uppercase tracking-[0.16em] text-ink">
                  Precision command
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-ink-muted">
                  Monitor field diagnostics, move through incidents, and pivot into
                  weather or market intelligence from one workspace shell.
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
                  <p className="mt-2 text-sm font-medium text-ink">Demo-ready shell online</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
