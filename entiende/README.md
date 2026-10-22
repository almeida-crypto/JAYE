# Entiende: cámara del altar

Parte 3 de **Juega, Aprende y Entiende**. El visitante apunta el celular a las tarjetas bordadas del altar, la cámara las reconoce y al tocar el nombre se abre la ficha con:

- el nombre en **español**, **maya** e **inglés**;
- qué es, por qué va en un altar **yucateco** y un poco de su historia;
- las fuentes consultadas.

Toda la interfaz se puede ver en **español o inglés** (botón ES | EN). El idioma se recuerda y viaja en la URL (`?lang=en`).

| Página | Qué hace |
|---|---|
| `index.html` | Elegir entre cámara o foto |
| `camara.html` | **Opción 2 (prioridad):** cámara con marcadores de imagen (MindAR + A-Frame), por partes del altar |
| `foto.html` | **Opción 1 (respaldo):** foto del altar con puntos + lista de los 38 elementos por categoría |
| `herramientas/compilar.html` | Herramienta interna: convierte las tarjetas de una zona en `targets/<zona>.mind` |
| `herramientas/generar_tarjetas.py` | Genera las 38 tarjetas (estilo bordado de hipil) |

Todo el texto sale de **`/data/elementos.json`**, el mismo archivo que usan Juega y Aprende.

## Las tarjetas

Hay una por elemento: 38 en total, con el estilo del Hanal Pixán yucateco. Tienen bordado de punto de cruz (*xokbil chuuy*), flores de hipil, papel picado y el ícono del elemento bordado. A propósito no llevan calaveritas ni cempasúchil, porque no son parte del Hanal Pixán tradicional.

- `targets/tarjetas/<zona>/NN-<id>.png` son las imágenes originales (1000 × 1400 px).
- `targets/tarjetas-para-imprimir.pdf` trae las 38 tarjetas listas para imprimir: 4 por hoja carta, de 9 × 12.6 cm cada una. Imprímanlas **en mate**, sin brillo.

### Partes del altar (zonas)

Reconocer 38 tarjetas a la vez sería lento y pesado en el celular. Por eso el altar se divide en 6 partes, y cada una tiene su propio archivo `targets/<zona>.mind`. El color del papel picado de cada tarjeta indica a qué parte pertenece. En la cámara, el visitante elige esa parte con los botones del mismo color.

| Zona | Color | Elementos |
|---|---|---|
| `base` | verde | mantel, hojas de plátano, cruz verde, rosario, fotografía, objetos |
| `luz` | naranja | velas, incienso, incensario, flores, cal, jícaras con bejuco |
| `comida` | rojo | pib, tamales, relleno negro, frijol con puerco, escabeche, pan |
| `frutas` | rosa | china, mandarina, plátano, yuca, dulce de calabaza, jícama, dulce de coco, cocoyol, miel |
| `bebidas` | azul | aguardiente, chocolate, atole nuevo, cigarros, lek, platos de barro |
| `ropa` | morado | tortear, comal, filipina, pantalón, alpargatas |

Tip para el altar: coloquen juntas las tarjetas de una misma parte. Así el visitante no tiene que cambiar de zona a cada rato.

### Cambiar o agregar tarjetas

1. Edita el elemento en `data/elementos.json`. Para regenerar el JSON completo se usó un script; si solo cambias un texto, edita el JSON directamente.
2. `python herramientas/generar_tarjetas.py` vuelve a dibujar las tarjetas. Se necesita `pip install pillow`.
3. Sirve el sitio en local y abre `http://localhost:8000/entiende/herramientas/compilar.html`.
4. Elige la zona, sube **todas** las tarjetas de esa carpeta en orden (00, 01, 02…), compila y descarga `<zona>.mind`.
5. Reemplaza `targets/<zona>.mind`.

El número `NN` del archivo es el `camara.targetIndex` del elemento. `generar_tarjetas.py` ya los asigna en orden dentro de cada zona.

## Probar en tu computadora

La cámara solo abre con **HTTPS o localhost**. Desde la raíz del repositorio:

```bash
python -m http.server 8000
```

Abre `http://localhost:8000/entiende/`. Para probar la cámara, abre una tarjeta en otra pantalla, por ejemplo `targets/tarjetas/frutas/00-china.png`, elige su zona y apúntale con la webcam.

En el celular: `https://almeida-crypto.github.io/JAYE/entiende/` (GitHub Pages).

## Foto del altar (opción 1)

1. Toma la foto cuando el altar esté terminado. Guárdala como `img/altar.jpg`, de unos 1200 px de ancho y comprimida.
2. En `data/elementos.json` cambia `"altar": { "foto": "entiende/img/altar.jpg", … }`.
3. Abre `foto.html?editar`, toca la foto donde está cada elemento y pega las coordenadas copiadas en su `"foto": { "x": …, "y": … }`. Los elementos con `"foto": null` aparecen solo en la lista.

## Ajustes en `js/camara.js`

```js
var CONFIG = {
  carpetaTargets: 'targets/',  // targets/<zona>.mind
  maxTrack: 2,                 // tarjetas seguidas a la vez; subirlo lo vuelve más lento
  ocultarTras: 500,            // ms que la etiqueta tarda en ocultarse al perder la tarjeta
  pistaTras: 15000             // ms sin detectar antes de mostrar consejos
};
```

## Peso

| Archivo | Tamaño | Comprimido (gzip) |
|---|---|---|
| A-Frame + MindAR | 3.1 MB | ≈ 0.67 MB |
| Un `<zona>.mind` | 2.0–3.7 MB | ≈ 0.8–1.4 MB |

Solo se descarga el `.mind` de la zona elegida. Las librerías y los `.mind` quedan en caché del navegador después de la primera vez.

## Verificado

- En Chromium, con una cámara simulada, reconoce dos tarjetas de la zona «frutas» en unos 4 segundos sin confundirlas. Con otra zona elegida, no reconoce tarjetas de una zona distinta.
- Cambiar de zona con la cámara encendida recarga la página y vuelve a abrir la cámara sola.
- El cambio de idioma funciona en las tres páginas y en la ficha.
- **Pendiente con el equipo:** imprimir en mate y probar con la luz real del altar, en al menos dos celulares (iPhone y Android) y con la red de la universidad.

## Licencias

A-Frame y MindAR tienen licencia MIT (ver `vendor/`).
