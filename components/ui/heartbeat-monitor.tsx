"use client";
import { cn } from "@/lib/utils";

export function HeartbeatMonitor({ className }: { className?: string }) {
  // ECG-style path: flat -> small bump -> flat -> big spike -> dip -> flat
  const path = "M0,30 L180,30 L190,30 L195,28 L200,30 L220,30 L230,10 L235,50 L240,25 L245,30 L400,30 L600,30";

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <svg viewBox="0 0 600 60" className="w-full h-[40px]" preserveAspectRatio="none">
        {/* Background line */}
        <line x1="0" y1="30" x2="600" y2="30" stroke="var(--color-border)" strokeWidth="1" />
        {/* Animated heartbeat */}
        <path
          d={path}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="heartbeat-path"
        />
        {/* Glow version */}
        <path
          d={path}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.3"
          className="heartbeat-path"
          style={{ filter: "blur(4px)" }}
        />
      </svg>
    </div>
  );
}
