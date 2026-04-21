"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { nav } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname?.startsWith("/portal")) return null;

  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-ink/5">
      <Container className="flex items-center justify-between py-4">
        <Logo />
        <nav className="hidden lg:flex items-center gap-8">
          {nav.primary.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  active ? "text-virgo-teal" : "text-ink-muted hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <Button href="/portal/login" variant="ghost" size="sm">
            Portal del asegurado
          </Button>
          <Button href="/cotiza" variant="primary" size="sm">
            Cotiza tu seguro
          </Button>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full text-ink hover:bg-surface-muted"
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <div className="lg:hidden border-t border-ink/5 bg-surface-bright">
          <Container className="py-4 flex flex-col gap-1">
            {nav.primary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 text-ink font-medium"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-ink/5">
              <Button href="/portal/login" variant="secondary" size="md">
                Portal del asegurado
              </Button>
              <Button href="/cotiza" variant="primary" size="md">
                Cotiza tu seguro
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
