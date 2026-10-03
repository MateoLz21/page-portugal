/**
 * Sello de revisión: marco en cobre con número de revisión y fecha (§6.5).
 *
 * Marca contenido fechado —proyectos, actualizaciones de catálogo—. Es uno de
 * los dos trabajos del cobre; el otro es el anillo de foco.
 *
 * El cobre dibuja el marco y nada más. Como color de texto da 3,5:1 sobre papel
 * y no pasa AA, así que el número y la fecha van en tinta.
 *
 * Toda marca codifica un hecho real (§6.1): sin fecha no hay sello.
 */

/** `2026-09-26` → `26.09.2026`. Por texto, sin `Date`: no depende del huso. */
export function fechaDeLamina(iso: string): string {
  const [anio, mes, dia] = iso.split('-')
  return `${dia}.${mes}.${anio}`
}

export function SelloRevision({
  revision,
  fecha,
  concepto,
  className = '',
}: {
  /** Número o código de la revisión: «03», «2026». */
  revision: string
  /** Fecha ISO, `aaaa-mm-dd`. `null` = no se dibuja el sello. */
  fecha: string | null
  /** Qué se revisó, en pocas palabras. */
  concepto?: string
  className?: string
}) {
  if (!fecha) return null

  return (
    <div className={`inline-block border-2 border-copper-500 bg-copper-50 p-[3px] ${className}`}>
      <div className="border-[0.5px] border-copper-500 px-3 py-2">
        <p className="lettering text-[12.5px] leading-tight text-ink-900">Rev. {revision}</p>
        <p className="datum mt-1 text-[12.5px] leading-tight text-ink-900">
          <time dateTime={fecha}>{fechaDeLamina(fecha)}</time>
        </p>
        {concepto ? (
          <p className="mt-1 text-[12.5px] leading-snug text-ink-600">{concepto}</p>
        ) : null}
      </div>
    </div>
  )
}
