// Baut alle Seiten der rh-Construction-Website aus den Bausteinen in diesem Ordner.
//
//   node _quelle/bauen.mjs
//
// Die erzeugten HTML-Dateien liegen danach im Repo-Stamm (index.html, leistungen/…/index.html usw.).
// Nie die erzeugten Dateien von Hand ändern – Inhalt in leistungen.mjs und seiten.mjs,
// Rahmen (Kopf, Menü, Fuß) hier. CSS und JS liegen in assets/ und bekommen automatisch ?v=<Prüfsumme>.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { LEISTUNGEN } from "./leistungen.mjs";
import { alleSeiten } from "./seiten.mjs";
import { DOMAIN, BETRIEB, esc, ohneTags } from "./helfer.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// 404.html wird unter beliebigen Adressen ausgeliefert – dort gehen keine relativen Pfade.
// Vorschau auf GitHub Pages: "/rh-construction/". Beim Livegang auf rhconstruction.de: "/".
const BASIS_404 = "/rh-construction/";
// Vorschau bleibt aus Suchmaschinen draußen. Beim Livegang: "index, follow".
const ROBOTS = "noindex, nofollow";
const HEUTE = new Date().toISOString().slice(0, 10);

/* ---------- Bilder: verfügbare Breiten und Maße aus bilder/ lesen ---------- */
const BILDER = {};
for (const datei of fs.readdirSync(path.join(REPO, "bilder"))) {
  const m = datei.match(/^(.+)-(\d+)\.webp$/);
  if (m) (BILDER[m[1]] ||= []).push(+m[2]);
}
for (const k in BILDER) BILDER[k].sort((a, b) => a - b);

function webpMasse(datei) {
  const b = fs.readFileSync(datei);
  const typ = b.toString("ascii", 12, 16);
  if (typ === "VP8 ") return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
  if (typ === "VP8L") { const bits = b.readUInt32LE(21); return { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1 }; }
  if (typ === "VP8X") return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
  throw new Error("Unbekanntes WebP: " + datei);
}

/* ---------- Kontext je Seite: relative Pfade, Bilder ---------- */
function kontext(pfad) {
  const tiefe = pfad.split("/").filter(Boolean).length;
  const wurzel = "../".repeat(tiefe);
  const u = (ziel = "") => (wurzel + ziel) || "./";
  const bild = (name, o = {}) => {
    const breiten = BILDER[name];
    if (!breiten) throw new Error("Bild fehlt: " + name);
    const m = webpMasse(path.join(REPO, "bilder", `${name}-${breiten[0]}.webp`));
    const sizes = o.sizes || "100vw";
    const set = (ext) => breiten.map((w) => `${u(`bilder/${name}-${w}.${ext}`)} ${w}w`).join(", ");
    const laden = o.prio ? ' fetchpriority="high"' : ' loading="lazy"';
    const klasse = o.klasse ? ` class="${o.klasse}"` : "";
    return `<picture${o.attr || ""}><source type="image/avif" srcset="${set("avif")}" sizes="${sizes}"><img src="${u(`bilder/${name}-${breiten[0]}.webp`)}" srcset="${set("webp")}" sizes="${sizes}" width="${m.w}" height="${m.h}" alt="${esc(o.alt || "")}"${laden}${klasse}></picture>`;
  };
  return { pfad, wurzel, u, bild, BETRIEB, LEISTUNGEN, esc, ohneTags, karte: () => karte(), leistung: (slug) => LEISTUNGEN.find((l) => l.slug === slug) };
}

/* ---------- Bausteine ---------- */
const TELEFON_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2"/></svg>';

function kopf(s, seite) {
  const { u } = s;
  // aria-current nur auf der Seite selbst; im Bereich darüber (z. B. Projekt → „Projekte“) nur hervorheben
  const ziele = { "fuer-unternehmen": "fuer-unternehmen/", "fuer-eigentuemer": "fuer-eigentuemer/", leistungen: "leistungen/", projekte: "projekte/", "ueber-uns": "ueber-uns/", karriere: "karriere/", kontakt: "kontakt/" };
  const aktiv = (b) => (seite.pfad === ziele[b] ? ' aria-current="page"' : seite.bereich === b ? ' class="ist-bereich"' : "");
  const nurSeite = (ziel) => (seite.pfad === ziel ? ' aria-current="page"' : "");
  const leistungenAktiv = ["leistungen", "fuer-unternehmen", "fuer-eigentuemer"].includes(seite.bereich);
  const liste = LEISTUNGEN.map((l) => `<li><a href="${u(`leistungen/${l.slug}/`)}"><span class="nr">${l.nr}</span>${esc(l.kurzname || l.name)}</a></li>`).join("");
  return `<header class="kopf" id="kopf">
  <div class="rahmen kopf__innen">
    <a class="kopf__marke" href="${u()}" aria-label="rh Construction GmbH – zur Startseite">
      <picture><source srcset="${u("bilder/logo.webp")}" type="image/webp"><img src="${u("bilder/logo.png")}" width="264" height="132" alt="rh Construction"></picture>
      <span class="kopf__zusatz">Bauunternehmen<br>in Bürstadt</span>
    </a>
    <nav class="nav" aria-label="Hauptmenü">
      <ul>
        <li class="nav__mega">
          <button class="nav__auf${leistungenAktiv ? " ist-bereich" : ""}" type="button" aria-expanded="false" aria-controls="mega">Leistungen <svg viewBox="0 0 10 10" aria-hidden="true"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></button>
          <div class="mega" id="mega" hidden>
            <div class="rahmen mega__innen">
              <div class="mega__wege">
                <a class="weg" href="${u("fuer-unternehmen/")}"${nurSeite("fuer-unternehmen/")}><strong>Für Unternehmen</strong><span>Büros, Praxen, Gastronomie, Hallen</span></a>
                <a class="weg" href="${u("fuer-eigentuemer/")}"${nurSeite("fuer-eigentuemer/")}><strong>Für Eigentümer</strong><span>Bad, Balkon, Altbau, Garten, Pool</span></a>
                <a class="textlink" href="${u("leistungen/")}"${nurSeite("leistungen/")}>Alle Leistungen im Überblick <span class="pfeil" aria-hidden="true">→</span></a>
              </div>
              <ol class="mega__liste">${liste}</ol>
            </div>
          </div>
        </li>
        <li><a href="${u("projekte/")}"${aktiv("projekte")}>Projekte</a></li>
        <li><a href="${u("ueber-uns/")}"${aktiv("ueber-uns")}>Über uns</a></li>
        <li><a href="${u("karriere/")}"${aktiv("karriere")}>Karriere</a></li>
        <li><a href="${u("kontakt/")}"${aktiv("kontakt")}>Kontakt</a></li>
      </ul>
    </nav>
    <a class="kopf__telefon" href="${BETRIEB.telefonLink}">${TELEFON_SVG}${BETRIEB.telefon}</a>
    <button class="kopf__menue" type="button" aria-expanded="false" aria-controls="navigation-mobil">Menü <span aria-hidden="true"></span></button>
  </div>
  <nav class="nav-mobil" id="navigation-mobil" aria-label="Menü">
    <ul>
      <li><a href="${u("fuer-unternehmen/")}"${aktiv("fuer-unternehmen")}>Für Unternehmen</a></li>
      <li><a href="${u("fuer-eigentuemer/")}"${aktiv("fuer-eigentuemer")}>Für Eigentümer</a></li>
      <li><a href="${u("leistungen/")}"${aktiv("leistungen")}>Alle Leistungen</a></li>
      <li><a href="${u("projekte/")}"${aktiv("projekte")}>Projekte</a></li>
      <li><a href="${u("ueber-uns/")}"${aktiv("ueber-uns")}>Über uns</a></li>
      <li><a href="${u("karriere/")}"${aktiv("karriere")}>Karriere</a></li>
      <li><a href="${u("kontakt/")}"${aktiv("kontakt")}>Kontakt</a></li>
      <li class="klein"><a href="${u()}">Startseite</a></li>
    </ul>
  </nav>
</header>`;
}

function pfadLeiste(s, krumen) {
  if (!krumen) return "";
  const teile = krumen.map(([name, ziel], i) => {
    const letzte = i === krumen.length - 1;
    return letzte ? `<li><span aria-current="page">${esc(name)}</span></li>` : `<li><a href="${s.u(ziel)}">${esc(name)}</a></li>`;
  });
  return `<nav class="rahmen pfad" aria-label="Sie sind hier"><ol>${teile.join("")}</ol></nav>`;
}

function abschluss(s, a) {
  if (!a) return "";
  return `<section class="abschluss" aria-labelledby="abschluss-h">
    <div class="rahmen abschluss__innen">
      <div>
        <h2 id="abschluss-h">${a.titel}</h2>
        ${a.text ? `<p>${a.text}</p>` : ""}
      </div>
      <div class="knoepfe">
        <a class="knopf" href="${a.href || s.u("kontakt/")}">${a.knopf || "Anfrage stellen"} <span class="pfeil" aria-hidden="true">→</span></a>
        ${a.zweit ? `<a class="textlink" href="${a.zweit.href}">${a.zweit.text} <span class="pfeil" aria-hidden="true">→</span></a>` : ""}
      </div>
    </div>
  </section>`;
}

function fuss(s, seite) {
  const { u } = s;
  const leistungen = LEISTUNGEN.map((l) => `<li><a href="${u(`leistungen/${l.slug}/`)}">${esc(l.kurzname || l.name)}</a></li>`).join("");
  const kontaktDaten = seite.fussOhneKontakt ? "" : `
        <address>
          ${BETRIEB.strasse}, ${BETRIEB.plz} ${BETRIEB.ort}<br>
          <a href="${BETRIEB.telefonLink}">${BETRIEB.telefon}</a><br>
          <a href="mailto:${BETRIEB.mail}">${BETRIEB.mail}</a><br>
          ${BETRIEB.zeitenKurz}
        </address>`;
  return `<footer class="fuss">
    <div class="rahmen fuss__oben">
      <div>
        <p class="fuss__name">rh Construction GmbH</p>
        <p class="fuss__spruch">Bauen ohne Limit – seit 2005 in Bürstadt</p>${kontaktDaten}
      </div>
      <nav class="fuss__spalte fuss__leistungen" aria-labelledby="fuss-leistungen"><h2 id="fuss-leistungen">Leistungen</h2><ul>${leistungen}</ul></nav>
      <nav class="fuss__spalte" aria-labelledby="fuss-betrieb"><h2 id="fuss-betrieb">rh Construction</h2><ul>
        <li><a href="${u("fuer-unternehmen/")}">Für Unternehmen</a></li>
        <li><a href="${u("fuer-eigentuemer/")}">Für Eigentümer</a></li>
        <li><a href="${u("projekte/")}">Projekte</a></li>
        <li><a href="${u("ueber-uns/")}">Über uns</a></li>
        <li><a href="${u("karriere/")}">Karriere</a></li>
        <li><a href="${u("kontakt/")}">Kontakt</a></li>
      </ul></nav>
    </div>
    <div class="rahmen fuss__unten">
      <span>© 2026 rh Construction GmbH</span>
      <a href="${u("impressum/")}">Impressum</a>
      <a href="${u("datenschutz/")}">Datenschutz</a>
      <a href="${BETRIEB.facebook}" rel="noopener" target="_blank">Facebook</a>
      <a href="${BETRIEB.instagram}" rel="noopener" target="_blank">Instagram</a>
      <span class="fuss__recht">${BETRIEB.register}</span>
    </div>
  </footer>`;
}

function leiste(s, seite) {
  return `<nav class="leiste" aria-label="Schnellkontakt">
  <a href="${BETRIEB.telefonLink}">${TELEFON_SVG}Anrufen</a>
  <a href="${seite.leisteAnfrage || s.u("kontakt/")}">Anfrage</a>
</nav>`;
}

// Schematische Karte, aus echten Koordinaten gerechnet: x = (Länge − 8,30) · 1200, y = (49,75 − Breite) · 1851.
function karte() {
  const orte = [
    [61, 215, "Worms", 30, 238], [186, 112, "Biblis", 196, 116], [220, 55, "Groß-Rohrheim", 230, 59],
    [206, 283, "Lampertheim", 216, 287], [321, 178, "Lorsch", 331, 182], [387, 127, "Bensheim", 397, 131],
    [335, 390, "Viernheim", 345, 394], [199, 485, "Mannheim", 209, 489],
  ];
  const punkte = orte.map(([x, y, n, tx, ty]) => `<circle cx="${x}" cy="${y}" r="4" fill="#56606b"/><text x="${tx}" y="${ty}">${n}</text>`).join("");
  return `<a class="karte" href="${BETRIEB.karte}" target="_blank" rel="noopener" aria-label="Firmensitz ${BETRIEB.strasse} in Google Maps öffnen (neues Fenster)">
  <svg viewBox="0 0 480 510" role="img" aria-labelledby="karte-titel">
    <title id="karte-titel">Einsatzgebiet rund um Bürstadt: Worms, Biblis, Lampertheim, Lorsch, Bensheim, Heppenheim, Viernheim und Mannheim</title>
    <defs><clipPath id="karte-clip"><rect width="480" height="510"/></clipPath></defs>
    <g clip-path="url(#karte-clip)">
      <circle cx="186" cy="198" r="166" fill="none" stroke="#cdd6de" stroke-width="1" stroke-dasharray="3 5"/>
      <circle cx="186" cy="198" r="332" fill="none" stroke="#cdd6de" stroke-width="1" stroke-dasharray="3 5"/>
      <path d="M168 537 L174 463 L180 389 L168 333 L138 278 L108 241 L94 213 L102 167 L126 111 L144 56 L168 -10" fill="none" stroke="#b5d4ea" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="112" y="370" font-family="Schibsted Grotesk, Arial, sans-serif" font-size="12" fill="#5f7d94" font-style="italic">Rhein</text>
      <g font-family="Schibsted Grotesk, Arial, sans-serif" font-size="13" fill="#56606b">${punkte}<circle cx="406" cy="201" r="4" fill="#56606b"/><text x="398" y="222" text-anchor="end">Heppenheim</text></g>
      <rect x="179" y="191" width="14" height="14" fill="#0b4d8e"/>
      <text x="200" y="203" font-family="Schibsted Grotesk, Arial, sans-serif" font-size="15" font-weight="700" fill="#0f151c">Bürstadt</text>
    </g>
  </svg>
  <span class="karte__unter"><span>Schematische Karte, Ringe im Abstand von 10 km</span><span>Route planen ↗</span></span>
</a>`;
}

/* ---------- Seite zusammensetzen ---------- */
function pruefsumme(datei) {
  return crypto.createHash("sha1").update(fs.readFileSync(path.join(REPO, datei))).digest("hex").slice(0, 8);
}
const V_CSS = pruefsumme("assets/stil.css");
const V_JS = pruefsumme("assets/seite.js");

function html(s, seite) {
  const canonical = DOMAIN + seite.pfad;
  const og = DOMAIN + (seite.ogBild || "bilder/teilen.jpg");
  const schema = (seite.schema || []).map((o) => `<script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n</script>`).join("\n");
  const basis = seite.datei === "404.html" ? `<base href="${BASIS_404}">\n` : "";
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${basis}<title>${esc(seite.titel)}</title>
<meta name="description" content="${esc(seite.beschreibung)}">
<meta name="robots" content="${seite.robots || ROBOTS}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:locale" content="de_DE">
<meta property="og:site_name" content="rh Construction GmbH">
<meta property="og:title" content="${esc(seite.ogTitel || seite.titel)}">
<meta property="og:description" content="${esc(seite.beschreibung)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${og}">
<meta name="theme-color" content="#ffffff">
<link rel="icon" href="${s.u("favicon.svg")}" type="image/svg+xml">
<link rel="preload" href="${s.u("schrift/schibsted-grotesk.woff2")}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${s.u("assets/stil.css")}?v=${V_CSS}">
<script src="${s.u("assets/seite.js")}?v=${V_JS}" defer></script>
${schema}
</head>
<body>
<a class="springen" href="#inhalt">Zum Inhalt springen</a>
${kopf(s, seite)}
<main id="inhalt">
${pfadLeiste(s, seite.krumen)}
${seite.inhalt}
${abschluss(s, seite.abschluss)}
</main>
${fuss(s, seite)}
${leiste(s, seite)}
</body>
</html>
`;
}

/* ---------- Bauen ---------- */
const seiten = alleSeiten(kontext);
const warnungen = [];
const geschrieben = [];
for (const seite of seiten) {
  const s = kontext(seite.pfad);
  const datei = seite.datei || path.join(seite.pfad, "index.html");
  const ziel = path.join(REPO, datei);
  fs.mkdirSync(path.dirname(ziel), { recursive: true });
  fs.writeFileSync(ziel, html(s, seite));
  geschrieben.push(datei.replace(/\\/g, "/"));
  if ([...seite.titel].length > 60) warnungen.push(`Title zu lang (${[...seite.titel].length}): ${seite.titel}`);
  if ([...seite.beschreibung].length > 155) warnungen.push(`Description zu lang (${[...seite.beschreibung].length}): ${seite.pfad}`);
  const h1 = (seite.inhalt.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) warnungen.push(`${h1} × h1 auf ${seite.pfad || "Startseite"}`);
}

// Sitemap aus allen Seiten außer 404
const urls = seiten.filter((x) => !x.datei).map((x) => `  <url>\n    <loc>${DOMAIN}${x.pfad}</loc>\n    <lastmod>${HEUTE}</lastmod>\n  </url>`);
fs.writeFileSync(path.join(REPO, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);

console.log(`${geschrieben.length} Seiten geschrieben, CSS ?v=${V_CSS}, JS ?v=${V_JS}`);
for (const w of warnungen) console.log("WARNUNG: " + w);
