/* rh Construction – gemeinsames Skript für alle Seiten. Jeder Teil prüft selbst, ob es sein Element gibt. */
(function () {
  var d = document;
  var alle = function (sel, wurzel) { return Array.prototype.slice.call((wurzel || d).querySelectorAll(sel)); };

  /* Kopfleiste: Haarlinie erst nach dem Scrollen */
  var kopf = d.getElementById('kopf');
  function kopfLinie() { kopf.classList.toggle('ist-gescrollt', window.scrollY > 8); }
  window.addEventListener('scroll', kopfLinie, { passive: true });
  kopfLinie();

  /* Menü am Handy */
  var menue = d.querySelector('.kopf__menue');
  var navMobil = d.getElementById('navigation-mobil');
  function menueSetzen(offen) {
    menue.setAttribute('aria-expanded', String(offen));
    d.body.classList.toggle('menue-offen', offen);
  }
  if (menue && navMobil) {
    menue.addEventListener('click', function () { menueSetzen(menue.getAttribute('aria-expanded') !== 'true'); });
    navMobil.addEventListener('click', function (e) { if (e.target.closest('a')) menueSetzen(false); });
  }

  /* Leistungsmenü am Desktop: Klick, Tastatur und Überfahren */
  var auf = d.querySelector('.nav__auf');
  var mega = d.getElementById('mega');
  var zuTimer;
  function megaSetzen(offen) {
    if (!auf) return;
    clearTimeout(zuTimer);
    auf.setAttribute('aria-expanded', String(offen));
    mega.hidden = !offen;
    kopf.classList.toggle('mega-offen', offen);
  }
  if (auf && mega) {
    var punkt = auf.closest('li');
    auf.addEventListener('click', function () { megaSetzen(auf.getAttribute('aria-expanded') !== 'true'); });
    if (window.matchMedia('(hover: hover)').matches) {
      punkt.addEventListener('mouseenter', function () { megaSetzen(true); });
      punkt.addEventListener('mouseleave', function () { zuTimer = setTimeout(function () { megaSetzen(false); }, 180); });
    }
    d.addEventListener('click', function (e) { if (!punkt.contains(e.target)) megaSetzen(false); });
    punkt.addEventListener('focusout', function (e) { if (e.relatedTarget && !punkt.contains(e.relatedTarget)) megaSetzen(false); });
  }

  d.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (d.body.classList.contains('menue-offen')) { menueSetzen(false); menue.focus(); }
    if (auf && auf.getAttribute('aria-expanded') === 'true') { megaSetzen(false); auf.focus(); }
  });

  /* Leistungsliste: Vorschaubild am Desktop */
  var liste = d.querySelector('.gewerke__liste');
  var bilder = alle('.gewerke__bild picture');
  if (liste && bilder.length) {
    var bildtext = d.querySelector('[data-bildtext]');
    var bildnr = d.querySelector('[data-bildnr]');
    var namen = bilder.map(function (p) { return p.getAttribute('data-gewerk'); });
    var zeige = function (a) {
      var name = a.getAttribute('data-gewerk');
      bilder.forEach(function (p) { p.classList.toggle('ist-aktiv', p.getAttribute('data-gewerk') === name); });
      if (bildtext) bildtext.textContent = a.getAttribute('data-bildtext') || '';
      var nr = namen.indexOf(name) + 1;
      if (bildnr && nr) bildnr.textContent = (nr < 10 ? '0' : '') + nr + ' / ' + namen.length;
    };
    alle('a', liste).forEach(function (a) {
      a.addEventListener('mouseenter', function () { zeige(a); });
      a.addEventListener('focus', function () { zeige(a); });
    });
  }

  /* Leistungsliste: für Eigentümer / für Unternehmen */
  var knoepfe = alle('[data-filter-knopf]');
  if (liste && knoepfe.length) {
    var texte = alle('[data-filter-text]');
    var filtern = function (wert) {
      knoepfe.forEach(function (k) { k.setAttribute('aria-pressed', String(k.getAttribute('data-filter-knopf') === wert)); });
      texte.forEach(function (t) { t.hidden = t.getAttribute('data-filter-text') !== wert; });
      alle('li', liste).forEach(function (li) {
        var passt = wert === 'alle' || (li.getAttribute('data-fuer') || '').split(' ').indexOf(wert) > -1;
        li.classList.toggle('ist-gedimmt', !passt);
      });
    };
    knoepfe.forEach(function (k) { k.addEventListener('click', function () { filtern(k.getAttribute('data-filter-knopf')); }); });
  }

  /* Anfrageformular: ohne Server – baut eine fertige E-Mail */
  var form = d.getElementById('anfrage-formular');
  if (form) {
    var feld = d.getElementById('f-anliegen');
    var hinweis = d.getElementById('formular-hinweis');
    var vorbelegt = '';
    var anliegen = new URLSearchParams(window.location.search).get('anliegen');
    if (anliegen && !feld.value) {
      vorbelegt = anliegen.slice(0, 80) + ': ';
      feld.value = vorbelegt;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var felder = [d.getElementById('f-name'), d.getElementById('f-telefon'), feld, d.getElementById('f-einwilligung')];
      for (var i = 0; i < felder.length; i++) {
        var f = felder[i];
        var leer = f.type === 'checkbox' ? !f.checked : (!f.value.trim() || f.value === vorbelegt);
        f.setAttribute('aria-invalid', String(leer));
        if (leer) {
          hinweis.textContent = f.type === 'checkbox'
            ? 'Bitte bestätigen Sie noch die Einwilligung.'
            : 'Bitte füllen Sie noch das Feld „' + d.querySelector('label[for="' + f.id + '"]').textContent + '“ aus.';
          f.focus();
          return;
        }
      }
      var name = felder[0].value.trim();
      var text = 'Name: ' + name + '\nTelefon: ' + felder[1].value.trim() + '\n\n' + feld.value.trim() + '\n';
      window.location.href = 'mailto:info@rhconstruction.de'
        + '?subject=' + encodeURIComponent('Anfrage über die Website – ' + name)
        + '&body=' + encodeURIComponent(text);
      hinweis.textContent = 'Ihr E-Mail-Programm öffnet sich mit der fertigen Nachricht. Bitte dort noch auf „Senden“ klicken.';
    });
  }
})();
