import { createClient } from "@/lib/supabase/server";
import { LoginButton } from "@/components/layout/login-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatedStats } from "@/components/ui/animated-stats";
import { CATEGORIES } from "@/lib/constants";
import { timeAgo } from "@/lib/utils";
import { Typewriter } from "@/components/ui/typewriter";
import { HeartbeatMonitor } from "@/components/ui/heartbeat-monitor";
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
  ]);

  const stats = [
    { value: patientCount || 0, label: "Patients", icon: <PatientIcon /> },
    { value: "0.3", label: "Avg days clean", icon: <ClockIcon /> },
    { value: "99.2%", label: "Relapse rate", icon: <ChartUpIcon /> },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="text-center py-20 px-4 stagger-children">
        <p className="text-xs uppercase tracking-[3px] text-accent mb-4">
          Recovery Center
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-text max-w-xl mx-auto leading-tight">
          The first step is admitting you have a problem.
        </h1>
        <p className="text-sm text-muted mt-5 max-w-md mx-auto leading-relaxed">
          A support community for developers who said{" "}
          <Typewriter text={'"just one more prompt"'} delay={800} speed={40} className="text-accent font-mono" />
          {" "}14 hours ago.
        </p>
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

      {/* Heartbeat monitor */}
      <HeartbeatMonitor className="my-0" />

      {/* Stats */}
      <section className="border-b border-border bg-surface-elevated">
        <AnimatedStats stats={stats} />
      </section>

      {/* Latest threads */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-xs uppercase tracking-[2px] text-muted mb-4">
          Latest group therapy
        </h2>
        <div className="space-y-3 stagger-children">
          {posts && posts.length > 0 ? (
            posts.map((post: any) => (
              <Link key={post.id} href={`/group-therapy/${post.id}`}>
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

      {/* Latest evidence */}
      {evidence && evidence.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-xs uppercase tracking-[2px] text-muted mb-4">
            Recent clinical evidence
          </h2>
          <div className="space-y-3 stagger-children">
            {evidence.map((item: any) => (
              <Card key={item.id}>
                <p className="text-sm text-text">{item.description}</p>
                <p className="text-xs text-muted mt-1.5">
                  {item.vote_count} deeply concerning
                  {" \u00b7 "}
                  by {item.profiles?.username || "anonymous"}
                </p>
              </Card>
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
    </div>
  );
}
