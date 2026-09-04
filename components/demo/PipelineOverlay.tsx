"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { OverlayEnter } from "@/components/motion";
import { demoFlow } from "@/config/demo-flow";

type Props = {
  active: boolean;
  stepIndex: number;
  remainingSec?: number;
};

export function PipelineOverlay({ active, stepIndex, remainingSec = 0 }: Props) {
  const [notify, setNotify] = useState(false);
  const reduce = useReducedMotion();
  const steps = demoFlow.pipelineSteps;

  return (
    <AnimatePresence>
      {active ? (
        <OverlayEnter
          key="pipeline-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 px-4"
        >
          <div
            className="ops-panel w-full max-w-md rounded-3xl p-6"
            role="status"
            aria-live="polite"
          >
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
                  <motion.li
                    key={step.id}
                    initial={reduce ? false : { opacity: 0.45 }}
                    animate={{ opacity: 1 }}
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
                  </motion.li>
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
        </OverlayEnter>
      ) : null}
    </AnimatePresence>
  );
}
