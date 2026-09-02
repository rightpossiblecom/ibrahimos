"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useDesk } from "@/lib/use-desk";

const quietFields = [
  {
    name: "South Block 02",
    crop: "Maize",
    planted: "21 Jun 2026",
    status: "Vegetative · scout weekly",
  },
  {
    name: "River strip",
    crop: "Rice",
    planted: "28 May 2026",
    status: "Tillering · water level OK",
  },
  {
    name: "Homestead tomato",
    crop: "Tomato",
    planted: "5 Jul 2026",
    status: "Flowering · hold until maize response clears",
  },
];

export function FieldsClient() {
  const { live, incident } = useDesk();
  const seed = siteConfig.demoIncident;

  return (
    <main className="px-4 py-8 sm:px-6">
      <p className="ops-eyebrow">Fields</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">Blocks</h1>
      <p className="mt-1 text-sm text-ink-muted">
        {live && incident
          ? "Crops, planting dates, and the block currently in the Incident Room"
          : "No live block yet. Open an incident to put a case on the field list."}
      </p>
      <ul className="mt-8 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-bg-elevated">
        {live && incident ? (
          <li className="px-4 py-4 sm:px-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-semibold text-ink">{incident.field.name}</p>
              <p className="text-sm text-accent">{incident.field.totalHectares} ha</p>
            </div>
            <p className="mt-1 text-sm text-ink-muted">
              {incident.crop} · planted 18 Jun 2026
            </p>
            <p className="mt-2 text-sm text-ink">
              High risk · {incident.threat} · {incident.affectedHectares} ha flagged
            </p>
            <Link
              href={`/projects/${incident.assessmentId}`}
              className="mt-3 inline-block text-sm font-semibold text-accent"
            >
              Open live incident
            </Link>
          </li>
        ) : null}
        {quietFields.map((field) => (
          <li key={field.name} className="px-4 py-4 sm:px-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-semibold text-ink">{field.name}</p>
              <p className="text-sm text-ink-muted">Quiet</p>
            </div>
            <p className="mt-1 text-sm text-ink-muted">
              {field.crop} · planted {field.planted}
            </p>
            <p className="mt-2 text-sm text-ink">{field.status}</p>
          </li>
        ))}
      </ul>
      {!live ? (
        <p className="mt-4 text-sm text-ink-muted">
          {seed.field.name} stays off this list until analysis finishes.
        </p>
      ) : null}
    </main>
  );
}
