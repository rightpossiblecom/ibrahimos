import type { Assessment, Incident } from "@/lib/analyze/types";
import { adminDb } from "@/lib/firebase-admin";
import { col } from "@/lib/house";

function deskRef(uid: string) {
  return adminDb().collection(col("users")).doc(uid).collection("desk").doc("current");
}

export type DeskState = {
  live: boolean;
  incident: Incident | null;
  assessments: Assessment[];
};

export async function readDesk(uid: string): Promise<DeskState> {
  const snap = await deskRef(uid).get();
  const data = snap.data();
  if (!data) {
    return { live: false, incident: null, assessments: [] };
  }

  return {
    live: Boolean(data.live),
    incident: (data.incident as Incident | null) ?? null,
    assessments: Array.isArray(data.assessments) ? (data.assessments as Assessment[]) : [],
  };
}

export async function writeDesk(uid: string, state: DeskState): Promise<DeskState> {
  const next: DeskState = {
    live: Boolean(state.live),
    incident: state.incident ?? null,
    assessments: Array.isArray(state.assessments) ? state.assessments : [],
  };

  await deskRef(uid).set({
    ...next,
    updatedAt: new Date().toISOString(),
  });

  return next;
}

export async function resetDesk(uid: string): Promise<DeskState> {
  return writeDesk(uid, { live: false, incident: null, assessments: [] });
}
