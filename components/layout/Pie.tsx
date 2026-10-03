import type { ReactNode } from 'react'
import Link from 'next/link'
import { Boton } from '@/components/ui/Boton'
import { cta, empresa, telefonoLegible, urlWhatsApp } from '@/content/empresa'
import { navegacion, RUTA_COTIZAR, RUTA_PRIVACIDAD } from '@/content/navegacion'
import { servicios } from '@/content/red'

/**
 * Pie del sitio (§4.3): resumen, servicios, enlaces, contacto y datos legales.
 *
 * Sin banda de color: es el margen inferior de la lámina, separado por un
 * filete de 2px. Los bloques que dependen de datos pendientes del cliente
 * —horario y redes— **no se dibujan** mientras estén en `null` o `[]`.
 *
 * Acá va la razón social en su grafía legal, no el nombre comercial.
 */

const ENLACE_BASE = 'inline-flex min-h-11 items-center text-ink-900 no-underline sobre:underline'
const ENLACE = `${ENLACE_BASE} text-[15px]`

function Columna({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="lettering rule-b-line pb-2 text-[13px] text-ink-900">{titulo}</h2>
      <div className="mt-2">{children}</div>
    </div>
  )
}

export function Pie() {
  const { direccion } = empresa
  const anio = new Date().getFullYear()

  return (
    <footer className="rule-t-bold bg-paper px-5 pt-10 pb-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_0.8fr_1.2fr]">
          <div>
            <p className="lettering text-[22px] leading-none tracking-[0.06em] text-ink-900">
              {empresa.marcaCorta}
            </p>
            <p className="medida-corta mt-4 text-[15px] leading-relaxed text-ink-600">
              {empresa.resumen}
            </p>
            <Boton variante="accion" href={RUTA_COTIZAR} className="mt-6">
              {cta.cotizar}
            </Boton>
          </div>

          <Columna titulo="Servicios">
            <ul>
              {servicios.map((servicio) => (
                <li key={servicio.slug}>
                  <Link href={`/servicios/${servicio.slug}/`} className={ENLACE}>
                    {servicio.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </Columna>

          <Columna titulo="Sitio">
            <ul>
              {navegacion.map((enlace) => (
                <li key={enlace.href}>
                  <Link href={enlace.href} className={ENLACE}>
                    {enlace.etiqueta}
                  </Link>
                </li>
              ))}
            </ul>
          </Columna>

          <Columna titulo="Contacto">
            <address className="not-italic">
              <p className="py-2.5 text-[15px] leading-snug text-ink-900">
                {direccion.calle}
                <br />
                {direccion.distrito}, {direccion.ciudad}, {direccion.pais}
              </p>
              <ul>
                {empresa.telefonos.map((telefono) => (
                  <li key={telefono}>
                    <a href={`tel:${telefono}`} className={`${ENLACE} datum`}>
                      {telefonoLegible(telefono)}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={urlWhatsApp()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ENLACE}
                  >
                    {cta.whatsapp}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${empresa.email}`} className={`${ENLACE} break-all`}>
                    {empresa.email}
                  </a>
                </li>
              </ul>
              {empresa.horario ? (
                <p className="py-2.5 text-[15px] leading-snug text-ink-600">{empresa.horario}</p>
              ) : null}
            </address>

            {empresa.redes.length > 0 ? (
              <ul className="mt-2 flex flex-wrap gap-x-5">
                {empresa.redes.map((red) => (
                  <li key={red.url}>
                    <a href={red.url} target="_blank" rel="noopener noreferrer" className={ENLACE}>
                      {red.red}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </Columna>
        </div>

        <div className="rule-t-line mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-1 pt-3">
          <p className="text-[14px] leading-snug text-ink-600">
            © {anio} {empresa.razonSocial} · <span className="datum">RUC {empresa.ruc}</span>
          </p>
          <Link href={RUTA_PRIVACIDAD} className={`${ENLACE_BASE} text-[14px]`}>
            Política de privacidad
          </Link>
        </div>
      </div>
    </footer>
  )
}
