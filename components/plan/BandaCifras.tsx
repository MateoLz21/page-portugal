/**
 * Banda de cifras: las 4 cifras del inicio con filetes de 1px (§6.5).
 *
 * Sin tarjeta y sin contador animado. Una fila de tarjetas con número grande es
 * el patrón que el alcance rechaza por nombre; esto es una banda tipográfica,
 * que se lee como la tabla de cantidades de una lámina.
 *
 * Sin cifras no hay banda: una lista vacía no renderiza nada.
 */

export type Cifra = { readonly valor: string; readonly etiqueta: string }

export function BandaCifras({
  cifras,
  className = '',
}: {
  cifras: readonly Cifra[]
  className?: string
}) {
  if (cifras.length === 0) return null

  return (
    <dl className={`rule-t-line rule-b-line grid grid-cols-2 bg-paper lg:grid-cols-4 ${className}`}>
      {cifras.map((cifra) => (
        <div
          key={cifra.etiqueta}
          // Filetes interiores: vertical entre columnas, horizontal entre filas
          // cuando la banda se pliega a dos columnas.
          className="flex flex-col-reverse justify-end gap-1 border-ink-600 px-4 py-5 even:border-l lg:border-l lg:first:border-l-0 [&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0"
        >
          <dt className="text-[14px] leading-snug text-ink-600">{cifra.etiqueta}</dt>
          <dd className="lettering text-h2 text-ink-900 tabular-nums">{cifra.valor}</dd>
        </div>
      ))}
    </dl>
  )
}
