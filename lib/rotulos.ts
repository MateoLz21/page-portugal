/**
 * Colocación de los rótulos de la lámina, sin encimarse.
 *
 * Por qué esto es un algoritmo y no un ajuste a mano: ocho rótulos con nombre
 * necesitan más ancho del que hay entre terminales, y la separación disponible
 * depende de la geometría, que cambia si se mueve un ramal. Colocarlos a ojo
 * funciona hasta la primera vez que alguien edita `red.ts`.
 *
 * La estrategia es la de una llamada de plano real: el rótulo va debajo (o al
 * costado) del símbolo. Cuando centrado no cabe, primero **se corre de costado**
 * y, si tampoco, **baja un nivel** y se conecta con una línea de referencia. Se
 * recorre de izquierda a derecha y cada rótulo ocupa el primer lugar libre.
 *
 * Un lugar está libre cuando no pisa ni otro rótulo ni **el símbolo de otro
 * terminal**. Lo segundo faltaba en la primera versión, que solo comparaba
 * rótulos entre sí: el rótulo largo del ramal 03 caía sobre el hidrante.
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
 * Corrimientos laterales que se prueban en cada nivel, en orden. Primero
 * centrado; después hacia la izquierda, que en la isometría es el lado libre
 * —el terminal siguiente queda abajo a la derecha—, y por último a la derecha.
 */
export const CORRIMIENTOS: readonly number[] = [0, -8, -16, -24, -32, -40, 8, 16, 24]

/** Aire mínimo entre un rótulo y el símbolo de otro terminal. */
export const AIRE_SIMBOLO = 4

/**
 * Ancho medio de carácter de la línea del número y la norma, que va en mono,
 * como fracción del tamaño de fuente.
 *
 * Es una estimación, no una medición del navegador: el cálculo corre en el
 * servidor, donde no hay métricas de fuente. Está puesta por lo alto a
 * propósito, así que el error juega a favor de la separación. Si algún día un
 * rótulo se encima, este número es el primero que hay que subir.
 */
export const ANCHO_CARACTER = 0.64

/**
 * Lo mismo para el nombre, que va en Archivo expandido, negrita y mayúsculas.
 *
 * Es bastante más ancho que la mono y tiene su propio número por eso. La
 * primera versión usaba 0,64 para las dos líneas; medido sobre el render,
 * «REDES DE AGUA» ocupa 0,82 por carácter, así que los nombres largos pisaban
 * el símbolo vecino sin que el cálculo se enterara.
 */
export const ANCHO_NOMBRE = 0.86

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
  /**
   * Línea de referencia, cuando el rótulo bajó de nivel. Lleva su propio `x`
   * —el del símbolo— porque el rótulo puede haberse corrido de costado.
   */
  readonly referencia: {
    readonly x: number
    readonly desdeY: number
    readonly hastaY: number
  } | null
  readonly caja: CajaRotulo
}

/** Algo que un rótulo no puede pisar, salvo que sea el suyo. */
export type Obstaculo = {
  /** Clave del terminal dueño: su propio rótulo sí puede arrimársele. */
  readonly clave: string
  readonly caja: CajaRotulo
}

/** Ancho estimado de un texto, en unidades del dibujo. */
export function anchoTexto(texto: string, tamano: number, porCaracter = ANCHO_CARACTER): number {
  return texto.length * porCaracter * tamano
}

/** Ancho del bloque de rótulo: la más larga de sus dos líneas. */
function anchoRotulo(e: EntradaRotulo): number {
  return Math.max(anchoTexto(e.texto, F_NOMBRE, ANCHO_NOMBRE), anchoTexto(e.detalle, F_NUMERO))
}

function seSolapan(a: CajaRotulo, b: CajaRotulo): boolean {
  return (
    a.izquierda < b.derecha && a.derecha > b.izquierda && a.arriba < b.abajo && a.abajo > b.arriba
  )
}

/** La caja crecida `aire` hacia los cuatro lados. */
function conAire(caja: CajaRotulo, aire: number): CajaRotulo {
  return {
    izquierda: caja.izquierda - aire,
    arriba: caja.arriba - aire,
    derecha: caja.derecha + aire,
    abajo: caja.abajo + aire,
  }
}

/**
 * Coloca los rótulos debajo de cada símbolo, corriéndolos de costado o bajando
 * de nivel cuando no caben.
 *
 * Determinista: se ordena por posición horizontal, así que el resultado no
 * depende del orden en que lleguen los terminales.
 *
 * @param obstaculos cajas que ningún rótulo ajeno puede pisar; típicamente, los
 *   símbolos de los terminales
 */
export function colocarDebajo(
  entradas: readonly EntradaRotulo[],
  obstaculos: readonly Obstaculo[] = [],
): readonly RotuloColocado[] {
  const puestos: RotuloColocado[] = []

  for (const e of [...entradas].sort((a, b) => a.x - b.x)) {
    const ancho = anchoRotulo(e)
    const base = e.y + e.lado / 2 + AIRE_ROTULO
    const ajenos = obstaculos.filter((o) => o.clave !== e.clave)

    const armar = (nivel: number, corrimiento: number): RotuloColocado => {
      const arriba = base + nivel * PASO_NIVEL
      const x = e.x + corrimiento
      return {
        clave: e.clave,
        x,
        y: arriba + F_NUMERO,
        nivel,
        referencia: nivel > 0 ? { x: e.x, desdeY: base, hastaY: arriba } : null,
        caja: {
          izquierda: x - ancho / 2,
          arriba,
          derecha: x + ancho / 2,
          abajo: arriba + ALTO_ROTULO,
        },
      }
    }

    const libre = (candidato: RotuloColocado) =>
      puestos.every((p) => !seSolapan(candidato.caja, p.caja)) &&
      ajenos.every((o) => !seSolapan(candidato.caja, conAire(o.caja, AIRE_SIMBOLO)))

    let elegido: RotuloColocado | null = null

    buscar: for (let nivel = 0; nivel < NIVELES; nivel += 1) {
      for (const corrimiento of CORRIMIENTOS) {
        const candidato = armar(nivel, corrimiento)
        if (libre(candidato)) {
          elegido = candidato
          break buscar
        }
      }
    }

    // Sin lugar libre se coloca centrado en el primer nivel y se acepta el
    // encimado, que es preferible a no dibujar el rótulo. El detector y la
    // revisión de cierre lo van a ver; un rótulo ausente pasa desapercibido.
    puestos.push(elegido ?? armar(0, 0))
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
      const ancho = anchoRotulo(e)
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
