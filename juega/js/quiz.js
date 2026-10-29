(function(){
  var lang = (function(){
    var q = new URLSearchParams(location.search).get('lang');
    if (q==='en'||q==='es') return q;
    try { var l = localStorage.getItem('jaye-idioma'); if (l==='en'||l==='es') return l; } catch(e){}
    return 'es';
  })();

  var banco = (typeof PREGUNTAS !== 'undefined') ? PREGUNTAS.slice() : [];
  var seleccion = [];
  function mezclar(arr){
    var a = arr.slice();
    for (var i=a.length-1;i>0;i--){
      var j = Math.floor(Math.random()*(i+1));
      var t=a[i]; a[i]=a[j]; a[j]=t;
    }
    return a;
  }

  function getEl(id){ return document.getElementById ? document.getElementById(id) : null; }
  function iniciar(){
    if (!banco || banco.length === 0){ alert(lang==='en'?'No questions loaded':'No hay preguntas cargadas'); return; }
    seleccion = mezclar(banco).slice(0,15);
    indice = 0; correctas = 0; totalSeg = 0; responded = false;
    var pi = getEl('pantalla-inicio'); if (pi) pi.hidden = true;
    var pr = getEl('pantalla-resultado'); if (pr) pr.hidden = true;
    var pq = getEl('pantalla-quiz'); if (pq) pq.hidden = false;
    mostrarPregunta();   // (mostrarPregunta arranca su propio temporizador)
  }

  var indice = 0, correctas = 0, totalSeg = 0, timer = null, responded = false, tiempoRest = 20;

  function iniciarTimer(){
    try { clearInterval(timer); } catch(e){}
    tiempoRest = 20; var t=getEl('tiempo'); if (t) t.textContent = tiempoRest;
    timer = setInterval(function(){
      tiempoRest--;
      var tt=getEl('tiempo'); if (tt) tt.textContent = tiempoRest;
      if (tiempoRest <= 0){
        try { clearInterval(timer); } catch(e){}
        if (!responded){
          responder(-1);
        }
      }
    }, 1000);
  }

  var opcionesBarajadas = []; // indices barajados para la pregunta actual
  function mostrarPregunta(){
    responded = false;
    if (!seleccion[indice]){ mostrarResultado(); return; }
    var p = seleccion[indice];
    var data = (p && lang==='en') ? p.en : (p ? p.es : null);
    if (!data){ mostrarResultado(); return; }
    var pn = getEl('preg-num'); if (pn) pn.textContent = indice+1;
    var pt = getEl('pregunta-texto'); if (pt) pt.textContent = data.p || '';
    var cont = getEl('opciones');
    if (!cont) return;
    cont.innerHTML = '';
    // Crear array de índices y barajarlos para que la respuesta no siempre esté en la misma posición
    var indices = [];
    for (var k = 0; k < (data.opciones||[]).length; k++) indices.push(k);
    opcionesBarajadas = mezclar(indices);
    opcionesBarajadas.forEach(function(origIdx){
      var btn = document.createElement('button');
      btn.className = 'opcion';
      btn.type = 'button';
      btn.textContent = data.opciones[origIdx];
      btn.onclick = function(){ responder(origIdx); };
      cont.appendChild(btn);
    });
    iniciarTimer();
  }

  function responder(sel){
    if (responded) return;
    responded = true;
    clearInterval(timer);
    var p = seleccion[indice];
    var data = lang==='en' ? p.en : p.es;
    var correcta = data.correcta;
    var botones = document.querySelectorAll('#opciones .opcion');
    // Cada botón en posición visual i corresponde al índice original opcionesBarajadas[i]
    botones.forEach(function(b, i){
      var origIdx = opcionesBarajadas[i];
      b.classList.add('bloqueada');
      if (origIdx === correcta) b.classList.add('correcta');
      else if (origIdx === sel) b.classList.add('incorrecta');
    });
    if (sel === correcta){
      correctas++;
      // bonus por tiempo: + max(0, tiempoRest) * 2
      totalSeg += tiempoRest * 2;
    }
    setTimeout(function(){
      indice++;
      if (indice < 15){
        mostrarPregunta();
      } else {
        mostrarResultado();
      }
    }, 900);
  }

  function mostrarResultado(){
    document.getElementById('pantalla-quiz').hidden = true;
    document.getElementById('pantalla-resultado').hidden = false;
    document.getElementById('res-correctas').textContent = correctas;
    var puntos = correctas * 100 + totalSeg;
    document.getElementById('res-puntos').textContent = puntos;
    var msg = document.getElementById('res-mensaje');
    if (lang==='en'){
      if (correctas >= 14) msg.textContent = 'Excellent!';
      else if (correctas >= 12) msg.textContent = 'Very good!';
      else if (correctas >= 10) msg.textContent = 'Good job!';
      else msg.textContent = 'Keep learning about Hanal Pixán.';
    } else {
      if (correctas >= 14) msg.textContent = '¡Excelente!';
      else if (correctas >= 12) msg.textContent = '¡Muy bien!';
      else if (correctas >= 10) msg.textContent = '¡Bien hecho!';
      else msg.textContent = 'Sigue aprendiendo sobre el Hanal Pixán.';
    }
    var input = document.getElementById('nombre-jugador');
    if (input){ input.value=''; input.placeholder = lang==='en'?'AAA':'AAA'; }
    document.getElementById('btn-guardar').disabled = false;
    cargarRanking();
    // check if top 10
    var key = 'jaye-quiz-ranking';
    var data = [];
    try { data = JSON.parse(localStorage.getItem(key) || '[]'); } catch(e){}
    var entra = data.length < 10;
    for (var i=0;i<Math.min(10,data.length);i++){ if (puntos > data[i].puntos){ entra = true; break; } if (puntos === data[i].puntos && data.length < 10){ entra = true; break; } }
    if (entra && input){
      if (lang==='en') msg.textContent = (msg.textContent?msg.textContent+' ':'') + 'Top 10! Enter 3 letters.';
      else msg.textContent = (msg.textContent?msg.textContent+' ':'') + '¡Top 10! Ingresa 3 letras.';
      input.focus();
    }
  }

  function cargarRanking(){
    var key = 'jaye-quiz-ranking';
    var data = [];
    try { data = JSON.parse(localStorage.getItem(key) || '[]'); } catch(e){}
    data.sort(function(a,b){ if (b.puntos!==a.puntos) return b.puntos-a.puntos; return (a.fecha||0)-(b.fecha||0); });
    try { localStorage.setItem(key, JSON.stringify(data.slice(0,50))); } catch(e){}
    function pintar(id){
      var ol = document.getElementById(id);
      if (!ol) return;
      ol.innerHTML = '';
      data.slice(0,10).forEach(function(r, i){
        var li = document.createElement('li');
        li.innerHTML = '<strong>' + (i+1) + '.</strong> ' + ((r.nombre||'-').toString().toUpperCase().slice(0,3)) + ' — ' + r.puntos + ' pts (' + r.correctas + '/15)';
        ol.appendChild(li);
      });
    }
    pintar('ranking-lista-inicio');
    pintar('ranking-lista-final');
  }

  function guardar(){
    var key = 'jaye-quiz-ranking';
    var input = document.getElementById('nombre-jugador');
    var nombre = (input.value || '').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,3);
    if (nombre.length < 3){ nombre = (lang==='en'?'AAA':'AAA'); }
    var puntos = parseInt(document.getElementById('res-puntos').textContent,10)||0;
    var correctasv = parseInt(document.getElementById('res-correctas').textContent,10)||0;
    var data = [];
    try { data = JSON.parse(localStorage.getItem(key) || '[]'); } catch(e){}
    data.push({nombre:nombre, puntos:puntos, correctas:correctasv, fecha: Date.now()});
    data.sort(function(a,b){ if (b.puntos!==a.puntos) return b.puntos-a.puntos; return a.fecha-b.fecha; });
    try { localStorage.setItem(key, JSON.stringify(data.slice(0,50))); } catch(e){}
    cargarRanking();
    document.getElementById('btn-guardar').disabled = true;
    if (input) input.value = nombre;
  }

  function compartir(){
    var puntos = document.getElementById('res-puntos').textContent;
    var c = document.getElementById('res-correctas').textContent;
    var txt = lang==='en'
      ? ('Hanal Pixán Quiz - ' + c + '/15 correct, ' + puntos + ' points! https://almeida-crypto.github.io/JAYE/juega/quiz.html')
      : ('Quiz Hanal Pixán - ' + c + '/15 correctas, ' + puntos + ' puntos! https://almeida-crypto.github.io/JAYE/juega/quiz.html');
    var url = 'https://wa.me/?text=' + encodeURIComponent(txt);
    window.open(url, '_blank');
  }

  function bind(){
    var b1 = document.getElementById('btn-comenzar');
    if (b1) b1.onclick = iniciar;
    var b2 = document.getElementById('btn-repetir');
    if (b2) b2.onclick = function(){ location.reload(); };
    var b3 = document.getElementById('btn-guardar');
    if (b3) b3.onclick = guardar;
    var b4 = document.getElementById('btn-compartir');
    if (b4) b4.onclick = compartir;
    cargarRanking();
  }
  if (document.readyState === 'loading'){
    try { document.addEventListener('DOMContentLoaded', bind); } catch(e){}
  } else {
    bind();
  }
})();
