import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { CeldaArea, CeldaLista, CeldaTexto } from '@/components/forms/Celda'
import { BotonWhatsApp } from '@/components/layout/BotonWhatsApp'
import { Cabecera } from '@/components/layout/Cabecera'
import { MenuMovil } from '@/components/layout/MenuMovil'
import { Pie } from '@/components/layout/Pie'
import { BandaCifras } from '@/components/plan/BandaCifras'
import { Cota, Cotas } from '@/components/plan/Cota'
import { Detalle } from '@/components/plan/Detalle'
import { Ramal, Ramales } from '@/components/plan/Ramal'
import { RitmoNormativo } from '@/components/plan/RitmoNormativo'
import { celdasEmpresa, Rotulo } from '@/components/plan/Rotulo'
import { RutaDetalle } from '@/components/plan/RutaDetalle'
import { SelloRevision } from '@/components/plan/SelloRevision'
import { nombresSimbolos, Simbolo } from '@/components/plan/simbolos'
import { Boton } from '@/components/ui/Boton'
import { cifras, cta } from '@/content/empresa'
import { NORMA_EXTINTORES, ritmoNormativo } from '@/content/normativa'
import { servicios, type SimboloId } from '@/content/red'
import { contraste } from '@/lib/contraste'

/**
 * FASE 2 — hoja de verificación del sistema de componentes.
 *
 * Existe para cerrar la compuerta de la Fase 2: cada componente en cada estado,
 * contraste medido, foco siempre visible y un solo radio de esquina.
 *
 * Los estados que dependen del puntero o del teclado se muestran quietos con
 * `data-estado`, que fuerza la misma regla CSS que la pseudo-clase real (ver
 * las variantes `sobre` y `pulsado` en `globals.css`). El sitio nunca lo usa.
 *
 * No es una página del sitio: no se indexa y se retira antes del despliegue.
 */

export const metadata: Metadata = {
  title: 'Componentes',
  robots: { index: false, follow: false },
}

/* ════════════════════════════════════════════════════════════════
   ARMAZÓN DE LA HOJA
   ════════════════════════════════════════════════════════════════ */

function Seccion({
  titulo,
  bajada,
  children,
}: {
  titulo: string
  bajada: ReactNode
  children: ReactNode
}) {
  return (
    <section className="mt-16">
      <h2 className="lettering rule-b-bold pb-3 text-h3">{titulo}</h2>
      <p className="medida mt-4 text-ink-600">{bajada}</p>
      <div className="mt-8">{children}</div>
    </section>
  )
}

/** Una muestra con el nombre de su estado debajo, como pie de figura. */
function Muestra({
  estado,
  children,
  className = '',
}: {
  estado: string
  children: ReactNode
  className?: string
}) {
  return (
    <figure className={className}>
      {children}
      <figcaption className="datum mt-2.5 text-[12px] text-ink-600">{estado}</figcaption>
    </figure>
  )
}

/* ════════════════════════════════════════════════════════════════
   DATOS DE LA HOJA
   ════════════════════════════════════════════════════════════════ */

const ESTADOS_BOTON = [
  { estado: 'Reposo', props: {} },
  { estado: 'Hover', props: { 'data-estado': 'hover' } },
  { estado: 'Activo', props: { 'data-estado': 'activo' } },
  { estado: 'Foco', props: { 'data-estado': 'foco' } },
  { estado: 'Deshabilitado', props: { disabled: true } },
  { estado: 'Cargando', props: { cargando: true } },
] as const

const SIMBOLOS: readonly SimboloId[] = [...servicios.map((s) => s.simbolo), 'bomba', 'valvula']

/** El ramal 03, que es el rojo, y el 01 como ejemplo de ramal en tinta. */
const RAMAL_TINTA = servicios[0]
const RAMAL_ROJO = servicios.find((s) => s.tinta === 'fire')

/** Tokens de `globals.css`, para medir sobre los valores reales. */
const HEX = {
  paper: '#f4f6f7',
  'paper-alt': '#e9edef',
  'ink-900': '#16212b',
  'ink-600': '#465562',
  'ink-300': '#a9b6c0',
  'fire-600': '#c62828',
  'fire-700': '#a11d1d',
  'copper-500': '#b8733a',
  'copper-50': '#f6ede5',
  'teal-600': '#1f7f80',
  'ok-600': '#2e7d32',
  'err-600': '#c62828',
  whatsapp: '#128c7e',
} as const

type Token = keyof typeof HEX

/** Cada par que el sistema usa de verdad, con el mínimo que le corresponde. */
const PARES: readonly { tinta: Token; fondo: Token; uso: string; minimo: number }[] = [
  { tinta: 'ink-900', fondo: 'paper', uso: 'Cuerpo y títulos', minimo: 4.5 },
  { tinta: 'ink-600', fondo: 'paper', uso: 'Texto secundario y placeholder', minimo: 4.5 },
  { tinta: 'ink-900', fondo: 'paper-alt', uso: 'Texto dentro de la celda', minimo: 4.5 },
  { tinta: 'ink-600', fondo: 'paper-alt', uso: 'Placeholder dentro de la celda', minimo: 4.5 },
  { tinta: 'paper', fondo: 'fire-600', uso: 'Acción principal', minimo: 4.5 },
  { tinta: 'paper', fondo: 'fire-700', uso: 'Acción principal, hover y carga', minimo: 4.5 },
  { tinta: 'fire-600', fondo: 'paper', uso: 'Rotulación del ramal rojo', minimo: 4.5 },
  { tinta: 'err-600', fondo: 'paper', uso: 'Mensaje de error', minimo: 4.5 },
  { tinta: 'ok-600', fondo: 'paper', uso: 'Mensaje de éxito', minimo: 4.5 },
  { tinta: 'ink-900', fondo: 'copper-50', uso: 'Sello: revisión y fecha', minimo: 4.5 },
  { tinta: 'ink-600', fondo: 'copper-50', uso: 'Sello: concepto', minimo: 4.5 },
  { tinta: 'paper', fondo: 'ink-900', uso: 'Selección de texto', minimo: 4.5 },
  { tinta: 'copper-500', fondo: 'paper', uso: 'Anillo de foco y marco del sello', minimo: 3 },
  { tinta: 'ink-600', fondo: 'paper', uso: 'Filete de 1px y contornos', minimo: 3 },
  { tinta: 'teal-600', fondo: 'paper', uso: 'Símbolo del ramal de agua', minimo: 3 },
  { tinta: 'paper', fondo: 'whatsapp', uso: 'Glifo del botón de WhatsApp', minimo: 3 },
]

const decimal = (n: number) => n.toFixed(2).replace('.', ',')

/* ════════════════════════════════════════════════════════════════
   LA HOJA
   ════════════════════════════════════════════════════════════════ */

export default function VerificacionFase2() {
  return (
    <>
      <Cabecera />

      <main id="contenido" className="plan-grid px-5 pt-28 pb-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <RutaDetalle tramos={[{ etiqueta: 'Red general', href: '/' }, { etiqueta: 'Fase 2' }]} />

          <header className="mt-3">
            {/* «COMPONENTES» no entra a 360 px en el cuerpo mínimo de `text-h1`. */}
            <h1 className="lettering text-h2 sm:text-h1">
              Fase 2<br />
              Sistema de componentes
            </h1>
            <p className="medida mt-5 text-ink-600">
              Las piezas con las que se arma el sitio, cada una en todos sus estados. Ninguna tiene
              sombra ni esquina redondeada: la jerarquía es el grosor de línea, y el único objeto
              circular es el botón de WhatsApp.
            </p>
          </header>

          {/* ── Botón ────────────────────────────────────────────── */}
          <Seccion
            titulo="Botón"
            bajada="Dos papeles y nada más. La acción principal lleva el rojo reservado; todo lo demás es un contorno que sube de 1 a 2 px al apuntar."
          >
            <div className="space-y-8">
              {(['accion', 'linea'] as const).map((variante) => (
                <div key={variante} className="flex flex-wrap gap-x-6 gap-y-6">
                  {ESTADOS_BOTON.map(({ estado, props }) => (
                    <Muestra key={estado} estado={estado}>
                      <Boton variante={variante} {...props}>
                        {variante === 'accion' ? cta.cotizar : cta.whatsapp}
                      </Boton>
                    </Muestra>
                  ))}
                </div>
              ))}
            </div>
          </Seccion>

          {/* ── Cuadro de rótulo ─────────────────────────────────── */}
          <Seccion
            titulo="Cuadro de rótulo"
            bajada="El cajetín de la lámina. Una celda sin dato no se dibuja: el segundo cuadro recibe las mismas celdas sin norma, revisión ni fecha, y simplemente se achica."
          >
            <div className="space-y-8">
              <Muestra estado="Completo, con sello">
                <Rotulo
                  titulo="Red contra incendio"
                  anotacion={
                    <SelloRevision revision="F2" fecha="2026-09-30" concepto="Componentes" />
                  }
                  celdas={celdasEmpresa({
                    norma: 'NFPA 10 / NTP 350.043',
                    revision: '2026',
                    fecha: '30.09.2026',
                  })}
                />
              </Muestra>
              <Muestra estado="Con celdas pendientes: se omiten">
                <Rotulo celdas={celdasEmpresa()} />
              </Muestra>
            </div>
          </Seccion>

          {/* ── Ramal de servicio ────────────────────────────────── */}
          <Seccion
            titulo="Ramal de servicio"
            bajada="Reemplaza a la tarjeta de servicio. Los ocho cuelgan de una sola montante; el de extintores es el único en rojo. Al apuntar, la derivación engrosa y aparece la cota que une el nombre con su norma."
          >
            <Ramales servicios={servicios} />

            {RAMAL_TINTA && RAMAL_ROJO ? (
              <div className="mt-10 grid gap-x-8 gap-y-6 lg:grid-cols-2">
                <Muestra estado="Hover">
                  <Ramal servicio={RAMAL_TINTA} data-estado="hover" />
                </Muestra>
                <Muestra estado="Activo">
                  <Ramal servicio={RAMAL_TINTA} data-estado="activo" />
                </Muestra>
                <Muestra estado="Foco">
                  <Ramal servicio={RAMAL_TINTA} data-estado="foco" />
                </Muestra>
                <Muestra estado="Ramal rojo, hover">
                  <Ramal servicio={RAMAL_ROJO} data-estado="hover" />
                </Muestra>
              </div>
            ) : null}
          </Seccion>

          {/* ── Símbolo normado ──────────────────────────────────── */}
          <Seccion
            titulo="Símbolo normado"
            bajada="Los diez de la Fase 1, sin cambios: caja de 24, trazo de 1,5, punta cuadrada. Toman la tinta de su contexto."
          >
            <ul className="flex flex-wrap gap-x-8 gap-y-6">
              {SIMBOLOS.map((id) => (
                <li key={id} className="w-24">
                  <Simbolo id={id} tamano={40} decorativo className="text-ink-900" />
                  <p className="mt-2 text-[13px] leading-snug text-ink-600">
                    {nombresSimbolos[id]}
                  </p>
                </li>
              ))}
            </ul>
          </Seccion>

          {/* ── Cota ─────────────────────────────────────────────── */}
          <Seccion
            titulo="Cota"
            bajada="Línea de extensión con su valor en mono. Solo para medición real; acá, las tres periodicidades del ritmo normativo."
          >
            <Cotas className="sm:grid-cols-3">
              {ritmoNormativo.map((marca) => (
                <Cota key={marca.nombre} etiqueta={marca.nombre} valor={marca.intervalo} />
              ))}
            </Cotas>
          </Seccion>

          {/* ── Sello de revisión ────────────────────────────────── */}
          <Seccion
            titulo="Sello de revisión"
            bajada="Marco en cobre, texto en tinta: el cobre como color de letra no pasa AA. Sin fecha no hay sello, así que el estado vacío es no renderizar nada."
          >
            <div className="flex flex-wrap items-start gap-x-8 gap-y-6">
              <Muestra estado="Revisión y fecha">
                <SelloRevision revision="F1" fecha="2026-09-26" />
              </Muestra>
              <Muestra estado="Con concepto">
                <SelloRevision revision="F1" fecha="2026-09-26" concepto="Lámina aprobada" />
              </Muestra>
              <Muestra estado="Sin fecha: no se dibuja">
                <SelloRevision revision="F3" fecha={null} />
              </Muestra>
            </div>
          </Seccion>

          {/* ── Detalle ampliado ─────────────────────────────────── */}
          <Seccion
            titulo="Detalle ampliado"
            bajada="El patrón de las páginas de servicio. La escala que declara manda el cuerpo de su rotulación: el detalle 1:10 se rotula más grande que el 1:50."
          >
            <div className="grid gap-6 lg:grid-cols-3">
              {(
                [
                  { escala: '1:10', lado: 132 },
                  { escala: '1:20', lado: 88 },
                  { escala: '1:50', lado: 52 },
                ] as const
              ).map(({ escala, lado }) => (
                <Detalle key={escala} n="03" titulo="Extintores" escala={escala}>
                  <div className="grid h-40 place-items-center text-fire-600">
                    <Simbolo id="extintor" tamano={lado} grosor={2} />
                  </div>
                </Detalle>
              ))}
            </div>

            <Detalle
              className="mt-6"
              n="03"
              titulo="Extintores"
              escala="1:20"
              rotulo={<Rotulo celdas={celdasEmpresa({ norma: NORMA_EXTINTORES })} />}
            >
              <div className="grid items-center gap-8 sm:grid-cols-[auto_1fr]">
                <span className="text-fire-600">
                  <Simbolo id="extintor" tamano={120} grosor={2} />
                </span>
                <Cotas>
                  {ritmoNormativo.map((marca) => (
                    <Cota key={marca.nombre} etiqueta={marca.nombre} valor={marca.intervalo} />
                  ))}
                </Cotas>
              </div>
            </Detalle>
          </Seccion>

          {/* ── Banda de cifras ──────────────────────────────────── */}
          <Seccion
            titulo="Banda de cifras"
            bajada="Las cuatro cifras documentadas, con filetes de 1 px. Sin tarjeta y sin contador animado. Con una lista vacía, la banda no existe."
          >
            <BandaCifras cifras={cifras} />
            <Muestra estado="Lista vacía: no se dibuja" className="mt-6">
              <BandaCifras cifras={[]} />
            </Muestra>
          </Seccion>

          {/* ── Celda de formulario ──────────────────────────────── */}
          <Seccion
            titulo="Celda de formulario"
            bajada="Filete inferior, etiqueta real arriba y relleno propio: nunca hundida ni del color de la hoja. El error suma grosor, marca y mensaje, no solo color."
          >
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              <Muestra estado="Vacío">
                <CeldaTexto etiqueta="Nombre" placeholder="Nombre y apellido" required />
              </Muestra>
              <Muestra estado="Con valor">
                <CeldaTexto etiqueta="Empresa" defaultValue="Planta de ejemplo S.A.C." />
              </Muestra>
              <Muestra estado="Hover">
                <CeldaTexto
                  etiqueta="Nombre"
                  placeholder="Nombre y apellido"
                  required
                  data-estado="hover"
                />
              </Muestra>
              <Muestra estado="Foco">
                <CeldaTexto
                  etiqueta="Nombre"
                  placeholder="Nombre y apellido"
                  required
                  data-estado="foco"
                />
              </Muestra>
              <Muestra estado="Error">
                <CeldaTexto
                  etiqueta="Teléfono"
                  type="tel"
                  defaultValue="93248"
                  required
                  error="Faltan dígitos: un celular tiene 9, por ejemplo 932 481 153."
                />
              </Muestra>
              <Muestra estado="Deshabilitado">
                <CeldaTexto etiqueta="Nombre" defaultValue="Nombre y apellido" required disabled />
              </Muestra>
              <Muestra estado="Con ayuda">
                <CeldaTexto
                  etiqueta="Correo"
                  type="email"
                  placeholder="nombre@empresa.pe"
                  required
                  ayuda="Solo para responder esta solicitud."
                />
              </Muestra>
              <Muestra estado="Lista">
                <CeldaLista etiqueta="Servicio" defaultValue="" required>
                  <option value="" disabled>
                    Elegí un servicio
                  </option>
                  {servicios.map((servicio) => (
                    <option key={servicio.slug} value={servicio.slug}>
                      {servicio.nombre}
                    </option>
                  ))}
                </CeldaLista>
              </Muestra>
              <Muestra estado="Lista deshabilitada">
                <CeldaLista etiqueta="Servicio" defaultValue="" required disabled>
                  <option value="">Elegí un servicio</option>
                </CeldaLista>
              </Muestra>
              <Muestra estado="Área" className="sm:col-span-2">
                <CeldaArea
                  etiqueta="Mensaje"
                  placeholder="Contanos qué necesitás y para cuándo"
                  required
                />
              </Muestra>
              <Muestra estado="Área con error">
                <CeldaArea
                  etiqueta="Mensaje"
                  required
                  error="El mensaje está vacío. Escribí al menos qué servicio necesitás."
                />
              </Muestra>
            </div>
          </Seccion>

          {/* ── Línea de tiempo normativa ────────────────────────── */}
          <Seccion
            titulo="Línea de tiempo normativa"
            bajada="Lo que registra la tarjeta de inspección de un extintor. Horizontal en escritorio; en móvil baja por el costado."
          >
            <RitmoNormativo marcas={ritmoNormativo} norma={NORMA_EXTINTORES} />
          </Seccion>

          {/* ── Ruta de detalle ──────────────────────────────────── */}
          <Seccion
            titulo="Ruta de detalle"
            bajada="La referencia cruzada de una lámina haciendo de migas de pan. El último tramo es la página actual y no es un enlace."
          >
            <RutaDetalle
              tramos={[
                { etiqueta: 'Red general', href: '/' },
                { etiqueta: 'Detalle 03', href: '/servicios/' },
                { etiqueta: 'Extintores' },
              ]}
            />
          </Seccion>

          {/* ── Elementos globales ───────────────────────────────── */}
          <Seccion
            titulo="Header, menú, pie y WhatsApp"
            bajada="El header y el botón de WhatsApp de esta hoja son los reales: desplazá la página y el header se compacta y recibe la única sombra del sitio. El pie está al final. Abajo, el panel del menú móvil montado suelto."
          >
            <Muestra
              estado="Menú móvil, con «Servicios» como ruta activa"
              className="max-w-[360px]"
            >
              <div className="rule-line bg-paper">
                <MenuMovil ruta="/servicios/" />
              </div>
            </Muestra>
          </Seccion>

          {/* ── Superficies del navegador ────────────────────────── */}
          <Seccion
            titulo="Superficies del navegador"
            bajada="Lo que no se dibuja también carga el diseño. Seleccioná este párrafo, escribí en un campo para ver el cursor en cobre, y recorré la hoja con el tabulador: el anillo de foco es siempre el mismo."
          >
            <div className="grid gap-8 lg:grid-cols-2">
              <Muestra estado="Barra de desplazamiento: pulgar en tinta, canal en papel">
                <div className="rule-line h-36 overflow-y-scroll bg-paper p-4">
                  <ul className="text-[15px] leading-loose text-ink-900">
                    {servicios.map((servicio) => (
                      <li key={servicio.slug}>
                        <span className="datum mr-3">{servicio.n}</span>
                        {servicio.nombre}
                      </li>
                    ))}
                  </ul>
                </div>
              </Muestra>
              <Muestra estado="Subrayado fino y despegado de la línea base">
                <p className="medida text-ink-900">
                  Un enlace dentro de un párrafo, como el de la{' '}
                  <a href="#contraste" className="underline">
                    tabla de contraste
                  </a>
                  , lleva el subrayado a 1 px y separado del texto para no cortar las descendentes.
                </p>
              </Muestra>
            </div>
          </Seccion>

          {/* ── Contraste ────────────────────────────────────────── */}
          <Seccion
            titulo="Contraste medido"
            bajada="Cada par de tinta y fondo que el sistema usa, calculado con la fórmula de WCAG sobre los valores de los tokens. El mínimo es 4,5 para texto y 3 para trazos y símbolos."
          >
            <div id="contraste" className="overflow-x-auto">
              <table className="w-full min-w-[40rem] bg-paper text-[14px]">
                <thead>
                  <tr>
                    {['Tinta', 'Fondo', 'Uso', 'Mínimo', 'Medido'].map((columna) => (
                      <th
                        key={columna}
                        scope="col"
                        className="rule-b-line px-3 py-2.5 text-left text-[13px] font-bold text-ink-900 last:text-right"
                      >
                        {columna}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PARES.map((par) => {
                    const medido = contraste(HEX[par.tinta], HEX[par.fondo])
                    return (
                      <tr key={`${par.tinta}-${par.fondo}-${par.uso}`} className="rule-b-hair">
                        <td className="datum px-3 py-2.5 text-[13px]">{par.tinta}</td>
                        <td className="datum px-3 py-2.5 text-[13px]">{par.fondo}</td>
                        <td className="px-3 py-2.5 text-ink-600">{par.uso}</td>
                        <td className="datum px-3 py-2.5 text-[13px] text-ink-600">
                          {decimal(par.minimo)}
                        </td>
                        <td className="datum px-3 py-2.5 text-right text-[13px] font-bold">
                          {decimal(medido)} {medido >= par.minimo ? 'pasa' : 'no pasa'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p className="medida mt-5 text-[14px] leading-snug text-ink-600">
              Fuera de la tabla a propósito: <span className="datum">ink-300</span> mide{' '}
              <span className="datum">{decimal(contraste(HEX['ink-300'], HEX.paper))}</span> sobre
              papel. Es color de trazo —retícula, filetes de 0,5 px y el contorno discontinuo de un
              control deshabilitado— y nunca lleva texto.
            </p>
          </Seccion>
        </div>
      </main>

      <Pie />
      <BotonWhatsApp />
    </>
  )
}
