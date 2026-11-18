# Astro-Website „Deine Zeit – Kirche erleben“ von null aufbauen

Du bist mein Entwickler-Assistent. Du bist direkt in dem Ordner geöffnet, in dem meine
Website entstehen soll (`D:\GemeindeprojektWebbi`).

## Schritt 1 – Eckdaten (bereits beantwortet, keine Rückfragen nötig)

1. **Thema:** Begleit-Website zur Aktion „Deine Zeit – Kirche erleben“ im Advent.
   Michaelskirche und Pauluskirche sind vom 4. bis 17. Dezember täglich von 16 bis 18 Uhr
   geöffnet. Besucher scannen vor Ort einen QR-Code, wählen ihre Kirche und können auf dem
   Handy Texte lesen und Audio hören (meist mit Kopfhörern).
2. **Name:** „Deine Zeit – Kirche erleben“ – Evangelische Gesamtkirchengemeinde Gießen Nord.
3. **Farben:** Warm, passend zum Flyer: dunkles Weinrot (Hauptfarbe), Creme (Hintergrund),
   Gold (Akzent). Schlage konkrete Hexcodes vor und prüfe die Kontraste (mindestens WCAG AA).
4. **Stil:** Ruhig, warm und besinnlich. Serifenbetonte Überschriften, viel Weißraum, große
   Tippflächen, mobile first. Keine externen Schriften, nur System-Schriften
   (z. B. `Georgia, "Times New Roman", serif` für Überschriften).
5. **Weitere Seiten:** Startseite mit Kirchenauswahl, dazu pro Kirche sechs Reiter
   (siehe Schritt 2). Keine Seiten wie „Über uns“, „Leistungen“ oder „Kontakt“.

Allgemeine Regeln:
- Alle Texte auf Deutsch, Anrede „du“.
- Kein Tracking, keine Cookies, keine externen Skripte oder Schriften (Datenschutz und
  Ladezeit bei schwachem Empfang in der Kirche). Astro liefert reines statisches HTML,
  JavaScript nur dort, wo es nötig ist (Kirchenauswahl merken, Audio-Player).
- Gesamtgröße ohne Audio möglichst unter 200 KB.
- Barrierefrei: sinnvolle Überschriftenhierarchie, sichtbarer Fokus, Player per Tastatur
  bedienbar, `lang="de"`.
- Die Inhalte pflegt eine nicht technische Person. Sie legt nur Dateien in Ordner oder
  ändert Textdateien. Am Code muss sie nie etwas ändern.
- **Keine Inhalte erfinden.** Es gibt keine Kundenlogos, Testimonials, Preise oder Ähnliches.
  Texte kommen aus den Textdateien in `content/texte/`.

## Schritt 2 – Strukturvorschlag (noch nichts anlegen)

Prüfe diese Struktur, schlage begründete Verbesserungen vor und **STOPP**, bis ich „OK“ sage.

### Startseite `/`
1. **Header:** Schriftzug „Deine Zeit – Kirche erleben“, darunter der Gemeindename
   (keine Navigation nötig).
2. **Willkommen:** Überschrift und kurzer Text aus `content/texte/start.md`.
3. **Kirchenauswahl:** Zwei große Buttons „Michaelskirche“ und „Pauluskirche“. Die Auswahl
   wird gemerkt (localStorage, mit try/catch). Wer schon gewählt hat, sieht einen Hinweis
   „Weiter in der …kirche“.
4. **Öffnungszeiten:** 4.–17. Dezember, täglich 16–18 Uhr.
5. **Footer:** Gemeindename, Link zum Impressum und zur Datenschutzerklärung der Gemeinde
   (Platzhalter-Links, die ich später ersetze).

### Seiten pro Kirche
URLs (dürfen sich später nicht mehr ändern, sie stehen auf gedruckten QR-Codes):

| Reiter | URL-Teil | Audio |
|---|---|---|
| Dein Licht im Advent | `licht` | nein |
| Klang der Kirchen | `klang` | ja, mehrere Stücke (Kopfhörersymbol im Reiter) |
| Dein Hoffnungsbild | `hoffnungsbild` | nein |
| Adventsandachten | `andachten` | nein |
| Segen spüren | `segen` | nein |
| Kirche für dich | `kirche-fuer-dich` | ja, eine oder mehrere Aufnahmen (Kopfhörersymbol im Reiter) |

- `/michaelskirche/` und `/pauluskirche/` zeigen den ersten Reiter („Dein Licht im Advent“).
- `/michaelskirche/klang/`, `/pauluskirche/segen/` usw. führen direkt zum jeweiligen Reiter.
- Oben auf jeder Kirchenseite: Name der Kirche, Link „Kirche wechseln“ und die Reiter-Navigation
  (auf dem Handy horizontal scrollbar, aktiver Reiter hervorgehoben).
- Darunter: Titel und Untertitel aus dem Frontmatter der Textdatei, dann der Text, bei den zwei
  Audio-Reitern dann der Player.
- Unten: „Weiter zu: [nächster Reiter]“, damit man sich durchklicken kann.

## Schritt 3 – erst nach meinem OK

1. **Astro-Projekt anlegen:** Lege direkt in diesem Ordner ein minimales Astro-Projekt an
   (leere Minimal-Vorlage, keine Zusatz-Integrationen, Paketmanager npm). Wenn möglich
   `trailingSlash: "always"` und `build.format: "directory"`, damit die URLs wie oben aussehen.
2. **Inhaltsordner anlegen:**
   ```
   content/
   ├── texte/
   │   ├── start.md
   │   ├── licht.md
   │   ├── klang.md
   │   ├── hoffnungsbild.md
   │   ├── andachten.md
   │   ├── segen.md
   │   └── kirche-fuer-dich.md
   └── audio/
       ├── michaelskirche/
       │   ├── klang/
       │   └── kirche-fuer-dich/
       └── pauluskirche/
           ├── klang/
           └── kirche-fuer-dich/
   ```
   Lege in jeden Audio-Ordner eine kurze `LIESMICH.txt`, die erklärt, wie man MP3s hineinlegt.
   Die Texte gelten für beide Kirchen gleich. Jede Textdatei hat Frontmatter mit `titel` und
   `untertitel`. Fülle sie mit diesen Entwürfen (später passen die Verantwortlichen sie an):
   - **start.md:** Komm herein. Die Kirche gehört für einen Moment ganz dir. In welcher Kirche
     bist du gerade?
   - **licht.md:** Zünde eine Kerze an, für einen Menschen, eine Hoffnung, eine Bitte oder
     einfach für dich selbst. Du musst dafür nichts sagen und nichts erklären. Lass das Licht
     brennen und nimm dir einen Moment Zeit.
   - **klang.md:** Setze deine Kopfhörer auf und hör zu: Advents- und Weihnachtsmusik aus unserer
     Gemeinde, selbst gesungen und gespielt. Such dir einen Platz in der Kirche und lass die
     Musik wirken.
   - **hoffnungsbild.md:** Was gibt dir Hoffnung? Halte es fest, mit einem Wort, einem Bild oder
     einem Gedanken. Du kannst es im Buch in der Kirche aufschreiben oder zeichnen.
   - **andachten.md:** Wir feiern gemeinsam Advent, jeden Donnerstag um 19:30 Uhr. Zum Abschluss
     weiten wir den Blick auf eine weitere Kirche.
     - Donnerstag, 3. Dezember, 19:30 Uhr – „Lichtermeer“ – Michaelskirche, Kirchstraße 21
     - Donnerstag, 10. Dezember, 19:30 Uhr – „Hoffnung wächst“ – Pauluskirche, Egerländerstraße 6
     - Donnerstag, 17. Dezember, 19:30 Uhr – „Du bist gesegnet“ – Kapelle auf dem Alten Friedhof,
       Licher Str. 2
   - **segen.md:** Erinnere dich daran: Du bist gesegnet! Das gilt, wenn du gerade gut drauf bist,
     und auch, wenn es dir nicht so gut geht. Nimm diesen Satz mit, wenn du die Kirche verlässt.
   - **kirche-fuer-dich.md:** Lass den Raum und seine Bilder auf dich wirken. Setze die Kopfhörer
     auf und lass dich auf eine kleine Gedankenreise durch diese Kirche mitnehmen. Schau dich um,
     du darfst dir Zeit lassen.
3. **Audio automatisch einbinden:** Beim Build werden die Audio-Ordner durchsucht (z. B. per
   `import.meta.glob` mit `?url` oder einem Kopierschritt nach `public/`). Neue MP3s einfach in
   den passenden Ordner legen, nach dem nächsten Build erscheinen sie.
   - Nur MP3 (ca. 128 kbps).
   - Reihenfolge nach Dateiname, das Nummernpräfix bestimmt die Reihenfolge (`01-…`, `02-…`).
   - Titel aus dem Dateinamen ohne Nummer und Endung, Binde- und Unterstriche werden zu
     Leerzeichen (`01-Macht-hoch-die-Tuer.mp3` → „Macht hoch die Tuer“).
   - Optional eine gleichnamige `.txt`: erste Zeile Titel, danach Interpret oder Hinweis.
   - Leerer Ordner: freundlicher Hinweis „Hier erklingt bald Musik“ statt eines leeren Players.
   - Natives `<audio>`-Element, kein Autoplay, `preload="none"`, nur ein Stück gleichzeitig.
   - Lege zum Testen kurze, selbst erzeugte Platzhalter-MP3s (ein paar Sekunden Stille oder ein
     Ton) an, die ich später durch die echten Aufnahmen ersetze. Markiere sie eindeutig im Namen.
4. **BaseLayout erstellen:** `src/layouts/BaseLayout.astro` mit `<head>` (Titel und
   Meta-Description als Props, `lang="de"`, Viewport, `theme-color` in Weinrot) und `<slot />`.
   Header und Footer gehören ins BaseLayout. Dazu ein `KircheLayout.astro` für die Reiter-Navigation.
5. **Styles anlegen:** `src/styles/global.css` mit Farben, Schriften, Abständen und Fokus-Stil als
   CSS-Variablen.
6. **Bilder:** Keine Stockfotos herunterladen. Verwende höchstens schlichte, selbst erstellte
   SVG-Elemente (z. B. eine Kerzenflamme oder ein Stern als Schmuck). Echte Fotos der Kirchen kann
   ich später in `public/images/` ergänzen.
7. **Seiten bauen:** Startseite unter `src/pages/index.astro` und die Kirchenseiten (z. B. per
   `getStaticPaths` für beide Kirchen und alle sechs Reiter) genau nach der abgestimmten Struktur.
8. **Konfiguration:** Setze in `astro.config.mjs` die `site`-Option auf
   `https://PLATZHALTER-DOMAIN.de`. Das Hosting ist noch offen (Netlify oder GitHub Pages). Baue
   es so, dass der Build beim Hochladen neuer Dateien automatisch laufen kann.
9. **Anleitung für die Inhaltspflege:** Lege eine kurze `ANLEITUNG.md` an: Wo liegen Texte und
   Audio, wie benenne ich Dateien, was passiert danach.
10. **Git:** Lege eine `.gitignore` an (node_modules, dist, .astro) und initialisiere ein
    Git-Repository in diesem Ordner.
11. **Prüfen:** Starte den Dev-Server, prüfe die Seite in Handybreite (ca. 375 px) und nenne mir
    die lokale Vorschau-Adresse sowie eine kurze Baumübersicht der angelegten Dateien.

Vor Änderungen an Ordnerstruktur oder URLs fragst du kurz nach, weil die URLs später auf
gedruckten QR-Codes stehen.

---

## Weitere Prompts

### Website lokal abrufen
Starte den Dev-Server und gib mir die Localhost-URL.

### Git-Repository initialisieren (macht Claude meist schon automatisch)
Ich will ein Git-Repository für dieses Projekt initialisieren.

### Git-Identität setzen
Die Git-Identität soll nur für dieses Repo gelten (set it for this repo only). Konfiguriere das
Repo mit diesem Namen: [DEIN NAME] und meiner E-Mail: [DEINE EMAIL]

### GitHub-Repository verbinden
Verbinde es mit dem Online-Repo mit diesen Befehlen:
[HIER DEN BEFEHL EINFÜGEN, DEN DU IM GITHUB-REPOSITORY FINDEST]

### Neue Änderungen zu GitHub pushen
Committe und pushe die Änderungen zu GitHub.
