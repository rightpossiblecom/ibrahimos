import type { Assessment, Incident } from "@/lib/analyze/types";
import {
  ACTIVE_INCIDENT_KEY,
  ASSESSMENTS_KEY,
  DESK_LIVE_KEY,
  notifyDeskChange,
} from "@/lib/desk-keys";

type DeskPayload = {
  live: boolean;
  incident: Incident | null;
  assessments: Assessment[];
};

function canTalkToApi(): boolean {
  return typeof window !== "undefined" && Boolean(window.location?.origin);
}

function writeLocalDesk(payload: DeskPayload): void {
  if (typeof window === "undefined") return;

  if (payload.live && payload.incident) {
    localStorage.setItem(DESK_LIVE_KEY, "1");
    localStorage.setItem(ACTIVE_INCIDENT_KEY, JSON.stringify(payload.incident));
  } else {
    localStorage.removeItem(DESK_LIVE_KEY);
    localStorage.removeItem(ACTIVE_INCIDENT_KEY);
  }

  localStorage.setItem(ASSESSMENTS_KEY, JSON.stringify(payload.assessments ?? []));
}

function readLocalDesk(): DeskPayload {
  if (typeof window === "undefined") {
    return { live: false, incident: null, assessments: [] };
  }

  let incident: Incident | null = null;
  let assessments: Assessment[] = [];
  try {
    const rawIncident = localStorage.getItem(ACTIVE_INCIDENT_KEY);
    incident = rawIncident ? (JSON.parse(rawIncident) as Incident) : null;
  } catch {
    incident = null;
  }
  try {
    const rawAssessments = localStorage.getItem(ASSESSMENTS_KEY);
    assessments = rawAssessments ? (JSON.parse(rawAssessments) as Assessment[]) : [];
  } catch {
    assessments = [];
  }

  return {
    live: localStorage.getItem(DESK_LIVE_KEY) === "1",
    incident,
    assessments: Array.isArray(assessments) ? assessments : [],
  };
}

export async function hydrateDeskRemote(): Promise<void> {
  if (!canTalkToApi()) return;

  const res = await fetch("/api/desk", { cache: "no-store" });
  if (!res.ok) return;

  const payload = (await res.json()) as DeskPayload;
  writeLocalDesk(payload);
  notifyDeskChange();
}

let persistTimer: ReturnType<typeof setTimeout> | null = null;
let persistWaiters: Array<() => void> = [];

export function persistDeskRemote(): Promise<void> {
  if (!canTalkToApi()) return Promise.resolve();

  return new Promise((resolve) => {
    persistWaiters.push(resolve);
    if (persistTimer) clearTimeout(persistTimer);
    persistTimer = setTimeout(() => {
      const waiters = persistWaiters;
      persistWaiters = [];
      persistTimer = null;
      void fetch("/api/desk", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(readLocalDesk()),
      })
        .catch(() => undefined)
        .finally(() => {
          for (const waiter of waiters) waiter();
        });
    }, 80);
  });
}

export async function resetDeskRemote(): Promise<void> {
  if (!canTalkToApi()) return;

  try {
    await fetch("/api/desk", { method: "DELETE" });
  } catch {
    /* local reset still stands */
  }
}
