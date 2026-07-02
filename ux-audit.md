# UX-Audit-Report: NFT-Gym-Prototyp

*Head of Design · Synthese aus 7 Review-Perspektiven (Multi-Agent, am Code belegt) · Stand 01.07.2026 · 46 Findings*

---

## 1. Gesamturteil

Der Prototyp ist ein visuell starker, breit ausgearbeiteter Happy-Path-Demonstrator mit sauberer Token-Struktur, konsistentem Dark-Theme und einem eigenständigen Slash-Markenmotiv — die Design-Grundlage ist überdurchschnittlich. Die größte Schwäche ist **Barrierefreiheit**: die tragenden Interaktionen (Kursfinder, Wizards, Toggles, Consent, Tabellenzeilen) sind klickbare `div`/`span`/`tr[onclick]` ohne Tastatur- und Screenreader-Zugang — ein rechtlich relevanter Totalausfall (WCAG 2.1.1, BFSG). Fast gleichauf liegt das **CRM**, das als reiner Viewer endet: der globale Standort-Filter filtert nichts, jede Mitgliederzeile öffnet dasselbe Profil, destruktive/finanzielle Aktionen feuern ohne Bestätigung. Dazu kommen systematische **Journey-Sackgassen** (Shop ohne Warenkorb, kein Login/Logout, keine 404). Die Marke selbst kommt zudem nicht an, weil der Headline-Font auf System-Fallbacks kollabiert und ~200 Emojis das Produkt wie ein Wireframe wirken lassen.

---

## 2. Top 10 Quick Wins

1. **Fight-Font fehlt** `[P0]` → Echten Condensed-Webfont (Oswald/Anton/Bebas) lokal self-hosten, `--ff-head` voranstellen, `font-display:swap`.
2. **Standort-Filter tut nichts** `[P0]` → `state.standort` real als Filter auf members/payments/checkins/leads anwenden (analog `courseFilter`).
3. **Focus unsichtbar** `[P0]` → Global `:focus-visible{outline:2px solid #fff;outline-offset:2px}`; `outline:none` bei `.field input` entfernen.
4. **Demo-Ribbon überlappt Header** `[P1]` → `--ribbon:26px` als Token, `body` padding-top + alle Sticky-Header versetzen.
5. **Toast ohne aria-live** `[P1]` → Einmalig `<div role="status" aria-live="polite" class="sr-only">`; `toast()` schreibt Text hinein.
6. **Icon-Buttons ohne Namen** `[P1]` → `aria-label` an Hamburger/Glocke/Schließen/Anwesenheit; Icon-Emojis `aria-hidden="true"`.
7. **Jede Mitgliederzeile → „Familie A."** `[P0]` → Row-Klick auf `m.id` parametrisieren, `family(id)` den Datensatz auflösen lassen.
8. **Doppelte `.btn`-Deklaration** `[P2]` → Widersprüchliche `font-size`/`letter-spacing` in `.btn` (app.css) konsolidieren.
9. **404 fehlt** `[P1]` → `notFound()`-View je Oberfläche; Router-Default darauf statt still auf Home.
10. **`prefers-reduced-motion` fehlt** `[P2]` → Reduce-Media-Block ergänzen.

---

## 3. Nach Priorität (dedupliziert)

### P0 — Blocker / kaputt

**A11y-Blocker: nicht-native Interaktionselemente** `[Global/App/CRM]`
- Kern-Controls sind `div`/`span` mit `data-action` (Kursfinder-Chips, Wizard-Schritte, Switches, FAQ, Consent, App-/CRM-Chips, Inbox-Zeilen) — nicht fokussierbar, keine Rolle, kein Enter/Space. → `<button type="button">`; Toggles als `<button role="switch" aria-checked>`, Chips als `<button aria-pressed>`, FAQ als `<button aria-expanded aria-controls>`.
- CRM-Tabellenzeilen via `tr[onclick]` (Leads, Mitglieder, Kurse) — per Tastatur unerreichbar. → Namensspalte als echtes `<a href>`.
- **Kein sichtbarer Focus-Indikator**; `.field input/select` setzt aktiv `outline:none`. → Globaler `:focus-visible`-Ring.

**CRM-Datenintegrität** `[CRM]`
- **Standort-Filter ist reine Fassade** — filtert keine Tabelle, Überschrift behauptet „Köln", Liste zeigt alle. → `state.standort` real anwenden.
- **Jede Mitgliederzeile öffnet `#/crm/familie/A`** — hart verdrahtet, `family()` ignoriert das Segment. → Auf `m.id` parametrisieren (analog `leadDetail(id)`).

**CRM-Sicherheit destruktiver Aktionen** `[CRM]`
- **„Verwerfen" und „✓ Bezahlt" ohne Confirm/Undo** — irreversibel, `btn-primary` neben harmlosen Aktionen. → Bestätigungsdialog mit konkreter Summe + Undo-Toast; destruktive Aktion visuell abtrennen.

**Mobile/Responsive** `[CRM/App]`
- **CRM-Tabellen brechen auf Mobile** — kein `overflow-x`, Aktions-Spalte abgeschnitten. → Wrapper `overflow-x:auto`; unter 900px Stacked-/Karten-Layout.
- **Kein PWA-Manifest/Service-Worker** — kein Install, kein Offline. → Manifest + Service-Worker.

**Journey-Sackgasse Shop** `[Website/App]`
- **Shop endet im Nichts** — jeder Korb-Button nur ein Toast. → Warenkorb-State + `#/app/warenkorb` + Bestätigungsseite + Korb-Badge.

### P1 — Wichtig

**Marken-Wirkung** `[Global/Website]`
- **Fight-Font fehlt** — Headlines/Buttons/KPIs rendern in normalbreitem Segoe UI.
- **~200 Emojis als funktionale Icons** — plattformabhängig, bunt, kollidiert mit S/W/Rot. → Einfarbiges SVG-Set (Lucide/Phosphor, `currentColor`); Emojis nur in echten User-Inhalten.
- **Gradient-Kacheln mit Riesen-Emoji statt Fotos** — kein einziges `<img>`, null emotionale Bindung. → Echte Fotos (`object-fit:cover` + Overlay); übergangsweise Slash-Pattern statt Riesen-Emoji.
- **Rot-auf-Rot Kontrast < AA**, State-Rottöne (voll/sehr-voll identisch). → `--red-600` als Button-Fläche; State-Töne als getrennte Tokens.

**A11y-Feedback & Semantik** `[Global]`
- **Toast ohne `aria-live`**; **Icon-only-Buttons ohne Namen**.
- **Formularfelder ohne `for`/`id`** (Wizard, Kündigen, SEPA, Suche). → `id`+`for`; `aria-label` für labellose.
- **Fehlende Landmarks / kein `h1`** — kein `<main>`, Screens nutzen `div` statt Überschrift. → Pro Screen `<h1>`, `<main>`, `<nav aria-label>`, Skip-Link.

**CRM-Produktivität** `[CRM]`
- **Tabellen ohne Sortierung/Pagination/Bulk** — nicht skalierbar auf 100 Standorte.
- **Feedback nur über flüchtige Toasts statt Statuswechsel** — „Habe ich schon gesendet?". → Echten Zustand ändern (Inbox → „Beantwortet", Vertragsstatus, Check-in im Live-Feed); Toast nur als Quittung mit Undo.
- **Suche ist eigene Seite statt Command-Palette** — kein Cmd/Ctrl+K. → Overlay-Palette, Instant-Ergebnisse.
- **Filter-/Ansichts-Zustand nicht persistent** — Reset bei Reload. → Query-Params/localStorage.
- **Keine Inline-Bearbeitung** — CRM ist reiner Viewer, Consent nur statische Badges. → Inline-Edit + echte Consent-Toggles.

**Journey-Lücken** `[App/CRM]`
- **Kein Login/Logout/Passwort-Flow** — „Login" springt direkt rein. → `#/login` (Demo-Auto-Login), Logout im Konto.
- **Konto ohne Profil-Edit/Einstellungen** — kein Profil, Passwort, Sprache (DE/TR/EN), Theme, Push.
- **Keine 404-Seite**.
- **Nachrichten ohne Detail/Antwort/Filter** — Unread-Badge nie leerbar. → Thread-Route + Antwortfeld + Filter + „gelesen".
- **Trainer→Eltern-Feedback-Loop nicht geschlossen** — Trainer-Eingabe erscheint nirgends, App zeigt hartkodierten Text. → Gemeinsamer State (`D.kids[].feedbackLog`).
- **Warteliste nicht persistent/auffindbar**.

### P2 — Feinschliff

- **Button-System doppelt/widersprüchlich** + 5 Varianten ohne Hierarchie-Regel.
- **Slash-Motiv inflationär** (vor jedem Kicker) statt groß im Hero/Favicon; **uneinheitliche Skew-Winkel** → ein `--skew`-Token; **Radius-/Spacing-Ausreißer** → 3 Radius-Tokens, 4px-Skala.
- **`prefers-reduced-motion` fehlt**; **`--muted` grenzwertig** auf dunkelsten Flächen; **Disabled „Weiter" nur via opacity**.
- **Keine Breadcrumbs**; **Rollen-Gating nur additiv, kein Route-Guard** (Direktaufruf rendert trotzdem).
- **Wizard behält Zustand beim Verlassen**; **Standortfinder ohne Karte/Suche/Filter**; **keine Quittung/Zahlungshistorie**; **kein Hilfe-/Support-Kanal in App**; **Videos/Momente ohne Detail**, inkonsistente Empty-States.

---

## 4. Nach Fläche

**Website:** 1) Echte Fotos statt Gradient-Emoji-Kacheln `[P1]` · 2) Fight-Font + SVG-Icons `[P0/P1]` · 3) Standortfinder mit Suche/Filter/Karte `[P2]`.
**App (Eltern):** 1) Native, fokussierbare Controls + Focus-Ring + aria-live `[P0]` · 2) Login/Logout + Konto-Einstellungen `[P1]` · 3) Nachrichten-Thread + Trainer-Feedback-Loop + Shop-Warenkorb `[P0/P1]`.
**CRM:** 1) Standort-Filter real + Mitglieder-Drilldown auf echte ID `[P0]` · 2) Confirm/Undo + mobile Tabellen `[P0]` · 3) Sortierung/Pagination/Bulk + Command-Palette `[P1]`.

---

## 5. Was fehlt noch (UX-Vollständigkeit)

- **Auth:** Login/Registrieren/Passwort-vergessen/Logout.
- **Shop-Checkout:** Warenkorb, Mengen-/Größenwahl, Abholung, Bestätigung, Korb-Badge.
- **404 / Fallback** je Oberfläche.
- **Nachrichten:** Thread-Ansicht, echte Antwort, Filter, „als gelesen".
- **Konto:** Profil bearbeiten, Passwort, Einstellungen (Sprache/Theme/Push), Zahlungsmethode.
- **Support:** Hilfe/Kontakt/Chat, Schnellaktionen „Kind krankmelden"/„Chip verloren".
- **Zahlungen:** Quittung/Beleg, Historie, Pausierungs-Flow mit Zeitraum.
- **Warteliste:** „Meine Wartelisten", Abmelden, Persistenz.
- **Standorte:** Suche, Filter, echte Karte.
- **Media-Detail:** Video-Player, Moment-Einzelansicht/Teilen; konsistente Empty-States.
- **CRM-Inline-Edit** + **CRM-Guards** („Kein Zugriff"-Seite, Simulationsbanner).
- **PWA:** Manifest, Service-Worker, Install-Prompt.
- **Wizard-Zustände:** Resume/Reset, „Entwurf gespeichert".

---

## 6. Empfohlene Umsetzungsreihenfolge (3 Wellen)

**Welle 1 — Blocker beheben** (~1–2 Sprints): A11y-Basis (alle klickbaren `div`/`span`/`tr[onclick]` → native Buttons/Links; `:focus-visible`; `aria-live`-Toast; `aria-label`); CRM-Wahrheit (Standort-Filter real, Drilldown auf ID, Confirm/Undo für „Bezahlt"/„Verwerfen"); Ribbon-Offset-Fix + CRM-Tabellen `overflow-x`.

**Welle 2 — Journeys schließen & Marke schärfen** (~2–3 Sprints): Login/Logout + 404 + Shop-Warenkorb; Nachrichten-Thread + Trainer-Feedback-Loop; Fight-Font + SVG-Icons + echte Fotos; CRM-Statuswechsel statt Toast-only; Formular-`for`/`id`; Landmarks/`h1`/`<main>`.

**Welle 3 — Produktivität & Feinschliff** (~2–3 Sprints): CRM Sortierung/Pagination/Bulk, Command-Palette, Inline-Edit + Consent-Toggles, Route-Guards, Breadcrumbs, Filter-Persistenz; Konto-Einstellungen/Support/Zahlungshistorie; Standortfinder mit Karte; Warteliste-Persistenz; Media-Detailscreens; Design-System-Tokens konsolidieren; `prefers-reduced-motion`; Kontrast; PWA-Manifest.
