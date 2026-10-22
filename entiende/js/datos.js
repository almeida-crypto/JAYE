/*
 * Entiende — utilidades comunes:
 *  - cargar el JSON compartido (data/elementos.json)
 *  - mostrar la ficha (explicación) de un elemento
 */
(function () {
  'use strict';

  // Las páginas de Entiende viven en /entiende/, así que la raíz del sitio es "../"
  var RAIZ = '../';

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
        if (!r.ok) throw new Error('No se pudo cargar elementos.json (' + r.status + ')');
        return r.json();
      });
    return cache;
  }

  function esc(t) {
    return String(t == null ? '' : t)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ---------- Ficha ----------
  var fondo, ficha, audioActual;

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
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') cerrarFicha();
    });
  }

  function mostrarFicha(el) {
    crearFicha();
    var html = '<div class="agarre"></div>';
    if (el.imagen) {
      html += '<img class="foto-elemento" src="' + esc(ruta(el.imagen)) + '" alt="" loading="lazy">';
    }
    html += '<h2 id="ficha-titulo">' + esc(el.nombre) + '</h2>';
    if (el.nombreMaya) {
      html += '<p class="maya">En maya: ' + esc(el.nombreMaya) +
        (el.pronunciacion ? ' <small>(' + esc(el.pronunciacion) + ')</small>' : '') + '</p>';
    }
    html += '<h3>¿Qué es?</h3><p>' + esc(el.descripcion) + '</p>';
    html += '<h3>¿Por qué está en el altar?</h3><p>' + esc(el.significado) + '</p>';
    html += '<div class="acciones">';
    if (el.audio) html += '<button class="boton secundario" data-accion="audio">🔊 Escuchar en maya</button>';
    html += '<button class="boton" data-accion="cerrar">Entendido</button></div>';
    if (el.verificado === false) {
      html += '<p class="borrador">Texto en revisión.</p>';
    }
    ficha.innerHTML = html;

    ficha.querySelector('[data-accion="cerrar"]').addEventListener('click', cerrarFicha);
    var btnAudio = ficha.querySelector('[data-accion="audio"]');
    if (btnAudio) {
      btnAudio.addEventListener('click', function () {
        if (audioActual) audioActual.pause();
        audioActual = new Audio(ruta(el.audio));
        audioActual.play().catch(function () {});
      });
    }

    fondo.classList.add('abierta');
    ficha.classList.add('abierta');
    ficha.scrollTop = 0;
    ficha.querySelector('[data-accion="cerrar"]').focus({ preventScroll: true });
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
    ruta: ruta,
    cargarDatos: cargarDatos,
    mostrarFicha: mostrarFicha,
    cerrarFicha: cerrarFicha,
    esc: esc
  };
})();
