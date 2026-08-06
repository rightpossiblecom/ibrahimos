import { siteConfig } from "@/config/site";

export const SESSION_KEY = `${siteConfig.shortName}_session`;

export interface Session {
  email: string;
  createdAt: string;
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function setSession(email: string): Session {
  const session: Session = {
    email: email.trim(),
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  console.log(`[IbrahimOS Auth] session start`);
  return session;
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
  console.log(`[IbrahimOS Auth] sign out`);
}
