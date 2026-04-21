import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { PortalNav } from "@/components/portal/PortalNav";
import { mockUser } from "@/lib/portal-mock";

export default function PortalLayout({ children }: { children: ReactNode }) {
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
              <p className="text-sm font-semibold text-ink leading-tight">{mockUser.firstName} {mockUser.lastName}</p>
              <p className="text-xs text-ink-soft">{mockUser.email}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-virgo-teal text-white flex items-center justify-center font-semibold">
              {mockUser.firstName[0]}
              {mockUser.lastName[0]}
            </div>
            <Link href="/" className="ml-2 text-sm text-ink-soft hover:text-ink">
              Salir
            </Link>
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
