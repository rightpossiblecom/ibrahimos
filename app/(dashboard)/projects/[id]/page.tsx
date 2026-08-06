"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BuyerModal } from "@/components/demo/BuyerModal";
import { DemoToast } from "@/components/demo/DemoToast";
import { FinancingModal } from "@/components/demo/FinancingModal";
import { PremiumModal } from "@/components/demo/PremiumModal";
import { demoFlow } from "@/config/demo-flow";
import type { Assessment } from "@/lib/analyze/types";
import { getAssessment } from "@/lib/assessments";

type ModalId = "premium" | "financing" | "buyers" | null;

export default function ProjectResultPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;
  const [assessment, setAssessment] = useState<Assessment | null | undefined>(
    undefined,
  );
  const [modal, setModal] = useState<ModalId>(null);
  const [toast, setToast] = useState<string | null>(null);

  const dismissToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (!id) return;
    const found = getAssessment(id);
    setAssessment(found);
    if (!found) {
      const timer = window.setTimeout(() => {
        router.replace("/dashboard");
      }, 1200);
      return () => window.clearTimeout(timer);
    }
  }, [id, router]);

  if (assessment === undefined) {
    return (
      <main className="px-4 py-8 sm:px-6">
        <p className="text-sm text-ink-muted">Loading assessment…</p>
      </main>
    );
  }

  if (!assessment) {
    return (
      <main className="px-4 py-8 sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-ink">
          Assessment not found
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          Returning to Overview…
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-block text-sm font-medium text-accent hover:underline"
        >
          Back to Overview
        </Link>
      </main>
    );
  }

  const { input } = assessment;

  return (
    <>
      <DemoToast message={toast} onDismiss={dismissToast} />
      <PremiumModal
        open={modal === "premium"}
        onClose={() => setModal(null)}
        onSuccess={setToast}
      />
      <FinancingModal
        open={modal === "financing"}
        onClose={() => setModal(null)}
        onSuccess={setToast}
      />
      <BuyerModal
        open={modal === "buyers"}
        onClose={() => setModal(null)}
        onSuccess={setToast}
      />

      <main className="px-4 py-8 sm:px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            {assessment.category} · {assessment.confidence}% confidence
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
            {assessment.disease}
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            Assessed {new Date(assessment.createdAt).toLocaleString()}
          </p>

          <section className="mt-8 border border-line bg-bg-elevated p-5">
            <h2 className="font-display text-lg font-semibold text-ink">
              Farm context
            </h2>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <Field label="Mode" value={input.mode} />
              <Field label="Crop" value={input.crop} />
              <Field label="Location" value={input.location} />
              {input.farmSizeHa != null ? (
                <Field label="Farm size" value={`${input.farmSizeHa} ha`} />
              ) : null}
              {input.imageName ? (
                <Field label="Photo" value={input.imageName} />
              ) : null}
              <div className="sm:col-span-2">
                <Field label="Symptom / question" value={input.symptom} />
              </div>
              {input.notes ? (
                <div className="sm:col-span-2">
                  <Field label="Notes" value={input.notes} />
                </div>
              ) : null}
            </dl>
          </section>

          <section className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="border border-line bg-bg-elevated p-5">
              <h2 className="font-display text-lg font-semibold text-ink">
                Estimated impact
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {assessment.estimatedImpact}
              </p>
            </div>
            <div className="border border-line bg-bg-elevated p-5">
              <h2 className="font-display text-lg font-semibold text-ink">
                Yield hint
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {assessment.yieldHint}
              </p>
            </div>
          </section>

          <section className="mt-6 border border-line bg-bg-elevated p-5">
            <h2 className="font-display text-lg font-semibold text-ink">
              Treatment
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-ink-muted">
              {assessment.treatment.map((step) => (
                <li key={step} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="border border-line bg-bg-elevated p-5">
              <h2 className="font-display text-lg font-semibold text-ink">
                Fertilizer note
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {assessment.fertilizerNote}
              </p>
            </div>
            <div className="border border-line bg-bg-elevated p-5">
              <h2 className="font-display text-lg font-semibold text-ink">
                Weather note
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {assessment.weatherNote}
              </p>
            </div>
          </section>

          <section className="mt-6 border border-line bg-bg-elevated p-5">
            <h2 className="font-display text-lg font-semibold text-ink">
              Next actions
            </h2>
            <ul className="mt-3 space-y-2">
              {assessment.nextActions.map((action) => (
                <li
                  key={action}
                  className="border-l-2 border-accent pl-3 text-sm text-ink-muted"
                >
                  {action}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-lg font-semibold text-ink">
              What you can do next
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setModal("premium")}
                className="rounded-md bg-gold px-4 py-2.5 text-sm font-semibold text-gold-ink hover:opacity-90"
              >
                {demoFlow.conversion.premium.title}
              </button>
              <button
                type="button"
                onClick={() => setModal("financing")}
                className="rounded-md border border-line bg-bg-elevated px-4 py-2.5 text-sm font-semibold text-ink hover:bg-bg"
              >
                {demoFlow.conversion.financing.title}
              </button>
              <button
                type="button"
                onClick={() => setModal("buyers")}
                className="rounded-md border border-line bg-bg-elevated px-4 py-2.5 text-sm font-semibold text-ink hover:bg-bg"
              >
                {demoFlow.conversion.buyers.title}
              </button>
            </div>
            <Link
              href="/dashboard"
              className="mt-6 inline-block text-sm font-medium text-accent hover:underline"
            >
              Back to Overview
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        {label}
      </dt>
      <dd className="mt-1 text-ink">{value}</dd>
    </div>
  );
}
