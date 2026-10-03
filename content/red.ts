/**
 * Topología de la red contra incendio: la lámina as-built del sitio.
 *
 * Este archivo es la ÚNICA fuente de la geometría. El componente `Lamina` solo
 * la dibuja. Mover un ramal es editar un número acá, no tocar el renderizador.
 *
 * Mundo visual: docs/scope_1.md §6.1 · contrato: .impeccable/surfaces/app-page-tsx.md
 *
 * Dos configuraciones, no dos dibujos:
 *  - `ancha`  isometría de red, para escritorio
 *  - `alta`   diagrama de montante, para móvil
 *
 * En móvil el dibujo NO se encoge: cambia de artefacto. Un diagrama de montante
 * es otro documento real del mismo oficio —el contrato lo nombra en su linaje—
 * y es vertical por naturaleza, así que cabe en una pantalla angosta sin perder
 * legibilidad. Encoger la isometría a 360 px la volvería ilegible.
 */

import { cajaDe2D, proyectar, type Punto2D, type Punto3D } from '@/lib/iso'
import {
  colocarAlCostado,
  colocarDebajo,
  type EntradaRotulo,
  type Obstaculo,
  type RotuloColocado,
} from '@/lib/rotulos'

/* ════════════════════════════════════════════════════════════════
   TIPOS
   ════════════════════════════════════════════════════════════════ */

/** Los símbolos normados dibujados en `components/plan/simbolos.tsx`. */
export type SimboloId =
  | 'detector'
  | 'hidrante'
  | 'extintor'
  | 'llama'
  | 'camion'
  | 'gabinete'
  | 'camara'
  | 'casco'
  | 'bomba'
  | 'valvula'

/** Las tres tintas que puede tomar un trazo. Nada más. */
export type Tinta = 'ink-300' | 'ink-600' | 'ink-900' | 'fire' | 'teal'

/** Los tres grosores del sistema (§6.6). No existe un cuarto. */
export type Peso = 'hair' | 'line' | 'bold'

/** Una configuración de layout. */
export type Layout = 'ancha' | 'alta'

/** Un servicio de la empresa, que en la lámina es un ramal de la red. */
export type Servicio = {
  /** Número de detalle, como en una lámina real. */
  readonly n: string
  readonly slug: string
  /** Nombre para la leyenda y para la página de servicio. */
  readonly nombre: string
  /**
   * Nombre para la rotulación dentro del dibujo, donde el ancho es escaso.
   * La leyenda lleva el nombre completo; acá va lo que quepa sin encimarse.
   */
  readonly nombreCorto: string
  readonly simbolo: SimboloId
  /**
   * Código de norma específico. `null` cuando no está confirmado por el
   * cliente: se renderiza la referencia genérica «NFPA · NTP» en su lugar.
   * Atribuir un número de norma a un servicio es una afirmación técnica, y la
   * regla del proyecto es que nada se publica sin respaldo.
   */
  readonly norma: string | null
  readonly tinta: Tinta
}

/** Un tramo de tubería ya posicionado y listo para dibujar. */
export type Tubo = {
  /** Identificador único y estable. La Fase 6 interpola el `stroke` por acá. */
  readonly id: string
  readonly puntos: readonly Punto3D[]
  readonly peso: Peso
  readonly tinta: Tinta
  /** Slug del servicio al que pertenece, o `null` si es tronco. */
  readonly ramal: string | null
}

/** Un terminal: dónde va el símbolo con su llamada numerada. */
export type Terminal = {
  readonly servicio: Servicio
  readonly punto: Punto3D
}

export type Red = {
  readonly layout: Layout
  readonly tubos: readonly Tubo[]
  readonly terminales: readonly Terminal[]
  /** Rótulos ya resueltos para que no se encimen. Ver `lib/rotulos.ts`. */
  readonly rotulos: readonly RotuloColocado[]
  readonly bomba: Punto3D
  readonly valvula: Punto3D
  readonly unidad: number
  /**
   * La caja del dibujo. Se expone completa —no solo la cadena `viewBox`—
   * porque la capa HTML de rotulos y simbolos necesita `x` e `y` para
   * convertir coordenadas proyectadas en porcentajes.
   */
  readonly vb: {
    readonly x: number
    readonly y: number
    readonly ancho: number
    readonly alto: number
    readonly viewBox: string
  }
}

/* ════════════════════════════════════════════════════════════════
   LOS 8 SERVICIOS — el orden es el de docs/scope_1.md §3.3
   ════════════════════════════════════════════════════════════════ */

/**
 * El ramal 03 es el único en rojo, y es un enlace.
 *
 * Razón: todo el sitio es protección contra incendios, así que pintar de rojo
 * «lo que es contra incendios» pintaría todo y destruiría la reserva. El rojo
 * marca en cambio la entrada de la audiencia primaria —el dueño de planta en
 * Arequipa que entra a resolver una recarga vencida— y ese es su único uso en
 * el dibujo. El otro uso del rojo en el sitio es la acción principal.
 *
 * El ramal 02 va en verde agua porque es la red húmeda, tomado de la gota del
 * logo: es una distinción de fluido, que en un plano real también se codifica
 * por color.
 */
export const servicios: readonly Servicio[] = [
  {
    n: '01',
    slug: 'deteccion-de-incendios',
    nombre: 'Detección de incendios',
    nombreCorto: 'Detección',
    simbolo: 'detector',
    norma: null,
    tinta: 'ink-600',
  },
  {
    n: '02',
    slug: 'redes-de-agua-contra-incendio',
    nombre: 'Redes de agua',
    nombreCorto: 'Redes de agua',
    simbolo: 'hidrante',
    norma: null,
    tinta: 'teal',
  },
  {
    n: '03',
    slug: 'extintores-inspeccion-y-recarga',
    nombre: 'Extintores',
    nombreCorto: 'Extintores',
    simbolo: 'extintor',
    norma: 'NTP 350.043 · NFPA 10',
    tinta: 'fire',
  },
  {
    n: '04',
    slug: 'capacitacion-contra-incendios',
    nombre: 'Capacitación',
    nombreCorto: 'Capacitación',
    simbolo: 'llama',
    norma: null,
    tinta: 'ink-600',
  },
  {
    n: '05',
    slug: 'supresion-equipos-pesados',
    nombre: 'Supresión vehicular',
    nombreCorto: 'Supresión',
    simbolo: 'camion',
    norma: null,
    tinta: 'ink-600',
  },
  {
    n: '06',
    slug: 'venta-de-extintores',
    nombre: 'Venta de extintores',
    nombreCorto: 'Venta',
    simbolo: 'gabinete',
    norma: 'NTP 350.043',
    tinta: 'ink-600',
  },
  {
    n: '07',
    slug: 'camaras-de-seguridad',
    nombre: 'Cámaras de seguridad',
    nombreCorto: 'Cámaras',
    simbolo: 'camara',
    norma: null,
    tinta: 'ink-600',
  },
  {
    n: '08',
    slug: 'seguridad-industrial-y-epp',
    nombre: 'Seguridad industrial y EPP',
    nombreCorto: 'EPP',
    simbolo: 'casco',
    norma: null,
    tinta: 'ink-600',
  },
] as const

/** Referencia normativa genérica, la única documentada para todo el alcance. */
export const NORMA_GENERICA = 'NFPA · NTP'

/**
 * Lado del símbolo de un terminal, en unidades del dibujo. El ramal en rojo va
 * más grande porque es la entrada de la audiencia primaria.
 *
 * Vive acá y no en el componente porque el cálculo de rótulos lo necesita: el
 * aire del rótulo se mide desde el borde del símbolo.
 */
export const LADO_TERMINAL = { normal: 32, destacado: 40 } as const

/* ════════════════════════════════════════════════════════════════
   GEOMETRÍA POR LAYOUT
   ════════════════════════════════════════════════════════════════ */

/**
 * Geometría de los ramales de la isometría ancha.
 *
 * Se parametriza por `u`, no por `x`, y esto es la corrección de un error real.
 *
 * En esta proyección la posición horizontal en pantalla depende de `(x - y)`,
 * no de `x`. El primer intento eligió `x` e `y` por separado para dar ritmo de
 * profundidad, y eso canceló la separación horizontal: ramales con `x` muy
 * distinto caían casi en el mismo lugar —medido, las separaciones entre
 * símbolos de 44 px eran de −2,9, +23,6 y +26,5 px, o sea encimados— y el
 * ramal 01 terminaba a la izquierda del montante, montado sobre el tronco.
 *
 * Ahora se elige `u = x - y`, que **es** la posición en pantalla, y se deriva
 * `x = u + y`. Con `u` en paso constante la separación horizontal queda
 * garantizada por construcción: 3 unidades de grilla = 88 px entre centros,
 * 56 px libres entre símbolos. El paso también fija el escalón vertical entre
 * terminales vecinos (51 px), que es lo que deja lugar al rótulo de cada uno.
 */
const U_PRIMER_RAMAL = 2.4
const U_PASO = 3.0

/**
 * Profundidad y cota del terminal, **iguales para los ocho ramales**.
 *
 * La primera versión variaba las dos por ramal para dar ritmo, y el resultado
 * se leía desordenado: bajadas de largo distinto, símbolos a alturas sin
 * relación entre sí y rótulos que caían encima del símbolo vecino. En un
 * isométrico de tubería real los ramales de un mismo colector son paralelos y
 * las bajadas iguales; la regularidad es lo que hace legible el dibujo.
 *
 * Iguales, los ocho terminales quedan sobre una recta paralela al colector, y
 * debajo de cada uno hay una franja libre donde entra su rótulo.
 *
 * Los dos valores están atados al anillo (ver `Y_ANILLO`): la bajada tiene que
 * cruzarlo y seguir lo suficiente para que el símbolo y su rótulo queden
 * despejados por debajo. Con estos números el anillo pasa 34 px por encima del
 * borde del símbolo.
 */
const Y_RAMAL = 2.2
const Z_RAMAL = 0.4

/** Geometría derivada de los parámetros de arriba. */
const RAMALES_ANCHA: readonly { u: number; x: number; y: number; z: number }[] = servicios.map(
  (_, i) => {
    const u = U_PRIMER_RAMAL + i * U_PASO
    return { u, x: u + Y_RAMAL, y: Y_RAMAL, z: Z_RAMAL }
  },
)

/**
 * Alcance horizontal de cada ramal en el diagrama de montante, de abajo hacia
 * arriba.
 *
 * Decreciente a propósito, y por dos razones. Una: en un montante real los
 * niveles bajos alimentan más equipo, así que sus ramales son más largos. Dos,
 * geométrica: la separación vertical en pantalla entre dos terminales vale
 * `|Δalcance/2 − paso|`, así que un alcance que **sube** se resta del paso y
 * acerca los símbolos. El primer intento alternaba el alcance y encimaba cuatro
 * pares —medido, 31 px de separación para símbolos que necesitan 32 y 36—.
 * Decreciente, el término siempre suma.
 */
const RAMALES_ALTA: readonly number[] = [3.7, 3.5, 3.3, 3.1, 2.9, 2.7, 2.5, 2.3]

/**
 * Cota del primer ramal. Deja aire para la bomba y la válvula del arranque, que
 * en el diagrama de montante comparten la misma vertical que los ramales.
 */
const Z_PRIMER_RAMAL_ALTA = 2.2

/** Cota de la válvula de arranque. Separada de la bomba lo suficiente. */
const Z_VALVULA_ALTA = 1.1

/** Altura del colector sobre el piso, en la isometría ancha. */
const Z_COLECTOR = 3.4

/**
 * Profundidad del anillo de retorno. Tiene que ser mayor que `Y_RAMAL`: el
 * anillo corre por delante de las bajadas y las cruza a las ocho.
 *
 * El colector se prolonga más allá del último ramal lo justo para que ese cruce
 * también exista (ver `xFinal`). Si se acerca el anillo a `Y_RAMAL`, el cruce
 * sube hacia el codo del ramal; si se aleja, baja hacia el símbolo.
 */
const Y_ANILLO = 4.0

/** Separación vertical entre ramales, en el diagrama de montante. */
const PASO_MONTANTE = 1.45

const UNIDAD = { ancha: 34, alta: 30 } as const
const MARGEN = { ancha: 30, alta: 26 } as const

/**
 * Prepara las entradas del algoritmo de rótulos a partir de los terminales ya
 * construidos. El texto se pasa en mayúsculas desde acá en vez de con
 * `text-transform`, porque el cálculo de ancho tiene que medir exactamente lo
 * que se va a dibujar.
 */
function entradasRotulo(terminales: readonly Terminal[], unidad: number): EntradaRotulo[] {
  return terminales.map(({ servicio, punto }) => {
    const [x, y] = proyectar(punto, unidad)
    return {
      clave: servicio.slug,
      x,
      y,
      lado: servicio.tinta === 'fire' ? LADO_TERMINAL.destacado : LADO_TERMINAL.normal,
      texto: servicio.nombreCorto.toUpperCase(),
      detalle: `${servicio.n} · ${servicio.norma ?? NORMA_GENERICA}`,
    }
  })
}

/** La caja que ocupa cada símbolo: lo que un rótulo ajeno no puede pisar. */
function cajasSimbolo(entradas: readonly EntradaRotulo[]): Obstaculo[] {
  return entradas.map((e) => ({
    clave: e.clave,
    caja: {
      izquierda: e.x - e.lado / 2,
      arriba: e.y - e.lado / 2,
      derecha: e.x + e.lado / 2,
      abajo: e.y + e.lado / 2,
    },
  }))
}

/** Esquinas de las cajas de rótulo, para que el `viewBox` las contenga. */
function esquinasRotulos(rotulos: readonly RotuloColocado[]): Punto2D[] {
  return rotulos.flatMap((r) => [
    [r.caja.izquierda, r.caja.arriba] as Punto2D,
    [r.caja.derecha, r.caja.abajo] as Punto2D,
  ])
}

/**
 * Construye la red para un layout.
 *
 * Es una función pura: mismas entradas, misma salida. El `viewBox` se calcula
 * desde la geometría real, así que mover un ramal no obliga a reajustarlo a ojo.
 *
 * @param layout    isometría ancha o diagrama de montante
 * @param instancia prefijo de los `id` de segmento. Dos láminas en la misma
 *   página necesitan instancias distintas: un `id` duplicado es HTML inválido y
 *   `getElementById` devuelve solo el primero, lo que rompería la animación de
 *   la Fase 6. El valor por omisión alcanza para una sola lámina por página.
 */
export function construirRed(layout: Layout, instancia = 'red'): Red {
  const prefijo = `${instancia}-${layout === 'ancha' ? 'a' : 'm'}`
  const unidad = UNIDAD[layout]
  const tubos: Tubo[] = []
  const terminales: Terminal[] = []

  if (layout === 'ancha') {
    // Derivado: el colector llega más allá del último ramal lo suficiente para
    // que el anillo, al volver, cruce también esa bajada.
    const xFinal = Math.max(...RAMALES_ANCHA.map((g) => g.x)) + (Y_ANILLO - Y_RAMAL) + 0.6

    // Montante: sube desde la sala de bombas hasta el colector.
    tubos.push({
      id: `${prefijo}-tronco-montante`,
      puntos: [
        [0, 0, 0],
        [0, 0, Z_COLECTOR],
      ],
      peso: 'bold',
      tinta: 'ink-900',
      ramal: null,
    })

    // Colector principal: de él cuelgan los ocho ramales.
    tubos.push({
      id: `${prefijo}-tronco-colector`,
      puntos: [
        [0, 0, Z_COLECTOR],
        [xFinal, 0, Z_COLECTOR],
      ],
      peso: 'bold',
      tinta: 'ink-900',
      ramal: null,
    })

    /**
     * Anillo de retorno: cierra la malla desde el extremo del colector y vuelve
     * al montante.
     *
     * No es adorno. Las redes de agua contra incendio se diseñan en anillo
     * porque una malla cerrada mantiene el servicio si un tramo queda fuera, y
     * es la práctica que recomienda NFPA. Además es lo que convierte el dibujo
     * en una red: sin el anillo, ocho ramales colgando de un colector recto no
     * se cruzan con nada y la lámina se lee como un peine.
     *
     * Al correr por delante (y mayor), su halo interrumpe la línea de cada
     * ramal que cruza — la oclusión de la tarea 1.8.
     */
    tubos.push({
      id: `${prefijo}-tronco-anillo`,
      puntos: [
        [xFinal, 0, Z_COLECTOR],
        [xFinal, Y_ANILLO, Z_COLECTOR],
        [0, Y_ANILLO, Z_COLECTOR],
        [0, 0, Z_COLECTOR],
      ],
      peso: 'line',
      tinta: 'ink-900',
      ramal: null,
    })

    servicios.forEach((servicio, i) => {
      const g = RAMALES_ANCHA[i]
      if (!g) return

      tubos.push({
        id: `${prefijo}-${servicio.n}`,
        puntos: [
          [g.x, 0, Z_COLECTOR],
          [g.x, g.y, Z_COLECTOR],
          [g.x, g.y, g.z],
        ],
        peso: servicio.tinta === 'fire' ? 'bold' : 'line',
        tinta: servicio.tinta,
        ramal: servicio.slug,
      })

      // Sin línea auxiliar al piso. La primera versión bajaba una cota desde
      // cada terminal hasta z=0, y esas líneas atravesaban la rotulación: son
      // las verticales tenues que cruzaban los textos. La red ya se entiende
      // porque cada ramal nace visiblemente del colector.

      terminales.push({ servicio, punto: [g.x, g.y, g.z] })
    })

    const entradas = entradasRotulo(terminales, unidad)
    const rotulos = colocarDebajo(entradas, cajasSimbolo(entradas))
    const puntos2D: Punto2D[] = [
      ...tubos.flatMap((t) => t.puntos.map((p) => proyectar(p, unidad))),
      ...esquinasRotulos(rotulos),
    ]

    return {
      layout,
      tubos: ordenarPorProfundidad(tubos),
      terminales,
      rotulos,
      bomba: [0, 0, 0],
      valvula: [0, 0, Z_COLECTOR * 0.58],
      unidad,
      vb: cajaDe2D(puntos2D, MARGEN.ancha),
    }
  }

  /* ── Diagrama de montante ─────────────────────────────────────
     El montante es vertical puro (solo cambia z), así que en pantalla
     cae recto. Los ramales salen en +x y bajan a 30°.               */
  const zTope = Z_PRIMER_RAMAL_ALTA + PASO_MONTANTE * (servicios.length - 1) + 1.1

  tubos.push({
    id: `${prefijo}-tronco-montante`,
    puntos: [
      [0, 0, 0],
      [0, 0, zTope],
    ],
    peso: 'bold',
    tinta: 'ink-900',
    ramal: null,
  })

  servicios.forEach((servicio, i) => {
    const alcance = RAMALES_ALTA[i]
    if (alcance === undefined) return

    const z = Z_PRIMER_RAMAL_ALTA + PASO_MONTANTE * i

    tubos.push({
      id: `${prefijo}-${servicio.n}`,
      puntos: [
        [0, 0, z],
        [alcance, 0, z],
      ],
      peso: servicio.tinta === 'fire' ? 'bold' : 'line',
      tinta: servicio.tinta,
      ramal: servicio.slug,
    })

    terminales.push({ servicio, punto: [alcance, 0, z] })
  })

  const rotulos = colocarAlCostado(entradasRotulo(terminales, unidad))
  const puntos2D: Punto2D[] = [
    ...tubos.flatMap((t) => t.puntos.map((p) => proyectar(p, unidad))),
    ...esquinasRotulos(rotulos),
  ]

  return {
    layout,
    tubos: ordenarPorProfundidad(tubos),
    terminales,
    rotulos,
    bomba: [0, 0, 0],
    valvula: [0, 0, Z_VALVULA_ALTA],
    unidad,
    vb: cajaDe2D(puntos2D, MARGEN.alta),
  }
}

/**
 * Ordena los tubos de atrás hacia adelante.
 *
 * Es lo que permite la oclusión de la tarea 1.8: dibujados en este orden, cada
 * tubo tapa con su halo de color papel a los que quedaron detrás, así que el
 * elemento del frente interrumpe la línea del de atrás — como en un plano real.
 *
 * El criterio es la profundidad `y`, no `x + y`. En pantalla dos tubos se cruzan
 * donde coincide su `x − y`, y ahí el de mayor `y` es siempre el más cercano al
 * observador. Con `x + y` promedio los últimos ramales —de `x` grande— quedaban
 * por delante del anillo y lo interrumpían, al revés que los primeros.
 */
function ordenarPorProfundidad(tubos: readonly Tubo[]): readonly Tubo[] {
  return [...tubos].sort((a, b) => profundidadMedia(a) - profundidadMedia(b))
}

function profundidadMedia(tubo: Tubo): number {
  if (tubo.puntos.length === 0) return 0
  const suma = tubo.puntos.reduce((acc, [, y]) => acc + y, 0)
  return suma / tubo.puntos.length
}
