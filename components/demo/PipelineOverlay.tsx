"use client";

import { demoFlow } from "@/config/demo-flow";

type Props = {
  active: boolean;
  stepIndex: number;
};

export function PipelineOverlay({ active, stepIndex }: Props) {
  if (!active) return null;

  const steps = demoFlow.pipelineSteps;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-4"
      role="status"
      aria-live="polite"
    >
      <div className="w-full max-w-md border border-line bg-bg-elevated p-6 shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          Analyzing
        </p>
        <p className="mt-2 font-display text-xl font-semibold text-ink">
          Reading your farm case
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
                    ? "border-l-2 border-gold pl-3 text-sm font-medium text-ink"
                    : done
                      ? "border-l-2 border-accent pl-3 text-sm text-ink-muted"
                      : "border-l-2 border-line pl-3 text-sm text-ink-muted/70"
                }
              >
                {step.label}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
