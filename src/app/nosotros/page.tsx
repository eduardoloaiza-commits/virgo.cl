import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description: `Conoce el equipo de ${site.name}: corredora chilena orientada a asesoría personalizada y respuesta humana.`,
};

const compromisos = [
  { title: "Asesoría personalizada", description: "Un asesor dedicado que conoce tu caso y responde cuando lo necesitas." },
  { title: "Soluciones a medida", description: "Comparamos convenios y diseñamos coberturas según tu realidad, no plantillas." },
  { title: "Acompañamiento constante", description: "Desde la contratación hasta renovaciones y siniestros. Siempre hay alguien contigo." },
  { title: "No eres un número", description: "Te tratamos como socio, no como póliza. Tu historia importa al momento de recomendarte." },
];

export default function NosotrosPage() {
  const años = new Date().getFullYear() - site.sinceYear;

  return (
    <>
      <section className="section bg-gradient-to-b from-virgo-teal-50 to-surface">
        <Container className="max-w-4xl">
          <span className="eyebrow">Nosotros · Desde {site.since}</span>
          <h1 className="mt-3 font-display text-display-lg text-balance">
            Más que un seguro, somos tu socio de confianza.
          </h1>
          <p className="mt-6 text-body-lg text-ink-muted">
            Desde {site.sinceYear} acompañamos a personas y empresas chilenas a entender y contratar los seguros
            que realmente necesitan. Creemos que detrás de cada póliza hay una historia, y que la diferencia
            está en el trato humano: por eso decimos que <strong className="text-ink">no vendemos seguros, entregamos tranquilidad</strong>.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <dt className="text-xs uppercase tracking-wider text-ink-soft">Desde</dt>
              <dd className="mt-1 font-display text-2xl text-virgo-teal font-bold">{site.sinceYear}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-ink-soft">Años</dt>
              <dd className="mt-1 font-display text-2xl text-virgo-teal font-bold">{años}+</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-ink-soft">Clientes B2B</dt>
              <dd className="mt-1 font-display text-2xl text-virgo-teal font-bold">{site.clients.length}+</dd>
            </div>
          </dl>
        </Container>
      </section>

      <section className="section">
        <Container>
          <span className="eyebrow">Nuestro compromiso</span>
          <h2 className="mt-3 font-display text-headline-xl text-balance max-w-3xl">
            Cuatro compromisos que guían cada conversación y cada póliza.
          </h2>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {compromisos.map((v) => (
              <div key={v.title} className="card-soft p-6">
                <h3 className="font-display text-headline-md">{v.title}</h3>
                <p className="mt-3 text-ink-muted text-sm">{v.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section bg-surface-soft">
        <Container className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="eyebrow">Convenios</span>
            <h2 className="mt-3 font-display text-headline-xl text-balance">Respaldo de las principales aseguradoras del país.</h2>
            <p className="mt-4 text-body-lg text-ink-muted">
              Trabajamos con Help y Mapfre, y estamos en constante evaluación de nuevos convenios para ofrecerte
              la cobertura con mejor relación precio-calidad.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 items-center justify-center lg:justify-end">
            {site.partners.map((p) => (
              <div
                key={p}
                className="card-soft px-8 py-6 text-center min-w-[180px]"
              >
                <span className="font-display text-2xl font-bold text-virgo-teal">{p}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="max-w-2xl">
            <span className="eyebrow">Nuestros clientes</span>
            <h2 className="mt-3 font-display text-headline-xl text-balance">
              Empresas líderes en construcción, minería y servicios ya confían en Virgo.
            </h2>
          </div>
          <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {site.clients.map((name) => (
              <li
                key={name}
                className="flex items-center justify-center h-16 px-4 rounded-lg bg-surface-soft text-ink-muted font-semibold text-sm text-center"
              >
                {name}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section">
        <Container className="text-center max-w-3xl">
          <h2 className="font-display text-headline-xl text-balance">¿Conversamos?</h2>
          <p className="mt-4 text-body-lg text-ink-muted">
            Agenda un llamado con un asesor o cotiza online. Respondemos en menos de 4 horas hábiles.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/cotiza" size="lg">Cotiza tu seguro</Button>
            <Button href="/contacto" variant="secondary" size="lg">Contáctanos</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
