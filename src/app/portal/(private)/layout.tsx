import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { PortalNav } from "@/components/portal/PortalNav";
import { LogoutButton } from "@/components/portal/LogoutButton";
import { auth } from "@/lib/auth";

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/portal/login");
  }

  const initials = session.user.nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("") || "U";

  return (
    <div className="min-h-screen bg-surface-soft">
      <header className="bg-surface-bright border-b border-ink/5 sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="hidden md:flex">
              <PortalNav />
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-ink leading-tight">{session.user.nombre}</p>
              <p className="text-xs text-ink-soft">{session.user.email}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-virgo-teal text-white flex items-center justify-center font-semibold">
              {initials}
            </div>
            <LogoutButton />
          </div>
        </div>
        <div className="md:hidden border-t border-ink/5 overflow-x-auto">
          <div className="mx-auto max-w-7xl px-4">
            <PortalNav />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">{children}</main>
    </div>
  );
}
