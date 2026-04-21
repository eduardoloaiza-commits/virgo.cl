"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { site, whatsappLink } from "@/lib/site";

const columns = [
  {
    title: "Seguros",
    links: [
      { href: "/seguros/personas", label: "Para ti" },
      { href: "/seguros/empresas", label: "Empresas" },
      { href: "/seguros/mascotas", label: "Mascotas" },
    ],
  },
  {
    title: "Clientes",
    links: [
      { href: "/portal/login", label: "Portal del asegurado" },
      { href: "/autogestion", label: "Autogestión" },
      { href: "/contacto", label: "Contacto" },
    ],
  },
  {
    title: "Virgo",
    links: [
      { href: "/nosotros", label: "Nosotros" },
      { href: "/cotiza", label: "Cotiza" },
      { href: whatsappLink(), label: "WhatsApp" },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/portal")) return null;

  return (
    <footer className="mt-24 bg-virgo-teal-900 text-white">
      <Container className="py-16 grid gap-12 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-sm text-white/70 text-body-md">
            {site.tagline} Corredora chilena desde {site.sinceYear}, trabajando con los principales convenios del
            mercado para entregarte tranquilidad real.
          </p>
          <p className="mt-6 text-sm text-white/60">Convenios: {site.partners.join(" · ")}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-label-sm uppercase tracking-wider text-virgo-lime-300">{col.title}</h4>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/80 hover:text-white text-sm">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/60">
          <p>© {new Date().getFullYear()} {site.name}. Todos los derechos reservados.</p>
          <p>
            {site.email} · <a className="hover:text-white" href={whatsappLink()}>WhatsApp</a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
