import { createClient } from "@/lib/supabase/server";
import { LoginButton } from "@/components/layout/login-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatedStats } from "@/components/ui/animated-stats";
import { CATEGORIES } from "@/lib/constants";
import { timeAgo } from "@/lib/utils";
import { RotatingTagline } from "@/components/ui/rotating-tagline";
import { ActivityTicker } from "@/components/ui/activity-ticker";
import { RelapseCounter } from "@/components/ui/relapse-counter";
import { ThoughtsAndPrayers } from "@/components/ui/thoughts-and-prayers";
import {
  HeroSection,
  RecoveryLabel,
  ScrollHeartbeat,
  StatSection,
  TickerSection,
  SlideInLeft,
  SlideInRight,
} from "@/components/homepage-scroll-effects";
import Link from "next/link";

const PatientIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ChartUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [
    { count: patientCount },
    { data: posts },
    { data: evidence },
    { data: recentRelapses },
    { data: lastRelapse },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
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
    { value: patientCount || 0, label: "Patients", icon: <PatientIcon />, tooltip: "And counting. Nobody leaves." },
    { value: "0.3", label: "Avg days clean", icon: <ClockIcon />, tooltip: "Rounded up. Generously." },
    { value: "99.2%", label: "Relapse rate", icon: <ChartUpIcon />, tooltip: "Statistically, you relapsed while reading this." },
  ];

  return (
    <div>
      {/* Hero */}
      <HeroSection>
        <section className="text-center py-20 px-4 stagger-children">
          <RecoveryLabel>
            <p className="text-xs uppercase tracking-[3px] text-accent mb-4">
              Recovery Center
            </p>
          </RecoveryLabel>
          <h1 className="font-serif text-3xl md:text-4xl text-text max-w-xl mx-auto leading-tight">
            The first step is admitting you have a problem.
          </h1>
          <RotatingTagline />
          <div className="mt-8">
            {user ? (
              <Link href="/group-therapy">
                <Button>Enter group therapy</Button>
              </Link>
            ) : (
              <LoginButton />
            )}
          </div>
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
        <ActivityTicker recentRelapses={recentRelapses || []} patientCount={patientCount || 0} />
      </TickerSection>

      {/* Latest threads */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-sm font-medium text-muted mb-4">
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
            className="text-sm text-accent hover:text-accent-hover transition-colors"
          >
            View all sessions
          </Link>
        </div>
      </section>

      {/* Intervention CTA */}
      <section className="max-w-3xl mx-auto px-4 pb-8">
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
              <div className="hidden sm:block text-accent/30 group-hover:text-accent/60 transition-colors text-2xl pl-4">
                &rarr;
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          </div>
        </Link>
      </section>

      {/* Latest evidence */}
      {evidence && evidence.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-sm font-medium text-muted mb-4">
            Recent evidence
          </h2>
          <div className="space-y-3">
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
              className="text-sm text-accent hover:text-accent-hover transition-colors"
            >
              View all evidence
            </Link>
          </div>
        </section>
      )}

      {/* Thoughts & prayers */}
      <ThoughtsAndPrayers />
    </div>
  );
}
