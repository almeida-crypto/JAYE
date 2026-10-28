/*
 * Aprende — idioma (es/en), carga de data/elementos.json, pintado de las secciones,
 * ficha del elemento, imágenes y SVG. JavaScript puro, sin librerías.
 *
 * Rutas: todo vive en /aprende/, así que RAIZ ('../') apunta a la raíz del sitio;
 * si la carpeta se copia a la raíz, basta con cambiar RAIZ a './'.
 */
(function () {
  'use strict';

  // Imágenes de Aprende. '' = usar el SVG por defecto; con ruta (relativa a aprende/) = usar esa imagen.
  var IMAGENES = {
    cabecera:   { src: '', alt: { es: '', en: '' } },
    ninos:      { src: '', alt: { es: '', en: '' } },   // 31 de octubre (velas de colores)
    adultos:    { src: '', alt: { es: '', en: '' } },   // 1 de noviembre
    santos:     { src: '', alt: { es: '', en: '' } },   // 2 de noviembre · Todos los Santos
    loQueNoEs:  { src: 'img/fotos/xpujuk.jpg', alt: { es: 'Flor de xpujuk con una nota sobre el nombre: Hanal Pixán también se escribe Janal Pixán', en: 'Xpujuk flower with a note on the name: Hanal Pixán can also be spelled Janal Pixán' } }
  };

  var RAIZ = '../';
  var CLAVE = 'jaye-idioma';
  var IDIOMAS = ['es', 'en'];
  var SVG_GENERICO = 'img/iconos/_generico.svg';

  var ZONAS_ORDEN = ['base', 'luz', 'comida', 'frutas', 'bebidas', 'ropa'];
  var PASOS_CAMINO = ['cal', 'velas', 'incienso', 'pib'];   // marca → guía → aroma → comida
  var CURIOSOS = ['velas', 'pib', 'cal', 'flores', 'china', 'yuca'];
  var FUENTES_SECCION = ['uady-pixan', 'diario-altar-2024']; // fuentes del texto «Lo que no es»
  var CHIP_FECHA = {          // chips de cada fecha en «¿Cuándo se celebra?»
    ninos:   ['mantel', 'velas-colores'],   // 31 oct: velas de colores
    adultos: ['mantel', 'velas'],           // 1 nov: velas blancas
    santos:  ['velas', 'velas-colores']     // 2 nov: ambas
  };

  var idioma = idiomaInicial();
  var datos = null;
  var porId = {};
  var consulta = '';
  var errorCarga = null;

  // ------------------------------ utilidades ------------------------------
  function idiomaInicial() {
    var q = new URLSearchParams(location.search).get('lang');
    if (IDIOMAS.indexOf(q) >= 0) return q;
    try {
      var g = localStorage.getItem(CLAVE);
      if (IDIOMAS.indexOf(g) >= 0) return g;
    } catch (e) {}
    return 'es';
  }

  // Texto de un objeto {es, en}
  function t(obj) {
    if (obj == null) return '';
    if (typeof obj === 'string') return obj;
    return obj[idioma] || obj.es || '';
  }

  function tx(clave) {
    return (TEXTOS[idioma] && TEXTOS[idioma][clave]) || TEXTOS.es[clave] || clave;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function normaliza(s) {
    s = String(s == null ? '' : s).toLowerCase();
    return s.normalize ? s.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : s;
  }

  function primeraFrase(txt) {
    if (!txt) return '';
    var m = String(txt).match(/^[^.!?]*[.!?]/);
    return (m ? m[0] : txt).trim();
  }

  function sinMovimiento() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Ruta de una imagen compartida (relativa a la raíz, salvo absoluta o externa)
  function rutaImagen(p) {
    if (!p) return '';
    if (/^(https?:)?\/\//.test(p) || p.charAt(0) === '/') return p;
    return RAIZ + p;
  }

  function svgDe(el) { return 'img/iconos/' + el.id + '.svg'; }

  // ------------------------------ idioma ------------------------------
  function traducirPagina() {
    document.querySelectorAll('[data-t]').forEach(function (n) {
      n.textContent = tx(n.getAttribute('data-t'));
    });
    document.querySelectorAll('[data-t-html]').forEach(function (n) {
      n.innerHTML = tx(n.getAttribute('data-t-html'));
    });
  }

  function cambiarIdioma(nuevo) {
    if (IDIOMAS.indexOf(nuevo) < 0 || nuevo === idioma) return;
    idioma = nuevo;
    document.documentElement.lang = idioma;
    try { localStorage.setItem(CLAVE, idioma); } catch (e) {}
    try {
      var url = new URL(location.href);
      if (idioma === 'es') url.searchParams.delete('lang');
      else url.searchParams.set('lang', idioma);
      history.replaceState(null, '', url);
    } catch (e) {}
    document.querySelectorAll('.selector-idioma button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === idioma));
    });
    document.dispatchEvent(new CustomEvent('idioma:cambio', { detail: idioma }));
  }

  function crearSelector() {
    document.querySelectorAll('[data-idioma]').forEach(function (cont) {
      if (cont.firstChild) return;
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
      cont.appendChild(div);
    });
  }

  // Agrega ?lang= a los enlaces internos para conservar el idioma
  function conIdioma(href) {
    if (idioma === 'es' || /^https?:/.test(href) || href.charAt(0) === '#') return href;
    return href + (href.indexOf('?') >= 0 ? '&' : '?') + 'lang=' + idioma;
  }

  function pintarEnlaces() {
    document.querySelectorAll('[data-interno]').forEach(function (a) {
      a.setAttribute('href', conIdioma(a.getAttribute('data-interno')));
    });
  }

  // ------------------------------ imágenes y SVG ------------------------------
  // Prioridad: el.imagen (o IMAGENES) → SVG del elemento → SVG genérico (flor de xpujuk).
  function enlazar(img) {
    if (!img || img.dataset.listo) return;
    img.dataset.listo = '1';
    img.addEventListener('error', function () {
      var actual = img.getAttribute('src') || '';
      if ((img.dataset.paso || '0') === '0' && img.dataset.svg && actual !== img.dataset.svg) {
        img.dataset.paso = '1';
        img.src = img.dataset.svg;
        return;
      }
      img.dataset.paso = '2';
      if (img.dataset.svg2 && actual !== img.dataset.svg2) { img.src = img.dataset.svg2; return; }
      img.style.visibility = 'hidden';   // último recurso: sin ícono roto ni hueco
    });
  }

  function enlazarTodos(raiz) {
    (raiz || document).querySelectorAll('img').forEach(enlazar);
  }

  // Ilustración de un elemento del altar
  function imgEl(el, clase) {
    if (!el) return '';
    if (el.imagen) {
      return '<img class="' + esc(clase) + ' foto" src="' + esc(rutaImagen(el.imagen)) + '" alt="' +
        esc(t(el.nombre)) + '" loading="lazy" data-svg="' + esc(svgDe(el)) + '" data-svg2="' + SVG_GENERICO + '">';
    }
    return '<img class="' + esc(clase) + '" src="' + esc(svgDe(el)) + '" alt="" loading="lazy" data-svg2="' +
      SVG_GENERICO + '">';
  }

  // Imágenes generales de la página (IMAGENES)
  function pintarImagenes() {
    document.querySelectorAll('img[data-img]').forEach(function (img) {
      if (!img.dataset.svgDef) img.dataset.svgDef = img.getAttribute('src') || '';
      var cfg = IMAGENES[img.getAttribute('data-img')];
      if (!cfg) return;
      img.dataset.svg2 = SVG_GENERICO;
      if (cfg.src) {
        img.classList.add('foto');
        img.classList.remove('icono');
        img.setAttribute('alt', t(cfg.alt) || '');
        img.dataset.svg = img.dataset.svgDef;
        img.dataset.paso = '0';
        if (img.getAttribute('src') !== cfg.src) img.src = cfg.src;
      } else {
        img.classList.remove('foto');
        img.setAttribute('alt', '');
        if (img.getAttribute('src') !== img.dataset.svgDef) {
          img.dataset.paso = '0';
          img.src = img.dataset.svgDef;
        }
      }
      enlazar(img);
    });
  }

  // ------------------------------ datos ------------------------------
  function cargarDatos() {
    fetch(RAIZ + 'data/elementos.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('elementos.json (' + r.status + ')'); return r.json(); })
      .then(function (d) {
        datos = d;
        porId = {};
        (d.elementos || []).forEach(function (e) { porId[e.id] = e; });
        errorCarga = null;
        pintarTodo();
      })
      .catch(function (e) {
        errorCarga = e;
        pintarTodo();
      });
  }

  function pintarAviso() {
    var a = document.getElementById('aviso-error');
    if (!a) return;
    if (errorCarga) {
      a.textContent = tx('errorDatos') + (errorCarga.message ? ' (' + errorCarga.message + ')' : '');
      a.hidden = false;
    } else {
      a.hidden = true;
    }
  }

  // ------------------------------ secciones ------------------------------
  function chipHtml(el) {
    if (!el) return '';
    return '<button type="button" class="chip" data-ficha="' + esc(el.id) + '">' +
      '<img src="' + esc(svgDe(el)) + '" alt="" loading="lazy" data-svg2="' + SVG_GENERICO + '">' +
      '<span>' + esc(t(el.nombre)) + '</span></button>';
  }

  function pintarFechas() {
    document.querySelectorAll('[data-chips]').forEach(function (cont) {
      var ids = CHIP_FECHA[cont.getAttribute('data-chips')] || CHIP_FECHA.adultos;
      cont.innerHTML = ids.map(function (id) { return chipHtml(porId[id]); }).join('');
    });
  }

  function pintarCamino() {
    var cont = document.getElementById('camino-pasos');
    cont.innerHTML = PASOS_CAMINO.map(function (id, i) {
      var el = porId[id];
      if (!el) return '';
      return '<li><button type="button" class="paso" data-ficha="' + esc(el.id) + '">' +
        '<span class="paso-n">' + (i + 1) + '</span>' +
        imgEl(el, 'paso-img') +
        '<span class="paso-txt"><strong>' + esc(t(el.nombre)) + '</strong>' +
        '<span>' + esc(t(el.porQue)) + '</span></span></button></li>';
    }).join('');
  }

  function pintarZonas() {
    var cont = document.getElementById('altar-zonas');
    var abiertas = {};
    cont.querySelectorAll('details[open]').forEach(function (d) { abiertas[d.dataset.zona] = 1; });

    cont.innerHTML = ZONAS_ORDEN.map(function (zona) {
      var z = datos.zonas && datos.zonas[zona];
      if (!z) return '';
      var els = datos.elementos.filter(function (e) { return e.camara && e.camara.zona === zona; });
      var lista = els.map(function (el) {
        var maya = (el.maya && el.maya.nombre) ? '<small lang="yua">' + esc(el.maya.nombre) + '</small>' : '';
        return '<li><button type="button" class="el-btn" data-ficha="' + esc(el.id) + '">' +
          imgEl(el, '') +
          '<span><span class="el-n">Nº ' + esc(el.n) + '</span>' +
          '<span class="el-nombre">' + esc(t(el.nombre)) + '</span>' + maya + '</span></button></li>';
      }).join('');
      var abierto = abiertas[zona] ? ' open' : '';
      return '<details class="zona" data-zona="' + esc(zona) + '" style="--zona:' + esc(z.color) + '"' + abierto + '>' +
        '<summary>' +
          '<img class="zona-icono" src="img/iconos/zona-' + esc(zona) + '.svg" alt="" loading="lazy" data-svg2="' + SVG_GENERICO + '">' +
          '<span class="zona-nombre">' + esc(t(z)) + '</span>' +
          '<span class="zona-cuenta">' + els.length + ' ' + esc(tx('elementosCuenta')) + '</span>' +
        '</summary>' +
        '<ul class="zona-lista">' + lista + '</ul></details>';
    }).join('');
  }

  function pintarSabores() {
    var cont = document.getElementById('sabores-carrusel');
    var els = datos.elementos.filter(function (e) {
      return e.categoria === 'comida' || e.categoria === 'bebidas';
    });
    cont.innerHTML = els.map(function (el) {
      var maya = (el.maya && el.maya.nombre) ?
        '<span class="maya" lang="yua">' + esc(el.maya.nombre) + '</span>' : '';
      var insignia = el.id === 'pib' ? '<span class="badge">' + esc(tx('platilloCentral')) + '</span>' : '';
      return '<button type="button" class="card" data-ficha="' + esc(el.id) + '">' +
        insignia +
        imgEl(el, 'card-svg') +
        '<span class="nombre">' + esc(t(el.nombre)) + '</span>' + maya +
        '<span class="frase">' + esc(primeraFrase(t(el.queEs))) + '</span>' +
        '<span class="ver-ficha">' + esc(tx('verFicha')) + ' →</span></button>';
    }).join('');
  }

  function etiquetaTipo(tipo) {
    if (tipo === 'tradicional') return tx('mayaTradicional');
    if (tipo === 'descriptivo') return tx('mayaDescriptivo');
    if (tipo === 'relacionado') return tx('mayaRelacionado');
    return '';
  }

  function pintarGlosario() {
    var ul = document.getElementById('glosario');
    var conNombre = datos.elementos.filter(function (e) { return e.maya && e.maya.nombre; });
    ul.innerHTML = conNombre.map(function (el) {
      var m = el.maya;
      var etiqueta = etiquetaTipo(m.tipo);
      var nota = m.nota ? '<span class="glos-nota">' + esc(t(m.nota)) + '</span>' : '';
      var clave = normaliza(m.nombre + ' ' + t(el.nombre) + ' ' + t(m.nota));
      return '<li class="glos-item" data-buscar="' + esc(clave) + '">' +
        imgEl(el, 'glos-icono') +
        '<span><span class="palabra" lang="yua">' + esc(m.nombre) + '</span>' +
        (etiqueta ? '<span class="etiqueta-tipo">' + esc(etiqueta) + '</span>' : '') +
        '<span class="glos-nombre">' + esc(t(el.nombre)) + '</span>' + nota + '</span></li>';
    }).join('');
  }

  function aplicarFiltro() {
    if (!datos) return;
    var q = normaliza(consulta).trim();
    var visibles = 0;
    document.querySelectorAll('#glosario .glos-item').forEach(function (li) {
      var ok = !q || (li.getAttribute('data-buscar') || '').indexOf(q) >= 0;
      li.hidden = !ok;
      if (ok) visibles++;
    });
    var vacio = document.getElementById('glos-vacio');
    if (vacio) {
      vacio.hidden = visibles > 0;
      vacio.textContent = tx('sinResultados');
    }
  }

  function pintarCuriosos() {
    var cont = document.getElementById('curiosos-carrusel');
    cont.innerHTML = CURIOSOS.map(function (id) {
      var el = porId[id];
      if (!el) return '';
      return '<button type="button" class="card" data-ficha="' + esc(el.id) + '">' +
        imgEl(el, 'card-svg') +
        '<span class="nombre">' + esc(t(el.nombre)) + '</span>' +
        '<span class="frase">' + esc(t(el.historia)) + '</span>' +
        '<span class="ver-ficha">' + esc(tx('verFicha')) + ' →</span></button>';
    }).join('');
  }

  function pintarNoEs() {
    var tarjeta = document.getElementById('tarjeta-no-es');
    var chips = document.getElementById('no-es-chips');
    if (!tarjeta || !chips) return;

    var previa = tarjeta.querySelector('img[data-img]');
    if (!previa) {
      var img = document.createElement('img');
      img.className = 'img-seccion';
      img.setAttribute('data-img', 'loQueNoEs');
      img.setAttribute('src', SVG_GENERICO);
      img.setAttribute('alt', '');
      img.setAttribute('loading', 'lazy');
      tarjeta.insertBefore(img, tarjeta.firstChild);
    }

    var partes = [chipHtml(porId['flores'])];
    FUENTES_SECCION.forEach(function (k) {
      var f = datos.fuentes && datos.fuentes[k];
      if (f) partes.push('<a class="chip" href="' + esc(f.url) + '" target="_blank" rel="noopener">' +
        '<span>' + esc(f.titulo) + '</span></a>');
    });
    chips.innerHTML = partes.join('');
  }

  function pintarFuentes() {
    var ul = document.getElementById('fuentes-lista');
    var fuentes = datos.fuentes || {};
    ul.innerHTML = Object.keys(fuentes).map(function (k) {
      var f = fuentes[k];
      return '<li><a href="' + esc(f.url) + '" target="_blank" rel="noopener">' + esc(f.titulo) + '</a></li>';
    }).join('');
  }

  function pintarRevision() {
    if (!datos) return;
    var pendiente = datos.elementos.some(function (e) { return e.verificado === false; });
    document.querySelectorAll('[data-aviso]').forEach(function (n) {
      n.hidden = !pendiente;
      n.textContent = pendiente ? tx('enRevision') : '';
    });
  }

  function pintarTodo() {
    document.title = tx('tituloDocumento');
    traducirPagina();
    pintarAviso();

    var est = document.getElementById('cargando');
    if (est) {
      var esperando = !datos && !errorCarga;
      est.hidden = !esperando;
      if (esperando) est.textContent = tx('cargando');
    }
    if (!datos) return;

    pintarFechas();
    pintarCamino();
    pintarZonas();
    pintarSabores();
    pintarGlosario();
    pintarCuriosos();
    pintarNoEs();
    pintarFuentes();
    pintarRevision();
    pintarImagenes();
    pintarEnlaces();

    var buscador = document.getElementById('buscador');
    if (buscador) buscador.placeholder = tx('buscadorPh');

    aplicarFiltro();
    enlazarTodos(document);
  }

  // ------------------------------ ficha (hoja inferior) ------------------------------
  var fondo, ficha, audioActual, actual;

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
    html += '<p class="ficha-num">Nº ' + esc(el.n) + '</p>';
    html += '<h2 id="ficha-titulo">' + esc(t(el.nombre)) + '</h2>';

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

    // Ilustración: la imagen real si existe; si no (o si falla), el SVG en punto de cruz.
    html += '<div class="caja-imagen">';
    if (el.imagen) {
      html += '<img class="foto" src="' + esc(rutaImagen(el.imagen)) + '" alt="' + esc(t(el.nombre)) +
        '" loading="lazy" data-svg="' + esc(svgDe(el)) + '" data-svg2="' + SVG_GENERICO + '">';
    } else {
      html += '<img class="icono" src="' + esc(svgDe(el)) + '" alt="" loading="lazy" data-svg2="' + SVG_GENERICO + '">';
    }
    html += '</div>';

    html += '<div class="acciones">';
    if (el.audio) html += '<button type="button" class="boton secundario" data-accion="audio">' + tx('escuchar') + '</button>';
    html += '<button type="button" class="boton" data-accion="cerrar">' + tx('cerrar') + '</button></div>';

    if (el.fuentes && el.fuentes.length) {
      var fuentes = (datos && datos.fuentes) || {};
      html += '<details class="fuentes"><summary>' + tx('fuentes') + '</summary><ul>';
      el.fuentes.forEach(function (id) {
        var f = fuentes[id];
        if (f) html += '<li><a href="' + esc(f.url) + '" target="_blank" rel="noopener">' + esc(f.titulo) + '</a></li>';
      });
      html += '</ul></details>';
    }
    if (el.verificado === false) html += '<p class="borrador">' + tx('enRevision') + '</p>';

    ficha.innerHTML = html;
    ficha.querySelector('[data-accion="cerrar"]').addEventListener('click', cerrarFicha);
    var btnAudio = ficha.querySelector('[data-accion="audio"]');
    if (btnAudio) {
      btnAudio.addEventListener('click', function () {
        if (audioActual) audioActual.pause();
        audioActual = new Audio(rutaImagen(el.audio));
        audioActual.play().catch(function () {});
      });
    }
    enlazarTodos(ficha);
  }

  function mostrarFicha(el) {
    crearFicha();
    actual = el;
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

  // ------------------------------ menú de anclas ------------------------------
  var ordenAnclas = [], anclaId = null, pendScroll = false;

  function prepararAnclas() {
    ordenAnclas = Array.prototype.map.call(
      document.querySelectorAll('.menu-anclas a[href^="#"]'),
      function (a) { return a.getAttribute('href').slice(1); }
    );
    var alScroll = function () {
      if (pendScroll) return;
      pendScroll = true;
      window.requestAnimationFrame(function () { pendScroll = false; actualizarAncla(); });
    };
    window.addEventListener('scroll', alScroll, { passive: true });
    window.addEventListener('resize', alScroll);
    actualizarAncla();
  }

  // La sección activa es la última cuya parte superior ya pasó el borde del menú
  function actualizarAncla() {
    if (!ordenAnclas.length) return;
    var linea = 140;
    var elegida = null;
    ordenAnclas.forEach(function (id) {
      var s = document.getElementById(id);
      if (s && s.getBoundingClientRect().top <= linea) elegida = id;
    });
    if (elegida === anclaId) return;
    anclaId = elegida;
    var chip = null;
    ordenAnclas.forEach(function (id) {
      var a = document.querySelector('.menu-anclas a[href="#' + id + '"]');
      if (!a) return;
      var activo = id === elegida;
      a.classList.toggle('activo', activo);
      if (activo) { a.setAttribute('aria-current', 'true'); chip = a; }
      else a.removeAttribute('aria-current');
    });
    if (chip) {
      var ul = chip.closest('ul');
      if (ul) {
        var izq = Math.max(0, chip.offsetLeft - 16);
        try {
          ul.scrollTo({ left: izq, behavior: sinMovimiento() ? 'auto' : 'smooth' });
        } catch (e) { ul.scrollLeft = izq; }
      }
    }
  }

  // ------------------------------ arranque ------------------------------
  function alListo() {
    document.documentElement.lang = idioma;
    crearSelector();
    pintarTodo();

    var buscador = document.getElementById('buscador');
    if (buscador) {
      buscador.addEventListener('input', function () { consulta = buscador.value; aplicarFiltro(); });
    }

    document.addEventListener('idioma:cambio', pintarTodo);

    // Abrir la ficha desde cualquier botón con data-ficha="id"
    document.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('[data-ficha]');
      if (!btn) return;
      var el = porId[btn.getAttribute('data-ficha')];
      if (el) mostrarFicha(el);
    });

    // Conservar el idioma en los enlaces internos al navegar
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a || a.target === '_blank') return;
      var h = a.getAttribute('href');
      if (!h || /^(https?:|#|mailto:)/.test(h)) return;
      a.setAttribute('href', conIdioma(h.replace(/([?&])lang=\w+/, '').replace(/[?&]$/, '')));
    }, true);

    prepararAnclas();
    cargarDatos();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', alListo);
  else alListo();
})();
