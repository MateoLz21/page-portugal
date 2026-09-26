# Alcance del proyecto: sitio web corporativo

**Cliente:** Portugal Seguridad Industrial y Minera E.I.R.L.
**Dominio:** `cortaincendiosportugal.com`
**Versión del documento:** 1.2 (26/09/2026)

- v1.1: se agregan Neumorfismo/Claymorfismo y la intro animada del extintor.
- v1.3: **mundo visual elegido — Plano As-Built** (§6.1), paleta reescrita a papel de plano frío (§6.2), Neumorfismo y Claymorfismo retirados y reemplazados por el sistema de lámina técnica (§6.6), componentes derivados del plano (§6.5), secciones del inicio reordenadas para la audiencia primaria local (§4.1), movimiento recortado a un solo momento autoral (§7) e intro reescrita dentro del mundo y más barata (§7.1). Contrato de dirección en `.impeccable/surfaces/app-page-tsx.md`; verdad de producto en `PRODUCT.md`.
- v1.2: tipografía redefinida (sale Inter y Montserrat, entra Archivo variable); cifras de los contadores cuadradas y verificables; sale Cloudflare Turnstile y entra Altcha autoalojado; analítica resuelta con Matomo en el mismo cPanel; correo Zoho marcado como pendiente con adaptador de endpoint provisional; nueva §13.1 con soluciones a cada bloqueante; §6.6 (Neumorfismo/Claymorfismo) en revisión contra los skills de diseño, ver `docs/auditoria-skills.md`.
  **Plan de ejecución:** `docs/plan-de-desarrollo.md`
  **Fuente de contenido:** _Perfil Empresarial Portugal Seguridad_ (PDF, 17 págs.), la descripción del proyecto y el logo en forma de escudo.

---

## 1. Objetivo

Construir un sitio web corporativo, rápido y en español que:

1. Presente a la empresa como proveedor de seguridad contra incendios con más de 20 años en minería e industria.
2. Muestre los servicios, productos, proyectos y clientes de forma clara y creíble.
3. Genere cotizaciones y contactos (formularios, WhatsApp y teléfono) que lleguen a los correos corporativos de **Zoho Mail**.
4. Se aloje en un **hosting cPanel** compartido sin depender de un servidor Node.js.

---

## 2. Decisiones tomadas

| Tema                                      | Decisión                                                                                                                                                                                                                                           |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nombre visible / título                   | **PORTUGAL SEGURIDAD INDUSTRIAL Y MINERA E.I.R.L.** (marca corta en header: "PORTUGAL")                                                                                                                                                            |
| Dominio                                   | `cortaincendiosportugal.com`                                                                                                                                                                                                                       |
| Framework                                 | **Next.js** (App Router, TypeScript) con **exportación estática** (`output: 'export'`)                                                                                                                                                             |
| Estilos                                   | **Tailwind CSS v4**                                                                                                                                                                                                                                |
| Animaciones                               | **Framer Motion** (paquete `motion`, import `motion/react`)                                                                                                                                                                                        |
| Hosting                                   | cPanel (Apache). Se suben archivos estáticos a `public_html`                                                                                                                                                                                       |
| Formularios                               | **Script PHP + PHPMailer vía SMTP de Zoho Mail** en el mismo cPanel                                                                                                                                                                                |
| Mundo visual                              | **Plano As-Built** (seed `1e3dade5`, elegido en la ronda de dirección de `impeccable`). Papel de plano frío, tinta azul en hairlines, rojo fuego reservado a protección contra incendios y a la acción, cobre solo en sellos de revisión. Ver §6.1 |
| Estilo de superficies                     | **Lámina técnica:** la profundidad sale de la jerarquía de grosores de línea y la superposición. Sin sombras de profundidad, radio de esquina `0`. **Neumorfismo y Claymorfismo retirados en v1.3** (ver §6.6 y `docs/auditoria-skills.md` §2)     |
| Tipografía                                | **Archivo** variable (display expandido + cuerpo) y **JetBrains Mono** para cotas, normas y fechas. Sin Inter, sin Montserrat. Ver §6.3                                                                                                            |
| Audiencia primaria                        | **Industria y comercio de Arequipa**; la minería es la prueba que desactiva el riesgo, no la apertura. Ver `PRODUCT.md` y §4.1                                                                                                                     |
| Intro animada                             | **El plano se incendia y el extintor lo redibuja** (ver §7.1)                                                                                                                                                                                      |
| Idioma                                    | Solo español                                                                                                                                                                                                                                       |
| Secciones extra                           | Proyectos y clientes · Catálogo de productos (con "Cotizar") · Botón flotante de WhatsApp                                                                                                                                                          |
| Correos Zoho de destino                   | **Por definir.** Se parametrizan en la configuración (ver §8)                                                                                                                                                                                      |
| Redes sociales, horario y otros teléfonos | **Pendientes.** El cliente los enviará después (ver §13)                                                                                                                                                                                           |

---

## 3. Contenido extraído del PDF

### 3.1 Datos de la empresa

| Campo               | Valor                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Razón social        | Portugal Seguridad Industrial Minera E.I.R.L. _(el título web usará "…Industrial **y** Minera…"; confirmar la grafía oficial ante SUNAT)_  |
| RUC                 | 20600361172                                                                                                                                |
| Dirección           | Urb. 12 de Octubre H-18, Cerro Colorado, Arequipa, Perú                                                                                    |
| Teléfono / WhatsApp | 932 481 153 (+51 932 481 153)                                                                                                              |
| Correo actual       | seguridadportugal@gmail.com _(se reemplazará por un correo Zoho del dominio)_                                                              |
| Web anterior        | portugalseguridad.com _(si sigue siendo suya, redirigir con 301 al nuevo dominio)_                                                         |
| Experiencia         | Más de 20 años                                                                                                                             |
| Normativa           | NFPA y Normas Técnicas Peruanas (NTP)                                                                                                      |
| Aval                | Trabajos aprobados en auditorías del Ministerio de Energía y Minas y por expertos internacionales de compañías aseguradoras                |
| Recursos propios    | Personal calificado, equipos y herramientas, y unidades móviles para trasladar personal, equipos y materiales dentro de minas e industrias |

### 3.2 Página "Nosotros"

**Quiénes somos (texto base, redactado a partir del PDF):**

> Portugal Seguridad Industrial y Minera E.I.R.L. tiene más de 20 años de experiencia en seguridad industrial contra incendios para los sectores comercial, industrial y minero. Trabajamos con personal altamente calificado y cumplimos las normas NFPA y las Normas Técnicas Peruanas (NTP). Nuestros trabajos han sido aprobados en auditorías del Ministerio de Energía y Minas y por expertos internacionales de compañías aseguradoras. Contamos con los equipos, las herramientas y las unidades móviles necesarias para transportar a nuestro personal, equipos y materiales dentro de operaciones mineras e industriales.

**Visión:**

- Ser una empresa con una estructura organizacional sólida que brinde bienestar a sus empleados, clientes y proveedores.
- Consolidar nuestro liderazgo con crecimiento y mejora integral, proyectando confianza en nuestro trabajo.

**Misión:** _(el PDF no pone título a este bloque; se asume que es la Misión y hay que confirmarlo)_

- Ofrecer productos de calidad, a tiempo, con excelente actitud de servicio y a precios accesibles, para satisfacer las expectativas de nuestros clientes.
- Garantizar, con nuestro equipo humano y tecnológico, el cumplimiento de las exigencias de nuestros clientes mediante actividades de seguridad, vigilancia y monitoreo las 24 horas. _(confirmar si hoy se ofrece monitoreo 24/7)_

**Pilares o diferenciadores (bloques visuales):**

- +20 años de experiencia
- Cumplimiento de NFPA y NTP
- Auditorías aprobadas (MINEM y aseguradoras)
- Unidades móviles propias para operar en mina
- Personal certificado y capacitado

**Valores:** el PDF no los incluye. Se proponen _Seguridad, Compromiso, Calidad, Puntualidad y Confianza_, sujetos a aprobación.

### 3.3 Página "Servicios"

Hay 8 servicios. Cada uno tiene una tarjeta en `/servicios` y su propia página en `/servicios/[slug]`.

| #   | Servicio                                                                | Slug                              | Alcance según el PDF                                                                                                                                     |
| --- | ----------------------------------------------------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Instalación y mantenimiento de sistemas de detección de incendios       | `deteccion-de-incendios`          | Detección de humo en oficinas y talleres; sistemas de alarma contra incendio (paneles, detectores, estaciones manuales, sirenas y luces estroboscópicas) |
| 2   | Instalación y mantenimiento de redes de agua contra incendio            | `redes-de-agua-contra-incendio`   | Instalación de bombas contra incendio; instalación, mantenimiento y reparación de hidrantes y gabinetes; mantenimiento y calibración de la red           |
| 3   | Inspección, mantenimiento y recarga de extintores en minas e industrias | `extintores-inspeccion-y-recarga` | Inspección mensual de extintores portátiles y rodantes; recarga anual de extintores y sistemas contraincendios; prueba hidrostática cada 5 años          |
| 4   | Capacitación de personal en lucha contra incendios (teórica y práctica) | `capacitacion-contra-incendios`   | Charlas de inducción en uso de extintores; prácticas de lucha contra el fuego con fuego real; formación de brigadistas                                   |
| 5   | Sistemas de supresión en equipos pesados de acarreo y auxiliares        | `supresion-equipos-pesados`       | Instalación y mantenimiento de sistemas manuales y automáticos de supresión en camiones de acarreo, equipos auxiliares y talleres                        |
| 6   | Venta de extintores nacionales e importados                             | `venta-de-extintores`             | Suministro de extintores y enlace al catálogo                                                                                                            |
| 7   | Instalación y mantenimiento de cámaras de seguridad                     | `camaras-de-seguridad`            | Cámaras de seguridad vecinales, industriales y mineras                                                                                                   |
| 8   | Productos de seguridad industrial minera y EPP                          | `seguridad-industrial-y-epp`      | Productos de seguridad industrial minera y equipos de protección personal; enlace al catálogo                                                            |

**Plantilla de cada página de servicio:** título y resumen → qué incluye (lista) → a qué sectores se dirige (minería, industria, comercio, oficinas) → normativa aplicable → proyectos relacionados → galería → preguntas frecuentes (opcional) → botón "Solicitar cotización" con el servicio ya seleccionado.

> ⚠️ **Marcas de terceros:** el PDF muestra el logo **ANSUL**. Solo se mostrarán marcas de fabricantes si la empresa es distribuidor o instalador autorizado y tiene permiso para hacerlo.

### 3.4 Página "Proyectos y clientes"

**Proyectos destacados (del PDF):**

| Proyecto                                                                                  | Cliente / contratista           | Servicio                              |
| ----------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------------- |
| Instalación de sistemas contra incendios, Mina El Brocal (Cerro de Pasco)                 | Consorcio Pasco (GyM–Stracon)   | Sistemas contra incendio              |
| Mantenimiento, recarga e instalación de sistemas contra incendio, Mina Shougang (Marcona) | Consorcio Marcona (GyM–Stracon) | Extintores y sistemas contra incendio |
| Instalación de sistemas contra incendios, Mina Antapaccay                                 | Glencore                        | Sistemas contra incendio              |
| Mantenimiento de hidrantes, Mina Cerro Verde                                              | Sociedad Minera Cerro Verde     | Redes de agua                         |
| Instalación de sistemas de supresión en equipos pesados                                   | _(cliente por confirmar)_       | Supresión vehicular                   |

**Cartera de clientes (lista depurada):**

- Fluor Daniel Sucursal del Perú
- Sociedad Minera Cerro Verde
- Servicios Médicos – SERMEDI
- Minera Antapaccay (Tintaya) S.A.
- Stracon – GyM: Mina Shougang Hierro Perú (Marcona), Mina La Arena (Huamachuco), Mina El Brocal (Cerro de Pasco), Mina La Zanja (Cajamarca)
- Anglo American Quellaveco
- Olazábal International Investment – LIVIT (Arequipa) _(el PDF dice "Investrient"; confirmar nombre)_
- Inkabor S.A.C. (Arequipa)
- Bosch Casa (Arequipa)
- Inca Alpaca (Arequipa)
- Arca Continental Lindley (Coca-Cola)
- Carmen Inmuebles

> Notas: en el PDF "Mina Brocal Cerro Pasco" aparece dos veces y aquí se unifica. **Los logos de clientes solo se publicarán con autorización**; mientras tanto se muestran sus nombres en texto o en logotipos monocromáticos genéricos.

### 3.5 Página "Contacto"

- Formulario (ver §8), dirección, teléfono con enlace `tel:`, WhatsApp, correo corporativo y mapa de Google embebido (iframe, sin API key) en Cerro Colorado, Arequipa.
- Horario de atención y redes sociales: **pendientes**.
- RUC y razón social visibles en contacto y footer.

---

## 4. Mapa del sitio

```
/                                   Inicio
/nosotros/                          Nosotros (historia, misión, visión, valores, normativa)
/servicios/                         Listado de servicios
/servicios/[slug]/                  8 páginas de servicio (generateStaticParams)
/productos/                         Catálogo (filtros por categoría)
/productos/[categoria]/             Extintores · EPP · Seguridad minera · Señalización (a confirmar)
/proyectos/                         Proyectos destacados + cartera de clientes
/contacto/                          Formulario, datos y mapa
/cotizar/                           Formulario de cotización (recibe ?servicio= o ?producto=)
/politica-de-privacidad/            Ley N.º 29733 de Protección de Datos Personales
/404                                Página no encontrada
/api/contact.php                    Endpoint PHP (fuera de Next.js)
```

### 4.1 Inicio: secciones

> **Reordenado en v1.3.** La entrevista de `PRODUCT.md` definió que la audiencia primaria es el **dueño o administrador de industria y comercio en Arequipa** que entra a resolver un vencimiento de recarga o una observación de Defensa Civil — no la minería. La minería pasa de ser el argumento de apertura a ser **el desactivador de riesgo**: si Cerro Verde y Quellaveco dejaron entrar a este proveedor, una planta o un hotel de Arequipa no tiene de qué preocuparse. El orden de abajo refleja ese cambio; la versión anterior abría con minería.

1. **Hero — la lámina.** Isometría de línea a sangre completa de una red contra incendio (montante, gabinete, hidrante, extintor, detector) en hairline azul sobre papel casi blanco. **Sin fotografía.** El ramal de extintores es lo único en rojo y es un enlace directo al servicio de recarga.
   - **H1** (máximo 2 líneas en escritorio): _"Un solo proveedor para toda tu protección contra incendios"_
   - **Subtítulo** (máximo 20 palabras): _"Recarga de extintores, redes de agua, detección y capacitación. Normas NFPA y NTP. Más de 20 años en Arequipa."_
   - **Acción principal** abajo a la izquierda: **"Solicitar cotización"**, con el número de WhatsApp visible al costado, no escondido en un ícono.
   - **Cuadro de rótulo** abajo a la derecha: `PORTUGAL · RUC 20600361172 · NFPA 10 / NTP 350.043 · AREQUIPA · REV. 2026`.
   - Tope de padding superior `pt-24`. El hero entra completo en la primera pantalla, con la acción visible sin hacer scroll.

2. **Tres entradas por urgencia.** Lo que trae al cliente local, en sus propias palabras y en tres filas sobre el dibujo (no tarjetas): **"Recargar extintores"** · **"Necesito certificado para Defensa Civil o mi seguro"** · **"Instalación nueva"**. Cada una entra directo al servicio o al formulario con el asunto ya seleccionado. Esta sección es nueva en v1.3 y existe por la audiencia primaria.

3. **Las 8 líneas como ramales de la red.** Los 8 servicios dibujados como derivaciones de la misma montante, cada uno con su símbolo normado, su número de detalle y su norma aplicable en mono. **No es una grilla de 8 tarjetas iguales** — ese es el patrón que el skill rechaza y, además, ocho tarjetas hermanas no comunican que salen de un solo proveedor. La red sí.

4. **Por qué un solo proveedor.** El posicionamiento, argumentado: el competidor local cubre una o dos líneas, así que el cliente termina administrando cuatro proveedores, cuatro cronogramas de mantenimiento y cuatro juegos de certificados. Aquí es uno. Acá vive la **banda tipográfica de las 4 cifras** (+20 años · 12 clientes corporativos · 8 líneas de servicio · 7 regiones), con filetes de 1 px, sin contenedor de tarjeta y **sin contador animado**.

5. **Respaldo.** La cartera minera como prueba, no como presentación: los 12 clientes en **lista tipográfica de nombres** (nunca logotipos, ver §13.1 punto 10) y 3 de los 5 proyectos con operación, contratista y servicio. Más el aval documentado: auditorías aprobadas por MINEM y por peritos internacionales de compañías aseguradoras.

6. **Catálogo destacado.** Adelantado en v1.3 por la decisión de mercado: las **5 clases de extintor normadas** (PQS, CO₂, agua, espuma, acetato de potasio) con su norma y su uso, más EPP. Cada ficha termina en "Cotizar".

7. **El ritmo normativo.** Inspección mensual → recarga anual → prueba hidrostática cada 5 años, dibujado como línea de tiempo con las tres marcas. Es información que el dueño de planta necesita y casi nadie le explica, y es exactamente lo que la tarjeta de inspección de su extintor registra.

8. **Cierre — el cuadro de rótulo completo.** Razón social, RUC, dirección de Cerro Colorado, teléfono, WhatsApp y las tres acciones. Sin banda roja a sangre: el rojo está reservado (§6.2) y el cierre lo lleva solo la acción principal.

### 4.2 Catálogo de productos

- Es un catálogo **sin precios ni pagos en línea**. Cada ficha tiene foto, nombre, categoría, descripción corta, especificaciones (capacidad, agente, norma) y el botón **"Cotizar"**.
- "Cotizar" abre `/cotizar/?producto=<slug>` o WhatsApp con un mensaje ya escrito.
- Categorías propuestas: Extintores (PQS, CO₂, agua, espuma, acetato de potasio), EPP, Seguridad minera, Señalización. **La lista real de productos la entrega el cliente.**
- Los datos se guardan en `content/productos.ts` (o JSON/MDX), así que actualizar el catálogo significa editar ese archivo y volver a desplegar.
- _Fase 2 opcional:_ "lista de cotización" para agregar varios productos y enviarlos en una sola solicitud.

### 4.3 Elementos globales

- **Header fijo:** logo, menú y botón "Cotizar". En móvil, menú hamburguesa animado.
- **Footer:** logo, resumen, enlaces, servicios, datos de contacto, RUC, redes (pendientes), política de privacidad y ©.
- **Botón flotante de WhatsApp:** `https://wa.me/51932481153?text=Hola%2C%20quisiera%20una%20cotizaci%C3%B3n...`, con una animación sutil de pulso.
- **Barra superior (opcional):** teléfono, correo y horario.

---

## 5. Stack técnico y arquitectura

| Capa                   | Herramienta                                                                                                                                                                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework              | Next.js (última estable, App Router) + React + TypeScript                                                                                                                                                                                                        |
| Build                  | `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`                                                                                                                                                                                       |
| Estilos                | Tailwind CSS v4 (tokens en `@theme`)                                                                                                                                                                                                                             |
| Animación              | `motion` (Framer Motion) con `LazyMotion` + `domAnimation` para reducir el bundle                                                                                                                                                                                |
| La lámina              | SVG propio: isometría de la red contra incendio, autorada en el repositorio. Es contenido, no ilustración importada                                                                                                                                              |
| Intro: calor           | **Sin WebGL y sin shader.** El calor se aplica interpolando el color del trazo (`stroke`) de los segmentos SVG que ya existen para el hero: `ink-600` → `fire-600` → `ink-600`. Ver §7.1                                                                         |
| Intro: rocío y niebla  | Sistema de partículas en Canvas 2D (código propio, sin librería)                                                                                                                                                                                                 |
| Intro: extintor        | SVG vectorial propio en hairline, animado con Framer Motion. **Rive y dotLottie descartados** por presupuesto (§7.2)                                                                                                                                             |
| Intro: coreografía     | `useAnimate` de Framer Motion (secuencias). **GSAP no entra**: la coreografía es de cuatro tiempos y no lo justifica                                                                                                                                             |
| Símbolos normados      | **SVG propio** de trazo consistente (hidrante, válvula, detector, extintor, bomba, gabinete, cámara, casco), dibujados a partir de la simbología real de plano. Reemplazan a los íconos 3D en clay de v1.1: sin Spline, sin Blender, sin pipeline de exportación |
| Íconos de interfaz     | `lucide-react`, solo para menú, flecha, cerrar y similares                                                                                                                                                                                                       |
| Fuentes                | `next/font/google` (se incrustan en el build; funciona con export estático)                                                                                                                                                                                      |
| Imágenes               | WebP/AVIF optimizadas en el build (`sharp` en un script o `next-image-export-optimizer`)                                                                                                                                                                         |
| Formularios (cliente)  | `react-hook-form` + `zod`                                                                                                                                                                                                                                        |
| Formularios (servidor) | PHP 8.x + PHPMailer (Composer)                                                                                                                                                                                                                                   |
| Anti-spam              | **Altcha** (prueba de trabajo autoalojada, MIT, sin cuenta de terceros) + campo honeypot + trampa de tiempo + límite por IP. Ver §8.6                                                                                                                            |
| SEO                    | Metadata API, `app/sitemap.ts`, `app/robots.ts`, JSON-LD                                                                                                                                                                                                         |
| Calidad                | ESLint, Prettier, Lighthouse                                                                                                                                                                                                                                     |

### 5.1 Restricciones de la exportación estática

- No se pueden usar API Routes, Server Actions, middleware, ISR ni optimización de imágenes en runtime. Por eso el formulario va con PHP.
- Todas las rutas dinámicas se generan con `generateStaticParams`.
- `trailingSlash: true` genera `/ruta/index.html`, que Apache sirve sin configuración adicional.

### 5.2 Estructura del repositorio

```
/app
  layout.tsx, page.tsx, not-found.tsx, sitemap.ts, robots.ts
  nosotros/ servicios/[slug]/ productos/[categoria]/ proyectos/ contacto/ cotizar/ politica-de-privacidad/
/components
  ui/ (Button, Card, Section, Container, Badge)
  layout/ (Header, Footer, MobileMenu, WhatsAppButton)
  motion/ (FadeIn, Stagger, CountUp, Marquee, Reveal)
  forms/ (ContactForm, QuoteForm)
/content        empresa.ts, servicios.ts, productos.ts, proyectos.ts, clientes.ts
/public         img/, logo/, favicon, og-image.jpg
/php            contact.php, config.sample.php, composer.json (vendor/PHPMailer)
/public/.htaccess
next.config.ts
```

Todo el texto vive en `/content`. Las páginas solo lo renderizan, así que los cambios de contenido no tocan componentes.

---

## 6. Diseño visual

### 6.1 Dirección: Plano As-Built

**Mundo visual elegido** en la ronda de dirección de `impeccable` (seed `1e3dade5`, candidata 4, elegida por el cliente en la página de decisión). El contrato completo vive en `.impeccable/surfaces/app-page-tsx.md`.

**La tesis:** el sitio es el **plano as-built de la protección contra incendios**. Las 8 líneas de servicio no son ocho tarjetas: son ocho ramales de la misma red, con su cuadro de rótulo, sus revisiones fechadas y sus símbolos normados.

Rechaza explícitamente la disposición por defecto del rubro — hero con bombero de stock, tres o cuatro tarjetas iguales con ícono, banda roja de contacto, muro de logos de clientes en gris — y también su opuesto previsible, el sitio oscuro minimalista de tecnología.

**Por qué este mundo y no otro.** Tres cosas se resuelven solas al elegirlo:

1. **El rojo consigue una razón técnica.** En un plano as-built real, la protección contra incendios **se dibuja en rojo**: es convención, no decoración. El rojo de marca deja de ser un acento corporativo y pasa a ser el código del oficio.
2. **El cobre del logo consigue un trabajo.** Es el color del sello de revisión y de la firma de aprobación. Sigue siendo compromiso de marca, pero ahora tiene función.
3. **La profundidad sale de la línea, no de la sombra.** La jerarquía de grosores de hairline es el sistema de profundidad completo. Esto elimina el neumorfismo sin discutirlo (ver §6.6) y resuelve la condición de uso más dura de `PRODUCT.md`: se lee al sol, en un celular.

**Alzas donadas** por los retadores declinados de la ronda, cada una ya incorporada:

- **La escala manda el cuerpo tipográfico.** Cada detalle declara su escala (1:20, 1:50) y la rotulación cambia de tamaño con ella, como en una lámina real.
- **Una sola lámina continua.** El dibujo cruza toda la portada; las secciones son recortes de la misma hoja, no una ilustración por sección.
- **Toda marca de uso codifica un hecho real.** Sellos de revisión y fechas son datos verificables, nunca textura envejecida decorativa.
- **Cada servicio abre con un diagrama, no con un párrafo**, y una línea de referencia apunta al único dato que decide la compra.
- **El rojo es reservado.** Solo en protección contra incendios y en la acción principal. Nunca dos veces compitiendo en el mismo encuadre.

**Fotografía:** el mundo **no depende de ella**. Cuando lleguen las fotos de §13.2, entran como detalle recortado dentro de la lámina, nunca como fondo de hero. Esto desbloquea todo el diseño sin esperar al cliente.

### 6.2 Paleta (tokens de Tailwind)

| Token         | Hex                   | Uso                                                                                                                                                                                                                                                              |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `paper`       | `#F4F6F7`             | Fondo base: **papel de plano, blanco frío azulado**. Reemplaza al crema `#EEEAE5` de v1.1, que existía solo para que se vieran las sombras del neumorfismo y que además caía en la familia de paleta que ambos skills marcan como sello de sitio generado por IA |
| `paper-alt`   | `#E9EDEF`             | Fondo de sección alterna y de celdas de tabla                                                                                                                                                                                                                    |
| `ink-900`     | `#16212B`             | Tinta principal: títulos, texto de cuerpo, líneas de 1 px                                                                                                                                                                                                        |
| `ink-600`     | `#465562`             | Texto secundario, cotas, líneas de 0,5 px                                                                                                                                                                                                                        |
| `ink-300`     | `#A9B6C0`             | Retícula de fondo, líneas auxiliares, estados deshabilitados                                                                                                                                                                                                     |
| `fire-600`    | `#C62828`             | **Reservado.** Elementos de protección contra incendios en el dibujo y acción principal. En ningún otro lugar                                                                                                                                                    |
| `fire-700`    | `#A11D1D`             | Hover y estado activo de la acción principal                                                                                                                                                                                                                     |
| `copper-500`  | `#B8733A`             | **Solo anotación:** sellos de revisión, marcas de aprobación, anillo de foco                                                                                                                                                                                     |
| `teal-600`    | `#1F7F80`             | Ramal de agua en el dibujo (redes húmedas, hidrantes), tomado de la gota del logo                                                                                                                                                                                |
| Éxito / error | `#2E7D32` / `#C62828` | Estados del formulario                                                                                                                                                                                                                                           |

**Estrategia de color:** _restringida_ — neutros de plano más un color de acción. El rojo no cubre superficie: marca. Contraste: todo texto sobre fondo cumple **WCAG AA** (4,5:1); `ink-900` sobre `paper` da holgura amplia, y `fire-600` con texto blanco cumple.

**Lo que desaparece de v1.1:** los tokens `neu-light` (`#FFFFFF`) y `neu-dark` (`#CFC8BF`), porque no hay sistema de sombras. También `bronze-400`, que no tenía función definida.

**Sombras:** el sitio **no usa `box-shadow` para profundidad**. Se permite una única sombra funcional, tintada con `ink-900`, en dos casos: el header fijo cuando se despega del tope, y el panel del menú móvil. Nada más.

### 6.3 Tipografía

**Una sola familia variable, tres roles.** Se descarta el par Montserrat + Inter: Inter es el tipo de letra más repetido en interfaces generadas por IA (ambos skills de diseño la marcan como _anti-patrón_ por defecto), y Montserrat es el geométrico más usado de Google Fonts, así que el par no aporta identidad. El logo conserva su propio lettering; la voz del sitio no tiene por qué imitarlo.

| Rol                   | Familia                                                 | Uso                                                                                                                                                                                        |
| --------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Display / títulos** | **Archivo** variable, eje `wdth` ~112–125, peso 600–700 | H1 y H2 en mayúsculas. El ancho expandido viene del mundo de la **señalética industrial y las placas de datos de equipo**, que es el mundo material del cliente                            |
| **Cuerpo**            | **Archivo** variable, `wdth` 100, pesos 400/500/600     | Párrafos, listas, navegación, formularios                                                                                                                                                  |
| **Datos técnicos**    | **JetBrains Mono** 400/500, subconjunto reducido        | Solo medición real: capacidades (`6 kg`, `9 L`), códigos de norma (`NTP 350.043`, `NFPA 10`), fechas de prueba hidrostática y cifras tabulares. Nunca como disfraz decorativo de "técnico" |

**Por qué Archivo:** es una sola familia variable (un archivo, eje de peso 100–900 y eje de ancho 62–125), así que display y cuerpo salen del mismo tipo — la regla es _la menor cantidad de familias que haga inequívoca la jerarquía_. Es un grotesco de origen señalético, no un geométrico blando, y no está en la lista de "tipografías por defecto de IA" de ninguno de los dos skills (que descartan Inter, Outfit, DM Sans, Plus Jakarta, Space Grotesk, IBM Plex, Instrument Sans y los serif display de moda).

```ts
// app/layout.tsx
import { Archivo, JetBrains_Mono } from 'next/font/google'

const archivo = Archivo({
  subsets: ['latin', 'latin-ext'], // latin-ext por los acentos del español
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-archivo',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
})
```

- **Escala:** H1 `clamp(2.25rem, 5vw, 3.75rem)` · H2 `2rem` · H3 `1.375rem` · cuerpo `1rem/1.7`.
- **Medida de lectura:** 65–75 caracteres por línea en párrafos. Se aplica con la utilidad `medida` (`max-width: 56ch`), **no con `68ch`**: en Archivo el glifo `0` —que es lo que mide la unidad `ch`— es más ancho que el promedio de una minúscula en español, así que `1ch` rinde cerca de 1,35 caracteres reales. Medido en el navegador: `66ch` daba 89 caracteres por línea. El _tracking_ nunca baja de `-0.04em`.
- **Carga:** `next/font/google` descarga y autoaloja las fuentes en el build, así que funciona con exportación estática y sin llamadas a Google en runtime. Solo se incrustan los pesos y ejes usados.

### 6.4 Logo

- El logo recibido es un **medallón metálico 3D** (escudo con extintor, llama, gota y "P", casco y cámara). Luce bien grande, pero **pierde legibilidad por debajo de unos 60 px**.
- Entregables de logo:
  1. **Versión plana vectorial (SVG)** del escudo + la palabra "PORTUGAL" para el header, en color y en monocromo.
  2. **Isotipo** (solo el escudo) para favicon, ícono de app y marca de agua.
  3. El medallón original en PNG/WebP de alta resolución, con fondo transparente, para el hero de "Nosotros" y la imagen OG.
- El PDF trae un logo anterior (llama + "PORTUGAL"). **El escudo lo reemplaza**; confirmar con el cliente.

### 6.5 Componentes clave

Todos derivados de la lámina, no de una librería de UI genérica:

| Componente                                     | Qué es en este mundo                                                                                                                                                                                                                                      |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cuadro de rótulo** (`TitleBlock`)            | El componente recurrente del sitio. Marco de hairline con celdas: razón social, RUC, norma aplicable, ubicación, revisión y fecha. Aparece en el hero, al cierre de cada página de servicio y en contacto                                                 |
| **Ramal de servicio** (`Branch`)               | Reemplaza a la tarjeta de servicio. Símbolo normado + número de detalle + título + norma en mono, colgando de la montante. Sin contenedor, sin sombra                                                                                                     |
| **Símbolo normado** (`Symbol`)                 | Hidrante, válvula, detector, extintor, bomba, gabinete, cámara, casco. **SVG propio de trazo consistente**, dibujado a partir de la simbología real de plano. Complementa a `lucide-react`, que queda para iconografía de interfaz (menú, flecha, cerrar) |
| **Cota** (`Dimension`)                         | Línea de extensión con su valor en mono. Se usa para datos de especificación: capacidad, presión, periodicidad                                                                                                                                            |
| **Sello de revisión** (`RevisionStamp`)        | Marco en cobre con número de revisión y fecha. Marca contenido fechado: proyectos, actualizaciones de catálogo                                                                                                                                            |
| **Detalle ampliado** (`DetailView`)            | El patrón de las páginas de servicio: recorte del plano general a mayor escala, con su propia escala declarada y su propio rótulo                                                                                                                         |
| **Banda de cifras** (`FigureBand`)             | Las 4 cifras con filetes de 1 px, sin tarjeta y sin contador animado                                                                                                                                                                                      |
| **Celda de formulario** (`FormCell`)           | Campo dibujado como celda de un cuadro de llenado: filete inferior de 1 px, etiqueta arriba, foco con anillo cobre de 2 px. **Nunca hundido, nunca del color del fondo**                                                                                  |
| **Línea de tiempo normativa** (`NormTimeline`) | Inspección mensual → recarga anual → hidrostática 5 años, con sus tres marcas                                                                                                                                                                             |
| **Ruta de detalle** (`Breadcrumb`)             | `RED GENERAL / DETALLE 03 / EXTINTORES` en mono                                                                                                                                                                                                           |

**Superficies del navegador** — obligatorio, y es lo que más se salta: selección de texto, cursor de inserción, barras de desplazamiento, anillos de foco, desplazamiento de subrayado y numerales tabulares se tematizan desde la paleta. No se dejan en los valores por defecto del navegador.

**Prohibiciones de estructura** (de `craft-floor` de `impeccable`, aplicadas a todo el sitio):

- Nada de **eyebrows**: cero etiquetas en mayúsculas con tracking ancho encima de los títulos de sección. Es prohibición absoluta, no preferencia.
- Nada de números de sección decorativos (01 / 02 / 03) — los números de detalle del plano **sí** van, porque en un plano numeran de verdad.
- Nada de tarjetas como estructura de página, y nunca tarjetas dentro de tarjetas.
- Nada de texto con degradado, ni vidrio o desenfoque como decoración.
- Nada de emoji en lugar de iconos.
- **Una sola etiqueta por intención:** "Solicitar cotización" en header, hero, páginas de servicio y footer. Nunca alternar con "Cotizar", "Contáctanos" o "Pide tu cotización". (El botón de ficha de producto sí dice "Cotizar" porque es otra intención: cotizar _ese_ producto.)

### 6.6 Sistema de superficies: la lámina técnica

> **Resuelto en v1.3.** El Neumorfismo (Soft UI) y el Claymorfismo de v1.1 **quedan retirados**. La decisión se tomó después de contrastarlos con los dos skills de diseño; el análisis completo, con las reglas citadas, está en `docs/auditoria-skills.md` §2. El motivo decisivo no fue estético: la audiencia primaria consulta desde el celular a plena luz del día en Arequipa, y **a pleno sol las sombras suaves del neumorfismo desaparecen**, dejando los controles como manchas del mismo color que el fondo. Las otras cinco objeciones (grilla de tarjetas, contraste de campos hundidos, paleta en el clúster reconocible de IA, presupuesto de movimiento y costo del modo oscuro) están documentadas en la auditoría.

En su lugar, la profundidad es la de una lámina técnica: **jerarquía de grosores de línea y superposición**, nada más.

| Recurso               | Cómo se usa                                                                                                                                                                                                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Grosor de línea**   | Tres pesos y nada más: `0,5 px` (`ink-300`) para retícula y auxiliares · `1 px` (`ink-600`) para separadores y contornos de componente · `2 px` (`ink-900`) para el elemento activo o el contorno principal. El grosor **es** la jerarquía                     |
| **Superposición**     | Un elemento al frente interrumpe la línea del que está detrás, como en un dibujo real. Eso da profundidad sin una sola sombra                                                                                                                                  |
| **Retícula de plano** | Módulo base de 8 px visible al 4 % de opacidad en `ink-300`. Todo alinea a ella. Es el equivalente de la retícula de módulo que donó el retador del manual de armado                                                                                           |
| **Radio de esquina**  | **Uno solo: `0`.** Un plano no tiene esquinas redondeadas. Excepción documentada y única: el botón flotante de WhatsApp es circular, porque es un objeto ajeno a la lámina y tiene que leerse como tal. Esa es la regla completa, y se cumple en todo el sitio |
| **Relleno**           | Plano y opaco. Los llenos son `paper-alt` o `fire-600`; nunca degradados                                                                                                                                                                                       |
| **Estados**           | Reposo: contorno de 1 px · Hover: el contorno sube a 2 px y aparece la cota · Activo: relleno `fire-600` si es acción, o contorno de 2 px si es navegación · Foco: anillo cobre de 2 px, siempre visible · Deshabilitado: `ink-300` con contorno discontinuo   |

**Reglas de accesibilidad** (más fáciles de cumplir que con el sistema anterior, porque el contraste ya no pelea con el estilo):

- Texto de cuerpo y placeholders en `ink-900` o `ink-600` sobre `paper`: ambos superan 4,5:1 con holgura.
- Ningún estado se comunica **solo** por color: siempre hay grosor de línea, cota o etiqueta acompañando.
- Foco visible en todo control, con el anillo cobre de 2 px.
- Los campos de formulario llevan etiqueta real arriba, nunca placeholder como etiqueta.

**Modo oscuro:** fuera de alcance por ahora, pero este sistema lo deja barato para una fase 2 — es invertir un juego de tokens, porque no hay un sistema de sombras que rehacer. Con neumorfismo habría sido un segundo sistema completo.

**Íconos 3D en clay:** eliminados del alcance. Los reemplazan los **símbolos normados en SVG** de §6.5, que se dibujan en el repositorio, pesan una fracción y no necesitan Spline ni Blender ni un pipeline de exportación a WebP.

## 7. Animaciones con Framer Motion

> **Recortado en v1.3.** La regla de `craft-floor` de `impeccable` es **"un solo momento autoral, no efectos dispersos, y no la misma entrada idéntica en cada sección"**. Y la lectura de audiencia de `taste-skill` para industria regulada con comprador de procurement da `MOTION_INTENSITY 2-3`; v1.1 tenía 12 efectos catalogados, o sea 8-9. La intro del extintor **es** el momento autoral y se queda. Lo disperso alrededor sale, y cada corte tiene su motivo.

**Lo que se queda** — todo comunica algo: jerarquía, narrativa, retroalimentación o cambio de estado.

| Efecto                                        | Dónde                       | Qué comunica                                                                                                                                                                       |
| --------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Intro: el plano se incendia y se redibuja** | Solo en el inicio           | El momento autoral. Ver §7.1                                                                                                                                                       |
| **Trazado de la lámina**                      | Hero, una sola vez          | Las líneas del plano se dibujan con `stroke-dashoffset`, de la montante hacia los ramales. Narrativa: enseña que todo sale de una sola red. Ocurre **una vez**, no en cada sección |
| **Cota en hover**                             | Ramales, fichas de producto | Retroalimentación: revela el dato de especificación al apuntar                                                                                                                     |
| **Header al hacer scroll**                    | Global                      | Cambio de estado: se compacta y aparece su única sombra funcional                                                                                                                  |
| **Menú móvil**                                | Header                      | Cambio de estado: panel deslizante con `AnimatePresence`                                                                                                                           |
| **Estados del formulario**                    | Contacto y cotizar          | Retroalimentación: transición entre enviando, éxito y error                                                                                                                        |

**Lo que se retira, y por qué:**

| Efecto de v1.1                          | Motivo del corte                                                                                                                                                        |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fade-up idéntico en todas las secciones | Es exactamente "la misma entrada idéntica en cada sección" que la regla prohíbe. La lámina ya se traza una vez; repetirlo por sección lo vuelve ruido                   |
| Stagger en todas las grillas            | No queda grilla de tarjetas que escalonar                                                                                                                               |
| Contador de 0 al valor final            | Las 4 cifras son una banda tipográfica, no una fila de métricas. Un contador animado encima es el sello de IA que el skill rechaza por nombre                           |
| Marquee infinito de clientes            | Los clientes son una lista tipográfica de nombres, no un muro de logos. Un carrusel perpetuo de nombres no comunica nada y `taste-skill` restringe los bucles infinitos |
| Elevación en hover de tarjetas          | No hay tarjetas. El hover ahora revela la cota, que sí informa                                                                                                          |
| Pulso del WhatsApp cada 6 s             | Bucle infinito sin motivo. El botón se ve porque es el único elemento circular del sitio, no porque late                                                                |
| Parallax en la imagen del hero          | No hay imagen en el hero                                                                                                                                                |

**Reglas técnicas:** `<MotionConfig reducedMotion="user">` en el layout · solo se animan `transform`, `opacity` y `stroke-dashoffset` · `LazyMotion` con `domAnimation` para no cargar el paquete completo · sin transiciones de página.

### 7.1 Intro: "el plano se incendia y el extintor lo redibuja"

> **Reescrita en v1.3** para vivir dentro del mundo elegido. La versión de v1.1 era fuego fotorrealista sobre una foto de fondo; ahora el fuego y el extintor son del mismo mundo que el resto del sitio. El guion y la duración no cambian. **Sale más barata**, porque un dibujo de línea no necesita el shader de ruido fBm que exigía el fuego realista.

> 📐 **Storyboard entregado:** los 4 fotogramas para aprobación del cliente están en `docs/storyboard-intro.html`, renderizados desde la geometría real de la lámina con el modelo de calor de `lib/intro.ts`. No son una ilustración del efecto: son el efecto congelado.

**Guion (duración total ≤ 3 s):**

| Tiempo      | Qué pasa                                                                                                                                                                                                                                                                           |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0 – 0.8 s   | La lámina ya está dibujada, pero **sus líneas se encienden desde los bordes**: el hairline azul se pone incandescente y vira a rojo hacia dentro, como papel que se prende por el canto. Brasas sueltas suben. El dibujo sigue siendo legible: se está quemando, no desapareciendo |
| 0.8 – 1.4 s | El **extintor entra desde la izquierda**, dibujado en el mismo hairline que el resto de la lámina — es un símbolo del plano, no un objeto ajeno. Pequeño rebote, se inclina, la manguera apunta al centro                                                                          |
| 1.4 – 2.4 s | **Descarga:** el chorro de partículas barre la pantalla en abanico y por donde pasa **las líneas vuelven a su azul frío**. No se apaga un fuego: se **redibuja el plano**. La intensidad del rojo baja según la distancia al chorro                                                |
| 2.4 – 3.0 s | La niebla blanca cubre y se disipa. La lámina queda limpia, fría y completa, y el extintor **se convierte en el símbolo de extintor del ramal rojo** del hero — el único elemento rojo que queda en pantalla, que además es el enlace a recarga                                    |

**Arquitectura técnica:**

```
<IntroOverlay>  (client component, dynamic import después del primer render)
 ├─ <PlanCanvas>   El mismo SVG de la lámina del hero, con un uniform "heat" (0 → 1 → 0)
 │                 por segmento: el color del trazo interpola ink-600 → fire-600 → ink-600
 ├─ <Extinguisher> SVG propio en hairline, animado con Framer Motion (x, rotate, retroceso)
 ├─ <SprayCanvas>  Canvas 2D: ~300-600 partículas (móvil ~150) con velocidad, arrastre y opacidad
 └─ <FogMask>      Capa blanca con máscara radial animada
Coreografía: useAnimate() de Framer Motion + requestAnimationFrame para el canvas
```

**Por qué es más barata que la v1.1:** desaparece el shader GLSL de fuego con ruido fBm (el ítem más caro y el más difícil de hacer bien). El calor se aplica **interpolando el color del trazo de los segmentos SVG que ya existen** para el hero. Sin WebGL, sin `ogl`, sin fallback de `feTurbulence`. Quedan Canvas 2D para el rocío y SVG para todo lo demás, y el presupuesto de 40 KB de §7.2 pasa con holgura.

**Reglas de experiencia y rendimiento (obligatorias, sin cambios):**

- **Botón "Saltar intro"** visible desde el primer instante; también se omite con clic, Esc o scroll.
- Solo en la **primera visita de la sesión** (`sessionStorage`) y **solo en el inicio**.
- Con `prefers-reduced-motion` **no se muestra**: se entrega la lámina ya dibujada y fría.
- **El hero se renderiza debajo** en el HTML estático desde el inicio. La intro es una capa encima y no retrasa el contenido ni el SEO.
- **Seguridad fotosensible:** el encendido de las líneas es un vire de color gradual, **no un parpadeo**. Menos de 3 destellos por segundo (WCAG 2.3.1) y sin flashes rojos saturados a pantalla completa. Con líneas en vez de fuego lleno, la superficie roja simultánea es una fracción de la de v1.1, así que este riesgo baja solo.
- **Móvil y equipos de gama baja:** menos partículas y `devicePixelRatio` máximo 1.5. Ya no hace falta una versión CSS de respaldo: si el canvas del rocío falla, el vire de color del SVG funciona igual.
- **Presupuesto:** JavaScript de la intro **≤ 40 KB gzip**; 60 fps en un celular de gama media; los recursos se liberan al terminar. Ver §7.2.
- Sin sonido por defecto.

### 7.2 De dónde sale el presupuesto de 40 KB

El número no es arbitrario. Es el resto de una resta.

El objetivo de §11 es **Lighthouse ≥ 90 en móvil**, y la palanca que decide ese puntaje es el JavaScript: el navegador tiene que descargarlo, parsearlo y ejecutarlo en un hilo, y mientras lo hace la página no responde. Para un 90+ en móvil el presupuesto realista de JS de primera carga es de unos **170 KB gzip**. De ahí:

| Partida                                                    | Peso gzip aprox. |
| ---------------------------------------------------------- | ---------------- |
| Next.js App Router + React (base inevitable)               | ~90 KB           |
| `motion` con `LazyMotion` + `domAnimation`                 | ~18 KB           |
| `react-hook-form` + `zod` (solo en páginas con formulario) | ~22 KB           |
| **Subtotal**                                               | **~130 KB**      |
| **Resto disponible**                                       | **~40 KB**       |

Ese resto es el presupuesto de la intro. No es un capricho de rendimiento: es lo que queda.

**Tres razones adicionales, específicas de este cliente:**

1. **Red real.** El visitante objetivo es un supervisor de seguridad o un comprador en Arequipa o en un campamento minero, muchas veces con 4G malo o compartido. 40 KB extra se descargan en menos de un segundo; 200 KB no.
2. **Hilo principal.** La intro se carga con `dynamic import` _después_ del primer render, así que **no cuenta para el LCP**. Pero sí compite por CPU justo cuando el usuario ya quiere hacer scroll. Un bundle grande hace que la intro de 3 s termine a los 5 s, y eso se percibe como que la web está trabada.
3. **Es lo que descarta las alternativas.** Este número es exactamente el criterio que elimina las opciones del cuadro de §7.1: Rive trae ~150 KB de runtime, Lottie entre 60 y 250 KB según el detalle, tsParticles ~50 KB para un efecto que se escribe a mano, Three.js más de 150 KB sin contar el modelo. Con código propio la intro entra en 40 KB con holgura, y desde v1.3 sobra más todavía: al vivir dentro del mundo Plano As-Built, el calor se hace interpolando el color del trazo de los segmentos SVG que el hero ya carga, así que **desaparece el shader GLSL** — el ítem más caro del presupuesto original. Quedan Canvas 2D para el rocío y SVG para todo lo demás.

**No es un límite rígido.** Es disciplina, no física. Si al medir con Lighthouse el sitio da 93 y la intro pesa 55 KB, el presupuesto se ajusta. Los límites duros son los de §11: **Lighthouse ≥ 90 en móvil, LCP < 2,5 s, CLS < 0,1**. El de 40 KB es la manera de llegar ahí sin descubrirlo al final.

---

## 8. Formularios: PHP + SMTP de Zoho Mail

### 8.1 Flujo

```
[Formulario React] --fetch POST JSON--> /api/contact.php
   └─ valida (zod)                        ├─ verifica Turnstile + honeypot + rate limit
                                           ├─ sanitiza y valida campos
                                           ├─ PHPMailer → smtp.zoho.com
                                           │    · correo al área (destino por definir)
                                           │    · acuse automático al cliente (opcional)
                                           └─ responde JSON {ok, message}
```

### 8.2 Campos

- **Contacto:** nombre*, empresa, correo*, teléfono*, asunto/servicio (select), mensaje*, casilla de consentimiento de datos*.
- **Cotización:** los anteriores más tipo (servicio o producto), ítem ya seleccionado, cantidad, ubicación u operación (mina o planta) y fecha estimada.

### 8.3 Configuración SMTP de Zoho

> 🕐 **Bloque en espera.** El hosting está en proceso de adquisición, así que todavía no hay cPanel, ni dominio apuntado, ni buzones Zoho creados. **Esto no bloquea nada**: el formulario de React, su validación y sus estados se construyen contra el contrato JSON de §8.1, y el endpoint se resuelve por configuración (ver §8.7). Las Fases 1 a 4 avanzan completas; solo la Fase 5 espera.

| Parámetro        | Valor                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| Host             | `smtp.zoho.com` _(si la cuenta Zoho está en otro data center, p. ej. EU, usar `smtp.zoho.eu`)_ |
| Puerto / cifrado | 465 SSL (o 587 STARTTLS)                                                                       |
| Usuario          | Buzón emisor, p. ej. `web@cortaincendiosportugal.com` _(por definir)_                          |
| Contraseña       | **Contraseña de aplicación** de Zoho (obligatoria si hay 2FA)                                  |
| From             | El mismo buzón autenticado (Zoho rechaza un "From" distinto)                                   |
| Reply-To         | Correo del visitante                                                                           |
| Destinatarios    | `MAIL_TO_CONTACTO`, `MAIL_TO_COTIZACIONES` _(por definir; pueden ser el mismo)_                |

- Las credenciales van en `config.php` **fuera de `public_html`** (p. ej. `/home/usuario/private/config.php`) y **nunca en el repositorio**.
- **Verificar con el proveedor del hosting** que permita conexiones SMTP salientes a los puertos 465/587. Algunos cPanel compartidos las bloquean. Plan B: **Zoho ZeptoMail** (API HTTP transaccional) o Web3Forms.

### 8.4 DNS y cPanel (crítico con correo externo)

- **MX** del dominio apuntando a Zoho (`mx.zoho.com`, `mx2.zoho.com`, `mx3.zoho.com`).
- **SPF:** `v=spf1 include:zoho.com ~all` (un solo registro SPF).
- **DKIM:** registro TXT generado en el panel de Zoho.
- **DMARC:** `v=DMARC1; p=none; rua=mailto:<correo>` al inicio, y más adelante `quarantine`.
- En **cPanel › Email Routing**, marcar **"Remote Mail Exchanger"**. Si no se hace, el servidor entrega localmente los correos del propio dominio y nunca llegan a Zoho.

### 8.5 Seguridad del endpoint

Solo acepta `POST` y `Content-Type: application/json`; valida que el `Origin` sea el dominio; verifica Turnstile en el servidor; tiene un honeypot; limita a 5 envíos por IP cada 10 minutos; escapa todo lo que va al HTML del correo; limita la longitud de los campos; y en errores devuelve mensajes genéricos sin exponer trazas.

### 8.6 Anti-spam sin cuentas de terceros

**El riesgo real.** `contact.php` es una URL pública que envía correo. Los bots la encuentran en cuestión de días y la usan como relé de spam. La consecuencia no es incomodidad: es que **Zoho suspende la cuenta** y la reputación del dominio se cae, con lo cual los correos legítimos de cotización empiezan a ir a la carpeta de no deseados. Por eso hace falta alguna barrera.

**Se descarta Cloudflare Turnstile.** Funciona y es gratis, pero obliga a abrir una cuenta de Cloudflare, gestionar dos claves y dejar el formulario dependiendo de un servicio externo. Para un formulario de cotización de bajo volumen, no se justifica.

**Se adopta esta pila, toda propia:**

| Capa                    | Qué hace                                                                                                                                                                                          | Costo |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **Honeypot**            | Campo oculto por CSS que un humano nunca llena. Si viene con contenido, se descarta en silencio                                                                                                   | 0     |
| **Trampa de tiempo**    | Marca de tiempo firmada en el formulario. Envíos en menos de 3 segundos o después de 2 horas se rechazan                                                                                          | 0     |
| **Altcha**              | Prueba de trabajo (proof-of-work) que el navegador resuelve solo, sin que el usuario haga nada. Licencia MIT, se aloja en el mismo cPanel, sin cuenta, sin llamadas externas, sin cookies. ~10 KB | 0     |
| **Límite por IP**       | 5 envíos cada 10 minutos, contados en un archivo o en SQLite dentro del cPanel                                                                                                                    | 0     |
| **Validación estricta** | Solo `POST`, solo `application/json`, `Origin` verificado contra el dominio, longitud máxima por campo, escapado de todo lo que va al HTML del correo                                             | 0     |

Sin CAPTCHA visual, sin banner de cookies, sin proveedor externo, y no se pierde ni un envío legítimo por un acertijo mal resuelto.

**Plan de contingencia:** si después de publicar el sitio siguen entrando mensajes basura, se añade Turnstile encima (es media hora de trabajo). Se agrega cuando el problema exista, no antes.

### 8.7 Adaptador de endpoint (para poder construir sin el hosting)

El formulario nunca apunta a una URL escrita a mano. Apunta a una variable:

```ts
// content/config.ts
export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? '/api/contact.php'
```

Con eso el mismo código funciona en tres momentos del proyecto sin tocar componentes:

| Momento             | `NEXT_PUBLIC_FORM_ENDPOINT`                                                  | Comportamiento                                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Desarrollo, hoy     | sin definir                                                                  | El formulario valida y muestra los estados de éxito y error, y escribe el payload en la consola. Se puede diseñar y probar la UI completa |
| Antes de tener SMTP | un endpoint temporal de **Web3Forms** o **FormSubmit** (gratis, sin backend) | Los mensajes llegan a `seguridadportugal@gmail.com`. El sitio puede publicarse y recibir cotizaciones reales                              |
| Producción final    | `/api/contact.php`                                                           | PHPMailer y SMTP de Zoho, según §8.3                                                                                                      |

**Mientras no haya nada de esto, el canal vivo es WhatsApp**, que ya funciona con el número conocido (+51 932 481 153) y no depende de hosting, DNS ni correo. En el diseño, WhatsApp y el teléfono tienen el mismo peso visual que el formulario, no menos.

---

## 9. Hosting cPanel y despliegue

1. `npm run build` genera la carpeta `/out`.
2. Se sube el contenido de `/out` a `public_html` junto con `/api/contact.php` y `vendor/` (PHPMailer).
3. Despliegue manual con el Administrador de archivos o FTP, o automático con **GitHub Actions + FTP/SFTP deploy** al hacer push a `main` (recomendado).

**`.htaccess`:** forzar HTTPS y dominio sin `www` (o con, según se decida), `ErrorDocument 404 /404.html`, caché larga para `/_next/static/*`, compresión (gzip/brotli si está disponible), cabeceras de seguridad (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`) y redirecciones 301 desde `portugalseguridad.com` si aplica.

**SSL:** AutoSSL (Let's Encrypt) desde cPanel.
**Versión PHP:** 8.1 o superior en _MultiPHP Manager_.

---

## 10. SEO, analítica y legal

- Metadata por página (title, description, canonical) y Open Graph/Twitter con imagen de marca.
- `sitemap.xml` y `robots.txt` generados en el build.
- **JSON-LD** `LocalBusiness` con nombre, RUC, dirección, teléfono, geo y horario, más `Service` en cada servicio.
- Palabras clave objetivo: _recarga de extintores Arequipa, sistemas contra incendio minería, supresión de incendios en equipos pesados, redes de agua contra incendio, capacitación de brigadistas, venta de extintores Arequipa_.
- Alta en **Google Search Console** y en **Google Business Profile** (con la dirección de Cerro Colorado).
- Analítica: **Matomo autoalojado en el mismo cPanel** (PHP + MySQL, instalable desde Softaculous, gratis). En modo sin cookies **no requiere banner de consentimiento**, y los datos quedan en el hosting del cliente, no en un tercero. Se descarta **GA4** porque obliga a aviso de cookies y a un banner que castiga la conversión, y se descartan Plausible (de pago) y Umami (necesita Node, que este hosting no tiene).
- **Política de privacidad** conforme a la Ley N.º 29733, con casilla de consentimiento en los formularios.
- _Libro de Reclamaciones virtual:_ se recomienda validar si aplica. Como el sitio no vende en línea puede no ser obligatorio, pero conviene confirmarlo con el asesor legal o contable.

---

## 11. Requisitos no funcionales

- **Rendimiento:** Lighthouse ≥ 90 en Performance, Accesibilidad, Best Practices y SEO (móvil). LCP < 2.5 s, CLS < 0.1.
- **Responsive:** 360 px, 768 px, 1024 px y 1440 px o más; enfoque mobile-first.
- **Navegadores:** últimas 2 versiones de Chrome, Edge, Firefox y Safari (incluye iOS).
- **Accesibilidad:** WCAG 2.1 AA, navegación por teclado, `alt` en imágenes, foco visible y labels en formularios.
- **Imágenes:** WebP/AVIF, `loading="lazy"` y tamaños responsivos; ninguna imagen de más de 300 KB.

---

## 12. Fases y entregables

> 📋 **El plan de ejecución detallado vive en `docs/plan-de-desarrollo.md`** (12 fases, ordenadas por dependencia y riesgo, con una compuerta medible cada una). La tabla de abajo es el resumen contractual; ese documento es el que se sigue para trabajar.

| Fase                              | Entregables                                                                        |
| --------------------------------- | ---------------------------------------------------------------------------------- |
| **1. Descubrimiento y contenido** | Este scope aprobado, contenidos validados y fotos recopiladas                      |
| **2. Identidad web**              | Logo SVG plano e isotipo, tokens de color y tipografía, favicon                    |
| **3. Diseño UI**                  | Wireframes y mockups (Inicio, Servicio, Catálogo, Contacto) en desktop y móvil     |
| **4. Desarrollo**                 | Proyecto Next.js, componentes, páginas, animaciones y contenido cargado            |
| **5. Formularios y correo**       | `contact.php`, SMTP Zoho, DNS (SPF/DKIM/DMARC), Email Routing y pruebas de entrega |
| **6. QA y SEO**                   | Pruebas cross-browser y móviles, Lighthouse, sitemap, JSON-LD, Search Console      |
| **7. Despliegue**                 | Subida a cPanel, SSL, `.htaccess`, redirecciones y CI/CD opcional                  |
| **8. Cierre**                     | Manual breve para editar contenido y desplegar; acceso al repositorio              |

**Criterios de aceptación:** todas las páginas del mapa publicadas; formularios que entregan en la bandeja Zoho de destino sin caer en spam (probado en Gmail y Outlook); Lighthouse ≥ 90; sin errores en consola; buena visualización en móvil.

---

## 13. Pendientes del cliente

- [ ] Correos Zoho de destino (contacto y cotizaciones) y buzón emisor para SMTP
- [ ] Horario de atención
- [ ] Redes sociales (Facebook, LinkedIn, Instagram, TikTok, YouTube…)
- [ ] Teléfonos adicionales o fijo
- [ ] Confirmar grafía oficial de la razón social ("Industrial Minera" o "Industrial y Minera")
- [ ] Confirmar que el bloque sin título del PDF es la **Misión** y si hoy se ofrece "monitoreo 24 horas"
- [ ] Lista de productos del catálogo (nombre, categoría, especificaciones, foto)
- [ ] Fotos originales en alta resolución (las del PDF están comprimidas)
- [ ] Logo en alta resolución o archivo editable; autorización para vectorizarlo
- [ ] Autorización para usar logos de clientes y marcas de fabricantes (p. ej. ANSUL)
- [ ] Certificaciones, homologaciones o acreditaciones vigentes (para la sección de confianza)
- [ ] Cifras reales para los contadores (proyectos, clientes, extintores recargados, personas capacitadas)
- [ ] Confirmar si `portugalseguridad.com` sigue activo (para redirigir)
- [ ] Datos de acceso a cPanel, al registrador del dominio (DNS) y a la consola de Zoho
- [ ] Preferencia de analítica (GA4 o Plausible/Umami)
- [x] ~~Intro: aprobar el storyboard y el estilo del extintor~~ — **resuelto en v1.3.** El extintor se dibuja en el mismo hairline que la lámina (es un símbolo del plano, no un objeto ajeno) y la produce el desarrollador en código. Queda pendiente solo la **aprobación de los 4 fotogramas** por parte del cliente
- [ ] Aprobar los 4 fotogramas del storyboard de la intro (0 s, 1 s, 2 s, 3 s)

### 13.1 Solución provisional para cada pendiente

**Principio:** ningún pendiente del cliente detiene el desarrollo. Cada uno tiene una vía provisional que se reemplaza después sin reescribir componentes. Lo único que **nunca** se hace es inventar datos: si un dato no existe, el bloque no se renderiza.

El patrón técnico es siempre el mismo: **el contenido faltante vive como campo opcional en `/content`, y la UI se renderiza condicionalmente.**

```ts
// content/empresa.ts — todo lo pendiente es opcional
export const empresa = {
  razonSocial: 'Portugal Seguridad Industrial Minera E.I.R.L.', // grafía del PDF
  ruc: '20600361172',
  telefonos: ['+51932481153'], // array: crece sin tocar componentes
  whatsapp: '+51932481153',
  email: 'seguridadportugal@gmail.com', // se cambia por el de Zoho
  horario: null, // null = el bloque no se renderiza
  redes: [] as { red: string; url: string }[], // vacío = no hay fila de redes
  certificaciones: [] as string[], // vacío = no hay sección
}
```

| #   | Pendiente                                        | Solución provisional                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ¿Bloquea?    |
| --- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| 1   | **Correos Zoho y buzón SMTP**                    | Adaptador de §8.7. El formulario se construye completo contra el contrato JSON; el endpoint se resuelve por variable de entorno. Canal vivo mientras tanto: **WhatsApp** (ya funciona) y, si se quiere recibir correos antes del hosting, un endpoint temporal de **Web3Forms** apuntando a `seguridadportugal@gmail.com`                                                                                                                                                                                                                                                     | **No**       |
| 2   | **Horario de atención**                          | `horario: null` → el bloque de horario no se renderiza y **se omite `openingHours` del JSON-LD** (un horario inventado en datos estructurados es peor que ninguno: Google lo publica en el panel de búsqueda). En su lugar, la página de contacto dice "Respondemos consultas por WhatsApp"                                                                                                                                                                                                                                                                                   | **No**       |
| 3   | **Redes sociales**                               | `redes: []` → no se dibuja la fila de iconos, y se omite `sameAs` del JSON-LD. Nunca iconos que no llevan a ningún lado                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **No**       |
| 4   | **Teléfonos adicionales**                        | `telefonos` es un array. Hoy tiene uno; agregar más es editar una línea                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **No**       |
| 5   | **Grafía oficial de la razón social**            | Consultar **gratis y sin login** el RUC 20600361172 en la _Consulta RUC_ de SUNAT y usar literalmente lo que devuelva. Mientras: la grafía del PDF (_"Industrial Minera"_, sin "y") en todo texto legal — footer, contacto, política de privacidad — y _"Industrial y Minera"_ solo como título comercial del `<title>` y el hero. Así el dato legal nunca está mal, aunque el comercial se ajuste                                                                                                                                                                            | **No**       |
| 6   | **Misión y "monitoreo 24 horas"**                | Se publica la Misión con sus dos viñetas, pero **cortando la frase "y monitoreo las 24 horas"**. Si el servicio no se presta, es publicidad engañosa (fiscalizable por INDECOPI) y además un comprador minero lo va a preguntar en la primera reunión. La frase se agrega el día que el cliente confirme que sí se ofrece                                                                                                                                                                                                                                                     | **No**       |
| 7   | **Lista de productos del catálogo**              | Arranque con las **5 clases de extintor que ya nombra este documento** (PQS, CO₂, agua, espuma, acetato de potasio): son categorías normadas por **NTP 350.043** y **NFPA 10**, o sea información pública y verificable, no inventada. Sin marcas, sin modelos, sin precios. Más 3 categorías de EPP genéricas. Cada ficha con `estado: 'borrador'` para saber qué falta validar. El botón "Cotizar" funciona igual. _Se descartó_ publicar sin `/productos`: eliminaría una vía de conversión completa                                                                       | **No**       |
| 8   | **Fotos en alta resolución**                     | Dos vías en paralelo: **(a)** se entrega al cliente una **lista de 12 tomas** con instrucciones — ver §13.2; **(b)** hasta que lleguen, la dirección visual **no depende de fotografía**: carga el peso en tipografía, color y composición. Las fotos del PDF se usan solo en tarjetas pequeñas, **nunca en el hero**, porque su compresión se nota al ampliarlas. **No se usa stock genérico de bomberos**: es el recurso que delata un sitio hecho con plantilla, y los dos skills de diseño lo prohíben                                                                    | **No**       |
| 9   | **Logo editable**                                | Escalera de tres peldaños: **(a)** pedir el archivo original (`.ai`, `.svg`, `.cdr`, `.psd`); **(b)** si solo existe el PNG, vectorizar el escudo **con autorización escrita** (es obra derivada, no se toca sin permiso); **(c)** mientras tanto el header usa el **wordmark "PORTUGAL"** compuesto en Archivo expandido — que es tipografía, no logo, y se ve intencional, no provisional — y el medallón PNG se reserva para el hero de _Nosotros_ y la imagen OG, donde sí tiene tamaño. Favicon: **silueta monocroma del escudo**, que es lo único que sobrevive a 32 px | **No**       |
| 10  | **Autorización de logos de clientes y de ANSUL** | **No se publica ningún logo ajeno, ni en gris.** Los 12 clientes se publican como **lista tipográfica de nombres**, que es legalmente seguro (mencionar a un cliente es un hecho; reproducir su marca es uso de marca) y además mejor diseño: el "muro de logos monocromáticos" es uno de los patrones que ambos skills marcan como sello de sitio generado por IA. Esto deja de ser un bloqueante y pasa a ser una decisión de diseño. ANSUL no aparece hasta que exista un certificado de distribuidor autorizado                                                           | **No**       |
| 11  | **Certificaciones vigentes**                     | `certificaciones: []` → la sección de confianza se arma con lo que **sí está documentado**: cumplimiento NFPA y NTP, auditorías aprobadas por MINEM y por aseguradoras internacionales, +20 años. Eso ya es respaldo real. No se dibujan sellos inventados                                                                                                                                                                                                                                                                                                                    | **No**       |
| 12  | **Cifras de los contadores**                     | **Resuelto** en §4.1: +20 años, 12 clientes, 8 líneas de servicio, 7 regiones. Las cuatro se derivan de este documento                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **Resuelto** |
| 13  | **¿Sigue activo `portugalseguridad.com`?**       | Se verifica con una consulta DNS y `whois` el día del despliegue, no ahora. Si es del cliente, se agrega el 301 en el `.htaccess` del dominio viejo (5 minutos). Si no es suyo, no se hace nada y se documenta                                                                                                                                                                                                                                                                                                                                                                | **No**       |
| 14  | **Preferencia de analítica**                     | **Resuelto** en §10: Matomo autoalojado en el mismo cPanel, modo sin cookies, sin banner de consentimiento, datos en poder del cliente                                                                                                                                                                                                                                                                                                                                                                                                                                        | **Resuelto** |
| 15  | **Storyboard y estilo de la intro**              | **Resuelto en v1.3 por la elección de mundo visual.** La produce el desarrollador en código (SVG + Canvas 2D, sin shader), no un motion designer: Rive trae ~150 KB de runtime y Lottie entre 60 y 250 KB, o sea que contratar animación externa **rompe la meta de Lighthouse** además de sumar costo y dependencia. Estilo del extintor: **hairline del mismo grosor que la lámina**, porque es un símbolo del plano. Queda pendiente solo que el cliente apruebe los **4 fotogramas** (0 s, 1 s, 2 s, 3 s) antes de programar la coreografía                               | **Resuelto** |

**Resultado:** de 15 pendientes, 2 quedan resueltos en este documento y los 13 restantes tienen vía provisional. **Ninguno bloquea las Fases 1 a 4.** Lo único que espera de verdad es la **Fase 5 (formularios y correo)**, que necesita el cPanel contratado y los buzones Zoho creados.

### 13.2 Lista de tomas fotográficas para el cliente

Un celular moderno alcanza. Las reglas: **luz de día, horizontal (apaisado), sin zoom digital, sin filtros, el objeto llenando el cuadro**. Mejor 12 fotos honestas que 3 de stock.

| #   | Toma                                                                   | Para qué sección      |
| --- | ---------------------------------------------------------------------- | --------------------- |
| 1   | Técnico con EPP completo recargando un extintor en el taller           | Hero de inicio        |
| 2   | Fila de extintores recargados, con sus tarjetas de inspección visibles | Servicio 3 y catálogo |
| 3   | Unidad móvil de la empresa, en ruta o dentro de una operación          | "Por qué elegirnos"   |
| 4   | Gabinete o hidrante instalado, plano frontal completo                  | Servicio 2            |
| 5   | Panel de detección y alarma abierto, mostrando el cableado ordenado    | Servicio 1            |
| 6   | Sistema de supresión montado en un camión de acarreo                   | Servicio 5            |
| 7   | Práctica de fuego real con brigadistas                                 | Servicio 4            |
| 8   | Charla de capacitación con personal atendiendo                         | Servicio 4 y Nosotros |
| 9   | Cámara de seguridad instalada en poste o estructura industrial         | Servicio 7            |
| 10  | Prueba hidrostática en proceso                                         | Servicio 3            |
| 11  | Equipo completo de trabajo, foto grupal con EPP                        | Nosotros              |
| 12  | Detalle cerrado: manómetro, válvula o placa de datos de un equipo      | Texturas y fondos     |

**Lo que no sirve:** capturas de pantalla del PDF, fotos verticales de WhatsApp reenviadas (llegan recomprimidas), fotos con marca de agua de otra empresa, y cualquier imagen donde no se distinga qué se está viendo.

---

## 14. Fuera de alcance (salvo acuerdo adicional)

- Tienda en línea, pasarela de pagos o precios públicos
- Panel administrativo o CMS (el contenido se edita en archivos del repositorio). _Posible fase 2: CMS headless como Decap CMS, Sanity o TinaCMS._
- Versión en inglés
- Blog o noticias
- Portal de clientes (certificados de recarga, historial de inspecciones)
- Producción fotográfica o de video, y redacción publicitaria extensa
- Campañas de pago (Google Ads o Meta Ads)
- Creación de los buzones en Zoho (lo hace el cliente; aquí solo se integra y se configura DNS)
