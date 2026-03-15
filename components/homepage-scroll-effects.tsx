"use client";

import { ReactNode } from "react";
import { ScrollAnimated } from "@/components/ui/scroll-animated";
import { HeartbeatMonitor } from "@/components/ui/heartbeat-monitor";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function HeroSection({ children }: { children: ReactNode }) {
  return (
    <ScrollAnimated parallax={-40} opacity={[1, 0]} startAtZero>
      {children}
    </ScrollAnimated>
  );
}

export function RecoveryLabel({ children }: { children: ReactNode }) {
  return (
    <ScrollAnimated parallax={-60}>
      {children}
    </ScrollAnimated>
  );
}

export function ScrollHeartbeat({ className }: { className?: string }) {
  const { ref, progress } = useScrollProgress();

  return (
    <div ref={ref}>
      <HeartbeatMonitor className={className} scrollProgress={progress} />
    </div>
  );
}

export function StatSection({ children }: { children: ReactNode }) {
  return (
    <ScrollAnimated scale={[0.96, 1]} rotate={[-0.5, 0]}>
      {children}
    </ScrollAnimated>
  );
}

export function TickerSection({ children }: { children: ReactNode }) {
  return (
    <ScrollAnimated parallax={20}>
      {children}
    </ScrollAnimated>
  );
}

export function SlideInLeft({ children, delay }: { children: ReactNode; delay?: number }) {
  return (
    <ScrollAnimated translateX={[-20, 0]} opacity={[0, 1]}>
      <div style={{ transitionDelay: delay ? `${delay}ms` : undefined }}>
        {children}
      </div>
    </ScrollAnimated>
  );
}

export function SlideInRight({ children }: { children: ReactNode }) {
  return (
    <ScrollAnimated translateX={[20, 0]} opacity={[0, 1]}>
      {children}
    </ScrollAnimated>
  );
}
