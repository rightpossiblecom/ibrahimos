import { siteConfig } from "@/config/site";
import type { Assessment } from "@/lib/analyze/types";

export const ASSESSMENTS_KEY = `${siteConfig.shortName}_assessments`;

function seedCopy(): Assessment[] {
  return siteConfig.demoResults.map((item) => ({ ...item, input: { ...item.input } }));
}

export function listAssessments(): Assessment[] {
  if (typeof window === "undefined") return seedCopy();
  const raw = localStorage.getItem(ASSESSMENTS_KEY);
  if (!raw) return seedCopy();
  try {
    const parsed = JSON.parse(raw) as Assessment[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : seedCopy();
  } catch {
    return seedCopy();
  }
}

export function getAssessment(id: string): Assessment | null {
  return listAssessments().find((item) => item.id === id) ?? null;
}

export function saveAssessment(assessment: Assessment): void {
  const current = listAssessments().filter((item) => item.id !== assessment.id);
  const next = [assessment, ...current];
  localStorage.setItem(ASSESSMENTS_KEY, JSON.stringify(next));
  console.log(`[IbrahimOS Assessment] saved ${assessment.id}`);
}
