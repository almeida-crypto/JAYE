/*
 * Entiende, opción 2: altar digital.
 * Dibuja un altar yucateco ilustrado (SVG): mesa de cuatro niveles cubierta con hojas de plátano y
 * cada elemento bordado en su lugar.
 * Tocar un elemento abre su ficha; "Recorrer el altar" las muestra en orden con Anterior / Siguiente.
 *
 * Los textos salen de data/elementos.json. Los íconos son img/iconos/<id>.png
 * (se generan con herramientas/exportar_iconos.py, a partir de los mismos dibujos de las tarjetas).
 * Para mover un elemento de lugar, cambia su fila en FILAS (abajo).
 */
(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var ANCHO = 800, ALTO = 1720, CX = ANCHO / 2, PISO = 1300; // PISO = donde termina la mesa

  // Cada fila: y = donde se apoyan los íconos, w = ancho disponible, s = tamaño máximo del ícono.
  // Las filas con "mesa: true" son los niveles del altar (de arriba hacia abajo); las otras, el piso.
  var FILAS = [
    { mesa: true, y: 480, w: 600, s: 92, ids: ['velas-colores', 'flores', 'fotografia', 'cruz-verde', 'rosario', 'objetos', 'velas'],
      escala: { 'cruz-verde': 1.4, fotografia: 1.15 } },
    { mesa: true, y: 685, w: 680, s: 96, ids: ['pib', 'tamales', 'relleno-negro', 'frijol-puerco', 'escabeche', 'joroches', 'pan'] },
    { mesa: true, y: 890, w: 700, s: 104, ids: ['china', 'mandarina', 'platano', 'yuca', 'dulce-calabaza', 'jicama'] },
    { mesa: true, y: 1095, w: 740, s: 104, ids: ['dulce-coco', 'dulce-cocoyol', 'jicaras-bejuco', 'aguardiente', 'chocolate', 'atole-nuevo'] },
    { y: 1470, w: 760, s: 110, ids: ['incensario', 'incienso', 'cigarros', 'lek', 'platos-barro', 'comal'] },
    { y: 1675, w: 720, s: 112, ids: ['tortear', 'filipina', 'cal', 'pantalon', 'alpargatas'] }
  ];
  // En nuestro altar la mesa va cubierta con hojas de plátano (no con mantel):
  // su ícono va al frente del último nivel, sobre las mismas hojas.
  var SUELTOS = { 'hojas-platano': { x: CX, y: PISO - 24, s: 84, parche: true } };

  var HILO = ['#c8102e', '#e2457a', '#f08a1c', '#ffc72c', '#7a3fa0', '#2e8b3d', '#1f6fb2'];

  var escena = document.getElementById('escena');
  var filtros = document.getElementById('filtros');
  var grupos = document.getElementById('grupos');
  var buscar = document.getElementById('buscar');
  var globo = document.getElementById('globo');
  var sinRes = document.getElementById('sin-resultados');
  var btnAmpliar = document.getElementById('btn-ampliar');
  var datos = null, porId = {}, orden = [], filtro = 'todos', ampliado = false;

  Entiende.cargarDatos().then(function (d) {
    datos = d;
    d.elementos.forEach(function (el) { porId[el.id] = el; });
    // "enAltar": false = el elemento no va en nuestro altar (p. ej. el mantel); Aprende sí lo sigue usando
    orden = d.elementos.filter(function (el) { return el.enAltar !== false; })
      .sort(function (a, b) { return a.n - b.n; });
    dibujarAltar();
    pintarTextos();
  }).catch(function (err) {
    escena.innerHTML = '<p class="aviso-error">' + Entiende.tx('errorDatos') + ' ' + Entiende.esc(err.message) + '</p>';
  });

  document.addEventListener('idioma:cambio', function () { if (datos) pintarTextos(); });

  // ------------------------------------------------------------------ SVG
  function nodo(tag, attrs, padre) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (padre) padre.appendChild(n);
    return n;
  }
  function azar(semilla) { // números al azar repetibles
    var s = semilla;
    return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  }

  function dibujarAltar() {
    var svg = nodo('svg', { viewBox: '0 0 ' + ANCHO + ' ' + ALTO, class: 'altar-svg', role: 'group' });
    var defs = nodo('defs', {}, svg);
    defs.innerHTML =
      '<linearGradient id="cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#140c22"/><stop offset=".7" stop-color="#2a1740"/><stop offset="1" stop-color="#3a2030"/></linearGradient>' +
      '<radialGradient id="resplandor"><stop offset="0" stop-color="#ffcf6b" stop-opacity=".55"/><stop offset=".55" stop-color="#f08a1c" stop-opacity=".18"/><stop offset="1" stop-color="#f08a1c" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="hoja" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#123f1d"/><stop offset=".5" stop-color="#25632c"/><stop offset="1" stop-color="#15461f"/></linearGradient>' +
      '<linearGradient id="hoja2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#174b22"/><stop offset=".5" stop-color="#2f7332"/><stop offset="1" stop-color="#1a5124"/></linearGradient>' +
      '<pattern id="petate" width="28" height="28" patternUnits="userSpaceOnUse"><rect width="28" height="28" fill="#b98b52"/>' +
      '<path d="M0 7h14M14 21h14" stroke="#a37641" stroke-width="7"/><path d="M21 0v14M7 14v14" stroke="#cfa36a" stroke-width="7"/></pattern>' +
      '<symbol id="px" viewBox="0 0 10 10"><path d="M1.5 1.5 8.5 8.5M8.5 1.5 1.5 8.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></symbol>' +
      '<radialGradient id="halo"><stop offset="0" stop-color="#fff1c9" stop-opacity=".38"/><stop offset=".6" stop-color="#ffd27a" stop-opacity=".12"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>' +
      '<filter id="sombra" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#000" flood-opacity=".35"/></filter>';

    var fondo = nodo('g', { 'aria-hidden': 'true' }, svg);
    nodo('rect', { width: ANCHO, height: ALTO, fill: 'url(#cielo)' }, fondo);
    estrellas(fondo);
    nodo('ellipse', { cx: CX, cy: 760, rx: 520, ry: 640, fill: 'url(#resplandor)' }, fondo);

    // Piso de petate y camino de cal
    nodo('rect', { x: 0, y: PISO, width: ANCHO, height: ALTO - PISO, fill: 'url(#petate)', opacity: '.55' }, fondo);
    nodo('rect', { x: 0, y: PISO, width: ANCHO, height: 40, fill: '#000', opacity: '.25' }, fondo);
    caminoCal(fondo);

    casita(fondo);
    franjaBordada(fondo);

    // Niveles de la mesa (de atrás hacia adelante)
    var mesas = FILAS.filter(function (f) { return f.mesa; });
    mesas.forEach(function (f, k) {
      var w = Math.min(ANCHO - 10, f.w + 40), sig = mesas[k + 1] ? mesas[k + 1].y : PISO;
      nivel(fondo, CX - w / 2, f.y, w, sig - f.y, k, k === mesas.length - 1);
    });

    // Elementos
    var capa = nodo('g', { class: 'elementos' }, svg);
    FILAS.forEach(function (f) {
      var paso = f.w / f.ids.length;
      f.ids.forEach(function (id, i) {
        var s = f.s * ((f.escala && f.escala[id]) || 1);
        ponerElemento(capa, id, CX - f.w / 2 + paso * (i + 0.5), f.y, Math.min(s, paso * 0.96 * ((f.escala && f.escala[id]) || 1)));
      });
    });
    Object.keys(SUELTOS).forEach(function (id) {
      var p = SUELTOS[id];
      ponerElemento(capa, id, p.x, p.y, p.s, p.parche);
    });

    escena.innerHTML = '';
    escena.appendChild(svg);
  }

  function estrellas(g) {
    var r = azar(11);
    for (var i = 0; i < 70; i++) {
      var x = r() * ANCHO, y = 130 + r() * 300, t = 6 + r() * 8;
      nodo('use', { href: '#px', x: x, y: y, width: t, height: t, style: 'color:#fbf6ea', opacity: (0.35 + r() * 0.5).toFixed(2) }, g);
    }
  }

  // Franja de bordado (punto de cruz) arriba; el papel picado no es tradición de Yucatán
  function franjaBordada(g) {
    nodo('rect', { x: 0, y: 0, width: ANCHO, height: 92, fill: '#f3ead6' }, g);
    var t = 10;
    for (var i = 0; i * t < ANCHO; i++) { // greca escalonada arriba y abajo
      var dy = [0, 1, 2, 1][i % 4] * t;
      nodo('use', { href: '#px', x: i * t, y: 6 + dy, width: t, height: t, style: 'color:' + HILO[Math.floor(i / 4) % HILO.length] }, g);
      nodo('use', { href: '#px', x: i * t, y: 66 + (2 * t - dy) - t, width: t, height: t, style: 'color:#2e8b3d' }, g);
    }
    for (var fx = 30; fx < ANCHO - 20; fx += 92) flor(g, fx, 36, 8, HILO[(fx / 92 | 0) % HILO.length]);
    nodo('rect', { x: 0, y: 92, width: ANCHO, height: 8, fill: '#000', opacity: '.25' }, g);
  }

  // Arco de bejuco y ramas, como el que enmarca los altares en Yucatán
  // Casita de madera con techo de guano (palma) que resguarda el altar, como las casas mayas.
  // (En lugar del arco con flores, que no es costumbre yucateca.)
  var TECHO = { pico: 112, alero: 368, izq: -20, der: ANCHO + 20 };
  function casita(g) {
    var r = azar(17), T = TECHO;
    // horcones (postes) y viga de madera
    [[44, 1], [ANCHO - 70, -1]].forEach(function (p) {
      var x = p[0];
      nodo('rect', { x: x, y: T.alero - 20, width: 26, height: PISO - T.alero + 20, fill: '#6b4523' }, g);
      nodo('rect', { x: x + 4, y: T.alero - 20, width: 6, height: PISO - T.alero + 20, fill: '#8a5a2e' }, g);
      for (var y = T.alero + 30; y < PISO; y += 70 + r() * 40) {   // vetas y nudos
        nodo('path', { d: 'M' + (x + 14) + ' ' + y + ' q 5 12 0 24', stroke: '#4a2f17', 'stroke-width': 2, fill: 'none' }, g);
      }
    });
    nodo('rect', { x: 30, y: T.alero - 6, width: ANCHO - 60, height: 22, rx: 4, fill: '#5a3a1e' }, g);
    nodo('rect', { x: 30, y: T.alero - 6, width: ANCHO - 60, height: 6, fill: '#7b4a1e' }, g);
    // techo de guano: triángulo de base y capas de palma de abajo hacia arriba
    var defs = g.ownerSVGElement ? g.ownerSVGElement.querySelector('defs') : null;
    var tri = 'M' + T.izq + ' ' + T.alero + ' L' + CX + ' ' + T.pico + ' L' + T.der + ' ' + T.alero + ' Z';
    if (defs) nodo('path', { d: tri }, nodo('clipPath', { id: 'techo-clip' }, defs));
    nodo('path', { d: tri, fill: '#6e5226' }, g);
    var capa = nodo('g', { 'clip-path': 'url(#techo-clip)' }, g);
    var tonos = ['#c9a45c', '#b8914a', '#d8b46a', '#a7823e', '#e0c27e'];
    for (var y = T.alero + 6; y > T.pico - 10; y -= 24) {
      for (var x = T.izq; x < T.der; x += 4.5) {
        var largo = 34 + r() * 14, inc = (x - CX) / (CX * 6);
        nodo('path', { d: 'M' + x.toFixed(1) + ' ' + (y - largo).toFixed(1) + ' L' + (x + inc * largo + (r() - .5) * 3).toFixed(1) + ' ' + (y + r() * 5).toFixed(1),
          stroke: tonos[(r() * tonos.length) | 0], 'stroke-width': 2.4, 'stroke-linecap': 'round' }, capa);
      }
      nodo('path', { d: 'M' + T.izq + ' ' + (y + 3) + ' H' + T.der, stroke: '#5c4320', 'stroke-width': 2, opacity: '.35' }, capa);
    }
    // caballete (remate del techo) y sombra del alero
    nodo('path', { d: 'M' + (CX - 46) + ' ' + (T.pico + 26) + ' L' + CX + ' ' + (T.pico - 6) + ' L' + (CX + 46) + ' ' + (T.pico + 26),
      stroke: '#5a3a1e', 'stroke-width': 12, fill: 'none', 'stroke-linejoin': 'round' }, g);
    nodo('rect', { x: 60, y: T.alero + 16, width: ANCHO - 120, height: 18, fill: '#000', opacity: '.22' }, g);
  }

  function caminoCal(g) {
    for (var lado = -1; lado <= 1; lado += 2) {
      for (var k = 0; k < 10; k++) {
        var t = k / 9, y = 1540 + t * (ALTO - 1560), x = CX + lado * (64 + t * 12); // flanquea el ícono de la cal
        nodo('circle', { cx: x, cy: y, r: 4 + t * 4, fill: '#fbf6ea', opacity: (0.55 + t * 0.4).toFixed(2) }, g);
      }
    }
  }

  // Un nivel de la mesa cubierto con mantel blanco y orilla bordada de hipil
  // Un nivel de la mesa cubierto con hojas de plátano, como se acostumbra en Yucatán
  function nivel(g, x, y, w, h, k, ultimo) {
    var r = azar(31 + k * 7);
    nodo('rect', { x: x, y: y, width: w, height: h, fill: '#103a1a' }, g);
    // superficie de la mesa: hojas tendidas a lo largo
    nodo('rect', { x: x - 4, y: y - 16, width: w + 8, height: 20, rx: 6, fill: '#3d7f34' }, g);
    nodo('path', { d: 'M' + (x + 6) + ' ' + (y - 7) + ' H' + (x + w - 6), stroke: '#a9d37a', 'stroke-width': 2, opacity: '.7' }, g);
    // hojas que cuelgan por el frente (se enciman un poco y tienen rasgaduras, como las de verdad)
    var anchoHoja = 64, n = Math.ceil(w / (anchoHoja - 14));
    for (var i = 0; i < n; i++) {
      var lx = x - 6 + i * (w + 12 - anchoHoja) / Math.max(1, n - 1), lw = anchoHoja;
      var largo = h + (ultimo ? 18 + r() * 22 : 4), punta = y + largo;
      var d = 'M' + lx + ' ' + y + ' H' + (lx + lw) + ' V' + (punta - 18) +
        ' Q' + (lx + lw) + ' ' + punta + ' ' + (lx + lw / 2) + ' ' + punta +
        ' Q' + lx + ' ' + punta + ' ' + lx + ' ' + (punta - 18) + ' Z';
      nodo('path', { d: d, fill: i % 2 ? 'url(#hoja2)' : 'url(#hoja)', stroke: '#174d21', 'stroke-width': 1.5 }, g);
      // nervadura central y venas paralelas
      var cx = lx + lw / 2;
      nodo('path', { d: 'M' + cx + ' ' + y + ' V' + (punta - 6), stroke: '#9cc46e', 'stroke-width': 2.5, opacity: '.55' }, g);
      for (var vy = y + 10; vy < punta - 14; vy += 9) {
        nodo('path', { d: 'M' + (cx - 2) + ' ' + vy + ' L' + (lx + 3) + ' ' + (vy + 7) + ' M' + (cx + 2) + ' ' + vy + ' L' + (lx + lw - 3) + ' ' + (vy + 7),
          stroke: '#b5d98c', 'stroke-width': 1, opacity: '.18' }, g);
      }
      // rasgaduras
      for (var t = 0; t < 2; t++) {
        var ty = y + 20 + r() * (largo - 50), lado = r() < 0.5 ? lx : lx + lw;
        nodo('path', { d: 'M' + lado + ' ' + ty + ' L' + (lado + (lado === lx ? 14 : -14)) + ' ' + (ty + 6), stroke: '#1c5a27', 'stroke-width': 3 }, g);
      }
    }
    // sombra que dejan los niveles de arriba
    nodo('rect', { x: x, y: y, width: w, height: 10, fill: '#000', opacity: '.18' }, g);
  }
  function flor(g, x, y, t, color) {
    var pat = ['.x.', 'xox', '.x.'];
    pat.forEach(function (fila, j) {
      fila.split('').forEach(function (ch, i) {
        if (ch === '.') return;
        nodo('use', { href: '#px', x: x + i * t, y: y + j * t, width: t, height: t, style: 'color:' + (ch === 'o' ? '#ffc72c' : color) }, g);
      });
    });
    nodo('use', { href: '#px', x: x - t, y: y + 2 * t, width: t, height: t, style: 'color:#2e8b3d' }, g);
    nodo('use', { href: '#px', x: x + 3 * t, y: y + 2 * t, width: t, height: t, style: 'color:#2e8b3d' }, g);
  }

  function ponerElemento(capa, id, cx, base, s, parche) {
    var el = porId[id];
    if (!el || el.enAltar === false) return;
    var g = nodo('g', { class: 'item', tabindex: '0', role: 'button', 'data-id': id, 'data-cat': el.categoria }, capa);
    if (parche) nodo('rect', { x: cx - s / 2 - 8, y: base - s - 8, width: s + 16, height: s + 16, rx: 16, fill: '#fbf6ea', stroke: '#c8a46a', 'stroke-width': 3 }, g);
    nodo('rect', { x: cx - s / 2 - 4, y: base - s - 4, width: s + 8, height: s + 10, fill: 'transparent', class: 'zona' }, g);
    nodo('ellipse', { cx: cx, cy: base - s * 0.45, rx: s * 0.56, ry: s * 0.5, fill: 'url(#halo)' }, g);
    nodo('ellipse', { cx: cx, cy: base - 2, rx: s * 0.38, ry: s * 0.07, fill: '#000', opacity: '.28' }, g);
    var ico = nodo('g', { class: 'ico' }, g);
    nodo('image', { href: Entiende.ruta('entiende/img/iconos/' + id + '.png'), x: cx - s / 2, y: base - s, width: s, height: s }, ico);
    var bx = cx + s * 0.42, by = base - s * 0.92;
    nodo('circle', { cx: bx, cy: by, r: 16, class: 'insignia', fill: '#f5a02a', stroke: '#1d1230', 'stroke-width': 3 }, ico);
    var txt = nodo('text', { x: bx, y: by + 6, 'text-anchor': 'middle', class: 'insignia-num' }, ico);
    txt.textContent = el.n;

    g.addEventListener('click', function () { abrir(el); });
    g.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir(el); }
    });
    g.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') mostrarGlobo(g, el); });
    g.addEventListener('pointerleave', ocultarGlobo);
    g.addEventListener('focus', function () { mostrarGlobo(g, el); });
    g.addEventListener('blur', ocultarGlobo);
  }

  // ------------------------------------------------------------------ interacción
  function visibles() {
    return filtro === 'todos' ? orden : orden.filter(function (el) { return el.categoria === filtro; });
  }
  function abrir(el) {
    ocultarGlobo();
    var lista = visibles();
    Entiende.mostrarFicha(el, { lista: lista.indexOf(el) >= 0 ? lista : orden });
  }

  function mostrarGlobo(g, el) {
    var r = g.getBoundingClientRect();
    globo.innerHTML = '<b>' + el.n + '. ' + Entiende.esc(Entiende.t(el.nombre)) + '</b>' +
      (el.maya && el.maya.nombre ? '<span lang="yua">' + Entiende.esc(el.maya.nombre) + '</span>' : '');
    globo.hidden = false;
    var gw = globo.offsetWidth;
    var x = Math.max(8, Math.min(window.innerWidth - gw - 8, r.left + r.width / 2 - gw / 2));
    globo.style.left = x + 'px';
    globo.style.top = (r.top + window.scrollY - globo.offsetHeight - 8) + 'px';
  }
  function ocultarGlobo() { globo.hidden = true; }

  btnAmpliar.addEventListener('click', function () {
    ampliado = !ampliado;
    document.body.classList.toggle('ampliado', ampliado);
    btnAmpliar.setAttribute('data-t', ampliado ? 'reducir' : 'ampliar');
    btnAmpliar.textContent = Entiende.tx(ampliado ? 'reducir' : 'ampliar');
    document.getElementById('aviso-ampliado').hidden = !ampliado;
    if (ampliado) escena.scrollLeft = (escena.scrollWidth - escena.clientWidth) / 2;
  });

  document.getElementById('btn-recorrer').addEventListener('click', function () {
    var lista = visibles();
    if (lista.length) Entiende.mostrarFicha(lista[0], { lista: lista });
  });

  // Al cambiar de ficha con Anterior / Siguiente, resalta el elemento en el altar
  document.addEventListener('ficha:abierta', function (e) {
    escena.querySelectorAll('.item.actual').forEach(function (n) { n.classList.remove('actual'); });
    var n = escena.querySelector('.item[data-id="' + e.detail.id + '"]');
    if (n) n.classList.add('actual');
  });
  document.addEventListener('ficha:cerrada', function () {
    escena.querySelectorAll('.item.actual').forEach(function (n) { n.classList.remove('actual'); });
  });

  function aplicarFiltro(cat) {
    filtro = cat;
    filtros.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.cat === cat); });
    escena.querySelectorAll('.item').forEach(function (n) {
      n.classList.toggle('apagado', cat !== 'todos' && n.dataset.cat !== cat);
    });
    pintarLista();
  }

  // ------------------------------------------------------------------ textos (dependen del idioma)
  function pintarTextos() {
    filtros.innerHTML = '';
    ['todos'].concat(Object.keys(datos.categorias)).forEach(function (cat) {
      var b = document.createElement('button');
      b.dataset.cat = cat;
      b.textContent = cat === 'todos' ? Entiende.tx('todos') : Entiende.t(datos.categorias[cat]);
      b.setAttribute('aria-pressed', cat === filtro);
      b.addEventListener('click', function () { aplicarFiltro(cat); });
      filtros.appendChild(b);
    });
    escena.querySelectorAll('.item').forEach(function (n) {
      var el = porId[n.dataset.id];
      n.setAttribute('aria-label', el.n + '. ' + Entiende.t(el.nombre));
    });
    buscar.placeholder = Entiende.tx('buscar');
    pintarLista();
  }

  function normal(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ']/g, ''); }

  function pintarLista() {
    var q = normal(buscar.value.trim());
    grupos.innerHTML = '';
    var total = 0;
    Object.keys(datos.categorias).forEach(function (cat) {
      if (filtro !== 'todos' && cat !== filtro) return;
      var del = orden.filter(function (el) {
        if (el.categoria !== cat) return false;
        if (!q) return true;
        return normal(el.nombre.es + ' ' + el.nombre.en + ' ' + (el.maya.nombre || '')).indexOf(q) >= 0;
      });
      if (!del.length) return;
      total += del.length;
      var sec = document.createElement('section');
      sec.className = 'grupo';
      sec.innerHTML = '<h2>' + Entiende.esc(Entiende.t(datos.categorias[cat])) + '</h2>';
      var ul = document.createElement('ul');
      ul.className = 'lista';
      del.forEach(function (el) {
        var li = document.createElement('li');
        var b = document.createElement('button');
        b.innerHTML = '<img src="' + Entiende.esc(Entiende.ruta('entiende/img/iconos/' + el.id + '.png')) + '" alt="" loading="lazy">' +
          '<span><b>' + el.n + '</b> ' + Entiende.esc(Entiende.t(el.nombre)) +
          (el.maya.nombre ? '<small lang="yua">' + Entiende.esc(el.maya.nombre) + '</small>' : '') + '</span>';
        b.addEventListener('click', function () { abrir(el); });
        li.appendChild(b);
        ul.appendChild(li);
      });
      sec.appendChild(ul);
      grupos.appendChild(sec);
    });
    sinRes.hidden = total > 0;
  }
  buscar.addEventListener('input', function () { if (datos) pintarLista(); });
})();
