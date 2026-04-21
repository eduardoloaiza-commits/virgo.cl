import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { byAudience, type InsuranceCategory } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Seguros para ti",
  description: "Seguros para personas en Chile: vehículo, hogar, viaje, salud, vida, Vida + APV y coberturas especializadas.",
};

function ProductGrid({ products }: { products: InsuranceCategory[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {products.map((p) => (
        <article key={p.slug} className="card-soft p-8 flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-virgo-teal-50 text-virgo-teal">
              <ProductIcon name={p.icon} className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-display text-headline-lg">{p.name}</h3>
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
  );
}

export default function PersonasPage() {
  const products = byAudience("personas");
  const especializadas = byAudience("especializadas");

  return (
    <>
      <section className="section bg-gradient-to-br from-virgo-teal-50 via-surface to-surface">
        <Container className="max-w-4xl">
          <span className="eyebrow">Seguros para ti</span>
          <h1 className="mt-3 font-display text-display-lg text-balance">
            Protección a medida para cada momento de tu vida.
          </h1>
          <p className="mt-6 text-body-lg text-ink-muted">
            Desde tu primer auto hasta el APV con el que planificas la jubilación, pasando por coberturas que
            casi ninguna corredora tiene sobre la mesa. Cotiza en minutos con asesoría humana de verdad.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/cotiza" size="lg">Cotizar ahora</Button>
            <Button href="/contacto" variant="secondary" size="lg">Hablar con asesor</Button>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <h2 className="font-display text-headline-xl text-balance max-w-2xl">
            Seguros esenciales para personas y familias.
          </h2>
          <div className="mt-10">
            <ProductGrid products={products} />
          </div>
        </Container>
      </section>

      <section id="especializadas" className="section bg-surface-soft">
        <Container>
          <div className="max-w-2xl">
            <span className="eyebrow">Coberturas especializadas</span>
            <h2 className="mt-3 font-display text-headline-xl text-balance">
              Protección para los detalles que otras corredoras pasan por alto.
            </h2>
            <p className="mt-3 text-ink-muted">
              Si andas en bicicleta, tienes actividades que exponen a terceros o quieres un respaldo adicional
              ante accidentes, tenemos una cobertura pensada para ti.
            </p>
          </div>
          <div className="mt-10">
            <ProductGrid products={especializadas} />
          </div>
        </Container>
      </section>
    </>
  );
}
