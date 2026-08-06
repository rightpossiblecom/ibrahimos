"use client";

import { ConversionModal } from "@/components/demo/ConversionModal";
import { demoFlow } from "@/config/demo-flow";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
};

export function PremiumModal({ open, onClose, onSuccess }: Props) {
  const copy = demoFlow.conversion.premium;
  return (
    <ConversionModal
      open={open}
      title={copy.title}
      body={copy.body}
      ctaLabel={copy.ctaLabel}
      onClose={onClose}
      onConfirm={() => {
        onClose();
        onSuccess("Premium interest saved");
      }}
    />
  );
}
