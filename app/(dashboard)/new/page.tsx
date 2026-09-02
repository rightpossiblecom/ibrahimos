"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { PipelineOverlay } from "@/components/demo/PipelineOverlay";
import { demoFlow } from "@/config/demo-flow";
import { siteConfig } from "@/config/site";
import type { Assessment, AssessmentInput } from "@/lib/analyze/types";
import { saveAssessment } from "@/lib/assessments";
import { attachEvidence, getActiveIncident, saveActiveIncident } from "@/lib/incidents";

const CROPS = [
  "Maize",
  "Rice",
  "Cassava",
  "Tomato",
  "Pepper",
  "Yam",
  "Beans",
] as const;

const seed = siteConfig.demoResults[0];

export default function NewIncidentPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"upload" | "manual">("upload");
  const [usingSample, setUsingSample] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [remainingSec, setRemainingSec] = useState(0);
  const [crop, setCrop] = useState("Maize");
  const [symptom, setSymptom] = useState("");
  const [location, setLocation] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [farmSizeHa, setFarmSizeHa] = useState("");
  const [notes, setNotes] = useState("");

  function useSample() {
    setUsingSample(true);
    setMode("upload");
    setCrop(seed.input.crop);
    setSymptom(seed.input.symptom);
    setLocation(seed.input.location);
    setFieldName(seed.input.fieldName ?? "North Block 04");
    setFarmSizeHa(String(seed.input.farmSizeHa ?? 86));
    setNotes("Dawn scout from North Block 04. Three hot zones confirmed. Artifact: north-block-04-field-evidence.zip");
    setError(null);
  }

  async function runWait() {
    const steps = demoFlow.pipelineSteps;
    const perStep = Math.round(demoFlow.analysisMs / steps.length);
    let left = Math.round(demoFlow.analysisMs / 1000);
    setRemainingSec(left);
    const ticker = window.setInterval(() => {
      left = Math.max(0, left - 1);
      setRemainingSec(left);
    }, 1000);

    for (let i = 0; i < steps.length; i += 1) {
      setStepIndex(i);
      await wait(perStep);
    }

    window.clearInterval(ticker);
    setRemainingSec(0);
  }

  async function finishWithAssessment(assessment: Assessment) {
    saveAssessment(assessment);
    const incident = getActiveIncident();
    saveActiveIncident(incident);
    attachEvidence(assessment.id);
    router.push(`/projects/${assessment.id}`);
  }

  async function runPipeline(input: AssessmentInput) {
    setRunning(true);
    setStepIndex(0);
    await runWait();

    if (usingSample) {
      await finishWithAssessment({
        ...seed,
        createdAt: new Date().toISOString(),
        input: { ...seed.input, ...input, artifactName: seed.artifactName },
      });
      return;
    }

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      setRunning(false);
      setError("Could not finish the incident intake. Try again.");
      return;
    }

    const assessment = (await res.json()) as Assessment;
    await finishWithAssessment(assessment);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const file = (event.currentTarget.elements.namedItem("image") as HTMLInputElement | null)
      ?.files?.[0];

    if (!crop || !symptom || !location) {
      setError("Crop, symptom, and location are required.");
      return;
    }

    if (mode === "upload" && !usingSample && !file) {
      setError("Choose a field photo or use the Kaduna sample.");
      return;
    }

    const farmSize = farmSizeHa ? Number(farmSizeHa) : undefined;
    if (farmSizeHa && Number.isNaN(farmSize)) {
      setError("Farm size must be a number.");
      return;
    }

    const input: AssessmentInput = {
      mode,
      crop,
      symptom,
      location,
      notes: notes || undefined,
      farmSizeHa: farmSize,
      fieldName: fieldName || undefined,
      imageName: usingSample
        ? seed.input.imageName
        : mode === "upload" && file
          ? file.name
          : undefined,
      artifactName: usingSample ? seed.artifactName : undefined,
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
      <PipelineOverlay active={running} stepIndex={stepIndex} remainingSec={remainingSec} />
      <main className="px-4 py-8 sm:px-6">
        <p className="ops-eyebrow">Incidents</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink">New incident</h1>
        <p className="mt-1 max-w-xl text-sm text-ink-muted">
          Upload field evidence or load the Kaduna maize sample. The desk stays empty until analysis finishes.
        </p>

        <button
          type="button"
          onClick={useSample}
          className="mt-6 rounded-full border border-line bg-panel px-4 py-2.5 text-sm font-semibold text-ink"
        >
          Use Kaduna sample
        </button>
        {usingSample ? (
          <p className="mt-2 text-xs text-accent">
            Loaded {seed.artifactName} · {seed.input.fieldName}
          </p>
        ) : null}

        <div className="mt-6 flex gap-2">
          <ModeButton active={mode === "upload"} onClick={() => setMode("upload")} label="Upload" />
          <ModeButton
            active={mode === "manual"}
            onClick={() => {
              setMode("manual");
              setUsingSample(false);
            }}
            label="Notes only"
          />
        </div>

        <form onSubmit={onSubmit} className="mt-8 max-w-xl space-y-4" noValidate>
          {mode === "upload" ? (
            <label className="block">
              <span className="text-sm font-medium text-ink">Field photo</span>
              <input
                name="image"
                type="file"
                accept="image/*"
                className="mt-1.5 block w-full text-sm text-ink-muted file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-2 file:text-sm file:font-semibold file:text-gold-ink"
              />
            </label>
          ) : null}

          <label className="block">
            <span className="text-sm font-medium text-ink">Crop</span>
            <select
              name="crop"
              value={crop}
              onChange={(event) => setCrop(event.target.value)}
              className="mt-1.5 w-full rounded-md border border-line bg-bg-elevated px-3 py-2.5 text-sm outline-none"
            >
              {CROPS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-ink">What the scout saw</span>
            <textarea
              name="symptom"
              rows={3}
              value={symptom}
              onChange={(event) => setSymptom(event.target.value)}
              placeholder="Chewed whorls, fresh frass, ragged windows"
              className="mt-1.5 w-full rounded-md border border-line bg-bg-elevated px-3 py-2.5 text-sm outline-none"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-ink">Field</span>
            <input
              name="fieldName"
              type="text"
              value={fieldName}
              onChange={(event) => setFieldName(event.target.value)}
              placeholder="North Block 04"
              className="mt-1.5 w-full rounded-md border border-line bg-bg-elevated px-3 py-2.5 text-sm outline-none"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-ink">Location</span>
            <input
              name="location"
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Kaduna, NG"
              className="mt-1.5 w-full rounded-md border border-line bg-bg-elevated px-3 py-2.5 text-sm outline-none"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-ink">Farm size (ha)</span>
            <input
              name="farmSizeHa"
              type="number"
              min="0"
              step="0.1"
              value={farmSizeHa}
              onChange={(event) => setFarmSizeHa(event.target.value)}
              className="mt-1.5 w-full rounded-md border border-line bg-bg-elevated px-3 py-2.5 text-sm outline-none"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-ink">Notes</span>
            <textarea
              name="notes"
              rows={2}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="mt-1.5 w-full rounded-md border border-line bg-bg-elevated px-3 py-2.5 text-sm outline-none"
            />
          </label>

          {error ? (
            <p className="text-sm text-warning" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={running}
            className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-gold-ink disabled:opacity-60"
          >
            {running ? "Building plan…" : "Open incident"}
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
          ? "rounded-md bg-accent px-4 py-2 text-sm font-semibold text-gold-ink"
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
