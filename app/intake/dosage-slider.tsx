"use client";

import { useState } from "react";

const LEVELS = [
  { min: 1, max: 4, label: "Recreational", color: "text-emerald-500" },
  { min: 5, max: 8, label: "Concerning", color: "text-amber-500" },
  { min: 9, max: 14, label: "Severe", color: "text-orange-500" },
  { min: 15, max: 24, label: "Terminal", color: "text-red-500" },
];

function getLevel(hours: number) {
  return LEVELS.find((l) => hours >= l.min && hours <= l.max) || LEVELS[LEVELS.length - 1];
}

export function DosageSlider() {
  const [hours, setHours] = useState(8);
  const level = getLevel(hours);
  const percentage = ((hours - 1) / 23) * 100;

  return (
    <div>
      <label htmlFor="hours_per_day" className="block text-sm font-medium mb-1.5">
        Daily usage (hours)
      </label>

      <div className="relative mt-2">
        {/* Hidden input for form submission */}
        <input type="hidden" name="hours_per_day" value={hours} />

        {/* Slider track background */}
        <div className="relative h-2 rounded-full bg-border overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-150"
            style={{
              width: `${percentage}%`,
              background: `linear-gradient(90deg, #10b981 0%, #f59e0b 40%, #f97316 70%, #ef4444 100%)`,
            }}
          />
        </div>

        {/* Native range input overlaid */}
        <input
          id="hours_per_day"
          type="range"
          min={1}
          max={24}
          value={hours}
          onChange={(e) => setHours(parseInt(e.target.value))}
          className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
        />

        {/* Custom thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 shadow-md pointer-events-none transition-all duration-150"
          style={{
            left: `calc(${percentage}% - 10px)`,
            borderColor:
              hours <= 4
                ? "#10b981"
                : hours <= 8
                  ? "#f59e0b"
                  : hours <= 14
                    ? "#f97316"
                    : "#ef4444",
          }}
        />
      </div>

      {/* Value display */}
      <div className="flex justify-between items-center mt-3">
        <span className={`text-sm font-mono font-bold ${level.color}`}>
          {hours}h/day
        </span>
        <span className={`text-xs font-medium uppercase tracking-wider ${level.color}`}>
          {level.label}
        </span>
      </div>

      {/* Level indicators */}
      <div className="flex justify-between mt-2 text-[10px] text-muted">
        <span>1h</span>
        <span>8h</span>
        <span>16h</span>
        <span>24h</span>
      </div>
    </div>
  );
}
