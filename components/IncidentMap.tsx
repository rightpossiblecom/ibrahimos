import type { Incident } from "@/lib/analyze/types";

const ZONE_MARKS: Record<string, { top: string; left: string }> = {
  "zone-north-edge": { top: "22%", left: "68%" },
  "zone-pivot-lane": { top: "48%", left: "54%" },
  "zone-east-drain": { top: "66%", left: "78%" },
};

export function IncidentMap({
  incident,
  compact = false,
}: {
  incident: Incident;
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "relative h-44 overflow-hidden rounded-2xl border border-line"
          : "relative min-h-[280px] overflow-hidden rounded-2xl border border-line"
      }
      role="img"
      aria-label={`${incident.field.name} map with ${incident.zones.length} affected zones`}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 70% 31%, rgba(255,123,107,0.55) 0 7px, transparent 8px),
            radial-gradient(circle at 55% 58%, rgba(255,123,107,0.45) 0 6px, transparent 7px),
            radial-gradient(circle at 78% 68%, rgba(183,255,60,0.28) 0 5px, transparent 6px),
            linear-gradient(32deg, transparent 48%, #334139 49%, transparent 50%),
            repeating-linear-gradient(108deg, #162019 0 17px, #1c2921 18px 19px)
          `,
        }}
      />
      {incident.zones.map((zone) => {
        const mark = ZONE_MARKS[zone.id] ?? { top: "40%", left: "50%" };
        return (
          <span
            key={zone.id}
            className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bg"
            style={{
              top: mark.top,
              left: mark.left,
              backgroundColor:
                zone.status === "active"
                  ? "#ff7b6b"
                  : zone.status === "buffer"
                    ? "#ffcc66"
                    : "#b7ff3c",
            }}
            title={`${zone.name} · ${zone.hectares} ha`}
          />
        );
      })}
      <div className="absolute bottom-3 left-3 rounded-md bg-bg/85 px-2 py-1 text-[11px] text-ink">
        {incident.field.name} · {incident.affectedHectares} ha at risk
      </div>
    </div>
  );
}
