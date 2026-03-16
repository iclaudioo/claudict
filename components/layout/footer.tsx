import Link from "next/link";
import { RotatingDisclaimer } from "@/components/ui/rotating-disclaimer";

export function Footer() {
  return (
    <footer className="mt-auto">
      <div className="divider-heartbeat" />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted font-mono">
          <p><span className="text-accent">Claudict</span> Recovery Center. Est. 2026.</p>
          <div className="flex gap-6">
            <Link href="/sponsor" className="nav-link hover:text-text transition-colors">
              Sponsor a recovery
            </Link>
            <a
              href="https://github.com/iclaudioo/claudict/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link hover:text-text transition-colors"
            >
              Suggest improvements
            </a>
            <a
              href="https://github.com/iclaudioo/claudict"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link hover:text-text transition-colors flex items-center gap-1"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Contribute
            </a>
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
        <div className="mt-4 pt-4 border-t border-border/50 flex flex-wrap justify-center gap-4 text-xs text-muted font-mono">
          <Link href="/privacy" className="hover:text-accent transition-colors">
            Privacy
          </Link>
          <span className="text-border">&middot;</span>
          <Link href="/terms" className="hover:text-accent transition-colors">
            Terms
          </Link>
          <span className="text-border">&middot;</span>
          <Link href="/cookies" className="hover:text-accent transition-colors">
            Cookies
          </Link>
        </div>
        <div className="mt-4 text-center md:text-left">
          <RotatingDisclaimer />
        </div>
      </div>
    </footer>
  );
}
