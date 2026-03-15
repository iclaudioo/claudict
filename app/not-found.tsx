import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="text-center py-24 px-4">
      <p className="font-mono text-5xl text-accent mb-4">404</p>
      <h1 className="text-xl font-heading text-text">
        Patient not found.
      </h1>
      <p className="text-sm text-muted mt-3">
        They may have been discharged. Or they never existed. We don&apos;t judge.
      </p>
      <div className="mt-8">
        <Link href="/">
          <Button variant="secondary">Return to facility</Button>
        </Link>
      </div>
    </div>
  );
}
