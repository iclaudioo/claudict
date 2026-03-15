import Link from "next/link";
import { RotatingDisclaimer } from "@/components/ui/rotating-disclaimer";

export function Footer() {
  return (
    <footer className="mt-auto">
      <div className="divider-heartbeat" />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted font-mono">
          <p>Claudict Recovery Center. Est. 2026.</p>
          <div className="flex gap-6">
            <Link href="/sponsor" className="hover:text-text transition-colors">
              Sponsor a recovery
            </Link>
            <Link href="/group-therapy?category=meta" className="hover:text-text transition-colors">
              Feedback
            </Link>
          </div>
          <Link
            href="/intake"
            className="text-[10px] uppercase tracking-widest flex items-center gap-1.5 text-accent/60 hover:text-accent transition-colors"
            title="Not a real hotline. Obviously."
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Emergency relapse hotline
          </Link>
        </div>
        <div className="mt-4 text-center md:text-left">
          <RotatingDisclaimer />
        </div>
      </div>
    </footer>
  );
}
