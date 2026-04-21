import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/marketing/ProductCard";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { ClientsStrip } from "@/components/marketing/ClientsStrip";
import { byAudience, catalog } from "@/lib/catalog";
import { site, whatsappLink } from "@/lib/site";

const beneficios = [
  {
    title: "Atención personalizada",
    description: "Un asesor dedicado que te acompaña en la contratación, siniestros y renovaciones.",
  },
  {
    title: "Respuesta rápida",
    description: "Resolvemos consultas y trámites en horas, no en días. Cada caso tiene seguimiento online.",
  },
  {
    title: "Asesoría experta",
    description: "Estudiamos tu caso y comparamos convenios para recomendarte lo que realmente necesitas.",
  },
  {
    title: "Soluciones a medida",
    description: "Coberturas diseñadas para tu realidad, no paquetes enlatados.",
  },
];

export default function HomePage() {
  const featured = byAudience("personas").slice(0, 6);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-virgo-teal-50 via-surface to-surface" />
        <div className="absolute right-[-10%] top-[-10%] -z-10 h-[520px] w-[520px] rounded-full bg-virgo-lime/20 blur-3xl" />
        <Container className="pt-16 pb-20 md:pt-24 md:pb-28 grid gap-12 lg:grid-cols-[1.15fr_1fr] items-center">
          <div>
            <span className="eyebrow">Corredores de seguros · Desde {site.sinceYear}</span>
            <h1 className="mt-4 font-display font-bold text-display-xl text-balance">
              Más que un seguro, somos tu <span className="text-virgo-teal">socio de confianza</span>.
            </h1>
            <p className="mt-6 text-body-lg text-ink-muted max-w-2xl">
              No vendemos seguros, entregamos tranquilidad. Asesoría personalizada, respuesta rápida y
              soluciones a medida para personas y empresas que no son un número.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/cotiza" variant="primary" size="lg">
                Cotiza tu seguro
              </Button>
              <Button href="/portal/login" variant="secondary" size="lg">
                Portal del asegurado
              </Button>
              <Button href={whatsappLink("Hola Virgo, quiero hablar con un asesor.")} variant="ghost" size="lg">
                Hablar por WhatsApp
              </Button>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <dt className="text-xs uppercase tracking-wider text-ink-soft">Desde</dt>
                <dd className="mt-1 font-display text-xl text-ink font-semibold">{site.sinceYear}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-ink-soft">Convenios</dt>
                <dd className="mt-1 font-display text-xl text-ink font-semibold">Help · Mapfre</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-ink-soft">Respuesta</dt>
                <dd className="mt-1 font-display text-xl text-ink font-semibold">&lt; 4 horas</dd>
              </div>
            </dl>
          </div>
          <div className="relative">
            <div className="card-soft p-6 md:p-8">
              <p className="eyebrow">Acceso rápido</p>
              <h3 className="mt-2 font-display text-headline-md">¿Qué quieres hacer hoy?</h3>
              <div className="mt-6 grid gap-3">
                <Link
                  href="/cotiza"
                  className="flex items-start gap-4 p-4 rounded-xl bg-surface-soft hover:bg-virgo-teal-50 transition-colors"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-virgo-teal text-white">
                    <ProductIcon name="shield" className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">Cotizar un nuevo seguro</span>
                    <span className="text-sm text-ink-muted">Cuéntanos qué necesitas y te respondemos hoy.</span>
                  </span>
                </Link>
                <Link
                  href="/autogestion"
                  className="flex items-start gap-4 p-4 rounded-xl bg-surface-soft hover:bg-virgo-teal-50 transition-colors"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-virgo-lime text-virgo-teal-900">
                    <ProductIcon name="trend" className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">Iniciar una gestión</span>
                    <span className="text-sm text-ink-muted">Siniestros, renovaciones y consultas en un formulario.</span>
                  </span>
                </Link>
                <Link
                  href="/portal/login"
                  className="flex items-start gap-4 p-4 rounded-xl bg-surface-soft hover:bg-virgo-teal-50 transition-colors"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-virgo-teal-900 text-white">
                    <ProductIcon name="users" className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">Entrar al portal</span>
                    <span className="text-sm text-ink-muted">Revisa tus pólizas y el estado de tus trámites.</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section bg-surface">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="eyebrow">Seguros para ti</span>
              <h2 className="mt-3 font-display text-headline-xl text-balance">
                Protección para cada etapa, para ti y tu familia.
              </h2>
            </div>
            <div className="flex gap-3">
              <Button href="/seguros/personas" variant="secondary" size="md">Ver personas</Button>
              <Button href="/seguros/empresas" variant="ghost" size="md">Ver empresas</Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <ProductCard key={c.slug} category={c} />
            ))}
          </div>
          <div className="mt-10 rounded-xl bg-virgo-teal-50 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <span className="eyebrow">Coberturas especializadas</span>
              <p className="mt-2 text-ink font-display text-headline-md">Bicicleta · Responsabilidad Civil · Accidentes Personales</p>
              <p className="mt-1 text-ink-muted text-sm">Protección extra para los detalles que muchas corredoras pasan por alto.</p>
            </div>
            <Button href="/seguros/personas#especializadas" variant="secondary" size="md">Ver especializadas</Button>
          </div>
        </Container>
      </section>

      <ClientsStrip />

      <section className="section">
        <Container className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="eyebrow">Nuestro compromiso</span>
            <h2 className="mt-3 font-display text-headline-xl text-balance">
              No vendemos seguros, entregamos tranquilidad.
            </h2>
            <p className="mt-4 text-body-lg text-ink-muted">
              Creemos en la asesoría personalizada, las soluciones a medida y el acompañamiento constante.
              Aquí no eres un número: tienes un asesor que conoce tu historia y responde cuando lo necesitas.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {beneficios.map((b) => (
              <div key={b.title} className="card-soft p-6">
                <div className="h-10 w-10 rounded-full bg-virgo-lime-100 text-virgo-teal flex items-center justify-center">
                  <ProductIcon name="heart" className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl">{b.title}</h3>
                <p className="mt-2 text-ink-muted text-sm">{b.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section bg-virgo-teal text-white">
        <Container className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <span className="text-label-sm uppercase tracking-wider text-virgo-lime-300">Portal del asegurado</span>
            <h2 className="mt-3 font-display text-headline-xl text-balance">
              Tus pólizas, gestiones y trámites en un solo lugar.
            </h2>
            <p className="mt-4 text-white/80 text-body-lg max-w-xl">
              Accede con tu cuenta personal para ver el estado de cada solicitud, renovaciones próximas y
              conversar con tu asesor sin salir de la plataforma.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/portal/login" variant="lime" size="lg">
                Entrar al portal
              </Button>
              <Button href="/autogestion" variant="ghost" size="lg" className="text-white hover:bg-white/10">
                Iniciar una gestión
              </Button>
            </div>
          </div>
          <ul className="grid gap-3">
            {[
              "Pólizas activas con detalle de coberturas",
              "Historial de gestiones y siniestros",
              "Trámites pendientes con plazos claros",
              "Notificaciones cuando cambia un estado",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 bg-white/10 backdrop-blur rounded-lg p-4">
                <span className="mt-0.5 h-6 w-6 rounded-full bg-virgo-lime text-virgo-teal-900 flex items-center justify-center text-sm font-bold">✓</span>
                <span className="text-white/90">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section">
        <Container className="grid lg:grid-cols-2 gap-10">
          <div className="card-soft p-8">
            <span className="eyebrow">Seguros para empresas</span>
            <h3 className="mt-3 font-display text-headline-lg">Beneficios reales para tu equipo</h3>
            <p className="mt-3 text-ink-muted">
              Planes colectivos, salud y protección PYME con acompañamiento dedicado para RRHH y gerencia.
            </p>
            <div className="mt-6 grid gap-2">
              {byAudience("empresas").map((c) => (
                <div key={c.slug} className="flex items-center gap-3 py-2 border-b border-ink/5 last:border-0">
                  <ProductIcon name={c.icon} className="h-5 w-5 text-virgo-teal" />
                  <span className="text-sm font-medium text-ink">{c.name}</span>
                </div>
              ))}
            </div>
            <Button href="/seguros/empresas" variant="secondary" size="md" className="mt-6">
              Ver todos los planes
            </Button>
          </div>
          <div className="card-soft p-8 bg-gradient-to-br from-virgo-lime-100 to-virgo-teal-50">
            <span className="eyebrow">Seguros para peludos</span>
            <h3 className="mt-3 font-display text-headline-lg">Cuida al que siempre está contigo</h3>
            <p className="mt-3 text-ink-muted">
              Atención veterinaria, cirugías y responsabilidad civil del tutor en un plan pensado para Chile.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              <li>· Consultas, vacunas y chequeos</li>
              <li>· Urgencias y cirugías cubiertas</li>
              <li>· Asistencia en viajes con tu mascota</li>
            </ul>
            <Button href="/seguros/mascotas" variant="primary" size="md" className="mt-6">
              Conocer el plan mascotas
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
