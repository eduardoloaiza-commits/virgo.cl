import Link from "next/link";
import { StatusPill } from "@/components/portal/StatusPill";
import { Button } from "@/components/ui/Button";
import {
  caseStatusLabel,
  caseStatusTone,
  mockCases,
  mockPending,
  mockPolicies,
  mockUser,
  policyStatusLabel,
  policyStatusTone,
  priorityTone,
} from "@/lib/portal-mock";

export default function DashboardPage() {
  const pendientes = mockPending.slice(0, 2);
  const gestionesActivas = mockCases.filter((c) => c.status !== "cerrado");

  return (
    <div className="grid gap-8">
      <section className="card-soft p-6 md:p-8 grid md:grid-cols-[1.2fr_1fr] gap-6">
        <div>
          <span className="eyebrow">Hola {mockUser.firstName}</span>
          <h1 className="mt-2 font-display text-headline-xl text-balance">
            Tienes {pendientes.length} trámites pendientes y {gestionesActivas.length} gestiones en curso.
          </h1>
          <p className="mt-3 text-ink-muted">
            Tu asesora {mockUser.advisor.name} está al tanto. Puedes escribirle directamente desde cualquier gestión.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/portal/tramites" size="md">Ver trámites</Button>
            <Button href="/autogestion" variant="secondary" size="md">Iniciar nueva gestión</Button>
          </div>
        </div>
        <div className="rounded-xl bg-virgo-teal-50 p-6">
          <p className="eyebrow">Tu asesora</p>
          <p className="mt-2 font-display text-lg font-semibold">{mockUser.advisor.name}</p>
          <p className="text-sm text-ink-muted">{mockUser.advisor.role}</p>
          <a href={`mailto:${mockUser.advisor.email}`} className="mt-4 inline-flex text-virgo-teal text-sm font-semibold hover:underline">
            {mockUser.advisor.email}
          </a>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="card-soft p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-headline-md">Pólizas activas</h2>
            <Link href="/portal/polizas" className="text-sm text-virgo-teal font-semibold hover:underline">Ver todas</Link>
          </div>
          <ul className="mt-4 grid gap-3">
            {mockPolicies.slice(0, 3).map((p) => (
              <li key={p.id} className="flex items-start justify-between gap-4 p-4 rounded-lg bg-surface-soft">
                <div>
                  <p className="font-semibold text-ink">{p.product}</p>
                  <p className="text-xs text-ink-soft">{p.company} · {p.policyNumber}</p>
                </div>
                <StatusPill label={policyStatusLabel[p.status]} tone={policyStatusTone[p.status]} />
              </li>
            ))}
          </ul>
        </div>

        <div className="card-soft p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-headline-md">Trámites pendientes</h2>
            <Link href="/portal/tramites" className="text-sm text-virgo-teal font-semibold hover:underline">Ver todos</Link>
          </div>
          <ul className="mt-4 grid gap-3">
            {pendientes.map((t) => (
              <li key={t.id} className="p-4 rounded-lg bg-surface-soft">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-ink">{t.title}</p>
                  <StatusPill label={t.priority} tone={priorityTone[t.priority]} />
                </div>
                <p className="mt-1 text-sm text-ink-muted">{t.description}</p>
                {t.dueOn && <p className="mt-2 text-xs text-ink-soft">Vence el {t.dueOn}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="card-soft p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-headline-md">Últimas gestiones</h2>
          <Link href="/portal/gestiones" className="text-sm text-virgo-teal font-semibold hover:underline">Ver historial</Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-soft text-xs uppercase tracking-wider">
                <th className="py-3 pr-4 font-medium">ID</th>
                <th className="py-3 pr-4 font-medium">Asunto</th>
                <th className="py-3 pr-4 font-medium">Estado</th>
                <th className="py-3 pr-4 font-medium">Actualizado</th>
                <th className="py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {mockCases.slice(0, 3).map((c) => (
                <tr key={c.id} className="border-t border-ink/5">
                  <td className="py-4 pr-4 font-mono text-xs text-ink-soft">{c.id}</td>
                  <td className="py-4 pr-4 font-medium text-ink">{c.subject}</td>
                  <td className="py-4 pr-4">
                    <StatusPill label={caseStatusLabel[c.status]} tone={caseStatusTone[c.status]} />
                  </td>
                  <td className="py-4 pr-4 text-ink-muted">{c.updatedAt}</td>
                  <td className="py-4">
                    <Link href={`/portal/solicitud/${c.id}`} className="text-virgo-teal font-semibold hover:underline">Ver detalle</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
