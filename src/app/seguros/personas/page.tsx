import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { byAudience } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Seguros para ti",
  description: "Seguros para personas en Chile: vehículo, hogar, salud, vida, viaje y Vida + APV.",
};

export default function PersonasPage() {
  const products = byAudience("personas");

  return (
    <>
      <section className="section bg-gradient-to-br from-virgo-teal-50 via-surface to-surface">
        <Container className="max-w-4xl">
          <span className="eyebrow">Seguros para ti</span>
          <h1 className="mt-3 font-display text-display-lg text-balance">
            Protección a medida para cada momento de tu vida.
          </h1>
          <p className="mt-6 text-body-lg text-ink-muted">
            Desde tu primer auto hasta el APV con el que planificas la jubilación. Cotiza en minutos y recibe
            recomendaciones claras de un asesor humano.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/cotiza" size="lg">Cotizar ahora</Button>
            <Button href="/contacto" variant="secondary" size="lg">Hablar con asesor</Button>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((p) => (
              <article key={p.slug} className="card-soft p-8 flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-virgo-teal-50 text-virgo-teal">
                    <ProductIcon name={p.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h2 className="font-display text-headline-lg">{p.name}</h2>
                    <p className="mt-2 text-ink-muted">{p.summary}</p>
                  </div>
                </div>
                <ul className="grid gap-2 text-sm">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-virgo-lime" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex gap-3">
                  <Button href={`/cotiza?producto=${p.slug}`} size="sm">Cotizar {p.name.toLowerCase()}</Button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
