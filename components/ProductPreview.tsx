import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { formatNgn } from "@/lib/format-currency";

const demoIncident = siteConfig.demoIncident;
const demoAssessment = siteConfig.demoResults[0];

export function ProductPreview({
  variant = "command",
}: {
  variant?: "command" | "intake" | "incident" | "recovery" | "overview" | "assessment" | "market";
}) {
  const resolved =
    variant === "overview"
      ? "command"
      : variant === "assessment"
        ? "incident"
        : variant === "market"
          ? "recovery"
          : variant;

  if (resolved === "intake") {
    return (
      <PreviewFrame title="Intake · New incident">
        <p className="ops-eyebrow">Sample artifact</p>
        <p className="mt-2 font-display text-xl font-semibold text-ink">
          {demoAssessment.artifactName}
        </p>
        <p className="mt-2 text-sm text-ink-muted">
          {demoIncident.crop} · {demoIncident.field.name} · {demoIncident.field.location}
        </p>
        <p className="mt-4 rounded-2xl border border-line bg-panel-strong px-4 py-3 text-sm text-ink-muted">
          {demoAssessment.input.symptom}
        </p>
      </PreviewFrame>
    );
  }

  if (resolved === "incident") {
    return (
      <PreviewFrame title="Incident Room · North Block 04">
        <p className="ops-eyebrow">Active incident</p>
        <p className="mt-2 font-display text-2xl font-semibold text-ink">{demoIncident.threat}</p>
        <p className="mt-1 text-sm text-warning">
          {demoIncident.severity} risk · {demoAssessment.confidence}% confidence
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Metric label="At risk" value={`${demoIncident.affectedHectares} ha`} />
          <Metric label="Response" value={formatNgn(demoIncident.responseCost)} />
          <Metric label="Window" value={`${demoIncident.responseWindowHours}h`} />
        </div>
      </PreviewFrame>
    );
  }

  if (resolved === "recovery") {
    return (
      <PreviewFrame title="Recovery · 72-hour check">
        <p className="ops-eyebrow">Next check</p>
        <p className="mt-2 font-display text-xl font-semibold text-ink">Thursday dawn survey</p>
        <ul className="mt-4 space-y-2 text-sm text-ink-muted">
          {demoIncident.crewTasks.map((task) => (
            <li key={task.id} className="rounded-xl border border-line px-3 py-2">
              {task.title}
            </li>
          ))}
        </ul>
      </PreviewFrame>
    );
  }

  return (
    <PreviewFrame title="Command · Kaduna live">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="ops-eyebrow">Active incident</p>
          <p className="mt-2 font-display text-xl font-semibold text-ink">{demoIncident.field.name}</p>
          <p className="mt-1 text-sm text-warning">{demoIncident.threat} · High risk</p>
        </div>
        <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-gold-ink">
          Deploy crew
        </span>
      </div>
      <div
        className="mt-5 h-28 rounded-2xl border border-line"
        style={{
          background:
            "radial-gradient(circle at 72% 35%, #ff6b4a 0 5px, transparent 6px), radial-gradient(circle at 58% 60%, #ff6b4a 0 4px, transparent 5px), repeating-linear-gradient(105deg, #17201c 0 18px, #1d2823 19px 20px)",
        }}
      />
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Metric label="Response" value={formatNgn(demoIncident.responseCost)} />
        <Metric label="At risk" value={`${demoIncident.affectedHectares} ha`} />
        <Metric label="Deadline" value="06:12" />
      </div>
    </PreviewFrame>
  );
}

function PreviewFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="ops-panel overflow-hidden rounded-[1.6rem] shadow-[0_28px_60px_rgba(0,0,0,.38)]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
        <span className="h-2 w-2 rounded-full bg-white/20" aria-hidden />
        <span className="h-2 w-2 rounded-full bg-white/10" aria-hidden />
        <span className="ml-2 text-xs font-medium text-ink-muted">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="ops-metric rounded-xl px-3 py-2">
      <p className="text-[10px] uppercase tracking-wider text-ink-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}
