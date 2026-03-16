import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { daysClean, formatDate } from "@/lib/utils";
import { BadgePill } from "@/components/ui/badge-pill";
import { RelapseButton } from "./relapse-button";
import { ActivityTabs } from "./activity-tabs";
import { LogoutButton } from "./logout-button";
import { ShareButton } from "./share-button";

export const metadata: Metadata = {
  title: "Patient file | Claudict Recovery Center",
};

export default async function MyFilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const [
    { data: profile },
    { data: badges },
    { data: posts },
    { data: evidenceItems },
    { data: showcases },
  ] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("profile_badges")
      .select("awarded_at, badges(name, icon, description)")
      .eq("profile_id", user.id),
    supabase
      .from("posts")
      .select("id, title, category, created_at")
      .eq("author_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("evidence")
      .select("id, description, vote_count, created_at")
      .eq("author_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("showcases")
      .select("id, title, created_at")
      .eq("author_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  if (!profile) redirect("/intake");

  const days = daysClean(profile.last_relapse_at);
  const avatarUrl = user.user_metadata?.avatar_url;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 stagger-children">
      <p className="text-xs uppercase tracking-[3px] text-accent mb-6">
        Patient file
      </p>

      {/* Header */}
      <div className="flex items-start gap-5 mb-10">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt={profile.username}
            className="w-20 h-20 md:w-24 md:h-24 rounded-xl ring-2 ring-accent/30 ring-offset-2 ring-offset-bg"
          />
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">{profile.username}</h1>
            <LogoutButton />
          </div>
          <p className="text-sm text-muted">
            Admitted {formatDate(profile.created_at)}
          </p>
          <p className="text-xs text-muted mt-1">
            Drug of choice: {profile.drug_of_choice}
            {" \u00b7 "}
            Self-reported usage: {profile.hours_per_day}h/day
          </p>
        </div>
      </div>

      {/* Days clean + relapse */}
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
        <div className="mt-5">
          <RelapseButton />
        </div>
      </div>

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

      {/* Activity dossier tabs */}
      <ActivityTabs
        posts={posts || []}
        evidence={evidenceItems || []}
        showcases={showcases || []}
      />

      {/* Actions */}
      <div className="flex items-center gap-3">
        <ShareButton username={profile.username} />
      </div>
    </div>
  );
}
