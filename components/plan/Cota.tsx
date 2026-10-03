import type { ReactNode } from 'react'

/**
 * Cota: línea de extensión con su valor en mono (§6.5).
 *
 * Para datos de especificación —capacidad, presión, periodicidad—, que es
 * exactamente lo que una cota mide en un plano. El valor interrumpe la línea
 * con su propio fondo: es la misma oclusión que usa la lámina.
 *
 * `<Cotas>` es el `<dl>`; cada `<Cota>` aporta su par `dt`/`dd`.
 */

export function Cotas({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <dl className={`grid gap-x-8 gap-y-5 ${className}`}>{children}</dl>
}

/** Remate de la línea: la línea de extensión y su trazo oblicuo. */
function Remate() {
  return (
    <svg
      width="9"
      height="13"
      viewBox="0 0 9 13"
      className="shrink-0 stroke-ink-600"
      fill="none"
      strokeWidth="1"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4.5 0v13M1 10l7-7" />
    </svg>
  )
}

export function Cota({
  etiqueta,
  valor,
  className = '',
}: {
  /** Qué se mide: «Capacidad», «Presión de prueba». */
  etiqueta: string
  /** La medición con su unidad: «6 kg», «12 meses». */
  valor: string
  className?: string
}) {
  return (
    <div className={`bg-paper ${className}`}>
      <dt className="text-[13px] leading-snug text-ink-600">{etiqueta}</dt>
      <dd className="mt-1.5 flex items-center">
        <Remate />
        <span aria-hidden="true" className="h-px min-w-3 flex-1 bg-ink-600" />
        <span className="datum bg-paper px-2.5 text-[14px] font-medium whitespace-nowrap text-ink-900">
          {valor}
        </span>
        <span aria-hidden="true" className="h-px min-w-3 flex-1 bg-ink-600" />
        <Remate />
      </dd>
    </div>
  )
}
