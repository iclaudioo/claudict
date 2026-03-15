export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="text-center py-16">
      <p className="text-lg font-medium text-text">{title}</p>
      <p className="text-sm text-muted mt-2">{description}</p>
    </div>
  );
}
