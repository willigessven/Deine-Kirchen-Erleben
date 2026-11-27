// Zentrale Daten der Website: Kirchen, Reiter, Texte und Audio.
// Texte und Audio werden automatisch aus dem Ordner content/ gelesen.

export const gemeinde = 'Evangelische Gesamtkirchengemeinde Gießen Nord';
export const aktion = 'Deine Zeit – Kirche erleben';
export const oeffnungszeiten = { zeitraum: '4.–17. Dezember', uhrzeit: 'täglich 16–18 Uhr' };

// Impressum der Gemeinde (mit Zustimmung der KV-Vorsitzenden), eigener Datenschutzhinweis nach § 17 DSG-EKD.
export const links = {
  impressum: 'https://www.evangelisch-giessen-nord.de/kontakt',
  datenschutz: '/datenschutz/',
};

// Die "slug"-Werte stehen in den Adressen und auf den QR-Codes. Nicht ändern!
export const kirchen = [
  { slug: 'michaelskirche', name: 'Michaelskirche' },
  { slug: 'pauluskirche', name: 'Pauluskirche' },
];

export const reiter = [
  { slug: 'licht', name: 'Dein Licht im Advent', audio: false },
  { slug: 'klang', name: 'Klang der Kirchen', audio: true },
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

// ---------- Bilder ----------
// Ein Foto pro Kirche und Reiter: content/bilder/<kirche>/<reiter>/01-name.jpg
// + gleichnamige .txt mit der Bildbeschreibung (Alternativtext).
const fotos = import.meta.glob('/content/bilder/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
});
const bildtexte = import.meta.glob('/content/bilder/**/*.txt', {
  eager: true,
  query: '?raw',
  import: 'default',
});

/** Alle Fotos (nach Dateiname sortiert) für eine Kirche und einen Reiter. */
export function bilder(kirche, r) {
  const ordner = `/content/bilder/${kirche}/${r}/`;
  return Object.keys(fotos)
    .filter((p) => p.startsWith(ordner) && !p.slice(ordner.length).includes('/'))
    .sort((a, b) => a.localeCompare(b, 'de', { numeric: true }))
    .map((pfad) => {
      const info = bildtexte[pfad.replace(/\.[^.]+$/, '.txt')];
      const alt = info ? String(info).replace(/^﻿/, '').split(/\r?\n/)[0].trim() : '';
      return { src: fotos[pfad], alt };
    });
}

/** Das erste Foto für eine Kirche und einen Reiter, oder null. */
export function bild(kirche, r) {
  return bilder(kirche, r)[0] ?? null;
}

// ---------- Aufklappbare Texte ----------
// Gedankenreisen je Kirche: content/gedankenreisen/<kirche>/01-name.md (+ optional gleichnamiges Foto)
// Segen-Anleitungen für beide Kirchen: content/segen/01-name.md
const klappTexte = import.meta.glob(['/content/gedankenreisen/*/*.md', '/content/segen/*.md'], { eager: true });
const klappFotos = import.meta.glob(
  ['/content/gedankenreisen/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', '/content/segen/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}'],
  { eager: true, import: 'default' },
);

function klappListe(ordner, prefix) {
  return Object.keys(klappTexte)
    .filter((p) => p.startsWith(ordner) && !p.slice(ordner.length).includes('/'))
    .sort((a, b) => a.localeCompare(b, 'de', { numeric: true }))
    .map((pfad) => {
      const modul = klappTexte[pfad];
      const basis = pfad.replace(/\.md$/, '');
      const fotoPfad = Object.keys(klappFotos).find((f) => f.replace(/\.[^.]+$/, '') === basis);
      const name = basis.slice(ordner.length).replace(/^\d+[-_ ]*/, '').replace(/[-_]+/g, ' ');
      return {
        id: prefix + basis.slice(ordner.length),
        titel: modul.frontmatter.titel || name,
        Content: modul.Content,
        foto: fotoPfad ? { src: klappFotos[fotoPfad], alt: modul.frontmatter.bildbeschreibung || '' } : null,
      };
    });
}

/** Alle Gedankenreisen einer Kirche, sortiert nach Dateiname. */
export const gedankenreisen = (kirche) => klappListe(`/content/gedankenreisen/${kirche}/`, 'reise-');

/** Anleitungen Segen und Tauferinnerung (für beide Kirchen gleich). */
export const segenAnleitungen = () => klappListe('/content/segen/', 'anleitung-');

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
