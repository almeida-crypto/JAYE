# Tarea para Open Code: crear la sección **Aprende** del sitio JAYE (Hanal Pixán, Mérida, Yucatán)

Eres un desarrollador front-end. Vas a crear **solo** la carpeta `aprende/` dentro del repositorio JAYE. Antes de escribir código, **lee estos archivos** para copiar el estilo y las reglas del proyecto:

1. `README.md` (raíz)
2. `data/elementos.json` (datos compartidos; **no se escriben textos dos veces**)
3. `entiende/README.md`
4. `entiende/css/entiende.css` (paleta y componentes)
5. `entiende/js/datos.js` (cómo se maneja idioma y ficha)
6. `entiende/index.html` y `entiende/foto.html` (estructura de páginas)
7. `index.html` (inicio provisional)

---

## 1. Qué es el proyecto

**JAYE · Juega, Aprende y Entiende** es el sitio web del altar de **Hanal Pixán** del grupo de TICs. Un solo QR abre el sitio, que tiene tres secciones, todo en **español e inglés**:

| Sección | Carpeta | Estado |
|---|---|---|
| Juega | `juega/` | Otro equipo (juego «Arma el altar») |
| **Aprende** | `aprende/` | **Tu tarea** |
| Entiende | `entiende/` | Hecha (cámara con MindAR + foto con puntos) |

**Aprende** es la página educativa: explica **qué es el Hanal Pixán yucateco**, cuándo se celebra, cómo se arma el altar, qué se come, qué palabras en maya se usan y qué lo distingue de otras celebraciones. Es para visitantes (jueces, público general) que entran desde el celular.

---

## 2. Reglas obligatorias del proyecto

### 2.1 Contenido
- **Solo tradición de Hanal Pixán de Mérida, Yucatán.** Nada genérico de «Día de Muertos» de otras regiones de México.
- **Prohibido** como imagen o elemento decorativo: calaveritas, catrinas, calaveras de azúcar, esqueletos, Halloween, estilo de la película *Coco*, cempasúchil grande (*Tagetes erecta*) como protagonista. La flor propia de la península es el **xpujuk**. (El proyecto ya excluye calaveritas y cempasúchil a propósito; ver `entiende/README.md` y el elemento `flores` del JSON.)
- **No inventes datos.** Cada afirmación debe salir de `data/elementos.json` (campos `queEs`, `porQue`, `historia`, `maya.nota`) o de una fuente de `fuentes`. Si necesitas texto general nuevo, usa solo lo que está en la sección 6 de este documento y cítalo con claves existentes de `fuentes`.
- Los textos están **sin revisar por un practicante de la tradición** (`"verificado": false`). Mientras sea `false`, muestra el aviso «Texto investigado; falta la revisión final de alguien que practica la tradición.» (en inglés también), igual que la ficha de Entiende.
- Escribe **«Hanal Pixán»** con acento. Algunas fuentes usan «Janal Pixán»: es la misma tradición; puedes mencionarlo una vez como variante de escritura.

### 2.2 Idioma (español + inglés)
- Todo texto visible tiene versión `es` y `en`.
- El idioma se guarda en `localStorage` con la clave **`jaye-idioma`** y en la URL con **`?lang=en`** (si es `es`, no hace falta). Prioridad al iniciar: `?lang=` → `localStorage` → `es`.
- Al cambiar de idioma: actualizar `document.documentElement.lang`, guardar en `localStorage`, `history.replaceState` con `?lang=`, repintar la página **sin recargar** y disparar `document.dispatchEvent(new CustomEvent('idioma:cambio', { detail: idioma }))`.
- Selector **ES | EN** con la misma apariencia que `.selector-idioma` de Entiende (botones con `aria-pressed`).
- Los enlaces internos (a `../index.html`, `../entiende/`, `../juega/`) deben conservar el idioma agregando `?lang=en` cuando esté en inglés.
- Las palabras en maya llevan `lang="yua"`.

### 2.3 Estructura técnica
- **Todo dentro de `aprende/`.** No modifiques `entiende/`, `juega/`, `data/elementos.json` ni el `index.html` de la raíz. (Si realmente necesitas un campo nuevo, el README permite agregarlo a `elementos.json`, pero **aquí no hace falta**: guarda tu contenido extra en `aprende/`.)
- **HTML + CSS + JavaScript puro (vanilla).** Sin frameworks, sin npm, sin build, sin CDN, sin Google Fonts. Debe funcionar con `python -m http.server 8000` y en GitHub Pages (HTTPS). Usa `font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.
- Los datos se leen con `fetch('../data/elementos.json')` (ruta relativa; la carpeta se copia luego a la raíz, así que **crea una sola constante `RAIZ = '../'`** para poder cambiarla fácil).
- Escapa el texto antes de insertarlo con `innerHTML` (función `esc`) o usa `textContent`.
- Maneja el error de carga del JSON con un mensaje visible (`.aviso-error`).
- Todo el sitio vive en la red de la universidad y se abre en celulares: **ligero**: HTML + CSS + JS < 150 KB sin contar el JSON; los SVG de `img/iconos/` se cargan con `loading="lazy"` y cada uno pesa menos de 8 KB.

### 2.4 Diseño (copiar el estilo de Entiende)
Usa **exactamente** estas variables en `aprende/css/aprende.css` (no importes el CSS de Entiende para no depender de esa carpeta; redeclara las variables):

```css
:root {
  --fondo: #160f1f;
  --fondo-2: #23182f;
  --texto: #fbf3e6;
  --texto-suave: #cdbfd6;
  --naranja: #f5a02a;   /* xpujuk */
  --rosa: #e2457a;      /* papel picado */
  --morado: #7c4dbd;
  --borde: rgba(255, 255, 255, 0.14);
  --sombra: 0 10px 30px rgba(0, 0, 0, 0.45);
  --radio: 18px;
}
```

- Tema **oscuro** (fondo `--fondo`), **mobile-first**, columna central `max-width: 520px` (en pantallas grandes puede ensancharse a ~760px).
- Arriba, la franja de **papel picado** en CSS puro (clase `.papel-picado`, copiar la de `entiende.css`).
- Tarjetas: fondo `--fondo-2`, borde `1px solid var(--borde)`, `border-radius: var(--radio)`.
- Botones tipo píldora (`.boton`, naranja, `min-height: 52px`) y `.boton.secundario` (borde).
- Etiquetas pequeñas en mayúsculas con `letter-spacing` en `--naranja` o `--texto-suave` (como `.eyebrow` y `.ficha h3`).
- Referencia visual de la **tradición yucateca** (sin salirte de la paleta): bordado de **punto de cruz** (*xokbil chuuy*, «hilo contado»), flores de **hipil**, papel picado. Crea un separador de punto de cruz en CSS (por ejemplo una franja con `background` de `linear-gradient` en diagonal que forme X pequeñas en `--rosa`/`--naranja`/`--morado`) y úsalo entre secciones.
- Cada **zona del altar** usa el color de `zonas[zona].color` del JSON (verde, naranja, rojo, rosa, azul, morado) como acento lateral o punto de la tarjeta.
- Accesibilidad: objetivos táctiles ≥ 44 px, contraste suficiente, `:focus-visible` visible, `prefers-reduced-motion` respetado (sin animaciones si está activo), `viewport-fit=cover` y `env(safe-area-inset-*)`.

---

## 3. Archivos a crear

```
aprende/
├── index.html          # página única con todas las secciones
├── README.md           # cómo probarla, regenerar SVG y agregar imágenes
├── css/aprende.css
├── herramientas/
│   └── exportar_iconos_svg.py   # genera los SVG a partir de los íconos de Entiende
├── img/
│   └── iconos/         # <id>.svg (38), _generico.svg, zona-*.svg, ninos.svg, adultos.svg, cabecera.svg
├── js/textos.js        # textos de la interfaz y contenido general (es/en)
└── js/aprende.js       # idioma, carga del JSON, pintado, ficha, imágenes/SVG
```

`index.html` con `<meta name="theme-color" content="#160f1f">`, título «Aprende · Hanal Pixán» (y su versión en inglés al cambiar de idioma), y un `<noscript>` con un aviso.

---

## 4. Secciones de la página (en este orden)

Todas son tarjetas dentro de una sola página con desplazamiento vertical, más un **menú de anclas** pegajoso (chips horizontales desplazables) para saltar entre secciones.

1. **Cabecera.** Franja de papel picado, `eyebrow` «Juega · Aprende · Entiende» con «Aprende» resaltado, selector ES | EN, `h1` «Aprende sobre el Hanal Pixán», subtítulo corto (sección 6, texto A).
2. **¿Qué es el Hanal Pixán?** Texto B (sección 6). Incluye el significado de las palabras: *hanal* = comida, *pixán* = ánimas.
3. **¿Cuándo se celebra?** Dos tarjetas lado a lado (apiladas en celular): **31 de octubre · niños** (bordados de colores, velas de colores) y **1 de noviembre · adultos** (bordados negros, velas blancas grandes). Los datos salen de los elementos `mantel` y `velas` del JSON.
4. **El camino de las ánimas.** Línea de tiempo vertical de 4 pasos, con textos tomados del JSON: **cal** (marca el camino) → **velas** (guían) → **incienso/copal** (aroma) → **comida** (se ofrece primero a las ánimas y después se comparte). Cada paso abre la ficha del elemento correspondiente (`cal`, `velas`, `incienso`, `pib`).
5. **El altar por partes.** Las **6 zonas** de `zonas` (Mesa, cruz y recuerdos; Luz, aroma y camino; Comida; Frutas y dulces; Bebidas y recipientes; Ropa y cocina), cada una como acordeón (`<details>`). Dentro, la lista de sus elementos (filtrar `elementos` por `camara.zona`), cada uno como botón con su número `n`, nombre y nombre maya en `<small lang="yua">`. Al tocar, abre la **ficha**.
6. **Sabores del Hanal Pixán.** Tarjetas horizontales (carrusel con `scroll-snap`) con los elementos de `categoria === 'comida'` y las bebidas: muestra nombre, nombre maya y una frase corta (primera oración de `queEs`). Al tocar, abre la ficha. Destaca el **pib (mukbil pollo)** como «el platillo central».
7. **Palabras en maya.** Glosario generado automáticamente de todos los elementos con `maya.nombre`: palabra en maya (grande, `--naranja`), nombre en español/inglés y `maya.nota`. Agrega una etiqueta por `maya.tipo`: `tradicional`, `descriptivo` («traducción descriptiva»), `relacionado` («palabra relacionada»). Los elementos con tipo `sin` van al final en una nota: «Algunos elementos no tienen nombre maya tradicional (por ejemplo el escabeche)». Incluye un **buscador** simple que filtra el glosario mientras se escribe.
8. **Datos curiosos.** Carrusel o lista de 5–6 tarjetas, cada una con el campo `historia` de un elemento (sugeridos: `velas`, `pib`, `cal`, `flores`, `china`, `yuca`) y un botón «Ver ficha».
9. **Lo que no es.** Tarjeta que aclara con respeto lo que distingue al Hanal Pixán yucateco (texto C, sección 6): no usa calaveritas ni catrinas; la flor propia es el xpujuk y no el cempasúchil grande.
10. **Fuentes.** Lista de **todas** las entradas de `fuentes` como enlaces (`target="_blank" rel="noopener"`), más el aviso de revisión pendiente mientras `verificado` sea `false`.
11. **Pie.** Botones: `← Volver al inicio` (`../index.html`), `Entiende el altar` (`../entiende/`) y `Juega` (`../juega/`), todos conservando el idioma.

### Ilustraciones SVG (por defecto) e imágenes (opcionales)
Cada elemento se muestra con una **ilustración SVG en punto de cruz** creada por nosotros. Si el equipo más adelante agrega una imagen real, **la imagen reemplaza al SVG**. Orden de prioridad para dibujar un elemento:

1. `el.imagen` (si trae ruta) → `<img>` con esa imagen.
2. Si no hay `imagen` o falla al cargar (`onerror`) → el **SVG del elemento** (`aprende/img/iconos/<id>.svg`).
3. Si tampoco existe ese SVG → un SVG genérico de flor de xpujuk bordada (`aprende/img/iconos/_generico.svg`). Nunca debe verse un ícono roto ni un hueco.

**Cómo crear los SVG (hazlo con un script, no a mano):** el proyecto ya dibuja un ícono bordado de 40 × 40 puntadas por cada uno de los 38 elementos en `entiende/herramientas/generar_tarjetas.py` (diccionario `ICONOS`, paleta `HILO`, y la función `puntada()` que dibuja cada puntada en X). **Reutilízalos para que Aprende se vea igual que las tarjetas de Entiende**:

- Crea `aprende/herramientas/exportar_iconos_svg.py` (requiere `pillow`). Importa `ICONOS`, `HILO`, `G` y `nuevo` desde `../../entiende/herramientas/generar_tarjetas.py` (**solo importar; no modificar ese archivo**). Para cada `id` de `ICONOS`: crea la imagen con `nuevo()`, llama a la función del ícono y lee los píxeles con `a > 128`.
- Genera `aprende/img/iconos/<id>.svg` con `viewBox="0 0 40 40"`, **sin** `width`/`height` fijos, con `role="img"` y fondo transparente. **Usa este método compacto** (probado: los 38 íconos suman unos 93 KB y el mayor pesa unos 5 KB; dibujar cada X como un trazo aparte pesa 870 KB y **no se acepta**):
  1. Por cada color de `HILO` que use el ícono, define un `<pattern>` de una puntada en X: `<pattern id="p0" width="1" height="1" patternUnits="userSpaceOnUse"><path d="M.15 .15l.7 .7M.85 .15l-.7 .7" stroke="#RRGGBB" stroke-width=".3" stroke-linecap="round" fill="none"/></pattern>`.
  2. Recorre cada fila de la cuadrícula y agrupa las puntadas contiguas del mismo color en **corridas** (`M x y h w v1 h-w z`). Un solo `<path fill="url(#p0)" d="...">` por color con todas sus corridas.
  3. Resultado: `<svg ...><defs>patrones</defs><path fill="url(#p0)" d="..."/>...</svg>`. Cada archivo debe pesar **menos de 8 KB**. Como se cargan con `<img>`, los `id` de los patrones no chocan entre archivos.
  4. **Revisa visualmente** al menos 5 SVG abriéndolos en el navegador (que se vean como hilo cruzado, sin líneas o huecos entre puntadas) y compáralos con sus tarjetas en `entiende/targets/tarjetas/`.
- Crea también `_generico.svg` (flor de xpujuk con el motivo `FLOR` del mismo script) y estos SVG de apoyo, en el mismo estilo de punto de cruz y la misma paleta: `zona-base.svg`, `zona-luz.svg`, `zona-comida.svg`, `zona-frutas.svg`, `zona-bebidas.svg`, `zona-ropa.svg` (puedes reutilizar el ícono de un elemento representativo de cada zona), `ninos.svg` y `adultos.svg` (para las fechas del 31 de octubre y 1 de noviembre: una vela de color con flores para niños y una vela grande blanca para adultos) y `cabecera.svg` (franja de grecas y flores de hipil con `FLOR`, `HOJA`, `ESTRELLA`, `GRECA`).
- **Motivos prohibidos** en cualquier SVG: calaveras, catrinas, esqueletos, cempasúchil grande.
- Si el script no puede ejecutarse, dibuja los SVG de manera equivalente en JavaScript (`aprende/js/iconos.js`) a partir de los mismos datos; pero **la ruta preferida es el script**.
- Los SVG se cargan con `<img src="img/iconos/<id>.svg" alt="" loading="lazy">` (decorativos: `alt=""` porque el nombre del elemento ya está escrito al lado) o con `alt` = nombre del elemento si la ilustración va sola. Para que se vean nítidos al ampliarse: `image-rendering: auto` y `width: 100%; aspect-ratio: 1`.

**Dónde aparecen las ilustraciones:**
- Ficha del elemento (arriba del título), en una caja de 160–200 px con fondo `--fondo` y borde `--borde`, redondeada.
- Botones del acordeón «El altar por partes», a la izquierda del nombre (44 px).
- Tarjetas de Sabores y Datos curiosos.
- Glosario maya (pequeño, 32 px).
- Pasos del camino de las ánimas.
- Cabecera, fechas y encabezados de zona.

**Imágenes reales (opcionales, vacías por ahora):**
- Usa el campo existente `imagen` de cada elemento en `elementos.json` (hoy vacío: `""`). Si trae ruta, se muestra en lugar del SVG con `object-fit: cover`, `border-radius: 12px` y `loading="lazy"`. La ruta se resuelve con `RAIZ + el.imagen`, salvo que empiece con `http`, `//` o `/`. `alt` = nombre del elemento en el idioma actual.
- Para las imágenes generales de la página agrega al inicio de `aprende/js/aprende.js` este bloque, **vacío por ahora**; si `src` tiene ruta, sustituye al SVG correspondiente:

```js
// Imágenes de Aprende. '' = usar el SVG por defecto; con ruta (relativa a aprende/) = usar esa imagen.
var IMAGENES = {
  cabecera:   { src: '', alt: { es: '', en: '' } },
  ninos:      { src: '', alt: { es: '', en: '' } },   // 31 de octubre
  adultos:    { src: '', alt: { es: '', en: '' } },   // 1 de noviembre
  loQueNoEs:  { src: '', alt: { es: '', en: '' } }
};
```
- Las imágenes que el equipo agregue después deben ser **propias o con licencia libre**, locales (nada de enlaces a otros sitios), de unos 800 px de ancho, en JPG o WebP y de menos de 100 KB, y mostrar solo cosas de la tradición yucateca.
- **No descargues ni agregues fotos tú.** Solo SVG creados por el script.
- Crea `aprende/README.md` con: cómo probar, cómo regenerar los SVG (`python herramientas/exportar_iconos_svg.py`) y una sección corta «Cómo agregar imágenes» (guardar en `aprende/img/`, poner la ruta en `imagen` del elemento o en `IMAGENES`, revisar el texto alternativo en ES y EN).

### La ficha (hoja inferior)
Reutiliza el **mismo comportamiento y estilo** de la ficha de Entiende (reimplementada dentro de `aprende/`, no importada):
- `section.ficha` fija abajo con `role="dialog"`, `aria-modal="true"`, fondo `.ficha-fondo`, altura máxima 78vh, cierra con el botón «Entendido / Got it», tocando el fondo o con `Esc`.
- Contenido, en este orden: `Nº n`, `h2` con el nombre en el idioma actual, bloque de **nombres** (en maya con `lang="yua"` + nota + etiqueta de tipo; y el nombre en el otro idioma), «¿Qué es?», «¿Por qué está en el altar yucateco?», «Un poco de historia», imagen (`el.imagen`) o, si no hay, el SVG del elemento, botón de audio si `el.audio` existe, `<details>` de **Fuentes** (resolviendo las claves contra `fuentes`) y el aviso de revisión si `verificado === false`.
- Etiquetas de la ficha (es / en): «En maya / In Maya», «En inglés / In English» o «En español / In Spanish», «¿Qué es? / What is it?», «¿Por qué está en el altar yucateco? / Why is it on a Yucatecan altar?», «Un poco de historia / A bit of history», «Fuentes / Sources», «Entendido / Got it».

---

## 5. Cómo debe quedar el código (guía)

```js
// aprende/js/aprende.js (esquema)
(function () {
  'use strict';
  var RAIZ = '../';
  var CLAVE = 'jaye-idioma';
  var IDIOMAS = ['es', 'en'];
  var idioma = idiomaInicial();          // ?lang= → localStorage → 'es'
  var datos = null;

  function t(obj) { return obj ? (obj[idioma] || obj.es || '') : ''; }   // texto {es,en}
  function tx(clave) { return (TEXTOS[idioma] && TEXTOS[idioma][clave]) || TEXTOS.es[clave] || clave; }

  fetch(RAIZ + 'data/elementos.json', { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error('elementos.json (' + r.status + ')'); return r.json(); })
    .then(function (d) { datos = d; pintarTodo(); })
    .catch(function (e) { /* mostrar .aviso-error */ });

  document.addEventListener('idioma:cambio', function () { if (datos) pintarTodo(); });
})();
```

- `pintarTodo()` vuelve a dibujar todas las secciones usando `idioma`. Los elementos con `data-t="clave"` se traducen con `tx()`.
- `TEXTOS` (en `textos.js`) tiene `es` y `en` con **todas** las cadenas de la interfaz y el contenido general de la sección 6.
- Nada de `alert()`, nada de `localStorage` sin `try/catch`.

---

## 6. Contenido general (usar tal cual; ya está redactado para no inventar datos)

Cita con las claves de `fuentes`: `uady-pixan`, `yuc-gob`, `yuc-travel`, `poresto-guia`, `posta-altar`, `elmomento`.

**Texto A (subtítulo)**
- es: «La comida de las ánimas: cómo se vive el Hanal Pixán en Yucatán.»
- en: «The food of the souls: how Hanal Pixán is lived in Yucatán.»

**Texto B (¿Qué es?)** — fuentes: `uady-pixan`, `yuc-gob`
- es: «Hanal Pixán significa «comida de las ánimas» en lengua maya: *hanal* es comida y *pixán* son las ánimas o almas. Es la tradición con la que las familias yucatecas reciben a sus seres queridos que ya fallecieron. Se arma una mesa con luz, aroma, flores y los alimentos que más les gustaban para que las ánimas regresen a casa. Primero se ofrece la comida a las ánimas y, después de que «toman la gracia», los vivos la comparten. En algunas fuentes lo verás escrito «Janal Pixán»: es la misma tradición.»
- en: «Hanal Pixán means "food of the souls" in the Maya language: *hanal* is food and *pixán* are the souls. It is the tradition through which Yucatecan families welcome their loved ones who have passed away. A table is set with light, scent, flowers and the foods they enjoyed most so the souls can return home. The food is offered to the souls first and, once they have "taken the grace", the living share it. Some sources spell it "Janal Pixán": it is the same tradition.»

**Texto C (Lo que no es)** — fuentes: `uady-pixan`, `diario-altar-2024` y el elemento `flores`
- es: «El Hanal Pixán yucateco tiene su propia identidad. En nuestro altar no hay calaveritas ni catrinas: lo que se destaca es la comida compartida, la luz y el camino que guía a las ánimas. La flor propia de la península es el xpujuk (*Tagetes patula*); el cempasúchil grande es una tradición del centro de México que llegó a los altares yucatecos hace poco.»
- en: «Yucatecan Hanal Pixán has its own identity. Our altar has no sugar skulls or catrinas: what stands out is the shared food, the light and the path that guides the souls. The peninsula's own flower is xpujuk (*Tagetes patula*); the large marigold (cempasúchil) is a central Mexican tradition that reached Yucatecan altars only recently.»

**Textos de fechas (sección 3)** — datos de `mantel` y `velas`
- 31 de octubre · niños — es: «Se dedica a los niños. El mantel lleva bordados de colores y las velas son de colores.» / en: «Dedicated to children. The tablecloth has colorful embroidery and the candles are colored.»
- 1 de noviembre · adultos — es: «Se dedica a los adultos. El mantel lleva bordados negros y las velas son grandes y blancas.» / en: «Dedicated to adults. The tablecloth has black embroidery and the candles are large and white.»

**Aviso de revisión (siempre que `verificado === false`)**
- es: «Texto investigado; falta la revisión final de alguien que practica la tradición.»
- en: «Researched text; final review by a practitioner of the tradition is pending.»

Si quieres agregar cualquier otro dato general (fechas, nombres de días, platillos extra), **solo si puedes respaldarlo con una fuente de `fuentes` o con el JSON**; si no, déjalo fuera.

---

## 7. Criterios de aceptación (verifica antes de terminar)

- [ ] Abre bien con `python -m http.server 8000` en `http://localhost:8000/aprende/` y en 380 px de ancho (celular).
- [ ] ES | EN cambia **toda** la página y la ficha sin recargar; recarga en `?lang=en` y conserva el inglés; `localStorage['jaye-idioma']` se actualiza.
- [ ] Las 38 entradas de `elementos` aparecen en «El altar por partes» (agrupadas en las 6 zonas) y cada una abre su ficha con nombres, qué es, por qué, historia y fuentes.
- [ ] El glosario maya muestra todos los elementos con `maya.nombre` y filtra con el buscador.
- [ ] Todas las `fuentes` aparecen como enlaces en la sección Fuentes.
- [ ] Existen los 38 SVG (`img/iconos/<id>.svg`), `_generico.svg` y los de zonas, fechas y cabecera; ninguno pesa más de 8 KB y se ven en celular sin pixelarse.
- [ ] Cada elemento muestra su SVG. Al poner de prueba una ruta válida en `imagen` de un elemento, esa imagen **sustituye** al SVG en su ficha y en sus tarjetas; al quitarla (o si la ruta falla), vuelve el SVG. Nunca hay íconos rotos ni huecos.
- [ ] No aparece ninguna calavera, catrina ni cempasúchil como imagen o ícono.
- [ ] Sin librerías externas ni peticiones a otros dominios (salvo los enlaces de Fuentes).
- [ ] No se modificó ningún archivo fuera de `aprende/`.
- [ ] Sin errores en la consola; se puede navegar con teclado; botones ≥ 44 px.

## 8. Al terminar, responde con

1. Árbol de archivos creados.
2. Cómo probar en local.
3. La lista de cualquier texto que hayas **tenido que dejar fuera** por no poder respaldarlo con fuentes.

## 9. Para quien integre (no lo hagas tú)

Al unir las partes, en el `index.html` de la raíz se cambia la tarjeta de Aprende: se le quita la clase `pendiente`, se pone su texto final y se le agrega el idioma al enlace, igual que el de Entiende (`id="link-aprende"` y `href = 'aprende/' + (l === 'en' ? '?lang=en' : '')`).
