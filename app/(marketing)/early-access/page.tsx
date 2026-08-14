import type { Metadata } from "next";
import { FormPageShell } from "@/components/FormPageShell";
import { LeadForm } from "@/components/LeadForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Talk to sales",
};

export default function EarlyAccessPage() {
  return (
    <FormPageShell
      eyebrow={siteConfig.brandName}
      title="Talk to sales"
      description="Tell us about your farm or cooperative. We will follow up on Premium AI, disease detection, and yield tools."
    >
      <LeadForm form="early-access" />
    </FormPageShell>
  );
}
