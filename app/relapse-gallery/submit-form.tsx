"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { submitShowcase } from "./actions";
import { useState, useRef } from "react";

export function SubmitShowcaseForm() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  if (!open) {
    return (
      <Button variant="secondary" onClick={() => setOpen(true)} className="mb-6">
        Document a relapse
      </Button>
    );
  }

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await submitShowcase(formData);
    if (result?.error) {
      setError(result.error);
      return;
    }
    formRef.current?.reset();
    setOpen(false);
  }

  return (
    <Card className="mb-6">
      <form ref={formRef} action={handleSubmit} className="space-y-4">
        <input
          name="title"
          type="text"
          required
          maxLength={100}
          placeholder="Project name"
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <textarea
          name="description"
          required
          rows={3}
          placeholder="What did you build during this episode?"
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-y"
        />
        <input
          name="tech_stack"
          type="text"
          placeholder="Tech stack (comma-separated: Next.js, Supabase, ...)"
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <input
          name="project_url"
          type="url"
          placeholder="Project URL (optional)"
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Screenshot (optional)
          </label>
          <input
            name="image"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="w-full text-sm text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border file:border-border file:bg-surface file:text-sm file:text-text file:cursor-pointer"
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <div className="flex gap-2">
          <Button type="submit">Confess</Button>
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
