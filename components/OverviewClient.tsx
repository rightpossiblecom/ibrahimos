"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Assessment } from "@/lib/analyze/types";
import { listAssessments } from "@/lib/assessments";

const tasks = [
  "Scout maize block B for leaf spots",
  "Apply basal fertilizer on tomato beds",
  "Check irrigation pump before noon heat",
];

const weatherStrip = [
  { day: "Today", summary: "Partly cloudy · 31°C · light breeze" },
  { day: "Tue", summary: "Rain likely evening · 28°C" },
  { day: "Wed", summary: "Clear · 33°C · spray window AM" },
];

const yieldSeries = [2.4, 2.6, 2.9, 3.1, 3.3, 3.5];
const assessmentMix = [
  { label: "Disease", value: 42, color: "#2d6a4f" },
  { label: "Nutrient", value: 28, color: "#c9a227" },
  { label: "Pest", value: 18, color: "#1b4332" },
  { label: "Advice", value: 12, color: "#3d4f45" },
];

export function OverviewClient() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    function refresh() {
      setAssessments(listAssessments());
    }
    refresh();
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

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
        <Kpi label="Farm health" value="82" hint="Stable · watch blight" />
        <Kpi label="Open tasks" value="3" hint="Due this week" />
        <Kpi label="Assessments" value={String(assessments.length)} hint="Stored this season" />
        <Kpi label="Rain risk" value="40%" hint="Tue evening" />
      </div>

      <div className="mt-4 border border-line bg-bg-elevated p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
          Weather
        </p>
        <ul className="mt-3 space-y-2">
          {weatherStrip.map((row) => (
            <li
              key={row.day}
              className="flex flex-wrap gap-2 text-sm text-ink-muted"
            >
              <span className="w-14 font-semibold text-ink">{row.day}</span>
              <span>{row.summary}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ≥2 charts */}
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="border border-line bg-bg-elevated p-5">
          <h2 className="font-display text-lg font-semibold text-ink">
            Yield trend (t/ha)
          </h2>
          <p className="mt-1 text-xs text-ink-muted">Demo series · maize block A</p>
          <YieldChart values={yieldSeries} />
        </div>
        <div className="border border-line bg-bg-elevated p-5">
          <h2 className="font-display text-lg font-semibold text-ink">
            Assessment mix
          </h2>
          <p className="mt-1 text-xs text-ink-muted">Share of case types this season</p>
          <MixChart rows={assessmentMix} />
        </div>
      </div>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold text-ink">
          Today&apos;s tasks
        </h2>
        <ul className="mt-3 space-y-2">
          {tasks.map((task) => (
            <li
              key={task}
              className="border-l-2 border-accent bg-bg-elevated px-4 py-3 text-sm text-ink-muted"
            >
              {task}
            </li>
          ))}
        </ul>
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
                    {item.input.crop} · {item.input.location}
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

function YieldChart({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const w = 320;
  const h = 120;
  const pad = 8;
  const points = values
    .map((v, i) => {
      const x = pad + (i * (w - pad * 2)) / (values.length - 1);
      const y =
        h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 h-36 w-full" role="img" aria-label="Yield trend chart">
      <polyline
        fill="none"
        stroke="#2d6a4f"
        strokeWidth="3"
        points={points}
      />
      {values.map((v, i) => {
        const x = pad + (i * (w - pad * 2)) / (values.length - 1);
        const y =
          h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
        return <circle key={i} cx={x} cy={y} r="4" fill="#c9a227" />;
      })}
    </svg>
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
