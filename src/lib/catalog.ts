export type InsuranceCategory = {
  slug: string;
  name: string;
  icon: string;
  summary: string;
  highlights: string[];
  audience: "personas" | "especializadas" | "empresas" | "mascotas";
};

export const catalog: InsuranceCategory[] = [
  {
    slug: "vehiculo",
    name: "Vehículo",
    icon: "car",
    audience: "personas",
    summary: "Protege tu auto con coberturas a medida y atención rápida en caso de siniestro.",
    highlights: ["Cobertura de responsabilidad civil", "Asistencia en ruta 24/7", "Auto de reemplazo disponible"],
  },
  {
    slug: "hogar",
    name: "Hogar",
    icon: "home",
    audience: "personas",
    summary: "Resguarda tu casa o departamento frente a incendios, robos y daños accidentales.",
    highlights: ["Contenido y estructura", "Gastos de reposición", "Asistencia hogar ilimitada"],
  },
  {
    slug: "viaje",
    name: "Viaje",
    icon: "plane",
    audience: "personas",
    summary: "Viaja tranquilo con asistencia médica internacional y cobertura por imprevistos.",
    highlights: ["Asistencia médica 24/7", "Equipaje y cancelación", "Cobertura multi-destino"],
  },
  {
    slug: "salud",
    name: "Salud",
    icon: "heart",
    audience: "personas",
    summary: "Planes complementarios y de salud que cuidan a ti y a tu familia.",
    highlights: ["Reembolsos ágiles", "Red amplia de prestadores", "Cobertura ambulatoria y hospitalaria"],
  },
  {
    slug: "vida",
    name: "Vida",
    icon: "shield",
    audience: "personas",
    summary: "Respaldo económico real para los que más te importan.",
    highlights: ["Capital asegurado flexible", "Cobertura por enfermedad grave", "Indemnización rápida"],
  },
  {
    slug: "vida-apv",
    name: "Vida + APV",
    icon: "trend",
    audience: "personas",
    summary: "Protección y ahorro previsional en un solo producto con beneficio tributario.",
    highlights: ["Ahorro con beneficio APV", "Protección familiar", "Asesoría previsional"],
  },
  {
    slug: "bicicleta",
    name: "Bicicleta",
    icon: "bike",
    audience: "especializadas",
    summary: "Cobertura frente a robo, accidentes y daños para ciclistas urbanos y deportivos.",
    highlights: ["Robo y daños materiales", "Asistencia en ruta", "Responsabilidad civil del ciclista"],
  },
  {
    slug: "responsabilidad-civil",
    name: "Responsabilidad Civil",
    icon: "scale",
    audience: "especializadas",
    summary: "Te protege ante reclamos por daños involuntarios causados a terceros.",
    highlights: ["Daños materiales y personales", "Defensa jurídica", "Cobertura familiar opcional"],
  },
  {
    slug: "accidentes-personales",
    name: "Accidentes Personales",
    icon: "bandaid",
    audience: "especializadas",
    summary: "Indemnización y apoyo médico ante accidentes que afectan tu integridad.",
    highlights: ["Invalidez y fallecimiento accidental", "Gastos médicos", "Asistencia 24/7"],
  },
  {
    slug: "peludos",
    name: "Peludos",
    icon: "paw",
    audience: "mascotas",
    summary: "Tu mascota también es familia. Atención veterinaria respaldada cuando más la necesita.",
    highlights: ["Consultas veterinarias", "Tratamientos y emergencias", "Responsabilidad civil del tutor"],
  },
  {
    slug: "colectivos",
    name: "Seguros colectivos",
    icon: "users",
    audience: "empresas",
    summary: "Beneficios reales para tu equipo con planes de salud y vida colectivos.",
    highlights: ["Plan escalable por tamaño", "Adhesión online", "Reporting para RRHH"],
  },
  {
    slug: "salud-empresa",
    name: "Salud Empresa",
    icon: "stethoscope",
    audience: "empresas",
    summary: "Cobertura médica complementaria para retener y cuidar a tu equipo.",
    highlights: ["Complemento isapre/Fonasa", "Prestadores preferentes", "Gestión digital"],
  },
  {
    slug: "pyme",
    name: "Protección PYME",
    icon: "store",
    audience: "empresas",
    summary: "Protege tu negocio, activos y continuidad con una póliza hecha para PYMEs chilenas.",
    highlights: ["Equipamiento y stock", "Responsabilidad civil", "Lucro cesante"],
  },
];

export const byAudience = (audience: InsuranceCategory["audience"]) =>
  catalog.filter((c) => c.audience === audience);

export const getBySlug = (slug: string) => catalog.find((c) => c.slug === slug);
