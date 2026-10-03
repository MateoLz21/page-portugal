import type { Metadata } from 'next'
import { Archivo, JetBrains_Mono } from 'next/font/google'
import { Movimiento } from '@/components/motion/Movimiento'
import { empresa } from '@/content/empresa'
import './globals.css'

/**
 * Una sola familia variable cubre display y cuerpo usando el eje de ancho
 * (§6.3). `latin-ext` es obligatorio: sin él se rompen los acentos del
 * español. next/font descarga y autoaloja las fuentes en el build, así que
 * esto funciona con exportación estática y sin llamadas a Google en runtime.
 */
const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-archivo',
})

/** Solo para medición real: capacidades, códigos de norma, fechas, cotas. */
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: {
    default: `${empresa.nombreComercial} · Protección contra incendios en Arequipa`,
    template: `%s · ${empresa.marcaCorta}`,
  },
  description:
    'Recarga de extintores, redes de agua contra incendio, detección y capacitación. ' +
    'Normas NFPA y NTP. Más de 20 años en Arequipa y en la minería del Perú.',
  metadataBase: new URL(`https://${empresa.dominio}`),
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    siteName: empresa.nombreComercial,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PE" className={`${archivo.variable} ${jetbrains.variable}`}>
      <body>
        <Movimiento>{children}</Movimiento>
      </body>
    </html>
  )
}
