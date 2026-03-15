import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { HeaderWrapper } from "./header-wrapper";
import { createClient } from "@/lib/supabase/server";

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <HeaderWrapper>
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Claudict" width={48} height={24} />
          <span className="text-lg font-bold text-text tracking-tight">
            claudict
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-[15px] font-medium text-muted">
          <Link href="/group-therapy" className="nav-link hover:text-text transition-colors">
            Group therapy
          </Link>
          <Link href="/clinical-evidence" className="nav-link hover:text-text transition-colors">
            Evidence
          </Link>
          <Link href="/relapse-gallery" className="nav-link hover:text-text transition-colors">
            Relapses
          </Link>
          <Link href="/sponsor" className="nav-link hover:text-text transition-colors">
            Sponsor
          </Link>
          <Link href="/intervention" className="nav-link text-accent/70 hover:text-accent transition-colors">
            Intervention
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
    </HeaderWrapper>
  );
}
