"use client";

import { FormEvent, useState } from "react";
import { type LeadFormId, saveLead } from "@/lib/leads";

type Props = {
  form: LeadFormId;
};

export function LeadForm({ form }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    if (!name || !email) {
      setError("Please enter your name and email.");
      return;
    }

    saveLead({
      form,
      name,
      email,
      phone: optional(data.get("phone")),
      city: optional(data.get("city")),
      org: optional(data.get("org")),
      role: optional(data.get("role")),
      message: optional(data.get("message")),
      intent: optional(data.get("intent")),
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="rounded-lg border border-accent/30 bg-bg-elevated px-5 py-6"
        role="status"
      >
        <p className="font-display text-xl font-semibold text-ink">
          You&apos;re on the list
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          Thanks — we saved your details and will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <Field label="Full name" name="name" type="text" required autoComplete="name" />
      <Field
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
      />

      {form === "waitlist" ? (
        <>
          <Field
            label="Phone (optional)"
            name="phone"
            type="tel"
            autoComplete="tel"
          />
          <Field
            label="City"
            name="city"
            type="text"
            autoComplete="address-level2"
          />
        </>
      ) : null}

      {form === "demo" ? (
        <>
          <Field
            label="Role"
            name="role"
            type="text"
            placeholder="e.g. Farm manager"
          />
          <Field
            label="Farm or organisation"
            name="org"
            type="text"
            autoComplete="organization"
          />
          <TextArea
            label="What would you like to see?"
            name="message"
          />
        </>
      ) : null}

      {form === "early-access" ? (
        <>
          <Field
            label="Role"
            name="role"
            type="text"
            placeholder="e.g. Cooperative lead"
          />
          <TextArea
            label="What do you need help with?"
            name="intent"
          />
        </>
      ) : null}

      {error ? (
        <p className="text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-md bg-gold px-4 py-3 text-sm font-semibold text-gold-ink hover:opacity-90"
      >
        {submitLabel(form)}
      </button>
    </form>
  );
}

function optional(value: FormDataEntryValue | null): string | undefined {
  const text = String(value ?? "").trim();
  return text || undefined;
}

function submitLabel(form: LeadFormId): string {
  if (form === "waitlist") return "Continue";
  if (form === "demo") return "Request walkthrough";
  return "Send message";
}

function Field({
  label,
  name,
  type,
  required,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-md border border-line bg-bg-elevated px-3 py-2.5 text-sm text-ink outline-none ring-accent focus:ring-2"
      />
    </label>
  );
}

function TextArea({ label, name }: { label: string; name: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <textarea
        name={name}
        rows={4}
        className="mt-1.5 w-full rounded-md border border-line bg-bg-elevated px-3 py-2.5 text-sm text-ink outline-none ring-accent focus:ring-2"
      />
    </label>
  );
}
