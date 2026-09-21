# Prüfstand – MailBaukasten 1.0

Stand: 21. September 2026.

## Automatisiert

`node --test tests/core.test.mjs`: 13 Prüfungen erfolgreich.

- Alle 60 Kombinationen aus zwei Designs, fünf Paletten, zwei Schriftstilen
  und drei Abstandsvarianten erzeugen eigenständiges HTML.
- Ausgeblendete Bausteine erscheinen nicht im Export; gespeicherte Texte bleiben.
- Rendern verändert die Entwurfsdaten nicht.
- Text- und Attribut-Injection wird escaped, unsichere Link-Protokolle verworfen.
- JSON-Rundlauf, erlaubte Schemafelder, ungültige Versionen und Größenlimits.
- Leere Inhalte, lange Texte und Unicode.
- Verwendete Text-/Hintergrund-Kombinationen aller Paletten erreichen mindestens
  4,5:1 Kontrast. Das ist keine vollständige Barrierefreiheitszertifizierung.
- Beispiel- und Pflichtfeldhinweise.

`python scripts/check-pages.py`: Alle vier öffentlichen HTML-Seiten haben
ausgeglichene Tags, eindeutige IDs und auflösbare lokale Verweise.

## Im Browser tatsächlich geprüft

- Texteingabe erscheint in der Live-Vorschau.
- Briefkopf ausblenden und wieder einblenden erhält den eingegebenen Namen.
- Wechsel auf Briefstil und Bordeaux erhält Texte und Sichtbarkeit.
- Themen hinzufügen, bearbeiten und entfernen.
- Freiwilliges lokales Speichern und Wiederherstellen nach Neuladen.
- Gesamtansicht, Prüfhinweise und Rückkehr zum Editor.
- Echter HTML-Download und echter JSON-Download; heruntergeladene Dateien auf
  Inhalte, ausgewählten Stil, Palette und HTML-Struktur geprüft.
- Gespeicherte JSON-Datei über den Dateiauswahldialog wieder geladen.
- Desktop-Ansicht sowie 390- und 320-Pixel-Viewport; kein seitliches Überlaufen.
- Bearbeitung des Fußbereichs lässt dessen Vorschau sichtbar; Scrollposition bleibt.
- Browser-Konsole ohne JavaScript-Fehler bei diesen Abläufen.

## Grenzen

Es wurden keine E-Mails an Dritte versendet. Eine echte Darstellungskontrolle in
klassischem Outlook, Gmail und Apple Mail ist damit nicht belegt. Der HTML-Export
verwendet Tabellen, Inline-Styles, responsive Regeln und Outlook-Fallbacks;
vor produktivem Versand ist eine Testmail im jeweiligen Versand- und Zielsystem
erforderlich. Die Oberfläche und Anleitung benennen diese Grenze.

Die allgemeinen Rechtstexte wurden anhand der auf der Seite verlinkten offiziellen
Quellen erstellt; sie sind keine individuelle anwaltliche Prüfung eines Versands.
