# Aprende: la página del Hanal Pixán

Parte 2 de **Juega, Aprende y Entiende**. Es la página educativa: explica qué es el
Hanal Pixán yucateco, cuándo se celebra, cómo se arma el altar, qué se come, qué
palabras en maya se usan y qué lo distingue de otras celebraciones. Pensada para
celular, en **español e inglés**.

Todo el contenido sale de **`../data/elementos.json`** (el mismo archivo que usan
Juega y Entiende) más los textos generales de `js/textos.js`, que ya vienen con sus
fuentes. No se copian textos: nada se escribe dos veces.

## Qué contiene

```
aprende/
├── index.html                      # la página (una sola, con menú de anclas)
├── css/aprende.css                 # paleta y componentes (mobile-first)
├── js/textos.js                    # interfaz y contenido general (es / en)
├── js/aprende.js                   # idioma, JSON, pintado, ficha, imágenes/SVG
├── img/iconos/                     # 38 SVG de elemento + genérico + zonas + fechas + cabecera + silueta
├── img/fotos/                      # fotos reales de los elementos (jpg/png/webp, < 100 KB)
├── herramientas/exportar_iconos_svg.py
└── README.md
```

### Secciones

Cabecera · ¿Qué es el Hanal Pixán? · ¿Cuándo se celebra? (31 oct / 1 nov) ·
El camino de las ánimas (cal → velas → incienso → comida) · El altar por partes
(las 6 zonas con sus 38 elementos) · Sabores · Palabras en maya (con buscador) ·
Datos curiosos · Lo que no es · Fuentes · Pie.

Cada elemento abre la **ficha** (hoja inferior): nombre en español, maya e inglés,
qué es, por qué está en el altar yucateco, un poco de historia, ilustración y fuentes.

## Probar en local

Desde la **raíz** del repositorio (no desde `aprende/`, porque se lee `../data/elementos.json`):

```bash
python -m http.server 8000
# abrir http://localhost:8000/aprende/
```

> ⚠️ **Caché del navegador:** los `<script>` y el CSS se cargan con `?v=N`
> (`js/textos.js?v=2`). Si editas `textos.js`, `aprende.js` o `aprende.css`, **sube ese
> número** en `index.html`; si no, el navegador seguirá usando la versión guardada y la
> página puede mostrar llaves sin traducir (por ejemplo `notaMascota`).

En el celular (misma red): `http://<ip-de-la-computadora>:8000/aprende/`.

Comprobaciones rápidas:

- `ES | EN` cambia toda la página y la ficha sin recargar; al recargar en
  `?lang=en` se conserva el inglés y `localStorage['jaye-idioma']` queda en `en`.
- Las 38 entradas aparecen en «El altar por partes», agrupadas en las 6 zonas, y
  cada una abre su ficha.
- El buscador de «Palabras en maya» filtra mientras se escribe.
- Ancho de 380 px: nada se desborda y los botones miden ≥ 44 px.

## Los SVG en punto de cruz

Cada elemento se ilustra con un SVG propio, dibujado con las mismas puntadas de las
tarjetas de Entiende (40 × 40 puntadas, colores de `HILO`). El script los exporta a
partir de `entiende/herramientas/generar_tarjetas.py` **sin modificarlo** (solo lo importa).

```bash
pip install pillow
python herramientas/exportar_iconos_svg.py
```

Salida en `img/iconos/`:

| Archivo | Qué es |
|---|---|
| `<id>.svg` | los 38 elementos |
| `_generico.svg` | flor de xpujuk, respaldo si falta un SVG |
| `zona-base.svg`, `zona-luz.svg`, `zona-comida.svg`, `zona-frutas.svg`, `zona-bebidas.svg`, `zona-ropa.svg` | encabezados de zona (usan el ícono de un elemento representativo) |
| `ninos.svg`, `adultos.svg` | 31 de octubre (vela de color) y 1 de noviembre (vela blanca grande) |
| `cabecera.svg` | franja de grecas y flores de hipil (160 × 40) |
| `altar-silueta.svg` | silueta del altar (160 × 48): mesa con mantel, cruz, velas, incensario, comida y flores |

### La franja de bordado

`img/bordado-franja.svg` (en la **raíz** del sitio) es la franja de bordado en punto de
cruz que corona las tres secciones (inicio, Aprende y Entiende); **reemplaza al papel
picado**, que no es tradición de Yucatán. Es una baldosa de 24 × 14 puntadas con flores
de xpujuk, grecas y una bastilla de colores, que se repite en horizontal (`repeat-x`).
Para regenerarla: `python herramientas/generar_franza_bordado.py` (usa los motivos
`FLOR` y `GRECA` y la paleta `HILO` del script de tarjetas, sin modificarlo).

### La silueta de fondo

`altar-silueta.svg` se usa como **marca de agua al 10%** en dos puntos: **detrás del
título y del subtítulo** en la cabecera y **al fondo del pie**, debajo de los botones.
Ambas son `position: absolute` con `pointer-events: none`, `alt=""` y `aria-hidden`:
el texto siempre se pinta por encima (probado con `elementFromPoint`, que devuelve el
`título` y el `párrafo`, nunca la silueta). El dibujo deja las 10 primeras filas vacías
y la máscara se disuelve justo ahí, así que nada se le corta. Es decoración pura, no
pide fuentes. Si se quiere más o menos presencia, se cambia `opacity` en
`.silueta-altar` (`css/aprende.css`); el pie reserva su zona baja con
`padding-bottom` para que la silueta no se meta bajo los botones.

Cómo los dibuja: cada puntada encendida se convierte en una X de un `<pattern>` de
1 × 1 y, por color, un solo `<path>` con las corridas de celdas contiguas. Cada
archivo queda por debajo de 8 KB (el método de una línea por puntada pesa ~870 KB).
El script imprime el peso de cada uno y avisa si alguno pasa de 8 KB.

El script también puede agregarse a los íconos nuevos: si `elementos.json` gana un
elemento, hay que agregar su función `ic_*` en `entiende/herramientas/generar_tarjetas.py`
(equipo de Entiende) y volver a correr este script.

**Motivos prohibidos** en cualquier SVG: calaveras, catrinas, esqueletos, cempasúchil
grande. La flor del sitio es el **xpujuk**.

## Cómo agregar imágenes

Las ilustraciones por defecto son los SVG. Si el equipo quiere usar **fotos reales**:

1. Guarda la foto en `aprende/img/fotos/` (local, nunca enlaces a otros sitios): JPG, WebP o PNG,
   unos 800 px de ancho, menos de 100 KB, propias o con licencia libre, y que muestre
   solo cosas de la tradición yucateca. **Nómbrala con el `id` del elemento**
   (`pib.jpg`, `velas.webp`, `platos-barro.jpg`…).
2. **Imagen de un elemento:** escribe la ruta relativa a la raíz del sitio en el campo
   `imagen` de ese elemento en `data/elementos.json` (por ejemplo
   `"aprende/img/fotos/pib.jpg"`). Las 37 fotos actuales ya vienen enlazadas así.
   Aparece en su ficha y en sus tarjetas, y al quitarla (o si la ruta falla) vuelve el SVG.
3. **Imagen general de la página:** edita el bloque `IMAGENES` al inicio de
   `js/aprende.js` y pon la ruta relativa a `aprende/`:

   ```js
   var IMAGENES = {
     cabecera: { src: 'img/cabecera.jpg', alt: { es: 'Altar del grupo de TICs', en: 'The ICT group\'s altar' } },
     ...
   };
   ```

4. Revisa el texto alternativo en **ES y EN** (`alt`): en las fotos es el nombre de lo
   que se ve; en los SVG decorativos queda vacío porque el nombre ya está al lado.

Orden de prioridad: `el.imagen` / `IMAGENES` → SVG del elemento → `_generico.svg`.
Nunca se ve un ícono roto ni un hueco.

## Idioma

- Clave de `localStorage`: `jaye-idioma`; en la URL: `?lang=en` (en español no hace falta).
- Prioridad al abrir: `?lang=` → `localStorage` → `es`.
- Al cambiar: se actualiza `document.documentElement.lang`, el `localStorage`, la URL con
  `history.replaceState`, se repinta la página sin recargar y se lanza
  `document.dispatchEvent(new CustomEvent('idioma:cambio', { detail: idioma }))`.
- Los enlaces internos (`../index.html`, `../entiende/`, `../juega/`) conservan el idioma
  agregando `?lang=en`.

## Verificado

Todo el contenido de la página **fue revisado por practicantes de la tradición** en
octubre de 2026: **Amada Rosado** (habitante de pueblo, 70 años de tradición) y
**Socorro Rodríguez** (habitante de Mérida, ~76 años de tradición). Los 38 elementos de
`data/elementos.json` están con `"verificado": true`, así que la página ya no muestra el
aviso de «texto investigado»; el crédito aparece en la sección Fuentes. Si algún texto
cambia después, poner `"verificado": false` hasta que lo revisen de nuevo.

La fecha del **2 de noviembre** («Día de Todos los Santos») se apoya en la fuente
`yuc-gob` (Gobierno de Yucatán: tercer día, *u janal pixanoob* o misa pixán) y el
**Día de la Mascota (27 de octubre)** en `posta-mascotas`; se presenta como mención
especial, ya que no es parte del Hanal Pixán tradicional.

**Pendiente del equipo de Entiende:** el elemento nuevo `velas-colores` no tiene tarjeta
impresa todavía (viene sin `camara.targetIndex`, así que la cámara lo ignora sin error).
Cuando impriman su tarjeta, agregar el `targetIndex` y regenerar `altar.mind`.

## Peso

HTML + CSS + JS < 150 KB (sin contar `data/elementos.json`). Los SVG se cargan con
`loading="lazy"` y cada uno pesa < 8 KB. Sin librerías externas, sin CDN, sin build:
funciona con `python -m http.server` y en GitHub Pages (HTTPS).

## No modificar

Esta carpeta es autosuficiente: no toca `entiende/`, `juega/`, `data/elementos.json`
ni el `index.html` de la raíz. La única lectura externa es `../data/elementos.json`.
