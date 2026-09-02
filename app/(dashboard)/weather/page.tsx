import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Weather",
};

const forecast = [
  {
    day: "Today",
    temp: "31°C",
    rain: "8%",
    tip: "Dry six-hour morning window for the North Block 04 spray pass.",
    live: true,
  },
  {
    day: "Wednesday",
    temp: "29°C",
    rain: "35%",
    tip: "Humidity builds after dusk — finish edge scouting before then.",
    live: false,
  },
  {
    day: "Thursday",
    temp: "28°C",
    rain: "20%",
    tip: "72-hour recovery survey at dawn on the three flagged zones.",
    live: false,
  },
  {
    day: "Friday",
    temp: "32°C",
    rain: "10%",
    tip: "Heat climbs — hold extra foliar feed until larval pressure drops.",
    live: false,
  },
];

export default function WeatherPage() {
  const incident = siteConfig.demoIncident;

  return (
    <main className="px-4 py-8 sm:px-6">
      <p className="ops-eyebrow">Weather</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">Kaduna window</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Forecast for {incident.field.name}. The incident has a {incident.responseWindowHours}-hour action window.
      </p>
      <ul className="mt-8 space-y-3">
        {forecast.map((day) => (
          <li
            key={day.day}
            className={
              day.live
                ? "ops-metric rounded-3xl px-4 py-4 sm:px-5"
                : "rounded-3xl border border-line bg-bg-elevated px-4 py-4 sm:px-5"
            }
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-display text-lg font-semibold text-ink">{day.day}</p>
              <p className="text-sm text-accent">
                {day.temp} · rain {day.rain}
              </p>
            </div>
            <p className="mt-2 text-sm text-ink-muted">{day.tip}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
