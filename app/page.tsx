import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatedStats } from "@/components/ui/animated-stats";
import { CATEGORIES } from "@/lib/constants";
import { timeAgo } from "@/lib/utils";
import { RotatingTagline } from "@/components/ui/rotating-tagline";
import { HeroIntro } from "@/components/ui/hero-intro";
import { ActivityTicker } from "@/components/ui/activity-ticker";
import { RelapseCounter } from "@/components/ui/relapse-counter";
import { ThoughtsAndPrayers } from "@/components/ui/thoughts-and-prayers";
import {
  HeroSection,
  ScrollHeartbeat,
  StatSection,
  TickerSection,
  SlideInLeft,
  SlideInRight,
} from "@/components/homepage-scroll-effects";
import Link from "next/link";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check if logged-in user has completed intake
  let hasProfile = false;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single();
    hasProfile = !!profile;
  }

  const [
    { data: intakeStat },
    { data: posts },
    { data: evidence },
    { data: recentRelapses },
    { data: lastRelapse },
  ] = await Promise.all([
    supabase.from("site_stats").select("value").eq("key", "intake_starts").single(),
    supabase
      .from("posts")
      .select("id, title, category, reply_count, last_activity_at, profiles(username)")
      .order("last_activity_at", { ascending: false })
      .limit(3),
    supabase
      .from("evidence")
      .select("id, description, vote_count, profiles(username)")
      .order("vote_count", { ascending: false })
      .limit(3),
    supabase
      .from("profiles")
      .select("username")
      .order("last_relapse_at", { ascending: false })
      .limit(3),
    supabase
      .from("profiles")
      .select("last_relapse_at")
      .order("last_relapse_at", { ascending: false })
      .limit(1),
  ]);

  const stats = [
    { value: intakeStat?.value || 0, label: "Patients", tooltip: "And counting. Nobody leaves." },
    { value: "0.3", label: "Avg days clean", tooltip: "Rounded up. Generously." },
    { value: "99.2%", label: "Relapse rate", tooltip: "Statistically, you relapsed while reading this." },
  ];

  return (
    <div>
      {/* Hero */}
      <HeroSection>
        <section className="text-center py-20 px-4">
          <HeroIntro>
            <RotatingTagline />
            <div className="mt-8">
              {user && hasProfile ? (
                <Link href="/group-therapy">
                  <Button>Enter group therapy</Button>
                </Link>
              ) : (
                <Link href="/intake">
                  <Button>Begin intake</Button>
                </Link>
              )}
            </div>
          </HeroIntro>
        </section>
      </HeroSection>

      {/* Heartbeat monitor */}
      <ScrollHeartbeat className="my-0" />

      {/* Stats */}
      <StatSection>
        <section className="border-b border-border bg-surface-elevated">
          <AnimatedStats stats={stats} />
        </section>
      </StatSection>

      {/* Relapse counter */}
      <RelapseCounter lastRelapseAt={lastRelapse?.[0]?.last_relapse_at || new Date().toISOString()} />

      {/* Activity ticker */}
      <TickerSection>
        <ActivityTicker recentRelapses={recentRelapses || []} patientCount={intakeStat?.value || 0} />
      </TickerSection>

      {/* Latest threads */}
      <section className="max-w-2xl mx-auto px-4 py-16">
        <h2 className="text-[10px] uppercase tracking-[3px] text-muted font-mono mb-4">
          Latest from the group
        </h2>
        <div className="space-y-3">
          {posts && posts.length > 0 ? (
            posts.map((post: any, i: number) => (
              <SlideInLeft key={post.id} delay={i * 80}>
                <Link href={`/group-therapy/${post.id}`}>
                  <Card className="hover:border-accent/30 transition-colors">
                    <p className="font-medium text-text">{post.title}</p>
                    <p className="text-xs text-muted mt-1.5">
                      {CATEGORIES[post.category] || post.category}
                      {" \u00b7 "}
                      {post.reply_count} replies
                      {" \u00b7 "}
                      {timeAgo(post.last_activity_at)}
                    </p>
                  </Card>
                </Link>
              </SlideInLeft>
            ))
          ) : (
            <Card>
              <p className="text-sm text-muted text-center py-4">
                No sessions recorded yet. The patients are in denial.
              </p>
            </Card>
          )}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/group-therapy"
            className="text-sm text-accent hover:text-accent-hover transition-colors link-slide"
          >
            View all sessions
          </Link>
        </div>
      </section>

      {/* Intervention CTA */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/intervention" className="block group">
          <div className="relative overflow-hidden rounded-lg border border-accent/20 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[3px] text-accent/70 font-mono mb-1.5">
                  Concerned partner program
                </p>
                <p className="text-sm text-text font-medium group-hover:text-accent transition-colors">
                  Is your loved one showing signs of Claude dependency?
                </p>
                <p className="text-xs text-muted mt-1">
                  Complete a clinical assessment. Generate an intervention notice.
                </p>
              </div>
              <div className="hidden sm:block text-accent/30 group-hover:text-accent/60 group-hover:translate-x-1 transition-all duration-200 text-2xl pl-4">
                &rarr;
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          </div>
        </Link>
      </section>

      {/* Latest evidence */}
      {evidence && evidence.length > 0 && (
        <section className="border-y border-border bg-surface-elevated/30 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-[10px] uppercase tracking-[3px] text-muted font-mono mb-6">
              Recent evidence
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {evidence.map((item: any) => (
                <SlideInRight key={item.id}>
                  <Card>
                    <p className="text-sm text-text">{item.description}</p>
                    <p className="text-xs text-muted mt-1.5">
                      {item.vote_count} deeply concerning
                      {" \u00b7 "}
                      by {item.profiles?.username || "anonymous"}
                    </p>
                  </Card>
                </SlideInRight>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                href="/clinical-evidence"
                className="text-sm text-accent hover:text-accent-hover transition-colors link-slide"
              >
                View all evidence
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Thoughts & prayers */}
      <ThoughtsAndPrayers />
    </div>
  );
}
