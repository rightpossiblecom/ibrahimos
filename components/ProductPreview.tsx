/** Illustrative UI preview — not a claim of real screenshots until owner media lands. */

export function ProductPreview({
  variant = "overview",
}: {
  variant?: "overview" | "assessment" | "market";
}) {
  if (variant === "assessment") {
    return (
      <div className="overflow-hidden border border-line bg-bg-elevated shadow-sm">
        <PreviewChrome title="Assessment · Maize" />
        <div className="space-y-4 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Disease · 91% confidence
            </p>
            <p className="mt-1 font-display text-xl font-semibold text-ink">
              Northern Corn Leaf Blight
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              Kaduna · 2.5 ha · humid nights ahead
            </p>
          </div>
          <div className="border-l-2 border-accent pl-3 text-sm text-ink-muted">
            Spray tomorrow morning · Scout adjacent rows · Log input cost
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {["Premium AI", "Financing", "Find buyers"].map((label) => (
              <div
                key={label}
                className="border border-line bg-bg px-3 py-2 text-center text-xs font-semibold text-ink"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "market") {
    return (
      <div className="overflow-hidden border border-line bg-bg-elevated shadow-sm">
        <PreviewChrome title="Market prices" />
        <div className="divide-y divide-line p-2">
          {[
            ["Maize", "₦42,000"],
            ["Rice", "₦78,000"],
            ["Tomato", "₦35,000"],
            ["Cassava", "₦18,000"],
          ].map(([crop, price]) => (
            <div
              key={crop}
              className="flex items-center justify-between px-3 py-3 text-sm"
            >
              <span className="font-medium text-ink">{crop}</span>
              <span className="font-semibold text-accent">{price}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-line bg-bg-elevated shadow-sm">
      <PreviewChrome title="Farm overview" />
      <div className="grid gap-3 p-5 sm:grid-cols-3">
        <div className="border border-line bg-bg p-4 sm:col-span-1">
          <p className="text-xs uppercase tracking-wider text-ink-muted">
            Farm health
          </p>
          <p className="mt-2 font-display text-4xl font-semibold text-accent">
            82
          </p>
          <p className="mt-1 text-xs text-ink-muted">Stable · watch blight</p>
        </div>
        <div className="border border-line bg-bg p-4 sm:col-span-2">
          <p className="text-xs uppercase tracking-wider text-ink-muted">
            Today
          </p>
          <ul className="mt-2 space-y-2 text-sm text-ink-muted">
            <li>Scout maize block B</li>
            <li>Side-dress tomato beds</li>
            <li>Rain likely Tuesday evening</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
          Recent assessments
        </p>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-ink">Leaf blight · Maize</span>
          <span className="text-accent">91%</span>
        </div>
      </div>
    </div>
  );
}

function PreviewChrome({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-line bg-accent-deep px-4 py-3">
      <span className="h-2 w-2 rounded-full bg-gold/80" aria-hidden />
      <span className="h-2 w-2 rounded-full bg-white/30" aria-hidden />
      <span className="h-2 w-2 rounded-full bg-white/20" aria-hidden />
      <span className="ml-2 text-xs font-medium text-white/90">{title}</span>
    </div>
  );
}
