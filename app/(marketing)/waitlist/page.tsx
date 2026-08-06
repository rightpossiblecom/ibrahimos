import type { Metadata } from "next";
import { FormPageShell } from "@/components/FormPageShell";
import { LeadForm } from "@/components/LeadForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Waitlist",
};

export default function WaitlistPage() {
  return (
    <FormPageShell
      eyebrow={siteConfig.brandName}
      title="Join the waitlist"
      description={`Be first in line when ${siteConfig.brandName} opens more farmer seats. Tell us how to reach you.`}
    >
      <LeadForm form="waitlist" />
    </FormPageShell>
  );
}
