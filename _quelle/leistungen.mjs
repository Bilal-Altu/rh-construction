// Die zwölf Leistungen – Texte von rhconstruction.de (Stand 24.09.2026), nur sprachlich geglättet.
//
// anker:     Sprungmarke auf /leistungen/ – gleich wie auf der alten Seite, damit alte Links weiter passen
// start:     kurzer Satz im Raster der Startseite (mit <b> wie im Original)
// startbild: Bild im Raster der Startseite (wie im Original zugeordnet)
// bilder:    Bilder auf der Leistungsseite  ·  knopf: Beschriftung wie im Original

export const LEISTUNGEN = [
  {
    anker: "trockenbau",
    name: "Trockenbau",
    start: "Neue Wände, Decken und Verkleidungen – <b>präzise, sauber</b> und <b>termingerecht</b>",
    startbild: ["l-trockenbau", "Runde Deckenkuppel in Trockenbau über einem Erker"],
    text: [
      "Mit unserem professionellen Trockenbau schaffen wir individuelle Raumlösungen, die genau zu Ihren Bedürfnissen passen. Ob neue Wände, Decken oder Verkleidungen – wir arbeiten präzise, sauber und termingerecht, damit Ihr Projekt schnell Form annimmt.",
    ],
    bilder: [["l-trockenbau", "Runde Deckenkuppel in Trockenbau über einem Erker"], ["w-besprechung", "Besprechungsraum mit abgehängter Rasterdecke und Einbauleuchten"]],
    knopf: "Trockenbau anfragen",
  },
  {
    anker: "innenausbau",
    name: "Innenausbau",
    start: "Kompletter <b>Innenausbau von A bis Z</b>",
    startbild: ["w-wohnen", "Wohnküche mit Ziegelwand, Eichenboden und schwarzer Küchenzeile"],
    text: [
      "Wir gestalten Innenräume so, dass sie funktional und zugleich ein optisches Highlight sind. Vom Boden über die Wände bis zur Decke sorgen wir dafür, dass jedes Detail harmonisch aufeinander abgestimmt ist.",
    ],
    bilder: [["w-wohnen", "Wohnküche mit Ziegelwand, Eichenboden und schwarzer Küchenzeile"], ["w-gastro", "Gastraum mit Pendelleuchten, Sitzbank und Wand in Terrakotta"]],
    knopf: "Innenausbau starten",
  },
  {
    anker: "gartendesign",
    name: "Gartendesign",
    start: "Wir lassen Ihren <b>Garten</b> neu aufleben",
    startbild: ["l-garten", "Geschwungener Gartenweg aus Natursteinplatten zwischen Lavendel"],
    text: [
      "Ein schöner Garten beginnt mit einer guten Idee. Wir planen und gestalten Ihren Außenbereich so, dass er praktisch und zugleich ein Ort zum Wohlfühlen wird.",
      "Eine Außenanlage überzeugt dann, wenn sie sauber geplant, fachlich durchdacht und handwerklich solide umgesetzt ist. Wir orientieren uns an bewährten Standards des Garten- und Landschaftsbaus: klare Linien, funktionale Strukturen, langlebige Materialien und ein Aufbau, der auch in zehn Jahren noch Bestand hat.",
      "Wegeführung, Terrassen, Grünflächen, Pflanzzonen und Entwässerung greifen präzise ineinander. So wird aus Ihrem Grundstück ein repräsentatives, pflegeleichtes Gesamtbild – wertbeständig, technisch sauber und auf lange Nutzung ausgelegt.",
    ],
    bilder: [["l-garten", "Geschwungener Gartenweg aus Natursteinplatten zwischen Lavendel"], ["garten-terrasse", "Rasenfläche mit Natursteinmauer am Hang"], ["garten-pflaster", "Eng gesetztes Kleinpflaster aus Granit"]],
    knopf: "Garten gestalten lassen",
  },
  {
    anker: "altbausanierung",
    name: "Altbausanierung",
    start: "<b>Seriöse Kostenermittlung</b> und konsequente <b>Terminüberwachung</b>",
    startbild: ["altbau-gebaelk", "Holzbalken eines alten Dachstuhls"],
    text: [
      "Wir verbinden den Charme alter Bausubstanz mit moderner Technik und hochwertiger Ausführung. Mit Erfahrung und Sorgfalt erhalten wir den Wert Ihres Gebäudes und bringen es gleichzeitig auf den neuesten Stand.",
      "Vor dem ersten Abbruch steht eine seriöse Kostenermittlung, während der Bauzeit eine konsequente Terminüberwachung.",
    ],
    bilder: [["l-altbau", "Innenhof eines sanierten Altbaus mit Pflaster, Sesseln und Olivenbaum"], ["w-lichthof", "Lichthof mit Glasdach über einer sanierten Altbaufassade"], ["altbau-gebaelk", "Holzbalken eines alten Dachstuhls"]],
    knopf: "Altbau sanieren",
  },
  {
    anker: "bodenbelaege",
    name: "Bodenbeläge",
    start: "Klassische und <b>moderne Bodenbeläge</b> wie <b>Vinyl</b>",
    startbild: ["l-boden", "Ladenfläche mit Holzboden"],
    text: [
      "Der passende Boden verleiht jedem Raum Charakter. Ob Parkett, Vinyl oder Teppich – wir beraten Sie bei der Auswahl und verlegen Ihren Wunschboden präzise und langlebig.",
    ],
    bilder: [["l-boden", "Ladenfläche mit Holzboden"], ["prisman-halle", "Beschichteter, hell glänzender Hallenboden"]],
    knopf: "Boden verlegen lassen",
  },
  {
    anker: "fliesentechnik",
    name: "Fliesenarbeiten",
    start: "<b>Hochwertige</b> Materialien und <b>erstklassige</b> Verlegung – auch im <b>Bestand</b>",
    startbild: ["w-treppe2", "Treppenpodest mit Granitplatten und Edelstahlgeländer"],
    text: [
      "Ob Standardformat oder Großformatfliese: Jede Fläche wird präzise ausgerichtet, sorgfältig verklebt und fachgerecht verfugt. Übergänge, Eckausbildungen, Abdichtungen und Gefälle führen wir so aus, dass sie technisch belastbar bleiben und im täglichen Betrieb überzeugen.",
      "Unser Anspruch ist klar: Fliesenarbeiten müssen dauerhaft halten und optisch sauber wirken. Genau dafür stehen wir – solide Verarbeitung, hochwertige Materialien und Ergebnisse, die Bestand haben.",
    ],
    bilder: [["l-fliesen", "Flur mit großformatigen dunklen Bodenfliesen"], ["w-treppe2", "Treppenpodest mit Granitplatten und Edelstahlgeländer"], ["w-treppe", "Treppe mit schwarzen Stufen und poliertem Granitboden"]],
    knopf: "Jetzt Fliesen auswählen",
  },
  {
    anker: "malerundtapezierarbeiten",
    name: "Maler- und Tapezierarbeiten",
    kurzname: "Malerarbeiten",
    start: "Wir setzen auf <b>aktuelle Kollektionen</b> und <b>zeitgemäße Dekore</b>",
    startbild: ["l-maler", "Empfang einer Arztpraxis mit Säulen in Hellgrün"],
    text: [
      "Ein neuer Anstrich oder frische Tapeten verändern die Wirkung eines Raumes spürbar. Wir setzen auf aktuelle Kollektionen und zeitgemäße Dekore, bereiten alle Flächen sorgfältig vor, arbeiten sauber und schaffen ein Ergebnis, das überzeugt.",
    ],
    bilder: [["l-maler", "Empfang einer Arztpraxis mit Säulen in Hellgrün"], ["kamue-treppe", "Wand in Olivgrün an einer neuen Stahltreppe"]],
    knopf: "Farben & Tapeten wählen",
  },
  {
    anker: "abdichtungen",
    name: "Abdichtungen",
    start: "Abdichtungen mit <b>neuesten Stoffen</b> und <b>langer Haltbarkeit</b>",
    startbild: ["l-sanitaer", "Bad mit Natursteinwand und beleuchtetem Spiegel"],
    text: [
      "Feuchtigkeitsschäden können hohe Kosten verursachen. Mit unseren Abdichtungslösungen schützen wir Ihr Gebäude langfristig, fachgerecht und zuverlässig – mit neuesten Stoffen und langer Haltbarkeit.",
    ],
    bilder: [["l-sanitaer", "Bad mit Natursteinwand und beleuchtetem Spiegel"]],
    knopf: "Abdichtung sichern",
  },
  {
    anker: "balkonsanierungen",
    name: "Balkonsanierung",
    start: "<b>Erstklassige Qualität</b>, zum Beispiel mit Systemen von <b>SCHÖNOX BALTERRA</b>",
    startbild: ["l-balkon", "Sanierter Laubengang mit neuem Belag"],
    text: [
      "Ein Balkon ist oft ein Rückzugsort und ein Stück Lebensqualität. Wir sanieren ihn so, dass er wieder sicher, optisch ansprechend und viele Jahre nutzbar ist – mit erstklassigen Systemen, zum Beispiel von SCHÖNOX BALTERRA.",
    ],
    bilder: [["l-balkon", "Sanierter Laubengang mit neuem Belag und Metallgeländer"]],
    knopf: "Balkon sanieren lassen",
  },
  {
    anker: "pooltechnik",
    name: "Pooltechnik",
    start: "Poolbau von rh Construction – <b>stabil, leistungsfähig</b> und auf <b>langen Betrieb</b> ausgelegt",
    startbild: ["l-pool", "Beleuchteter Pool am Abend mit Palmen"],
    text: [
      "Pooltechnik funktioniert nur dann zuverlässig, wenn jedes Bauteil sauber geplant, fachgerecht installiert und aufeinander abgestimmt ist. Wir setzen bewusst auf Systeme, die sich über Jahre bewährt haben – robuste Pumpen, leistungsstarke Filteranlagen, stabile Rohrleitungen und Steuerungen mit klarer Bedienung.",
      "Im Mittelpunkt steht eine präzise aufgebaute Technikzentrale: durchdachte Leitungswege, sichere Anschlüsse, richtige Druckverhältnisse und eine Installation, die auch im Servicefall übersichtlich bleibt. So entsteht eine Anlage, die langfristig wartungsarm läuft.",
      "Unser Anspruch ist einfach: Ein Pool muss technisch solide sein, damit Wasserqualität, Sicherheit und Energieeffizienz jederzeit stimmen.",
    ],
    bilder: [["l-pool", "Beleuchteter Pool am Abend mit Palmen und Natursteinmauer"]],
    knopf: "Jetzt Pool planen",
  },
  {
    anker: "sanitaertechnik",
    name: "Sanitärtechnik",
    start: "Moderne <b>Heiztechnik</b> und <b>Sanitärlösungen</b> für <b>Neubau, Sanierung</b> oder <b>Modernisierung</b>",
    startbild: ["l-abdichtung", "Bodengleiche Dusche mit Natursteinwand"],
    text: [
      "Moderne Heizungs- und Sanitärsysteme sorgen für Komfort und Effizienz. Wir planen und installieren Anlagen für Neubau, Sanierung und Modernisierung, die Ihren Anforderungen entsprechen und lange halten.",
    ],
    bilder: [["titel-bad", "Bodengleiche Dusche mit blau gemusterten Zementfliesen"], ["l-abdichtung", "Bodengleiche Dusche mit Natursteinwand und Glastrennwand"]],
    knopf: "Sanitär anfragen",
  },
  {
    anker: "planungundgeneralunternehmen",
    name: "Planung und Generalunternehmen",
    kurzname: "Planung und GU",
    start: "Als <b>Generalunternehmen</b> wickeln wir Ihr gesamtes Bauvorhaben ab. <b>Alles aus einer Hand.</b>",
    startbild: ["garten-haus", "Haus aus Naturstein mit Rasen und Olivenbaum"],
    text: [
      "Jedes erfolgreiche Projekt beginnt mit einer guten Planung. Wir beraten Sie individuell und entwickeln ein Konzept, das Ihre Vorstellungen optimal umsetzt.",
      "Als Generalunternehmen wickeln wir Ihr gesamtes Bauvorhaben ab: Sie haben einen Vertrag und einen Ansprechpartner, wir stimmen alle Gewerke ab. Alles aus einer Hand.",
    ],
    bilder: [["kamue-nachher", "Das KamÜ in Bürstadt nach dem Umbau als Generalunternehmen"], ["garten-haus", "Haus aus Naturstein mit Rasen und Olivenbaum"]],
    knopf: "Beratung einholen",
  },
];
