# rh Construction GmbH – Entwurf

Gratis-Entwurf für die **rh Construction GmbH**, Die Lächner 11, 68642 Bürstadt
(Geschäftsführer Dipl.-Ing. Rainer Hühn). Die alte Seite ist ein WordPress-Baukasten
von drmotionmedia: [rhconstruction.de](https://rhconstruction.de/).

Vorschau: <https://bilal-altu.github.io/rh-construction/> (noindex, per `robots.txt` gesperrt).

## Aufbau – 25 Seiten

| Adresse | Inhalt |
|---|---|
| `/` | Startseite: zwei Türen (Eigentümer/Unternehmen), Zahlen, zwölf Gewerke, KamÜ vorher/nachher, Ablauf, Geschäftsführer |
| `/fuer-unternehmen/`, `/fuer-eigentuemer/` | Einstiegsseiten je Zielgruppe |
| `/leistungen/` | Übersicht mit Filter und Vorschaubild |
| `/leistungen/<gewerk>/` | zwölf Leistungsseiten: Umfang, Ablauf, Bilder, Projekte, Fragen, verwandte Leistungen |
| `/projekte/`, `/projekte/kamue-buerstadt/`, `/projekte/prisman-lorsch/` | Referenzen |
| `/ueber-uns/`, `/karriere/`, `/kontakt/` | Betrieb, Stellen, Anfrage mit Karte und allgemeinen Fragen |
| `/impressum/`, `/datenschutz/`, `404.html` | Rechtliches |

## So wird gebaut

Die HTML-Seiten werden **erzeugt** – nie von Hand ändern:

```
node _quelle/bauen.mjs
```

- `_quelle/leistungen.mjs` – die zwölf Leistungen (Texte, Bilder, Fragen)
- `_quelle/seiten.mjs` – alle übrigen Seiten und die Projekte
- `_quelle/bauen.mjs` – Kopf, Leistungsmenü, Fuß, Anrufleiste, Karte; schreibt Seiten und `sitemap.xml`,
  prüft Title (≤ 60), Description (≤ 155) und genau eine h1 je Seite
- `_quelle/helfer.mjs` – Adresse, Telefon, Kundenliste usw. an einer Stelle
- `assets/stil.css`, `assets/seite.js` – bekommen beim Bauen automatisch `?v=<Prüfsumme>`

`_quelle/` beginnt mit Unterstrich und wird von GitHub Pages nicht veröffentlicht;
beim Hochladen zu ALL-INKL ebenfalls weglassen.

Bilder: `bash "C:/Users/bilal/Desktop/rh Construction/werkzeug/bilder-bauen.sh"` aus den Originalen in
`Desktop\rh Construction\quelle\` (nicht im Repo), AVIF mit WebP als Rückfall. Der Generator liest
Breiten und Maße selbst aus `bilder/`.

Lokal: `.claude/launch.json` → „rhconstruction“ (Port 4750), Adresse
`http://localhost:4750/rh-construction/`.

## Gestaltung

- Weißes Blatt, Tinte `#0f151c`, einziges Blau `#2583c5` aus der Linie im Logo
  (`#15669e` für kleine blaue Schrift, `#0b4d8e` beim Überfahren); Schrift Schibsted Grotesk
- Keine runden Ecken, Haarlinien statt Kästen, Knöpfe schwarz und eckig
- Leistungsmenü am Desktop: Einstiege links, zwölf Gewerke rechts
- Am Handy feste Leiste „Anrufen / Anfrage“; Knöpfe mit derselben Aktion sind dort ausgeblendet
- Kein Cookie, kein fremder Server, keine eingebettete Karte (eigene SVG-Karte mit Link)

## Offene Punkte – vor dem Livegang klären

| Punkt | Stand | Wo |
|---|---|---|
| Handwerkskammer und Berufsbezeichnung | fehlt; Fliesenleger ist seit 2020 wieder Anlage A, zuständig wäre HWK Frankfurt-Rhein-Main | Impressum (auskommentiert) |
| Registergericht | alte Seite nennt „Amtsgericht Lampertheim“ – laut Handelsregister **Darmstadt**, so eingetragen | Impressum |
| Adresse | alte Kontaktseite nennt „Die Lächner **7**“, alle anderen Stellen **11** – 11 übernommen | überall |
| Verbraucherschlichtung | Standardsatz „nicht bereit und nicht verpflichtet“ – bestätigen lassen | Impressum |
| Fotograf der RXT-Serie und des Porträts | Name und Nutzungsrecht erfragen | Impressum |
| **Umfang je Gewerk** | Listen „Was dazugehört“ und Abläufe beruhen auf der alten Seite und allgemeinem Fachwissen – von Herrn Hühn gegenlesen lassen, v. a. Abdichtung (Keller/erdberührt?), Sanitär (Fußbodenheizung?), Trockenbau (Schallschutz) | `_quelle/leistungen.mjs` |
| Preisrahmen und typische Dauer | nichts erfunden, Antworten erklären den Weg zum Preis | Fragen |
| „Betrieb läuft weiter“ | plausibel für einen GU, aber nicht belegt | Für Unternehmen, Kontakt |
| „rh = Rainer Hühn“ | naheliegend, nicht bestätigt | Startseite, Über uns |
| Prisman in Lorsch | Firmensitz und Ausbau liegen in Lorsch; ob die Halle dort steht, bestätigen | Projekte |
| Offene Stellen | nur allgemein formuliert | Karriere |
| Rückrufzeit | bewusst ohne Zusage („wir rufen zurück“) | überall |
| Weitere Projekte | nur KamÜ und Prisman sind belegt; weitere mit Ort, Aufgabe, Ergebnis und Fotos anfragen | Projekte |
| Hosting | Datenschutz beschreibt ALL-INKL; Vorschau liegt auf GitHub Pages | Datenschutz |
| Formular | ohne Server, baut eine E-Mail; für ALL-INKL auf PHP-Versand umstellen | `assets/seite.js` |

## Livegang

1. In `_quelle/bauen.mjs` `ROBOTS` auf `"index, follow"` und `BASIS_404` auf `"/"` setzen, neu bauen
2. `robots.txt` durch die auskommentierte Fassung ersetzen
3. Offene Punkte oben erledigen
4. Hochladen auf ALL-INKL (ohne `_quelle/`, `README.md`, `.gitignore`), Domain rhconstruction.de umziehen
