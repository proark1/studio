# NFT-Gym — Planungskonzept: Super-App + CRM-Plattform

> **Vision:** Das digitalste, proaktivste, einfachste und kundenfreundlichste Kampfsportstudio Deutschlands.
> **Skalierung:** 10 → 50 → 100 Standorte, mandantenfähig (Franchise-Modell).
> **Fokus der App:** Endkunden — v. a. **Eltern von Kindern** sowie jugendliche/erwachsene Trainierende.
> Stand: 2026-07-01 · Repo `studio` · Basiert auf Scan von nft-gym.de + Wettbewerbs-/Software-/Rechtsrecherche (DE + USA).

---

## Inhaltsverzeichnis

1. [Zentraler Befund & strategische Wette](#1-zentraler-befund--strategische-wette)
2. [Wettbewerbsanalyse](#2-wettbewerbsanalyse)
3. [Produktarchitektur: eine Datenbasis, drei Oberflächen](#3-produktarchitektur-eine-datenbasis-drei-oberflächen)
4. [Endkunden-App (Fokus Eltern)](#4-endkunden-app-fokus-eltern)
5. [Business-Seite: CRM & Web-Backend](#5-business-seite-crm--web-backend)
6. [Recht & Compliance (DACH)](#6-recht--compliance-dach)
7. [Datenmodell](#7-datenmodell)
8. [Tech-Stack & Build-vs-Buy](#8-tech-stack--build-vs-buy)
9. [Umsetzungs-Roadmap 10 → 100](#9-umsetzungs-roadmap-10--100)
10. [Differenzierung — warum das gewinnt](#10-differenzierung--warum-das-gewinnt)
11. [Prototyp-/Mockup-Strategie (Phase 0.5)](#11-prototyp-mockup-strategie-phase-05)
12. [Offene Entscheidungen & nächste Schritte](#12-offene-entscheidungen--nächste-schritte)
13. [Quellen](#13-quellen)

---

## 1. Zentraler Befund & strategische Wette

Der deutsche Kampfsportmarkt ist digital **auffällig unreif** — genau das ist die Chance.

- **NFT-Gym heute** (10 Standorte: Bochum, Hilden, Köln, Kaarst, Krefeld, Meerbusch, Mönchengladbach, Mülheim a. d. Ruhr, München, Willich; Sportarten: Kickboxen, Boxen, MMA, Jiu-Jitsu, Ringen, Luta Livre; ab 3 Jahren): Die Website ist eine reine **Marketing-Seite** mit „Probetraining buchen" + Kids-Lehrplan-Download. **Kein** Kursplan, keine Preise, kein Login, keine App, kein Self-Service.
- **Deutscher Wettbewerb** (Gracie Barra, Kampfsportakademie mit 20+ Standorten, Ju-Jutsu/Judo-Vereine) endet ebenfalls beim **Probetraining-Formular**. Vertrag und Zahlung laufen analog vor Ort; Kommunikation über WhatsApp-Gruppen und Aushänge.
- **Fitnessketten** (clever fit, McFIT, FitX) haben die Latte längst gelegt: Online-Vertragsabschluss, App-Check-in, **Live-Studioauslastung (FitX!)**, Self-Service-Mitgliederverwaltung. Eltern erwarten dieses Niveau — im Kampfsport bietet es niemand.
- **Größte Lücke:** Der emotionale Kern des Kinder-Kampfsports — **Gürtelfortschritt, „Was hat mein Kind heute geübt?", Anwesenheit** — wird von keinem deutschen Standard-Tool für Eltern digital abgebildet.
- Selbst reife **US-Plattformen** (Kicksite, Zen Planner, Spark, TheDOJOApp) lassen drei Dinge offen: **echte digitale Kinder-Gamification**, **Live-Foto/Video vom Training** (ClassDojo-Prinzip) und einen echten **Check-out-Alarm**. Zudem sind alle US-Tools kreditkarten-/ACH-zentriert → **im deutschen SEPA-/DSGVO-Umfeld kaum einsetzbar.**

### Die strategische Wette

> Das **US-Erlebnisniveau** (Belt-Tracking, Familien-Account, Check-in-Alerts, Curriculum-Videos, Gamification) **kombiniert mit nativer DACH-Compliance** (SEPA, Vertragsrecht 2022, DSGVO, GoBD) — **franchiseweit einheitlich über alle 10 → 100 Standorte.** Diese Kombination bietet in Deutschland heute niemand.

### Vier Design-Grundsätze (an denen jedes Feature gemessen wird)

- **Einfachst:** Elternteil erledigt jede Kernaufgabe (Probetraining → Vertrag → Zahlung → Fortschritt sehen) in **unter 3 Minuten**, mobile-first, ohne Anruf, ohne Papier, ohne WhatsApp-Gruppe.
- **Proaktiv:** Die App meldet sich zuerst — Check-in-Push, „nächste Prüfung in 4 Wochen", „ruhigere Zeit für dein Kind: Do 16:00", „du warst 2 Wochen nicht da".
- **Kundenfreundlich:** Radikale Transparenz statt Bindungstricks — Kündigungsbutton sichtbar, Auslastung ehrlich, Vertragsstatus jederzeit einsehbar. Vertrauen als Franchise-Skalierungshebel.
- **Markenweit einheitlich:** Über 10 → 100 Standorte identisches Erlebnis. Der Skalenvorteil des Franchise wird digital sichtbar — kein Standort wirkt wie ein Einzelkämpfer.

---

## 2. Wettbewerbsanalyse

### 2.1 Feature-Landkarte auf einen Blick

| Fähigkeit | DE-Kampfsport (Status quo) | US-Kampfsport-Tools | DACH-Fitness (Benchmark) | **NFT-Gym Ziel** |
|---|---|---|---|---|
| Durchgängiger Online-Funnel (Probe→Vertrag→SEPA) | ❌ endet am Formular | ✅ (ACH/Karte) | ✅ | ✅ **SEPA-nativ** |
| Gürtel-/Fortschritt für Eltern sichtbar | ❌ fast nie | ✅ | – | ✅ **MVP-Kern** |
| Check-in-Push an Eltern / Check-**out** | ❌ | ✅ / ⚠️ selten | ⚠️ | ✅ **beides** |
| Auslastung (Historie + Live) | ❌ | ❌ nur „X frei" | ✅ Live (FitX) | ✅ **Heatmap + Empfehlung** |
| Kinder-Gamification (digital) | ❌ | ⚠️ Ansätze | – | ✅ **offenes Feld** |
| Foto/Video-Moment fürs Kind | ❌ | ❌ | – | ✅ **Alleinstellung** |
| „Wer hat gezahlt / wer nicht" + Auto-Mahnung | ⚠️ | ✅ | ✅ | ✅ **SEPA-Recovery** |
| KI-Antwortentwürfe (nur bestätigen) | ❌ | ⚠️ | ⚠️ | ✅ **Human-in-the-Loop** |
| Franchise-Cockpit (Multi-Standort-KPIs) | ❌ | ⚠️ (ClubReady) | ⚠️ (Magicline-Billing) | ✅ **von Tag 1** |

### 2.2 Deutscher Markt (Detail)

- **Einzelschulen/Franchise-Standorte sind analog:** Gracie Barra Sternschanze (Probetraining nur per E-Mail/WhatsApp, Anmeldung/Zahlung nur vor Ort, keine App). Kampfsportakademie (20+ Standorte, stark Kinder/Kickboxen): online nur „Kostenloses Probetraining"-Button.
- **B2B-Softwaremarkt existiert, ist aber verwaltungslastig:** MATOOL (Check-in per Barcode), FightX/Kampfkunst-App.de (Whitelabel-Schul-App: Push, Stundenplan, Videos), Eversports Manager (Online buchen + bezahlen, Endkunden-Marktplatz), Butlerapp (24/7 Probetraining, 20+ Zahlarten inkl. Klarna/PayPal/SEPA), SportsNow, OptiOffice, Sportanize, KampfClub, kampfsport.center/keinaufwand (bis 90 % Anfragen automatisch beantwortet).
- **Verbandslösungen** (Deutscher Judo-Bund: DokuMe + JudoPass-App) sind administrations-/turnierzentriert, kein Eltern-Erlebnis.
- **Guertel-/Fortschritts-Tracking für Eltern ist die große Lücke** — nur Nischen (OSS-App, TAIFUDO-Eigen-App, Wing-Tsun-Prüfungsvideos).

### 2.3 US-Markt (Detail — was übernommen werden sollte)

- **Digitale Gürtel-/Rang-Fortschrittsverfolgung** (Stripe-/Tip-Testing, Prüfungsdaten, Beförderungshistorie): Kicksite, Zen Planner, Spark, MyStudio, TheDOJOApp.
- **Familien-/Eltern-Portal** (mehrere Kinder unter EINEM Account, gemeinsame Zahlung): Zen Planner, Kicksite.
- **Anwesenheits-Check-in** (App/Kiosk/RFID/Barcode) mit **Push/SMS an Eltern** und Alert bei Ankunft: TheDOJOApp, Arbox, Zen Planner.
- **Curriculum-/Technik-Videos nach Gürtelstufe** zum Üben zuhause: Kicksite, OnMat, ClubForge, TheDOJOApp, Gracie Barra Online (sogar Video-Gürtelqualifikation für Combatives-Belt).
- **Franchise-Apps:** ATA (Spark-App + MyATA + EZ-Signup + virtuelle Turnier-Liga), Gracie Barra (GB Online, 900+ Schulen), SKILLZ (altersgestaffeltes Kinder-Curriculum).
- **Umsatz/Retention:** integrierter Pro-Shop, Event-/Turnier-Anmeldung mit Zahlung, Geburtstagsparty-Buchung (TheDOJOApp), automatisierte Review-Anfrage nach Gürtelbeförderung (Reviewflowz), Referral (~66 % Weiterempfehlungsbereitschaft), KI-Churn-Erkennung (1club).
- **Was selbst die USA offenlassen (= unsere Chance):** durchgängige digitale Kinder-Gamification, Live-Foto/Video an Eltern, echter Check-**out**-Alarm, End-to-End statt Tool-Fragmentierung.

### 2.4 SaaS-/CRM-Landschaft (Feature-Benchmark)

- **DACH:** Magicline (Sport Alliance) dominiert Fitness-Verwaltung mit SEPA/DACH-Compliance + White-Label-App; Eversports kombiniert Verwaltung mit Endkunden-Marktplatz; TAC für Großclubs; Fitogram Pro (Dez. 2024 eingestellt).
- **US-Kampfsport-Spezialisten:** Kicksite, Zen Planner, Gymdesk, Spark, Martialytics, MyStudio (belt-/curriculum-nativ, 49–199 USD/Monat, oft bessere Endkunden-UX).
- **Enterprise/Franchise:** ClubReady (Franchise-Referenz: Multi-Location-Reporting, konsolidiertes Billing), PerfectMind/Xplor, Mindbody, Pike13, RhinoFit.
- **Schwächen der Marktführer (= Differenzierungsraum):**
  - Proaktive, KI-gestützte **Churn-Prävention** ist schwach — Zahlungsausfälle werden gemeldet, aber Anwesenheits-Rückgang selten früh erkannt.
  - **Echte Auslastungs-/Kapazitätstransparenz** fehlt (Betreiber wie Endkunden) — meist nur „X Plätze frei".
  - **Endkunden-App-UX** ist ein Schwachpunkt (Mindbody/Zen Planner: überladen, buggy, schlechter Support).
  - **SEPA-natives, DACH-konformes Billing** fehlt den starken US-Tools komplett.
  - **Franchise-/Multi-Mandanten-Tiefe** in DACH-Tools kaum vorhanden.

---

## 3. Produktarchitektur: eine Datenbasis, drei Oberflächen

**Grundprinzip:** EINE gemeinsame, konsistente Datenbasis (Single Source of Truth). Keine Datensilos — Check-in, Vertragsstatus, Gürtelgrad und Zahlung sind überall dieselbe Wahrheit, in Echtzeit.

```
                    ┌─────────────────────────────────────────────┐
                    │            GEMEINSAME DATENBASIS             │
                    │   (Backend-API + zentrale DB, mandantenfähig)│
                    │  Person · Vertrag · Standort · Check-in ·    │
                    │  Zahlung/Mandat · Kurs · Lead · Journey ·    │
                    │  Gürtel/Rang · Trainer · Chip/Token          │
                    └───────────────┬─────────────┬───────────────┘
                                    │  REST/GraphQL + Webhooks
        ┌───────────────────────────┼─────────────┼───────────────────────────┐
        │                           │             │                           │
┌───────▼────────┐        ┌─────────▼────────┐    │           ┌───────────────▼──────────┐
│ ① KUNDEN-APP   │        │ ② WEB-PORTAL     │    │           │ ③ WEB-CRM                │
│ iOS / Android  │        │ Kunden (Browser) │    │           │ Mitarbeiter / Trainer /  │
│ Eltern & Kind  │        │ Self-Service     │    │           │ Standortleitung / GF     │
│ Erlebnis-Ebene │        │ Verwaltungs-Ebene│    │           │ + Franchise-Cockpit      │
└────────────────┘        └──────────────────┘    │           └──────────────────────────┘
                                          ┌───────▼────────┐
                                          │ Kiosk/Check-in │
                                          │ (Tablet + Chip)│
                                          └────────────────┘
```

**Integrationen** (hinter Abstraktions-Layer): Zahlung/SEPA (GoCardless/Mollie), Kommunikation (Push/E-Mail/SMS), Zutritt/Chip (RFID/QR/Kiosk), Analytics/BI (KPIs, Churn-Frühwarnung).

**Die drei Oberflächen im Detail:**

- **① Kunden-App (iOS/Android) — Erlebnis-Ebene (Eltern & Kind):** Familien-Account (mehrere Kinder, ein Login), Gürtel-Fortschritt, Check-in-Push, Auslastung, Curriculum-Videos, Kommunikation, Gamification.
- **② Web-Portal für Kunden — Verwaltungs-Ebene:** Online-Vertragsabschluss, Stammdaten/Bankdaten, Rechnungen, Pausierung, und — rechtlich zwingend browserseitig — der **§ 312k-Kündigungsbutton** (ohne Login erreichbar) + Foto/Video-Einwilligungs-Management.
- **③ Web-CRM — Betriebs- & Steuerungs-Ebene:** Lead-Pipeline, Kurs-/Stundenplan, Kapazität/Warteliste, Mitglieder-/Vertragsverwaltung, SEPA-Abrechnung/Mahnwesen, Grading-Workflows, Human-in-the-Loop-Freigabe-Queue, Reporting/KPIs + Franchise-Cockpit.

**Das Daten-Schwungrad:** Der Chip-Check-in ist das Fundament. Jeder Scan erzeugt einen Datenpunkt (Standort, Slot, Wochentag, Uhrzeit, Personenzahl, Kursgruppe/Alter), der gleichzeitig **vier** Prozesse speist: **Live-Auslastung · Churn-Frühwarnung · Eltern-Push · Fortschritts-Tracking.** Diese Daten fallen ohnehin an — die Plattform macht sie endkundenwertig.

---

## 4. Endkunden-App (Fokus Eltern)

### 4.1 Personas & Jobs-to-be-done

**Persona A — „Sichernde Elternteil" (Kernzielgruppe).** *Nicole, 39, zwei Kinder (7 & 10), berufstätig.* Die zahlende, entscheidende Person — trainiert selbst nicht. JTBD:
- Risikofrei ausprobieren, ob Kampfsport für ihr (evtl. schüchternes) Kind passt → Probetraining in 60 Sek., „Was-mitbringen"-Info, Empfehlung ruhiger Zeiten.
- Wissen, dass das Kind sicher angekommen und gegangen ist → **Check-in- UND Check-out-Push**.
- Sehen, was das Kind lernt und dass es Fortschritte macht → Gürtel-Fortschritt, Trainer-Feedback, Foto/Video.
- Zwei Kinder in einem Konto verwalten → Multi-Kind-Familienkonto, eine Zahlung.
- Vertrag ändern/pausieren/kündigen ohne Konfrontation → Self-Service, sichtbarer Kündigungsbutton.
- Termin finden, der zum Familienplan passt und nicht überfüllt ist → Auslastungs-Heatmap + Empfehlung.

**Persona B — „Selbstständige Trainierende" (Jugendlicher/Erwachsener).** *Deniz, 17 / Marco, 32.* Bucht eigenständig, will Fortschrittsgefühl und Flexibilität. JTBD: spontan sehen, welcher Kurs wann läuft und wie voll; auf die nächste Gürtelprüfung hinarbeiten; Techniken zuhause nachsehen (Videos); Streak/Erfolge sehen; Zahlung/Daten selbst ändern.

### 4.2 Feature-Set

**4.2.1 Onboarding / Probetraining** — „vom Zögern zum ersten Mal auf der Matte"
- Probetraining-Buchung in 60 Sek. (Standort per Geolocation, echte Kalendertermine statt „wir melden uns", Kind-Alter → passende Kursgruppe, Sofortbestätigung).
- Geführte Eltern-Journey: Terminbestätigung → „Was mitbringen" → Vortags-Reminder → Nachfass mit ersten Eindrücken.
- **„Schüchternes-Kind"-Pfad:** optionale Frage beim Onboarding → Empfehlung eines ruhigeren Slots, Trainer wird vorinformiert, „Du darfst beim ersten Mal dabeibleiben".
- Foto/Video-Nachweis des ersten Erfolgs als emotionaler Anker.
- Nahtloser Ein-Tap-Übergang Probe → Online-Vertrag; 30-Tage-Onboarding (stärkster Retention-Hebel: ≥8 Check-ins im 1. Monat → 80 % nach 6 Monaten aktiv).
- Multi-Kind-Onboarding mit vorausgefüllten Familiendaten.

**4.2.2 Kurse & Buchung**
- Persönlicher Stundenplan pro Familienkonto (gefiltert nach Kind/Alter/Gürtelgruppe).
- Buchung mit Echtzeit-Restplätzen; Sperre bei „voll".
- Warteliste mit automatischem Nachrücken + Push bei frei gewordenem Platz.
- Wiederkehrende Buchung („jeden Di & Do 16:00"), einfaches Abbuchen bei Krankheit.
- Kalender-Sync (iCal/Google). Absage in einem Tap gibt Platz für Warteliste frei.

**4.2.3 ⭐ AUSLASTUNG — das Kern-Differenzierungsfeature (dreistufig)**

*Datengrundlage:* Jedes Mitglied checkt per Chip/RFID/QR ein (idealerweise auch aus). Über Wochen entsteht pro Standort ein dichtes Belegungsprofil je **Wochentag × Uhrzeit × Kurs**. Live-Zahl = Check-ins minus Check-outs; historische Kurve = gleitender Ø der letzten ~8 Wochen je Slot, saisonbereinigt (Ferien gekennzeichnet).

- **(A) Historie-Heatmap (Wochentag × Uhrzeit):** Ampel-Matrix (grün=ruhig, gelb=mittel, rot=voll) relativ zur Slot-Kapazität. Tap auf Zelle → „Di 16:00 Kids: typisch 12/20, meist entspannt". Filterbar nach Kind/Kursgruppe. Ehrliche Darstellung als Vertrauenssignal.
- **(B) Live-Anzeige:** „Jetzt im Studio: 14/20 — noch entspannt" in Echtzeit. Prognose-Zusatz: „In 30 Min. startet der Anfängerkurs — dann wird's voller."
- **(C) Proaktive Empfehlung ruhiger Zeiten (speziell fürs Kind):** *„Für [Kind] empfehlen wir Do 16:00 oder Fr 15:30 — kleinere Gruppe (Ø 8 Kinder), mehr Trainer-Aufmerksamkeit, passt zu deinem Abholfenster 15–17 Uhr."* Push bei Musterbruch: „Dein üblicher Di-Kurs ist diese Woche ungewöhnlich voll — Do 16:00 wäre ruhiger."
- *Betreiber-Nebeneffekt:* Dieselben Daten glätten die Auslastung über Slots und entlasten Stoßzeiten (datengetriebene Stundenplan-Optimierung).

**4.2.4 Kind-Tracking für Eltern (der emotionale Kern)**
- **Check-in-/Check-out-Push:** „[Kind] ist um 15:58 angekommen" und — als Alleinstellung — „[Kind] hat das Studio um 17:03 verlassen".
- **Gürtel-/Graduierungs-Fortschritt:** aktueller Gürtel, Stripes/Tips, Prüfungshistorie, „Classes at Rank", „noch ~6 Trainings bis zur nächsten Prüfung".
- **Strukturiertes Trainer-Feedback** + periodische Entwicklungsberichte zu Lebenskompetenzen (Fokus, Ausdauer, Respekt, Selbstvertrauen).
- **Foto/Video-Momente:** Trainer teilt kurzen Clip/Foto in ein privates, DSGVO-konformes Eltern-Feed (Consent vorausgesetzt). „ClassDojo-für-Kampfsport" — bietet keine große Plattform als Standard.
- **Multi-Kind-Dashboard** + Anwesenheits-Historie (PDF-Export).

**4.2.5 Gamification für Kinder** (praktisch offenes Feld, DE wie USA)
- Digitale Sterne/Stripes-Sammlung, sammelbare Badges (Meilensteine), kindgerechte Trainings-Streak (ohne Scham bei Unterbrechung), Gürtel-Weg als „Landkarte", digitale Prüfungs-Urkunde. Altersgerecht & datensparsam (keine öffentlichen Ranglisten für kleine Kinder; Streak-Leaderboards optional für Jugendliche).

**4.2.6 Kommunikation & Push**
- Ein Kanal statt WhatsApp-Chaos; proaktive, ereignisbasierte Journeys; segmentiert & relevant (kein Massenversand); pro Kanal/Zweck einwilligungsfähig mit Abmeldung; **Human-in-the-Loop** bei Antworten; Zwei-Wege-Nachrichten Eltern ↔ Trainer.

**4.2.7 Vertrag & Zahlung (Self-Service)**
- Vollständiger Online-Vertragsabschluss + digitales **SEPA-Mandat** (eIDAS), automatische **Pre-Notification**, Rücklastschrift-Workflow, Self-Service (Stamm-/Bankdaten, Rechnungen, Pausierung, Tarifwechsel), **sichtbarer Kündigungsbutton § 312k**, Widerrufsbelehrung + Musterformular, Laufzeit-Regeln erzwungen, Minderjährigen-Logik, Familien-/Geschwistertarife, 20+ Zahlarten für Zusatzkäufe.

**4.2.8 Community, Events & Pro-Shop**
- Event-/Turnier-Anmeldung mit Zahlung, Geburtstagsparty-Buchung, integrierter Pro-Shop (Gi/Handschuhe/Schutzausrüstung, „Startpaket"), Referral, automatisierte Bewertungsanfrage nach Gürtelbeförderung, Community-Feed pro Standort, Curriculum-Videobibliothek (auch offline).

---

## 5. Business-Seite: CRM & Web-Backend

**Zwei Zielgruppen, eine Datenbasis:** der **GF/Franchisegeber** (Transparenz, KPIs, Governance) und der **Studio-Mitarbeiter** (eine Oberfläche, die Arbeit abnimmt statt aufhalst).

### 5.1 Lead- & Anfrage-Management (der digitale Funnel)

```
[1] ANFRAGE          [2] PROBETRAINING       [3] NACHFASS/ANGEBOT     [4] VERTRAG
    Formular /           Termin gebucht          Post-Trial-Journey        Digital signiert
    WhatsApp /           + Reminder              + befristetes Angebot     + SEPA-Mandat
    Telefon-Erfassung    + "Was mitbringen"      + Vertragslink            + Onboarding-Start
         │                     │                        │                        │
         └── automatische ─────┴── automatische ────────┴── automatische ────────┘
             E-Mail-Entwürfe → Mitarbeiter bestätigt & schickt ab
```

- **Lead-Pipeline als visuelles Kanban-Board:** jede Karte mit Status, Quelle, verantwortlichem Mitarbeiter, Wiedervorlage. „3 Leads seit 5 Tagen ohne Reaktion".
- **Alle Kanäle laufen im CRM zusammen** — kein Lead versickert mehr im privaten WhatsApp eines Trainers.

### 5.2 ⭐ Vordefinierte KI-Antwortentwürfe (Human-in-the-Loop)

**Prinzip: Das System schreibt — der Mensch bestätigt.**
1. **Trigger:** neue Anfrage (z. B. „Ist mein 7-jähriger Sohn zu jung für Kickboxen?").
2. **System generiert Entwurf:** personalisiert (Name, passender Kurs Mini-Kids, nächster freier Slot, Buchungslink).
3. **Freigabe-Queue:** drei Buttons — **Bestätigen & Senden / Bearbeiten / Verwerfen**.
4. **Mitarbeiter prüft in 10–30 Sek.** und sendet.

**Warum HITL:** Sensible Kategorien (Kündigung, Streitfälle, rechtliche Sprache) werden **eskaliert und NIE auto-versendet** — auch als DSGVO-Nachweis gegen unzulässiges automatisiertes Entscheiden. Audit-Log jeder Freigabe, rollenbasierte Rechte, Confidence-Schwellen. Reaktionszeit als KPI.

**Katalog vordefinierter Templates:**

| Anfragetyp | Vorgefertigter Entwurf enthält |
|---|---|
| Allgemeine Probetraining-Anfrage | Begrüßung, Kursempfehlung nach Alter, Buchungslink, „Was mitbringen" |
| Frage zum Alter / Eignung des Kindes | Passendes Programm (Mini/Kids/Teens), Beruhigung, Probetraining-Angebot |
| Preis-/Tarif-Anfrage | Tarifübersicht, Familienrabatt-Hinweis, Einladung zum Gespräch |
| Terminwunsch / Rückruf | Verfügbare Slots, Kalenderlink, Rückrufoption |
| Nach Probetraining ausgeblieben | Freundliches Nachfassen, befristetes Vertragsangebot, Vertragslink |

### 5.3 Mitglieder- & Vertragsverwaltung
- Digitaler Vertragsabschluss + eIDAS-Signatur; rechtssichere Pflicht-Bausteine automatisch (siehe [Kap. 6](#6-recht--compliance-dach)).
- Frei konfigurierbare Tarife (zentral durch Franchise, lokale Auswahl); **Familien-/Geschwistertarife** (mehrere Kinder, ein Eltern-Account, gemeinsame Zahlung, Auto-Rabatt); Add-ons (Ausrüstungspaket).
- Pausierung (Self-Service), Kündigung (rechtskonformer Button, automatisches Vertragsende), Vertragsende-Frühwarnung.

### 5.4 ⭐ Abrechnung & „Wer hat gezahlt / wer nicht"-Dashboard

*SEPA-nativ ab Tag 1* (im Gegensatz zu US-Tools): gültiges Mandat mit allen Pflichtangaben, automatische Pre-Notification, wiederkehrende Beitragsabrechnung, Mandats-Lifecycle (Verfall nach 36 Mon. Nichtnutzung überwacht).

```
┌─────────────────────────────────────────────────────────────┐
│  STANDORT MÜNCHEN-OST · Zahlungslauf Juli 2026               │
├─────────────────────────────────────────────────────────────┤
│  🔴 FEHLGESCHLAGEN (3)   ← Rücklastschriften, sofort oben    │
│     Familie Yilmaz  49,90 €  R-Transaktion: Konto ungedeckt  │
│     M. Schulz       39,90 €  Rücklastschrift · 2. Mahnstufe  │
│  🟡 OFFEN / AUSSTEHEND (7)  ← noch nicht eingezogen/geklärt  │
│  🟢 BEZAHLT (241)                                            │
├─────────────────────────────────────────────────────────────┤
│  Offener Betrag gesamt: 429,60 €   ·   Recovery-Quote: 87 %  │
└─────────────────────────────────────────────────────────────┘
```

- **Rote Fälle stehen immer ganz oben** + Badge-Zähler im Hauptmenü („3 offene Zahlungen"). Ein-Klick-Aktionen (erneuter Einzug, Erinnerung, kontaktieren, Notiz). GF: Franchise-Gesamtsicht mit Recovery-Quote und auffälligen Standorten.

**Automatische Zahlungserinnerung-Journey:**

| Stufe | Timing | Aktion | Kanal | Ton |
|---|---|---|---|---|
| 1 | Bei Rückbuchung | Freundliche Zahlungsaufforderung, Hinweis erneuter Einzug | E-Mail | Freundlich |
| 2 | +5 Tage | Erinnerung + Hinweis Rücklastschriftgebühr, Konto prüfen | E-Mail + SMS | Sachlich |
| 3 | +10 Tage | Erneuter Einzugsversuch + Bankdaten aktualisieren | E-Mail | Bestimmt |
| 4 | +14 Tage | **Eskalation an Mitarbeiter** — persönlicher Kontakt, KEIN Auto-Versand | CRM-Aufgabe | Manuell |

*Recht:* CORE-Lastschrift = 8 Wochen bedingungsloses Erstattungsrecht, 13 Monate ohne gültiges Mandat. Stufe 4 landet immer beim Menschen.

**Buchhaltung:** GoBD (10 Jahre unveränderbar), KassenSichV/TSE bei elektronischer Kasse (Pro-Shop), AV-Verträge mit allen Subprozessoren.

### 5.5 Kurs-/Stundenplan, Kapazität & Trainerplanung
- Kursplan je Standort (Mini-Kids/Kids/Teens/Erwachsene/BJJ/Kickboxen …), Online-Buchung, Echtzeit-Restplätze, Warteliste mit Auto-Nachrücken.
- Kapazitätslimits (Aufsicht bei Kindern), **Auslastungs-Forecasting** (chronisch über-/unterbuchte Slots → datengetriebene Optimierung) auf Basis realer Check-in-Daten.
- Trainer-Zuordnung/Verfügbarkeiten, Vertretungslogik (System schlägt Vertretung vor + informiert Mitglieder via Entwurf → Freigabe), mobile Trainer-Sicht (wer eingecheckt, wer prüfungsreif).

### 5.6 Zutritt & CHIP als Datenquelle
- **RFID/NFC-Chip** (Karte/Armband/Anhänger) oder QR/Barcode in der App. **Bewusst kein Biometrie** (DSGVO). Echtzeit-Prüfung beim Check-in: Mitgliedschaft aktiv? Zahlung offen?
- **Gemessen wird:** Frequenz, Uhrzeit/Muster, No-Show, Streak/Regelmäßigkeit, Zeit seit letztem Check-in.
- **Speist drei Kernprozesse:** (a) Auslastung (reale Anwesenheit, nicht nur Buchung), (b) **Retention** (≥8 Check-ins/1. Monat → 80 % nach 6 Mon.; <4 → 70 % Kündigungsrisiko in 90 Tagen → automatische At-Risk-Markierung), (c) Eltern-Push.

### 5.7 Automatisierungs-Engine (Trigger-/Journey-Katalog)

| Journey | Auslöser | Aktion | Kanal |
|---|---|---|---|
| Lead-Nurturing | Neue Anfrage | Auto-Antwort + Buchungslink → Termin-Reminder → Post-Trial-Nachfass | E-Mail / WhatsApp |
| Onboarding (30 Tage) | Vertrag unterschrieben | Willkommen → Check-in Tag 3 → Kurseinladung Tag 5 → Info/Angebot Tag 7–10 | E-Mail / Push |
| No-Show | Kurs gebucht, kein Check-in | Reminder; bei Muster → „gefährdet" markieren + Eltern-Info | Push / SMS |
| Reaktivierung | 21 Tage ohne Check-in | „Wir vermissen dich" → Tag 30 Rückhol-Angebot | E-Mail / SMS |
| Gürtelprüfung | Berechtigung erreicht (Days/Classes at Rank) | Prüfungseinladung an Eltern | E-Mail / Push |
| Geburtstag | Geburtsdatum Kind | Glückwunsch + Loyalty-Element | E-Mail / Push |
| Bewertung / Empfehlung | Nach Gürtelbeförderung / 3-Monats-Meilenstein | Review-Anfrage (Google) + Referral | E-Mail / SMS / WhatsApp |
| Zahlungserinnerung | Rücklastschrift / R-Transaktion | Gestaffelte Sequenz; Stufe 4 = Eskalation an Mensch | E-Mail / SMS → CRM |
| Vertragsende | X Tage vor Ablauf | Verlängerungs-/Bindungsangebot | E-Mail |

*Grundprinzip:* ereignisbasiert statt Massenversand; ein Workflow, eine Zielgruppe, 60 Tage messen, dann ausrollen. Werbliche Journeys nur mit Double-Opt-In + Abmeldelink.

### 5.8 Reporting/KPIs & Rollen

**KPIs je Standort:** Anfragen, Probetrainings, Trial-Conversion, Reaktionszeit · MRR, offene Beträge, Rücklastschrift-/Recovery-Quote · aktive Mitglieder, Neuzugänge, Kündigungen, **Churn**, At-Risk · Kursauslastung, No-Show-Quote · Check-in-Frequenz-Verteilung (8×/<4×-Frühwarnung).

**Franchise-Cockpit (GF):** konsolidierte KPIs über alle Standorte, Standort-Benchmarking/Ranking, zentrale Governance (Tarife, Vertragsvorlagen, Templates, Journeys), konsolidiertes Billing + Drill-Down.

**Rollen & Rechte:**

| Rolle | Sicht / Rechte |
|---|---|
| GF / Franchisegeber | Alle Standorte, konsolidierte KPIs, Benchmarking, Governance, Reporting |
| Standortleiter | Voller operativer Zugriff auf **eigenen** Standort |
| Trainer | Eigene Kurse, Teilnehmer, Check-in, Fortschritt/Gürtel — **kein** Zugriff auf Zahlungs-/Bankdaten |
| Rezeption | Leads, Freigabe-Queue, Check-in, Stammdaten, Zahlungs-Dashboard, Termine |

*Datensparsamkeit + Audit-Log für jeden Zugriff auf sensible Daten.*

---

## 6. Recht & Compliance (DACH)

*Compliance ist funktionale Anforderung, kein Beiwerk — jede Regel als testbares Produkt-Requirement.*

### 6.1 DSGVO
- **Double-Opt-In** für jede werbliche Kommunikation, revisionssicher mit Zeitstempel; transaktionale Mails davon abgegrenzt.
- **Consent pro Kanal & Zweck** einzeln widerrufbar; Abmeldelink in jeder werblichen Nachricht.
- **AV-Verträge** mit allen Subprozessoren (Payment, Mail, Hosting, Analytics, KI) inkl. TOMs/Drittland-Prüfung. Franchise-Rollen: Franchisenehmer = Verantwortlicher, NFT-Gym = Auftragsverarbeiter → AVV-Kette.
- **Datensparsamkeit** (nur Pflichtfelder erzwingen).
- **Minderjährige — zwei Ebenen:** (1) *Vertragsrecht:* Mitgliedschaft U18 nur wirksam mit Einwilligung **beider** Sorgeberechtigter → Pflicht-Checkbox „berechtigt, auch für den anderen Elternteil zu handeln"; (2) *Datenschutz:* Einwilligung ab 16 selbst, darunter Eltern.
- **Löschkonzept/Speicherfristen** je Datenkategorie (Spannungsfeld zu GoBD-10-Jahres-Pflicht).
- **Foto/Video-Einwilligung** gesondert, getrennt speicher-/widerrufbar.
- **Biometrie vermeiden** (besondere Kategorie) → Chip/QR bevorzugen.

### 6.2 SEPA
- **Digitales Mandat** im Vertrags-Flow (eIDAS), Pflichtangaben: Gläubigername/-anschrift, Gläubiger-ID, Mandatsreferenz, IBAN/BIC, Ort/Datum.
- **Pre-Notification** vor jedem Einzug (Betrag, Fälligkeit, Mandatsreferenz, Gläubiger-ID); bei gleichbleibenden Beträgen einmalige Ankündigung genügt.
- **Mandats-Lebenszyklus:** Verfall nach 36 Monaten Nichtnutzung → System blockiert Einzug, fordert Neu-Mandat.
- **Rücklastschrift-Handling:** gestaffelte Aufforderung + erneuter Einzug + Eskalation; Fristen: CORE 8 Wochen bedingungslos, 13 Monate ohne Mandat.

### 6.3 Vertragsrecht (seit 2022)
- **Erstlaufzeit max. 24 Monate** — im Datenmodell hart erzwungen.
- **Verlängerung (§ 309 Nr. 9 BGB):** nur noch unbefristet, jederzeit mit max. 1 Monat Frist kündbar (keine erneute Jahresbindung).
- **Kündigungsbutton (§ 312k BGB):** gut lesbar, ständig sichtbar/ohne Login erreichbar, Bestätigungsseite, **sofortige elektronische Eingangsbestätigung in Textform** (Datum/Uhrzeit/Enddatum). Fehlen → fristlose Kündigung + Abmahnrisiko → **kritisch**.
- **Widerrufsrecht (Fernabsatz):** 14 Tage, Belehrung + Muster-Widerrufsformular vor Vertragsschluss; fehlend → 12 Monate + 14 Tage.

### 6.4 GoBD / Buchhaltung / Kasse
- Unveränderbare Archivierung (10 Jahre, Originalformat; E-Rechnungen ZUGFeRD/XRechnung nicht konvertieren), Verfahrensdokumentation.
- KassenSichV/TSE bei elektronischer Kasse (Pro-Shop) + Belegausgabepflicht — im MVP vermeidbar.
- DATEV-/Export-Fähigkeit je Standort.

### 6.5 Kommunikations-Governance (KI Human-in-the-Loop)
- (KI-)Antwortentwürfe laufen **nie** im Auto-Versand → Freigabe-Queue (approve/edit/reject); sensible Kategorien immer manuell.
- Audit-Log, rollenbasierte Freigaben, Confidence-Schwellen. Staged Rollout: erst reiner Draft-Modus, dann enge Autonomie nur für unkritische Kategorien.

---

## 7. Datenmodell

Alle Entities tragen implizit `standort_id` (Mandanten-Diskriminator) + Audit-Felder (`created_at`, `updated_at`, `created_by`) für GoBD/Nachweis.

| Entity | Zweck / Schlüsselattribute |
|---|---|
| **Person / Kunde** | Oberbegriff jeder natürlichen Person. `person_id`, Name, Geburtsdatum, Kontakt, `rolle` (Kind/Erziehungsberechtigter/Erwachsenes Mitglied/Trainer), `standort_id` |
| **Kind** | Spezialisierung Person (U18). Aktueller Gürtelgrad, Fortschritt, Verknüpfung zu Erziehungsberechtigten, altersgerechtes Consent |
| **Erziehungsberechtigter** | Hält Familien-Account, Vertrags-/Zahlungspartner, Push-Empfänger. Attribut „berechtigt für beide Elternteile" |
| **Mitgliedschaft / Vertrag** | `vertrag_id`, Vertragspartner, betroffenes Mitglied, Tarif, Erstlaufzeit (max. 24 Mon.), Verlängerungsmodus, Status, Widerrufs-Status, Kündigungsdatum |
| **Standort** | `standort_id`, Franchisenehmer/Verantwortlicher, Gläubiger-ID (SEPA), Adresse, Öffnungszeiten, Kapazitäten, Branding-Config. Mandantenanker |
| **Kurs / Termin** | `kurs_id` + `termin_id`. Kapazität, Warteliste, Trainer, Gürtelstufen-Eignung, Standort |
| **Check-in-Event** | `checkin_id`, Person, Termin/Standort, Zeitstempel, Quelle (App/Kiosk/Chip/QR), optional Check-out |
| **Zahlung / Mandat** | `mandat_id` (Referenz, IBAN/BIC, Gläubiger-ID, Signatur, Status, letzte Nutzung) + `zahlung_id` (Betrag, Fälligkeit, Status, R-Transaktions-Grund) |
| **Lead** | `lead_id`, Kontakt, Quelle, Pipeline-Stage, betroffenes Kind (optional), Standort, Journey-Status |
| **Kommunikation / Journey** | `journey_id`/`message_id`, Kanal, Einwilligungsbezug, HITL-Status (Entwurf/freigegeben/versendet), Audit-Log |
| **Trainer** | Spezialisierung Person (Mitarbeiter). Qualifikationen, Kurszuordnung, Rolle bei Graduierungen |
| **Chip / Token** | `token_id`, physischer Träger (RFID/Barcode/QR), Person, Status (aktiv/gesperrt/verloren), Standort |
| **Gürtel/Rang & Graduierung** (quer) | Curriculum-Definition (Stufen, Anforderungen, „Days/Classes at Rank") + Beförderungshistorie (Prüfungsdatum, prüfender Trainer) |
| **Einwilligung/Consent** (quer) | `consent_id`, Zweck, Kanal, Zeitstempel, Double-Opt-In-Nachweis, Widerrufsdatum, Foto/Video-Flag, Minderjährigen-/Eltern-Einwilligung |

**Wichtige Beziehungen:**
- Erziehungsberechtigter `1—n` Kind (Familien-Account); Kind `n—n` Erziehungsberechtigter (zwei Sorgeberechtigte → Vertragswirksamkeit).
- Erziehungsberechtigter `1—n` Vertrag; Vertrag `1—1` betroffenes Kind; Vertrag `1—1` aktives Mandat; Vertrag/Mandat `1—n` Zahlung.
- Standort `1—n` (fast alles) — der Mandantenanker.
- Kurs `1—n` Termin; Termin `n—n` Person (via Check-in/Buchung); Termin `n—1` Trainer.
- Person `1—n` Check-in-Event; Check-in-Event `n—1` Token.
- Lead `1—1` Person (Konversion); Lead & Person `1—n` Journey.
- Kind `1—n` Graduierung; Kind `n—1` aktueller Gürtelgrad; Trainer `1—n` Graduierung.
- Person `1—n` Consent.

---

## 8. Tech-Stack & Build-vs-Buy

| Schicht | Empfehlung | Warum |
|---|---|---|
| Kunden-App (mobil) | **PWA** (React/Next.js, installierbar) — *Entscheidung 2026-07-01* | Gleiche Codebasis wie Web → ein Team, schnellster Weg zu 100 Standorten, per URL teilbar (kein App-Store). QR-Check-in via Kamera ok. Optionaler **Capacitor-Wrapper** später, falls iOS-Push für Check-in-Alerts native Zuverlässigkeit braucht |
| Web (Portal + CRM) | **React / Next.js (TypeScript)** | SSR für Funnel-Seiten, Skill-/Code-Synergie mit App, reiche CRM-Tabellen |
| Backend | **Node.js (NestJS)** oder **.NET** — modularer Monolith, API-first (REST + Webhooks, optional GraphQL) | Schneller/wartbarer als Microservices im MVP; Module (Billing/Membership/Grading/Communication) später herauslösbar |
| Datenbank | **PostgreSQL** (managed, EU) + **Row-Level-Security** | ACID für Zahlungen/Verträge, RLS erzwingt `standort_id`-Isolation auf DB-Ebene |
| Auth & Rollen | Managed IdP (**Auth0 / Entra ID / Keycloak**) + **RBAC** + Mandantenkontext im Token | Rollen Eltern/Kind/Trainer/Standortleitung/GF/Support; jeder Token trägt `standort_id`(s) + Rolle |
| Zahlung/SEPA | **GoCardless** oder **Mollie** (hinter Abstraktions-Layer); **Stripe Billing** bei komplexem Recurring | SEPA-nativ mit Mandat/Pre-Notification/Rücklastschrift out-of-the-box; Mollie stark im DACH-Zahlartenmix (Klarna/PayPal) |
| Push & Mail/SMS | **FCM/APNs** + EU-Mailprovider (Postmark/Brevo), SMS optional | transaktional vs. werblich getrennt; AVV mit jedem Dienst |
| Analytics/KPI | **PostHog EU / Matomo** + **Metabase** auf Read-Replica | DSGVO-freundlich; Franchise-KPIs ohne Produktivlast |
| Zutritts-Hardware | **Adapter-/Abstraktions-Layer** über RFID/Barcode/QR-Controller + Kiosk-Tablet + Webhooks | entkoppelt von Hardware-Anbietern je Standort; Chip/Token-Entity als Anker |

> **Mobile-Entscheidung (2026-07-01): PWA-first statt React Native.** Vereinheitlicht Web + Mobile auf **eine** Codebasis (React/Next.js), reduziert Team/Kosten und ist per URL sofort teilbar — ideal für Prototyp und V1. Der Chip-Check-in läuft ohnehin über das Studio-Kiosk/RFID-Lesegerät (nicht das Elternhandy), daher ist fehlendes Web-NFC auf iOS unkritisch. Einziger Trade-off: iOS-Web-Push für Check-in-/Check-out-Alerts ist weniger robust als nativ → bei Bedarf später **Capacitor-Wrapper** (gleiche Codebasis) für native Push, ohne den Stack zu wechseln.

### Build vs. Buy (vs. Magicline / Eversports)

**Empfehlung — hybrid:**
1. **Buy für Commodity** (kein Differenzierer): Zahlungsprovider, IdP, Push/E-Mail, GoBD-Archiv/DATEV-Export.
2. **Build für den Kern der Wette:** Familien-/Eltern-Erlebnis, Gürtel-/Fortschritts-Tracking, Franchise-Cockpit, Journey-Automation, DACH-Vertragslogik — das liefern Magicline/Eversports strukturell **nicht**.
3. Optionaler Buy-Zwischenschritt (Billing-Rückgrat) nur, wenn Time-to-Market kritisch ist.

> **Fazit:** Build der Plattform, Buy der Infrastruktur-Bausteine. Ein reiner Buy-Ansatz macht NFT-Gym zum austauschbaren Magicline-Standort ohne Differenzierung.

---

## 9. Umsetzungs-Roadmap 10 → 100

**Phase 0.5 — Klickbarer Prototyp / Mockup (neu, vor dem Build):** Realistischer, klickbarer UI-Prototyp mit Mock-Daten (kein Backend, keine echten Zahlungen) in der Reihenfolge CRM → Kunden-PWA → Website → Flows. De-riskt und alignt Stakeholder (Investoren, Studioleiter, Mitarbeiter, Kunden), bevor Code entsteht. Details in [Kap. 11](#11-prototyp-mockup-strategie-phase-05). *Meilenstein:* die 6 Kern-Flows durchklickbar.

**Phase 0 — Fundament (vor MVP):** Mandantenfähiges Datenmodell + RLS von Tag 1 (nie nachrüsten), Auth/RBAC, API-first-Skelett, CI/CD, EU-Hosting, Rechtsgerüst (24-Mon.-Vertrag, SEPA-Mandat/Pre-Notification, AVV-Templates).
*Meilenstein:* ein Standort vollständig isolierbar; Testvertrag mit gültigem SEPA-Mandat digital abschließbar. *Risiko:* Über-Engineering → modularer Monolith.

**Phase 1 — MVP (1–3 Pilotstandorte):** durchgängiger Funnel end-to-end.
- Web-CRM-Kern (Lead-Pipeline, Mitglieder-/Vertragsverwaltung, SEPA-Abrechnung + Rücklastschrift, Stundenplan).
- Web-Portal (Online-Vertragsabschluss inkl. Widerruf + **§ 312k**, Self-Service-Stammdaten).
- Kunden-App-Kern (Familien-Account, **Check-in + Gürtel-/Fortschrittsanzeige**, Live-Auslastung, Push). Kiosk/Chip-Check-in.
- Compliance-Baseline (DSGVO-Consent, digitales SEPA-Mandat + Pre-Notification, GoBD-Archivierung).
*Meilenstein:* Elternteil bucht Probe → schließt Vertrag digital → Kind checkt per Chip ein → Eltern sehen Fortschritt — **ohne Papier**. *Risiken:* SEPA-Edge-Cases früh mit Provider testen; § 312k juristisch abnehmen (Abmahnung); Personal-Adoption (Schulung + einfacher Kiosk).

**Phase 2 — Erlebnis & Automation (alle ~10 → Richtung 50):** Journey-Automation (Nurturing, Onboarding-30-Tage, No-Show, Reaktivierung, Geburtstag, Grading, Review — HITL); Curriculum-Videos, Trainer-Feedback, Check-out-Alarm, erste Gamification; standardisiertes Standort-Onboarding (Templating, Branding).
*Meilenstein:* neuer Standort in < X Tagen produktiv; messbar bessere Trial-Conversion. *Risiko:* Journey-Wildwuchs → „ein Workflow, eine Zielgruppe, 60 Tage messen".

**Phase 3 — Skalierung 50:** Franchisor-Cockpit (konsolidierte KPIs, Governance, Drill-down); **KI-Churn-Frühwarnung** (Anwesenheitsrückgang 3×→1× → automatische Retention); Auslastungs-Forecasting + Live-Occupancy; Zahlungs-Provider-Abstraktion härten.
*Meilenstein:* 50 Standorte auf einer Plattform, GF steuert über ein Dashboard; gesenkte Churn-Rate. *Risiko:* Performance/Isolation → Read-Replicas, Indexstrategie, Lasttests.

**Phase 4 — Skalierung 100:** Pro-Shop/POS (dann KassenSichV/TSE), Event-/Turnier-/Party-Buchung mit Zahlung, Referral, getriggerte Review-Anfragen; Betriebsreife (SRE/Monitoring, ggf. Module herauslösen); optional Endkunden-Discovery über Standorte.
*Meilenstein:* 100 Standorte stabil, standardisiertes Onboarding, messbarer Zusatzumsatz. *Risiko:* Feature-Fragmentierung → „eine End-to-End-Plattform, keine Tool-Sammlung"; regulatorische Drift → Compliance-Monitoring als Daueraufgabe.

**Querliegende Prinzipien:** Compliance ist Feature, nicht Nachtrag · Mandantenfähigkeit von Tag 1 · Differenzierung zuerst dort, wo der Markt leer ist · messen vor skalieren.

---

## 10. Differenzierung — warum das gewinnt

1. **Durchgängiger digitaler Funnel für Eltern** — end-to-end (Probe → Online-Vertrag → SEPA → Self-Service) statt Formular-Sackgasse.
2. **Gürtelfortschritt des Kindes, sichtbar für Eltern** — die stärkste deutsche Marktlücke, bei uns MVP-Kern.
3. **Check-in UND Check-out-Push** — Sicherheit, die selbst US-Plattformen nur halb bieten.
4. **Ehrliche Auslastungs-Transparenz + proaktive Ruhezeit-Empfehlung fürs Kind** — aus vorhandenen Chip-Daten, im Kampfsport einzigartig.
5. **Radikal kundenfreundlich & markenweit einheitlich** — sichtbarer Kündigungsbutton, ein Kanal statt WhatsApp, proaktive Meldungen — über alle 10 → 100 Standorte identisch; der Franchise-Skalenvorteil wird digital sichtbar.

---

## 11. Prototyp-/Mockup-Strategie (Phase 0.5)

**Entscheidung (2026-07-01):** Vor dem Build zuerst ein **realistischer, klickbarer UI-Prototyp** mit Mock-Daten — kein Backend, keine echten Zahlungen, keine echten Kundendaten. Ziel: so realistisch, dass man ihn Investoren, Studioleitern, Mitarbeitern und Kunden zeigen kann. Reihenfolge:

```
1. CRM / internes Betriebssystem   (operatives Herz zuerst)
2. Kunden-App / Mobile Web App (PWA)
3. Marketing-Website
4. Verbindung der Flows zwischen allen Bereichen
```

Begründung „CRM zuerst": Die Kunden-App funktioniert nur, wenn intern Kurse, Standorte, Trainer, Mitglieder, Zahlungen, Leads und Check-ins definiert sind (deckt sich mit der Research: CRM = Steuerungs-Ebene).

### 11.1 Zwei Produktwelten

- **A — Intern & operativ (CRM):** GF, Standortleiter, Rezeption/Sales, Trainer, Finance, Franchise-Zentrale. Device: **Desktop-first**, Tablet optional, schlanke mobile Trainer-Ansicht separat.
- **B — Extern & kundenorientiert (Website + PWA):** Eltern, Kinder/Jugendliche (über Elternkonto), Erwachsene, Interessenten, Mitglieder. Device: Desktop für Website/Vertrag/Verwaltung, **Mobile-first** für App-Erlebnis (Kursplan, Check-in, Auslastung, Kommunikation).

### 11.2 Drei Pakete & Screens

- **Paket 1 — CRM-Prototyp (zuerst):** Login/Rollenauswahl · Dashboard · Leads (Kanban + Tabelle) · Lead-Detail mit KI-Antwort · Probetraining-Detail · Mitgliederübersicht · Familienprofil · Kindprofil (intern) · Kurse/Stundenplan · Kursdetail · Auslastung · Check-in-Monitor · Kommunikation-Inbox · KI-Antwort-Freigabe · Verträge · Vertragswizard · Zahlungen · Reports.
- **Paket 2 — Kunden-App / PWA:** Login · App-Home · Familienübersicht · Kindprofil · Kursplan · Kursdetail · Umbuchung · Auslastung · Fortschritt/Gürtel · Trainerfeedback · Nachrichten · Zahlungen · Vertrag · Konto/Einwilligungen.
- **Paket 3 — Marketing-Website:** Startseite · Kinder-LP · Erwachsene-LP · Frauen-LP · Standortfinder · Standortdetail · Kursfinder (geführter Assistent) · Probetraining-Wizard · Bestätigung · FAQ · Login-Einstieg.

### 11.3 Screen-Priorisierung

- **P0 (erster Mockup):** CRM Dashboard · Leads + Lead-Detail-mit-KI · Familien-/Kindprofil · Kurse/Stundenplan · Auslastung · Zahlungen · Kommunikation · Vertragswizard || Website Start/Standortfinder/Kursfinder/Probetraining || App Home/Kursplan/Auslastung/Kindprofil/Nachrichten/Zahlung-Vertrag.
- **P1:** Trainer-View · Reports/CEO-Dashboard · Standortleiter-Dashboard · Events/Camps · Prüfungen · Shop · Referral · Reviews.
- **P2:** Franchise-Cockpit (tief) · Automations-Builder · Rollen/Rechte-Management · Curriculum-Videothek · Kinder-Gamification · Foto/Video-Momente · Geburtstagspartys.

*(Deckt sich mit dem Phasen-Schnitt in [Kap. 9](#9-umsetzungs-roadmap-10--100): P0 ≈ MVP, P1 ≈ Phase 2, P2 ≈ Phase 3/4.)*

### 11.4 Sechs klickbare Kern-Flows (müssen durchgängig sein)

1. **Lead → Probetraining:** Website Probetraining buchen → Bestätigung → Lead erscheint im CRM → KI-Vorschlag → Mitarbeiter bestätigt.
2. **Probetraining → Vertrag:** CRM Lead → erschienen → Angebot → Vertrag digital senden → Kunde schließt ab → Mitglied aktiv.
3. **Eltern-App-Alltag:** Home → Auslastung prüfen → ruhigeren Slot wählen → umbuchen → Check-in-Push → Trainerfeedback lesen.
4. **Zahlung offen:** CRM Dashboard → offene Zahlungen → Familie → KI-Zahlungserinnerung prüfen → senden → Kunde sieht offenen Betrag → als erledigt markieren.
5. **Kurs überfüllt:** CRM Auslastung → voller Kurs → Alternativslots → Nachricht an passende Eltern → Eltern buchen ruhigeren Slot.
6. **Trainer setzt Fortschritt:** Trainer-View → Kurs → Teilnehmer markieren → Skill-Fortschritt → Elternnotiz → Eltern sehen Update.

### 11.5 Routen (Prototyp)

```
Marketing:  /  ·  /training/{kinder|erwachsene|frauen}  ·  /standorte  ·  /standorte/{ort}
            /kursfinder  ·  /probetraining  ·  /probetraining/bestaetigung  ·  /vertrag-kuendigen
Kunden-App: /app/{home|kurse|auslastung|kind/{name}|fortschritt|nachrichten|zahlungen|vertrag|konto}
CRM:        /crm/{login|dashboard|leads|leads/{id}|probetrainings|mitglieder|familien/{id}
            |kurse|kurse/{id}|auslastung|checkins|kiosk|kommunikation|vertraege|zahlungen|reports|einstellungen}
Trainer:    /trainer/{home|kurs/{id}|kurs/{id}/abschluss}
```

### 11.6 Demo-Daten

- **Standorte (10):** Krefeld, Köln, München, Meerbusch, Kaarst, Hilden, Bochum, Mülheim, Mönchengladbach, Willich.
- **Personas:** Nicole A. (39, Mutter, Krefeld) · Emir A. (7, Kids Kickboxen, Gelbgurt) · Sara A. (10, BJJ Kids) · Aylin K. (15, Boxen Teens) · Marco S. (32, MMA Beginner) · Laura (Rezeption/Sales, Krefeld) · Yusuf (Standortleiter Köln) · Admin (GF, alle Standorte).

### 11.7 Design-System & Statuslogik

App-Shell · Sidebar · Topbar · Bottom-Nav · Status-Badge · Kurskarte · Lead-Karte · Data-Table · Detail-Drawer · Timeline · Chat-Panel · Stepper · Heatmap · Payment-Card · Child-Profile-Card · Alert-Banner · Empty-State.

```
Grün = gut/ruhig/bezahlt/aktiv     Gelb = Achtung/normal/bald fällig
Rot  = kritisch/voll/offen/Rücklastschrift     Blau = Info/Empfehlung     Grau = inaktiv/abgeschlossen
```

### 11.8 Ergänzungen aus dem Abgleich (zusätzlich im Mockup aufzunehmen)

Der Plan deckt sich zu ~90 % mit Research/Konzept. Diese Punkte ergänze ich, damit nichts Wichtiges verloren geht:
1. **Öffentliche Route `/vertrag-kuendigen` (ohne Login)** — rechtlich Pflicht (§ 312k) und zugleich Vertrauens-Differenzierer; als sichtbarer Website-Screen.
2. **Kiosk-/Self-Check-in-Screen (Tablet, `/crm/kiosk`)** — die Datenquelle für Auslastung, Retention und Eltern-Push; eigener Mock.
3. **Onboarding-30-Tage & Warteliste-Nachrücken** — als Flows sichtbar (stärkster Retention-Hebel bzw. Buchungslogik).
4. **„Schüchternes-Kind"-Schalter im Kursfinder** — verknüpft den Kursfinder direkt mit der Ruhezeit-Empfehlung der Auslastung.
5. **Persona-/Rollen-Switcher für die Demo** — ein Prototyp, in dem man zwischen GF / Standortleiter / Rezeption / Trainer / Eltern umschaltet.
6. **Compliance-Platzhalter-Screens** — SEPA-Mandat, Widerruf, Einwilligungen (inkl. Foto/Video je Kind), Kündigungsbutton: nicht-funktional, aber sichtbar, damit sie im Build nicht vergessen werden.

### 11.9 Was der Prototyp beweisen muss

1. Mitarbeiter können ihren Tag steuern (Dashboard). 2. Eltern verstehen sofort den Mehrwert (App-Home, Auslastung, Check-in, Fortschritt). 3. Probetraining wird radikal einfacher (Kurs finden → buchen → Bestätigung → Reminder → CRM-Follow-up). 4. Auslastung wird operativ nutzbar (nicht nur Anzeige, sondern Empfehlung + Aktion). 5. GF erkennt Skalierbarkeit (Standortvergleich, Quoten, offene Zahlungen, Retention-Risiko).

**Bewusst NICHT im ersten Prototyp:** Datenbanklogik, API-Architektur, echte Zahlungsprovider, echte Rechtsdokumente, komplexe Admin-Einstellungen, viele Edge Cases.

---

## 12. Offene Entscheidungen & nächste Schritte

**Mögliche nächste Artefakte (noch offen, User hat noch nicht priorisiert):**
- [ ] **MVP-Scope + Backlog** — priorisierte User-Stories/Epics mit Akzeptanzkriterien (Phase 1).
- [ ] **Datenmodell / ERD** — ausgearbeitetes Entity-Relationship-Diagramm inkl. Multi-Tenant-Feldern.
- [x] **Klickbarer Prototyp — als nächstes gewählt (2026-07-01).** Umfang & Reihenfolge in [Kap. 11](#11-prototyp-mockup-strategie-phase-05): Paket 1 (CRM) → Paket 2 (Kunden-PWA) → Paket 3 (Website) → Flows.
- [ ] **Konzept als Dokument** — Word/PDF zum Teilen mit GF/Investoren/Entwicklern.

**Zu klärende Grundsatzentscheidungen:**
- ~~Native App vs. PWA~~ → **entschieden (2026-07-01): PWA-first** (React/Next.js, eine Codebasis Web + Mobile); optional Capacitor-Wrapper später für iOS-Push. Siehe [Kap. 8](#8-tech-stack--build-vs-buy).
- Zahlungsprovider final: GoCardless vs. Mollie (vs. Stripe) — abhängig von Zusatz-Zahlarten & Gebühren.
- Build-Umfang MVP vs. Buy-Zwischenschritt fürs Billing (Time-to-Market).
- Chip-Hardware-Anbieter je Standort + Zutritts-/Drehkreuz-Bedarf.
- Budget, Team-Setup, Zeithorizont bis Pilot-Go-Live.

---

## 13. Quellen

**NFT-Gym & DE-Markt:** nft-gym.de · kampfsportakademie.com · gbsternschanze.com · judobund.de (DokuMe/JudoPass) · matool.de · fightx-app.com · kampfkunst-app.de · eversportsmanager.com · butlerapp.de · kampfsport.center · sportsnow.ch · optioffice.net · sportanize.de · kampfclub.app · oss.training · meine-kampfsportschule.de · clever-fit.com · mcfit.com/app · fitx.de

**US-Markt:** kicksite.com · zenplanner.com · sparkmembership.com · mystudio.io · thedojoapp.com · online.graciebarra.com · gracieuniversity.com · atamartialarts.com (MyATA/EZ-Signup) · skillzworldwide.com · reviewflowz.com · 1club.ai · wodify.com · onmat.app · clubforgehq.com

**SaaS/Enterprise-Benchmark:** Magicline (Sport Alliance) · Eversports · TAC · Mindbody · PerfectMind/Xplor · ClubReady · Pike13 · RhinoFit · Gymdesk · Martialytics

**Recht/Zahlung:** DSGVO · SEPA (Mandat, Pre-Notification, R-Transaktionen) · § 309 Nr. 9 BGB · § 312k BGB (Kündigungsbutton) · Fernabsatz-Widerruf · GoBD · KassenSichV/TSE

---

*Dieses Dokument ist ein lebendes Planungskonzept. Änderungen und Priorisierungen werden hier fortlaufend eingepflegt.*

**Änderungshistorie:**
- 2026-07-01: Erstfassung (Kap. 1–10, 12–13).
- 2026-07-01: Prototyp-/Mockup-Strategie ergänzt (Kap. 11); Mobile-Entscheidung **PWA-first** (Kap. 8); Roadmap um **Phase 0.5** erweitert; nächster Schritt = klickbarer Prototyp (Paket 1 CRM zuerst).
- 2026-07-01: **Prototyp-Bau gestartet** — Paket 3 (Marketing-Website) + Paket 2 (Kunden-App/PWA) als selbstständige SPA (`index.html`, `assets/css/app.css`, `assets/js/{data,app}.js`), NFT-Branding (schwarz/rot `#e4002b`/weiß, Slash-Motiv), Hash-Routing, Demo-Daten. Klickbar: Home, Standorte+Detail, Kinder/Erwachsene, Kursfinder (inkl. Schüchternes-Kind-Schalter), Probetraining-Wizard+Bestätigung, FAQ, `/kuendigen` (§312k), App (Home/Kurse/Auslastungs-Heatmap/Kind/Fortschritt/Nachrichten/Zahlungen/Konto+Einwilligungen). Lokaler Start: `.claude/launch.json` (python http.server:4173).
- 2026-07-01: **Paket 1 (CRM) gebaut** — internes Betriebssystem als Desktop-SPA unter `#/crm/…` (`assets/js/crm.js` + CRM-Daten in `data.js`): Login/Rollenauswahl, Dashboard (8 KPIs + Live-Feed + To-dos), Leads (Kanban + Tabelle) & Lead-Detail mit **KI-Antwortentwurf** (Bestätigen/Bearbeiten/Verwerfen), Mitglieder/Familienprofil (inkl. Einwilligungen), Kurse + Kursdetail (Kapazität/Teilnehmer), Auslastung (Heatmap + KPIs + Empfehlung), Check-in-Monitor, Kommunikation (KI-Freigabe + Eskalation sensibler Fälle), Verträge, **Zahlungen** (Rücklastschriften oben, Recovery-Quote, Mahn-Journey), Reports/Franchise-Cockpit (Standortvergleich). Erreichbar via Footer „Team-Login (CRM)". Alle 3 Oberflächen (Website + App + CRM) nun als Prototyp vorhanden; verifiziert (DOM), keine JS-Fehler. (Erweiterungen siehe nächste Zeile.)
- 2026-07-01: **Trainer-View + Live-Flows + Gamification/Momente gebaut.** (a) **Trainer-App** (slim mobile) unter `#/trainer` (Home → Kurs → Anwesenheit tippen ✅/❌/⏳ → Abschluss mit Skill-Chips & Feedback); Zugang via CRM-Rollenauswahl „Trainer". (b) **Live-Flows scharf**: Lead „Bestätigen & Senden" schiebt Lead eine Kanban-Stufe weiter, „Probetraining/Vertrag" setzen die Stufe, „Verwerfen" = Verloren; Zahlung „✓ Bezahlt" flippt Status live und dekrementiert die KPI (Rücklastschriften/offen). (c) **App**: Kinder-Gamification `#/app/erfolge/:name` (Streak, Stripes, Gürtel-Reise, Abzeichen-Sammlung, Urkunde) + Foto/Video-Momente `#/app/momente` (consent-abhängig; Sara gesperrt). Verifiziert per simulierten Klicks, keine JS-Fehler.
- 2026-07-01: **Alle „fehlt noch"-Punkte (Bereich A) gebaut & verifiziert.** Website: Events/Camps/Party (`#/events`), Pro-Shop (`#/shop`), Freund-werben + Bewertungen (`#/empfehlen`), echte Rechtsseiten (`#/impressum` · `#/datenschutz` · `#/agb`). App: Community-Hub (`#/app/community`), Shop (`#/app/shop`), Technik-Videothek nach Gürtel (`#/app/videos`), Onboarding-30-Tage (`#/app/onboarding`), Kursplan mit **funktionierendem Filter + Warteliste-Beitritt**. CRM: **Vertragswizard** (`#/crm/vertraege/neu`, 6 Schritte inkl. digitalem SEPA-Mandat), **Kiosk-Self-Check-in** (`#/crm/kiosk`), **Automations-/Journey-Übersicht** mit An/Aus (`#/crm/automationen`), **Rollen & Rechte** Matrix + **echtes Rollen-Gating der Sidebar** (`#/crm/rollen`; z. B. Rezeption sieht 9 statt 13 Menüpunkte), **funktionierende Suche** (`#/crm/suche`), Kurse-Filter. Assets sind jetzt versioniert (`?v=7`) gegen Browser-Cache; ein Syntaxfehler in `data.js` (gerades `"` in dt. Anführungszeichen) wurde gefixt. **Offen/optional: echte Fotos statt Gradienten, exakter NFT-Rot-Hex, React/Next-Port, Git-Commit.**
- 2026-07-01: **UX-Audit durchgeführt** (7-Perspektiven-Multi-Agent, 46 Findings, am Code belegt) → Report in [`ux-audit.md`](ux-audit.md). Größte Baustellen: (P0) Barrierefreiheit (klickbare `div`/`span`/`tr[onclick]` statt Buttons/Links, kein Focus-Ring), CRM-Datenwahrheit (Standort-Filter filtert nicht, Mitglieder-Drilldown immer „Familie A."), Confirm/Undo bei „Bezahlt"/„Verwerfen", CRM-Tabellen auf Mobile, Shop-Sackgasse; (P1) Fight-Font fehlt, ~200 Emojis statt SVG-Icons, echte Fotos, Login/Logout, 404, Nachrichten-Thread, Trainer→Eltern-Feedback-Loop. Umsetzung in 3 Wellen empfohlen (Welle 1 = Blocker).
- 2026-07-02: **UX-Welle 2 umgesetzt & verifiziert** (Journeys & Marke). **Auth:** `#/login` (Demo-Login, vorausgefüllt) + Abmelden im Konto. **404-Seiten** (Website + App) statt stillem Home-Fallback. **Shop-Warenkorb:** `cart`-State, Warenkorb-Badge im App-Top, `#/app/warenkorb` (Entfernen/Summe/Checkout→Abholung); Website- & App-Shop wired. **Nachrichten-Thread** `#/app/nachrichten/:i` mit echtem Gelesen-Status (Bell-Zähler 2→1), „Alle als gelesen", Antwort-Bubbles. **Trainer→Eltern-Feedback-Loop geschlossen:** Trainer „Kurs abschließen" schreibt in `DATA.kids[].feedbackLog` → erscheint sofort in `appFortschritt`. **Fight-Font** (Oswald + Inter via Google Fonts). **SVG-Icon-System** (`ICON()`/`window.ICON`) in App-Tabbar/-Top + CRM-Sidebar/-Topbar (Content-Emojis bewusst belassen). **Echte Fotos** (Hero + 6 Sport-Karten, `onerror`-Fallback auf Gradient). **Echte Statuswechsel:** CRM-Kommunikation „Bestätigen & Senden" → Status „Beantwortet" + Bell-Zähler (4→3). **A11y-Bonus:** `:focus-visible`-Ring, `aria-live`-Toast (`#live-region`), `aria-label` an Icon-Buttons, `prefers-reduced-motion`, `<main>`/`<nav aria-label>`. Assets `?v=8`; `node --check` grün; DOM-verifiziert; keine Konsolenfehler. **Offen: Welle 1 (restliche A11y: div→button, CRM-Standort-Filter real, Mitglieder-Drilldown-ID, Confirm/Undo, mobile Tabellen) + Welle 3.**
- 2026-07-02: **Feature-Ideation 2.0 durchgeführt** (7-Perspektiven-Multi-Agent: GF/Franchise, Mitarbeiter-Ops, Eltern, Trainer, Umsatz, Retention/Proaktivität, Innovation-Scout; 84 Rohideen → dedupliziert & priorisiert) → Katalog in [`feature-katalog.md`](feature-katalog.md). **Kernbefund: größter ungehobener Wert = Retention-Schicht** (System dokumentiert Risiko, handelt aber nicht), danach Skalierungs-Infrastruktur (Quali-Register, Curriculum, Eröffnungs-Playbook), dann neue Umsatzquellen (Camps ~500–750k €, PT ~0,9–1,8 Mio €, Prüfungspakete bei 50 Standorten). Top-12-Jetzt-bauen definiert (u. a. Retention-Inbox mit Next-Best-Action, Save-Flow im Kündigungsprozess, Eltern-Wochenreport mit 30-Sek-Trainer-Feedback, Prüfungs-Suite, WhatsApp-Business, Ferien-Engine, Meilenstein-Autopilot, Upsell-/Geschwister-Radar, Qualifikations-Register, Pre-Class-Briefing). 8 strategische Wetten (Curriculum, Launch-Cockpit, Fahrgemeinschaften, Monats-Video, Schichtplanung+P&L, Expansion-Analytics, Wallet, SaaS-Endgame) + bewusste Nicht-mach-Liste (keine Kamera-ID von Kindern, kein Kinder-Chatbot, kein Livestream, kein SaaS vor ~30 Standorten). Prototyp-Paket A empfohlen: Retention-Inbox, Save-Flow, Wochenreport, Prüfungs-Modus, Pre-Class-Briefing, Meilenstein-Push, Health-Score-Kachel.
- 2026-07-02: **Prototyp-Paket A gebaut & verifiziert** (Story: „Das System meldet sich, bevor der Kunde fragt"). **CRM:** Retention-Inbox `#/crm/retention` (Churn-Score mit Klartext-Gründen, Next-Best-Action, HITL-Entwurf, Senden/Aufgabe/Später mit echtem Statuswechsel + KPI-Zähler 4→3; Plateau-Fall nur manuell), **Standort-Health-Score-Kacheln** im Franchise-Cockpit (Composite 0–100 + Treiber-Balken + Trend). **Trainer:** Pre-Class-Briefing (60-Sek-Karte: Probekind/Rückkehrer/Prüfungsnah in `#/trainer/kurs/K2`), **Prüfungs-Modus** `#/trainer/pruefung` (Kriterien je Kind abhaken → „Bestanden" erst bei 5/5 aktiv → löst Eltern-App-Karte aus), **Wochenreport-Freigabe** `#/trainer/reports` (KI-3-Satz-Entwürfe aus Tags, einzeln/alle freigeben). **App:** Meilenstein-Karte („50. Training" + Urkunde teilen), Prüfungs-bestanden-Karte mit **Prüfungspaket-Kauf (44,90 € → Warenkorb)**, Wochenreport-Karte auf Home + Report-Block im Fortschritt. **Website:** **Save-Flow vor der Kündigung** (Pause/Tarifwechsel/Standortwechsel/Rückruf als Karten, „Trotzdem kündigen" bleibt einen Klick entfernt = §312k-konform; Erfolgs-Screens je Option). Alle Flows end-to-end DOM-verifiziert, `node --check` grün, keine Konsolenfehler. Assets `?v=9`.
- 2026-07-02: **Prototyp-Paket B gebaut & verifiziert — Top 12 damit KOMPLETT (12/12).** **#5 WhatsApp-Business:** 2 WhatsApp-Fälle in der CRM-Inbox (Chat-Bubbles, „24h-Antwortfenster aktiv"-Badge, unbekannte Nummer → „Lead automatisch angelegt"-Hinweis). **#6 Verpasste-Anrufe-Automatik:** Dashboard-Panel (3 Anrufe, Auto-SMS-Status, „Rückruf erledigt" mit Statuswechsel) + **Sprachnotiz→Lead** (legt live neue Lead-Karte im Kanban an). **#7 Krankmelden + Streak-Schutz:** Krankmelden-Button je Kind auf App-Home → Karte zeigt „Krankgemeldet · ❄️ Streak eingefroren", Erfolge-Screen friert Streak ein. **#8 Saison-/Ferien-Engine:** Ferien-Banner in Retention-Inbox (Scores gedämpft, Journeys pausiert), Saison-Panel in Automationen (NRW/Bayern-Termine), **Ferienmodus-Toggle** im App-Konto → Home-Banner, Camp-Cross-Sell-Karte auf Home. **#10 Upsell-Engine + Geschwister-Radar:** `#/crm/upsell` mit 4 Chancen (Familien-Bundle, Tarif-Upgrade, Geschwister-Radar, Add-on; Erkannt/Rechnung/HITL-Entwurf); „Angebot senden" → **Ein-Tap-Karte in der Kunden-App** → „Annehmen" → CRM zeigt „✓ Angenommen" (geschlossener Loop). **#11 Qualifikations-Register:** `#/crm/team` mit Lizenz/Erste-Hilfe/Führungszeugnis-Ampel je Trainer, Ablauf-Warnung, **Sperr-Logik-Hinweis** (Ali T. für Kinderkurse gesperrt). Neue Daten: `crm.{trainers,ferien,upsell,calls}` + 2 WhatsApp-Inbox-Items. Assets `?v=10`; alle 12 Checks DOM-verifiziert, keine Konsolenfehler.
- 2026-07-02: **UX-Politur „überall perfekt" umgesetzt (Audit-Wellen 1 + 3, alles im Prototyp Fixbare).** **A11y:** alle klickbaren `div`-Chips/-Switches/-Inbox-Zeilen → echte `<button>` (12 Chips, 4 Switches, Inbox), `role="switch"`+`aria-checked`, FAQ als Button mit `aria-expanded`, 43 Screen-Überschriften → `<h1>`, `<main>`-Landmarks (Website + App + CRM), Formular-`for`/`id` (Wizard, Kündigung, Empfehlen), `aria-disabled`, Tabellen-Namen als echte `<a>`-Links (Tastatur). **CRM-Datenwahrheit:** globaler **Standort-Filter filtert jetzt real** (Leads/Mitglieder/Kurse/Check-ins/Zahlungen/Retention/Upsell/Anrufe, 7→2 bei Köln verifiziert); **Mitglieder-Drilldown auf echte `fam`-ID** (Marco S. → eigenes Profil statt immer „Familie A."). **Confirm/Undo:** „✓ Bezahlt" und Lead-„Verwerfen" sind zweistufig (Button wird „Sicher? 49,90 € bestätigen", amber) + **Rückgängig-Button im Toast** (Status + KPI werden wiederhergestellt); Verwerfen jetzt `btn-danger` statt primary. **Rollen-Guard:** Direktaufruf gesperrter Routen → „Kein Zugriff"-Seite (Rezeption/Reports verifiziert). **Mobile:** echtes **Vollbild-Hamburger-Menü** (statt Toast, schließt bei Navigation), CRM-Tabellen horizontal scrollbar (`overflow-x` + min-width). **Layout/Design:** `--ribbon`-Token — Demo-Band überlappt keine Sticky-Header mehr; `.btn`-Doppel-Deklaration bereinigt; `--muted`-Kontrast angehoben; „sehr voll" visuell unterscheidbar. **Extras:** Standortfinder-**Live-Suche** (ohne Fokusverlust), Wizard-Reset nach Bestätigung, Toast mit `aria-live` + Undo. Assets `?v=11`; deterministisch verifiziert (Grep: 0 Rest-`div`-Controls; DOM-Tests: Filter, Confirm/Undo, Guard, Menü, Suche, Reset, Fokus) — keine Konsolenfehler. *Bewusst offen (Welle-3-Rest, gehört in die echte V1):* Tabellen-Sortierung/Pagination/Bulk, Command-Palette, CRM-Inline-Edit, Konto-Einstellungsseiten, Karten-Integration, PWA-Manifest/Service-Worker.
- 2026-07-02: **Nachtrag Feedback/Automatisierung** an [`feature-katalog.md`](feature-katalog.md) angehängt (Abschnitte N1–N5): **Feedback-/Voting-System „NFT Puls"** (1-Tap-Trainings-Puls, Smiley-Kiosk, Ereignis-NPS, Feature-Voting/Community-Roadmap, Detraktor-Alarm, „Ihr habt gesagt → getan"-Feed, Kinderschutz-Leitplanken), **Top 5 Entlastungs-Ideen je Persona** (Trainer: Zero-Prep/Kursausfall-Automatik; Leiter: Morgen-Briefing/Anomalie-Alarme/Auto-Wochenbericht; GF: Wochen-Digest/Entscheidungs-Inbox/Steuerberater-Paket; Kunden: Bescheinigungs-PDFs/FAQ-Bot/Smart-Reminder/Abhol-Koordination/Größen-Radar), **Automatisierungs-Landkarte** (vollautomatisch vs. HITL vs. bewusst manuell) und **Prototyp-Paket C** (8 Bausteine, noch nicht gebaut).
- 2026-07-02: **Prototyp-Paket C gebaut & verifiziert — das Feedback-System „NFT Puls" ist live im Mockup.** **App:** 1-Tap-Trainings-Puls auf Home (4 Smileys → Danke-Karte, zählt in CRM-Statistik), **Mitbestimmen-Screen** `#/app/mitbestimmen` (Feature-Voting mit Live-Balken + „✓ Abgestimmt" + **„Ihr habt gesagt → Wir haben's getan"-Feed**; verlinkt aus Konto & Puls-Danke-Karte), **Dokumente auf Knopfdruck** im Konto (Teilnahme-/Beitrags-/Mitgliedsbescheinigung → „✓ PDF erstellt"). **CRM:** **Feedback-Dashboard** `#/crm/feedback` (Puls-Score 4,4/5, NPS 62, Kiosk-Stimmungs-Heatmap mit Smileys — Di 17–18 fällt sichtbar ab und verlinkt zur Auslastung, **Detraktor-Alarm-Fälle** mit HITL-Antwort bzw. Maßnahme bei anonymem Feedback, Fairness-Regeln sichtbar), **Kiosk-Smiley-Voting** im Kiosk-Screen (4 große Smileys, anonymer Dank-State), **Morgen-Briefing-Panel** im Dashboard (5 wichtigste Punkte, auto-generiert, verlinkt), **Wochen-Digest (KI)** in Reports (Highlights/Risiken/Entscheidungsbedarf, „Als E-Mail senden"). Neue Daten: `feedback.roadmap/done`, `documents`, `crm.feedback` (pulse/nps/kioskHeat/detractors), `crm.briefing_today`, `crm.digest`. Assets `?v=12`; alle 8 Bausteine DOM-verifiziert (Puls zählt, Voting zählt, Detraktor→beantwortet, Kiosk-Dank, Briefing 5 Items, Digest-Inhalte), keine Konsolenfehler.
- 2026-07-02: **Prototyp-Paket D gebaut & verifiziert — „Geld & Skalierung", der Mockup ist damit feature-komplett.** **Website:** **Feriencamp-Buchung** `#/camp` (17/25 Plätze-Balken, Frühbucher 129 € bis 10.07., Programm, Buchungsformular → Bestätigung; Nicht-Mitglieder = Funnel-Hinweis), **Geschenk-Gutscheine** `#/gutscheine` (3 Produkte → Kauf → Gutschein-Code „NFT-GIFT-…" mit PDF/E-Mail-Option; Footer-Links ergänzt). **App:** **Personal-Training-Buchung** `#/app/pt` (3 Coaches, 7 Slots als Chips → Buchen → Bestätigungs-State), **Eltern-FAQ-Bot** `#/app/hilfe` (5 Frage-Chips → Chat-Bubbles, Eskalation „mit Mensch sprechen" → Nachrichten-Thread; Hinweis: spricht nie mit Kindern); Community-Hub um PT/Gutscheine/Hilfe erweitert. **CRM (GF-only via Rollen-Guard):** **Entscheidungs-Inbox** `#/crm/entscheidungen` (3 Freigabe-Fälle: Kulanz 267 €, Family-Tarif-Rollout, 2. Trainer Köln → Freigeben/Ablehnen mit Statuswechsel + Audit-Hinweis), **Launch-Cockpit** `#/crm/launch` (Standort Nr. 11 Duisburg: Playbook 4 Phasen mit Checklisten, Fortschritt %, **Pre-Sale 63/100 Gründungsmitglieder**, 412 Leads, 89 Tage bis Eröffnung). **Dashboard:** **Anomalie-Radar** (3 auto-erkannte Auffälligkeiten mit Severity) + **Monatsziele-Tracker** (Probetrainings 34/50 etc. mit Ampel-Balken). **Global:** **Geführte Demo-Tour** (▶-Button im Demo-Ribbon → 10-Schritte-Overlay navigiert durch Website→App→CRM→Launch-Cockpit, Weiter/Zurück/Beenden; Overlay lebt außerhalb von `#app` und überlebt Re-Renders) + **PWA-Manifest** + App-Icon (Slash-Motiv SVG). Assets `?v=13`; alle Flows DOM-verifiziert, keine Konsolenfehler. Zweimal derselbe Bug (deutsches schließendes `"` in JS-Strings) — via `node --check` gefangen.
- 2026-07-02: **Prozess-Plan (nur Planung, nichts gebaut)** → [`prozess-plan.md`](prozess-plan.md). Gap-Analyse entlang der zwei Zielketten des Gründers: (A) Kundenprozess in 6 Stufen (Erstkontakt→Probetraining→Vertrag→Onboarding→Betreuung→Bleiben) mit Messkette (Speed-to-Lead < 5 Min → Show-Rate > 85 % → Trial-Conversion > 60 % → 8-Check-ins > 60 % → Churn < 3 %) und Lücken wie Website-FAQ-Bot, Speed-to-Lead-System, Google-Business, „Dein erstes Training"-Seite, No-Show-Rebooking, personalisiertes Angebot, zweiter-Elternteil-Einladung, Buddy-System, Ansprechpartner in App, Übergangs-Management, 24-Monats-Moment. (B) Mitarbeiterprozess je Rolle: **⚠️ P0-Fund: gesetzliche Arbeitszeiterfassung fehlte komplett im Plan**; Kunden-360-Schnellansicht (Rezeption), Aufgaben-Board, Vertretungs-Marktplatz, Dienstplan + P&L hochgestuft, **Selbstservice-Quote > 70 % als neue Kostenspar-KPI**. Konsolidierte Prioritäten P0/P1/P2 mit Zuordnung zu V1-Phasen; Prototyp bleibt eingefroren (feature-komplett). *(Update: auf Wunsch doch als Paket E umgesetzt, s. u.)*
- 2026-07-02: **Paket E gebaut & verifiziert — alle 18 Schritte des Prozess-Plans als Frontend-Mock (Wellen E1–E3).** **E1 Funnel:** Website-FAQ-Bot als schwebender Chat (vor Login, 5 Fragen, Probetraining-CTA), Speed-to-Lead sichtbar (Bestätigungs-Hinweis „SMS gesendet · Antwort < 1 Std" + **Lead-Alter-Timer** grün/gelb/rot + Ø-Reaktionszeit-KPI), **Quellen-Badges** (Google Maps/Instagram/WhatsApp/Website), Seite **„Dein erstes Training"** `#/erstes-training` (4-Schritte-Timeline, Trainer-Karte, Checkliste), **No-Show-Rebooking** (Lead L10: Automatik-Panel mit 1-Tap-Slots → Status wechselt), **personalisiertes Angebot** aus Trainer-Tags (Lead L5 zitiert „Takedowns"). **E2 Bindung:** Konto-Setup-Checkliste (4 Punkte inkl. **zweiten Elternteil einladen**), **Buddy-Loop** (Trainer weist per Chip zu → erscheint live im Kind-Profil), „Dein Team"-Ansprechpartner-Karte, **Übergangs-Karte** (Emir → 10–14, Kennenlern-Training bestätigen), **Fürsorge-Karte** nach Krankmeldung, **24-Monats-Treue-Karte** in Zahlungen + Journey-Zeile, Treue-Badge „Mitglied seit 2026". **E3 Betrieb:** **Kunden-360** `#/crm/kunde/:id` (Familie/Zahlungen/Nachrichten/Aufgaben/Quick-Actions auf einem Screen, verlinkt aus Kommunikation), **Aufgaben-Board** `#/crm/aufgaben` (3 Spalten, SLA-Badges, Klick = weiterschieben), **⚖️ Arbeitszeiterfassung** `#/crm/zeiten` (Plan aus Kursplan, Stempeln je Zeile + Einstempeln-Karte in Trainer-View, BAG-Hinweis), **Vertretungs-Marktplatz** (Trainer-Karte „Ich übernehme" → bestätigt), **P&L light** je Standort in Reports (München unter Break-even markiert) + **Selbstservice-Quote 68 %/70 %** mit Aufschlüsselung. Demo-Tour auf **12 Stationen** erweitert (Kunden-360 + Zeiten/Kosten). Assets `?v=14`; 30+ DOM-Checks grün, keine Konsolenfehler.
- 2026-07-02: **Support-Center gebaut & verifiziert** (`#/crm/support`, eigener Sidebar-Punkt „Support-Center" mit Headset-Icon). **WhatsApp Business + Telefon in EINER Inbox**, KI antwortet: KPI-Zeile (24 eingegangen · **17 von KI sofort beantwortet = 71 %** · 4 Freigabe · 3 an Mensch · Ø 28 Sek), Kanal-Filter (Alle/WhatsApp/Telefon), Split-View mit Chat-Bubbles. **6 Demo-Fälle** zeigen die 4 Antwort-Stufen: (a) FAQ → **KI antwortet automatisch** (Öffnungszeiten S1, Preise S5 inkl. Auto-Lead), (b) **KI-Telefonassistent** nimmt Anruf an und bucht live ein Probetraining (S2, 4-Bubble-Transkript), (c) Bestandskunden-Entwurf → **Freigabe** (S3, Bestätigen & Senden → „sent"), (d) **Sensibles (Zahlung) → immer Mensch** (S4 Voicemail-Transkript, „Rückruf erledigt"-Flow, mit Aufgaben-Board verknüpft) + verpasster Anruf → Auto-SMS (S6). Spielregeln-Notice (KI nur FAQ; Zahlung/Kündigung/Kinder immer Mensch; Audit-Log; unbekannte Nummern → Lead). Kunden-360-Link bei Bestandskunden. Demo-Tour auf **13 Stationen**. Assets `?v=15`; alle Flows DOM-verifiziert.
- 2026-07-02: **Top-20-Plan erstellt** → [`top20-plan.md`](top20-plan.md) (4-Perspektiven-Analyse: Repo-Bestand, V1-Weg, Betriebs-Effizienz, Demo-Wirkung; 46 Rohpunkte → 20). Kernaussage: Nadelöhr ist nicht mehr „was bauen", sondern „wie schnell wird es echt" — kritischer Pfad liegt außerhalb des Codes (Zahlungs-KYC 4–8 Wo, WhatsApp-Verifizierung 2–6 Wo, Chip-Lieferzeit 6–12 Wo, Kanzlei, Hiring 2–3 Mon). 4 Blöcke: A) Diese Woche (Live-URL, Team-Workshop, Baseline-Messung, echte Zahlen, Interim-Zeiterfassung, Demo-Paket, Marke+Mobile-Test) · B) Vorlaufzeit-Entscheidungen (Zahlungsprovider, WhatsApp, Chip, Jura-Paket+Signaturniveau, Wetten-Timing) · C) V1-Fundament (Scope-Schnitt mit ROI-Gate, Prototyp→Specs/OpenAPI, Walking Skeleton, Build-Blöcke nach Risiko) · D) Betrieb (Nutzer-Validierung, SOP-Playbook, Rollout-Gates 1→3→10, harte Alt-System-Abschaltung). + Nicht-Liste und konkreter 14-Tage-Plan.
