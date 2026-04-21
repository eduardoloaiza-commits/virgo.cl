import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductIcon } from "@/components/ui/ProductIcon";

export const metadata: Metadata = {
  title: "Seguro para mascotas",
  description: "Cobertura veterinaria para perros y gatos: consultas, cirugías, urgencias y responsabilidad civil.",
};

const coberturas = [
  { title: "Consultas y chequeos", description: "Accede a una red de veterinarios con copago reducido." },
  { title: "Urgencias y hospitalización", description: "Atención en clínicas autorizadas sin letras chicas." },
  { title: "Cirugías cubiertas", description: "Procedimientos incluidos con un deducible claro." },
  { title: "Responsabilidad civil del tutor", description: "Protección si tu mascota causa daños a terceros." },
];

export default function MascotasPage() {
  return (
    <>
      <section className="section bg-gradient-to-br from-virgo-lime-100 via-virgo-teal-50 to-surface">
        <Container className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <span className="eyebrow">Seguro peludos</span>
            <h1 className="mt-3 font-display text-display-lg text-balance">
              El seguro que cuida al integrante más especial de la familia.
            </h1>
            <p className="mt-6 text-body-lg text-ink-muted max-w-xl">
              Atención veterinaria, cirugías y urgencias cubiertas con un plan simple y transparente. Sin letra
              chica y con asesor humano disponible cuando lo necesites.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/cotiza?producto=mascotas" size="lg">Cotizar plan peludos</Button>
              <Button href="/contacto" variant="secondary" size="lg">Preguntas frecuentes</Button>
            </div>
          </div>
          <div className="card-soft p-8 bg-surface-bright">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-virgo-lime text-virgo-teal-900">
              <ProductIcon name="paw" className="h-8 w-8" />
            </div>
            <h3 className="mt-6 font-display text-headline-md">Incluye</h3>
            <ul className="mt-4 space-y-3 text-ink-muted text-sm">
              <li className="flex items-start gap-2"><span className="text-virgo-lime font-bold">✓</span> Red de clínicas asociadas en todo Chile</li>
              <li className="flex items-start gap-2"><span className="text-virgo-lime font-bold">✓</span> Reembolsos en 72 horas</li>
              <li className="flex items-start gap-2"><span className="text-virgo-lime font-bold">✓</span> Cobertura de urgencia 24/7</li>
              <li className="flex items-start gap-2"><span className="text-virgo-lime font-bold">✓</span> Responsabilidad civil del tutor</li>
            </ul>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            {coberturas.map((c) => (
              <div key={c.title} className="card-soft p-6">
                <h3 className="font-display text-headline-md">{c.title}</h3>
                <p className="mt-2 text-ink-muted">{c.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
