"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { PipelineOverlay } from "@/components/demo/PipelineOverlay";
import { demoFlow } from "@/config/demo-flow";
import type { Assessment, AssessmentInput } from "@/lib/analyze/types";
import { saveAssessment } from "@/lib/assessments";

const CROPS = [
  "Maize",
  "Rice",
  "Cassava",
  "Tomato",
  "Pepper",
  "Yam",
  "Beans",
] as const;

export default function NewAssessmentPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"upload" | "manual">("upload");
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  async function runPipeline(input: AssessmentInput) {
    setRunning(true);
    setStepIndex(0);
    console.log(`[IbrahimOS Pipeline] start ${input.mode}`);

    const steps = demoFlow.pipelineSteps;
    const delay =
      demoFlow.hardcodeVisionDemo && input.mode === "upload" ? 800 : 400;

    for (let i = 0; i < steps.length; i += 1) {
      setStepIndex(i);
      console.log(`[IbrahimOS Pipeline] ${steps[i].label}`);
      await wait(delay);
    }

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      setRunning(false);
      setError("Could not finish the assessment. Try again.");
      return;
    }

    const assessment = (await res.json()) as Assessment;
    saveAssessment(assessment);
    console.log(`[IbrahimOS Assessment] navigate ${assessment.id}`);
    router.push(`/projects/${assessment.id}`);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const data = new FormData(event.currentTarget);
    const crop = String(data.get("crop") ?? "").trim();
    const symptom = String(data.get("symptom") ?? "").trim();
    const location = String(data.get("location") ?? "").trim();
    const notes = String(data.get("notes") ?? "").trim();
    const farmSizeRaw = String(data.get("farmSizeHa") ?? "").trim();
    const file = (data.get("image") as File | null) ?? null;

    if (!crop || !symptom || !location) {
      setError("Crop, symptom, and location are required.");
      return;
    }

    if (mode === "upload" && (!file || !file.name)) {
      setError("Choose a leaf or crop photo to continue.");
      return;
    }

    const farmSizeHa = farmSizeRaw ? Number(farmSizeRaw) : undefined;
    if (farmSizeRaw && Number.isNaN(farmSizeHa)) {
      setError("Farm size must be a number.");
      return;
    }

    const input: AssessmentInput = {
      mode,
      crop,
      symptom,
      location,
      notes: notes || undefined,
      farmSizeHa,
      imageName: mode === "upload" && file ? file.name : undefined,
    };

    try {
      await runPipeline(input);
    } catch {
      setRunning(false);
      setError("Something went wrong. Try again.");
    }
  }

  return (
    <>
      <PipelineOverlay active={running} stepIndex={stepIndex} />
      <main className="px-4 py-8 sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-ink">
          New assessment
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          Upload a crop photo or describe what you see in the field
        </p>

        <div className="mt-6 flex gap-2">
          <ModeButton
            active={mode === "upload"}
            onClick={() => setMode("upload")}
            label="Upload"
          />
          <ModeButton
            active={mode === "manual"}
            onClick={() => setMode("manual")}
            label="Manual"
          />
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-8 max-w-xl space-y-4"
          noValidate
        >
          {mode === "upload" ? (
            <label className="block">
              <span className="text-sm font-medium text-ink">Crop photo</span>
              <input
                name="image"
                type="file"
                accept="image/*"
                className="mt-1.5 block w-full text-sm text-ink-muted file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
              />
            </label>
          ) : null}

          <label className="block">
            <span className="text-sm font-medium text-ink">Crop</span>
            <select
              name="crop"
              defaultValue="Maize"
              className="mt-1.5 w-full rounded-md border border-line bg-bg-elevated px-3 py-2.5 text-sm outline-none ring-accent focus:ring-2"
            >
              {CROPS.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-ink">
              Symptom or question
            </span>
            <textarea
              name="symptom"
              rows={3}
              placeholder="e.g. Yellowing leaves with brown lesions"
              className="mt-1.5 w-full rounded-md border border-line bg-bg-elevated px-3 py-2.5 text-sm outline-none ring-accent focus:ring-2"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-ink">Location</span>
            <input
              name="location"
              type="text"
              placeholder="e.g. Kaduna, NG"
              className="mt-1.5 w-full rounded-md border border-line bg-bg-elevated px-3 py-2.5 text-sm outline-none ring-accent focus:ring-2"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-ink">
              Farm size (ha, optional)
            </span>
            <input
              name="farmSizeHa"
              type="number"
              min="0"
              step="0.1"
              className="mt-1.5 w-full rounded-md border border-line bg-bg-elevated px-3 py-2.5 text-sm outline-none ring-accent focus:ring-2"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-ink">Notes (optional)</span>
            <textarea
              name="notes"
              rows={2}
              className="mt-1.5 w-full rounded-md border border-line bg-bg-elevated px-3 py-2.5 text-sm outline-none ring-accent focus:ring-2"
            />
          </label>

          {error ? (
            <p className="text-sm text-red-800" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={running}
            className="rounded-md bg-gold px-5 py-3 text-sm font-semibold text-gold-ink hover:opacity-90 disabled:opacity-60"
          >
            {running ? "Analyzing…" : "Run assessment"}
          </button>
        </form>
      </main>
    </>
  );
}

function ModeButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white"
          : "rounded-md border border-line bg-bg-elevated px-4 py-2 text-sm font-semibold text-ink-muted"
      }
    >
      {label}
    </button>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
