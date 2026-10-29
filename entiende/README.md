# Entiende: cámara del altar

Parte 3 de **Juega, Aprende y Entiende**. El visitante apunta el celular a las tarjetas bordadas del altar, la cámara las reconoce y al tocar el nombre se abre la ficha con:

- el nombre en **español**, **maya** e **inglés**;
- qué es, por qué va en un altar **yucateco** y un poco de su historia;
- las fuentes consultadas.

Toda la interfaz se puede ver en **español o inglés** (botón ES | EN). El idioma se recuerda y viaja en la URL (`?lang=en`).

| Página | Qué hace |
|---|---|
| `index.html` | Elegir entre cámara o altar digital |
| `camara.html` | **Opción 2 (prioridad):** cámara con marcadores de imagen (MindAR + A-Frame), reconoce las 38 tarjetas |
| `foto.html` | **Altar digital (respaldo sin cámara):** altar yucateco ilustrado con los 38 elementos bordados; se tocan, se filtran por categoría y se recorren en orden |
| `herramientas/compilar.html` | Herramienta interna: convierte las 38 tarjetas en `targets/altar.mind` |
| `herramientas/generar_tarjetas.py` | Genera las 38 tarjetas (estilo bordado de hipil) |
| `herramientas/exportar_iconos.py` | Exporta el ícono bordado de cada elemento a `img/iconos/<id>.png` (altar digital y fichas) |

Todo el texto sale de **`/data/elementos.json`**, el mismo archivo que usan Juega y Aprende.

## Las tarjetas

Hay una por elemento: 38 en total, con el estilo del Hanal Pixán yucateco. Tienen bordado de punto de cruz (*xokbil chuuy*), flores de hipil, una franja de color arriba y el ícono del elemento bordado. A propósito no llevan calaveritas ni cempasúchil, porque no son parte del Hanal Pixán tradicional.

- `targets/tarjetas/NN-<id>.png` son las imágenes originales (1000 × 1400 px).
- `targets/tarjetas-para-imprimir.pdf` trae las 38 tarjetas listas para imprimir: 4 por hoja carta, de 9 × 12.6 cm cada una. Imprímanlas **en mate**, sin brillo.
- `targets/tarjetas-nuevas-para-imprimir.pdf` trae solo las dos tarjetas que cambiaron en octubre: **joroches** (lugar 00, antes el mantel) y **velas de colores** (lugar 26, antes la miel). Si ya imprimieron las demás, basta con imprimir estas dos.

### Mantel, hojas de plátano y joroches

- Nuestro altar cubre la mesa con **hojas de plátano**. El mantel sigue en `data/elementos.json` porque Aprende lo usa para explicar las fechas, pero lleva `"enAltar": false` y no tiene tarjeta, así que Entiende (cámara y altar digital) no lo muestra.
- **Joroches** (nº 44, comida) es elemento nuevo, con tarjeta en el lugar 00. Su nº de planeación (44) es provisional: cámbienlo en el JSON si en la lista del equipo tiene otro.
- Para dibujar solo algunas tarjetas sin tocar las impresas: `python herramientas/generar_tarjetas.py joroches velas-colores`.

### Un solo archivo para todas las tarjetas

Las 38 tarjetas están compiladas juntas en `targets/altar.mind`. El visitante solo apunta a cualquier tarjeta y no tiene que elegir nada. La página descarga ese archivo al abrirse y el botón muestra el porcentaje; después queda en caché.

El color de la franja de arriba de cada tarjeta indica la parte del altar a la que pertenece (verde: mesa y cruz, naranja: luz y camino, rojo: comida, rosa: frutas y dulces, azul: bebidas y recipientes, morado: ropa y cocina). Sirve para acomodarlas, pero la cámara no lo necesita.

### Cambiar o agregar tarjetas

1. Edita el elemento en `data/elementos.json`. `camara.targetIndex` es la posición de su tarjeta (0 a 37). Si un elemento no lleva tarjeta, quítale `targetIndex`.
2. Corre `python herramientas/generar_tarjetas.py` para volver a dibujar las tarjetas. Necesita `pip install pillow`. Se guardan como `targets/tarjetas/NN-<id>.png`, donde NN es el `targetIndex`.
3. Sirve el sitio en local y abre `http://localhost:8000/entiende/herramientas/compilar.html`.
4. Selecciona **todas** las tarjetas de `targets/tarjetas/`; quedan ordenadas por nombre. Compila y descarga `altar.mind`.
5. Reemplaza `targets/altar.mind` y **sube el número** de `?v=` en `CONFIG.targets` de `js/camara.js`: los celulares guardan el archivo viejo y sin ese cambio no verían las tarjetas nuevas.

## Probar en tu computadora

La cámara solo abre con **HTTPS o localhost**. Desde la raíz del repositorio:

```bash
python -m http.server 8000
```

Abre `http://localhost:8000/entiende/`. Para probar la cámara, abre una tarjeta en otra pantalla, por ejemplo `targets/tarjetas/18-china.png`, y apúntale con la webcam.

En el celular: `https://almeida-crypto.github.io/JAYE/entiende/` (GitHub Pages).

## Altar digital

`foto.html` dibuja un altar yucateco (franja bordada, casita de madera con techo de huano verde, mesa de cuatro niveles cubierta con hojas de plátano, piso de petate y camino de cal) y coloca los 38 íconos bordados en su lugar. Todo se dibuja en el navegador (SVG), así que pesa poco.

- Tocar un elemento abre su ficha. La ficha tiene **Anterior / Siguiente** para recorrer el altar.
- **Recorrer el altar** abre el primer elemento y deja avanzar en orden. Si hay una categoría elegida, recorre solo esa.
- Los botones de categoría resaltan esos elementos en el altar y filtran la lista.
- **Ampliar** hace el altar más grande (en el celular se desliza con el dedo).
- La lista plegable tiene buscador en español, maya o inglés.

Para cambiar algo de lugar, edita `FILAS` al inicio de `js/altar.js`. Cada fila es un nivel de la mesa (`mesa: true`) o del piso, con los `id` de izquierda a derecha. Si cambian los dibujos de las tarjetas, corre `python herramientas/exportar_iconos.py` para actualizar los íconos.

## La ficha

Al tocar un elemento (en la cámara o en el altar digital) se abre la ficha desde abajo. Se cierra con la ✕, con «Entendido», tocando afuera, con la tecla Esc o **deslizándola hacia abajo** desde la barrita de arriba (o desde cualquier parte si el texto ya está hasta arriba). Mientras está abierta, la página de atrás no se mueve.

## Ajustes en `js/camara.js`

```js
var CONFIG = {
  targets: 'targets/altar.mind?v=2',  // las 38 tarjetas, en orden (?v= sube al recompilar)
  maxTrack: 2,                 // tarjetas seguidas a la vez; subirlo lo vuelve más lento
  ocultarTras: 500,            // ms que la etiqueta tarda en ocultarse al perder la tarjeta
  pistaTras: 15000             // ms sin detectar antes de mostrar consejos
};
```

## Peso

| Archivo | Tamaño | Comprimido (gzip) |
|---|---|---|
| A-Frame + MindAR | 3.1 MB | ≈ 0.67 MB |
| `altar.mind` (38 tarjetas) | 9.3 MB | ≈ 3 MB |

Todo queda en caché del navegador después de la primera vez. Para el evento, abran la página en sus celulares antes de que lleguen los jueces, así ya está descargada.

## Verificado

- En Chromium, con una cámara simulada y las 38 tarjetas cargadas, reconoció correctamente tarjetas del principio, la mitad y el final de la lista (joroches, escabeche, velas de colores, alpargatas). Tardó entre 5 y 9 segundos, contando el encendido de la cámara.
- El cambio de idioma funciona en las tres páginas y en la ficha.
- **Pendiente con el equipo:** imprimir en mate y probar con la luz real del altar, en al menos dos celulares (iPhone y Android) y con la red de la universidad.

## Licencias

A-Frame y MindAR tienen licencia MIT (ver `vendor/`).
