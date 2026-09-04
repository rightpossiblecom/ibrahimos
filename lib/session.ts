export interface Session {
  uid: string;
  email: string;
  createdAt?: string;
}

let cached: Session | null | undefined;

export function getSession(): Session | null {
  return cached ?? null;
}

export async function fetchSession(): Promise<Session | null> {
  try {
    const res = await fetch("/api/auth/me", { cache: "no-store" });
    if (!res.ok) {
      cached = null;
      return null;
    }
    const data = (await res.json()) as { user?: Session | null };
    cached = data.user ?? null;
    return cached;
  } catch {
    cached = null;
    return null;
  }
}

export async function signIn(email: string, password: string): Promise<Session> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = (await res.json()) as { user?: Session; error?: string };
  if (!res.ok || !data.user) {
    throw new Error(data.error ?? "Could not sign in.");
  }
  cached = data.user;
  return data.user;
}

export async function signUp(email: string, password: string): Promise<void> {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = (await res.json()) as { ok?: boolean; error?: string };
  if (!res.ok || !data.ok) {
    throw new Error(data.error ?? "Could not create the account.");
  }
  cached = null;
}

export async function clearSession(): Promise<void> {
  cached = null;
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch {
    /* still clear local cache */
  }
}
