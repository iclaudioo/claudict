import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-surface border border-border rounded-lg p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-accent/30",
        className
      )}
      {...props}
    />
  );
}
