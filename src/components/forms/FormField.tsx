import { cn } from "@/lib/cn";
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";

type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  required?: boolean;
};

export function Field({ label, hint, error, children, required }: FieldProps) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-ink mb-1.5">
        {label}
        {required && <span className="text-virgo-teal ml-1">*</span>}
      </span>
      {children}
      {hint && !error && <span className="block mt-1 text-xs text-ink-soft">{hint}</span>}
      {error && <span className="block mt-1 text-xs text-danger">{error}</span>}
    </label>
  );
}

const fieldBase =
  "w-full rounded-md bg-surface-soft px-4 py-3 text-ink placeholder:text-ink-soft border border-transparent focus:border-virgo-teal focus:bg-surface-bright focus:outline-none focus:ring-2 focus:ring-virgo-teal/20 transition-colors";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldBase, className)} {...props} />;
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(fieldBase, "pr-10", className)} {...props}>
      {children}
    </select>
  );
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldBase, "min-h-[120px] resize-y", className)} {...props} />;
}
