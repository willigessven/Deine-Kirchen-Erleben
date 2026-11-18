// Zentrale Daten der Website: Kirchen, Reiter, Texte und Audio.
// Texte und Audio werden automatisch aus dem Ordner content/ gelesen.

export const gemeinde = 'Evangelische Gesamtkirchengemeinde Gießen Nord';
export const aktion = 'Deine Zeit – Kirche erleben';
export const oeffnungszeiten = { zeitraum: '4.–17. Dezember', uhrzeit: 'täglich 16–18 Uhr' };

// Platzhalter: durch die echten Seiten der Gemeinde ersetzen.
export const links = {
  impressum: 'https://PLATZHALTER-DOMAIN.de/impressum',
  datenschutz: 'https://PLATZHALTER-DOMAIN.de/datenschutz',
};

// Die "slug"-Werte stehen in den Adressen und auf den QR-Codes. Nicht ändern!
export const kirchen = [
  { slug: 'michaelskirche', name: 'Michaelskirche' },
  { slug: 'pauluskirche', name: 'Pauluskirche' },
];

export const reiter = [
  { slug: 'licht', name: 'Dein Licht im Advent', audio: false },
  { slug: 'klang', name: 'Klang der Kirchen', audio: true },
  { slug: 'hoffnungsbild', name: 'Dein Hoffnungsbild', audio: false },
  { slug: 'andachten', name: 'Adventsandachten', audio: false },
  { slug: 'segen', name: 'Segen spüren', audio: false },
  { slug: 'kirche-fuer-dich', name: 'Kirche für dich', audio: true },
];

/** Adresse innerhalb der Website, funktioniert auch, wenn die Seite in einem Unterordner liegt. */
export function url(pfad = '/') {
  const basis = import.meta.env.BASE_URL.replace(/\/$/, '');
  return basis + pfad;
}

export function reiterUrl(kirche, r) {
  return url(`/${kirche}/${r}/`);
}

// ---------- Texte ----------
const texte = import.meta.glob('/content/texte/*.md', { eager: true });

export function text(name) {
  const modul = texte[`/content/texte/${name}.md`];
  if (!modul) throw new Error(`Textdatei fehlt: content/texte/${name}.md`);
  return modul;
}

// ---------- Audio ----------
const mp3s = import.meta.glob('/content/audio/**/*.mp3', {
  eager: true,
  query: '?url',
  import: 'default',
});
const infos = import.meta.glob('/content/audio/**/*.txt', {
  eager: true,
  query: '?raw',
  import: 'default',
});

/** Macht aus "01-Macht-hoch-die-Tuer.mp3" den Titel "Macht hoch die Tuer". */
function titelAusDateiname(datei) {
  return datei
    .replace(/\.mp3$/i, '')
    .replace(/^\d+[\s._-]*/, '')
    .replace(/[-_]+/g, ' ')
    .trim();
}

/** Alle Stücke für eine Kirche und einen Reiter, nach Dateiname sortiert. */
export function audioListe(kirche, r) {
  const ordner = `/content/audio/${kirche}/${r}/`;
  return Object.keys(mp3s)
    .filter((pfad) => pfad.startsWith(ordner) && !pfad.slice(ordner.length).includes('/'))
    .sort((a, b) => a.localeCompare(b, 'de', { numeric: true }))
    .map((pfad) => {
      const datei = pfad.slice(ordner.length);
      const info = infos[pfad.replace(/\.mp3$/i, '.txt')];
      const zeilen = info ? String(info).replace(/^﻿/, '').split(/\r?\n/).map((z) => z.trim()) : [];
      const titel = zeilen[0] || titelAusDateiname(datei);
      const hinweis = zeilen.slice(1).filter(Boolean).join(' ');
      return { src: mp3s[pfad], titel, hinweis };
    });
}
