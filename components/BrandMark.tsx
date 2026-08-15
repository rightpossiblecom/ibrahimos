import Link from "next/link";
import { siteConfig } from "@/config/site";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-ink ${className}`}
    >
      <span>{siteConfig.brandName}</span>
    </Link>
  );
}
