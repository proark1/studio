/* ===========================================================
   NFT GYM — Mock data (Prototype, keine echten Daten)
   =========================================================== */
window.DATA = {
  brand: { name: "NFT GYM", claim: "National Fighting Team" },

  locations: [
    { id:"moenchengladbach", city:"Mönchengladbach", addr:"Korschenbroicher Straße 160, 41065", hours:"Mo–Fr 14–21 · Sa 10–14", occ:"normal", top:["Kids Kickboxen","MMA","BJJ"] },
    { id:"krefeld", city:"Krefeld", addr:"Kölner Straße 44, 47800", hours:"Mo–Fr 14–21 · Sa 10–14", occ:"voll", top:["Kids Kickboxen","Boxen","Ringen"] },
    { id:"koeln", city:"Köln", addr:"Venloer Straße 210, 50823", hours:"Mo–Fr 15–22 · Sa 10–14", occ:"voll", top:["MMA","BJJ","Kickboxen"] },
    { id:"muenchen", city:"München", addr:"Landsberger Str. 300, 80687", hours:"Mo–Fr 15–22 · Sa 10–15", occ:"ruhig", top:["Kids Kickboxen","Boxen","Luta Livre"] },
    { id:"meerbusch", city:"Meerbusch", addr:"Moerser Straße 12, 40667", hours:"Mo–Fr 14–21", occ:"ruhig", top:["Kids Kickboxen","Kids BJJ"] },
    { id:"kaarst", city:"Kaarst", addr:"Neusser Straße 5, 41564", hours:"Mo–Fr 14–21", occ:"normal", top:["Kickboxen","MMA"] },
    { id:"hilden", city:"Hilden", addr:"Mittelstraße 40, 40721", hours:"Mo–Fr 14–21", occ:"normal", top:["Boxen","Kids Kickboxen"] },
    { id:"bochum", city:"Bochum", addr:"Kortumstraße 90, 44787", hours:"Mo–Fr 15–22", occ:"normal", top:["MMA","Ringen","BJJ"] },
    { id:"muelheim", city:"Mülheim a. d. Ruhr", addr:"Schloßstraße 22, 45468", hours:"Mo–Fr 14–21", occ:"ruhig", top:["Kids Kickboxen","Boxen"] },
    { id:"willich", city:"Willich", addr:"Bahnstraße 8, 47877", hours:"Mo–Fr 14–21", occ:"normal", top:["Kickboxen","Kids BJJ"] },
  ],

  sports: [
    { name:"Kickboxen", icon:"🥊", desc:"Explosiv, technisch, fit.", img:"https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=900&auto=format&fit=crop" },
    { name:"Boxen", icon:"🥊", desc:"Die klassische Kunst.", img:"https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=900&auto=format&fit=crop" },
    { name:"MMA", icon:"🥋", desc:"Stand & Boden vereint.", img:"https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=900&auto=format&fit=crop" },
    { name:"Jiu-Jitsu (BJJ)", icon:"🥋", desc:"Technik schlägt Kraft.", img:"https://images.unsplash.com/photo-1614632537190-23e4146777db?q=80&w=900&auto=format&fit=crop" },
    { name:"Ringen", icon:"🤼", desc:"Kontrolle & Kraft.", img:"https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=900&auto=format&fit=crop" },
    { name:"Luta Livre", icon:"🤼", desc:"Submission Grappling.", img:"https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=900&auto=format&fit=crop" },
  ],
  heroImg:"https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=1600&auto=format&fit=crop",

  parent: { name:"Nicole A.", first:"Nicole", location:"Krefeld" },

  kids: [
    { name:"Emir", age:7, program:"Kids Kickboxen 6–9", belt:"Gelbgurt", beltColor:"#f5c518", trainer:"Mehmet",
      next:{ day:"Mittwoch", time:"16:00", occ:"normal" }, freq:"2×/Woche", risk:"gruen",
      classesToTest:6,
      skills:[ {n:"Grundstellung",v:100},{n:"Jab-Cross",v:90},{n:"Lowkick",v:55},{n:"Deckung",v:45},{n:"Mattenregeln / Respekt",v:100} ],
      belts:["Weißgurt","Gelbgurt","Orangegurt","Grüngurt"], beltIdx:1,
      streak:5, stripes:3, stripesMax:4,
      badges:[ {i:"🔥",n:"5-Wochen-Serie",got:true},{i:"🥋",n:"10 Trainings",got:true},{i:"👊",n:"Erste Falltechnik",got:true},{i:"⭐",n:"5 Stripes",got:true},{i:"🛡️",n:"Mitglied seit 2026",got:true},{i:"🤼",n:"Erstes Sparring",got:false},{i:"🎖️",n:"Prüfung bestanden",got:false} ],
      buddy:null },
    { name:"Sara", age:10, program:"Kids BJJ 10–14", belt:"Weißgurt", beltColor:"#e9e9ee", trainer:"Lena",
      next:{ day:"Freitag", time:"15:30", occ:"ruhig" }, freq:"1×/Woche", risk:"gelb",
      classesToTest:9,
      skills:[ {n:"Fallschule",v:80},{n:"Guard",v:40},{n:"Escapes",v:35},{n:"Disziplin",v:90} ],
      belts:["Weißgurt","Grauer Gürtel","Gelbgurt"], beltIdx:0,
      streak:2, stripes:2, stripesMax:4,
      bday:"in 6 Tagen (wird 11)",
      badges:[ {i:"🔥",n:"2-Wochen-Serie",got:true},{i:"🥋",n:"5 Trainings",got:true},{i:"🤸",n:"Fallschule sicher",got:true},{i:"⭐",n:"3 Stripes",got:false},{i:"🎖️",n:"Prüfung bestanden",got:false} ],
      buddy:"Mia T." },
  ],

  referral:{ code:"NICOLE-10", status:"1 Einladung angenommen · 1 Freimonat wartet auf dich" },
  transition:{ kid:"Emir", from:"Kids 6–9", to:"Kids 10–14", when:"ab August", trainer:"Lena", meet:"Mo, 5. Aug · 16:00", confirmed:false },
  team:{ trainer:{name:"Mehmet K.", role:"Dein Trainer", ico:"🥊"}, leitung:{name:"Laura B.", role:"Deine Standortleitung", ico:"👋"} },
  loyalty:{ since:"März 2026", flexAb:"01.03.2028", offer:"1× Personal Training gratis" },

  siteBot:[
    { q:"Was kostet das Training?", a:"Kids-Tarife starten bei 49 €/Monat, Erwachsene bei 59 €. Familien sparen mit dem Family-Tarif. Das Probetraining ist immer kostenlos — am besten einfach ausprobieren!", cta:true },
    { q:"Ab welchem Alter geht es los?", a:"Ab 3 Jahren! Unsere Gruppen: Mini 3–5, Kids 6–9, Kids 10–14, Teens und Erwachsene — jedes Kind trainiert altersgerecht.", cta:true },
    { q:"Wie läuft das Probetraining ab?", a:"Online Termin wählen (60 Sekunden), Bestätigung mit allen Infos bekommen, vorbeikommen — dein Kind trainiert kostenlos mit, du kannst beim ersten Mal dabei bleiben.", cta:true },
    { q:"Was muss man mitbringen?", a:"Nur bequeme Sportkleidung, eine Trinkflasche und gute Laune. Ausrüstung gibt es leihweise vor Ort.", cta:false },
    { q:"Wo gibt es NFT-Standorte?", a:"10 Standorte: Krefeld, Köln, München, Mönchengladbach, Meerbusch, Kaarst, Hilden, Bochum, Mülheim und Willich — mit dem Standortfinder findest du deinen.", cta:false },
  ],

  // weekly schedule for the parent's home location
  schedule: [
    { day:"Mo", items:[ {t:"15:30",n:"Kids 3–5",occ:"ruhig"},{t:"16:30",n:"Kids 6–9",occ:"normal"},{t:"17:30",n:"Teens Kickboxen",occ:"voll"} ]},
    { day:"Di", items:[ {t:"16:00",n:"Kids 6–9",occ:"voll"},{t:"17:00",n:"MMA Beginner",occ:"normal"},{t:"19:00",n:"Boxen",occ:"normal"} ]},
    { day:"Mi", items:[ {t:"16:00",n:"Kids 6–9",occ:"ruhig",rec:true},{t:"17:30",n:"BJJ Kids",occ:"normal"},{t:"19:30",n:"MMA",occ:"voll"} ]},
    { day:"Do", items:[ {t:"16:00",n:"Kids 6–9",occ:"ruhig"},{t:"17:00",n:"Ringen",occ:"normal"},{t:"19:00",n:"Kickboxen",occ:"voll"} ]},
    { day:"Fr", items:[ {t:"15:30",n:"BJJ Kids",occ:"ruhig",rec:true},{t:"17:00",n:"Kickboxen",occ:"normal"},{t:"19:00",n:"Sparring",occ:"normal"} ]},
  ],

  // occupancy heatmap: rows = time, cols = Mo..Fr
  heatDays:["Mo","Di","Mi","Do","Fr"],
  heatRows:[
    { time:"15:00", cells:["ruhig","ruhig","ruhig","ruhig","ruhig"] },
    { time:"16:00", cells:["normal","voll","ruhig","ruhig","normal"] },
    { time:"17:00", cells:["voll","sehr","normal","normal","ruhig"] },
    { time:"18:00", cells:["voll","sehr","voll","normal","normal"] },
    { time:"19:00", cells:["normal","voll","voll","voll","normal"] },
    { time:"20:00", cells:["ruhig","normal","normal","normal","ruhig"] },
  ],

  messages: [
    { from:"NFT Krefeld", ico:"📣", time:"vor 2 Std.", unread:true, title:"Kursänderung Freitag",
      text:"Der Kurs am Freitag findet diese Woche mit Trainer Ali statt. Bitte 10 Minuten früher da sein — wir machen Prüfungsübungen." },
    { from:"Trainer Mehmet", ico:"🥊", time:"gestern", unread:true, title:"Emir · Feedback",
      text:"Emir war heute sehr konzentriert und hat seine Kombinationen sauberer ausgeführt. Nächster Fokus: Deckung nach dem Angriff." },
    { from:"NFT Krefeld", ico:"🎓", time:"vor 3 Tagen", unread:false, title:"Prüfungstermin verfügbar",
      text:"Für Emir ist bald eine Gürtelprüfung möglich. Wir melden uns mit einem Termin." },
    { from:"NFT Zahlungen", ico:"✅", time:"01.07.", unread:false, title:"Zahlung erfolgreich",
      text:"Deine Monatszahlung für Emir (89 €) wurde erfolgreich eingezogen. Danke!" },
  ],

  moments:[
    { kid:"Emir", type:"Foto", ico:"📸", cap:"Erste saubere Rückwärtsrolle 🤸", time:"Mi, 16:40", trainer:"Mehmet" },
    { kid:"Emir", type:"Video", ico:"🎬", cap:"Starke Kombination am Sandsack", time:"letzte Woche", trainer:"Mehmet" },
    { kid:"Emir", type:"Foto", ico:"📸", cap:"Team-Foto nach dem Training", time:"vor 2 Wochen", trainer:"Mehmet" },
  ],

  events:[
    { id:"turnier-nrw", cat:"Turnier", title:"NFT Open NRW 2026", date:"14. Sept 2026", loc:"Krefeld", desc:"Vereinsinternes Turnier für alle Altersklassen — vom Anfänger bis zum Wettkämpfer.", price:"25 €" },
    { id:"feriencamp", cat:"Feriencamp", title:"Sommer-Kampfsportcamp", date:"28. Juli – 1. Aug", loc:"Mönchengladbach", desc:"5 Tage Training, Spiele & Spaß für Kinder von 6–14 Jahren.", price:"149 €" },
    { id:"geburtstag", cat:"Geburtstag", title:"Kampfsport-Geburtstag", date:"nach Vereinbarung", loc:"alle Standorte", desc:"2 Std. Action mit Trainer, Urkunde & Snacks — das Highlight für dein Kind.", price:"ab 199 €" },
    { id:"lehrgang", cat:"Lehrgang", title:"BJJ-Lehrgang mit Gastcoach", date:"5. Okt 2026", loc:"Köln", desc:"Technik-Seminar für Fortgeschrittene mit internationalem Gasttrainer.", price:"39 €" },
  ],
  shop:[
    { id:"gi", name:"NFT Gi (Kids)", price:"59,90 €", ico:"🥋", cat:"Bekleidung" },
    { id:"handschuhe", name:"Boxhandschuhe 10oz", price:"39,90 €", ico:"🥊", cat:"Ausrüstung" },
    { id:"schienbein", name:"Schienbeinschoner", price:"29,90 €", ico:"🦵", cat:"Ausrüstung" },
    { id:"shirt", name:"NFT Team-Shirt", price:"24,90 €", ico:"👕", cat:"Bekleidung" },
    { id:"bandagen", name:"Boxbandagen (Paar)", price:"9,90 €", ico:"🧤", cat:"Ausrüstung" },
    { id:"flasche", name:"NFT Trinkflasche", price:"14,90 €", ico:"🍶", cat:"Zubehör" },
    { id:"pruefungspaket", name:"Prüfungspaket (Urkunde + Gürtel + Foto)", price:"44,90 €", ico:"🎖️", cat:"Prüfung" },
  ],

  milestone:{ kid:"Emir", n:50, label:"50. Training", claimed:false },

  weeklyReports:[
    { kid:"Emir", tags:["konzentriert","Deckung verbessert","hat anderen geholfen"],
      text:"Emir hat diese Woche zweimal trainiert und vor allem an seiner Deckung gearbeitet — deutlich stabiler als letzte Woche. Besonders schön: Er hat einem neuen Kind beim Aufwärmen geholfen. Nächster Fokus: Lowkick-Technik.", status:"entwurf" },
    { kid:"Sara", tags:["mutiger beim Fallen","braucht Routine"],
      text:"Sara war diese Woche einmal da und ist beim Fallen deutlich mutiger geworden. Damit sie sicherer wird, würde ihr eine zweite Einheit pro Woche sehr helfen. Nächster Fokus: Guard-Grundlagen.", status:"entwurf" },
  ],
  testimonials:[
    { name:"Sonja M.", kid:"Mutter von Leon (8)", text:"Leon ist selbstbewusster geworden und freut sich jede Woche. Die App zeigt mir genau, wann es ruhiger ist.", stars:5 },
    { name:"Daniel K.", kid:"Mitglied MMA", text:"Top Trainer, faire Verträge, alles digital. Genau so muss ein modernes Studio sein.", stars:5 },
    { name:"Aylin T.", kid:"Mutter von Mia (6)", text:"Der Check-in-Push aufs Handy ist Gold wert. Ich weiß immer, dass sie sicher angekommen ist.", stars:5 },
  ],
  videos:[
    { belt:"Weißgurt", title:"Grundstellung & Beinarbeit", dur:"4:12" },
    { belt:"Weißgurt", title:"Jab & Cross sauber ausführen", dur:"5:30" },
    { belt:"Gelbgurt", title:"Lowkick-Technik", dur:"6:02" },
    { belt:"Gelbgurt", title:"Deckung nach dem Angriff", dur:"3:48" },
    { belt:"Orangegurt", title:"3er-Kombinationen", dur:"7:15" },
  ],
  onboarding:[
    { day:"Tag 0", title:"Willkommen bei NFT", desc:"Vertrag aktiv, App eingerichtet, Chip abgeholt.", done:true },
    { day:"Tag 1–3", title:"Erstes reguläres Training", desc:"Ankommen, Gruppe & Trainer kennenlernen.", done:true },
    { day:"Tag 5", title:"Zweite Einheit", desc:"Dranbleiben zahlt sich aus — Routine entsteht.", done:false, cur:true },
    { day:"Tag 7–10", title:"Feedback vom Trainer", desc:"Erste Einschätzung & gemeinsame Ziele.", done:false },
    { day:"Tag 30", title:"Ziel: 8 Check-ins", desc:"Wer im 1. Monat ≥8× kommt, bleibt langfristig dabei.", done:false },
  ],

  payments: [
    { who:"Emir A. · Kids Premium", amount:"89,00 €", status:"bezahlt", info:"Nächste Abbuchung 01.08.2026" },
    { who:"Sara A. · Kids Standard", amount:"49,00 €", status:"offen", info:"Fällig in 3 Tagen · SEPA" },
    { who:"Prüfungsgebühr Emir", amount:"25,00 €", status:"offen", info:"Zahlungslink verfügbar" },
  ],

  faq:[
    { q:"Ab welchem Alter kann mein Kind trainieren?", a:"Bei NFT trainieren Kinder ab 3 Jahren in altersgerechten Gruppen (Mini 3–5, Kids 6–9, 10–14) bis hin zu Teens und Erwachsenen." },
    { q:"Wie läuft das Probetraining ab?", a:"Du buchst online einen echten Termin, bekommst alle Infos („Was mitbringen“) und eine Erinnerung. Vor Ort trainiert dein Kind kostenlos und unverbindlich mit." },
    { q:"Was kostet die Mitgliedschaft?", a:"Die Tarife hängen von Programm und Standort ab. Es gibt Familien- und Geschwisterrabatte. Den genauen Preis siehst du im Anmeldeprozess." },
    { q:"Kann ich den Vertrag online kündigen?", a:"Ja. Über den Kündigungsbutton kündigst du jederzeit online — ohne Login, mit sofortiger Bestätigung in Textform." },
    { q:"Sehe ich, wann es im Studio voll ist?", a:"Ja — in der App siehst du die Live-Auslastung und eine Wochen-Heatmap und bekommst ruhige Zeiten für dein Kind empfohlen." },
  ],

  feedback:{
    roadmap:[
      { id:"samstag", title:"Samstagskurs für Kids", desc:"Zusätzlicher Kids-Kurs am Samstagvormittag (10:00).", votes:142, voted:false },
      { id:"kaffee", title:"Eltern-Kaffee-Ecke", desc:"Gemütlicher Wartebereich mit Kaffee & WLAN.", votes:98, voted:false },
      { id:"openmat", title:"Teens Open Mat", desc:"Freies Training für Teens am Freitagabend.", votes:64, voted:false },
    ],
    done:[
      { when:"Juni", what:"Früherer Kids-Kurs am Mittwoch (16:00) eingeführt", src:"42 Eltern-Stimmen" },
      { when:"Mai", what:"Wasserspender im Wartebereich aufgestellt", src:"Ideen-Kanal" },
      { when:"April", what:"Check-out-Push für Eltern eingeführt", src:"Eltern-Quartalspuls" },
    ],
  },
  documents:[
    { id:"kk", ico:"🏥", name:"Teilnahmebescheinigung", desc:"Für Krankenkassen-Bonusprogramme" },
    { id:"beitrag", ico:"🧾", name:"Beitragsbescheinigung", desc:"Jahresübersicht für Unterlagen/Finanzamt" },
    { id:"verein", ico:"📄", name:"Mitgliedsbescheinigung", desc:"Nachweis der aktiven Mitgliedschaft" },
  ],

  pt:[
    { id:"mehmet", name:"Mehmet K.", spec:"Kickboxen · Kids-Coaching", price:"49 €/Std.", slots:["Do 15:00","Fr 14:00","Sa 11:00"] },
    { id:"sven", name:"Sven B.", spec:"MMA · Wettkampf-Vorbereitung", price:"59 €/Std.", slots:["Mi 20:00","Fr 18:00"] },
    { id:"lena", name:"Lena S.", spec:"BJJ · Technik-Feinschliff", price:"49 €/Std.", slots:["Di 15:00","Do 19:00"] },
  ],
  camp:{ title:"Sommer-Kampfsportcamp", dates:"28. Juli – 1. August", loc:"Mönchengladbach", ages:"6–14 Jahre",
    spots:25, taken:17, priceEarly:"129 €", priceNormal:"149 €", earlyUntil:"10. Juli",
    program:["Mo–Fr 9–15 Uhr Training, Spiele & Technik","Mittagessen & Getränke inklusive","Freitags Mini-Turnier + Urkunde für alle","Auch für Nicht-Mitglieder buchbar"] },
  vouchers:[
    { id:"v3m", ico:"🎁", name:"3 Monate Mitgliedschaft", desc:"Der Klassiker von Oma & Opa", price:"149 €" },
    { id:"vpt", ico:"🥊", name:"1× Personal Training", desc:"60 Minuten Einzeltraining", price:"49 €" },
    { id:"vcamp", ico:"⛺", name:"Feriencamp-Woche", desc:"5 Tage Action in den Ferien", price:"149 €" },
  ],
  faqBot:[
    { q:"Was muss mein Kind mitbringen?", a:"Bequeme Sportkleidung, eine Trinkflasche und gute Laune! 🥋 Für die ersten Trainings reicht das völlig — Handschuhe & Co. gibt es leihweise vor Ort oder später im Pro-Shop." },
    { q:"Was kostet die Mitgliedschaft?", a:"Kids-Tarife starten bei 49 €/Monat. Familien sparen mit dem Family-Tarif: 119 € für zwei Kinder statt 138 €. Die genauen Tarife siehst du beim Vertragsabschluss." },
    { q:"Wie sind die Öffnungszeiten?", a:"NFT Krefeld: Mo–Fr 14–21 Uhr, Sa 10–14 Uhr. Die Kurszeiten deiner Kinder findest du jederzeit im Kursplan hier in der App." },
    { q:"Kann ich beim Training zuschauen?", a:"Beim Probetraining sehr gern! Danach empfehlen wir: Kind abgeben, Kaffee holen — der Check-in-Push sagt dir, dass alles gut ist. 😊 Bei Prüfungen sind Eltern natürlich immer dabei." },
    { q:"Mein Kind ist krank — was tun?", a:"Einfach in der App auf »Krankmelden« tippen (Home → Karte deines Kindes). Der Platz wird freigegeben, der Trainer weiß Bescheid und die Streak friert ein. Gute Besserung! 💛" },
  ],

  ages:["3–5","6–9","10–14","15+"],
  goals:["Selbstvertrauen","Fitness","Selbstverteidigung","Disziplin","Wettkampf"],

  crm:{
    fact:{ standorte:10, mitglieder:2410, mrr:"148.900 €", watchlist:34 },
    kpis:[
      {n:12,l:"Probetrainings heute",v:"amber",go:"#/crm/leads"},
      {n:27,l:"Offene Zahlungen · franchiseweit",v:"red",go:"#/crm/zahlungen"},
      {n:5,l:"Rücklastschriften",v:"red",go:"#/crm/zahlungen"},
      {n:18,l:"Neue Anfragen (7 Tage) · franchiseweit",v:"",go:"#/crm/leads"},
      {n:3,l:"Überfüllte Kurse",v:"amber",go:"#/crm/kurse"},
      {n:34,l:"Inaktive Mitglieder · Watchlist",v:"amber",go:"#/crm/retention"},
      {n:8,l:"Offene Verträge · franchiseweit",v:"",go:"#/crm/vertraege"},
      {n:13,l:"KI-Entwürfe prüfen",v:"green",go:"#/crm/kommunikation"},
      {n:"11 Min",l:"Ø Erstreaktion heute · 2 Leads über 60-Min-Ziel",v:"amber",go:"#/crm/leads"},
    ],
    pipeline:["Neu","Kontaktiert","Probe gebucht","Erschienen","Angebot","Vertrag"],
    leads:[
      {id:"L1",name:"Nicole A.",who:"Kind (Emir, 7)",loc:"Krefeld",interest:"Kickboxen",stage:"Neu",action:"KI-Mail senden",src:"Website",ageMin:12},
      {id:"L2",name:"Marco S.",who:"Erwachsen (32)",loc:"Köln",interest:"MMA",stage:"Probe gebucht",action:"Reminder",src:"Google Maps",ageMin:34},
      {id:"L3",name:"Aylin K.",who:"Teen (15)",loc:"Meerbusch",interest:"Boxen",stage:"Angebot",action:"Nachfassen",src:"Instagram",ageMin:130},
      {id:"L4",name:"Familie Yildiz",who:"2 Kinder",loc:"Krefeld",interest:"Kids BJJ",stage:"Kontaktiert",action:"Anrufen",src:"WhatsApp",ageMin:20},
      {id:"L5",name:"Jonas P.",who:"Erwachsen (28)",loc:"Bochum",interest:"Ringen",stage:"Erschienen",action:"Vertrag vorbereiten",src:"Website",ageMin:45,
       trialTags:["stark bei Takedowns","sehr gute Kondition","sofort Anschluss gefunden"],
       draft:"Hallo Jonas,\n\nstark, dass du beim Probetraining dabei warst! Trainer Igor war beeindruckt: besonders deine Takedowns und deine Kondition sind eine super Basis fürs Ringen.\n\nDein Platz im Dienstags-Kurs (19:00) ist noch frei — hier dein Vertragslink mit Gründungsrabatt (7 Tage gültig).\n\nBis Dienstag?\nNFT Gym Bochum"},
      {id:"L6",name:"Lea M.",who:"Kind (6)",loc:"München",interest:"Kids Kickboxen",stage:"Neu",action:"KI-Mail senden",src:"Instagram",ageMin:8},
      {id:"L7",name:"Deniz T.",who:"Teen (16)",loc:"Köln",interest:"MMA",stage:"Vertrag",action:"Unterschrift",src:"Website",ageMin:190},
      {id:"L8",name:"Sandra W.",who:"Erwachsen (35)",loc:"Hilden",interest:"Frauen-Kurs",stage:"Kontaktiert",action:"Termin anbieten",src:"Google Maps",ageMin:15},
      {id:"L10",name:"Familie Krause",who:"Kind (6)",loc:"Krefeld",interest:"Kids Kickboxen",stage:"Probe gebucht",action:"Rebooking läuft",src:"Google Maps",ageMin:0,noshow:true},
    ],
    leadDraft:`Hallo Frau A.,

vielen Dank für Ihre Anfrage für Ihren Sohn Emir.
Für sein Alter passt unser Kids-Kickboxen 6–9 am Standort Krefeld.

Wir haben zwei ruhige Einstiegstermine:
• Mittwoch, 16:00 Uhr
• Freitag, 15:30 Uhr

Soll ich einen dieser Termine für ein kostenloses Probetraining reservieren?

Viele Grüße
NFT Gym Team`,
    members:[
      {fam:"A",name:"Emir A.",who:"Kind",loc:"Krefeld",contract:"Aktiv",pay:"bezahlt",act:"2×/Wo",risk:"gruen"},
      {fam:"A",name:"Sara A.",who:"Kind",loc:"Krefeld",contract:"Aktiv",pay:"offen",act:"1×/Wo",risk:"gelb"},
      {fam:"marco-s",name:"Marco S.",who:"Erwachsen",loc:"Köln",contract:"Aktiv",pay:"bezahlt",act:"3×/Wo",risk:"gruen"},
      {fam:"yilmaz",name:"Familie Yilmaz",who:"Familie",loc:"München",contract:"Aktiv",pay:"rueck",act:"–",risk:"rot"},
      {fam:"jonas-p",name:"Jonas P.",who:"Erwachsen",loc:"Bochum",contract:"Aktiv",pay:"bezahlt",act:"2×/Wo",risk:"gruen"},
      {fam:"lena-k",name:"Lena K.",who:"Teen",loc:"Krefeld",contract:"Aktiv",pay:"bezahlt",act:"1×/Wo",risk:"gelb"},
      {fam:"ali-r",name:"Ali R.",who:"Erwachsen",loc:"Köln",contract:"Pausiert",pay:"bezahlt",act:"0×",risk:"rot"},
    ],
    courses:[
      {id:"K1",name:"Kids Kickboxen 6–9",loc:"Krefeld",day:"Di",time:"17:00",trainer:"Mehmet",cap:20,booked:19,occ:"voll"},
      {id:"K2",name:"Kids Kickboxen 6–9",loc:"Krefeld",day:"Mi",time:"16:00",trainer:"Mehmet",cap:20,booked:11,occ:"ruhig"},
      {id:"K3",name:"MMA Beginner",loc:"Köln",day:"Di",time:"19:00",trainer:"Sven",cap:24,booked:18,occ:"normal"},
      {id:"K4",name:"Kids BJJ 10–14",loc:"Krefeld",day:"Fr",time:"15:30",trainer:"Lena",cap:18,booked:8,occ:"ruhig"},
      {id:"K5",name:"Boxen",loc:"Hilden",day:"Do",time:"19:00",trainer:"Kai",cap:22,booked:21,occ:"voll"},
      {id:"K6",name:"Ringen",loc:"Bochum",day:"Mi",time:"18:00",trainer:"Igor",cap:16,booked:9,occ:"normal"},
    ],
    checkins:[
      {time:"15:58",person:"Emir A.",loc:"Krefeld",course:"Kids Kickboxen",status:"Check-in"},
      {time:"16:01",person:"Sara A.",loc:"Krefeld",course:"Kids BJJ",status:"Check-in"},
      {time:"16:03",person:"Lena K.",loc:"Krefeld",course:"Teens Kickboxen",status:"Check-in"},
      {time:"16:05",person:"Marco S.",loc:"Köln",course:"MMA Beginner",status:"Check-in"},
      {time:"17:03",person:"Emir A.",loc:"Krefeld",course:"Kids Kickboxen",status:"Check-out"},
    ],
    inbox:[
      {customer:"Nicole A.",topic:"Umbuchung Kurs",channel:"App",prio:"Mittel",status:"Prüfen",
       draft:"Hallo Frau A.,\n\ngern buchen wir Emir vom Dienstag (17:00) auf den ruhigeren Mittwoch (16:00) um. Der Platz ist reserviert — passt das so?\n\nViele Grüße\nNFT Gym Krefeld"},
      {customer:"Marco S.",topic:"Frage zum Vertrag",channel:"E-Mail",prio:"Hoch",status:"Offen",
       draft:"Hallo Herr S.,\n\nIhr MMA-Unlimited-Vertrag läuft mit 24 Monaten Erstlaufzeit. Eine monatliche Pausierung ist jederzeit möglich. Soll ich Ihnen die Details zusenden?\n\nViele Grüße\nNFT Gym Köln"},
      {customer:"Familie K.",topic:"Zahlung fehlgeschlagen",channel:"E-Mail",prio:"Hoch",status:"Eskalieren",
       draft:"⚠️ Sensibler Fall (Zahlung / Mahnung) — dieser Entwurf wird NICHT automatisch versendet und muss persönlich bearbeitet werden."},
      {customer:"Sandra W.",topic:"Probetraining Frauen-Kurs",channel:"Website",prio:"Mittel",status:"Prüfen",
       draft:"Hallo Frau W.,\n\nunser Frauen-Kurs in Hilden ist ideal zum Einstieg. Nächster freier Termin: Donnerstag 19:00. Soll ich Sie für ein kostenloses Probetraining eintragen?\n\nViele Grüße\nNFT Gym Hilden"},
      {customer:"Nicole A.",topic:"Emir kommt heute später",channel:"WhatsApp",prio:"Niedrig",status:"Prüfen",wa:true,
       chat:[["in","Hallo! Emir kommt heute ca. 10 Minuten später zum Training, ok? 🙈"]],
       draft:"Kein Problem, Frau A. — ich sage Trainer Mehmet Bescheid. Bis gleich! 🥊"},
      {customer:"+49 157 333 22 11 · unbekannt",topic:"Preis-Anfrage Kickboxen",channel:"WhatsApp",prio:"Mittel",status:"Lead angelegt",wa:true,
       chat:[["in","Hi, was kostet Kickboxen für meinen Sohn? Er ist 8."]],
       draft:"Hallo! Für 8-Jährige passt unser Kids-Kickboxen 6–9 perfekt. Am besten erleben Sie es kostenlos beim Probetraining — hier direkt buchen: nft-gym.de/probetraining 🥋"},
    ],
    payments:[
      {who:"Familie Yilmaz",loc:"München",amount:"49,90 €",reason:"Monatsbeitrag · Rücklastschrift (Konto ungedeckt)",status:"rueck",age:"5 Tage"},
      {who:"M. Schulz",loc:"Köln",amount:"39,90 €",reason:"Monatsbeitrag · Rücklastschrift · 2. Mahnstufe",status:"rueck",age:"12 Tage"},
      {who:"Ali R.",loc:"Köln",amount:"39,90 €",reason:"Monatsbeitrag · Rücklastschrift",status:"rueck",age:"3 Tage"},
      {who:"Sara A.",loc:"Krefeld",amount:"49,00 €",reason:"Monatsbeitrag · noch nicht eingezogen",status:"offen",age:"—"},
      {who:"Prüfungsgebühr Emir",loc:"Krefeld",amount:"25,00 €",reason:"Zahlungslink offen",status:"offen",age:"1 Tag"},
      {who:"J. Peters",loc:"Bochum",amount:"59,00 €",reason:"Monatsbeitrag",status:"bezahlt",age:"—"},
    ],
    paysummary:{offen:27,rueck:5,heute:14,ok:2378,recovery:"87 %",betrag:"1.612 €"},
    reports:{
      standorte:[
        {city:"Krefeld",leads:81,trial:"62 %",close:"48 %",occ:"84 %",offen:27},
        {city:"Köln",leads:102,trial:"58 %",close:"43 %",occ:"91 %",offen:34},
        {city:"München",leads:73,trial:"65 %",close:"39 %",occ:"76 %",offen:19},
        {city:"Mönchengladbach",leads:64,trial:"60 %",close:"45 %",occ:"80 %",offen:12},
      ],
      ceo:[
        {l:"MRR (geschätzt)",v:"148.900 €"},{l:"Aktive Mitglieder",v:"2.410"},
        {l:"Trial-Conversion Ø",v:"52 %"},{l:"Churn-Rate",v:"4,1 %"},
        {l:"At-Risk-Mitglieder",v:"118"},{l:"Offene Forderungen",v:"6.240 €"},
      ],
    },
    journeys:[
      {name:"Lead-Nurturing", trigger:"Neue Anfrage", action:"Auto-Antwort + Buchungslink → Reminder → Nachfass", channel:"E-Mail / WhatsApp", on:true},
      {name:"Onboarding 30 Tage", trigger:"Vertrag unterschrieben", action:"Willkommen → Check-in Tag 3 → Kurseinladung", channel:"E-Mail / Push", on:true},
      {name:"No-Show", trigger:"Gebucht, kein Check-in", action:"Reminder; bei Muster → als gefährdet markieren", channel:"Push / SMS", on:true},
      {name:"Reaktivierung", trigger:"21 Tage ohne Check-in", action:"»Wir vermissen dich« → Rückhol-Angebot", channel:"E-Mail / SMS", on:true},
      {name:"Gürtelprüfung", trigger:"Prüfungsreife erreicht", action:"Automatische Einladung an Eltern", channel:"E-Mail / Push", on:false},
      {name:"Geburtstag", trigger:"Geburtstag des Kindes", action:"Glückwunsch + kleines Loyalty-Element", channel:"E-Mail / Push", on:true},
      {name:"Bewertung & Empfehlung", trigger:"Nach Gürtelbeförderung", action:"Google-Review-Anfrage + Referral", channel:"E-Mail / SMS", on:false},
      {name:"Zahlungserinnerung", trigger:"Rücklastschrift", action:"Gestaffelte Sequenz; Stufe 4 → Mensch", channel:"E-Mail / SMS", on:true},
      {name:"24-Monats-Moment", trigger:"Vertrag wird monatlich kündbar", action:"Danke-Nachricht + Treueangebot statt Stillschweigen", channel:"E-Mail / App", on:true},
    ],
    retention:[
      { id:"R1", loc:"München", name:"Familie Yilmaz", who:"Deniz (9) · München", score:82,
        reasons:["Nur noch 1× in 3 Wochen (vorher 2×/Woche)","Rücklastschrift offen (49,90 €)"],
        action:"Anrufen + Ratenzahlung anbieten",
        draft:"Hallo Frau Yilmaz,\n\nuns ist aufgefallen, dass Deniz in den letzten Wochen seltener beim Training war — wir vermissen ihn! Falls gerade etwas dazwischenkommt (Schule, Gesundheit, Finanzen): Melden Sie sich gern, wir finden immer eine Lösung — z. B. eine kurze Pause oder Ratenzahlung.\n\nViele Grüße\nNFT Gym München", status:"offen" },
      { id:"R2", loc:"Krefeld", name:"Lena K.", who:"Teen (15) · Krefeld", score:74,
        reasons:["21 Tage ohne Check-in","App seit 4 Wochen nicht geöffnet"],
        action:"Ruhigeren Slot vorschlagen (Do 17:00)",
        draft:"Hallo Lena,\n\nwir vermissen dich beim Training! Donnerstag 17:00 ist gerade eine kleine, entspannte Gruppe — perfekt zum Wiedereinstieg. Sollen wir dir den Platz freihalten?\n\nDein NFT-Team Krefeld", status:"offen" },
      { id:"R3", loc:"Köln", name:"Ali R.", who:"Erwachsen (29) · Köln", score:68,
        reasons:["Pausiert seit 6 Wochen","Pause endet in 5 Tagen"],
        action:"Comeback-Angebot senden",
        draft:"Hallo Ali,\n\ndeine Pause endet am Montag — starke Entscheidung, wieder einzusteigen! Für deinen Restart schenken wir dir ein Personal-Warm-up mit Trainer Sven in deiner ersten Woche.\n\nBis Montag?\nNFT Gym Köln", status:"offen" },
      { id:"R4", loc:"Krefeld", name:"Familie Brandt", who:"Emma (7) · Krefeld", score:61,
        reasons:["Kein Gürtel-Fortschritt seit 5 Monaten (Plateau)","Anwesenheit stabil, aber Feedback-Quote niedrig"],
        action:"Trainer-Gespräch + Ziel setzen (kein Auto-Versand)",
        draft:"⚠️ Plateau-Fall — bitte persönlich ansprechen: Kurzes Eltern-Gespräch nach dem Kurs, gemeinsames Ziel für Emma setzen (z. B. nächster Stripe in 4 Wochen).", status:"offen" },
    ],
    health:[
      { city:"Krefeld", score:86, trend:"+3", drivers:{ Umsatz:90, Retention:84, Auslastung:84, Leads:88, Zahlungen:72 } },
      { city:"Mönchengladbach", score:78, trend:"+1", drivers:{ Umsatz:80, Retention:79, Auslastung:75, Leads:82, Zahlungen:74 } },
      { city:"Köln", score:71, trend:"-6", drivers:{ Umsatz:74, Retention:62, Auslastung:91, Leads:71, Zahlungen:58 } },
      { city:"München", score:64, trend:"-2", drivers:{ Umsatz:66, Retention:58, Auslastung:76, Leads:65, Zahlungen:55 } },
    ],
    pruefung:{
      courseId:"K2", title:"Gürtelprüfung · Gelbgurt", when:"Heute, 16:00 · Krefeld",
      criteria:["Grundstellung","Jab-Cross-Kombination","Lowkick","Deckung","Mattenregeln / Respekt"],
      candidates:[ {name:"Emir A.", ready:true}, {name:"Sara K.", ready:true}, {name:"Nora B.", ready:false} ],
    },
    briefing:{
      K2:[
        { name:"Leo M.", type:"Probetraining", note:"Erster Besuch — eher schüchtern, Mama bleibt beim ersten Mal dabei." },
        { name:"Milan T.", type:"Rückkehrer", note:"3 Wochen krank gewesen — bitte sanft wieder einsteigen lassen." },
        { name:"Emir A.", type:"Prüfungsnah", note:"Noch ~6 Einheiten bis zur Gelbgurt-Prüfung — Fokus Deckung." },
      ],
    },
    feedback:{
      pulse:{ score:"4,4", trend:"+0,2", n:213 },
      nps:{ value:62, promoters:71, passives:20, detractors:9 },
      kioskHeat:{
        days:["Mo","Di","Mi","Do","Fr"],
        rows:[
          { time:"16:00", cells:["gut","mittel","gut","gut","gut"] },
          { time:"17:00", cells:["mittel","schlecht","gut","mittel","gut"] },
          { time:"18:00", cells:["mittel","schlecht","mittel","mittel","gut"] },
          { time:"19:00", cells:["gut","mittel","mittel","gut","gut"] },
        ],
      },
      detractors:[
        { name:"Familie K.", loc:"Köln", signal:"Puls 😞 + Kommentar", text:"Die Umkleiden waren zweimal hintereinander schmutzig.", when:"gestern", status:"offen",
          draft:"Hallo Familie K.,\n\ndanke für die ehrliche Rückmeldung — das entspricht nicht unserem Anspruch. Wir haben die Reinigung ab sofort auf zweimal täglich umgestellt und prüfen das eine Woche lang persönlich. Schauen Sie gern kommende Woche nochmal kritisch hin?\n\nViele Grüße\nNFT Gym Köln" },
        { name:"Anonym (Kiosk)", loc:"Krefeld", signal:"NPS 4 · Di 17:00", text:"Dienstags viel zu voll, der Trainer hat kaum Zeit für die Kinder.", when:"vor 2 Tagen", status:"offen",
          draft:"⚠️ Anonymes Feedback — keine Antwort möglich. Empfohlene Maßnahme: Dienstag 17:00 entzerren (Auslastungs-Empfehlung an passende Eltern senden) + zweiten Trainer prüfen." },
      ],
    },
    briefing_today:[
      { ico:"💶", t:"3 Rücklastschriften bearbeiten (429,60 €)", href:"#/crm/zahlungen" },
      { ico:"🥋", t:"Gürtelprüfung Gelbgurt heute 16:00 — 3 Kandidaten", href:"#/trainer/pruefung" },
      { ico:"📉", t:"4 Retention-Fälle offen — höchster Score 82", href:"#/crm/retention" },
      { ico:"📞", t:"3 verpasste Anrufe von gestern nachfassen", href:"#/crm/dashboard" },
      { ico:"😐", t:"Kiosk-Stimmung Di 17:00 erneut schwach — Slot entzerren", href:"#/crm/feedback" },
    ],
    digest:{
      week:"KW 27",
      highlights:[ "Trial-Conversion Krefeld auf 62 % gestiegen (best of Franchise)", "Prüfungswoche: 34 Kinder befördert, Review-Journey brachte 12 neue Google-Bewertungen (Ø 4,9)" ],
      risks:[ "Köln: Rücklastschriften-Häufung (5 Fälle) + Retention-Score im Sinkflug — Standortleiter-Gespräch empfohlen", "Di-17:00-Slots franchiseweit über 90 % — Stimmung im Kiosk-Voting messbar schlechter" ],
      decisions:[ "Family-Tarif-Rollout auf alle Standorte freigeben? (Pilot Krefeld: +11 % Geschwister-Konversion)", "Zweiter Trainer für Di-Stoßzeit Köln/Krefeld (ca. 1.400 €/Monat)" ],
    },
    launch:{
      city:"Duisburg", nr:11, open:"1. Oktober 2026",
      presale:{ leads:412, members:63, goal:100 },
      phases:[
        { name:"Standort & Vertrag", items:[ {t:"Mietvertrag unterschrieben",done:true},{t:"Umbau beauftragt (Matten, Käfig, Umkleiden)",done:true},{t:"Behörden-Anmeldungen komplett",done:true} ] },
        { name:"Team", items:[ {t:"Standortleiter eingestellt (Yusuf D.)",done:true},{t:"Trainer 2 von 4 eingestellt",done:false},{t:"Quali-Register vollständig (Führungszeugnisse)",done:false} ] },
        { name:"Pre-Sale", items:[ {t:"Landingpage live · 412 Leads",done:true},{t:"63 Gründungsmitglieder (Ziel 100)",done:false},{t:"Eröffnungs-Event geplant",done:false} ] },
        { name:"Go-Live", items:[ {t:"Kurse & Trainer im System angelegt",done:false},{t:"Chips & Kiosk-Hardware geliefert",done:false},{t:"Soft-Opening-Woche",done:false} ] },
      ],
    },
    decisions:[
      { id:"D1", ico:"💶", title:"Kulanz: 3 Monatsbeiträge stunden (267 €)", detail:"Familie Weber, Krefeld — Vater vorübergehend arbeitslos, Familie will unbedingt bleiben. Standortleiter empfiehlt Stundung statt Kündigung.", from:"Standortleiter Krefeld", status:"offen" },
      { id:"D2", ico:"🏷️", title:"Family-Tarif auf alle Standorte ausrollen", detail:"Pilot Krefeld: +11 % Geschwister-Konversion. Erwarteter Effekt: +4.200 € MRR franchiseweit.", from:"Franchise-Zentrale", status:"offen" },
      { id:"D3", ico:"🧑‍🏫", title:"Zweiter Trainer für Di-Stoßzeit Köln (1.400 €/Monat)", detail:"Kiosk-Stimmung und Auslastung sprechen dafür; Deckungsbeitrag bleibt positiv ab 12 zusätzlichen Mitgliedern.", from:"Standortleiter Köln", status:"offen" },
    ],
    anomalies:[
      { ico:"📉", sev:"amber", t:"Check-ins Köln −18 % vs. Vorwoche", d:"Vermutlich Klausurphase — Reaktivierungs-Push liegt als Entwurf bereit." },
      { ico:"💶", sev:"red", t:"Rücklastschriften München 3× über Schnitt", d:"Muster erkannt: alle Fälle nach der Tarif-Preisanpassung vom 15.06." },
      { ico:"🕐", sev:"amber", t:"»Ringen Mi 18:00« Bochum: 4. Woche in Folge unter 50 %", d:"Vorschlag: Slot testweise auf 17:00 verschieben." },
    ],
    goals:{ month:"Juli", items:[
      { t:"Probetrainings", cur:34, goal:50 },
      { t:"Neue Verträge", cur:19, goal:30 },
      { t:"Google-Bewertungen", cur:12, goal:15 },
    ]},
    trainers:[
      { name:"Mehmet K.", loc:"Krefeld", rolle:"Head-Coach Kids", lizenz:"Trainer-B · bis 03/2028", eh:"Erste Hilfe · bis 05/2027", fz:"Führungszeugnis · bis 11/2026", status:"ok", kids:true },
      { name:"Lena S.", loc:"Krefeld", rolle:"BJJ Kids", lizenz:"Trainer-C · bis 09/2027", eh:"Erste Hilfe · bis 08/2026", fz:"Führungszeugnis · bis 02/2027", status:"warn", warnNote:"Erste Hilfe läuft in 5 Wochen ab", kids:true },
      { name:"Sven B.", loc:"Köln", rolle:"MMA (nur Erwachsene)", lizenz:"Trainer-B · bis 06/2027", eh:"Erste Hilfe · bis 01/2027", fz:"— (kein Kinderkurs)", status:"ok", kids:false },
      { name:"Ali T.", loc:"Köln", rolle:"Kids Kickboxen", lizenz:"Trainer-C · bis 04/2027", eh:"Erste Hilfe · bis 03/2027", fz:"Führungszeugnis · ABGELAUFEN 06/2026", status:"block", warnNote:"Für Kinderkurse gesperrt, bis erneuertes Führungszeugnis vorliegt", kids:true },
    ],
    ferien:[
      { land:"NRW", zeit:"14.07.–26.08.2026", inTagen:12 },
      { land:"Bayern (München)", zeit:"28.07.–15.09.2026", inTagen:26 },
    ],
    upsell:[
      { id:"U1", loc:"Krefeld", familie:"Familie A.", typ:"Familien-Bundle", insight:"Emir (Kids Premium 89 €) + Sara (Kids Standard 49 €) = 138 €/Monat auf zwei Einzelverträgen.",
        calc:"Family-Tarif 119 €/Monat → Familie spart 19 €, NFT bindet beide Kinder länger.",
        draft:"Hallo Frau A.,\n\nweil Emir und Sara beide bei uns trainieren, lohnt sich unser Family-Tarif: 119 € statt 138 € im Monat — gleiche Kurse, 19 € gespart.\n\nSoll ich umstellen? Ein Tippen in Ihrer App genügt.\n\nViele Grüße\nNFT Gym Krefeld", status:"offen" },
      { id:"U2", loc:"Köln", familie:"Marco S.", typ:"Tarif-Upgrade", insight:"Trainiert seit 6 Wochen 3×/Woche auf dem 2×-Tarif (79 €).",
        calc:"Unlimited 99 €: pro Einheit günstiger für ihn, +20 € MRR für NFT.",
        draft:"Hallo Marco,\n\ndu warst zuletzt fast jede Woche 3× auf der Matte — stark! Mit Unlimited (99 €) trainierst du so oft du willst und fährst pro Einheit günstiger.\n\nSollen wir wechseln?\n\nDein NFT-Team Köln", status:"offen" },
      { id:"U3", loc:"Krefeld", familie:"Familie Öztürk", typ:"Geschwister-Radar", insight:"Kleine Schwester Elif (5) schaut seit Wochen bei jedem Training von Kaan zu — noch kein Vertrag.",
        calc:"Mini-Kids-Probetraining + 20 % Geschwisterrabatt → Potenzial +39 € MRR, Familie bindet sich doppelt.",
        draft:"Hallo Familie Öztürk,\n\nuns ist aufgefallen, dass Elif beim Training von Kaan immer begeistert zuschaut. Möchte sie unsere Mini-Kids (3–5) kostenlos ausprobieren? Als Geschwisterkind gibt es 20 % Rabatt.\n\nViele Grüße\nNFT Gym Krefeld", status:"offen" },
      { id:"U4", loc:"Bochum", familie:"Jonas P.", typ:"Add-on", insight:"Bucht Open-Mat-Termine als Einzeltickets (3× im letzten Monat).",
        calc:"Open-Mat-Flat 15 €/Monat statt 3× 8 € Einzeltickets — günstiger für ihn ab Besuch 2.",
        draft:"Hallo Jonas,\n\nmit der Open-Mat-Flat (15 €/Monat) sparst du gegenüber Einzeltickets schon ab dem zweiten Besuch. Soll ich sie dir freischalten?\n\nNFT Gym Bochum", status:"offen" },
    ],
    calls:[
      { id:"C1", time:"16:42", num:"+49 176 555 01 23", loc:"Krefeld", auto:"SMS mit Buchungslink automatisch gesendet", status:"offen" },
      { id:"C2", time:"17:15", num:"+49 152 888 44 55", loc:"Krefeld", auto:"SMS mit Buchungslink automatisch gesendet", status:"offen" },
      { id:"C3", time:"18:03", num:"+49 171 222 99 00", loc:"Köln", auto:"Bekannter Kontakt (Familie K.) → Rückruf-Aufgabe erstellt", status:"offen" },
    ],
    support:{
      stats:{ heute:24, autoKI:17, freigabe:4, mensch:3, zeit:"28 Sek" },
      items:[
        { id:"S1", ch:"whatsapp", who:"+49 172 … (Sandra M.)", topic:"Öffnungszeiten Samstag?", time:"vor 2 Min",
          msgs:[["in","Hi! Habt ihr samstags eigentlich offen?"]],
          ai:"Hallo! 👋 Ja — samstags 10–14 Uhr (NFT Krefeld). Kommt gern vorbei! Und falls ihr mögt: kostenloses Probetraining direkt hier buchen → nft-gym.de/probetraining",
          status:"auto", note:"FAQ erkannt (Öffnungszeiten) → von der KI automatisch beantwortet, 12 Sek nach Eingang" },
        { id:"S2", ch:"phone", who:"Anruf · +49 151 234 88 90", topic:"KI-Telefonassistent · Probetraining", time:"vor 14 Min",
          msgs:[["in","(Transkript) Ja hallo, ich wollte fragen, ob mein Sohn — der ist 6 — mal zum Probetraining kommen kann?"],
                ["out","(KI-Assistent) Sehr gern! Für 6-Jährige passt unser Kids-Kickboxen perfekt. Ich habe zwei ruhige Einstiegstermine: Mittwoch 16:00 oder Freitag 15:30 — was passt Ihnen besser?"],
                ["in","Mittwoch wäre gut."],
                ["out","Perfekt — Mittwoch 16:00 ist für Sie reserviert! Sie bekommen sofort eine SMS mit allen Infos und der Was-mitbringen-Liste. Bis Mittwoch! 🥋"]],
          ai:null, status:"done", note:"Anruf von KI angenommen → Termin gebucht ✓ · Lead angelegt · Bestätigungs-SMS gesendet" },
        { id:"S3", ch:"whatsapp", who:"Nicole A. (Mitglied)", topic:"Emir kommt 10 Min später", time:"vor 26 Min",
          msgs:[["in","Hallo! Emir kommt heute ca. 10 Minuten später zum Training, ok? 🙈"]],
          ai:"Kein Problem, Frau A. — ich sage Trainer Mehmet Bescheid. Bis gleich! 🥊",
          status:"freigabe", note:"Bestandskundin erkannt → KI-Entwurf wartet auf Freigabe (Trainer-Info wird bei Versand automatisch erstellt)" },
        { id:"S4", ch:"phone", who:"Voicemail · +49 160 555 12 03", topic:"Abbuchung unklar (M. Schulz)", time:"vor 1 Std",
          msgs:[["in","(Transkript) Guten Tag, hier ist Herr Schulz. Bei der letzten Abbuchung stimmt etwas nicht — da wurden 10 Euro mehr abgebucht. Bitte um Rückruf."]],
          ai:"⚠️ Zahlungsthema erkannt — bewusst KEINE automatische Antwort. Rückruf-Aufgabe mit Konto-Kontext erstellt (Kunden-360: Rücklastschrift-Historie liegt bei).",
          status:"mensch", note:"Sensible Kategorie (Zahlung) → an Mensch eskaliert · mit Aufgabe im Board verknüpft" },
        { id:"S5", ch:"whatsapp", who:"+49 157 333 22 11 (unbekannt)", topic:"Preis-Anfrage Kickboxen", time:"vor 2 Std",
          msgs:[["in","Hi, was kostet Kickboxen für meinen Sohn? Er ist 8."]],
          ai:"Hallo! Kids-Tarife starten bei 49 €/Monat. Am besten erlebt Ihr Sohn es kostenlos beim Probetraining — hier direkt buchen: nft-gym.de/probetraining 🥋",
          status:"auto", note:"FAQ erkannt (Preise) → automatisch beantwortet · unbekannte Nummer → Lead-Karte angelegt" },
        { id:"S6", ch:"phone", who:"Anruf verpasst · +49 176 555 01 23", topic:"Auto-SMS gesendet", time:"16:42",
          msgs:[["in","(kein Gespräch — Anruf ging ins Leere, alle auf der Matte)"]],
          ai:"SMS gesendet: »Sorry, wir waren gerade auf der Matte! 🥋 Probetraining direkt buchen: nft-gym.de/probetraining — oder wir rufen zurück.«",
          status:"auto", note:"Verpasster Anruf → Auto-SMS in 20 Sek + Rückruf-Task erstellt" },
      ],
    },
    tasks:[
      { id:"T1", t:"Detraktor Familie K. zurückrufen", src:"Feedback", sla:"heute 14:00", late:false, status:"offen" },
      { id:"T2", t:"Mahnstufe 4: M. Schulz persönlich kontaktieren", src:"Zahlungen", sla:"überfällig seit 2 Std", late:true, status:"offen" },
      { id:"T3", t:"Rückruf +49 171 222 99 00 (Familie K.)", src:"Verpasster Anruf", sla:"heute 18:00", late:false, status:"in" },
      { id:"T4", t:"Ersatz-Chip für Lena K. ausgeben", src:"Rezeption", sla:"diese Woche", late:false, status:"offen" },
      { id:"T5", t:"Probetraining-Feedback an Familie Yildiz", src:"Leads", sla:"erledigt 11:20", late:false, status:"done" },
    ],
    trainerStats:{ retention:"92 %", puls:"4,6", feedback:"81 %", vergleich:"Ø Standort: 87 % · 4,3 · 64 %" },
    vertretung:{ kurs:"Kids Kickboxen 6–9", when:"Morgen 16:00", loc:"Krefeld", reason:"Mehmet krankgemeldet", asked:["Lena S.","Kai B."], status:"angefragt" },
    zeiten:[
      { name:"Laura B. (Rezeption)", plan:"14:00–21:00", in:"13:45", out:"–", week:"32,5 Std" },
      { name:"Mehmet K. (Trainer)", plan:"15:30–20:30", in:"–", out:"–", week:"28,0 Std" },
      { name:"Lena S. (Trainer)", plan:"15:00–19:00", in:"–", out:"–", week:"24,5 Std" },
    ],
    pnl:[
      { city:"Krefeld", umsatz:"19.800 €", personal:"7.400 €", miete:"3.400 €", sonst:"1.600 €", db:"+7.400 €", pct:37, ok:true },
      { city:"Köln", umsatz:"21.400 €", personal:"8.800 €", miete:"4.800 €", sonst:"1.900 €", db:"+5.900 €", pct:28, ok:true },
      { city:"Mönchengladbach", umsatz:"15.200 €", personal:"6.200 €", miete:"2.700 €", sonst:"1.400 €", db:"+4.900 €", pct:32, ok:true },
      { city:"München", umsatz:"12.600 €", personal:"6.600 €", miete:"4.700 €", sonst:"1.400 €", db:"−100 €", pct:-1, ok:false },
    ],
    selfservice:{ quote:68, ziel:70, items:[
      ["Bescheinigungen",100],["Adressänderungen",90],["Pausen & Ferienmodus",85],["Umbuchungen",60],["Zahlart-Wechsel",55],
    ]},
    permissions:{
      modules:["Dashboard","Leads","Mitglieder","Kurse","Auslastung","Check-ins","Kommunikation","Verträge","Zahlungen","Automationen","Reports","Rollen/Rechte"],
      roles:{
        "Geschäftsführung":   [1,1,1,1,1,1,1,1,1,1,1,1],
        "Standortleiter":     [1,1,1,1,1,1,1,1,1,1,0,0],
        "Rezeption / Sales":  [1,1,1,1,0,1,1,1,1,0,0,0],
        "Trainer":            [0,0,0,1,0,1,0,0,0,0,0,0],
      },
    },
  },
};
