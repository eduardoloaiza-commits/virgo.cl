import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  href?: string;
  className?: string;
  tone?: "dark" | "light";
};

export function Logo({ href = "/", className, tone = "dark" }: Props) {
  const textClass = tone === "dark" ? "text-ink" : "text-white";
  const dotClass = tone === "dark" ? "bg-virgo-lime" : "bg-virgo-lime-300";

  return (
    <Link href={href} className={cn("inline-flex items-center gap-2 font-display font-bold text-xl", textClass, className)}>
      <span className="relative inline-block h-8 w-8">
        <span className="absolute inset-0 rounded-full bg-virgo-teal" />
        <span className={cn("absolute bottom-1 right-1 h-3 w-3 rounded-full", dotClass)} />
      </span>
      <span>
        Virgo<span className="text-virgo-teal">.</span>
      </span>
    </Link>
  );
}
