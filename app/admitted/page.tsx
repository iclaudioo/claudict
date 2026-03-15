import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admitted | Claudict Recovery Center",
};

export default async function AdmittedPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/intake");

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 stagger-children">
      {/* Confirmation */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <p className="text-xs uppercase tracking-[3px] text-accent mb-3">
          Admission complete
        </p>
        <h1 className="font-serif text-2xl md:text-3xl mb-2">
          Patient {profile.username} admitted.
        </h1>
        <p className="text-sm text-muted">
          Your case has been opened. Recovery is statistically unlikely, but we admire the optimism.
        </p>
      </div>

      {/* Treatment plan */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[2px] text-muted mb-4 text-center">
          Your treatment plan
        </p>
        <div className="space-y-3">
          <Link href="/group-therapy">
            <Card className="flex items-start gap-4 cursor-pointer">
              <div className="text-accent mt-0.5 shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-sm">Start your first therapy session</h3>
                <p className="text-xs text-muted mt-0.5">Share a relapse story, ask for an intervention, or enable fellow addicts.</p>
              </div>
            </Card>
          </Link>
          <Link href="/clinical-evidence">
            <Card className="flex items-start gap-4 cursor-pointer">
              <div className="text-accent mt-0.5 shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-sm">Submit clinical evidence</h3>
                <p className="text-xs text-muted mt-0.5">Upload screenshots of your worst moments. Let the community assess the damage.</p>
              </div>
            </Card>
          </Link>
          <Link href="/relapse-gallery">
            <Card className="flex items-start gap-4 cursor-pointer">
              <div className="text-accent mt-0.5 shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-sm">Document a relapse</h3>
                <p className="text-xs text-muted mt-0.5">Show off projects you built during coding episodes. Embrace the relapse.</p>
              </div>
            </Card>
          </Link>
        </div>
      </div>

      {/* Proceed link */}
      <div className="text-center">
        <Link
          href="/my-file"
          className="text-sm text-muted hover:text-text transition-colors"
        >
          Proceed to patient file
        </Link>
      </div>
    </div>
  );
}
