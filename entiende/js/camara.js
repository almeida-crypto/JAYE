/*
 * Entiende, opción 2: cámara con marcadores de imagen (MindAR + A-Frame).
 *
 * - Cada elemento de data/elementos.json con camara.targetIndex (0, 1, 2…) se
 *   asocia a la imagen número targetIndex dentro de targets/targets.mind.
 * - Cuando la cámara reconoce una tarjeta, aparece encima su nombre; al tocarlo
 *   se abre la ficha con la explicación (mismo JSON que el juego y la página).
 */
(function () {
  'use strict';

  var CONFIG = {
    targets: 'targets/targets.mind',  // generado con herramientas/compilar.html
    maxTrack: 2,                      // cuántas tarjetas se siguen a la vez (más = más lento)
    ocultarTras: 500,                 // ms que la etiqueta sigue visible tras perder la tarjeta
    pistaTras: 15000                  // ms sin detectar nada antes de mostrar consejos
  };

  var $ = function (id) { return document.getElementById(id); };
  var inicio = $('inicio'), estado = $('estado'), btn = $('btn-iniciar');
  var guia = $('guia'), guiaTexto = $('guia-texto'), capa = $('etiquetas');

  var escena = null;
  var seguidos = [];          // { el, target, ancla, etiqueta, visible, perdidoEn }
  var corriendo = false;
  var temporizadorPista = null;
  var THREE, vec;

  function mostrarEstado(html) { estado.innerHTML = html; }
  function error(msg) {
    mostrarEstado('<p class="aviso-error">' + msg + '</p>');
    btn.disabled = false;
    btn.textContent = 'Intentar de nuevo';
    inicio.hidden = false;
    guia.hidden = true;
  }

  // ---------- 1. Comprobaciones previas ----------
  if (!window.isSecureContext) {
    error('La cámara solo funciona con <b>HTTPS</b> (o en localhost). Abre el sitio desde su dirección https:// o usa la foto del altar.');
    return;
  }
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    error('Este navegador no permite usar la cámara. Prueba con Chrome o Safari actualizados, o usa la foto del altar.');
    return;
  }
  if (!window.AFRAME || !window.MINDAR) {
    error('No se cargaron las librerías de la cámara. Revisa tu conexión y recarga la página.');
    return;
  }

  // ---------- 2. Cargar datos y armar la escena ----------
  Entiende.cargarDatos().then(function (datos) {
    var conTarjeta = datos.elementos.filter(function (el) {
      return el.camara && typeof el.camara.targetIndex === 'number';
    });
    if (!conTarjeta.length) throw new Error('Ningún elemento tiene camara.targetIndex en elementos.json');
    crearEscena(conTarjeta);
  }).catch(function (e) {
    error('No se pudo preparar la cámara: ' + Entiende.esc(e.message));
  });

  function crearEscena(elementos) {
    THREE = AFRAME.THREE;
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
      // Punto donde se dibuja la etiqueta: el centro de la tarjeta
      // (1 unidad = ancho de la tarjeta; y positivo = hacia arriba).
      var ancla = document.createElement('a-entity');
      ancla.setAttribute('position', '0 0 0');
      target.appendChild(ancla);
      escena.appendChild(target);

      var etiqueta = document.createElement('button');
      etiqueta.className = 'etiqueta';
      etiqueta.hidden = true;
      etiqueta.innerHTML = '<strong>' + Entiende.esc(el.nombre) + '</strong><span>Toca para saber más</span>';
      etiqueta.addEventListener('click', function () { Entiende.mostrarFicha(el); });
      capa.appendChild(etiqueta);

      var s = { el: el, target: target, ancla: ancla, etiqueta: etiqueta, visible: false, perdidoEn: 0 };
      target.addEventListener('targetFound', function () {
        s.visible = true; s.perdidoEn = 0; actualizarGuia();
      });
      target.addEventListener('targetLost', function () {
        s.visible = false; s.perdidoEn = performance.now(); actualizarGuia();
      });
      seguidos.push(s);
    });

    escena.addEventListener('arReady', function () {
      inicio.hidden = true;
      corriendo = true;
      actualizarGuia();
      requestAnimationFrame(bucle);
    });
    escena.addEventListener('arError', function () {
      error('No pudimos abrir la cámara. Revisa que hayas dado permiso (ícono de candado junto a la dirección) o usa la foto del altar.');
    });

    var listo = function () {
      btn.disabled = false;
      btn.textContent = 'Activar cámara';
    };
    if (escena.hasLoaded) listo(); else escena.addEventListener('loaded', listo);

    $('ar').appendChild(escena);
  }

  // ---------- 3. Iniciar (con un toque del usuario: necesario en iPhone) ----------
  btn.addEventListener('click', function () {
    if (!escena) return;
    var sistema = escena.systems['mindar-image-system'];
    btn.disabled = true;
    btn.textContent = 'Abriendo cámara…';
    mostrarEstado('');
    if (sistema.video) {             // reintento tras un error: limpiar el intento anterior
      try { sistema.stop(); } catch (e) {}
    }
    try {
      sistema.start();
    } catch (e) {
      error('No se pudo iniciar la cámara: ' + Entiende.esc(e.message));
    }
  });

  // Apagar la cámara al salir de la página (ahorra batería)
  window.addEventListener('pagehide', function () {
    if (!escena || !corriendo) return;
    try { escena.systems['mindar-image-system'].stop(); } catch (e) {}
  });

  // ---------- 4. Etiquetas que siguen a cada tarjeta ----------
  function bucle() {
    if (!corriendo) return;
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
    var alguno = seguidos.some(function (s) { return s.visible; });
    guia.hidden = alguno;
    clearTimeout(temporizadorPista);
    if (!alguno) {
      guiaTexto.textContent = 'Apunta la cámara a una tarjeta del altar';
      temporizadorPista = setTimeout(function () {
        guiaTexto.innerHTML = '¿No la detecta? Acércate a unos 30–50 cm, ponte de frente y evita reflejos. ' +
          'También puedes <a href="foto.html" style="pointer-events:auto">ver la foto del altar</a>.';
      }, CONFIG.pistaTras);
    }
  }
})();
