/*
 * Entiende — utilidades comunes:
 *  - idioma (español / inglés) y textos de la interfaz
 *  - cargar el JSON compartido (data/elementos.json)
 *  - mostrar la ficha de un elemento (nombre en español, maya e inglés + explicación)
 */
(function () {
  'use strict';

  var RAIZ = '../';            // las páginas de Entiende viven en /entiende/
  var CLAVE_IDIOMA = 'jaye-idioma';
  var IDIOMAS = ['es', 'en'];

  // ---------- Idioma ----------
  function idiomaInicial() {
    var q = new URLSearchParams(location.search).get('lang');
    if (IDIOMAS.indexOf(q) >= 0) return q;
    try {
      var g = localStorage.getItem(CLAVE_IDIOMA);
      if (IDIOMAS.indexOf(g) >= 0) return g;
    } catch (e) {}
    return 'es';
  }
  var idioma = idiomaInicial();
  document.documentElement.lang = idioma;

  var TEXTOS = {
    es: {
      volver: '← Volver', inicio: '← Volver al inicio', cerrar: 'Entendido',
      enMaya: 'En maya', enIngles: 'En inglés', enEspanol: 'En español',
      queEs: '¿Qué es?', porQue: '¿Por qué está en el altar yucateco?', historia: 'Un poco de historia',
      fuentes: 'Fuentes', enRevision: 'Texto investigado; falta la revisión final de alguien que practica la tradición.',
      mayaDescriptivo: 'traducción descriptiva', mayaRelacionado: 'palabra relacionada', mayaSin: 'Sin nombre maya tradicional',
      escuchar: '🔊 Escuchar en maya',
      // index
      tituloEntiende: 'Entiende el altar', introEntiende: 'Descubre qué es cada elemento de nuestro altar de Hanal Pixán y por qué está ahí.',
      usarCamara: '📷 Usar la cámara', usarCamaraDesc: 'Apunta a las tarjetas bordadas del altar y toca el nombre que aparece.',
      verFoto: '🏮 Ver el altar digital', verFotoDesc: 'Recorre el altar ilustrado y toca cualquier elemento. Funciona sin cámara.',
      // foto
      nuestroAltar: 'Altar digital', tocaPunto: 'Toca cualquier elemento del altar para saber qué es y por qué está ahí.',
      todos: 'Todo', ampliar: '🔍 Ampliar', reducir: '🔍 Reducir', recorrer: '▶ Recorrer el altar',
      verLista: 'Lista de los 38 elementos', buscar: 'Buscar (español, maya o inglés)…', sinResultados: 'No hay elementos con ese nombre.',
      anterior: '‹ Anterior', siguiente: 'Siguiente ›', deslizaAmpliado: 'Desliza para recorrer el altar ampliado.',
      probarCamara: '📷 Probar con la cámara', errorDatos: 'No se pudo cargar la información del altar.',
      // cámara
      camTitulo: 'Apunta, toca y entiende',
      paso1: 'Espera a que se descarguen las tarjetas (solo la primera vez).',
      paso2: 'Permite el uso de la cámara y apunta a cualquier tarjeta bordada del altar.',
      paso3: 'Toca el nombre que aparece para saber qué es y por qué está ahí.',
      activar: 'Activar cámara', cargando: 'Cargando…', abriendo: 'Abriendo cámara…', reintentar: 'Intentar de nuevo',
      apunta: 'Apunta la cámara a una tarjeta del altar', descargando: 'Descargando tarjetas…',
      pista: '¿No la detecta? Ponte de frente, acércate a unos 30–50 cm, que la tarjeta se vea completa y sin reflejos. También puedes',
      pistaFoto: 'ver el altar digital', tocaSaber: 'Toca para saber más', verFotoCorto: 'Altar digital', parteAltar: 'Parte del altar',
      errHttps: 'La cámara solo funciona con HTTPS (o en localhost). Abre el sitio desde su dirección https:// o usa el altar digital.',
      errNavegador: 'Este navegador no permite usar la cámara. Prueba con Chrome o Safari actualizados, o usa el altar digital.',
      errLibs: 'No se cargaron las librerías de la cámara. Revisa tu conexión y recarga la página.',
      errPreparar: 'No se pudo preparar la cámara: ',
      errCamara: 'No pudimos abrir la cámara. Revisa que hayas dado permiso (ícono junto a la dirección) o usa el altar digital.'
    },
    en: {
      volver: '← Back', inicio: '← Back to home', cerrar: 'Got it',
      enMaya: 'In Maya', enIngles: 'In English', enEspanol: 'In Spanish',
      queEs: 'What is it?', porQue: 'Why is it on a Yucatecan altar?', historia: 'A bit of history',
      fuentes: 'Sources', enRevision: 'Researched text; final review by a practitioner of the tradition is pending.',
      mayaDescriptivo: 'descriptive translation', mayaRelacionado: 'related word', mayaSin: 'No traditional Maya name',
      escuchar: '🔊 Listen in Maya',
      tituloEntiende: 'Understand the altar', introEntiende: 'Discover what each element of our Hanal Pixán altar is and why it is there.',
      usarCamara: '📷 Use the camera', usarCamaraDesc: 'Point at the embroidered cards on the altar and tap the name that appears.',
      verFoto: '🏮 See the digital altar', verFotoDesc: 'Explore the illustrated altar and tap any element. Works without a camera.',
      nuestroAltar: 'Digital altar', tocaPunto: 'Tap any element on the altar to learn what it is and why it is there.',
      todos: 'All', ampliar: '🔍 Zoom in', reducir: '🔍 Zoom out', recorrer: '▶ Tour the altar',
      verLista: 'List of the 38 elements', buscar: 'Search (Spanish, Maya or English)…', sinResultados: 'No elements match that name.',
      anterior: '‹ Previous', siguiente: 'Next ›', deslizaAmpliado: 'Swipe to explore the zoomed-in altar.',
      probarCamara: '📷 Try the camera', errorDatos: 'The altar information could not be loaded.',
      camTitulo: 'Point, tap and understand',
      paso1: 'Wait for the cards to download (first time only).',
      paso2: 'Allow camera access and point at any embroidered card on the altar.',
      paso3: 'Tap the name that appears to learn what it is and why it is there.',
      activar: 'Turn on camera', cargando: 'Loading…', abriendo: 'Opening camera…', reintentar: 'Try again',
      apunta: 'Point the camera at a card on the altar', descargando: 'Downloading cards…',
      pista: 'Not detecting it? Face the card, move to about 30–50 cm, keep the whole card in view and avoid glare. You can also',
      pistaFoto: 'see the digital altar', tocaSaber: 'Tap to learn more', verFotoCorto: 'Digital altar', parteAltar: 'Part of the altar',
      errHttps: 'The camera only works over HTTPS (or on localhost). Open the site from its https:// address or use the digital altar.',
      errNavegador: 'This browser cannot use the camera. Try an up-to-date Chrome or Safari, or use the digital altar.',
      errLibs: 'The camera libraries did not load. Check your connection and reload the page.',
      errPreparar: 'The camera could not be prepared: ',
      errCamara: 'We could not open the camera. Check that you allowed access (icon next to the address) or use the digital altar.'
    }
  };

  function tx(clave) { return (TEXTOS[idioma] && TEXTOS[idioma][clave]) || TEXTOS.es[clave] || clave; }
  // Texto de un objeto {es, en}
  function t(obj) {
    if (obj == null) return '';
    if (typeof obj === 'string') return obj;
    return obj[idioma] || obj.es || '';
  }

  function traducirPagina(raiz) {
    (raiz || document).querySelectorAll('[data-t]').forEach(function (n) {
      n.textContent = tx(n.getAttribute('data-t'));
    });
  }

  function cambiarIdioma(nuevo) {
    if (IDIOMAS.indexOf(nuevo) < 0 || nuevo === idioma) return;
    idioma = nuevo;
    document.documentElement.lang = idioma;
    try { localStorage.setItem(CLAVE_IDIOMA, idioma); } catch (e) {}
    var url = new URL(location.href);
    url.searchParams.set('lang', idioma);
    history.replaceState(null, '', url);
    traducirPagina();
    document.querySelectorAll('.selector-idioma button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === idioma));
    });
    document.dispatchEvent(new CustomEvent('idioma:cambio', { detail: idioma }));
  }

  // Botones ES | EN
  function selectorIdioma(contenedor) {
    var div = document.createElement('div');
    div.className = 'selector-idioma';
    div.setAttribute('role', 'group');
    div.setAttribute('aria-label', 'Idioma / Language');
    [['es', 'ES'], ['en', 'EN']].forEach(function (par) {
      var b = document.createElement('button');
      b.type = 'button';
      b.dataset.lang = par[0];
      b.textContent = par[1];
      b.setAttribute('aria-pressed', String(par[0] === idioma));
      b.addEventListener('click', function () { cambiarIdioma(par[0]); });
      div.appendChild(b);
    });
    contenedor.appendChild(div);
    return div;
  }

  // Agrega ?lang= a los enlaces internos para conservar el idioma
  function conIdioma(href) {
    if (idioma === 'es' || /^https?:/.test(href)) return href;
    return href + (href.indexOf('?') >= 0 ? '&' : '?') + 'lang=' + idioma;
  }

  // ---------- Datos ----------
  function ruta(p) {
    if (!p) return '';
    if (/^(https?:)?\/\//.test(p) || p.charAt(0) === '/') return p;
    return RAIZ + p;
  }

  var cache = null;
  function cargarDatos() {
    if (cache) return cache;
    cache = fetch(ruta('data/elementos.json'), { cache: 'no-cache' })
      .then(function (r) {
        if (!r.ok) throw new Error('elementos.json (' + r.status + ')');
        return r.json();
      });
    return cache;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ---------- Ficha ----------
  var fondo, ficha, audioActual, actual, listaActual = null, datosFuentes = {};

  function crearFicha() {
    if (ficha) return;
    fondo = document.createElement('div');
    fondo.className = 'ficha-fondo';
    fondo.addEventListener('click', cerrarFicha);
    ficha = document.createElement('section');
    ficha.className = 'ficha';
    ficha.setAttribute('role', 'dialog');
    ficha.setAttribute('aria-modal', 'true');
    ficha.setAttribute('aria-labelledby', 'ficha-titulo');
    document.body.appendChild(fondo);
    document.body.appendChild(ficha);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrarFicha(); });
    document.addEventListener('idioma:cambio', function () {
      if (actual && ficha.classList.contains('abierta')) pintarFicha(actual);
    });
  }

  function pintarFicha(el) {
    var otro = idioma === 'es' ? 'en' : 'es';
    var m = el.maya || {};
    var html = '<div class="agarre"></div>';
    var pos = listaActual ? listaActual.indexOf(el) : -1;
    if (pos >= 0) {
      html += '<nav class="ficha-nav"><button class="boton secundario" data-accion="anterior"' + (pos === 0 ? ' disabled' : '') + '>' + tx('anterior') + '</button>' +
        '<span>' + (pos + 1) + ' / ' + listaActual.length + '</span>' +
        '<button class="boton secundario" data-accion="siguiente"' + (pos === listaActual.length - 1 ? ' disabled' : '') + '>' + tx('siguiente') + '</button></nav>';
    }
    if (el.imagen) html += '<img class="foto-elemento" src="' + esc(ruta(el.imagen)) + '" alt="" loading="lazy">';
    html += '<div class="ficha-cabeza"><img class="icono-ficha" src="' + esc(ruta('entiende/img/iconos/' + el.id + '.png')) + '" alt="" onerror="this.remove()">';
    html += '<div><p class="ficha-num">Nº ' + esc(el.n) + '</p>';
    html += '<h2 id="ficha-titulo">' + esc(t(el.nombre)) + '</h2></div></div>';

    // Los tres nombres
    html += '<dl class="nombres">';
    html += '<div class="nombre-maya"><dt>' + tx('enMaya') + '</dt><dd>';
    if (m.nombre) {
      html += '<strong lang="yua">' + esc(m.nombre) + '</strong>';
      if (m.tipo === 'descriptivo') html += ' <small>(' + tx('mayaDescriptivo') + ')</small>';
      if (m.tipo === 'relacionado') html += ' <small>(' + tx('mayaRelacionado') + ')</small>';
    } else {
      html += '<em>' + tx('mayaSin') + '</em>';
    }
    if (m.nota) html += '<span class="nota">' + esc(t(m.nota)) + '</span>';
    html += '</dd></div>';
    html += '<div><dt>' + tx(otro === 'en' ? 'enIngles' : 'enEspanol') + '</dt><dd lang="' + otro + '">' +
      esc(el.nombre[otro] || '') + '</dd></div>';
    html += '</dl>';

    html += '<h3>' + tx('queEs') + '</h3><p>' + esc(t(el.queEs)) + '</p>';
    html += '<h3>' + tx('porQue') + '</h3><p>' + esc(t(el.porQue)) + '</p>';
    if (el.historia) html += '<h3>' + tx('historia') + '</h3><p>' + esc(t(el.historia)) + '</p>';

    html += '<div class="acciones">';
    if (el.audio) html += '<button class="boton secundario" data-accion="audio">' + tx('escuchar') + '</button>';
    html += '<button class="boton" data-accion="cerrar">' + tx('cerrar') + '</button></div>';

    if (el.fuentes && el.fuentes.length) {
      html += '<details class="fuentes"><summary>' + tx('fuentes') + '</summary><ul>';
      el.fuentes.forEach(function (id) {
        var f = datosFuentes[id];
        if (f) html += '<li><a href="' + esc(f.url) + '" target="_blank" rel="noopener">' + esc(f.titulo) + '</a></li>';
      });
      html += '</ul></details>';
    }
    if (el.verificado === false) html += '<p class="borrador">' + tx('enRevision') + '</p>';

    ficha.innerHTML = html;
    ficha.querySelector('[data-accion="cerrar"]').addEventListener('click', cerrarFicha);
    [['anterior', -1], ['siguiente', 1]].forEach(function (par) {
      var b = ficha.querySelector('[data-accion="' + par[0] + '"]');
      if (b) b.addEventListener('click', function () { mostrarFicha(listaActual[pos + par[1]], { lista: listaActual }); });
    });
    var btnAudio = ficha.querySelector('[data-accion="audio"]');
    if (btnAudio) {
      btnAudio.addEventListener('click', function () {
        if (audioActual) audioActual.pause();
        audioActual = new Audio(ruta(el.audio));
        audioActual.play().catch(function () {});
      });
    }
  }

  // opciones.lista: arreglo de elementos para mostrar "Anterior / Siguiente" en la ficha
  function mostrarFicha(el, opciones) {
    crearFicha();
    actual = el;
    listaActual = (opciones && opciones.lista) || null;
    cargarDatos().then(function (d) { datosFuentes = d.fuentes || {}; pintarFicha(el); });
    pintarFicha(el);
    fondo.classList.add('abierta');
    ficha.classList.add('abierta');
    ficha.scrollTop = 0;
    var b = ficha.querySelector('[data-accion="cerrar"]');
    if (b) b.focus({ preventScroll: true });
    document.dispatchEvent(new CustomEvent('ficha:abierta', { detail: el }));
  }

  function cerrarFicha() {
    if (!ficha) return;
    fondo.classList.remove('abierta');
    ficha.classList.remove('abierta');
    if (audioActual) { audioActual.pause(); audioActual = null; }
    document.dispatchEvent(new CustomEvent('ficha:cerrada'));
  }

  window.Entiende = {
    get idioma() { return idioma; },
    t: t, tx: tx, traducirPagina: traducirPagina, cambiarIdioma: cambiarIdioma,
    selectorIdioma: selectorIdioma, conIdioma: conIdioma,
    ruta: ruta, cargarDatos: cargarDatos, mostrarFicha: mostrarFicha, cerrarFicha: cerrarFicha, esc: esc
  };

  // Traducir lo que ya está en la página y mantener el idioma en los enlaces internos
  function alListo() {
    traducirPagina();
    document.querySelectorAll('[data-idioma]').forEach(function (c) { selectorIdioma(c); });
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a || a.target === '_blank') return;
      var h = a.getAttribute('href');
      if (!h || /^(https?:|#|mailto:)/.test(h)) return;
      a.setAttribute('href', conIdioma(h.replace(/([?&])lang=\w+/, '').replace(/[?&]$/, '')));
    }, true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', alListo);
  else alListo();
})();
