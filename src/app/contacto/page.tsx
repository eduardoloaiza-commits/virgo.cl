import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/forms/LeadForm";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Contacta a ${site.name}. Canales directos: WhatsApp, email y formulario.`,
};

export default function ContactoPage() {
  return (
    <section className="section">
      <Container className="grid lg:grid-cols-[1fr_1.2fr] gap-10">
        <div>
          <span className="eyebrow">Contacto</span>
          <h1 className="mt-3 font-display text-display-lg text-balance">
            Hablemos. Sin formularios eternos ni transferencias interminables.
          </h1>
          <div className="mt-8 grid gap-3">
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="card-soft p-5 flex items-center justify-between group">
              <div>
                <span className="eyebrow">WhatsApp</span>
                <p className="mt-1 font-display text-lg">Respuesta inmediata en horario laboral</p>
              </div>
              <span className="text-virgo-teal group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a href={`mailto:${site.email}`} className="card-soft p-5 flex items-center justify-between group">
              <div>
                <span className="eyebrow">Email</span>
                <p className="mt-1 font-display text-lg">{site.email}</p>
              </div>
              <span className="text-virgo-teal group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
        <div className="card-soft p-6 md:p-8">
          <h2 className="font-display text-headline-lg">Envíanos un mensaje</h2>
          <p className="mt-2 text-ink-muted">Te respondemos en menos de 4 horas hábiles.</p>
          <div className="mt-6">
            <LeadForm
              source="contacto"
              subjectOptions={[
                { value: "comercial", label: "Quiero cotizar un seguro" },
                { value: "cliente", label: "Ya soy cliente y tengo una consulta" },
                { value: "empresa", label: "Soy empresa / RRHH" },
                { value: "otro", label: "Otro tema" },
              ]}
              subjectLabel="¿En qué te ayudamos?"
              submitLabel="Enviar mensaje"
              successTitle="Mensaje enviado"
              successMessage="Gracias por escribirnos. Un asesor te contactará muy pronto."
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
