import { cn } from "@/lib/cn";

type Props = {
  label: string;
  tone: string;
  className?: string;
};

export function StatusPill({ label, tone, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
        tone,
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}
