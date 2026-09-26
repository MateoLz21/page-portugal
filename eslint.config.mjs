import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

/**
 * Flat config nativo. `eslint-config-next@16` ya exporta flat config, así que
 * NO se envuelve en FlatCompat — hacerlo rompe con "Converting circular
 * structure to JSON", porque eslintrc intenta validar un flat config como
 * legacy.
 *
 * Versiones fijadas a propósito (ver docs/scope_1.md §5):
 *  - eslint 9, no 10: los plugins que trae eslint-config-next (import,
 *    jsx-a11y, react) declaran soporte solo hasta 9, y con 10 npm duplica
 *    el árbol.
 *  - typescript 6, no 7: typescript-eslint@8 acepta >=4.8.4 <6.1.0. Con TS 7
 *    el build de Next funciona igual, pero el lint no arranca.
 */
const config = [
  {
    ignores: [
      'out/**',
      '.next/**',
      'node_modules/**',
      'php/**',
      'docs/**',
      // scripts empaquetados del skill impeccable: código de terceros
      '.claude/**',
      '.impeccable/**',
    ],
  },

  ...nextCoreWebVitals,
  ...nextTypescript,

  {
    // Acotado al código del sitio. Sin esto la regla se detecta a sí misma
    // en este archivo, porque su propio selector contiene el literal.
    files: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}', 'content/**/*.ts'],
    rules: {
      // El contenido real vive en /content y los componentes lo renderizan.
      'no-restricted-syntax': [
        'warn',
        {
          selector: 'Literal[value=/lorem ipsum/i]',
          message: 'Sin texto de relleno: el contenido real vive en /content.',
        },
      ],
    },
  },
]

export default config
