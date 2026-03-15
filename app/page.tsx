import { createClient } from "@/lib/supabase/server";
import { LoginButton } from "@/components/layout/login-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CATEGORIES } from "@/lib/constants";
import { timeAgo } from "@/lib/utils";
import Link from "next/link";

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

  return (
    <div>
      {/* Hero */}
      <section className="text-center py-20 px-4">
        <p className="text-xs uppercase tracking-[3px] text-accent mb-4">
          Recovery Center
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-text max-w-xl mx-auto leading-tight">
          The first step is admitting you have a problem.
        </h1>
        <p className="text-sm text-muted mt-5 max-w-md mx-auto leading-relaxed">
          A support community for developers who said
          &quot;just one more prompt&quot; 14 hours ago.
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

      {/* Stats */}
      <section className="border-y border-border bg-surface-elevated">
        <div className="max-w-3xl mx-auto px-4 py-5 flex justify-center gap-12 md:gap-16">
          <div className="text-center">
            <p className="text-2xl font-bold text-accent font-mono">
              {patientCount || 0}
            </p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">
              Patients
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent font-mono">0.3</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">
              Avg days clean
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent font-mono">99.2%</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">
              Relapse rate
            </p>
          </div>
        </div>
      </section>

      {/* Latest threads */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-xs uppercase tracking-[2px] text-muted mb-4">
          Latest group therapy
        </h2>
        <div className="space-y-3">
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
          <div className="space-y-3">
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
