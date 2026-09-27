// Baut die aktualisierte Bestandsseite der rh Construction GmbH.
//
//   node _quelle/bauen.mjs
//
// Grundlage ist die bestehende Seite rhconstruction.de (Divi/WordPress von drmotionmedia):
// gleiche Seiten und Adressen, gleiche Texte und Farben – aufgeräumt, schneller, ohne Fehler.
// Die erzeugten HTML-Dateien nie von Hand ändern: Inhalt in leistungen.mjs und seiten.mjs,
// Rahmen (Kopfzeile, Menü, Fuß) hier. CSS und JS in assets/ bekommen automatisch ?v=<Prüfsumme>.
// Der eigene Entwurf vom 25.09.2026 liegt unter dem Git-Tag „eigener-entwurf“.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { alleSeiten } from "./seiten.mjs";
import { DOMAIN, BETRIEB, esc, SYMBOL } from "./helfer.mjs";

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
  const logo = (name, alt) => {
    const m = webpMasse(path.join(REPO, "bilder", `kunde-${name}.webp`));
    return `<img src="${u(`bilder/kunde-${name}.webp`)}" width="${m.w / 2}" height="${m.h / 2}" alt="${esc(alt)}" loading="lazy">`;
  };
  return { pfad, u, bild, logo };
}

/* ---------- Kopf, Fuß, Anrufleiste ---------- */
function kopf(s, seite) {
  const { u } = s;
  const punkt = (ziel, name) => `<li><a href="${u(ziel)}"${seite.pfad === ziel ? ' aria-current="page"' : ""}>${name}</a></li>`;
  return `<div class="leiste-oben">
  <div class="rahmen leiste-oben__innen">
    <a href="${BETRIEB.telefonLink}">${SYMBOL.telefon}${BETRIEB.telefon}</a>
    <a href="mailto:${BETRIEB.mail}">${SYMBOL.mail}${BETRIEB.mail}</a>
    <span class="leiste-oben__rechts">
      <a href="${BETRIEB.facebook}" target="_blank" rel="noopener" aria-label="rh Construction bei Facebook">${SYMBOL.facebook}</a>
      <a href="${BETRIEB.instagram}" target="_blank" rel="noopener" aria-label="rh Construction bei Instagram">${SYMBOL.instagram}</a>
    </span>
  </div>
</div>
<header class="kopf" id="kopf">
  <div class="rahmen kopf__innen">
    <nav class="nav nav--links" aria-label="Hauptmenü, erster Teil"><ul>${punkt("leistungen/", "Leistungen")}${punkt("ueber-uns/", "Über uns")}</ul></nav>
    <a class="kopf__logo" href="${u()}" aria-label="rh Construction GmbH – zur Startseite">
      <picture><source srcset="${u("bilder/logo.webp")}" type="image/webp"><img src="${u("bilder/logo.png")}" width="264" height="132" alt="rh Construction"></picture>
    </a>
    <nav class="nav nav--rechts" aria-label="Hauptmenü, zweiter Teil"><ul>${punkt("referenzen/", "Referenzen")}${punkt("kontakt/", "Kontakt")}</ul></nav>
    <button class="kopf__menue" type="button" aria-expanded="false" aria-controls="navigation-mobil">Menü <span aria-hidden="true"></span></button>
  </div>
  <nav class="nav-mobil" id="navigation-mobil" aria-label="Menü">
    <ul>
      ${punkt("", "Startseite")}${punkt("leistungen/", "Leistungen")}${punkt("ueber-uns/", "Über uns")}${punkt("referenzen/", "Referenzen")}${punkt("kontakt/", "Kontakt")}
    </ul>
    <p class="nav-mobil__kontakt"><a href="${BETRIEB.telefonLink}">${BETRIEB.telefon}</a><br><a href="mailto:${BETRIEB.mail}">${BETRIEB.mail}</a></p>
  </nav>
</header>`;
}

function beratung(s, seite) {
  if (seite.ohneBeratung) return "";
  return `<section class="beratung" aria-label="Beratung">
  <div class="rahmen beratung__innen">
    <p class="beratung__satz">Jetzt beraten lassen.</p>
    <a class="knopf knopf--hell" href="${BETRIEB.telefonLink}">${SYMBOL.telefon}Jetzt anrufen</a>
  </div>
</section>`;
}

function fuss(s, seite) {
  const { u } = s;
  return `<footer class="fuss">
  <div class="rahmen fuss__oben">
    <div>
      <p class="fuss__name">rh Construction GmbH</p>
      <p class="fuss__spruch">Bauen ohne Limit – seit 2005</p>
      ${seite.fussOhneKontakt ? "" : `<address>
        ${BETRIEB.strasse}<br>${BETRIEB.plz} ${BETRIEB.ort}<br>
        <a href="${BETRIEB.telefonLink}">${BETRIEB.telefon}</a><br>
        <a href="mailto:${BETRIEB.mail}">${BETRIEB.mail}</a>
      </address>`}
    </div>
    <div>
      <h2 class="fuss__titel">Öffnungszeiten</h2>
      <p>${BETRIEB.zeiten}</p>
    </div>
    <nav aria-labelledby="fuss-seiten">
      <h2 class="fuss__titel" id="fuss-seiten">Seiten</h2>
      <ul>
        <li><a href="${u("leistungen/")}">Leistungen</a></li>
        <li><a href="${u("ueber-uns/")}">Über uns</a></li>
        <li><a href="${u("referenzen/")}">Referenzen</a></li>
        <li><a href="${u("kontakt/")}">Kontakt</a></li>
      </ul>
    </nav>
    <div class="fuss__sozial">
      <a href="${BETRIEB.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${SYMBOL.facebook}</a>
      <a href="${BETRIEB.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${SYMBOL.instagram}</a>
    </div>
  </div>
  <div class="rahmen fuss__unten">
    <span>© 2026 rh Construction GmbH</span>
    <a href="${u("impressum/")}">Impressum</a>
    <a href="${u("datenschutz/")}">Datenschutz</a>
    <span class="fuss__recht">${BETRIEB.register}</span>
  </div>
</footer>
<nav class="anrufleiste" aria-label="Schnellkontakt">
  <a href="${BETRIEB.telefonLink}">${SYMBOL.telefon}Anrufen</a>
  <a href="${seite.leisteAnfrage || u("kontakt/") + "#formular"}">Anfrage</a>
</nav>`;
}

/* ---------- Seite zusammensetzen ---------- */
const pruefsumme = (datei) => crypto.createHash("sha1").update(fs.readFileSync(path.join(REPO, datei))).digest("hex").slice(0, 8);
const V_CSS = pruefsumme("assets/stil.css");
const V_JS = pruefsumme("assets/seite.js");

function html(s, seite) {
  const canonical = DOMAIN + seite.pfad;
  const og = DOMAIN + (seite.ogBild || "bilder/held-1280.webp");
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
<meta property="og:title" content="${esc(seite.titel)}">
<meta property="og:description" content="${esc(seite.beschreibung)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${og}">
<meta name="theme-color" content="#05488c">
<link rel="icon" href="${s.u("favicon.svg")}" type="image/svg+xml">
<link rel="preload" href="${s.u("schrift/rubik.woff2")}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${s.u("schrift/open-sans.woff2")}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${s.u("assets/stil.css")}?v=${V_CSS}">
<script src="${s.u("assets/seite.js")}?v=${V_JS}" defer></script>
${schema}
</head>
<body>
<a class="springen" href="#inhalt">Zum Inhalt springen</a>
${kopf(s, seite)}
<main id="inhalt">
${seite.inhalt}
${beratung(s, seite)}
</main>
${fuss(s, seite)}
</body>
</html>
`;
}

/* ---------- Bauen ---------- */
const seiten = alleSeiten(kontext);
const warnungen = [];
for (const seite of seiten) {
  const s = kontext(seite.pfad);
  const datei = seite.datei || path.join(seite.pfad, "index.html");
  const ziel = path.join(REPO, datei);
  fs.mkdirSync(path.dirname(ziel), { recursive: true });
  fs.writeFileSync(ziel, html(s, seite));
  if ([...seite.titel].length > 60) warnungen.push(`Title zu lang (${[...seite.titel].length}): ${seite.titel}`);
  if ([...seite.beschreibung].length > 155) warnungen.push(`Description zu lang (${[...seite.beschreibung].length}): ${seite.pfad}`);
  const h1 = (seite.inhalt.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) warnungen.push(`${h1} × h1 auf ${seite.pfad || "Startseite"}`);
}

const urls = seiten.filter((x) => !x.datei && !x.robots).map((x) => `  <url>\n    <loc>${DOMAIN}${x.pfad}</loc>\n    <lastmod>${HEUTE}</lastmod>\n  </url>`);
fs.writeFileSync(path.join(REPO, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);

console.log(`${seiten.length} Seiten geschrieben, CSS ?v=${V_CSS}, JS ?v=${V_JS}`);
for (const w of warnungen) console.log("WARNUNG: " + w);
