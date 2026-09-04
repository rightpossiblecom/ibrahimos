"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { clearSession, signIn, signUp } from "@/lib/session";

type Props = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (!email || !password) {
      setError("Enter an email and password to continue.");
      return;
    }

    setPending(true);
    try {
      if (mode === "signup") {
        await signUp(email, password);
        await clearSession();
        setCheckEmail(true);
        setPending(false);
        return;
      }

      await signIn(email, password);
      router.push("/dashboard");
    } catch (next) {
      setError(next instanceof Error ? next.message : "Could not continue.");
      setPending(false);
    }
  }

  const title = mode === "login" ? "Sign in" : "Create account";
  const switchHref = mode === "login" ? "/signup" : "/login";
  const switchLabel =
    mode === "login" ? "Need an account? Sign up" : "Already have an account? Sign in";

  if (mode === "signup" && checkEmail) {
    return (
      <main className="flex min-h-full flex-1 items-center justify-center px-4 py-16">
        <div className="ops-panel w-full max-w-md rounded-3xl p-8">
          <p className="ops-eyebrow">{siteConfig.brandName}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink">Check your email</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            We sent a verification note to your inbox. Open that mail, then log in with the email
            and password you just created. Command stays closed until you sign in.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex w-full justify-center rounded-full bg-accent px-4 py-3 text-sm font-semibold text-gold-ink"
          >
            Go to log in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-full flex-1 items-center justify-center px-4 py-16">
      <div className="ops-panel w-full max-w-md rounded-3xl p-8">
        <p className="ops-eyebrow">{siteConfig.brandName}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink">{title}</h1>
        <p className="mt-2 text-sm text-ink-muted">
          {mode === "login"
            ? "Sign in with the email and password you created. Your farm desk loads from your account."
            : "Create an account. Check your email to verify — Command does not open from signup."}
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
          <label className="block">
            <span className="text-sm font-medium text-ink">Email</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              className="mt-1.5 w-full rounded-md border border-line bg-bg px-3 py-2.5 text-sm outline-none"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">Password</span>
            <input
              name="password"
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              className="mt-1.5 w-full rounded-md border border-line bg-bg px-3 py-2.5 text-sm outline-none"
            />
          </label>
          {mode === "signup" ? (
            <p className="text-xs text-ink-muted">Use at least 8 characters.</p>
          ) : null}
          {error ? (
            <p className="text-sm text-warning" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-accent px-4 py-3 text-sm font-semibold text-gold-ink disabled:opacity-60"
          >
            {pending ? "Working…" : title}
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
