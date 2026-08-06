"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  title: string;
  body: string;
  ctaLabel: string;
  onClose: () => void;
  onConfirm: () => void;
};

export function ConversionModal({
  open,
  title,
  body,
  ctaLabel,
  onClose,
  onConfirm,
}: Props) {
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-ink/50"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="conversion-modal-title"
        className="relative w-full max-w-md border border-line bg-bg-elevated p-6 shadow-lg"
      >
        <h2
          id="conversion-modal-title"
          className="font-display text-xl font-semibold text-ink"
        >
          {title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{body}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-gold px-4 py-2.5 text-sm font-semibold text-gold-ink hover:opacity-90"
          >
            {ctaLabel}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-line bg-bg px-4 py-2.5 text-sm font-semibold text-ink"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
