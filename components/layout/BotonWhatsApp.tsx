import { IconoWhatsApp } from '@/components/ui/iconos'
import { cta, urlWhatsApp } from '@/content/empresa'

/**
 * Botón flotante de WhatsApp: **el único elemento circular del sitio** (§6.6).
 *
 * Es un objeto ajeno a la lámina y tiene que leerse como tal, así que lleva su
 * propio radio y su propio color. Se ve por eso y no porque late: el pulso de
 * v1.1 se retiró (§7), un bucle infinito sin motivo.
 *
 * El aro de papel es oclusión, no adorno: separa el botón del dibujo que le
 * pase por detrás, como el halo de un símbolo sobre la tubería.
 */
export function BotonWhatsApp({ mensaje }: { mensaje?: string }) {
  return (
    <a
      href={urlWhatsApp(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${cta.whatsapp} (abre en otra pestaña)`}
      className="fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-whatsapp border-2 border-paper bg-whatsapp text-paper sobre:bg-ink-900 pulsado:bg-ink-900"
    >
      <IconoWhatsApp tamano={28} />
    </a>
  )
}
