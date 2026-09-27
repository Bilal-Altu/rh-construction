/* rh Construction – gemeinsames Skript. Jeder Teil prüft selbst, ob es sein Element gibt. */
(function () {
  var d = document;
  var alle = function (sel) { return Array.prototype.slice.call(d.querySelectorAll(sel)); };
  var ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Kopfleiste: Schatten erst nach dem Scrollen */
  var kopf = d.getElementById('kopf');
  function schatten() { kopf.classList.toggle('ist-gescrollt', window.scrollY > 40); }
  window.addEventListener('scroll', schatten, { passive: true });
  schatten();

  /* Menü am Handy */
  var menue = d.querySelector('.kopf__menue');
  var navMobil = d.getElementById('navigation-mobil');
  function menueSetzen(offen) { menue.setAttribute('aria-expanded', String(offen)); d.body.classList.toggle('menue-offen', offen); }
  if (menue && navMobil) {
    menue.addEventListener('click', function () { menueSetzen(menue.getAttribute('aria-expanded') !== 'true'); });
    navMobil.addEventListener('click', function (e) { if (e.target.closest('a')) menueSetzen(false); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && d.body.classList.contains('menue-offen')) { menueSetzen(false); menue.focus(); } });
  }

  /* Vorher / nachher */
  alle('.vorher-nachher').forEach(function (box) {
    var regler = box.querySelector('input');
    var setzen = function () { box.style.setProperty('--pos', regler.value + '%'); };
    regler.addEventListener('input', setzen);
    setzen();
  });

  /* Zahlen zählen hoch, wenn sie ins Bild kommen – wie auf der alten Seite, aber nur einmal und nicht bei reduzierter Bewegung */
  var zahlen = alle('[data-zahl]');
  if (zahlen.length && !ruhig && 'IntersectionObserver' in window) {
    var beobachter = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (!e.isIntersecting) return;
        beobachter.unobserve(e.target);
        var el = e.target, ziel = +el.getAttribute('data-zahl'), zusatz = el.getAttribute('data-zusatz') || '', start = null;
        var schritt = function (t) {
          if (!start) start = t;
          var anteil = Math.min((t - start) / 1400, 1);
          var wert = Math.round(ziel * (1 - Math.pow(1 - anteil, 3)));
          el.textContent = wert.toLocaleString('de-DE') + zusatz;
          if (anteil < 1) requestAnimationFrame(schritt);
        };
        requestAnimationFrame(schritt);
      });
    }, { threshold: 0.6 });
    zahlen.forEach(function (el) { beobachter.observe(el); });
  }

  /* Anfrageformular: ohne Server – baut eine fertige E-Mail */
  var form = d.getElementById('anfrage-formular');
  if (form) {
    var feld = d.getElementById('f-nachricht');
    var hinweis = d.getElementById('formular-hinweis');
    var vorbelegt = '';
    var anliegen = new URLSearchParams(window.location.search).get('anliegen');
    if (anliegen && !feld.value) { vorbelegt = 'Anfrage: ' + anliegen.slice(0, 80) + '\n\n'; feld.value = vorbelegt; }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var pflicht = [d.getElementById('f-name'), d.getElementById('f-telefon'), feld, d.getElementById('f-einwilligung')];
      for (var i = 0; i < pflicht.length; i++) {
        var f = pflicht[i];
        var leer = f.type === 'checkbox' ? !f.checked : (!f.value.trim() || f.value === vorbelegt);
        f.setAttribute('aria-invalid', String(leer));
        if (leer) {
          hinweis.textContent = f.type === 'checkbox'
            ? 'Bitte bestätigen Sie noch die Einwilligung.'
            : 'Bitte füllen Sie noch das Feld „' + d.querySelector('label[for="' + f.id + '"]').firstChild.textContent.trim() + '“ aus.';
          f.focus();
          return;
        }
      }
      var name = pflicht[0].value.trim();
      var mail = d.getElementById('f-mail').value.trim();
      var text = 'Name: ' + name + '\nTelefon: ' + pflicht[1].value.trim() + (mail ? '\nE-Mail: ' + mail : '') + '\n\n' + feld.value.trim() + '\n';
      window.location.href = 'mailto:info@rhconstruction.de'
        + '?subject=' + encodeURIComponent('Anfrage über die Website – ' + name)
        + '&body=' + encodeURIComponent(text);
      hinweis.textContent = 'Ihr E-Mail-Programm öffnet sich mit der fertigen Nachricht. Bitte dort noch auf „Senden“ klicken.';
    });
  }
})();
