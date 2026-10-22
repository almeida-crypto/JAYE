/*
 * Entiende, opción 1: foto del altar con puntos tocables.
 * Las posiciones salen de data/elementos.json → elementos[].foto.{x,y} (en % de la foto).
 *
 * Modo edición: abre foto.html?editar y toca la foto; se muestran (y copian)
 * las coordenadas para pegarlas en el JSON.
 */
(function () {
  'use strict';

  var cont = document.getElementById('foto-altar');
  var img = document.getElementById('img-altar');
  var lista = document.getElementById('lista');
  var editar = new URLSearchParams(location.search).has('editar');

  Entiende.cargarDatos().then(function (datos) {
    img.src = Entiende.ruta(datos.altar.foto);
    img.alt = datos.altar.fotoAlt || 'Foto del altar';

    var conPunto = datos.elementos.filter(function (el) { return el.foto && el.foto.x != null; });

    conPunto.forEach(function (el, i) {
      var n = i + 1;

      var punto = document.createElement('button');
      punto.className = 'punto';
      punto.dataset.n = n;
      punto.style.left = el.foto.x + '%';
      punto.style.top = el.foto.y + '%';
      punto.setAttribute('aria-label', n + '. ' + el.nombre);
      punto.addEventListener('click', function (e) {
        e.stopPropagation();
        Entiende.mostrarFicha(el);
      });
      cont.appendChild(punto);

      var li = document.createElement('li');
      var b = document.createElement('button');
      b.innerHTML = '<b>' + n + '</b>' + Entiende.esc(el.nombre);
      b.addEventListener('click', function () { Entiende.mostrarFicha(el); });
      li.appendChild(b);
      lista.appendChild(li);
    });

    if (editar) activarEditor();
  }).catch(function (err) {
    cont.innerHTML = '<p class="aviso-error">No se pudo cargar la información del altar. ' +
      Entiende.esc(err.message) + '</p>';
  });

  function activarEditor() {
    var info = document.createElement('div');
    info.className = 'editor-info';
    info.textContent = 'Modo edición: toca la foto donde va cada elemento.';
    document.body.appendChild(info);

    img.style.cursor = 'crosshair';
    img.addEventListener('click', function (e) {
      var r = img.getBoundingClientRect();
      var x = Math.round(((e.clientX - r.left) / r.width) * 1000) / 10;
      var y = Math.round(((e.clientY - r.top) / r.height) * 1000) / 10;
      var txt = '"foto": { "x": ' + x + ', "y": ' + y + ' }';
      info.textContent = txt + '  (copiado)';
      if (navigator.clipboard) navigator.clipboard.writeText(txt).catch(function () {});
    });
  }
})();
