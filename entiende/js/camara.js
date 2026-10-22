/*
 * Entiende, opción 2: cámara con marcadores de imagen (MindAR + A-Frame).
 *
 * El altar se divide en "zonas" (partes). Cada zona tiene su propio archivo
 * targets/<zona>.mind con sus tarjetas; así la página carga menos y reconoce más rápido.
 * Cada elemento de data/elementos.json tiene camara.zona y camara.targetIndex
 * (posición de su tarjeta dentro del .mind de esa zona).
 *
 * URL: camara.html?zona=comida&lang=en   (auto=1 enciende la cámara sin pedir el botón)
 */
(function () {
  'use strict';

  var CONFIG = {
    carpetaTargets: 'targets/',   // targets/<zona>.mind, generado con herramientas/compilar.html
    maxTrack: 2,                  // cuántas tarjetas se siguen a la vez (más = más lento)
    ocultarTras: 500,             // ms que la etiqueta sigue visible tras perder la tarjeta
    pistaTras: 15000              // ms sin detectar nada antes de mostrar consejos
  };

  var $ = function (id) { return document.getElementById(id); };
  var inicio = $('inicio'), estado = $('estado'), btn = $('btn-iniciar');
  var guia = $('guia'), guiaTexto = $('guia-texto'), capa = $('etiquetas');
  var navZonas = $('zonas'), navZonasAR = $('zonas-ar'), tituloZona = $('titulo-zona');

  var params = new URLSearchParams(location.search);
  var datos = null, zona = null, escena = null;
  var seguidos = [];   // { el, ancla, etiqueta, visible, perdidoEn }
  var corriendo = false, temporizadorPista = null, vec = null, estadoBoton = 'cargando';

  function tx(k) { return Entiende.tx(k); }
  function mostrarEstado(html) { estado.innerHTML = html; }
  function ponerBoton(clave, activo) {
    estadoBoton = clave;
    btn.textContent = tx(clave);
    btn.disabled = !activo;
  }
  function error(msg) {
    mostrarEstado('<p class="aviso-error">' + msg + '</p>');
    ponerBoton('reintentar', true);
    inicio.hidden = false;
    guia.hidden = true;
    navZonasAR.hidden = true;
  }

  // ---------- 1. Comprobaciones previas ----------
  if (!window.isSecureContext) { error(tx('errHttps')); btn.disabled = true; return; }
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { error(tx('errNavegador')); btn.disabled = true; return; }
  if (!window.AFRAME || !window.MINDAR) { error(tx('errLibs')); btn.disabled = true; return; }

  // ---------- 2. Cargar datos ----------
  Entiende.cargarDatos().then(function (d) {
    datos = d;
    var zonas = Object.keys(d.zonas);
    zona = zonas.indexOf(params.get('zona')) >= 0 ? params.get('zona') : zonas[0];
    pintarZonas();
    prepararEscena();
  }).catch(function (e) {
    error(tx('errPreparar') + Entiende.esc(e.message));
  });

  document.addEventListener('idioma:cambio', function () {
    if (!datos) return;
    pintarZonas();
    ponerBoton(estadoBoton, !btn.disabled);
    seguidos.forEach(function (s) { pintarEtiqueta(s); });
    actualizarGuia();
  });

  function pintarZonas() {
    [navZonas, navZonasAR].forEach(function (nav) {
      nav.innerHTML = '';
      Object.keys(datos.zonas).forEach(function (z) {
        var info = datos.zonas[z];
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'zona';
        b.style.setProperty('--color-zona', info.color);
        b.innerHTML = '<i aria-hidden="true"></i>' + Entiende.esc(Entiende.t(info));
        if (z === zona) b.setAttribute('aria-current', 'true');
        b.addEventListener('click', function () { elegirZona(z); });
        nav.appendChild(b);
      });
    });
    tituloZona.textContent = Entiende.t(datos.zonas[zona]);
  }

  function elegirZona(z) {
    if (z === zona) return;
    if (corriendo) {
      // Con la cámara ya encendida, lo más fiable es recargar con la nueva zona
      var url = new URL(location.href);
      url.searchParams.set('zona', z);
      url.searchParams.set('auto', '1');
      url.searchParams.set('lang', Entiende.idioma);
      location.replace(url);
      return;
    }
    zona = z;
    var url2 = new URL(location.href);
    url2.searchParams.set('zona', z);
    history.replaceState(null, '', url2);
    pintarZonas();
    prepararEscena();
  }

  // ---------- 3. Escena de A-Frame + MindAR para la zona elegida ----------
  function prepararEscena() {
    if (escena) {
      // MindAR intenta apagar la cámara al quitar la escena; si nunca se encendió, eso falla
      var sis = escena.systems['mindar-image-system'];
      if (sis && !sis.video) sis.stop = function () {};
      escena.parentNode.removeChild(escena);
      escena = null;
    }
    capa.innerHTML = '';
    seguidos = [];
    ponerBoton('cargando', false);

    var elementos = datos.elementos.filter(function (el) {
      return el.camara && el.camara.zona === zona && typeof el.camara.targetIndex === 'number';
    });
    if (!elementos.length) { error(tx('errPreparar') + 'zona sin tarjetas'); return; }

    var THREE = AFRAME.THREE;
    vec = new THREE.Vector3();

    escena = document.createElement('a-scene');
    escena.setAttribute('mindar-image',
      'imageTargetSrc: ' + CONFIG.carpetaTargets + zona + '.mind' +
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
      navZonasAR.hidden = false;
      corriendo = true;
      actualizarGuia();
      requestAnimationFrame(bucle);
    });
    escena.addEventListener('arError', function () { corriendo = false; error(tx('errCamara')); });

    var listo = function () {
      ponerBoton('activar', true);
      if (params.get('auto') === '1') { params.delete('auto'); iniciar(); }
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
