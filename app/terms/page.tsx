import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export const metadata: Metadata = {
  title: "Facility admission terms | Claudict",
  description: "Read before checking in. The facility's admission terms.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Link href="/" className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors mb-6">
        &larr; Back to facility
      </Link>

      <header className="mb-12">
        <p className="text-[10px] uppercase tracking-[3px] text-accent font-mono mb-3">
          Legal department
        </p>
        <h1 className="text-3xl font-bold font-heading mb-3">
          Facility admission terms
        </h1>
        <p className="text-sm text-muted">
          Last updated: March 2026. Read before checking in.
        </p>
      </header>

      <div className="divider-heartbeat mb-10" />

      <div className="space-y-10 text-sm leading-relaxed text-text/90">
        <RevealOnScroll>
          <section>
            <h2 className="text-lg font-heading font-semibold mb-3">1. Acceptance of terms</h2>
            <p>
              By accessing or using Claudict (&quot;the facility&quot;), you agree to be
              bound by these terms. If you do not agree, do not use the service.
              We know you will anyway, but legally we had to say it.
            </p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={50}>
          <section>
            <h2 className="text-lg font-heading font-semibold mb-3">2. Nature of the service</h2>
            <p>
              Claudict is a satirical community website themed as an addiction
              recovery center. It is not a medical facility. It does not provide
              medical, psychological, or therapeutic advice. All clinical language
              is used for comedic and community purposes only.
            </p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <section>
            <h2 className="text-lg font-heading font-semibold mb-3">3. User accounts</h2>
            <p>
              Accounts are created via GitHub OAuth. You are responsible for your
              account activity. One account per person. We reserve the right to
              suspend or terminate accounts (&quot;involuntary discharge&quot;) that
              violate these terms.
            </p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={150}>
          <section>
            <h2 className="text-lg font-heading font-semibold mb-3">4. User-generated content</h2>
            <p className="mb-2">
              You retain ownership of content you submit. By posting, you grant
              Claudict a non-exclusive, royalty-free, worldwide license to
              display, distribute, and moderate your content within the platform.
            </p>
            <p>
              You are solely responsible for content you submit. You represent
              that you have the right to share it and that it does not infringe on
              third-party rights.
            </p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <section>
            <h2 className="text-lg font-heading font-semibold mb-3">5. Prohibited content</h2>
            <p className="mb-2">You may not post content that:</p>
            <ul className="list-disc pl-5 space-y-1 text-muted mt-3">
              <li>Contains hate speech, harassment, or threats</li>
              <li>Is illegal in your jurisdiction or ours</li>
              <li>Contains malware, spam, or phishing attempts</li>
              <li>Infringes on intellectual property rights</li>
              <li>Contains pornographic or excessively violent material</li>
              <li>Impersonates others or misrepresents affiliation</li>
              <li>Constitutes actual medical or therapeutic advice</li>
            </ul>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={250}>
          <section>
            <h2 className="text-lg font-heading font-semibold mb-3">6. Content moderation</h2>
            <p>
              We reserve the right to remove content and suspend accounts at our
              discretion. We are not obligated to monitor all content but may do
              so. Moderation decisions are final.
            </p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={300}>
          <section>
            <h2 className="text-lg font-heading font-semibold mb-3">7. Limitation of liability</h2>
            <p>
              Claudict is provided &quot;as is&quot; without warranties of any kind. We are
              not liable for any damages arising from your use of the service,
              including but not limited to: lost productivity from spending time
              here instead of actually coding, emotional distress from accurate
              diagnoses, or relationship damage from sharing your patient file.
            </p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={350}>
          <section>
            <h2 className="text-lg font-heading font-semibold mb-3">8. Intellectual property</h2>
            <p>
              The Claudict name, design, and original content are the property of
              the project maintainers. The site is open source under its
              repository license. Third-party trademarks (GitHub, Claude, Anthropic)
              belong to their respective owners.
            </p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={400}>
          <section>
            <h2 className="text-lg font-heading font-semibold mb-3">9. Modifications</h2>
            <p>
              We may modify these terms at any time. Continued use after changes
              constitutes acceptance. We will make reasonable efforts to notify
              users of material changes.
            </p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={450}>
          <section>
            <h2 className="text-lg font-heading font-semibold mb-3">10. Governing law</h2>
            <p>
              These terms are governed by Belgian law. Any disputes shall be
              resolved in the courts of Belgium.
            </p>
          </section>
        </RevealOnScroll>

        <div className="pt-6 border-t border-border text-xs text-muted font-mono">
          <p>
            See also:{" "}
            <Link href="/privacy" className="text-accent hover:underline">
              Patient data processing protocol
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
