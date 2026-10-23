# Investigación: los 38 elementos del altar de Hanal Pixán

Documento de referencia del proyecto **Juega, Aprende y Entiende** (grupo de TICs). Tiene los mismos textos que usa la cámara (Entiende), para que el juego y la página digan exactamente lo mismo.

## Cómo usarlo en el juego

- **No copies los textos a mano:** todo está en [`data/elementos.json`](elementos.json). Desde una carpeta del sitio (por ejemplo `juega/`) se carga con `fetch('../data/elementos.json')`.
- Cada elemento tiene `id`, `n` (número en nuestra planeación), `categoria`, `nombre.es` / `nombre.en`, `maya.nombre`, `queEs`, `porQue` e `historia` (en `es` y `en`), y `fuentes`.
- Para el dato corto que aparece al acertar en «Arma el altar», lo más natural es `porQue.es` (o `porQue.en` si el jugador eligió inglés).
- El idioma del sitio se guarda en `localStorage` con la clave `jaye-idioma` (`es` o `en`) y también va en la URL (`?lang=en`). Si el juego lo lee, el visitante conserva su idioma.

## Antes de presentar

- Los textos están investigados con las fuentes citadas, pero **falta que alguien que practique la tradición los revise**. Al revisar un elemento, en el JSON se cambia `"verificado": false` a `true`.
- **Tipos de nombre maya:** *tradicional* = palabra maya documentada; *traducción descriptiva* = armada con palabras documentadas; *palabra relacionada* = cercana, no el nombre exacto; *sin nombre maya tradicional* = el elemento no lo tiene (por ejemplo, el escabeche). No se tradujeron las explicaciones completas al maya porque no podemos garantizar que queden bien escritas.
- **Hallazgos útiles para el concurso:** el cempasúchil grande viene del centro de México, y la flor propia de la península es el **xpujuk**. Las calaveritas y el pan de muerto tampoco son tradicionales del Hanal Pixán. Una organizadora de concurso de altares en Mérida le dijo al Diario de Yucatán que en esos altares «el pan de tumba y hojas de plátano, ésos no van». Conviene revisar las reglas de nuestro concurso.
- **Supuestos sobre nuestra lista:** «Pi» = pib (mukbil pollo). «Tortear» = tortillas hechas a mano. «Jícaras (leek)»: en maya *lek* es el calabazo para guardar tortillas y la jícara para beber es *luuch*, por eso son dos elementos distintos.

## Índice

- **Estructura:** 1. Mantel blanco, 2. Hojas de plátano
- **Religiosos:** 8. Cruz verde de madera, 9. Rosario de filigrana
- **Personales:** 11. Fotografía del difunto, 12. Objetos favoritos del difunto
- **Luz, aroma y camino:** 14. Velas blancas grandes, 15. Incienso (copal), 16. Incensario, 17. Flores (xpujuk, xtés y virginias), 18. Cal a los lados del camino
- **Agua, sal y limpieza:** 23. Jícaras sobre base de bejuco
- **Comida:** 29. Pib (mukbil pollo), 30. Tamales, 31. Relleno negro, 32. Frijol con puerco, 33. Escabeche, 34. Pan (de elote, hojaldra, concha y escotafí), 35. China (naranja dulce), 36. Mandarina, 37. Plátano manzano, 38. Yuca, 39. Dulce de calabaza, 40. Jícama, 41. Dulce de coco, 42. Dulce de cocoyol, 43. Miel
- **Bebidas y otros:** 57. Aguardiente, 58. Chocolate, 59. Atole nuevo, 60. Cigarros
- **Recipientes:** 66. Lek (calabazo para tortillas), 67. Platos pequeños de barro
- **Complementos rituales:** 68. Tortear (tortillas hechas a mano), 69. Comal, 70. Filipina, 71. Pantalón blanco, 72. Alpargatas

## Estructura / Structure

### 1. Mantel blanco

| Español | Maya | Inglés |
|---|---|---|
| Mantel blanco | **Sak nook'** (traducción descriptiva) | White tablecloth |

*Nota sobre el maya:* Sak = blanco; nook' = ropa, paño, manta.

**¿Qué es?** Mantel blanco, casi siempre bordado a mano, que cubre la mesa del altar.

**¿Por qué está en el altar yucateco?** El blanco expresa limpieza y respeto para recibir a las ánimas. En Yucatán el bordado dice para quién es la mesa: con bordados de colores para los niños (31 de octubre) y con bordados negros para los adultos (1 de noviembre).

**Un poco de historia.** El bordado de punto de cruz, en maya xokbil chuuy («hilo contado»), es una de las técnicas más reconocidas de la península y se usa también en hipiles y ternos.

<details><summary>English</summary>

**What is it?** A white tablecloth, usually hand-embroidered, that covers the altar table.

**Why is it on a Yucatecan altar?** White expresses cleanliness and respect for receiving the souls. In Yucatán the embroidery tells who the table is for: colorful embroidery for children (October 31) and black embroidery for adults (November 1).

**A bit of history.** Cross-stitch embroidery, called xokbil chuuy ("counted thread") in Maya, is one of the peninsula's best-known techniques and is also used on hipiles and ternos.

</details>

Fuentes: [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [El Momento Yucatán – El altar del Janal Pixán y su significado](https://elmomentoyucatan.mx/el-altar-de-muertos-en-el-hanal-pixan-lo-que-debe-llevar-el-altar-y-su-significado/) · [UADY – Voces mayas en el español de Yucatán](https://www.mayas.uady.mx/articulos/voces.html)

### 2. Hojas de plátano

| Español | Maya | Inglés |
|---|---|---|
| Hojas de plátano | **Ja'as** (palabra relacionada) | Banana leaves |

*Nota sobre el maya:* Ja'as = plátano. No encontramos un término propio para «hoja de plátano» en el diccionario consultado.

**¿Qué es?** Hojas grandes y verdes de la planta de plátano, que se colocan sobre la mesa o bajo las ofrendas y con las que se envuelven el pib y los tamales.

**¿Por qué está en el altar yucateco?** Envuelven y protegen la comida de las ánimas y le dan su aroma al cocerse. Para el altar de adultos del 1 de noviembre, el mantel también puede ser de hojas de plátano.

**Un poco de historia.** El plátano no es planta americana: llegó con los europeos después de la Conquista. En Yucatán sus hojas se volvieron indispensables para envolver el mukbil pollo antes de enterrarlo en el pib.

<details><summary>English</summary>

**What is it?** Large green leaves from the banana plant, laid on the table or under the offerings, and used to wrap the pib and tamales.

**Why is it on a Yucatecan altar?** They wrap and protect the food of the souls and give it its aroma as it cooks. On the adults' altar of November 1, the table covering can also be made of banana leaves.

**A bit of history.** The banana is not native to the Americas: it arrived with Europeans after the Conquest. In Yucatán its leaves became essential for wrapping the mukbil pollo before burying it in the pib.

</details>

Fuentes: [Por Esto! – Guía del Hanal Pixán (2025)](https://www.poresto.com/yucatan/2025/10/8/guia-del-hanal-pixan-cuando-se-celebra-como-se-arma-el-altar-y-que-comidas-tradicionales-se-preparan-en-yucatan.html) · [Landuum – Plantas y flores del Hanal Pixán](https://www.landuum.com/en/plantae-and-fauna/celebration-of-the-souls-plants-and-flowers/) · [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html)


## Religiosos / Religious

### 8. Cruz verde de madera

| Español | Maya | Inglés |
|---|---|---|
| Cruz verde de madera | **Ya'ax che'** (palabra relacionada) | Green wooden cross |

*Nota sobre el maya:* Ya'ax che' = ceiba (ya'ax = verde; che' = árbol). La cruz verde representa a la ceiba.

**¿Qué es?** Cruz de madera pintada de verde que preside el altar.

**¿Por qué está en el altar yucateco?** Representa a la ceiba sagrada, el árbol de la vida de los mayas, que une el cielo, la tierra y el inframundo. Al mismo tiempo es la cruz cristiana: los dos símbolos conviven en el altar.

**Un poco de historia.** Para los mayas la ceiba estaba en el centro del mundo, con un árbol en cada uno de los cuatro rumbos. En la época colonial las creencias mayas y católicas se mezclaron, y la ceiba se expresó en forma de cruz verde.

<details><summary>English</summary>

**What is it?** A wooden cross painted green that presides over the altar.

**Why is it on a Yucatecan altar?** It represents the sacred ceiba, the Maya tree of life that joins the sky, the earth and the underworld. It is also the Christian cross: both symbols live together on the altar.

**A bit of history.** For the Maya the ceiba stood at the center of the world, with one tree in each of the four directions. In colonial times Maya and Catholic beliefs blended, and the ceiba took the form of a green cross.

</details>

Fuentes: [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [Yucatán Travel (Sefotur) – Janal Pixán](https://yucatan.travel/cultura/janal-pixan/) · [Posta – ¿Cómo debe ser un altar tradicional yucateco?](https://www.posta.com.mx/mexico/como-debe-ser-un-altar-tradicional-yucateco-de-dia-de-muertos/vl1621997)

### 9. Rosario de filigrana

| Español | Maya | Inglés |
|---|---|---|
| Rosario de filigrana | *sin nombre maya tradicional* | Gold filigree rosary |

*Nota sobre el maya:* No tiene un nombre maya tradicional: es una pieza de origen colonial.

**¿Qué es?** Rosario largo de oro (o plata) trabajado en filigrana: hilos finísimos de metal doblados a mano, con una cruz al final.

**¿Por qué está en el altar yucateco?** Representa la fe y la oración por los difuntos: durante el Hanal Pixán se rezan rosarios por las ánimas. También recuerda a las mestizas que lo lucían con el terno.

**Un poco de historia.** La filigrana llegó con artesanos españoles. En el siglo XIX el rosario de filigrana, tan largo que llega casi a la cintura, se volvió la joya principal del terno yucateco. Para muchas familias ha sido además una forma de ahorro.

<details><summary>English</summary>

**What is it?** A long gold (or silver) rosary made in filigree, with very fine threads of metal bent by hand and a cross at the end.

**Why is it on a Yucatecan altar?** It represents faith and prayer for the dead: rosaries are prayed for the souls during Hanal Pixán. It also recalls the mestiza women who wore it with the terno.

**A bit of history.** Filigree arrived with Spanish artisans. In the 19th century the filigree rosary, long enough to reach almost to the waist, became the main jewel of the Yucatecan terno. For many families it has also been a way of saving.

</details>

Fuentes: [Yucatán Today – Yucatecan filigree](https://yucatantoday.com/en/blog/yucatecan-filigree/) · [Posta – ¿Cómo debe ser un altar tradicional yucateco?](https://www.posta.com.mx/mexico/como-debe-ser-un-altar-tradicional-yucateco-de-dia-de-muertos/vl1621997) · [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [El traje regional de Yucatán](https://patadehuech.wordpress.com/2015/09/23/el-traje-regional-de-yucatn/)


## Personales / Personal

### 11. Fotografía del difunto

| Español | Maya | Inglés |
|---|---|---|
| Fotografía del difunto | *sin nombre maya tradicional* | Photograph of the departed |

*Nota sobre el maya:* Sin término tradicional verificado.

**¿Qué es?** Retrato de la persona a quien se dedica el altar, en el nivel más alto.

**¿Por qué está en el altar yucateco?** Indica a quién está dedicada la ofrenda y muestra que se le recuerda y se reza por él o ella.

**Un poco de historia.** Es una costumbre más reciente que el resto del altar: llegó cuando la fotografía se volvió común en las familias, ya en el siglo XX. Antes, la memoria se guardaba en los rezos y en los nombres.

<details><summary>English</summary>

**What is it?** A portrait of the person the altar is dedicated to, placed on the highest level.

**Why is it on a Yucatecan altar?** It shows who the offering is for, and that the person is remembered and prayed for.

**A bit of history.** It is a newer custom than the rest of the altar. It arrived when photographs became common in families, in the 20th century. Before that, memory was kept through prayers and names.

</details>

Fuentes: [Diario de Yucatán – Altar de Hanal Pixán: qué elementos lleva (2024)](https://www.yucatan.com.mx/yucatan/2024/10/24/altar-de-hanal-pixan-en-yucatan-que-elementos-lleva-y-su-significado.html) · [Diario de Yucatán – Altar de muertos: lo que debe llevar (2021)](https://www.yucatan.com.mx/imagen/2021/11/01/altar-muertos-lo-llevar-significado.html) · [Posta – ¿Cómo debe ser un altar tradicional yucateco?](https://www.posta.com.mx/mexico/como-debe-ser-un-altar-tradicional-yucateco-de-dia-de-muertos/vl1621997)

### 12. Objetos favoritos del difunto

| Español | Maya | Inglés |
|---|---|---|
| Objetos favoritos del difunto | *sin nombre maya tradicional* | The departed's favorite belongings |

*Nota sobre el maya:* Sin término tradicional verificado.

**¿Qué es?** Cosas que la persona apreciaba en vida: joyas, ropa, su sombrero, un juguete en el caso de los niños.

**¿Por qué está en el altar yucateco?** Ayudan a recordar a la persona tal como era y le hacen sentir que su casa la sigue esperando.

**Un poco de historia.** En los altares de niños es tradicional poner juguetes; en los de adultos, los objetos que usaban o querían.

<details><summary>English</summary>

**What is it?** Things the person treasured in life: jewelry, clothes, a hat, or a toy for children.

**Why is it on a Yucatecan altar?** They help remember the person as they were, and let them feel their home is still waiting for them.

**A bit of history.** Children's altars traditionally hold toys; adults' altars hold the things they used or loved.

</details>

Fuentes: [Diario de Yucatán – Altar de Hanal Pixán: qué elementos lleva (2024)](https://www.yucatan.com.mx/yucatan/2024/10/24/altar-de-hanal-pixan-en-yucatan-que-elementos-lleva-y-su-significado.html) · [Diario de Yucatán – Altar de muertos: lo que debe llevar (2021)](https://www.yucatan.com.mx/imagen/2021/11/01/altar-muertos-lo-llevar-significado.html) · [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html)


## Luz, aroma y camino / Light, scent and path

### 14. Velas blancas grandes

| Español | Maya | Inglés |
|---|---|---|
| Velas blancas grandes | **Kib** (nombre tradicional) | Large white candles |

*Nota sobre el maya:* Kib = vela.

**¿Qué es?** Velas grandes de cera, de preferencia blancas, encendidas en el altar.

**¿Por qué está en el altar yucateco?** Su luz guía a las ánimas en su camino de regreso a casa. Las velas grandes y blancas son para los adultos; las de colores, para los niños.

**Un poco de historia.** En la Colonia, los españoles exigieron cera como tributo a los pueblos mayas, porque las velas eran indispensables en las ceremonias católicas. En algunas comunidades también se ponen velas sobre las albarradas para alumbrar el camino.

<details><summary>English</summary>

**What is it?** Large wax candles, preferably white, lit on the altar.

**Why is it on a Yucatecan altar?** Their light guides the souls on their way home. Large white candles are for adults; colored ones are for children.

**A bit of history.** In colonial times, the Spanish demanded wax as tribute from Maya towns, because candles were essential to Catholic ceremonies. In some communities, candles are also placed on the stone walls (albarradas) to light the way.

</details>

Fuentes: [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [Dedrick, Batún y McAnany (2017) – Beeswax production in colonial Yucatán](https://core.tdar.org/document/430776/imperfect-beeswax-production-in-the-land-of-honeyyucatan-mexico) · [Gobierno de Yucatán – Janal Pixan](https://www.yucatan.gob.mx/?p=janal_pixan)

### 15. Incienso (copal)

| Español | Maya | Inglés |
|---|---|---|
| Incienso (copal) | **Pom** (nombre tradicional) | Incense (copal) |

*Nota sobre el maya:* Pom (también escrito poom) = copal, incienso.

**¿Qué es?** Resina aromática que se quema; la tradicional es el copal, que sale del árbol del mismo nombre.

**¿Por qué está en el altar yucateco?** Su humo y su aroma llevan el olor de la comida hasta las ánimas y las invitan a venir. También purifica el lugar.

**Un poco de historia.** El copal es una de las ofrendas más antiguas de Mesoamérica: los mayas lo quemaban para sus dioses mucho antes de la llegada de los españoles, y se sigue usando en las ceremonias de los pueblos.

<details><summary>English</summary>

**What is it?** An aromatic resin that is burned; the traditional one is copal, from the copal tree.

**Why is it on a Yucatecan altar?** Its smoke and scent carry the smell of the food to the souls and invite them to come. It also purifies the space.

**A bit of history.** Copal is one of the oldest offerings in Mesoamerica: the Maya burned it for their gods long before the Spanish arrived, and it is still used in village ceremonies.

</details>

Fuentes: [UADY – Diccionario maya-español (Identidad y Cultura Maya)](https://www.mayas.uady.mx/diccionario/a_maya.html) · [Landuum – Plantas y flores del Hanal Pixán](https://www.landuum.com/en/plantae-and-fauna/celebration-of-the-souls-plants-and-flowers/) · [Diario de Yucatán – Altar de Hanal Pixán: qué elementos lleva (2024)](https://www.yucatan.com.mx/yucatan/2024/10/24/altar-de-hanal-pixan-en-yucatan-que-elementos-lleva-y-su-significado.html) · [El Momento Yucatán – El altar del Janal Pixán y su significado](https://elmomentoyucatan.mx/el-altar-de-muertos-en-el-hanal-pixan-lo-que-debe-llevar-el-altar-y-su-significado/)

### 16. Incensario

| Español | Maya | Inglés |
|---|---|---|
| Incensario | *sin nombre maya tradicional* | Incense burner (censer) |

*Nota sobre el maya:* Sin término propio verificado; se relaciona con pom (copal).

**¿Qué es?** Recipiente, casi siempre de barro, donde se quema el incienso sobre brasas.

**¿Por qué está en el altar yucateco?** Es el lugar donde el copal se convierte en humo. Al encenderlo se invita a las ánimas a llegar a la ofrenda.

**Un poco de historia.** Los mayas fabricaban incensarios de barro desde hace siglos; en ciudades como Mayapán se hicieron incensarios con figuras de dioses. Hoy se usan de barro sencillo o de metal.

<details><summary>English</summary>

**What is it?** A container, usually made of clay, where incense is burned over hot coals.

**Why is it on a Yucatecan altar?** It is where copal turns into smoke. Lighting it invites the souls to come to the offering.

**A bit of history.** The Maya have made clay censers for centuries; cities such as Mayapán produced censers shaped like gods. Today simple clay or metal censers are used.

</details>

Fuentes: [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [Diario de Yucatán – Altar de muertos: lo que debe llevar (2021)](https://www.yucatan.com.mx/imagen/2021/11/01/altar-muertos-lo-llevar-significado.html)

### 17. Flores (xpujuk, xtés y virginias)

| Español | Maya | Inglés |
|---|---|---|
| Flores (xpujuk, xtés y virginias) | **Lool** (nombre tradicional) | Flowers (xpujuk, xtés and virginias) |

*Nota sobre el maya:* Lool = flor. Xpujuk es la flor amarilla silvestre del Hanal Pixán; xtés es la cresta de gallo.

**¿Qué es?** Flores de la región: xpujuk (amarilla, Tagetes patula), xtés (roja, cresta de gallo) y virginias moradas.

**¿Por qué está en el altar yucateco?** Con su color y su aroma alegran la visita de las ánimas y adornan la mesa.

**Un poco de historia.** El cempasúchil grande (Tagetes erecta) es tradición del centro de México y llegó a los altares yucatecos hace poco. La flor propia de la península es el xpujuk, su pariente silvestre y más pequeño.

<details><summary>English</summary>

**What is it?** Local flowers: xpujuk (yellow, Tagetes patula), xtés (red cockscomb) and purple virginias.

**Why is it on a Yucatecan altar?** Their color and scent brighten the souls' visit and decorate the table.

**A bit of history.** The large marigold (cempasúchil, Tagetes erecta) is a central Mexican tradition that reached Yucatecan altars only recently. The peninsula's own flower is xpujuk, its smaller wild relative.

</details>

Fuentes: [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [Por Esto! – Guía del Hanal Pixán (2025)](https://www.poresto.com/yucatan/2025/10/8/guia-del-hanal-pixan-cuando-se-celebra-como-se-arma-el-altar-y-que-comidas-tradicionales-se-preparan-en-yucatan.html) · [Landuum – Plantas y flores del Hanal Pixán](https://www.landuum.com/en/plantae-and-fauna/celebration-of-the-souls-plants-and-flowers/) · [CICY, Desde el Herbario – Cempasúchil (2012)](https://cicy.repositorioinstitucional.mx/jspui/bitstream/1003/2226/1/2012-11-01-Ramirez-Tapia-Cempazuchil.pdf)

### 18. Cal a los lados del camino

| Español | Maya | Inglés |
|---|---|---|
| Cal a los lados del camino | **Ta'an** (nombre tradicional) | Lime powder lining the path |

*Nota sobre el maya:* Ta'an = cal o ceniza (la misma palabra para ambas).

**¿Qué es?** Líneas de cal blanca a los lados del camino que va de la entrada hasta el altar.

**¿Por qué está en el altar yucateco?** Marcan el camino para que las ánimas lleguen a la ofrenda sin perderse. En Yucatán el camino se marca con velas, ceniza o flores; en maya la cal y la ceniza se dicen igual: ta'an.

**Un poco de historia.** La cal está en el centro de la vida maya: con ella se cuece el maíz (nixtamal), se curan las jícaras y se blanquean las casas.

<details><summary>English</summary>

**What is it?** Lines of white lime along both sides of the path from the entrance to the altar.

**Why is it on a Yucatecan altar?** They mark the way so the souls reach the offering without getting lost. In Yucatán the path is marked with candles, ash or flowers; in Maya, lime and ash share one word: ta'an.

**A bit of history.** Lime is central to Maya life: it is used to cook maize (nixtamal), to cure jícaras and to whitewash houses.

</details>

Fuentes: [Diario de Yucatán – Altar de Hanal Pixán: qué elementos lleva (2024)](https://www.yucatan.com.mx/yucatan/2024/10/24/altar-de-hanal-pixan-en-yucatan-que-elementos-lleva-y-su-significado.html) · [UADY – Diccionario maya-español (Identidad y Cultura Maya)](https://www.mayas.uady.mx/diccionario/a_maya.html) · [Yucatán Today – The simple and humble jícara](https://yucatantoday.com/en/blog/simple-and-humble-jicara-what-is-it)


## Agua, sal y limpieza / Water, salt and cleansing

### 23. Jícaras sobre base de bejuco

| Español | Maya | Inglés |
|---|---|---|
| Jícaras sobre base de bejuco | **Luuch** (nombre tradicional) | Gourd bowls on vine rings |

*Nota sobre el maya:* Luuch = jícara. Aak' = bejuco.

**¿Qué es?** Jícaras con agua, sal y bebidas, apoyadas en aros tejidos de bejuco para que no se volteen.

**¿Por qué está en el altar yucateco?** El agua calma la sed de las ánimas tras su largo viaje y la sal purifica. En el altar antiguo se ponían cuatro jícaras en las esquinas y una al centro: los cuatro rumbos del mundo y su centro.

**Un poco de historia.** La jícara es el fruto del árbol de jícaro. Se parte a la mitad, se le saca la pulpa, se hierve con cal, se limpia con hojas de ciricote y se seca al sol. Es el vaso tradicional maya.

<details><summary>English</summary>

**What is it?** Gourd bowls with water, salt and drinks, resting on woven vine rings so they don't tip over.

**Why is it on a Yucatecan altar?** Water quenches the souls' thirst after their long journey, and salt purifies. On the old altar, four jícaras were set at the corners and one in the center, standing for the four directions of the world and its center.

**A bit of history.** The jícara is the fruit of the calabash tree. It is cut in half, the pulp removed, boiled with lime, cleaned with ciricote leaves and dried in the sun. It is the traditional Maya cup.

</details>

Fuentes: [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [UADY – Diccionario maya-español (Identidad y Cultura Maya)](https://www.mayas.uady.mx/diccionario/a_maya.html) · [Yucatán Today – The simple and humble jícara](https://yucatantoday.com/en/blog/simple-and-humble-jicara-what-is-it) · [Yucatán Travel (Sefotur) – Janal Pixán](https://yucatan.travel/cultura/janal-pixan/)


## Comida / Food

### 29. Pib (mukbil pollo)

| Español | Maya | Inglés |
|---|---|---|
| Pib (mukbil pollo) | **Mukbil pollo** (nombre tradicional) | Pib (mukbil pollo, pit-baked tamale) |

*Nota sobre el maya:* Muuk = enterrar; píib = horno bajo tierra. Mukbil pollo: «pollo enterrado».

**¿Qué es?** Tamal grande de masa de maíz con manteca, relleno de pollo y cerdo en k'óol (caldo espeso con achiote), envuelto en hojas de plátano y cocido bajo tierra.

**¿Por qué está en el altar yucateco?** Es el platillo central del Hanal Pixán. Se prepara en familia y primero se ofrece a las ánimas; después de que «toman la gracia», los vivos lo comparten.

**Un poco de historia.** La técnica del horno bajo tierra es maya: se cava un hoyo, se calientan piedras con leña, se entierra la comida y se cuece entre hora y media y dos horas. El pollo y el cerdo llegaron con los españoles. Se dice que quien tiene las manos frías no debe ayudar, porque los pibes no se cuecen.

<details><summary>English</summary>

**What is it?** A large corn-dough tamale with lard, filled with chicken and pork in k'óol (a thick achiote broth), wrapped in banana leaves and cooked underground.

**Why is it on a Yucatecan altar?** It is the centerpiece of Hanal Pixán. Families prepare it together and offer it to the souls first; once the souls have "taken the grace", the living share it.

**A bit of history.** The underground oven is a Maya technique: a pit is dug, stones are heated with firewood, the food is buried and cooks for about two hours. Chicken and pork arrived with the Spanish. It is said that people with cold hands shouldn't help, or the pibes won't cook.

</details>

Fuentes: [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [UADY – Diccionario maya-español (Identidad y Cultura Maya)](https://www.mayas.uady.mx/diccionario/a_maya.html) · [Diario de Yucatán – Del pib al balché: los sabores del Hanal Pixán (2025)](https://www.yucatan.com.mx/yucatan/2025/10/22/hanal-pixan-en-yucatan-platillos-bebidas-dulces-tipicos.html) · [Gobierno de Yucatán – Janal Pixan](https://www.yucatan.gob.mx/?p=janal_pixan)

### 30. Tamales

| Español | Maya | Inglés |
|---|---|---|
| Tamales | **Chachak waaj** (nombre tradicional) | Tamales |

*Nota sobre el maya:* Chachak waaj = «tortilla roja», el tamal colorado. Waaj = tortilla o pan.

**¿Qué es?** Masa de maíz con relleno, envuelta en hoja: colorados (chachak waaj), vaporcitos y tamales de x'pelón (frijol tierno).

**¿Por qué está en el altar yucateco?** Son comida de fiesta y forman parte de los desayunos y comidas que se ofrecen a las ánimas, sobre todo en el altar de los niños.

**Un poco de historia.** El tamal es uno de los alimentos más antiguos de Mesoamérica, hecho con maíz nixtamalizado. En Yucatán se envuelve en hoja de plátano y se condimenta con achiote.

<details><summary>English</summary>

**What is it?** Filled corn dough wrapped in leaves: red tamales (chachak waaj), vaporcitos and x'pelón (fresh bean) tamales.

**Why is it on a Yucatecan altar?** They are festive food and part of the breakfasts and meals offered to the souls, especially on the children's altar.

**A bit of history.** The tamale is one of Mesoamerica's oldest foods, made with nixtamalized maize. In Yucatán it is wrapped in banana leaf and seasoned with achiote.

</details>

Fuentes: [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [Gobierno de Yucatán – Janal Pixan](https://www.yucatan.gob.mx/?p=janal_pixan) · [Diario de Yucatán – Del pib al balché: los sabores del Hanal Pixán (2025)](https://www.yucatan.com.mx/yucatan/2025/10/22/hanal-pixan-en-yucatan-platillos-bebidas-dulces-tipicos.html) · [Diario de Yucatán – Altar de Hanal Pixán: qué elementos lleva (2024)](https://www.yucatan.com.mx/yucatan/2024/10/24/altar-de-hanal-pixan-en-yucatan-que-elementos-lleva-y-su-significado.html)

### 31. Relleno negro

| Español | Maya | Inglés |
|---|---|---|
| Relleno negro | **But'** (palabra relacionada) | Relleno negro (black turkey stew) |

*Nota sobre el maya:* But' = picadillo para rellenar. El platillo se conoce por su nombre en español.

**¿Qué es?** Guiso de pavo con albóndigas de carne (but') y huevo cocido, en una salsa negra hecha con chiles quemados (recado negro o chilmole).

**¿Por qué está en el altar yucateco?** Es uno de los guisos de caldo propios de estos días y se ofrece a los adultos, sobre todo si era su platillo favorito.

**Un poco de historia.** Mezcla ingredientes mayas, como el pavo y los chiles, con otros que llegaron de Europa, como el cerdo y algunas especias. Tradicionalmente se prepara en noviembre, durante el Hanal Pixán.

<details><summary>English</summary>

**What is it?** A turkey stew with meatballs (but') and boiled egg, in a black sauce made with charred chiles (recado negro or chilmole).

**Why is it on a Yucatecan altar?** It is one of the broth dishes typical of these days and is offered to the adults, especially if it was their favorite.

**A bit of history.** It combines Maya ingredients such as turkey and chiles with ones brought from Europe, such as pork and some spices. It is traditionally made in November, during Hanal Pixán.

</details>

Fuentes: [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [Wikipedia – Relleno negro](https://en.wikipedia.org/wiki/Relleno_negro) · [Diario de Yucatán – Altar de Hanal Pixán: qué elementos lleva (2024)](https://www.yucatan.com.mx/yucatan/2024/10/24/altar-de-hanal-pixan-en-yucatan-que-elementos-lleva-y-su-significado.html) · [UADY – Voces mayas en el español de Yucatán](https://www.mayas.uady.mx/articulos/voces.html)

### 32. Frijol con puerco

| Español | Maya | Inglés |
|---|---|---|
| Frijol con puerco | **Bu'ul yéetel k'éek'en** (traducción descriptiva) | Beans with pork |

*Nota sobre el maya:* Traducción literal: bu'ul = frijol, yéetel = con, k'éek'en = cerdo.

**¿Qué es?** Frijol negro cocido con carne de cerdo y epazote; se acompaña de arroz, rábano, cilantro, cebolla, limón y chiltomate.

**¿Por qué está en el altar yucateco?** Se pone porque las ánimas vuelven a probar lo que comían en casa: el altar lleva los platillos favoritos de cada difunto.

**Un poco de historia.** El frijol es maya; el cerdo llegó con los españoles. La costumbre de comerlo los lunes se explica porque los cerdos se mataban el sábado y la carne salada se cocinaba con frijol al empezar la semana.

<details><summary>English</summary>

**What is it?** Black beans cooked with pork and epazote, served with rice, radish, cilantro, onion, lime and tomato-chile sauce.

**Why is it on a Yucatecan altar?** It is offered because the souls come back to taste what they ate at home: the altar carries each person's favorite dishes.

**A bit of history.** Beans are Maya; pork came with the Spanish. Eating it on Mondays is explained by pigs being slaughtered on Saturdays, so the salted meat was cooked with beans at the start of the week.

</details>

Fuentes: [Diario de Yucatán – ¿Por qué los lunes se come frijol con puerco? (2024)](https://www.yucatan.com.mx/yucatan/2024/02/05/por-que-los-lunes-se-come-frijol-con-puerco-en-yucatan.html) · [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [UADY – Diccionario maya-español (Identidad y Cultura Maya)](https://www.mayas.uady.mx/diccionario/a_maya.html)

### 33. Escabeche

| Español | Maya | Inglés |
|---|---|---|
| Escabeche | *sin nombre maya tradicional* | Escabeche (pickled chicken or turkey) |

*Nota sobre el maya:* Platillo de origen español, sin nombre maya.

**¿Qué es?** Pollo o pavo cocido en caldo con especias y naranja agria, servido con cebolla morada encurtida y chile xcatic. El más famoso es el escabeche oriental de Valladolid.

**¿Por qué está en el altar yucateco?** Es otro de los guisos de caldo de la temporada que se ponen en el altar de los adultos.

**Un poco de historia.** La palabra viene del árabe sikbâg, un guiso con vinagre. Llegó a Yucatán desde España en la Colonia y se mezcló con la naranja agria y los chiles de la región.

<details><summary>English</summary>

**What is it?** Chicken or turkey cooked in a spiced broth with sour orange, served with pickled red onion and xcatic chile. The best known is the eastern (Valladolid) style.

**Why is it on a Yucatecan altar?** It is another of the season's broth dishes placed on the adults' altar.

**A bit of history.** The word comes from the Arabic sikbâg, a vinegar stew. It came to Yucatán from Spain in colonial times and blended with local sour orange and chiles.

</details>

Fuentes: [Posta – ¿Por qué el jueves es día de escabeche en Yucatán?](https://www.posta.com.mx/yucatan/por-que-el-jueves-es-dia-de-escabeche-en-yucatan/vl2203099) · [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [Diario de Yucatán – Altar de Hanal Pixán: qué elementos lleva (2024)](https://www.yucatan.com.mx/yucatan/2024/10/24/altar-de-hanal-pixan-en-yucatan-que-elementos-lleva-y-su-significado.html)

### 34. Pan (de elote, hojaldra, concha y escotafí)

| Español | Maya | Inglés |
|---|---|---|
| Pan (de elote, hojaldra, concha y escotafí) | **Waaj** (nombre tradicional) | Bread (corn bread, hojaldra, concha and escotafí) |

*Nota sobre el maya:* Waaj = tortilla de maíz o pan en general. Nal = elote.

**¿Qué es?** Panes dulces de panadería yucateca (concha, hojaldra, escotafí) y pan de elote hecho con maíz tierno.

**¿Por qué está en el altar yucateco?** El pan dulce acompaña el chocolate y el atole del desayuno de las ánimas, sobre todo el de los niños.

**Un poco de historia.** El trigo llegó con los españoles; frailes franciscanos y monjas enseñaron a hornear. El pan de muerto del centro de México no es tradicional en el Hanal Pixán: en Yucatán se ponía el pan de finados, con aroma de anís.

<details><summary>English</summary>

**What is it?** Sweet breads from Yucatecan bakeries (concha, hojaldra, escotafí) and corn bread made with fresh maize.

**Why is it on a Yucatecan altar?** Sweet bread goes with the chocolate and atole served for the souls' breakfast, especially the children's.

**A bit of history.** Wheat came with the Spanish; Franciscan friars and nuns taught baking. The pan de muerto of central Mexico is not traditional in Hanal Pixán; Yucatán had its own anise-scented pan de finados.

</details>

Fuentes: [Posta – El pan de finados que se ofrenda en el Janal Pixán](https://www.posta.com.mx/yucatan/conoces-el-pan-de-finados-el-pan-yucateco-que-se-ofrenda-en-el-janal-pixan/vl2110288) · [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [Por Esto! – Guía del Hanal Pixán (2025)](https://www.poresto.com/yucatan/2025/10/8/guia-del-hanal-pixan-cuando-se-celebra-como-se-arma-el-altar-y-que-comidas-tradicionales-se-preparan-en-yucatan.html) · [UADY – Diccionario maya-español (Identidad y Cultura Maya)](https://www.mayas.uady.mx/diccionario/a_maya.html)

### 35. China (naranja dulce)

| Español | Maya | Inglés |
|---|---|---|
| China (naranja dulce) | **Ch'u'ujuk pak'áal** (traducción descriptiva) | China (sweet orange) |

*Nota sobre el maya:* Pak'áal = naranja agria; ch'u'ujuk = dulce.

**¿Qué es?** Naranja dulce, que en Yucatán se llama «china».

**¿Por qué está en el altar yucateco?** Es fruta de temporada y forma parte del xe'ek, la mezcla de cítricos y jícama con chile que se ofrece a las ánimas.

**Un poco de historia.** La naranja dulce viene de Asia. Llegó a la Nueva España en el Galeón de Manila (1565–1815) en cajas marcadas «China», y por eso los yucatecos la llamaron así.

<details><summary>English</summary>

**What is it?** Sweet orange, which Yucatecans call "china".

**Why is it on a Yucatecan altar?** It is in season and is part of xe'ek, the mix of citrus and jícama with chile offered to the souls.

**A bit of history.** The sweet orange comes from Asia. It reached New Spain on the Manila Galleon (1565–1815) in crates marked "China", which is why Yucatecans named it that.

</details>

Fuentes: [Diario de Yucatán – ¿Por qué en Yucatán le dicen china a la naranja? (2025)](https://www.yucatan.com.mx/merida/2025/02/19/por-que-en-yucatan-le-dicen-china-a-la-naranja.html) · [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [Gobierno de Yucatán – Janal Pixan](https://www.yucatan.gob.mx/?p=janal_pixan) · [UADY – Diccionario maya-español (Identidad y Cultura Maya)](https://www.mayas.uady.mx/diccionario/a_maya.html)

### 36. Mandarina

| Español | Maya | Inglés |
|---|---|---|
| Mandarina | *sin nombre maya tradicional* | Mandarin orange |

*Nota sobre el maya:* Fruta llegada de Asia; sin nombre maya tradicional.

**¿Qué es?** Cítrico pequeño y dulce, de cáscara fácil de pelar.

**¿Por qué está en el altar yucateco?** Madura justo en estos días, por eso es de las frutas que nunca faltan en el altar y en el xe'ek.

**Un poco de historia.** Como la naranja, es originaria de Asia y llegó a México después de la Conquista; hoy es una de las frutas típicas de esta temporada en Yucatán.

<details><summary>English</summary>

**What is it?** A small, sweet citrus fruit with easy-to-peel skin.

**Why is it on a Yucatecan altar?** It ripens right at this time of year, so it is one of the fruits always found on the altar and in xe'ek.

**A bit of history.** Like the orange, it is native to Asia and reached Mexico after the Conquest; today it is one of the typical fruits of this season in Yucatán.

</details>

Fuentes: [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [Gobierno de Yucatán – Janal Pixan](https://www.yucatan.gob.mx/?p=janal_pixan) · [Diario de Yucatán – Del pib al balché: los sabores del Hanal Pixán (2025)](https://www.yucatan.com.mx/yucatan/2025/10/22/hanal-pixan-en-yucatan-platillos-bebidas-dulces-tipicos.html)

### 37. Plátano manzano

| Español | Maya | Inglés |
|---|---|---|
| Plátano manzano | **Ja'as** (nombre tradicional) | Apple banana |

*Nota sobre el maya:* Ja'as = plátano.

**¿Qué es?** Variedad de plátano pequeño, de sabor dulce y un poco ácido, parecido a la manzana.

**¿Por qué está en el altar yucateco?** Es una de las frutas de temporada que se ofrecen a las ánimas.

**Un poco de historia.** El plátano llegó a América con los europeos en el siglo XVI y se adaptó tan bien al clima de la península que hoy es parte de la comida diaria.

<details><summary>English</summary>

**What is it?** A small banana variety with a sweet, slightly tart, apple-like flavor.

**Why is it on a Yucatecan altar?** It is one of the seasonal fruits offered to the souls.

**A bit of history.** The banana reached the Americas with Europeans in the 16th century and adapted so well to the peninsula's climate that it is now everyday food.

</details>

Fuentes: [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [UADY – Diccionario maya-español (Identidad y Cultura Maya)](https://www.mayas.uady.mx/diccionario/a_maya.html)

### 38. Yuca

| Español | Maya | Inglés |
|---|---|---|
| Yuca | **Ts'íin** (nombre tradicional) | Cassava (yuca) |

*Nota sobre el maya:* Ts'íin = yuca.

**¿Qué es?** Raíz feculenta que se ofrece cocida, muchas veces bañada en miel.

**¿Por qué está en el altar yucateco?** La yuca con miel es uno de los dulces tradicionales del Hanal Pixán y representa la dulzura de la vida.

**Un poco de historia.** Es un alimento más antiguo que el maíz en tierras mayas. En Joya de Cerén (El Salvador) se encontraron campos de yuca mayas de hace unos 1,400 años, sepultados por un volcán.

<details><summary>English</summary>

**What is it?** A starchy root offered cooked, often drizzled with honey.

**Why is it on a Yucatecan altar?** Cassava with honey is one of the traditional Hanal Pixán sweets and stands for the sweetness of life.

**A bit of history.** It is a food older than maize in Maya lands. At Joya de Cerén (El Salvador), Maya cassava fields about 1,400 years old were found buried by a volcano.

</details>

Fuentes: [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [Arqueología Mexicana – Yuca (Manihot esculenta)](https://arqueologiamexicana.mx/mexico-antiguo/yuca-manihot-esculenta) · [Campos de yuca mayas en Joya de Cerén (Payson Sheets, 2007)](https://www.elsalvadorperspectives.com/2007/08/ancient-fields-where-mayas-cultivated.html) · [Posta – ¿Cómo debe ser un altar tradicional yucateco?](https://www.posta.com.mx/mexico/como-debe-ser-un-altar-tradicional-yucateco-de-dia-de-muertos/vl1621997)

### 39. Dulce de calabaza

| Español | Maya | Inglés |
|---|---|---|
| Dulce de calabaza | **K'úum** (nombre tradicional) | Candied squash |

*Nota sobre el maya:* K'úum = calabaza.

**¿Qué es?** Calabaza cocida en agua con canela y endulzada con miel, azúcar o piloncillo; en Yucatán también se llama calabaza melada.

**¿Por qué está en el altar yucateco?** Es de los dulces que no faltan en el altar: recuerda a las ánimas los sabores que disfrutaban en vida.

**Un poco de historia.** La calabaza es uno de los cultivos de la milpa maya, junto con el maíz y el frijol. Con sus semillas (pepita) se hacen otros dulces y salsas.

<details><summary>English</summary>

**What is it?** Squash simmered with cinnamon and sweetened with honey, sugar or piloncillo; in Yucatán it is also called calabaza melada.

**Why is it on a Yucatecan altar?** It is one of the sweets always on the altar, reminding the souls of flavors they enjoyed in life.

**A bit of history.** Squash is one of the Maya milpa crops, along with maize and beans. Its seeds (pepita) are used for other sweets and sauces.

</details>

Fuentes: [Posta – Dulces yucatecos para el Janal Pixán](https://www.posta.com.mx/yucatan/dulces-yucatecos-para-el-janal-pixan-recetas-y-tradiciones-que-debes-conocer/vl2107366) · [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [UADY – Diccionario maya-español (Identidad y Cultura Maya)](https://www.mayas.uady.mx/diccionario/a_maya.html)

### 40. Jícama

| Español | Maya | Inglés |
|---|---|---|
| Jícama | **Chi'ikam** (nombre tradicional) | Jícama |

*Nota sobre el maya:* Chi'ikam = jícama.

**¿Qué es?** Raíz blanca, crujiente y jugosa que se come cruda.

**¿Por qué está en el altar yucateco?** Es fruta de la temporada y base del xe'ek (que en maya significa «revuelto»), la mezcla con naranja, mandarina, chile y cilantro.

**Un poco de historia.** Es una planta americana. Su nombre en español viene del náhuatl xicamatl, y en maya se dice chi'ikam.

<details><summary>English</summary>

**What is it?** A white, crunchy, juicy root eaten raw.

**Why is it on a Yucatecan altar?** It is in season and is the base of xe'ek (Maya for "mixed"), combined with orange, mandarin, chile and cilantro.

**A bit of history.** It is native to the Americas. Its Spanish name comes from the Nahuatl xicamatl, and in Maya it is chi'ikam.

</details>

Fuentes: [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [UADY – Diccionario maya-español (Identidad y Cultura Maya)](https://www.mayas.uady.mx/diccionario/a_maya.html) · [UADY – Voces mayas en el español de Yucatán](https://www.mayas.uady.mx/articulos/voces.html) · [Diario de Yucatán – Del pib al balché: los sabores del Hanal Pixán (2025)](https://www.yucatan.com.mx/yucatan/2025/10/22/hanal-pixan-en-yucatan-platillos-bebidas-dulces-tipicos.html)

### 41. Dulce de coco

| Español | Maya | Inglés |
|---|---|---|
| Dulce de coco | *sin nombre maya tradicional* | Coconut candy |

*Nota sobre el maya:* El coco no es planta nativa; sin nombre maya tradicional.

**¿Qué es?** Dulces de coco rallado cocido con azúcar: cocadas, cuadritos y labradas de coco.

**¿Por qué está en el altar yucateco?** Forman parte de la mesa de dulces, sobre todo en el altar de los niños.

**Un poco de historia.** El coco no es originario de la península, pero la palmera se volvió abundante en sus costas y la dulcería yucateca lo adoptó.

<details><summary>English</summary>

**What is it?** Sweets of grated coconut cooked with sugar: cocadas, little squares and labradas.

**Why is it on a Yucatecan altar?** They are part of the sweets table, especially on the children's altar.

**A bit of history.** Coconut is not native to the peninsula, but the palm became abundant along its coasts and Yucatecan candy makers adopted it.

</details>

Fuentes: [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [Diario de Yucatán – Del pib al balché: los sabores del Hanal Pixán (2025)](https://www.yucatan.com.mx/yucatan/2025/10/22/hanal-pixan-en-yucatan-platillos-bebidas-dulces-tipicos.html) · [Por Esto! – Guía del Hanal Pixán (2025)](https://www.poresto.com/yucatan/2025/10/8/guia-del-hanal-pixan-cuando-se-celebra-como-se-arma-el-altar-y-que-comidas-tradicionales-se-preparan-en-yucatan.html)

### 42. Dulce de cocoyol

| Español | Maya | Inglés |
|---|---|---|
| Dulce de cocoyol | **Tuk'** (nombre tradicional) | Cocoyol palm-fruit candy |

*Nota sobre el maya:* Tuk' = cocoyol (fruto de la palma); la palma es tuk' che'.

**¿Qué es?** Frutos de la palma de cocoyol cocidos en miel de piloncillo con canela.

**¿Por qué está en el altar yucateco?** Es un dulce tradicional de la temporada que se ofrece a las ánimas. Prepararlo es tan laborioso (pelar, lavar y cocer puede llevar más de cinco días) que es un regalo de mucho cariño.

**Un poco de historia.** El cocoyol es una palma nativa. La receta se atribuye al pueblo de Muna, en la región Puuc, y hoy es difícil de conseguir.

<details><summary>English</summary>

**What is it?** Cocoyol palm fruits cooked in piloncillo syrup with cinnamon.

**Why is it on a Yucatecan altar?** It is a traditional seasonal sweet offered to the souls. Making it is so laborious (peeling, washing and cooking can take more than five days) that it is a gift of great care.

**A bit of history.** Cocoyol is a native palm. The recipe is attributed to the town of Muna in the Puuc region, and it is hard to find today.

</details>

Fuentes: [Yucatán Travel – Dulce de cocoyol](https://yucatan.travel/en/flavor/244-cocoyol-sweet) · [Posta – Dulces yucatecos para el Janal Pixán](https://www.posta.com.mx/yucatan/dulces-yucatecos-para-el-janal-pixan-recetas-y-tradiciones-que-debes-conocer/vl2107366) · [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [UADY – Diccionario maya-español (Identidad y Cultura Maya)](https://www.mayas.uady.mx/diccionario/a_maya.html)

### 43. Miel

| Español | Maya | Inglés |
|---|---|---|
| Miel | **Kaab** (nombre tradicional) | Honey |

*Nota sobre el maya:* Kaab = miel, abeja (y también mundo). La abeja nativa es xunáan kaab, «señora abeja».

**¿Qué es?** Miel de abeja, de preferencia de la abeja nativa sin aguijón (Melipona beecheii).

**¿Por qué está en el altar yucateco?** Endulza la ofrenda: se pone sola o sobre la yuca. Es uno de los alimentos más apreciados de la tradición maya.

**Un poco de historia.** Los mayas crían a la xunáan kaab desde hace al menos 3,000 años. Su miel se usaba sobre todo como medicina y para preparar el balché, la bebida ceremonial.

<details><summary>English</summary>

**What is it?** Bee honey, ideally from the native stingless bee (Melipona beecheii).

**Why is it on a Yucatecan altar?** It sweetens the offering, on its own or over cassava. It is one of the most prized foods in Maya tradition.

**A bit of history.** The Maya have kept the xunáan kaab for at least 3,000 years. Its honey was used mainly as medicine and to make balché, the ceremonial drink.

</details>

Fuentes: [Mongabay – Mayas recuperan las abejas nativas (2020)](https://es.mongabay.com/2020/06/mexico-mayas-recuperan-las-abejas-nativas/) · [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [UADY – Diccionario maya-español (Identidad y Cultura Maya)](https://www.mayas.uady.mx/diccionario/a_maya.html) · [Landuum – Plantas y flores del Hanal Pixán](https://www.landuum.com/en/plantae-and-fauna/celebration-of-the-souls-plants-and-flowers/)


## Bebidas y otros / Drinks and more

### 57. Aguardiente

| Español | Maya | Inglés |
|---|---|---|
| Aguardiente | **Báalche'** (palabra relacionada) | Aguardiente (cane liquor) |

*Nota sobre el maya:* No hay un nombre maya para el aguardiente; báalche' es el licor ceremonial maya que ocupaba ese lugar.

**¿Qué es?** Licor fuerte de caña de azúcar.

**¿Por qué está en el altar yucateco?** Se ofrece en el altar de los adultos, junto con los cigarros, como un gusto que tenían en vida.

**Un poco de historia.** La caña de azúcar llegó con los españoles. Antes, la bebida ceremonial era el balché, hecho con la corteza del árbol balché y miel de melipona, que todavía se ofrece en algunos altares.

<details><summary>English</summary>

**What is it?** A strong liquor made from sugarcane.

**Why is it on a Yucatecan altar?** It is offered on the adults' altar, together with cigarettes, as a pleasure they enjoyed in life.

**A bit of history.** Sugarcane arrived with the Spanish. Before that, the ceremonial drink was balché, made from balché tree bark and stingless-bee honey, and some altars still offer it.

</details>

Fuentes: [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [Landuum – Plantas y flores del Hanal Pixán](https://www.landuum.com/en/plantae-and-fauna/celebration-of-the-souls-plants-and-flowers/) · [Diario de Yucatán – Del pib al balché: los sabores del Hanal Pixán (2025)](https://www.yucatan.com.mx/yucatan/2025/10/22/hanal-pixan-en-yucatan-platillos-bebidas-dulces-tipicos.html) · [UADY – Diccionario maya-español (Identidad y Cultura Maya)](https://www.mayas.uady.mx/diccionario/a_maya.html)

### 58. Chocolate

| Español | Maya | Inglés |
|---|---|---|
| Chocolate | **Chukwa'** (nombre tradicional) | Hot chocolate |

*Nota sobre el maya:* Chukwa' = chocolate. Táanchukwa' es el atole con cacao, pimienta y anís.

**¿Qué es?** Chocolate caliente servido en jícara, o táanchukwa', una bebida espesa de masa de maíz con cacao, pimienta y anís.

**¿Por qué está en el altar yucateco?** Es parte del desayuno de las ánimas, sobre todo de los niños el 31 de octubre, y se ofrece en jícaras también a los adultos.

**Un poco de historia.** El cacao era sagrado para los mayas, que incluso lo usaban como moneda. En una tumba de Río Azul (Guatemala), de hacia el año 400, se halló una vasija con restos de cacao y el glifo kakaw.

<details><summary>English</summary>

**What is it?** Hot chocolate served in a jícara, or táanchukwa', a thick drink of corn dough with cacao, pepper and anise.

**Why is it on a Yucatecan altar?** It is part of the souls' breakfast, especially the children's on October 31, and is also offered to adults in jícaras.

**A bit of history.** Cacao was sacred to the Maya, who even used it as currency. In a tomb at Río Azul (Guatemala), from around AD 400, a vessel was found with cacao residue and the glyph kakaw.

</details>

Fuentes: [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [Atlas Obscura – La vasija de cacao de Río Azul](https://www.atlasobscura.com/articles/mayan-chocolate) · [Diario de Yucatán – Del pib al balché: los sabores del Hanal Pixán (2025)](https://www.yucatan.com.mx/yucatan/2025/10/22/hanal-pixan-en-yucatan-platillos-bebidas-dulces-tipicos.html) · [UADY – Diccionario maya-español (Identidad y Cultura Maya)](https://www.mayas.uady.mx/diccionario/a_maya.html)

### 59. Atole nuevo

| Español | Maya | Inglés |
|---|---|---|
| Atole nuevo | **Sa'** (nombre tradicional) | New-corn atole |

*Nota sobre el maya:* Sa' = atole. Jo'oche' = ofrenda de primicia.

**¿Qué es?** Atole hecho con el maíz nuevo de la cosecha, servido en jícaras.

**¿Por qué está en el altar yucateco?** Es la primicia: se ofrece a las ánimas lo primero y mejor de la cosecha. En el altar antiguo se ponían jícaras de atole nuevo en las cuatro esquinas y una al centro.

**Un poco de historia.** El maíz es el centro de la vida maya; según el Popol Vuh, libro sagrado de los mayas k'iche', los primeros humanos verdaderos fueron hechos de maíz. El Hanal Pixán coincide con la cosecha, por eso el atole es «nuevo».

<details><summary>English</summary>

**What is it?** Atole made with the new maize from the harvest, served in jícaras.

**Why is it on a Yucatecan altar?** It is the first-fruits offering: the souls receive the first and best of the harvest. On the old altar, jícaras of new atole were set at the four corners and one in the center.

**A bit of history.** Maize is at the heart of Maya life; according to the Popol Vuh, the sacred book of the K'iche' Maya, the first true humans were made from maize. Hanal Pixán coincides with the harvest, which is why the atole is "new".

</details>

Fuentes: [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [UADY – Diccionario maya-español (Identidad y Cultura Maya)](https://www.mayas.uady.mx/diccionario/a_maya.html) · [Diario de Yucatán – Altar de Hanal Pixán: qué elementos lleva (2024)](https://www.yucatan.com.mx/yucatan/2024/10/24/altar-de-hanal-pixan-en-yucatan-que-elementos-lleva-y-su-significado.html)

### 60. Cigarros

| Español | Maya | Inglés |
|---|---|---|
| Cigarros | **Chamal** (nombre tradicional) | Cigarettes |

*Nota sobre el maya:* Chamal = cigarro; k'úuts = tabaco. El holoch es el cigarro liado en hoja de maíz.

**¿Qué es?** Cigarros o tabaco que fumaba el difunto.

**¿Por qué está en el altar yucateco?** Se ponen en el altar de los adultos, junto con el aguardiente, para que el ánima disfrute lo que le gustaba.

**Un poco de historia.** El tabaco es una planta americana y los mayas lo usaban en sus ceremonias desde antes de la llegada de los españoles. En los pueblos se fumaba el holoch, liado en hoja de maíz.

<details><summary>English</summary>

**What is it?** Cigarettes or tobacco the departed used to smoke.

**Why is it on a Yucatecan altar?** They go on the adults' altar, together with aguardiente, so the soul can enjoy what it liked.

**A bit of history.** Tobacco is native to the Americas, and the Maya used it in ceremonies before the Spanish arrived. In villages people smoked holoch, rolled in corn husk.

</details>

Fuentes: [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [UADY – Diccionario maya-español (Identidad y Cultura Maya)](https://www.mayas.uady.mx/diccionario/a_maya.html) · [UADY – Voces mayas en el español de Yucatán](https://www.mayas.uady.mx/articulos/voces.html) · [Por Esto! – Guía del Hanal Pixán (2025)](https://www.poresto.com/yucatan/2025/10/8/guia-del-hanal-pixan-cuando-se-celebra-como-se-arma-el-altar-y-que-comidas-tradicionales-se-preparan-en-yucatan.html)


## Recipientes / Vessels

### 66. Lek (calabazo para tortillas)

| Español | Maya | Inglés |
|---|---|---|
| Lek (calabazo para tortillas) | **Lek** (nombre tradicional) | Lek (gourd tortilla holder) |

*Nota sobre el maya:* Lek = calabazo seco que sirve para guardar las tortillas. (La jícara de beber se llama luuch.)

**¿Qué es?** Recipiente redondo hecho con un calabazo seco, con tapa, que mantiene calientes las tortillas.

**¿Por qué está en el altar yucateco?** Guarda las tortillas recién hechas para la comida de las ánimas, como en cualquier mesa maya.

**Un poco de historia.** Sale de una planta rastrera (Lagenaria). Junto con la jícara (luuch), es uno de los recipientes tradicionales de la cocina maya, biodegradables y hechos en casa.

<details><summary>English</summary>

**What is it?** A round container made from a dried gourd, with a lid, that keeps tortillas warm.

**Why is it on a Yucatecan altar?** It holds the fresh tortillas for the souls' meal, just as on any Maya table.

**A bit of history.** It comes from a trailing gourd plant (Lagenaria). Together with the jícara (luuch), it is one of the traditional, biodegradable, homemade vessels of the Maya kitchen.

</details>

Fuentes: [UADY – Voces mayas en el español de Yucatán](https://www.mayas.uady.mx/articulos/voces.html) · [UADY – Diccionario maya-español (Identidad y Cultura Maya)](https://www.mayas.uady.mx/diccionario/a_maya.html)

### 67. Platos pequeños de barro

| Español | Maya | Inglés |
|---|---|---|
| Platos pequeños de barro | **Lak** (nombre tradicional) | Small clay plates |

*Nota sobre el maya:* Lak = taza, plato o cazuela de barro.

**¿Qué es?** Platos y cazuelas pequeñas de barro donde se sirve la comida del altar.

**¿Por qué está en el altar yucateco?** La comida de las ánimas se sirve en loza sencilla y tradicional, como se hacía en las casas antes de la vajilla moderna.

**Un poco de historia.** La alfarería es una de las artes mayas más antiguas. En Yucatán, el pueblo de Ticul es famoso por su barro.

<details><summary>English</summary>

**What is it?** Small clay plates and pots in which the altar food is served.

**Why is it on a Yucatecan altar?** The souls' food is served on simple, traditional earthenware, as in homes before modern dishware.

**A bit of history.** Pottery is one of the oldest Maya crafts. In Yucatán, the town of Ticul is famous for its clay work.

</details>

Fuentes: [UADY – Diccionario maya-español (Identidad y Cultura Maya)](https://www.mayas.uady.mx/diccionario/a_maya.html) · [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html)


## Complementos rituales / Ritual complements

### 68. Tortear (tortillas hechas a mano)

| Español | Maya | Inglés |
|---|---|---|
| Tortear (tortillas hechas a mano) | **Waaj** (nombre tradicional) | Hand-made tortillas |

*Nota sobre el maya:* Waaj = tortilla de maíz.

**¿Qué es?** Tortillas de maíz palmeadas a mano («torteadas») y cocidas en el comal.

**¿Por qué está en el altar yucateco?** La tortilla acompaña toda la comida de las ánimas. En el altar maya antiguo se ponían siete montones de trece tortillas, en recuerdo de la cuenta del calendario sagrado.

**Un poco de historia.** La tortilla de maíz nixtamalizado es la base de la alimentación maya desde hace siglos; tortear a mano es un saber que se aprende en familia.

<details><summary>English</summary>

**What is it?** Corn tortillas patted out by hand and cooked on the comal.

**Why is it on a Yucatecan altar?** Tortillas accompany all of the souls' food. On the old Maya altar, seven stacks of thirteen tortillas were set out, recalling the count of the sacred calendar.

**A bit of history.** Tortillas of nixtamalized maize have been the base of Maya food for centuries; making them by hand is a skill learned in the family.

</details>

Fuentes: [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html) · [UADY – Diccionario maya-español (Identidad y Cultura Maya)](https://www.mayas.uady.mx/diccionario/a_maya.html)

### 69. Comal

| Español | Maya | Inglés |
|---|---|---|
| Comal | **Xamach** (nombre tradicional) | Comal (griddle) |

*Nota sobre el maya:* Xamach = comal.

**¿Qué es?** Disco plano de barro o de metal que se pone sobre el fogón para cocer las tortillas.

**¿Por qué está en el altar yucateco?** Representa la cocina de la casa, donde se prepara la comida que se ofrece a las ánimas.

**Un poco de historia.** Es un utensilio prehispánico: los comales de barro se usaban en toda Mesoamérica. La palabra «comal» viene del náhuatl comalli; en maya se dice xamach.

<details><summary>English</summary>

**What is it?** A flat clay or metal disk set over the fire to cook tortillas.

**Why is it on a Yucatecan altar?** It represents the home kitchen, where the food offered to the souls is prepared.

**A bit of history.** It is a pre-Hispanic utensil: clay comales were used throughout Mesoamerica. "Comal" comes from the Nahuatl comalli; in Maya it is xamach.

</details>

Fuentes: [UADY – Diccionario maya-español (Identidad y Cultura Maya)](https://www.mayas.uady.mx/diccionario/a_maya.html)

### 70. Filipina

| Español | Maya | Inglés |
|---|---|---|
| Filipina | **Nook'** (palabra relacionada) | Filipina (Yucatecan formal shirt) |

*Nota sobre el maya:* Nook' = ropa o vestido en general.

**¿Qué es?** Camisa blanca de lino o algodón, de manga larga y cuello alto y redondo, con botonadura de oro: la prenda de gala del hombre yucateco.

**¿Por qué está en el altar yucateco?** En el altar de los adultos se pone ropa y calzado para que el ánima regrese limpia a su morada.

**Un poco de historia.** Forma parte del traje regional masculino, junto con el pantalón blanco, las alpargatas y el sombrero de jipi, y se usa en jaranas y vaquerías.

<details><summary>English</summary>

**What is it?** A white linen or cotton shirt with long sleeves and a high round collar, with gold buttons: the Yucatecan man's formal garment.

**Why is it on a Yucatecan altar?** Clothing and shoes are placed on the adults' altar so the soul can return clean to its resting place.

**A bit of history.** It is part of the men's regional outfit, with white trousers, alpargatas and a jipi hat, worn at jaranas and vaquerías.

</details>

Fuentes: [Por Esto! – Guía del Hanal Pixán (2025)](https://www.poresto.com/yucatan/2025/10/8/guia-del-hanal-pixan-cuando-se-celebra-como-se-arma-el-altar-y-que-comidas-tradicionales-se-preparan-en-yucatan.html) · [Descubro – Vestimenta típica de Yucatán](https://descubro.mx/vestimenta-tipica-yucatan/) · [El traje regional de Yucatán](https://patadehuech.wordpress.com/2015/09/23/el-traje-regional-de-yucatn/)

### 71. Pantalón blanco

| Español | Maya | Inglés |
|---|---|---|
| Pantalón blanco | **Eex** (nombre tradicional) | White trousers |

*Nota sobre el maya:* Eex = pantalón, calzón.

**¿Qué es?** Pantalón blanco de dril, de corte recto, que completa el traje de gala con la filipina.

**¿Por qué está en el altar yucateco?** Como la filipina, es ropa limpia que se ofrece al ánima para su regreso.

**Un poco de historia.** El blanco es el color de la ropa de fiesta del campesino y del mestizo yucateco: fresca para el calor y símbolo de limpieza.

<details><summary>English</summary>

**What is it?** Straight-cut white drill-cotton trousers that complete the formal outfit with the filipina.

**Why is it on a Yucatecan altar?** Like the filipina, it is clean clothing offered to the soul for its return.

**A bit of history.** White is the festive color of Yucatecan farmers and mestizos: cool in the heat and a sign of cleanliness.

</details>

Fuentes: [Descubro – Vestimenta típica de Yucatán](https://descubro.mx/vestimenta-tipica-yucatan/) · [Por Esto! – Guía del Hanal Pixán (2025)](https://www.poresto.com/yucatan/2025/10/8/guia-del-hanal-pixan-cuando-se-celebra-como-se-arma-el-altar-y-que-comidas-tradicionales-se-preparan-en-yucatan.html) · [UADY – Diccionario maya-español (Identidad y Cultura Maya)](https://www.mayas.uady.mx/diccionario/a_maya.html)

### 72. Alpargatas

| Español | Maya | Inglés |
|---|---|---|
| Alpargatas | **Xanab** (nombre tradicional) | Alpargatas (leather sandals) |

*Nota sobre el maya:* Xanab = zapato, alpargata o cualquier calzado.

**¿Qué es?** Calzado blanco de piel de res (vaqueta) con tacón bajo y grueso, típico del traje regional.

**¿Por qué está en el altar yucateco?** Se pone calzado en el altar para que el ánima pueda emprender su camino de regreso.

**Un poco de historia.** Su nombre llegó con el español (viene del árabe hispánico). En Yucatán se llama así al calzado blanco de piel del traje regional, que se usa para bailar jarana.

<details><summary>English</summary>

**What is it?** White cowhide footwear with a low, thick heel, typical of the regional outfit.

**Why is it on a Yucatecan altar?** Footwear is placed on the altar so the soul can set out on its way back.

**A bit of history.** The name came with Spanish (from Hispanic Arabic). In Yucatán it refers to the white leather shoes of the regional outfit, worn to dance the jarana.

</details>

Fuentes: [Por Esto! – Guía del Hanal Pixán (2025)](https://www.poresto.com/yucatan/2025/10/8/guia-del-hanal-pixan-cuando-se-celebra-como-se-arma-el-altar-y-que-comidas-tradicionales-se-preparan-en-yucatan.html) · [Descubro – Vestimenta típica de Yucatán](https://descubro.mx/vestimenta-tipica-yucatan/) · [UADY – Diccionario maya-español (Identidad y Cultura Maya)](https://www.mayas.uady.mx/diccionario/a_maya.html)

## Todas las fuentes

- [UADY – Hanal Pixan: alimento de las ánimas](https://www.mayas.uady.mx/articulos/pixan.html)
- [UADY – Diccionario maya-español (Identidad y Cultura Maya)](https://www.mayas.uady.mx/diccionario/a_maya.html)
- [UADY – Voces mayas en el español de Yucatán](https://www.mayas.uady.mx/articulos/voces.html)
- [Gobierno de Yucatán – Janal Pixan](https://www.yucatan.gob.mx/?p=janal_pixan)
- [Yucatán Travel (Sefotur) – Janal Pixán](https://yucatan.travel/cultura/janal-pixan/)
- [Diario de Yucatán – Altar de Hanal Pixán: qué elementos lleva (2024)](https://www.yucatan.com.mx/yucatan/2024/10/24/altar-de-hanal-pixan-en-yucatan-que-elementos-lleva-y-su-significado.html)
- [Diario de Yucatán – Altar de muertos: lo que debe llevar (2021)](https://www.yucatan.com.mx/imagen/2021/11/01/altar-muertos-lo-llevar-significado.html)
- [Diario de Yucatán – Del pib al balché: los sabores del Hanal Pixán (2025)](https://www.yucatan.com.mx/yucatan/2025/10/22/hanal-pixan-en-yucatan-platillos-bebidas-dulces-tipicos.html)
- [Diario de Yucatán – ¿Por qué en Yucatán le dicen china a la naranja? (2025)](https://www.yucatan.com.mx/merida/2025/02/19/por-que-en-yucatan-le-dicen-china-a-la-naranja.html)
- [Diario de Yucatán – ¿Por qué los lunes se come frijol con puerco? (2024)](https://www.yucatan.com.mx/yucatan/2024/02/05/por-que-los-lunes-se-come-frijol-con-puerco-en-yucatan.html)
- [Por Esto! – Guía del Hanal Pixán (2025)](https://www.poresto.com/yucatan/2025/10/8/guia-del-hanal-pixan-cuando-se-celebra-como-se-arma-el-altar-y-que-comidas-tradicionales-se-preparan-en-yucatan.html)
- [Posta – ¿Cómo debe ser un altar tradicional yucateco?](https://www.posta.com.mx/mexico/como-debe-ser-un-altar-tradicional-yucateco-de-dia-de-muertos/vl1621997)
- [Posta – El pan de finados que se ofrenda en el Janal Pixán](https://www.posta.com.mx/yucatan/conoces-el-pan-de-finados-el-pan-yucateco-que-se-ofrenda-en-el-janal-pixan/vl2110288)
- [Posta – Dulces yucatecos para el Janal Pixán](https://www.posta.com.mx/yucatan/dulces-yucatecos-para-el-janal-pixan-recetas-y-tradiciones-que-debes-conocer/vl2107366)
- [Posta – ¿Por qué el jueves es día de escabeche en Yucatán?](https://www.posta.com.mx/yucatan/por-que-el-jueves-es-dia-de-escabeche-en-yucatan/vl2203099)
- [El Momento Yucatán – El altar del Janal Pixán y su significado](https://elmomentoyucatan.mx/el-altar-de-muertos-en-el-hanal-pixan-lo-que-debe-llevar-el-altar-y-su-significado/)
- [Yucatán Today – The simple and humble jícara](https://yucatantoday.com/en/blog/simple-and-humble-jicara-what-is-it)
- [Yucatán Today – Yucatecan filigree](https://yucatantoday.com/en/blog/yucatecan-filigree/)
- [Yucatán Travel – Dulce de cocoyol](https://yucatan.travel/en/flavor/244-cocoyol-sweet)
- [Landuum – Plantas y flores del Hanal Pixán](https://www.landuum.com/en/plantae-and-fauna/celebration-of-the-souls-plants-and-flowers/)
- [CICY, Desde el Herbario – Cempasúchil (2012)](https://cicy.repositorioinstitucional.mx/jspui/bitstream/1003/2226/1/2012-11-01-Ramirez-Tapia-Cempazuchil.pdf)
- [Mongabay – Mayas recuperan las abejas nativas (2020)](https://es.mongabay.com/2020/06/mexico-mayas-recuperan-las-abejas-nativas/)
- [Dedrick, Batún y McAnany (2017) – Beeswax production in colonial Yucatán](https://core.tdar.org/document/430776/imperfect-beeswax-production-in-the-land-of-honeyyucatan-mexico)
- [Atlas Obscura – La vasija de cacao de Río Azul](https://www.atlasobscura.com/articles/mayan-chocolate)
- [Arqueología Mexicana – Yuca (Manihot esculenta)](https://arqueologiamexicana.mx/mexico-antiguo/yuca-manihot-esculenta)
- [Campos de yuca mayas en Joya de Cerén (Payson Sheets, 2007)](https://www.elsalvadorperspectives.com/2007/08/ancient-fields-where-mayas-cultivated.html)
- [Descubro – Vestimenta típica de Yucatán](https://descubro.mx/vestimenta-tipica-yucatan/)
- [El traje regional de Yucatán](https://patadehuech.wordpress.com/2015/09/23/el-traje-regional-de-yucatn/)
- [Wikipedia – Relleno negro](https://en.wikipedia.org/wiki/Relleno_negro)
