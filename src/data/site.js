// Zentrale Daten der Website: Kirchen, Reiter, Texte und Audio.
// Texte und Audio werden automatisch aus dem Ordner content/ gelesen.

export const gemeinde = 'Evangelische Gesamtkirchengemeinde Gießen Nord';
export const aktion = 'Deine Zeit – Kirche erleben';
export const projekt = 'Gemeindeprojekt von Joy Williges';
export const oeffnungszeiten = { zeitraum: '4.–17. Dezember', uhrzeit: 'täglich 16–18 Uhr' };

// Eigenes Impressum (Gemeinde als Anbieterin, Joy Williges als Projektverantwortliche) und Datenschutzhinweis nach § 17 DSG-EKD.
export const links = {
  impressum: '/impressum/',
  datenschutz: '/datenschutz/',
};

// Die "slug"-Werte stehen in den Adressen und auf den QR-Codes. Nicht ändern!
export const kirchen = [
  { slug: 'michaelskirche', name: 'Michaelskirche' },
  { slug: 'pauluskirche', name: 'Pauluskirche' },
];

export const reiter = [
  { slug: 'klang', name: 'Klang der Kirchen', audio: true },
  { slug: 'kirche-fuer-dich', name: 'Gedankenreisen', audio: true },
  { slug: 'segen', name: 'Segen spüren', audio: false },
  { slug: 'licht', name: 'Dein Licht im Advent', audio: false },
  { slug: 'andachten', name: 'Adventsandachten', audio: false },
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
// Gedankenreisen je Kirche: content/gedankenreisen/<kirche>/01-name.md
//   + optional gleichnamiges Foto (.jpg …) und gleichnamige Aufnahme (.mp3)
// Segen-Anleitungen für beide Kirchen: content/segen/<1-abschnitt>/01-name.md
const klappTexte = import.meta.glob(['/content/gedankenreisen/**/*.md', '/content/segen/**/*.md'], { eager: true });
const klappFotos = import.meta.glob(
  ['/content/gedankenreisen/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', '/content/segen/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}'],
  { eager: true, import: 'default' },
);

function klappEintrag(pfad, prefix) {
  const modul = klappTexte[pfad];
  const basis = pfad.replace(/\.md$/, '');
  const datei = basis.slice(basis.lastIndexOf('/') + 1);
  const fotoPfad = Object.keys(klappFotos).find((f) => f.replace(/\.[^.]+$/, '') === basis);
  return {
    id: prefix + datei,
    titel: modul.frontmatter.titel || datei.replace(/^\d+[-_ ]*/, '').replace(/[-_]+/g, ' '),
    Content: modul.Content,
    foto: fotoPfad ? { src: klappFotos[fotoPfad], alt: modul.frontmatter.bildbeschreibung || '' } : null,
    aufnahme: aufnahmeZu(basis),
  };
}

/** Aufklappbare Texte eines Ordners; Unterordner (1-Segen, 2-Tauferinnerung) werden zu Abschnitten. */
function klappAbschnitte(ordner, prefix) {
  const gruppen = new Map();
  for (const pfad of Object.keys(klappTexte).filter((p) => p.startsWith(ordner)).sort(nachName)) {
    const teile = pfad.slice(ordner.length).split('/');
    const gruppe = teile.length > 1 ? teile[0] : '';
    if (!gruppen.has(gruppe)) gruppen.set(gruppe, []);
    gruppen.get(gruppe).push(klappEintrag(pfad, prefix));
  }
  return [...gruppen.keys()].sort(nachName).map((g) => ({
    titel: g.replace(/^\d+[\s._-]*/, '').replace(/[-_]+/g, ' ').trim(),
    eintraege: gruppen.get(g),
  }));
}

/** Gedankenreisen einer Kirche (mit Foto und Aufnahme). */
export const gedankenreisen = (kirche) => klappAbschnitte(`/content/gedankenreisen/${kirche}/`, 'reise-');

/** Anleitungen Segen und Tauferinnerung (für beide Kirchen gleich), in Abschnitten. */
export const segenAnleitungen = () => klappAbschnitte('/content/segen/', 'anleitung-');

// ---------- Audio ----------
const mp3s = import.meta.glob(['/content/audio/**/*.mp3', '/content/gedankenreisen/**/*.mp3'], {
  eager: true,
  query: '?url',
  import: 'default',
});
const infos = import.meta.glob(['/content/audio/**/*.txt', '/content/gedankenreisen/**/*.txt'], {
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

function stueck(pfad) {
  const datei = pfad.slice(pfad.lastIndexOf('/') + 1);
  const info = infos[pfad.replace(/\.mp3$/i, '.txt')];
  const zeilen = info ? String(info).replace(/^﻿/, '').split(/\r?\n/).map((z) => z.trim()) : [];
  const titel = zeilen[0] || titelAusDateiname(datei);
  // Zweite Zeile: wer singt oder spielt. Weitere Zeilen: Beschreibung.
  const [mitwirkende = '', ...beschreibung] = zeilen.slice(1).filter(Boolean);
  return { src: mp3s[pfad], titel, mitwirkende, beschreibung: beschreibung.join(' ') };
}

const nachName = (a, b) => a.localeCompare(b, 'de', { numeric: true });

/**
 * Stücke für eine Kirche und einen Reiter, in Abschnitten.
 * Unterordner (z. B. 1-Advent, 2-Weihnachten) werden zu Abschnitten mit Überschrift;
 * Dateien direkt im Ordner bilden einen Abschnitt ohne Überschrift.
 */
export function audioAbschnitte(kirche, r) {
  const ordner = `/content/audio/${kirche}/${r}/`;
  const gruppen = new Map();
  for (const pfad of Object.keys(mp3s).filter((p) => p.startsWith(ordner)).sort(nachName)) {
    const teile = pfad.slice(ordner.length).split('/');
    const gruppe = teile.length > 1 ? teile[0] : '';
    if (!gruppen.has(gruppe)) gruppen.set(gruppe, []);
    gruppen.get(gruppe).push(stueck(pfad));
  }
  return [...gruppen.keys()].sort(nachName).map((g) => ({
    titel: g.replace(/^\d+[\s._-]*/, '').replace(/[-_]+/g, ' ').trim(),
    stuecke: gruppen.get(g),
  }));
}

/** Aufnahme mit gleichem Namen wie eine Textdatei (z. B. 01-engel.md + 01-engel.mp3), oder null. */
export function aufnahmeZu(basis) {
  const pfad = Object.keys(mp3s).find((p) => p.replace(/\.mp3$/i, '') === basis);
  return pfad ? stueck(pfad) : null;
}
