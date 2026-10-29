# Juega · Hanal Pixán

Dos juegos estáticos (sin frameworks, sin servidor). El índice es `index.html`; el tile «Juega» del inicio apunta aquí.

| Juego | Archivo | Qué hace |
|---|---|---|
| **Arma el altar** | [`altar.html`](altar.html) | Juego isométrico de pixel art: sacas objetos de 4 recipientes y los acomodas en el altar (suelo y 3 escalones). Al vaciarlos, el juego comprueba el altar, te deja corregir y al final hace una foto que se guarda en un álbum. |
| **Quiz** | [`quiz.html`](quiz.html) | 15 preguntas al azar de 60, 20 segundos cada una; al responder se ve si acertaste y un dato curioso. Puntuación = correctas × 100 + bono de tiempo, ranking local (Top 10 en `localStorage`) y compartir por WhatsApp. |

## Cómo funciona cada uno

### Arma el altar (`altar.html`)

- Un solo archivo autocontenido: todo el JS va en línea y los sprites se dibujan por código (no hay imágenes externas). Funciona con doble clic, sin servidor.
- Escenario: piso de **laja** (piedra caliza con juntas de tierra roja), paredes de **albarrada** (piedra seca) con adornos colgados (retratos de los abuelos, sombrero de jipi, hipil, repisa con xpujuk y rosario; `Pared.ADORNOS`), cielo de noche con palmas de huano detrás de la pared y, fuera de la rejilla, un **pozo de piedra** y el **fogón de tres piedras** con el comal y las tortillas (`Escenario` y `Piso`). Nada de eso ocupa celdas: no cambia dónde se pueden poner los objetos.
- Sorpresa: si se toca el pozo con la mano vacía, se asoma un **alux** y saluda en maya (`Alux`).
- Los tres escalones van cubiertos con **hojas de plátano** (textura `Mantel` con `HOJA: true`; con `false` vuelve el mantel blanco bordado).
- En el celular: parado, el tablero ocupa todo el ancho y aparece el consejo de girarlo; acostado, el tablero usa todo el alto y los botones pasan a una columna a la derecha.
- Rejilla isométrica 10×10 con altura; los objetos se ajustan a celdas, se giran 90° (rueda, tecla `R` o botón) y solo se sueltan donde hay lugar libre.
- `REGLAS` define en qué nivel va cada objeto (N1 = escalón más alto, N3 = escalón más bajo, SUELO = enfrente del altar).
- En pantallas táctiles aparece el botón **Colocar** (en escritorio se usa el clic directo).

### Quiz (`quiz.html`)

- `js/preguntas.js` es el banco de preguntas: un objeto `PREGUNTAS` con 60 entradas `{ id, tema, es: {p, opciones, correcta, dato}, en: {p, opciones, correcta, dato} }`. `dato` es la explicación corta que aparece al responder. Las preguntas salen de `data/elementos.json` y de los textos de Aprende (revisados por practicantes); los distractores son de la misma familia que la respuesta (otras palabras mayas, otras fechas, otros platillos) para que no se adivine por descarte.
- `js/quiz.js` baraja las opciones en cada pregunta (la respuesta correcta no siempre está en la misma posición) y baraja el banco al iniciar.
- El ranking se guarda en `localStorage` con la clave `jaye-quiz-ranking` (solo en el navegador de quien juega).

## Reglas del proyecto

- **Contenido**: nada inventado. Todo sale de `data/elementos.json` y `data/investigacion-altar.md`. Si se agrega una pregunta o un objeto del altar, que tenga fuente en el JSON.
- **Idioma** ES/EN: `altar.html` y `quiz.html` leen `?lang=` y `localStorage` (clave `jaye-idioma`) igual que el resto del sitio. En `altar.html` los textos viven en `NOMBRES_EN` y `TEXTOS`; las preguntas llevan sus dos versiones (`es`/`en`).
- **Sin papel picado** (no es tradición de Yucatán): si se decora, es con el mismo bordado del sitio (`img/bordado-franja.svg`).
- **`?v=N`**: al cambiar `css/quiz.css`, `js/quiz.js` o `js/preguntas.js`, sube el número en `quiz.html`. `altar.html` es autocontenido, no lo necesita.

## Agregar preguntas al quiz

1. Editar `js/preguntas.js` y agregar una entrada nueva (respeta el formato; `correcta` es el índice de la opción correcta — el juego baraja).
2. Verificar el dato en `data/elementos.json` (regla «no inventar datos»).
3. Si cambia `preguntas.js`, subir `?v=1` → `?v=2` en `quiz.html`.
