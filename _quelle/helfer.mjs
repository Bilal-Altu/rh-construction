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
  // Kundenlogos wie auf der alten Seite (Name der Datei bilder/kunde-<logo>.webp, Alternativtext)
  kunden: [
    ["frankfurter-volksbank", "Frankfurter Volksbank"],
    ["raiffeisenbank", "Raiffeisenbank Ried-Überwald"],
    ["lg-energy-solution", "LG Energy Solution"],
    ["apleona", "Apleona Real Estate"],
    ["gateway", "Gateway Real Estate"],
    ["quantum", "Quantum AG"],
    ["prisman", "Prisman"],
    ["bc-bankconcept", "BC Bank Concept"],
    ["st-thomas", "St. Thomas e. V."],
    ["fitseveneleven", "Fitseveneleven"],
  ],
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



/* ---------- Symbole (ersetzen die Divi-Symbolschrift, die auf der alten Seite als „9“ erschien) ---------- */
export const SYMBOL = {
  telefon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z"/></svg>',
  ort: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>',
  uhr: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',
  haus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 8V6.5c0-.7.2-1.1 1.2-1.1H17V2h-2.8C11 2 10 3.7 10 6.2V8H8v3.3h2V22h4V11.3h2.7L17 8z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 7.3A4.7 4.7 0 1 0 16.7 12 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm6-7.9a1.1 1.1 0 1 1-1.1-1.1A1.1 1.1 0 0 1 18 7.1zM21.9 7a5.4 5.4 0 0 0-1.5-3.9A5.5 5.5 0 0 0 16.5 1.6C15 1.5 9 1.5 7.5 1.6a5.5 5.5 0 0 0-3.9 1.5A5.5 5.5 0 0 0 2.1 7c-.1 1.5-.1 7.5 0 9a5.4 5.4 0 0 0 1.5 3.9 5.5 5.5 0 0 0 3.9 1.5c1.5.1 7.5.1 9 0a5.4 5.4 0 0 0 3.9-1.5 5.5 5.5 0 0 0 1.5-3.9c.1-1.5.1-7.5 0-9zm-2.2 11.2a3 3 0 0 1-1.7 1.7c-1.2.5-4 .4-5.3.4s-4.1.1-5.3-.4a3 3 0 0 1-1.7-1.7c-.5-1.2-.4-4-.4-5.3s-.1-4.1.4-5.3a3 3 0 0 1 1.7-1.7C8.6 5.4 11.4 5.5 12.7 5.5s4.1-.1 5.3.4a3 3 0 0 1 1.7 1.7c.5 1.2.4 4 .4 5.3s.1 4.1-.4 5.3z"/></svg>',
  haken: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>',
  doppelpfeil: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5.6 5 4.2 6.4 9.8 12l-5.6 5.6L5.6 19l7-7zm7 0-1.4 1.4 5.6 5.6-5.6 5.6 1.4 1.4 7-7z"/></svg>',
};

