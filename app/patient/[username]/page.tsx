import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { daysClean, formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { BadgePill } from "@/components/ui/badge-pill";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function getDiagnosis(hours: number): { label: string; color: string } {
  if (hours <= 4) return { label: "Recreational user", color: "text-emerald-500" };
  if (hours <= 8) return { label: "Substance dependent", color: "text-amber-500" };
  if (hours <= 14) return { label: "Chronic abuser", color: "text-orange-500" };
  return { label: "Terminal case", color: "text-red-500" };
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `Patient ${username} | Claudict Recovery Center`,
    description: `Clinical record for patient ${username}. Recovery is unlikely.`,
    openGraph: {
      title: `Patient ${username} | Claudict Recovery Center`,
      description: `Clinical record for patient ${username}. Recovery is unlikely.`,
      images: [`/api/patient-card/${username}`],
    },
    twitter: {
      card: "summary_large_image",
      title: `Patient ${username} | Claudict Recovery Center`,
      images: [`/api/patient-card/${username}`],
    },
  };
}

export default async function PatientProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) notFound();

  const { data: badges } = await supabase
    .from("profile_badges")
    .select("awarded_at, badges(name, icon, description)")
    .eq("profile_id", profile.id);

  const days = daysClean(profile.last_relapse_at);
  const diagnosis = getDiagnosis(profile.hours_per_day);
  const severity = Math.min(100, Math.round((profile.hours_per_day / 24) * 100));
  const caseNumber = `CASE-${profile.id.substring(0, 8).toUpperCase()}`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 stagger-children">
      <p className="text-xs uppercase tracking-[3px] text-accent mb-2">
        Patient record
      </p>
      <p className="text-[10px] text-muted font-mono mb-6">{caseNumber}</p>

      {/* Patient header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">{profile.username}</h1>
        <p className="text-sm text-muted">
          Admitted {formatDate(profile.created_at)}
        </p>
        <p className="text-xs text-muted mt-1">
          Drug of choice: {profile.drug_of_choice}
        </p>
      </div>

      {/* Days clean */}
      <div className="mb-8 rounded-xl border-l-4 border-accent bg-gradient-to-r from-accent/5 to-transparent p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-5xl md:text-6xl font-bold text-accent leading-none">
              {days}
            </p>
            <div className="divider-heartbeat my-3 w-24" />
            <p className="text-sm text-muted uppercase tracking-wider">
              Days clean
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-lg text-muted/60">
              {profile.relapse_count}
            </p>
            <p className="text-xs text-muted/60 uppercase tracking-wider mt-1">
              Lifetime relapses
            </p>
          </div>
        </div>
      </div>

      {/* Diagnosis card */}
      <Card className="mb-6">
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted uppercase tracking-wider mb-1">Diagnosis</p>
            <p className={`font-mono font-bold ${diagnosis.color}`}>{diagnosis.label}</p>
          </div>
          <div>
            <p className="text-xs text-muted uppercase tracking-wider mb-2">Severity</p>
            <div className="w-full h-2 bg-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${severity}%`,
                  background: severity <= 30 ? '#10b981' : severity <= 50 ? '#f59e0b' : severity <= 70 ? '#f97316' : '#ef4444',
                }}
              />
            </div>
            <p className="text-xs text-muted mt-1">{profile.hours_per_day}h/day self-reported usage</p>
          </div>
          <div>
            <p className="text-xs text-muted uppercase tracking-wider mb-1">Prognosis</p>
            <p className="font-mono font-bold text-red-500">Recovery unlikely</p>
          </div>
        </div>
      </Card>

      {/* Badges */}
      {badges && badges.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-[2px] text-muted mb-3">
            Achievements
          </h2>
          <div className="flex flex-wrap gap-2">
            {badges.map((b: any, i: number) => (
              <BadgePill key={i} title={b.badges.description}>
                {b.badges.icon} {b.badges.name}
              </BadgePill>
            ))}
          </div>
        </div>
      )}

      {/* CTA for visitors */}
      <div className="text-center pt-8 border-t border-border">
        <p className="text-sm text-muted mb-4">
          Concerned about your own usage?
        </p>
        <Link href="/intake">
          <Button>Begin intake</Button>
        </Link>
      </div>
    </div>
  );
}
