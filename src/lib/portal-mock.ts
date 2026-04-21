export type PolicyStatus = "activa" | "por-renovar" | "inactiva";
export type Policy = {
  id: string;
  product: string;
  policyNumber: string;
  company: string;
  status: PolicyStatus;
  coverageLabel: string;
  renewsOn: string;
  monthlyUf?: number;
};

export type CaseStatus = "recibido" | "en-revision" | "en-proceso" | "cerrado";
export type Case = {
  id: string;
  subject: string;
  policyId?: string;
  status: CaseStatus;
  openedAt: string;
  updatedAt: string;
  nextStep?: string;
  owner?: string;
};

export type PendingTask = {
  id: string;
  title: string;
  description: string;
  dueOn?: string;
  priority: "alta" | "media" | "baja";
  caseId?: string;
};

export const mockUser = {
  firstName: "Javiera",
  lastName: "Reyes",
  email: "javiera.reyes@correo.cl",
  advisor: { name: "Camila Soto", role: "Asesora comercial", email: "camila@virgo.cl" },
};

export const mockPolicies: Policy[] = [
  {
    id: "POL-001",
    product: "Seguro de vehículo",
    policyNumber: "A-234-9821",
    company: "Mapfre",
    status: "activa",
    coverageLabel: "Cobertura todo riesgo",
    renewsOn: "2026-09-12",
    monthlyUf: 2.4,
  },
  {
    id: "POL-002",
    product: "Seguro hogar",
    policyNumber: "H-102-3310",
    company: "Help",
    status: "activa",
    coverageLabel: "Estructura + contenido",
    renewsOn: "2026-11-03",
    monthlyUf: 1.1,
  },
  {
    id: "POL-003",
    product: "Seguro Vida + APV",
    policyNumber: "V-882-0412",
    company: "Mapfre",
    status: "por-renovar",
    coverageLabel: "Capital UF 3.000",
    renewsOn: "2026-05-30",
    monthlyUf: 2.0,
  },
];

export const mockCases: Case[] = [
  {
    id: "CASE-2041",
    subject: "Declaración siniestro vehículo",
    policyId: "POL-001",
    status: "en-proceso",
    openedAt: "2026-04-12",
    updatedAt: "2026-04-18",
    nextStep: "Tu asesor revisará los documentos recibidos y te responderá en 48 h.",
    owner: "Camila Soto",
  },
  {
    id: "CASE-2037",
    subject: "Actualización de beneficiarios Vida",
    policyId: "POL-003",
    status: "en-revision",
    openedAt: "2026-04-05",
    updatedAt: "2026-04-10",
    nextStep: "Pendiente firma digital del titular.",
    owner: "Diego Márquez",
  },
  {
    id: "CASE-2012",
    subject: "Cotización ampliación hogar",
    policyId: "POL-002",
    status: "cerrado",
    openedAt: "2026-03-02",
    updatedAt: "2026-03-15",
    owner: "Camila Soto",
  },
];

export const mockPending: PendingTask[] = [
  {
    id: "TASK-12",
    title: "Firmar endoso de Vida",
    description: "Necesitamos tu firma digital para activar el cambio de beneficiarios.",
    dueOn: "2026-04-28",
    priority: "alta",
    caseId: "CASE-2037",
  },
  {
    id: "TASK-09",
    title: "Renovar póliza Vida + APV",
    description: "Tu renovación se activa el 30 de mayo. Confirma si quieres mantener las condiciones.",
    dueOn: "2026-05-20",
    priority: "media",
    caseId: "CASE-2037",
  },
  {
    id: "TASK-07",
    title: "Cargar foto del vehículo para siniestro",
    description: "Se requiere foto frontal y del daño específico para avanzar con el siniestro.",
    dueOn: "2026-04-22",
    priority: "alta",
    caseId: "CASE-2041",
  },
];

export const caseStatusLabel: Record<CaseStatus, string> = {
  recibido: "Recibido",
  "en-revision": "En revisión",
  "en-proceso": "En proceso",
  cerrado: "Cerrado",
};

export const caseStatusTone: Record<CaseStatus, string> = {
  recibido: "bg-surface-raised text-ink",
  "en-revision": "bg-virgo-lime-100 text-virgo-teal-900",
  "en-proceso": "bg-virgo-teal-50 text-virgo-teal-900",
  cerrado: "bg-success-soft/40 text-success",
};

export const policyStatusLabel: Record<PolicyStatus, string> = {
  activa: "Activa",
  "por-renovar": "Por renovar",
  inactiva: "Inactiva",
};

export const policyStatusTone: Record<PolicyStatus, string> = {
  activa: "bg-success-soft/40 text-success",
  "por-renovar": "bg-warning-soft/60 text-warning",
  inactiva: "bg-surface-raised text-ink-muted",
};

export const priorityTone: Record<PendingTask["priority"], string> = {
  alta: "bg-danger-soft text-danger",
  media: "bg-warning-soft text-warning",
  baja: "bg-surface-raised text-ink-muted",
};
