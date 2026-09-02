"use client";

import type { Incident } from "@/lib/analyze/types";

export function IncidentActions({
  incident,
  onDeploy,
  onToggleTask,
}: {
  incident: Incident;
  onDeploy: () => void;
  onToggleTask: (taskId: string, complete: boolean) => void;
}) {
  const deployed = Boolean(incident.recovery.deployedAt);

  return (
    <section className="ops-panel rounded-3xl p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="ops-eyebrow">Crew</p>
          <h2 className="mt-2 font-display text-xl font-semibold text-ink">
            Response work
          </h2>
        </div>
        <button
          type="button"
          onClick={onDeploy}
          disabled={deployed}
          className="rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-gold-ink disabled:opacity-60"
        >
          {deployed ? "Crew deployed" : "Deploy crew"}
        </button>
      </div>
      {!deployed ? (
        <p className="mt-3 text-sm text-ink-muted">
          Deploy the crew to unlock the checklist and move the incident into response.
        </p>
      ) : null}
      <ul className="mt-5 space-y-2">
        {incident.crewTasks.map((task) => (
          <li key={task.id} className="rounded-2xl border border-line bg-panel-strong px-4 py-3">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={task.complete}
                disabled={!deployed}
                onChange={(event) => onToggleTask(task.id, event.target.checked)}
                className="mt-1 h-4 w-4 accent-[#b7ff3c]"
              />
              <span>
                <span className="block text-sm font-semibold text-ink">{task.title}</span>
                <span className="mt-1 block text-xs text-ink-muted">
                  {task.crew}
                  {task.complete ? " · complete" : deployed ? " · open" : " · waiting on deploy"}
                </span>
              </span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
