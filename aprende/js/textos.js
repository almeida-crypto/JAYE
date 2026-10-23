/*
 * Aprende — textos de la interfaz y contenido general (es / en).
 *
 * Reglas:
 *  - Todo lo visible tiene versión es y en.
 *  - Los textos de contenido general (subtitulo, textoB, textoC, fechas, enRevision)
 *    salen de la tarea del proyecto (ya redactados con sus fuentes); los demás son
 *    etiquetas de interfaz.
 *  - Las marcas <em lang="yua">, <i> y <strong> son INTENCIONALES: esas cadenas se
 *    insertan con innerHTML (son nuestras, no vienen de datos externas). El resto de
 *    cadenas es texto plano y también puede insertarse con innerHTML.
 *  - Nada de datos inventados: lo que no esté aquí ni en data/elementos.json se omite.
 */
var TEXTOS = {
  es: {
    // documento y cabecera
    tituloDocumento: 'Aprende · Hanal Pixán',
    navJuega: 'Juega', navAprende: 'Aprende', navEntiende: 'Entiende',
    tituloPagina: 'Aprende sobre el Hanal Pixán',
    subtitulo: 'La comida de las ánimas: cómo se vive el Hanal Pixán en Yucatán.',

    // menú de anclas
    menuSecciones: 'Secciones de la página',
    navQueEs: '¿Qué es?', navCuando: '¿Cuándo?', navCamino: 'El camino',
    navAltar: 'El altar', navSabores: 'Sabores', navMaya: 'Palabras en maya',
    navCuriosos: 'Datos curiosos', navNoEs: 'Lo que no es', navFuentes: 'Fuentes',

    // 1) ¿Qué es?
    queEsTitulo: '¿Qué es el Hanal Pixán?',
    textoB: 'Hanal Pixán significa «comida de las ánimas» en lengua maya: <em lang="yua">hanal</em> es comida y <em lang="yua">pixán</em> son las ánimas o almas. Es la tradición con la que las familias yucatecas reciben a sus seres queridos que ya fallecieron. Se arma una mesa con luz, aroma, flores y los alimentos que más les gustaban para que las ánimas regresen a casa. Primero se ofrece la comida a las ánimas y, después de que «toman la gracia», los vivos la comparten. En algunas fuentes lo verás escrito «Janal Pixán»: es la misma tradición.',
    vocabTitulo: 'Dos palabras en maya',
    significadoHanal: 'comida',
    significadoPixan: 'ánimas o almas',

    // 2) ¿Cuándo se celebra?
    cuandoTitulo: '¿Cuándo se celebra?',
    fecha31: '31 de octubre · niños',
    fecha31Texto: 'Se dedica a los niños. El mantel lleva bordados de colores y las velas son de colores.',
    fecha1: '1 de noviembre · adultos',
    fecha1Texto: 'Se dedica a los adultos. El mantel lleva bordados negros y las velas son grandes y blancas.',

    // 3) El camino de las ánimas
    caminoTitulo: 'El camino de las ánimas',

    // 4) El altar por partes
    altarTitulo: 'El altar por partes',
    elementosCuenta: 'elementos',

    // 5) Sabores
    saboresTitulo: 'Sabores del Hanal Pixán',
    desliza: 'Desliza para ver más →',
    platilloCentral: 'El platillo central',

    // 6) Palabras en maya
    mayaTitulo: 'Palabras en maya',
    buscadorPh: 'Busca una palabra…',
    buscadorLabel: 'Buscar en el glosario',
    mayaTradicional: 'tradicional',
    mayaDescriptivo: 'traducción descriptiva',
    mayaRelacionado: 'palabra relacionada',
    mayaSin: 'Sin nombre maya tradicional',
    notaSin: 'Algunos elementos no tienen nombre maya tradicional (por ejemplo el escabeche).',
    sinResultados: 'Ninguna palabra coincide con tu búsqueda.',

    // 7) Datos curiosos
    curiososTitulo: 'Datos curiosos',

    // 8) Lo que no es
    noEsTitulo: 'Lo que no es',
    textoC: 'El Hanal Pixán yucateco tiene su propia identidad. En nuestro altar no hay calaveritas ni catrinas: lo que se destaca es la comida compartida, la luz y el camino que guía a las ánimas. La flor propia de la península es el <em lang="yua">xpujuk</em> (<i>Tagetes patula</i>); el cempasúchil grande es una tradición del centro de México que llegó a los altares yucatecos hace poco.',

    // 9) Fuentes y avisos
    fuentesTitulo: 'Fuentes',
    enRevision: 'Texto investigado; falta la revisión final de alguien que practica la tradición.',
    errorDatos: 'No se pudo cargar la información del altar.',
    cargando: 'Cargando la información…',

    // pie
    inicio: '← Volver al inicio',
    irEntiende: 'Entiende el altar',
    irJuega: 'Juega',

    // ficha
    cerrar: 'Entendido',
    verFicha: 'Ver ficha',
    enMaya: 'En maya', enIngles: 'En inglés', enEspanol: 'En español',
    queEs: '¿Qué es?',
    porQue: '¿Por qué está en el altar yucateco?',
    historia: 'Un poco de historia',
    fuentes: 'Fuentes',
    escuchar: '🔊 Escuchar en maya'
  },

  en: {
    tituloDocumento: 'Learn · Hanal Pixán',
    navJuega: 'Play', navAprende: 'Learn', navEntiende: 'Understand',
    tituloPagina: 'Learn about Hanal Pixán',
    subtitulo: 'The food of the souls: how Hanal Pixán is lived in Yucatán.',

    menuSecciones: 'Page sections',
    navQueEs: 'What is it?', navCuando: 'When?', navCamino: 'The path',
    navAltar: 'The altar', navSabores: 'Flavors', navMaya: 'Maya words',
    navCuriosos: 'Fun facts', navNoEs: 'What it is not', navFuentes: 'Sources',

    queEsTitulo: 'What is Hanal Pixán?',
    textoB: 'Hanal Pixán means "food of the souls" in the Maya language: <em lang="yua">hanal</em> is food and <em lang="yua">pixán</em> are the souls. It is the tradition through which Yucatecan families welcome their loved ones who have passed away. A table is set with light, scent, flowers and the foods they enjoyed most so the souls can return home. The food is offered to the souls first and, once they have "taken the grace", the living share it. Some sources spell it "Janal Pixán": it is the same tradition.',
    vocabTitulo: 'Two words in Maya',
    significadoHanal: 'food',
    significadoPixan: 'souls',

    cuandoTitulo: 'When is it celebrated?',
    fecha31: 'October 31 · children',
    fecha31Texto: 'Dedicated to children. The tablecloth has colorful embroidery and the candles are colored.',
    fecha1: 'November 1 · adults',
    fecha1Texto: 'Dedicated to adults. The tablecloth has black embroidery and the candles are large and white.',

    caminoTitulo: 'The path of the souls',

    altarTitulo: 'The altar, part by part',
    elementosCuenta: 'items',

    saboresTitulo: 'Flavors of Hanal Pixán',
    desliza: 'Swipe to see more →',
    platilloCentral: 'The centerpiece',

    mayaTitulo: 'Maya words',
    buscadorPh: 'Search a word…',
    buscadorLabel: 'Search the glossary',
    mayaTradicional: 'traditional',
    mayaDescriptivo: 'descriptive translation',
    mayaRelacionado: 'related word',
    mayaSin: 'No traditional Maya name',
    notaSin: 'Some elements have no traditional Maya name (escabeche, for example).',
    sinResultados: 'No word matches your search.',

    curiososTitulo: 'Fun facts',

    noEsTitulo: 'What it is not',
    textoC: 'Yucatecan Hanal Pixán has its own identity. Our altar has no sugar skulls or catrinas: what stands out is the shared food, the light and the path that guides the souls. The peninsula\'s own flower is <em lang="yua">xpujuk</em> (<i>Tagetes patula</i>); the large marigold (cempasúchil) is a central Mexican tradition that reached Yucatecan altars only recently.',

    fuentesTitulo: 'Sources',
    enRevision: 'Researched text; final review by a practitioner of the tradition is pending.',
    errorDatos: 'The altar information could not be loaded.',
    cargando: 'Loading…',

    inicio: '← Back to home',
    irEntiende: 'Understand the altar',
    irJuega: 'Play',

    cerrar: 'Got it',
    verFicha: 'See details',
    enMaya: 'In Maya', enIngles: 'In English', enEspanol: 'In Spanish',
    queEs: 'What is it?',
    porQue: 'Why is it on a Yucatecan altar?',
    historia: 'A bit of history',
    fuentes: 'Sources',
    escuchar: '🔊 Listen in Maya'
  }
};
