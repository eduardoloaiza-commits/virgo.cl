# virgo.cl

Plataforma web para **Virgo Corredores de Seguros** (Chile). Tres módulos en una sola base Next.js:

1. **Sección comercial pública** — home, seguros para personas / empresas / mascotas, cotización, contacto.
2. **Canal de autogestión** — formulario que crea leads/cases en Kommo (siniestros, renovaciones, consultas).
3. **Portal privado del asegurado** — pólizas, historial de gestiones, trámites pendientes y seguimiento.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Fuentes Google: Plus Jakarta Sans (display) + Manrope (body)
- Integración desacoplada con Kommo CRM (stub hasta configurar credenciales)
- Validación con Zod

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

## Integración con Kommo

Configura en `.env.local`:

```
KOMMO_BASE_URL=https://virgo.kommo.com
KOMMO_ACCESS_TOKEN=...
KOMMO_PIPELINE_ID=...
```

Sin estas variables, los formularios siguen funcionando pero se registran como **stub** en el log del servidor.
Toda la comunicación con Kommo vive en `src/lib/kommo/` y se invoca desde `src/app/api/leads/route.ts`.

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
