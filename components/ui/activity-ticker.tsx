"use client";

import { useRef } from "react";

interface TickerProps {
  recentRelapses: Array<{ username: string }>;
  patientCount: number;
}

export function ActivityTicker({ recentRelapses, patientCount }: TickerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const items = [
    ...recentRelapses.map((r) => `patient ${r.username} just relapsed`),
    `${patientCount} patients currently admitted`,
    "longest clean streak this week: 3 days (broken)",
    "group therapy sessions are getting out of hand",
    "someone just submitted 14 hours of clinical evidence",
    "the relapse button has been pressed 847 times today",
    "a patient tried to quit and lasted 22 minutes",
    "facility WiFi password changed to \"just-one-more-prompt\"",
    "new study confirms: recovery is statistically unlikely",
  ];

  // Double for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden bg-accent/5 border-y border-accent/10 py-2">
      <div
        ref={scrollRef}
        className="flex gap-8 animate-ticker whitespace-nowrap text-xs text-muted font-mono"
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-2 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
