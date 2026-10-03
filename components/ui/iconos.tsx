import type { ReactNode } from 'react'

/**
 * Iconos de interfaz: menú, cerrar, flecha y el glifo de WhatsApp.
 *
 * Dibujados acá con el mismo trazo que los símbolos normados —caja de 24,
 * grosor 1,5, punta cuadrada, junta a inglete— en vez de traer `lucide-react`,
 * que el alcance (§5) preveía. Dos motivos: lucide redondea puntas y juntas, y
 * eso contradice el radio de esquina 0 del mundo visual; y son cuatro iconos,
 * que no justifican una dependencia.
 *
 * Todos son decorativos: el control que los contiene lleva el nombre accesible.
 */

type IconoProps = { tamano?: number; className?: string }

function Icono({ tamano = 24, className, children }: IconoProps & { children: ReactNode }) {
  return (
    <svg
      width={tamano}
      height={tamano}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

export function IconoMenu(props: IconoProps) {
  return (
    <Icono {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icono>
  )
}

export function IconoCerrar(props: IconoProps) {
  return (
    <Icono {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Icono>
  )
}

/** Flecha de cota: apunta a la derecha. Se gira con una clase para otros usos. */
export function IconoFlecha(props: IconoProps) {
  return (
    <Icono {...props}>
      <path d="M4 12h15M13.5 6.5L19 12l-5.5 5.5" />
    </Icono>
  )
}

/** Punta hacia abajo, para la lista desplegable. */
export function IconoDesplegar(props: IconoProps) {
  return (
    <Icono {...props}>
      <path d="M6 9.5l6 6 6-6" />
    </Icono>
  )
}

/**
 * Glifo de WhatsApp: globo con cola y auricular. Único icono con curvas y
 * puntas redondas, porque es un objeto ajeno a la lámina (§6.6).
 */
export function IconoWhatsApp({ tamano = 24, className }: IconoProps) {
  return (
    <svg
      width={tamano}
      height={tamano}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z" />
      <path d="M9.2 8.2c-.5 1.3.2 3 1.7 4.6 1.6 1.6 3.3 2.3 4.7 1.8l.5-1.5-1.8-1-.9.8c-.8-.4-1.5-1.1-1.900-1.900l.8-.9-1-1.900z" />
    </svg>
  )
}
