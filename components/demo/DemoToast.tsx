"use client";

import { useEffect } from "react";

type Props = {
  message: string | null;
  onDismiss: () => void;
};

export function DemoToast({ message, onDismiss }: Props) {
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(onDismiss, 2500);
    return () => window.clearTimeout(timer);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-[60] max-w-sm -translate-x-1/2 rounded-md border border-accent/30 bg-bg-elevated px-4 py-3 text-sm font-medium text-ink shadow-lg"
    >
      {message}
    </div>
  );
}
