import { NextResponse } from "next/server";
import { createLead } from "@/lib/kommo";
import { leadSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Datos inválidos", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const result = await createLead(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error ?? "Error desconocido" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, id: result.id ?? null, provider: result.provider });
}
