import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fields",
};

const fields = [
  {
    name: "Block A — North ridge",
    crop: "Maize",
    sizeHa: 1.2,
    planted: "12 Jun 2026",
    status: "Vegetative · scout weekly",
  },
  {
    name: "Block B — Stream side",
    crop: "Rice",
    sizeHa: 0.9,
    planted: "28 May 2026",
    status: "Tillering · water level OK",
  },
  {
    name: "Greenhouse 1",
    crop: "Tomato",
    sizeHa: 0.3,
    planted: "5 Jul 2026",
    status: "Flowering · phosphorus watch",
  },
  {
    name: "Plot C — Road edge",
    crop: "Cassava",
    sizeHa: 1.5,
    planted: "2 Mar 2026",
    status: "Established · weeding due",
  },
  {
    name: "Plot D — Homestead",
    crop: "Pepper",
    sizeHa: 0.4,
    planted: "18 Jun 2026",
    status: "Fruit set · harvest soon",
  },
];

export default function FieldsPage() {
  return (
    <main className="px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink">Fields</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Crops, planting dates, and field status
      </p>
      <ul className="mt-8 divide-y divide-line border border-line bg-bg-elevated">
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
          </li>
        ))}
      </ul>
    </main>
  );
}
