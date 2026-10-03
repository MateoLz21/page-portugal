import type { MarcaNormativa } from '@/content/normativa'

/**
 * Línea de tiempo normativa: inspección → recarga → hidrostática (§6.5).
 *
 * Es lo que registra la tarjeta de inspección de un extintor, dibujado como una
 * línea con sus marcas. Horizontal en escritorio; en móvil gira y baja por el
 * costado, igual que la lámina pasa de isometría a diagrama de montante.
 *
 * Las marcas van a distancias iguales aunque los intervalos no lo sean, y la
 * línea lo declara: «sin escala», como se anota en un plano cuando pasa eso.
 */
export function RitmoNormativo({
  marcas,
  norma,
  className = '',
}: {
  marcas: readonly MarcaNormativa[]
  /** Norma que fija el ritmo. `null` = no se cita ninguna. */
  norma?: string | null
  className?: string
}) {
  if (marcas.length === 0) return null

  return (
    <div className={`bg-paper ${className}`}>
      <ol className="grid border-l-2 border-ink-900 md:grid-cols-3 md:border-t-2 md:border-l-0">
        {marcas.map((marca) => (
          <li
            key={marca.nombre}
            className="relative py-4 pl-7 before:absolute before:top-7 before:left-0 before:h-0.5 before:w-4 before:bg-ink-900 md:pt-7 md:pr-6 md:pb-0 md:pl-0 md:before:top-0 md:before:h-4 md:before:w-0.5"
          >
            <p className="datum text-[13px] font-medium text-ink-900">{marca.intervalo}</p>
            <p className="lettering mt-1 text-[17px] leading-tight text-ink-900">{marca.nombre}</p>
            <p className="mt-1 text-[14px] leading-snug text-ink-600">{marca.periodo}</p>
            {marca.detalle ? (
              <p className="medida-corta mt-2 text-[14px] leading-snug text-ink-600">
                {marca.detalle}
              </p>
            ) : null}
          </li>
        ))}
      </ol>

      <p className="datum mt-5 text-[12px] text-ink-600">
        {norma ? `${norma} · ` : ''}Línea sin escala
      </p>
    </div>
  )
}
