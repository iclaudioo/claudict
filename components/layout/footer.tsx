import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
        <p>Claudict Recovery Center. Est. 2026.</p>
        <div className="flex gap-6">
          <Link href="/sponsor" className="hover:text-text transition-colors">
            Sponsor a recovery
          </Link>
          <Link href="/group-therapy?category=meta" className="hover:text-text transition-colors">
            Feedback
          </Link>
        </div>
        <p className="font-mono text-xs">Relapse rate: 99.2%</p>
      </div>
    </footer>
  );
}
