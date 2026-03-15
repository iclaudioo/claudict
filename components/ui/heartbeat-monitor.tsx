"use client";
import { cn } from "@/lib/utils";

interface HeartbeatMonitorProps {
  className?: string;
  scrollProgress?: number;
}

export function HeartbeatMonitor({ className, scrollProgress = 0 }: HeartbeatMonitorProps) {
  // ECG-style path: flat -> small bump -> flat -> big spike -> dip -> flat
  const path = "M0,30 L180,30 L190,30 L195,28 L200,30 L220,30 L230,10 L235,50 L240,25 L245,30 L400,30 L600,30";

  // Flatline path: just a straight line
  const flatlinePath = "M0,30 L600,30";

  // Dynamic animation speed based on scroll progress
  // Normal: 3s, slowing: 5-8s, flatline: stopped
  const isFlatlined = scrollProgress > 0.85;
  const isSlowing = scrollProgress > 0.6;

  let animDuration = "3s";
  if (isFlatlined) {
    animDuration = "0s";
  } else if (isSlowing) {
    // Lerp from 3s to 8s between 0.6 and 0.85
    const t = (scrollProgress - 0.6) / 0.25;
    animDuration = `${3 + t * 5}s`;
  }

  const activePath = isFlatlined ? flatlinePath : path;

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <svg viewBox="0 0 600 60" className="w-full h-[40px]" preserveAspectRatio="none">
        {/* Background line */}
        <line x1="0" y1="30" x2="600" y2="30" stroke="var(--color-border)" strokeWidth="1" />
        {/* Animated heartbeat */}
        <path
          d={activePath}
          fill="none"
          stroke={isFlatlined ? "var(--color-muted)" : "var(--color-accent)"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="heartbeat-path"
          style={{
            animationDuration: isFlatlined ? "0s" : animDuration,
            animationPlayState: isFlatlined ? "paused" : "running",
            strokeDashoffset: isFlatlined ? "0" : undefined,
            strokeDasharray: isFlatlined ? "none" : "800",
          }}
        />
        {/* Glow version */}
        <path
          d={activePath}
          fill="none"
          stroke={isFlatlined ? "var(--color-muted)" : "var(--color-accent)"}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={isFlatlined ? "0.1" : "0.3"}
          className="heartbeat-path"
          style={{
            filter: "blur(4px)",
            animationDuration: isFlatlined ? "0s" : animDuration,
            animationPlayState: isFlatlined ? "paused" : "running",
            strokeDashoffset: isFlatlined ? "0" : undefined,
            strokeDasharray: isFlatlined ? "none" : "800",
          }}
        />
        {/* Flatline label */}
        {isFlatlined && (
          <text
            x="300"
            y="22"
            textAnchor="middle"
            fill="var(--color-muted)"
            fontSize="10"
            fontFamily="var(--font-mono)"
            opacity="0.6"
          >
            PATIENT LOST
          </text>
        )}
      </svg>
    </div>
  );
}
