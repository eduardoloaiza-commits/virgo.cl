import { notFound } from "next/navigation";
import Link from "next/link";
import { StatusPill } from "@/components/portal/StatusPill";
import { Button } from "@/components/ui/Button";
import {
  caseStatusLabel,
  caseStatusTone,
  mockCases,
  mockPolicies,
  type CaseStatus,
} from "@/lib/portal-mock";

const timeline: Array<{ status: CaseStatus; title: string; description: string }> = [
  { status: "recibido", title: "Solicitud recibida", description: "Confirmamos la recepción y asignamos un asesor." },
  { status: "en-revision", title: "En revisión", description: "Validamos los datos y documentos enviados." },
  { status: "en-proceso", title: "En proceso con la aseguradora", description: "Coordinamos con la compañía para avanzar tu caso." },
  { status: "cerrado", title: "Cerrado", description: "Resolución enviada y caso archivado." },
];

const order: CaseStatus[] = ["recibido", "en-revision", "en-proceso", "cerrado"];

export default function SolicitudDetailPage({ params }: { params: { id: string } }) {
  const caso = mockCases.find((c) => c.id === params.id);
  if (!caso) notFound();
  const policy = caso.policyId ? mockPolicies.find((p) => p.id === caso.policyId) : null;
  const currentIndex = order.indexOf(caso.status);

  return (
    <div className="grid gap-6">
      <nav className="text-sm text-ink-soft">
        <Link href="/portal/gestiones" className="hover:text-ink">← Historial de gestiones</Link>
      </nav>

      <header className="card-soft p-6 md:p-8 grid md:grid-cols-[1.4fr_1fr] gap-6">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-xs text-ink-soft">{caso.id}</span>
            <StatusPill label={caseStatusLabel[caso.status]} tone={caseStatusTone[caso.status]} />
          </div>
          <h1 className="mt-3 font-display text-headline-xl">{caso.subject}</h1>
          <p className="mt-2 text-ink-muted">Abierto el {caso.openedAt} · Última actualización {caso.updatedAt}</p>
          {caso.nextStep && (
            <div className="mt-6 rounded-lg bg-virgo-teal-50 p-4 text-ink-muted">
              <p className="text-xs uppercase tracking-wider text-virgo-teal font-semibold">Próximo paso</p>
              <p className="mt-1 text-ink">{caso.nextStep}</p>
            </div>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/autogestion" variant="secondary" size="sm">Añadir información</Button>
            <Button href="/contacto" variant="ghost" size="sm">Contactar a mi asesor</Button>
          </div>
        </div>
        <aside className="grid gap-3 text-sm">
          {policy && (
            <div className="rounded-lg bg-surface-soft p-4">
              <p className="text-xs uppercase tracking-wider text-ink-soft">Póliza asociada</p>
              <p className="mt-1 font-semibold text-ink">{policy.product}</p>
              <p className="text-xs text-ink-soft">{policy.company} · {policy.policyNumber}</p>
            </div>
          )}
          {caso.owner && (
            <div className="rounded-lg bg-surface-soft p-4">
              <p className="text-xs uppercase tracking-wider text-ink-soft">Responsable</p>
              <p className="mt-1 font-semibold text-ink">{caso.owner}</p>
            </div>
          )}
        </aside>
      </header>

      <section className="card-soft p-6 md:p-8">
        <h2 className="font-display text-headline-md">Seguimiento</h2>
        <ol className="mt-6 grid gap-5">
          {timeline.map((step, idx) => {
            const state = idx < currentIndex ? "done" : idx === currentIndex ? "current" : "pending";
            return (
              <li key={step.status} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span
                    className={
                      state === "done"
                        ? "h-9 w-9 rounded-full bg-virgo-lime text-virgo-teal-900 flex items-center justify-center font-bold"
                        : state === "current"
                        ? "h-9 w-9 rounded-full bg-virgo-teal text-white flex items-center justify-center font-bold ring-4 ring-virgo-teal/15"
                        : "h-9 w-9 rounded-full bg-surface-raised text-ink-soft flex items-center justify-center font-bold"
                    }
                  >
                    {state === "done" ? "✓" : idx + 1}
                  </span>
                  {idx < timeline.length - 1 && <span className="flex-1 w-px bg-ink/10 mt-2" />}
                </div>
                <div className="pb-4">
                  <p className={state === "pending" ? "font-semibold text-ink-soft" : "font-semibold text-ink"}>
                    {step.title}
                  </p>
                  <p className="text-sm text-ink-muted mt-1">{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
