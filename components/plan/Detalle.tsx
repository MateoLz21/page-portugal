import type { ReactNode } from 'react'

/**
 * Detalle ampliado: el patrón de las páginas de servicio (§6.5).
 *
 * Es un recorte del plano general a mayor escala, con su escala declarada y su
 * propio rótulo. Cada servicio abre con esto y no con un párrafo (§6.1).
 *
 * **La escala manda el cuerpo tipográfico**: en una lámina real la rotulación
 * de un detalle 1:10 es más grande que la de uno 1:50, porque el dibujo lo es.
 * Acá el título del detalle cambia de tamaño con la escala que declara.
 */

export type Escala = '1:10' | '1:20' | '1:50'

const CUERPO: Record<Escala, string> = {
  '1:10': 'text-h3',
  '1:20': 'text-[17px] leading-tight',
  '1:50': 'text-[13.5px] leading-tight',
}

export function Detalle({
  n,
  titulo,
  escala,
  children,
  rotulo,
  className = '',
}: {
  /** Número de detalle, el mismo de la lámina general. */
  n: string
  titulo: string
  escala: Escala
  /** El dibujo. Sin dibujo no hay detalle: el componente no se renderiza. */
  children?: ReactNode
  /** Rótulo propio del detalle, al pie. */
  rotulo?: ReactNode
  className?: string
}) {
  if (!children) return null

  return (
    <figure className={`rule-line bg-paper ${className}`}>
      <div className="plan-grid p-5 sm:p-8">{children}</div>

      <figcaption className="rule-t-line flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-4 py-3">
        <span className={`lettering text-ink-900 ${CUERPO[escala]}`}>
          <span className="datum mr-3 font-bold">{n}</span>
          {titulo}
        </span>
        <span className="datum text-[12.5px] text-ink-600">Esc. {escala}</span>
      </figcaption>

      {rotulo ? <div className="rule-t-line p-3">{rotulo}</div> : null}
    </figure>
  )
}
