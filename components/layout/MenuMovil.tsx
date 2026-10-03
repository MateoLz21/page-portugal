'use client'

import Link from 'next/link'
import { m } from 'motion/react'
import { Boton } from '@/components/ui/Boton'
import { cta, empresa, telefonoLegible } from '@/content/empresa'
import { esRutaActiva, navegacion, RUTA_COTIZAR } from '@/content/navegacion'

/**
 * Panel del menú móvil. Lo monta `Cabecera` dentro de `AnimatePresence`.
 *
 * Es un panel desplegable y no un modal: vive justo después del botón que lo
 * abre, así que el orden de tabulación ya es el correcto sin atrapar el foco.
 * Entra con `opacity` y `transform`, las únicas propiedades que §7 deja animar.
 */

export const ID_MENU_MOVIL = 'menu-movil'

export function MenuMovil({
  ruta,
  alElegir,
}: {
  ruta: string
  /** Se llama al elegir un destino, para que el header cierre el panel. */
  alElegir?: () => void
}) {
  const telefono = empresa.telefonos[0]

  return (
    <m.nav
      id={ID_MENU_MOVIL}
      aria-label="Principal"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="rule-t-line bg-paper"
    >
      <ul>
        {navegacion.map((enlace) => {
          const activa = esRutaActiva(ruta, enlace.href)
          return (
            <li key={enlace.href} className="rule-b-hair">
              <Link
                href={enlace.href}
                onClick={alElegir}
                aria-current={activa ? 'page' : undefined}
                className="lettering flex min-h-13 items-center gap-3 px-4 text-[15px] text-ink-900 no-underline pulsado:bg-paper-alt"
              >
                {/* Ruta activa: una marca llena, no solo un cambio de color. */}
                {activa ? <span aria-hidden="true" className="size-2 bg-ink-900" /> : null}
                {enlace.etiqueta}
              </Link>
            </li>
          )
        })}
      </ul>

      <div className="flex flex-col gap-3 p-4">
        <Boton variante="accion" href={RUTA_COTIZAR} onClick={alElegir} className="w-full">
          {cta.cotizar}
        </Boton>
        {telefono ? (
          <a
            href={`tel:${telefono}`}
            className="datum flex min-h-11 items-center justify-center text-[15px] text-ink-900"
          >
            {telefonoLegible(telefono)}
          </a>
        ) : null}
      </div>
    </m.nav>
  )
}
