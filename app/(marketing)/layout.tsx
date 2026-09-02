import { MarketingFooter } from "@/components/MarketingFooter";
import { MarketingHeader } from "@/components/MarketingHeader";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MarketingHeader />
      <div className="h-16 shrink-0" aria-hidden />
      <div className="flex-1">{children}</div>
      <MarketingFooter />
    </>
  );
}
