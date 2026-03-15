import { EvidenceCardSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="h-3 w-28 bg-surface-elevated rounded animate-pulse mb-2" />
      <div className="h-7 w-44 bg-surface-elevated rounded animate-pulse mb-6" />
      <div className="flex gap-2 mb-6">
        <div className="h-6 w-28 bg-surface-elevated rounded-full animate-pulse" />
        <div className="h-6 w-16 bg-surface-elevated rounded-full animate-pulse" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <EvidenceCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
