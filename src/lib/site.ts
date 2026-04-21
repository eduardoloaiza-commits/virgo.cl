export const site = {
  name: "Virgo Corredores de Seguros",
  shortName: "Virgo",
  tagline: "Seguros con asesoría humana y respuesta rápida.",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "56900000000",
  email: "contacto@virgo.cl",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://virgo.cl",
  partners: ["Help", "Mapfre"],
} as const;

export const whatsappLink = (message?: string) => {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const nav = {
  primary: [
    { href: "/", label: "Inicio" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/seguros/personas", label: "Seguros para ti" },
    { href: "/seguros/empresas", label: "Empresas" },
    { href: "/seguros/mascotas", label: "Mascotas" },
    { href: "/contacto", label: "Contacto" },
  ],
  portal: [
    { href: "/portal", label: "Resumen" },
    { href: "/portal/polizas", label: "Mis pólizas" },
    { href: "/portal/gestiones", label: "Historial" },
    { href: "/portal/tramites", label: "Trámites" },
  ],
} as const;
