"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { submitEvidence } from "./actions";
import { useState, useRef } from "react";

export function SubmitEvidenceForm() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  if (!open) {
    return (
      <Button variant="secondary" onClick={() => setOpen(true)} className="mb-6">
        Submit evidence
      </Button>
    );
  }

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await submitEvidence(formData);
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
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Screenshot
          </label>
          <input
            name="image"
            type="file"
            required
            accept="image/png,image/jpeg,image/webp"
            className="w-full text-sm text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border file:border-border file:bg-surface file:text-sm file:text-text file:cursor-pointer"
          />
          <p className="text-xs text-muted mt-1">Max 5MB. PNG, JPEG, or WebP.</p>
        </div>
        <textarea
          name="description"
          required
          rows={2}
          placeholder="Describe the evidence..."
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-y"
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        <div className="flex gap-2">
          <Button type="submit">File evidence</Button>
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
