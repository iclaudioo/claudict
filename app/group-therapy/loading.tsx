import { CardSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="h-3 w-24 bg-surface-elevated rounded animate-pulse mb-2" />
      <div className="h-7 w-48 bg-surface-elevated rounded animate-pulse mb-6" />
      <div className="flex gap-2 mb-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-6 w-20 bg-surface-elevated rounded-full animate-pulse" />
        ))}
      </div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
