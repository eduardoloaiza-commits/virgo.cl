"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { nav } from "@/lib/site";

export function PortalNav() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-1">
      {nav.portal.map((item) => {
        const active = pathname === item.href || (item.href !== "/portal" && pathname?.startsWith(item.href));
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "inline-flex px-4 py-3 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                active ? "bg-virgo-teal text-white" : "text-ink-muted hover:text-ink hover:bg-surface-soft",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
