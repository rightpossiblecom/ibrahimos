import { siteConfig } from "@/config/site";
import type { Assessment } from "@/lib/analyze/types";

export const ASSESSMENTS_KEY = `${siteConfig.shortName}_assessments`;

export function listAssessments(): Assessment[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(ASSESSMENTS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as Assessment[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getAssessment(id: string): Assessment | null {
  return listAssessments().find((item) => item.id === id) ?? null;
}

export function clearAssessments(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ASSESSMENTS_KEY);
  }
}

export function saveAssessment(assessment: Assessment): void {
  const current = listAssessments().filter((item) => item.id !== assessment.id);
  const next = [assessment, ...current];
  localStorage.setItem(ASSESSMENTS_KEY, JSON.stringify(next));
  console.log(`[IbrahimOS Assessment] saved ${assessment.id}`);
}
