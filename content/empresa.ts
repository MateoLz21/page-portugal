/**
 * Verdad de la empresa. Fuente: docs/scope_1.md §3.1 y PRODUCT.md.
 *
 * REGLA DEL ARCHIVO (docs/scope_1.md §13.1): todo dato que el cliente
 * todavía no entregó es `null` o `[]`, y la UI **no renderiza el bloque**
 * en lugar de mostrarlo vacío o inventarlo. Un vacío honesto vale más que
 * un relleno que un comprador minero desmiente en la primera reunión.
 */

export type Red = { red: string; url: string }

export const empresa = {
  /* ── Confirmado ────────────────────────────────────────────── */

  /** Grafía del PDF, sin "y". Es la que va en todo texto legal:
   *  footer, contacto, política de privacidad. Falta confirmar
   *  contra SUNAT por el RUC (§13.1 punto 5). */
  razonSocial: 'Portugal Seguridad Industrial Minera E.I.R.L.',

  /** Grafía comercial, con "y". Solo para <title> y hero. */
  nombreComercial: 'Portugal Seguridad Industrial y Minera',

  marcaCorta: 'PORTUGAL',
  ruc: '20600361172',
  dominio: 'cortaincendiosportugal.com',

  direccion: {
    calle: 'Urb. 12 de Octubre H-18',
    distrito: 'Cerro Colorado',
    ciudad: 'Arequipa',
    pais: 'Perú',
  },

  /** Array desde el inicio: agregar un fijo es editar una línea. */
  telefonos: ['+51932481153'],
  whatsapp: '+51932481153',

  /** Se reemplaza por el buzón Zoho del dominio cuando exista (§8.3). */
  email: 'seguridadportugal@gmail.com',

  aniosExperiencia: 20,
  normativa: ['NFPA', 'Normas Técnicas Peruanas (NTP)'],

  /** Resumen del pie. Es el subtítulo del hero de §4.1, sin agregar nada. */
  resumen:
    'Recarga de extintores, redes de agua, detección y capacitación. ' +
    'Normas NFPA y NTP. Más de 20 años en Arequipa.',

  /* ── Pendiente del cliente: null / [] = el bloque no se dibuja ── */

  /** §13.1 punto 2. Sin este dato se omite el bloque de horario Y
   *  `openingHours` del JSON-LD: un horario inventado en datos
   *  estructurados es peor que ninguno, porque Google lo publica. */
  horario: null as string | null,

  /** §13.1 punto 3. Vacío = no se dibuja la fila de iconos ni `sameAs`.
   *  Nunca un icono que no lleva a ningún lado. */
  redes: [] as Red[],

  /** §13.1 punto 11. Vacío = no hay sección de sellos. La confianza se
   *  arma con lo que sí está documentado: NFPA/NTP, auditorías MINEM y
   *  de aseguradoras, +20 años. No se dibujan escudos inventados. */
  certificaciones: [] as string[],

  /** §13.1 punto 13. Se verifica con DNS y whois el día del despliegue. */
  dominioAnterior: 'portugalseguridad.com',
} as const

/** Las 4 cifras de §4.1. Todas derivadas del contenido documentado, ninguna
 *  inventada. Se muestran como banda tipográfica con filetes, nunca como
 *  fila de tarjetas con número grande — ese patrón lo rechaza el skill. */
export const cifras = [
  { valor: '+20', etiqueta: 'años de experiencia', fuente: 'PDF de perfil empresarial' },
  { valor: '12', etiqueta: 'clientes corporativos', fuente: 'cartera de §3.4, contada' },
  { valor: '8', etiqueta: 'líneas de servicio', fuente: 'los 8 servicios de §3.3' },
  {
    valor: '7',
    etiqueta: 'regiones del Perú',
    fuente: 'Arequipa, Pasco, Ica, Cusco, La Libertad, Cajamarca, Moquegua',
  },
] as const

/** Una etiqueta por intención (regla de §6.5). Se importa desde acá para que
 *  no aparezcan "Cotizar", "Contáctanos" y "Pide tu cotización" mezclados. */
export const cta = {
  /** Header, hero, páginas de servicio y footer. Siempre este texto. */
  cotizar: 'Solicitar cotización',
  /** Distinto de arriba a propósito: cotiza *ese* producto, otra intención. */
  cotizarProducto: 'Cotizar',
  whatsapp: 'Escribir por WhatsApp',
} as const

/** Enlace de WhatsApp con mensaje ya escrito. */
export function urlWhatsApp(mensaje = 'Hola, quisiera una cotización.'): string {
  const numero = empresa.whatsapp.replace(/\D/g, '')
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`
}

/** Teléfono en formato legible para Arequipa: 932 481 153 */
export function telefonoLegible(e164: string): string {
  const d = e164.replace(/\D/g, '').replace(/^51/, '')
  return d.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')
}
