/**
 * Colocación de los rótulos de la lámina, sin encimarse.
 *
 * Por qué esto es un algoritmo y no un ajuste a mano: ocho rótulos con nombre
 * necesitan más ancho del que hay entre terminales, y la separación disponible
 * depende de la geometría, que cambia si se mueve un ramal. Colocarlos a ojo
 * funciona hasta la primera vez que alguien edita `red.ts`.
 *
 * La estrategia es la de una llamada de plano real: el rótulo va debajo (o al
 * costado) del símbolo, y cuando no cabe **baja un nivel** y se conecta con una
 * línea de referencia. Se recorre de izquierda a derecha y cada rótulo ocupa el
 * primer nivel libre.
 *
 * Los rótulos van dentro del SVG a propósito. En HTML con tamaño fijo en px la
 * colisión dependería del ancho del viewport —a 768 px los terminales quedan a
 * 75 px y a 1440 px a 140 px, y el texto no cambia—, así que no habría forma de
 * resolverla de una vez. Dentro del SVG todo escala junto y el cálculo vale para
 * cualquier ancho.
 *
 * Funciones puras, sin DOM: se pueden probar.
 */

/** Tamaño de fuente del nombre, en unidades del dibujo. */
export const F_NOMBRE = 13

/** Tamaño de fuente de la línea del número y la norma. */
export const F_NUMERO = 11

/** Alto total del bloque de rótulo: dos líneas. */
export const ALTO_ROTULO = 30

/** Separación entre el borde del símbolo y el rótulo. */
export const AIRE_ROTULO = 5

/** Cuánto baja un rótulo por nivel. */
export const PASO_NIVEL = 34

/** Cuántos niveles se permiten antes de rendirse. */
export const NIVELES = 3

/**
 * Ancho medio de carácter en Archivo expandido y mayúsculas, como fracción del
 * tamaño de fuente.
 *
 * Es una estimación, no una medición del navegador: el cálculo corre en el
 * servidor, donde no hay métricas de fuente. Está puesta por lo alto a
 * propósito, así que el error juega a favor de la separación. Si algún día un
 * rótulo se encima, este número es el primero que hay que subir.
 */
export const ANCHO_CARACTER = 0.64

export type CajaRotulo = {
  readonly izquierda: number
  readonly arriba: number
  readonly derecha: number
  readonly abajo: number
}

/** Entrada del algoritmo: un terminal ya proyectado. */
export type EntradaRotulo = {
  readonly clave: string
  /** Centro del símbolo, en unidades del dibujo. */
  readonly x: number
  readonly y: number
  /** Lado del símbolo, para saber desde dónde empieza el aire. */
  readonly lado: number
  /** Texto del nombre, tal como se va a dibujar. */
  readonly texto: string
  /** Texto de la línea de número y norma. */
  readonly detalle: string
}

/** Salida: dónde va el rótulo y si necesita línea de referencia. */
export type RotuloColocado = {
  readonly clave: string
  /** Centro horizontal del texto. */
  readonly x: number
  /** Línea base de la primera línea de texto. */
  readonly y: number
  readonly nivel: number
  /** Extremo de la línea de referencia, cuando el rótulo bajó de nivel. */
  readonly referencia: { readonly desdeY: number; readonly hastaY: number } | null
  readonly caja: CajaRotulo
}

/** Ancho estimado de un texto, en unidades del dibujo. */
export function anchoTexto(texto: string, tamano: number): number {
  return texto.length * ANCHO_CARACTER * tamano
}

function seSolapan(a: CajaRotulo, b: CajaRotulo): boolean {
  return (
    a.izquierda < b.derecha && a.derecha > b.izquierda && a.arriba < b.abajo && a.abajo > b.arriba
  )
}

/**
 * Coloca los rótulos debajo de cada símbolo, bajando de nivel cuando no caben.
 *
 * Determinista: se ordena por posición horizontal, así que el resultado no
 * depende del orden en que lleguen los terminales.
 */
export function colocarDebajo(entradas: readonly EntradaRotulo[]): readonly RotuloColocado[] {
  const puestos: RotuloColocado[] = []

  for (const e of [...entradas].sort((a, b) => a.x - b.x)) {
    const ancho = Math.max(anchoTexto(e.texto, F_NOMBRE), anchoTexto(e.detalle, F_NUMERO))
    const base = e.y + e.lado / 2 + AIRE_ROTULO

    let elegido: RotuloColocado | null = null

    for (let nivel = 0; nivel < NIVELES; nivel += 1) {
      const arriba = base + nivel * PASO_NIVEL
      const caja: CajaRotulo = {
        izquierda: e.x - ancho / 2,
        arriba,
        derecha: e.x + ancho / 2,
        abajo: arriba + ALTO_ROTULO,
      }

      if (puestos.every((p) => !seSolapan(caja, p.caja))) {
        elegido = {
          clave: e.clave,
          x: e.x,
          y: arriba + F_NUMERO,
          nivel,
          referencia: nivel > 0 ? { desdeY: base, hastaY: arriba } : null,
          caja,
        }
        break
      }
    }

    // Sin nivel libre se coloca en el primero y se acepta el encimado, que es
    // preferible a no dibujar el rótulo. El detector y la revisión de cierre lo
    // van a ver; un rótulo ausente pasa desapercibido.
    puestos.push(
      elegido ?? {
        clave: e.clave,
        x: e.x,
        y: base + F_NUMERO,
        nivel: 0,
        referencia: null,
        caja: {
          izquierda: e.x - ancho / 2,
          arriba: base,
          derecha: e.x + ancho / 2,
          abajo: base + ALTO_ROTULO,
        },
      },
    )
  }

  return puestos
}

/**
 * Coloca los rótulos al costado derecho del símbolo.
 *
 * Es la variante del diagrama de montante, donde los ramales se apilan en
 * vertical y el espacio libre está al costado, no abajo.
 */
export function colocarAlCostado(entradas: readonly EntradaRotulo[]): readonly RotuloColocado[] {
  return [...entradas]
    .sort((a, b) => a.y - b.y)
    .map((e) => {
      const ancho = Math.max(anchoTexto(e.texto, F_NOMBRE), anchoTexto(e.detalle, F_NUMERO))
      const izquierda = e.x + e.lado / 2 + AIRE_ROTULO
      const arriba = e.y - ALTO_ROTULO / 2

      return {
        clave: e.clave,
        x: izquierda,
        y: arriba + F_NUMERO,
        nivel: 0,
        referencia: null,
        caja: { izquierda, arriba, derecha: izquierda + ancho, abajo: arriba + ALTO_ROTULO },
      }
    })
}
