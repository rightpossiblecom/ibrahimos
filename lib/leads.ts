import { siteConfig } from "@/config/site";

export const LEADS_KEY = `${siteConfig.shortName}_leads`;

export type LeadFormId = "waitlist" | "demo" | "early-access";

export interface Lead {
  id: string;
  createdAt: string;
  form: LeadFormId;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  org?: string;
  role?: string;
  message?: string;
  intent?: string;
}

export function listLeads(): Lead[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(LEADS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

export function saveLead(
  input: Omit<Lead, "id" | "createdAt">,
): Lead {
  const lead: Lead = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const next = [lead, ...listLeads()];
  if (typeof window !== "undefined") {
    localStorage.setItem(LEADS_KEY, JSON.stringify(next));
    void fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    }).catch(() => undefined);
  }
  console.log(`[IbrahimOS Lead] saved ${lead.form} ${lead.id}`);
  return lead;
}
