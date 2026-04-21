import { NextResponse } from "next/server";
import { isKommoConfigured } from "@/lib/kommo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const configured = isKommoConfigured();
  if (!configured) {
    return NextResponse.json({
      configured: false,
      reachable: false,
      message: "Faltan KOMMO_BASE_URL y/o KOMMO_ACCESS_TOKEN en el entorno.",
    });
  }

  const baseUrl = process.env.KOMMO_BASE_URL!.trim().replace(/\/$/, "");
  const token = process.env.KOMMO_ACCESS_TOKEN!.trim();
  const timeoutMs = Number(process.env.KOMMO_TIMEOUT_MS) || 10_000;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${baseUrl}/api/v4/account`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timer);

    if (!res.ok) {
      return NextResponse.json(
        {
          configured: true,
          reachable: false,
          status: res.status,
          message: `Kommo respondió ${res.status}. Revisa token o baseUrl.`,
        },
        { status: 502 },
      );
    }

    const account = await res.json().catch(() => ({}));
    return NextResponse.json({
      configured: true,
      reachable: true,
      account: {
        id: account?.id ?? null,
        name: account?.name ?? null,
        subdomain: account?.subdomain ?? null,
      },
    });
  } catch (err) {
    clearTimeout(timer);
    const isTimeout = err instanceof Error && err.name === "AbortError";
    return NextResponse.json(
      {
        configured: true,
        reachable: false,
        message: isTimeout ? "Timeout al contactar Kommo" : "Error al contactar Kommo",
      },
      { status: 502 },
    );
  }
}
