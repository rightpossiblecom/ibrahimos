export function FormPageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-ink-muted">
        {description}
      </p>
      <div className="mt-10">{children}</div>
    </main>
  );
}
