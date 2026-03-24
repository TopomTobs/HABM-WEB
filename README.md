# HABM Portfolio - React Version

Dies ist die React-Version der HABM Portfolio-Website. Die ursprüngliche HTML-Version wurde vollständig in React umgewandelt.

## Features

- 🔐 Passwortgeschützter Zugriff mit SHA-256 Hashing
- 👥 Personen-Navigation mit Sidebar
- 📱 Responsive Design (Mobile & Desktop)
- 🎨 Sowjet-Ästhetik Styling
- ⚛️ Moderne React-Komponenten

## Installation

```bash
npm install
```

## Starten

```bash
npm start
```

Die App öffnet sich unter [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
```

Erstellt einen optimierten Build für die Produktion.

## Passwort ändern

Um das Passwort zu ändern:

1. Das neue Passwort im Browser-Console mit folgendem Command hashen:
```javascript
await sha256("ihr_neues_passwort")
```

2. Den generierten Hash in der Datei `src/data.js` unter `CORRECT_PASSWORD_HASH` ersetzen.

## Projektstruktur

```
src/
├── App.js                 # Hauptkomponente
├── index.js              # React Entry Point
├── index.css             # Globale Styles
├── data.js               # Daten und Hilfsfunktionen
└── components/
    ├── PasswordModal.jsx  # Passwort-Modal
    ├── Topbar.jsx         # Obere Navigationsleiste
    ├── Sidebar.jsx        # Seitenmenü
    └── PersonContent.jsx  # Hauptinhalt
```

## Assets

Assets befinden sich im `Assets/` Verzeichnis. Sie können diese in den HTML-Code-Verzeichnis referenzieren oder in `public/Assets/` kopieren.
