import type { Metadata } from "next";
import { FormPageShell } from "@/components/FormPageShell";
import { LeadForm } from "@/components/LeadForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Early access",
};

export default function EarlyAccessPage() {
  return (
    <FormPageShell
      eyebrow={siteConfig.brandName}
      title="Request early access"
      description="Get Priority Premium features — unlimited AI, disease detection, and yield tools — as seats open."
    >
      <LeadForm form="early-access" />
    </FormPageShell>
  );
}
