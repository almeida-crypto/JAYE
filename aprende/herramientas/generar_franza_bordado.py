# -*- coding: utf-8 -*-
"""Genera img/bordado-franja.svg: franja decorativa de bordado yucateco (punto de cruz)
para la parte superior de las páginas. Reemplaza al papel picado, que no es tradición
de Yucatán. Usa los motivos FLOR y GRECA y la paleta HILO del script de las tarjetas
(solo importa; no lo modifica).

Uso:  python generar_franza_bordado.py
Salida: ../../img/bordado-franja.svg  (baldosa de 24 x 14 puntadas que se repite en X)
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                "..", "..", "entiende", "herramientas"))
from generar_tarjetas import HILO, FLOR, GRECA  # noqa: E402

W, H = 24, 14          # puntadas de la baldosa (se repite en horizontal)
SALIDA = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                      "..", "..", "img", "bordado-franja.svg")

grid = {}


def place(patron, x0, y0, c1, c2=""):
    """Coloca un motivo en la cuadrícula."""
    for j, fila in enumerate(patron):
        for i, ch in enumerate(fila):
            if ch == "x":
                grid[(x0 + i, y0 + j)] = c1
            elif ch == "o" and c2:
                grid[(x0 + i, y0 + j)] = c2


# Borde superior e inferior: bastilla de colores como el ruedo de un hipil
bastilla = ["rosa"] * 6 + ["naranja"] * 6 + ["morado"] * 6 + ["rosa"] * 6
for x in range(W):
    grid[(x, 0)] = bastilla[x]
    grid[(x, H - 1)] = bastilla[x]

# Fila de flores de xpujuk y fila de grecas (igual que en las tarjetas)
place(FLOR, 1, 2, "rosa", "amarillo")
place(FLOR, 13, 2, "rosa", "amarillo")
place(GRECA, 7, 8, "morado")
place(GRECA, 19, 8, "morado")

# Vista previa en consola (letra = color)
vista = {"rosa": "R", "naranja": "N", "morado": "M", "amarillo": "A"}
for y in range(H):
    print("".join(vista.get(grid.get((x, y)), ".") for x in range(W)))

# --- SVG compacto: una puntada en X por celda de un <pattern>, un <path> por color ---
colores = sorted(set(grid.values()))
defs, paths = [], []
for n, c in enumerate(colores):
    defs.append(
        '<pattern id="p%d" width="1" height="1" patternUnits="userSpaceOnUse">'
        '<path d="M.15 .15l.7 .7M.85 .15l-.7 .7" stroke="%s" stroke-width=".3" '
        'stroke-linecap="round" fill="none"/></pattern>' % (n, HILO[c]))
    sub = []
    for y in range(H):
        x = 0
        while x < W:
            if grid.get((x, y)) == c:
                w = 1
                while x + w < W and grid.get((x + w, y)) == c:
                    w += 1
                sub.append("M%d %dh%dv1h-%dz" % (x, y, w, w))
                x += w
            else:
                x += 1
    paths.append('<path fill="url(#p%d)" d="%s"/>' % (n, "".join(sub)))

svg = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" width="%d" height="%d" '
       'preserveAspectRatio="xMidYMid meet" aria-hidden="true">'
       "<defs>%s</defs>%s</svg>"
       % (W, H, W * 4, H * 4, "".join(defs), "".join(paths)))

os.makedirs(os.path.dirname(os.path.abspath(SALIDA)), exist_ok=True)
with open(SALIDA, "w", encoding="utf-8", newline="\n") as f:
    f.write(svg)

kb = os.path.getsize(SALIDA) / 1024.0
print("\n%s (%.1f KB)" % (os.path.normpath(SALIDA), kb))
if kb >= 8:
    print("AVISO: pesa mas de 8 KB")
