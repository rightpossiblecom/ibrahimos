import Link from "next/link";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 rounded-full border border-line/80 bg-panel px-3 py-2 font-display text-sm font-semibold uppercase tracking-[0.22em] text-ink transition-colors hover:border-accent/45 hover:text-accent ${className}`}
    >
      <span>IBRAHIMOS</span>
      <span className="rounded-full bg-accent px-2 py-0.5 text-[0.65rem] tracking-[0.18em] text-gold-ink">
        OPS
      </span>
    </Link>
  );
}
