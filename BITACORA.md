# Bitácora

> **Si estás retomando el proyecto: leé este archivo y nada más.** Está escrito
> para que una sesión nueva sepa dónde está todo sin tener que escanear el
> repositorio. Si algo que dice acá no coincide con el código, **el código gana**
> y hay que corregir esta bitácora.

**Última sesión:** 2026-09-30 · **Sesiones:** 2 · **Fases cerradas:** 0 y 1 de 11 ·
**Fase 2 construida, falta cerrar su compuerta**

---

## Estado en una línea

Andamiaje y lámina aprobados; **sistema de componentes construido** con su hoja
de verificación en `/componentes/`. Los cuatro comandos y el detector están en
cero. **Para cerrar la Fase 2 faltan dos cosas que solo puede hacer una
persona:** recorrer la hoja con el teclado y aprobarla a ojo. Después, Fase 3.
Nada está bloqueado salvo la Fase 9, que espera el hosting.

### Para arrancar la próxima sesión

1. **Cerrar la compuerta de la Fase 2** con el usuario: pasada de teclado sobre
   `/componentes/` y aprobación visual de la hoja. Es lo único que falta.
2. **Decidir la lámina a 768 px:** la rotulación queda en ~8 px. Propuesta
   pendiente de respuesta: usar el diagrama de montante hasta 1024 px.
3. **Regenerar `docs/storyboard-intro.html`** con la geometría nueva.
4. Con la Fase 2 cerrada, **Fase 3 — la portada**. Antes de empezar: medir el H1
   real a 360 px y confirmar con el cliente el intervalo de la prueba
   hidrostática.

El detalle de cada punto está en Pendientes. Todo lo de la sesión 2 está **sin
commitear**: el commit lo hace el usuario.

---

## Mapa de documentos

No hace falta abrirlos todos. Esto dice qué contiene cada uno, para ir directo
al que corresponda.

| Archivo | Qué es | Cuándo abrirlo |
|---|---|---|
| **`BITACORA.md`** | Este archivo. Estado, pendientes y trampas conocidas | Siempre, primero |
| `docs/plan-de-desarrollo.md` | Las 12 fases con sus tareas y su compuerta medible | Antes de empezar una fase |
| `docs/scope_1.md` (729 líneas) | El alcance. Contenido, paleta, tipografía, formularios, hosting, pendientes del cliente | Para consultar una sección puntual, nunca completo |
| `PRODUCT.md` | Verdad de producto: audiencias, posicionamiento, evidencia disponible, principios | Antes de decidir contenido o prioridades |
| `.impeccable/surfaces/app-page-tsx.md` | Contrato de dirección visual, 6 bloques + seed | Antes de tocar diseño |
| `docs/auditoria-skills.md` | Por qué el diseño es así: las reglas de los skills, citadas | Si alguien cuestiona una decisión visual |
| `docs/plan-de-obra.html` | El plan publicado para el cliente (artefacto) | Solo si hay que actualizarlo |
| `docs/storyboard-intro.html` | Los 4 fotogramas de la intro, para aprobación del cliente | Solo si hay que actualizarlo |

**Secciones del alcance que más se consultan:** §4.1 secciones del inicio ·
§6.2 paleta · §6.3 tipografía · §6.5 componentes · §6.6 sistema de superficies ·
§7 movimiento · §8 formularios · §13.1 solución a cada pendiente del cliente.

---

## Mapa del código

```
lib/iso.ts          proyección isométrica (pura, testeable)
lib/rotulos.ts      colocación automática de rótulos sin encimarse (pura)
lib/intro.ts        modelo de calor de la intro (puro) — lo usa la F6
content/red.ts      topología de la red: ÚNICA fuente de la geometría
content/empresa.ts  datos de la empresa, cifras y CTAs
lib/contraste.ts    razón de contraste WCAG (pura) — la usa la hoja de la F2
content/navegacion.ts  enlaces de header, menú y pie · rutas de cotizar y privacidad
content/normativa.ts   las 3 marcas del ritmo normativo
components/plan/    simbolos.tsx · Lamina.tsx · Fotograma.tsx
                    Rotulo · Ramal · Cota · SelloRevision · Detalle
                    BandaCifras · RitmoNormativo · RutaDetalle
components/ui/      Boton.tsx · iconos.tsx
components/forms/   Celda.tsx (CeldaTexto, CeldaArea, CeldaLista)
components/layout/  Cabecera · MenuMovil · Pie · BotonWhatsApp
components/motion/  Movimiento.tsx (LazyMotion + MotionConfig, en el layout)
app/                layout.tsx (fuentes) · globals.css (tokens) · page.tsx
app/componentes/    hoja de verificación de la F2
```

Los nombres del plan y los del código: `TitleBlock` = `Rotulo`, `Branch` =
`Ramal`, `Symbol` = `Simbolo`, `Dimension` = `Cota`, `RevisionStamp` =
`SelloRevision`, `DetailView` = `Detalle`, `FigureBand` = `BandaCifras`,
`FormCell` = `Celda*`, `NormTimeline` = `RitmoNormativo`, `Breadcrumb` =
`RutaDetalle`, `Header` = `Cabecera`, `Footer` = `Pie`.

`app/componentes/` **tampoco es una página del sitio**: lleva `noindex` y hay
que retirarla antes del despliegue (F10).

`app/page.tsx` **no es la portada**: es la hoja de verificación de las fases 0 y
1. La portada real se construye en la Fase 3 y reemplaza ese archivo.

---

## Pendientes

### ⛔ Bloqueado por terceros

| Qué | Espera | Desbloquea |
|---|---|---|
| Backend PHP, SMTP y DNS | cPanel contratado, dominio apuntado, buzones Zoho creados, accesos a DNS y consola de Zoho | Fase 9 y 10 |

### 👤 Del cliente (ninguno frena el desarrollo)

| Qué | Estado | Desbloquea |
|---|---|---|
| Aprobar el storyboard de la intro: guion, estilo del extintor y duración | **Entregado**, esperando respuesta | Fase 6 |
| Logo editable + autorización para vectorizar | Pendiente | Mejora la Fase 2. Mientras, el header usa wordmark tipográfico |
| Fotos en alta resolución (lista de 12 tomas en §13.2) | Pendiente | Mejora F3 y F4. **El diseño no depende de ellas** |
| Lista real de productos del catálogo | Pendiente | Reemplaza las 5 clases normadas sembradas en F4 |
| Grafía oficial de la razón social (SUNAT, RUC 20600361172) | Pendiente | Textos legales de F4 |
| ¿Se ofrece monitoreo 24 h? | Pendiente | La frase de la Misión en F4. **Hasta confirmarlo no se publica** |
| Horario de atención | Pendiente | Bloque de horario y `openingHours` en F7 |
| Redes sociales | Pendiente | Fila del footer y `sameAs` en F7 |
| Certificaciones vigentes | Pendiente | Sección de confianza |
| ¿`portugalseguridad.com` sigue siendo suyo? | Pendiente | El 301 de F10 |

### 🔧 Técnicos, se pueden hacer ya

- **Cerrar la compuerta de la Fase 2.** Falta la pasada de teclado sobre
  `/componentes/` (foco siempre visible, orden lógico, `Escape` cierra el menú
  móvil) y la aprobación visual. No se pudo hacer en la sesión 2: no había
  navegador interactivo, solo capturas sin cabeza.
- **El H1 del hero a 360 px.** En el cuerpo mínimo de `text-h1` (36 px) entra
  una palabra de hasta ~10 letras; «COMPONENTES» (11) desbordó 37 px. El H1 real
  tiene «PROTECCIÓN» (10): hay que medirlo en la F3 antes de darlo por bueno.
- **`Ramal` en contenedores angostos** (< ~600 px) baja la norma a una segunda
  línea. Se lee bien, pero la fila queda más alta que las demás.
- **Revisar el equilibrio del diagrama de montante en móvil.** Su encuadre quedó
  en 346 × 460 (relación 0,75:1) porque los rótulos van al costado, así que la
  tubería ocupa el tercio izquierdo. Puede quedar angosto. Alargar los ramales lo
  arregla, pero cambia la separación vertical y hay que re-verificar colisiones.
- **La isometría cambió de proporción** al reordenarla en la sesión 2 (paso de
  3 unidades, más ancha que los 862 × 607 de antes). Para un hero a sangre la F3
  probablemente necesite recortarla. **A 768 px la rotulación queda chica**
  (~8 px la línea de norma): evaluar pasar al diagrama de montante hasta 1024.
- **`docs/storyboard-intro.html` quedó desactualizado.** Sus 4 fotogramas se
  renderizaron con la geometría anterior de la lámina. Regenerarlo antes de
  volver a mostrárselo al cliente.

### 📌 Deuda consciente

- **Sin `lucide-react`**, que el alcance (§5) preveía. Los cuatro iconos de
  interfaz se dibujaron en `components/ui/iconos.tsx` con el trazo de los
  símbolos: lucide redondea puntas y eso contradice el radio 0. Si el cliente o
  el alcance lo exigen, se instala y se reemplaza ese archivo.
- **La prueba hidrostática figura «cada 5 años»**, como dice el alcance. En
  NFPA 10 ese intervalo depende del tipo: 5 años para CO₂ y agua, 12 para PQS
  de presión contenida. **Confirmar con el cliente antes de publicar la F3.**
- **`detalle: null` en las tres marcas del ritmo normativo.** El alcance solo
  fija nombre y periodicidad; el texto de qué se revisa lo entrega el cliente.

- **eslint fijado en 9**, que está marcado EOL. Los plugins que trae
  `eslint-config-next@16` (`import`, `jsx-a11y`, `react`) declaran soporte solo
  hasta 9; con 10 npm duplica el árbol. Revisar cuando esos plugins actualicen.
- **TypeScript fijado en 6.0.3.** `typescript-eslint@8` acepta `>=4.8.4 <6.1.0`.
  Con TS 7 el build de Next funciona, pero **el lint no arranca**.
- **`low-contrast` suprimido en `docs/plan-de-obra.html`** y solo ahí, con la
  evidencia en `.impeccable/config.json`. Costo aceptado: un fallo real de
  contraste en ese archivo ya no se detecta solo.
- **Sin pruebas automatizadas todavía.** `lib/iso.ts`, `lib/rotulos.ts` y
  `lib/intro.ts` son funciones puras escritas a propósito para poder probarse.
  Buen momento para agregar un runner: la F2 o la F8.

---

## Trampas conocidas

Esto es lo más valioso del archivo: son horas ya gastadas. **Leelo antes de
tocar el código.**

### Diseño y CSS

- **La unidad `ch` no es un carácter.** En Archivo el glifo `0` es más ancho que
  el promedio de una minúscula en español: `1ch` ≈ 1,35 caracteres. Medido,
  `66ch` daba **89 caracteres** por línea. Usá la utilidad `medida` (56ch), nunca
  un `max-w-[68ch]` a mano.
- **Nunca `transparent` en un degradado.** Es `rgba(0,0,0,0)` — negro con alfa
  cero. Interpolar hacia ella deja franja gris en varios motores y arruina toda
  medición de contraste. Usá `--color-grid-gap`, que es papel con alfa cero.
- **Toda superficie pinta su propio fondo.** Heredarlo de un ancestro deja el
  contraste a merced de dónde se monte el componente.
- **`clamp()` en `padding` el detector no lo resuelve** y reporta
  `cramped-padding`. En rangos cortos usá valores estáticos: no se pierde nada.
- **`ink-300` es color de TRAZO, no de texto.** Sobre papel da 1,93:1. Para
  texto secundario va `ink-600` (7,2:1).
- **Cero eyebrows.** Etiqueta en mayúsculas con tracking ancho encima de un
  título es la única prohibición absoluta de `craft-floor`. Ya caí una vez.
- **Mayúsculas solo en rótulos cortos.** Por encima de ~30 caracteres el
  detector lo reporta, y con razón.

- **Dos utilidades de Tailwind sobre la misma propiedad no se pisan por el
  orden en `className`.** `h-12` en la base y `h-11` al llamar, o `hidden` junto
  a `inline-flex`, las resuelve el orden de la hoja generada. Para variar un
  componente, envolvelo o dale una prop; no le pases una clase que choque.
- **Un elemento animado con `translateX` más allá de su caja cuenta como
  desborde**, aunque el padre tenga `overflow-hidden`. El detector lo reporta
  como `text-overflow`. La barra de carga del botón crece con `scaleX`.
- **Un hijo `absolute` queda tapado por hermanos `relative` posteriores que
  pintan fondo.** La montante de `Ramales` necesitó `z-10`.
- **El cobre no es color de texto**: 3,49:1 sobre papel. Sirve para marco y
  anillo de foco (≥ 3:1), nunca para letra. La selección de texto de la F0 lo
  usaba de fondo con texto papel; ahora es `ink-900` sobre papel.
- **Un símbolo ampliado engorda su trazo.** A 130 px el trazo de 1,5 mide 8.
  `Simbolo` acepta `grosor`, que lo fija en píxeles de pantalla.

### La lámina

- **La posición horizontal en pantalla es `(x − y)`, no `x`.** Si elegís `x` e
  `y` por separado, ramales con `x` muy distinto caen en el mismo lugar. Por eso
  `red.ts` parametriza por `u = x − y` y deriva `x = u + y`.
- **Los ocho ramales de la isometría comparten `Y_RAMAL` y `Z_RAMAL`.** Variar
  profundidad y cota por ramal «para dar ritmo» se leía desordenado y dejaba los
  rótulos sin lugar. Iguales, los terminales quedan en una recta paralela al
  colector y el anillo cruza las ocho bajadas.
- **`Y_ANILLO` tiene que ser mayor que `Y_RAMAL`**, y `Z_RAMAL` lo bastante bajo
  para que símbolo y rótulo queden despejados debajo del anillo.
- **El colocador de rótulos esquiva símbolos, no solo otros rótulos.** Recibe
  las cajas de los símbolos como obstáculos; primero corre el rótulo de costado
  y recién después baja de nivel. Antes solo comparaba rótulos entre sí.
- **El nombre y la norma no miden lo mismo por carácter.** Mono: 0,64 del
  cuerpo. Archivo expandido en negrita: 0,82 medido (`ANCHO_NOMBRE` = 0,86). Con
  un solo número los nombres largos pisaban el símbolo vecino.
- **El halo de un tubo se acorta en sus extremos** (`trazoRecortado`, 7
  unidades). Completo, mordía la línea a la que el tubo se une: el ramal al
  colector, el anillo al montante. El halo ocluye cruces, no uniones.
- **El trazo visible lleva punta cuadrada**, no a tope: dos tubos que se unen
  en ángulo son dos `path` y con punta a tope queda una muesca en la esquina.
- **El anillo cierra en el vértice montante–colector** `(0, 0, Z_COLECTOR)`. No
  dejarlo «cerca»: terminaba en `(0.4, 0.3)` y se veía suelto.
- **El orden de dibujo de los tubos es por `y` medio, no por `x + y`.** Con
  `x + y` los últimos ramales quedaban por delante del anillo.
- **En el diagrama de montante el alcance tiene que ser decreciente.** La
  separación vertical vale `|Δalcance/2 − paso|`, así que un alcance que sube se
  resta del paso y encima los símbolos.
- **Dos láminas en la misma página necesitan `instancia` distinta.** Los `id` de
  segmento se prefijan con eso; duplicarlos rompe la animación de la F6.
- **Los rótulos van dentro del SVG, no en HTML.** Con tamaño fijo en px la
  colisión dependería del ancho del viewport y no habría forma de resolverla en
  tiempo de compilación.

### Herramientas

- **`npm run format` tiene `.prettierignore` por una razón.** Sin él reformateó
  los 47 archivos de los dos skills en `.claude/`, que son dependencias
  vendorizadas que el motor de `impeccable` lee. No saques `.claude/`,
  `.impeccable/`, `docs/` ni `PRODUCT.md` de esa lista.
- **`next dev` reescribe el bloque de `AGENTS.md`** entre sus marcadores
  `BEGIN/END:nextjs-agent-rules`. Lo que está después del marcador de cierre es
  nuestro y sobrevive.
- **El detector corre contra URLs, no solo archivos.**
  `impeccable detect http://localhost:4311/` mide valores computados en el
  navegador y encuentra cosas que el análisis estático no ve. Vale la pena
  siempre.
- **`data-estado` fuerza un estado quieto.** Las variantes `sobre:` y `pulsado:`
  de `globals.css` responden a `:hover`/`:active` **o** a
  `data-estado="hover|activo"`, y `data-estado="foco"` dibuja el anillo. Es solo
  para la hoja de verificación. Usá `sobre:` en vez de `hover:` en componentes
  nuevos, o no van a poder mostrarse en la hoja.
- **Capturas sin navegador interactivo:** `chrome --headless=new
  --virtual-time-budget=6000 --window-size=1280,10500 --screenshot=…`. Sin el
  presupuesto de tiempo, lo animado con `motion` sale en opacidad 0. Chrome no
  baja de ~500 px de ancho de ventana: para móvil mandan los valores del
  detector con `--viewport 390x844`, no la captura.
- **`impeccable detect --viewport 360x800 <url>`** hace la pasada móvil. La de
  escritorio sola no ve los desbordes.
- **Next 16 ya no acepta la clave `eslint` en `next.config.ts`.**
- **`eslint-config-next@16` es flat config nativo.** Envolverlo en `FlatCompat`
  falla con `Converting circular structure to JSON`.

---

## Comandos

```bash
npm run dev -- --port 4311   # servidor de desarrollo
npm run build                # genera /out para el cPanel
npm run lint                 # eslint
npm run typecheck            # tsc --noEmit
npm run format               # prettier (respeta .prettierignore)

# detector de diseño, contra archivos y contra el render
sh .claude/skills/impeccable/scripts/impeccable detect app components content lib
sh .claude/skills/impeccable/scripts/impeccable detect http://localhost:4311/
```

**Antes de cerrar cualquier fase:** los cuatro en verde (`build`, `lint`,
`typecheck`, `format:check`) y el detector en cero contra el código **y** contra
la página renderizada.

---

## Log de sesiones

### Sesión 1 · 2026-09-26

**Hecho**

- Instalados los skills `impeccable` v4.4.0 y `design-taste-frontend`. El
  instalador oficial de impeccable devuelve 404: se copió el payload del repo.
- Alcance auditado contra los dos skills → `docs/auditoria-skills.md`, y llevado
  de v1.1 a v1.3.
- `PRODUCT.md` escrito tras entrevista de tres preguntas. **Resultado que cambió
  el proyecto:** la audiencia primaria es la industria y el comercio de Arequipa,
  no la minería. La minería pasó a ser la prueba que desactiva el riesgo. Eso
  reordenó las secciones del inicio.
- Mundo visual elegido por el cliente en la ronda de dirección: **Plano
  As-Built** (seed `1e3dade5`, candidata 4 de 7). Contrato en
  `.impeccable/surfaces/`.
- Plan de 12 fases → `docs/plan-de-desarrollo.md` y artefacto publicado.
- **Fase 0 cerrada:** Next 16 + React 19 + Tailwind v4 + TS 6, exportación
  estática, fuentes autoalojadas verificadas, tokens y utilidades de grosor.
- **Fase 1 cerrada:** la lámina. Compuerta aprobada por el cliente textualmente:
  «sí se lee como un plano».
- Storyboard de la intro entregado, renderizado desde la geometría real.

**Decidido**

- Neumorfismo y claymorfismo **retirados**. Motivo decisivo, no estético: la
  audiencia primaria consulta desde el celular a plena luz del día en Arequipa, y
  al sol las sombras suaves desaparecen.
- Fuera Inter y Montserrat. Entra **Archivo** variable (una familia cubre display
  y cuerpo con el eje de ancho) + **JetBrains Mono** solo para medición real.
- Fuera Cloudflare Turnstile. Entra **Altcha** autoalojado + honeypot + trampa de
  tiempo + límite por IP. Cero cuentas de terceros.
- Analítica: **Matomo** en el mismo cPanel, sin cookies, sin banner.
- Las 4 cifras del inicio pasan a ser verificables: +20 años, 12 clientes, 8
  líneas, 7 regiones. Se eliminó «+15 clientes» y «minas de todo el Perú».
- **Nunca se publica un logo de cliente**, ni en gris. Los 12 van como lista
  tipográfica de nombres: es legalmente seguro y mejor diseño.
- La intro se queda como **único momento autoral**. Se recortaron 7 efectos.

**Corregido sobre mi propio trabajo**

- Mi topología era un peine, no una red: se agregó el anillo de retorno, que
  además es la práctica correcta (NFPA prefiere malla cerrada).
- Ids de segmento duplicados (94 vs 28 únicos) que habrían roto la F6.
- Los símbolos vivían en HTML con tamaño fijo y se desacoplaban del dibujo al
  escalar.
- 5 colisiones de símbolos en el diagrama de montante que no se veían en
  escritorio.
- 7 usos de `ink-300` como color de texto, a 1,93:1.
- Un eyebrow encima del H1 del plan publicado, que es la prohibición que ese
  mismo documento enumera.
- `npm run format` reformateó 47 archivos de los skills; restaurados y
  `.prettierignore` creado.

**Pendientes que quedaron abiertos** → ver la sección Pendientes de arriba.

### Sesión 2 · 2026-09-30

**Hecho**

- **Fase 2 construida.** Los diez componentes de §6.5 más `Boton`, `Cabecera`,
  `MenuMovil`, `Pie` y `BotonWhatsApp`, y la hoja `/componentes/` con cada uno
  en cada estado.
- Superficies del navegador tematizadas en `globals.css`: selección, cursor de
  inserción, barra de desplazamiento, anillo de foco, subrayado, placeholder,
  `accent-color` y numerales tabulares.
- Tabla de contraste calculada en la hoja con `lib/contraste.ts`: 16 pares,
  todos pasan. El más justo es el cobre del anillo de foco, 3,49 contra un
  mínimo de 3.
- `build`, `lint`, `typecheck` y `format:check` en verde. Detector en cero
  contra el código y contra `/componentes/` a 1280, 390 y 360 px, y contra `/`.

**Decidido**

- Nombres de componentes en español, como el resto del código (tabla de
  equivalencias en el Mapa del código).
- Tres tokens nuevos: `--color-whatsapp` (verde oscuro de la marca, objeto
  ajeno a la lámina), `--shadow-despegue` (la única sombra, §6.2) y
  `--animate-barrido`.
- En móvil la acción principal vive dentro del menú: al lado de la marca no
  entra. El botón de WhatsApp queda siempre a la vista.
- `Simbolo` ganó la prop opcional `grosor`. Es el único cambio a código de la F1.

**Corregido sobre mi propio trabajo**

- La barra de carga del botón desbordaba 34 px.
- La montante de `Ramales` no se veía: quedaba detrás de los ramales.
- El rótulo dejaba la celda de fecha sola en una tercera fila.
- El símbolo ampliado del detalle salía con trazo de 8 px.

**Lámina reordenada, a pedido del usuario**

- Vio los ramales desalineados y rótulos encima de los símbolos (el `03 · NTP
  350.043 · NFPA 10` sobre el hidrante). Causas: profundidad y cota distintas
  por ramal, un colocador que ignoraba los símbolos y un ancho de nombre
  subestimado. Corregido en `content/red.ts` y `lib/rotulos.ts`; el diagrama de
  montante de móvil no cambió. Verificado por captura a 1280, 768 y móvil.
- Después señaló que las aristas no coincidían con sus vértices en la esquina
  del montante. Tres causas, las tres en Trampas conocidas: el anillo no
  cerraba en el vértice, el halo mordía las uniones y la punta a tope dejaba
  muesca en las esquinas. Corregido en `content/red.ts`, `lib/iso.ts`
  (`trazoRecortado`), `Lamina.tsx` y `Fotograma.tsx`.
- **El usuario aprobó la lámina reordenada: «me gusta, se ve bien».** La sesión
  se cerró ahí, a pedido suyo.

**No verificado**

- Navegación por teclado y aprobación visual: ver Pendientes.

---

## Protocolo de esta bitácora

1. **Al retomar:** leer este archivo. Confirmar el estado con un `npm run build`
   y `git log --oneline -5` antes de asumir nada.
2. **Al cerrar una fase:** actualizar «Estado en una línea», la tabla de fases en
   `docs/plan-de-desarrollo.md`, y agregar la entrada de sesión acá.
3. **Al aprender algo a golpes:** anotarlo en **Trampas conocidas**. Esa sección
   es la que más tiempo ahorra.
4. **El log de sesiones se agrega, no se reescribe.** Lo que ya pasó no cambia.
5. **Los pendientes sí se editan:** lo resuelto se saca, no se marca.
6. **Si esto contradice al código, el código gana.** Corregir la bitácora.

Los commits y el push a GitHub los hace el usuario.
