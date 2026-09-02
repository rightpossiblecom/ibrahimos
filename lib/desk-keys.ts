import { siteConfig } from "../config/site";

export const ACTIVE_INCIDENT_KEY = `${siteConfig.shortName}_active_incident`;
export const DESK_LIVE_KEY = `${siteConfig.shortName}_desk_live`;
export const ASSESSMENTS_KEY = `${siteConfig.shortName}_assessments`;
export const DESK_EVENT = "ibrahimos-desk";

export function notifyDeskChange(): void {
  if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
    window.dispatchEvent(new Event(DESK_EVENT));
  }
}
