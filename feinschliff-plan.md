# NFT Gym — Feinschliff-Plan „Perfektes Produkt"

> ## ✅ UMGESETZT (Stand v=17, 02.07.2026)
> Alle Wellen 1–4 implementiert, rein Frontend, in der Preview verifiziert (keine Konsolenfehler).
> **Fundament:** Titel pro Route · Meta/OG/Twitter/Canonical · JSON-LD (Organization + WebSite statisch, 10× SportsActivityLocation + FAQPage injiziert) · **Fonts self-hosted** (Inter/Oswald/Cairo, 20 woff2 → 0 Google-Requests, DSGVO ✓) · robots.txt + sitemap.xml · sr-only-`h1` pro Seite.
> **PWA/Mobile:** echte PNG-Icons 192/512/512-maskable/180-apple (markengeneriert) · manifest mit Shortcuts · Safe-Area an Tabbar/App-Wrap · 16-px-Inputs.
> **Conversion:** Trust-Band · /preise + Home-Preisteaser · Eltern-Sicherheits-Block · Einwand-Block · Home-Testimonials · Wizard-Reassurance & Scarcity · Footer aufgeräumt.
> **App:** Home entstapelt in 6 Abschnitte (Training zuerst) · Tab „Auslastung"→„Fortschritt" · Kind-Umschalter · offene Aufgaben aus echten Daten · Rechts-Links im Konto.
> **CRM:** Sidebar in 7 Sektionen gruppiert · sortierbare Tabellen (Mitglieder, Leads) · Dashboard-Zahlen aus Daten.
> **Design/A11y:** Kontrast-Rot `--red-ink` (Kicker + rote Text-Links) · `--gold`-Token · Spacing-Tokens · Route-Fade-in + Hover-Elevation (respektiert reduced-motion).
> **Sprachen:** Funnel-Neuteile DE/TR/AR übersetzt · RTL erweitert (Tabellen, KPI/Listen, Nav) · Cairo-Arabisch-Font.
>
> **Bewusst offen (P2, low-impact):** Bild-`width/height`-Attribute (CLS) · Sport-Karten-Deeplinks · tiefe Empty-States · Unsplash-Bilder extern (deckt das Bild-Studio ab) · echte History-API-URLs (S8, Architektur-Entscheidung für V1).
>
> ---
>
> **Ausgangs-Status (Planung):**
> Ziel: Landing-Page, Kunden-App und CRM auf ein modernes, konsistentes Premium-Niveau bringen.
> Constraint: **reiner Frontend-Mockup** — jeder Fix unten ist ohne Backend / ohne echte Zahlungen umsetzbar.
> Grundlage: vollständiges Code-Audit (index.html, app.css, app.js, crm.js, admin.js, data.js, manifest.json) am 02.07.2026.
> Severity: **P0** = für „perfekt" zwingend · **P1** = deutliche Verbesserung · **P2** = nice-to-have.
> Aufwand: **S** < 30 min · **M** < 2 h · **L** > 2 h.

---

## 0. Gesamtbewertung

Das Produkt ist inhaltlich **erstaunlich weit** — Funnel, Retention-Story, HITL-KI, Rollen-Gating, i18n-Gerüst, Bild-Studio: alles da und in sich schlüssig. Was zum „perfekt / sehr modern" fehlt, ist **Feinschliff in vier Bereichen**:

1. **Vertrauen & Conversion auf der Landing-Page** — es fehlen Social Proof, Preisanker und ein Eltern-Sicherheits-Block „above the fold".
2. **Technisches Fundament** — SEO (Titel/Meta/JSON-LD), PWA-Icons, Safe-Area, iOS-Input-Zoom, self-hosted Fonts (auch DSGVO).
3. **Informationsdichte** — App-Home und CRM-Sidebar sind überladen; beide brauchen Gruppierung/Priorisierung.
4. **Politur** — WCAG-Kontrast (rotes Label), Token-Disziplin (Gold-Farbe, Abstände), konsistente Typografie.

Nichts davon ist ein Rewrite. Es sind ~30 gezielte Eingriffe.

---

## 1. Landing-Page & Conversion (Website)

| # | Sev | Datei | Problem | Frontend-Fix | Aufw. |
|---|-----|-------|---------|--------------|-------|
| L1 | **P0** | `app.js` `home()` | Kein **Social Proof** über der Falz. Keine Mitgliederzahl, keine Google-Sterne, keine Testimonials auf der Startseite — Testimonials liegen nur versteckt auf `#/empfehlen`. Für Eltern der stärkste Conversion-Hebel. | Trust-Band direkt unter dem Hero: „2.400+ Mitglieder · 10 Standorte · ★ 4,9 Google (312 Bewertungen)" + 3 Testimonial-Karten (aus `D.testimonials`) auf die Home ziehen. | M |
| L2 | **P0** | `app.js` `home()` / neue `preise()` | **Keine Preistransparenz.** Preise stehen nur im Chat-Bot & FAQ („siehst du im Anmeldeprozess"). Versteckte Preise sind für Familien ein Vertrauensbruch und Absprunggrund. | Eigene Preis-Sektion/Seite mit 3 Tarif-Karten (Kids 49 €, Erwachsene 59 €, Family 119 €) + „ab"-Anker im Hero. Alles Demo-Daten. | M |
| L3 | **P0** | `app.js` `home()` | **Kein Eltern-Sicherheits-/Vertrauens-Block.** Trainer-Qualifikation, erweitertes Führungszeugnis, kleine Gruppen, Kinderschutz — genau die Eltern-Einwände werden auf der Startseite nicht adressiert (obwohl im CRM das Quali-Register existiert!). | Sektion „Sicher aufgehoben": Führungszeugnis-Pflicht, Erste-Hilfe, altersgerechte Gruppen, Check-in/out-Push. Icons + kurze Claims. | M |
| L4 | P1 | `app.js` `home()` | Alle 6 Sport-Karten verlinken pauschal auf `#/kursfinder` — kein Sport-Detail, verschenkte interne Verlinkung & SEO. | Karten auf sportbezogene Anker/Sektion (oder Kursfinder mit vorausgewähltem Stil) leiten. | S |
| L5 | P1 | `app.js` `probetraining()` | Wizard ohne **Vertrauens-/Dringlichkeits-Anker** (Camp hat ihn, der Haupt-Funnel nicht). Kein „kostenlos & unverbindlich", keine Restplätze. | Mikro-Reassurance unter jedem Schritt („100 % kostenlos, keine Kündigung nötig") + „nur noch 3 Plätze diese Woche" beim Slot-Schritt. | S |
| L6 | P1 | `app.js` `home()` | Kein **FAQ-/Einwand-Block** auf der Startseite (nur eigene FAQ-Seite). „Zu klein? Zu alt? Verletzungsgefahr?" bleiben unbeantwortet, wo die Entscheidung fällt. | 3–4 Einwand-Kacheln auf die Home; Link zur vollen FAQ. | S |
| L7 | P2 | `app.js` `siteFooter()` | Footer verlinkt **„Team-Login (CRM)" und „Bild-Studio (Admin)"** prominent für Endkunden — wirkt unfertig/verwirrend für Familien. | Interne Links in einen dezenten „Intern"-Bereich oder ganz aus dem Kunden-Footer nehmen. | S |

---

## 2. SEO & Performance

| # | Sev | Datei | Problem | Frontend-Fix | Aufw. |
|---|-----|-------|---------|--------------|-------|
| S1 | **P0** | `index.html:7` | `<title>` ist statisch „NFT Gym — Prototyp" und ändert sich **nie** pro Route. | In `render()` je Route `document.title` setzen (Titel-Map). Sofort machbar. | S |
| S2 | **P0** | `index.html` `<head>` | **Keine `meta description`, kein Open Graph, keine Twitter Card, kein `canonical`.** Jeder geteilte Link sieht nackt aus. | Statische OG-/Description-Tags in `<head>`; optional pro Route via JS aktualisieren. | S |
| S3 | **P0** | `index.html` | **Keine strukturierten Daten (JSON-LD).** Kein `LocalBusiness`/`SportsActivityLocation` je Standort, keine `FAQPage`, kein `Event`. Verschenkte Rich Results. | JSON-LD-`<script>` statisch einbetten: Organization + 10× LocalBusiness (aus `D.locations`), FAQPage (aus `D.faq`). | M |
| S4 | **P0** | `app.css`+`index.html` | **Google Fonts vom Google-CDN** (`fonts.googleapis.com`) — render-blocking **und DSGVO-Problem** (IP-Übermittlung an Google, in DE abgemahnt). | Oswald & Inter **self-hosten** (woff2 lokal, `@font-face`, `font-display:swap`). Löst Perf **und** Datenschutz in einem. | M |
| S5 | P1 | mehrere `app.js` | **Überschriften-Hierarchie:** Viele Seiten starten mit `<h2>` statt einem `<h1>` (z. B. `standorte()`, `kursfinder()`, `faqPage()`). Home/StandortDetail/Landing haben h1. | Pro Seite genau ein `<h1>` als oberste Überschrift; restliche Ebenen darunter. | S |
| S6 | P1 | Root | **Keine `robots.txt`, keine `sitemap.xml`.** | Zwei statische Dateien im Repo-Root anlegen. | S |
| S7 | P1 | `app.js` Bild-Tags | Bilder ohne `width`/`height` → Layout-Shift (CLS). `alt` oft leer (bei dekorativen ok, bei Hero/Sport SEO-relevant). | Feste Dimensionen/`aspect-ratio` + sprechende `alt` bei inhaltlichen Bildern. | S |
| S8 | P2 | `index.html` Architektur | **Hash-Routing** (`#/…`) ist die harte SEO-Grenze: Crawler sehen faktisch eine URL. | Als bewusste V1-Entscheidung dokumentieren; später History-API + statisches Prerendering. **Jetzt nur Hinweis, kein Umbau.** | L |

---

## 3. Kunden-App UX

| # | Sev | Datei | Problem | Frontend-Fix | Aufw. |
|---|-----|-------|---------|--------------|-------|
| A1 | **P0** | `app.js` `appHome()` | **Massive Überladung:** bis zu ~15 gestapelte Karten (Puls, Geburtstag, Care, Transition, Ferien, Milestone, Exam, Offer, Report, Sessions, Camp, Live, Streak, Momente, Onboarding, Aufgaben, Nachrichten). Der wichtigste Job („geht's meinem Kind gut / wann ist Training") ertrinkt. | Priorisieren: 1 „Heute"-Fokusbereich (nächstes Training + 1 Aktion) oben; Rest in gruppierte, ggf. einklappbare Abschnitte („Für dich", „Community"). Max. 1 gelb/rot-Karte gleichzeitig prominent. | L |
| A2 | P1 | `app.js` `appShell()` | **Tabbar-IA:** „Auslastung" als einer von 5 Top-Slots, während Zahlungen, Fortschritt, Community, Shop, Videos, Hilfe, Mitbestimmen alle unter „Konto" vergraben sind. | Tab „Auslastung" → „Mein Kind" (Fortschritt/Profil); Auslastung als Karte auf Home. Konto entlasten. | M |
| A3 | P1 | `app.js` `appKind`/`appHome` | **Kind-Wechsel** bei mehreren Kindern nur über Profil-Links, kein persistenter Umschalter. | Segmented Control „Emir · Sara" oben in kind-bezogenen Screens. | M |
| A4 | P1 | `app.js` `appHome()` | „Offene Aufgaben" sind **hartkodiert** (Sara 49 €, Prüfungsgebühr) statt aus `D.payments` abgeleitet → kann den echten Zahlungsdaten widersprechen. | Aus `D.payments.filter(status==='offen')` generieren. | S |
| A5 | P2 | `app.js` div. | Kaum **Empty-States** außer Warenkorb (Listen sind immer gefüllt). Für „modern" fehlen leere/Lade-Zustände. | Skeleton-/Empty-Patterns definieren (z. B. „noch keine Momente"). | M |

---

## 4. CRM UX (Mitarbeiter)

| # | Sev | Datei | Problem | Frontend-Fix | Aufw. |
|---|-----|-------|---------|--------------|-------|
| C1 | **P0** | `crm.js` `shell()` | **22 flache Sidebar-Einträge** für die GF-Rolle — keine Gruppierung, hoher Suchaufwand. | Nav in Sektionen mit Zwischenüberschriften bündeln: *Vertrieb* (Leads, Upsell), *Mitglieder* (Mitglieder, Retention, Kunden-360), *Betrieb* (Kurse, Auslastung, Check-ins, Kiosk, Zeiten, Team), *Kommunikation* (Support, Kommunikation, Aufgaben, Feedback), *Finanzen* (Verträge, Zahlungen), *Steuerung* (Reports, Entscheidungen, Launch, Automationen, Rollen). | M |
| C2 | P1 | `crm.js` Tabellen | **Kein Sortieren/Filtern** in den großen Tabellen (Leads-Tabelle, Mitglieder, Zahlungen sortiert nur nach Status). Power-User erwarten Spalten-Sort. | Klickbare Spaltenköpfe (client-seitige Sortierung) + einfache Textfilter über der Tabelle. | M |
| C3 | P1 | `crm.js` `leads()` table-view, `members()` | Ganze `<tr onclick=…>` navigiert, ist aber **nicht tastaturbedienbar** (nur der innere `<a>`). Gemischtes Muster. | Auf den Zeilen-Link als primäres Ziel setzen; `tr[onclick]` nur als Maus-Komfort, Fokus/Enter über den Link sicherstellen. | S |
| C4 | P2 | `crm.js` `dashboard()` | Dashboard „Zu erledigen" ist **hartkodiert** („18 Leads", „5 Rücklastschriften") — kann von `D.crm`-Zahlen abweichen. | Aus den echten Datenarrays ableiten (Konsistenz-Prinzip aus dem letzten Pass fortführen). | S |
| C5 | P2 | `crm.js` `suche()` | Globale Suche gut, aber **nur über Suchseite** erreichbar; die Top-Bar-„Suche" ist nur ein Link. | Optional: Cmd/Ctrl-K-Overlay als Schnellsuche. | M |

---

## 5. Design-System & Premium-Feel

| # | Sev | Datei | Problem | Frontend-Fix | Aufw. |
|---|-----|-------|---------|--------------|-------|
| D1 | P1 | überall | **Gold-Akzent `#f5c518` / `rgba(245,197,24,…)` hartkodiert** an ~10 Stellen (Milestone, Geburtstag, Loyalty, Exam-Badges) — kein Token. | `--gold` + `--gold-050` in `:root`, überall ersetzen. | S |
| D2 | P1 | überall | **Hunderte Inline-Styles mit Magic-Numbers** (`margin:10px/14px/6px…`) → keine konsistente Abstands-Skala. | Spacing-Tokens (`--s1…--s6`) + Utility-Klassen; schrittweise die häufigsten Muster ersetzen. | L |
| D3 | P2 | `app.css` | **Wenig Micro-Interaction** — nur `.15s` auf Cards/Buttons, keine Page-Transition, kein Elevation-System über 2 Schatten hinaus. Wirkt etwas statisch. | Dezente Enter-Animation je Route (respektiert `prefers-reduced-motion`), Hover-Elevation-Stufe, sanftes Toast-In. | M |
| D4 | P2 | drei Oberflächen | Website/App/CRM teilen DNA, aber **Buttons/Badges/Radii leicht unterschiedlich** genutzt. | Komponenten-Inventar dokumentieren, Radii/Höhen vereinheitlichen. | M |

---

## 6. Accessibility (WCAG 2.1 AA)

| # | Sev | Datei | Problem | Frontend-Fix | Aufw. |
|---|-----|-------|---------|--------------|-------|
| Y1 | **P0** | `app.css:125` `.kicker` u. rote Text-Links | **Kontrast:** `--red #e4002b` auf `--bg #0c0c0e` ≈ **4,05:1** — unter AA (4,5) für kleinen/fetten Text. Betrifft `.kicker` (13 px bold) und rote Inline-Links („Ruhige Zeiten →" `color:var(--red)`). | Für Text ein helleres Rot (`#ff5470`, ~5:1) verwenden; NFT-Rot nur für Flächen/Buttons (weißer Text darauf = 4,9:1 ✓). | S |
| Y2 | P1 | mehrere `app.js` | **Heading-Sprünge** (h1→h3, oder Start bei h2) erschweren Screenreader-Navigation. (= S5) | Saubere Hierarchie je Seite. | S |
| Y3 | P2 | `app.css` `.field input` | Fokus vorhanden, aber **kleine Touch-/Klickziele** bei einigen Icon-Buttons (30–38 px) unter 44 px. | Mindestgröße 44×44 für interaktive Icons. | S |
| Y4 | P2 | `app.js` Bilder | `alt=""` pauschal — bei inhaltlichen Bildern SR-Info verloren. | Sprechende `alt` bei nicht-dekorativen Bildern. | S |

> Positiv bereits vorhanden: `:focus-visible`, `sr-only`, `role="switch"`/`aria-checked`, `aria-expanded`, Live-Region + Toast, `prefers-reduced-motion`, `aria-current`.

---

## 7. Mobile & PWA

| # | Sev | Datei | Problem | Frontend-Fix | Aufw. |
|---|-----|-------|---------|--------------|-------|
| M1 | **P0** | `manifest.json` + `index.html:14` | **Keine PNG-Icons** (nur SVG „any"). `apple-touch-icon` ist SVG → iOS zeigt es nicht sauber. Kein `maskable`, keine `screenshots`, keine `shortcuts`. | 192/512-PNG + 180×180 apple-touch-icon aus `icon.svg` rendern; `maskable`-Icon; App-`shortcuts` (Kurse, Krankmelden). | M |
| M2 | **P0** | `app.css:227` `.tabbar` | **Keine Safe-Area:** Tabbar ohne `env(safe-area-inset-bottom)` → Labels liegen auf iPhones unter der Home-Indicator-Leiste. | `padding-bottom: calc(14px + env(safe-area-inset-bottom))`; `app-wrap` Bottom-Padding analog. | S |
| M3 | **P0** | `app.css:177/405` Inputs | **iOS-Auto-Zoom:** Input-`font-size` 15 px (Felder) / 14 px (Reply) < 16 px → iOS zoomt beim Fokus rein. | Alle Text-Inputs auf `font-size:16px` (mobil). | S |
| M4 | P2 | `index.html` | Kein `apple-mobile-web-app-*` / Status-Bar-Style, kein Install-Prompt-Hinweis. | Meta-Tags + optionaler „Zum Home-Screen"-Hint. | S |

---

## 8. Sprachen (DE / TR / AR)

| # | Sev | Datei | Problem | Frontend-Fix | Aufw. |
|---|-----|-------|---------|--------------|-------|
| I1 | P1 | `app.js` `T`-Dict | Übersetzt sind nur **Nav/Hero/CTAs/Footer/Tabbar** — der gesamte Seiten-**Body** bleibt Deutsch. `partialNote` ist ehrlich, aber TR/AR fühlen sich ~90 % deutsch an. | Realistischer Scope: die **Kern-Funnel-Seiten** (Home-Sektionen, Probetraining-Wizard, FAQ, Preise) vollständig übersetzen. CRM bewusst DE lassen. | L |
| I2 | P1 | `app.css` `[dir="rtl"]` | **RTL unvollständig:** Nur Note/Notice/Aibox/Bubble/Slash/Logo gespiegelt. Tabellen, Tabbar, Chat-Bubbles mit inline `margin-left:auto`, viele Flex-Layouts kippen nicht. | RTL-Regeln für Tabbar-Reihenfolge, Tabellen-Ausrichtung, `margin-inline`-Logik statt `margin-left`. | M |
| I3 | P2 | `app.css` `--ff-head` | **Arabisch-Font:** Oswald/Inter decken kein Arabisch ab → System-Fallback, Headlines wirken uneinheitlich. | Arabischen Font-Stack (z. B. „Cairo"/„Noto Kufi", self-hosted) für `[lang="ar"]`. | M |

---

## 9. Copy & Microcopy

| # | Sev | Datei | Problem | Frontend-Fix | Aufw. |
|---|-----|-------|---------|--------------|-------|
| K1 | P2 | überall | **Anführungszeichen inkonsistent:** `„…"` (Gänsefüßchen), `»…«` (Guillemets) und gerade `"` gemischt. | Auf ein System vereinheitlichen (Empfehlung: `„…"` im Fließtext). | S |
| K2 | P2 | Begriffe | **Terminologie leicht gemischt:** „Standort/Studio/Gym", „Kurs/Training/Einheit". | Glossar festlegen und durchziehen. | S |
| K3 | P2 | `crm.js` Drafts | Kunden-Ansprache im CRM „Sie", App durchgängig „du" — **korrekt getrennt**, nur dokumentieren, damit es so bleibt. | Als Styleguide-Regel festhalten. | S |

---

## 10. Vertrauen & Recht (Frontend-Pflichten DE)

| # | Sev | Datei | Problem | Frontend-Fix | Aufw. |
|---|-----|-------|---------|--------------|-------|
| R1 | **P0** | `app.css`/`index.html` | **Google-Fonts-CDN = DSGVO-Risiko** (siehe S4). | Fonts self-hosten → erledigt zugleich S4. | M |
| R2 | P1 | App | **Kein Footer/Rechtslinks in der App** — Impressum/Datenschutz nur auf der Website. | Dezente Rechts-Links im App-Konto (Impressum/Datenschutz/AGB/Kündigen). | S |
| R3 | P2 | Website | **Kein Cookie-/Consent-Hinweis.** Ohne Analytics unkritisch — aber sobald externe Ressourcen (Fonts) IPs übertragen, nötig. Nach Font-Self-Hosting entschärft. | Nach S4/R1 neu bewerten; ggf. schlanker Consent-Banner. | S |
| R4 | P2 | `app.js` `probetraining`/`shopPage` | **Widerrufsbelehrung** nur im Vertrags-Wizard (CRM), nicht im öffentlichen Formular/Shop. | Kurzer Widerruf-Hinweis am Absende-Button. | S |

> Positiv: §312k-Kündigungsbutton (Footer + App, ≤ 2 Klicks), granulare DSGVO-Einwilligungen je Kind, Demo-Ribbon, Impressum/Datenschutz/AGB-Platzhalter vorhanden.

---

## 11. Priorisierte Umsetzung (Wellen)

**Welle 1 — Fundament & schnelle P0-Wins** (höchster Effekt, meist S/M)
`S1` Titel · `S2` Meta/OG · `S4`/`R1` Fonts self-hosten · `M1` PWA-Icons · `M2` Safe-Area · `M3` 16 px Inputs · `Y1` Kontrast-Rot · `L1` Social-Proof-Band · `L2` Preise.
→ Damit ist die Seite teilbar (Meta/OG), rechtssicherer (Fonts), auf iPhones sauber, WCAG-konform beim Kontrast und conversion-stärker.

**Welle 2 — Conversion & Trust**
`L3` Eltern-Sicherheit · `L5` Wizard-Reassurance · `L6` Einwand-Block · `S3` JSON-LD · `A4`/`C4` konsistente Zahlen · `R2` App-Rechtslinks.

**Welle 3 — Struktur & Politur**
`A1` App-Home entstapeln · `A2` Tabbar-IA · `C1` CRM-Nav gruppieren · `C2` Tabellen-Sort · `D1` Gold-Token · `D3` Micro-Interactions · `I2` RTL vervollständigen.

**Welle 4 — Tiefe (optional/größer)**
`A3` Kind-Umschalter · `D2` Spacing-Tokens · `I1` Funnel voll übersetzen · `I3` Arabisch-Font · `S8` Routing-Strategie (Entscheidung).

---

### Nächster Schritt
Sag mir, ob ich **mit Welle 1 starten** soll (rein Frontend, wie besprochen) — oder ob du zuerst einzelne Punkte umpriorisieren willst. Ich setze dann pro Welle um, mit `node --check` + Preview-Verifikation und Asset-Versionsbump.
