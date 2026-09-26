---
version: 1
slug: 'app-page-tsx'
primary_target: 'app/page.tsx'
related_targets:
  [
    'app/layout.tsx',
    'app/servicios',
    'app/productos',
    'app/proyectos',
    'app/contacto',
    'app/cotizar',
  ]
---

Superficie: portada del sitio (`/`). Modo de visitante: **Persuade**.

Audiencia primaria: dueño o administrador de industria y comercio en Arequipa, resolviendo un vencimiento de recarga o una observación de Defensa Civil, con frecuencia desde el celular al sol. Secundarias: jefe de seguridad de mina, procurement, contratista. Tarea: entender el alcance y llegar al número o al formulario. Prueba disponible: 8 líneas de servicio, 12 clientes nombrados, 5 proyectos, +20 años, aval MINEM y aseguradoras. Restricciones: exportación estática, sin fotografía en alta aún, nada sin respaldo.

## Direction contract

**THESIS:** La portada es el plano as-built de la protección contra incendios. Las 8 líneas son ramales de una sola red, no ocho tarjetas. Rechaza la disposición por defecto del rubro: hero con bombero de stock, tres tarjetas iguales con ícono, banda roja de contacto y muro de logos en gris.

**OWN-WORLD:** Papel de plano blanco frío (no crema). Tinta azul-tinta en hairlines de 0,5 y 1 px con jerarquía de grosores como único sistema de profundidad: cero sombra blanda, cero neumorfismo. Rojo fuego reservado exclusivamente a elementos de protección contra incendios y a la acción principal, porque en un as-built real la contra incendios se dibuja en rojo. Cobre solo en sellos de revisión y firmas. Símbolos normados (hidrante, válvula, detector, extintor) como iconografía real. Archivo expandido en mayúsculas para rotulación; JetBrains Mono para cotas, normas y fechas. Cuadro de rótulo como componente recurrente. Una sola lámina continua: las secciones son recortes de ella.

**STORY:** El visitante entiende que toda su protección contra incendios sale de un proveedor. Cree que es capaz porque las mineras de primer nivel ya lo dejaron entrar. Hace una de dos cosas: pide cotización o escribe al WhatsApp.

**FIRST VIEWPORT:** Sin fotografía. Isometría de línea a sangre completa de una red contra incendio —montante, gabinete, hidrante, extintor, detector— en hairline azul sobre papel casi blanco. El ramal de extintores es lo único rojo y es un enlace. Titular a dos líneas alineado a la izquierda en Archivo expandido, sobre el dibujo. Acción principal abajo a la izquierda con el número de WhatsApp visible junto a ella. Cuadro de rótulo abajo a la derecha: PORTUGAL · RUC 20600361172 · NFPA 10 / NTP 350.043 · AREQUIPA · REV. 2026.

**MOMENTO MEMORABLE:** Interacción firma e intro única: el plano se incendia por los bordes y el chorro del extintor **lo vuelve a dibujar** en azul frío. Único momento autoral del sitio; el resto no se anima. ≤3 s, ≤40 KB gzip, solo primera visita de sesión, botón de salto visible, no se muestra bajo `prefers-reduced-motion`, <3 destellos/s.

**FORM:** Plano As-Built, candidata 4 de mi lista ordenada por resonancia. Seed key `1e3dade5`. Elegida por el usuario en la página de decisión. Alzas donadas por retadores declinados: la escala manda el cuerpo tipográfico (Massin); una sola lámina cruza los quiebres (vinilo); toda marca de uso codifica un hecho real (16 mm); cada servicio abre con diagrama, no párrafo (fanzine); el rojo es reservado (cuarto oscuro).

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Decisiones abiertas

- Fotografía en alta resolución: no existe. La dirección no depende de ella; cuando llegue, entra como detalle recortado dentro de la lámina, nunca como fondo de hero.
- Buzones Zoho y cPanel: en adquisición. El formulario usa el adaptador de endpoint.
- Logo plano vectorial: pendiente de archivo editable y autorización. El header usa el wordmark tipográfico mientras tanto.
- Lista real de productos: arranca con las 5 clases de extintor normadas.
