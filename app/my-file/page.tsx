import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { daysClean, formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { BadgePill } from "@/components/ui/badge-pill";
import { RelapseButton } from "./relapse-button";
import { Button } from "@/components/ui/button";
import { signOut } from "./actions";
import Link from "next/link";

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
          <h1 className="text-xl font-semibold">{profile.username}</h1>
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

      {/* Activity lists */}
      {posts && posts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-[2px] text-muted mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent/60">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Therapy sessions
          </h2>
          <div className="space-y-2">
            {posts.map((post: any) => (
              <Link key={post.id} href={`/group-therapy/${post.id}`}>
                <Card className="py-3 hover:border-accent/30 transition-colors">
                  <p className="text-sm">{post.title}</p>
                  <p className="text-xs text-muted mt-1">
                    {formatDate(post.created_at)}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {evidenceItems && evidenceItems.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-[2px] text-muted mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent/60">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Submitted evidence
          </h2>
          <div className="space-y-2">
            {evidenceItems.map((item: any) => (
              <Card key={item.id} className="py-3">
                <p className="text-sm">{item.description}</p>
                <p className="text-xs text-muted mt-1">
                  {item.vote_count} deeply concerning
                </p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {showcases && showcases.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-[2px] text-muted mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent/60">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            Relapses
          </h2>
          <div className="space-y-2">
            {showcases.map((s: any) => (
              <Card key={s.id} className="py-3">
                <p className="text-sm">{s.title}</p>
                <p className="text-xs text-muted mt-1">
                  {formatDate(s.created_at)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Sign out */}
      <form action={signOut}>
        <Button variant="ghost" type="submit" className="text-muted">
          Leave facility
        </Button>
      </form>
    </div>
  );
}
