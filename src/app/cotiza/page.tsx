import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/forms/LeadForm";
import { catalog } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Cotiza tu seguro",
  description: "Cotiza tu seguro con Virgo. Respondemos con opciones claras en menos de 4 horas hábiles.",
};

type Props = { searchParams?: { producto?: string; audiencia?: string } };

export default function CotizaPage({ searchParams }: Props) {
  const productOptions = catalog.map((c) => ({ value: c.slug, label: c.name }));
  const defaultProduct = searchParams?.producto;

  return (
    <section className="section">
      <Container className="grid lg:grid-cols-[1.1fr_1.3fr] gap-10">
        <div>
          <span className="eyebrow">Cotización online</span>
          <h1 className="mt-3 font-display text-display-lg text-balance">
            Cuéntanos qué necesitas. Nos encargamos del resto.
          </h1>
          <p className="mt-4 text-body-lg text-ink-muted">
            Llena el formulario y un asesor te contactará con opciones concretas. Si prefieres conversar antes,
            escríbenos por WhatsApp o llámanos.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            <li className="flex items-start gap-3"><span className="h-6 w-6 shrink-0 rounded-full bg-virgo-lime text-virgo-teal-900 flex items-center justify-center text-sm font-bold">1</span> Elige el producto que quieres cotizar.</li>
            <li className="flex items-start gap-3"><span className="h-6 w-6 shrink-0 rounded-full bg-virgo-lime text-virgo-teal-900 flex items-center justify-center text-sm font-bold">2</span> Déjanos tus datos y un detalle breve.</li>
            <li className="flex items-start gap-3"><span className="h-6 w-6 shrink-0 rounded-full bg-virgo-lime text-virgo-teal-900 flex items-center justify-center text-sm font-bold">3</span> Recibes propuestas comparadas en menos de 4 horas hábiles.</li>
          </ul>
        </div>
        <div className="card-soft p-6 md:p-8">
          <LeadForm
            source="cotizacion"
            productOptions={productOptions}
            defaultProduct={defaultProduct}
            submitLabel="Solicitar cotización"
            successTitle="¡Cotización recibida!"
            successMessage="Estamos preparando tu propuesta. Recibirás noticias nuestras en menos de 4 horas hábiles."
          />
        </div>
      </Container>
    </section>
  );
}
