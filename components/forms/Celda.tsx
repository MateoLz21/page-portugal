import { useId, type ComponentProps, type ReactNode } from 'react'
import { IconoCerrar, IconoDesplegar } from '@/components/ui/iconos'

/**
 * Celda de formulario: el campo como celda de un cuadro de llenado (§6.5).
 *
 * Filete inferior de 1px, etiqueta real arriba, foco con anillo cobre de 2px.
 * **Nunca hundido, nunca del color del fondo**: la celda pinta `paper-alt`, así
 * que se distingue de la hoja sin una sola sombra y se lee al sol.
 *
 * Estados (§6.6), ninguno comunicado solo por color:
 *  - reposo         filete de 1px en `ink-600`
 *  - hover          el filete sube a 2px en `ink-900`
 *  - foco           anillo cobre de 2px (regla global de `:focus-visible`)
 *  - error          filete de 2px en `err-600` + mensaje con su marca
 *  - deshabilitado  contorno discontinuo en `ink-300`, sin filete
 *  - vacío          el placeholder, en `ink-600` — nunca hace de etiqueta
 *
 * Tres controles, una sola celda: `CeldaTexto`, `CeldaArea` y `CeldaLista`.
 * Reciben las props nativas, `ref` incluida, así que `react-hook-form` las
 * registra sin envoltorio en la Fase 5.
 */

type Marco = {
  etiqueta: string
  /** Aclaración bajo el campo. Con error, el mensaje la reemplaza. */
  ayuda?: string
  /** Nombra el problema y cómo se resuelve. Su presencia marca el campo. */
  error?: string
  className?: string
}

const CONTROL =
  'peer block w-full appearance-none rounded-none border-0 bg-paper-alt px-3 text-[16px] text-ink-900 disabled:cursor-not-allowed disabled:border disabled:border-dashed disabled:border-ink-300 disabled:bg-paper disabled:text-ink-600'

/** El filete inferior. Hermano del control para poder leer su estado. */
function Filete({ conError }: { conError: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 peer-disabled:hidden ${
        conError ? 'h-0.5 bg-err-600' : 'h-px bg-ink-600 peer-sobre:h-0.5 peer-sobre:bg-ink-900'
      }`}
    />
  )
}

function Armazon({
  id,
  etiqueta,
  ayuda,
  error,
  opcional,
  className = '',
  children,
}: Marco & { id: string; opcional: boolean; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[14px] leading-snug font-medium text-ink-900">
        {etiqueta}
        {opcional ? <span className="font-normal text-ink-600"> (opcional)</span> : null}
      </label>

      <div className="relative mt-1.5">{children}</div>

      {error ? (
        <p
          id={`${id}-nota`}
          className="mt-1.5 flex items-start gap-1.5 text-[14px] leading-snug font-medium text-err-600"
        >
          <IconoCerrar tamano={16} className="mt-0.5 shrink-0" />
          {error}
        </p>
      ) : ayuda ? (
        <p id={`${id}-nota`} className="mt-1.5 text-[14px] leading-snug text-ink-600">
          {ayuda}
        </p>
      ) : null}
    </div>
  )
}

/** Atributos de accesibilidad que comparten los tres controles. */
function atributos(id: string, ayuda: string | undefined, error: string | undefined) {
  return {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error || ayuda ? `${id}-nota` : undefined,
  } as const
}

export function CeldaTexto({
  etiqueta,
  ayuda,
  error,
  className,
  ...nativo
}: Marco & Omit<ComponentProps<'input'>, 'className'>) {
  const propio = useId()
  const id = nativo.id ?? propio

  return (
    <Armazon {...{ id, etiqueta, ayuda, error, className }} opcional={!nativo.required}>
      <input {...nativo} {...atributos(id, ayuda, error)} className={`${CONTROL} h-12`} />
      <Filete conError={Boolean(error)} />
    </Armazon>
  )
}

export function CeldaArea({
  etiqueta,
  ayuda,
  error,
  className,
  rows = 5,
  ...nativo
}: Marco & Omit<ComponentProps<'textarea'>, 'className'>) {
  const propio = useId()
  const id = nativo.id ?? propio

  return (
    <Armazon {...{ id, etiqueta, ayuda, error, className }} opcional={!nativo.required}>
      <textarea
        {...nativo}
        {...atributos(id, ayuda, error)}
        rows={rows}
        className={`${CONTROL} resize-y py-3 leading-normal`}
      />
      <Filete conError={Boolean(error)} />
    </Armazon>
  )
}

export function CeldaLista({
  etiqueta,
  ayuda,
  error,
  className,
  children,
  ...nativo
}: Marco & Omit<ComponentProps<'select'>, 'className'>) {
  const propio = useId()
  const id = nativo.id ?? propio

  return (
    <Armazon {...{ id, etiqueta, ayuda, error, className }} opcional={!nativo.required}>
      <select {...nativo} {...atributos(id, ayuda, error)} className={`${CONTROL} h-12 pr-11`}>
        {children}
      </select>
      <Filete conError={Boolean(error)} />
      <IconoDesplegar
        tamano={20}
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-ink-900"
      />
    </Armazon>
  )
}
