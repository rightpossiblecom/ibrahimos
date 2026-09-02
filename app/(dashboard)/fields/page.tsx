import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Fields",
};

const incident = siteConfig.demoIncident;

const fields = [
  {
    name: incident.field.name,
    crop: incident.crop,
    sizeHa: incident.field.totalHectares,
    planted: "18 Jun 2026",
    status: `High risk · ${incident.threat} · ${incident.affectedHectares} ha flagged`,
    href: `/projects/${incident.assessmentId}`,
    live: true,
  },
  {
    name: "South Block 02",
    crop: "Maize",
    sizeHa: 34,
    planted: "21 Jun 2026",
    status: "Vegetative · scout weekly",
    href: "/fields",
    live: false,
  },
  {
    name: "River strip",
    crop: "Rice",
    sizeHa: 12,
    planted: "28 May 2026",
    status: "Tillering · water level OK",
    href: "/fields",
    live: false,
  },
  {
    name: "Homestead tomato",
    crop: "Tomato",
    sizeHa: 4.5,
    planted: "5 Jul 2026",
    status: "Flowering · hold until maize response clears",
    href: "/fields",
    live: false,
  },
];

export default function FieldsPage() {
  return (
    <main className="px-4 py-8 sm:px-6">
      <p className="ops-eyebrow">Fields</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">Blocks</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Crops, planting dates, and the block currently in the Incident Room
      </p>
      <ul className="mt-8 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-bg-elevated">
        {fields.map((field) => (
          <li key={field.name} className="px-4 py-4 sm:px-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-semibold text-ink">{field.name}</p>
              <p className="text-sm text-accent">{field.sizeHa} ha</p>
            </div>
            <p className="mt-1 text-sm text-ink-muted">
              {field.crop} · planted {field.planted}
            </p>
            <p className="mt-2 text-sm text-ink">{field.status}</p>
            {field.live ? (
              <Link href={field.href} className="mt-3 inline-block text-sm font-semibold text-accent">
                Open live incident
              </Link>
            ) : null}
          </li>
        ))}
      </ul>
    </main>
  );
}
