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
    setSessionState(current);
    setReady(true);
  }, [router]);

  if (!ready || !session) {
    return (
      <div className="flex min-h-full flex-1 items-center justify-center text-sm text-ink-muted">
        Loading farm workspace…
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-1 flex-col md:flex-row">
      <DashboardNav />
      <div className="flex min-w-0 flex-1 flex-col bg-bg">{children}</div>
    </div>
  );
}
