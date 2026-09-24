// Inhalte aller Seiten. Jede Funktion bekommt den Kontext s der jeweiligen Seite
// (s.u() für relative Links, s.bild() für Bilder) und liefert Titel, Text und Schema.

import { BETRIEB, esc, krumenSchema, fragenSchema, ANBIETER, DOMAIN, pfeil } from "./helfer.mjs";
import { LEISTUNGEN, ALLGEMEINER_ABLAUF } from "./leistungen.mjs";

/* ====================================================================== */
/* Projekte                                                               */
/* ====================================================================== */

export const PROJEKTE = {
  kamue: {
    slug: "kamue-buerstadt",
    name: "KamÜ – Kultur am Übergang",
    ort: "Bürstadt",
    titel: "Aus einem leeren Getreidelager wurde ein Kulturhaus.",
    kurz: "Ein leerstehendes Lager gegenüber dem Bahnhof, entkernt und innen wie außen neu aufgebaut. Heute ein Haus für Kurse, Yoga und Veranstaltungen.",
    bilder: [
      ["kamue-vorher", "Das alte Lagergebäude vor dem Umbau"],
      ["kamue-nachher", "Dasselbe Gebäude nach dem Umbau"],
    ],
  },
  prisman: {
    slug: "prisman-lorsch",
    name: "Prisman",
    ort: "Lorsch",
    titel: "Produktionshalle umgebaut – mit lebensmitteltauglichem Boden.",
    kurz: "Außen Erdarbeiten und Zufahrten, innen ein neuer Hallenboden, saniertes Tragwerk und neu geordnete Technik – bis zur Inbetriebnahme.",
    bilder: [
      ["prisman-halle", "Produktionshalle mit beschichtetem Boden und Galerie"],
      ["prisman-linie", "Halle mit Förderband und neu geführten Leitungen"],
    ],
  },
};

/* ====================================================================== */
/* Wiederkehrende Bausteine                                               */
/* ====================================================================== */

const ALLGEMEINE_FRAGEN = [
  ["Übernehmen Sie auch kleine Aufträge?", "Ja. Ein einzelnes Bad oder ein Balkon bekommt bei uns dieselbe Sorgfalt wie eine ganze Halle."],
  ["Was kostet ein Umbau oder eine Sanierung?", "Das hängt vom Bestand ab. Deshalb nennen wir am Telefon keine Pauschalpreise, sondern kommen vorbei und rechnen dann genau – so aufgeschlüsselt, dass Sie sehen, wo sich sparen lässt."],
  ["Wie lange dauert es?", "Das steht im Terminplan, den Sie mit dem Angebot bekommen. Weil alle Gewerke aus einem Haus kommen, wartet niemand auf den nächsten Handwerker: Fliesenleger, Installateur und Maler sind aufeinander abgestimmt."],
  ["Wie viel Dreck und Lärm entsteht?", "Lärm lässt sich beim Umbau nicht vermeiden, Staub zum größten Teil schon. Wir trennen die Arbeitsbereiche mit Staubwänden ab, decken Böden und Möbel ab und verlassen die Baustelle aufgeräumt."],
  ["Kann unser Betrieb während des Umbaus weiterlaufen?", "Meistens ja. Wir teilen den Umbau in Abschnitte und stimmen Zeiten und Wege mit Ihnen ab, damit Kunden und Mitarbeiter möglichst wenig davon merken."],
  ["In welchem Gebiet arbeiten Sie?", "Von Bürstadt aus vor allem in Lampertheim, Biblis, Lorsch, Worms und Viernheim, an der Bergstraße und in Mannheim, dazu im Rhein-Main-Gebiet. Gewerbliche Projekte betreuen wir auch europaweit."],
  ["Welche Gewährleistung bekomme ich?", "Die gesetzliche: bei Arbeiten an einem Bauwerk fünf Jahre nach BGB, bei Verträgen nach VOB/B vier Jahre. In dieser Zeit sind wir für Mängel an unserer Arbeit Ihr Ansprechpartner."],
];

const anfrageLink = (s, anliegen) => s.u("kontakt/") + "?anliegen=" + encodeURIComponent(anliegen);

function gewerkeListe(s, { kurz = false, filter = false } = {}) {
  const zeilen = LEISTUNGEN.map((l) => `
          <li data-fuer="${l.fuer.join(" ")}"><a href="${s.u(`leistungen/${l.slug}/`)}" data-gewerk="${l.slug}" data-bildtext="${esc(l.bildtext)}">
            <span class="nr">${l.nr}</span><h3>${esc(l.name)}</h3>
            <p>${esc(l.kurz)}</p>
            <span class="mehr"><span>Mehr </span><span aria-hidden="true">→</span></span></a></li>`).join("");
  const vorschau = LEISTUNGEN.map((l, i) => s.bild(l.vorschau, { sizes: "(min-width: 1024px) 40vw, 1px", attr: ` data-gewerk="${l.slug}"${i === 0 ? ' class="ist-aktiv"' : ""}` })).join("\n            ");
  const filterHtml = filter ? `
        <div class="filter" role="group" aria-label="Leistungen zeigen für">
          <button type="button" data-filter-knopf="alle" aria-pressed="true">Alle</button>
          <button type="button" data-filter-knopf="privat" aria-pressed="false">Für Eigentümer</button>
          <button type="button" data-filter-knopf="gewerbe" aria-pressed="false">Für Unternehmen</button>
        </div>
        <p class="filter__text" data-filter-text="alle" aria-live="polite">Sie müssen keine Handwerker zusammensuchen und abstimmen. Wir übernehmen ein einzelnes Gewerk oder den ganzen Umbau – und stehen für das Ergebnis gerade.</p>
        <p class="filter__text" data-filter-text="privat" hidden><strong>Für Eigentümer:</strong> Sie beauftragen uns einmal, wir kümmern uns um alle Handwerker. <a href="${s.u("fuer-eigentuemer/")}">Mehr für Eigentümer</a></p>
        <p class="filter__text" data-filter-text="gewerbe" hidden><strong>Für Unternehmen:</strong> Wir arbeiten für Banken, Immobilienverwalter und Produktionsbetriebe. <a href="${s.u("fuer-unternehmen/")}">Mehr für Unternehmen</a></p>` : "";
  return { filterHtml, liste: `
      <div class="gewerke">
        <ol class="gewerke__liste${kurz ? " gewerke__liste--kurz" : ""}">${zeilen}
        </ol>
        <figure class="gewerke__bild" aria-hidden="true">
          <div class="rahmen-bild">
            ${vorschau}
          </div>
          <figcaption><span data-bildtext>${esc(LEISTUNGEN[0].bildtext)}</span><span data-bildnr>01 / 12</span></figcaption>
        </figure>
      </div>` };
}

function kundenListe() {
  return `<div class="kunden">
        <p class="kunden__titel">Gebaut unter anderem für</p>
        <ul>${BETRIEB.kunden.map((k) => `<li>${k}</li>`).join("")}</ul>
      </div>`;
}

function fragenBlock(titel, fragen, { id = "fragen", zusatz = "" } = {}) {
  return `<section class="abschnitt abschnitt--linie" id="${id}" aria-labelledby="${id}-h">
    <div class="rahmen fragen">
      <div class="fragen__kopf">
        <h2 id="${id}-h" class="h2-klein">${titel}</h2>
        ${zusatz}
      </div>
      <dl>
        ${fragen.map(([f, a]) => `<div><dt>${f}</dt><dd>${a}</dd></div>`).join("\n        ")}
      </dl>
    </div>
  </section>`;
}

function projektkarte(s, key, { klein = false } = {}) {
  const p = PROJEKTE[key];
  const bilder = (klein ? p.bilder.slice(1, 2) : p.bilder).map(([n, alt]) => s.bild(n, { alt, sizes: klein ? "(min-width: 1024px) 34vw, 100vw" : "(min-width: 1024px) 30vw, 50vw" })).join("");
  return `<a class="projektkarte${klein ? " projektkarte--klein" : ""}" href="${s.u(`projekte/${p.slug}/`)}">
        <div class="projektkarte__bilder">${bilder}</div>
        <div>
          <p class="projektkarte__ort">${esc(p.name)}, ${esc(p.ort)}</p>
          <h3>${esc(p.titel)}</h3>
          <p>${esc(p.kurz)}</p>
          <span class="textlink">Zum Projekt ${pfeil}</span>
        </div>
      </a>`;
}

function verwandtListe(s, slugs) {
  return `<div class="verwandt">${slugs.map((slug) => {
    const l = s.leistung(slug);
    return `<a href="${s.u(`leistungen/${l.slug}/`)}"><strong>${esc(l.name)} ${pfeil}</strong><span class="kurz">${esc(l.kurz)}</span></a>`;
  }).join("")}</div>`;
}

function schritteListe(schritte, { quer = false } = {}) {
  return `<ol class="schritte${quer ? " schritte--quer" : ""}">
          ${schritte.map(([t, p]) => `<li><h3>${t}</h3><p>${p}</p></li>`).join("\n          ")}
        </ol>`;
}

function vergleichKamue(s) {
  return `<div class="vergleich">
        <figure>
          ${s.bild("kamue-vorher", { alt: "Das alte Lagergebäude vor dem Umbau: grauer Putz, vernagelte Tore, Graffiti, davor ein Radlader", sizes: "(min-width: 768px) 50vw, 50vw" })}
          <span class="marke">Vorher</span>
          <figcaption><strong>Industriestraße, Bürstadt</strong> Leerstehendes Lager, Baustelle eingerichtet</figcaption>
        </figure>
        <figure>
          ${s.bild("kamue-nachher", { alt: "Dasselbe Gebäude nach dem Umbau: frisch verputzte helle Fassade, grauer Sockel, neue Fenster und Dachrinnen", sizes: "(min-width: 768px) 50vw, 50vw" })}
          <span class="marke marke--nachher">Nachher</span>
          <figcaption><strong>KamÜ – Kultur am Übergang</strong> Eröffnet im Mai 2023</figcaption>
        </figure>
      </div>`;
}

function formular(s) {
  return `<form class="formular" id="anfrage-formular" novalidate>
          <div class="zwei">
            <div class="feld">
              <label for="f-name">Name</label>
              <input id="f-name" name="name" type="text" autocomplete="name" required>
            </div>
            <div class="feld">
              <label for="f-telefon">Telefon</label>
              <input id="f-telefon" name="telefon" type="tel" autocomplete="tel" inputmode="tel" required>
            </div>
          </div>
          <div class="feld">
            <label for="f-anliegen">Worum geht es?</label>
            <textarea id="f-anliegen" name="anliegen" rows="5" required placeholder="z. B. Bad im Obergeschoss erneuern, ca. 8 m², in Lampertheim"></textarea>
          </div>
          <label class="haken" for="f-einwilligung">
            <input id="f-einwilligung" name="einwilligung" type="checkbox" required>
            <span>Ich bin einverstanden, dass die rh Construction GmbH meine Angaben zur Bearbeitung dieser Anfrage verwendet. Mehr dazu in der <a href="${s.u("datenschutz/")}">Datenschutzerklärung</a>.</span>
          </label>
          <button class="knopf" type="submit">Anfrage senden ${pfeil}</button>
          <p class="formular__hinweis" id="formular-hinweis" aria-live="polite">Beim Senden öffnet sich Ihr E-Mail-Programm mit der fertigen Nachricht.</p>
        </form>`;
}

const STANDARD_ABSCHLUSS = (s) => ({
  titel: "Erzählen Sie uns, was Sie vorhaben.",
  text: "Zwei, drei Sätze reichen. Wir rufen Sie zurück und machen einen Termin vor Ort aus.",
  knopf: "Anfrage stellen",
  href: s.u("kontakt/"),
});

/* ====================================================================== */
/* Startseite                                                             */
/* ====================================================================== */

function startseite(s) {
  const { liste } = gewerkeListe(s, { kurz: true });
  const schema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": DOMAIN + "#betrieb",
    name: BETRIEB.name,
    slogan: "Bauen ohne Limit",
    url: DOMAIN,
    logo: DOMAIN + "bilder/logo.png",
    image: DOMAIN + "bilder/teilen.jpg",
    telephone: BETRIEB.telefonSchema,
    email: BETRIEB.mail,
    foundingDate: "2005",
    founder: { "@type": "Person", name: "Rainer Hühn", jobTitle: "Geschäftsführer", honorificPrefix: "Dipl.-Ing." },
    numberOfEmployees: { "@type": "QuantitativeValue", value: 25 },
    address: { "@type": "PostalAddress", streetAddress: BETRIEB.strasse, postalCode: BETRIEB.plz, addressLocality: BETRIEB.ort, addressRegion: "Hessen", addressCountry: "DE" },
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:30", closes: "16:00" }],
    areaServed: [...BETRIEB.orte.map((o) => ({ "@type": "City", name: o })), { "@type": "AdministrativeArea", name: "Kreis Bergstraße" }, { "@type": "AdministrativeArea", name: "Metropolregion Rhein-Neckar" }],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Leistungen",
      itemListElement: LEISTUNGEN.map((l) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: l.name, url: DOMAIN + `leistungen/${l.slug}/` } })),
    },
    sameAs: [BETRIEB.facebook, BETRIEB.instagram],
  };
  return {
    pfad: "",
    bereich: "start",
    titel: "Umbau und Sanierung in Bürstadt | rh Construction GmbH",
    ogTitel: "Umbau und Sanierung in Bürstadt – vom Bad bis zur Werkshalle",
    beschreibung: "Umbau und Sanierung in Bürstadt: Bad, Balkon, Büro oder Werkshalle – zwölf Gewerke aus einer Hand, seit 2005. Jetzt Termin vor Ort anfragen.",
    schema: [schema],
    abschluss: STANDARD_ABSCHLUSS(s),
    inhalt: `
  <section class="titel rahmen" aria-labelledby="titel-h">
    <div class="titel__kopf">
      <h1 id="titel-h">
        <span class="titel__ort">Umbau und Sanierung in Bürstadt</span>
        <span class="titel__satz">Vom Bad bis zur Werkshalle.</span>
      </h1>
      <div class="titel__seite">
        <p>Alle Gewerke aus einer Hand, für Bürstadt und die Region zwischen Worms, Mannheim und der Bergstraße.</p>
        <a class="knopf" href="${s.u("kontakt/")}">Projekt anfragen ${pfeil}</a>
      </div>
    </div>
    <div class="tueren">
      <a class="tuer tuer--privat" href="${s.u("fuer-eigentuemer/")}">
        <div class="tuer__bild">${s.bild("titel-bad", { alt: "Bodengleiche Dusche mit blau gemusterten Zementfliesen und großformatigen Wandplatten", sizes: "(min-width: 768px) 40vw, 100vw", prio: true })}</div>
        <span class="tuer__text"><strong>Für Eigentümer</strong> <span>Bad, Balkon, Altbau, Garten, Pool</span> <b class="pfeil" aria-hidden="true">→</b></span>
      </a>
      <a class="tuer tuer--gewerbe" href="${s.u("fuer-unternehmen/")}">
        <div class="tuer__bild">${s.bild("titel-halle", { alt: "Umgebaute Produktionshalle mit beschichtetem Boden, blauer Wand und neu verlegten Leitungen", sizes: "(min-width: 768px) 58vw, 100vw", prio: true })}</div>
        <span class="tuer__text"><strong>Für Unternehmen</strong> <span>Hallen, Büros, Praxen, Gastronomie</span> <b class="pfeil" aria-hidden="true">→</b></span>
      </a>
    </div>
  </section>

  <section class="belege rahmen" aria-labelledby="belege-h">
    <h2 class="belege__satz" id="belege-h">Seit <b>2005</b> am Bau. Über <b>4.000</b> Aufträge, <b>20</b> eigene Leute auf der Baustelle, <b>5</b> im Büro.</h2>
    ${kundenListe()}
  </section>

  <section class="abschnitt abschnitt--linie" id="leistungen" aria-labelledby="leistungen-h">
    <div class="rahmen">
      <div class="kopfzeile">
        <h2 id="leistungen-h">Zwölf Gewerke aus Bürstadt, ein Ansprechpartner.</h2>
        <p class="vorspann">Sie müssen keine Handwerker zusammensuchen und abstimmen. Wir übernehmen ein einzelnes Gewerk oder den ganzen Umbau.</p>
      </div>
      ${liste}
      <p class="gewerke__fuss"><a class="textlink" href="${s.u("leistungen/")}">Alle Leistungen im Überblick ${pfeil}</a></p>
    </div>
  </section>

  <section class="abschnitt abschnitt--linie" id="projekte" aria-labelledby="projekte-h">
    <div class="rahmen">
      <div class="kopfzeile">
        <h2 id="projekte-h">${PROJEKTE.kamue.titel}</h2>
        <p class="vorspann">Das KamÜ – Kultur am Übergang – steht gegenüber dem Bahnhof in Bürstadt. Wir haben das Gebäude entkernt und innen wie außen neu aufgebaut. <a class="textlink" href="${s.u("projekte/kamue-buerstadt/")}">Zum Projekt ${pfeil}</a></p>
      </div>
      ${vergleichKamue(s)}
      <div style="margin-top: clamp(56px, 8vw, 112px)">
        ${projektkarte(s, "prisman", { klein: true })}
      </div>
      <p class="gewerke__fuss"><a class="textlink" href="${s.u("projekte/")}">Alle Projekte ${pfeil}</a></p>
    </div>
  </section>

  <section class="abschnitt abschnitt--linie" id="ablauf" aria-labelledby="ablauf-h">
    <div class="rahmen ablauf">
      <figure class="ablauf__bild ablauf__bild--handy-weg">
        ${s.bild("staubwand", { alt: "Staubschutzwand aus Folie trennt einen bewohnten Raum von der Baustelle ab", sizes: "(min-width: 1024px) 40vw, 100vw" })}
        <figcaption>Staubwand bei einer Sanierung: Der Rest des Hauses bleibt bewohnbar.</figcaption>
      </figure>
      <div>
        <h2 id="ablauf-h">Sie wissen vorher, was es kostet und wann es fertig ist.</h2>
        ${schritteListe(ALLGEMEINER_ABLAUF)}
        <p class="ablauf__weiter"><a class="knopf" href="${s.u("kontakt/")}">Termin vor Ort vereinbaren ${pfeil}</a></p>
      </div>
    </div>
  </section>

  <section class="abschnitt abschnitt--flaeche betrieb" id="betrieb" aria-labelledby="betrieb-h">
    <div class="rahmen betrieb__innen">
      <figure class="betrieb__bild">
        ${s.bild("huehn", { alt: "Rainer Hühn, Geschäftsführer der rh Construction GmbH, mit verschränkten Armen vor heller Wand", sizes: "(min-width: 1024px) 420px, 124px" })}
        <figcaption><strong>Dipl.-Ing. Rainer Hühn</strong> Bauingenieur, Gründer und Geschäftsführer</figcaption>
      </figure>
      <div>
        <h2 id="betrieb-h">Das rh im Namen steht für Rainer Hühn.</h2>
        <blockquote class="zitat"><p>Wir bauen schnell, sauber und in bester Qualität. Daran lasse ich mich täglich messen.</p></blockquote>
        <div class="betrieb__text">
          <p>Gegründet hat er den Betrieb mit dem Anspruch, handwerkliche Qualität und durchdachte Baukonzepte aus einer Hand zu liefern. Aus dem kleinen Handwerksbetrieb ist ein Bauunternehmen mit eigenem Maschinenpark geworden.</p>
        </div>
        <div class="knoepfe">
          <a class="textlink" href="${s.u("ueber-uns/")}">Mehr über uns ${pfeil}</a>
          <a class="textlink" href="${s.u("karriere/")}">Wir stellen ein ${pfeil}</a>
        </div>
      </div>
    </div>
  </section>`,
  };
}

/* ====================================================================== */
/* Einstiegsseiten                                                        */
/* ====================================================================== */

function fuerUnternehmen(s) {
  const krumen = [["Startseite", ""], ["Für Unternehmen", "fuer-unternehmen/"]];
  const fragen = [
    ["Übernehmen Sie auch einzelne Gewerke?", "Ja. Sie können uns als Generalunternehmer für den ganzen Umbau beauftragen oder nur für einzelne Gewerke, etwa Trockenbau, Böden oder Malerarbeiten."],
    ["Wer ist während der Bauzeit unser Ansprechpartner?", "Ein fester Bauleiter, der alle Gewerke abstimmt und die Termine überwacht. Sie haben die ganze Bauzeit dieselbe Nummer."],
  ];
  const gewerke = LEISTUNGEN.filter((l) => l.fuer.includes("gewerbe")).map((l) => l.slug);
  return {
    pfad: "fuer-unternehmen/",
    bereich: "fuer-unternehmen",
    krumen,
    titel: "Umbau für Unternehmen in Bürstadt | rh Construction",
    beschreibung: "Umbau und Sanierung für Büros, Praxen, Gastronomie und Hallen: Generalunternehmer aus Bürstadt, 20 eigene Leute auf der Baustelle. Jetzt anfragen.",
    ogBild: "bilder/teilen.jpg",
    leisteAnfrage: anfrageLink(s, "Gewerbliches Projekt"),
    schema: [krumenSchema(krumen), fragenSchema(fragen)],
    abschluss: { titel: "Ein Umbau steht an? Wir sehen uns die Flächen an.", text: "Schreiben Sie uns kurz, worum es geht – wir melden uns und vereinbaren einen Termin vor Ort.", knopf: "Projekt anfragen", href: anfrageLink(s, "Gewerbliches Projekt") },
    inhalt: `
  <section class="rahmen seitenkopf" aria-labelledby="seite-h">
    <div class="seitenkopf__text">
      <span class="seitenkopf__marke">Für Unternehmen</span>
      <h1 id="seite-h">Umbau und Sanierung für Unternehmen in Bürstadt und der Region</h1>
      <p>Büros, Praxen, Läden, Gastronomie und Hallen: Wir bauen für Banken, Immobilienverwalter und Produktionsbetriebe – als Generalunternehmer oder für einzelne Gewerke, mit 20 eigenen Leuten auf der Baustelle.</p>
      <div class="knoepfe">
        <a class="knopf knopf--wie-leiste" href="${anfrageLink(s, "Gewerbliches Projekt")}">Projekt anfragen ${pfeil}</a>
        <a class="textlink" href="#referenzen">Referenzen ansehen ${pfeil}</a>
      </div>
    </div>
    <figure class="seitenkopf__bild seitenkopf__bild--quer">
      ${s.bild("titel-halle", { alt: "Umgebaute Produktionshalle mit beschichtetem Boden, blauer Wand und neu verlegten Leitungen", sizes: "(min-width: 1024px) 40vw, 100vw", prio: true })}
      <figcaption>Produktionshalle für Prisman in Lorsch</figcaption>
    </figure>
  </section>

  <section class="abschnitt abschnitt--linie" aria-labelledby="gruende-h">
    <div class="rahmen">
      <h2 id="gruende-h" style="margin-bottom: clamp(28px, 4vw, 48px)">Worauf Sie sich als Auftraggeber verlassen können.</h2>
      <ol class="gruende">
        <li><h3>Ein Vertrag, ein Ansprechpartner</h3><p>Als Generalunternehmer stimmen wir alle Gewerke ab. Sie verhandeln nicht mit zehn Firmen, sondern mit einer – und haben einen Bauleiter, der Termine und Kosten überwacht.</p></li>
        <li><h3>Bauen, während Ihr Betrieb weiterläuft</h3><p>Wir teilen den Umbau in Abschnitte und stimmen Arbeitszeiten und Wege mit Ihnen ab, damit Kunden und Mitarbeiter möglichst wenig davon merken.</p></li>
        <li><h3>Hallen, Böden und Technik</h3><p>Vom lebensmitteltauglichen Industrieboden über neu geordnete Kabeltrassen bis zur LED-Hallenbeleuchtung – wie bei Prisman in Lorsch.</p></li>
        <li><h3>Auch über die Region hinaus</h3><p>Unser Schwerpunkt liegt zwischen Rhein-Neckar und Rhein-Main. Gewerbliche Projekte betreuen wir auch europaweit.</p></li>
      </ol>
    </div>
  </section>

  <section class="abschnitt abschnitt--linie" aria-labelledby="gewerke-h">
    <div class="rahmen">
      <div class="kopfzeile">
        <h2 id="gewerke-h">${["Null","Ein","Zwei","Drei","Vier","Fünf","Sechs","Sieben","Acht","Neun","Zehn","Elf","Zwölf"][gewerke.length]} Gewerke für Büro, Praxis und Halle.</h2>
        <p class="vorspann">Einzeln oder alle zusammen – jede Leistung hat ihre eigene Seite.</p>
      </div>
      ${verwandtListe(s, gewerke)}
    </div>
  </section>

  <section class="abschnitt abschnitt--linie" id="referenzen" aria-labelledby="referenzen-h">
    <div class="rahmen">
      <div class="kopfzeile">
        <h2 id="referenzen-h">Gebaut für Banken, Immobilienverwalter und Produktion.</h2>
      </div>
      <div class="projekte-liste">
        ${projektkarte(s, "prisman")}
        ${projektkarte(s, "kamue", { klein: true })}
      </div>
      ${kundenListe()}
    </div>
  </section>

  ${fragenBlock("Häufige Fragen von Unternehmen", fragen)}`,
  };
}

function fuerEigentuemer(s) {
  const krumen = [["Startseite", ""], ["Für Eigentümer", "fuer-eigentuemer/"]];
  const fragen = [ALLGEMEINE_FRAGEN[0], ALLGEMEINE_FRAGEN[1], ALLGEMEINE_FRAGEN[2]];
  const gewerke = ["sanitaer-heizung", "fliesenarbeiten", "balkonsanierung", "altbausanierung", "bodenbelaege", "maler-tapezierarbeiten", "gartengestaltung", "pooltechnik", "planung-generalunternehmer"];
  return {
    pfad: "fuer-eigentuemer/",
    bereich: "fuer-eigentuemer",
    leisteAnfrage: anfrageLink(s, "Privates Vorhaben"),
    krumen,
    titel: "Sanierung fürs Eigenheim in Bürstadt | rh Construction",
    beschreibung: "Bad, Balkon, Altbau, Garten oder Pool: Sanierung für Eigentümer in Bürstadt und Umgebung – alle Handwerker aus einer Hand, Angebot nach Gewerken.",
    schema: [krumenSchema(krumen), fragenSchema(fragen)],
    abschluss: { titel: "Was steht bei Ihnen an?", text: "Zwei, drei Sätze reichen. Wir rufen zurück und kommen zu einem Termin vor Ort vorbei.", knopf: "Termin vor Ort anfragen", href: anfrageLink(s, "Privates Vorhaben") },
    inhalt: `
  <section class="rahmen seitenkopf" aria-labelledby="seite-h">
    <div class="seitenkopf__text">
      <span class="seitenkopf__marke">Für Eigentümer</span>
      <h1 id="seite-h">Sanieren und umbauen fürs eigene Zuhause – in Bürstadt und Umgebung</h1>
      <p>Bad, Balkon, Altbau, Garten oder Pool: Sie beauftragen uns einmal, wir kümmern uns um alle Handwerker – vom Fliesenleger bis zum Poolbauer.</p>
      <div class="knoepfe">
        <a class="knopf knopf--wie-leiste" href="${anfrageLink(s, "Privates Vorhaben")}">Termin vor Ort anfragen ${pfeil}</a>
      </div>
    </div>
    <figure class="seitenkopf__bild">
      ${s.bild("titel-bad", { alt: "Bodengleiche Dusche mit blau gemusterten Zementfliesen und großformatigen Wandplatten", sizes: "(min-width: 1024px) 40vw, 100vw", prio: true })}
    </figure>
  </section>

  <section class="abschnitt abschnitt--linie" aria-labelledby="gruende-h">
    <div class="rahmen ablauf">
      <figure class="ablauf__bild">
        ${s.bild("staubwand", { alt: "Staubschutzwand aus Folie trennt einen bewohnten Raum von der Baustelle ab", sizes: "(min-width: 1024px) 40vw, 100vw" })}
        <figcaption>Staubwand bei einer Sanierung.</figcaption>
      </figure>
      <div>
        <h2 id="gruende-h">Worauf Sie sich verlassen können.</h2>
        <ol class="schritte" style="margin-top: 28px">
          <li><h3>Ein Angebot, das man versteht</h3><p>Schriftlich und nach Gewerken aufgeschlüsselt. Sie sehen, wohin das Geld geht und wo sich sparen lässt.</p></li>
          <li><h3>Staubwände statt Staub im ganzen Haus</h3><p>Wir trennen die Baustelle ab und decken Böden und Möbel ab. Der Rest des Hauses bleibt bewohnbar.</p></li>
          <li><h3>Kein Warten auf den nächsten Handwerker</h3><p>Fliesenleger, Installateur, Trockenbauer und Maler kommen aus einem Haus und sind aufeinander abgestimmt.</p></li>
          <li><h3>Fünf Jahre Gewährleistung</h3><p>Die gesetzliche Gewährleistung für Arbeiten am Bauwerk nach BGB. In dieser Zeit sind wir für Mängel an unserer Arbeit Ihr Ansprechpartner.</p></li>
        </ol>
      </div>
    </div>
  </section>

  <section class="abschnitt abschnitt--linie" aria-labelledby="gewerke-h">
    <div class="rahmen">
      <div class="kopfzeile">
        <h2 id="gewerke-h">Vom Bad bis zum Garten.</h2>
        <p class="vorspann">Jede Leistung hat ihre eigene Seite mit Ablauf und Antworten auf die häufigsten Fragen.</p>
      </div>
      ${verwandtListe(s, gewerke)}
    </div>
  </section>

  <section class="abschnitt abschnitt--linie" aria-labelledby="bilder-h">
    <div class="rahmen">
      <h2 id="bilder-h" class="h2-klein" style="margin-bottom: 24px">Aus unseren Arbeiten</h2>
      <ul class="reihe reihe--vier">
        <li><figure>${s.bild("w-wohnen", { alt: "Wohnküche mit Ziegelwand, Eichenboden und schwarzer Küchenzeile", sizes: "(min-width: 768px) 25vw, 50vw" })}<figcaption>Wohnküche</figcaption></figure></li>
        <li><figure>${s.bild("l-garten", { alt: "Gartenweg aus Natursteinplatten zwischen Lavendel", sizes: "(min-width: 768px) 25vw, 50vw" })}<figcaption>Gartenweg</figcaption></figure></li>
        <li><figure>${s.bild("l-pool", { alt: "Beleuchteter Pool am Abend", sizes: "(min-width: 768px) 25vw, 50vw" })}<figcaption>Pool</figcaption></figure></li>
        <li><figure>${s.bild("l-balkon", { alt: "Sanierter Laubengang mit neuem Belag", sizes: "(min-width: 768px) 25vw, 50vw" })}<figcaption>Laubengang</figcaption></figure></li>
      </ul>
    </div>
  </section>

  ${fragenBlock("Häufige Fragen von Eigentümern", fragen)}`,
  };
}

/* ====================================================================== */
/* Leistungen                                                             */
/* ====================================================================== */

function leistungsUebersicht(s) {
  const krumen = [["Startseite", ""], ["Leistungen", "leistungen/"]];
  const { filterHtml, liste } = gewerkeListe(s, { filter: true });
  return {
    pfad: "leistungen/",
    bereich: "leistungen",
    krumen,
    titel: "Leistungen: zwölf Gewerke aus Bürstadt | rh Construction",
    beschreibung: "Von Trockenbau bis Pooltechnik: die zwölf Gewerke der rh Construction GmbH aus Bürstadt – einzeln oder als Generalunternehmer aus einer Hand.",
    schema: [krumenSchema(krumen), {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: LEISTUNGEN.map((l, i) => ({ "@type": "ListItem", position: i + 1, name: l.name, url: DOMAIN + `leistungen/${l.slug}/` })),
    }],
    abschluss: STANDARD_ABSCHLUSS(s),
    inhalt: `
  <section class="rahmen seitenkopf seitenkopf--ohne-bild" aria-labelledby="seite-h">
    <div class="seitenkopf__text">
      <span class="seitenkopf__marke">Leistungen</span>
      <h1 id="seite-h">Zwölf Gewerke aus einer Hand – in Bürstadt und der Region</h1>
    </div>
    <div>${filterHtml}</div>
  </section>

  <section class="rahmen" aria-label="Alle Leistungen" style="padding-bottom: clamp(64px, 9vw, 128px)">
    ${liste}
    <p class="gewerke__fuss">Lieber nach Anlass suchen? <a class="textlink" href="${s.u("fuer-unternehmen/")}">Für Unternehmen ${pfeil}</a> <a class="textlink" href="${s.u("fuer-eigentuemer/")}">Für Eigentümer ${pfeil}</a></p>
  </section>`,
  };
}

function leistungsSeite(s, l) {
  const krumen = [["Startseite", ""], ["Leistungen", "leistungen/"], [l.name, `leistungen/${l.slug}/`]];
  const kb = l.kopfbild;
  const fuer = [];
  if (l.fuer.includes("privat")) fuer.push(`<span>Für <a href="${s.u("fuer-eigentuemer/")}">Eigentümer</a></span>`);
  if (l.fuer.includes("gewerbe")) fuer.push(`<span>Für <a href="${s.u("fuer-unternehmen/")}">Unternehmen</a></span>`);
  const ziel = [];
  if (l.zielgruppen.privat) ziel.push(`<div><h3>Für Eigentümer</h3><p>${l.zielgruppen.privat}</p></div>`);
  if (l.zielgruppen.gewerbe) ziel.push(`<div><h3>Für Unternehmen</h3><p>${l.zielgruppen.gewerbe}</p></div>`);
  const bilder = l.bilder.length ? `
  <section class="abschnitt abschnitt--linie abschnitt--eng" aria-labelledby="bilder-h">
    <div class="rahmen">
      <h2 id="bilder-h" class="h2-klein" style="margin-bottom: 24px">Aus unseren Arbeiten</h2>
      <ul class="reihe${l.bilder.length === 3 ? " reihe--drei" : l.bilder.length === 1 ? " reihe--eins" : ""}">
        ${l.bilder.map((b) => `<li><figure>${s.bild(b.name, { alt: b.alt, sizes: l.bilder.length === 3 ? "(min-width: 768px) 33vw, 50vw" : l.bilder.length === 1 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 50vw, 50vw" })}<figcaption>${esc(b.text)}</figcaption></figure></li>`).join("\n        ")}
      </ul>
    </div>
  </section>` : "";
  const projekte = l.projekte.length ? `
  <section class="abschnitt abschnitt--linie" aria-labelledby="projekte-h">
    <div class="rahmen">
      <h2 id="projekte-h" class="h2-klein" style="margin-bottom: clamp(28px, 4vw, 48px)">Aus unseren Projekten</h2>
      <div class="projekte-liste">
        ${l.projekte.map((p, i) => projektkarte(s, p, { klein: i > 0 })).join("\n        ")}
      </div>
    </div>
  </section>` : "";
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: l.name,
    serviceType: l.name,
    description: l.kurz,
    url: DOMAIN + `leistungen/${l.slug}/`,
    provider: ANBIETER,
    areaServed: BETRIEB.orte.map((o) => ({ "@type": "City", name: o })),
  };
  return {
    pfad: `leistungen/${l.slug}/`,
    bereich: "leistungen",
    krumen,
    titel: l.titel,
    beschreibung: l.beschreibung,
    schema: [service, krumenSchema(krumen), fragenSchema(l.fragen)],
    abschluss: { titel: `${l.name} geplant? Wir kommen vorbei und sehen es uns an.`, text: "Zwei, drei Sätze reichen. Wir rufen zurück und vereinbaren einen Termin vor Ort.", knopf: "Anfrage stellen", href: anfrageLink(s, l.anfrage) },
    leisteAnfrage: anfrageLink(s, l.anfrage),
    inhalt: `
  <section class="rahmen seitenkopf" aria-labelledby="seite-h">
    <div class="seitenkopf__text">
      <span class="seitenkopf__marke">Leistung ${l.nr} von 12</span>
      <h1 id="seite-h">${esc(l.h1)}</h1>
      <p>${l.intro}</p>
      <div class="knoepfe"><a class="knopf knopf--wie-leiste" href="${anfrageLink(s, l.anfrage)}">${esc(l.name)} anfragen ${pfeil}</a></div>
      <p class="seitenkopf__fuer">${fuer.join("")}</p>
    </div>
    <figure class="seitenkopf__bild${kb.quer ? " seitenkopf__bild--quer" : ""}">
      ${s.bild(kb.name, { alt: kb.alt, sizes: "(min-width: 1024px) 40vw, 100vw", prio: true })}
      ${kb.text ? `<figcaption>${esc(kb.text)}</figcaption>` : ""}
    </figure>
  </section>

  <section class="abschnitt abschnitt--linie" aria-labelledby="umfang-h">
    <div class="rahmen zweispalter">
      <div class="zweispalter__kopf">
        <h2 id="umfang-h" class="h2-klein">Was dazugehört</h2>
      </div>
      <div>
        <ul class="umfang umfang--zwei">
          ${l.umfang.map((u) => `<li>${u}</li>`).join("\n          ")}
        </ul>
        <div class="zwei zielgruppen">${ziel.join("")}</div>
      </div>
    </div>
  </section>

  <section class="abschnitt abschnitt--linie" aria-labelledby="schritte-h">
    <div class="rahmen">
      <h2 id="schritte-h" class="h2-klein" style="margin-bottom: clamp(24px, 3vw, 40px)">So gehen wir vor</h2>
      ${schritteListe(l.schritte, { quer: l.schritte.length === 4 })}
    </div>
  </section>
${bilder}${projekte}

  ${fragenBlock(`Häufige Fragen zu ${esc(l.name)}`, l.fragen)}

  <section class="abschnitt abschnitt--linie abschnitt--eng" aria-labelledby="verwandt-h">
    <div class="rahmen">
      <h2 id="verwandt-h" class="h2-klein" style="margin-bottom: 24px">Passt dazu</h2>
      ${verwandtListe(s, l.verwandt)}
    </div>
  </section>`,
  };
}

/* ====================================================================== */
/* Projekte                                                               */
/* ====================================================================== */

function projekteUebersicht(s) {
  const krumen = [["Startseite", ""], ["Projekte", "projekte/"]];
  const weitere = [
    ["w-gastro", "Gastraum mit Pendelleuchten, Sitzbank und Wand in Terrakotta", "Gastronomie"],
    ["w-treppe", "Treppe mit schwarzen Stufen, Edelstahlgeländer und Granitboden", "Treppenhaus"],
    ["w-lichthof", "Lichthof mit Glasdach über einer sanierten Altbaufassade", "Lichthof im Altbau"],
    ["w-wohnen", "Wohnküche mit Ziegelwand, Eichenboden und schwarzer Küchenzeile", "Wohnküche"],
    ["l-innenausbau", "Empfangs- und Wartebereich mit Sofas und Holzboden", "Empfang"],
    ["w-besprechung", "Besprechungsraum mit Rasterdecke und Teppichboden", "Besprechungsraum"],
    ["l-altbau", "Innenhof mit Pflaster, Sesseln und Olivenbaum", "Innenhof"],
    ["garten-pflaster", "Eng gesetztes Kleinpflaster aus Granit", "Kleinpflaster"],
  ];
  return {
    pfad: "projekte/",
    bereich: "projekte",
    krumen,
    titel: "Projekte und Referenzen | rh Construction Bürstadt",
    beschreibung: "Referenzen der rh Construction GmbH: das KamÜ in Bürstadt, eine Produktionshalle in Lorsch und weitere Arbeiten – mit Ort, Aufgabe und Ergebnis.",
    schema: [krumenSchema(krumen)],
    abschluss: { ...STANDARD_ABSCHLUSS(s), titel: "Ihr Projekt könnte das nächste sein." },
    inhalt: `
  <section class="rahmen seitenkopf seitenkopf--ohne-bild" aria-labelledby="seite-h">
    <div class="seitenkopf__text">
      <span class="seitenkopf__marke">Projekte</span>
      <h1 id="seite-h">Projekte aus Bürstadt und der Region</h1>
    </div>
    <p class="vorspann">Ein Auszug aus über 4.000 Aufträgen – mit Ort, Aufgabe und Ergebnis.</p>
  </section>

  <section class="rahmen" aria-label="Projekte" style="padding-bottom: clamp(64px, 9vw, 128px)">
    <div class="projekte-liste">
      ${projektkarte(s, "kamue")}
      ${projektkarte(s, "prisman")}
    </div>
  </section>

  <section class="abschnitt abschnitt--linie" aria-labelledby="weitere-h">
    <div class="rahmen">
      <div class="kopfzeile">
        <h2 id="weitere-h" class="h2-klein">Weitere Arbeiten</h2>
        <p class="vorspann">Aufnahmen aus fertiggestellten Projekten.</p>
      </div>
      <ul class="reihe reihe--vier">
        ${weitere.map(([n, alt, t]) => `<li><figure>${s.bild(n, { alt, sizes: "(min-width: 768px) 25vw, 50vw", klasse: "" })}<figcaption>${t}</figcaption></figure></li>`).join("\n        ")}
      </ul>
      ${kundenListe()}
    </div>
  </section>`,
  };
}

function projektKamue(s) {
  const p = PROJEKTE.kamue;
  const krumen = [["Startseite", ""], ["Projekte", "projekte/"], ["KamÜ Bürstadt", `projekte/${p.slug}/`]];
  const innen = [
    "Komplette Entkernung des Bestands",
    "Stahl- und Dachtragwerke saniert und neu geordnet",
    "Neue Dachinnenschale aus gedämmten Paneelen",
    "Historische Backsteinwände überarbeitet und eingebunden",
    "Fugenarmer Industrieboden: gespachtelt, geschliffen, versiegelt",
    "Fugenloser Bodenaufbau in allen Büro- und Nebenräumen",
    "Neuer Wandaufbau und Beschichtungen mit Farbakzentflächen",
    "Große, glatte Medienwand",
    "Runde Akustiksegel für bessere Raumakustik",
    "Innenliegendes Metallrahmen-Fenster im Loft-Stil",
    "Offene Stahltreppe mit Riffelblechstufen",
    "Einbauten und Regale aus Sperrholz nach Maß",
    "Klima- und Lüftungstechnik",
    "Neue Beleuchtung mit Pendelleuchten und Schienensystemen",
    "Leitungsführung komplett neu, sichtbar und sauber verlegt",
  ];
  const aussen = [
    "Fassade saniert, mit neuem Putz- und Beschichtungsaufbau",
    "Neue Fenster, im Giebel mit Sprossen",
    "Neuer Sockelputz, farblich abgesetzt",
    "Dachrinnen und Fallrohre saniert und erneuert",
    "Dach und Giebel im Bestand saniert",
    "Zugänge und angrenzende Außenflächen überarbeitet",
  ];
  return {
    pfad: `projekte/${p.slug}/`,
    bereich: "projekte",
    krumen,
    titel: "KamÜ Bürstadt: Umbau eines Getreidelagers | rh Construction",
    beschreibung: "Vom leerstehenden Getreidelager zum Kulturhaus: rh Construction hat das KamÜ in Bürstadt entkernt und innen wie außen neu aufgebaut.",
    ogBild: "bilder/kamue-nachher-1100.webp",
    schema: [krumenSchema(krumen)],
    abschluss: { titel: "Ein Gebäude, das eine neue Nutzung sucht?", text: "Wir sehen es uns an und sagen Ihnen ehrlich, was geht und was es kostet.", knopf: "Umbau anfragen", href: anfrageLink(s, "Umbau eines Bestandsgebäudes"), zweit: { href: s.u("projekte/prisman-lorsch/"), text: "Nächstes Projekt: Prisman" } },
    inhalt: `
  <section class="rahmen seitenkopf seitenkopf--ohne-bild" aria-labelledby="seite-h">
    <div class="seitenkopf__text">
      <span class="seitenkopf__marke">Projekt · Bürstadt</span>
      <h1 id="seite-h">Vom Getreidelager zum Kulturhaus: das KamÜ in Bürstadt</h1>
    </div>
    <p class="vorspann">${p.kurz}</p>
  </section>

  <section class="rahmen" aria-label="Vorher und nachher">
    ${vergleichKamue(s)}
    <dl class="eckdaten eckdaten--vier">
      <div><dt>Ort</dt><dd>Industriestraße 11, Bürstadt, gegenüber dem Bahnhof</dd></div>
      <div><dt>Bauherr</dt><dd>KamÜ GbR</dd></div>
      <div><dt>Nutzung</dt><dd>Seminarräume, Yogaraum, offener Saal für Veranstaltungen</dd></div>
      <div><dt>Eröffnung</dt><dd>Mai 2023</dd></div>
    </dl>
  </section>

  <section class="abschnitt" aria-labelledby="arbeiten-h">
    <div class="rahmen zweispalter">
      <div class="zweispalter__kopf">
        <h2 id="arbeiten-h" class="h2-klein">Innen und außen neu aufgebaut.</h2>
        <p>Aus einem alten Industriegebäude wurde ein moderner Hallen- und Bürokomplex. Das haben wir gemacht:</p>
      </div>
      <div>
        <div class="gruppe"><h3>Innenausbau, Konstruktion und Technik</h3><ul class="umfang umfang--zwei">${innen.map((x) => `<li>${x}</li>`).join("")}</ul></div>
        <div class="gruppe"><h3>Außenhülle und Umfeld</h3><ul class="umfang umfang--zwei">${aussen.map((x) => `<li>${x}</li>`).join("")}</ul></div>
      </div>
    </div>
  </section>

  <section class="rahmen" aria-label="Bilder vom Innenausbau" style="padding-bottom: clamp(64px, 9vw, 128px)">
    <ul class="reihe reihe--vier">
      <li><figure>${s.bild("kamue-treppe", { alt: "Neue Stahltreppe mit Riffelblechstufen vor einer Wand in Olivgrün", sizes: "(min-width: 768px) 25vw, 50vw" })}<figcaption>Stahltreppe</figcaption></figure></li>
      <li><figure>${s.bild("kamue-fenster", { alt: "Raum mit Metallrahmen-Fenster im Loft-Stil und fugenlosem Boden", sizes: "(min-width: 768px) 25vw, 50vw" })}<figcaption>Loft-Fenster</figcaption></figure></li>
      <li><figure>${s.bild("kamue-einbauten", { alt: "Raum mit Einbauten und Regalen aus Sperrholz", sizes: "(min-width: 768px) 25vw, 50vw" })}<figcaption>Einbauten nach Maß</figcaption></figure></li>
      <li><figure>${s.bild("kamue-dach", { alt: "Freigelegter, sanierter Holzdachstuhl mit Deckenklimagerät", sizes: "(min-width: 768px) 25vw, 50vw" })}<figcaption>Dachstuhl</figcaption></figure></li>
    </ul>
  </section>

  <section class="abschnitt abschnitt--linie abschnitt--eng" aria-labelledby="gewerke-h">
    <div class="rahmen">
      <h2 id="gewerke-h" class="h2-klein" style="margin-bottom: 24px">Beteiligte Gewerke</h2>
      ${verwandtListe(s, ["planung-generalunternehmer", "altbausanierung", "innenausbau"])}
    </div>
  </section>`,
  };
}

function projektPrisman(s) {
  const p = PROJEKTE.prisman;
  const krumen = [["Startseite", ""], ["Projekte", "projekte/"], ["Prisman Lorsch", `projekte/${p.slug}/`]];
  const gruppen = [
    ["Außenbereich und Erdarbeiten", ["Baustelle eingerichtet, mit eigenen Transportern, Lkw und Baggern", "Leitungszone aufgegraben und Altmaterial entfernt", "Neue Gräben für Leitungen und Fundamente", "Aushub abgefahren und fachgerecht entsorgt", "Zufahrten, Übergänge und Verkehrsflächen hergestellt", "Materialanlieferungen gesteuert"]],
    ["Hallenboden", ["Untergrund vorbereitet und ausgeglichen", "Beschichtet und versiegelt – hygienisch und lebensmitteltauglich", "Glatte, hell reflektierende Oberfläche"]],
    ["Halle und Tragwerk", ["Stahl- und Holztragwerke gereinigt, saniert und neu gestrichen", "Neue Deckensysteme, Dämmung und Paneele"]],
    ["Technik", ["Kabeltrassen, Elektro- und Netzwerkleitungen neu geordnet", "Neue Maschinenanschlüsse", "Leitungen in Edelstahl und feuerverzinkt, sauber montiert", "LED-Hallenbeleuchtung"]],
    ["Fläche und Übergabe", ["Aufstellflächen, Maschinenachsen und Arbeitswege neu geordnet", "Fläche gereinigt und in Betrieb genommen"]],
  ];
  return {
    pfad: `projekte/${p.slug}/`,
    bereich: "projekte",
    krumen,
    titel: "Prisman Lorsch: Produktionshalle | rh Construction",
    beschreibung: "Produktionshalle für Prisman in Lorsch: Erdarbeiten, lebensmitteltauglicher Industrieboden, saniertes Tragwerk und neu geordnete Technik.",
    ogBild: "bilder/prisman-halle-1200.webp",
    schema: [krumenSchema(krumen)],
    abschluss: { titel: "Eine Halle, die umgebaut werden muss?", text: "Wir sehen uns die Fläche an und planen den Umbau so, dass Ihr Betrieb weiterlaufen kann.", knopf: "Projekt anfragen", href: anfrageLink(s, "Hallenumbau"), zweit: { href: s.u("projekte/kamue-buerstadt/"), text: "Nächstes Projekt: KamÜ" } },
    inhalt: `
  <section class="rahmen seitenkopf" aria-labelledby="seite-h">
    <div class="seitenkopf__text">
      <span class="seitenkopf__marke">Projekt · Lorsch</span>
      <h1 id="seite-h">Produktionshalle für Prisman in Lorsch</h1>
      <p>${p.kurz}</p>
    </div>
    <figure class="seitenkopf__bild seitenkopf__bild--quer">
      ${s.bild("prisman-halle", { alt: "Produktionshalle mit hellem, beschichtetem Boden, Galerie und blauer Stahltreppe", sizes: "(min-width: 1024px) 40vw, 100vw", prio: true })}
    </figure>
  </section>

  <section class="rahmen" aria-label="Eckdaten">
    <dl class="eckdaten eckdaten--vier" style="margin-top: 0">
      <div><dt>Ort</dt><dd>Lorsch</dd></div>
      <div><dt>Bauherr</dt><dd>PRISMAN GmbH</dd></div>
      <div><dt>Nutzung</dt><dd>Produktion und Logistik</dd></div>
      <div><dt>Umfang</dt><dd>Außenanlagen, Halle, Boden und Technik</dd></div>
    </dl>
  </section>

  <section class="abschnitt" aria-labelledby="arbeiten-h">
    <div class="rahmen zweispalter">
      <div class="zweispalter__kopf">
        <h2 id="arbeiten-h" class="h2-klein">Von der Baugrube bis zur Inbetriebnahme.</h2>
        <p>Außen, innen und in der Technik – alles aus einer Hand.</p>
      </div>
      <div>
        ${gruppen.map(([t, punkte]) => `<div class="gruppe"><h3>${t}</h3><ul class="umfang umfang--zwei">${punkte.map((x) => `<li>${x}</li>`).join("")}</ul></div>`).join("\n        ")}
      </div>
    </div>
  </section>

  <section class="rahmen" aria-label="Bilder aus der Halle" style="padding-bottom: clamp(64px, 9vw, 128px)">
    <ul class="reihe">
      <li><figure>${s.bild("titel-halle", { alt: "Halle mit blauer Wand, beschichtetem Boden und neu verlegten Leitungen", sizes: "(min-width: 768px) 50vw, 50vw" })}<figcaption>Neu geführte Leitungen</figcaption></figure></li>
      <li><figure>${s.bild("prisman-linie", { alt: "Halle mit Förderband unter der Galerie", sizes: "(min-width: 768px) 50vw, 50vw" })}<figcaption>Fertige Produktionsfläche</figcaption></figure></li>
    </ul>
  </section>

  <section class="abschnitt abschnitt--linie abschnitt--eng" aria-labelledby="gewerke-h">
    <div class="rahmen">
      <h2 id="gewerke-h" class="h2-klein" style="margin-bottom: 24px">Beteiligte Gewerke</h2>
      ${verwandtListe(s, ["planung-generalunternehmer", "bodenbelaege", "maler-tapezierarbeiten"])}
    </div>
  </section>`,
  };
}

/* ====================================================================== */
/* Über uns, Karriere, Kontakt                                            */
/* ====================================================================== */

function ueberUns(s) {
  const krumen = [["Startseite", ""], ["Über uns", "ueber-uns/"]];
  return {
    pfad: "ueber-uns/",
    bereich: "ueber-uns",
    krumen,
    titel: "Über uns | rh Construction GmbH aus Bürstadt",
    beschreibung: "rh Construction GmbH: 2005 von Bauingenieur Rainer Hühn gegründet, heute 25 Leute und über 4.000 Aufträge – regional verwurzelt in Bürstadt.",
    schema: [krumenSchema(krumen)],
    abschluss: { titel: "Ein Vorhaben im Kopf? Wir kommen vorbei.", text: "Zwei, drei Sätze reichen. Wir rufen zurück und vereinbaren einen Termin vor Ort.", knopf: "Anfrage stellen", href: s.u("kontakt/"), zweit: { href: s.u("karriere/"), text: "Oder bei uns arbeiten" } },
    inhalt: `
  <section class="rahmen seitenkopf seitenkopf--ohne-bild" aria-labelledby="seite-h">
    <div class="seitenkopf__text">
      <span class="seitenkopf__marke">Über uns</span>
      <h1 id="seite-h">Bauunternehmen aus Bürstadt, seit 2005 inhabergeführt</h1>
    </div>
    <p class="vorspann">Von Bürstadt aus bauen wir für Eigentümer und Unternehmen zwischen Rhein-Neckar und Rhein-Main.</p>
  </section>

  <section class="abschnitt abschnitt--flaeche betrieb" aria-labelledby="betrieb-h">
    <div class="rahmen betrieb__innen betrieb__innen--gross">
      <figure class="betrieb__bild">
        ${s.bild("huehn", { alt: "Rainer Hühn, Geschäftsführer der rh Construction GmbH, mit verschränkten Armen vor heller Wand", sizes: "(min-width: 1024px) 40vw, 124px" })}
        <figcaption><strong>Dipl.-Ing. Rainer Hühn</strong> Bauingenieur, Gründer und Geschäftsführer</figcaption>
      </figure>
      <div>
        <h2 id="betrieb-h">Das rh im Namen steht für Rainer Hühn.</h2>
        <blockquote class="zitat"><p>Wir bauen schnell, sauber und in bester Qualität. Daran lasse ich mich täglich messen.</p></blockquote>
        <div class="betrieb__text">
          <p>Als Bauingenieur mit langjähriger Erfahrung hat Rainer Hühn 2005 die rh Construction gegründet – mit dem Anspruch, handwerkliche Qualität, Zuverlässigkeit und durchdachte Baukonzepte aus einer Hand zu liefern.</p>
          <p>Aus dem inhabergeführten Handwerksbetrieb ist ein Bauunternehmen mit klarer Ausrichtung geworden. Sein Anspruch ist geblieben: jedes Projekt mit technischem Sachverstand, Handschlagqualität und einem offenen Ohr für die Kunden zu führen.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="belege rahmen" aria-labelledby="zahlen-h">
    <h2 class="belege__satz" id="zahlen-h">Über <b>20</b> Jahre am Bau. Über <b>4.000</b> Aufträge. <b>20</b> Leute auf der Baustelle, <b>5</b> im Büro.</h2>
    ${kundenListe()}
  </section>

  <section class="abschnitt abschnitt--linie" aria-labelledby="arbeitsweise-h">
    <div class="rahmen zweispalter">
      <div class="zweispalter__kopf">
        <h2 id="arbeitsweise-h" class="h2-klein">So arbeiten wir.</h2>
      </div>
      <ul class="umfang umfang--zwei">
        <li>Erfahrung mit Bauprojekten jeder Größe</li>
        <li>Hoher Anspruch an Planung und Ausführung</li>
        <li>Verlässlich auch bei kurzfristigen Änderungen</li>
        <li>Fachleute mit laufender Weiterbildung</li>
        <li>Moderner Maschinenpark und eigener Fuhrpark</li>
        <li>Alle zwölf Gewerke aus einem Haus</li>
        <li>Stark in den Regionen Rhein-Neckar und Rhein-Main</li>
        <li>Europaweite Betreuung für gewerbliche Kunden</li>
      </ul>
    </div>
  </section>

  <section class="abschnitt abschnitt--linie" aria-labelledby="gebiet-h">
    <div class="rahmen anfrage__innen">
      <div>
        <h2 id="gebiet-h" class="h2-klein">Zu Hause in Bürstadt, unterwegs in der Region.</h2>
        <p class="vorspann">Unser Firmensitz liegt in der Lächner in Bürstadt. Von hier sind wir schnell in Lampertheim, Biblis, Lorsch, Worms, Viernheim, an der Bergstraße und in Mannheim – für gewerbliche Kunden auch im Rhein-Main-Gebiet und darüber hinaus.</p>
      </div>
      ${s.karte()}
    </div>
  </section>`,
  };
}

function karriere(s) {
  const krumen = [["Startseite", ""], ["Karriere", "karriere/"]];
  const bewerbung = "mailto:" + BETRIEB.mail + "?subject=" + encodeURIComponent("Bewerbung");
  return {
    pfad: "karriere/",
    bereich: "karriere",
    krumen,
    titel: "Jobs am Bau in Bürstadt | rh Construction GmbH",
    beschreibung: "Arbeiten bei rh Construction in Bürstadt: zwölf Gewerke, Projekte vom Bad bis zur Werkshalle, moderner Maschinenpark. Wir suchen Verstärkung.",
    schema: [krumenSchema(krumen)],
    abschluss: false,
    inhalt: `
  <section class="rahmen seitenkopf" aria-labelledby="seite-h">
    <div class="seitenkopf__text">
      <span class="seitenkopf__marke">Karriere</span>
      <h1 id="seite-h">Arbeiten bei rh Construction in Bürstadt</h1>
      <p>Wir sind 25 Leute und bauen vom Bad bis zur Werkshalle. Wenn du gern siehst, was du am Ende des Tages geschafft hast, melde dich.</p>
      <div class="knoepfe"><a class="knopf" href="${bewerbung}">Bewerbung schicken ${pfeil}</a></div>
    </div>
    <figure class="seitenkopf__bild seitenkopf__bild--quer">
      ${s.bild("l-planung", { alt: "Transporter mit rh-Construction-Beschriftung vor einer Halle", sizes: "(min-width: 1024px) 40vw, 100vw", prio: true })}
      <figcaption>Unser Fuhrpark</figcaption>
    </figure>
  </section>

  <section class="abschnitt abschnitt--linie" aria-labelledby="erwartet-h">
    <div class="rahmen">
      <h2 id="erwartet-h" style="margin-bottom: clamp(28px, 4vw, 48px)">Was dich bei uns erwartet.</h2>
      <ol class="gruende">
        <li><h3>Abwechslung</h3><p>Zwölf Gewerke und Projekte von der Wohnung bis zur Produktionshalle – selten zweimal dieselbe Baustelle.</p></li>
        <li><h3>Gutes Werkzeug</h3><p>Ein moderner Maschinenpark und eigene Fahrzeuge.</p></li>
        <li><h3>Weiterbildung</h3><p>Laufende Weiterbildung gehört bei uns dazu.</p></li>
        <li><h3>Kurze Wege</h3><p>Ein inhabergeführter Betrieb: Fragen klärst du direkt, nicht über drei Ebenen.</p></li>
      </ol>
    </div>
  </section>

  <section class="abschnitt abschnitt--flaeche" aria-labelledby="suchen-h">
    <div class="rahmen zweispalter">
      <div class="zweispalter__kopf">
        <h2 id="suchen-h" class="h2-klein">Wen wir suchen</h2>
      </div>
      <div class="stellen">
        <p>Handwerker aus dem Ausbau – etwa aus Trockenbau, Fliesen, Maler oder Sanitär –, Bauhelfer und Verstärkung für das Büro.</p>
        <h3 style="margin-top: 20px">So bewirbst du dich</h3>
        <p>Schick uns ein paar Zeilen und, wenn vorhanden, deinen Lebenslauf per E-Mail. Oder ruf einfach an: <a href="${BETRIEB.telefonLink}">${BETRIEB.telefon}</a>.</p>
        <div class="knoepfe" style="margin-top: 12px"><a class="knopf" href="${bewerbung}">Bewerbung schicken ${pfeil}</a></div>
      </div>
    </div>
  </section>`,
  };
}

function kontakt(s) {
  const krumen = [["Startseite", ""], ["Kontakt", "kontakt/"]];
  return {
    pfad: "kontakt/",
    bereich: "kontakt",
    krumen,
    titel: "Kontakt | rh Construction GmbH, Bürstadt",
    beschreibung: "Kontakt zur rh Construction GmbH in Bürstadt: Telefon 06206 909088-0, Anfrageformular, Adresse und Anfahrt. Termin vor Ort vereinbaren.",
    schema: [krumenSchema(krumen), fragenSchema(ALLGEMEINE_FRAGEN)],
    fussOhneKontakt: true,
    leisteAnfrage: "#anfrage-formular",
    abschluss: false,
    inhalt: `
  <section class="rahmen anfrage" aria-labelledby="seite-h" style="padding-top: 28px; padding-bottom: clamp(64px, 9vw, 128px)">
    <div class="anfrage__innen">
      <div>
        <span class="seitenkopf__marke">Kontakt</span>
        <h1 id="seite-h" class="seitentitel">Erzählen Sie uns, was Sie vorhaben.</h1>
        <p class="vorspann">Zwei, drei Sätze reichen. Wir rufen Sie zurück und machen einen Termin vor Ort aus.</p>
        ${formular(s)}
      </div>
      <div class="direkt">
        <a class="direkt__telefon" href="${BETRIEB.telefonLink}"><small>Lieber gleich sprechen?</small><span>${BETRIEB.telefon}</span></a>
        <dl class="zeilen">
          <div><dt>E-Mail</dt><dd><a href="mailto:${BETRIEB.mail}">${BETRIEB.mail}</a></dd></div>
          <div><dt>Büro</dt><dd>${BETRIEB.zeiten}</dd></div>
          <div><dt>Adresse</dt><dd>${BETRIEB.strasse}, ${BETRIEB.plz} ${BETRIEB.ort}</dd></div>
        </dl>
        ${s.karte()}
      </div>
    </div>
  </section>

  ${fragenBlock("Was Kunden vor dem ersten Termin wissen wollen.", ALLGEMEINE_FRAGEN)}`,
  };
}

/* ====================================================================== */
/* Rechtliches und 404                                                    */
/* ====================================================================== */

function impressum(s) {
  const krumen = [["Startseite", ""], ["Impressum", "impressum/"]];
  return {
    pfad: "impressum/",
    bereich: "",
    krumen,
    titel: "Impressum | rh Construction GmbH",
    beschreibung: "Impressum der rh Construction GmbH, Die Lächner 11, 68642 Bürstadt.",
    robots: "noindex, follow",
    abschluss: false,
    inhalt: `
  <section class="rahmen seitenkopf seitenkopf--ohne-bild"><div class="seitenkopf__text"><h1>Impressum</h1></div></section>
  <div class="rahmen"><div class="rechtstext">
    <h2>Angaben gemäß § 5 DDG</h2>
    <p>rh Construction GmbH<br>${BETRIEB.strasse}<br>${BETRIEB.plz} ${BETRIEB.ort}</p>
    <p>Vertreten durch den Geschäftsführer Dipl.-Ing. Rainer Hühn</p>

    <h2>Kontakt</h2>
    <p>Telefon: <a href="${BETRIEB.telefonLink}">${BETRIEB.telefon}</a><br>E-Mail: <a href="mailto:${BETRIEB.mail}">${BETRIEB.mail}</a></p>

    <h2>Registereintrag</h2>
    <p>Handelsregister: Amtsgericht Darmstadt<br>Registernummer: HRB 94555</p>
    <!-- Auf der alten Seite stand „Amtsgericht Lampertheim“ – dort gibt es kein Registergericht. Laut Handelsregister ist es Darmstadt. -->

    <h2>Umsatzsteuer</h2>
    <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: DE 301613401</p>

    <!-- TODO Bilal: Handwerkskammer und Berufsbezeichnung von Herrn Hühn bestätigen lassen und hier einsetzen.
         Fliesen-, Platten- und Mosaikleger ist seit 2020 wieder zulassungspflichtig (Anlage A HwO);
         für Bürstadt zuständig wäre die Handwerkskammer Frankfurt-Rhein-Main. -->

    <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
    <p>Dipl.-Ing. Rainer Hühn, Anschrift wie oben</p>

    <h2>Verbraucherstreitbeilegung</h2>
    <p>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
    <!-- TODO Bilal: mit Herrn Hühn klären (Pflichtangabe nach § 36 VSBG, weil mehr als zehn Beschäftigte). -->

    <h2>Bildnachweis</h2>
    <p>Alle Fotos: rh Construction GmbH.</p>
    <!-- TODO Bilal: Fotograf der RXT-Serie und des Porträts erfragen, Nutzungsrecht für die neue Seite bestätigen lassen. -->

    <h2>Gestaltung und Umsetzung</h2>
    <p>SideTwo, Bürstadt</p>
  </div></div>`,
  };
}

function datenschutz(s) {
  const krumen = [["Startseite", ""], ["Datenschutz", "datenschutz/"]];
  return {
    pfad: "datenschutz/",
    bereich: "",
    krumen,
    titel: "Datenschutz | rh Construction GmbH",
    beschreibung: "Datenschutzerklärung der rh Construction GmbH, Bürstadt.",
    robots: "noindex, follow",
    abschluss: false,
    inhalt: `
  <section class="rahmen seitenkopf seitenkopf--ohne-bild"><div class="seitenkopf__text"><h1>Datenschutz</h1></div>
    <p class="vorspann">Kurz vorweg: Diese Website setzt keine Cookies, zählt keine Besucher und lädt nichts von fremden Servern. Schrift und Bilder liegen auf unserem eigenen Webspace.</p>
  </section>
  <div class="rahmen"><div class="rechtstext">
    <h2>1. Verantwortlicher</h2>
    <p>rh Construction GmbH, vertreten durch den Geschäftsführer Dipl.-Ing. Rainer Hühn<br>${BETRIEB.strasse}, ${BETRIEB.plz} ${BETRIEB.ort}<br>Telefon <a href="${BETRIEB.telefonLink}">${BETRIEB.telefon}</a> · <a href="mailto:${BETRIEB.mail}">${BETRIEB.mail}</a></p>

    <h2>2. Hosting und Server-Protokolle</h2>
    <!-- TODO Bilal: Die Vorschau liegt auf GitHub Pages. Dieser Abschnitt beschreibt den geplanten Livebetrieb bei ALL-INKL – vor dem Livegang prüfen. -->
    <p>Die Website liegt bei ALL-INKL.COM – Neue Medien Münnich, Inhaber René Münnich, Hauptstraße 68, 02742 Friedersdorf. Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO.</p>
    <p>Beim Aufruf einer Seite speichert der Server automatisch, was jeder Browser übermittelt: IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, übertragene Datenmenge, Browser und Betriebssystem sowie die zuvor besuchte Seite. Das ist nötig, um die Website sicher und stabil auszuliefern (Art. 6 Abs. 1 lit. f DSGVO). Die Protokolle werden nur so lange aufbewahrt, wie es dafür erforderlich ist, und nicht mit anderen Daten zusammengeführt.</p>

    <h2>3. Anfrageformular und E-Mail</h2>
    <p>Das Formular auf der Kontaktseite schickt nichts an einen Server. Beim Absenden öffnet sich Ihr eigenes E-Mail-Programm mit einer vorbereiteten Nachricht an ${BETRIEB.mail}; erst wenn Sie dort auf „Senden“ klicken, erreichen uns Ihr Name, Ihre Telefonnummer und Ihr Anliegen per E-Mail.</p>
    <p>Wir nutzen diese Angaben nur, um Ihre Anfrage zu beantworten und gegebenenfalls ein Angebot zu erstellen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung eines Vertrags) sowie Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO, die Sie jederzeit für die Zukunft widerrufen können. Kommt kein Auftrag zustande, löschen wir die Nachricht, sobald die Anfrage erledigt ist. Wird ein Auftrag daraus, gelten die gesetzlichen Aufbewahrungsfristen des Handels- und Steuerrechts (sechs bzw. zehn Jahre).</p>
    <p>Dasselbe gilt, wenn Sie uns anrufen oder eine E-Mail schreiben – auch für Bewerbungen, die wir nach Abschluss des Verfahrens löschen.</p>

    <h2>4. Links zu anderen Diensten</h2>
    <p>Die Karten auf den Seiten „Kontakt“ und „Über uns“ sind eigene Zeichnungen und kein eingebundener Kartendienst. Erst wenn Sie auf „Route planen“ oder auf die Links zu Facebook und Instagram klicken, verlassen Sie diese Website; dann gelten die Datenschutzbestimmungen des jeweiligen Anbieters.</p>

    <h2>5. Ihre Rechte</h2>
    <p>Sie haben das Recht auf</p>
    <ul>
      <li>Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO),</li>
      <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO),</li>
      <li>Löschung (Art. 17 DSGVO) und Einschränkung der Verarbeitung (Art. 18 DSGVO),</li>
      <li>Datenübertragbarkeit (Art. 20 DSGVO),</li>
      <li>Widerspruch gegen Verarbeitungen, die auf Art. 6 Abs. 1 lit. f DSGVO beruhen (Art. 21 DSGVO),</li>
      <li>Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO).</li>
    </ul>
    <p>Eine formlose Nachricht an ${BETRIEB.mail} genügt. Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren, zum Beispiel beim Hessischen Beauftragten für Datenschutz und Informationsfreiheit, Gustav-Stresemann-Ring 1, 65189 Wiesbaden.</p>

    <p class="leise" style="margin-top: 40px">Stand: September 2026</p>
  </div></div>`,
  };
}

function nichtGefunden(s) {
  return {
    pfad: "",
    datei: "404.html",
    bereich: "",
    titel: "Seite nicht gefunden | rh Construction GmbH",
    beschreibung: "Diese Seite gibt es nicht (mehr).",
    robots: "noindex, follow",
    abschluss: false,
    inhalt: `
  <section class="rahmen seitenkopf seitenkopf--ohne-bild" style="padding-bottom: clamp(64px, 9vw, 128px)">
    <div class="seitenkopf__text">
      <span class="seitenkopf__marke">Fehler 404</span>
      <h1>Diese Seite gibt es nicht (mehr).</h1>
      <p>Vielleicht hilft einer dieser Wege weiter:</p>
      <div class="knoepfe">
        <a class="knopf" href="${s.u()}">Zur Startseite ${pfeil}</a>
        <a class="textlink" href="${s.u("leistungen/")}">Leistungen ${pfeil}</a>
        <a class="textlink" href="${s.u("kontakt/")}">Kontakt ${pfeil}</a>
      </div>
    </div>
  </section>`,
  };
}

/* ====================================================================== */

export function alleSeiten(kontext) {
  const seite = (fn, pfad) => fn(kontext(pfad));
  return [
    seite(startseite, ""),
    seite(fuerUnternehmen, "fuer-unternehmen/"),
    seite(fuerEigentuemer, "fuer-eigentuemer/"),
    seite(leistungsUebersicht, "leistungen/"),
    ...LEISTUNGEN.map((l) => leistungsSeite(kontext(`leistungen/${l.slug}/`), l)),
    seite(projekteUebersicht, "projekte/"),
    seite(projektKamue, "projekte/kamue-buerstadt/"),
    seite(projektPrisman, "projekte/prisman-lorsch/"),
    seite(ueberUns, "ueber-uns/"),
    seite(karriere, "karriere/"),
    seite(kontakt, "kontakt/"),
    seite(impressum, "impressum/"),
    seite(datenschutz, "datenschutz/"),
    seite(nichtGefunden, ""),
  ];
}
