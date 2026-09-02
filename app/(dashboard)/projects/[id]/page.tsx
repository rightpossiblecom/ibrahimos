"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IncidentActions } from "@/components/IncidentActions";
import { IncidentMap } from "@/components/IncidentMap";
import type { Assessment, Incident } from "@/lib/analyze/types";
import { getAssessment } from "@/lib/assessments";
import { formatNgn } from "@/lib/format-currency";
import {
  deployCrew,
  getActiveIncident,
  updateIncidentTask,
} from "@/lib/incidents";

export default function IncidentRoomPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;
  const [assessment, setAssessment] = useState<Assessment | null | undefined>(undefined);
  const [incident, setIncident] = useState<Incident | null>(null);

  useEffect(() => {
    if (!id) return;
    const timer = window.setTimeout(() => {
      const found = getAssessment(id);
      const live = getActiveIncident();
      setIncident(live);
      setAssessment(found ?? null);
      if (!live) {
        router.replace("/new");
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [id, router]);

  if (assessment === undefined || !incident) {
    return (
      <main className="px-4 py-8 sm:px-6">
        <p className="text-sm text-ink-muted">Loading incident…</p>
      </main>
    );
  }

  return (
    <main className="px-4 py-8 sm:px-6">
      <p className="ops-eyebrow">
        Incident Room · {incident.severity} · {assessment?.confidence ?? 94}% confidence
      </p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            {incident.threat} · {incident.field.name}
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            {incident.crop} · {incident.field.location} · {incident.field.totalHectares} ha
            {assessment?.artifactName ? ` · ${assessment.artifactName}` : ""}
          </p>
        </div>
        <Link href="/dashboard" className="text-sm font-medium text-accent hover:underline">
          Back to Command
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="At risk" value={`${incident.affectedHectares} ha`} hint={`${incident.zones.length} zones`} />
        <Metric label="Response" value={formatNgn(incident.responseCost)} hint={`${incident.responseWindowHours}-hour window`} />
        <Metric
          label="Deadline"
          value={new Date(incident.deadlineAt).toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" })}
          hint="Same-day coverage"
        />
        <Metric
          label="Recovery"
          value={`${incident.recovery.completion}%`}
          hint={incident.recovery.state}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="ops-panel rounded-3xl p-5">
          <p className="ops-eyebrow">Field map</p>
          <h2 className="mt-2 font-display text-xl font-semibold text-ink">Affected zones</h2>
          <div className="mt-4">
            <IncidentMap incident={incident} />
          </div>
          <ul className="mt-4 space-y-3">
            {incident.zones.map((zone) => (
              <li key={zone.id} className="rounded-2xl border border-line px-4 py-3">
                <div className="flex justify-between gap-3 text-sm">
                  <span className="font-semibold text-ink">{zone.name}</span>
                  <span className="text-accent">{zone.hectares} ha · {zone.status}</span>
                </div>
                <p className="mt-1 text-sm text-ink-muted">{zone.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <IncidentActions
          incident={incident}
          onDeploy={() => {
            setIncident(deployCrew());
          }}
          onToggleTask={(taskId, complete) => {
            setIncident(updateIncidentTask(taskId, complete));
          }}
        />
      </div>

      {assessment ? (
        <section className="ops-panel mt-6 rounded-3xl p-5">
          <p className="ops-eyebrow">Treatment</p>
          <h2 className="mt-2 font-display text-xl font-semibold text-ink">{assessment.disease}</h2>
          <p className="mt-2 text-sm text-ink-muted">{assessment.estimatedImpact}</p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-ink-muted">
            {assessment.treatment.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <p className="text-sm text-ink-muted">{assessment.weatherNote}</p>
            <p className="text-sm text-ink-muted">{assessment.fertilizerNote}</p>
          </div>
        </section>
      ) : null}
    </main>
  );
}

function Metric({
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
      <p className="mt-2 font-display text-3xl font-semibold text-ink">{value}</p>
      <p className="mt-1 text-sm text-ink-muted">{hint}</p>
    </div>
  );
}
