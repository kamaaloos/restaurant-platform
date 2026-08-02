export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide">
        {title}
      </h1>
      <p className="mt-1 text-[var(--muted)]">{subtitle}</p>
    </div>
  );
}
