import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? process.env.CLOUDGRANT_WEB_API_KEY ?? "",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ??
    process.env.CLOUDGRANT_AUTH_DOMAIN ??
    "woven-benefit-434807-g6.firebaseapp.com",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ??
    process.env.CLOUDGRANT_GCP_PROJECT ??
    "woven-benefit-434807-g6",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ??
    process.env.CLOUDGRANT_STORAGE_BUCKET ??
    "woven-benefit-434807-g6.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ??
    process.env.CLOUDGRANT_MESSAGING_SENDER_ID ??
    "193915409645",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? process.env.CLOUDGRANT_APP_ID ?? "",
};

export function firebaseApp() {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export const auth = getAuth(firebaseApp());
