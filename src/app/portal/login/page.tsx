import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { auth } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Portal del asegurado · Ingresar",
  description: "Accede a tu portal privado en Virgo: pólizas, gestiones y trámites.",
};

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect(session.user.role === "admin" ? "/admin" : "/portal");
  }

  return (
    <div className="min-h-[calc(100vh-200px)] grid md:grid-cols-2">
      <div className="hidden md:flex relative bg-virgo-teal-900 text-white flex-col justify-between p-12 overflow-hidden">
        <div className="absolute -top-10 -right-10 h-80 w-80 rounded-full bg-virgo-lime/20 blur-3xl" />
        <Logo tone="light" />
        <div className="relative">
          <h2 className="font-display text-headline-xl text-balance text-white">
            Todo tu seguro, en un solo portal.
          </h2>
          <p className="mt-4 text-white/75 max-w-md">
            Revisa pólizas, sigue el estado de tus trámites y conversa con tu asesor desde cualquier dispositivo.
          </p>
          <ul className="mt-8 space-y-2 text-sm text-white/80">
            <li>· Pólizas activas con detalle de coberturas</li>
            <li>· Historial de gestiones y siniestros</li>
            <li>· Notificaciones cuando cambia un estado</li>
          </ul>
        </div>
        <p className="text-xs text-white/60 relative">© {new Date().getFullYear()} Virgo Corredores de Seguros</p>
      </div>

      <div className="flex items-center justify-center p-8 md:p-12 bg-surface">
        <div className="w-full max-w-sm">
          <div className="md:hidden mb-8">
            <Logo />
          </div>
          <span className="eyebrow">Portal del asegurado</span>
          <h1 className="mt-2 font-display text-headline-xl">Ingresa a tu cuenta</h1>
          <p className="mt-2 text-ink-muted text-sm">
            Usa tu RUT y la contraseña que te entregó tu asesor.
          </p>

          <LoginForm />

          <div className="mt-6 flex items-center justify-between text-sm">
            <Link href="/portal/recuperar" className="text-virgo-teal font-semibold hover:underline">
              Recuperar contraseña
            </Link>
          </div>

          <p className="mt-8 text-sm text-ink-muted">
            ¿Aún no tienes cuenta?{" "}
            <Link href="/contacto" className="text-virgo-teal font-semibold hover:underline">
              Contacta a tu asesor
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
