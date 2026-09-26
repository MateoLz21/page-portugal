# Plan de desarrollo por fases

**Proyecto:** sitio corporativo Portugal Seguridad Industrial y Minera E.I.R.L. · `cortaincendiosportugal.com`
**Fecha:** 26/09/2026
**Documentos que manda este plan:** `PRODUCT.md` (verdad de producto) · `docs/scope_1.md` v1.3 (alcance) · `.impeccable/surfaces/app-page-tsx.md` (contrato de dirección) · `docs/auditoria-skills.md` (por qué el diseño es así)

---

---

## Bitácora

| Fase | Estado | Cierre |
|---|---|---|
| **0 · Andamiaje y tokens** | ✅ **Cerrada** | 26/09/2026. Build genera `/out`; fuentes autoalojadas verificadas (cero llamadas a Google en runtime); tokens de §6.2 resuelven; lint, typecheck y format en cero. Cuatro versiones fijadas por incompatibilidad de upstream: `eslint` fuera de `next.config.ts` (Next 16 ya no lo acepta), eslint en 9 (los plugins de `eslint-config-next` no soportan 10), TypeScript en 6.0.3 (`typescript-eslint@8` acepta `<6.1.0`; con TS 7 el build funciona pero el lint no arranca), y `eslint-config-next` importado como flat config nativo, sin `FlatCompat`. |
| **1 · La lámina** | ✅ **Cerrada** | 26/09/2026. **Compuerta aprobada por el cliente: «sí se lee como un plano».** Isometría de red en escritorio, diagrama de montante en móvil, 10 símbolos normados, rótulos con colocación automática sin encimarse, 3 cruces de anillo con oclusión, ids de segmento únicos para la Fase 6. Detector en cero contra el código y contra la página renderizada. **Storyboard de la intro entregado** (`docs/storyboard-intro.html`): 4 fotogramas renderizados desde la geometría real, que además prueban el modelo de calor de la Fase 6. |
| 2 · Sistema de componentes | ⏳ Siguiente | |
| 3 · Portada | ⏳ | |
| 4 · Rutas internas | ⏳ | |
| 5 · Formularios | ⏳ | |
| 6 · La intro | ⏳ | Storyboard entregado al cliente; espera su aprobación de guion, estilo del extintor y duración |
| 7 · SEO, analítica y legal | ⏳ | |
| 8 · Revisión de cierre | ⏳ | |
| 9 · Backend PHP y correo | ⛔ Bloqueada | Espera cPanel contratado y buzones Zoho |
| 10 · Despliegue | ⏳ | |
| 11 · Entrega | ⏳ | |

### Correcciones que la Fase 1 dejó en el alcance

- **§6.3, medida de lectura.** El valor era `68ch`; medido en el navegador, `66ch` rendía **89 caracteres** por línea. En Archivo el glifo `0` —que es lo que mide la unidad `ch`— es más ancho que el promedio de una minúscula en español, así que `1ch` ≈ 1,35 caracteres. Corregido a la utilidad `medida` con `56ch`.
- **Retícula de plano.** La primera versión usaba la palabra clave `transparent` en el degradado, que es `rgba(0,0,0,0)` —negro con alfa cero—. Además de arruinar la medición de contraste, interpolar hacia ella deja franja gris en varios motores. Ahora el hueco es papel con alfa cero, nombrado en un token, y la superficie pinta su propio fondo.

---

## Principio de secuencia

Tres reglas ordenan todo lo de abajo, y ninguna es arbitraria:

1. **Lo que puede fallar primero, se hace primero.** La lámina isométrica es el activo del que cuelga el mundo visual entero. Si no se lee como un plano técnico creíble, la dirección no se sostiene — y eso hay que descubrirlo en la Fase 1 con una sola página, no en la Fase 8 con once rutas construidas encima.
2. **Nada espera al cliente ni al hosting.** Las Fases 0 a 8 no necesitan ni una foto, ni un logo editable, ni un buzón de correo, ni el cPanel. El sitio se puede terminar completo antes de que llegue el hosting. Solo la Fase 9 depende de eso.
3. **Cada fase tiene una compuerta medible.** No "quedó lindo": un criterio que se verifica con el navegador, con Lighthouse o con un valor computado. Una fase sin su compuerta cerrada no habilita la siguiente.

---

## Ruta crítica

```
F0 Andamiaje  →  F1 LA LÁMINA  →  F2 Componentes  →  F3 Portada  →  F4 Rutas
                     ▲                                                  │
              punto de riesgo                                           ▼
              del proyecto                                       F5 Formularios
                                                                        │
                                                                        ▼
                                                     F6 Intro  →  F7 SEO  →  F8 CIERRE
                                                                                 │
                              ┌──────────────────────────────────────────────────┘
                              ▼
                        F9 PHP + correo  ⛔ espera hosting
                              │
                              ▼
                        F10 Despliegue  →  F11 Entrega
```

**En paralelo, sin bloquear:** los 4 fotogramas del storyboard de la intro se pueden dibujar y mandar a aprobación durante la F1, así la aprobación del cliente llega mucho antes de que la F6 la necesite.

---

## Fase 0 — Andamiaje y tokens

_Sin trabajo visual. Solo que el terreno exista y que el build salga._

| #   | Tarea                                                                                                                                                           |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0.1 | `package.json`, Next.js última estable, React, TypeScript, App Router                                                                                           |
| 0.2 | `next.config.ts` con `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`                                                                 |
| 0.3 | Tailwind CSS v4 con los tokens de §6.2 en `@theme`: `paper`, `paper-alt`, `ink-900/600/300`, `fire-600/700`, `copper-500`, `teal-600`                           |
| 0.4 | `next/font/google`: **Archivo** variable con `axes: ['wdth']` y subconjuntos `latin` + `latin-ext` (los acentos del español), más **JetBrains Mono** en 400/500 |
| 0.5 | Estructura de carpetas de §5.2: `/app`, `/components/{ui,layout,motion,forms,plan}`, `/content`, `/public`, `/php`                                              |
| 0.6 | Stubs de `/content` con **todos los campos pendientes como opcionales**: `empresa.ts` con `horario: null`, `redes: []`, `certificaciones: []` (patrón de §13.1) |
| 0.7 | ESLint, Prettier, y los tres grosores de línea + la retícula de 8 px como utilidades de Tailwind                                                                |

**Compuerta:** `npm run build` genera `/out`. Las fuentes quedan autoalojadas en el build (verificar que no hay petición a `fonts.googleapis.com` en runtime). Una página vacía renderiza con el fondo `paper` correcto. Cero errores en consola, cero avisos de ESLint.

**No depende de nada.** Arranca hoy.

---

## Fase 1 — La lámina 🔴 punto de riesgo del proyecto

_El activo clave. Se hace aislado, antes de construir nada alrededor._

| #   | Tarea                                                                                                                                                                                                 |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.1 | Dibujar la **isometría de la red contra incendio** en SVG: montante, gabinete, hidrante, extintor, detector, bomba, cámara de seguridad y casco — los 8 ramales de §3.3 colgando de una sola montante |
| 1.2 | Aplicar los tres grosores: `0,5 px / ink-300` retícula y auxiliares · `1 px / ink-600` separadores y contornos · `2 px / ink-900` elemento activo. **El grosor es la jerarquía**                      |
| 1.3 | El **ramal de extintores en `fire-600`**, y es un enlace. Único elemento rojo del encuadre                                                                                                            |
| 1.4 | El ramal de agua (redes húmedas, hidrantes) en `teal-600`                                                                                                                                             |
| 1.5 | **Segmentos direccionables individualmente** (`id` por segmento). La Fase 6 interpola el `stroke` de cada uno; si el SVG es un blob monolítico, la intro se vuelve imposible                          |
| 1.6 | Los **8 símbolos normados** como componentes SVG reutilizables, de trazo consistente, derivados de la simbología real de plano                                                                        |
| 1.7 | Comportamiento responsive del dibujo en 360 / 768 / 1024 / 1440: la lámina **recorta y reordena**, no se escala a la miniatura ilegible                                                               |
| 1.8 | Superposición: un elemento al frente **interrumpe la línea** del que está detrás. Es lo que da profundidad sin una sola sombra                                                                        |

**Compuerta — la más importante del proyecto:** el dibujo **se lee como un plano técnico creíble, no como decoración**. Prueba concreta: si alguien del oficio lo mira y reconoce la simbología, pasa. Si parece una ilustración de líneas bonitas, no pasa y hay que rehacerlo _acá_, con una página de costo, no con once rutas encima.

**Entregable:** una sola página que muestre la lámina en los 4 breakpoints más los 8 símbolos en fila. Nada más.

**En paralelo:** dibujar los **4 fotogramas del storyboard de la intro** (0 s / 1 s / 2 s / 3 s) y mandarlos al cliente. Es el único pendiente que le queda de la intro.

---

## Fase 2 — Sistema de componentes

_Los diez componentes de §6.5, cada uno con todos sus estados._

| #    | Tarea                                                                                                                                                                                                                                                                        |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2.1  | `TitleBlock` — el cuadro de rótulo. El componente más recurrente del sitio                                                                                                                                                                                                   |
| 2.2  | `Branch` — el ramal de servicio. **Reemplaza a la tarjeta de servicio**: símbolo + número de detalle + título + norma en mono, sin contenedor y sin sombra                                                                                                                   |
| 2.3  | `Symbol` — envoltorio de los 8 símbolos de la F1                                                                                                                                                                                                                             |
| 2.4  | `Dimension` — la cota: línea de extensión con su valor en mono                                                                                                                                                                                                               |
| 2.5  | `RevisionStamp` — marco en cobre con número de revisión y fecha                                                                                                                                                                                                              |
| 2.6  | `DetailView` — el patrón de las páginas de servicio: recorte a mayor escala con su escala declarada y su rótulo                                                                                                                                                              |
| 2.7  | `FigureBand` — las 4 cifras con filetes de 1 px. **Sin tarjeta y sin contador animado**                                                                                                                                                                                      |
| 2.8  | `FormCell` — campo como celda de cuadro de llenado: filete inferior de 1 px, etiqueta arriba, foco con anillo cobre de 2 px. **Nunca hundido, nunca del color del fondo**                                                                                                    |
| 2.9  | `NormTimeline` — inspección mensual → recarga anual → hidrostática 5 años                                                                                                                                                                                                    |
| 2.10 | `Breadcrumb` — `RED GENERAL / DETALLE 03 / EXTINTORES` en mono                                                                                                                                                                                                               |
| 2.11 | `Header` (píldora fija, se compacta al scroll), `Footer`, `MobileMenu`, `WhatsAppButton` (el único elemento circular del sitio)                                                                                                                                              |
| 2.12 | **Superficies del navegador**, tematizadas desde la paleta: selección de texto, cursor de inserción, barra de desplazamiento, anillo de foco, `text-underline-offset` y numerales tabulares. Es lo que más se salta y lo que más delata un sitio armado en vez de construido |

**Compuerta:** una página de componentes que muestre **cada componente en cada estado** (reposo, hover, activo, foco, deshabilitado, error, vacío, cargando). Contraste **medido con el inspector, no asumido**: cuerpo y placeholders ≥ 4,5:1, texto grande ≥ 3:1. Navegación completa por teclado con foco siempre visible. Un solo radio de esquina (`0`) en todo, con la única excepción documentada del botón de WhatsApp.

---

## Fase 3 — Portada

_Las 8 secciones de §4.1, en el orden nuevo: audiencia local primero, minería como prueba._

| #   | Tarea                                                                                                                                                                                                                                                    |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3.1 | **Hero exactamente como lo fija el contrato de dirección:** lámina a sangre, H1 a dos líneas alineado a la izquierda, acción principal abajo a la izquierda con el número de WhatsApp visible al costado, cuadro de rótulo abajo a la derecha            |
| 3.2 | **Tres entradas por urgencia** — _"Recargar extintores"_ / _"Necesito certificado para Defensa Civil o mi seguro"_ / _"Instalación nueva"_. Filas sobre el dibujo, no tarjetas. Cada una entra al servicio o al formulario con el asunto ya seleccionado |
| 3.3 | Las 8 líneas como ramales de la red                                                                                                                                                                                                                      |
| 3.4 | "Por qué un solo proveedor" + la banda tipográfica de las 4 cifras                                                                                                                                                                                       |
| 3.5 | Respaldo: 12 clientes en **lista tipográfica de nombres** (nunca logotipos) + 3 proyectos + el aval MINEM y aseguradoras                                                                                                                                 |
| 3.6 | Catálogo destacado: las 5 clases de extintor normadas                                                                                                                                                                                                    |
| 3.7 | La línea de tiempo normativa                                                                                                                                                                                                                             |
| 3.8 | Cierre con el cuadro de rótulo completo. **Sin banda roja a sangre** — el rojo está reservado                                                                                                                                                            |
| 3.9 | Trazado de la lámina con `stroke-dashoffset`, **una sola vez**, de la montante hacia los ramales                                                                                                                                                         |

**Compuerta:** el hero entra **completo en la primera pantalla** — H1 máximo 2 líneas en escritorio, subtítulo máximo 20 palabras, acción visible sin scroll, padding superior tope `pt-24`. Contenido real de `/content`, no _lorem_. Una sola etiqueta por intención ("Solicitar cotización" en header, hero y footer). Cero eyebrows.

**Método de verificación** (regla de `craft-floor`): **rondas acotadas, no un bucle**. Se construye completo, se inspecciona una vez con una ronda por lotes —escritorio y móvil juntos—, se corrige todo lo que aparezca en un solo lote, se confirma con **una ronda más como máximo**, y se para. El auto-QA infinito gasta plata haciendo peor lo que la revisión de cierre hace mejor.

---

## Fase 4 — Rutas internas

| #   | Tarea                                                                                                                                                                                                           |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4.1 | `/nosotros` — quiénes somos, visión, misión (**sin la frase de monitoreo 24 h**, ver §13.1 punto 6), pilares, valores propuestos                                                                                |
| 4.2 | `/servicios` — listado de los 8 ramales                                                                                                                                                                         |
| 4.3 | `/servicios/[slug]` — las 8 páginas con `generateStaticParams`. Patrón `DetailView`, y **cada una abre con un diagrama, no con un párrafo** (alza donada), con línea de referencia al dato que decide la compra |
| 4.4 | `/productos` y `/productos/[categoria]` — las 5 clases de extintor normadas (PQS, CO₂, agua, espuma, acetato de potasio) + EPP, cada ficha con `estado: 'borrador'`                                             |
| 4.5 | `/proyectos` — 5 proyectos + la cartera completa                                                                                                                                                                |
| 4.6 | `/contacto` — datos, `tel:`, WhatsApp, mapa de Google en iframe sin API key, y el cuadro de rótulo como bloque de contacto                                                                                      |
| 4.7 | `/cotizar` — recibe `?servicio=` y `?producto=`                                                                                                                                                                 |
| 4.8 | `/politica-de-privacidad` (Ley N.º 29733) y `/404`                                                                                                                                                              |

**Compuerta:** las 11 rutas presentes en `/out` como `ruta/index.html`. Cero enlaces muertos. Migas de pan consistentes. Los bloques de datos pendientes **no se renderizan** en lugar de mostrar vacíos: sin horario, sin fila de redes, sin sellos inventados.

---

## Fase 5 — Formularios (lado cliente)

_Completos y demostrables sin backend, gracias al adaptador de §8.7._

| #   | Tarea                                                                                                                                      |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 5.1 | `react-hook-form` + `zod` con los campos de §8.2                                                                                           |
| 5.2 | `ContactForm` y `QuoteForm` con `FormCell`: etiqueta arriba, ayuda presente en el markup, error abajo. **Nunca placeholder como etiqueta** |
| 5.3 | Estados animados: enviando, éxito, error — es retroalimentación, uno de los efectos que sobrevivió el recorte de §7                        |
| 5.4 | Casilla de consentimiento de datos (Ley N.º 29733), obligatoria                                                                            |
| 5.5 | `FORM_ENDPOINT` desde `NEXT_PUBLIC_FORM_ENDPOINT`. Sin definir → valida, muestra estados y escribe el payload en consola                   |
| 5.6 | Campo honeypot y marca de tiempo firmada ya en el markup, listos para que el PHP los lea en la F9                                          |

**Compuerta:** validación completa y **los tres estados demostrables sin servidor**. Contraste de formulario medido: campos, placeholders, anillos de foco, texto de ayuda y texto de error, todos AA contra el fondo de su sección. Las etiquetas de los botones no se parten en dos líneas en escritorio.

---

## Fase 6 — La intro

_Va casi al final a propósito: anima los segmentos de la lámina, así que la lámina tiene que estar congelada. Animar un dibujo que todavía cambia es hacerlo dos veces._

**Prerrequisito:** los 4 fotogramas aprobados por el cliente (mandados en la F1).

| #   | Tarea                                                                                                                                                                                                                                                                                          |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 6.1 | `IntroOverlay` como client component con `dynamic import` **después del primer render**                                                                                                                                                                                                        |
| 6.2 | `PlanCanvas` — el mismo SVG del hero con un `heat` por segmento: el `stroke` interpola `ink-600 → fire-600 → ink-600`. **Sin WebGL y sin shader**                                                                                                                                              |
| 6.3 | `Extinguisher` — SVG propio en hairline del mismo grosor que la lámina, animado con Framer Motion (x, rotate, retroceso)                                                                                                                                                                       |
| 6.4 | `SprayCanvas` — Canvas 2D, ~300-600 partículas (móvil ~150) con velocidad, arrastre y opacidad                                                                                                                                                                                                 |
| 6.5 | `FogMask` — capa blanca con máscara radial                                                                                                                                                                                                                                                     |
| 6.6 | Coreografía con `useAnimate` + `requestAnimationFrame` para el canvas. Al cerrar, el extintor **se convierte en el símbolo del ramal rojo** del hero                                                                                                                                           |
| 6.7 | Obligatorios: botón "Saltar intro" visible desde el primer instante · salida con clic, Esc o scroll · solo primera visita de sesión (`sessionStorage`) · solo en el inicio · **no se muestra con `prefers-reduced-motion`** · `devicePixelRatio` tope 1,5 · liberación de recursos al terminar |

**Compuerta — medida, no estimada:** JavaScript de la intro **≤ 40 KB gzip verificado con el analizador de bundle**. 60 fps en un celular de gama media real. Lighthouse sigue ≥ 90 en móvil con la intro activa. **Menos de 3 destellos por segundo** (WCAG 2.3.1) — el encendido es un vire de color gradual, no un parpadeo. Y el hero renderizado debajo en el HTML estático desde el inicio: la intro no retrasa el contenido ni el SEO.

---

## Fase 7 — SEO, analítica y legal

| #   | Tarea                                                                                                                                                                                                                                                    |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 7.1 | Metadata por página (title, description, canonical), Open Graph y Twitter con imagen de marca                                                                                                                                                            |
| 7.2 | `app/sitemap.ts` y `app/robots.ts` generados en el build                                                                                                                                                                                                 |
| 7.3 | **JSON-LD `LocalBusiness`** con nombre, RUC, dirección, teléfono y geo — **omitiendo `openingHours` y `sameAs`** hasta que existan los datos. Un horario inventado en datos estructurados es peor que ninguno: Google lo publica en el panel de búsqueda |
| 7.4 | `Service` en JSON-LD por cada uno de los 8 servicios                                                                                                                                                                                                     |
| 7.5 | Palabras clave objetivo: _recarga de extintores Arequipa_, _sistemas contra incendio minería_, _supresión de incendios en equipos pesados_, _redes de agua contra incendio_, _capacitación de brigadistas_, _venta de extintores Arequipa_               |
| 7.6 | Pipeline de imágenes: WebP/AVIF en el build, `loading="lazy"`, ninguna imagen sobre 300 KB                                                                                                                                                               |

**Compuerta:** JSON-LD válido en el validador de resultados enriquecidos de Google, sin campos inventados. Sitemap con las 11 rutas.

_Matomo se instala en la F10: necesita el cPanel._

---

## Fase 8 — Revisión de cierre ⚠️ obligatoria por contrato

_El contrato de dirección cierra con esta línea, literal: «unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance»._
_Una página que parece terminada con esta fase sin descargar no está terminada: está abandonada en la línea de meta._

| #   | Tarea                                                                                                                                                                                                                  |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 8.1 | `impeccable-finish-reviewer` contra el contrato de dirección: ¿cumplió el FIRST VIEWPORT? ¿existe el momento autoral prometido? Devuelve una lista ordenada de arreglos materiales                                     |
| 8.2 | Pasada de `craft-floor` en **una ronda por lotes**: contraste, profundidad, espaciado, tipografía (medida 65-75ch, tracking piso -0,04em), movimiento, estados, superficies del navegador, textos, cobertura           |
| 8.3 | `/impeccable audit` — accesibilidad, rendimiento, responsive                                                                                                                                                           |
| 8.4 | `/impeccable polish` — pasada final y alineación al sistema                                                                                                                                                            |
| 8.5 | `impeccable-documenter` escribe **`DESIGN.md` a partir del artefacto construido**, no de las intenciones. El orden importa: un reglamento escrito antes del build se defiende contra la realidad en vez de describirla |
| 8.6 | Procedencia de cada raster que se publica                                                                                                                                                                              |
| 8.7 | Lighthouse ≥ 90 en Performance, Accesibilidad, Best Practices y SEO, **en móvil**. LCP < 2,5 s, CLS < 0,1                                                                                                              |
| 8.8 | Cross-browser: últimas 2 versiones de Chrome, Edge, Firefox y Safari, iOS incluido                                                                                                                                     |

**Compuerta:** veredicto de la revisión de cierre emitido, `DESIGN.md` escrito, Lighthouse en verde en los cuatro ejes. **Acá termina el build.**

---

## Fase 9 — Backend PHP y correo ⛔ bloqueada por hosting

_Lo único que espera de verdad. Todo lo anterior se puede terminar antes._

**Prerrequisitos del cliente:** cPanel contratado · dominio apuntado · buzones Zoho creados · accesos al registrador de DNS y a la consola de Zoho.

| #   | Tarea                                                                                                                                                                                                                                   |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 9.1 | `contact.php` con PHPMailer por Composer. Solo `POST`, solo `application/json`, `Origin` verificado contra el dominio, longitud máxima por campo, escapado de todo lo que va al HTML del correo, mensajes de error genéricos sin trazas |
| 9.2 | Credenciales en `config.php` **fuera de `public_html`** (p. ej. `/home/usuario/private/config.php`) y **nunca en el repositorio**                                                                                                       |
| 9.3 | `Deny from all` en `.htaccess` para `/vendor` y para todo `/api` salvo `contact.php`. El `vendor/` de PHPMailer no puede quedar accesible por web                                                                                       |
| 9.4 | Anti-spam de §8.6: honeypot + trampa de tiempo + **Altcha autoalojado** + límite de 5 envíos por IP cada 10 minutos                                                                                                                     |
| 9.5 | SMTP de Zoho: `smtp.zoho.com` puerto 465 SSL, **contraseña de aplicación** (obligatoria con 2FA), `From` igual al buzón autenticado, `Reply-To` al correo del visitante                                                                 |
| 9.6 | **DNS:** MX a Zoho · SPF `v=spf1 include:zoho.com ~all` (uno solo) · DKIM del panel de Zoho · DMARC `p=none` al inicio                                                                                                                  |
| 9.7 | **cPanel › Email Routing → "Remote Mail Exchanger".** Sin esto el servidor entrega localmente los correos del propio dominio y **nunca llegan a Zoho**. Es el error más común de esta configuración                                     |
| 9.8 | Verificar con el proveedor que permita SMTP saliente a 465/587. Varios cPanel compartidos lo bloquean. **Plan B:** ZeptoMail (API HTTP)                                                                                                 |

**Compuerta:** un envío de prueba desde el formulario publicado **llega a la bandeja de entrada de Zoho y no a spam**, probado contra Gmail y contra Outlook. SPF, DKIM y DMARC pasando en un verificador de cabeceras.

---

## Fase 10 — Despliegue

| #    | Tarea                                                                                                                                                                                                                                                   |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 10.1 | `npm run build` → subir el contenido de `/out` a `public_html`, más `/api/contact.php` y `vendor/`                                                                                                                                                      |
| 10.2 | `.htaccess`: forzar HTTPS y host canónico · `ErrorDocument 404 /404.html` · caché larga para `/_next/static/*` · compresión gzip/brotli · cabeceras de seguridad (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`) |
| 10.3 | AutoSSL (Let's Encrypt) desde cPanel. PHP 8.1+ en MultiPHP Manager                                                                                                                                                                                      |
| 10.4 | Verificar con DNS y `whois` si `portugalseguridad.com` sigue siendo del cliente. Si sí, 301 al dominio nuevo                                                                                                                                            |
| 10.5 | **Matomo** autoalojado (Softaculous), modo sin cookies, sin banner                                                                                                                                                                                      |
| 10.6 | Alta en Google Search Console y en Google Business Profile con la dirección de Cerro Colorado                                                                                                                                                           |
| 10.7 | _Opcional:_ GitHub Actions con despliegue FTP/SFTP al hacer push a `main`                                                                                                                                                                               |

**Compuerta:** sitio en vivo por HTTPS, 404 funcionando, cabeceras presentes, Lighthouse ≥ 90 **medido en producción**, no en local.

---

## Fase 11 — Entrega

| #    | Tarea                                                                  |
| ---- | ---------------------------------------------------------------------- |
| 11.1 | Manual breve: cómo editar `/content` y cómo desplegar                  |
| 11.2 | Acceso al repositorio                                                  |
| 11.3 | Lista de lo que sigue pendiente del cliente y qué desbloquea cada cosa |

---

## Qué necesita el cliente, y qué desbloquea

Ninguno de estos frena las Fases 0 a 8.

| Pendiente                                           | Desbloquea                                                       | Urgencia                                              |
| --------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------- |
| Aprobar los 4 fotogramas del storyboard             | F6                                                               | **Media** — se le manda en la F1, hay tiempo de sobra |
| cPanel contratado, dominio apuntado                 | F9, F10                                                          | **Alta** — es el único bloqueo real                   |
| Buzones Zoho + accesos a DNS y a la consola de Zoho | F9                                                               | **Alta**                                              |
| Logo editable + autorización para vectorizar        | Mejora F2 (header con logo real en vez del wordmark tipográfico) | Media                                                 |
| Fotos en alta (lista de 12 tomas, §13.2)            | Mejora F3 y F4. **El diseño no depende de ellas**                | Media                                                 |
| Lista real de productos                             | Reemplaza las 5 clases sembradas en F4                           | Media                                                 |
| Grafía oficial ante SUNAT (RUC 20600361172)         | Textos legales de F4                                             | Baja — se consulta gratis y sin login                 |
| ¿Se ofrece monitoreo 24 h?                          | La frase de la Misión en F4                                      | Baja                                                  |
| Horario de atención                                 | El bloque de horario y `openingHours` en F7                      | Baja                                                  |
| Redes sociales                                      | La fila del footer y `sameAs` en F7                              | Baja                                                  |
| Certificaciones vigentes                            | Sección condicional de confianza                                 | Baja                                                  |
| ¿`portugalseguridad.com` sigue activo?              | El 301 de F10                                                    | Baja                                                  |

---

## Lo que este plan no incluye

Fuera de alcance salvo acuerdo adicional: tienda en línea, pasarela de pagos o precios públicos · CMS o panel administrativo (_posible fase 2: Decap, Sanity o TinaCMS_) · versión en inglés · blog o noticias · portal de clientes con certificados e historial de inspecciones · producción fotográfica o de video · campañas de Google Ads o Meta Ads · creación de los buzones en Zoho (lo hace el cliente; acá solo se integra y se configura DNS).

**Modo oscuro:** fuera por ahora, pero el sistema de lámina técnica lo deja barato para una fase 2 — es invertir un juego de tokens, porque no hay sistema de sombras que rehacer.
