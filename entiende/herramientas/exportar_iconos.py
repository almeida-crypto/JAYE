"""Exporta el ícono bordado de cada elemento como PNG transparente para el altar digital.

Usa los mismos dibujos que generar_tarjetas.py. Salida: entiende/img/iconos/<id>.png
    python herramientas/exportar_iconos.py
"""
import os
from PIL import Image, ImageDraw
import generar_tarjetas as gt

CELDA = 6  # px por puntada -> 240 x 240 px
SALIDA = os.path.join(gt.AQUI, "..", "img", "iconos")


def main():
    os.makedirs(SALIDA, exist_ok=True)
    for id_, dibujar in gt.ICONOS.items():
        icono, d = gt.nuevo()
        dibujar(d)
        lado = gt.G * CELDA
        im = Image.new("RGBA", (lado, lado), (0, 0, 0, 0))
        gt.bordar_icono(ImageDraw.Draw(im), icono, 0, 0, CELDA)
        im.save(os.path.join(SALIDA, id_ + ".png"), optimize=True)
        print("ok", id_)


if __name__ == "__main__":
    main()
