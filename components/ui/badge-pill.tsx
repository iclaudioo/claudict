import { cn } from "@/lib/utils";

export function BadgePill({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-surface-elevated border border-border px-2.5 py-0.5 text-xs text-muted",
        className
      )}
      {...props}
    />
  );
}
