import { construirRed, LADO_TERMINAL, type Layout, type Peso, type Tinta } from '@/content/red'
import { calor, extintorEn, frenteDeChorro, niebla } from '@/lib/intro'
import { proyectar, redondear, trazo } from '@/lib/iso'
import { F_NOMBRE, F_NUMERO } from '@/lib/rotulos'
import { CAJA_SIMBOLO, geometriaSimbolos, trazoSimbolo } from './simbolos'

/**
 * Un fotograma de la intro, renderizado desde la geometría real de la lámina.
 *
 * No es una ilustración del efecto: es el efecto, congelado en un instante. El
 * mismo modelo de calor de `lib/intro.ts` que va a mover la animación de la
 * Fase 6 decide acá el color de cada segmento. Eso hace dos cosas de una vez:
 * el cliente aprueba el storyboard sobre algo fiel, y queda probado que el
 * enfoque es viable antes de comprometerse con él.
 *
 * El calor se aplica con `color-mix()` de CSS sobre los tokens reales, así que
 * la paleta no se duplica en TypeScript y no puede desincronizarse.
 */

const GROSOR: Record<Peso, number> = { hair: 0.5, line: 1, bold: 2 }
const HALO: Record<Peso, number> = { hair: 3, line: 5, bold: 6.5 }

/** Token base de cada tinta, para mezclar contra el rojo del fuego. */
const TOKEN_BASE: Record<Tinta, string> = {
  'ink-300': 'var(--color-ink-300)',
  'ink-600': 'var(--color-ink-600)',
  'ink-900': 'var(--color-ink-900)',
  fire: 'var(--color-fire-600)',
  teal: 'var(--color-teal-600)',
}

/**
 * Color de un trazo según su calor.
 *
 * Interpola en oklab, que mantiene la luminosidad percibida durante la mezcla:
 * en sRGB el paso de azul tinta a rojo fuego pasa por un violeta apagado.
 * Por encima de 0,8 de calor entra el tono de brasa, que es lo que hace que la
 * línea se lea incandescente y no solo roja.
 */
function tintaCaliente(tinta: Tinta, h: number): string {
  if (h <= 0.001) return TOKEN_BASE[tinta]

  const base = TOKEN_BASE[tinta]
  const rojo = `color-mix(in oklab, var(--color-fire-600) ${(h * 100).toFixed(1)}%, ${base})`

  if (h <= 0.8) return rojo
  const brasa = ((h - 0.8) / 0.2) * 55
  return `color-mix(in oklab, #ff8a3d ${brasa.toFixed(1)}%, ${rojo})`
}

/** Punto medio proyectado de un segmento, para consultarle su calor. */
function medio(puntos: readonly (readonly [number, number, number])[], unidad: number) {
  const proyectados = puntos.map((p) => proyectar(p, unidad))
  const sx = proyectados.reduce((a, [x]) => a + x, 0) / proyectados.length
  const sy = proyectados.reduce((a, [, y]) => a + y, 0) / proyectados.length
  return { mx: sx, my: sy }
}

type FotogramaProps = {
  /** Segundos desde el inicio de la intro. */
  t: number
  layout?: Layout
  instancia: string
  className?: string
}

export function Fotograma({ t, layout = 'ancha', instancia, className = '' }: FotogramaProps) {
  const red = construirRed(layout, `${instancia}-f`)
  const vb = red.vb
  const ext = extintorEn(t)
  const frente = frenteDeChorro(t, vb)
  const opacidadNiebla = niebla(t)

  // El extintor entra desde fuera del canto izquierdo hasta un tercio del ancho.
  const extX = vb.x - 60 + ext.avance * (vb.ancho * 0.3 + 60)
  const extY = vb.y + vb.alto * 0.42
  const ladoExt = 64

  return (
    <svg
      viewBox={vb.viewBox}
      className={`block h-auto w-full ${className}`}
      role="img"
      aria-label={`Fotograma de la intro en el segundo ${t.toFixed(1)}`}
    >
      {/* ── La lámina, con cada segmento a su calor ──────────── */}
      {red.tubos.map((tubo) => {
        const d = trazo(tubo.puntos, red.unidad)
        if (d === null) return null
        const { mx, my } = medio(tubo.puntos, red.unidad)
        const h = calor(t, mx, my, vb)

        const comun = {
          d,
          fill: 'none',
          strokeLinecap: 'butt',
          strokeLinejoin: 'miter',
          vectorEffect: 'non-scaling-stroke',
        } as const

        return (
          <g key={tubo.id}>
            <path {...comun} className="stroke-paper" strokeWidth={HALO[tubo.peso]} />
            <path
              {...comun}
              strokeWidth={GROSOR[tubo.peso]}
              style={{ stroke: tintaCaliente(tubo.tinta, h) }}
            />
          </g>
        )
      })}

      {/* ── Símbolos de los terminales, al mismo calor ───────── */}
      {red.terminales.map(({ servicio, punto }) => {
        const [px, py] = proyectar(punto, red.unidad)
        const h = calor(t, px, py, vb)
        const lado = servicio.tinta === 'fire' ? LADO_TERMINAL.destacado : LADO_TERMINAL.normal
        const escala = lado / CAJA_SIMBOLO

        return (
          <g
            key={servicio.slug}
            transform={`translate(${redondear(px - lado / 2)} ${redondear(py - lado / 2)}) scale(${escala})`}
          >
            <g
              {...trazoSimbolo}
              className="stroke-paper"
              strokeWidth={7}
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            >
              {geometriaSimbolos[servicio.simbolo]}
            </g>
            <g
              {...trazoSimbolo}
              vectorEffect="non-scaling-stroke"
              style={{ stroke: tintaCaliente(servicio.tinta, h) }}
            >
              {geometriaSimbolos[servicio.simbolo]}
            </g>
          </g>
        )
      })}

      {/* ── Rotulación: no se quema, solo se atenúa con el humo ─ */}
      {red.rotulos.map((r) => {
        const servicio = red.terminales.find((x) => x.servicio.slug === r.clave)?.servicio
        if (!servicio) return null
        const halo = {
          paintOrder: 'stroke' as const,
          stroke: 'var(--color-paper)',
          strokeWidth: 4,
          strokeLinejoin: 'round' as const,
          vectorEffect: 'non-scaling-stroke' as const,
        }
        return (
          <g key={r.clave} opacity={1 - opacidadNiebla * 0.7}>
            <text
              x={r.x}
              y={redondear(r.y)}
              textAnchor={layout === 'ancha' ? 'middle' : 'start'}
              className="datum fill-ink-600"
              fontSize={F_NUMERO}
              {...halo}
            >
              {servicio.n}
            </text>
            <text
              x={r.x}
              y={redondear(r.y + 15)}
              textAnchor={layout === 'ancha' ? 'middle' : 'start'}
              className="lettering fill-ink-900"
              fontSize={F_NOMBRE}
              {...halo}
            >
              {servicio.nombreCorto.toUpperCase()}
            </text>
          </g>
        )
      })}

      {/* ── El chorro: abanico de partículas desde la boquilla ─ */}
      {ext.descargando && frente !== null ? (
        <g opacity={0.9}>
          {Array.from({ length: 26 }, (_, i) => {
            // Reparto determinista: el fotograma tiene que ser reproducible.
            const f = i / 25
            const desde = extX + ladoExt * 0.85
            const abanico = (f - 0.5) * vb.alto * 0.5
            const largo = 0.25 + ((i * 37) % 100) / 140
            return (
              <line
                key={i}
                x1={redondear(desde)}
                y1={redondear(extY + abanico * 0.28)}
                x2={redondear(desde + (frente - desde) * largo)}
                y2={redondear(extY + abanico)}
                className="stroke-paper"
                strokeWidth={((i * 17) % 3) + 1}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                opacity={0.35 + (((i * 23) % 60) / 100) * 0.6}
              />
            )
          })}
          {/* Frente del barrido: donde el plano vuelve a su azul frío. */}
          <line
            x1={redondear(frente)}
            y1={vb.y}
            x2={redondear(frente)}
            y2={vb.y + vb.alto}
            className="stroke-paper"
            strokeWidth={10}
            opacity={0.5}
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ) : null}

      {/* ── El extintor, en el mismo hairline que la lámina ──── */}
      {ext.visible ? (
        <g
          transform={`translate(${redondear(extX)} ${redondear(extY - ladoExt / 2)}) rotate(${ext.inclinacion} ${ladoExt / 2} ${ladoExt / 2}) scale(${ladoExt / CAJA_SIMBOLO})`}
        >
          <g
            {...trazoSimbolo}
            className="stroke-paper"
            strokeWidth={8}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          >
            {geometriaSimbolos.extintor}
          </g>
          <g
            {...trazoSimbolo}
            className="stroke-fire-600"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          >
            {geometriaSimbolos.extintor}
          </g>
        </g>
      ) : null}

      {/* ── Niebla: cubre y se disipa revelando la lámina limpia ─ */}
      {opacidadNiebla > 0 ? (
        <rect
          x={vb.x}
          y={vb.y}
          width={vb.ancho}
          height={vb.alto}
          fill="var(--color-paper)"
          opacity={opacidadNiebla}
        />
      ) : null}
    </svg>
  )
}
