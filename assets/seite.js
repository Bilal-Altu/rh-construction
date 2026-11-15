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


  /* Versand an kontakt.php – SideTwo-Kontaktformular-Standard (nie über die Mail-App) */
  function stSenden(form, betreff, melden) {
    var daten = new FormData(form);
    if (betreff) daten.set("betreff", betreff);
    var knopf = form.querySelector('[type="submit"]');
    if (knopf) knopf.disabled = true;
    if (!melden) {
      var st = form.querySelector(".st-status");
      if (!st) {
        st = document.createElement("p");
        st.className = "st-status";
        st.setAttribute("role", "status");
        st.setAttribute("aria-live", "polite");
        st.style.marginTop = "12px";
        st.style.fontWeight = "600";
        form.appendChild(st);
      }
      melden = function (ok, text) { st.textContent = text; };
    }
    return fetch(form.getAttribute("action") || "kontakt.php", {
      method: "POST", body: daten, headers: { "X-Requested-With": "fetch" }, credentials: "same-origin"
    })
      .then(function (r) { return r.json(); })
      .catch(function () { return { ok: false, text: "Das Formular konnte gerade nicht gesendet werden. Bitte rufen Sie uns kurz an." }; })
      .then(function (a) {
        if (knopf) knopf.disabled = !!a.ok;
        melden(!!a.ok, a.text);
        if (a.ok) form.reset();
        return a;
      });
  }

  /* Anfrageformular: Versand per PHP (kontakt.php) */
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
      hinweis.textContent = 'Wird gesendet …';
      stSenden(form, 'Anfrage über die Website – ' + name, function (ok, t) { hinweis.textContent = t; });
    });
  }
})();
