import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { db, users } from "@/lib/db";
import { normalizeRut, isValidRut } from "@/lib/rut";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const provided = request.headers.get("x-bootstrap-secret") ?? "";
  const expected = process.env.ADMIN_BOOTSTRAP_SECRET ?? "";

  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_BOOTSTRAP_SECRET no configurado" },
      { status: 500 },
    );
  }
  if (provided !== expected) {
    return NextResponse.json({ ok: false, error: "Secret inválido" }, { status: 401 });
  }

  const existing = await db.select({ id: users.id }).from(users).where(eq(users.role, "admin")).limit(1);
  if (existing.length > 0) {
    return NextResponse.json(
      { ok: false, error: "Ya existe al menos un admin" },
      { status: 409 },
    );
  }

  const rawRut = process.env.ADMIN_RUT?.trim() ?? "";
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase() ?? "";
  const nombre = process.env.ADMIN_NOMBRE?.trim() || "Administrador";
  const password = process.env.ADMIN_INITIAL_PASSWORD ?? "";

  const rut = normalizeRut(rawRut);
  if (!rut || !isValidRut(rawRut)) {
    return NextResponse.json({ ok: false, error: "ADMIN_RUT inválido" }, { status: 422 });
  }
  if (!email.includes("@")) {
    return NextResponse.json({ ok: false, error: "ADMIN_EMAIL inválido" }, { status: 422 });
  }
  if (password.length < 10) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_INITIAL_PASSWORD debe tener al menos 10 caracteres" },
      { status: 422 },
    );
  }

  const passwordHash = await hash(password, 12);
  const [created] = await db
    .insert(users)
    .values({
      rut,
      email,
      nombre,
      passwordHash,
      role: "admin",
    })
    .returning({ id: users.id, rut: users.rut, email: users.email });

  return NextResponse.json({
    ok: true,
    admin: created,
    message: "Admin creado. Guarda el password inicial y borra ADMIN_INITIAL_PASSWORD de Vercel.",
  });
}
