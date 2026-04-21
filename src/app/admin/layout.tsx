import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { LogoutButton } from "@/components/portal/LogoutButton";
import { auth } from "@/lib/auth";

const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/usuarios", label: "Usuarios" },
  { href: "/admin/polizas", label: "Pólizas" },
  { href: "/admin/metricas", label: "Métricas" },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/portal/login");
  if (session.user.role !== "admin") redirect("/portal");

  return (
    <div className="min-h-screen bg-surface-soft">
      <header className="bg-virgo-teal-900 text-white sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo tone="light" />
            <span className="text-xs uppercase tracking-wider text-virgo-lime-300 hidden sm:block">
              Admin
            </span>
            <nav className="hidden md:flex gap-1">
              {adminNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 rounded-full text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold leading-tight">{session.user.nombre}</p>
              <p className="text-xs text-white/60">{session.user.email}</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">{children}</main>
    </div>
  );
}
