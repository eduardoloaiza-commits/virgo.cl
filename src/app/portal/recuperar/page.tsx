import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Field, Input } from "@/components/forms/FormField";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Recuperar contraseña",
};

export default function RecuperarPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <Logo />
        <h1 className="mt-8 font-display text-headline-xl">Recuperar acceso</h1>
        <p className="mt-2 text-ink-muted text-sm">
          Te enviaremos un enlace para restablecer tu contraseña al correo registrado.
        </p>
        <form className="mt-8 card-soft p-6 grid gap-4">
          <Field label="Correo electrónico" required>
            <Input name="email" type="email" required placeholder="tu@correo.cl" />
          </Field>
          <Button type="submit" size="lg">Enviar enlace</Button>
        </form>
        <p className="mt-6 text-sm text-ink-muted">
          <Link href="/portal/login" className="text-virgo-teal font-semibold hover:underline">
            ← Volver al ingreso
          </Link>
        </p>
      </div>
    </div>
  );
}
