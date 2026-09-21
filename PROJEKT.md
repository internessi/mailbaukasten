# MailBaukasten von Internessi

## Status und Ziel

Umsetzungsstand: 21. September 2026, Version 1.0. Der Generator ist implementiert.
Diese Datei dokumentiert Anforderungen und Entscheidungen zur Weiterentwicklung.
Bedienung und Startbefehle stehen in README.md; Prüfnachweise in TESTS.md.

Unter https://www.internessi.de/mailing/ soll ein öffentlich zugänglicher
HTML-E-Mail-Generator entstehen. Nutzer wählen ein Design und eine Farbpalette,
geben eigene Texte und Absenderdaten ein, schalten Inhaltsbereiche ein oder aus
und laden das Ergebnis als eigenständige HTML-E-Mail-Vorlage herunter.

## Vorhandene Ausgangsdateien

- `Internessi-Mailvorlage.html`: Design 1, markanter dunkelblauer Kopf,
  farbige Akzente, Infoboxen, strukturierte Listen und Kontaktkarte.
- `Internessi-Mailvorlage-Design-2.html`: Design 2, heller Briefstil,
  weißer Kopf mit blauer Oberkante, hell hinterlegte Überschrift,
  feine Trennlinien und schlichte Signatur.

Die beiden HTML-Dateien sind gestalterische Referenzen. Ihre bestehenden
Internessi-Inhalte sind Beispiele und müssen für den öffentlichen Generator
durch eindeutig erkennbare neutrale Beispielwerte ersetzt werden.
Die ursprünglichen Spam-Texte, Links und Absender dürfen nicht übernommen werden.
Dateien unter `sources/` sind schreibgeschützte Projektreferenzen und dürfen
nicht verändert werden. Zusätzlich gilt `AGENTS.md`.

## Festgelegte Anforderungen

### Öffentliche Website und Navigation

- Betrieb innerhalb der bestehenden Internessi-Website unter `/mailing/`.
- Zwei auswählbare Designs auf Grundlage der vorhandenen Vorlagen.
- Fünf auswählbare, auf beide Designs abgestimmte Farbpaletten.
- Zusätzliche Informationsseite in der oberen Navigation: Was gehört in eine
  E-Mail, welche rechtlichen Bedingungen sind relevant und wen darf man anschreiben?
- Impressum und Datenschutz aus der Internessi-Website verwenden beziehungsweise
  verlinken. Ihre Anwendbarkeit auf die neuen Funktionen vor Veröffentlichung prüfen.

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

Vorgesehene Inhaltsbereiche:

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

Bekannte Website-Seite: https://www.internessi.de/rechtliches.php
Vor der Umsetzung die aktuellen Angaben und Verlinkungen erneut prüfen.

Geplante Informationsseite „E-Mail & Recht“:

- Persönliche Nachrichten, geschäftliche Korrespondenz und Werbung unterscheiden.
- Voraussetzungen für werbliche Ansprache erläutern, einschließlich Einwilligung
  und möglicher Ausnahmen für bestehende Kundenbeziehungen.
- Geschäftliche und private Empfänger differenziert behandeln.
- Absenderangaben, Kontaktmöglichkeiten und Abmeldung erklären.
- Datenschutz, Herkunft von Adressen und Nachweise thematisieren.
- Verständliche Beispiele, Quellenlinks und sichtbares Standdatum anbieten.

Diese Themenliste enthält noch keine geprüfte Rechtsauskunft. Konkrete Aussagen
vor Veröffentlichung anhand aktueller offizieller Quellen recherchieren und
prüfen. Keine pauschale Zusicherung „rechtssicher“ oder „Versand erlaubt“ durch
den Generator. Automatische Prüfungen können nur auf erkennbare Lücken hinweisen.

## Umgesetzte Ergänzungen

- Entwurf als Datei speichern und wieder laden, getrennt vom HTML-Export.
- Betreff und Vorschautext bearbeiten. Der Betreff gehört zu den Entwurfsdaten;
  eine HTML-Datei setzt ihn im späteren Mailprogramm nicht automatisch.
- Desktop- und Mobilansicht in der Vorschau.
- Hinweise vor dem Download auf Beispielwerte, fehlende Absenderdaten,
  ungültige Links und unzureichende Farbkontraste.
- Eingaben vollständig löschen beziehungsweise auf Beispiele zurücksetzen.
- Kurze Anleitung zum Import und zur Testmail im verwendeten Mailprogramm.

## Technischer Ausgangspunkt für VS Code

Umgesetzt mit HTML, CSS und nativem JavaScript (ES-Module), ohne Framework,
externe Bibliotheken oder Build-Prozess. Statische Dateien liegen in public/.
Die Anwendung funktioniert unter /mailing/ und auf einem lokalen Webserver.

Empfohlene Architektur:

1. Ein gemeinsames Datenmodell für Inhalte, Sichtbarkeit, Design und Farbpalette.
2. Zwei Renderer, die dieses Modell in E-Mail-HTML umsetzen.
3. Gemeinsame Farbtokens, die beim Rendern in konkrete Farbwerte aufgelöst werden.
4. Eine isolierte Live-Vorschau und eine separate vollständige Vorschau.
5. HTML-Download aus demselben Renderer, mit UTF-8 und sinnvollem Dateinamen.
6. Bei Entwurfsdateien ein versioniertes Format mit Validierung beim Import.

Möglichst sämtliche Nutzereingaben im Browser verarbeiten. Keine Übertragung
oder dauerhafte Speicherung von Mailinhalten auf dem Server als Voreinstellung.
Browser-Speicherung nur transparent anbieten. Eine optionale öffentliche
Freigabefunktion würde ein eigenes Speicher-, Zugriffs- und Löschkonzept benötigen.

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
- Relevante E-Mail-Programme werden vor Veröffentlichung anhand exportierter
  Testmails geprüft; verbleibende Darstellungsunterschiede werden dokumentiert.

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
