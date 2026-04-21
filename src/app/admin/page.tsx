import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function AdminHome() {
  const session = await auth();
  const nombre = session?.user.nombre ?? "Administrador";

  return (
    <div className="grid gap-8">
      <div>
        <span className="eyebrow">Panel de administración</span>
        <h1 className="mt-2 font-display text-display-md">Hola, {nombre.split(" ")[0]}</h1>
        <p className="mt-2 text-ink-muted max-w-2xl">
          Este panel está en construcción. Los módulos se habilitan en orden: usuarios, pólizas, y finalmente métricas.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/admin/usuarios" className="card-soft p-6 hover:shadow-lift transition-shadow">
          <h3 className="font-display text-headline-sm">Usuarios</h3>
          <p className="mt-2 text-sm text-ink-muted">
            Alta, edición y baja de asegurados. Reset de contraseña y permisos.
          </p>
          <p className="mt-4 text-xs text-virgo-teal font-semibold">Próximamente →</p>
        </Link>
        <Link href="/admin/polizas" className="card-soft p-6 hover:shadow-lift transition-shadow">
          <h3 className="font-display text-headline-sm">Pólizas</h3>
          <p className="mt-2 text-sm text-ink-muted">
            Sincronización y revisión de pólizas activas por RUT titular.
          </p>
          <p className="mt-4 text-xs text-virgo-teal font-semibold">Próximamente →</p>
        </Link>
        <Link href="/admin/metricas" className="card-soft p-6 hover:shadow-lift transition-shadow">
          <h3 className="font-display text-headline-sm">Métricas</h3>
          <p className="mt-2 text-sm text-ink-muted">
            Usuarios activos, leads generados, reembolsos por estado y tiempos promedio.
          </p>
          <p className="mt-4 text-xs text-virgo-teal font-semibold">Próximamente →</p>
        </Link>
      </div>
    </div>
  );
}
