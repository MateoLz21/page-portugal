import Link from 'next/link'

/**
 * Ruta de detalle: `RED GENERAL / DETALLE 03 / EXTINTORES`, en mono (§6.5).
 *
 * Es la referencia cruzada de una lámina —de qué plano general sale este
 * detalle— haciendo el trabajo de las migas de pan.
 */

export type TramoRuta = {
  readonly etiqueta: string
  /** Sin `href` es el tramo actual: va último y no es un enlace. */
  readonly href?: string
}

export function RutaDetalle({
  tramos,
  className = '',
}: {
  tramos: readonly TramoRuta[]
  className?: string
}) {
  if (tramos.length === 0) return null

  return (
    <nav aria-label="Ruta de detalle" className={className}>
      <ol className="datum flex flex-wrap items-center gap-x-2.5 text-[12.5px] tracking-[0.06em] uppercase">
        {tramos.map((tramo, i) => (
          <li key={tramo.etiqueta} className="flex items-center gap-x-2.5">
            {i > 0 ? (
              <span aria-hidden="true" className="text-ink-600">
                /
              </span>
            ) : null}
            {tramo.href ? (
              <Link
                href={tramo.href}
                className="inline-flex min-h-11 items-center text-ink-600 no-underline sobre:text-ink-900 sobre:underline"
              >
                {tramo.etiqueta}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-ink-900">
                {tramo.etiqueta}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
