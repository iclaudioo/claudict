import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto">
      <div className="divider-heartbeat" />
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted font-mono">
        <p>Claudict Recovery Center. Est. 2026.</p>
        <div className="flex gap-6">
          <Link href="/sponsor" className="hover:text-text transition-colors">
            Sponsor a recovery
          </Link>
          <Link href="/group-therapy?category=meta" className="hover:text-text transition-colors">
            Feedback
          </Link>
        </div>
        <p className="text-[10px] uppercase tracking-widest flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3.5 h-3.5 text-accent"
          >
            <path
              fillRule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          Relapse rate: 99.2%
        </p>
      </div>
    </footer>
  );
}
