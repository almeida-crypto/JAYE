/*
 * Entiende, opción 2: cámara con marcadores de imagen (MindAR + A-Frame).
 *
 * Las 38 tarjetas están en un solo archivo, targets/altar.mind. Cada elemento de
 * data/elementos.json tiene camara.targetIndex = posición de su tarjeta en ese archivo
 * (00-mantel.png es el 0, 01-hojas-platano.png el 1, etc.).
 * El archivo se descarga al abrir la página (con porcentaje) para que, al encender la
 * cámara, ya esté en caché.
 *
 * URL: camara.html?lang=en
 */
(function () {
  'use strict';

  var CONFIG = {
    targets: 'targets/altar.mind',  // generado con herramientas/compilar.html (todas las tarjetas, en orden)
    maxTrack: 2,                    // cuántas tarjetas se siguen a la vez (más = más lento)
    ocultarTras: 500,               // ms que la etiqueta sigue visible tras perder la tarjeta
    pistaTras: 15000                // ms sin detectar nada antes de mostrar consejos
  };

  var $ = function (id) { return document.getElementById(id); };
  var inicio = $('inicio'), estado = $('estado'), btn = $('btn-iniciar');
  var guia = $('guia'), guiaTexto = $('guia-texto'), capa = $('etiquetas');

  var datos = null, escena = null;
  var seguidos = [];   // { el, ancla, etiqueta, visible, perdidoEn }
  var corriendo = false, temporizadorPista = null, vec = null, estadoBoton = 'cargando', porcentaje = null;
  var escenaLista = false, archivoListo = false;

  function tx(k) { return Entiende.tx(k); }
  function mostrarEstado(html) { estado.innerHTML = html; }
  function ponerBoton(clave, activo) {
    estadoBoton = clave;
    btn.textContent = tx(clave) + (clave === 'descargando' && porcentaje != null ? ' ' + porcentaje + '%' : '');
    btn.disabled = !activo;
  }
  function error(msg) {
    mostrarEstado('<p class="aviso-error">' + msg + '</p>');
    ponerBoton('reintentar', true);
    inicio.hidden = false;
    guia.hidden = true;
  }

  // ---------- 1. Comprobaciones previas ----------
  if (!window.isSecureContext) { error(tx('errHttps')); btn.disabled = true; return; }
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { error(tx('errNavegador')); btn.disabled = true; return; }
  if (!window.AFRAME || !window.MINDAR) { error(tx('errLibs')); btn.disabled = true; return; }

  // ---------- 2. Cargar datos y descargar las tarjetas ----------
  Entiende.cargarDatos().then(function (d) {
    datos = d;
    prepararEscena();
    descargarTarjetas();
  }).catch(function (e) {
    error(tx('errPreparar') + Entiende.esc(e.message));
  });

  // Descarga altar.mind mostrando el avance; MindAR lo vuelve a pedir y lo toma de la caché
  function descargarTarjetas() {
    porcentaje = 0;
    ponerBoton('descargando', false);
    fetch(CONFIG.targets, { cache: 'force-cache' }).then(function (r) {
      if (!r.ok) throw new Error(CONFIG.targets + ' (' + r.status + ')');
      var total = +r.headers.get('Content-Length') || 0;
      if (!r.body || !total) return r.arrayBuffer();
      var lector = r.body.getReader(), recibido = 0;
      return (function leer() {
        return lector.read().then(function (p) {
          if (p.done) return;
          recibido += p.value.length;
          porcentaje = Math.min(99, Math.round(recibido / total * 100));
          ponerBoton('descargando', false);
          return leer();
        });
      })();
    }).then(function () {
      archivoListo = true;
      porcentaje = null;
      if (escenaLista) ponerBoton('activar', true);
    }).catch(function (e) {
      // Si la descarga previa falla, MindAR lo intentará igual al encender la cámara
      archivoListo = true;
      porcentaje = null;
      if (escenaLista) ponerBoton('activar', true);
      console.warn('No se pudo precargar', e);
    });
  }

  document.addEventListener('idioma:cambio', function () {
    if (!datos) return;
    ponerBoton(estadoBoton, !btn.disabled);
    seguidos.forEach(function (s) { pintarEtiqueta(s); });
    actualizarGuia();
  });

  // ---------- 3. Escena de A-Frame + MindAR con todas las tarjetas ----------
  function prepararEscena() {
    var elementos = datos.elementos.filter(function (el) {
      return el.camara && typeof el.camara.targetIndex === 'number';
    });
    if (!elementos.length) { error(tx('errPreparar') + 'sin tarjetas'); return; }

    var THREE = AFRAME.THREE;
    vec = new THREE.Vector3();

    escena = document.createElement('a-scene');
    escena.setAttribute('mindar-image',
      'imageTargetSrc: ' + CONFIG.targets +
      '; maxTrack: ' + CONFIG.maxTrack +
      '; autoStart: false; uiLoading: no; uiScanning: no; uiError: no' +
      '; filterMinCF: 0.0001; filterBeta: 0.001');
    escena.setAttribute('embedded', '');
    escena.setAttribute('color-space', 'sRGB');
    escena.setAttribute('renderer', 'colorManagement: true; alpha: true; antialias: false');
    escena.setAttribute('vr-mode-ui', 'enabled: false');
    escena.setAttribute('device-orientation-permission-ui', 'enabled: false');

    var cam = document.createElement('a-camera');
    cam.setAttribute('position', '0 0 0');
    cam.setAttribute('look-controls', 'enabled: false');
    cam.setAttribute('wasd-controls', 'enabled: false');
    escena.appendChild(cam);

    elementos.forEach(function (el) {
      var target = document.createElement('a-entity');
      target.setAttribute('mindar-image-target', 'targetIndex: ' + el.camara.targetIndex);
      var ancla = document.createElement('a-entity');   // centro de la tarjeta
      ancla.setAttribute('position', '0 0 0');
      target.appendChild(ancla);
      escena.appendChild(target);

      var etiqueta = document.createElement('button');
      etiqueta.className = 'etiqueta';
      etiqueta.hidden = true;
      etiqueta.addEventListener('click', function () { Entiende.mostrarFicha(el); });
      capa.appendChild(etiqueta);

      var s = { el: el, ancla: ancla, etiqueta: etiqueta, visible: false, perdidoEn: 0 };
      pintarEtiqueta(s);
      target.addEventListener('targetFound', function () { s.visible = true; s.perdidoEn = 0; actualizarGuia(); });
      target.addEventListener('targetLost', function () { s.visible = false; s.perdidoEn = performance.now(); actualizarGuia(); });
      seguidos.push(s);
    });

    escena.addEventListener('arReady', function () {
      inicio.hidden = true;
      corriendo = true;
      actualizarGuia();
      requestAnimationFrame(bucle);
    });
    escena.addEventListener('arError', function () { corriendo = false; error(tx('errCamara')); });

    var listo = function () {
      escenaLista = true;
      if (archivoListo) ponerBoton('activar', true);
    };
    escena.addEventListener('loaded', listo);
    $('ar').appendChild(escena);
  }

  function pintarEtiqueta(s) {
    var maya = s.el.maya && s.el.maya.nombre ? '<em lang="yua">' + Entiende.esc(s.el.maya.nombre) + '</em>' : '';
    s.etiqueta.innerHTML = '<strong>' + Entiende.esc(Entiende.t(s.el.nombre)) + '</strong>' + maya +
      '<span>' + tx('tocaSaber') + '</span>';
  }

  // ---------- 4. Encender la cámara (con un toque del usuario: necesario en iPhone) ----------
  function iniciar() {
    if (!escena) return;
    var sistema = escena.systems['mindar-image-system'];
    ponerBoton('abriendo', false);
    mostrarEstado('');
    if (sistema.video) { try { sistema.stop(); } catch (e) {} }
    try { sistema.start(); } catch (e) { error(tx('errPreparar') + Entiende.esc(e.message)); }
  }
  btn.addEventListener('click', iniciar);

  window.addEventListener('pagehide', function () {
    if (!escena || !corriendo) return;
    try { escena.systems['mindar-image-system'].stop(); } catch (e) {}
  });

  // ---------- 5. Etiquetas que siguen a cada tarjeta ----------
  function bucle() {
    if (!corriendo || !escena) return;
    var camara = escena.camera;
    var rect = escena.canvas.getBoundingClientRect();
    var ahora = performance.now();
    for (var i = 0; i < seguidos.length; i++) {
      var s = seguidos[i];
      var mostrar = s.visible || (s.perdidoEn && ahora - s.perdidoEn < CONFIG.ocultarTras);
      if (!mostrar) { s.etiqueta.hidden = true; continue; }
      if (s.visible) {
        s.ancla.object3D.getWorldPosition(vec);
        vec.project(camara);
        var x = rect.left + (vec.x + 1) / 2 * rect.width;
        var y = rect.top + (1 - vec.y) / 2 * rect.height;
        s.etiqueta.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) translate(-50%,-50%)';
      }
      s.etiqueta.style.opacity = s.visible ? '1' : '0.5';
      s.etiqueta.hidden = false;
    }
    requestAnimationFrame(bucle);
  }

  function actualizarGuia() {
    if (!corriendo) return;
    var alguno = seguidos.some(function (s) { return s.visible; });
    guia.hidden = alguno;
    clearTimeout(temporizadorPista);
    if (!alguno) {
      guiaTexto.textContent = tx('apunta');
      temporizadorPista = setTimeout(function () {
        guiaTexto.innerHTML = Entiende.esc(tx('pista')) + ' <a href="' + Entiende.conIdioma('foto.html') +
          '" style="pointer-events:auto">' + Entiende.esc(tx('pistaFoto')) + '</a>.';
      }, CONFIG.pistaTras);
    }
  }
})();
