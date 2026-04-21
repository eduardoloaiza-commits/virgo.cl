import { z } from "zod";

const phoneRegex = /^(\+?56)?\s?9?\s?\d{4}\s?\d{4}$/;

export const leadSchema = z.object({
  source: z.enum(["cotizacion", "contacto", "autogestion"]),
  name: z.string().trim().min(2, "Cuéntanos tu nombre"),
  email: z.string().trim().email("Revisa tu email"),
  phone: z
    .string()
    .trim()
    .min(8, "Ingresa un teléfono válido")
    .regex(phoneRegex, "Ingresa un teléfono chileno válido"),
  rut: z.string().trim().optional(),
  product: z.string().trim().optional(),
  subject: z.string().trim().optional(),
  message: z.string().trim().max(2000).optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean(), z.null()])).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
