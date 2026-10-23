"""
Genera los SVG en punto de cruz de Aprende a partir de los íconos bordados de Entiende.

Solo importa los datos de ../../entiende/herramientas/generar_tarjetas.py; NO modifica ese archivo.

Uso:    python herramientas/exportar_iconos_svg.py        (requiere: pip install pillow)
Salida: ../img/iconos/<id>.svg          38 íconos (uno por elemento)
        ../img/iconos/_generico.svg     flor de xpujuk (respaldo)
        ../img/iconos/zona-*.svg        6 encabezados de zona (reutilizan un ícono representativo)
        ../img/iconos/ninos.svg         vela de color con flores (31 de octubre)
        ../img/iconos/adultos.svg       vela grande blanca (1 de noviembre)
        ../img/iconos/cabecera.svg      franja de grecas y flores de hipil (160 x 40)
        ../img/iconos/altar-silueta.svg silueta del altar (160 x 48), marca de agua al 10%

Cada imagen se dibuja en una cuadrícula (40 x 40 puntadas) y cada puntada encendida se
convierte en una X en el SVG: un <pattern> de 1 x 1 con la X y, por color, un solo <path>
con las corridas de celdas contiguas. Así cada archivo queda por debajo de 8 KB
(el método de una línea por puntada pesa ~870 KB y no se usa).
"""
import math
import os
import sys

from PIL import Image, ImageDraw

AQUI = os.path.dirname(os.path.abspath(__file__))
ENTIENDE = os.path.normpath(os.path.join(AQUI, "..", "..", "entiende", "herramientas"))
SALIDA = os.path.normpath(os.path.join(AQUI, "..", "img", "iconos"))
sys.path.insert(0, ENTIENDE)

# solo importar (el script de Entiende tiene su main protegido por __name__)
from generar_tarjetas import ICONOS, HILO, G, nuevo, FLOR, HOJA, ESTRELLA, GRECA  # noqa: E402

C = HILO
LIMITE = 8 * 1024          # bytes por SVG

# Encabezados de zona: se reutiliza el ícono de un elemento representativo.
ZONA_ICONO = {
    "base": "cruz-verde",      # Mesa, cruz y recuerdos
    "luz": "velas",            # Luz, aroma y camino
    "comida": "pib",           # Comida
    "frutas": "china",         # Frutas y dulces
    "bebidas": "chocolate",    # Bebidas y recipientes
    "ropa": "comal",           # Ropa y cocina
}


# ------------------------------------------------------------------ dibujo de los SVG propios
def bloque(d, patron, x, y, t, c1, c2):
    """Dibuja un motivo de hipil (FLOR, HOJA, ESTRELLA, GRECA) como bloques enteros:
    cada celda del motivo se convierte en una puntada en X del SVG."""
    for j, fila in enumerate(patron):
        for i, ch in enumerate(fila):
            if ch == "x":
                d.rectangle([x + i * t, y + j * t, x + i * t + t - 1, y + j * t + t - 1], fill=c1)
            elif ch == "o":
                d.rectangle([x + i * t, y + j * t, x + i * t + t - 1, y + j * t + t - 1], fill=c2)


def flor_xpujuk(d):
    """Flor de xpujuk bordada: el respaldo cuando un elemento no tiene su propio SVG."""
    d.rectangle([19, 30, 21, 39], fill=C["verde"])
    d.rectangle([12, 33, 18, 36], fill=C["verdeclaro"])
    d.rectangle([22, 36, 28, 39], fill=C["verdeclaro"])
    cx, cy = 20, 17
    for k in range(8):                      # pétalos exteriores (naranja, asoman entre los amarillos)
        a = math.tau * (k + 0.5) / 8
        x, y = cx + math.cos(a) * 11.5, cy + math.sin(a) * 11.5
        d.ellipse([x - 4, y - 4, x + 4, y + 4], fill=C["naranja"])
    for k in range(8):                      # corola amarilla
        a = math.tau * k / 8
        x, y = cx + math.cos(a) * 7, cy + math.sin(a) * 7
        d.ellipse([x - 5, y - 5, x + 5, y + 5], fill=C["amarillo"])
    d.ellipse([cx - 6, cy - 6, cx + 6, cy + 6], fill=C["cafe"])
    d.ellipse([cx - 3, cy - 3, cx + 3, cy + 3], fill=C["rojo"])


def ic_ninos(d):
    """31 de octubre: vela de colores con flores, para los niños."""
    d.rectangle([15, 16, 25, 38], fill=C["rosa"])
    d.rectangle([15, 21, 25, 24], fill=C["amarillo"])
    d.rectangle([15, 28, 25, 31], fill=C["celeste"])
    d.rectangle([19, 13, 21, 16], fill=C["negro"])
    d.polygon([(20, 5), (16, 13), (24, 13)], fill=C["naranja"])
    d.rectangle([19, 8, 21, 12], fill=C["amarillo"])
    for (x, y, col) in [(7, 32, "amarillo"), (33, 32, "morado"), (12, 37, "rosa"), (29, 37, "naranja")]:
        d.ellipse([x - 4, y - 4, x + 4, y + 4], fill=C[col])
        d.ellipse([x - 1, y - 1, x + 1, y + 1], fill=C["cafe"])
    d.rectangle([2, 38, 37, 39], fill=C["verde"])


def ic_adultos(d):
    """1 de noviembre: vela grande y blanca, para los adultos."""
    d.rectangle([13, 11, 27, 37], fill=C["blanco"])
    d.rectangle([13, 11, 16, 37], fill=C["crema"])
    d.rectangle([24, 11, 27, 37], fill=C["crema"])
    d.rectangle([19, 7, 21, 11], fill=C["negro"])
    d.polygon([(20, 1), (16, 8), (24, 8)], fill=C["naranja"])
    d.rectangle([19, 4, 21, 7], fill=C["amarillo"])
    d.rectangle([11, 37, 29, 39], fill=C["cafeclaro"])


def ic_cabecera(d):
    """Franja de grecas y flores de hipil: FLOR, HOJA, ESTRELLA y GRECA."""
    t = 4                                   # 160 x 40 = 8 motivos de 20 x 20 por fila
    fila1 = [
        (FLOR, C["amarillo"], C["naranja"]),
        (HOJA, C["verdeclaro"], C["verde"]),
        (ESTRELLA, C["rosa"], C["morado"]),
        (HOJA, C["verdeclaro"], C["verde"]),
        (FLOR, C["naranja"], C["rojo"]),
        (HOJA, C["verde"], C["verdeclaro"]),
        (ESTRELLA, C["morado"], C["rosa"]),
        (HOJA, C["verdeclaro"], C["verde"]),
    ]
    for i, (patron, c1, c2) in enumerate(fila1):
        x, y = i * 20, 0
        if patron is HOJA:                  # HOJA mide 3 x 3: se centra en su espacio
            bloque(d, patron, x + 4, y + 4, t, c1, c2)
        else:
            bloque(d, patron, x, y, t, c1, c2)
    for i in range(8):
        c1, c2 = (C["morado"], C["rosa"]) if i % 2 == 0 else (C["rosa"], C["naranja"])
        bloque(d, GRECA, i * 20, 20, t, c1, c2)


def florecita(d, cx, cy, c):
    """Flor de xpujuk en píxel: corola de 5 x 5 con puntas, para que no se lea como árbol."""
    for dy, fila in [(-2, (-2, 0, 2)), (-1, (-1, 0, 1)), (0, (-2, -1, 0, 1, 2)),
                     (1, (-1, 0, 1)), (2, (-2, 0, 2))]:
        for dx in fila:
            d.rectangle([cx + dx, cy + dy, cx + dx, cy + dy], fill=c)


def silueta_altar(d):
    """Silueta del altar yucateco en un solo color: mesa con mantel, cruz, velas,
    incensario con humo, comida y flores de xpujuk. Se usa como marca de agua
    (10% de opacidad) detrás del título y del pie; nunca estorba la lectura.

    Las 10 primeras filas quedan libres: así la máscara de la página se disuelve
    en el vacío y no le corta la cruz ni las llamas a los objetos de la mesa."""
    c = C["morado"]

    # mesa: cubierta, mantel colgado con borde festoneado, patas y piso
    d.rectangle([6, 34, 153, 36], fill=c)
    d.rectangle([10, 37, 149, 41], fill=c)
    for x in range(10, 150, 6):
        d.rectangle([x, 42, x + 3, 42], fill=c)
    d.rectangle([14, 43, 17, 45], fill=c)
    d.rectangle([142, 43, 145, 45], fill=c)
    d.rectangle([4, 46, 155, 47], fill=c)

    def vela(x, y):
        """Vela de 5 celdas de ancho hasta la mesa, con su llama encendida."""
        d.rectangle([x, y, x + 4, 33], fill=c)
        d.rectangle([x + 1, y - 4, x + 3, y - 1], fill=c)
        d.rectangle([x + 2, y - 6, x + 2, y - 5], fill=c)

    # velas: par alto y par corto, a ambos lados del centro
    vela(24, 17)
    vela(34, 25)
    vela(123, 25)
    vela(131, 17)

    # cruz verde (ya'ax che') en el centro de la mesa
    d.rectangle([77, 10, 80, 33], fill=c)
    d.rectangle([68, 18, 89, 22], fill=c)

    # incensario con humo de copal subiendo en esquina
    d.rectangle([46, 27, 60, 27], fill=c)
    d.rectangle([48, 28, 58, 29], fill=c)
    d.rectangle([49, 30, 57, 31], fill=c)
    d.rectangle([51, 32, 55, 33], fill=c)
    for i, y in enumerate(range(23, 11, -3)):
        x = 52 if i % 2 == 0 else 54
        d.rectangle([x, y, x + 1, y + 1], fill=c)

    # plato con la comida (montículo de tamales en hoja)
    d.rectangle([95, 32, 115, 33], fill=c)
    d.rectangle([97, 31, 113, 31], fill=c)
    for y, a, b in [(30, 99, 111), (29, 100, 110), (28, 101, 109),
                    (27, 102, 108), (26, 103, 107), (25, 104, 106)]:
        d.rectangle([a, y, b, y], fill=c)

    # jícara de bebida a la izquierda
    d.rectangle([6, 27, 20, 27], fill=c)
    d.rectangle([7, 28, 19, 29], fill=c)
    d.rectangle([8, 30, 18, 31], fill=c)
    d.rectangle([9, 32, 17, 33], fill=c)

    # jícara con flores de xpujuk a la derecha
    d.rectangle([143, 29, 152, 33], fill=c)
    d.rectangle([143, 28, 152, 28], fill=c)
    d.rectangle([144, 26, 151, 27], fill=c)
    d.rectangle([147, 19, 147, 25], fill=c)
    d.rectangle([144, 23, 144, 25], fill=c)
    d.rectangle([151, 23, 151, 25], fill=c)
    florecita(d, 147, 16, c)
    florecita(d, 143, 20, c)
    florecita(d, 152, 20, c)


# ------------------------------------------------------------------ de la cuadrícula al SVG
def a_svg(im):
    """Convierte la imagen de puntadas en un SVG con <pattern> por color y un <path> por color."""
    px = im.load()
    ancho, alto = im.size
    orden, mapa, rejilla = [], {}, []
    for y in range(alto):
        fila = []
        for x in range(ancho):
            r, g, b, a = px[x, y]
            if a > 128:
                hexc = "#%02x%02x%02x" % (r, g, b)
                if hexc not in mapa:
                    mapa[hexc] = len(orden)
                    orden.append(hexc)
                fila.append(mapa[hexc])
            else:
                fila.append(-1)
        rejilla.append(fila)

    defs, caminos = [], []
    for i, hexc in enumerate(orden):
        defs.append(
            '<pattern id="p%d" width="1" height="1" patternUnits="userSpaceOnUse">'
            '<path d="M.15 .15l.7 .7M.85 .15l-.7 .7" stroke="%s" stroke-width=".3" '
            'stroke-linecap="round" fill="none"/></pattern>' % (i, hexc)
        )
        d = []
        for y in range(alto):
            x = 0
            while x < ancho:
                if rejilla[y][x] == i:
                    x2 = x
                    while x2 < ancho and rejilla[y][x2] == i:
                        x2 += 1
                    w = x2 - x
                    d.append("M%d %dh%dv1h-%dz" % (x, y, w, w))
                    x = x2
                else:
                    x += 1
        if d:
            caminos.append('<path fill="url(#p%d)" d="%s"/>' % (i, "".join(d)))

    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" role="img" '
        'preserveAspectRatio="xMidYMid meet"><defs>%s</defs>%s</svg>'
        % (ancho, alto, "".join(defs), "".join(caminos))
    )


def guardar(nombre, im):
    os.makedirs(SALIDA, exist_ok=True)
    ruta = os.path.join(SALIDA, nombre)
    texto = a_svg(im)
    with open(ruta, "w", encoding="utf-8", newline="\n") as f:
        f.write(texto + "\n")
    peso = os.path.getsize(ruta)
    estado = "ok " if peso < LIMITE else "PESADO"
    print("%s %-22s %6d B" % (estado, nombre, peso))
    return peso


def dibujar(funcion, ancho=G, alto=G):
    im = Image.new("RGBA", (ancho, alto), (0, 0, 0, 0))
    funcion(ImageDraw.Draw(im))
    return im


def main():
    total = 0
    for id_el, funcion in ICONOS.items():
        total += guardar("%s.svg" % id_el, dibujar(funcion))
    total += guardar("_generico.svg", dibujar(flor_xpujuk))
    for zona, id_representativo in ZONA_ICONO.items():
        total += guardar("zona-%s.svg" % zona, dibujar(ICONOS[id_representativo]))
    total += guardar("ninos.svg", dibujar(ic_ninos))
    total += guardar("adultos.svg", dibujar(ic_adultos))
    total += guardar("cabecera.svg", dibujar(ic_cabecera, 160, 40))
    total += guardar("altar-silueta.svg", dibujar(silueta_altar, 160, 48))
    print("total %d B (%.1f KB)" % (total, total / 1024.0))


if __name__ == "__main__":
    main()
