"use client";

import { useState } from "react";
import { cn, formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface ActivityTabsProps {
  posts: Array<{ id: string; title: string; created_at: string }>;
  evidence: Array<{ id: string; description: string; vote_count: number }>;
  showcases: Array<{ id: string; title: string; created_at: string }>;
}

const tabs = [
  {
    id: "posts" as const,
    label: "Therapy sessions",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "evidence" as const,
    label: "Evidence",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: "showcases" as const,
    label: "Relapses",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

export function ActivityTabs({ posts, evidence, showcases }: ActivityTabsProps) {
  const [active, setActive] = useState<"posts" | "evidence" | "showcases">("posts");

  const counts = {
    posts: posts.length,
    evidence: evidence.length,
    showcases: showcases.length,
  };

  return (
    <div className="mb-8">
      <div className="border-b border-border mb-4">
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
                active === tab.id
                  ? "border-accent text-text"
                  : "border-transparent text-muted hover:text-text"
              )}
            >
              {tab.icon}
              {tab.label}
              {counts[tab.id] > 0 && (
                <span className="text-xs bg-surface-elevated px-1.5 py-0.5 rounded-full">
                  {counts[tab.id]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div
        key={active}
        className="animate-in fade-in duration-200"
      >
        {active === "posts" && (
          <div className="space-y-2">
            {posts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-muted mb-3">No sessions on record.</p>
                <Link href="/group-therapy" className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Start your first therapy session
                </Link>
              </div>
            ) : (
              posts.map((post) => (
                <Link key={post.id} href={`/group-therapy/${post.id}`}>
                  <Card className="py-3 hover:border-accent/30 transition-colors">
                    <p className="text-sm">{post.title}</p>
                    <p className="text-xs text-muted mt-1">
                      {formatDate(post.created_at)}
                    </p>
                  </Card>
                </Link>
              ))
            )}
          </div>
        )}

        {active === "evidence" && (
          <div className="space-y-2">
            {evidence.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-muted mb-3">No evidence submitted.</p>
                <Link href="/clinical-evidence" className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Report clinical evidence
                </Link>
              </div>
            ) : (
              evidence.map((item) => (
                <Card key={item.id} className="py-3">
                  <p className="text-sm">{item.description}</p>
                  <p className="text-xs text-muted mt-1">
                    {item.vote_count} deeply concerning
                  </p>
                </Card>
              ))
            )}
          </div>
        )}

        {active === "showcases" && (
          <div className="space-y-2">
            {showcases.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-muted mb-3">No relapses documented.</p>
                <Link href="/relapse-gallery" className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Document a relapse
                </Link>
              </div>
            ) : (
              showcases.map((s) => (
                <Card key={s.id} className="py-3">
                  <p className="text-sm">{s.title}</p>
                  <p className="text-xs text-muted mt-1">
                    {formatDate(s.created_at)}
                  </p>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
