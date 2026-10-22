/*
 * Entiende, opción 1: foto del altar con puntos tocables + lista por categorías.
 * Los puntos salen de data/elementos.json → elementos[].foto.{x,y} (en % de la foto);
 * los elementos con "foto": null solo aparecen en la lista.
 *
 * Modo edición: abre foto.html?editar y toca la foto; se muestran (y copian)
 * las coordenadas para pegarlas en el JSON.
 */
(function () {
  'use strict';

  var cont = document.getElementById('foto-altar');
  var img = document.getElementById('img-altar');
  var grupos = document.getElementById('grupos');
  var editar = new URLSearchParams(location.search).has('editar');
  var datos = null;

  Entiende.cargarDatos().then(function (d) {
    datos = d;
    img.src = Entiende.ruta(d.altar.foto);
    pintar();
    if (editar) activarEditor();
  }).catch(function (err) {
    cont.innerHTML = '<p class="aviso-error">' + Entiende.tx('errorDatos') + ' ' + Entiende.esc(err.message) + '</p>';
  });

  document.addEventListener('idioma:cambio', function () { if (datos) pintar(); });

  function pintar() {
    img.alt = Entiende.t(datos.altar.fotoAlt);
    cont.querySelectorAll('.punto').forEach(function (p) { p.remove(); });
    grupos.innerHTML = '';

    datos.elementos.forEach(function (el) {
      if (!el.foto || el.foto.x == null) return;
      var punto = document.createElement('button');
      punto.className = 'punto';
      punto.dataset.n = el.n;
      punto.style.left = el.foto.x + '%';
      punto.style.top = el.foto.y + '%';
      punto.setAttribute('aria-label', el.n + '. ' + Entiende.t(el.nombre));
      punto.addEventListener('click', function (e) { e.stopPropagation(); Entiende.mostrarFicha(el); });
      cont.appendChild(punto);
    });

    Object.keys(datos.categorias).forEach(function (cat) {
      var del = datos.elementos.filter(function (el) { return el.categoria === cat; });
      if (!del.length) return;
      var sec = document.createElement('section');
      sec.className = 'grupo';
      sec.innerHTML = '<h2>' + Entiende.esc(Entiende.t(datos.categorias[cat])) + '</h2>';
      var ul = document.createElement('ul');
      ul.className = 'lista';
      del.forEach(function (el) {
        var li = document.createElement('li');
        var b = document.createElement('button');
        b.innerHTML = '<b>' + el.n + '</b>' + Entiende.esc(Entiende.t(el.nombre)) +
          (el.maya.nombre ? '<small lang="yua">' + Entiende.esc(el.maya.nombre) + '</small>' : '');
        b.addEventListener('click', function () { Entiende.mostrarFicha(el); });
        li.appendChild(b);
        ul.appendChild(li);
      });
      sec.appendChild(ul);
      grupos.appendChild(sec);
    });
  }

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
