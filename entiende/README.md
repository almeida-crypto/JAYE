# Entiende: cámara del altar

Parte 3 de **Juega, Aprende y Entiende**. El visitante apunta el celular a las tarjetas bordadas del altar, la cámara las reconoce y al tocar el nombre se abre la ficha con:

- el nombre en **español**, **maya** e **inglés**;
- qué es, por qué va en un altar **yucateco** y un poco de su historia;
- las fuentes consultadas.

Toda la interfaz se puede ver en **español o inglés** (botón ES | EN). El idioma se recuerda y viaja en la URL (`?lang=en`).

| Página | Qué hace |
|---|---|
| `index.html` | Elegir entre cámara o foto |
| `camara.html` | **Opción 2 (prioridad):** cámara con marcadores de imagen (MindAR + A-Frame), reconoce las 38 tarjetas |
| `foto.html` | **Opción 1 (respaldo):** foto del altar con puntos + lista de los 38 elementos por categoría |
| `herramientas/compilar.html` | Herramienta interna: convierte las 38 tarjetas en `targets/altar.mind` |
| `herramientas/generar_tarjetas.py` | Genera las 38 tarjetas (estilo bordado de hipil) |

Todo el texto sale de **`/data/elementos.json`**, el mismo archivo que usan Juega y Aprende.

## Las tarjetas

Hay una por elemento: 38 en total, con el estilo del Hanal Pixán yucateco. Tienen bordado de punto de cruz (*xokbil chuuy*), flores de hipil, papel picado y el ícono del elemento bordado. A propósito no llevan calaveritas ni cempasúchil, porque no son parte del Hanal Pixán tradicional.

- `targets/tarjetas/NN-<id>.png` son las imágenes originales (1000 × 1400 px).
- `targets/tarjetas-para-imprimir.pdf` trae las 38 tarjetas listas para imprimir: 4 por hoja carta, de 9 × 12.6 cm cada una. Imprímanlas **en mate**, sin brillo.

### Un solo archivo para todas las tarjetas

Las 38 tarjetas están compiladas juntas en `targets/altar.mind`. El visitante solo apunta a cualquier tarjeta y no tiene que elegir nada. La página descarga ese archivo al abrirse y el botón muestra el porcentaje; después queda en caché.

El color del papel picado de cada tarjeta indica la parte del altar a la que pertenece (verde: mesa y cruz, naranja: luz y camino, rojo: comida, rosa: frutas y dulces, azul: bebidas y recipientes, morado: ropa y cocina). Sirve para acomodarlas, pero la cámara no lo necesita.

### Cambiar o agregar tarjetas

1. Edita el elemento en `data/elementos.json`. `camara.targetIndex` es la posición de su tarjeta (0 a 37).
2. Corre `python herramientas/generar_tarjetas.py` para volver a dibujar las tarjetas. Necesita `pip install pillow`. Se guardan como `targets/tarjetas/NN-<id>.png`, donde NN es el `targetIndex`.
3. Sirve el sitio en local y abre `http://localhost:8000/entiende/herramientas/compilar.html`.
4. Selecciona **todas** las tarjetas de `targets/tarjetas/`; quedan ordenadas por nombre. Compila y descarga `altar.mind`.
5. Reemplaza `targets/altar.mind`.

## Probar en tu computadora

La cámara solo abre con **HTTPS o localhost**. Desde la raíz del repositorio:

```bash
python -m http.server 8000
```

Abre `http://localhost:8000/entiende/`. Para probar la cámara, abre una tarjeta en otra pantalla, por ejemplo `targets/tarjetas/18-china.png`, y apúntale con la webcam.

En el celular: `https://almeida-crypto.github.io/JAYE/entiende/` (GitHub Pages).

## Foto del altar (opción 1)

1. Toma la foto cuando el altar esté terminado. Guárdala como `img/altar.jpg`, de unos 1200 px de ancho y comprimida.
2. En `data/elementos.json` cambia `"altar": { "foto": "entiende/img/altar.jpg", … }`.
3. Abre `foto.html?editar`, toca la foto donde está cada elemento y pega las coordenadas copiadas en su `"foto": { "x": …, "y": … }`. Los elementos con `"foto": null` aparecen solo en la lista.

## Ajustes en `js/camara.js`

```js
var CONFIG = {
  targets: 'targets/altar.mind',  // las 38 tarjetas, en orden
  maxTrack: 2,                 // tarjetas seguidas a la vez; subirlo lo vuelve más lento
  ocultarTras: 500,            // ms que la etiqueta tarda en ocultarse al perder la tarjeta
  pistaTras: 15000             // ms sin detectar antes de mostrar consejos
};
```

## Peso

| Archivo | Tamaño | Comprimido (gzip) |
|---|---|---|
| A-Frame + MindAR | 3.1 MB | ≈ 0.67 MB |
| `altar.mind` (38 tarjetas) | 8.8 MB | ≈ 3 MB |

Todo queda en caché del navegador después de la primera vez. Para el evento, abran la página en sus celulares antes de que lleguen los jueces, así ya está descargada.

## Verificado

- En Chromium, con una cámara simulada y las 38 tarjetas cargadas, reconoció correctamente tarjetas del principio, la mitad y el final de la lista (mantel, escabeche, cocoyol, atole, alpargatas). Tardó unos 5 segundos, contando el encendido de la cámara.
- El cambio de idioma funciona en las tres páginas y en la ficha.
- **Pendiente con el equipo:** imprimir en mate y probar con la luz real del altar, en al menos dos celulares (iPhone y Android) y con la red de la universidad.

## Licencias

A-Frame y MindAR tienen licencia MIT (ver `vendor/`).
