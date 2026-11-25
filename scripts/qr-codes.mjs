// Erzeugt QR-Codes und A4-Druckvorlagen für beide Kirchen und alle sechs Reiter.
// Aufruf: npm run qr
// Ergebnis im Ordner qr-codes/. Jeder Code wird nach dem Erzeugen zur Kontrolle wieder ausgelesen.
// Die PDFs werden mit Microsoft Edge (falls installiert) erzeugt, sonst bleibt es bei den HTML-Vorlagen.

import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { PNG } from 'pngjs';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const BASIS = 'https://deine-kirchen-erleben.netlify.app';
const GEMEINDE = 'Evangelische Gesamtkirchengemeinde Gießen Nord';
const AKTION = 'Deine Zeit – Kirche erleben';
const ZIEL = path.resolve('qr-codes');

// Muss zu src/data/site.js passen (Slugs stehen auf den gedruckten Codes).
const kirchen = [
  { slug: 'michaelskirche', name: 'Michaelskirche' },
  { slug: 'pauluskirche', name: 'Pauluskirche' },
];
const reiter = [
  { slug: 'licht', name: 'Dein Licht im Advent', audio: false },
  { slug: 'klang', name: 'Klang der Kirchen', audio: true },
  { slug: 'hoffnungsbild', name: 'Dein Hoffnungsbild', audio: false },
  { slug: 'andachten', name: 'Adventsandachten', audio: false },
  { slug: 'segen', name: 'Segen spüren', audio: false },
  { slug: 'kirche-fuer-dich', name: 'Kirche für dich', audio: true },
];

const qrOpts = { errorCorrectionLevel: 'H', margin: 4, color: { dark: '#6b1e2e', light: '#ffffff' } };

/** Untertitel aus content/texte/<slug>.md (Frontmatter "untertitel"). */
function untertitel(slug) {
  try {
    const md = fs.readFileSync(path.resolve('content/texte', `${slug}.md`), 'utf8');
    const m = md.match(/^untertitel:\s*"?(.*?)"?\s*$/m);
    return m ? m[1] : '';
  } catch {
    return '';
  }
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Erzeugt SVG + PNG, prüft den Code und gibt das SVG zurück. */
async function code(url, datei) {
  fs.mkdirSync(path.dirname(datei), { recursive: true });
  const svg = await QRCode.toString(url, { ...qrOpts, type: 'svg' });
  fs.writeFileSync(`${datei}.svg`, svg);
  await QRCode.toFile(`${datei}.png`, url, { ...qrOpts, width: 1200 });
  const png = PNG.sync.read(fs.readFileSync(`${datei}.png`));
  const res = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
  if (!res || res.data !== url) throw new Error(`QR-Code fehlerhaft: ${datei} (${res && res.data})`);
  console.log('  OK', url);
  return svg;
}

const flamme =
  '<svg class="flamme" viewBox="0 0 40 60" aria-hidden="true"><path d="M20 2 C28 16 34 24 34 36 A14 14 0 0 1 6 36 C6 26 13 20 20 2 Z" fill="#e2b65a"/><path d="M20 22 C24 30 27 34 27 40 A7 7 0 0 1 13 40 C13 34 16 30 20 22 Z" fill="#fbf6ec" opacity=".85"/><rect x="18.5" y="50" width="3" height="10" rx="1.5" fill="#6b1e2e"/></svg>';

function blatt({ ueber, titel, unter, svg, hinweis, url }) {
  const qr = svg.replace('<svg ', `<svg class="qr" role="img" aria-label="QR-Code: ${esc(titel)}" `);
  return `
  <section class="blatt">
    ${flamme}
    <p class="aktion">${esc(ueber)}</p>
    <h1>${esc(titel)}</h1>
    ${unter ? `<p class="unter">${esc(unter)}</p>` : ''}
    <div class="linie"></div>
    ${qr}
    <p class="scan">Scanne mich mit deinem Handy</p>
    <p class="info">${hinweis}</p>
    <p class="url">${esc(url.replace(/^https:\/\//, ''))}</p>
    <p class="gemeinde">${esc(GEMEINDE)}</p>
  </section>`;
}

function dokument(titel, blaetter) {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>${esc(titel)}</title>
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  body { margin: 0; background: #ddd; font-family: Georgia, 'Times New Roman', serif; color: #2b1d1a; }
  .blatt {
    width: 210mm; height: 297mm; margin: 10mm auto; background: #fbf6ec;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; padding: 18mm; break-after: page; page-break-after: always;
    border: 3mm solid #6b1e2e;
  }
  .flamme { width: 14mm; }
  .aktion { font-size: 13pt; color: #6b1e2e; margin: 4mm 0 0; letter-spacing: .05em; text-transform: uppercase; }
  h1 { font-size: 36pt; color: #6b1e2e; margin: 2mm 0 2mm; font-weight: 600; line-height: 1.15; }
  .unter { font-style: italic; font-size: 15pt; color: #5c4a44; margin: 0 0 2mm; }
  .linie { width: 30mm; height: .7mm; background: #b8862b; margin: 4mm auto 7mm; }
  .qr { width: 105mm; height: 105mm; background: #fff; padding: 4mm; border-radius: 4mm; }
  .scan { font-size: 19pt; color: #6b1e2e; margin: 7mm 0 2mm; }
  .info { font-family: system-ui, 'Segoe UI', sans-serif; font-size: 13pt; color: #5c4a44; margin: 0; line-height: 1.5; }
  .url { font-family: system-ui, 'Segoe UI', sans-serif; font-size: 11pt; color: #5c4a44; margin-top: 7mm; }
  .gemeinde { font-family: system-ui, 'Segoe UI', sans-serif; font-size: 10pt; color: #5c4a44; margin-top: 2mm; }
  @media print { body { background: none; } .blatt { margin: 0; } }
</style>
</head>
<body>${blaetter.join('\n')}
</body>
</html>
`;
}

function edgePfad() {
  const kandidaten = [
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  ];
  return kandidaten.find((p) => fs.existsSync(p));
}

function pdf(htmlDatei) {
  const edge = edgePfad();
  if (!edge) return console.log('  (Edge nicht gefunden, PDF übersprungen – HTML im Browser drucken)');
  const pdfDatei = htmlDatei.replace(/\.html$/, '.pdf');
  execFileSync(edge, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${pdfDatei}`,
    pathToFileURL(htmlDatei).href,
  ], { stdio: 'ignore' });
  console.log('  PDF', path.relative(process.cwd(), pdfDatei));
}

// ---------- Codes für die Kirchen (Einstieg) ----------
console.log('Kirchen:');
const kirchenBlaetter = [];
for (const k of kirchen) {
  const url = `${BASIS}/${k.slug}/`;
  const svg = await code(url, path.join(ZIEL, `qr-${k.slug}`));
  kirchenBlaetter.push(
    blatt({ ueber: AKTION, titel: k.name, svg, url, hinweis: 'Texte und Musik für deinen Besuch<br>Am schönsten mit Kopfhörern' }),
  );
}
const kirchenHtml = path.join(ZIEL, 'druckvorlage.html');
fs.writeFileSync(kirchenHtml, dokument(`QR-Codes · ${AKTION}`, kirchenBlaetter));
pdf(kirchenHtml);

// ---------- Codes für jeden Reiter ----------
for (const k of kirchen) {
  console.log(`${k.name}, Reiter:`);
  const blaetter = [];
  for (const [i, r] of reiter.entries()) {
    const url = `${BASIS}/${k.slug}/${r.slug}/`;
    const nr = String(i + 1).padStart(2, '0');
    const svg = await code(url, path.join(ZIEL, 'reiter', k.slug, `${nr}-${r.slug}`));
    blaetter.push(
      blatt({
        ueber: `${AKTION} · ${k.name}`,
        titel: r.name,
        unter: untertitel(r.slug),
        svg,
        url,
        hinweis: r.audio ? 'Hier gibt es etwas zu hören<br>Am schönsten mit Kopfhörern' : 'Text und Impuls für deinen Besuch',
      }),
    );
  }
  const html = path.join(ZIEL, `druckvorlage-${k.slug}-reiter.html`);
  fs.writeFileSync(html, dokument(`QR-Codes ${k.name} · ${AKTION}`, blaetter));
  pdf(html);
}

console.log('Fertig.');
