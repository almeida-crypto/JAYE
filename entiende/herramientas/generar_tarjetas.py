"""
Genera una tarjeta por cada elemento de data/elementos.json, en estilo de Hanal Pixán yucateco:
bordado de punto de cruz (xokbil chuuy) como en los hipiles, flores de xpujuk, papel picado
y grecas mayas. (Sin calaveritas ni cempasúchil: no son parte del Hanal Pixán tradicional.)

Uso:   python generar_tarjetas.py            (requiere: pip install pillow)
Salida: ../targets/tarjetas/<NN>-<id>.png   (1000 x 1400 px ≈ 10 x 14 cm; NN = camara.targetIndex)

Para que la cámara las distinga, cada tarjeta tiene un ícono propio bordado, una
distribución de flores única (semilla = id) y su nombre. El color del papel picado indica la
parte del altar. Todas se compilan juntas, en orden, en targets/altar.mind con herramientas/compilar.html.
"""
import json
import math
import os, sys
import random
import zlib

from PIL import Image, ImageDraw, ImageFont

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.normpath(os.path.join(AQUI, "..", ".."))
SALIDA = os.path.join(AQUI, "..", "targets", "tarjetas")
ANCHO, ALTO = 1000, 1400
G = 40            # cuadrícula del ícono (40 x 40 puntadas)
CELDA = 13        # px por puntada

# Colores de hilo, inspirados en los hipiles
HILO = {
    "rojo": "#c8102e", "rosa": "#e2457a", "naranja": "#f08a1c", "amarillo": "#ffc72c",
    "verde": "#2e8b3d", "verdeclaro": "#7cc24a", "azul": "#1f6fb2", "celeste": "#62b6e8",
    "morado": "#7a3fa0", "lila": "#b48ad6", "cafe": "#7b4a1e", "cafeclaro": "#c2884a",
    "negro": "#1b1214", "blanco": "#fbf6ea", "gris": "#9a8f86", "crema": "#efe2c4",
}
PUESTOS = 20      # motivos bordados alrededor del medallón (más = más detalle, pero .mind más pesado)
ZONA_COLOR = {
    "base": ("#2e8b3d", "#c8102e"), "luz": ("#f08a1c", "#7a3fa0"), "comida": ("#c8102e", "#ffc72c"),
    "frutas": ("#e2457a", "#2e8b3d"), "bebidas": ("#1f6fb2", "#f08a1c"), "ropa": ("#7a3fa0", "#2e8b3d"),
}


def fuente(tam, negrita=True):
    for c in ([
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "C:/Windows/Fonts/arialbd.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    ] if negrita else [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "C:/Windows/Fonts/arial.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
    ]):
        if os.path.exists(c):
            return ImageFont.truetype(c, tam)
    return ImageFont.load_default()


# ------------------------------------------------------------------ íconos (pixel art 40x40)
# Cada función dibuja sobre una imagen "P" de 40x40 con colores de HILO; None = sin puntada.
def nuevo():
    im = Image.new("RGBA", (G, G), (0, 0, 0, 0))
    return im, ImageDraw.Draw(im)


C = HILO


def ic_mantel(d):
    d.polygon([(4, 16), (36, 16), (39, 24), (1, 24)], fill=C["blanco"])
    d.rectangle([1, 24, 39, 30], fill=C["blanco"])
    for x in range(2, 39, 4):
        d.point((x, 27), fill=C["negro"]); d.point((x + 1, 28), fill=C["negro"]); d.point((x + 2, 27), fill=C["negro"])
    d.line([(1, 30), (39, 30)], fill=C["negro"])
    d.rectangle([4, 31, 6, 38], fill=C["cafe"]); d.rectangle([33, 31, 35, 38], fill=C["cafe"])
    d.rectangle([18, 8, 21, 15], fill=C["verde"]); d.rectangle([15, 10, 24, 12], fill=C["verde"])


def ic_hojas(d):
    d.polygon([(6, 34), (14, 8), (22, 4), (26, 12), (18, 34)], fill=C["verde"])
    d.line([(8, 34), (21, 6)], fill=C["verdeclaro"], width=1)
    for k in range(8):
        d.line([(10 + k * 1.5, 30 - k * 3), (18 + k, 30 - k * 3)], fill=C["verdeclaro"])
    d.polygon([(20, 36), (28, 14), (36, 10), (38, 18), (28, 36)], fill=C["verdeclaro"])
    d.line([(22, 36), (35, 12)], fill=C["verde"])


def ic_cruz(d):
    d.rectangle([17, 3, 23, 37], fill=C["verde"]); d.rectangle([7, 11, 33, 17], fill=C["verde"])
    d.rectangle([19, 5, 20, 35], fill=C["verdeclaro"]); d.rectangle([9, 13, 31, 14], fill=C["verdeclaro"])
    for (x, y) in [(20, 2), (5, 14), (35, 14), (20, 38)]:
        d.ellipse([x - 2, y - 2, x + 2, y + 2], fill=C["amarillo"])


def ic_rosario(d):
    for k in range(26):
        a = math.tau * k / 26
        x, y = 20 + math.cos(a) * 14, 15 + math.sin(a) * 11
        d.ellipse([x - 1, y - 1, x + 1, y + 1], fill=C["amarillo"])
    d.line([(20, 26), (20, 30)], fill=C["amarillo"])
    d.rectangle([19, 30, 21, 39], fill=C["amarillo"]); d.rectangle([16, 32, 24, 34], fill=C["amarillo"])
    d.point((20, 33), fill=C["naranja"])


def ic_foto(d):
    d.rectangle([8, 3, 32, 37], fill=C["cafeclaro"]); d.rectangle([11, 6, 29, 34], fill=C["crema"])
    d.ellipse([15, 9, 25, 20], fill=C["cafe"]); d.rectangle([13, 22, 27, 34], fill=C["azul"])
    d.polygon([(17, 22), (20, 27), (23, 22)], fill=C["blanco"])


def ic_objetos(d):
    d.ellipse([2, 18, 38, 30], fill=C["crema"]); d.ellipse([11, 6, 29, 24], fill=C["crema"])
    d.rectangle([11, 17, 29, 20], fill=C["negro"])
    d.line([(6, 24), (34, 24)], fill=C["cafeclaro"])
    for k in range(9):
        d.point((10 + k * 2, 34 + (k % 2)), fill=C["amarillo"])


def ic_velas(d):
    for (x, h) in [(9, 26), (19, 32), (29, 22)]:
        d.rectangle([x - 3, 38 - h, x + 3, 38], fill=C["blanco"])
        d.line([(x - 3, 38 - h + 3), (x - 3, 38)], fill=C["crema"])
        d.polygon([(x, 38 - h - 8), (x - 3, 38 - h - 2), (x + 3, 38 - h - 2)], fill=C["naranja"])
        d.point((x, 38 - h - 3), fill=C["amarillo"]); d.point((x, 38 - h - 4), fill=C["amarillo"])


def ic_incienso(d):
    for (x, y) in [(12, 32), (19, 34), (26, 31), (16, 28), (23, 27)]:
        d.ellipse([x - 4, y - 3, x + 4, y + 3], fill=C["crema"]); d.point((x - 1, y - 1), fill=C["blanco"])
    for k in range(18):
        d.point((20 + int(5 * math.sin(k / 2.5)), 22 - k), fill=C["gris"])
        d.point((14 + int(4 * math.sin(k / 2 + 1)), 20 - k), fill=C["lila"])


def ic_incensario(d):
    d.chord([7, 14, 33, 34], 0, 180, fill=C["cafe"]); d.rectangle([7, 22, 33, 24], fill=C["cafeclaro"])
    d.rectangle([17, 32, 23, 36], fill=C["cafe"]); d.rectangle([12, 36, 28, 38], fill=C["cafe"])
    for x in (12, 20, 28): d.rectangle([x - 1, 21, x + 1, 23], fill=C["naranja"])
    for k in range(17):
        d.point((20 + int(4 * math.sin(k / 2.2)), 19 - k), fill=C["gris"])


def ic_flores(d):
    for (cx, cy, r, c) in [(12, 13, 7, "amarillo"), (27, 12, 6, "naranja"), (20, 25, 8, "amarillo"), (8, 30, 4, "lila"), (33, 27, 5, "rojo")]:
        for k in range(8):
            a = math.tau * k / 8
            x, y = cx + math.cos(a) * r * .65, cy + math.sin(a) * r * .65
            d.ellipse([x - r * .45, y - r * .45, x + r * .45, y + r * .45], fill=C[c])
        d.ellipse([cx - 2, cy - 2, cx + 2, cy + 2], fill=C["cafe"])
    d.line([(20, 33), (20, 39)], fill=C["verde"], width=2)


def ic_cal(d):
    d.polygon([(14, 4), (26, 4), (38, 39), (2, 39)], fill=C["cafeclaro"])
    for k in range(0, 36, 3):
        y = 4 + k
        xl = 14 - k * 12 / 35; xr = 26 + k * 12 / 35
        d.rectangle([xl - 1, y, xl, y + 1], fill=C["blanco"]); d.rectangle([xr, y, xr + 1, y + 1], fill=C["blanco"])
    d.ellipse([16, 4, 24, 10], fill=C["amarillo"])


def ic_jicara(d):
    d.chord([4, 6, 36, 34], 0, 180, fill=C["cafe"]); d.ellipse([4, 15, 36, 25], fill=C["celeste"])
    d.ellipse([10, 17, 30, 23], fill=C["azul"])
    for x in range(6, 35, 3): d.point((x, 27), fill=C["cafeclaro"])
    d.ellipse([9, 31, 31, 38], outline=C["verdeclaro"], width=2)


def ic_pib(d):
    d.ellipse([3, 10, 37, 34], fill=C["verde"])
    d.ellipse([8, 13, 32, 30], fill=C["cafeclaro"]); d.ellipse([12, 16, 28, 27], fill=C["naranja"])
    for k in range(5): d.line([(4 + k * 7, 22), (8 + k * 7, 12)], fill=C["verdeclaro"])
    d.line([(3, 22), (37, 22)], fill=C["verde"])


def ic_tamales(d):
    for (x, y, c) in [(4, 8, "verde"), (20, 8, "verdeclaro"), (12, 22, "verde")]:
        d.rectangle([x, y, x + 15, y + 11], fill=C[c]); d.rectangle([x + 3, y + 3, x + 12, y + 8], fill=C["rojo"])
        d.line([(x + 7, y), (x + 7, y + 11)], fill=C["crema"])


def ic_relleno(d):
    d.chord([3, 10, 37, 36], 0, 180, fill=C["rojo"]); d.ellipse([3, 18, 37, 28], fill=C["negro"])
    d.ellipse([12, 19, 20, 25], fill=C["blanco"]); d.ellipse([14, 20, 18, 24], fill=C["amarillo"])
    d.ellipse([23, 20, 29, 25], fill=C["cafe"])


def ic_frijol(d):
    d.chord([3, 10, 37, 36], 0, 180, fill=C["crema"]); d.ellipse([3, 18, 37, 28], fill=C["negro"])
    for (x, y) in [(10, 22), (15, 21), (25, 22), (30, 23), (20, 24)]:
        d.ellipse([x - 2, y - 1, x + 2, y + 1], fill=C["cafeclaro"])
    d.ellipse([18, 19, 24, 23], fill=C["rosa"])


def ic_escabeche(d):
    d.ellipse([2, 14, 38, 34], fill=C["blanco"]); d.ellipse([7, 17, 33, 31], fill=C["crema"])
    d.ellipse([10, 18, 24, 28], fill=C["cafeclaro"])
    for (x, y) in [(26, 21), (29, 25), (24, 27)]: d.ellipse([x - 3, y - 2, x + 3, y + 2], outline=C["morado"])
    d.line([(30, 12), (36, 6)], fill=C["verdeclaro"], width=2)


def ic_pan(d):
    d.chord([4, 10, 36, 34], 180, 360, fill=C["cafeclaro"]); d.rectangle([4, 22, 36, 26], fill=C["cafeclaro"])
    for x in range(8, 33, 6): d.line([(x, 12), (x + 4, 22)], fill=C["crema"])
    for y in range(14, 22, 4): d.line([(6, y), (34, y)], fill=C["crema"])
    d.rectangle([6, 28, 34, 34], fill=C["amarillo"]); d.line([(6, 31), (34, 31)], fill=C["naranja"])


def ic_china(d):
    d.ellipse([6, 9, 34, 37], fill=C["naranja"]); d.ellipse([11, 13, 17, 19], fill=C["amarillo"])
    d.polygon([(20, 9), (28, 2), (31, 6)], fill=C["verde"]); d.line([(20, 9), (20, 5)], fill=C["cafe"])


def ic_mandarina(d):
    d.ellipse([3, 14, 37, 36], fill=C["naranja"]); d.ellipse([8, 18, 14, 22], fill=C["amarillo"])
    for x in (13, 20, 27): d.line([(x, 16), (x, 34)], fill=C["rojo"])
    d.polygon([(20, 14), (12, 6), (18, 6)], fill=C["verde"])


def ic_platano(d):
    for k in range(4):
        ox = 6 + k * 7
        exterior = [(ox + 10 + 12 * math.sin(t / 10 * math.pi) * 0.4 - t * 0.2, 6 + t * 3) for t in range(11)]
        pts = []
        for t in range(11):
            a = t / 10 * math.pi
            pts.append((ox + 3 * math.sin(a) * 2.2, 6 + t * 3))
        for t in range(10, -1, -1):
            a = t / 10 * math.pi
            pts.append((ox + 4 + 3 * math.sin(a) * 1.2, 6 + t * 3))
        d.polygon(pts, fill=C["amarillo"] if k % 2 == 0 else C["naranja"])
        d.rectangle([ox, 36, ox + 3, 38], fill=C["cafe"])
    d.rectangle([6, 2, 34, 6], fill=C["verde"])
    d.rectangle([18, 0, 22, 2], fill=C["cafe"])


def ic_yuca(d):
    for (a, l) in [(-0.5, 30), (0.1, 34), (0.6, 28)]:
        x2, y2 = 20 + math.sin(a) * l, 4 + math.cos(a) * l
        d.line([(20, 4), (x2, y2)], fill=C["cafe"], width=5); d.line([(20, 4), (x2, y2)], fill=C["crema"], width=1)
    d.polygon([(20, 4), (12, 1), (28, 1)], fill=C["verde"])


def ic_calabaza(d):
    for (x0, x1, c) in [(4, 20, "naranja"), (20, 36, "naranja"), (11, 29, "amarillo")]:
        d.ellipse([x0, 10, x1, 36], fill=C[c])
    for x in (12, 20, 28): d.line([(x, 12), (x, 34)], fill=C["rojo"])
    d.rectangle([18, 4, 22, 11], fill=C["verde"])


def ic_jicama(d):
    d.ellipse([5, 10, 35, 38], fill=C["cafeclaro"]); d.ellipse([10, 16, 30, 32], fill=C["crema"])
    d.polygon([(20, 10), (16, 2), (24, 2)], fill=C["cafe"])
    for (x, y) in [(14, 20), (25, 26), (19, 30)]: d.point((x, y), fill=C["cafe"])


def ic_coco(d):
    d.chord([4, 8, 36, 38], 0, 180, fill=C["cafe"]); d.chord([8, 12, 32, 34], 0, 180, fill=C["blanco"])
    d.rectangle([4, 21, 36, 23], fill=C["cafe"])
    for (x, y) in [(10, 6), (20, 4), (30, 7)]: d.rectangle([x - 4, y, x + 4, y + 7], fill=C["blanco"]); d.rectangle([x - 4, y, x + 4, y + 1], fill=C["cafeclaro"])


def ic_cocoyol(d):
    for k in range(14):
        a = k * 2.4
        r = 3 + k * 0.9
        x, y = 20 + math.cos(a) * r, 22 + math.sin(a) * r * 0.8
        d.ellipse([x - 3, y - 3, x + 3, y + 3], fill=C["amarillo"] if k % 3 else C["naranja"])
    d.line([(20, 2), (20, 12)], fill=C["cafe"], width=2)
    d.polygon([(20, 3), (6, 8), (12, 4)], fill=C["verde"]); d.polygon([(20, 3), (34, 8), (28, 4)], fill=C["verde"])


def ic_miel(d):
    d.rectangle([9, 14, 31, 38], fill=C["amarillo"]); d.rectangle([9, 14, 31, 18], fill=C["naranja"])
    d.rectangle([12, 10, 28, 14], fill=C["cafe"])
    for (x, y) in [(15, 24), (22, 28), (17, 32)]: d.rectangle([x, y, x + 3, y + 2], fill=C["naranja"])
    d.ellipse([29, 2, 37, 9], fill=C["negro"]); d.ellipse([27, 0, 32, 4], fill=C["celeste"]); d.ellipse([33, 0, 38, 4], fill=C["celeste"])
    d.line([(30, 5), (36, 5)], fill=C["amarillo"])


def ic_aguardiente(d):
    d.rectangle([13, 14, 27, 38], fill=C["celeste"]); d.rectangle([17, 4, 23, 14], fill=C["celeste"])
    d.rectangle([17, 2, 23, 5], fill=C["rojo"]); d.rectangle([13, 22, 27, 30], fill=C["blanco"])
    d.line([(15, 26), (25, 26)], fill=C["rojo"]); d.rectangle([13, 32, 27, 38], fill=C["azul"])


def ic_chocolate(d):
    d.chord([5, 10, 35, 38], 0, 180, fill=C["cafe"]); d.ellipse([5, 20, 35, 28], fill=C["negro"])
    d.ellipse([10, 21, 30, 27], fill=C["cafe"])
    for k in range(12):
        d.point((14 + int(3 * math.sin(k / 2)), 18 - k), fill=C["gris"]); d.point((26 + int(3 * math.sin(k / 2 + 2)), 18 - k), fill=C["gris"])
    d.ellipse([30, 4, 38, 14], fill=C["cafeclaro"]); d.line([(34, 5), (34, 13)], fill=C["cafe"])


def ic_atole(d):
    d.chord([2, 14, 30, 38], 0, 180, fill=C["cafe"]); d.ellipse([2, 22, 30, 30], fill=C["crema"])
    d.ellipse([24, 2, 34, 30], fill=C["amarillo"])
    for y in range(4, 29, 3):
        for x in (26, 29, 32): d.point((x, y), fill=C["naranja"])
    d.polygon([(29, 30), (22, 20), (24, 36)], fill=C["verde"]); d.polygon([(29, 30), (37, 18), (34, 36)], fill=C["verdeclaro"])


def ic_cigarros(d):
    for (y, x0) in [(26, 4), (32, 8)]:
        d.rectangle([x0, y, x0 + 26, y + 3], fill=C["blanco"]); d.rectangle([x0 + 20, y, x0 + 26, y + 3], fill=C["cafeclaro"])
        d.rectangle([x0, y, x0 + 1, y + 3], fill=C["rojo"])
    for k in range(18): d.point((6 + int(3 * math.sin(k / 2)), 24 - k), fill=C["gris"])


def ic_lek(d):
    d.ellipse([5, 10, 35, 38], fill=C["amarillo"]); d.ellipse([5, 10, 35, 38], outline=C["cafe"])
    d.line([(5, 20), (35, 20)], fill=C["cafe"]); d.ellipse([16, 5, 24, 12], fill=C["cafeclaro"])
    for x in range(9, 32, 4): d.point((x, 28), fill=C["verde"]); d.point((x + 2, 30), fill=C["verde"])


def ic_platos(d):
    for (y, c) in [(30, "cafe"), (24, "cafeclaro"), (18, "rojo")]:
        d.ellipse([3, y, 37, y + 8], fill=C[c]); d.ellipse([11, y + 2, 29, y + 6], fill=C["crema"])
    d.chord([10, 2, 30, 22], 0, 180, fill=C["cafe"]); d.ellipse([10, 9, 30, 15], fill=C["cafeclaro"])


def ic_tortear(d):
    for k in range(5):
        d.ellipse([6, 26 - k * 3, 34, 34 - k * 3], fill=C["crema"]); d.ellipse([6, 26 - k * 3, 34, 34 - k * 3], outline=C["cafeclaro"])
    d.ellipse([3, 2, 19, 12], fill=C["cafeclaro"]); d.ellipse([21, 2, 37, 12], fill=C["cafeclaro"])
    d.ellipse([12, 8, 28, 14], fill=C["blanco"])


def ic_comal(d):
    for x in (6, 20, 34): d.ellipse([x - 5, 26, x + 5, 36], fill=C["gris"])
    d.ellipse([1, 18, 39, 28], fill=C["negro"]); d.ellipse([5, 19, 35, 26], fill=C["cafe"])
    d.ellipse([12, 19, 28, 24], fill=C["crema"])
    for (x, y) in [(12, 34), (26, 33), (19, 31)]: d.rectangle([x, y, x + 2, y + 3], fill=C["naranja"])
    d.point((20, 37), fill=C["rojo"])


def ic_filipina(d):
    d.polygon([(10, 4), (30, 4), (39, 14), (34, 18), (31, 14), (31, 38), (9, 38), (9, 14), (6, 18), (1, 14)], fill=C["blanco"])
    d.rectangle([17, 3, 23, 6], fill=C["crema"])
    for y in range(9, 37, 5): d.point((20, y), fill=C["amarillo"])
    for x in (13, 15, 25, 27): d.line([(x, 8), (x, 37)], fill=C["crema"])
    d.rectangle([11, 26, 16, 31], outline=C["crema"]); d.rectangle([24, 26, 29, 31], outline=C["crema"])


def ic_pantalon(d):
    d.polygon([(8, 3), (32, 3), (36, 38), (24, 38), (20, 14), (16, 38), (4, 38)], fill=C["blanco"])
    d.rectangle([8, 3, 32, 6], fill=C["crema"]); d.line([(20, 7), (20, 13)], fill=C["crema"])
    d.rectangle([28, 9, 31, 14], fill=C["rojo"])


def ic_alpargatas(d):
    for x0 in (2, 21):
        d.ellipse([x0, 8, x0 + 16, 38], fill=C["blanco"]); d.ellipse([x0, 8, x0 + 16, 38], outline=C["crema"])
        d.rectangle([x0 + 1, 16, x0 + 15, 20], fill=C["cafeclaro"]); d.rectangle([x0 + 1, 24, x0 + 15, 27], fill=C["cafeclaro"])
        d.rectangle([x0 + 3, 34, x0 + 13, 38], fill=C["cafe"])


def ic_joroches(d):
    # plato hondo con caldo de frijol y bolitas de masa con su hoyito
    d.chord([2, 8, 38, 38], 0, 180, fill=C["crema"])
    d.line([(4, 30), (36, 30)], fill=C["cafeclaro"])
    d.ellipse([2, 16, 38, 28], fill=C["negro"])
    d.ellipse([5, 18, 35, 26], fill=C["cafe"])
    for (x, y) in [(10, 20), (19, 19), (28, 20), (14, 24), (24, 24)]:
        d.ellipse([x - 3, y - 2, x + 3, y + 2], fill=C["amarillo"], outline=C["cafeclaro"])
        d.point((x, y), fill=C["cafe"])
    for x in (12, 20, 28):  # vapor
        d.line([(x, 13), (x + 1, 10), (x, 7), (x + 1, 4)], fill=C["gris"])


def ic_velas_colores(d):
    for (x, h, c) in [(9, 24, "rosa"), (19, 32, "celeste"), (29, 22, "amarillo")]:
        d.rectangle([x - 3, 38 - h, x + 3, 38], fill=C[c])
        d.line([(x - 3, 38 - h + 3), (x - 3, 38)], fill=C["blanco"])
        d.polygon([(x, 38 - h - 8), (x - 3, 38 - h - 2), (x + 3, 38 - h - 2)], fill=C["naranja"])
        d.point((x, 38 - h - 3), fill=C["amarillo"]); d.point((x, 38 - h - 4), fill=C["blanco"])


ICONOS = {
    "mantel": ic_mantel, "hojas-platano": ic_hojas, "cruz-verde": ic_cruz, "rosario": ic_rosario,
    "fotografia": ic_foto, "objetos": ic_objetos, "velas": ic_velas, "incienso": ic_incienso,
    "incensario": ic_incensario, "flores": ic_flores, "cal": ic_cal, "jicaras-bejuco": ic_jicara,
    "pib": ic_pib, "tamales": ic_tamales, "relleno-negro": ic_relleno, "frijol-puerco": ic_frijol,
    "escabeche": ic_escabeche, "pan": ic_pan, "china": ic_china, "mandarina": ic_mandarina,
    "platano": ic_platano, "yuca": ic_yuca, "dulce-calabaza": ic_calabaza, "jicama": ic_jicama,
    "dulce-coco": ic_coco, "dulce-cocoyol": ic_cocoyol, "miel": ic_miel, "aguardiente": ic_aguardiente,
    "chocolate": ic_chocolate, "atole-nuevo": ic_atole, "cigarros": ic_cigarros, "lek": ic_lek,
    "platos-barro": ic_platos, "tortear": ic_tortear, "comal": ic_comal, "filipina": ic_filipina,
    "pantalon": ic_pantalon, "alpargatas": ic_alpargatas,
    "joroches": ic_joroches, "velas-colores": ic_velas_colores,
}


# ------------------------------------------------------------------ bordado
def puntada(d, x, y, t, color, grosor=3):
    """Una puntada en X (punto de cruz) de lado t con esquina superior izquierda en (x, y)."""
    m = 1
    d.line([(x + m, y + m), (x + t - m, y + t - m)], fill=color, width=grosor)
    d.line([(x + t - m, y + m), (x + m, y + t - m)], fill=color, width=grosor)


def bordar_icono(d, icono, x0, y0, celda):
    px = icono.load()
    for j in range(G):
        for i in range(G):
            r, g, b, a = px[i, j]
            if a > 128:
                puntada(d, x0 + i * celda, y0 + j * celda, celda, (r, g, b), grosor=max(2, celda // 4))


# Motivos de hipil (pequeños patrones de puntadas)
FLOR = ["..x..", ".xxx.", "xxoxx", ".xxx.", "..x.."]
HOJA = ["..x", ".xx", "xx."]
ESTRELLA = ["x...x", ".x.x.", "..o..", ".x.x.", "x...x"]
GRECA = ["xxxx.", "...x.", ".x.x.", ".xxx.", "....."]


def motivo(d, patron, x, y, t, c1, c2):
    for j, fila in enumerate(patron):
        for i, ch in enumerate(fila):
            if ch == "x":
                puntada(d, x + i * t, y + j * t, t, c1, grosor=2)
            elif ch == "o":
                puntada(d, x + i * t, y + j * t, t, c2, grosor=2)


def tarjeta(el, idx_zona, total_zona):
    rnd = random.Random(zlib.crc32(el["id"].encode()))
    c_zona, c_zona2 = ZONA_COLOR[el["camara"]["zona"]]
    im = Image.new("RGB", (ANCHO, ALTO), "#f3ead6")  # manta
    d = ImageDraw.Draw(im)

    # 1) Trama de la manta: líneas finas irregulares (textura)
    for _ in range(0):
        y = rnd.randint(0, ALTO); x = rnd.randint(0, ANCHO); l = rnd.randint(20, 90)
        d.line([(x, y), (x + l, y + rnd.randint(-2, 2))], fill="#e3d6bb", width=1)

    # 2) Flores y hojas bordadas al azar (distribución única por tarjeta)
    paleta = [HILO[k] for k in ("rojo", "rosa", "naranja", "amarillo", "morado", "azul", "verde", "lila", "celeste")]
    cx, cy, R = ANCHO // 2, 640, 350
    puestos = 0
    intentos = 0
    while puestos < PUESTOS and intentos < 4000:
        intentos += 1
        t = rnd.choice([8, 10, 12, 14])
        x, y = rnd.randint(10, ANCHO - 6 * t), rnd.randint(150, 1060)
        if math.hypot(x + 2.5 * t - cx, y + 2.5 * t - cy) < R + 3.5 * t:
            continue
        pat = rnd.choices([FLOR, HOJA, ESTRELLA, GRECA], weights=[5, 3, 2, 1])[0]
        c1 = HILO["verde"] if pat is HOJA else rnd.choice(paleta)
        motivo(d, pat, x, y, t, c1, rnd.choice(paleta))
        puestos += 1

    # 3) Papel picado arriba
    d.rectangle([0, 0, ANCHO, 120], fill=c_zona)
    x = 0
    while x < ANCHO:
        w = rnd.randint(50, 80)
        d.polygon([(x, 120), (x + w / 2, 120 + rnd.randint(28, 46)), (x + w, 120)], fill=c_zona)
        cxp, cyp, r = x + w / 2, rnd.randint(40, 85), rnd.randint(9, 18)
        forma = rnd.random()
        if forma < 0.35:
            d.ellipse([cxp - r, cyp - r, cxp + r, cyp + r], fill="#f3ead6")
        elif forma < 0.7:
            d.polygon([(cxp, cyp - r), (cxp + r, cyp), (cxp, cyp + r), (cxp - r, cyp)], fill="#f3ead6")
        else:
            d.rectangle([cxp - r * .7, cyp - r * .7, cxp + r * .7, cyp + r * .7], fill="#f3ead6")
            d.rectangle([cxp - r * .3, cyp - r * .3, cxp + r * .3, cyp + r * .3], fill=c_zona)
        x += w
    d.line([(0, 6), (ANCHO, 6)], fill=c_zona2, width=6)

    # 4) Medallón: noche con borde bordado y el ícono en punto de cruz
    d.ellipse([cx - R, cy - R, cx + R, cy + R], fill="#1d1230")
    for k in range(72):
        a = math.tau * k / 72
        px, py = cx + math.cos(a) * (R - 18), cy + math.sin(a) * (R - 18)
        puntada(d, px - 7, py - 7, 14, c_zona if k % 2 else c_zona2, grosor=3)
    for k in range(rnd.randint(14, 22)):  # estrellitas en el cielo, al azar
        a = rnd.random() * math.tau; rr = rnd.uniform(60, R - 50)
        px, py = cx + math.cos(a) * rr, cy + math.sin(a) * rr
        puntada(d, px, py, 8, "#fbf6ea", grosor=2)
    icono, di = nuevo()
    ICONOS[el["id"]](di)
    lado = G * CELDA
    bordar_icono(d, icono, cx - lado // 2, cy - lado // 2 + 10, CELDA)

    # 5) Banda inferior con los nombres
    d.rectangle([0, 1090, ANCHO, ALTO], fill="#fbf6ea")
    for x in range(0, ANCHO, 20):  # greca bordada como orilla
        puntada(d, x, 1090, 20, c_zona, grosor=3)
    nombre = el["nombre"]["es"].split(" (")[0].upper()
    tam = 92
    f1 = fuente(tam)
    while d.textlength(nombre, font=f1) > ANCHO - 120 and tam > 40:
        tam -= 4; f1 = fuente(tam)
    d.text(((ANCHO - d.textlength(nombre, font=f1)) / 2, 1140), nombre, font=f1, fill="#1d1230")
    sub = el["maya"]["nombre"] or el["nombre"]["en"].split(" (")[0]
    f2 = fuente(56, False)
    while d.textlength(sub, font=f2) > ANCHO - 160:
        f2 = fuente(f2.size - 4, False)
    d.text(((ANCHO - d.textlength(sub, font=f2)) / 2, 1258), sub, font=f2, fill=HILO["rojo"])
    f3 = fuente(30)
    etiqueta = "Nº %d" % el["n"]
    d.text((40, 1352), etiqueta, font=f3, fill="#6b5e55")
    d.text((ANCHO - 40 - d.textlength("Hanal Pixán", font=f3), 1352), "Hanal Pixán", font=f3, fill="#6b5e55")

    carpeta = SALIDA
    os.makedirs(carpeta, exist_ok=True)
    ruta = os.path.join(carpeta, "%02d-%s.png" % (el["camara"]["targetIndex"], el["id"]))
    im.save(ruta, optimize=True)
    return ruta


def main():
    """Sin argumentos: dibuja todas las tarjetas. Con ids (p. ej. `joroches velas-colores`): solo esas,
    para no tocar las que ya están impresas."""
    solo = set(sys.argv[1:])
    datos = json.load(open(os.path.join(RAIZ, "data", "elementos.json"), encoding="utf-8"))
    for el in datos["elementos"]:
        if not isinstance(el.get("camara", {}).get("targetIndex"), int):
            continue  # sin tarjeta (por ejemplo, el mantel: no va en nuestro altar)
        if solo and el["id"] not in solo:
            continue
        print("ok", tarjeta(el, 0, 0))


if __name__ == "__main__":
    main()
