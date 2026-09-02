"use client";

import { useDesk } from "@/lib/use-desk";

const forecast = [
  {
    day: "Today",
    temp: "31°C",
    rain: "8%",
    darkTip: "Dry morning window. No spray plan until a case is live.",
    liveTip: "Dry six-hour morning window for the North Block 04 spray pass.",
  },
  {
    day: "Wednesday",
    temp: "29°C",
    rain: "35%",
    darkTip: "Humidity builds after dusk.",
    liveTip: "Humidity builds after dusk — finish edge scouting before then.",
  },
  {
    day: "Thursday",
    temp: "28°C",
    rain: "20%",
    darkTip: "Cooler dawn. Hold recovery work until a case is live.",
    liveTip: "72-hour recovery survey at dawn on the three flagged zones.",
  },
  {
    day: "Friday",
    temp: "32°C",
    rain: "10%",
    darkTip: "Heat climbs. No foliar plan on the desk yet.",
    liveTip: "Heat climbs — hold extra foliar feed until larval pressure drops.",
  },
];

export function WeatherClient() {
  const { live, incident } = useDesk();

  return (
    <main className="px-4 py-8 sm:px-6">
      <p className="ops-eyebrow">Weather</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">Kaduna window</h1>
      <p className="mt-1 text-sm text-ink-muted">
        {live && incident
          ? `Forecast for ${incident.field.name}. The incident has a ${incident.responseWindowHours}-hour action window.`
          : "Forecast sits here. Action windows stay off until a case is live."}
      </p>
      <ul className="mt-8 space-y-3">
        {forecast.map((day) => (
          <li
            key={day.day}
            className={
              live && day.day === "Today"
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
            <p className="mt-2 text-sm text-ink-muted">{live ? day.liveTip : day.darkTip}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
