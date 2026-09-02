import { siteConfig } from "../config/site";
import type {
  Incident,
  IncidentCrewTask,
  IncidentRecoveryState,
} from "./analyze/types";
import { clearAssessments } from "./assessments";
import {
  ACTIVE_INCIDENT_KEY,
  DESK_EVENT,
  DESK_LIVE_KEY,
  notifyDeskChange,
} from "./desk-keys";
import { persistDeskRemote, resetDeskRemote } from "./desk-sync";

export { ACTIVE_INCIDENT_KEY, DESK_EVENT, DESK_LIVE_KEY, notifyDeskChange };

function cloneTask(task: IncidentCrewTask): IncidentCrewTask {
  return { ...task };
}

function seedCopy(): Incident {
  return {
    ...siteConfig.demoIncident,
    field: { ...siteConfig.demoIncident.field },
    zones: siteConfig.demoIncident.zones.map((zone) => ({ ...zone })),
    crewTasks: siteConfig.demoIncident.crewTasks.map(cloneTask),
    recovery: { ...siteConfig.demoIncident.recovery },
    evidenceAssessmentIds: [...siteConfig.demoIncident.evidenceAssessmentIds],
  };
}

function getRecoveryState(
  completion: number,
  deployedAt?: string,
): IncidentRecoveryState {
  if (completion >= 100) return "stabilizing";
  if (completion > 0 || deployedAt) return "responding";
  return "planned";
}

function normalizeIncident(incident: Incident): Incident {
  const completion = incident.crewTasks.length
    ? Math.round(
        (incident.crewTasks.filter((task) => task.complete).length / incident.crewTasks.length) * 100,
      )
    : 0;

  return {
    ...incident,
    field: { ...incident.field },
    zones: incident.zones.map((zone) => ({ ...zone })),
    crewTasks: incident.crewTasks.map(cloneTask),
    evidenceAssessmentIds: [...incident.evidenceAssessmentIds],
    recovery: {
      ...incident.recovery,
      completion,
      state: getRecoveryState(completion, incident.recovery.deployedAt),
      lastUpdatedAt: incident.updatedAt,
    },
  };
}

function isIncident(value: unknown): value is Incident {
  if (!value || typeof value !== "object") return false;

  const incident = value as Partial<Incident>;
  return (
    typeof incident.id === "string" &&
    typeof incident.title === "string" &&
    typeof incident.threat === "string" &&
    typeof incident.assessmentId === "string" &&
    typeof incident.createdAt === "string" &&
    typeof incident.updatedAt === "string" &&
    typeof incident.crop === "string" &&
    typeof incident.severity === "string" &&
    typeof incident.affectedHectares === "number" &&
    typeof incident.responseCost === "number" &&
    typeof incident.deadlineAt === "string" &&
    typeof incident.responseWindowHours === "number" &&
    Array.isArray(incident.evidenceAssessmentIds) &&
    Array.isArray(incident.zones) &&
    Array.isArray(incident.crewTasks) &&
    !!incident.field &&
    typeof incident.field.name === "string" &&
    typeof incident.field.location === "string" &&
    typeof incident.field.totalHectares === "number" &&
    !!incident.recovery &&
    typeof incident.recovery.nextCheckAt === "string"
  );
}

function loadStoredIncident(): Incident | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(ACTIVE_INCIDENT_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as unknown;
    return isIncident(parsed) ? normalizeIncident(parsed) : null;
  } catch {
    return null;
  }
}

function persistIncident(incident: Incident): Incident {
  const normalized = normalizeIncident(incident);
  if (typeof window !== "undefined") {
    localStorage.setItem(ACTIVE_INCIDENT_KEY, JSON.stringify(normalized));
    console.log(`[IbrahimOS Incident] saved ${normalized.id}`);
    void persistDeskRemote();
  }
  return normalized;
}

export function isDeskLive(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(DESK_LIVE_KEY) === "1";
}

function setDeskLive(live: boolean): void {
  if (typeof window === "undefined") return;
  if (live) localStorage.setItem(DESK_LIVE_KEY, "1");
  else localStorage.removeItem(DESK_LIVE_KEY);
}

export function getActiveIncident(): Incident | null {
  if (!isDeskLive()) return null;

  const stored = loadStoredIncident();
  if (stored) return stored;

  return persistIncident(seedCopy());
}

export function saveActiveIncident(incident: Incident): void {
  persistIncident(incident);
}

export function activateSeededIncident(): Incident {
  setDeskLive(true);
  const incident = persistIncident(seedCopy());
  notifyDeskChange();
  return incident;
}

export function updateIncidentTask(taskId: string, complete: boolean): Incident {
  const current = getActiveIncident() ?? activateSeededIncident();
  const next: Incident = {
    ...current,
    updatedAt: new Date().toISOString(),
    crewTasks: current.crewTasks.map((task) =>
      task.id === taskId ? { ...task, complete } : cloneTask(task),
    ),
  };

  return persistIncident(next);
}

export function attachEvidence(assessmentId: string): Incident {
  const current = getActiveIncident() ?? activateSeededIncident();
  const evidenceAssessmentIds = current.evidenceAssessmentIds.includes(assessmentId)
    ? current.evidenceAssessmentIds
    : [assessmentId, ...current.evidenceAssessmentIds];

  return persistIncident({
    ...current,
    assessmentId,
    evidenceAssessmentIds,
    updatedAt: new Date().toISOString(),
  });
}

export function deployCrew(): Incident {
  const current = getActiveIncident() ?? activateSeededIncident();
  return persistIncident({
    ...current,
    updatedAt: new Date().toISOString(),
    recovery: {
      ...current.recovery,
      deployedAt: current.recovery.deployedAt ?? new Date().toISOString(),
    },
  });
}

export function resetIncidentDemo(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ACTIVE_INCIDENT_KEY);
    setDeskLive(false);
    clearAssessments();
    notifyDeskChange();
    void resetDeskRemote();
    console.log("[IbrahimOS Incident] reset desk");
  }
}
