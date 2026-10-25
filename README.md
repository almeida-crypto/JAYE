# JAYE · Juega, Aprende y Entiende — altar de Hanal Pixán

Sitio web del altar de Hanal Pixán del grupo de TICs. Un solo QR abre el sitio, que tiene tres secciones, en **español e inglés**:

| Sección | Carpeta | Qué es |
|---|---|---|
| **Juega** | `juega/` | Juego «Arma el altar» *(pendiente de unir)* |
| **Aprende** | [`aprende/`](aprende/README.md) | Página sobre el Hanal Pixán ✅ *(unida al inicio)* |
| **Entiende** | [`entiende/`](entiende/README.md) | Cámara del altar (MindAR) y, como respaldo, el altar digital ilustrado |

## Datos comunes: `data/elementos.json`

Tiene los **38 elementos** del altar, con los números de nuestra planeación (1 Mantel blanco … 72 Alpargatas). Cada elemento trae sus nombres en español, maya e inglés y su explicación en español e inglés. Lo usan las tres partes, así nada se escribe dos veces.

```jsonc
{
  "id": "pib",
  "n": 29,                                   // número en la planeación
  "categoria": "comida",                     // ver "categorias"
  "nombre": { "es": "Pib (mukbil pollo)", "en": "Pib (mukbil pollo, pit-baked tamale)" },
  "maya": {
    "nombre": "Mukbil pollo",
    "tipo": "tradicional",                   // tradicional | descriptivo | relacionado | sin
    "nota": { "es": "Muuk = enterrar…", "en": "Muuk = to bury…" }
  },
  "queEs":    { "es": "…", "en": "…" },      // qué es
  "porQue":   { "es": "…", "en": "…" },      // por qué va en el altar yucateco
  "historia": { "es": "…", "en": "…" },      // un poco de historia
  "fuentes": ["uady-pixan", "uady-dicc"],    // claves de "fuentes" (título + URL)
  "camara": { "zona": "comida", "targetIndex": 12 },  // Entiende: parte del altar (color) y posición en altar.mind
  "foto": { "x": 50, "y": 47 },              // Entiende: punto en la foto (%) o null
  "imagen": "", "audio": "",                 // opcionales
  "verificado": false
}
```

Tipos de nombre maya:

- `tradicional`: palabra maya documentada.
- `descriptivo`: traducción armada con palabras documentadas.
- `relacionado`: palabra cercana, pero no el nombre exacto.
- `sin`: el elemento no tiene nombre maya tradicional (por ejemplo, el escabeche).

> ⚠️ Los textos están investigados con fuentes; cada elemento cita las suyas. Aun así, antes de la competencia conviene que alguien que practique la tradición los revise. Cuando un elemento esté revisado, cambien `"verificado"` a `true`.

Si Juega o Aprende necesitan otro campo, agréguenlo; las otras partes ignoran lo que no usan.

## Idioma

Las páginas guardan el idioma en `localStorage` (clave `jaye-idioma`) y en la URL (`?lang=en`). Si Juega y Aprende usan lo mismo, el visitante conserva su idioma en todo el sitio.

## Correr en local

```bash
python -m http.server 8000
# abrir http://localhost:8000
```

## Publicar

El hosting tiene que usar HTTPS, porque la cámara lo exige. Está en GitHub Pages (*Settings → Pages → main / root*): `https://almeida-crypto.github.io/JAYE/`.

## Unir las partes

Cada parte vive en su propia carpeta y lee `../data/elementos.json`. Para unirlas, cada equipo copia su carpeta (`juega/`, `aprende/`) a la raíz y se ajusta el `index.html` de inicio.
