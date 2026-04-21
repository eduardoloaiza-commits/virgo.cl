import { StatusPill } from "@/components/portal/StatusPill";
import { Button } from "@/components/ui/Button";
import { mockPolicies, policyStatusLabel, policyStatusTone } from "@/lib/portal-mock";

export default function PoliciesPage() {
  return (
    <div className="grid gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">Mis pólizas</span>
          <h1 className="mt-2 font-display text-headline-xl">Todas tus coberturas en un solo lugar</h1>
        </div>
        <Button href="/cotiza" size="md">Agregar nueva póliza</Button>
      </header>

      <div className="grid gap-4">
        {mockPolicies.map((p) => (
          <article key={p.id} className="card-soft p-6 grid md:grid-cols-[1.5fr_1fr_auto] gap-4 items-center">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="font-display text-headline-md">{p.product}</h2>
                <StatusPill label={policyStatusLabel[p.status]} tone={policyStatusTone[p.status]} />
              </div>
              <p className="mt-1 text-sm text-ink-soft">{p.company} · Póliza {p.policyNumber}</p>
              <p className="mt-3 text-ink-muted">{p.coverageLabel}</p>
            </div>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wider text-ink-soft">Renovación</dt>
                <dd className="mt-1 font-semibold text-ink">{p.renewsOn}</dd>
              </div>
              {p.monthlyUf && (
                <div>
                  <dt className="text-xs uppercase tracking-wider text-ink-soft">Prima mensual</dt>
                  <dd className="mt-1 font-semibold text-ink">UF {p.monthlyUf.toFixed(2)}</dd>
                </div>
              )}
            </dl>
            <div className="flex md:flex-col gap-2">
              <Button href={`/portal/solicitud/${p.id}`} variant="secondary" size="sm">Ver detalle</Button>
              <Button href="/autogestion" variant="ghost" size="sm">Gestión</Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
