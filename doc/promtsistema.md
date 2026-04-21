Construye un sistema web responsive para Virgo Corredores de Seguros basado en la siguiente definición funcional:

## Objetivo
Desarrollar una plataforma web con:
1. Canal de autogestión.
2. Portal privado del asegurado.
3. Sección comercial de captación.

## Contexto de negocio
Virgo usa Kommo CRM como núcleo operativo. Los clientes hoy dependen principalmente de WhatsApp. El sistema debe digitalizar esos flujos sin romper la operación actual.

## Requerimientos funcionales

### Área pública
- Home institucional-comercial.
- Páginas de servicios: seguros para personas, empresas y mascotas.
- Formulario “Cotiza tu seguro”.
- Formulario de contacto.
- Botón de WhatsApp persistente.
- Sección de confianza con beneficios, experiencia y clientes.

### Canal de autogestión
- Formularios diferenciados para siniestros, renovaciones, consultas y otros trámites.
- Confirmación visual tras envío.
- Registro automático del caso en Kommo.
- Vista de estado de solicitud.

### Portal del asegurado
- Login seguro.
- Recuperación de contraseña.
- Dashboard del usuario.
- Lista de pólizas activas.
- Historial de gestiones.
- Trámites pendientes.
- Estados de seguimiento.

## Integración
- Integrar formularios y acciones clave con Kommo CRM.
- Diseñar la integración de manera desacoplada para poder extenderla.
- Preparar servicios o capas de integración limpias y mantenibles.

## Requerimientos técnicos
- Arquitectura modular.
- Componentización clara.
- Responsive real.
- Buen rendimiento.
- Manejo de estados: loading, éxito, error, vacío.
- Buenas prácticas de seguridad en autenticación y manejo de datos.
- Código preparado para escalar.

## UX/UI
- Inspirado en una corredora moderna, cercana y confiable.
- Usar paleta basada en verdes, turquesas y lima.
- Diseño claro, limpio y humano.
- Mobile first.

## Entregables esperados en el desarrollo
- Estructura de rutas.
- Componentes reutilizables.
- Pantallas completas.
- Formularios funcionales.
- Base de autenticación.
- Base del dashboard del asegurado.
- Integración estructurada con Kommo.
- Proyecto listo para iteración posterior.

## Importante
No construir solo una web institucional.
Debe sentirse como una herramienta operativa de negocio y atención al cliente.