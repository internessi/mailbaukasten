<div align="center">

<img src="public/favicon.svg" alt="MailBaukasten-Logo" width="76" height="76">

# MailBaukasten

**Schöne HTML-E-Mails. Einfach zusammengebaut.**

Ein deutschsprachiger E-Mail-Editor mit Live-Vorschau, zwei Designs und fünf Farbpaletten.
Kostenlos, ohne Anmeldung und direkt im Browser.

[![Tests](https://github.com/internessi/mailbaukasten/actions/workflows/test.yml/badge.svg)](https://github.com/internessi/mailbaukasten/actions/workflows/test.yml)
[![Lizenz: MIT](https://img.shields.io/badge/Lizenz-MIT-245e60.svg)](LICENSE)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-f7df1e.svg)](public/core.mjs)
[![Sprache: Deutsch](https://img.shields.io/badge/Sprache-Deutsch-173b3f.svg)](https://www.internessi.de/mailing/)

### [Live ausprobieren ↗](https://www.internessi.de/mailing/)

[Anleitung](https://www.internessi.de/mailing/anleitung.html) ·
[E-Mail & Recht](https://www.internessi.de/mailing/recht.html) ·
[Fehler melden](https://github.com/internessi/mailbaukasten/issues) ·
[Internessi](https://www.internessi.de/)

</div>

---

## Was ist MailBaukasten?

**Links bearbeiten, rechts das Ergebnis sehen.** Wähle eine Gestaltung, schreibe
deine Texte und schalte die Bausteine ein, die du brauchst. Anschließend öffnest
du die vollständige Vorschau und lädst deine fertige E-Mail als HTML-Datei herunter.

MailBaukasten ist ein Vorlageneditor, kein Versanddienst. Deine Mailinhalte bleiben
im Browser. Du brauchst weder ein Benutzerkonto noch einen API-Schlüssel.

## Inhalt

- [Funktionen](#funktionen)
- [Designs und Farben](#designs-und-farben)
- [In vier Schritten zur Mail](#in-vier-schritten-zur-mail)
- [Lokal starten](#lokal-starten)
- [Projektstruktur](#projektstruktur)
- [Entwicklung und Tests](#entwicklung-und-tests)
- [Selbst hosten](#selbst-hosten)
- [Datenschutz und Sicherheit](#datenschutz-und-sicherheit)
- [Grenzen](#grenzen)
- [Mitmachen](#mitmachen)
- [Lizenz](#lizenz)

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

### Die Bausteine

Briefkopf · Überschrift · Einleitung · Infobox mit Link · Themenliste ·
Nächste Schritte · Kontakt · Gruß und Signatur · Absender und Pflichtangaben · Abmeldung

## Designs und Farben

| Design | Charakter |
| --- | --- |
| **Markant** | Dunkler Kopf, kräftige Akzente und hervorgehobener Kontaktbereich |
| **Briefstil** | Heller Briefkopf, feine Trennlinien und persönliche Signatur |

| Palette | Farbwelt |
| --- | --- |
| **Blau** | Marineblau, kräftiges Blau und Eisblau |
| **Petrol** | Dunkles Petrol, Türkis und helles Mint |
| **Grün** | Waldgrün, Salbei und gebrochenes Weiß |
| **Bordeaux** | Weinrot, gedecktes Rosé und helle warme Flächen |
| **Graphit** | Anthrazit, Schiefergrau und dezente blaue Akzente |

Beide Designs funktionieren mit jeder Palette. Ein Wechsel erhält alle Texte
und Sichtbarkeitseinstellungen.

## In vier Schritten zur Mail

1. **Gestalten:** Design, Farbpalette, Schriftstil und Abstände auswählen.
2. **Schreiben:** Beispieltexte ersetzen und benötigte Bausteine einschalten.
3. **Prüfen:** Desktop-, Mobil- und Gesamtansicht kontrollieren.
4. **Speichern:** HTML herunterladen oder einen bearbeitbaren JSON-Entwurf sichern.

> **HTML ist das Ergebnis, JSON ist der Entwurf.** Die HTML-Datei verwendest du
> in einem geeigneten Mailprogramm oder Versandsystem. Die JSON-Datei lädst du
> später wieder in MailBaukasten. Den Betreff trägst du beim Versand separat ein.

## Lokal starten

Voraussetzungen: **Git** zum Klonen und **Python 3** für einen einfachen lokalen
Webserver. Alternativ funktioniert jeder statische Entwicklungsserver.

```sh
git clone https://github.com/internessi/mailbaukasten.git
cd mailbaukasten
python -m http.server 8765 --bind 127.0.0.1 --directory public
```

Danach `http://127.0.0.1:8765/` öffnen. ES-Module benötigen einen Webserver;
die App nicht per Doppelklick als `file://` öffnen. Alternativ funktioniert
jeder gewöhnliche statische Entwicklungsserver. Es gibt keinen Installations-
oder Build-Schritt für die Anwendung. In VS Code denselben Ordner öffnen.

## Projektstruktur

```text
mailbaukasten/
├── public/                 # Veröffentlichte Anwendung, ohne Build-Schritt
│   ├── index.html          # Editor und Gesamtansicht
│   ├── app.js              # Bedienung, Speichern und Laden
│   ├── core.mjs            # Datenmodell und E-Mail-Renderer
│   ├── styles.css          # Responsive Oberfläche
│   ├── anleitung.html      # Bedienung und Export
│   ├── recht.html          # Rechtliche Orientierung
│   └── datenschutz.html    # Ergänzende Datenschutzhinweise
├── tests/                  # Automatisierte Tests
├── scripts/                # Seiten erzeugen und prüfen
├── .github/workflows/      # GitHub Actions
├── deploy.ps1              # Veröffentlichung über SSH
├── PROJEKT.md              # Projekt- und Funktionsstand
├── TESTS.md                # Prüfnachweise und Grenzen
└── LICENSE                 # MIT-Lizenz
```

<details>
<summary>Die wichtigsten Dateien im Detail</summary>

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

</details>

Die beiden `Internessi-Mailvorlage*.html` im Stammverzeichnis sind historische
Designreferenzen, keine Vorgaben für die Absenderdaten fremder Nutzer.

## Entwicklung und Tests

Node.js 24 und Python 3, ohne zusätzliche Pakete:

```sh
node --check public/app.js
node --test tests/core.test.mjs
python scripts/check-pages.py
```

GitHub Actions führt diese Prüfungen bei Pushes und Pull Requests aus.

Die Tests decken unter anderem alle **60 Gestaltungskombinationen**, ausgeblendete
Inhalte, JSON-Importe, HTML-Escaping, sichere Link-Protokolle und Textkontraste ab.

`core.mjs` enthält das gemeinsame Datenmodell und einen Renderer mit zwei
Designvarianten. `app.js` verbindet ihn mit dem Editor. Live-Vorschau,
Gesamtansicht und Download verwenden denselben Renderer.

Für Änderungen an den Informationsseiten die Texte in `scripts/build-pages.py`
bearbeiten und anschließend neu erzeugen:

```sh
python scripts/build-pages.py
python scripts/check-pages.py
```

Details: [Projektbeschreibung](PROJEKT.md) · [Prüfstand](TESTS.md)

## Selbst hosten

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

Die normalen Hosting-Protokolle sind in der jeweiligen Datenschutzerklärung
beschrieben. Die Badges oben in **dieser GitHub-README** stammen von GitHub und
Shields.io; sie werden nicht in der Anwendung eingebunden.

## Grenzen

Die Vorschau prüft nicht die Darstellung in jedem Mailprogramm. Exportierte
Testmails vor echtem Versand insbesondere in klassischem Outlook, Gmail und
Apple Mail kontrollieren. Keine OFT-/EML-Ausgabe, keine Bilder oder Dateianhänge.
Der Betreff muss im Versandprogramm separat gesetzt werden.

Die rechtlichen Hinweise sind allgemeine Informationen für Deutschland, keine
individuelle Rechtsberatung und keine Garantie zulässigen Versands.

## Mitmachen

Fehler gefunden oder eine Idee? [Erstelle ein Issue](https://github.com/internessi/mailbaukasten/issues).
Beschreibe möglichst die Schritte, das erwartete Ergebnis und deinen Browser.
Bitte keine Zugangsdaten, Empfängerlisten oder privaten Entwürfe veröffentlichen.

Pull Requests sind willkommen:

1. Repository forken und einen Branch für die Änderung erstellen.
2. Änderungen überschaubar halten und vorhandene Strukturen beachten.
3. Tests ausführen sowie Desktop- und Mobilansicht prüfen.
4. Änderungen und Prüfung im Pull Request kurz beschreiben.

Weitere Hinweise stehen in [AGENTS.md](AGENTS.md) und [PROJEKT.md](PROJEKT.md).

## Lizenz

[MIT](LICENSE) · Copyright 2026 Frank Wolf / Internessi.
Die Lizenz betrifft die Software. Eigene Mailtexte bleiben Inhalte ihrer
jeweiligen Verfasser. Hinweise und Verbesserungen gern als GitHub-Issue oder
Pull Request; keine privaten Entwürfe oder Zugangsdaten öffentlich einstellen.

---

<div align="center">

Entwickelt von [Internessi](https://www.internessi.de/) ·
[MailBaukasten öffnen](https://www.internessi.de/mailing/)

</div>
