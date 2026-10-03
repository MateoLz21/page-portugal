<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- Lo que sigue es del proyecto, no de Next. Vive despues del marcador
     END:nextjs-agent-rules a proposito: `next dev` reescribe solo su propio
     bloque, asi que esto sobrevive a cada arranque. -->

# Portugal Seguridad — arranque de sesión

## Leé `BITACORA.md` primero

**No escanees el repositorio para saber dónde está el proyecto.** `BITACORA.md`
tiene el estado, los pendientes, el mapa de documentos y las trampas ya
descubiertas. Está escrito para que una sesión nueva arranque sin explorar.

Si la bitácora contradice al código, **el código gana** y hay que corregirla.

## Qué es este proyecto

Sitio corporativo estático para Portugal Seguridad Industrial y Minera E.I.R.L.
(Arequipa, Perú). Next.js con exportación estática hacia un cPanel compartido
—sin runtime de Node—, así que los formularios se resuelven con PHP.

Se trabaja **por fases, con una compuerta medible cada una**. El plan está en
`docs/plan-de-desarrollo.md`. No se salta de fase sin cerrar la anterior.

## Reglas del proyecto

1. **Ningún dato sin respaldo.** Si una cifra, un sello, un testimonio o un logo
   de cliente no está documentado, **el bloque no se renderiza**. Los campos
   pendientes viven como `null` o `[]` en `/content` y la UI los omite. Un vacío
   honesto vale más que un relleno que el cliente desmiente.
2. **El mundo visual está decidido y es vinculante:** «Plano As-Built». El
   contrato está en `.impeccable/surfaces/app-page-tsx.md` y no se reinterpreta.
   Profundidad por grosor de línea y oclusión, **nunca por sombra**. Radio de
   esquina `0`. Rojo reservado a protección contra incendios y a la acción
   principal.
3. **`content/red.ts` es la única fuente de la geometría** de la lámina. Mover un
   ramal es editar un número ahí, nunca tocar coordenadas en el componente.
4. **Antes de cerrar una fase:** `build`, `lint`, `typecheck` y `format:check` en
   verde, y el detector de `impeccable` en cero contra el código **y** contra la
   página renderizada (`detect http://localhost:4311/`, que mide valores
   computados y encuentra lo que el análisis estático no ve).
5. **Versiones fijadas a propósito.** eslint en 9 y TypeScript en 6.0.3. El
   motivo está en `BITACORA.md`; no los subas sin leerlo.
6. **No saques nada de `.prettierignore`.** `.claude/` y `.impeccable/` son
   dependencias vendorizadas; reformatearlas rompe el skill.
7. **Los commits y el push los hace el usuario.** No commitees salvo que lo pida.

## Idioma

El sitio es solo en español (es-PE). El código, los comentarios y la
documentación también van en español. Los nombres de símbolos siguen el dominio
del oficio: `montante`, `ramal`, `cota`, `rótulo`, `tinta`, `grosor`.
