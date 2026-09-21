# MailBaukasten

**Schöne HTML-E-Mails, einfach gemacht.** Ein öffentlicher, deutschsprachiger
Mailing-Editor von [Internessi](https://www.internessi.de/).

**Live:** [internessi.de/mailing](https://www.internessi.de/mailing/)

## Funktionen

- Links bearbeiten, rechts Live-Vorschau; auf dem Smartphone umschalten.
- Zwei Designs: **Markant** und **Briefstil**.
- Fünf Farbpaletten: Blau, Petrol, Grün, Bordeaux und Graphit.
- Klassische oder moderne Schrift, drei Abstandsvarianten.
- Zehn einzeln schaltbare Bausteine mit frei bearbeitbaren Texten.
- Themen und nummerierte Schritte ergänzen oder entfernen.
- Vollständige Vorschau mit HTML-Download und Hinweisen vor dem Export.
- Entwürfe als JSON-Datei sichern und laden, optional lokal im Browser merken.
- Anleitung, rechtliche Orientierung für Deutschland und Datenschutzhinweise.

Kein Konto, kein Versand, keine Empfängerlisten, keine externen Bibliotheken,
keine Tracking-Pixel und keine Übertragung der eingegebenen Mailinhalte.
Keine öffentlichen URLs für Entwürfe.

## Lokal starten

Voraussetzung für den Entwicklungsserver: Python 3.

```sh
python -m http.server 8765 --bind 127.0.0.1 --directory public
```

Danach `http://127.0.0.1:8765/` öffnen. ES-Module benötigen einen Webserver;
die App nicht per Doppelklick als `file://` öffnen. Alternativ funktioniert
jeder gewöhnliche statische Entwicklungsserver. Es gibt keinen Installations-
oder Build-Schritt für die Anwendung. In VS Code denselben Ordner öffnen.

## Dateien

| Datei | Aufgabe |
| --- | --- |
| `public/index.html` | Editor und abschließende Vorschau |
| `public/styles.css` | Responsive Oberfläche |
| `public/app.js` | Bedienung, Speichern, Laden und Vorschau |
| `public/core.mjs` | Datenmodell, Validierung, Farben und E-Mail-Renderer |
| `public/anleitung.html` | Bedienung und Export |
| `public/recht.html` | Rechtliche Orientierung mit Quellen |
| `public/datenschutz.html` | Ergänzende Datenschutzhinweise |
| `tests/core.test.mjs` | Funktions-, Sicherheits- und Kontrastprüfungen |
| `scripts/check-pages.py` | HTML-Struktur und lokale Links prüfen |
| `scripts/build-pages.py` | Informationsseiten aus den enthaltenen Texten neu erzeugen |
| `deploy.ps1` | Veröffentlichung mit Sicherung des bisherigen Standes |
| `PROJEKT.md` | Anforderungen und technische Entscheidungen |
| `TESTS.md` | Tatsächlich durchgeführte Prüfungen und Grenzen |

Die beiden `Internessi-Mailvorlage*.html` im Stammverzeichnis sind historische
Designreferenzen, keine Vorgaben für die Absenderdaten fremder Nutzer.

## Prüfen

Node.js 24 und Python 3, ohne zusätzliche Pakete:

```sh
node --test tests/core.test.mjs
python scripts/check-pages.py
```

GitHub Actions führt diese Prüfungen bei Pushes und Pull Requests aus.

## Veröffentlichen

Den Inhalt von `public/` auf einen statischen Webserver kopieren. Auf Apache
setzt die enthaltene `.htaccess` den Startpunkt, den MIME-Typ für Module und
Sicherheitsheader. Auf anderen Servern entsprechend konfigurieren.

Optional mit PowerShell und einem bereits eingerichteten lokalen SSH-Alias:

```powershell
./deploy.ps1 -SshHost mein-server -DryRun
./deploy.ps1 -SshHost mein-server -RemoteDirectory www/internessi/mailing
```

Das Skript lädt ausschließlich die neun öffentlichen Dateien hoch. Vorhandene
Veröffentlichungen werden außerhalb des Webroots unter
`~/.mailbaukasten-backups/` gesichert. Schlüssel und Zugangsdaten gehören weder
ins Repository noch in die Browser-Anwendung. Die SSH-Verbindung muss bereits
mit bekanntem Hostschlüssel eingerichtet sein.

Bei eigener Bereitstellung die Betreiberlinks, Datenschutzhinweise und
Impressumsangaben auf den eigenen Betrieb anpassen.

## Datenschutz und Sicherheit

Standardmäßig bleiben Eingaben nur im Arbeitsspeicher des Browsers. Die
Merken-Funktion speichert nach Aktivierung im lokalen Browserprofil. JSON-Dateien
enthalten auch ausgeblendete Texte. Vor dem Teilen entsprechend prüfen.

Texte werden HTML-escaped; Links auf zulässige Protokolle begrenzt. JSON-Importe
werden anhand eines versionierten Schemas geprüft. Beide Vorschauen sind
sandboxed, ohne Skriptausführung, mit zusätzlicher Content Security Policy.
Vorschau und Export verwenden denselben Renderer.

## Grenzen

Die Vorschau prüft nicht die Darstellung in jedem Mailprogramm. Exportierte
Testmails vor echtem Versand insbesondere in klassischem Outlook, Gmail und
Apple Mail kontrollieren. Keine OFT-/EML-Ausgabe, keine Bilder oder Dateianhänge.
Der Betreff muss im Versandprogramm separat gesetzt werden.

Die rechtlichen Hinweise sind allgemeine Informationen für Deutschland, keine
individuelle Rechtsberatung und keine Garantie zulässigen Versands.

## Lizenz

[MIT](LICENSE) · Copyright 2026 Frank Wolf / Internessi.
Die Lizenz betrifft die Software. Eigene Mailtexte bleiben Inhalte ihrer
jeweiligen Verfasser. Hinweise und Verbesserungen gern als GitHub-Issue oder
Pull Request; keine privaten Entwürfe oder Zugangsdaten öffentlich einstellen.
