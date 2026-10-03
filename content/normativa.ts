/**
 * El ritmo normativo de un extintor. Fuente: docs/scope_1.md §4.1 punto 7.
 *
 * Son las tres marcas que registra la tarjeta de inspección. El alcance fija
 * solo el nombre y la periodicidad de cada una, así que `detalle` queda en
 * `null` hasta que el cliente entregue el texto: explicar qué se revisa en cada
 * visita es una afirmación técnica, y sin respaldo no se publica.
 */

export type MarcaNormativa = {
  /** Periodicidad en palabras, como la diría el cliente. */
  readonly periodo: string
  /** La misma periodicidad como medición, para la cota en mono. */
  readonly intervalo: string
  readonly nombre: string
  readonly detalle: string | null
}

export const ritmoNormativo: readonly MarcaNormativa[] = [
  { periodo: 'Cada mes', intervalo: '1 mes', nombre: 'Inspección', detalle: null },
  { periodo: 'Cada año', intervalo: '12 meses', nombre: 'Recarga', detalle: null },
  {
    periodo: 'Cada 5 años',
    intervalo: '60 meses',
    nombre: 'Prueba hidrostática',
    detalle: null,
  },
] as const

/** La norma documentada para la línea de extintores (content/red.ts, ramal 03). */
export const NORMA_EXTINTORES = 'NTP 350.043 · NFPA 10'
