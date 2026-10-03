import type { ReactNode } from 'react'
import { empresa } from '@/content/empresa'

/**
 * Cuadro de rótulo: el componente más recurrente del sitio (§6.5).
 *
 * En una lámina real es el cajetín de la esquina: quién dibujó, bajo qué norma,
 * dónde y en qué revisión. Acá cumple el mismo papel — hero, cierre de cada
 * página de servicio y contacto.
 *
 * Regla del proyecto: una celda cuyo valor es `null` **no se dibuja**. El cuadro
 * se achica; nunca muestra un casillero vacío ni un dato inventado.
 */

export type CeldaRotulo = {
  readonly etiqueta: string
  readonly valor: ReactNode | null
  /**
   * Columnas que ocupa, de las 6 de la grilla de escritorio. Por omisión, 2.
   * Por debajo de `lg` la grilla es de 2: las de 4 o más ocupan la fila entera.
   */
  readonly ancho?: 1 | 2 | 3 | 4 | 6
  /** `true` para medición real: RUC, código de norma, fecha, revisión. */
  readonly dato?: boolean
}

const ANCHO: Record<NonNullable<CeldaRotulo['ancho']>, string> = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  4: 'col-span-2 lg:col-span-4',
  6: 'col-span-2 lg:col-span-6',
}

type RotuloProps = {
  celdas: readonly CeldaRotulo[]
  /** Encabezado del cuadro. Si se omite, el cuadro son solo celdas. */
  titulo?: ReactNode
  /** Sello u otra anotación que cuelga del encabezado, a la derecha. */
  anotacion?: ReactNode
  className?: string
}

export function Rotulo({ celdas, titulo, anotacion, className = '' }: RotuloProps) {
  const visibles = celdas.filter((c) => c.valor !== null && c.valor !== '')
  if (visibles.length === 0 && !titulo) return null

  return (
    <div className={`rule-bold bg-paper ${className}`}>
      {titulo ? (
        <div className="rule-b-line flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3">
          <p className="lettering text-[17px] leading-tight text-ink-900">{titulo}</p>
          {anotacion}
        </div>
      ) : null}

      {/* El contenedor recorta el filete sobrante de la última fila y columna. */}
      <div className="overflow-hidden">
        <dl className="-mr-px -mb-px grid grid-cols-2 lg:grid-cols-6">
          {visibles.map((celda) => (
            <div
              key={celda.etiqueta}
              className={`rule-r-hair rule-b-hair px-4 py-3 ${ANCHO[celda.ancho ?? 2]}`}
            >
              <dt className="datum text-[11px] tracking-[0.13em] text-ink-600 uppercase">
                {celda.etiqueta}
              </dt>
              <dd
                className={`mt-1 text-[13.5px] leading-snug font-medium text-ink-900 ${
                  celda.dato ? 'datum' : ''
                }`}
              >
                {celda.valor}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

/**
 * Las celdas de la empresa, listas para un rótulo.
 *
 * `norma`, `revision` y `fecha` las aporta cada página porque cambian con el
 * contenido que rotulan. Lo que no se pasa queda en `null` y no se dibuja: toda
 * marca del rótulo codifica un hecho real (§6.1).
 */
export function celdasEmpresa({
  norma = null,
  revision = null,
  fecha = null,
}: {
  norma?: string | null
  revision?: string | null
  fecha?: string | null
} = {}): CeldaRotulo[] {
  return [
    { etiqueta: 'Razón social', valor: empresa.razonSocial, ancho: 4 },
    { etiqueta: 'RUC', valor: empresa.ruc, dato: true },
    { etiqueta: 'Norma', valor: norma, dato: true },
    { etiqueta: 'Ubicación', valor: `${empresa.direccion.ciudad}, ${empresa.direccion.pais}` },
    { etiqueta: 'Revisión', valor: revision, dato: true, ancho: 1 },
    { etiqueta: 'Fecha', valor: fecha, dato: true, ancho: 1 },
  ]
}
