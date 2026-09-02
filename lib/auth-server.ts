import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { col } from "@/lib/house";

export const SESSION_COOKIE = "ibrahimos_session";
const SESSION_DAYS = 30;

export type AuthUser = {
  uid: string;
  email: string;
};

function sessionSecret(): string {
  const secret = process.env.CLOUDGRANT_SESSION_SECRET ?? process.env.IBRAHIMOS_SESSION_SECRET;
  if (!secret) throw new Error("CLOUDGRANT_SESSION_SECRET is missing.");
  return secret;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function webApiKey(): string {
  const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? process.env.CLOUDGRANT_WEB_API_KEY;
  if (!key) throw new Error("Firebase web API key is missing.");
  return key;
}

function signSession(user: AuthUser, exp: number): string {
  const body = Buffer.from(JSON.stringify({ ...user, exp })).toString("base64url");
  const sig = createHmac("sha256", sessionSecret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function readSession(token: string): AuthUser | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;

  const expected = createHmac("sha256", sessionSecret()).update(body).digest("base64url");
  const left = Buffer.from(sig);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as AuthUser & {
      exp?: number;
    };
    if (!payload.uid || !payload.email || !payload.exp || payload.exp < Date.now()) return null;
    return { uid: payload.uid, email: payload.email };
  } catch {
    return null;
  }
}

function authMessage(code: string | undefined, fallback: string): string {
  if (code === "auth/email-already-exists" || code === "EMAIL_EXISTS") {
    return "An account with that email already exists.";
  }
  if (
    code === "EMAIL_NOT_FOUND" ||
    code === "INVALID_PASSWORD" ||
    code === "INVALID_LOGIN_CREDENTIALS" ||
    code === "INVALID_EMAIL"
  ) {
    return "Email or password is wrong.";
  }
  if (code === "WEAK_PASSWORD" || code === "auth/weak-password") {
    return "Password must be at least 8 characters.";
  }
  return fallback;
}

async function writeUserDoc(user: AuthUser): Promise<void> {
  const createdAt = new Date().toISOString();
  const userRef = adminDb().collection(col("users")).doc(user.uid);
  const deskRef = userRef.collection("desk").doc("current");
  const existing = await userRef.get();
  if (!existing.exists) {
    await userRef.set({ uid: user.uid, email: user.email, createdAt });
  }
  const desk = await deskRef.get();
  if (!desk.exists) {
    await deskRef.set({
      live: false,
      incident: null,
      assessments: [],
      updatedAt: createdAt,
    });
  }
}

export async function createUser(email: string, password: string): Promise<AuthUser> {
  const normalized = normalizeEmail(email);
  if (!normalized || !normalized.includes("@")) {
    throw new Error("Enter a valid email.");
  }
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  try {
    const record = await adminAuth().createUser({
      email: normalized,
      password,
    });
    const user = { uid: record.uid, email: normalized };
    await writeUserDoc(user);
    return user;
  } catch (error) {
    const code = typeof error === "object" && error && "code" in error ? String(error.code) : undefined;
    throw new Error(authMessage(code, error instanceof Error ? error.message : "Could not create the account."));
  }
}

export async function verifyUser(email: string, password: string): Promise<AuthUser> {
  const normalized = normalizeEmail(email);
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${webApiKey()}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: normalized, password, returnSecureToken: true }),
    },
  );
  const json = (await res.json()) as {
    localId?: string;
    email?: string;
    error?: { message?: string };
  };

  if (!res.ok || !json.localId) {
    throw new Error(authMessage(json.error?.message, "Email or password is wrong."));
  }

  const user = { uid: json.localId, email: json.email ?? normalized };
  await writeUserDoc(user);
  return user;
}

export async function writeSessionCookie(user: AuthUser): Promise<void> {
  const exp = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const jar = await cookies();
  jar.set(SESSION_COOKIE, signSession(user, exp), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(exp),
  });
}

export async function clearSessionCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function getRequestUser(): Promise<AuthUser | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return readSession(token);
}
