/**
 * Navegación del sitio. Fuente: docs/scope_1.md §4.
 *
 * Una sola lista para el header, el menú móvil y el pie: agregar una ruta es
 * editar una línea acá, y no puede quedar un enlace en un lugar y no en otro.
 */

export type EnlaceNav = { readonly href: string; readonly etiqueta: string }

export const navegacion: readonly EnlaceNav[] = [
  { href: '/servicios/', etiqueta: 'Servicios' },
  { href: '/productos/', etiqueta: 'Productos' },
  { href: '/proyectos/', etiqueta: 'Proyectos' },
  { href: '/nosotros/', etiqueta: 'Nosotros' },
  { href: '/contacto/', etiqueta: 'Contacto' },
] as const

/** Destino de la acción principal. El texto vive en `cta.cotizar`. */
export const RUTA_COTIZAR = '/cotizar/'

export const RUTA_PRIVACIDAD = '/politica-de-privacidad/'

/** ¿`ruta` está dentro de `href`? Tolera la barra final de `trailingSlash`. */
export function esRutaActiva(ruta: string, href: string): boolean {
  const limpia = (s: string) => s.replace(/\/+$/, '')
  const a = limpia(ruta)
  const b = limpia(href)
  return a === b || a.startsWith(`${b}/`)
}
