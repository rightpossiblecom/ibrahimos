import type { Metadata } from "next";
import { FormPageShell } from "@/components/FormPageShell";
import { LeadForm } from "@/components/LeadForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Talk to sales",
};

export default function DemoPage() {
  return (
    <FormPageShell
      eyebrow={siteConfig.brandName}
      title="Talk to sales"
      description="See the farm assistant, disease checks, and dashboard on a walkthrough tailored to your crops."
    >
      <LeadForm form="demo" />
    </FormPageShell>
  );
}
