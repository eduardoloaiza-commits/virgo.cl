import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "lime";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-virgo-teal disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-virgo-teal text-white hover:bg-virgo-teal-700 active:bg-virgo-teal-900 shadow-soft hover:shadow-lift",
  secondary:
    "bg-surface-bright text-virgo-teal ring-1 ring-virgo-teal/20 hover:ring-virgo-teal hover:bg-virgo-teal-50",
  ghost: "text-virgo-teal hover:bg-virgo-teal-50",
  lime: "bg-virgo-lime text-virgo-teal-900 hover:bg-virgo-lime-300 shadow-soft",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-6 py-3",
  lg: "text-base px-8 py-4",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href) {
    const { href, ...anchor } = rest;
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a className={classes} href={href} target="_blank" rel="noreferrer" {...anchor}>
          {children}
        </a>
      );
    }
    return (
      <Link className={classes} href={href} {...anchor}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
