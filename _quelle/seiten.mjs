// Inhalte der aktualisierten Bestandsseite. Texte weitgehend wörtlich von rhconstruction.de (Stand 24.09.2026).
// Was gegenüber dem Original geändert ist, steht in der README unter „Was sich geändert hat“.

import { BETRIEB, esc, krumenSchema, DOMAIN, SYMBOL } from "./helfer.mjs";
import { LEISTUNGEN } from "./leistungen.mjs";

const anfrageLink = (s, anliegen) => s.u("kontakt/") + "?anliegen=" + encodeURIComponent(anliegen) + "#formular";

/* ====================================================================== */
/* Bausteine                                                              */
/* ====================================================================== */

function seitenkopf(s, { bild, alt, titel, text, rechts = "" }) {
  return `<section class="seitenkopf${bild ? " seitenkopf--bild" : ""}" aria-labelledby="seite-h">
    ${bild ? s.bild(bild, { alt, sizes: "100vw", prio: true }) : ""}
    <div class="rahmen seitenkopf__innen${rechts ? " seitenkopf__innen--zwei" : ""}">
      <div>
        <h1 id="seite-h">${titel}</h1>
        ${text ? `<p>${text}</p>` : ""}
      </div>
      ${rechts}
    </div>
  </section>`;
}

function formular(s) {
  return `<form class="formular" id="anfrage-formular" action="${s.u("kontakt.php")}" method="post" novalidate>
<div class="st-falle" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden"><label>Bitte leer lassen <input name="webseite" type="text" tabindex="-1" autocomplete="off"></label></div>
          <div class="zwei">
            <div class="feld"><label for="f-name">Vor- und Nachname</label><input id="f-name" name="name" type="text" autocomplete="name" required></div>
            <div class="feld"><label for="f-telefon">Telefon</label><input id="f-telefon" name="telefon" type="tel" autocomplete="tel" inputmode="tel" required></div>
          </div>
          <div class="feld"><label for="f-mail">E-Mail <span class="feld__zusatz">(freiwillig)</span></label><input id="f-mail" name="mail" type="email" autocomplete="email"></div>
          <div class="feld"><label for="f-nachricht">Ihre Nachricht</label><textarea id="f-nachricht" name="nachricht" rows="5" required></textarea></div>
          <label class="haken" for="f-einwilligung">
            <input id="f-einwilligung" name="einwilligung" type="checkbox" required>
            <span>Ich bin einverstanden, dass die rh Construction GmbH meine Angaben zur Bearbeitung meiner Anfrage verwendet. Mehr dazu in der <a href="${s.u("datenschutz/")}">Datenschutzerklärung</a>.</span>
          </label>
          <button class="knopf" type="submit">Nachricht abschicken</button>
          <p class="formular__hinweis" id="formular-hinweis" aria-live="polite">Ihre Anfrage geht direkt per E-Mail an uns.</p>
        </form>`;
}

function angaben({ mitZeiten = false } = {}) {
  return `<ul class="angaben">
          <li>${SYMBOL.ort}<span><strong>Unser Büro</strong><a href="${BETRIEB.karte}" target="_blank" rel="noopener">${BETRIEB.strasse}, ${BETRIEB.plz} ${BETRIEB.ort}</a></span></li>
          ${mitZeiten ? `<li>${SYMBOL.uhr}<span><strong>Öffnungszeiten</strong>${BETRIEB.zeiten}</span></li>` : ""}
          <li>${SYMBOL.telefon}<span><strong>Telefon</strong><a href="${BETRIEB.telefonLink}">${BETRIEB.telefon}</a></span></li>
          <li>${SYMBOL.mail}<span><strong>E-Mail</strong><a href="mailto:${BETRIEB.mail}">${BETRIEB.mail}</a></span></li>
        </ul>`;
}

const sozial = () => `<p class="sozial">
          <a href="${BETRIEB.facebook}" target="_blank" rel="noopener" aria-label="rh Construction bei Facebook">${SYMBOL.facebook}</a>
          <a href="${BETRIEB.instagram}" target="_blank" rel="noopener" aria-label="rh Construction bei Instagram">${SYMBOL.instagram}</a>
        </p>`;

const kundenListe = (s) => `<ul class="kunden">${BETRIEB.kunden.map(([datei, name]) => `<li>${s.logo(datei, name)}</li>`).join("")}</ul>`;

const liste = (punkte) => `<ul class="punkte">${punkte.map((p) => Array.isArray(p)
  ? `<li><span>${p[0]}<ul class="punkte">${p[1].map((x) => `<li>${x}</li>`).join("")}</ul></span></li>`
  : `<li>${p}</li>`).join("")}</ul>`;

/* ====================================================================== */
/* Startseite                                                             */
/* ====================================================================== */

function startseite(s) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": DOMAIN + "#betrieb",
    name: BETRIEB.name,
    slogan: "Bauen ohne Limit",
    url: DOMAIN,
    logo: DOMAIN + "bilder/logo.png",
    image: DOMAIN + "bilder/held-1280.webp",
    telephone: BETRIEB.telefonSchema,
    email: BETRIEB.mail,
    foundingDate: "2005",
    founder: { "@type": "Person", name: "Rainer Hühn", jobTitle: "Geschäftsführer", honorificPrefix: "Dipl.-Ing." },
    numberOfEmployees: { "@type": "QuantitativeValue", value: 25 },
    address: { "@type": "PostalAddress", streetAddress: BETRIEB.strasse, postalCode: BETRIEB.plz, addressLocality: BETRIEB.ort, addressRegion: "Hessen", addressCountry: "DE" },
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:30", closes: "16:00" }],
    areaServed: [...BETRIEB.orte.map((o) => ({ "@type": "City", name: o })), { "@type": "AdministrativeArea", name: "Metropolregion Rhein-Neckar" }, { "@type": "AdministrativeArea", name: "Rhein-Main-Gebiet" }],
    hasOfferCatalog: { "@type": "OfferCatalog", name: "Leistungen", itemListElement: LEISTUNGEN.map((l) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: l.name, url: DOMAIN + "leistungen/#" + l.anker } })) },
    sameAs: [BETRIEB.facebook, BETRIEB.instagram],
  };
  const karten = LEISTUNGEN.map((l) => `
        <a class="karte" href="${s.u("leistungen/")}#${l.anker}">
          <h3>${esc(l.kurzname || l.name)}</h3>
          ${s.bild(l.startbild[0], { alt: l.startbild[1], sizes: "(min-width: 1024px) 270px, 45vw" })}
          <p>${l.start}</p>
          <span class="karte__mehr">Mehr erfahren →</span>
        </a>`).join("");
  return {
    pfad: "",
    titel: "Bauunternehmen in Bürstadt | rh Construction GmbH",
    beschreibung: "rh Construction GmbH aus Bürstadt: Neubau, Sanierung, Innenausbau und Generalunternehmen – zwölf Gewerke aus einer Hand, seit 2005. Jetzt beraten lassen.",
    schema: [schema],
    ohneBeratung: true,
    fussOhneKontakt: true,
    inhalt: `
  <section class="held" aria-labelledby="held-h">
    ${s.bild("held", { alt: "Heller Besprechungsraum mit abgehängter Rasterdecke, Einbauleuchten und großem Tisch", sizes: "100vw", prio: true })}
    <div class="rahmen held__innen">
      <h1 id="held-h"><span class="held__klein">Bauunternehmen in Bürstadt</span>Bauen ohne Limit.</h1>
      <p>Neubau, Sanierung und Innenausbau aus einer Hand – seit 2005 für private und gewerbliche Kunden in der Metropolregion Rhein-Neckar und im Rhein-Main-Gebiet.</p>
      <div class="knoepfe">
        <a class="knopf knopf--hell" href="${s.u("leistungen/")}">Unsere Leistungen</a>
        <a class="knopf knopf--rand knopf--wie-leiste" href="${BETRIEB.telefonLink}">${SYMBOL.telefon}Jetzt anrufen</a>
      </div>
    </div>
  </section>

  <section class="abschnitt" aria-labelledby="kunden-h">
    <div class="rahmen">
      <div class="abschnitt__kopf"><h2 id="kunden-h" class="titel titel--mitte">Kunden, die uns vertrauen</h2></div>
      ${kundenListe(s)}
    </div>
  </section>

  <section class="abschnitt abschnitt--blau auf-blau" aria-labelledby="leistungen-h">
    <div class="rahmen">
      <div class="abschnitt__kopf"><h2 id="leistungen-h" class="titel titel--mitte">Unsere Leistungen im Überblick</h2></div>
      <div class="raster">${karten}
      </div>
      <p class="abschnitt__fuss"><a class="knopf knopf--hell" href="${s.u("leistungen/")}">Alle Leistungen ansehen</a></p>
    </div>
  </section>

  <section class="abschnitt abschnitt--verlauf auf-blau" aria-labelledby="chef-h">
    <div class="rahmen chef">
      ${s.bild("huehn", { alt: "Dipl.-Ing. Rainer Hühn, Geschäftsführer der rh Construction GmbH", sizes: "(min-width: 900px) 440px, 90vw" })}
      <div>
        <h2 id="chef-h" class="titel">Geschäftsführer</h2>
        <p class="chef__name">Dipl.-Ing. Rainer Hühn</p>
        <p class="chef__rolle">Bauingenieur und Gründer der rh Construction GmbH</p>
        <p class="chef__zitat">„Bauen ohne Limit“</p>
        <p class="chef__text">„Wir bauen schnell, sauber und in bester Qualität. Daran lasse ich mich täglich messen.“</p>
        <div class="knoepfe"><a class="knopf knopf--rand" href="${s.u("ueber-uns/")}">Mehr über uns</a></div>
      </div>
    </div>
  </section>

  <section class="zweiteilig" aria-labelledby="klein-h">
    <div class="zweiteilig__links">
      <ul class="staerken">
        <li>${SYMBOL.doppelpfeil}<h3>Maßgeschneiderte Präzision</h3><p>Wir legen höchsten Wert auf Präzision in jedem Arbeitsschritt. Unsere Lösungen passen sich exakt den Anforderungen jedes Projekts an – mit Ergebnissen, die optisch und funktional überzeugen.</p></li>
        <li>${SYMBOL.doppelpfeil}<h3>Moderne Arbeitsmethoden</h3><p>Unser Team setzt auf moderne Technik und Materialien, um Bauprozesse effizienter und nachhaltiger zu gestalten.</p></li>
        <li>${SYMBOL.doppelpfeil}<h3>Partnerschaftliches Arbeiten</h3><p>Bei uns steht die Zusammenarbeit mit unseren Kunden im Fokus. Offene Kommunikation und transparente Planung sorgen dafür, dass jedes Projekt reibungslos verläuft.</p></li>
      </ul>
    </div>
    <div class="zweiteilig__rechts">
      <div class="zweiteilig__weiss">
        <h2 id="klein-h" class="titel">Kein Projekt zu groß oder klein</h2>
        <div class="zitate">
          <p>„Ob große Bauvorhaben oder kleinere Projekte – die rh Construction GmbH aus Bürstadt setzt jedes Vorhaben mit der gleichen Leidenschaft und Präzision um. Für uns zählt nicht die Größe eines Projekts, sondern die Zufriedenheit unserer Kunden.“</p>
          <p>„Jedes Projekt, ob groß oder klein, wird von unserem erfahrenen Team mit Professionalität und Sorgfalt realisiert. Wir stehen für Qualität und Zuverlässigkeit in jedem Detail und begleiten Sie Schritt für Schritt zu Ihrem Bauvorhaben.“</p>
        </div>
        <a class="knopf" href="${s.u("referenzen/")}">Referenzen ansehen</a>
      </div>
      <div class="band-grau">
        <p>Jetzt beraten lassen.</p>
        <a class="knopf knopf--hell" href="${BETRIEB.telefonLink}">${SYMBOL.telefon}Jetzt anrufen</a>
      </div>
    </div>
  </section>

  <section class="band-bild" aria-labelledby="jahre-h">
    ${s.bild("band-transporter", { alt: "", sizes: "100vw" })}
    <div class="rahmen band-bild__innen">
      <h2 id="jahre-h">Wir bauen für Sie seit über 20 Jahren</h2>
      <p>„Mit modernen Techniken und zukunftsweisenden Standards sorgen wir für höchste Qualität.“</p>
      <div class="knoepfe"><a class="knopf knopf--hell" href="${s.u("ueber-uns/")}">Mehr über rh Construction erfahren</a></div>
    </div>
  </section>

  <section class="abschnitt abschnitt--verlauf auf-blau" id="formular" aria-labelledby="kontakt-h">
    <div class="rahmen kontakt">
      <div>
        <div class="abschnitt__kopf"><h2 id="kontakt-h" class="titel">Kontaktieren Sie uns</h2></div>
        ${formular(s)}
      </div>
      <div>
        ${angaben()}
        ${sozial()}
      </div>
    </div>
  </section>`,
  };
}

/* ====================================================================== */
/* Leistungen                                                             */
/* ====================================================================== */

function leistungen(s) {
  const krumen = [["Startseite", ""], ["Leistungen", "leistungen/"]];
  const abschnitte = LEISTUNGEN.map((l, i) => `
  <section class="leistung${i % 2 ? " abschnitt--flaeche leistung--gespiegelt" : ""}" id="${l.anker}" aria-labelledby="l-${l.anker}">
    <div class="rahmen leistung__innen">
      <div class="leistung__text">
        <h2 id="l-${l.anker}" class="titel">${esc(l.name)}</h2>
        ${l.text.map((t) => `<p>${t}</p>`).join("\n        ")}
        <a class="knopf" href="${anfrageLink(s, l.name)}">${esc(l.knopf)}</a>
      </div>
      <div class="leistung__bilder leistung__bilder--${l.bilder.length}">
        ${l.bilder.map(([n, alt], j) => s.bild(n, { alt, sizes: l.bilder.length === 2 ? "(min-width: 1024px) 280px, 50vw" : j === 0 ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 280px, 50vw" })).join("\n        ")}
      </div>
    </div>
  </section>`).join("");
  return {
    pfad: "leistungen/",
    krumen,
    titel: "Leistungen: Trockenbau bis Sanierung | rh Construction",
    beschreibung: "Trockenbau, Innenausbau, Altbausanierung, Fliesen, Böden, Maler, Abdichtung, Balkon, Pool, Sanitär, Garten und Generalunternehmen aus Bürstadt.",
    ogBild: "bilder/kopf-leistungen-1000.webp",
    schema: [krumenSchema(krumen), {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: LEISTUNGEN.map((l, i) => ({ "@type": "ListItem", position: i + 1, name: l.name, url: DOMAIN + "leistungen/#" + l.anker })),
    }],
    inhalt: `
  ${seitenkopf(s, { bild: "kopf-leistungen", alt: "Transporter der rh Construction GmbH vor einer Halle", titel: "Unsere Leistungen im Überblick", text: "Entdecken Sie unser breites Leistungsspektrum. Von der Planung bis zur Umsetzung bieten wir Ihnen alles aus einer Hand." })}

  <nav class="sprung" aria-label="Zu einer Leistung springen">
    <ul class="rahmen">${LEISTUNGEN.map((l) => `<li><a href="#${l.anker}">${esc(l.kurzname || l.name)}</a></li>`).join("")}</ul>
  </nav>
${abschnitte}`,
  };
}

/* ====================================================================== */
/* Über uns                                                               */
/* ====================================================================== */

function ueberUns(s) {
  const krumen = [["Startseite", ""], ["Über uns", "ueber-uns/"]];
  const zahl = (wert, zusatz, text, anzeige) => `<div><dt>${text}</dt><dd data-zahl="${wert}" data-zusatz="${zusatz}">${anzeige}</dd></div>`;
  const haken = (punkte) => `<ul class="haken-liste">${punkte.map((p) => `<li>${SYMBOL.haken}<span>${p}</span></li>`).join("")}</ul>`;
  return {
    pfad: "ueber-uns/",
    krumen,
    titel: "Über uns | rh Construction GmbH aus Bürstadt",
    beschreibung: "Seit 2005 Qualität am Bau: die rh Construction GmbH aus Bürstadt, geführt von Bauingenieur Rainer Hühn – regional verwurzelt, europaweit im Einsatz.",
    ogBild: "bilder/kopf-ueber-1000.webp",
    schema: [krumenSchema(krumen)],
    inhalt: `
  ${seitenkopf(s, { bild: "kopf-ueber", alt: "Firmensitz der rh Construction GmbH in Bürstadt mit blauer Säule und Eingangstreppe", titel: "Über uns", text: "Erfahren Sie hier mehr über unser Unternehmen, unsere Werte und unsere Geschichte." })}

  <section class="abschnitt" aria-labelledby="bau-h">
    <div class="rahmen">
      <div class="abschnitt__kopf"><h2 id="bau-h" class="titel titel--mitte">Das Bauunternehmen für Neubau, Sanierung und vieles mehr</h2></div>
      <div class="spalten">
        <div>
          <h3>Seit 2005 Qualität am Bau. Regional verwurzelt und europaweit im Einsatz.</h3>
          <p>Ihr Bauvorhaben verdient einen erfahrenen Partner. Die rh Construction GmbH mit Sitz im südhessischen Bürstadt steht seit zwei Jahrzehnten für Qualität, Zuverlässigkeit und maßgeschneiderte Bauleistungen. Ob Neubau, Altbausanierung, Innenausbau oder Balkonsanierung – wir bieten Ihnen alle Leistungen aus einer Hand.</p>
        </div>
        <div>
          <h3>Wir begleiten Ihr Bauprojekt persönlich.</h3>
          <p>Ob Neubau, Umbau oder Sanierung: Wir setzen Ihre Wünsche fachgerecht um und stehen Ihnen mit Rat und Tat zur Seite – von der Planung bis zur Fertigstellung. Vertrauen Sie auf Erfahrung, Fachwissen und Qualität aus einer Hand.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="abschnitt abschnitt--flaeche" aria-labelledby="vorteile-h">
    <div class="rahmen">
      <div class="abschnitt__kopf"><h2 id="vorteile-h" class="titel titel--mitte">Vorteile auf einen Blick</h2></div>
      <div class="spalten spalten--drei">
        <div><h3>Erfahrung und Kompetenz</h3>${haken(["Über 20 Jahre Erfahrung mit Bauprojekten aller Größen", "Höchster Qualitätsanspruch bei Planung und Ausführung", "Verlässliche Umsetzung auch bei kurzfristigen Änderungen"])}</div>
        <div><h3>Moderne Arbeitsweise</h3>${haken(["Fachpersonal mit laufender Weiterbildung", "Moderner Maschinenpark für effizientes Arbeiten"])}</div>
        <div><h3>Standort</h3>${haken(["Stark im Rhein-Main-Gebiet und in der Metropolregion Rhein-Neckar", "Europaweite Projektbetreuung für private und gewerbliche Kunden"])}</div>
      </div>
    </div>
  </section>

  <section class="abschnitt abschnitt--blau auf-blau" aria-label="rh Construction in Zahlen">
    <div class="rahmen">
      <dl class="zahlen">
        ${zahl(20, "+", "Jahre Erfahrung", "20+")}
        ${zahl(20, "", "Mitarbeiter auf der Baustelle", "20")}
        ${zahl(4000, "+", "erfolgreiche Projekte", "4.000+")}
        ${zahl(5, "", "Mitarbeiter im Büro", "5")}
      </dl>
    </div>
  </section>

  <section class="abschnitt" aria-labelledby="profil-h">
    <div class="rahmen profil">
      ${s.bild("huehn", { alt: "Dipl.-Ing. Rainer Hühn, Geschäftsführer der rh Construction GmbH", sizes: "(min-width: 900px) 360px, 90vw" })}
      <div>
        <h2 id="profil-h">Dipl.-Ing. Rainer Hühn</h2>
        <p class="profil__rolle">Geschäftsführer der rh Construction GmbH</p>
        <div class="profil__text">
          <p>Als Bauingenieur mit langjähriger Erfahrung habe ich 2005 die Firma rh Construction gegründet – mit dem Anspruch, handwerkliche Qualität, Zuverlässigkeit und durchdachte Baukonzepte aus einer Hand zu liefern.</p>
          <p>Aus dem inhabergeführten Handwerksbetrieb entwickelte sich eine leistungsstarke Bauunternehmung mit klarer Ausrichtung.</p>
          <p>Wir bauen schnell, sauber und in bester Qualität. Daran lasse ich mich täglich messen.</p>
          <p>Mein Anspruch ist es, jedes Projekt mit technischem Sachverstand, Handschlagqualität und einem offenen Ohr für unsere Kunden zu führen.</p>
        </div>
        <div class="knoepfe" style="margin-top: 28px"><a class="knopf" href="${s.u("referenzen/")}">Referenzen ansehen</a></div>
      </div>
    </div>
  </section>`,
  };
}

/* ====================================================================== */
/* Referenzen                                                             */
/* ====================================================================== */

function referenzen(s) {
  const krumen = [["Startseite", ""], ["Referenzen", "referenzen/"]];
  return {
    pfad: "referenzen/",
    krumen,
    titel: "Referenzen | rh Construction GmbH, Bürstadt",
    beschreibung: "Referenzen der rh Construction GmbH: Umbau des KamÜ in Bürstadt vom Lager zum Kulturhaus und eine Produktionshalle für Prisman – mit Vorher und Nachher.",
    ogBild: "bilder/kamue-nachher-1100.webp",
    schema: [krumenSchema(krumen)],
    inhalt: `
  ${seitenkopf(s, { bild: "kopf-referenzen", alt: "Heller Empfangs- und Wartebereich mit Sofas und Holzboden", titel: "Referenzen", text: "Ein Auszug unserer bisherigen Projekte. Transparent, greifbar, überzeugend." })}

  <section class="abschnitt" aria-labelledby="kamue-h">
    <div class="rahmen projekt">
      <div>
        <h2 id="kamue-h" class="titel">KamÜ GbR – Kultur am Übergang</h2>
        <p class="projekt__ort">Industriestraße 11, Bürstadt · eröffnet im Mai 2023</p>
        <div style="margin-top: 28px">
          <h3>Innenausbau, Gebäudetechnik, Konstruktion</h3>
          ${liste(["Komplette Entkernung des Bestands", "Neuer fugenarmer Industrieboden: gespachtelt, geschliffen, versiegelt", "Überarbeitung und Einbindung der historischen Backsteinwände", "Großformatige, glatte Medienwand", "Runde Akustiksegel für bessere Raumakustik", "Sanierung und Neuordnung der Stahl- und Dachtragwerke", "Neue Beleuchtung mit Pendelleuchten und Schienensystemen", "Neuer Wandaufbau und neue Beschichtungen mit Farbakzentflächen", "Fugenloser Bodenaufbau in allen Büro- und Nebenräumen", "Innenliegendes Metallrahmen-Fenster im Loft-Stil", "Einbauten und Regale aus Sperrholz nach Maß", "Offene Stahltreppe mit Riffelblechstufen", "Moderne Klima- und Lüftungstechnik", "Neue Dachinnenschale aus gedämmten Paneelen", "Leitungsführung komplett neu, sichtbar und sauber verlegt"])}
          <h3>Außenhülle, Gebäudeumbau, Umfeld</h3>
          ${liste(["Fassadensanierung mit neuem Putz- und Beschichtungsaufbau", "Neue Fenster, im Giebel mit Sprossen", "Neuer Sockelputz, farblich abgesetzt", "Dachentwässerung saniert und erneuert (Rinnen, Fallrohre)", "Dach- und Giebelsanierung im Bestand", "Gebäudezugänge und angrenzende Außenflächen überarbeitet"])}
          <p style="margin-top: 20px">Aus dem alten Industriegebäude wurde ein moderner Hallen- und Bürokomplex.</p>
        </div>
      </div>
      <div>
        <div class="vorher-nachher">
          ${s.bild("kamue-nachher", { alt: "Das Gebäude nach dem Umbau: helle Fassade, neue Fenster", sizes: "(min-width: 1024px) 660px, 100vw" })}
          <div class="vn__vorher">${s.bild("kamue-vorher", { alt: "Das Gebäude vor dem Umbau: grauer Putz, vernagelte Tore", sizes: "(min-width: 1024px) 660px, 100vw" })}</div>
          <input type="range" min="0" max="100" value="50" aria-label="Schieberegler: links vorher, rechts nachher">
          <span class="vn__linie" aria-hidden="true"></span>
          <span class="vn__marke vn__marke--vorher" aria-hidden="true">Vorher</span>
          <span class="vn__marke vn__marke--nachher" aria-hidden="true">Nachher</span>
        </div>
        <p class="bildunterschrift">Schieberegler ziehen: links vorher, rechts nachher.</p>
        <div class="galerie">
          ${[["kamue-treppe", "Neue Stahltreppe mit Riffelblechstufen"], ["kamue-einbauten", "Einbauten und Regale aus Sperrholz"], ["kamue-fenster", "Metallrahmen-Fenster im Loft-Stil"], ["kamue-dach", "Sanierter Holzdachstuhl mit Klimagerät"]].map(([n, a]) => s.bild(n, { alt: a, sizes: "(min-width: 1024px) 330px, 50vw" })).join("\n          ")}
        </div>
      </div>
    </div>
  </section>

  <section class="abschnitt abschnitt--flaeche" aria-labelledby="prisman-h">
    <div class="rahmen projekt">
      <div>
        <h2 id="prisman-h" class="titel">Prisman GmbH</h2>
        <p class="projekt__ort">Produktionshalle</p>
        <div style="margin-top: 28px">
          <h3>Außenbereich, Infrastruktur, Erdarbeiten</h3>
          ${liste(["Fahrzeug- und Maschinenflotte zur Baustelle gebracht (Transporter, Lkw, Bagger)", "Baustelleneinrichtung hergestellt und gesichert", ["Erdarbeiten:", ["Leitungszone aufgegraben", "Altmaterial entfernt", "neue Gräben hergestellt", "Leitungs- und Fundamentarbeiten vorbereitet"]], "Aushub abgefahren und fachgerecht entsorgt", "Zufahrten, Übergänge und Verkehrsflächen hergestellt oder angepasst", "Logistik und Materialanlieferungen gesteuert"])}
          <h3>Innenbereich: Hallenneubau und -sanierung</h3>
          ${liste([["Industrieboden vollflächig erneuert:", ["Untergrund vorbereitet", "Ausgleichsspachtelung", "Beschichtung und Versiegelung in hygienischer, lebensmitteltauglicher Ausführung", "glatte, hell reflektierende Oberfläche"]], ["Halleninnenstruktur komplett neu aufgebaut:", ["Stahl- und Holztragwerke gereinigt, saniert und neu gestrichen", "neue Deckensysteme, Dämmung und Paneele"]]])}
          <h3>Technische Installationen</h3>
          ${liste(["Kabeltrassen, Elektro- und Netzwerktechnik neu geordnet", "Neue Maschinenanschlüsse", "Leitungsführung in Edelstahl und feuerverzinkt, sauber montiert", "LED-Hallenbeleuchtung"])}
          <h3>Produktions- und Logistikflächen</h3>
          ${liste(["Aufstellflächen, Maschinenachsen und Arbeitswege neu organisiert", "Fertige Fläche gereinigt und in Betrieb genommen"])}
        </div>
      </div>
      <div>
        ${s.bild("titel-halle", { alt: "Umgebaute Halle mit blauer Wand, beschichtetem Boden und neu verlegten Leitungen", sizes: "(min-width: 1024px) 660px, 100vw" })}
        <div class="galerie">
          ${s.bild("prisman-halle", { alt: "Produktionshalle mit hellem Boden und Galerie", sizes: "(min-width: 1024px) 330px, 50vw" })}
          ${s.bild("prisman-linie", { alt: "Halle mit Förderband unter der Galerie", sizes: "(min-width: 1024px) 330px, 50vw" })}
        </div>
        <div class="knoepfe" style="margin-top: 28px"><a class="knopf" href="${s.u("kontakt/")}#formular">Kontakt aufnehmen</a></div>
      </div>
    </div>
  </section>`,
  };
}

/* ====================================================================== */
/* Kontakt                                                                */
/* ====================================================================== */

function kontakt(s) {
  const krumen = [["Startseite", ""], ["Kontakt", "kontakt/"]];
  return {
    pfad: "kontakt/",
    krumen,
    titel: "Kontakt | rh Construction GmbH, Bürstadt",
    beschreibung: "Kontakt zur rh Construction GmbH, Die Lächner 11, 68642 Bürstadt: Telefon 06206 909088-0, info@rhconstruction.de, Mo–Fr 7:30–16:00 Uhr.",
    schema: [krumenSchema(krumen)],
    ohneBeratung: true,
    fussOhneKontakt: true,
    leisteAnfrage: "#formular",
    inhalt: `
  ${seitenkopf(s, { titel: "Kontakt", text: "Auf dieser Seite können Sie ganz bequem Kontakt zu uns aufnehmen – per Telefon, E-Mail oder persönlich. Wir sind für Sie da.", rechts: `<div class="infos auf-blau"><h2>Informationen</h2>${angaben({ mitZeiten: true })}${sozial()}</div>` })}

  <section class="abschnitt" id="formular" aria-labelledby="formular-h">
    <div class="rahmen" style="max-width: calc(820px + 2 * var(--rand))">
      <div class="abschnitt__kopf"><h2 id="formular-h" class="titel">Formular</h2><p class="vorspann">Schreiben Sie uns kurz, worum es geht. Wir melden uns bei Ihnen.</p></div>
      ${formular(s)}
    </div>
  </section>`,
  };
}

/* ====================================================================== */
/* Rechtliches und 404                                                    */
/* ====================================================================== */

function impressum(s) {
  return {
    pfad: "impressum/",
    titel: "Impressum | rh Construction GmbH",
    beschreibung: "Impressum der rh Construction GmbH, Die Lächner 11, 68642 Bürstadt.",
    robots: "noindex, follow",
    ohneBeratung: true,
    inhalt: `
  ${seitenkopf(s, { titel: "Impressum" })}
  <section class="abschnitt"><div class="rahmen"><div class="rechtstext">
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
    <!-- TODO Bilal: Handwerkskammer und Berufsbezeichnung von Herrn Hühn bestätigen lassen und hier einsetzen
         (Fliesen-, Platten- und Mosaikleger ist seit 2020 wieder Anlage A HwO; zuständig wäre die HWK Frankfurt-Rhein-Main). -->
    <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
    <p>Dipl.-Ing. Rainer Hühn, Anschrift wie oben</p>
    <h2>Verbraucherstreitbeilegung</h2>
    <p>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
    <!-- TODO Bilal: mit Herrn Hühn klären (Pflichtangabe nach § 36 VSBG, weil mehr als zehn Beschäftigte). -->
    <h2>Bildnachweis</h2>
    <p>Fotos: rh Construction GmbH.</p>
    <!-- TODO Bilal: Fotograf der RXT-Serie und des Porträts erfragen, Nutzungsrecht bestätigen lassen. -->
  </div></div></section>`,
  };
}

function datenschutz(s) {
  return {
    pfad: "datenschutz/",
    titel: "Datenschutz | rh Construction GmbH",
    beschreibung: "Datenschutzerklärung der rh Construction GmbH, Bürstadt.",
    robots: "noindex, follow",
    ohneBeratung: true,
    inhalt: `
  ${seitenkopf(s, { titel: "Datenschutz", text: "Diese Website setzt keine Cookies, zählt keine Besucher und lädt nichts von fremden Servern." })}
  <section class="abschnitt"><div class="rahmen"><div class="rechtstext">
    <h2>1. Verantwortlicher</h2>
    <p>rh Construction GmbH, vertreten durch den Geschäftsführer Dipl.-Ing. Rainer Hühn<br>${BETRIEB.strasse}, ${BETRIEB.plz} ${BETRIEB.ort}<br>Telefon <a href="${BETRIEB.telefonLink}">${BETRIEB.telefon}</a> · <a href="mailto:${BETRIEB.mail}">${BETRIEB.mail}</a></p>
    <h2>2. Hosting und Server-Protokolle</h2>
    <!-- TODO Bilal: Vorschau liegt auf GitHub Pages; dieser Abschnitt beschreibt den geplanten Livebetrieb bei ALL-INKL – vor dem Livegang prüfen. -->
    <p>Die Website liegt bei ALL-INKL.COM – Neue Medien Münnich, Inhaber René Münnich, Hauptstraße 68, 02742 Friedersdorf. Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO.</p>
    <p>Beim Aufruf einer Seite speichert der Server automatisch, was jeder Browser übermittelt: IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, übertragene Datenmenge, Browser und Betriebssystem sowie die zuvor besuchte Seite. Das ist nötig, um die Website sicher und stabil auszuliefern (Art. 6 Abs. 1 lit. f DSGVO). Die Protokolle werden nur so lange aufbewahrt, wie es dafür erforderlich ist.</p>
    <h2>3. Kontaktformular und E-Mail</h2>
    <p>Wenn Sie das Anfrageformular nutzen, werden Ihre Angaben an unseren Webserver übertragen und von dort per E-Mail an ${BETRIEB.mail} weitergeleitet. Wir verwenden sie ausschließlich zur Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b DSGVO); ein externer Dienst wird dafür nicht eingesetzt. Zum Schutz vor Missbrauch wird ein nicht umkehrbarer Hashwert Ihrer IP-Adresse höchstens eine Stunde lang gespeichert, um zu viele Anfragen in kurzer Zeit zu begrenzen (Art. 6 Abs. 1 lit. f DSGVO). Beim Absenden wird außerdem ein technisch notwendiges Sitzungs-Cookie gesetzt, das doppelte Absendungen verhindert; es wird beim Schließen des Browsers gelöscht.</p>
    <p>Wir nutzen diese Angaben nur, um Ihre Anfrage zu beantworten und gegebenenfalls ein Angebot zu erstellen (Art. 6 Abs. 1 lit. b DSGVO) sowie auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Sie jederzeit für die Zukunft widerrufen können. Kommt kein Auftrag zustande, löschen wir die Nachricht, sobald die Anfrage erledigt ist; sonst gelten die gesetzlichen Aufbewahrungsfristen (sechs bzw. zehn Jahre). Dasselbe gilt, wenn Sie uns anrufen oder direkt eine E-Mail schreiben.</p>
    <h2>4. Links zu anderen Diensten</h2>
    <p>Auf dieser Website sind keine Karten, Videos oder Schriften fremder Anbieter eingebunden. Erst wenn Sie auf den Link zu Google Maps oder auf die Links zu Facebook und Instagram klicken, verlassen Sie diese Website; dann gelten die Datenschutzbestimmungen des jeweiligen Anbieters.</p>
    <h2>5. Ihre Rechte</h2>
    <p>Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20), Widerspruch (Art. 21) und Widerruf einer Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3). Eine formlose Nachricht an ${BETRIEB.mail} genügt. Außerdem können Sie sich beim Hessischen Beauftragten für Datenschutz und Informationsfreiheit, Gustav-Stresemann-Ring 1, 65189 Wiesbaden, beschweren.</p>
    <p style="margin-top: 32px; color: var(--grau)">Stand: September 2026</p>
  </div></div></section>`,
  };
}

function nichtGefunden(s) {
  return {
    pfad: "",
    datei: "404.html",
    titel: "Seite nicht gefunden | rh Construction GmbH",
    beschreibung: "Diese Seite gibt es nicht (mehr).",
    robots: "noindex, follow",
    ohneBeratung: true,
    inhalt: `
  ${seitenkopf(s, { titel: "Diese Seite gibt es nicht (mehr).", text: `Vielleicht hilft ein Blick auf unsere <a href="${s.u("leistungen/")}" style="color:#fff">Leistungen</a> oder die <a href="${s.u()}" style="color:#fff">Startseite</a>.` })}`,
  };
}

/* ====================================================================== */

export function alleSeiten(kontext) {
  const seite = (fn, pfad) => fn(kontext(pfad));
  return [
    seite(startseite, ""),
    seite(leistungen, "leistungen/"),
    seite(ueberUns, "ueber-uns/"),
    seite(referenzen, "referenzen/"),
    seite(kontakt, "kontakt/"),
    seite(impressum, "impressum/"),
    seite(datenschutz, "datenschutz/"),
    seite(nichtGefunden, ""),
  ];
}
