import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Patient data processing protocol | Claudict",
  description: "How Claudict Recovery Center handles your data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <header className="mb-12">
        <p className="text-[10px] uppercase tracking-[3px] text-accent font-mono mb-3">
          Compliance department
        </p>
        <h1 className="text-3xl font-bold font-heading mb-2">
          Patient data processing protocol
        </h1>
        <p className="text-sm text-muted">
          Last updated: March 2026. Effective immediately upon admission.
        </p>
      </header>

      <div className="space-y-10 text-sm leading-relaxed text-text/90">
        <section>
          <h2 className="text-lg font-semibold mb-3">1. What data we collect</h2>
          <p className="mb-2">
            When you authenticate via GitHub OAuth, we receive and store:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-muted">
            <li>GitHub username</li>
            <li>Avatar URL</li>
            <li>Email address (if public on your GitHub profile)</li>
          </ul>
          <p className="mt-2">
            Additionally, we store content you voluntarily submit: forum posts,
            comments, clinical evidence uploads, showcase entries, and intake
            form responses.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">2. How we process your data</h2>
          <p>
            Your data is stored in Supabase (PostgreSQL). Supabase processes
            data in accordance with their DPA and supports EU hosting regions.
            We use your data solely to provide the Claudict community features.
            We do not sell, rent, or share your data with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">3. Cookies and local storage</h2>
          <p className="mb-2">
            We use strictly functional cookies only:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-muted">
            <li>
              <strong className="text-text">Supabase auth cookies</strong>: HttpOnly session
              cookies required for authentication. No opt-in needed under GDPR
              (strictly necessary).
            </li>
            <li>
              <strong className="text-text">Theme preference</strong>: stored in
              localStorage (not a cookie). Remembers your light/dark mode
              choice.
            </li>
            <li>
              <strong className="text-text">Cookie acknowledgement</strong>: stored in
              localStorage. Remembers you dismissed the cookie banner.
            </li>
          </ul>
          <p className="mt-2">
            We do not use analytics cookies, tracking pixels, advertising
            cookies, or any third-party cookies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">4. No tracking, no analytics, no ads</h2>
          <p>
            Claudict does not run Google Analytics, Meta Pixel, or any other
            tracking service. We do not serve advertisements. We do not build
            user profiles for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">5. Your rights</h2>
          <p className="mb-2">
            Under GDPR and applicable privacy laws, you have the right to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-muted">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data (&quot;discharge request&quot;)</li>
            <li>Export your data in a portable format</li>
            <li>Object to processing</li>
          </ul>
          <p className="mt-2">
            To exercise these rights, open an issue on our{" "}
            <a
              href="https://github.com/iclaudioo/claudict"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              GitHub repository
            </a>{" "}
            or contact us directly.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">6. Data retention</h2>
          <p>
            We retain your data for as long as your account is active. If you
            request account deletion, we will remove your personal data within
            30 days. Anonymized content (posts without identifying information)
            may be retained for community continuity.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">7. Minors</h2>
          <p>
            Claudict is not directed at children under 16. We do not knowingly
            collect data from minors. If you believe a minor has created an
            account, please contact us for removal.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">8. Changes to this policy</h2>
          <p>
            We may update this policy as the facility evolves. Material changes
            will be communicated via the site. Continued use after changes
            constitutes acceptance.
          </p>
        </section>

        <div className="pt-6 border-t border-border text-xs text-muted font-mono">
          <p>
            See also:{" "}
            <Link href="/terms" className="text-accent hover:underline">
              Facility admission terms
            </Link>
            {" | "}
            <Link href="/cookies" className="text-accent hover:underline">
              Substance monitoring disclosure
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
