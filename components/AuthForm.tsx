"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { setSession } from "@/lib/session";

type Props = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (!email || !password) {
      setError("Enter an email and password to continue.");
      return;
    }

    setSession(email);
    router.push("/dashboard");
  }

  const title = mode === "login" ? "Sign in" : "Create account";
  const switchHref = mode === "login" ? "/signup" : "/login";
  const switchLabel =
    mode === "login" ? "Need an account? Sign up" : "Already have an account? Sign in";

  return (
    <main className="flex min-h-full flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md border border-line bg-bg-elevated p-8">
        <p className="font-display text-lg font-semibold text-accent-deep">
          {siteConfig.brandName}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
          {title}
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          Demo access — any email and password works.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
          <label className="block">
            <span className="text-sm font-medium text-ink">Email</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              className="mt-1.5 w-full rounded-md border border-line bg-bg px-3 py-2.5 text-sm outline-none ring-accent focus:ring-2"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">Password</span>
            <input
              name="password"
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              className="mt-1.5 w-full rounded-md border border-line bg-bg px-3 py-2.5 text-sm outline-none ring-accent focus:ring-2"
            />
          </label>
          {error ? (
            <p className="text-sm text-red-800" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            className="w-full rounded-md bg-gold px-4 py-3 text-sm font-semibold text-gold-ink hover:opacity-90"
          >
            {title}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-ink-muted">
          <Link href={switchHref} className="font-medium text-accent hover:underline">
            {switchLabel}
          </Link>
        </p>
      </div>
    </main>
  );
}
