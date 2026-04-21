import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export function ClientsStrip() {
  const yearsOfExperience = new Date().getFullYear() - site.sinceYear;

  return (
    <section className="section bg-surface-bright">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <span className="eyebrow">Nuestros clientes</span>
            <h2 className="mt-3 font-display text-headline-xl text-balance">
              Empresas que confían en Virgo desde hace años.
            </h2>
            <p className="mt-3 text-ink-muted">
              Construcción, minería, servicios e ingeniería: trabajamos con compañías que no pueden permitirse
              ni un día de parálisis. Si nos eligen ellos, sabes que vamos en serio.
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-display text-display-lg text-virgo-teal font-bold">{yearsOfExperience}+</p>
            <p className="text-sm text-ink-soft uppercase tracking-wider">Años acompañando</p>
          </div>
        </div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {site.clients.map((name) => (
            <li
              key={name}
              className="flex items-center justify-center h-16 px-4 rounded-lg bg-surface-soft text-ink-muted font-semibold text-sm text-center hover:bg-virgo-teal-50 hover:text-virgo-teal transition-colors"
            >
              {name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
