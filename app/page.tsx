import { Fotograma } from '@/components/plan/Fotograma'
import { Lamina, LaminaResponsive, Leyenda } from '@/components/plan/Lamina'
import { nombresSimbolos, Simbolo } from '@/components/plan/simbolos'
import { construirRed, servicios, type SimboloId } from '@/content/red'
import { empresa } from '@/content/empresa'

/**
 * FASE 1 — hoja de verificación de la lámina.
 *
 * Existe para cerrar la compuerta de la Fase 1, que es la más dura del proyecto:
 * el dibujo tiene que leerse como un plano técnico creíble, no como decoración.
 * Si alguien del oficio reconoce la simbología, pasa.
 *
 * No es la portada. Esa se construye en la Fase 3, sobre esta misma lámina.
 */

/** Los 8 terminales de servicio, más los 2 equipos del tronco. */
const SIMBOLOS_TRONCO: readonly SimboloId[] = ['bomba', 'valvula']

/**
 * Los 4 fotogramas del storyboard de la intro (§7.1). Los instantes están
 * elegidos para mostrar cada tramo del guion, no repartidos por igual.
 */
const FOTOGRAMAS = [
  {
    t: 0.6,
    titulo: 'Los bordes se encienden',
    tramo: '0 – 0,8 s',
    nota: 'El hairline azul se pone incandescente y vira a rojo hacia dentro, como papel que se prende por el canto. El dibujo sigue legible: se está quemando, no desapareciendo.',
  },
  {
    t: 1.2,
    titulo: 'Entra el extintor',
    tramo: '0,8 – 1,4 s',
    nota: 'Entra desde la izquierda dibujado en el mismo hairline que el resto: es un símbolo del plano, no un objeto ajeno. Pequeño rebote, se inclina, la manguera apunta al centro.',
  },
  {
    t: 2.0,
    titulo: 'La descarga redibuja',
    tramo: '1,4 – 2,4 s',
    nota: 'El chorro barre en abanico y por donde pasa las líneas vuelven a su azul frío. No se apaga un fuego: se redibuja el plano. Mirá la mitad izquierda, ya recuperada.',
  },
  {
    t: 3.0,
    titulo: 'La lámina queda limpia',
    tramo: '2,4 – 3,0 s',
    nota: 'La niebla cubre y se disipa. Queda la lámina fría y completa, y el extintor se convierte en el símbolo del ramal rojo del hero: el único elemento rojo que queda, que además es el enlace a recarga.',
  },
]

/** Los anchos que el alcance fija en §11 como objetivo responsive. */
const BREAKPOINTS = [
  { ancho: 360, nombre: 'Móvil', layout: 'alta' as const, nota: 'Diagrama de montante' },
  { ancho: 768, nombre: 'Tableta', layout: 'ancha' as const, nota: 'Isometría de red' },
  { ancho: 1024, nombre: 'Escritorio', layout: 'ancha' as const, nota: 'Isometría de red' },
  { ancho: 1440, nombre: 'Amplio', layout: 'ancha' as const, nota: 'Isometría de red' },
]

export default function VerificacionFase1() {
  const ancha = construirRed('ancha', 'viva')
  const alta = construirRed('alta', 'viva')

  const segmentosAncha = ancha.tubos.length
  const segmentosAlta = alta.tubos.length

  return (
    <main className="plan-grid min-h-screen px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* ── Cuadro de rótulo ─────────────────────────────────── */}
        <header className="rule-bold bg-paper p-6 sm:p-8">
          <h1 className="lettering text-h1">
            Fase 1<br />
            La lámina
          </h1>
          <p className="mt-4 medida text-ink-600">
            La red contra incendio de {empresa.marcaCorta}: montante, colector, anillo de retorno y
            ocho ramales, uno por línea de servicio. El ramal de extintores es lo único en rojo, y
            es la entrada de la audiencia primaria.
          </p>

          <dl className="rule-t-hair mt-6 grid gap-x-8 gap-y-3 pt-5 sm:grid-cols-3 lg:grid-cols-4">
            {[
              ['Proyección', 'Isométrica · 30°'],
              ['Grosores', '0,5 / 1 / 2 px'],
              ['Segmentos', `${segmentosAncha} anchos · ${segmentosAlta} altos`],
              ['Símbolos', '10 normados'],
              ['Norma', 'NFPA 10 · NTP 350.043'],
              ['Sombras', 'Ninguna'],
              ['Radio de esquina', '0'],
              ['Revisión', 'F1 · 26.09.2026'],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="datum text-[11px] uppercase tracking-[0.13em] text-ink-600">{k}</dt>
                <dd className="datum mt-1 text-[12.5px] font-medium text-ink-900">{v}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* ── La lámina, viva ──────────────────────────────────── */}
        <section className="mt-14">
          <h2 className="lettering rule-b-bold pb-3 text-h3">La lámina</h2>
          <p className="mt-4 medida text-ink-600">
            Cambiá el ancho de la ventana: por debajo de 768 px el dibujo no se encoge, cambia de
            artefacto. La isometría de red pasa a diagrama de montante, que es otro documento real
            del mismo oficio y es vertical por naturaleza.
          </p>
          <div className="rule-line mt-6 bg-paper p-4 sm:p-8">
            <LaminaResponsive instancia="viva" />

            <div className="rule-t-bold mt-8 pt-5">
              <p className="datum mb-2 text-[11px] tracking-[0.13em] text-ink-600 uppercase">
                Leyenda
              </p>
              <Leyenda />
            </div>
          </div>
        </section>

        {/* ── Los 4 breakpoints ────────────────────────────────── */}
        <section className="mt-14">
          <h2 className="lettering rule-b-bold pb-3 text-h3">Los cuatro anchos</h2>
          <p className="mt-4 medida text-ink-600">
            Cada caja monta su layout de forma explícita. Las clases responsive miran el viewport,
            no el contenedor, así que sin esto una caja de 360 px en una pantalla ancha mostraría la
            isometría y la verificación sería falsa.
          </p>

          <div className="mt-8 space-y-10">
            {BREAKPOINTS.map((bp) => (
              <figure key={bp.ancho}>
                <figcaption className="rule-b-line flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pb-2">
                  <span className="lettering text-[13px]">
                    {bp.nombre} · {bp.ancho} px
                  </span>
                  <span className="datum text-[12.5px] text-ink-600">{bp.nota}</span>
                </figcaption>

                {/* overflow-x-auto: a 1440 la caja no debe empujar la página */}
                <div className="mt-4 overflow-x-auto">
                  <div
                    className="rule-hair bg-paper p-4"
                    style={{ width: bp.ancho, maxWidth: '100%' }}
                  >
                    <Lamina layout={bp.layout} instancia={`bp${bp.ancho}`} />
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </section>

        {/* ── Los símbolos ─────────────────────────────────────── */}
        <section className="mt-14">
          <h2 className="lettering rule-b-bold pb-3 text-h3">Símbolos normados</h2>
          <p className="mt-4 medida text-ink-600">
            Ocho terminales de servicio más los dos equipos del tronco. Derivados de la simbología
            real del oficio —el símbolo P&amp;ID de bomba centrífuga, la mariposa de una válvula de
            compuerta, el hidrante de pilar con sus dos salidas—, no de una librería de iconos.
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-px sm:grid-cols-4 lg:grid-cols-5">
            {servicios.map((s) => (
              <li key={s.slug} className="rule-hair flex flex-col gap-3 bg-paper p-4">
                <span
                  className={s.tinta === 'fire' ? 'text-fire-600' : 'text-ink-900'}
                  aria-hidden="true"
                >
                  <Simbolo id={s.simbolo} tamano={44} decorativo />
                </span>
                <span>
                  <span className="datum block text-[11px] text-ink-600">{s.n}</span>
                  <span className="lettering block text-[12.5px] leading-tight">
                    {nombresSimbolos[s.simbolo]}
                  </span>
                  <span className="mt-1 block text-[12px] leading-snug text-ink-600">
                    {s.nombre}
                  </span>
                </span>
              </li>
            ))}

            {SIMBOLOS_TRONCO.map((id) => (
              <li key={id} className="rule-hair flex flex-col gap-3 bg-paper-alt p-4">
                <span className="text-ink-900" aria-hidden="true">
                  <Simbolo id={id} tamano={44} decorativo />
                </span>
                <span>
                  <span className="datum block text-[11px] text-ink-600">tronco</span>
                  <span className="lettering block text-[12.5px] leading-tight">
                    {nombresSimbolos[id]}
                  </span>
                  <span className="mt-1 block text-[12px] leading-snug text-ink-600">
                    Equipo de la red, no es un ramal
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Storyboard de la intro ───────────────────────────── */}
        <section className="mt-14">
          <h2 className="lettering rule-b-bold pb-3 text-h3">Storyboard de la intro</h2>
          <p className="medida mt-4 text-ink-600">
            Los cuatro fotogramas del guion de §7.1, renderizados desde la geometría real de la
            lámina. No son una ilustración del efecto: son el efecto congelado. El mismo modelo de
            calor que va a mover la animación de la Fase 6 decide acá el color de cada segmento, así
            que esto también prueba que el enfoque es viable antes de comprometerse con él.
          </p>

          <div className="mt-8 space-y-10">
            {FOTOGRAMAS.map((f) => (
              <figure key={f.t}>
                <figcaption className="rule-b-line flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pb-2">
                  <span className="flex flex-wrap items-baseline gap-x-3">
                    <span className="datum text-[12.5px] text-ink-600">{f.tramo}</span>
                    <span className="lettering text-[13px]">{f.titulo}</span>
                  </span>
                  <span className="datum text-[12.5px] text-ink-600">t = {f.t.toFixed(1)} s</span>
                </figcaption>
                <div className="rule-hair mt-4 bg-paper p-4">
                  <Fotograma t={f.t} instancia={`sb${String(f.t).replace('.', '')}`} />
                </div>
                <p className="medida mt-3 text-[13px] leading-snug text-ink-600">{f.nota}</p>
              </figure>
            ))}
          </div>

          <div className="rule-bold mt-10 bg-paper p-5">
            <p className="datum mb-2 text-[11px] tracking-[0.13em] text-ink-600 uppercase">
              Por qué sale más barato
            </p>
            <p className="medida text-[13px] leading-snug text-ink-600">
              Desaparece el shader GLSL de fuego con ruido fBm, que era el ítem más caro del
              presupuesto de 40 KB y el más difícil de hacer bien. El calor se aplica interpolando
              el color del trazo de los segmentos SVG que el hero ya carga. Sin WebGL, sin{' '}
              <code className="datum text-[12.5px]">ogl</code>, sin respaldo de{' '}
              <code className="datum text-[12.5px]">feTurbulence</code>. Y baja el riesgo
              fotosensible solo: la superficie roja simultánea de unas líneas es una fracción de la
              de un fuego lleno.
            </p>
          </div>
        </section>

        {/* ── Segmentos direccionables ─────────────────────────── */}
        <section className="mt-14">
          <h2 className="lettering rule-b-bold pb-3 text-h3">Segmentos direccionables</h2>
          <p className="mt-4 medida text-ink-600">
            La Fase 6 interpola el <code className="datum text-[13px]">stroke</code> de cada
            segmento para que el plano se incendie y se vuelva a dibujar. Por eso cada tubo lleva su{' '}
            <code className="datum text-[13px]">id</code> estable y sus{' '}
            <code className="datum text-[13px]">data-*</code>: sin esto, animarlo sería imposible y
            habría que rehacer el SVG.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[34rem] text-[13px]">
              <thead>
                <tr>
                  {['id', 'ramal', 'peso', 'tinta', 'vértices'].map((h) => (
                    <th
                      key={h}
                      className="rule-b-line datum pr-6 pb-2.5 text-left text-[11px] font-bold tracking-[0.13em] text-ink-600 uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ancha.tubos.map((t) => (
                  <tr key={t.id} className="rule-b-hair">
                    <td className="datum py-2 pr-6 text-[12.5px]">{t.id}</td>
                    <td className="py-2 pr-6 text-ink-600">{t.ramal ?? '—'}</td>
                    <td className="datum py-2 pr-6 text-[12.5px] text-ink-600">{t.peso}</td>
                    <td className="datum py-2 pr-6 text-[12.5px] text-ink-600">{t.tinta}</td>
                    <td className="datum py-2 text-right text-[12.5px] tabular-nums text-ink-600">
                      {t.puntos.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="rule-t-bold mt-16 pt-5">
          <p className="datum medida text-[12.5px] text-ink-600">
            {empresa.marcaCorta} · Fase 1 · los enlaces de cada ramal apuntan a{' '}
            <code className="text-[12.5px]">/servicios/[slug]/</code>, que se construye en la Fase 4
            · 26.09.2026
          </p>
        </footer>
      </div>
    </main>
  )
}
