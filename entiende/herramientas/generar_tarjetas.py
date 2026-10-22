"""
Genera tarjetas PROTOTIPO para probar la cámara (MindAR) antes de tener el diseño final.

Uso:  python generar_tarjetas.py          (requiere: pip install pillow)
Salida: ../targets/tarjetas/<id>.png  (1000 x 1400 px ≈ 10 x 14 cm a 254 ppp)

Por qué se ven así: MindAR reconoce mejor imágenes con mucho detalle, alto contraste,
formas variadas y SIN simetría ni patrones repetidos. Cada tarjeta usa otra paleta y otra
semilla aleatoria para que la cámara no las confunda. El diseño final puede ser a mano
(papel picado, calaveritas, grecas mayas) siguiendo las mismas reglas.
"""
import math
import os
import random

from PIL import Image, ImageDraw, ImageFont

ANCHO, ALTO = 1000, 1400
AQUI = os.path.dirname(os.path.abspath(__file__))
SALIDA = os.path.join(AQUI, "..", "targets", "tarjetas")

TARJETAS = [
    # id,      título,          maya,         fondo,     colores de figuras,                               semilla
    ("pib",    "MUKBIL POLLO",  "Pib",        "#1d3b22", ["#f5a02a", "#fbf3e6", "#e2457a", "#8fd16a", "#2a1606"], 11),
    ("velas",  "VELAS",         "Kib",        "#2b1640", ["#ffd37a", "#ffffff", "#f5a02a", "#9b5cc8", "#0d0614"], 23),
    ("flores", "FLORES",        "Xpujuk",     "#5a1030", ["#f5a02a", "#ffe066", "#ffffff", "#7c4dbd", "#1b0610"], 37),
    ("atole",  "ATOLE NUEVO",   "Sa'",        "#3a2412", ["#efe2c4", "#e2457a", "#56c3c9", "#f5a02a", "#120a04"], 53),
]


def fuente(tam, negrita=True):
    candidatas = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if negrita else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if negrita else "C:/Windows/Fonts/arial.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    ]
    for c in candidatas:
        if os.path.exists(c):
            return ImageFont.truetype(c, tam)
    return ImageFont.load_default()


def flor(d, cx, cy, r, color, centro, petalos):
    for k in range(petalos):
        a = 2 * math.pi * k / petalos
        px, py = cx + math.cos(a) * r * 0.6, cy + math.sin(a) * r * 0.6
        d.ellipse([px - r * 0.45, py - r * 0.45, px + r * 0.45, py + r * 0.45], fill=color, outline="#000", width=2)
    d.ellipse([cx - r * 0.3, cy - r * 0.3, cx + r * 0.3, cy + r * 0.3], fill=centro, outline="#000", width=2)


def calavera(d, cx, cy, r, color, oscuro):
    d.ellipse([cx - r, cy - r, cx + r, cy + r * 0.8], fill=color, outline=oscuro, width=3)
    d.rectangle([cx - r * 0.5, cy + r * 0.5, cx + r * 0.5, cy + r * 1.1], fill=color, outline=oscuro, width=3)
    for s in (-1, 1):
        d.ellipse([cx + s * r * 0.45 - r * 0.25, cy - r * 0.2, cx + s * r * 0.45 + r * 0.25, cy + r * 0.3], fill=oscuro)
    d.polygon([(cx, cy + r * 0.35), (cx - r * 0.12, cy + r * 0.55), (cx + r * 0.12, cy + r * 0.55)], fill=oscuro)
    for k in range(-2, 3):
        d.line([cx + k * r * 0.18, cy + r * 0.7, cx + k * r * 0.18, cy + r * 1.05], fill=oscuro, width=3)


def greca(d, x, y, t, color):
    """Escalón tipo greca maya (una sola, no repetida en patrón regular)."""
    pts = [(x, y), (x + 3 * t, y), (x + 3 * t, y + 3 * t), (x + t, y + 3 * t), (x + t, y + 2 * t),
           (x + 2 * t, y + 2 * t), (x + 2 * t, y + t), (x, y + t)]
    d.polygon(pts, fill=color, outline="#000")


def tarjeta(ident, titulo, maya, fondo, colores, semilla):
    rnd = random.Random(semilla)
    im = Image.new("RGB", (ANCHO, ALTO), fondo)
    d = ImageDraw.Draw(im)

    # 1) Textura de fondo: muchas figuras pequeñas, tamaños y giros al azar (sin simetría)
    for _ in range(420):
        x, y = rnd.randint(-40, ANCHO + 40), rnd.randint(-40, ALTO + 40)
        r = rnd.choice([6, 9, 12, 16, 22, 30, 42])
        c = rnd.choice(colores)
        tipo = rnd.random()
        if tipo < 0.3:
            d.ellipse([x - r, y - r, x + r, y + r], fill=c, outline="#000", width=2)
        elif tipo < 0.55:
            a = rnd.random() * math.tau
            pts = [(x + math.cos(a + k * 2.09) * r * 1.3, y + math.sin(a + k * 2.09) * r * 1.3) for k in range(3)]
            d.polygon(pts, fill=c, outline="#000")
        elif tipo < 0.75:
            a = rnd.random() * math.tau
            d.line([x, y, x + math.cos(a) * r * 3, y + math.sin(a) * r * 3], fill=c, width=rnd.choice([3, 5, 8]))
        elif tipo < 0.9:
            flor(d, x, y, r * 1.4, c, rnd.choice(colores), rnd.choice([5, 6, 7, 8]))
        else:
            greca(d, x, y, r * 0.6, c)

    # 2) Marco de papel picado irregular
    d.rectangle([0, 0, ANCHO, 120], fill=colores[0])
    x = 0
    while x < ANCHO:
        w = rnd.randint(40, 90)
        d.polygon([(x, 120), (x + w / 2, 120 + rnd.randint(30, 70)), (x + w, 120)], fill=colores[0])
        if rnd.random() < 0.8:
            cx, cy, r = x + w / 2, rnd.randint(30, 90), rnd.randint(8, 22)
            forma = rnd.random()
            if forma < 0.4:
                d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=fondo)
            elif forma < 0.7:
                d.polygon([(cx, cy - r), (cx + r, cy), (cx, cy + r), (cx - r, cy)], fill=fondo)
            else:
                d.rectangle([cx - r * 0.6, cy - r, cx + r * 0.6, cy + r * 0.4], fill=fondo)
        x += w

    # 3) Figura central grande (diferente en cada tarjeta)
    cx, cy = ANCHO // 2 + rnd.randint(-60, 60), 640 + rnd.randint(-40, 40)
    d.ellipse([cx - 300, cy - 300, cx + 300, cy + 300], fill=colores[4], outline=colores[1], width=12)
    if ident == "flores":
        for _ in range(9):
            flor(d, cx + rnd.randint(-190, 190), cy + rnd.randint(-190, 190), rnd.randint(60, 110),
                 rnd.choice(colores[:2]), colores[3], rnd.choice([7, 9, 11]))
    elif ident == "velas":
        for k, (dx, h) in enumerate([(-150, 300), (-30, 380), (100, 260), (200, 200)]):
            d.rectangle([cx + dx - 35, cy + 220 - h, cx + dx + 35, cy + 220], fill=colores[1], outline="#000", width=4)
            d.polygon([(cx + dx, cy + 220 - h - 110), (cx + dx - 30, cy + 220 - h - 20), (cx + dx + 30, cy + 220 - h - 20)],
                      fill=colores[0], outline=colores[2])
    elif ident == "pib":
        d.ellipse([cx - 240, cy - 120, cx + 240, cy + 160], fill="#3f7d3a", outline="#000", width=6)
        d.ellipse([cx - 180, cy - 90, cx + 180, cy + 100], fill=colores[0], outline="#000", width=6)
        for k in range(7):
            d.arc([cx - 170 + k * 12, cy - 80 + k * 18, cx + 170 - k * 20, cy + 90 - k * 6], 180 + k * 9, 340 - k * 7,
                  fill="#2a1606", width=7)
        calavera(d, cx + 170, cy - 200, 70, colores[1], "#000")
    elif ident == "atole":
        d.chord([cx - 230, cy - 160, cx + 230, cy + 240], 0, 180, fill="#8b5a2b", outline="#000", width=6)
        d.ellipse([cx - 230, cy - 20, cx + 230, cy + 80], fill=colores[0], outline="#000", width=6)
        for k in range(3):
            d.arc([cx - 100 + k * 50, cy - 260, cx + k * 50, cy - 40], 200, 340, fill=colores[1], width=10)
        calavera(d, cx - 190, cy - 210, 65, colores[2], "#000")

    # 4) Banda con el nombre (texto grande = más detalle para la cámara y legible para la gente)
    d.rectangle([0, 1080, ANCHO, ALTO], fill="#fbf3e6")
    f1, f2 = fuente(90), fuente(60, False)
    tw = d.textlength(titulo, font=f1)
    d.text(((ANCHO - tw) / 2, 1120), titulo, font=f1, fill="#160f1f")
    tw2 = d.textlength(maya, font=f2)
    d.text(((ANCHO - tw2) / 2, 1250), maya, font=f2, fill="#a3301f")
    for _ in range(14):  # detalles irregulares en la banda
        x = rnd.choice([rnd.randint(20, 120), rnd.randint(880, 980)])
        y = rnd.randint(1100, 1380)
        r = rnd.randint(8, 26)
        d.ellipse([x - r, y - r, x + r, y + r], fill=rnd.choice(colores[:4]), outline="#000", width=2)

    os.makedirs(SALIDA, exist_ok=True)
    ruta = os.path.join(SALIDA, ident + ".png")
    im.save(ruta, optimize=True)
    print("ok", ruta)


if __name__ == "__main__":
    for t in TARJETAS:
        tarjeta(*t)
