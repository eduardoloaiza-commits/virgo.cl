import { NextResponse } from "next/server";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { getRawSql } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

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

  let sql;
  try {
    sql = getRawSql();
  } catch {
    return NextResponse.json({ ok: false, error: "DATABASE_URL no configurado" }, { status: 500 });
  }
  const migrationsDir = path.join(process.cwd(), "drizzle");

  try {
    const files = (await readdir(migrationsDir))
      .filter((f) => f.endsWith(".sql"))
      .sort();

    const applied: string[] = [];
    for (const file of files) {
      const content = await readFile(path.join(migrationsDir, file), "utf8");
      const statements = content
        .split("--> statement-breakpoint")
        .map((s) => s.trim())
        .filter(Boolean);

      for (const stmt of statements) {
        await sql.query(stmt);
      }
      applied.push(file);
    }

    return NextResponse.json({ ok: true, applied });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
