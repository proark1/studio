# NFT Gym — Deployment (Railway + Postgres)

Der Prototyp läuft weiterhin als **statische SPA**. Neu ist ein schlankes
**Node/Express-Backend** (`server.js`), das dieselben Dateien ausliefert **und**
die im Bild-Studio generierten Website-Bilder in **Postgres** speichert.

## Architektur

```
Browser (admin.js)
  │  Bild via Gemini generieren + clientseitig komprimieren (wie bisher)
  │  PUT /api/images/:id   { data_url, mime, width, height, bytes, prompt, model }
  ▼
Express (server.js) ──► Postgres  (Tabelle studio_images)
  ▲
  │  GET /api/images   → alle gespeicherten Bilder beim Laden
  └─ liefert auch index.html + assets/ aus (eine Railway-Service)
```

**Progressive Enhancement:** Ist keine Datenbank erreichbar (lokale Vorschau,
GitHub Pages), fällt das Bild-Studio automatisch auf `localStorage` zurück —
nichts bricht. Mit Datenbank sind die Bilder **geräteübergreifend & geteilt**.

## Endpunkte

| Methode | Pfad | Zweck |
|--------|------|-------|
| `GET`  | `/api/health` | `{ ok, db, tokenRequired }` |
| `GET`  | `/api/images` | alle Bilder `{ images: { id: {data_url,…} } }` |
| `PUT`  | `/api/images/:id` | Bild speichern/aktualisieren (Upsert) |
| `DELETE` | `/api/images/:id` | Bild zurücksetzen |

Schreib-Endpunkte verlangen den Header `x-admin-token`, **wenn** `ADMIN_TOKEN`
gesetzt ist (sonst offen — nur für Dev).

## Railway einrichten

1. **Postgres** im Projekt hinzufügen (Railway → *New* → *Database* → *PostgreSQL*).
2. Im **Service** (dieses Repo) unter *Variables*:
   - `DATABASE_URL = ${{Postgres.DATABASE_URL}}`  (Referenz auf die DB)
   - `ADMIN_TOKEN = <ein geheimes Wort>`  *(optional, empfohlen)*
   - `PORT` wird von Railway automatisch gesetzt.
3. **Start Command:** `npm start` (setzt Railway aus `package.json` automatisch).
4. Deploy. Beim ersten Start legt der Server die Tabelle `studio_images` selbst an.

## Bild-Studio nutzen

- `#/admin` öffnen. Oben zeigt ein Badge **☁️ Postgres verbunden** oder
  **💾 Lokal (localStorage)** den Modus.
- Ist `ADMIN_TOKEN` gesetzt: das Token einmal im Feld **„Admin-Token"** eintragen
  (wird nur lokal im Browser gehalten und als Header mitgeschickt).
- Bilder generieren wie gehabt — sie landen jetzt in Postgres und erscheinen für
  alle Besucher der Website.

## Lokal testen

```bash
npm install
# ohne DB (localStorage-Modus):
npm start
# mit DB:
DATABASE_URL=postgres://user:pass@host:5432/db npm start
```

Hinweis: Die Bilder werden als komprimierte `data:`-URLs (Base64) in einer
`text`-Spalte abgelegt — bei ~23 Slots und clientseitiger Kompression völlig
ausreichend. Für sehr viele/große Bilder später auf Objektspeicher (S3/Volume)
umstellen und nur die URL in Postgres halten.
