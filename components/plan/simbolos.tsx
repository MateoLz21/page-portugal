import type { ReactNode } from 'react'
import type { SimboloId } from '@/content/red'

/**
 * Símbolos normados de la lámina as-built.
 *
 * Todos se dibujan en una caja de 24×24 unidades, con trazo de 1,5 y sin
 * relleno. El color viene por `currentColor`, así que un símbolo toma la tinta
 * de su contexto sin necesitar una variante por color.
 *
 * Derivados de la simbología real del oficio: el símbolo P&ID de bomba
 * centrífuga, la mariposa de una válvula de compuerta con su vástago y volante,
 * el hidrante de pilar con sus dos salidas laterales. No son iconos decorativos.
 *
 * `strokeLinecap="square"` y juntas a inglete a propósito: un plano técnico no
 * tiene puntas redondeadas, y el mundo visual fija radio de esquina 0 (§6.6).
 */

/** Lado de la caja de dibujo de todos los símbolos. */
export const CAJA_SIMBOLO = 24

/** Grosor de trazo dentro de la caja de 24. */
export const TRAZO_SIMBOLO = 1.5

/**
 * La geometría, sin envoltorio. Se monta de dos formas: suelta dentro de un
 * `<g>` en la lámina, o dentro de un `<svg>` propio con `<Simbolo>`. Una sola
 * fuente para las dos.
 */
export const geometriaSimbolos: Record<SimboloId, ReactNode> = {
  /** Detector de humo de techo: disco con rejilla y LED central. */
  detector: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2.6M12 17.9v2.6M3.5 12h2.6M17.9 12h2.6" />
    </>
  ),

  /** Hidrante de pilar: cuerpo, casquete, dos salidas laterales y brida. */
  hidrante: (
    <>
      <path d="M10 8h4v13h-4z" />
      <path d="M9.4 8a2.6 2.6 0 0 1 5.2 0" />
      <path d="M12 5.4V3.6" />
      <path d="M6 11h4v3H6zM14 11h4v3h-4z" />
      <path d="M7 21h10" />
      <path d="M8.5 21v1.6h7V21" />
    </>
  ),

  /** Extintor portátil: cilindro, válvula, palanca, manguera y base. */
  extintor: (
    <>
      <path d="M9 8.5h6V21H9z" />
      <path d="M10.5 5.5h3v3h-3z" />
      <path d="M10.5 6.2 7 5.1" />
      <path d="M13.5 6.6c3.4.8 4.2 2.8 3.6 5.4" />
      <path d="M8 21h8" />
      <path d="M9 12.5h6" />
    </>
  ),

  /** Llama: la práctica con fuego real de la capacitación. */
  llama: (
    <>
      <path d="M12 3.4c2.6 4 6 6 6 9.9a6 6 0 0 1-12 0c0-3.9 3.4-5.9 6-9.9z" />
      <path d="M12 11.6c1.2 1.9 2.2 2.8 2.2 4.3a2.2 2.2 0 0 1-4.4 0c0-1.5 1-2.4 2.2-4.3z" />
    </>
  ),

  /** Camión minero de acarreo: tolva, cabina y dos ejes. */
  camion: (
    <>
      <path d="M3 8h12l2.2 6H3z" />
      <path d="M17.4 10h3.6v4h-3.6" />
      <path d="M3 14h18" />
      <circle cx="7.4" cy="17.4" r="3.1" />
      <circle cx="17.4" cy="17.4" r="2.7" />
    </>
  ),

  /** Gabinete contra incendio con su extintor adentro. */
  gabinete: (
    <>
      <path d="M5 4h14v16H5z" />
      <path d="M7.2 6.2h9.6v11.6H7.2z" />
      <path d="M10.6 9.4h2.8v8.4h-2.8z" />
      <path d="M11.4 7.6h1.2v1.8h-1.2z" />
      <path d="M17.8 11.2v1.6" />
    </>
  ),

  /** Cámara de seguridad tipo caja, con visera y brazo a muro. */
  camara: (
    <>
      <path d="M6 8.4h11v5.2H6z" />
      <path d="M17 9.8h3.4v2.4H17z" />
      <path d="M5.4 7h12.2" />
      <path d="M9.4 13.6 7.6 19" />
      <path d="M4.8 19h5.4" />
    </>
  ),

  /** Casco de seguridad, de perfil: copa, cresta y visera. */
  casco: (
    <>
      <path d="M4.2 16.2a7.8 7.8 0 0 1 15.6 0" />
      <path d="M2.4 16.2h19.2" />
      <path d="M19.8 16.2l1.8 1.7" />
      <path d="M7.2 11.4c3-2.4 6.6-2.4 9.6 0" />
    </>
  ),

  /** Bomba contra incendio: símbolo P&ID de bomba centrífuga con bridas. */
  bomba: (
    <>
      <circle cx="12" cy="13" r="7" />
      <path d="M8.5 16.4h7L12 9z" />
      <path d="M5 13H1.6" />
      <path d="M1.6 11.4v3.2" />
      <path d="M12 6V2.6" />
      <path d="M10.4 2.6h3.2" />
    </>
  ),

  /** Válvula de compuerta: mariposa, vástago y volante. */
  valvula: (
    <>
      <path d="M5 9l7 4-7 4z" />
      <path d="M19 9l-7 4 7 4z" />
      <path d="M12 13V6" />
      <path d="M8.4 5.6h7.2" />
    </>
  ),
}

/** Nombre del símbolo, para la fila de verificación y el `aria-label`. */
export const nombresSimbolos: Record<SimboloId, string> = {
  detector: 'Detector de humo',
  hidrante: 'Hidrante de pilar',
  extintor: 'Extintor portátil',
  llama: 'Fuego real de práctica',
  camion: 'Camión minero de acarreo',
  gabinete: 'Gabinete contra incendio',
  camara: 'Cámara de seguridad',
  casco: 'Casco de seguridad',
  bomba: 'Bomba contra incendio',
  valvula: 'Válvula de compuerta',
}

/** Atributos de trazo compartidos. Un solo lugar mantiene el trazo consistente. */
export const trazoSimbolo = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: TRAZO_SIMBOLO,
  strokeLinecap: 'square',
  strokeLinejoin: 'miter',
} as const

type SimboloProps = {
  id: SimboloId
  /** Lado del cuadro, en píxeles. */
  tamano?: number
  className?: string
  /**
   * Cuando el símbolo acompaña a un texto que ya lo nombra, es decorativo y se
   * oculta de la accesibilidad. Cuando va solo, necesita su nombre.
   */
  decorativo?: boolean
}

/** Un símbolo suelto, en su propio `<svg>`. */
export function Simbolo({ id, tamano = 40, className, decorativo = false }: SimboloProps) {
  const nombre = nombresSimbolos[id]

  return (
    <svg
      width={tamano}
      height={tamano}
      viewBox={`0 0 ${CAJA_SIMBOLO} ${CAJA_SIMBOLO}`}
      className={className}
      {...trazoSimbolo}
      {...(decorativo ? { 'aria-hidden': true } : { role: 'img', 'aria-label': nombre })}
    >
      {geometriaSimbolos[id]}
    </svg>
  )
}
