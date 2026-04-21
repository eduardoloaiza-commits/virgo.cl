"use client";

import { usePathname } from "next/navigation";
import { whatsappLink } from "@/lib/site";

export function WhatsAppFAB() {
  const pathname = usePathname();
  if (pathname?.startsWith("/portal")) return null;

  return (
    <a
      href={whatsappLink("Hola Virgo, quisiera más información.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 pl-4 pr-5 py-3 bg-virgo-lime text-virgo-teal-900 font-semibold rounded-full shadow-lift hover:shadow-soft hover:scale-[1.02] transition-all"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.52 3.48A11.78 11.78 0 0012.07 0C5.47 0 .13 5.34.12 11.92c0 2.1.55 4.16 1.6 5.97L0 24l6.3-1.65a11.9 11.9 0 005.77 1.47h.01c6.59 0 11.94-5.34 11.94-11.92 0-3.19-1.24-6.18-3.5-8.42zm-8.45 18.34h-.01a9.9 9.9 0 01-5.04-1.38l-.36-.22-3.74.98 1-3.64-.24-.38a9.83 9.83 0 01-1.52-5.27c0-5.47 4.46-9.91 9.93-9.91a9.86 9.86 0 017.02 2.9 9.83 9.83 0 012.9 7.02c-.01 5.47-4.47 9.92-9.94 9.92zm5.46-7.43c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15s-.78.97-.96 1.17c-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.41-1.49-.9-.8-1.5-1.79-1.68-2.09-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.08-.8.38-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.89 1.22 3.1.15.2 2.11 3.23 5.13 4.52.72.31 1.28.49 1.71.63.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.08-.12-.27-.2-.57-.35z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
