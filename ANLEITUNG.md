# Anleitung: Inhalte der Website pflegen

Für Texte und Musik musst du **nie** am Code arbeiten. Alles liegt im Ordner `content/`.

## Texte ändern

Die Texte liegen in `content/texte/`. Jede Datei gehört zu einem Reiter und gilt für **beide** Kirchen.

| Datei | Reiter |
|---|---|
| `start.md` | Startseite |
| `licht.md` | Dein Licht im Advent |
| `klang.md` | Klang der Kirchen |
| `hoffnungsbild.md` | Dein Hoffnungsbild |
| `andachten.md` | Adventsandachten (inkl. Termine) |
| `segen.md` | Segen spüren |
| `kirche-fuer-dich.md` | Kirche für dich |

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

## Musik und Aufnahmen hinzufügen

```
content/audio/michaelskirche/klang/             → Klang der Kirchen (Michaelskirche)
content/audio/michaelskirche/kirche-fuer-dich/  → Kirche für dich (Michaelskirche)
content/audio/pauluskirche/klang/               → Klang der Kirchen (Pauluskirche)
content/audio/pauluskirche/kirche-fuer-dich/    → Kirche für dich (Pauluskirche)
```

1. MP3-Datei in den passenden Ordner legen (am besten ca. 128 kbps, damit sie auch bei schlechtem Empfang lädt).
2. Dateiname mit Nummer vorne, die Nummer bestimmt die Reihenfolge:
   `01-Macht-hoch-die-Tuer.mp3`, `02-Tochter-Zion.mp3`
   Auf der Website steht dann „Macht hoch die Tuer“, ohne Nummer.
3. **Optional** schönerer Titel und Hinweis: eine Textdatei mit gleichem Namen, nur `.txt` statt `.mp3`:
   `01-Macht-hoch-die-Tuer.txt` mit dem Inhalt
   ```
   Macht hoch die Tür
   Gesungen vom Gemeindechor
   ```
   Erste Zeile = Titel, alles danach = Hinweis.
4. Dateien mit **PLATZHALTER** im Namen löschen, sobald echte Aufnahmen da sind.

Ist ein Ordner leer, steht auf der Seite „Hier erklingt bald Musik“.
Die `LIESMICH.txt` in den Ordnern bitte liegen lassen.

## Fotos hinzufügen oder austauschen

Auf jeder Seite kann oben ein Foto stehen. Die Fotos liegen in `content/bilder/`, ein Ordner pro Kirche und Reiter:

```
content/bilder/michaelskirche/licht/   → Dein Licht im Advent (Michaelskirche)
content/bilder/pauluskirche/segen/     → Segen spüren (Pauluskirche)
```

1. Foto (`.jpg`, `.png` oder `.webp`) in den passenden Ordner legen, Name mit Nummer vorne, z. B. `01-altar.jpg`. Gezeigt wird immer das **erste** Foto im Ordner.
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
