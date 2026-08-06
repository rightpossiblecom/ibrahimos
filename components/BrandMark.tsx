import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getProductMedia } from "@/lib/product-assets";

export function BrandMark({ className = "" }: { className?: string }) {
  const { logo } = getProductMedia();

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-ink ${className}`}
    >
      {logo ? (
        <Image
          src={logo}
          alt=""
          width={28}
          height={28}
          className="h-7 w-7 object-contain"
        />
      ) : null}
      <span>{siteConfig.brandName}</span>
    </Link>
  );
}
