import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { cert, getApps, initializeApp, type ServiceAccount } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "ibrahimos-ops";

function loadServiceAccount(): ServiceAccount {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_B64) {
    return JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_B64, "base64").toString("utf8"),
    ) as ServiceAccount;
  }

  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) as ServiceAccount;
  }

  const filePath = path.join(process.cwd(), "secrets", "service-account.json");
  if (existsSync(filePath)) {
    return JSON.parse(readFileSync(filePath, "utf8")) as ServiceAccount;
  }

  throw new Error("Firebase service account is not configured.");
}

export function isFirebaseAdminConfigured(): boolean {
  return Boolean(
    process.env.FIREBASE_SERVICE_ACCOUNT_B64 ||
      process.env.FIREBASE_SERVICE_ACCOUNT ||
      existsSync(path.join(process.cwd(), "secrets", "service-account.json")),
  );
}

export function adminDb(): Firestore {
  if (!getApps().length) {
    initializeApp({
      credential: cert(loadServiceAccount()),
      projectId: PROJECT_ID,
    });
  }

  return getFirestore();
}
