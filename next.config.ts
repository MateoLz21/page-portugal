import type { NextConfig } from 'next'

/**
 * Exportación estática para hosting cPanel compartido (Apache, sin runtime de Node).
 * Consecuencias, documentadas en docs/scope_1.md §5.1:
 *  - no hay API Routes, Server Actions, middleware ni ISR
 *  - los formularios se resuelven con PHP en el mismo cPanel (§8)
 *  - toda ruta dinámica se genera con generateStaticParams
 */
const nextConfig: NextConfig = {
  output: 'export',

  // genera `ruta/index.html`, que Apache sirve sin configuración adicional
  trailingSlash: true,

  // el optimizador de imágenes necesita un servidor; no existe en export estático
  images: { unoptimized: true },

  // el build falla si hay error de tipos, en vez de publicar roto
  typescript: { ignoreBuildErrors: false },

  // Nota: en Next 16 la clave `eslint` ya no se acepta acá. El lint corre
  // aparte con `npm run lint`, y el build no lo dispara.
}

export default nextConfig
