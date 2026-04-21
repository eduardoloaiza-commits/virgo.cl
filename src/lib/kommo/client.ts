import type { KommoComplexLead, LeadPayload, LeadResult } from "./types";

const sourceLabel: Record<LeadPayload["source"], string> = {
  cotizacion: "Cotización web",
  contacto: "Contacto web",
  autogestion: "Autogestión web",
};

function getConfig() {
  const baseUrl = process.env.KOMMO_BASE_URL;
  const token = process.env.KOMMO_ACCESS_TOKEN;
  const pipelineId = process.env.KOMMO_PIPELINE_ID;
  return { baseUrl, token, pipelineId };
}

export function isKommoConfigured() {
  const { baseUrl, token } = getConfig();
  return Boolean(baseUrl && token);
}

function buildComplexLead(payload: LeadPayload, pipelineId?: string): KommoComplexLead {
  const tagName = sourceLabel[payload.source];
  const leadName = payload.product
    ? `${tagName} · ${payload.product} · ${payload.name}`
    : `${tagName} · ${payload.name}`;

  return {
    name: leadName,
    pipeline_id: pipelineId ? Number(pipelineId) : undefined,
    _embedded: {
      contacts: [
        {
          name: payload.name,
          custom_fields_values: [
            {
              field_code: "PHONE",
              values: [{ value: payload.phone, enum_code: "MOB" }],
            },
            {
              field_code: "EMAIL",
              values: [{ value: payload.email, enum_code: "WORK" }],
            },
          ],
        },
      ],
      tags: [{ name: `virgo:${payload.source}` }, ...(payload.product ? [{ name: `producto:${payload.product}` }] : [])],
    },
  };
}

export async function createLead(payload: LeadPayload): Promise<LeadResult> {
  const { baseUrl, token, pipelineId } = getConfig();

  if (!baseUrl || !token) {
    console.warn("[kommo] No configurado. Payload registrado como stub:", {
      source: payload.source,
      name: payload.name,
      email: payload.email,
      product: payload.product,
    });
    return { ok: true, provider: "stub" };
  }

  try {
    const body = [buildComplexLead(payload, pipelineId)];
    const res = await fetch(`${baseUrl.replace(/\/$/, "")}/api/v4/leads/complex`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("[kommo] error", res.status, errText);
      return { ok: false, provider: "kommo", error: `Kommo respondió ${res.status}` };
    }

    const data: Array<{ id: number }> = await res.json();
    return { ok: true, provider: "kommo", id: String(data?.[0]?.id ?? "") };
  } catch (err) {
    console.error("[kommo] exception", err);
    return { ok: false, provider: "kommo", error: "No se pudo conectar con Kommo" };
  }
}
