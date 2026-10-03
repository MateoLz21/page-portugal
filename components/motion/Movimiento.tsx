'use client'

import type { ReactNode } from 'react'
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'

/**
 * Reglas técnicas de §7, puestas una sola vez en el layout:
 *
 *  - `LazyMotion` + `domAnimation`: carga el subconjunto de animación y no el
 *    paquete completo. `strict` hace fallar el uso de `motion.*`, que lo
 *    traería entero; los componentes usan `m.*`.
 *  - `reducedMotion="user"`: respeta `prefers-reduced-motion` sin que cada
 *    componente tenga que acordarse.
 */
export function Movimiento({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
