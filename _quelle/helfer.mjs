// Gemeinsame Angaben und kleine Helfer für bauen.mjs, seiten.mjs und leistungen.mjs.

export const DOMAIN = "https://rhconstruction.de/";

export const BETRIEB = {
  name: "rh Construction GmbH",
  strasse: "Die Lächner 11",
  plz: "68642",
  ort: "Bürstadt",
  telefon: "06206 909088-0",
  telefonLink: "tel:+4962069090880",
  telefonSchema: "+49 6206 9090880",
  mail: "info@rhconstruction.de",
  zeiten: "Montag bis Freitag, 7:30–16:00 Uhr",
  zeitenKurz: "Mo–Fr 7:30–16:00 Uhr",
  karte: "https://maps.app.goo.gl/kjDpQEW5po2kp3t38",
  facebook: "https://www.facebook.com/rhconstruction.de/",
  instagram: "https://www.instagram.com/rhconstruction_gmbh/",
  register: "Amtsgericht Darmstadt, HRB 94555",
  orte: ["Bürstadt", "Lampertheim", "Biblis", "Lorsch", "Bensheim", "Heppenheim", "Viernheim", "Worms", "Mannheim"],
  kunden: ["Frankfurter Volksbank", "Raiffeisenbank Ried-Überwald", "LG Energy Solution", "Apleona Real Estate", "Gateway Real Estate", "Quantum AG", "Prisman", "BC Bank Concept", "St. Thomas e. V.", "Fitseveneleven"],
};

export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export const ohneTags = (s) => String(s).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

export function krumenSchema(krumen) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: krumen.map(([name, ziel], i) => ({ "@type": "ListItem", position: i + 1, name, item: DOMAIN + (ziel ?? "") })),
  };
}

export function fragenSchema(fragen) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: fragen.map(([f, a]) => ({ "@type": "Question", name: ohneTags(f), acceptedAnswer: { "@type": "Answer", text: ohneTags(a) } })),
  };
}

export const ANBIETER = { "@type": "GeneralContractor", "@id": DOMAIN + "#betrieb", name: BETRIEB.name, url: DOMAIN };

export const pfeil = '<span class="pfeil" aria-hidden="true">→</span>';
