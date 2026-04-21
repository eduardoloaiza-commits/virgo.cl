import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description: `Conoce el equipo de ${site.name}: corredora chilena orientada a asesoría personalizada y respuesta humana.`,
};

const valores = [
  { title: "Cercanía", description: "Conocemos a nuestros clientes por su nombre y entendemos su contexto." },
  { title: "Claridad", description: "Nada de letra chica. Explicamos coberturas en lenguaje simple." },
  { title: "Rapidez", description: "Procesos ágiles y seguimiento en línea de cada gestión." },
  { title: "Asesoría real", description: "Recomendamos lo que necesitas, no lo que más comisiona." },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="section bg-gradient-to-b from-virgo-teal-50 to-surface">
        <Container className="max-w-4xl">
          <span className="eyebrow">Nosotros</span>
          <h1 className="mt-3 font-display text-display-lg text-balance">
            Una corredora chilena que trata a cada cliente como un socio.
          </h1>
          <p className="mt-6 text-body-lg text-ink-muted">
            En Virgo nacimos para cambiar la forma en que las personas y empresas se relacionan con sus seguros.
            Somos asesores primero, corredores después: estudiamos tu caso, comparamos convenios y te
            acompañamos en cada trámite.
          </p>
        </Container>
      </section>

      <section className="section">
        <Container>
          <h2 className="font-display text-headline-xl text-balance max-w-3xl">
            Nuestros valores guían cada conversación y cada póliza.
          </h2>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {valores.map((v) => (
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
