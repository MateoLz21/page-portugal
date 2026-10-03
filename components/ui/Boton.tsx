import type { ComponentProps, ReactNode } from 'react'
import Link from 'next/link'

/**
 * El botón del sitio, en sus dos únicos papeles (§6.6):
 *
 *  - `accion`  la acción principal. Relleno `fire-600`: es uno de los dos usos
 *              reservados del rojo, así que va **una sola vez por encuadre**.
 *  - `linea`   todo lo demás. Contorno de 1px que sube a 2px al apuntar.
 *
 * Ningún estado se comunica solo por color: el activo suma contorno de tinta,
 * el deshabilitado pasa a contorno discontinuo y el de carga cambia el texto.
 *
 * Alto fijo de 48px: blanco de toque cómodo, y el cambio de grosor del contorno
 * no mueve nada alrededor.
 */

type Variante = 'accion' | 'linea'

type Comun = {
  variante?: Variante
  /** Mientras envía: bloquea el control y cambia el texto. */
  cargando?: boolean
  /** Texto del estado de carga. Nombra lo que está pasando. */
  etiquetaCargando?: string
  children: ReactNode
  className?: string
}

type ComoBoton = Comun & { href?: undefined } & Omit<
    ComponentProps<'button'>,
    'className' | 'children'
  >

type ComoEnlace = Comun & { href: string; disabled?: boolean } & Omit<
    ComponentProps<'a'>,
    'className' | 'children' | 'href'
  >

export type BotonProps = ComoBoton | ComoEnlace

const BASE =
  'lettering relative inline-flex h-12 shrink-0 items-center justify-center gap-2 overflow-hidden text-[13px] leading-none no-underline select-none'

const VIVO: Record<Variante, string> = {
  accion:
    'border-2 border-fire-600 bg-fire-600 px-6 text-paper sobre:border-fire-700 sobre:bg-fire-700 pulsado:border-ink-900 pulsado:bg-fire-700',
  // 1px en reposo, 2px al apuntar. El relleno lateral compensa el píxel.
  linea:
    'border border-ink-600 bg-paper px-[25px] text-ink-900 sobre:border-2 sobre:border-ink-900 sobre:px-6 pulsado:border-2 pulsado:border-ink-900 pulsado:bg-paper-alt pulsado:px-6',
}

/** `ink-300` es color de trazo: acá dibuja el contorno, nunca el texto. */
const DESHABILITADO =
  'cursor-not-allowed border border-dashed border-ink-300 bg-paper px-[25px] text-ink-600'

const CARGANDO: Record<Variante, string> = {
  accion: 'cursor-progress border-2 border-fire-700 bg-fire-700 px-6 text-paper',
  linea: 'cursor-progress border-2 border-ink-900 bg-paper-alt px-6 text-ink-900',
}

/** Línea que se traza sobre el borde inferior mientras envía. */
function Barrido() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left animate-barrido bg-current"
    />
  )
}

export function Boton(props: BotonProps) {
  const {
    variante = 'linea',
    cargando = false,
    etiquetaCargando = 'Enviando…',
    children,
    className = '',
    ...resto
  } = props

  const inactivo = Boolean(resto.disabled)
  const estado = cargando ? CARGANDO[variante] : inactivo ? DESHABILITADO : VIVO[variante]
  const clases = `${BASE} ${estado} ${className}`
  const contenido = cargando ? (
    <>
      {etiquetaCargando}
      <Barrido />
    </>
  ) : (
    children
  )

  if (resto.href === undefined) {
    const { type = 'button', disabled, ...nativo } = resto
    return (
      <button
        {...nativo}
        type={type}
        disabled={disabled || cargando}
        aria-busy={cargando || undefined}
        className={clases}
      >
        {contenido}
      </button>
    )
  }

  const { href, ...nativo } = resto
  delete nativo.disabled

  // Un enlace no tiene `disabled`: sin destino deja de ser un enlace.
  if (inactivo || cargando) {
    return (
      <span role="link" aria-disabled="true" aria-busy={cargando || undefined} className={clases}>
        {contenido}
      </span>
    )
  }

  // `next/link` es para rutas del sitio; lo externo (WhatsApp, tel:) va en <a>.
  if (href.startsWith('/')) {
    return (
      <Link {...nativo} href={href} className={clases}>
        {contenido}
      </Link>
    )
  }

  return (
    <a {...nativo} href={href} className={clases}>
      {contenido}
    </a>
  )
}
