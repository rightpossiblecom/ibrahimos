"use client";

import { useState } from "react";
import { demoFlow } from "@/config/demo-flow";

type Props = {
  active: boolean;
  stepIndex: number;
  remainingSec?: number;
};

export function PipelineOverlay({ active, stepIndex, remainingSec = 0 }: Props) {
  const [notify, setNotify] = useState(false);

  if (!active) return null;

  const steps = demoFlow.pipelineSteps;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 px-4"
      role="status"
      aria-live="polite"
    >
      <div className="ops-panel w-full max-w-md rounded-3xl p-6">
        <p className="ops-eyebrow">Building command plan</p>
        <p className="mt-2 font-display text-xl font-semibold text-ink">
          Reading North Block 04
        </p>
        <p className="mt-2 text-sm text-ink-muted">
          {remainingSec > 0
            ? `${remainingSec}s remaining. Leave if you want — the desk will fill when this finishes.`
            : "Assembling the last layer."}
        </p>
        <ol className="mt-6 space-y-3">
          {steps.map((step, index) => {
            const done = index < stepIndex;
            const current = index === stepIndex;
            return (
              <li
                key={step.id}
                className={
                  current
                    ? "border-l-2 border-accent pl-3 text-sm font-medium text-ink"
                    : done
                      ? "border-l-2 border-accent/50 pl-3 text-sm text-ink-muted"
                      : "border-l-2 border-line pl-3 text-sm text-ink-muted/70"
                }
              >
                {done ? "✓ " : current ? "→ " : ""}
                {step.label}
              </li>
            );
          })}
        </ol>
        <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-ink-muted">
          <input
            type="checkbox"
            checked={notify}
            onChange={(event) => setNotify(event.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#b7ff3c]"
          />
          <span>
            {notify
              ? "Noted. We will mark this incident done when the plan is ready."
              : "Leave. We will write when it is done."}
          </span>
        </label>
      </div>
    </div>
  );
}
