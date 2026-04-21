import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { byAudience } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Seguros para empresas",
  description: "Seguros colectivos, salud empresarial y protección PYME con acompañamiento dedicado.",
};

export default function EmpresasPage() {
  const products = byAudience("empresas");

  return (
    <>
      <section className="section bg-virgo-teal-900 text-white">
        <Container className="max-w-4xl">
          <span className="text-label-sm uppercase tracking-wider text-virgo-lime-300">Empresas</span>
          <h1 className="mt-3 font-display text-display-lg text-balance">
            Beneficios reales y coberturas que tu equipo valora.
          </h1>
          <p className="mt-6 text-white/80 text-body-lg">
            Diseñamos programas colectivos, salud y protección PYME con onboarding digital, reporting y una
            contraparte directa para tu área de personas.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/cotiza?audiencia=empresas" variant="lime" size="lg">Cotizar plan empresa</Button>
            <Button href="/contacto?motivo=empresas" variant="ghost" size="lg" className="text-white hover:bg-white/10">
              Agendar reunión
            </Button>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {products.map((p) => (
              <article key={p.slug} className="card-soft p-6 flex flex-col gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-virgo-lime-100 text-virgo-teal">
                  <ProductIcon name={p.icon} className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-display text-headline-md">{p.name}</h2>
                  <p className="mt-2 text-ink-muted text-sm">{p.summary}</p>
                </div>
                <ul className="grid gap-2 text-sm">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-virgo-lime" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <Button href={`/cotiza?producto=${p.slug}`} variant="secondary" size="sm" className="mt-auto self-start">
                  Solicitar propuesta
                </Button>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
