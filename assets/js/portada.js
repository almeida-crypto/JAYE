/* Portadas: papel picado en SVG y brillo que sigue al dedo o al ratón en las tarjetas. */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';

  // Papel picado: dibuja las banderitas dentro de cada <svg class="papel">
  function papelPicado(svg) {
    var cols = ['#e2457a', '#f08a1c', '#ffc72c', '#2e8b3d', '#7a3fa0', '#1f9a9a', '#c8102e', '#e2457a', '#f08a1c', '#ffc72c', '#2e8b3d', '#7a3fa0'];
    var W = 1200, H = 120, n = cols.length, w = W / n, fondo = '#140c1f', html = '';
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('preserveAspectRatio', 'xMidYMin slice');
    html += '<path d="M0 8 C 400 34 800 34 1200 8" stroke="#6b4a2a" stroke-width="4" fill="none"/>';
    for (var i = 0; i < n; i++) {
      var x = i * w + 5, ww = w - 10, top = 10 + Math.sin(Math.PI * (i + 0.5) / n) * 14, h = 96, zig = '';
      for (var k = 0; k <= 10; k++) zig += ' L' + (x + ww - k * ww / 10).toFixed(1) + ' ' + (top + h - (k % 2 ? 0 : 9)).toFixed(1);
      html += '<g class="bandera" style="transform-origin:' + (x + ww / 2).toFixed(1) + 'px ' + top.toFixed(1) + 'px;animation-delay:' + (-i * 0.37).toFixed(2) + 's">';
      html += '<path d="M' + x.toFixed(1) + ' ' + top.toFixed(1) + ' H' + (x + ww).toFixed(1) + zig + ' Z" fill="' + cols[i] + '"/>';
      var cx = x + ww / 2, cy = top + h * 0.5;
      for (var a = 0; a < 8; a++) {
        var ang = a * Math.PI / 4, ex = cx + 19 * Math.cos(ang), ey = cy + 19 * Math.sin(ang);
        html += '<ellipse cx="' + ex.toFixed(1) + '" cy="' + ey.toFixed(1) + '" rx="9" ry="4.5" transform="rotate(' + a * 45 + ' ' + ex.toFixed(1) + ' ' + ey.toFixed(1) + ')" fill="' + fondo + '"/>';
      }
      html += '<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="6" fill="' + fondo + '"/>';
      for (var p = 0; p < 5; p++) html += '<circle cx="' + (x + 11 + p * (ww - 22) / 4).toFixed(1) + '" cy="' + (top + 11).toFixed(1) + '" r="3" fill="' + fondo + '"/>';
      html += '</g>';
    }
    svg.innerHTML = html;
  }
  document.querySelectorAll('svg.papel').forEach(papelPicado);

  // Las banderitas se mecen un poco (si la persona no pidió reducir movimiento)
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var st = document.createElement('style');
    st.textContent = '.papel .bandera{animation:mecer 4.5s ease-in-out infinite}' +
      '@keyframes mecer{0%,100%{transform:rotate(-1.6deg)}50%{transform:rotate(1.6deg)}}';
    document.head.appendChild(st);
  }

  // Spotlight: guarda la posición del puntero en --x / --y
  document.querySelectorAll('.tile').forEach(function (t) {
    t.addEventListener('pointermove', function (e) {
      var r = t.getBoundingClientRect();
      t.style.setProperty('--x', (e.clientX - r.left) + 'px');
      t.style.setProperty('--y', (e.clientY - r.top) + 'px');
    });
    t.addEventListener('pointerdown', function () { t.classList.add('brilla'); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) {
      t.addEventListener(ev, function () { t.classList.remove('brilla'); });
    });
  });
})();
