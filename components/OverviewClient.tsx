"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Assessment, AssessmentCategory, Incident } from "@/lib/analyze/types";
import { listAssessments } from "@/lib/assessments";
import {
  getActiveIncident,
  resetIncidentDemo,
  updateIncidentTask,
} from "@/lib/incidents";

const CATEGORY_COLORS: Record<AssessmentCategory, string> = {
  disease: "#2d6a4f",
  nutrient: "#c9a227",
  pest: "#1b4332",
  advice: "#3d4f45",
};

export function OverviewClient() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [incident, setIncident] = useState<Incident | null>(null);

  useEffect(() => {
    function refresh() {
      setAssessments(listAssessments());
      setIncident(getActiveIncident());
    }

    refresh();
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    document.addEventListener("visibilitychange", refresh);

    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  if (!incident) return null;

  const completedTasks = incident.crewTasks.filter((task) => task.complete).length;
  const openTasks = incident.crewTasks.length - completedTasks;
  const assessmentMix = buildAssessmentMix(assessments);
  const deadlineLabel = formatTimestamp(incident.deadlineAt);
  const nextCheckLabel = formatTimestamp(incident.recovery.nextCheckAt);

  return (
    <main className="px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">
            Overview
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            Farm health, weather, and recent AI assessments
          </p>
        </div>
        <Link
          href="/new"
          className="rounded-md bg-gold px-4 py-2.5 text-sm font-semibold text-gold-ink hover:opacity-90"
        >
          New incident
        </Link>
      </div>

      {/* KPI cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Active incident" value="1" hint={`${incident.field.name} · ${incident.severity} severity`} />
        <Kpi label="Hectares at risk" value={`${incident.affectedHectares} ha`} hint={`${incident.zones.length} monitored zones`} />
        <Kpi label="Response cost" value={formatNaira(incident.responseCost)} hint={`${incident.responseWindowHours}-hour action window`} />
        <Kpi label="Crew progress" value={`${completedTasks}/${incident.crewTasks.length}`} hint={`${incident.recovery.completion}% complete`} />
      </div>

      <div className="mt-4 border border-line bg-bg-elevated p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
          Live incident
        </p>
        <ul className="mt-3 space-y-2">
          {[
            { label: "Field", summary: `${incident.field.name} · ${incident.field.location} · ${incident.field.totalHectares} ha` },
            { label: "Window", summary: `Deadline ${deadlineLabel}` },
            { label: "Recovery", summary: `${incident.recovery.state} · next check ${nextCheckLabel}` },
          ].map((row) => (
            <li
              key={row.label}
              className="flex flex-wrap gap-2 text-sm text-ink-muted"
            >
              <span className="w-20 font-semibold text-ink">{row.label}</span>
              <span>{row.summary}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ≥2 charts */}
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="border border-line bg-bg-elevated p-5">
          <h2 className="font-display text-lg font-semibold text-ink">
            Affected zones
          </h2>
          <p className="mt-1 text-xs text-ink-muted">North Block 04 hectares at risk by zone</p>
          <ZoneChart incident={incident} />
        </div>
        <div className="border border-line bg-bg-elevated p-5">
          <h2 className="font-display text-lg font-semibold text-ink">
            Evidence mix
          </h2>
          <p className="mt-1 text-xs text-ink-muted">Derived from stored assessment evidence</p>
          <MixChart rows={assessmentMix} />
        </div>
      </div>

      <section className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl font-semibold text-ink">
            Crew tasks
          </h2>
          <button
            type="button"
            onClick={() => {
              resetIncidentDemo();
              setIncident(getActiveIncident());
              setAssessments(listAssessments());
            }}
            className="rounded-md border border-line bg-bg-elevated px-3 py-2 text-xs font-semibold uppercase tracking-wider text-ink hover:bg-bg"
          >
            Reset Kaduna seed
          </button>
        </div>
        <ul className="mt-3 space-y-2">
          {incident.crewTasks.map((task) => (
            <li
              key={task.id}
              className="border border-line bg-bg-elevated px-4 py-3"
            >
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={task.complete}
                  onChange={(event) => {
                    setIncident(updateIncidentTask(task.id, event.target.checked));
                  }}
                  className="mt-1 h-4 w-4 accent-[#2d6a4f]"
                />
                <span>
                  <span className="block text-sm font-semibold text-ink">
                    {task.title}
                  </span>
                  <span className="mt-1 block text-xs text-ink-muted">
                    {task.crew}
                    {task.complete ? " · complete" : " · open"}
                  </span>
                </span>
              </label>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-ink-muted">
          {openTasks} open tasks remain on the active response plan.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold text-ink">
          Recent assessments
        </h2>
        <ul className="mt-3 divide-y divide-line border border-line bg-bg-elevated">
          {assessments.map((item) => (
            <li key={item.id}>
              <Link
                href={`/projects/${item.id}`}
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 hover:bg-bg"
              >
                <div>
                  <p className="text-sm font-semibold text-ink">{item.disease}</p>
                  <p className="text-xs text-ink-muted">
                    {item.fieldName ?? item.input.fieldName ?? item.input.crop} · {item.input.location}
                  </p>
                </div>
                <span className="text-xs font-medium text-accent">
                  {item.confidence}% · {item.category}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function Kpi({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="border border-line bg-bg-elevated p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl font-semibold text-accent">
        {value}
      </p>
      <p className="mt-1 text-sm text-ink-muted">{hint}</p>
    </div>
  );
}

function ZoneChart({ incident }: { incident: Incident }) {
  const max = Math.max(...incident.zones.map((zone) => zone.hectares));

  return (
    <ul className="mt-4 space-y-3" aria-label="Affected zones chart">
      {incident.zones.map((zone) => (
        <li key={zone.id}>
          <div className="flex justify-between gap-3 text-xs text-ink-muted">
            <span>{zone.name}</span>
            <span>{zone.hectares} ha</span>
          </div>
          <div className="mt-1 h-2 w-full bg-bg">
            <div
              className="h-2"
              style={{
                width: `${(zone.hectares / max) * 100}%`,
                backgroundColor:
                  zone.status === "active"
                    ? "#2d6a4f"
                    : zone.status === "buffer"
                      ? "#c9a227"
                      : "#3d4f45",
              }}
            />
          </div>
          <p className="mt-1 text-xs text-ink-muted">{zone.note}</p>
        </li>
      ))}
    </ul>
  );
}

function MixChart({
  rows,
}: {
  rows: { label: string; value: number; color: string }[];
}) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <ul className="mt-4 space-y-3" aria-label="Assessment mix chart">
      {rows.map((row) => (
        <li key={row.label}>
          <div className="flex justify-between text-xs text-ink-muted">
            <span>{row.label}</span>
            <span>{row.value}%</span>
          </div>
          <div className="mt-1 h-2 w-full bg-bg">
            <div
              className="h-2"
              style={{
                width: `${(row.value / max) * 100}%`,
                backgroundColor: row.color,
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function buildAssessmentMix(assessments: Assessment[]) {
  const counts: Record<AssessmentCategory, number> = {
    disease: 0,
    nutrient: 0,
    pest: 0,
    advice: 0,
  };

  for (const assessment of assessments) {
    counts[assessment.category] += 1;
  }

  const total = assessments.length || 1;
  return (Object.keys(counts) as AssessmentCategory[]).map((category) => ({
    label: category.charAt(0).toUpperCase() + category.slice(1),
    value: Math.round((counts[category] / total) * 100),
    color: CATEGORY_COLORS[category],
  }));
}

function formatNaira(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatTimestamp(value: string) {
  return new Date(value).toLocaleString("en-NG", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}
