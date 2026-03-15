import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sponsor a recovery | Claudict Recovery Center",
  description: "Your contribution funds treatment facilities and ongoing research.",
};

export default function SponsorPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <p className="text-xs uppercase tracking-[3px] text-accent mb-4">
        Sponsor a recovery
      </p>
      <h1 className="text-2xl font-heading mb-4">
        Your generosity funds treatment.
      </h1>
      <p className="text-sm text-muted leading-relaxed mb-8">
        Every contribution goes directly toward maintaining treatment
        facilities (server costs), funding ongoing research (new features),
        and providing group therapy resources (keeping the lights on).
      </p>

      <RevealOnScroll>
        <Card className="text-left mb-6">
          <h2 className="font-medium mb-3">Where your money goes</h2>
          <ul className="space-y-2 text-sm text-muted">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">&#x2022;</span>
              <span>
                <strong className="text-text">Facility maintenance</strong>{" "}
                (Vercel hosting, Supabase database, domain renewal)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">&#x2022;</span>
              <span>
                <strong className="text-text">Research programs</strong>{" "}
                (new features, better therapy tools, enhanced wall of shame)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">&#x2022;</span>
              <span>
                <strong className="text-text">Patient care</strong>{" "}
                (keeping the community running 24/7, because addicts don&apos;t sleep)
              </span>
            </li>
          </ul>
        </Card>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <a
          href="https://buymeacoffee.com/claudict"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="text-base px-8 py-3">
            Fund a recovery
          </Button>
        </a>

        <p className="text-xs text-muted mt-6">
          Disclaimer: No actual recovery has ever been achieved.
          <br />
          Your donation enables continued relapse in a safe environment.
        </p>
      </RevealOnScroll>
    </div>
  );
}
