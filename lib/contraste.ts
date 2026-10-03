/**
 * Contraste WCAG 2.x entre dos colores opacos. Puro y testeable.
 *
 * Existe para que la compuerta de la Fase 2 —«contraste medido, no asumido»—
 * sea una cuenta que se puede repetir, no una lectura a ojo.
 */

/** `#rrggbb` → luminancia relativa, entre 0 (negro) y 1 (blanco). */
export function luminancia(hex: string): number {
  const limpio = hex.replace('#', '')
  const canal = (i: number) => {
    const c = parseInt(limpio.slice(i, i + 2), 16) / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * canal(0) + 0.7152 * canal(2) + 0.0722 * canal(4)
}

/** Razón de contraste, de 1 a 21. El orden de los argumentos no importa. */
export function contraste(a: string, b: string): number {
  const la = luminancia(a)
  const lb = luminancia(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}
