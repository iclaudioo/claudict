"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface Stat {
  value: number | string;
  label: string;
  icon: ReactNode;
  tooltip?: string;
}

interface AnimatedStatsProps {
  stats: Stat[];
}

function parseValue(value: number | string): { num: number; suffix: string; decimals: number } {
  if (typeof value === "number") {
    return { num: value, suffix: "", decimals: 0 };
  }
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) {
    return { num: 0, suffix: String(value), decimals: 0 };
  }
  const numStr = match[1];
  const suffix = match[2];
  const decimalPart = numStr.split(".")[1];
  const decimals = decimalPart ? decimalPart.length : 0;
  return { num: parseFloat(numStr), suffix, decimals };
}

function AnimatedNumber({ value, animate }: { value: number | string; animate: boolean }) {
  const { num, suffix, decimals } = parseValue(value);
  const rafRef = useRef<number>(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!animate) return;

    const duration = 1500;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(eased * num);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate, num]);

  const display = animate
    ? (current >= num ? num : current).toFixed(decimals) + suffix
    : "0" + suffix;

  return <>{display}</>;
}

export function AnimatedStats({ stats }: AnimatedStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="max-w-3xl mx-auto px-4 py-8 flex justify-center gap-12 md:gap-20"
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="text-center animate-fade-up group"
          style={{ "--stagger": i } as React.CSSProperties}
        >
          <div className="flex justify-center mb-2 text-accent">{stat.icon}</div>
          <p className="text-4xl md:text-5xl font-bold text-accent font-mono tracking-tight">
            <AnimatedNumber value={stat.value} animate={visible} />
          </p>
          <p className="text-xs text-muted uppercase tracking-wider mt-2">
            {stat.label}
          </p>
          {stat.tooltip && (
            <p className="text-[10px] text-accent/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 max-w-[140px] mx-auto">
              {stat.tooltip}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
