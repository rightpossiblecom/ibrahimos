"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { clearSession, getSession, type Session } from "@/lib/session";

export default function AccountPage() {
  const router = useRouter();
  const [session, setSessionState] = useState<Session | null>(null);

  useEffect(() => {
    setSessionState(getSession());
  }, []);

  function signOut() {
    clearSession();
    router.replace("/login");
  }

  return (
    <main className="px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink">Account</h1>
      <p className="mt-1 text-sm text-ink-muted">Profile and plan for this demo farm</p>

      <div className="mt-8 max-w-lg space-y-4 border border-line bg-bg-elevated p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Email
          </p>
          <p className="mt-1 text-sm font-medium text-ink">
            {session?.email ?? "—"}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Organisation
          </p>
          <p className="mt-1 text-sm font-medium text-ink">Green Ridge Farms</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Plan
          </p>
          <p className="mt-1 text-sm font-medium text-ink">
            Free · {siteConfig.brandName}
          </p>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="mt-4 rounded-md border border-line bg-bg px-4 py-2.5 text-sm font-semibold text-ink hover:bg-bg-elevated"
        >
          Sign out
        </button>
      </div>
    </main>
  );
}
