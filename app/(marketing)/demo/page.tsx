import type { Metadata } from "next";
import { FormPageShell } from "@/components/FormPageShell";
import { LeadForm } from "@/components/LeadForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Book a demo",
};

export default function DemoPage() {
  return (
    <FormPageShell
      eyebrow={siteConfig.brandName}
      title="Book a demo"
      description="See the farm assistant, disease checks, and dashboard on a live walkthrough tailored to your crops."
    >
      <LeadForm form="demo" />
    </FormPageShell>
  );
}
