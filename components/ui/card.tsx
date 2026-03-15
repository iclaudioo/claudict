import { cn } from "@/lib/utils";

type CardVariant = "default" | "log" | "evidence" | "showcase";

const variantStyles: Record<CardVariant, string> = {
  default:
    "bg-surface border border-border rounded-lg p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-accent/30",
  log:
    "bg-transparent border-l-2 border-border pl-4 py-2 rounded-none transition-all duration-200 hover:border-l-accent",
  evidence:
    "bg-surface border border-border rounded-sm p-0 overflow-hidden transition-all duration-200 hover:border-accent/30",
  showcase:
    "bg-surface border border-border rounded-lg p-0 overflow-hidden transition-all duration-200 hover:scale-[1.02]",
};

export function Card({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: CardVariant }) {
  return (
    <div
      className={cn(variantStyles[variant], className)}
      {...props}
    />
  );
}
