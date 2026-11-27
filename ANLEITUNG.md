# Anleitung: Inhalte der Website pflegen

Für Texte und Musik musst du **nie** am Code arbeiten. Alles liegt im Ordner `content/`.

## Texte ändern

Die Texte liegen in `content/texte/`. Jede Datei gehört zu einem Reiter und gilt für **beide** Kirchen.

| Datei | Reiter |
|---|---|
| `start.md` | Startseite |
| `klang.md` | Klang der Kirchen |
| `kirche-fuer-dich.md` | Gedankenreisen |
| `segen.md` | Segen spüren |
| `licht.md` | Dein Licht im Advent |
| `andachten.md` | Adventsandachten (inkl. Termine) |

Aufbau einer Datei:

```
---
titel: Segen spüren
untertitel: Ein Satz zum Mitnehmen
---

Hier steht der Text. Eine Leerzeile beginnt einen neuen Absatz.
**Zwei Sternchen** machen ein Wort fett.
```

- Den Bereich zwischen den beiden `---` bitte in dieser Form lassen, nur den Text nach `titel:` und `untertitel:` ändern.
- **Termine der Andachten** stehen in `andachten.md` oben zwischen den `---`. Jeder Termin beginnt mit `- datum:`. Die Einrückung (Leerzeichen am Zeilenanfang) bitte genau so lassen.
  Steht bei `ort:` genau „Michaelskirche“ oder „Pauluskirche“, wird der Termin auf der Seite dieser Kirche hervorgehoben.

### Optionale Felder

- **Segenswort** (`segen.md`): Bei `segenswort:` zwischen die Anführungszeichen ein Segenswort aus der Gemeinde schreiben, bei `segenswort_quelle:` optional, von wem es stammt. Es erscheint dann hervorgehoben auf „Segen spüren“. Leer lassen = wird nicht angezeigt.
- **Ansprechperson** (`start.md`): `kontakt_name`, `kontakt_telefon`, `kontakt_email` ausfüllen, dann steht die Ansprechperson unten auf jeder Seite. Leer lassen = wird nicht angezeigt.

## Gedankenreisen (je Kirche eigene)

Die Gedankenreisen stehen auf „Gedankenreisen“, für jede Kirche eigene:

```
content/gedankenreisen/michaelskirche/
content/gedankenreisen/pauluskirche/
```

Zu einer Gedankenreise gehören Dateien mit **gleichem Namen**, z. B.:

- `01-rosenwunder.md`: der Text zum Mitlesen. Oben zwischen den `---` stehen `titel:` und `bildbeschreibung:` (Beschreibung des Fotos für Menschen, die nicht sehen können).
- `01-rosenwunder.mp3`: die Aufnahme (MP3, ca. 128 kbps)
- `01-rosenwunder.jpg` (oder `.png`): das Foto, optional

Die Nummer vorne bestimmt die Reihenfolge. Auf der Website lässt sich jede Gedankenreise aufklappen: Foto, Aufnahme, darunter der Text.

## Anleitungen Segen und Tauferinnerung

Auf „Segen spüren“ stehen aufklappbare Anleitungen, für beide Kirchen gleich, in zwei Abschnitten:

```
content/segen/1-Segen/            → Abschnitt „Segen“
content/segen/2-Tauferinnerung/   → Abschnitt „Tauferinnerung“
```

Eine Datei pro Anleitung (`01-segen-nur-fuer-dich.md` …). Oben zwischen den `---` steht der `titel:`. Im Text: `### Zwischenüberschrift`, `1.` für nummerierte Schritte, `>` am Zeilenanfang für ein Gebet.
Das zweite Foto aus `content/bilder/<kirche>/segen/` (Taufbecken/Taufschale) steht vor dem Abschnitt „Tauferinnerung“.

## Musik für „Klang der Kirchen“

```
content/audio/michaelskirche/klang/1-Advent/        → Abschnitt „Advent“ (Michaelskirche)
content/audio/michaelskirche/klang/2-Weihnachten/   → Abschnitt „Weihnachten“ (Michaelskirche)
content/audio/pauluskirche/klang/1-Advent/          → dasselbe für die Pauluskirche
content/audio/pauluskirche/klang/2-Weihnachten/
```

Der Ordnername (ohne Nummer) wird zur Überschrift. Die Nummer bestimmt die Reihenfolge der Abschnitte.

1. MP3-Datei in den passenden Ordner legen (am besten ca. 128 kbps, damit sie auch bei schlechtem Empfang lädt). Nur MP3, keine WAV- oder MP4-Dateien.
2. Dateiname mit Nummer vorne, die Nummer bestimmt die Reihenfolge, z. B. `03-die-nacht-ist-vorgedrungen.mp3`.
3. Eine Textdatei mit gleichem Namen, nur `.txt` statt `.mp3`:
   ```
   Die Nacht ist vorgedrungen (EG 16), Jochen Klepper / Johannes Petzold
   Gespielt und gesungen von Norbert Kissel
   Das Lied gehört zu den bekanntesten modernen Adventschorälen (1937/1938).
   ```
   1. Zeile = Titel, 2. Zeile = wer singt oder spielt, alles danach = Beschreibung (optional).
4. Das zweite Foto aus `content/bilder/<kirche>/klang/` steht zwischen den Abschnitten (vor „Weihnachten“).

Sind keine Aufnahmen da, steht auf der Seite „Hier erklingt bald Musik“.

## Fotos hinzufügen oder austauschen

Auf jeder Seite kann oben ein Foto stehen. Die Fotos liegen in `content/bilder/`, ein Ordner pro Kirche und Reiter:

```
content/bilder/michaelskirche/licht/   → Dein Licht im Advent (Michaelskirche)
content/bilder/pauluskirche/segen/     → Segen spüren (Pauluskirche)
```

1. Foto (`.jpg`, `.png` oder `.webp`) in den passenden Ordner legen, Name mit Nummer vorne, z. B. `01-altar.jpg`. Das **erste** Foto steht groß oben. Das **zweite** ist ein Zwischenbild: bei „Klang der Kirchen“ vor „Weihnachten“, bei „Segen spüren“ vor „Tauferinnerung“, sonst direkt nach dem Text. Alle weiteren stehen ganz unten. Bitte sparsam: ein bis drei Fotos pro Reiter reichen.
2. Eine Textdatei mit gleichem Namen anlegen (`01-altar.txt`) und darin in einem Satz beschreiben, was auf dem Foto zu sehen ist. Das wird nicht angezeigt, aber für blinde Menschen vorgelesen.
3. Die Website verkleinert die Fotos beim Bauen automatisch, du musst sie nicht vorher verkleinern. Bitte nur eigene Fotos verwenden oder solche, für die die Gemeinde die Rechte hat.

Kein Foto im Ordner = auf dieser Seite erscheint kein Bild. Ein Foto entfernen: Datei löschen.

## Dateien im Browser bei GitHub hochladen (ohne Programme)

1. Bei GitHub anmelden und das Repository der Website öffnen.
2. Zum passenden Ordner klicken, z. B. `content` → `audio` → `michaelskirche` → `klang`.
3. Oben rechts **Add file** → **Upload files** wählen und die MP3-Dateien ins Fenster ziehen.
4. Unten bei „Commit changes“ kurz beschreiben, was neu ist (z. B. „Zwei Lieder Michaelskirche“), und auf **Commit changes** klicken.
5. Netlify baut die Website danach automatisch neu. Nach 1–2 Minuten ist die Aufnahme online.

Texte ändern geht genauso: Datei in `content/texte/` öffnen, auf den Stift (Bearbeiten) klicken, ändern, **Commit changes**.

Hinweis: Bei GitHub kann eine einzelne Datei im Browser höchstens 25 MB groß sein. Eine MP3 mit 128 kbps hat etwa 1 MB pro Minute, das reicht also für Stücke bis ca. 25 Minuten.

## Wann wird die Website aktualisiert?

Sobald eine Änderung bei GitHub gespeichert ist, baut Netlify die Website automatisch neu (dauert 1–2 Minuten).
Lokal auf dem Computer geht es mit `npm run build`.

## Adressen für die QR-Codes

- Michaelskirche: `https://deine-kirchen-erleben.netlify.app/michaelskirche/`
- Pauluskirche: `https://deine-kirchen-erleben.netlify.app/pauluskirche/`

Diese Adressen dürfen sich nicht mehr ändern, sobald die QR-Codes gedruckt sind.
