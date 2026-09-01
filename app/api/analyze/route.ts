import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { proceduralAnalyze } from "@/lib/analyze/procedural";
import { buildAnalyzePrompt } from "@/lib/analyze/prompt";
import type {
  Assessment,
  AssessmentCategory,
  AssessmentInput,
} from "@/lib/analyze/types";

const CATEGORIES: AssessmentCategory[] = [
  "disease",
  "nutrient",
  "pest",
  "advice",
];

function isAssessmentInput(body: unknown): body is AssessmentInput {
  if (!body || typeof body !== "object") return false;
  const value = body as Record<string, unknown>;
  return (
    typeof value.crop === "string" &&
    typeof value.symptom === "string" &&
    typeof value.location === "string" &&
    (value.mode === "upload" || value.mode === "manual")
  );
}

function normalizeAssessment(
  partial: Partial<Assessment>,
  input: AssessmentInput,
): Assessment | null {
  if (
    typeof partial.disease !== "string" ||
    typeof partial.confidence !== "number" ||
    !Array.isArray(partial.treatment) ||
    typeof partial.estimatedImpact !== "string" ||
    typeof partial.fertilizerNote !== "string" ||
    typeof partial.weatherNote !== "string" ||
    !Array.isArray(partial.nextActions) ||
    typeof partial.yieldHint !== "string"
  ) {
    return null;
  }

  const category = CATEGORIES.includes(partial.category as AssessmentCategory)
    ? (partial.category as AssessmentCategory)
    : "advice";

  return {
    id:
      typeof partial.id === "string" && partial.id
        ? partial.id
        : crypto.randomUUID(),
    createdAt:
      typeof partial.createdAt === "string" && partial.createdAt
        ? partial.createdAt
        : new Date().toISOString(),
    input,
    disease: partial.disease,
    category,
    confidence: Math.max(0, Math.min(100, partial.confidence)),
    treatment: partial.treatment.map(String),
    estimatedImpact: partial.estimatedImpact,
    fertilizerNote: partial.fertilizerNote,
    weatherNote: partial.weatherNote,
    nextActions: partial.nextActions.map(String),
    yieldHint: partial.yieldHint,
    incidentId:
      typeof partial.incidentId === "string" ? partial.incidentId : undefined,
    evidenceSource:
      partial.evidenceSource === "seed" ||
      partial.evidenceSource === "upload" ||
      partial.evidenceSource === "manual"
        ? partial.evidenceSource
        : input.mode,
    fieldName:
      typeof partial.fieldName === "string"
        ? partial.fieldName
        : input.fieldName,
    artifactName:
      typeof partial.artifactName === "string"
        ? partial.artifactName
        : input.artifactName,
  };
}

async function analyzeWithGemini(
  input: AssessmentInput,
): Promise<Assessment | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(buildAnalyzePrompt(input));
  const text = result.response.text().trim();
  const jsonText = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "");
  const parsed = JSON.parse(jsonText) as Partial<Assessment>;
  return normalizeAssessment(parsed, input);
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isAssessmentInput(body)) {
    return NextResponse.json(
      { error: "crop, symptom, location, and mode are required" },
      { status: 400 },
    );
  }

  const input: AssessmentInput = {
    mode: body.mode,
    crop: body.crop.trim(),
    symptom: body.symptom.trim(),
    location: body.location.trim(),
    farmSizeHa:
      typeof body.farmSizeHa === "number" ? body.farmSizeHa : undefined,
    fieldName: typeof body.fieldName === "string" ? body.fieldName : undefined,
    notes: typeof body.notes === "string" ? body.notes : undefined,
    imageName: typeof body.imageName === "string" ? body.imageName : undefined,
    artifactName:
      typeof body.artifactName === "string" ? body.artifactName : undefined,
  };

  if (!input.crop || !input.symptom || !input.location) {
    return NextResponse.json(
      { error: "crop, symptom, and location are required" },
      { status: 400 },
    );
  }

  try {
    if (process.env.GEMINI_API_KEY) {
      const geminiResult = await analyzeWithGemini(input);
      if (geminiResult) {
        console.log(`[IbrahimOS Analyze] gemini ${geminiResult.id}`);
        return NextResponse.json(geminiResult);
      }
    }
  } catch {
    // fall through to procedural
  }

  const assessment = proceduralAnalyze(input);
  console.log(`[IbrahimOS Analyze] procedural ${assessment.id}`);
  return NextResponse.json(assessment);
}
