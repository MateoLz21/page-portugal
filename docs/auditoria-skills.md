# Auditoría del alcance contra los skills de diseño

**Fecha:** 26/09/2026
**Documento auditado:** `docs/scope_1.md` v1.1 → v1.3
**Skills consultados:** `impeccable` v4.4.0 (SKILL.md + `reference/craft-floor.md`, `reference/typeset.md`, `reference/new-work.md`) y `design-taste-frontend` (taste-skill v2)

Este documento registra **qué dicen los skills** sobre las decisiones visuales del alcance, con las reglas citadas, y qué proponen en su lugar. No reemplaza al alcance: lo contrasta.

---

## 1. Tipografía — resuelto

**Decisión original:** Montserrat (títulos) + Inter (cuerpo).

**Lo que dicen los skills:**

- taste-skill §4.1: _"Discouraged as default: `Inter`. Pick `Geist`, `Outfit`, `Cabinet Grotesk`, `Satoshi`, or a brand-appropriate serif first."_ Excepción: _"Inter is acceptable when the user explicitly asks for a neutral / standard / Linear-style feel, or when the brief is a public-sector / accessibility-first site."_
- taste-skill §9 (lista de sellos de IA): _"Inter as default"_ aparece como uno de los tells auditables antes de publicar.
- impeccable `reference/new-work.md` §4 amplía la lista de rechazos: _"these training-data defaults mean you stopped looking: Fraunces, Playfair Display, Cormorant, Lora, Crimson, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex, Inter-as-display, DM Sans, DM Serif, Outfit, Plus Jakarta Sans, Instrument Sans."_
- impeccable `reference/typeset.md`: _"Use the fewest roles and families that make the hierarchy unmistakable."_

**Nota:** los dos skills se contradicen en un punto. taste-skill recomienda `Outfit`; impeccable lo incluye en su lista de defaults agotados. Se evitó usar cualquiera de los dos.

**Resuelto en v1.2:** una sola familia variable, **Archivo** (eje de peso 100–900 y eje de ancho 62–125), con el ancho expandido como voz de display y el ancho normal como cuerpo. Más **JetBrains Mono** en subconjunto reducido, solo para medición real (capacidades, códigos NTP/NFPA, fechas). Archivo no aparece en ninguna de las dos listas de rechazo, es un grotesco de origen señalético — el mundo material del cliente — y al ser una sola familia variable cumple la regla de "la menor cantidad de familias".

Ver §6.3 del alcance.

---

## 2. Neumorfismo y Claymorfismo — resuelto: retirados (ver §5)

### 2.1 Lo primero: ninguno de los dos skills los prohíbe por nombre

Se buscó `neumorph`, `claymorph`, `soft-ui` y `skeuomorph` en los 54 archivos de `impeccable` y en `design-taste-frontend`. **Cero menciones.** No hay veto nominal.

Y la regla de jerarquía de impeccable es explícita, en `craft-floor.md`:

> _"A pinned brief or the committed visual world overrides anything here; your own habit does not."_

> _"**The brief wins.** Honor pinned aesthetics, eras, materials, fonts, and palettes even when they conflict with a saturated-pattern warning. Redirecting a clear brief toward your taste is failure."_ — SKILL.md

O sea: si §6.6 está aprobado por el cliente, **manda**, y ningún skill lo revierte. Lo que sigue no es un veto, son las seis reglas concretas con las que el plan choca, para que la decisión se tome con la información completa.

### 2.2 Los seis choques

**a) La grilla de 8 tarjetas es el patrón que `craft-floor` rechaza primero**

> _"Same-size cards of icon plus heading plus text as the page structure. Cards are the lazy container; nested cards are always wrong."_

> _"Sparklines, progress rings, and soft-shadowed rounded rectangles standing in for content."_

La sección de servicios del inicio es exactamente eso: 8 tarjetas iguales, cada una con ícono 3D + título + texto, en contenedores redondeados con sombra blanda. Y taste-skill §4.4 lo dice desde el otro lado:

> _"Use cards ONLY when elevation communicates real hierarchy. Otherwise group with `border-t`, `divide-y`, or negative space."_

Los 8 servicios son **hermanos, no jerarquía**. No hay elevación que comunicar.

**b) Los campos hundidos van contra un control obligatorio de accesibilidad**

taste-skill §4.5, marcado _mandatory_:

> _"FORM CONTRAST CHECK (mandatory, a11y): Form inputs, placeholder text, focus rings, helper text, and error text all pass WCAG AA contrast against the section background. Light placeholders on a near-white form, white form on white page section → all banned."_

El neumorfismo define sus controles como **del mismo color que el fondo**. El alcance lo sabe y lo mitiga (borde de 1 px, texto `steel-800`, anillo de foco cobre de 2 px). Pero eso significa que **la legibilidad la sostienen las mitigaciones, no el estilo**. Un estilo que solo funciona cuando se le anexan tres parches es un estilo que está trabajando en contra.

**c) La escena física de uso — la objeción más dura, y no es de gusto**

impeccable `new-work.md` §4:

> _"Dark or light is never a default: write one sentence of physical scene (who uses this, where, under what light) and let it force the answer."_

La frase, escrita para este proyecto: _un supervisor de seguridad o un jefe de compras revisa el sitio en su celular, a pleno sol, en el patio de una operación minera en Arequipa, o en la oficina de un campamento con luz fluorescente, decidiendo si este proveedor es confiable para una instalación certificable NFPA._

Arequipa tiene sol directo y radiación alta buena parte del año. **A pleno sol en un celular, las sombras suaves del neumorfismo simplemente desaparecen** y los controles quedan como manchas del mismo color que el fondo. El estilo no falla por anticuado: falla en la situación real de uso del comprador.

**d) La paleta es, literalmente, el clúster de IA que ambos skills nombran**

impeccable `new-work.md` §4:

> _"Calibration: AI-generated interfaces cluster around a few looks regardless of subject: **warm cream ground, high-contrast serif display, and a terracotta or signal-red accent**; near-black with one neon accent and glowing edges; broadsheet-editorial hairlines... Where the brief leaves the aesthetic free, landing in one means the self-check failed."_

taste-skill §4.2, _mandatory_:

> _"Backgrounds: `#f5f1ea`, `#f7f5f1`, `#fbf8f1`, `#efeae0`, `#ece6db`... Accents: `#b08947`, `#b6553a`, `#9a2436`, `#9c6e2a`, `#bc7c3a`... This palette is BANNED as the default reach."_

La paleta del alcance: `paper #EEEAE5` (fondo crema cálido — vecino directo de `#efeae0` y `#ece6db`), `fire #C62828` (rojo señal), `copper #B8733A` (terracota — vecino de `#bc7c3a`). **Tres de tres.**

**Pero hay un matiz que salva la mitad:** el cobre y el bronce vienen del logo real del cliente, así que están anclados al brief y sobreviven la regla. impeccable: _"A brief-pinned world pins the world, not its softest rendition."_

**Lo que no está anclado es el fondo crema.** El propio alcance explica por qué existe:

> _"`paper #EEEAE5` — Fondo base: gris cálido claro. **El neumorfismo necesita un fondo algo más oscuro que el blanco** para que se vean las luces y las sombras."_

Es decir: el fondo crema no es una decisión de marca, es una **consecuencia técnica del neumorfismo**. Si el neumorfismo cae, cae la razón del fondo crema, y con eso el sitio sale del clúster de IA sin perder nada de la identidad real (el rojo y el cobre se quedan).

**e) El presupuesto de movimiento pertenece a otro tipo de proyecto**

taste-skill §1.A, inferencia de dials según la lectura del brief:

| Señal                                                                | VARIANCE | MOTION  | DENSITY |
| -------------------------------------------------------------------- | -------- | ------- | ------- |
| _"trust-first / public-sector / regulated / accessibility-critical"_ | 3-4      | **2-3** | 4-5     |

Y §0.A: _"**Audience** — B2B procurement panel vs. design-conscious consumer... The audience picks the aesthetic, not your taste."_ Más: _"**Quiet constraints** — accessibility-first audiences, public-sector, **regulated industries**, trust-first commerce. These constraints OVERRIDE aesthetic preference."_

La minería peruana es industria regulada y el comprador es un panel de procurement. La lectura da **MOTION 2-3**. El alcance tiene 12 efectos catalogados más una intro de 3 segundos: eso es **MOTION 8-9**.

Y `craft-floor` de impeccable:

> _"Motion: **one authored moment**, not scattered effects and not one identical entrance on every section."_

**Aquí la resolución es buena noticia:** la intro del extintor **es** ese momento autoral, y es específica de este producto (nadie más puede contar esa historia). Se queda. Lo que el skill recortaría es lo disperso alrededor: el mismo fade-up en las 8 secciones, el pulso del botón de WhatsApp cada 6 segundos, el hover elevado en todas las tarjetas. taste-skill §5: _"MOTION MUST BE MOTIVATED. Before adding any animation, ask: what does this animation communicate? Invalid answer: it looked cool."_

**f) Costo oculto: el modo oscuro**

taste-skill §6.C, _mandatory_: _"Design for both modes from the start. Never ship light-only or dark-only without explicit user instruction."_

El alcance es solo claro. Es defendible (es un sitio corporativo B2B y el cliente puede instruirlo así). Pero conviene saber el costo: **con neumorfismo, un modo oscuro es un segundo sistema completo de sombras**, porque las luces y sombras se invierten y el efecto se degrada mucho sobre fondo oscuro. Sin neumorfismo, agregar modo oscuro cuesta un juego de tokens.

### 2.3 Las tres salidas

**Opción A — Mantener §6.6 tal cual.** El brief manda y los skills lo acatan. _Riesgo honesto, declarado:_ el sitio se va a leer como de 2020, y en celular a pleno sol —la situación real del comprador— los controles neumórficos pierden definición. Las mitigaciones de accesibilidad del alcance son correctas y hay que aplicarlas todas.

**Opción B — Recorte quirúrgico.** Se conserva la sensación táctil donde no hace daño y se retira donde compite con la legibilidad o con la estructura:

| Elemento               | v1.1              | Opción B                                                     |
| ---------------------- | ----------------- | ------------------------------------------------------------ |
| Header píldora         | Neumórfico        | **Se queda neumórfico**                                      |
| Filtros del catálogo   | Neumórficos       | **Se quedan neumórficos**                                    |
| Botón de WhatsApp      | Clay              | **Se queda clay** (es un botón, no contenido)                |
| Campos del formulario  | Hundidos          | **Planos**, con borde de 1 px y foco cobre                   |
| 8 tarjetas de servicio | Clay con ícono 3D | **Filetes de 1 px y espacio negativo**, sin contenedor       |
| Tiles de cifras        | Neumórficos       | **Banda tipográfica** con filetes (ya aplicado en v1.2 §4.1) |
| Fondo                  | `#EEEAE5` crema   | **Casi blanco neutro**, fuera de la familia crema            |
| CTA rojo               | Clay              | Sólido con sombra tintada y desplazamiento real              |

Conserva el espíritu del alcance aprobado, elimina los seis choques, y es un cambio de tokens y de tres componentes, no un rediseño.

**Opción C — Cambiar el material por uno del mundo del cliente.** Es lo que `new-work.md` §3 pide cuando se crea un mundo visual nuevo: _"From that cultural world, list seven concrete visual systems, artifacts, places, or rituals the audience knows by heart... What would this thing look like as a physical object?"_

Aplicado a esta empresa, el mundo material no es la plastilina: es la **tarjeta de inspección perforada que cuelga de cada extintor del Perú**, la **placa de datos estampada** de los equipos, la **señalética ANSI/NFPA** (el diamante 704), los **planos isométricos** de red de agua contra incendio, el **manómetro**, la **cinta retrorreflectiva**. La profundidad sale de metal estampado, papel troquelado y filete técnico — no de sombra blanda. Y es literalmente lo que la empresa toca todos los días: la prueba de oficio está en el material mismo.

> **Importante sobre el procedimiento:** impeccable no permite elegir un mundo visual nuevo por criterio propio. `new-work.md` §3 lo marca como contrato: _"Run `impeccable concept-seed --scope direction` and follow what it prints. No substitute, no skip: on a new or replacement world, writing artifact code before this script has run and its assignment is acknowledged is a contract violation."_ El script reparte varias direcciones, incluida una elegida por dado, y **el cliente elige** entre ellas en una página de decisión. Lo de arriba sería el insumo de esa ronda, no su conclusión.

**Recomendación:** **C** si el objetivo es el mejor resultado posible y hay margen para correr la ronda de dirección (que requiere antes `/impeccable init` para escribir `PRODUCT.md`). **B** si se quiere respetar el alcance ya aprobado con el cliente y cerrar el riesgo con un cambio acotado.

En ambos casos: la intro del extintor se queda, el rojo fuego y el cobre del logo se quedan, y las cifras y el contenido de v1.2 no cambian.

---

## 3. Hallazgos menores, para la fase de construcción

Registrados aquí para no repetirlos en cada revisión:

- **Nada de "eyebrows".** impeccable lo marca como prohibición absoluta, no como default: _"A kicker or eyebrow above a heading. This one is a ban, not a default: no brief earns it back."_ taste-skill §4.7 lo llama _"the #1 violated rule in production tests"_. Cero etiquetas en mayúsculas con tracking ancho sobre los títulos de sección.
- **Nada de números de sección** (01 / 02 / 03) salvo que la secuencia informe algo.
- **Superficies del navegador.** `craft-floor`: _"Text selection, the caret, custom scrollbars, focus rings, underline offset, and the numerals in tabular data all ship with browser defaults that belong to no design system. Theme them from the palette. This is the cheapest signal that a page was built rather than assembled, and the one models skip most reliably."_
- **Íconos dibujados, no emoji.** Ya está resuelto con `lucide-react`.
- **Un solo CTA por intención.** taste-skill: "Solicitar cotización" y "Cotizar" son la misma intención. Hay que elegir una etiqueta y usarla en el header, el hero y el footer. Hoy el alcance alterna entre las dos.
- **El hero tiene que caber en la primera pantalla.** taste-skill §4.7: titular máximo 2 líneas en escritorio, subtítulo máximo 20 palabras, CTA visible sin scroll, y `pt-24` como tope de padding superior.
- **Contraste de botones, obligatorio.** Todo CTA sobre fotografía necesita scrim o trazo; el rojo `#C62828` con texto blanco ya cumple AA.
- **Sombras tintadas, nunca negro puro** sobre fondo claro (taste-skill §4.4). El alcance ya lo cumple en sus tokens clay.
- **Un solo radio de esquina documentado.** taste-skill §4.4 _SHAPE CONSISTENCY LOCK_: se permite un sistema mixto solo si la regla está escrita y se respeta en todo el sitio. §6.6 la escribe, así que cumple.

---

## 4. Estado

| Tema                       | Estado                                                                                                                                                         |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tipografía                 | ✅ Resuelto en v1.2 (Archivo + JetBrains Mono)                                                                                                                 |
| Cifras de los contadores   | ✅ Resuelto en v1.2 (4 cifras verificables)                                                                                                                    |
| Tratamiento de las cifras  | ✅ Resuelto en v1.2 (banda tipográfica, no grilla de métricas)                                                                                                 |
| Anti-spam                  | ✅ Resuelto en v1.2 (Altcha, sin Cloudflare)                                                                                                                   |
| Analítica                  | ✅ Resuelto en v1.2 (Matomo en cPanel)                                                                                                                         |
| Bloqueantes del cliente    | ✅ 15 con vía provisional en §13.1                                                                                                                             |
| Neumorfismo + Claymorfismo | ✅ **Retirados.** Se eligió la opción C; reemplazados por el sistema de lámina técnica en §6.6 del alcance                                                     |
| Presupuesto de movimiento  | ✅ Recortado a un solo momento autoral en §7 (la intro). 7 efectos retirados, cada uno con su motivo                                                           |
| Mundo visual               | ✅ **Plano As-Built**, elegido por el cliente en la ronda de dirección (seed `1e3dade5`, candidata 4 de 7). Contrato en `.impeccable/surfaces/app-page-tsx.md` |
| `PRODUCT.md`               | ✅ Escrito tras la entrevista de `init`. Audiencia primaria, posicionamiento y evidencia disponible confirmados                                                |
| Paleta                     | ✅ Reescrita a papel de plano frío en §6.2. Fuera del clúster crema + rojo + terracota; el cobre del logo sobrevive con función (sellos de revisión)           |

---

## 5. Cómo se resolvió el punto 2

La opción elegida fue la **C**: cambiar el material por uno del mundo del cliente. El procedimiento fue el que exige `new-work.md`, no criterio propio:

1. Se escribió `PRODUCT.md` con la entrevista de `init` (tres preguntas: quién decide, cuál es el diferenciador irrepetible, a qué mercado le habla primero).
2. Se derivaron **7 direcciones** del mundo material de la audiencia, ordenadas por resonancia: tarjeta de inspección perforada, plan de evacuación enmarcado, placa de datos estampada, **plano as-built de red de agua**, señalética ANSI/NFPA, manómetro, orden de servicio con copia carbón. Siete artefactos, siete familias materiales distintas.
3. Se corrió `impeccable concept-seed --scope direction --mode persuade`. El dado **asignó la candidata 4** (el plano as-built) — no la primera de mi lista, que es justamente el punto: el script existe para romper el sesgo de ranking del modelo.
4. Se pesaron los **6 retadores del catálogo** sobre dos ejes (identificación de la audiencia y claridad de producto): 1 _competitive_ (manual de armado por pasos) y 5 _declined_. Cada declinado donó una disciplina que la dirección asignada no tenía, y las cinco alzas están escritas como líneas nombradas en §6.1 del alcance.
5. Se presentó la mano completa en la página de decisión — la asignada, mi propia favorita como _IMPECCABLE'S PICK_, la alternativa competitiva, los cinco demotados con su veredicto, y la puerta de salida permanente (el estándar del rubro ejecutado en serio) — y **el cliente eligió la asignada**.

Ruta de construcción: **code-led**. No hay generación de imágenes en este entorno, así que por contrato del skill no hay ronda de comp ni elección que ofrecer; la ambición vive en el bloque FIRST VIEWPORT del contrato de dirección y se audita en comportamiento al final, con la revisión de cierre.
