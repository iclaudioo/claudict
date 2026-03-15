"use client";

import { Button } from "@/components/ui/button";
import { submitIntake } from "./actions";
import { DosageSlider } from "./dosage-slider";

export function IntakeForm() {
  return (
    <form action={submitIntake} className="space-y-6">
      <div>
        <label htmlFor="username" className="block text-sm font-medium mb-1.5">
          Patient alias
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          pattern="[a-zA-Z0-9_-]+"
          minLength={3}
          maxLength={30}
          placeholder="your-username"
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <p className="text-xs text-muted mt-1">
          Letters, numbers, hyphens, and underscores only.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-3">
          Drug of choice
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: "Claude Opus", label: "Opus", desc: "The hard stuff", icon: "◆", iconColor: "text-accent" },
            { value: "Claude Sonnet", label: "Sonnet", desc: "Gateway drug", icon: "♦", iconColor: "text-amber-500" },
            { value: "Claude Haiku", label: "Haiku", desc: "Microdosing", icon: "•", iconColor: "text-emerald-500" },
            { value: "All of the above", label: "All", desc: "Severe case", icon: "✕", iconColor: "text-red-500" },
          ].map((drug) => (
            <label key={drug.value} className="relative cursor-pointer">
              <input
                type="radio"
                name="drug_of_choice"
                value={drug.value}
                required
                className="peer sr-only"
              />
              <div className="rounded-lg border border-border p-3 transition-all duration-200 peer-checked:border-accent peer-checked:bg-accent/5 hover:border-accent/30">
                <div className={`text-lg mb-1 ${drug.iconColor}`}>{drug.icon}</div>
                <p className="text-sm font-medium">{drug.label}</p>
                <p className="text-xs text-muted">{drug.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <DosageSlider />

      <div className="flex items-start gap-3">
        <input
          id="anyone_concerned"
          name="anyone_concerned"
          type="checkbox"
          className="mt-1 rounded border-border accent-accent"
        />
        <label htmlFor="anyone_concerned" className="text-sm">
          Has anyone expressed concern about your usage?
          <span className="block text-xs text-muted mt-0.5">
            (Partners, colleagues, your dog who no longer recognizes you)
          </span>
        </label>
      </div>

      <Button type="submit" className="w-full">
        Complete admission
      </Button>

      <p className="text-xs text-muted text-center">
        By completing admission, you acknowledge that recovery is unlikely.
      </p>
    </form>
  );
}
