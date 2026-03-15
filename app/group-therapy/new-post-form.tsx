"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createPost } from "./actions";
import { CATEGORY_LIST } from "@/lib/constants";
import { useState } from "react";

export function NewPostForm() {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <Button variant="secondary" onClick={() => setOpen(true)} className="mb-6">
        Start a session
      </Button>
    );
  }

  return (
    <Card className="mb-6">
      <form action={createPost} className="space-y-4">
        <select
          name="category"
          required
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="">Select therapy room...</option>
          {CATEGORY_LIST.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        <input
          name="title"
          type="text"
          required
          maxLength={200}
          placeholder="What happened?"
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <textarea
          name="body"
          required
          rows={4}
          placeholder="Tell the group everything..."
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-y"
        />
        <div className="flex gap-2">
          <Button type="submit">Share with the group</Button>
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
