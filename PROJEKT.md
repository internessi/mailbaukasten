# MailBaukasten von Internessi

## Status und Ziel

Umsetzungsstand: 21. September 2026, Version 1.0. Der Generator ist implementiert.
Diese Datei dokumentiert Anforderungen und Entscheidungen zur Weiterentwicklung.
Bedienung und Startbefehle stehen in README.md; Prüfnachweise in TESTS.md.

Unter https://www.internessi.de/mailing/ ist der öffentliche
HTML-E-Mail-Generator veröffentlicht. Nutzer wählen ein Design und eine Farbpalette,
geben eigene Texte und Absenderdaten ein, schalten Inhaltsbereiche ein oder aus
und laden das Ergebnis als eigenständige HTML-E-Mail-Vorlage herunter.

## Fertiges Ergebnis auf einen Blick

- **Live-Anwendung:** https://www.internessi.de/mailing/
- **Öffentliches Repository:** https://github.com/internessi/mailbaukasten
- **Open-Source-Lizenz:** MIT, Copyright 2026 Frank Wolf / Internessi.
- **Editor:** links gestalten und schreiben, rechts sofort das Ergebnis sehen.
- **Designs:** Markant und Briefstil.
- **Farbpaletten:** Blau, Petrol, Grün, Bordeaux und Graphit.
- **Schrift:** klassisch mit Georgia-Überschriften oder modern mit Arial.
- **Abstände:** kompakt, normal und großzügig.
- **Inhalte:** zehn einzeln schaltbare Bausteine, eigene Absenderdaten,
  bearbeitbare Themenlisten und nummerierte Schritte.
- **Posteingang:** Betreff und Vorschautext separat bearbeiten.
- **Vorschau:** Desktop, Mobilansicht und abschließende Gesamtansicht mit
  Speichern-Button sowie Rückkehr zur Bearbeitung.
- **Export:** eigenständige HTML-Mail ohne Editor-Bedienelemente; Hinweise
  zu Beispielwerten, fehlenden Angaben und ungültigen Links vor dem Download.
- **Entwürfe:** als JSON-Datei sichern und wieder laden; auf Wunsch lokal
  auf diesem Gerät merken. Ohne Aktivierung keine dauerhafte Browser-Speicherung.
- **Neustart:** nach Rückfrage leer beginnen oder das Beispiel wiederherstellen.
- **Informationsseiten:** Anleitung, E-Mail & Recht sowie ergänzende
  Datenschutzhinweise; das Internessi-Impressum ist verlinkt.
- **Datensparsam:** kein Konto, keine Übertragung eingegebener Mailinhalte,
  keine externen Bibliotheken oder Schriftarten und keine Tracking-Pixel.

Die Texte bleiben beim Ausblenden und bei Gestaltungswechseln erhalten.
Ausgeschaltete Bausteine erscheinen weder in der Mail noch im HTML-Export.
JSON-Entwürfe enthalten auch ausgeblendete Inhalte. Themen und Schritte sind
auf jeweils zwölf Einträge begrenzt. Textfelder erlauben maximal 12.000 Zeichen,
importierte Entwurfsdateien maximal 1 MB. HTML lässt sich nicht als Entwurf
zurückimportieren. Der Betreff muss im Versandprogramm separat eingetragen werden.

## Nachgewiesene Prüfungen und Veröffentlichung

- 13 automatisierte Prüfungen erfolgreich, einschließlich sämtlicher 60
  Kombinationen aus Design, Farbpalette, Schrift und Abständen.
- Text-/Hintergrund-Kombinationen der Mailpaletten mit mindestens 4,5:1 Kontrast
  geprüft; keine vollständige Barrierefreiheitszertifizierung.
- Alle vier öffentlichen HTML-Seiten auf Struktur, eindeutige IDs und lokale Links geprüft.
- Browserprüfung: Texteingabe, Ein-/Ausblenden, Designwechsel, Listenbearbeitung,
  lokale Speicherung, Wiederherstellung, Gesamtansicht und Rückkehr zum Editor.
- Echte HTML- und JSON-Downloads kontrolliert; JSON-Datei über den Dateidialog
  wieder geladen. Auch der HTML-Download auf dem echten Server wurde ausgeführt.
- Desktop sowie 390- und 320-Pixel-Viewport ohne horizontales Überlaufen geprüft.
- Alle acht über HTTPS abrufbaren App-Dateien mit HTTP 200 und identischen
  SHA-256-Prüfsummen gegenüber dem lokalen Stand bestätigt. Die neunte
  Deployment-Datei ist die nicht öffentlich abrufbare `.htaccess`.
- Verzeichnisaufruf `/mailing/`, Modul-MIME-Typen und Sicherheitsheader geprüft.
- Öffentliches GitHub-Repository mit erkannter MIT-Lizenz; erster automatischer
  Testlauf erfolgreich: https://github.com/internessi/mailbaukasten/actions/runs/35577491261

Es wurden keine Testmails versendet. Eine tatsächliche Darstellungskontrolle in
Outlook, Gmail oder Apple Mail ist daher nicht belegt. Vor echtem Versand eine
Testmail im jeweiligen System prüfen. Weitere Nachweise stehen in TESTS.md.

## Vorhandene Ausgangsdateien

- `Internessi-Mailvorlage.html`: Design 1, markanter dunkelblauer Kopf,
  farbige Akzente, Infoboxen, strukturierte Listen und Kontaktkarte.
- `Internessi-Mailvorlage-Design-2.html`: Design 2, heller Briefstil,
  weißer Kopf mit blauer Oberkante, hell hinterlegte Überschrift,
  feine Trennlinien und schlichte Signatur.

Die beiden HTML-Dateien sind gestalterische Referenzen. Ihre bestehenden
Internessi-Inhalte bleiben in den Referenzdateien erhalten. Im öffentlichen
Generator wurden sie durch eindeutig erkennbare neutrale Beispielwerte ersetzt.
Die ursprünglichen Spam-Texte, Links und Absender dürfen nicht übernommen werden.
Dateien unter `sources/` sind schreibgeschützte Projektreferenzen und dürfen
nicht verändert werden. Zusätzlich gilt `AGENTS.md`.

## Umgesetzte Bedienung

### Öffentliche Website und Navigation

- Betrieb innerhalb der bestehenden Internessi-Website unter `/mailing/`.
- Zwei auswählbare Designs auf Grundlage der vorhandenen Vorlagen.
- Fünf auswählbare, auf beide Designs abgestimmte Farbpaletten.
- Zusätzliche Informationsseite in der oberen Navigation: Was gehört in eine
  E-Mail, welche rechtlichen Bedingungen sind relevant und wen darf man anschreiben?
- Das Internessi-Impressum ist verlinkt. Eine ergänzende Datenschutzseite
  beschreibt die Funktionen des Generators und verweist auf die zentrale Erklärung.

### Editor: links bauen, rechts das Ergebnis ansehen

- Auf großen Bildschirmen zweigeteilte Oberfläche: links die Bearbeitungsfelder,
  rechts die tatsächlich daraus erzeugte E-Mail.
- Jede Änderung an Text, Design, Farben oder Sichtbarkeit aktualisiert die
  Vorschau unmittelbar. Kein separater Anwenden-Button.
- Bereiche einzeln aktivieren und deaktivieren. Verborgene Bereiche erscheinen
  weder in der Vorschau noch im Export und hinterlassen keine leeren Abstände.
- Eingaben beim Ausblenden eines Bereichs erhalten, damit sie beim erneuten
  Einblenden wieder vorhanden sind.
- Auch beim Wechsel von Design oder Farbpalette alle Inhalte erhalten.
- Texteingaben und Links sicher behandeln: keine Ausführung eingegebenen HTMLs
  oder Skriptcodes. Vorschau vom restlichen Editor isolieren.
- Auf kleinen Bildschirmen zwischen Bearbeiten und Vorschau umschalten, statt
  beide Spalten unlesbar schmal darzustellen.

### Abschließende Online-Ansicht mit Speichern-Button

- Vom Editor aus eine vollständige Vorschau ohne Bearbeitungsfelder öffnen.
- Die fertige Mail dort im Browser ansehen und über einen gut sichtbaren
  Speichern-Button als HTML-Datei herunterladen.
- Zur Bearbeitung zurückkehren können, ohne Eingaben zu verlieren.
- Vorschau und Export müssen auf demselben erzeugten E-Mail-HTML beruhen.
- Bedienelemente der Website dürfen nicht Bestandteil der exportierten Mail sein.

Festgelegt: „Online-Ansicht“ bedeutet die vollständige Vorschau innerhalb des
Generators. Eine eigene teilbare Internetadresse für fertige Mailings ist
vorerst ausdrücklich nicht vorgesehen. Serverseitiges Speichern von Entwürfen
ist ebenfalls noch nicht vereinbart.

## Inhalte und Gestaltung

Umgesetzte Inhaltsbereiche:

- Briefkopf: Name/Firma, Unterzeile und optionaler Hinweis.
- Hauptüberschrift und optionale kleine Themenzeile.
- Anrede und Einleitung mit mehreren Absätzen.
- Optionale Infobox mit Link.
- Themenliste mit ergänzbaren oder entfernbaren Einträgen.
- Optionale nummerierte Schritte.
- Kontaktbereich mit E-Mail, Telefon und Website.
- Grußformel und Signatur.
- Absenderanschrift, weitere Unternehmensangaben und relevante Links.
- Optionaler Abmeldebereich; auf der Informationsseite erläutern, wann dieser
  für den jeweiligen Verwendungszweck erforderlich ist.

Umgesetzte Farbpaletten; konkrete, kontrastgeprüfte Farbwerte stehen in public/core.mjs:

| Palette | Richtung |
| --- | --- |
| Blau | Marineblau, Mittelblau, Eisblau; orientiert an den Referenzen |
| Petrol | Dunkles Petrol, Türkis, sehr helles Mint |
| Grün | Waldgrün, Salbei, gebrochenes Weiß |
| Bordeaux | Weinrot, gedecktes Rosé, warmer heller Hintergrund |
| Graphit | Anthrazit, Schiefergrau, dezente blaue Akzente |

Farben nach Rollen verwalten: Außenhintergrund, Inhaltsfläche, Hauptfarbe,
Akzentfarbe, normaler Text, zurückhaltender Text und Trennlinien. Kontraste
für jede Palette prüfen. Bestehende Typografie mit Georgia und Arial als
Ausgangspunkt erhalten. Umgesetzt sind zusätzlich ein moderner Arial-Stil und drei Abstandsvarianten.
Freie Farbwerte sind nicht enthalten; die fünf geprüften Paletten sichern die Lesbarkeit.

## Absender und rechtliche Informationsseite

Der Betreiber des Generators und der Absender einer erzeugten Mail sind
unterschiedliche Rollen. Internessis Impressum und Datenschutz gehören zur
Generator-Website. Nutzer müssen in ihrem Mailing ihre eigenen zutreffenden
Absender- und Unternehmensdaten verwenden.

Zentrale Website-Seite: https://www.internessi.de/rechtliches.php
Bei künftigen Änderungen die aktuellen Angaben und Verlinkungen erneut prüfen.

Veröffentlichte Informationsseite „E-Mail & Recht“:

- Persönliche Nachrichten, geschäftliche Korrespondenz und Werbung unterscheiden.
- Voraussetzungen für werbliche Ansprache erläutern, einschließlich Einwilligung
  und möglicher Ausnahmen für bestehende Kundenbeziehungen.
- Geschäftliche und private Empfänger differenziert behandeln.
- Absenderangaben, Kontaktmöglichkeiten und Abmeldung erklären.
- Datenschutz, Herkunft von Adressen und Nachweise thematisieren.
- Verständliche Beispiele, Quellenlinks und sichtbares Standdatum anbieten.

Die Seite wurde anhand offizieller Quellen ausgearbeitet und enthält Quellenlinks
und ein Standdatum. Sie bietet allgemeine Orientierung, keine individuelle
anwaltliche Prüfung. Der Generator gibt keine pauschale Zusicherung „rechtssicher“
oder „Versand erlaubt“. Automatische Prüfungen weisen nur auf erkennbare Lücken hin.

## Umgesetzte Ergänzungen

- Entwurf als Datei speichern und wieder laden, getrennt vom HTML-Export.
- Betreff und Vorschautext bearbeiten. Der Betreff gehört zu den Entwurfsdaten;
  eine HTML-Datei setzt ihn im späteren Mailprogramm nicht automatisch.
- Desktop- und Mobilansicht in der Vorschau.
- Hinweise vor dem Download auf Beispielwerte, fehlende Absenderdaten und
  ungültige Links. Die festen Farbpaletten werden in Entwicklungstests auf
  ausreichenden Kontrast geprüft, nicht in einem zusätzlichen Download-Dialog.
- Eingaben vollständig löschen beziehungsweise auf Beispiele zurücksetzen.
- Kurze Anleitung zum Import und zur Testmail im verwendeten Mailprogramm.

## Technischer Aufbau für die Weiterentwicklung

Umgesetzt mit HTML, CSS und nativem JavaScript (ES-Module), ohne Framework,
externe Bibliotheken oder Build-Prozess. Statische Dateien liegen in public/.
Die Anwendung funktioniert unter /mailing/ und auf einem lokalen Webserver.

Umgesetzte Architektur:

1. Ein gemeinsames Datenmodell für Inhalte, Sichtbarkeit, Design und Farbpalette.
2. Ein gemeinsamer E-Mail-Renderer mit zwei Designvarianten.
3. Gemeinsame Farbtokens, die beim Rendern in konkrete Farbwerte aufgelöst werden.
4. Eine isolierte Live-Vorschau und eine separate vollständige Vorschau.
5. HTML-Download aus demselben Renderer, mit UTF-8 und sinnvollem Dateinamen.
6. Bei Entwurfsdateien ein versioniertes Format mit Validierung beim Import.

Nutzereingaben werden im Browser verarbeitet. Es gibt keine Übertragung oder
Speicherung von Mailinhalten auf dem Server. Lokale Browser-Speicherung ist
freiwillig. Eine öffentliche Freigabefunktion ist ausdrücklich nicht vorgesehen.

Für den E-Mail-Export:

- Tabellenlayout und überwiegend Inline-Styles aus den Vorlagen erhalten.
- Keine Skripte, Formulare oder externen Schriftabhängigkeiten.
- Responsive Darstellung und geeignete Outlook-Fallbacks berücksichtigen.
- Absolute Links verwenden; keine relativen Website-Ressourcen im Export.
- Browser-Vorschau ersetzt keine Prüfung in E-Mail-Programmen.

Direkter Mailversand, Adresslisten, Kampagnenverwaltung, Tracking, Benutzerkonten,
öffentlich teilbare gespeicherte Mailings und spezielle Outlook-Dateiformate
sind bisher nicht vereinbart.

## Abnahmekriterien

- Beide Designs und alle fünf Farbpaletten sind auswählbar.
- Änderungen links werden rechts unmittelbar sichtbar.
- Ein- und Ausblenden funktioniert ohne Inhaltsverlust oder leere Layoutreste.
- Designwechsel erhält Texte, Links, Absenderdaten und Sichtbarkeitseinstellungen.
- Vollständige Vorschau enthält einen Speichern-Button und einen Weg zurück.
- Heruntergeladenes HTML entspricht der Vorschau und enthält keine Editor-UI.
- Sonderzeichen, lange Texte und lange Links werden sauber verarbeitet.
- Eingegebene Skripte oder gefährliche Link-Protokolle werden nicht ausgeführt.
- Bedienung funktioniert auf Desktop und Mobilgeräten sowie mit Tastatur.
- Keine unbeabsichtigte Übernahme der Internessi-Absenderdaten in fremde Mailings.
- Informationsseite sowie Impressum und Datenschutz sind erreichbar.
- Echte Testmails in relevanten E-Mail-Programmen bleiben eine Prüfung vor
  produktivem Versand; sie wurden in dieser Umsetzung nicht durchgeführt.

## Betrieb und Weiterentwicklung

Der Bau und die Veröffentlichung wurden vom Auftraggeber ausdrücklich beauftragt.
Name: MailBaukasten. Öffentliches Repository: internessi/mailbaukasten, Lizenz MIT.
HTML-Download und JSON-Entwurfsdateien sind implementiert. Serverseitige Speicherung
oder teilbare Entwurfsadressen gehören weiterhin nicht zum Umfang.

Das Impressum der Internessi-Website wird verlinkt. Eine lokale Datenschutzseite
ergänzt deren Erklärung um Browser-Verarbeitung, freiwilligen Local Storage und
Dateidownloads. Änderungen an Rechtstexten weiterhin anhand aktueller Quellen prüfen.

Die Vorschau behält beim Tippen ihre Scrollposition. Das Öffnen eines Inhaltsblocks
zeigt den zugehörigen Abschnitt in der Vorschau. Links sind dort nicht navigierbar;
im HTML-Export bleiben sie normale Links.

Deployment erfolgt nur aus public/ in das eigene Unterverzeichnis. Zugangsdaten
werden ausschließlich aus einer bestehenden lokalen SSH-Konfiguration verwendet.
Der Website-Hauptauftritt wird durch das Deployment nicht verändert.

Noch nicht enthalten: Bilder, EML/OFT, serverseitige Konten oder Speicherung,
Versand, Verteilerverwaltung und öffentliche Adressen für fertige Mailings.

### Dateien und lokale Arbeit

| Datei | Aufgabe |
| --- | --- |
| `public/index.html` | Editor, Gesamtansicht und Dialoge |
| `public/app.js` | Bedienung, Live-Vorschau, Speicherung und Downloads |
| `public/core.mjs` | Datenmodell, Paletten, Validierung und Mail-Renderer |
| `public/styles.css` | Responsive Oberfläche und Informationsseiten |
| `public/anleitung.html` | Bedienung und Verwendung des Exports |
| `public/recht.html` | Rechtliche Orientierung mit Quellen |
| `public/datenschutz.html` | Ergänzende Datenschutzhinweise |
| `public/.htaccess` | Startdatei, Modul-MIME-Typ und Sicherheitsheader |
| `scripts/build-pages.py` | Informationsseiten neu erzeugen |
| `scripts/check-pages.py` | HTML-Struktur und lokale Links prüfen |
| `tests/core.test.mjs` | Automatisierte Funktions-, Sicherheits- und Kontrasttests |
| `.github/workflows/test.yml` | Prüfungen bei Push und Pull Request |
| `deploy.ps1` | Nur die neun öffentlichen Dateien veröffentlichen |

Starten aus dem Projektordner:

```sh
python -m http.server 8765 --bind 127.0.0.1 --directory public
```

Danach `http://127.0.0.1:8765/` öffnen. Die App benötigt wegen ihrer ES-Module
einen Webserver; nicht als `file://` öffnen. Entwicklung ist hier und in VS Code möglich.

Prüfen:

```sh
node --test tests/core.test.mjs
python scripts/check-pages.py
```

Das Deployment-Skript verwendet einen bereits eingerichteten lokalen SSH-Alias
und sichert vorherige Veröffentlichungen außerhalb des Webroots. Schlüssel und
Zugangsdaten sind nicht Bestandteil des öffentlichen Repositorys.
