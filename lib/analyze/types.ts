export type AssessmentInputMode = "upload" | "manual";

export type AssessmentCategory = "disease" | "nutrient" | "pest" | "advice";

export interface AssessmentInput {
  mode: AssessmentInputMode;
  crop: string;
  symptom: string;
  location: string;
  farmSizeHa?: number;
  notes?: string;
  imageName?: string;
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
}
