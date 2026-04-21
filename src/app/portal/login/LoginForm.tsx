"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/forms/FormField";
import { loginAction } from "./actions";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/portal";
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const res = await loginAction(data);
      if (!res.ok) {
        setError(res.error ?? "No pudimos iniciar sesión.");
        return;
      }
      router.replace(callbackUrl);
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4" noValidate>
      <Field label="RUT" required>
        <Input
          name="rut"
          type="text"
          inputMode="text"
          autoComplete="username"
          placeholder="12.345.678-9"
          required
        />
      </Field>
      <Field label="Contraseña" required>
        <Input name="password" type="password" autoComplete="current-password" required />
      </Field>
      {error && (
        <div className="rounded-md bg-danger-soft border border-danger/20 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}
      <Button type="submit" size="lg" className="mt-2" disabled={pending}>
        {pending ? "Ingresando…" : "Entrar al portal"}
      </Button>
    </form>
  );
}
