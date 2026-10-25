/*
 * Entiende, opción 2: altar digital.
 * Dibuja un altar yucateco ilustrado (SVG) con los 38 elementos bordados en su lugar.
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
    { mesa: true, y: 480, w: 560, s: 96, ids: ['flores', 'velas', 'fotografia', 'cruz-verde', 'rosario', 'objetos'],
      escala: { 'cruz-verde': 1.4, fotografia: 1.15 } },
    { mesa: true, y: 685, w: 650, s: 96, ids: ['hojas-platano', 'pib', 'tamales', 'relleno-negro', 'frijol-puerco', 'escabeche', 'pan'] },
    { mesa: true, y: 890, w: 700, s: 104, ids: ['china', 'mandarina', 'platano', 'yuca', 'dulce-calabaza', 'jicama'] },
    { mesa: true, y: 1095, w: 770, s: 104, ids: ['dulce-coco', 'dulce-cocoyol', 'miel', 'jicaras-bejuco', 'aguardiente', 'chocolate', 'atole-nuevo'] },
    { y: 1470, w: 760, s: 110, ids: ['incensario', 'incienso', 'cigarros', 'lek', 'platos-barro', 'comal'] },
    { y: 1675, w: 720, s: 112, ids: ['tortear', 'filipina', 'cal', 'pantalon', 'alpargatas'] }
  ];
  // El mantel es la tela misma: su ícono va bordado al frente del último nivel.
  var SUELTOS = { mantel: { x: CX, y: PISO - 22, s: 84 } };

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
    orden = d.elementos.slice().sort(function (a, b) { return a.n - b.n; });
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
      '<linearGradient id="tela" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#eadfc8"/></linearGradient>' +
      '<pattern id="petate" width="28" height="28" patternUnits="userSpaceOnUse"><rect width="28" height="28" fill="#b98b52"/>' +
      '<path d="M0 7h14M14 21h14" stroke="#a37641" stroke-width="7"/><path d="M21 0v14M7 14v14" stroke="#cfa36a" stroke-width="7"/></pattern>' +
      '<symbol id="px" viewBox="0 0 10 10"><path d="M1.5 1.5 8.5 8.5M8.5 1.5 1.5 8.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></symbol>' +
      '<filter id="sombra" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#000" flood-opacity=".35"/></filter>';

    var fondo = nodo('g', { 'aria-hidden': 'true' }, svg);
    nodo('rect', { width: ANCHO, height: ALTO, fill: 'url(#cielo)' }, fondo);
    estrellas(fondo);
    nodo('ellipse', { cx: CX, cy: 760, rx: 520, ry: 640, fill: 'url(#resplandor)' }, fondo);

    // Piso de petate y camino de cal
    nodo('rect', { x: 0, y: PISO, width: ANCHO, height: ALTO - PISO, fill: 'url(#petate)', opacity: '.55' }, fondo);
    nodo('rect', { x: 0, y: PISO, width: ANCHO, height: 40, fill: '#000', opacity: '.25' }, fondo);
    caminoCal(fondo);

    arco(fondo);
    papelPicado(fondo);

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
      ponerElemento(capa, id, p.x, p.y, p.s);
    });

    escena.innerHTML = '';
    escena.appendChild(svg);
    flores(); // necesitan que el arco ya esté en la página (getPointAtLength)
  }

  function estrellas(g) {
    var r = azar(11);
    for (var i = 0; i < 70; i++) {
      var x = r() * ANCHO, y = 130 + r() * 300, t = 6 + r() * 8;
      nodo('use', { href: '#px', x: x, y: y, width: t, height: t, style: 'color:#fbf6ea', opacity: (0.35 + r() * 0.5).toFixed(2) }, g);
    }
  }

  function papelPicado(g) {
    var cols = ['#e2457a', '#f08a1c', '#ffc72c', '#2e8b3d', '#7a3fa0', '#1f9a9a', '#c8102e'];
    var n = cols.length, w = ANCHO / n;
    nodo('path', { d: 'M0 14 C 240 44 560 44 800 14', stroke: '#6b4a2a', 'stroke-width': 4, fill: 'none' }, g);
    for (var i = 0; i < n; i++) {
      var x = i * w + 6, ww = w - 12, top = 16 + Math.sin(Math.PI * (i + 0.5) / n) * 22, h = 104;
      var zig = '';
      for (var k = 0; k <= 10; k++) zig += ' L' + (x + ww - k * ww / 10).toFixed(1) + ' ' + (top + h - (k % 2 ? 0 : 10)).toFixed(1);
      nodo('path', { d: 'M' + x + ' ' + top + ' H' + (x + ww) + zig + ' Z', fill: cols[i] }, g);
      var cx = x + ww / 2, cy = top + h * 0.5;
      for (var a = 0; a < 8; a++) {
        var ang = a * Math.PI / 4, ex = cx + 22 * Math.cos(ang), ey = cy + 22 * Math.sin(ang);
        nodo('ellipse', { cx: ex, cy: ey, rx: 10, ry: 5, transform: 'rotate(' + a * 45 + ' ' + ex + ' ' + ey + ')', fill: '#1d1230' }, g);
      }
      nodo('circle', { cx: cx, cy: cy, r: 7, fill: '#1d1230' }, g);
      for (var p = 0; p < 5; p++) nodo('circle', { cx: x + 12 + p * (ww - 24) / 4, cy: top + 12, r: 3.5, fill: '#1d1230' }, g);
    }
  }

  // Arco de bejuco y ramas, como el que enmarca los altares en Yucatán
  var trazoArco = 'M52 1300 L52 520 A348 348 0 0 1 748 520 L748 1300';
  function arco(g) {
    nodo('path', { d: trazoArco, stroke: '#5a3a1e', 'stroke-width': 26, fill: 'none', 'stroke-linecap': 'round' }, g);
    nodo('path', { d: trazoArco, stroke: '#7b4a1e', 'stroke-width': 12, fill: 'none', 'stroke-dasharray': '26 14' }, g);
    nodo('path', { id: 'arco-guia', d: trazoArco, stroke: '#2e8b3d', 'stroke-width': 8, fill: 'none', 'stroke-dasharray': '6 30', 'stroke-linecap': 'round' }, g);
    nodo('g', { id: 'arco-flores', 'aria-hidden': 'true' }, g); // aquí van las flores (detrás de la mesa)
  }
  function flores() {
    var guia = escena.querySelector('#arco-guia');
    if (!guia || !guia.getTotalLength) return;
    var L = guia.getTotalLength(), r = azar(5), capa = escena.querySelector('#arco-flores');
    for (var d = 30; d < L - 20; d += 46) {
      var p = guia.getPointAtLength(d), lado = (Math.round(d / 46) % 2) ? 1 : -1;
      // hojas
      nodo('ellipse', { cx: p.x + lado * 16, cy: p.y + 6, rx: 14, ry: 6, fill: '#2e8b3d', transform: 'rotate(' + (lado * 35) + ' ' + (p.x + lado * 16) + ' ' + (p.y + 6) + ')' }, capa);
      // xpujuk (amarillo/naranja) y alguna flor rosa o morada
      var tono = r();
      var c1 = tono < 0.45 ? '#f08a1c' : tono < 0.8 ? '#ffc72c' : tono < 0.92 ? '#e2457a' : '#b48ad6';
      var rr = 11 + r() * 5;
      for (var k = 0; k < 8; k++) {
        var a = k * Math.PI / 4;
        nodo('circle', { cx: p.x + Math.cos(a) * rr * 0.6, cy: p.y + Math.sin(a) * rr * 0.6, r: rr * 0.45, fill: c1 }, capa);
      }
      nodo('circle', { cx: p.x, cy: p.y, r: rr * 0.35, fill: tono < 0.8 ? '#c8102e' : '#ffc72c' }, capa);
    }
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
  function nivel(g, x, y, w, h, k, ultimo) {
    nodo('rect', { x: x, y: y - 16, width: w, height: 18, fill: '#fffdf6' }, g);
    nodo('rect', { x: x, y: y, width: w, height: h, fill: 'url(#tela)' }, g);
    nodo('rect', { x: x, y: y, width: w, height: 6, fill: '#000', opacity: '.08' }, g);
    // greca bordada
    var t = 12, n = Math.floor((w - 20) / t);
    for (var i = 0; i < n; i++) {
      var col = HILO[(Math.floor(i / 3) + k) % HILO.length];
      var dy = [0, 1, 2, 1][i % 4] * t;
      nodo('use', { href: '#px', x: x + 10 + i * t, y: y + 12 + dy, width: t, height: t, style: 'color:' + col }, g);
    }
    // flores bordadas cada cierto espacio
    for (var fx = x + 40; fx < x + w - 40; fx += 96) if (!ultimo || Math.abs(fx - CX) > 70) flor(g, fx, y + 64, 7, HILO[(Math.round(fx) + k) % HILO.length]);
    // encaje en la orilla de abajo
    if (ultimo) {
      for (var ex = x; ex < x + w; ex += 24) nodo('circle', { cx: ex + 12, cy: y + h, r: 12, fill: '#f6eedc' }, g);
    }
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

  function ponerElemento(capa, id, cx, base, s) {
    var el = porId[id];
    if (!el) return;
    var g = nodo('g', { class: 'item', tabindex: '0', role: 'button', 'data-id': id, 'data-cat': el.categoria }, capa);
    nodo('rect', { x: cx - s / 2 - 4, y: base - s - 4, width: s + 8, height: s + 10, fill: 'transparent', class: 'zona' }, g);
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
