# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router, TypeScript) con exportación estática (`output: 'export'`), Tailwind CSS v4 y Framer Motion (`motion`). Decidido por el usuario y registrado en `docs/scope_1.md` §5, no delegado. La restricción que lo fuerza es el hosting: cPanel compartido con Apache y PHP, sin runtime de Node, así que no hay API Routes, Server Actions, middleware, ISR ni optimización de imágenes en runtime. Los formularios se resuelven con PHP 8 + PHPMailer en el mismo cPanel.

## Users

Cuatro audiencias confirmadas, todas compradoras, en orden de prioridad para el sitio:

1. **Dueño o administrador de industria y comercio en Arequipa** — _audiencia primaria_. Planta, almacén, hotel, edificio o local. Necesita extintores recargados y el certificado correspondiente para Defensa Civil o para su póliza de seguro. Compra de ticket bajo, ciclo corto, y llega buscando resolver un vencimiento o una observación. Decide rápido y muchas veces desde el celular.
2. **Superintendente o jefe de seguridad de operación minera** — especifica el trabajo y exige cumplimiento NFPA y NTP. Le importa que el proveedor pase auditoría, no el precio. Decide técnicamente y luego deriva a compras.
3. **Comprador o área de procurement** — compara proveedores, pide tres cotizaciones, verifica RUC y capacidad real. Le importa la formalidad, el tiempo de respuesta y confirmar que el proveedor existe de verdad.
4. **Contratista y consorcio minero** (Stracon, GyM, consorcios) — subcontrata el servicio dentro de un proyecto mayor. Varios ya trabajaron con la empresa. Le importa el historial, la capacidad de movilización y que no le frenen la obra.

Las cuatro conviven en el mismo sitio. La primaria define el hero y el orden de las secciones; las otras tres tienen que encontrar su camino en segundos sin que el sitio se parta en dos.

## Product Purpose

Un sitio web corporativo en español que convierta la búsqueda de un servicio contra incendios en una solicitud de cotización o un contacto directo. Éxito = cotizaciones y contactos que llegan a los correos corporativos de la empresa, por formulario, WhatsApp o teléfono. No vende en línea, no publica precios y no gestiona pagos: su trabajo es hacer que la empresa sea encontrable, verificable y contactable.

El sitio también reemplaza a la web anterior (`portugalseguridad.com`) bajo el dominio nuevo `cortaincendiosportugal.com`.

## Positioning

**Un solo proveedor cubre el alcance completo contra incendios, con más de 20 años haciéndolo.** Las 8 líneas —detección, redes de agua, extintores, capacitación, supresión en equipo pesado, cámaras, venta de extintores y EPP— salen de la misma empresa, con el mismo personal y las mismas unidades móviles.

Ese es el mecanismo que el competidor local no puede copiar: el proveedor chico de Arequipa cubre una o dos líneas, así que el cliente termina administrando cuatro proveedores, cuatro cronogramas de mantenimiento y cuatro juegos de certificados. Aquí es uno.

La cartera minera de primer nivel (Cerro Verde, Antapaccay, Quellaveco, Shougang, El Brocal, Fluor Daniel) no es el argumento principal: es lo que **desactiva el riesgo** para el comprador local. Si esas operaciones dejaron entrar a este proveedor a sus instalaciones, una planta o un edificio en Arequipa no tiene de qué preocuparse.

## Operating Context

Hechos del oficio que son parte real de usar y evaluar este servicio:

- **Ritmo normativo del extintor:** inspección mensual, recarga anual, prueba hidrostática cada 5 años. Cada equipo lleva su **tarjeta de inspección** con las fechas, que es el documento que un inspector o un perito revisa primero.
- **Normativa aplicable:** NFPA y Normas Técnicas Peruanas (NTP). Para extintores, NTP 350.043 y NFPA 10.
- **Motivos de compra del cliente local:** certificado para Defensa Civil, exigencia de la póliza de seguro, observación de una inspección, vencimiento de recarga.
- **Motivos de compra del cliente minero:** auditoría, homologación de proveedor, parada de planta programada, instalación nueva.
- **Entrar a una operación minera** exige personal calificado, equipos, herramientas y unidades móviles propias para trasladar gente y materiales dentro de la mina.
- **Aval existente:** trabajos aprobados en auditorías del Ministerio de Energía y Minas y por peritos internacionales de compañías aseguradoras.
- **Cobertura geográfica confirmada:** 7 regiones del Perú — Arequipa, Pasco, Ica, Cusco, La Libertad, Cajamarca y Moquegua.
- **Canal real de contacto en Perú:** WhatsApp pesa tanto o más que el correo. El número (+51 932 481 153) es el mismo para teléfono y WhatsApp.
- **Condiciones de lectura:** buena parte de las consultas llegan desde un celular, con frecuencia a la luz del día en Arequipa o en un campamento, y con señal irregular.

## Capabilities and Constraints

**Confirmado:**

- 11 rutas: inicio, nosotros, servicios (listado + 8 páginas), productos (catálogo por categoría), proyectos y clientes, contacto, cotizar, política de privacidad, 404.
- Catálogo **sin precios y sin pagos**. Cada ficha termina en "Cotizar".
- Todo el contenido vive en archivos de `/content`; actualizar el sitio es editar un archivo y volver a desplegar. **No hay CMS ni panel administrativo.**
- Solo español. Sin versión en inglés.
- Formularios: contacto y cotización, la segunda recibe el servicio o producto ya seleccionado por query string.
- Anti-spam sin cuentas de terceros: honeypot, trampa de tiempo, Altcha autoalojado y límite por IP.
- Analítica: Matomo autoalojado en el mismo cPanel, modo sin cookies, sin banner de consentimiento.
- Legal: política de privacidad conforme a la Ley N.º 29733, con casilla de consentimiento en los formularios.
- Fuera de alcance: tienda, pasarela de pagos, CMS, blog, portal de clientes, producción fotográfica o de video, campañas pagas.

**Explícitamente sin decidir** (no inventar; el sitio los omite hasta que existan):

- Buzones Zoho de destino y buzón emisor para SMTP. El hosting está en proceso de adquisición.
- Horario de atención.
- Redes sociales.
- Teléfonos adicionales o fijo.
- Grafía oficial de la razón social: el PDF dice "Portugal Seguridad Industrial Minera E.I.R.L." (sin "y"); falta confirmar contra SUNAT.
- Si hoy se ofrece **monitoreo 24 horas**. Hasta confirmarlo, la frase no se publica.
- Lista real de productos del catálogo.
- Certificaciones, homologaciones o acreditaciones vigentes.
- Si `portugalseguridad.com` sigue siendo de la empresa (para redirigir con 301).

## Brand Commitments

- **Razón social:** Portugal Seguridad Industrial Minera E.I.R.L. · **RUC:** 20600361172 · **Dirección:** Urb. 12 de Octubre H-18, Cerro Colorado, Arequipa, Perú.
- **Marca corta visible:** "PORTUGAL".
- **Dominio:** `cortaincendiosportugal.com`.
- **Logo:** medallón metálico 3D en forma de escudo (extintor, llama, gota, "P", casco y cámara). Pierde legibilidad por debajo de ~60 px, así que necesita versión plana vectorial e isotipo. Pendiente: archivo editable y autorización para vectorizar.
- **Color:** rojo fuego como color de acción y los cobres y bronces del propio logo como acento. Ambos son compromiso de marca, no elección estética.
- **Idioma:** solo español.
- **Voz:** técnica y verificable. La empresa habla de normas, fechas y alcances, no de adjetivos. Ninguna afirmación se publica sin respaldo.

## Evidence on Hand

**Existe:**

- _Perfil Empresarial Portugal Seguridad_, PDF de 17 páginas: datos de empresa, visión, el bloque asumido como misión, los 8 servicios con su alcance, 5 proyectos y la cartera de clientes.
- **12 clientes corporativos** nombrados: Fluor Daniel Perú, Sociedad Minera Cerro Verde, SERMEDI, Minera Antapaccay (Tintaya), Stracon–GyM (Shougang Marcona, La Arena, El Brocal, La Zanja), Anglo American Quellaveco, Olazábal International Investment – LIVIT, Inkabor, Bosch Casa, Inca Alpaca, Arca Continental Lindley, Carmen Inmuebles.
- **5 proyectos documentados:** El Brocal (Consorcio Pasco), Shougang Marcona (Consorcio Marcona), Antapaccay (Glencore), hidrantes en Cerro Verde, y supresión en equipo pesado (cliente por confirmar).
- **4 cifras verificables:** +20 años, 12 clientes corporativos, 8 líneas de servicio, 7 regiones.
- Logo del escudo en PNG.
- Fotografías dentro del PDF, **comprimidas**: sirven en tamaño pequeño, no en un hero.

**No existe, y el diseño no debe fabricarlo:**

- Testimonios o citas de clientes. Ninguna.
- Logotipos de clientes con autorización de uso. **No se publica ningún logo ajeno, ni monocromático.** Los clientes se nombran en texto.
- Autorización para mostrar marcas de fabricante (el PDF incluye ANSUL). No aparece hasta que exista certificado de distribuidor autorizado.
- Certificaciones o sellos. No se dibujan escudos inventados.
- Lista real de productos con especificaciones y foto.
- Fotografía en alta resolución. Hay una lista de 12 tomas para que el cliente las produzca (`docs/scope_1.md` §13.2).
- Precios, cifras de facturación, cantidad de equipos atendidos o de personas capacitadas.

## Product Principles

1. **Ningún dato sin respaldo.** Si una cifra, un sello, un testimonio o un logo no está documentado, el bloque no se renderiza. Un vacío honesto vale más que un relleno que un comprador minero desmiente en la primera reunión.
2. **La audiencia primaria es local y apurada; la minera es la prueba.** El cliente de Arequipa entra a resolver un vencimiento. La cartera minera está para desactivarle el riesgo, no para abrirle el discurso.
3. **Un proveedor, ocho líneas.** Cada decisión de contenido o navegación debe dejar claro que todo el alcance contra incendios sale de la misma empresa. Si el sitio se lee como ocho servicios sueltos, perdió el argumento.
4. **WhatsApp y teléfono valen lo mismo que el formulario.** Convertir no es llenar un campo: es que la persona llegue al número. Los tres canales tienen el mismo peso visual y ninguno depende del hosting para funcionar.
5. **Se lee al sol, en un celular, con mala señal.** Contraste alto, peso bajo y nada cuya legibilidad dependa de una sombra suave. Esta restricción gana sobre cualquier preferencia de superficie.

## Accessibility & Inclusion

- **WCAG 2.1 AA** como requisito: texto de cuerpo y placeholders ≥ 4.5:1, texto grande ≥ 3:1, navegación completa por teclado, foco visible, `alt` en imágenes, etiquetas reales en formularios (nunca placeholder como etiqueta).
- **`prefers-reduced-motion`** se respeta en todo el sitio, y la intro animada del inicio no se muestra a quien lo tenga activado.
- **Seguridad fotosensible:** el efecto de fuego de la intro se mantiene por debajo de 3 destellos por segundo (WCAG 2.3.1), sin flashes rojos saturados a pantalla completa.
- **Legibilidad a plena luz del día** en pantalla de celular, por el contexto de uso descrito arriba. No es una preferencia estética: es una condición de uso de la audiencia primaria.
- **Ancho de banda limitado:** ninguna imagen supera 300 KB; objetivo LCP < 2,5 s en móvil.
