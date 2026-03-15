import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { createClient } from "@/lib/supabase/server";

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-border bg-bg sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Claudict" width={28} height={28} />
          <span className="font-semibold text-text tracking-tight">
            claudict
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
          <Link href="/group-therapy" className="hover:text-text transition-colors">
            Group therapy
          </Link>
          <Link href="/clinical-evidence" className="hover:text-text transition-colors">
            Evidence
          </Link>
          <Link href="/relapse-gallery" className="hover:text-text transition-colors">
            Relapses
          </Link>
          <Link href="/sponsor" className="hover:text-text transition-colors">
            Sponsor
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileNav isLoggedIn={!!user} />
          {user ? (
            <Link
              href="/my-file"
              className="hidden md:block text-sm text-accent hover:text-accent-hover transition-colors"
            >
              My file
            </Link>
          ) : (
            <Link
              href="/intake"
              className="hidden md:block text-sm bg-accent text-white px-4 py-1.5 rounded-md hover:bg-accent-hover transition-colors"
            >
              Intake
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
