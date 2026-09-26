import { cifras, empresa, telefonoLegible } from '@/content/empresa'

/**
 * FASE 0 — hoja de verificación del andamiaje.
 *
 * Esta página NO es la portada. Existe para cerrar la compuerta de la Fase 0:
 * demuestra que los tokens de §6.2 resuelven, que Archivo carga con su eje de
 * ancho y con acentos, que la mono tiene numerales tabulares, y que las tres
 * utilidades de grosor y la retícula funcionan.
 *
 * La portada real se construye en la Fase 3, sobre la lámina isométrica de la
 * Fase 1. Este archivo se reemplaza entonces.
 */

const tintas = [
  { token: 'paper', hex: '#F4F6F7', uso: 'fondo base — papel de plano' },
  { token: 'paper-alt', hex: '#E9EDEF', uso: 'sección alterna, celda de tabla' },
  { token: 'ink-900', hex: '#16212B', uso: 'títulos, cuerpo, línea de 2px' },
  { token: 'ink-600', hex: '#465562', uso: 'texto secundario, cotas, línea 1px' },
  { token: 'ink-300', hex: '#A9B6C0', uso: 'solo trazo: retícula y auxiliares' },
  { token: 'fire-600', hex: '#C62828', uso: 'RESERVADO: contra incendios + acción' },
  { token: 'copper-500', hex: '#B8733A', uso: 'solo anotación: revisión, foco' },
  { token: 'teal-600', hex: '#1F7F80', uso: 'ramal de agua del dibujo' },
]

const grosores = [
  { clase: 'rule-b-hair', peso: '0,5px', tinta: 'ink-300', uso: 'retícula, auxiliares' },
  { clase: 'rule-b-line', peso: '1px', tinta: 'ink-600', uso: 'separadores, contornos' },
  { clase: 'rule-b-bold', peso: '2px', tinta: 'ink-900', uso: 'activo, contorno principal' },
]

export default function VerificacionFase0() {
  return (
    <main className="plan-grid min-h-screen px-6 py-12 sm:px-10">
      <div className="mx-auto max-w-5xl">
        {/* ── Cuadro de rótulo ─────────────────────────────────── */}
        <header className="rule-bold bg-paper p-6 sm:p-8">
          <h1 className="lettering text-h1">
            Fase 0<br />
            Verificación
          </h1>
          <p className="mt-4 max-w-[60ch] text-ink-600">
            Andamiaje del sitio de {empresa.nombreComercial}. Esta hoja comprueba que los tokens,
            las fuentes y las utilidades de grosor resuelven. No es la portada: esa se construye en
            la Fase 3, sobre la lámina de la Fase 1.
          </p>

          <dl className="rule-t-hair mt-6 grid gap-x-8 gap-y-3 pt-5 sm:grid-cols-3">
            {[
              ['Razón social', empresa.razonSocial],
              ['RUC', empresa.ruc],
              ['Teléfono', telefonoLegible(empresa.telefonos[0] ?? '')],
              ['Dominio', empresa.dominio],
              ['Normativa', 'NFPA 10 · NTP 350.043'],
              ['Revisión', 'F0 · 26.09.2026'],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="datum text-[11px] uppercase tracking-[0.13em] text-ink-600">{k}</dt>
                <dd className="datum mt-1 text-[12.5px] font-medium text-ink-900">{v}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* ── Tipografía ───────────────────────────────────────── */}
        <section className="mt-14">
          <h2 className="lettering rule-b-bold pb-3 text-h3">Tipografía</h2>

          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div>
              <p className="datum mb-3 text-[11px] uppercase tracking-[0.13em] text-ink-600">
                Archivo · eje wdth 118 · rotulación
              </p>
              <p className="lettering text-h2">Inspección y recarga de extintores</p>
              <p className="datum mt-3 text-[12.5px] text-ink-600">
                Acentos: á é í ó ú ñ Ñ ¿ ¡ ü — subconjunto latin-ext cargado
              </p>
            </div>

            <div>
              <p className="datum mb-3 text-[11px] uppercase tracking-[0.13em] text-ink-600">
                Archivo · eje wdth 100 · cuerpo
              </p>
              <p className="max-w-[66ch]">
                Contamos con los equipos, las herramientas y las unidades móviles necesarias para
                transportar a nuestro personal, equipos y materiales dentro de operaciones mineras e
                industriales.
              </p>
            </div>
          </div>

          <div className="rule-t-hair mt-8 pt-5">
            <p className="datum mb-3 text-[11px] uppercase tracking-[0.13em] text-ink-600">
              JetBrains Mono · numerales tabulares · solo medición real
            </p>
            <table className="datum w-full max-w-lg text-[12.5px]">
              <tbody>
                {[
                  ['Extintor PQS', '6 kg', 'NTP 350.043'],
                  ['Extintor CO₂', '10 lb', 'NFPA 10'],
                  ['Prueba hidrostática', '5 años', 'NFPA 10 §8.3'],
                ].map(([a, b, c]) => (
                  <tr key={a} className="rule-b-hair">
                    <td className="py-2 pr-6 font-sans">{a}</td>
                    <td className="py-2 pr-6 text-right tabular-nums">{b}</td>
                    <td className="py-2 text-ink-600">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Paleta ───────────────────────────────────────────── */}
        <section className="mt-14">
          <h2 className="lettering rule-b-bold pb-3 text-h3">Tintas</h2>
          <ul className="mt-6 grid gap-px sm:grid-cols-2">
            {tintas.map((t) => (
              <li key={t.token} className="rule-hair flex items-stretch gap-4 bg-paper p-3">
                <span
                  aria-hidden="true"
                  className="rule-line w-12 shrink-0"
                  style={{ backgroundColor: t.hex }}
                />
                <span className="min-w-0">
                  <span className="datum block text-[12.5px] font-medium">{t.token}</span>
                  <span className="datum block text-[11px] text-ink-600">{t.hex}</span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-ink-600">
                    {t.uso}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Grosores ─────────────────────────────────────────── */}
        <section className="mt-14">
          <h2 className="lettering rule-b-bold pb-3 text-h3">Grosores de línea</h2>
          <p className="mt-4 max-w-[66ch] text-ink-600">
            El sistema de profundidad completo. No hay sombras: la jerarquía es el grosor. Existen
            tres utilidades y solo tres, para que no se pueda inventar un cuarto peso.
          </p>
          <ul className="mt-6">
            {grosores.map((g) => (
              <li key={g.clase} className={`${g.clase} flex flex-wrap items-baseline gap-x-6 py-4`}>
                <span className="datum w-40 text-[12.5px] font-medium">{g.clase}</span>
                <span className="datum w-16 text-[12.5px] text-ink-600">{g.peso}</span>
                <span className="datum w-24 text-[12.5px] text-ink-600">{g.tinta}</span>
                <span className="text-[13px] text-ink-600">{g.uso}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Cifras ───────────────────────────────────────────── */}
        <section className="mt-14">
          <h2 className="lettering rule-b-bold pb-3 text-h3">Cifras verificables</h2>
          <p className="mt-4 max-w-[66ch] text-ink-600">
            Las cuatro se derivan del contenido documentado. En la Fase 3 van como banda tipográfica
            con filetes, nunca como fila de tarjetas con número grande.
          </p>
          <ul className="mt-6 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {cifras.map((c) => (
              <li key={c.etiqueta} className="rule-t-line pt-4">
                <span className="lettering block text-[2.25rem] leading-none text-ink-900">
                  {c.valor}
                </span>
                <span className="mt-2 block text-[14px] leading-snug">{c.etiqueta}</span>
                <span className="datum mt-2 block text-[11px] leading-snug text-ink-600">
                  {c.fuente}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── El rojo reservado ────────────────────────────────── */}
        <section className="mt-14">
          <h2 className="lettering rule-b-bold pb-3 text-h3">El rojo reservado</h2>
          <p className="mt-4 max-w-[66ch] text-ink-600">
            Dos usos, nunca más: elementos de protección contra incendios en el dibujo, y la acción
            principal. En un plano as-built real la contra incendios se dibuja en rojo, así que esto
            es convención técnica y no acento corporativo.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="/cotizar/"
              className="lettering inline-block bg-fire-600 px-6 py-3 text-[14px] text-paper transition-colors hover:bg-fire-700"
            >
              Solicitar cotización
            </a>
            <span className="datum text-[12.5px] text-ink-600">
              única acción en rojo por encuadre
            </span>
          </div>
        </section>

        <footer className="rule-t-bold mt-16 pt-5">
          <p className="datum text-[12.5px] text-ink-600">
            {empresa.marcaCorta} · Fase 0 · andamiaje verificado · 26.09.2026
          </p>
        </footer>
      </div>
    </main>
  )
}
