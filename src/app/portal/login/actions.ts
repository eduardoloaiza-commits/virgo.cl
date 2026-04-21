"use server";

import { signIn } from "@/lib/auth";
import { normalizeRut } from "@/lib/rut";
import { AuthError } from "next-auth";

export type LoginResult = {
  ok: boolean;
  error?: string;
  role?: "admin" | "user";
};

export async function loginAction(formData: FormData): Promise<LoginResult> {
  const rawRut = String(formData.get("rut") ?? "");
  const password = String(formData.get("password") ?? "");
  const rut = normalizeRut(rawRut);

  if (!rut) return { ok: false, error: "RUT inválido" };
  if (!password) return { ok: false, error: "Ingresa tu contraseña" };

  try {
    await signIn("credentials", {
      rut,
      password,
      redirect: false,
    });
    return { ok: true };
  } catch (err) {
    if (err instanceof AuthError) {
      return { ok: false, error: "RUT o contraseña incorrectos" };
    }
    console.error("[login] error inesperado", err);
    return { ok: false, error: "No pudimos iniciar sesión. Intenta nuevamente." };
  }
}
