"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="text-center py-24 px-4">
      <p className="font-mono text-5xl text-accent mb-4">500</p>
      <h1 className="text-xl font-serif text-text">
        The facility is experiencing technical difficulties.
      </h1>
      <p className="text-sm text-muted mt-3">
        Our staff is on it. Please remain calm.
      </p>
      <div className="mt-8">
        <Button variant="secondary" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
}
