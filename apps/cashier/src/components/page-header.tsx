export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="font-[family-name:var(--font-display)] text-4xl tracking-wide">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 max-w-2xl text-[var(--muted)]">{subtitle}</p>
      ) : null}
    </div>
  );
}
