"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/forms/FormField";
import type { LeadSource } from "@/lib/kommo";

type Option = { value: string; label: string };

type Props = {
  source: LeadSource;
  defaultProduct?: string;
  productOptions?: Option[];
  subjectOptions?: Option[];
  subjectLabel?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
};

type Status = "idle" | "loading" | "success" | "error";

export function LeadForm({
  source,
  defaultProduct,
  productOptions,
  subjectOptions,
  subjectLabel = "Asunto",
  messageLabel = "Cuéntanos más",
  messagePlaceholder = "Cualquier detalle que nos ayude a responder mejor.",
  submitLabel = "Enviar solicitud",
  successTitle = "¡Recibimos tu solicitud!",
  successMessage = "Un asesor se pondrá en contacto contigo a la brevedad. Revisa también tu correo.",
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[] | undefined>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setServerError(null);
    setFieldErrors({});

    const data = new FormData(e.currentTarget);
    const payload = {
      source,
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      rut: data.get("rut") ? String(data.get("rut")) : undefined,
      product: data.get("product") ? String(data.get("product")) : defaultProduct,
      subject: data.get("subject") ? String(data.get("subject")) : undefined,
      message: data.get("message") ? String(data.get("message")) : undefined,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (body?.issues) setFieldErrors(body.issues);
        setServerError(body?.error ?? "No pudimos enviar tu solicitud. Intenta de nuevo.");
        setStatus("error");
        return;
      }
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setServerError("Error de conexión. Intenta nuevamente en unos segundos.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-virgo-lime-100 border border-virgo-lime/30 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-virgo-lime text-virgo-teal-900 text-2xl font-bold">
          ✓
        </div>
        <h3 className="font-display text-headline-md">{successTitle}</h3>
        <p className="mt-2 text-ink-muted">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Nombre completo" required error={fieldErrors.name?.[0]}>
          <Input name="name" autoComplete="name" required placeholder="María Pérez" />
        </Field>
        <Field label="Correo" required error={fieldErrors.email?.[0]}>
          <Input name="email" type="email" autoComplete="email" required placeholder="maria@correo.cl" />
        </Field>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Teléfono" required hint="Chileno, con o sin +56" error={fieldErrors.phone?.[0]}>
          <Input name="phone" type="tel" autoComplete="tel" required placeholder="+56 9 1234 5678" />
        </Field>
        <Field label="RUT" hint="Opcional">
          <Input name="rut" placeholder="12.345.678-9" />
        </Field>
      </div>

      {productOptions && (
        <Field label="Producto" required>
          <Select name="product" defaultValue={defaultProduct ?? ""} required>
            <option value="" disabled>
              Selecciona un producto
            </option>
            {productOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </Field>
      )}

      {subjectOptions && (
        <Field label={subjectLabel} required>
          <Select name="subject" required defaultValue="">
            <option value="" disabled>Selecciona una opción</option>
            {subjectOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </Field>
      )}

      <Field label={messageLabel} hint="Opcional">
        <Textarea name="message" placeholder={messagePlaceholder} />
      </Field>

      {serverError && (
        <div className="rounded-md bg-danger-soft border border-danger/20 px-4 py-3 text-sm text-danger">
          {serverError}
        </div>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" size="lg" disabled={status === "loading"}>
          {status === "loading" ? "Enviando…" : submitLabel}
        </Button>
        <span className="text-xs text-ink-soft">
          Al enviar aceptas que un asesor te contacte por este medio.
        </span>
      </div>
    </form>
  );
}
