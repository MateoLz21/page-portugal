import Link from 'next/link'
import {
  construirRed,
  NORMA_GENERICA,
  servicios,
  type Layout,
  type Peso,
  type Red,
  type SimboloId,
  type Terminal,
  type Tinta,
  LADO_TERMINAL,
} from '@/content/red'
import { proyectar, redondear, trazo, trazoRecortado, type Punto3D } from '@/lib/iso'
import { F_NOMBRE, F_NUMERO, type RotuloColocado } from '@/lib/rotulos'
import { CAJA_SIMBOLO, geometriaSimbolos, Simbolo, trazoSimbolo } from './simbolos'

/**
 * La lámina as-built: el activo del que cuelga todo el mundo visual.
 *
 * Reparto de medios, y el criterio es qué escala y qué no:
 *
 *  - **SVG**: toda la geometría — tubería y símbolos. Escala con el contenedor,
 *    así que el dibujo mantiene sus proporciones a cualquier ancho, mientras el
 *    grosor de línea queda fijo por `vectorEffect="non-scaling-stroke"`. Es lo
 *    que la Fase 6 va a animar, así que cada tubo lleva su `id` estable.
 *  - **Leyenda en HTML**: el cuadro que traduce cada número, con el nombre
 *    completo y la norma. Es texto de la página, con su escala tipográfica.
 *
 * Los rótulos del dibujo van dentro del SVG, no en HTML, y es una decisión
 * medida: con tamaño fijo en px la colisión dependería del ancho del viewport
 * —a 768 px los terminales quedan a 75 px y a 1440 px a 140 px, y el texto no
 * cambia—, así que no habría forma de resolverla en tiempo de compilación.
 * Dentro del SVG todo escala junto y `lib/rotulos.ts` lo resuelve una vez.
 *
 * La profundidad sale del grosor de línea y de la oclusión, nunca de una sombra.
 */

/* ════════════════════════════════════════════════════════════════
   MAPEO A LOS TOKENS
   ════════════════════════════════════════════════════════════════ */

/**
 * Los tres grosores de §6.6, en píxeles de pantalla.
 *
 * Funcionan porque cada trazo lleva `vectorEffect="non-scaling-stroke"`: el
 * grosor es una propiedad del dibujo, no del zoom, así que una línea de 1 px se
 * ve de 1 px a 360 y a 1440. Es como se comporta una lámina real.
 */
const GROSOR: Record<Peso, number> = { hair: 0.5, line: 1, bold: 2 }

/**
 * Ancho del halo que interrumpe lo que quedó detrás (tarea 1.8).
 * Ajustado por peso: un halo uniforme se comería las líneas finas.
 */
const HALO: Record<Peso, number> = { hair: 3, line: 5, bold: 6.5 }

/**
 * Cuánto se acorta el halo en cada extremo del tubo, para no morder la línea a
 * la que se une. Ver `trazoRecortado`.
 */
const RECORTE_HALO = 7

/** Halo de los símbolos, para que interrumpan el tubo que llega a ellos. */
const HALO_SIMBOLO = 7

const TRAZO_TINTA: Record<Tinta, string> = {
  'ink-300': 'stroke-ink-300',
  'ink-600': 'stroke-ink-600',
  'ink-900': 'stroke-ink-900',
  fire: 'stroke-fire-600',
  teal: 'stroke-teal-600',
}

const TEXTO_TINTA: Record<Tinta, string> = {
  'ink-300': 'text-ink-300',
  'ink-600': 'text-ink-600',
  'ink-900': 'text-ink-900',
  fire: 'text-fire-600',
  teal: 'text-teal-600',
}

/* ════════════════════════════════════════════════════════════════
   SUBCOMPONENTES DEL SVG
   ════════════════════════════════════════════════════════════════ */

/**
 * Un tramo de tubería: halo primero, trazo después.
 *
 * Los tubos llegan ordenados de atrás hacia adelante, así que el halo de este
 * tapa el trazo de los anteriores y el cruce se lee como en un plano.
 */
function Tubo({ tubo, unidad }: { tubo: Red['tubos'][number]; unidad: number }) {
  const d = trazo(tubo.puntos, unidad)
  const dHalo = trazoRecortado(tubo.puntos, unidad, RECORTE_HALO)
  if (d === null || dHalo === null) return null

  const comun = {
    fill: 'none',
    strokeLinejoin: 'miter',
    vectorEffect: 'non-scaling-stroke',
  } as const

  return (
    <g>
      <path
        {...comun}
        d={dHalo}
        strokeLinecap="butt"
        className="stroke-paper"
        strokeWidth={HALO[tubo.peso]}
      />
      {/* Punta cuadrada: cierra la esquina donde dos tubos se unen en ángulo,
          que con punta a tope queda con una muesca. */}
      <path
        {...comun}
        d={d}
        strokeLinecap="square"
        id={tubo.id}
        data-seg={tubo.id}
        data-ramal={tubo.ramal ?? 'tronco'}
        data-peso={tubo.peso}
        className={TRAZO_TINTA[tubo.tinta]}
        strokeWidth={GROSOR[tubo.peso]}
      />
    </g>
  )
}

/**
 * Un símbolo dentro del dibujo, con su halo.
 *
 * El halo es lo que hace que el equipo interrumpa el tubo que llega a él, en vez
 * de quedar el tubo cruzándolo por encima.
 */
function SimboloEnPlano({
  punto,
  red,
  simbolo,
  lado,
  className,
}: {
  punto: Punto3D
  red: Red
  simbolo: SimboloId
  lado: number
  className: string
}) {
  const [px, py] = proyectar(punto, red.unidad)
  const escala = lado / CAJA_SIMBOLO
  const tx = redondear(px - lado / 2)
  const ty = redondear(py - lado / 2)

  return (
    <g transform={`translate(${tx} ${ty}) scale(${escala})`}>
      <g
        {...trazoSimbolo}
        className="stroke-paper"
        strokeWidth={HALO_SIMBOLO}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        {geometriaSimbolos[simbolo]}
      </g>
      <g {...trazoSimbolo} className={className} vectorEffect="non-scaling-stroke">
        {geometriaSimbolos[simbolo]}
      </g>
    </g>
  )
}

/* ════════════════════════════════════════════════════════════════
   TERMINAL: SÍMBOLO + ROTULACIÓN, TODO EN EL SVG
   ════════════════════════════════════════════════════════════════ */

const RELLENO_TINTA: Record<Tinta, string> = {
  'ink-300': 'fill-ink-300',
  'ink-600': 'fill-ink-600',
  'ink-900': 'fill-ink-900',
  fire: 'fill-fire-600',
  teal: 'fill-teal-600',
}

/** Separación entre la línea del número y la del nombre. */
const INTERLINEA = 15

/**
 * Un terminal completo: el símbolo, su rótulo y el enlace que los abarca.
 *
 * Todo vive en el SVG para que escale junto. El rótulo trae su posición ya
 * resuelta por `lib/rotulos.ts`, que garantiza que no se encime con ningún
 * otro; cuando tuvo que bajar un nivel, se dibuja la línea de referencia que
 * lo conecta con su símbolo — como una llamada de plano real.
 *
 * El texto lleva `paintOrder="stroke"` con un trazo de color papel: es el halo
 * que hace que el rótulo interrumpa la tubería que pase por detrás, en vez de
 * quedar el texto ilegible sobre las líneas.
 */
function TerminalCompleto({
  terminal,
  rotulo,
  red,
  alineacion,
}: {
  terminal: Terminal
  rotulo: RotuloColocado
  red: Red
  alineacion: 'middle' | 'start'
}) {
  const { servicio, punto } = terminal
  const esRojo = servicio.tinta === 'fire'
  const lado = esRojo ? LADO_TERMINAL.destacado : LADO_TERMINAL.normal
  const [, py] = proyectar(punto, red.unidad)

  const haloTexto = {
    paintOrder: 'stroke' as const,
    stroke: 'var(--color-paper)',
    strokeWidth: 4,
    strokeLinejoin: 'round' as const,
    vectorEffect: 'non-scaling-stroke' as const,
  }

  return (
    <Link
      href={`/servicios/${servicio.slug}/`}
      aria-label={`Detalle ${servicio.n} · ${servicio.nombre}`}
    >
      <SimboloEnPlano
        punto={punto}
        red={red}
        simbolo={servicio.simbolo}
        lado={lado}
        className={TEXTO_TINTA[servicio.tinta]}
      />

      {rotulo.referencia ? (
        <line
          x1={redondear(rotulo.referencia.x)}
          y1={redondear(py + lado / 2)}
          x2={redondear(rotulo.referencia.x)}
          y2={redondear(rotulo.referencia.hastaY)}
          className="stroke-ink-300"
          strokeWidth={GROSOR.hair}
          vectorEffect="non-scaling-stroke"
        />
      ) : null}

      <text
        x={redondear(rotulo.x)}
        y={redondear(rotulo.y)}
        textAnchor={alineacion}
        className="datum fill-ink-600"
        fontSize={F_NUMERO}
        {...haloTexto}
      >
        {servicio.n} · {servicio.norma ?? NORMA_GENERICA}
      </text>

      <text
        x={redondear(rotulo.x)}
        y={redondear(rotulo.y + INTERLINEA)}
        textAnchor={alineacion}
        className={`lettering ${esRojo ? RELLENO_TINTA.fire : RELLENO_TINTA['ink-900']}`}
        fontSize={F_NOMBRE}
        {...haloTexto}
      >
        {servicio.nombreCorto.toUpperCase()}
      </text>
    </Link>
  )
}

/* ════════════════════════════════════════════════════════════════
   LÁMINA
   ════════════════════════════════════════════════════════════════ */

type LaminaProps = {
  layout: Layout
  /**
   * Prefijo de los `id` de segmento. Obligatorio cuando la página monta más de
   * una lámina: un `id` duplicado es HTML inválido y dejaría a la Fase 6 sin
   * poder direccionar los segmentos.
   */
  instancia?: string
  className?: string
  /**
   * Texto alternativo del dibujo. La red también se recorre con la leyenda, que
   * es texto real, así que acá basta con resumir el conjunto.
   */
  descripcion?: string
}

export function Lamina({ layout, instancia = 'red', className = '', descripcion }: LaminaProps) {
  const red = construirRed(layout, instancia)

  const texto =
    descripcion ??
    (layout === 'ancha'
      ? 'Isometría de la red contra incendio: montante, colector, anillo de retorno y ocho ramales numerados, uno por línea de servicio.'
      : 'Diagrama de montante: ocho ramales de servicio numerados, derivados de una montante única.')

  const ladoEquipo = layout === 'ancha' ? 34 : 30

  return (
    <div className={`relative ${className}`}>
      <svg viewBox={red.vb.viewBox} className="block h-auto w-full" role="img" aria-label={texto}>
        {red.tubos.map((tubo) => (
          <Tubo key={tubo.id} tubo={tubo} unidad={red.unidad} />
        ))}

        {/* Equipos del tronco: van sobre la tubería que los alimenta. */}
        <SimboloEnPlano
          punto={red.valvula}
          red={red}
          simbolo="valvula"
          lado={ladoEquipo * 0.8}
          className="text-ink-900"
        />
        <SimboloEnPlano
          punto={red.bomba}
          red={red}
          simbolo="bomba"
          lado={ladoEquipo}
          className="text-ink-900"
        />

        {/* Terminales, al final: quedan por delante de todo lo que los alimenta. */}
        {red.terminales.map((terminal) => {
          const rotulo = red.rotulos.find((r) => r.clave === terminal.servicio.slug)
          if (!rotulo) return null
          return (
            <TerminalCompleto
              key={terminal.servicio.slug}
              terminal={terminal}
              rotulo={rotulo}
              red={red}
              alineacion={layout === 'ancha' ? 'middle' : 'start'}
            />
          )
        })}
      </svg>
    </div>
  )
}

/**
 * La lámina en su versión responsive: isometría en escritorio, diagrama de
 * montante en móvil. No es el mismo dibujo encogido — son dos artefactos reales
 * del mismo oficio, y por eso ninguno pierde legibilidad en su ancho.
 */
export function LaminaResponsive({
  instancia = 'red',
  className = '',
}: {
  instancia?: string
  className?: string
}) {
  return (
    <>
      <Lamina layout="alta" instancia={instancia} className={`md:hidden ${className}`} />
      <Lamina layout="ancha" instancia={instancia} className={`hidden md:block ${className}`} />
    </>
  )
}

/**
 * Leyenda de la lámina: el cuadro que traduce cada número de detalle.
 *
 * Es la contraparte obligatoria de las llamadas numeradas, y además da mejores
 * blancos de toque que un símbolo de 32 px dentro del dibujo.
 */
export function Leyenda({ className = '' }: { className?: string }) {
  return (
    <ul className={className}>
      {servicios.map((servicio) => {
        const esRojo = servicio.tinta === 'fire'
        return (
          <li key={servicio.slug} className="rule-b-hair">
            <Link
              href={`/servicios/${servicio.slug}/`}
              className="group flex flex-wrap items-center gap-x-3 gap-y-1 py-2.5"
            >
              <span
                className={`datum w-7 shrink-0 text-[12.5px] font-bold ${
                  esRojo ? 'text-fire-600' : 'text-ink-900'
                }`}
              >
                {servicio.n}
              </span>

              <span
                className={`shrink-0 ${esRojo ? 'text-fire-600' : 'text-ink-900'}`}
                aria-hidden="true"
              >
                <Simbolo id={servicio.simbolo} tamano={26} decorativo />
              </span>

              <span
                className={`lettering text-[12.5px] group-hover:underline ${
                  esRojo ? 'text-fire-600' : 'text-ink-900'
                }`}
                style={{ textUnderlineOffset: '3px' }}
              >
                {servicio.nombre}
              </span>

              <span className="datum ml-auto text-[11px] text-ink-600">
                {servicio.norma ?? NORMA_GENERICA}
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
