# Top 20: Besser & effizienter — der Abarbeitungsplan

*Stand 02.07.2026 · Synthese aus 4 Analyse-Blickwinkeln (Repo-Bestand, V1-Weg, Betriebs-Effizienz, Demo-Wirkung; 46 Rohpunkte dedupliziert). Nur Planung.*

## Leitgedanke

Der Prototyp ist feature-komplett — das Nadelöhr ist nicht mehr „was bauen", sondern „wie schnell wird es echt". Der kritische Pfad liegt fast komplett außerhalb des Codes: Zahlungs-Onboarding, WhatsApp-Verifizierung, Chip-Lieferzeiten, Kanzlei und Hiring haben Wochen bis Monate Vorlauf und müssen JETZT parallel angestoßen werden. Zweitens rechnet bisher alles mit Annahmen (4,1 % Churn, 149k MRR) — vor dem ersten Entwicklungs-Euro braucht es echte Zahlen und eine Baseline. Drittens ist der feature-komplette Prototyp selbst die größte Scope-Falle: Die V1 muss bewusst kleiner sein als der Mockup.

## Block A — Diese Woche (sofort, Tage)

1. **Live-URL: GitHub Pages + Rollen-Startlinks + noindex.** Pages aktivieren (~15 Min), Links „Als GF/Studioleiter/Trainer/Eltern starten" (Rolle per URL-Parameter), noindex + Fiktiv-Disclaimer. „Ich schicke Ihnen den Link" schlägt jede Screenshare.
2. **Budget-/Team-/Zieldatum-Workshop + Senior-Hiring starten.** 4–5 Senior-Leute (2× Full-Stack TS, 1× Payments/SEPA = Engpass-Skill, 1× Design-Engineer TZ). Hiring dauert 2–3 Monate — länger als jede Tech-Entscheidung; alle anderen Punkte hängen an diesem Workshop.
3. **Baseline-Messung starten (4 Wochen parallel).** Reaktionszeit, Show-Rate, Trial-Conversion, Churn, Zeit/Lead + Zeitfresser-Protokoll je Rolle an 2–3 Standorten. Ohne Vorher-Wert kein ROI-Beweis; 30–40 % der Rezeptionszeit stecken erfahrungsgemäß in 3–4 Vorgängen — oft nicht die aus dem Katalog.
4. **Echte anonymisierte Zahlen + Konsistenz-Pass.** Echten Churn/MRR in data.js und Business-Cases einrechnen (Churn 2,5 statt 4,1 % → Retention-Case halbiert, V1-Reihenfolge kippt). Mock-Widersprüche fixen („27 offene Zahlungen" vs. 7 Mitglieder) — Stakeholder rechnen live nach.
5. **Arbeitszeiterfassung INTERIM sofort.** BAG-Pflicht gilt heute an allen 10 Standorten: fertiges Stempel-Tool/Tablet-Prozess jetzt, V1-Modul übernimmt. Nebeneffekt: Personalkosten-Ist für P&L/Dienstplan entsteht nebenbei.
6. **Demo-Paket: 5-Min-Drehbuch (3 Varianten: Investor/Studioleiter/Eltern) + 3-Min-Video + 1-Pager/10-Slide-Deck** mit Screenshots + QR zur Live-URL. 50 Screens ohne Skript = Feature-Friedhof; Video erreicht die 30–50 %, die nie selbst klicken.
7. **Marke echt + Mobile-Gerätetest.** Exakter NFT-Rot-Hex, Logo, 5–10 echte Studio-Fotos lokal (Einwilligungen!). Auf echtem iPhone/Android testen — bekannter Fund: apple-touch-icon ist SVG, iOS braucht 180×180-PNG. Der „Geben Sie mir Ihr Handy"-Moment muss fehlerfrei sein.

## Block B — Entscheidungen mit Vorlaufzeit (jetzt anstoßen)

8. **Zahlungsprovider entscheiden + Onboarding starten** (GoCardless vs. Mollie; Kriterien: Mandats-Lifecycle, R-Transaktionen, Gebühren bei 50 Standorten) → sofort Merchant-KYC + Gläubiger-ID-Prozess. 4–8 Wochen Wartezeit auf dem kritischen Pfad — jede Woche Verzug verschiebt den Pilot 1:1.
9. **WhatsApp Business API: Meta-Verifizierung + BSP-Wahl (EU-Hosting/AVV) + erste Template-Freigaben** (Bestätigung, Reminder, No-Show-Rettung). 2–6 Wochen, nicht beschleunigbar; ohne API kein Speed-to-Lead < 5 Min.
10. **Chip-/RFID-Hardware: Shortlist + Testkits + Realtest am Pilotstandort** (Kinderhände, Stoßzeit, WLAN-Ausfall); Adapter-Layer als Webhook-Spec, damit Hardware den Build nicht blockiert. 6–12 Wochen Lieferzeit; das Daten-Schwungrad hängt daran.
11. **Juristisches Abnahme-Paket beauftragen:** §312k-Strecke, Widerruf, 24-Monats-Klauseln, SEPA-/Pre-Notification-Texte, AVV-Kette, Doppel-Sorgerecht, Arbeitszeit-Konzept + Signaturniveau-Entscheid (einfache E-Signatur reicht praktisch für SEPA-e-Mandate; QES teuer + conversion-feindlich). Ergebnisse als testbare Akzeptanzkriterien.
12. **Strategische Wetten terminieren (Entscheid, kein Build):** (a) Curriculum vorziehen? (Engpass-Killer; verhindert Doppelbau in Wochenreport/Prüfungs-Suite), (b) ZAG-Vorprüfung Wallet (Go/No-Go), (c) Fahrgemeinschaften/Monats-Video/Expansion-Analytics einplanen oder bewusst streichen.

## Block C — V1-Fundament (erste Bauwochen)

13. **V1-Scope hart schneiden: MVP-Backlog + ERD mit ROI-Gate.** Formel: (gesparte Std./Monat × Satz + gerettete Verträge × 600–1.000 €) ÷ Entwicklungswochen, auf echten Zahlen. Rest explizit als Nicht-Ziel aussprechen — der Prototyp suggeriert sonst, alles gehöre in V1.
14. **Prototyp in Specs verwandeln:** Design-Tokens + ~17-Komponenten-Inventar als Storybook-Skeleton (spart ~30–40 % Frontend-Aufwand) & data.js → OpenAPI-Contract + Mock-Server, gegen Kap.-7-Datenmodell abgeglichen → Frontend/Backend bauen parallel.
15. **Walking Skeleton als erster Meilenstein:** eine Testfamilie bucht → echter Vertrag + SEPA-Sandbox-Mandat → Einzug inkl. provozierter Rücklastschrift → echter Chip-Check-in → Eltern-Push. Zieht die drei riskantesten Integrationen an den Anfang.
16. **Build-Block 1 = Risiko zuerst:** Geldfluss (Vertrag/SEPA/Mahnwesen), Chip-Check-in, Lead-Funnel + Speed-to-Lead + WhatsApp-Inbox, Arbeitszeiterfassung produktiv, Quali-Register (kleiner Aufwand, existenzielles Risiko).
17. **Build-Block 2 = Effizienz:** Retention-Inbox + Save-Flow + Ferien-Engine real (~15–25k € MRR-Schutz bei 50 Standorten), CRM-Produktivität (Sortierung/Bulk, Cmd+K, Inline-Edit — sonst „< 2 Min/Lead" unerreichbar), Selbstservice-Quote ab Tag 1 instrumentieren (Vorgangs-Katalog vorher definieren).

## Block D — Betrieb & Rollout

18. **Validierung mit echten Nutzern vor dem Build:** 1 Woche Rezeptions-Shadowing (16–19 Uhr!), 5-Familien-Usability-Test (beobachten, nicht erklären; 5 Nutzer ≈ 85 % der Probleme), Studioleiter-Panel. Korrektur im Mock: Stunden; nach Backend-Bau: Wochen. Nebenprodukt: Testimonials + Pilot-Zusagen.
19. **SOP-Playbook für ~12 Kernprozesse** (1 Seite je Prozess: Auslöser → wer → System/Mensch → Ziel-Zeit; HITL-Landkarte N3 = Gliederung). Heute 10 Varianten, bei 50 Standorten wären es 50. Zugleich Schulungsmaterial, Dev-Spec, Franchise-Standard.
20. **Rollout-Disziplin: Pilot mit schriftlichen Gates → 1 → 3 → 10.** Alt-Systeme hart abschalten (nie > 2 Wochen doppelt; Doppelerfassung frisst 20–30 % der Ersparnis), Schulung je Rolle + Champion pro Standort, NFT-Puls intern spiegeln (Wochen-Puls ans Team + „Ihr habt gesagt → geändert" intern). Adoption ist DER Multiplikator.

## Bewusst NICHT in den Top 20

- Weitere Prototyp-Features (feature-komplett; jede Mock-Woche verzögert V1)
- Wallet & SaaS-Licensing bauen (erst ZAG-Go bzw. ~30 Standorte)
- Volle Mehrsprachigkeit (erst nach Funnel-Validierung; bleibt V1-Backlog)
- Capacitor/Native-Wrapper (erst Pilot-Daten zur iOS-Push-Zuverlässigkeit)
- Passwortschutz-Infrastruktur für die Demo (Mock-Daten unkritisch; noindex + Disclaimer reichen; falls „Standort 11 Duisburg" die echte Expansion verrät: fiktionalisieren)

## Die nächsten 14 Tage

**Woche 1:** Mo Pages + Startlinks (#1) · Di Budget/Team-Workshop + Hiring (#2) · Mi Meta-Verifizierung + Kanzlei-Anfrage (#9, #11) · Do Chip-Testkits + Interim-Zeiterfassung (#10, #5) · Fr echte Zahlen + Konsistenz-Pass (#4) — parallel startet die 4-Wochen-Baseline (#3).
**Woche 2:** Mo/Di Drehbuch + Video + Deck (#6) · Mi Marke + Mobile-Test (#7) · Do Zahlungsprovider-Entscheid + Onboarding (#8) · Fr Rezeptions-Shadowing startet, Eltern-Tests terminiert (#18) · Wetten-/Signatur-Entscheide fixieren (#11, #12).
