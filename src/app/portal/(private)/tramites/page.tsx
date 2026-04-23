import Link from "next/link";
import { StatusPill } from "@/components/portal/StatusPill";
import { Button } from "@/components/ui/Button";
import { mockPending, priorityTone } from "@/lib/portal-mock";

export default function PendingPage() {
  return (
    <div className="grid gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">Trámites pendientes</span>
          <h1 className="mt-2 font-display text-headline-xl">Lo que necesita tu atención</h1>
        </div>
        <Button href="/autogestion" variant="secondary" size="md">Iniciar nueva gestión</Button>
      </header>

      {mockPending.length === 0 ? (
        <div className="card-soft p-12 text-center">
          <div className="mx-auto h-14 w-14 rounded-full bg-virgo-lime text-virgo-teal-900 flex items-center justify-center text-2xl font-bold">✓</div>
          <h2 className="mt-4 font-display text-headline-md">Sin pendientes</h2>
          <p className="mt-2 text-ink-muted">Tienes todos tus trámites al día. Te avisaremos cuando haya novedades.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {mockPending.map((t) => (
            <article key={t.id} className="card-soft p-6 grid md:grid-cols-[1fr_auto] gap-4 items-start">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="font-display text-headline-md">{t.title}</h2>
                  <StatusPill label={`Prioridad ${t.priority}`} tone={priorityTone[t.priority]} />
                </div>
                <p className="mt-2 text-ink-muted">{t.description}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-ink-soft">
                  {t.dueOn && <span>Vence el {t.dueOn}</span>}
                  {t.caseId && (
                    <Link href={`/portal/solicitud/${t.caseId}`} className="hover:underline text-virgo-teal font-semibold">
                      Ver caso {t.caseId}
                    </Link>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm">Resolver</Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
