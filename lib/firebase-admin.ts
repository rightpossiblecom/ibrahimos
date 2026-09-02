import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { cert, getApps, initializeApp, type ServiceAccount } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

const PROJECT_ID = process.env.CLOUDGRANT_GCP_PROJECT ?? "woven-benefit-434807-g6";

function loadServiceAccount(): ServiceAccount {
  if (process.env.CLOUDGRANT_SERVICE_ACCOUNT) {
    return JSON.parse(process.env.CLOUDGRANT_SERVICE_ACCOUNT) as ServiceAccount;
  }

  if (process.env.FIREBASE_SERVICE_ACCOUNT_B64) {
    return JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_B64, "base64").toString("utf8"),
    ) as ServiceAccount;
  }

  const local = path.join(process.cwd(), "secrets", "service-account.json");
  const vault = path.join(
    "C:",
    "Users",
    "mr_right",
    "Desktop",
    "projects",
    "CloudGrant",
    "01docs",
    "secrets",
    "firebase-adminsdk.json",
  );
  for (const filePath of [local, vault]) {
    if (existsSync(filePath)) {
      return JSON.parse(readFileSync(filePath, "utf8")) as ServiceAccount;
    }
  }

  throw new Error("CLOUDGRANT_SERVICE_ACCOUNT is missing. Copy 01docs/cloudgrant.env to .env.local.");
}

export function isFirebaseAdminConfigured(): boolean {
  return Boolean(
    process.env.CLOUDGRANT_SERVICE_ACCOUNT ||
      process.env.FIREBASE_SERVICE_ACCOUNT_B64 ||
      existsSync(path.join(process.cwd(), "secrets", "service-account.json")) ||
      existsSync(
        path.join(
          "C:",
          "Users",
          "mr_right",
          "Desktop",
          "projects",
          "CloudGrant",
          "01docs",
          "secrets",
          "firebase-adminsdk.json",
        ),
      ),
  );
}

function ensureApp() {
  if (!getApps().length) {
    initializeApp({
      credential: cert(loadServiceAccount()),
      projectId: PROJECT_ID,
    });
  }
}

export function adminDb(): Firestore {
  ensureApp();
  return getFirestore();
}

export function adminAuth(): Auth {
  ensureApp();
  return getAuth();
}
