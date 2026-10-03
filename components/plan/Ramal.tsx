import Link from 'next/link'
import { NORMA_GENERICA, type Servicio } from '@/content/red'
import { IconoFlecha } from '@/components/ui/iconos'
import { Simbolo } from './simbolos'

/**
 * Ramal de servicio: reemplaza a la tarjeta de servicio (§6.5).
 *
 * Símbolo normado + número de detalle + título + norma en mono, colgando de la
 * montante. Sin contenedor y sin sombra: ocho tarjetas hermanas no dicen que
 * todo sale de un solo proveedor; una montante con ocho derivaciones, sí.
 *
 * Estados (§6.6): en reposo la derivación mide 1px; al apuntar sube a 2px y
 * aparece la línea de cota que une el nombre con su norma. El ramal en rojo es
 * la entrada de la audiencia primaria y va en 2px siempre.
 */

/** La montante y sus derivaciones. Recibe los servicios de `content/red.ts`. */
export function Ramales({
  servicios,
  className = '',
}: {
  servicios: readonly Servicio[]
  className?: string
}) {
  if (servicios.length === 0) return null

  return (
    <ul className={`relative ${className}`}>
      {/* La montante: una línea dibujada, no un borde del contenedor. Va por
          delante de los ramales, que pintan su propio fondo. */}
      <li aria-hidden="true" className="absolute inset-y-0 left-0 z-10 w-0.5 bg-ink-900" />
      {servicios.map((servicio) => (
        <li key={servicio.slug}>
          <Ramal servicio={servicio} />
        </li>
      ))}
    </ul>
  )
}

export function Ramal({ servicio, ...resto }: { servicio: Servicio; 'data-estado'?: string }) {
  const esRojo = servicio.tinta === 'fire'
  const tinta = esRojo ? 'text-fire-600' : 'text-ink-900'

  return (
    <Link
      {...resto}
      href={`/servicios/${servicio.slug}/`}
      className="group rule-b-hair relative flex min-h-16 flex-wrap items-center gap-x-4 gap-y-1 bg-paper py-3 pr-2 pl-12 no-underline pulsado:bg-paper-alt"
    >
      {/* Derivación: sale de la montante y llega al símbolo. */}
      <span
        aria-hidden="true"
        className={`absolute top-1/2 left-0 w-9 -translate-y-1/2 ${
          esRojo ? 'h-0.5 bg-fire-600' : 'h-px bg-ink-600 group-sobre:h-0.5 group-sobre:bg-ink-900'
        }`}
      />

      <span className={`shrink-0 ${tinta}`}>
        <Simbolo id={servicio.simbolo} tamano={36} decorativo />
      </span>

      <span className={`datum w-7 shrink-0 text-[13px] font-bold ${tinta}`}>{servicio.n}</span>

      <span className={`lettering text-[15px] leading-tight ${tinta}`}>{servicio.nombre}</span>

      {/* La cota: solo aparece al apuntar, y solo donde hay ancho para ella. */}
      <span
        aria-hidden="true"
        className="hidden h-px min-w-8 flex-1 bg-ink-600 opacity-0 group-sobre:opacity-100 group-focus-visible:opacity-100 sm:block"
      />

      {/* La flecha reserva su lugar aunque no se vea: la norma no se corre. */}
      <span className="ml-auto flex shrink-0 items-center gap-3">
        <span className="datum text-[12px] text-ink-600">{servicio.norma ?? NORMA_GENERICA}</span>
        <span
          className={`hidden opacity-0 group-sobre:opacity-100 group-focus-visible:opacity-100 sm:block ${tinta}`}
        >
          <IconoFlecha tamano={20} />
        </span>
      </span>
    </Link>
  )
}
