import Link from "next/link";
import { StatusPill } from "@/components/portal/StatusPill";
import { caseStatusLabel, caseStatusTone, mockCases } from "@/lib/portal-mock";

export default function HistoryPage() {
  return (
    <div className="grid gap-6">
      <header>
        <span className="eyebrow">Historial de gestiones</span>
        <h1 className="mt-2 font-display text-headline-xl">Cada solicitud que has hecho con nosotros</h1>
      </header>

      <div className="card-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface-soft">
            <tr className="text-left text-ink-soft text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">ID</th>
              <th className="px-6 py-4 font-medium">Asunto</th>
              <th className="px-6 py-4 font-medium">Estado</th>
              <th className="px-6 py-4 font-medium">Apertura</th>
              <th className="px-6 py-4 font-medium">Actualizado</th>
              <th className="px-6 py-4 font-medium" />
            </tr>
          </thead>
          <tbody>
            {mockCases.map((c) => (
              <tr key={c.id} className="border-t border-ink/5 hover:bg-surface-soft/60">
                <td className="px-6 py-5 font-mono text-xs text-ink-soft">{c.id}</td>
                <td className="px-6 py-5 font-medium text-ink">{c.subject}</td>
                <td className="px-6 py-5">
                  <StatusPill label={caseStatusLabel[c.status]} tone={caseStatusTone[c.status]} />
                </td>
                <td className="px-6 py-5 text-ink-muted">{c.openedAt}</td>
                <td className="px-6 py-5 text-ink-muted">{c.updatedAt}</td>
                <td className="px-6 py-5">
                  <Link href={`/portal/solicitud/${c.id}`} className="text-virgo-teal font-semibold hover:underline">
                    Ver detalle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
