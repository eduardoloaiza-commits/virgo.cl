import { NextResponse } from "next/server";
import { isKommoConfigured } from "@/lib/kommo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!isKommoConfigured()) {
    return NextResponse.json(
      { error: "Kommo no configurado (falta KOMMO_BASE_URL o KOMMO_ACCESS_TOKEN)" },
      { status: 503 },
    );
  }

  const baseUrl = process.env.KOMMO_BASE_URL!.trim().replace(/\/$/, "");
  const token = process.env.KOMMO_ACCESS_TOKEN!.trim();

  try {
    const res = await fetch(`${baseUrl}/api/v4/leads/pipelines`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        { error: `Kommo respondió ${res.status}`, detail: text.slice(0, 500) },
        { status: 502 },
      );
    }

    const data = await res.json();
    const pipelines = data?._embedded?.pipelines ?? [];

    const simplified = pipelines.map((p: {
      id: number;
      name: string;
      is_main: boolean;
      sort: number;
      _embedded?: { statuses?: Array<{ id: number; name: string; sort: number; color?: string; type?: number }> };
    }) => ({
      id: p.id,
      name: p.name,
      is_main: p.is_main,
      sort: p.sort,
      statuses: (p._embedded?.statuses ?? [])
        .sort((a, b) => a.sort - b.sort)
        .map((s) => ({ id: s.id, name: s.name, color: s.color, type: s.type })),
    }));

    return NextResponse.json({ pipelines: simplified });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error desconocido" },
      { status: 502 },
    );
  }
}
