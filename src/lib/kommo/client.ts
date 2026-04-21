import type { KommoComplexLead, LeadPayload, LeadResult } from "./types";

const sourceLabel: Record<LeadPayload["source"], string> = {
  cotizacion: "Cotización web",
  contacto: "Contacto web",
  autogestion: "Autogestión web",
};

const DEFAULT_TIMEOUT_MS = 10_000;

function getConfig() {
  const baseUrl = process.env.KOMMO_BASE_URL?.trim();
  const token = process.env.KOMMO_ACCESS_TOKEN?.trim();
  const pipelineId = process.env.KOMMO_PIPELINE_ID?.trim();
  const statusId = process.env.KOMMO_STATUS_ID?.trim();
  const responsibleUserId = process.env.KOMMO_RESPONSIBLE_USER_ID?.trim();
  const sourceFieldId = process.env.KOMMO_LEAD_SOURCE_FIELD_ID?.trim();
  const timeoutMs = Number(process.env.KOMMO_TIMEOUT_MS) || DEFAULT_TIMEOUT_MS;
  return { baseUrl, token, pipelineId, statusId, responsibleUserId, sourceFieldId, timeoutMs };
}

export function isKommoConfigured() {
  const { baseUrl, token } = getConfig();
  return Boolean(baseUrl && token);
}

function toNumber(value: string | undefined) {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

function buildComplexLead(
  payload: LeadPayload,
  cfg: ReturnType<typeof getConfig>,
  requestId: string,
): KommoComplexLead {
  const tagName = sourceLabel[payload.source];
  const leadName = payload.product
    ? `${tagName} · ${payload.product} · ${payload.name}`
    : `${tagName} · ${payload.name}`;

  const leadCustomFields: KommoComplexLead["custom_fields_values"] = [];
  const sourceFieldId = toNumber(cfg.sourceFieldId);
  if (sourceFieldId) {
    leadCustomFields.push({
      field_id: sourceFieldId,
      values: [{ value: `virgo:${payload.source}` }],
    });
  }

  const tags: Array<{ name: string }> = [{ name: `virgo:${payload.source}` }];
  if (payload.product) tags.push({ name: `producto:${payload.product}` });
  if (payload.subject) tags.push({ name: `asunto:${payload.subject}` });

  return {
    name: leadName,
    pipeline_id: toNumber(cfg.pipelineId),
    status_id: toNumber(cfg.statusId),
    responsible_user_id: toNumber(cfg.responsibleUserId),
    request_id: requestId,
    _embedded: {
      contacts: [
        {
          name: payload.name,
          custom_fields_values: [
            { field_code: "PHONE", values: [{ value: payload.phone, enum_code: "MOB" }] },
            { field_code: "EMAIL", values: [{ value: payload.email, enum_code: "WORK" }] },
          ],
        },
      ],
      tags,
    },
    ...(leadCustomFields.length ? { custom_fields_values: leadCustomFields } : {}),
  };
}

function buildNoteText(payload: LeadPayload) {
  const lines: string[] = [];
  lines.push(`Origen: ${sourceLabel[payload.source]}`);
  if (payload.product) lines.push(`Producto: ${payload.product}`);
  if (payload.subject) lines.push(`Asunto: ${payload.subject}`);
  if (payload.rut) lines.push(`RUT: ${payload.rut}`);
  if (payload.message) {
    lines.push("");
    lines.push(payload.message);
  }
  return lines.join("\n");
}

async function kommoFetch(
  url: string,
  token: string,
  body: unknown,
  timeoutMs: number,
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
      cache: "no-store",
    });
  } finally {
    clearTimeout(timer);
  }
}

async function attachNote(
  baseUrl: string,
  token: string,
  leadId: number,
  text: string,
  timeoutMs: number,
) {
  try {
    const res = await kommoFetch(
      `${baseUrl}/api/v4/leads/${leadId}/notes`,
      token,
      [{ note_type: "common", params: { text } }],
      timeoutMs,
    );
    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("[kommo] note error", res.status, errText);
    }
  } catch (err) {
    console.error("[kommo] note exception", err);
  }
}

export async function createLead(payload: LeadPayload): Promise<LeadResult> {
  const cfg = getConfig();

  if (!cfg.baseUrl || !cfg.token) {
    console.warn("[kommo] No configurado. Payload registrado como stub:", {
      source: payload.source,
      name: payload.name,
      email: payload.email,
      product: payload.product,
    });
    return { ok: true, provider: "stub" };
  }

  const base = cfg.baseUrl.replace(/\/$/, "");
  const requestId = `virgo-${payload.source}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  try {
    const lead = buildComplexLead(payload, cfg, requestId);
    const res = await kommoFetch(`${base}/api/v4/leads/complex`, cfg.token, [lead], cfg.timeoutMs);

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("[kommo] error", res.status, errText);
      return { ok: false, provider: "kommo", error: `Kommo respondió ${res.status}` };
    }

    const data: Array<{ id: number }> = await res.json();
    const leadId = data?.[0]?.id;

    if (leadId && (payload.message || payload.rut || payload.subject)) {
      await attachNote(base, cfg.token, leadId, buildNoteText(payload), cfg.timeoutMs);
    }

    return { ok: true, provider: "kommo", id: leadId ? String(leadId) : "" };
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      console.error("[kommo] timeout", cfg.timeoutMs);
      return { ok: false, provider: "kommo", error: "Kommo no respondió a tiempo" };
    }
    console.error("[kommo] exception", err);
    return { ok: false, provider: "kommo", error: "No se pudo conectar con Kommo" };
  }
}
