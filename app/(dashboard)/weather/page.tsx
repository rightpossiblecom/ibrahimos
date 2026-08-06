import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weather",
};

const forecast = [
  {
    day: "Saturday",
    temp: "31°C",
    rain: "10%",
    tip: "Good morning window for foliar spray before heat builds.",
  },
  {
    day: "Sunday",
    temp: "29°C",
    rain: "40%",
    tip: "Light showers possible afternoon — hold dusting applications.",
  },
  {
    day: "Monday",
    temp: "28°C",
    rain: "65%",
    tip: "Rain likely — check drainage on low maize rows.",
  },
  {
    day: "Tuesday",
    temp: "30°C",
    rain: "20%",
    tip: "Clearing skies — resume field scouting after dew lifts.",
  },
  {
    day: "Wednesday",
    temp: "33°C",
    rain: "5%",
    tip: "Hot and dry — irrigate tomato beds early morning.",
  },
];

export default function WeatherPage() {
  return (
    <main className="px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink">Weather</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Localized sample forecast for Kaduna farm demo
      </p>
      <ul className="mt-8 space-y-3">
        {forecast.map((day) => (
          <li
            key={day.day}
            className="border border-line bg-bg-elevated px-4 py-4 sm:px-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-display text-lg font-semibold text-ink">
                {day.day}
              </p>
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
