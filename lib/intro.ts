/**
 * Línea de tiempo de la intro: «el plano se incendia y el extintor lo redibuja».
 *
 * Guion completo en docs/scope_1.md §7.1. Este módulo es el modelo de calor:
 * dado un instante y la posición de un segmento, cuánto está encendido.
 *
 * Funciones puras y sin DOM, así que sirven para tres cosas con un solo cálculo:
 * los fotogramas estáticos del storyboard, la animación de la Fase 6, y una
 * prueba unitaria si hace falta.
 *
 * El calor NO se traduce a hex acá. El componente lo aplica con `color-mix()`
 * de CSS contra los tokens reales, así que la paleta no se duplica en
 * TypeScript y no puede desincronizarse de `globals.css`.
 */

/** Fin del encendido: las líneas terminan de prenderse desde los bordes. */
export const T_ENCENDIDO = 0.8

/** El extintor termina de entrar y apuntar. */
export const T_APUNTADO = 1.4

/** Fin de la descarga: el chorro terminó de barrer. */
export const T_BARRIDO = 2.4

/** Fin de la intro: la lámina queda limpia y fría. */
export const T_FIN = 3.0

/**
 * Cuánto avanza el frente del chorro más allá del ancho del dibujo. Por encima
 * de 1 para que el último segmento alcance a enfriarse antes de `T_BARRIDO`.
 */
const SOBREBARRIDO = 1.15

/** Ancho de la transición del frente, como fracción del ancho del dibujo. */
const DIFUSION_FRENTE = 0.16

/**
 * Cuánto más rápido avanza el encendido que la distancia al borde. Por encima
 * de 1 para que el centro del dibujo también llegue a encenderse.
 */
const VELOCIDAD_ENCENDIDO = 1.6

export type Encuadre = {
  readonly x: number
  readonly y: number
  readonly ancho: number
  readonly alto: number
}

function acotar(n: number): number {
  return n < 0 ? 0 : n > 1 ? 1 : n
}

/**
 * Distancia normalizada al borde más cercano del encuadre: 0 en el borde, 1 en
 * el centro. Es lo que hace que el fuego entre por los cantos, como papel que
 * se prende por la orilla.
 */
export function distanciaAlBorde(mx: number, my: number, vb: Encuadre): number {
  const izq = (mx - vb.x) / vb.ancho
  const der = (vb.x + vb.ancho - mx) / vb.ancho
  const arr = (my - vb.y) / vb.alto
  const aba = (vb.y + vb.alto - my) / vb.alto
  return acotar(Math.min(izq, der, arr, aba) * 2)
}

/**
 * Calor de un segmento en un instante dado, de 0 (frío) a 1 (incandescente).
 *
 * @param t  segundos desde el inicio de la intro
 * @param mx punto medio del segmento, eje horizontal del dibujo
 * @param my punto medio del segmento, eje vertical del dibujo
 */
export function calor(t: number, mx: number, my: number, vb: Encuadre): number {
  if (t <= 0) return 0
  if (t >= T_FIN) return 0

  const d = distanciaAlBorde(mx, my, vb)
  const encendido = acotar((t / T_ENCENDIDO) * VELOCIDAD_ENCENDIDO - d)

  // Antes de la descarga solo importa el encendido.
  if (t < T_APUNTADO) return encendido

  // Durante la descarga, el frente del chorro enfría lo que ya barrió.
  const avance = (t - T_APUNTADO) / (T_BARRIDO - T_APUNTADO)
  const frente = vb.x + acotar(avance) * vb.ancho * SOBREBARRIDO
  const enfriado = acotar((mx - frente) / (vb.ancho * DIFUSION_FRENTE))

  return encendido * enfriado
}

/** Posición del frente del chorro, o `null` si todavía no descarga. */
export function frenteDeChorro(t: number, vb: Encuadre): number | null {
  if (t < T_APUNTADO || t > T_BARRIDO) return null
  const avance = (t - T_APUNTADO) / (T_BARRIDO - T_APUNTADO)
  return vb.x + acotar(avance) * vb.ancho * SOBREBARRIDO
}

/**
 * Estado del extintor en un instante: dónde está, cuánto inclinado y si
 * descarga.
 *
 * Entra desde la izquierda con un rebote corto, se inclina y apunta al centro.
 * `avance` va de 0 (fuera de cuadro) a 1 (en posición).
 */
export function extintorEn(t: number): {
  readonly visible: boolean
  readonly avance: number
  readonly inclinacion: number
  readonly descargando: boolean
} {
  if (t < T_ENCENDIDO) {
    return { visible: false, avance: 0, inclinacion: 0, descargando: false }
  }

  if (t < T_APUNTADO) {
    // Entrada con un pequeño sobrepaso, que es el rebote del guion.
    const p = (t - T_ENCENDIDO) / (T_APUNTADO - T_ENCENDIDO)
    const conRebote = 1 - Math.pow(1 - p, 3)
    return {
      visible: true,
      avance: conRebote,
      inclinacion: -14 * conRebote,
      descargando: false,
    }
  }

  if (t <= T_BARRIDO) {
    return { visible: true, avance: 1, inclinacion: -14, descargando: true }
  }

  // Después del barrido sale de cuadro mientras la niebla se disipa.
  const p = acotar((t - T_BARRIDO) / (T_FIN - T_BARRIDO))
  return { visible: p < 1, avance: 1 - p, inclinacion: -14 * (1 - p), descargando: false }
}

/** Opacidad de la niebla blanca que cubre y se disipa al final. */
export function niebla(t: number): number {
  if (t < T_BARRIDO * 0.82) return 0
  if (t < T_BARRIDO) return acotar((t - T_BARRIDO * 0.82) / (T_BARRIDO * 0.18)) * 0.85
  return acotar(1 - (t - T_BARRIDO) / (T_FIN - T_BARRIDO)) * 0.85
}
