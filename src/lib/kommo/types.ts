export type LeadSource = "cotizacion" | "contacto" | "autogestion";

export type LeadPayload = {
  source: LeadSource;
  name: string;
  email: string;
  phone: string;
  rut?: string;
  message?: string;
  product?: string;
  subject?: string;
  metadata?: Record<string, string | number | boolean | null>;
};

export type LeadResult = {
  ok: boolean;
  id?: string;
  provider: "kommo" | "stub";
  error?: string;
};

export type KommoComplexLead = {
  name: string;
  price?: number;
  pipeline_id?: number;
  status_id?: number;
  responsible_user_id?: number;
  request_id?: string;
  _embedded: {
    contacts: Array<{
      name: string;
      first_name?: string;
      last_name?: string;
      custom_fields_values?: Array<{
        field_code: "PHONE" | "EMAIL";
        values: Array<{ value: string; enum_code?: "WORK" | "MOB" }>;
      }>;
    }>;
    tags?: Array<{ name: string }>;
  };
  custom_fields_values?: Array<{
    field_id: number;
    values: Array<{ value: string }>;
  }>;
};
