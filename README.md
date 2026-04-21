# virgo.cl

Plataforma web para **Virgo Corredores de Seguros** (Chile). Tres módulos en una sola base Next.js:

1. **Sección comercial pública** — home, seguros para personas / empresas / mascotas, cotización, contacto.
2. **Canal de autogestión** — formulario que crea leads/cases en Kommo (siniestros, renovaciones, consultas).
3. **Portal privado del asegurado** — pólizas, historial de gestiones, trámites pendientes y seguimiento.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Auth.js v5 (credentials provider + JWT sessions)
- Drizzle ORM + Vercel Postgres (Neon)
- Resend (email transaccional)
- Kommo CRM (ingestión de leads y lectura de pipelines)
- Zod (validación)

Design tokens derivados del design system **Virgo Core** diseñado en Stitch
(`projects/2045003815951231284`).

## Empezar

```bash
cp .env.example .env.local
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Scripts

- `npm run dev` — servidor local
- `npm run build` — build de producción
- `npm run start` — servidor en modo producción
- `npm run typecheck` — validación de tipos
- `npm run lint` — ESLint
- `npm run db:generate` — genera migración SQL a partir del schema Drizzle
- `npm run db:push` — aplica el schema directo a la DB (solo dev)

## Base de datos + Auth

Variables requeridas en `.env.local` / Vercel:

```
DATABASE_URL=postgres://...               # Neon via Vercel Marketplace
AUTH_SECRET=<32 bytes base64>             # openssl rand -base64 32
ADMIN_BOOTSTRAP_SECRET=<secret arbitrario>
ADMIN_RUT=12.345.678-9
ADMIN_EMAIL=admin@virgo.cl
ADMIN_NOMBRE=Administrador Virgo
ADMIN_INITIAL_PASSWORD=<mínimo 10 chars>
```

**Bootstrap del primer admin** (solo la primera vez, después deshabilita):

```bash
# 1. Aplica el schema a la DB
curl -X POST https://virgo.cl/api/admin/migrate \
  -H "x-bootstrap-secret: $ADMIN_BOOTSTRAP_SECRET"

# 2. Crea el primer admin (idempotente — falla si ya existe admin)
curl -X POST https://virgo.cl/api/admin/bootstrap \
  -H "x-bootstrap-secret: $ADMIN_BOOTSTRAP_SECRET"
```

Después de confirmar el admin, **borra `ADMIN_INITIAL_PASSWORD`** de las envs de Vercel
para que el hash no pueda regenerarse.

## Integración con Kommo

Configura en `.env.local`:

```
KOMMO_BASE_URL=https://virgocorredores.kommo.com
KOMMO_ACCESS_TOKEN=<long-lived token>
KOMMO_PIPELINE_ID=<id numérico>
KOMMO_STATUS_ID=<id numérico de la etapa de entrada>
KOMMO_RESPONSIBLE_USER_ID=<opcional>
KOMMO_LEAD_SOURCE_FIELD_ID=<opcional — campo custom texto>
KOMMO_TIMEOUT_MS=10000
```

**Cómo obtener el token**: Kommo → Ajustes → Integraciones → "+ Crear integración" → Privada.
Copia el *access token* de larga duración.

**Cómo obtener pipeline/status IDs**:
`curl -H "Authorization: Bearer $KOMMO_ACCESS_TOKEN" https://virgocorredores.kommo.com/api/v4/leads/pipelines`

Sin estas variables los formularios siguen funcionando pero se registran como **stub**
en el log del servidor (no se crea lead en el CRM).

Toda la comunicación con Kommo vive en `src/lib/kommo/` y se invoca desde `src/app/api/leads/route.ts`.
El cliente crea un lead vía `/api/v4/leads/complex` (con `request_id` para idempotencia) y agrega
una nota adicional con RUT/asunto/mensaje cuando corresponde.

## Estructura

```
src/
  app/
    (publico)        # home + marketing
    cotiza/          # form cotización
    contacto/        # form contacto
    autogestion/     # canal de gestión
    portal/          # zona privada (layout aislado)
      login, recuperar, polizas, gestiones, tramites, solicitud/[id]
    api/leads/       # endpoint único de leads
  components/
    layout/          # Navbar, Footer, Logo, WhatsAppFAB
    marketing/       # ProductCard
    forms/           # LeadForm + FormField
    portal/          # PortalNav, StatusPill
    ui/              # Button, Container, ProductIcon
  lib/
    catalog.ts       # catálogo de productos
    portal-mock.ts   # mocks para el portal
    kommo/           # integración desacoplada
    validation.ts    # Zod schema
    site.ts          # nav + metadatos
```

## Pendientes (siguiente iteración)

- [ ] Autenticación real del portal (hoy el login redirige con mock).
- [ ] Persistencia / API que alimente el portal con datos reales desde Kommo.
- [ ] Credenciales Kommo + IDs de pipeline/campos custom por ambiente.
- [ ] Logo SVG oficial (hoy usamos una marca tipográfica provisional).
- [ ] Páginas legales (términos, privacidad, SERNAC).
