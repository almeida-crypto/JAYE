# Entiende — cámara del altar

Parte 3 de **Juega, Aprende y Entiende**. El visitante apunta el celular al altar, la cámara reconoce las tarjetas decoradas y al tocar el nombre se abre la explicación.

Incluye las dos opciones del documento del proyecto, en la misma sección:

| Página | Qué hace |
|---|---|
| `index.html` | Elegir entre cámara o foto |
| `camara.html` | **Opción 2 (prioridad):** cámara con marcadores de imagen (MindAR + A-Frame) |
| `foto.html` | **Opción 1 (respaldo):** foto del altar con puntos tocables; funciona sin cámara |
| `herramientas/compilar.html` | Herramienta interna: convierte las imágenes de las tarjetas en `targets/targets.mind` |
| `herramientas/generar_tarjetas.py` | Genera las tarjetas prototipo para la prueba |

Todo el texto sale de **`/data/elementos.json`** (el mismo archivo que usan Juega y Aprende).

## Estructura

```
entiende/
├── index.html, camara.html, foto.html
├── css/        entiende.css (común), camara.css
├── js/         datos.js (carga el JSON y muestra la ficha), camara.js, foto.js
├── img/        altar-placeholder.svg  ← reemplazar por la foto real
├── targets/
│   ├── targets.mind          ← lo que reconoce la cámara (4 tarjetas de prueba)
│   └── tarjetas/*.png        ← tarjetas para imprimir (pib, velas, flores, atole)
├── herramientas/             compilar.html, generar_tarjetas.py
└── vendor/                   A-Frame 1.5.0 y MindAR 1.2.5 (locales, sin CDN)
```

## Probar en tu computadora

La cámara solo abre con **HTTPS o localhost**. Desde la raíz del repositorio:

```bash
python -m http.server 8000
```

Abre `http://localhost:8000/entiende/`. Para probar la cámara, abre `targets/tarjetas/velas.png` en otra pantalla (o imprímela) y apúntale con la webcam.

Para probar **en el celular** hay que publicarlo con HTTPS (GitHub Pages, Vercel o Netlify). En GitHub: *Settings → Pages → Deploy from a branch → main / (root)*; queda en `https://<usuario>.github.io/JAYE/entiende/`.

## Cómo se conecta una tarjeta con su explicación

1. Las imágenes se compilan **en orden** en `herramientas/compilar.html`: la primera es `targetIndex 0`, la segunda `1`, etc.
2. En `data/elementos.json`, cada elemento con tarjeta lleva `"camara": { "targetIndex": N }`. Los que no tienen tarjeta llevan `null`.

Las tarjetas prototipo están compiladas así:

| targetIndex | Tarjeta | Elemento (`id`) |
|---|---|---|
| 0 | `pib.png` | `pib` |
| 1 | `velas.png` | `velas` |
| 2 | `flores.png` | `flores` |
| 3 | `atole.png` | `atole` |

### Agregar o cambiar tarjetas

1. Diseña la tarjeta (ver reglas abajo) y guárdala en `targets/tarjetas/`.
2. Sirve el sitio en local y abre `http://localhost:8000/entiende/herramientas/compilar.html`.
3. Sube **todas** las tarjetas en orden, compila y descarga `targets.mind`.
4. Reemplaza `targets/targets.mind` y ajusta los `targetIndex` del JSON.

### Reglas para diseñar tarjetas (del documento del proyecto)

- Mucho detalle y contraste; nada de fondos lisos ni patrones simétricos o repetidos.
- Cada tarjeta claramente distinta de las demás.
- Impresión **mate**, mínimo 8–10 cm, de frente y sin inclinar mucho.
- Estilo papel picado, calaveritas, flores o grecas, para que parezcan parte del altar.

## Foto del altar (opción 1)

1. Toma la foto cuando el altar esté terminado y guárdala como `img/altar.jpg` (unos 1200 px de ancho, comprimida).
2. En `data/elementos.json` cambia `"altar": { "foto": "entiende/img/altar.jpg" }`.
3. Abre `foto.html?editar`, toca la foto donde está cada elemento y pega las coordenadas copiadas en su `"foto": { "x": …, "y": … }`.

## Ajustes en `js/camara.js`

```js
var CONFIG = {
  targets: 'targets/targets.mind',
  maxTrack: 2,        // tarjetas seguidas a la vez; subirlo lo vuelve más lento
  ocultarTras: 500,   // ms que la etiqueta tarda en ocultarse al perder la tarjeta
  pistaTras: 15000    // ms sin detectar antes de mostrar consejos
};
```

## Peso de la página (internet de la universidad)

| Archivo | Tamaño | Comprimido (gzip) |
|---|---|---|
| A-Frame | 1.4 MB | ≈ 0.37 MB |
| MindAR | 1.8 MB | ≈ 0.30 MB |
| `targets.mind` (4 tarjetas) | ≈ 2.0 MB | ≈ 0.87 MB |

El `.mind` crece con cada tarjeta (≈ 0.5 MB por tarjeta). Si al final son muchas, conviene agruparlas por zona del altar o simplificar el fondo de las tarjetas.

## Verificado

- Probado en Chromium con una cámara simulada: reconoce las tarjetas en unos 3–4 segundos, la etiqueta sigue a la tarjeta y al tocarla se abre la ficha.
- **Pendiente con el equipo:** probar con tarjetas impresas en mate, con la luz real del altar, en al menos dos celulares (iPhone y Android) y con la red de la universidad.

## Licencias

A-Frame y MindAR tienen licencia MIT (ver `vendor/`).
