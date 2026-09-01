export type AssessmentInputMode = "upload" | "manual";

export type AssessmentCategory = "disease" | "nutrient" | "pest" | "advice";

export interface AssessmentInput {
  mode: AssessmentInputMode;
  crop: string;
  symptom: string;
  location: string;
  farmSizeHa?: number;
  fieldName?: string;
  notes?: string;
  imageName?: string;
  artifactName?: string;
}

export interface Assessment {
  id: string;
  createdAt: string;
  input: AssessmentInput;
  disease: string;
  category: AssessmentCategory;
  confidence: number;
  treatment: string[];
  estimatedImpact: string;
  fertilizerNote: string;
  weatherNote: string;
  nextActions: string[];
  yieldHint: string;
  incidentId?: string;
  evidenceSource?: "seed" | AssessmentInputMode;
  fieldName?: string;
  artifactName?: string;
}

export type IncidentSeverity = "critical" | "high" | "medium" | "low";

export type IncidentZoneStatus = "active" | "buffer" | "monitor";

export type IncidentRecoveryState = "planned" | "responding" | "stabilizing";

export interface IncidentField {
  name: string;
  location: string;
  totalHectares: number;
}

export interface IncidentZone {
  id: string;
  name: string;
  hectares: number;
  status: IncidentZoneStatus;
  note: string;
}

export interface IncidentCrewTask {
  id: string;
  title: string;
  crew: string;
  complete: boolean;
}

export interface IncidentRecoveryStatus {
  state: IncidentRecoveryState;
  completion: number;
  nextCheckAt: string;
  lastUpdatedAt: string;
  deployedAt?: string;
}

export interface Incident {
  id: string;
  title: string;
  threat: string;
  assessmentId: string;
  evidenceAssessmentIds: string[];
  createdAt: string;
  updatedAt: string;
  field: IncidentField;
  crop: string;
  severity: IncidentSeverity;
  affectedHectares: number;
  responseCost: number;
  deadlineAt: string;
  responseWindowHours: number;
  zones: IncidentZone[];
  crewTasks: IncidentCrewTask[];
  recovery: IncidentRecoveryStatus;
}
