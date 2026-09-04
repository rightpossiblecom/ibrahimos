"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IncidentMap } from "@/components/IncidentMap";
import type { Assessment } from "@/lib/analyze/types";
import { listAssessments } from "@/lib/assessments";
import { formatNgn } from "@/lib/format-currency";
import { DESK_EVENT, resetIncidentDemo } from "@/lib/incidents";
import { DeskReveal } from "@/components/motion";
import { useDesk } from "@/lib/use-desk";

const VALUE_PROTECTED = 8_200_000;

export function OverviewClient() {
  const { incident } = useDesk();
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    function refresh() {
      setAssessments(listAssessments());
    }

    refresh();
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    window.addEventListener(DESK_EVENT, refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
      window.removeEventListener(DESK_EVENT, refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  return (
    <main className="px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="ops-eyebrow">Tuesday · Command</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink">Farm command</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {incident
              ? "Open incidents, hectares at risk, and the next physical action"
              : "Empty desk. Open an incident to bring the figures online."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              resetIncidentDemo();
              setAssessments(listAssessments());
            }}
            className="rounded-full border border-line bg-panel px-4 py-2.5 text-sm font-semibold text-ink"
          >
            Reset house
          </button>
          <Link
            href="/new"
            className="rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-gold-ink"
          >
            New incident
          </Link>
        </div>
      </div>

      {incident ? (
        <DeskReveal>
          <LiveDesk incident={incident} assessments={assessments} />
        </DeskReveal>
      ) : (
        <section className="ops-panel mt-8 rounded-3xl p-6">
          <p className="ops-eyebrow">Desk</p>
          <h2 className="mt-2 font-display text-xl font-semibold text-ink">No live case yet</h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-muted">
            Command, Fields, Market, and Weather stay dark until analysis finishes. Use the Kaduna
            sample on Incidents, wait it out, then this desk fills.
          </p>
          <Link
            href="/new"
            className="mt-5 inline-flex rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-gold-ink"
          >
            Open an incident
          </Link>
        </section>
      )}
    </main>
  );
}

function LiveDesk({
  incident,
  assessments,
}: {
  incident: NonNullable<ReturnType<typeof useDesk>["incident"]>;
  assessments: Assessment[];
}) {
  const openTasks = incident.crewTasks.filter((task) => !task.complete).length;
  const nextTask = incident.crewTasks.find((task) => !task.complete);

  return (
    <>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Open incidents" value="01" hint={`${incident.field.name} · ${incident.severity}`} />
        <Kpi label="Hectares at risk" value={String(incident.affectedHectares)} hint={`${incident.zones.length} live zones`} />
        <Kpi label="Response budget" value={formatNgn(incident.responseCost)} hint={`${incident.responseWindowHours}-hour window`} />
        <Kpi label="Value protected" value={formatNgn(VALUE_PROTECTED)} hint={`${incident.recovery.completion}% recovery`} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <section className="ops-panel rounded-3xl p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="ops-eyebrow">Live map</p>
              <h2 className="mt-2 font-display text-xl font-semibold text-ink">{incident.field.name}</h2>
            </div>
            <Link href={`/projects/${incident.assessmentId}`} className="text-sm font-semibold text-accent">
              Open room
            </Link>
          </div>
          <div className="mt-4">
            <IncidentMap incident={incident} />
          </div>
        </section>
        <section className="ops-panel rounded-3xl p-5">
          <p className="ops-eyebrow">Next actions</p>
          <h2 className="mt-2 font-display text-xl font-semibold text-ink">
            {openTasks} open tasks
          </h2>
          <ul className="mt-4 space-y-3">
            {incident.crewTasks.map((task) => (
              <li key={task.id} className="border-b border-line pb-3 last:border-0">
                <p className="text-sm font-semibold text-ink">{task.title}</p>
                <p className="mt-1 text-xs text-ink-muted">
                  {task.crew} · {task.complete ? "done" : "queued"}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-muted">
            Next: {nextTask ? nextTask.title : "All crew work is complete. Run the 72-hour recovery check."}
          </p>
        </section>
      </div>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold text-ink">Evidence</h2>
        {assessments.length === 0 ? (
          <p className="mt-3 rounded-3xl border border-line bg-bg-elevated px-4 py-5 text-sm text-ink-muted">
            No evidence on the desk yet.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-bg-elevated">
            {assessments.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/projects/${item.id}`}
                  className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 hover:bg-panel"
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
        )}
      </section>
    </>
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
    <div className="ops-metric rounded-2xl p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-accent">{value}</p>
      <p className="mt-1 text-sm text-ink-muted">{hint}</p>
    </div>
  );
}
