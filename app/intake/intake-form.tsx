"use client";

import { Button } from "@/components/ui/button";
import { submitIntake } from "./actions";

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
        <label
          htmlFor="drug_of_choice"
          className="block text-sm font-medium mb-1.5"
        >
          Drug of choice
        </label>
        <select
          id="drug_of_choice"
          name="drug_of_choice"
          required
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="">Select your substance...</option>
          <option value="Claude Opus">Claude Opus</option>
          <option value="Claude Sonnet">Claude Sonnet</option>
          <option value="Claude Haiku">Claude Haiku</option>
          <option value="All of the above">All of the above (severe case)</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="hours_per_day"
          className="block text-sm font-medium mb-1.5"
        >
          Daily usage (hours)
        </label>
        <input
          id="hours_per_day"
          name="hours_per_day"
          type="number"
          required
          min={1}
          max={24}
          placeholder="14"
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

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
