/**
 * Proyección isométrica para la lámina as-built.
 *
 * Por qué existe este módulo: las posiciones de la red se declaran en unidades
 * de grilla `(x, y, z)` —este, norte, arriba— y se proyectan acá. Coordenadas
 * SVG escritas a mano no se pueden mover, ni razonar, ni probar.
 *
 * Proyección isométrica clásica: los ejes horizontales caen a 30° y el eje
 * vertical se mantiene vertical.
 *
 *        z
 *        │
 *        │
 *       ╱ ╲
 *      y   x     x crece hacia la derecha-abajo, y hacia la izquierda-abajo
 *
 * Todas las funciones son puras y sin dependencias: se pueden probar sin DOM.
 */

/** cos(30°) — proyección horizontal de los ejes x e y. */
export const ISO_COS = Math.cos(Math.PI / 6)

/** sin(30°) — proyección vertical de los ejes x e y. */
export const ISO_SIN = Math.sin(Math.PI / 6)

/** Punto en el espacio de la red, en unidades de grilla. */
export type Punto3D = readonly [x: number, y: number, z: number]

/** Punto proyectado, en unidades de usuario del SVG. */
export type Punto2D = readonly [x: number, y: number]

/**
 * Proyecta un punto de la grilla al plano del dibujo.
 *
 * @param punto  posición en unidades de grilla
 * @param unidad tamaño de una unidad de grilla, en unidades de usuario del SVG
 */
export function proyectar(punto: Punto3D, unidad: number): Punto2D {
  const [x, y, z] = punto
  return [(x - y) * ISO_COS * unidad, ((x + y) * ISO_SIN - z) * unidad]
}

/**
 * Profundidad aparente de un punto: cuánto "hacia el observador" está.
 *
 * En esta proyección un mayor (x + y) cae más abajo en pantalla, o sea más
 * cerca. Se usa para ordenar el dibujo de atrás hacia adelante, que es lo que
 * permite que un elemento del frente interrumpa la línea del que está detrás.
 */
export function profundidad(punto: Punto3D): number {
  const [x, y] = punto
  return x + y
}

/**
 * Convierte una polilínea de la grilla en un atributo `d` de SVG.
 *
 * Devuelve `null` cuando hay menos de dos puntos: un tubo de un solo punto no
 * es un tubo, y devolver `null` obliga a quien llama a decidir qué hacer en vez
 * de emitir un `<path d="">` inválido y silencioso.
 */
export function trazo(puntos: readonly Punto3D[], unidad: number): string | null {
  if (puntos.length < 2) return null

  return puntos
    .map((punto, i) => {
      const [px, py] = proyectar(punto, unidad)
      return `${i === 0 ? 'M' : 'L'}${redondear(px)} ${redondear(py)}`
    })
    .join(' ')
}

/**
 * Igual que `trazo`, pero con los dos extremos acortados `recorte` unidades de
 * usuario, medidas ya en pantalla.
 *
 * Es el trazo del **halo** de un tubo. El halo existe para interrumpir lo que
 * el tubo cruza por delante, pero en sus extremos el tubo no cruza nada: se
 * une a otro. Con el halo completo, cada unión mordía la línea a la que
 * llegaba —el ramal le sacaba un bocado al colector, el anillo al montante— y
 * las aristas no coincidían con sus vértices. Acortado, el halo ocluye a lo
 * largo del tubo y deja las uniones intactas.
 *
 * Un tramo más corto que el recorte cede a lo sumo la mitad de su largo.
 */
export function trazoRecortado(
  puntos: readonly Punto3D[],
  unidad: number,
  recorte: number,
): string | null {
  if (puntos.length < 2) return null

  const p = puntos.map((punto) => proyectar(punto, unidad))

  const acercar = (desde: Punto2D, hacia: Punto2D): Punto2D => {
    const dx = hacia[0] - desde[0]
    const dy = hacia[1] - desde[1]
    const largo = Math.hypot(dx, dy)
    if (largo === 0) return desde
    const t = Math.min(recorte, largo / 2) / largo
    return [desde[0] + dx * t, desde[1] + dy * t]
  }

  const ultimo = p.length - 1
  const recortados = p.map((punto, i) => {
    if (i === 0) return acercar(punto, p[1] ?? punto)
    if (i === ultimo) return acercar(punto, p[ultimo - 1] ?? punto)
    return punto
  })

  return recortados
    .map(([px, py], i) => `${i === 0 ? 'M' : 'L'}${redondear(px)} ${redondear(py)}`)
    .join(' ')
}

/**
 * Caja que contiene una lista de puntos ya proyectados, con margen.
 * Sirve para calcular el `viewBox` a partir de la geometría real, en vez de
 * ajustarlo a ojo cada vez que se mueve un ramal.
 */
export function caja(
  puntos: readonly Punto3D[],
  unidad: number,
  margen: number,
): { x: number; y: number; ancho: number; alto: number; viewBox: string } {
  if (puntos.length === 0) {
    return { x: 0, y: 0, ancho: 0, alto: 0, viewBox: '0 0 0 0' }
  }

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  for (const punto of puntos) {
    const [px, py] = proyectar(punto, unidad)
    if (px < minX) minX = px
    if (px > maxX) maxX = px
    if (py < minY) minY = py
    if (py > maxY) maxY = py
  }

  const x = redondear(minX - margen)
  const y = redondear(minY - margen)
  const ancho = redondear(maxX - minX + margen * 2)
  const alto = redondear(maxY - minY + margen * 2)

  return { x, y, ancho, alto, viewBox: `${x} ${y} ${ancho} ${alto}` }
}

/**
 * Redondea a dos decimales. Un SVG con quince decimales por coordenada pesa
 * de más y no se lee en el diff.
 */
export function redondear(n: number): number {
  return Math.round(n * 100) / 100
}

/**
 * Caja que contiene puntos ya proyectados y, si hacen falta, rectángulos
 * adicionales. Existe porque los rótulos del dibujo se salen del encuadre de la
 * tubería: el `viewBox` tiene que contener las dos cosas.
 */
export function cajaDe2D(
  puntos: readonly Punto2D[],
  margen: number,
): { x: number; y: number; ancho: number; alto: number; viewBox: string } {
  if (puntos.length === 0) {
    return { x: 0, y: 0, ancho: 0, alto: 0, viewBox: '0 0 0 0' }
  }

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  for (const [px, py] of puntos) {
    if (px < minX) minX = px
    if (px > maxX) maxX = px
    if (py < minY) minY = py
    if (py > maxY) maxY = py
  }

  const x = redondear(minX - margen)
  const y = redondear(minY - margen)
  const ancho = redondear(maxX - minX + margen * 2)
  const alto = redondear(maxY - minY + margen * 2)

  return { x, y, ancho, alto, viewBox: `${x} ${y} ${ancho} ${alto}` }
}
