import Link from "next/link";
import { ProductIcon } from "@/components/ui/ProductIcon";
import type { InsuranceCategory } from "@/lib/catalog";

type Props = {
  category: InsuranceCategory;
  href?: string;
};

export function ProductCard({ category, href }: Props) {
  const cotizaHref = href ?? `/cotiza?producto=${category.slug}`;
  return (
    <Link
      href={cotizaHref}
      className="group relative flex flex-col gap-4 rounded-xl bg-surface-bright p-6 shadow-card hover:shadow-lift transition-all border border-transparent hover:border-virgo-teal/10"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-virgo-teal-50 text-virgo-teal group-hover:bg-virgo-lime group-hover:text-virgo-teal-900 transition-colors">
        <ProductIcon name={category.icon} className="h-6 w-6" />
      </div>
      <div>
        <h3 className="font-display text-headline-md text-ink">{category.name}</h3>
        <p className="mt-2 text-ink-muted text-body-md">{category.summary}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1 text-virgo-teal text-sm font-semibold">
        Cotizar
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="group-hover:translate-x-1 transition-transform">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
