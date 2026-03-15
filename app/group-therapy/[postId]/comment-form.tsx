"use client";

import { Button } from "@/components/ui/button";
import { createComment } from "./actions";
import { useRef } from "react";

export function CommentForm({ postId }: { postId: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    await createComment(postId, formData);
    formRef.current?.reset();
  }

  return (
    <form ref={formRef} action={handleSubmit} className="mt-6 space-y-3">
      <textarea
        name="body"
        required
        rows={3}
        placeholder="Share your thoughts with the group..."
        className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-y"
      />
      <Button type="submit">Respond</Button>
    </form>
  );
}
