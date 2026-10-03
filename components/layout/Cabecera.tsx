'use client'

import { useRef, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence } from 'motion/react'
import { Boton } from '@/components/ui/Boton'
import { IconoCerrar, IconoMenu } from '@/components/ui/iconos'
import { cta, empresa } from '@/content/empresa'
import { esRutaActiva, navegacion, RUTA_COTIZAR } from '@/content/navegacion'
import { ID_MENU_MOVIL, MenuMovil } from './MenuMovil'

/**
 * Header fijo: una regleta suelta sobre la lámina, que se compacta al scroll.
 *
 * Mientras está en el tope no tiene sombra: es una pieza más del plano. Al
 * despegarse baja de alto y recibe la **única sombra del sitio** (§6.2), que es
 * funcional —dice que la regleta flota sobre el contenido— y no decorativa. El
 * cambio de alto es instantáneo; lo único que transiciona es la opacidad de la
 * sombra, porque §7 solo deja animar `transform` y `opacity`.
 *
 * Mientras no llegue el logo vectorial (§6.4), la marca es tipográfica.
 */

/** Píxeles de scroll a partir de los cuales el header se considera despegado. */
const UMBRAL = 24

function suscribirScroll(avisar: () => void) {
  window.addEventListener('scroll', avisar, { passive: true })
  return () => window.removeEventListener('scroll', avisar)
}

/** `true` cuando la página ya se desplazó. En el servidor, siempre en el tope. */
function useDespegado(): boolean {
  return useSyncExternalStore(
    suscribirScroll,
    () => window.scrollY > UMBRAL,
    () => false,
  )
}

export function Cabecera() {
  const ruta = usePathname()
  const despegado = useDespegado()
  const [abierto, setAbierto] = useState(false)
  const botonMenu = useRef<HTMLButtonElement>(null)

  const cerrar = () => setAbierto(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 px-3 sm:px-5 ${despegado ? 'pt-2' : 'pt-3'}`}
      onKeyDown={(evento) => {
        if (evento.key === 'Escape' && abierto) {
          cerrar()
          botonMenu.current?.focus()
        }
      }}
    >
      <a
        href="#contenido"
        className="lettering sr-only bg-ink-900 px-4 py-3 text-[13px] text-paper focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
      >
        Saltar al contenido
      </a>

      <div className="rule-line relative mx-auto max-w-6xl bg-paper">
        {/* La sombra vive en su propia capa para poder transicionar opacidad. */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 shadow-despegue transition-opacity duration-200 ${
            despegado || abierto ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div
          className={`relative flex items-center gap-2 pr-2 pl-4 ${despegado ? 'h-14' : 'h-16'}`}
        >
          <Link
            href="/"
            aria-label={`${empresa.nombreComercial}, inicio`}
            className="lettering mr-auto flex min-h-11 items-center text-[19px] tracking-[0.06em] text-ink-900 no-underline"
          >
            {empresa.marcaCorta}
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center">
              {navegacion.map((enlace) => {
                const activa = esRutaActiva(ruta, enlace.href)
                return (
                  <li key={enlace.href}>
                    <Link
                      href={enlace.href}
                      aria-current={activa ? 'page' : undefined}
                      className="group lettering relative flex h-11 items-center px-3.5 text-[12.5px] text-ink-900 no-underline"
                    >
                      {enlace.etiqueta}
                      {/* Navegación activa: contorno de 2px, no relleno (§6.6). */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3.5 bottom-1.5 ${
                          activa
                            ? 'h-0.5 bg-ink-900'
                            : 'h-px bg-ink-600 opacity-0 group-sobre:opacity-100'
                        }`}
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* En móvil la acción vive dentro del menú: acá no entra sin apretar la marca. */}
          <div className="ml-3 hidden sm:block">
            <Boton variante="accion" href={RUTA_COTIZAR}>
              {cta.cotizar}
            </Boton>
          </div>

          <button
            ref={botonMenu}
            type="button"
            aria-expanded={abierto}
            aria-controls={ID_MENU_MOVIL}
            onClick={() => setAbierto((estaba) => !estaba)}
            className="grid size-11 place-items-center text-ink-900 pulsado:bg-paper-alt lg:hidden"
          >
            <span className="sr-only">{abierto ? 'Cerrar menú' : 'Abrir menú'}</span>
            {abierto ? <IconoCerrar /> : <IconoMenu />}
          </button>
        </div>

        <div className="relative lg:hidden">
          <AnimatePresence initial={false}>
            {abierto ? <MenuMovil ruta={ruta} alElegir={cerrar} /> : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
