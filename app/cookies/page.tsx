import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export const metadata: Metadata = {
  title: "Substance monitoring disclosure | Claudict",
  description: "What substances run in your browser. Spoiler: just one.",
};

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Link href="/" className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors mb-6">
        &larr; Back to facility
      </Link>

      <header className="mb-12">
        <p className="text-[10px] uppercase tracking-[3px] text-accent font-mono mb-3">
          Monitoring department
        </p>
        <h1 className="text-3xl font-bold font-heading mb-3">
          Substance monitoring disclosure
        </h1>
        <p className="text-sm text-muted">
          Last updated: March 2026. Full transparency on what runs in your browser.
        </p>
      </header>

      <div className="divider-heartbeat mb-10" />

      <div className="space-y-10 text-sm leading-relaxed text-text/90">
        <RevealOnScroll>
          <section>
            <h2 className="text-lg font-heading font-semibold mb-3">The short version</h2>
            <p>
              We monitor one thing: whether you&apos;re logged in. That&apos;s it. No behavioral profiling.
              No ad networks. No pixel trackers watching you spiral at 3am. Just one authentication
              cookie doing its job.
            </p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={50}>
          <section>
            <h2 className="text-lg font-heading font-semibold mb-3">Cookies</h2>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-elevated text-left">
                    <th className="px-4 py-2 font-medium">Cookie</th>
                    <th className="px-4 py-2 font-medium">Purpose</th>
                    <th className="px-4 py-2 font-medium">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-surface-elevated/50 transition-colors">
                    <td className="px-4 py-2 font-mono text-xs">sb-*-auth-token</td>
                    <td className="px-4 py-2 text-muted">
                      Supabase authentication session. Keeps you logged in.
                    </td>
                    <td className="px-4 py-2 text-muted">HttpOnly, Secure, Functional</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-muted text-xs">
              These cookies are classified as strictly necessary under GDPR and
              ePrivacy Directive. No opt-in is required.
            </p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <section>
            <h2 className="text-lg font-heading font-semibold mb-3">Local storage</h2>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-elevated text-left">
                    <th className="px-4 py-2 font-medium">Key</th>
                    <th className="px-4 py-2 font-medium">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-surface-elevated/50 transition-colors">
                    <td className="px-4 py-2 font-mono text-xs">theme</td>
                    <td className="px-4 py-2 text-muted">
                      Remembers your light/dark mode preference.
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-elevated/50 transition-colors">
                    <td className="px-4 py-2 font-mono text-xs">cookie_acknowledged</td>
                    <td className="px-4 py-2 text-muted">
                      Remembers you dismissed the cookie banner.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-muted text-xs">
              localStorage is not a cookie and is not transmitted to our servers.
              It stays in your browser only.
            </p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={150}>
          <section>
            <h2 className="text-lg font-heading font-semibold mb-3">Third-party cookies</h2>
            <p>None. Zero. We do not load any third-party scripts that set cookies.</p>
          </section>
        </RevealOnScroll>

        <div className="pt-6 border-t border-border text-xs text-muted font-mono">
          <p>
            See also:{" "}
            <Link href="/privacy" className="text-accent hover:underline">
              Patient data processing protocol
            </Link>
            {" | "}
            <Link href="/terms" className="text-accent hover:underline">
              Facility admission terms
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
