import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Autogestión",
  description: "Inicia siniestros, renovaciones y consultas online. Sigue el estado de tu gestión en tu portal.",
};

export default function AutogestionPage() {
  return (
    <section className="section">
      <Container className="grid lg:grid-cols-[1fr_1.2fr] gap-10">
        <div>
          <span className="eyebrow">Canal de autogestión</span>
          <h1 className="mt-3 font-display text-display-lg text-balance">
            Inicia tu trámite online. Te mantenemos informado en cada paso.
          </h1>
          <p className="mt-4 text-body-lg text-ink-muted">
            Siniestros, renovaciones, cambios en tu póliza o consultas. Cualquier gestión queda registrada con
            un número de seguimiento que puedes revisar desde tu portal.
          </p>
          <div className="mt-8 card-soft p-6">
            <h3 className="font-display text-headline-md">Antes de empezar, ten a mano:</h3>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              <li>· Tu número de póliza (si lo tienes)</li>
              <li>· Datos del siniestro: fecha, lugar y breve descripción</li>
              <li>· Documentos relevantes (los pediremos en el siguiente paso si aplica)</li>
            </ul>
          </div>
        </div>
        <div className="card-soft p-6 md:p-8">
          <LeadForm
            source="autogestion"
            subjectLabel="Tipo de gestión"
            subjectOptions={[
              { value: "siniestro", label: "Declarar un siniestro" },
              { value: "renovacion", label: "Renovación de póliza" },
              { value: "modificacion", label: "Modificar mi póliza" },
              { value: "consulta", label: "Consulta general" },
              { value: "otro", label: "Otro trámite" },
            ]}
            messageLabel="Detalle del caso"
            messagePlaceholder="Fecha, lugar, personas involucradas, etc."
            submitLabel="Iniciar gestión"
            successTitle="Gestión registrada"
            successMessage="Tu gestión quedó registrada. Un asesor te contactará con los próximos pasos y su número de seguimiento."
          />
        </div>
      </Container>
    </section>
  );
}
