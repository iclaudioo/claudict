import { ShowcaseCardSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="h-3 w-28 bg-surface-elevated rounded animate-pulse mb-2" />
      <div className="h-7 w-56 bg-surface-elevated rounded animate-pulse mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ShowcaseCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
