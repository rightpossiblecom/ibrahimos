import { siteConfig } from "../config/site";
import type {
  Incident,
  IncidentCrewTask,
  IncidentRecoveryState,
} from "./analyze/types";

export const ACTIVE_INCIDENT_KEY = `${siteConfig.shortName}_active_incident`;

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

function getRecoveryState(completion: number): IncidentRecoveryState {
  if (completion >= 100) return "stabilizing";
  if (completion > 0) return "responding";
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
      state: getRecoveryState(completion),
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
  }
  return normalized;
}

export function getActiveIncident(): Incident {
  const stored = loadStoredIncident();
  if (stored) return stored;

  const seeded = seedCopy();
  if (typeof window !== "undefined") {
    localStorage.setItem(ACTIVE_INCIDENT_KEY, JSON.stringify(seeded));
  }
  return seeded;
}

export function saveActiveIncident(incident: Incident): void {
  persistIncident(incident);
}

export function updateIncidentTask(taskId: string, complete: boolean): Incident {
  const current = getActiveIncident();
  const next: Incident = {
    ...current,
    updatedAt: new Date().toISOString(),
    crewTasks: current.crewTasks.map((task) =>
      task.id === taskId ? { ...task, complete } : cloneTask(task),
    ),
  };

  return persistIncident(next);
}

export function resetIncidentDemo(): void {
  const seeded = seedCopy();
  if (typeof window !== "undefined") {
    localStorage.setItem(ACTIVE_INCIDENT_KEY, JSON.stringify(seeded));
    console.log(`[IbrahimOS Incident] reset ${seeded.id}`);
  }
}
