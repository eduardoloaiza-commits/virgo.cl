export const site = {
  name: "Virgo Corredores de Seguros",
  shortName: "Virgo",
  tagline: "Más que un seguro, somos tu socio de confianza.",
  promise: "No vendemos seguros, entregamos tranquilidad.",
  since: "28 de febrero de 2020",
  sinceYear: 2020,
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "56900000000",
  email: "contacto@virgo.cl",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://virgo.cl",
  partners: ["Help", "Mapfre"],
  clients: [
    "Besalco",
    "Acciona",
    "ICAFAL",
    "Bbosch",
    "Grupo Arrigoni",
    "ROCMIN",
    "HLC Ingeniería",
    "INCOLUR",
    "SAIM Chile",
    "SINAGIN",
    "Taxi Oficial SCL",
    "Aliservice",
    "EMSIPOR",
    "P&C Servicios",
    "ME Ingeniería",
  ],
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
