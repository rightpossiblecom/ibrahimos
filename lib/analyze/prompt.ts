import type { AssessmentInput } from "@/lib/analyze/types";

export function buildAnalyzePrompt(input: AssessmentInput): string {
  return [
    "You are an agronomy assistant for African smallholder and commercial farms.",
    "Return ONLY valid JSON (no markdown) with these exact keys:",
    "disease (string), category (one of: disease|nutrient|pest|advice),",
    "confidence (number 0-100), treatment (string array), estimatedImpact (string),",
    "fertilizerNote (string), weatherNote (string), nextActions (string array), yieldHint (string).",
    "Be practical, locally relevant, and concise.",
    "",
    `Crop: ${input.crop}`,
    `Symptom / question: ${input.symptom}`,
    `Location: ${input.location}`,
    `Mode: ${input.mode}`,
    input.farmSizeHa != null ? `Farm size (ha): ${input.farmSizeHa}` : "",
    input.notes ? `Notes: ${input.notes}` : "",
    input.imageName ? `Image filename: ${input.imageName}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
