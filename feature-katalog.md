# NFT-Gym Feature-Katalog 2.0 — Priorisierung aus 7 Ideation-Perspektiven

*(CPO-Sicht, Stand Juli 2026. Basis: 80+ Rohideen aus 7 Brillen, aggressiv dedupliziert auf 43 Kern-Features. Zielbild: 10→50 Standorte, Kernzielgruppe Eltern/Kinder, DACH/DSGVO.)*

---

## 1. Strategisches Fazit

Der größte ungehobene Wert liegt in der **Retention-Schicht** — nicht in neuen Features für Neukunden. Bei ~2.400 Mitgliedern und 4,1 % Monats-Churn verlieren wir ~100 Verträge pro Monat, und gleich vier Brillen schlagen unabhängig voneinander dieselbe Diagnose vor: Das System dokumentiert Risiko (statisches Ampelfeld), aber es *handelt* nicht — kein Save-Flow, kein Win-back, kein Wochenreport an Eltern, keine Ferienlogik. Jeder gerettete Vertrag ist bei Kinder-Abos mit langer Lebensdauer 600–1.000 € Jahresumsatz, ohne einen Cent Akquisekosten. Zweite Priorität ist die **Skalierungs-Infrastruktur** (Qualifikations-Register, Curriculum, Eröffnungs-Playbook): Sie erzeugt heute wenig Demo-Glanz, entscheidet aber, ob Standort 11–50 in Tagen oder Monaten eröffnet — und ob ein einziger unqualifizierter Trainer im Kinderkurs die Marke zerstört. Neue Umsatzquellen (Camps, Prüfungspakete, Upsell) sind der drittgrößte Hebel und fast alle S/M-Aufwand auf vorhandenen Daten. Reine Mitarbeiter-Automatisierung ist real, aber nachgelagert: Sie spart Stunden, während Retention und Skalierung MRR und Expansionstempo direkt bewegen.

---

## 2. Top 12 — Jetzt bauen (hoher Wert, S/M Aufwand)

| # | Name | Fläche | Was | Warum jetzt | Aufwand |
|---|------|--------|-----|-------------|---------|
| 1 | **Retention-Inbox (Churn-Score 2.0 + Next-Best-Action)** | CRM + Trainer | Regelbasierter Score mit Klartext-Begründung, priorisierte Arbeitsliste mit fertigen HITL-Entwürfen; At-Risk-Warnung auch direkt im Trainer-Roster. *Bündelt 3 Ideen (Retention-, Trainer-Brille); stärkster Frame: Retention-Brille.* | Aus 118 toten „At-Risk"-Zahlen wird eine Arbeitsliste; 10–15 % bessere Intervention = 10–15 gerettete Verträge/Monat. Regeln aus planung.md reichen, kein ML. | M |
| 2 | **Save-Flow im Kündigungsprozess + Kündigungsgründe** | Kunden-App | §312k-konformer, überspringbarer Zwischenschritt: Pause, Tarifwechsel, Standortwechsel, Rückruf; Gründe-Erfassung speist Churn-Dashboard; Consent-Hook für spätere Win-back-Journeys. | Save-Desks retten branchentypisch 15–30 %; selbst 10 % = ~10 Verträge/Monat. Kündigungsbutton existiert bereits — der Zwischenschritt fehlt nur. | M |
| 3 | **Eltern-Wochenreport + 30-Sekunden-Feedback** | Trainer | Tippbare Tags je Kind statt Kurs-Freitext, freitags KI-generierter 3-Satz-Report je Kind, Trainer gibt im Batch frei (HITL). *Bündelt 2 Ideen (Trainer, Scout); stärkster Frame: Scout („Eltern sehen wöchentlich, wofür sie zahlen").* | Feedback-Quote von ~10 % auf >80 % ohne Trainer-Mehrzeit — füttert den emotionalen Kern der App jede Woche. Stärkstes Anti-Kündigungs-Argument. | M |
| 4 | **Prüfungs-Suite (Prüfungs-Modus + Prüfungspaket)** | Trainer + App | Gruppen-Grading per Tablet-Checkliste; Bestehen triggert automatisch Urkunde, Badge, Review-Journey und Paket-Kauf (Prüfung + Gürtel + Foto, 39–49 € statt 25 €). *Bündelt 2 Ideen; stärkster Frame: Trainer-Brille.* | Verbindet den emotionalen Höhepunkt des Jahres mit Umsatz und Reviews; 2h Papier-Nachpflege pro Grading entfällt. Journey und Zahlung existieren schon. | M |
| 5 | **WhatsApp-Business-API-Anbindung** | CRM | Offizielle Nummer je Standort in der Team-Inbox, 24h-Fenster + Templates, Opt-in-Verwaltung, unbekannte Nummern werden automatisch Lead-Karten. | Löst das in planung.md benannte Kernproblem „Lead versickert im privaten Trainer-WhatsApp" technisch. WhatsApp ist DER Elternkanal. | M |
| 6 | **Verpasste-Anrufe-Automatik + Sprach-Lead** | CRM | Verpasster Anruf → Rückruf-Task + SMS mit Buchungslink; nach Anrufen 20-Sek-Sprachnotiz → KI legt Lead-Karte an. *Bündelt 2 Ideen (Ops, Scout); Voice-KI-Annahme kommt später.* | Häufigster Lead-Verlust überhaupt (16–19 Uhr, alle auf der Matte); jeder gerettete Lead ~500–800 € Jahresumsatz. | S |
| 7 | **Krankmelden-Schnellaktion + Streak-Schutz** | Kunden-App | Ein Tap storniert die Woche, Warteliste rückt nach, Trainer sieht es, Streak friert ein (max. 2×/Quartal). | Streak-Bruch nach Krankheit ist ein bekannter Kinder-Abo-Kündigungstrigger; ersetzt die WhatsApp-an-Trainer-Nachricht. Tage-Aufwand auf vorhandenen Daten. | S |
| 8 | **Saison-/Ferien-Engine** | CRM + App | Schulferien je Bundesland korrigieren Churn-Score und Journeys (keine Fehlalarme im August); Ferienmodus für Familien; 4 Wochen vor Ferien automatischer Camp-Cross-Sell und „Willkommen zurück"-Slot. *Bündelt 2 Ideen (Consumer, Retention).* | Sommer ist DIE Kündigungssaison im Kindersport. Ohne Ferien-Korrektur wird jedes Frühwarnsystem (Nr. 1) im August unglaubwürdig — Abhängigkeit! | M |
| 9 | **Meilenstein-Autopilot** | Plattform | 10/50/100 Trainings, Jahres-Jubiläen: Eltern-Push mit Urkunde, Trainer-Prompt „heute vor der Gruppe gratulieren", Review-/Referral-Journey am emotionalen Peak. | Verwandelt ohnehin anfallende Check-in-Daten in Stolz-Momente; billigste Bindungs- und Review-Maschine der Liste. | S |
| 10 | **Upsell-Engine inkl. Geschwister-Radar** | CRM | Nächtlicher Scan: 3×-Trainer auf 1×-Tarif, Geschwister ohne Vertrag, wartende Eltern → NBA-Karten mit Ersparnisrechnung in die HITL-Queue, Ein-Tap-Annahme in der App. *Bündelt 3 Ideen (Growth, Retention, Ops-Familien-Matching).* | 3–5 % ARPU auf ~149k € MRR = 4.500–7.500 € MRR ohne einen neuen Lead; Geschwister-Familien kündigen zudem seltener. | M |
| 11 | **Qualifikations-Register + Führungszeugnis-Tracking** | CRM | Lizenzen, Erste Hilfe und erweitertes Führungszeugnis je Trainer mit Ablauf-Warnung; harte Regel: kein Kinderkurs ohne vollständige Quali; Compliance-Ampel im Cockpit. *Bündelt 2 Ideen (GF, Trainer); Recruiting-Pipeline folgt später.* | Nicht verhandelbar vor der Expansion: ein Vorfall mit ungeprüftem Trainer im Kindersport ist der Marken-GAU. Datenmodell existiert bereits. | S |
| 12 | **Pre-Class-Briefing** | Trainer | 60-Sekunden-Karte vor jeder Stunde: Probetraining-Kinder mit Namen und Kontext, Rückkehrer, Prüfungsnahe. | Trial-Conversion hängt daran, dass der Trainer das neue Kind beim Namen kennt; löst das im Konzept versprochene „Trainer wird vorinformiert" endlich ein. | S |

---

## 3. Strategische Wetten (L-Aufwand, hoher Differenzierungswert)

**1. Digitales Curriculum + Stundenbilder je Gürtel.** Zentral gepflegte Technik-Curricula und fertige Stundenpläne, die dem Trainer passend zur Kurswoche angezeigt werden — inklusive Anbindung an Skill-Tags und Prüfungs-Checklisten. Das ist der Engpass-Killer für 10→50: Ein neuer Trainer liefert ab Tag 1 NFT-Qualität statt nach Monaten. Alle Feedback- und Prüfungsfeatures (Top 3, 4) speisen sich daraus — je früher es kommt, desto weniger wird doppelt gebaut.

**2. Standort-Eröffnungs-Playbook (Launch-Cockpit).** Ein Klick klont Mandant + Konfiguration und startet ein Launch-Projekt mit Phasen-Checklisten (Behörden, Recruiting, Pre-Sale). Der Pre-Sale-Funnel über die bestehende Lead-Pipeline lässt Standorte mit 50–100 Mitgliedern statt null eröffnen — pro Eröffnung 15–25k € Effekt, bei 40 Eröffnungen sechsstellig. Muss stehen, bevor die Eröffnungswelle ab Standort ~15 rollt.

**3. Fahrgemeinschafts-Matching pro Kurs.** Opt-in-Matching von Eltern im selben Slot und PLZ-Umkreis, Rotations-Helfer, Vertrauensschluss über den vorhandenen Check-in-Push. Löst den härtesten realen Blocker für 2–3× Training/Woche — und Frequenz ist laut eigenem Konzept der Retention-Hebel Nr. 1. Macht weltweit kein Wettbewerber; Haftungs-Disclaimer und Community-Moderation machen es zur Wette, nicht die Technik.

**4. Automatischer Monats-Rückblick als Video.** Template-basiert gerenderter 45-Sekunden-Clip je Kind aus dem Momente-Feed plus Stats, teilbar nur im Familienkreis. ClassDojo-Mechanik, die keine Gym-Software in DACH hat: emotionaler Anker, eingebauter Referral-Moment bei Großeltern und anderen Eltern, und Motivation für Trainer, überhaupt Momente zu posten.

**5. Standort-Wirtschaftlichkeit: Schichtplanung + P&L light.** Dienstplan direkt aus dem Kursplan mit standortübergreifender Vertretungsbörse (der NRW-Cluster ist ein unkopierbarer Franchise-Vorteil), Personalkosten automatisch in eine Deckungsbeitrags-Rechnung je Standort mit Break-even-Tracker. Erst damit weiß die GF, welcher Standort wirklich verdient — Pflicht für Bankgespräche und Franchise-Verkauf.

**6. Expansion-Analytics.** Herkunfts-PLZ-Karte, Isochronen, Demografie-Overlay, Kannibalisierungs-Check — mündet direkt ins Eröffnungs-Playbook. Eine vermiedene Fehleröffnung (100–300k €) refinanziert das Modul mehrfach; ab Standort ~20 relevant.

**7. Studio-Wallet (Chip als Zahlungsmedium).** Guthaben per App, Kinder zahlen Getränke/Gebühren per Chip, Eltern setzen Limits. 3–8 €/Mitglied/Monat Nebenumsatz plus Prepaid-Float — aber zwingend als geschlossenes System mit früher ZAG-Prüfung und Automaten-Hardware. Erst nach juristischem Go starten.

**8. SaaS-Licensing „NFT OS" (Endgame).** Die mandantenfähige Plattform white-label an fremde Kampfsportschulen (299–499 €/Monat) — es gibt in DACH kein System mit Eltern-App, Gürtel-Curriculum und SEPA/§312k nativ. Bewusst erst ab ~30 eigenen Standorten als Referenzbasis; vorher nur architektonisch sauber halten (Multi-Tenant nicht verbauen).

---

## 4. Nach Nutzergruppe — die 3 wertvollsten Ergänzungen (jenseits Top 12)

**Geschäftsführung**
1. **Standort-Health-Score** — ein Composite-Score 0–100 mit Treiber-Drilldown ersetzt 6 KPI-Spalten × 50 Zeilen; kippende Standorte fallen 2–3 Monate früher auf.
2. **Umsatz-/Mitglieder-Forecasting je Standort** — Vertragslaufzeiten + Kündigungsfenster + Pipeline = rollierender 12-Monats-Forecast mit Frühwarnung; dank Max-24-Monate-Regel besonders präzise.
3. **Benchmarking-Liga + Retention-Kohorten** *(bündelt 2 Ideen)* — faire Peer-Gruppen, Monats-Liga auf beeinflussbaren Metriken, Überlebenskurven je Kohorte; Sieger-Playbooks werden Franchise-Standard.

**Mitarbeiter (Rezeption/Standortleitung)**
1. **Aufgaben-/Ticketsystem mit SLA** — Fundament, auf dem Retention-Inbox, Dokumente und Übergaben aufsetzen; nichts versickert mehr zwischen Schichten.
2. **Dokumenten-Inbox mit KI-Klassifikation** — Attest → Beitragspause, Kündigungsschreiben → §312k-konforme Bestätigung; macht die rechtlich kritischen Fälle fehlerfest.
3. **Ein-Klick-Tagesabschluss + Schichtübergabe-Notiz** *(bündelt 2 Ideen)* — 20–40 Min./Tag/Standort gespart, GoBD nebenbei erledigt.

**Eltern**
1. **Familienkalender-Abo mit Konflikt-Radar** — iCal-Feed beider Kinder inkl. Alternativvorschlag bei Ausfall; technisch klein, alle Daten existieren.
2. **Duo-Buchung + Buddy-Days** *(bündelt 2 Ideen)* — Freund bucht in denselben Slot, Gast wird automatisch Lead; Conversion und Retention in einem Feature.
3. **Auto-Übersetzung der Kommunikation (TR/AR/RU/UA/PL)** *(stärkster Frame: Scout — erst Nachrichten-Übersetzung als S, volle Lokalisierung später)* — erschließt ganze Stadtteile in NRW; kein DACH-Wettbewerber hat das.

**Trainer**
1. **Vertretungs-Marktplatz zwischen Standorten** — Push an qualifizierte Trainer im 20-km-Cluster; Kursausfall (Kündigungsgrund Nr. 1 bei Eltern) geht Richtung null. Setzt Top-12 #11 voraus.
2. **Plateau-Wächter** — erkennt Stagnation trotz Anwesenheit (die häufigste unentdeckte Kinder-Kündigungsursache) und gibt dem Trainer eine konkrete 5-Minuten-Aufgabe.
3. **Gesprächs-Notizen + automatisches Eltern-Briefing** — Beziehungshistorie übersteht Trainerwechsel; „das hatten wir doch besprochen" verschwindet.

---

## 5. Neue Umsatzquellen (mit grober Umsatzlogik)

| Quelle | Logik | Bei 50 Standorten (grob p.a.) |
|---|---|---|
| **Feriencamps als Buchungsprodukt** (Frühbucher, Warteliste, offen für Nicht-Mitglieder) | 3–4 Camps × 25 Kinder × ~140 € = 10–15k €/Standort/Jahr, plus 5–10 Neuverträge über den Nicht-Mitglieder-Funnel | 500–750k € + Funnel |
| **Prüfungspakete** (in Top 12 #4) | +15–20 € Mehrerlös × ~1,5 Prüfungen/Kind/Jahr über die Kinderbasis | 150–300k € |
| **Personal Training mit Trainer-Kalender** | 5–10 Einheiten/Woche/Standort, 40–50 % Studio-Anteil = 1.500–3.000 € MRR/Standort; bindet zugleich Trainer | 0,9–1,8 Mio € |
| **Startpaket-Attach + Wachstums-Trigger im Shop** | 60–80 % Attach auf 80–120 €-Pakete bei Neuverträgen; „Rausgewachsen?"-Nachkauf hält Bestandsumsatz | 150–250k € |
| **Geburtstags-Upsell mit Gästeliste-zu-Lead** | 199 €+ pro Party, 8–12 Gast-Kinder als warme Leads, ~15 % Konversion = 1–2 Verträge pro Party | Event-Umsatz + dauerhafter Gratis-Leadkanal |
| **Geschenk-Gutscheine (Großeltern-Kanal)** | Vorkasse-Umsatz + jeder eingelöste Gutschein ist ein vorbezahlter warmer Lead | klein, aber CAC-frei |
| **„Starke Kinder" Anti-Mobbing-Programm** | 79–129 €/Kurs, Inhalte einmal zentral produziert; stärkster Eltern-Kaufgrund + Schul-Türöffner | skaliert mit Standorten |
| **B2B: Firmenfitness + Workshops** | Workshops 800–1.500 €/Tag; 2–3 Firmenkunden = 500–1.500 € MRR/Standort; füllt leere Vormittage | 0,3–0,9 Mio €, erst ab V1-Stabilität |
| **Schul-AG-Funnel** *(bündelt Growth + Scout-Portal)* | AG-Honorar deckt Trainerkosten (kostenneutraler Vertrieb); 20 Kinder → 2–4 Kids-Verträge/Halbjahr mit langer Lebensdauer | der wiederholbare Wachstumsmotor je Standort |
| **Wallet & SaaS** | siehe Strategische Wetten 7 + 8 | — |

---

## 6. Bewusst NICHT machen

1. **Kamera-Identifikation von Kindern (Anwesenheit, Zutritt, „Smart Gym").** Biometrische Verarbeitung Minderjähriger = DSGVO Art. 9 + EU AI Act — rechtlich wie reputativ indiskutabel. Identität kommt vom Chip; anonyme ToF-Zählsensorik ist die einzige zulässige Ergänzung, und auch die erst später.
2. **KI-Chatbot, der direkt mit Kindern spricht („Frag den Sensei" im Kindermodus).** Verletzt unser eigenes HITL-Prinzip an der empfindlichsten Stelle: unbeaufsichtigte KI-Kommunikation mit Minderjährigen ist ein Reputationsrisiko, das kein gesparter Rezeptions-Anruf aufwiegt. Allenfalls später als reiner Eltern-FAQ-Bot.
3. **Prüfungs-Livestream für Großeltern.** Die Streaming-Technik ist trivial — der Consent-/Orga-Aufwand pro Standort ist es nicht: Ein Kind ohne Einwilligung sprengt das Kamera-Setup jeder Prüfung. Der emotionale Wert ist über kaufbare Momente-Mitschnitte (Prüfungspaket) mit 10 % des Risikos erreichbar.
4. **Video-Abo „NFT At Home".** Ehrlich gerechnet 2–4k € MRR bei laufendem Content- und Support-Aufwand — klassische Gründerfalle „Medienunternehmen nebenbei". Die Videothek bleibt Mitglieder-Benefit und Pausierer-Brücke, kein eigenes Produkt.
5. **Pose-Estimation-Technikcheck daheim.** Bei Wohnzimmerlicht und schiefem Handywinkel fragil, hoher Pflegeaufwand pro Technik-Katalog — Zukunftsmusik, die vom Kern (App-Basis stabilisieren) ablenkt. Heim-Missionen ohne KI liefern 80 % des Werts.
6. **SaaS-Licensing vor ~30 eigenen Standorten.** Fremde Studios bedeuten Support, Roadmap-Kompromisse und Vertriebsaufbau — genau in der Phase, in der jede Entwicklerstunde in die eigene Skalierung gehört. Architektur offenhalten, Vertrieb nicht starten.
7. **Wearable-Sync mit Gesundheitsdaten.** Herzfrequenz etc. bei Minderjährigen = Art.-9-Daten ohne erkennbaren Retention-Beweis; reiner Aktivitäts-Ping wäre Erwartungserfüllung, keine Differenzierung. Streichen bis die Teens-Persona nachweislich daran hängt.
8. **Punch-Power-Station / Smart-Matten & öffentliche Kinder-Leaderboards.** Hardware-Pflege an 50 Standorten für einen Gimmick-Effekt, und Leistungs-Rankings kollidieren mit unserer Datensparsamkeits- und Pädagogik-Linie bei unter 13-Jährigen.

---

## 7. Empfohlene Reihenfolge

**A) In den Prototyp (Demo-Wert: „Das System meldet sich, bevor der Kunde fragt")**
Retention-Inbox mit Klartext-Begründungen (#1), Save-Flow (#2), Eltern-Wochenreport im Batch-Freigabe-Screen (#3), Prüfungs-Modus mit Paket-Kauf (#4), Pre-Class-Briefing (#12), Meilenstein-Push (#9), Standort-Health-Score-Kachel im Cockpit. Alles auf Mockdaten in Stunden bis Tagen zeigbar und erzählt eine geschlossene Story: Frühwarnung → Handlung → Emotion → Umsatz.

**B) Echte V1 (produktionsreif vor der Eröffnungswelle)**
Zuerst die Pflicht: Qualifikations-Register + Führungszeugnis (#11), WhatsApp-Business-API (#5), Ticketsystem als Fundament, Chip-Lifecycle. Dann der Retention-Block komplett (#1, #2, #7, #8 Ferien-Engine, #9) plus Verpasste-Anrufe (#6) und die Feedback-Pipeline (#3, #4). Umsatzseitig: Camps als Buchungsprodukt, Startpaket-Attach, Upsell-Engine (#10), Duo-Buchung, Auto-Übersetzung der Nachrichten. Dokumenten-Inbox und Tagesabschluss, sobald reale Standorte den Papierkram erzeugen.

**C) Später (gestaffelt nach Standortzahl)**
Ab ~15 Standorten: Curriculum + Stundenbilder (Wette 1), Eröffnungs-Playbook (Wette 2), Vertretungs-Marktplatz, Schichtplanung + P&L (Wette 5), Health-Score-Vollausbau mit Liga und Kohorten. Ab ~20: Expansion-Analytics (Wette 6), B2B, Schul-AG-Portal, Fahrgemeinschaften (Wette 3), Monats-Rückblick-Video (Wette 4), Wallet nach ZAG-Prüfung (Wette 7). Ab ~30: SaaS-Licensing (Wette 8) — vorher nicht anfassen.

**Leitplanke für alles:** Jedes Feature, das Kinderdaten berührt, läuft durch dieselben drei Filter wie die Top 12 — Datensparsamkeit by Design, HITL für jede ausgehende Kommunikation, und die Frage „hilft das beim Sprung auf 50 Standorte oder ist es nur charmant?". Was den dritten Filter nicht besteht, wartet.

---

# Nachtrag (02.07.2026): Feedback-/Voting-System · Persona-Entlastung · Automatisierung

*Ergänzung auf die Frage: „Nutzerbefragungen/Voting, Leben einfacher machen (Trainer/Studioleiter/GF/Kunden), mehr Automatisierung."*

## N1. Das Feedback-/Voting-System „NFT Puls"

Prinzip: **erheben ohne zu nerven, auswerten ohne Pranger, Loop sichtbar schließen.**

**Erhebung (Frequenz-Deckel eingebaut):**
- **1-Tap-Trainings-Puls (App):** nach Check-out Karte „Wie war das Training heute?" 😞😐🙂🤩 + optionales Kommentarfeld. Max. 1×/Woche pro Familie.
- **Smiley-Kiosk am Ausgang** (HappyOrNot-Prinzip): 4 große Tasten am Tablet, auch für Kinder, anonym, zählt pro Kurs/Slot → Stimmungs-Heatmap ohne App-Zwang.
- **Ereignis-NPS statt Kalender-NPS:** Tag 30 nach Vertragsstart · nach Gürtelprüfung · 7 Tage nach Save-/Support-Fall. Eine Frage + „Warum?".
- **Eltern-Quartalspuls:** max. 3 Fragen (Training/Kommunikation/Sauberkeit), 60 Sekunden.
- **Feature-Voting („Community-Roadmap"):** NFT stellt 3–5 Ideen zur Abstimmung, 5 Stimmen je Familie, eigene Ideen einreichbar.
- **Ideen-/Beschwerde-Kanal mit Status** für den Einreicher (Eingegangen → In Prüfung → Umgesetzt/Abgelehnt mit Begründung).

**Auswertung (CRM):**
- **Feedback-Dashboard je Standort:** Puls-Trend, NPS, Kiosk-Heatmap (Wochentag × Slot), KI-Themen-Clustering der Kommentare, fairer Standort-Benchmark.
- **Kurs-/Trainer-Signale nur aggregiert:** sichtbar erst ab ≥10 Stimmen; Trainer sieht eigenen Trend zuerst — nie Einzel-Pranger.
- **Detraktor-Alarm:** 😞-Vote mit Kommentar oder NPS ≤ 6 → Aufgabe an Standortleiter mit HITL-Antwortentwurf, 24h-SLA.
- **Promoter-Weiche:** NPS ≥ 9 → erst dann Google-Review-Bitte + Referral.

**Loop schließen:**
- **„Ihr habt gesagt → Wir haben's getan"-Feed** in der App + Aushang-Export (monatlich 3 umgesetzte Punkte je Standort).
- Voting-Ergebnisse transparent kommunizieren („Samstagskurs kommt ab September — 142 Stimmen").

**Kinderschutz-Leitplanken:** Kiosk anonym · keine identifizierbaren Bewertungen von Kindern · keine öffentlichen Trainer-Rankings · Löschkonzept für Kommentare.

## N2. Leben einfacher — Top 5 je Persona (jenseits des Bestands)

**Trainer:** 1) Zero-Prep (Anwesenheit 100 % via Chip, nur Ausnahmen korrigieren) · 2) Kursausfall-Automatik (krankmelden → Teilnehmer-Info + Vertretungsanfrage automatisch) · 3) Stundenbild-Karte aufs Handy aus dem Curriculum · 4) Antwort-Schnipsel für Elternfragen · 5) Mangel-Melder (Foto → Ticket). Plus: persönliche Trainer-Stats (eigene Retention/Puls-Score, fairer Vergleich).

**Studioleiter:** 1) Morgen-Briefing-Karte (5 wichtigste Dinge heute, auto-generiert) · 2) Anomalie-Alarme (Check-ins −20 %, Kurs 3× unterbesetzt, Rücklastschrift-Häufung) · 3) Wochenbericht schreibt sich selbst (KI-Entwurf aus KPIs) · 4) Inventar-/Wartungs-Radar (Erste-Hilfe-Ablauf, Matten, Feuerlöscher) · 5) Ziel-Tracker („Probetrainings 34/50" live + Rückstands-Push). Plus: Dienstplan-Autopilot-Vorschlag.

**Geschäftsführer:** 1) Wochen-Digest (KI: Highlights/Risiken/Entscheidungsbedarf in 10 Sätzen) · 2) Entscheidungs-Inbox (nur echte GF-Freigaben, 1-Tap-Approve, Audit-Trail) · 3) Vertrags-/Lizenz-Radar (Miete/Versicherung/Lizenzen mit Ablauf-Warnung) · 4) Steuerberater-Paket automatisch (Monatsabschluss + DATEV + Belege) · 5) Wettbewerbs-Monitor (neues Studio im Umkreis → Alert). Plus: Krisen-Playbooks.

**Kunden/Eltern:** 1) Dokumente auf Knopfdruck (Teilnahmebescheinigung Krankenkassen-Bonusprogramm, Beitrags-/Vereinsbescheinigung als Sofort-PDF) · 2) Eltern-FAQ-Bot (nur Eltern, nie Kinder; eskaliert an Mensch) · 3) Smart-Reminder („Gi waschen — Samstag Prüfung") · 4) Abhol-Koordination (geteilter Familienstatus, Oma read-only) · 5) Größen-Radar (Kind wächst → Gi-Nachkauf-Hinweis). Plus: Geschenk-Store für Großeltern, Familien-Jahresrückblick.

## N3. Automatisierungs-Landkarte

- **Vollautomatisch:** Check-in/out-Pushes · Anwesenheit · Auslastung · Streaks/Badges/Meilensteine · Erinnerungen · Warteliste · SEPA-Pre-Notification · Bescheinigungs-PDFs · Ferien-Anpassung · Kiosk-Voting-Aggregation · Anomalie-Erkennung · alle KI-Entwürfe (Reports, Digest, Antworten).
- **Human-in-the-Loop (System entwirft, Mensch bestätigt):** jede individuelle ausgehende Nachricht (Leads, Retention, Upsell, Mahnung 1–3, Wochenreports, Detraktor-Antworten) · Vertretungsbesetzung · Dienstplan · GF-Wochenbericht.
- **Bewusst manuell:** Mahnstufe 4/Rechtliches · Kündigungsgespräche · Kinderschutz-Fälle · Kulanz über Limit · Prüfungsentscheidung (Trainer) · jede Kommunikation direkt an Kinder.

## N4. Prototyp-Paket C (empfohlen)

1. Trainings-Puls (1-Tap-Smiley in der App + Danke-State)
2. Smiley-Kiosk-Feedback-Screen (Tablet)
3. Feedback-Dashboard im CRM (Puls-Trend, NPS, Kiosk-Heatmap, Detraktor-Alarm-Liste)
4. Feature-Voting „Community-Roadmap" in der App (3 Ideen, Stimmen, Ergebnis)
5. „Ihr habt gesagt → getan"-Feed in der App
6. Morgen-Briefing-Karte im CRM-Dashboard
7. Wochen-Digest-Karte (GF, Reports)
8. Dokumente-auf-Knopfdruck im App-Konto

## N5. Bewusst NICHT

- Öffentliche Trainer-Sterne/Rankings (Pranger-Effekt, Betriebsklima, ggf. mitbestimmungspflichtig).
- Identifizierbares Feedback von Kindern (nur anonymes Kiosk-Voting).
- Tägliche/erzwungene Umfragen (Survey-Fatigue — der Frequenz-Deckel ist Teil des Designs).
- Öffentliche Kommentare unter Kursen (Moderationsaufwand, Eskalationsrisiko).
- Incentivierte Google-Reviews (Verstoß gegen Google-Richtlinien, Abmahnrisiko).
