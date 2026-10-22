# JAYE · Juega, Aprende y Entiende — altar de Janal Pixan

Sitio web del altar de Janal Pixan del grupo de TICs. Un solo QR abre el sitio, con tres secciones:

| Sección | Carpeta | Qué es |
|---|---|---|
| **Juega** | `juega/` | Juego «Arma el altar» *(pendiente de unir)* |
| **Aprende** | `aprende/` | Página sobre el Janal Pixan *(pendiente de unir)* |
| **Entiende** | [`entiende/`](entiende/README.md) | Cámara del altar (MindAR) + foto con puntos tocables como respaldo |

## Datos comunes

`data/elementos.json` tiene cada elemento del altar (nombre, nombre en maya, descripción, significado, imagen, audio…). Lo usan las tres partes para no escribir nada dos veces.

> ⚠️ El texto actual es un **borrador**. Antes de la competencia hay que verificarlo con fuentes (INAH, cultura local) y con alguien que practique la tradición; al verificar un elemento se pone `"verificado": true` y se llena `"fuente"`.

Campos por elemento:

```json
{
  "id": "pib",
  "nombre": "Mukbil pollo (pib)",
  "nombreMaya": "Mukbil pollo",
  "pronunciacion": "muk-BIL PO-yo",
  "descripcion": "…",
  "significado": "…",
  "imagen": "",              // ruta desde la raíz, p. ej. "data/img/pib.webp"
  "audio": "",               // ruta a la pronunciación en maya
  "nivel": 2,                // nivel del altar
  "camara": { "targetIndex": 0 },   // Entiende: tarjeta que lo identifica (null = sin tarjeta)
  "foto": { "x": 50, "y": 47 },     // Entiende: posición del punto en la foto (%)
  "verificado": false,
  "fuente": ""
}
```

Si Juega o Aprende necesitan otro campo, agréguenlo; las demás partes ignoran lo que no usan.

## Correr en local

```bash
python -m http.server 8000
# abrir http://localhost:8000
```

## Publicar

Hosting con HTTPS (obligatorio para la cámara): GitHub Pages (*Settings → Pages → main / root*), Vercel o Netlify.

## Unir las partes

Cada parte vive en su propia carpeta y lee `data/elementos.json` con la ruta `../data/elementos.json`. Al unir, cada equipo copia su carpeta (`juega/`, `aprende/`) a la raíz y se ajusta el `index.html` de inicio.
