# QR-Code-Website „Deine Zeit – Kirche erleben“

Begleit-Website der Evangelischen Gesamtkirchengemeinde Gießen Nord für die offenen Kirchen im Advent
(Michaelskirche und Pauluskirche, 4.–17. Dezember, täglich 16–18 Uhr). Besucher scannen vor Ort einen
QR-Code, wählen ihre Kirche und lesen Texte oder hören Audio auf dem Handy.

## Technik
- Astro (statische Ausgabe, keine Integrationen), npm. `npm run dev` / `npm run build` → `dist/`.
- Kein Tracking, keine externen Skripte oder Schriften, nur System-Schriften. JS nur für Kirchenauswahl
  (localStorage mit try/catch) und „nur ein Audio gleichzeitig“.
- Mobile first, barrierefrei (Überschriftenhierarchie, Kontrast AA, sichtbarer Fokus, `lang="de"`).
- Seiten ohne Audio möglichst klein (Ziel: unter 200 KB gesamt).
- Farben in `src/styles/global.css`: Weinrot `#6b1e2e`, Creme `#fbf6ec`, Gold `#8a6216` (Text) /
  `#b8862b` (nur Schmuck) / `#e2b65a` (auf Weinrot).

## Aufbau
- `src/data/site.js`: Kirchen, Reiter, Links, Laden von Texten (`content/texte/*.md`) und Audio
  (`content/audio/<kirche>/<reiter>/*.mp3` + optionale gleichnamige `.txt`) und Fotos
  (`content/bilder/<kirche>/<reiter>/`, erstes Foto oben, zweites nach dem Text, weitere unten, gleichnamige `.txt` = Alternativtext;
  Ausgabe über `astro:assets` als WebP 360/720 px). Nur eigene Innenaufnahmen verwenden.
- `content/gedankenreisen/<kirche>/*.md` (+ gleichnamiges Foto): Gedankenreisen zum Aufklappen auf `kirche-fuer-dich`,
  je Kirche eigene Texte. `content/segen/*.md`: Anleitungen Segen/Tauferinnerung auf `segen` (beide Kirchen).
  Beides über die Komponente `Aufklappliste.astro`.
- `src/pages/index.astro`: Startseite mit Kirchenauswahl.
- `src/pages/[kirche]/[...reiter].astro`: alle Kirchenseiten. `/michaelskirche/` zeigt den ersten Reiter.
- `src/layouts/BaseLayout.astro`, `src/components/*`.
- `ANLEITUNG.md`: Anleitung für die Person, die Inhalte pflegt.

## Regeln
- **URLs nicht ändern** (`/michaelskirche/`, `/pauluskirche/`, Reiter-Slugs `licht`, `klang`,
  `andachten`, `segen`, `kirche-fuer-dich`). Reiter `hoffnungsbild` wurde am 26.11.2026 auf Wunsch entfernt,
  `netlify.toml` leitet `/<kirche>/hoffnungsbild/` auf `/<kirche>/` um. Sie stehen auf gedruckten QR-Codes.
  Vor Änderungen an URLs oder Ordnerstruktur immer nachfragen.
- Inhalte pflegt eine nicht technische Person nur über `content/`. Neue Funktionen so bauen, dass sie
  nie am Code arbeiten muss.
- Keine Inhalte erfinden. Texte sind Entwürfe der Verantwortlichen.
- Texte auf Deutsch, Anrede „du“.
- Audio: nur MP3 (~128 kbps), Reihenfolge per Nummernpräfix, kein Autoplay, `preload="none"`.
  Dateien mit `PLATZHALTER` im Namen sind Testtöne.
- Nach größeren Änderungen in Handybreite (375 px) prüfen.

## Hosting
- GitHub (Repository) + Netlify (Build bei jedem Push, Einstellungen in `netlify.toml`:
  `npm run build`, Ordner `dist`, Header inkl. CSP — keine Inline-Skripte einbauen).
- Die Audio-Person lädt MP3s im Browser bei GitHub hoch (siehe `ANLEITUNG.md`).
- Handy-Test im WLAN: `npm run dev:handy`.

## Offen
- Live-Adresse: https://deine-kirchen-erleben.netlify.app (in `astro.config.mjs`). QR-Codes zeigen auf
  `/michaelskirche/` und `/pauluskirche/` dieser Adresse.
- Impressum/Datenschutz-Links in `src/data/site.js` sind noch Platzhalter.
- Optionale Felder: Segenswort (`segen.md`), Ansprechperson (`start.md`).
- Echte MP3s einspielen, Textentwürfe abstimmen.

## QR-Codes
- `npm run qr` (`scripts/qr-codes.mjs`) erzeugt alle Codes (beide Kirchen + je 5 Reiter) als SVG/PNG,
  prüft sie per Decoder und erstellt A4-PDFs in `qr-codes/` (PDF über Microsoft Edge).
- Außerdem setzt es die Codes in den Infotafel-Entwurf `qr-codes/vorlagen/infotafeln-entwurf.pdf` ein
  (Seite 1 klang, 2 kirche-fuer-dich, 3 segen; Seite 4 ohne Code) → `qr-codes/infotafeln-<kirche>.pdf` (pdf-lib).

