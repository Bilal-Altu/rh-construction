# rh Construction GmbH – Entwurf

Gratis-Entwurf für die **rh Construction GmbH**, Die Lächner 11, 68642 Bürstadt
(Geschäftsführer Dipl.-Ing. Rainer Hühn). Die alte Seite ist ein WordPress-Baukasten
von drmotionmedia: [rhconstruction.de](https://rhconstruction.de/).

- Eine Seite `index.html`, CSS und JavaScript inline, dazu `impressum.html` und `datenschutz.html`
- Schrift **Schibsted Grotesk** (variabel, selbst ausgeliefert, 47 KB)
- Bilder als AVIF mit WebP als Rückfall, gebaut mit
  `bash "C:/Users/bilal/Desktop/rh Construction/werkzeug/bilder-bauen.sh"`
  aus den Originalen in `Desktop\rh Construction\quelle\` (nicht im Repo)
- Kein Cookie, kein fremder Server, keine eingebettete Karte (eigene SVG-Karte mit Link)
- Vorschau steht auf `noindex` und ist per `robots.txt` gesperrt

## Gestaltung

- Weißes Blatt, Tinte `#0f151c`, einziges Blau `#2583c5` aus der Linie im Logo
  (`#15669e` für kleine blaue Schrift, `#0b4d8e` beim Überfahren)
- Keine runden Ecken, Haarlinien statt Kästen, Knöpfe schwarz und eckig
- Titel: „Vom Bad bis zur Werkshalle.“ – zwei Bilder als Türen für Eigentümer und
  Unternehmen; ein Klick darauf filtert die Leistungen
- Leistungen als Liste mit Vorschaubild am Desktop; Klick belegt das Anfrageformular vor
- Referenz KamÜ als Vorher/Nachher aus fast gleichem Blickwinkel

## Offene Punkte – vor dem Livegang klären

| Punkt | Stand | Wo |
|---|---|---|
| Handwerkskammer und Berufsbezeichnung | fehlt; Fliesenleger ist seit 2020 wieder Anlage A, zuständig wäre HWK Frankfurt-Rhein-Main | `impressum.html` (auskommentiert) |
| Registergericht | alte Seite nennt „Amtsgericht Lampertheim“ – laut Handelsregister **Darmstadt**, so eingetragen | `impressum.html` |
| Adresse | Kontaktseite der alten Seite nennt „Die Lächner **7**“, alle anderen Stellen **11** – 11 übernommen | überall |
| Verbraucherschlichtung | Standardsatz „nicht bereit und nicht verpflichtet“ – bestätigen lassen | `impressum.html` |
| Fotograf der RXT-Serie | Name und Nutzungsrecht erfragen (Gastronomie, Treppe, Lichthof, Wohnküche, Porträt) | `impressum.html` |
| Preisrahmen | Master-Prompt verlangt ihn; nichts erfunden, Antwort erklärt den Weg zum Preis | Fragen + FAQPage-JSON-LD |
| Typische Dauer | ebenso offen | Fragen |
| „Betrieb läuft weiter“ | plausibel für einen GU, aber nicht belegt | Fragen |
| „rh = Rainer Hühn“ | naheliegend, nicht bestätigt | Überschrift „Über uns“ |
| Prisman in Lorsch | Firmensitz und Ausbau 2025 liegen in Lorsch; ob die Halle dort steht, bestätigen | Projekte |
| Offene Stellen | nur allgemein formuliert | „Wir stellen ein“ |
| Rückrufzeit | bewusst ohne Zusage („wir rufen zurück“) | Anfrage |
| Hosting | Datenschutz beschreibt ALL-INKL; Vorschau liegt auf GitHub Pages | `datenschutz.html` |
| Formular | ohne Server, baut eine E-Mail; für ALL-INKL auf PHP-Versand umstellen | `index.html` |

## Livegang

1. `robots.txt` durch die auskommentierte Fassung ersetzen, in allen drei Seiten
   `noindex` → `index, follow`
2. Offene Punkte oben erledigen
3. Hochladen auf ALL-INKL, Domain rhconstruction.de umziehen

Lokal: `.claude/launch.json` → „rhconstruction“ (Port 4750),
Adresse `http://localhost:4750/rh-construction/index.html`.
