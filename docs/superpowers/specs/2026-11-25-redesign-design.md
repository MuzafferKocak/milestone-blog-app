# Redesign der Blog-App – Design

Datum: 2026-11-25 · Branch: `feature/redesign`

## Ziel und Warum

Die Blog-App kommt in die Bewerbungsmappe. Sie soll zeigen, dass der Entwickler saubere, moderne Oberflächen bauen kann: **ruhig und professionell**, nichts Grelles. Gewählt wurde der Entwurf **B „Modern & dunkel“**, der an moderne Entwickler-Seiten angelehnt ist.

## Ziele

- Einheitliches Aussehen auf **allen** Seiten: Startseite, Blog-Detail, Neuer Blog, Login, Registrieren, Profil, About, außerdem die Fenster zum Bearbeiten und Löschen, die Navigationsleiste und der Footer.
- **Ein zentrales Farbschema** (`src/theme.js`) statt verstreuter Einzelfarben.
- **Hell/Dunkel-Schalter bleibt.** Dunkel ist der Standard, und beide Modi werden sauber gestaltet.
- Funktioniert auf dem Handy. Der heutige Aufbau mit Grid und Menü für schmale Bildschirme bleibt erhalten.

## Nicht-Ziele

- Keine neuen Funktionen und keine Änderungen an der Logik: Login, Liken, Kommentare, Seiten-Navigation und API-Aufrufe bleiben gleich.
- Keine Änderungen am Backend.
- Kein Umbau des Seitenaufbaus wie in Entwurf C (kein großer Titelbeitrag).

## Was es auf keinen Fall werden darf

- Bunt oder unruhig: mehrere Akzentfarben, grelle Effekte, Animationen um ihrer selbst willen.
- Ein heller Modus, der unfertig wirkt (z. B. dunkle Texte auf dunklem Grund oder graue Leisten aus dem alten Design).
- Kaputte Funktionen nach dem Redesign.

## Rahmenbedingungen

- Bestehende Werkzeuge: React 18, Material UI (MUI) v5, Create React App.
- **Keine neuen npm-Bibliotheken.**
- Schrift **Inter** von Google Fonts, eingebunden mit einer `<link>`-Zeile in `public/index.html` (vom Nutzer genehmigt).
- Prüfung nach größeren Schritten mit `npm run build`. Gearbeitet wird in kleinen Schritten mit je einem Commit auf `feature/redesign`.

## Wege (Approaches)

1. **Zentrales MUI-Theme und Bausteine überarbeiten (gewählt).** Eine Theme-Datei für Farben, Schrift, Rundungen und das Standard-Aussehen der Bausteine; danach werden die einzelnen Bausteine an Entwurf B angepasst. Vorteile: keine neuen Bibliotheken, Farben an einer Stelle, gut erklärbar. Nachteil: Fast alle Bausteine müssen angefasst werden.
2. **Nur Farbschema tauschen.** Schnell, aber Navigationsleiste und Karten behalten ihren alten Aufbau und sehen nicht wie Entwurf B aus. Verworfen.
3. **Umstieg auf Tailwind o. Ä.** Neue Bibliotheken, alles neu schreiben, zwei Systeme gemischt. Verworfen.

Der Nutzer hat Weg 1 gewählt, weil er sauber ist und ohne neue Bibliotheken auskommt.

## Gestaltung (vom Nutzer entschieden)

**Dunkler Modus (Standard)**
- Hintergrund: dunkles Blaugrau (ca. `#0f141a`); Karten und Flächen etwas heller (ca. `#161d26`) mit feinem Rand (ca. `#232c37`).
- Text: hell (ca. `#e6e8eb`), Nebentext gedämpft (ca. `#8b95a1`).
- **Eine** Akzentfarbe: ruhiges Blau (ca. `#5b8def`) für Knöpfe, Links, aktive Seitenzahl und das Kategorie-Etikett.

**Heller Modus**
- Dieselbe Akzentfarbe (ein etwas dunkleres Blau für ausreichenden Kontrast), weißer bzw. sehr hellgrauer Hintergrund, weiße Karten mit feinem grauen Rand.

**Schrift:** Inter, klare Hierarchie (große fette Seitenüberschrift, kleiner gedämpfter Untertitel).

**Navigationsleiste:** Logo links, Links „Home“ und „About“, rechts ein auffälliger Knopf „+ New Post“, dann der Hell/Dunkel-Schalter und der Avatar mit Menü. Kein grauer Balken mehr, sondern dieselbe Fläche wie der Hintergrund mit einer feinen Linie darunter.

**Startseite:** Überschrift „Latest Posts“ mit einem Untertitel, darunter ein Raster mit Blog-Karten (3 Spalten auf großen Bildschirmen, 2 auf Tablets, 1 auf dem Handy) und die Seitenzahlen in Akzentfarbe.

**Blog-Karte:** Bild oben über die volle Breite, darunter ein Kategorie-Etikett als Pille, Titel, kurzer Textauszug, unten die Zahlen für Likes, Kommentare und Aufrufe in gedämpfter Farbe und „Read more“. Alle Karten sind gleich hoch.

**Farben der Symbole:** Alle Symbole sind gedämpft und einfarbig. **Ausnahme:** Das Herz wird rot, wenn der Beitrag geliked ist (Vorschlag von Claude, vom Nutzer bestätigt).

## Überlassen dem Umsetzer

- Exakte Farbwerte, Abstände und Rundungen im Rahmen der Angaben oben.
- Gestaltung der übrigen Seiten (Login, Registrieren, Profil, Neuer Blog, About, Blog-Detail, Fenster) im selben Stil.
- Wie das Theme technisch aufgebaut ist (z. B. eine Funktion `getTheme(mode)` in `src/theme.js`).

## Entscheidungen von Claude (bitte prüfen)

- Das vorhandene **Bild-Logo** (`src/assets/logo1.png`) bleibt erhalten, nur kleiner und ohne den runden Rahmen. Den Text-Schriftzug „MeK.blog“ aus dem Entwurf gibt es nur, wenn der Nutzer das möchte.
- Die Kategorie für das Etikett kommt aus `categoryId.name` der Blog-Daten. Fehlt sie, wird kein Etikett angezeigt.
- Der Footer wird nicht mehr am unteren Bildschirmrand festgeklebt (`position: fixed`), sondern steht am Ende der Seite. So verdeckt er keinen Inhalt mehr.
- Der Autor auf der Karte kommt aus `userId.username`, wie es in den Daten steht. Heute wird ein Feld `author` erwartet, das es nicht gibt.

## Sprache (vom Nutzer entschieden)

- **Alle Texte der Oberfläche bleiben auf Englisch.** Die App ist heute schon komplett englisch, auch die Meldungen. Die Blog-Inhalte selbst bleiben, wie sie sind. (Korrektur: Eine frühere Fassung nannte deutsche Meldungen; die stammten aus der Stock-App.)
- Navigationsleiste: „Home“, „About“, Knopf „+ New Post“. Startseite: „Latest Posts“ mit kurzem Untertitel. Karte: „Read more“.
