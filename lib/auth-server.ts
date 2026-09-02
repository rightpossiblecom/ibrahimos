import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { adminDb } from "@/lib/firebase-admin";

export const SESSION_COOKIE = "ibrahimos_session";
const SESSION_DAYS = 30;

export type AuthUser = {
  uid: string;
  email: string;
};

type UserRecord = {
  uid: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
};

function sessionSecret(): string {
  const secret = process.env.IBRAHIMOS_SESSION_SECRET;
  if (!secret) throw new Error("IBRAHIMOS_SESSION_SECRET is missing.");
  return secret;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function hashPassword(password: string, salt: string): string {
  return scryptSync(password, salt, 64).toString("hex");
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

export async function createUser(email: string, password: string): Promise<AuthUser> {
  const normalized = normalizeEmail(email);
  if (!normalized || !normalized.includes("@")) {
    throw new Error("Enter a valid email.");
  }
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  const db = adminDb();
  const accountRef = db.collection("accounts").doc(normalized);
  const existing = await accountRef.get();
  if (existing.exists) {
    throw new Error("An account with that email already exists.");
  }

  const uid = randomBytes(16).toString("hex");
  const salt = randomBytes(16).toString("hex");
  const createdAt = new Date().toISOString();
  const record: UserRecord = {
    uid,
    email: normalized,
    passwordHash: hashPassword(password, salt),
    passwordSalt: salt,
    createdAt,
  };

  const batch = db.batch();
  batch.create(accountRef, { uid, email: normalized, createdAt });
  batch.create(db.collection("users").doc(uid), record);
  batch.set(db.collection("users").doc(uid).collection("desk").doc("current"), {
    live: false,
    incident: null,
    assessments: [],
    updatedAt: createdAt,
  });
  await batch.commit();

  return { uid, email: normalized };
}

export async function verifyUser(email: string, password: string): Promise<AuthUser> {
  const normalized = normalizeEmail(email);
  const db = adminDb();
  const account = await db.collection("accounts").doc(normalized).get();
  if (!account.exists) {
    throw new Error("Email or password is wrong.");
  }

  const uid = String(account.data()?.uid ?? "");
  const user = await db.collection("users").doc(uid).get();
  const record = user.data() as UserRecord | undefined;
  if (!record?.passwordHash || !record.passwordSalt) {
    throw new Error("Email or password is wrong.");
  }

  const nextHash = hashPassword(password, record.passwordSalt);
  const left = Buffer.from(nextHash);
  const right = Buffer.from(record.passwordHash);
  if (left.length !== right.length || !timingSafeEqual(left, right)) {
    throw new Error("Email or password is wrong.");
  }

  return { uid: record.uid, email: record.email };
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
