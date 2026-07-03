/* ===========================================================
   NFT GYM — Clickable Prototype (SPA, vanilla JS, no backend)
   Marketing website + Customer app in one PWA codebase.
   =========================================================== */
(function(){
  const D = window.DATA;
  const app = document.getElementById('app');
  D.kids.forEach(k=>{ if(!k.feedbackLog) k.feedbackLog = []; });

  /* ---------- SVG icon system (single-color, currentColor) ---------- */
  const ICON_PATHS = {
    home:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
    calendar:'<rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/>',
    chart:'<path d="M3 21h18"/><path d="M7 21V9M12 21V4M17 21v-8"/>',
    message:'<path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.6"/>',
    users:'<circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-3.5 3-5.5 7-5.5s7 2 7 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/>',
    trending:'<path d="M3 17l6-6 4 4 7-7"/><path d="M17 8h4v4"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    monitor:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    file:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h5"/>',
    euro:'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5a4 4 0 1 0 0 7"/><path d="M7 11h6M7 13.5h6"/>',
    zap:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    bars:'<path d="M3 21h18"/><rect x="6" y="10" width="3.2" height="8"/><rect x="14.8" y="6" width="3.2" height="12"/>',
    shield:'<path d="M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6z"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.2-4.2"/>',
    bell:'<path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5 2 6H4c.5-1 2-2 2-6"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    x:'<path d="M6 6l12 12M18 6L6 18"/>',
    menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',
    cart:'<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.5 12.6a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L22 7H6"/>',
    activity:'<path d="M3 12h4l3 8 4-16 3 8h4"/>',
    logout:'<path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4"/><path d="M10 12h10M17 8l4 4-4 4"/>',
    play:'<circle cx="12" cy="12" r="9"/><path d="M10 8l6 4-6 4z" fill="currentColor"/>',
    headset:'<path d="M4 14a8 8 0 0 1 16 0"/><rect x="3" y="14" width="4" height="6" rx="2"/><rect x="17" y="14" width="4" height="6" rx="2"/><path d="M21 18v1a3 3 0 0 1-3 3h-4"/>',
  };
  function ICON(name){ const p=ICON_PATHS[name]||''; return `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`; }
  window.ICON = ICON;

  /* ===========================================================
     I18N — Deutsch / Türkçe / العربية (Demo: Kernbereiche)
     =========================================================== */
  const T = {
    de:{ name:"Deutsch",
      nav_home:"Home", nav_loc:"Standorte", nav_kids:"Kinder", nav_adults:"Erwachsene", nav_finder:"Kursfinder", nav_faq:"FAQ",
      login:"Login", cta_trial:"Probetraining buchen",
      hero_title:'Kampfsport<br>für die ganze<br><span style="color:var(--red)">Familie</span>',
      hero_lead:"Finde den passenden Kurs, sieh ruhige Trainingszeiten und buche dein kostenloses Probetraining direkt online — für Kinder ab 3, Jugendliche und Erwachsene.",
      cta_free:"Kostenloses Probetraining", cta_plan:"Kursplan ansehen",
      f_training:"Training", f_service:"Service", f_legal:"Rechtliches",
      to_app:"Zur Mitglieder-App", bot_btn:"Fragen?",
      tab_home:"Home", tab_courses:"Kurse", tab_occ:"Auslastung", tab_msgs:"Nachrichten", tab_account:"Konto",
      today:"Heute", welcome:"Willkommen zurück", lang_label:"Sprache",
      nav_prices:"Preise", tab_progress:"Fortschritt",
      tb_members:"Mitglieder", tb_locations:"Standorte", tb_rating:"Google-Bewertung",
      safe_k:"Sicher aufgehoben", safe_t:"Vertrauen, das Eltern spüren",
      safe1_t:"Geprüfte Trainer", safe1_d:"Lizenz, Erste-Hilfe & erweitertes Führungszeugnis — Pflicht für jeden Kinderkurs.",
      safe2_t:"Kleine Gruppen", safe2_d:"Altersgerechte Gruppen mit genug Aufmerksamkeit für jedes Kind.",
      safe3_t:"Check-in/out-Push", safe3_d:"Du bekommst eine Nachricht, sobald dein Kind ankommt und wieder geht.",
      safe4_t:"Ohne Risiko starten", safe4_d:"Kostenloses Probetraining, faire Verträge, jederzeit online kündbar.",
      price_k:"Faire Preise", price_t:"Transparente Tarife", price_note:"Geschwister- & Family-Rabatte · Probetraining immer kostenlos",
      price_kids:"Kinder", price_ad:"Erwachsene", price_fam:"Family", price_mo:"/ Monat", price_cta:"Alle Tarife ansehen",
      pk1:"Alle Kids-Kurse", pk2:"Fortschritt in der App", pk3:"Check-in/out-Push",
      pa1:"Kickboxen, Boxen, MMA & BJJ", pa2:"Ruhige Zeiten in der App", pa3:"Faire, kurze Verträge",
      pf1:"Zwei oder mehr Kinder", pf2:"Bester Preis pro Kind", pf3:"Eine Rechnung, eine App",
      obj_k:"Häufige Fragen", obj_t:"Ist das was für uns?",
      obj1_q:"Ist mein Kind zu klein?", obj1_a:"Wir starten ab 3 Jahren — spielerisch, mit viel Bewegung und klaren Regeln.",
      obj2_q:"Ich bin totaler Anfänger.", obj2_a:"Die meisten sind es. Du startest in einer Einsteigergruppe in deinem Tempo.",
      obj3_q:"Ist Kampfsport nicht gefährlich?", obj3_a:"Sicherheit zuerst: kontrollierte Technik, Schutzausrüstung, kein Zwang zum Sparring.",
      obj_cta:"Alle Fragen ansehen",
      reassure_free:"100 % kostenlos & unverbindlich — keine Kündigung nötig",
      partialNote:"" },
    tr:{ name:"Türkçe",
      nav_home:"Ana Sayfa", nav_loc:"Şubeler", nav_kids:"Çocuklar", nav_adults:"Yetişkinler", nav_finder:"Kurs Bul", nav_faq:"SSS",
      login:"Giriş", cta_trial:"Deneme dersi ayırt",
      hero_title:'Tüm aile için<br><span style="color:var(--red)">dövüş sporu</span>',
      hero_lead:"Uygun kursu bul, sakin antrenman saatlerini gör ve ücretsiz deneme dersini hemen online ayırt — 3 yaşından itibaren çocuklar, gençler ve yetişkinler için.",
      cta_free:"Ücretsiz deneme dersi", cta_plan:"Ders programı",
      f_training:"Antrenman", f_service:"Hizmet", f_legal:"Yasal",
      to_app:"Üye Uygulaması", bot_btn:"Sorular?",
      tab_home:"Ana Sayfa", tab_courses:"Dersler", tab_occ:"Doluluk", tab_msgs:"Mesajlar", tab_account:"Hesap",
      today:"Bugün", welcome:"Tekrar hoş geldin", lang_label:"Dil",
      nav_prices:"Fiyatlar", tab_progress:"Gelişim",
      tb_members:"Üye", tb_locations:"Şube", tb_rating:"Google puanı",
      safe_k:"Güvende", safe_t:"Ebeveynlerin hissettiği güven",
      safe1_t:"Denetimli antrenörler", safe1_d:"Lisans, ilk yardım ve genişletilmiş sabıka kaydı — her çocuk kursu için zorunlu.",
      safe2_t:"Küçük gruplar", safe2_d:"Her çocuğa yeterli ilgiyi gösteren yaşa uygun gruplar.",
      safe3_t:"Giriş/çıkış bildirimi", safe3_d:"Çocuğunuz geldiğinde ve ayrıldığında anında bildirim alırsınız.",
      safe4_t:"Risksiz başlayın", safe4_d:"Ücretsiz deneme dersi, adil sözleşmeler, istediğiniz zaman online iptal.",
      price_k:"Adil fiyatlar", price_t:"Şeffaf tarifeler", price_note:"Kardeş ve aile indirimleri · deneme dersi her zaman ücretsiz",
      price_kids:"Çocuklar", price_ad:"Yetişkinler", price_fam:"Aile", price_mo:"/ ay", price_cta:"Tüm tarifeleri gör",
      pk1:"Tüm çocuk kursları", pk2:"Uygulamada gelişim", pk3:"Giriş/çıkış bildirimi",
      pa1:"Kickboks, boks, MMA ve BJJ", pa2:"Uygulamada sakin saatler", pa3:"Adil, kısa sözleşmeler",
      pf1:"İki veya daha fazla çocuk", pf2:"Çocuk başına en iyi fiyat", pf3:"Tek fatura, tek uygulama",
      obj_k:"Sık sorulanlar", obj_t:"Bize uygun mu?",
      obj1_q:"Çocuğum çok mu küçük?", obj1_a:"3 yaşından itibaren başlıyoruz — oyunla, bol hareketle ve net kurallarla.",
      obj2_q:"Ben tam bir acemiyim.", obj2_a:"Çoğu kişi öyle. Kendi temponuzda bir başlangıç grubunda başlarsınız.",
      obj3_q:"Dövüş sporu tehlikeli değil mi?", obj3_a:"Önce güvenlik: kontrollü teknik, koruyucu ekipman, zorunlu olmayan sparring.",
      obj_cta:"Tüm soruları gör",
      reassure_free:"%100 ücretsiz ve taahhütsüz — iptal gerekmez",
      partialNote:"🌐 Demo: Ana alanlar Türkçe — tam çeviri V1 ile geliyor. Sorularınız için WhatsApp üzerinden Türkçe destek veriyoruz." },
    ar:{ name:"العربية",
      nav_home:"الرئيسية", nav_loc:"الفروع", nav_kids:"الأطفال", nav_adults:"البالغون", nav_finder:"ابحث عن كورس", nav_faq:"الأسئلة",
      login:"تسجيل الدخول", cta_trial:"احجز حصة تجريبية",
      hero_title:'رياضة قتالية<br><span style="color:var(--red)">لكل العائلة</span>',
      hero_lead:"اعثر على الكورس المناسب، شاهد الأوقات الهادئة واحجز حصة تجريبية مجانية أونلاين — للأطفال من 3 سنوات وللشباب والبالغين.",
      cta_free:"حصة تجريبية مجانية", cta_plan:"جدول الحصص",
      f_training:"التدريب", f_service:"الخدمات", f_legal:"قانوني",
      to_app:"تطبيق الأعضاء", bot_btn:"أسئلة؟",
      tab_home:"الرئيسية", tab_courses:"الحصص", tab_occ:"الازدحام", tab_msgs:"الرسائل", tab_account:"حسابي",
      today:"اليوم", welcome:"أهلاً بعودتك", lang_label:"اللغة",
      nav_prices:"الأسعار", tab_progress:"التقدّم",
      tb_members:"عضو", tb_locations:"فرع", tb_rating:"تقييم جوجل",
      safe_k:"في أمان", safe_t:"ثقة يشعر بها الأهل",
      safe1_t:"مدرّبون معتمدون", safe1_d:"رخصة وإسعافات أولية وشهادة حسن سيرة موسّعة — إلزامية لكل صفوف الأطفال.",
      safe2_t:"مجموعات صغيرة", safe2_d:"مجموعات مناسبة للعمر باهتمام كافٍ لكل طفل.",
      safe3_t:"إشعار الدخول/الخروج", safe3_d:"تصلك رسالة فور وصول طفلك ومغادرته.",
      safe4_t:"ابدأ بلا مخاطرة", safe4_d:"حصة تجريبية مجانية، عقود عادلة، وإلغاء أونلاين في أي وقت.",
      price_k:"أسعار عادلة", price_t:"باقات شفافة", price_note:"خصومات الإخوة والعائلة · الحصة التجريبية مجانية دائماً",
      price_kids:"الأطفال", price_ad:"البالغون", price_fam:"العائلة", price_mo:"/ شهرياً", price_cta:"عرض كل الباقات",
      pk1:"كل حصص الأطفال", pk2:"التقدّم في التطبيق", pk3:"إشعار الدخول/الخروج",
      pa1:"كيك بوكسينغ، ملاكمة، MMA وBJJ", pa2:"الأوقات الهادئة في التطبيق", pa3:"عقود عادلة وقصيرة",
      pf1:"طفلان أو أكثر", pf2:"أفضل سعر لكل طفل", pf3:"فاتورة واحدة وتطبيق واحد",
      obj_k:"أسئلة شائعة", obj_t:"هل يناسبنا؟",
      obj1_q:"هل طفلي صغير جداً؟", obj1_a:"نبدأ من عمر 3 سنوات — باللعب والكثير من الحركة وقواعد واضحة.",
      obj2_q:"أنا مبتدئ تماماً.", obj2_a:"معظم الناس كذلك. تبدأ في مجموعة للمبتدئين وبإيقاعك الخاص.",
      obj3_q:"أليست رياضة القتال خطيرة؟", obj3_a:"السلامة أولاً: تقنية مضبوطة، معدات واقية، ولا إجبار على السبارينغ.",
      obj_cta:"عرض كل الأسئلة",
      reassure_free:"مجاني 100% وبدون التزام — لا حاجة لأي إلغاء",
      partialNote:"🌐 نسخة تجريبية: الأقسام الأساسية بالعربية — الترجمة الكاملة في الإصدار الأول. ندعمكم بالعربية عبر واتساب." },
  };
  let lang = 'de';
  try{ lang = localStorage.getItem('nftLang') || 'de'; }catch(e){}
  if(!T[lang]) lang = 'de';
  const t = k => (T[lang] && T[lang][k] !== undefined ? T[lang][k] : T.de[k]) || k;
  function applyLangAttrs(){
    document.documentElement.lang = lang;
    document.documentElement.dir = lang==='ar' ? 'rtl' : 'ltr';
  }
  function setLang(l){
    if(!T[l]) return;
    lang = l;
    try{ localStorage.setItem('nftLang', l); }catch(e){}
    applyLangAttrs();
    render();
  }
  const langSelect = cls => `<select class="lang-select ${cls||''}" data-action="lang" aria-label="${t('lang_label')}">
    ${Object.keys(T).map(k=>`<option value="${k}"${k===lang?' selected':''}>${T[k].name}</option>`).join('')}</select>`;
  const langNote = () => lang!=='de' ? `<div class="lang-note">${t('partialNote')}</div>` : '';

  /* ---------- theme: dark / light ---------- */
  let theme = 'dark';
  try{ theme = localStorage.getItem('nftTheme') || ((window.matchMedia && matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark'); }catch(e){}
  if(theme!=='light') theme = 'dark';
  function applyTheme(){
    document.documentElement.setAttribute('data-theme', theme);
    const mc = document.querySelector('meta[name="theme-color"]'); if(mc) mc.setAttribute('content', theme==='light'?'#ffffff':'#0c0c0e');
  }
  function setTheme(tm){ theme = tm==='light'?'light':'dark'; try{ localStorage.setItem('nftTheme', theme); }catch(e){} applyTheme(); render(); }
  const themeToggle = () => `<button type="button" class="icon-btn" data-action="theme" aria-label="Hell-/Dunkelmodus umschalten" title="${theme==='light'?'Dunkelmodus':'Hellmodus'}">${theme==='light'?'🌙':'☀️'}</button>`;
  window.__themeBtn = themeToggle;   // exposed so crm.js can render the same toggle

  /* ---------- shared state ---------- */
  let cart = [];
  let menuOpen = false;
  let prevHash = '';
  const readMsgs = new Set();
  const replies = {};
  const sickset = {};
  let ferienOn = false;
  let pulseVoted = 0;
  const docsDone = {};
  let ptSel = { trainer:null, slot:null, booked:false };
  let faqChat = [];
  let voucherCode = null;
  let campBooked = false;
  let siteBotOpen = false;
  let siteBotChat = [];
  const setup = { push:true, foto:true, kalender:false, partner:false };
  let finder = { who:null, age:null, goal:null, loc:null, shy:false, searched:false };
  let wiz = { step:0, who:null, age:null, loc:null, goal:null, slot:null, name:"", email:"" };
  let consent = { fotoEmir:true, fotoSara:false, marketing:true, whatsapp:false };
  let faqOpen = -1;
  let cancelDone = false;
  let saveFlow = { offer:null, done:false, showForm:false };
  let appKF = 'Alle';
  const waitset = {};

  const OCC = {
    ruhig:{l:"Ruhig",c:"occ-ruhig",h:"h-ruhig"},
    normal:{l:"Normal",c:"occ-normal",h:"h-normal"},
    voll:{l:"Voll",c:"occ-voll",h:"h-voll"},
    sehr:{l:"Sehr voll",c:"occ-sehr",h:"h-sehr"},
  };
  const occPill = o => `<span class="occ ${OCC[o].c}"><span class="dot"></span>${OCC[o].l}</span>`;
  const go = h => { location.hash = h; };

  /* ---------- toast ---------- */
  function toast(msg, undo){
    let t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = "position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:var(--inverse-bg);color:var(--inverse-ink);padding:12px 20px;border-radius:100px;font-weight:600;z-index:400;box-shadow:0 10px 30px rgba(0,0,0,.4);display:flex;align-items:center";
    if(undo){
      const u=document.createElement('button');
      u.className='toast-undo'; u.textContent='Rückgängig';
      u.addEventListener('click',()=>{ try{undo();}finally{t.remove();} });
      t.appendChild(u);
    }
    document.body.appendChild(t);
    const life = undo?4200:1400;
    setTimeout(()=>{t.style.transition="opacity .3s";t.style.opacity="0";},life);
    setTimeout(()=>t.remove(),life+400);
    const lr=document.getElementById('live-region'); if(lr) lr.textContent=msg;
  }
  const unreadCount = () => D.messages.filter((m,i)=>m.unread && !readMsgs.has(i)).length;

  /* ===========================================================
     MARKETING SHELL
     =========================================================== */
  const logo = `<a class="logo" href="#/"><span class="slash sm"><i></i><i></i></span> <span class="badge">NFT</span>
     <span style="display:flex;flex-direction:column;line-height:1"><span>GYM</span><small>NATIONAL FIGHTING TEAM</small></span></a>`;

  function siteShell(content, active){
    const link = (h,tx)=>`<a href="${h}" class="${active===h?'active':''}">${tx}</a>`;
    const H1 = {'#/kursfinder':'Kursfinder','#/probetraining':'Probetraining','#/preise':'Preise & Tarife','#/faq':'Häufige Fragen','#/events':'Events & Camps','#/shop':'Pro-Shop','#/empfehlen':'Freund werben','#/gutscheine':'Geschenk-Gutscheine','#/camp':'Feriencamp','#/kuendigen':'Vertrag kündigen','#/login':'Mitglieder-Login','#/impressum':'Impressum','#/datenschutz':'Datenschutz','#/agb':'AGB'};
    const srH1 = H1[active] ? `<h1 class="sr-only">${H1[active]} — NFT Gym</h1>` : '';
    return `<div class="site">
      <div class="nav"><div class="container nav-inner">
        ${logo}
        <div class="nav-links">
          ${link('#/',t('nav_home'))} ${link('#/standorte',t('nav_loc'))} ${link('#/kinder',t('nav_kids'))}
          ${link('#/erwachsene',t('nav_adults'))} ${link('#/preise',t('nav_prices'))} ${link('#/kursfinder',t('nav_finder'))} ${link('#/faq',t('nav_faq'))}
        </div>
        <div class="nav-cta">
          ${themeToggle()}
          ${langSelect('')}
          <a class="btn btn-dark btn-sm" href="#/login">${t('login')}</a>
          <a class="btn btn-primary btn-sm" href="#/probetraining">${t('cta_trial')}</a>
        </div>
        <button class="hamburger" data-action="menu" aria-expanded="${menuOpen}" aria-label="Menü">☰</button>
      </div></div>
      ${langNote()}
      ${menuOpen?`<div class="mnav" role="dialog" aria-label="Menü">
        <a href="#/">Home</a><a href="#/standorte">Standorte</a><a href="#/kinder">Kinder</a>
        <a href="#/erwachsene">Erwachsene</a><a href="#/preise">Preise</a><a href="#/kursfinder">Kursfinder</a><a href="#/events">Events</a>
        <a href="#/shop">Shop</a><a href="#/faq">FAQ</a>
        <div class="mnav-cta"><a class="btn btn-primary btn-block" href="#/probetraining">Probetraining buchen</a>
        <a class="btn btn-dark btn-block" href="#/login">Login</a></div>
      </div>`:''}
      <main id="main">${srH1}${content}</main>
      ${siteFooter()}
    </div>
    <button class="launch-app" data-action="goapp"><span class="slash sm"><i></i><i></i></span> ${t('to_app')}</button>
    <button class="sitebot-btn" data-action="sitebot-toggle" aria-expanded="${siteBotOpen}" aria-label="Chat">💬 ${t('bot_btn')}</button>
    ${siteBotOpen?`<div class="sitebot-panel" role="dialog" aria-label="NFT-Assistent">
      <div class="sb-head"><b>NFT-Assistent</b><button class="icon-btn" data-action="sitebot-toggle" aria-label="Schließen" style="width:30px;height:30px">${ICON('x')}</button></div>
      <div class="sb-body">
        <div class="bubble">Hi! 👋 Ich beantworte deine Fragen sofort — und wenn ich nicht weiterweiß, übernimmt ein Mensch (Antwort in unter 1 Stunde).</div>
        ${siteBotChat.map(i=>`<div class="bubble me">${D.siteBot[i].q}</div><div class="bubble">${D.siteBot[i].a}</div>
          ${D.siteBot[i].cta?`<a class="btn btn-primary btn-sm" href="#/probetraining" style="margin:4px 0 8px">Kostenloses Probetraining buchen</a>`:''}`).join('')}
        <div class="choices" style="margin-top:8px">${D.siteBot.map((f,i)=>siteBotChat.includes(i)?'':`<button type="button" class="chip" data-action="sitebot-ask" data-i="${i}" style="font-size:13px;padding:8px 13px">${f.q}</button>`).join('')}</div>
      </div>
    </div>`:''}`;
  }

  function siteFooter(){
    return `<footer class="footer"><div class="container">
      <div class="cols">
        <div>${logo}
          <p class="muted" style="margin-top:14px;max-width:280px">Kampfsport für Kinder, Jugendliche & Erwachsene. 10 Standorte in NRW & München.</p>
          <div class="slash" style="margin-top:8px"><i></i><i></i></div>
        </div>
        <div><h4>${t('f_training')}</h4>
          <a href="#/kinder">Kinder</a><a href="#/erwachsene">Erwachsene</a><a href="#/kursfinder">Kursfinder</a><a href="#/standorte">Standorte</a><a href="#/events">Events & Camps</a><a href="#/camp">Feriencamp</a><a href="#/shop">Pro-Shop</a><a href="#/gutscheine">Gutscheine</a></div>
        <div><h4>${t('f_service')}</h4>
          <a href="#/probetraining">Probetraining</a><a href="#/preise">Preise</a><a href="#/faq">FAQ</a><a href="#/empfehlen">Freund werben</a><a href="#/app">Mitglieder-Login</a><a href="#/kuendigen">Vertrag kündigen</a></div>
        <div><h4>${t('f_legal')}</h4>
          <a href="#/kuendigen">Kündigung</a><a href="#/impressum">Impressum</a><a href="#/datenschutz">Datenschutz</a><a href="#/agb">AGB</a></div>
      </div>
      <p class="muted" style="margin-top:34px;font-size:13px">© 2026 NFT Gym — Prototyp mit Demo-Daten. Kein echter Vertragsabschluss.
        <span style="opacity:.55"> · Intern: <a href="#/crm" style="display:inline;text-decoration:underline">Team-CRM</a> · <a href="#/admin" style="display:inline;text-decoration:underline">Bild-Studio</a></span></p>
    </div></footer>`;
  }

  /* ===========================================================
     MARKETING SCREENS
     =========================================================== */
  function home(){
    const benefits = [
      {i:"📊",t:"Ruhige Zeiten sehen",d:"Live-Auslastung & Wochen-Heatmap. Wähle den Tag, an dem dein Kind die beste Betreuung bekommt."},
      {i:"🥋",t:"Fortschritt verfolgen",d:"Gürtel, Stripes und Trainer-Feedback — sieh genau, wie sich dein Kind entwickelt."},
      {i:"🔔",t:"Check-in & Check-out",d:"Push aufs Handy, sobald dein Kind ankommt und wieder geht. Volle Sicherheit."},
      {i:"📱",t:"Alles digital",d:"Probetraining, Vertrag, Zahlung, Kurse & Kommunikation — in einer App."},
    ];
    const sportCards = D.sports.map(s=>`<a href="#/kursfinder" class="sport-card"><img class="sc-img" src="${s.img}" alt="" loading="lazy" onerror="this.remove()"><span class="sc-ico">${s.icon}</span><span>${s.name}</span></a>`).join('');
    const locTeaser = D.locations.slice(0,3).map(l=>locCard(l)).join('');
    return siteShell(`
      <div class="container">
        <div class="hero"><img class="hero-photo" src="${D.heroImg}" alt="" onerror="this.remove()"><div class="hero-body">
          <div class="eyebrow"><span class="slash sm"><i></i><i></i></span> National Fighting Team · Fairtex</div>
          <h1>${t('hero_title')}</h1>
          <p class="lead">${t('hero_lead')}</p>
          <div class="hero-cta">
            <a class="btn btn-primary" href="#/probetraining">${t('cta_free')}</a>
            <a class="btn btn-ghost" href="#/kursfinder">${t('cta_plan')}</a>
          </div>
        </div></div>
        <div class="trust-band">
          <div class="ti"><b>${(D.crm&&D.crm.fact?D.crm.fact.mitglieder:2410).toLocaleString('de-DE')}+</b><small>${t('tb_members')}</small></div>
          <div class="ti"><b>${D.locations.length}</b><small>${t('tb_locations')}</small></div>
          <div class="ti"><b><span class="stars">★★★★★</span> 4,9</b><small>312 ${t('tb_rating')}</small></div>
          <div class="ti"><b>ab 3 J.</b><small>${t('nav_kids')}</small></div>
        </div>
      </div>

      <div class="section"><div class="container">
        <div class="section-head"><div>
          <div class="kicker"><span class="slash sm"><i></i><i></i></span> Disziplinen</div>
          <h2>Wähle deinen Stil</h2></div>
          <a class="btn btn-dark btn-sm" href="#/kursfinder">Kursfinder starten</a>
        </div>
        <div class="grid g-3">${sportCards}</div>
      </div></div>

      <div class="section"><div class="container">
        <div class="section-head"><div><div class="kicker"><span class="slash sm"><i></i><i></i></span> ${t('safe_k')}</div><h2>${t('safe_t')}</h2></div></div>
        <div class="grid g-4 safe-grid">
          ${[['🛡️','safe1'],['👥','safe2'],['🔔','safe3'],['✅','safe4']].map(([ic,k])=>`<div class="card"><div class="ico">${ic}</div><h3>${t(k+'_t')}</h3><p class="muted" style="margin:0">${t(k+'_d')}</p></div>`).join('')}
        </div>
      </div></div>

      <div class="section" style="background:var(--bg-elev)"><div class="container">
        <div class="section-head"><div>
          <div class="kicker"><span class="slash sm"><i></i><i></i></span> Für Eltern gemacht</div>
          <h2>Warum NFT anders ist</h2>
          <p>Kein WhatsApp-Chaos, keine Zettel. Eltern behalten alles im Blick — und Kinder haben Spaß an ihrem Fortschritt.</p></div>
        </div>
        <div class="grid g-4">${benefits.map(b=>`<div class="card hover"><div class="ico">${b.i}</div><h3>${b.t}</h3><p class="muted" style="margin:0">${b.d}</p></div>`).join('')}</div>
      </div></div>

      <div class="section"><div class="container">
        <div class="section-head"><div><div class="kicker"><span class="slash sm"><i></i><i></i></span> ${t('price_k')}</div>
          <h2>${t('price_t')}</h2><p>${t('price_note')}</p></div>
          <a class="btn btn-dark btn-sm" href="#/preise">${t('price_cta')}</a></div>
        <div class="grid g-3">
          <div class="card price-card"><span class="tag ghost">${t('price_kids')}</span><div class="amt">49 €<small> ${t('price_mo')}</small></div><ul><li>${t('pk1')}</li><li>${t('pk2')}</li><li>${t('pk3')}</li></ul><a class="btn btn-dark btn-block" href="#/probetraining" style="margin-top:16px">${t('cta_free')}</a></div>
          <div class="card price-card feat"><span class="tag">${t('price_fam')}</span><div class="amt">119 €<small> ${t('price_mo')}</small></div><ul><li>${t('pf1')}</li><li>${t('pf2')}</li><li>${t('pf3')}</li></ul><a class="btn btn-primary btn-block" href="#/probetraining" style="margin-top:16px">${t('cta_free')}</a></div>
          <div class="card price-card"><span class="tag ghost">${t('price_ad')}</span><div class="amt">59 €<small> ${t('price_mo')}</small></div><ul><li>${t('pa1')}</li><li>${t('pa2')}</li><li>${t('pa3')}</li></ul><a class="btn btn-dark btn-block" href="#/probetraining" style="margin-top:16px">${t('cta_free')}</a></div>
        </div>
      </div></div>

      <div class="section" style="background:var(--bg-elev)"><div class="container obj" style="max-width:860px">
        <div class="center" style="margin-bottom:24px"><div class="kicker" style="justify-content:center"><span class="slash sm"><i></i><i></i></span> ${t('obj_k')}</div><h2>${t('obj_t')}</h2></div>
        <div class="grid g-3">
          ${['obj1','obj2','obj3'].map(k=>`<div class="card"><h3 style="font-size:17px;text-transform:none;letter-spacing:0">${t(k+'_q')}</h3><p class="muted" style="margin:8px 0 0;font-size:14px">${t(k+'_a')}</p></div>`).join('')}
        </div>
        <div class="center" style="margin-top:20px"><a class="btn btn-dark btn-sm" href="#/faq">${t('obj_cta')}</a></div>
      </div></div>

      <div class="section"><div class="container">
        <div class="section-head"><div>
          <div class="kicker"><span class="slash sm"><i></i><i></i></span> 10 Standorte</div>
          <h2>Finde dein Studio</h2></div>
          <a class="btn btn-dark btn-sm" href="#/standorte">Alle Standorte</a>
        </div>
        <div class="grid g-3">${locTeaser}</div>
      </div></div>

      <div class="section"><div class="container">
        <div class="section-head"><div><div class="kicker"><span class="slash sm"><i></i><i></i></span> Bewertungen</div><h2>Das sagen Familien</h2></div>
          <a class="btn btn-dark btn-sm" href="#/empfehlen">Mehr Stimmen</a></div>
        <div class="grid g-3">${D.testimonials.map(tt=>`<div class="card"><div class="stars" style="margin-bottom:8px">${'★'.repeat(tt.stars)}</div><p style="margin:0 0 12px">„${tt.text}"</p><b>${tt.name}</b><br><small class="muted">${tt.kid}</small></div>`).join('')}</div>
      </div></div>

      <div class="section"><div class="container">
        <div class="card" style="padding:0;overflow:hidden;display:grid;grid-template-columns:1.2fr 1fr">
          <div style="padding:44px">
            <div class="kicker"><span class="slash sm"><i></i><i></i></span> Mitglieder-App</div>
            <h2 style="margin-bottom:14px">Dein Studio in der Tasche</h2>
            <p class="muted">Live-Auslastung, Check-in-Benachrichtigung, Gürtelfortschritt deines Kindes, Kursbuchung, Zahlungen und Nachrichten — alles an einem Ort.</p>
            <div style="margin-top:18px"><a class="btn btn-primary" href="#/app">App-Demo öffnen</a></div>
          </div>
          ${D.appTeaserImg?`<img src="${D.appTeaserImg}" alt="" style="width:100%;height:100%;min-height:260px;object-fit:cover" onerror="this.remove()">`:`<div style="background:linear-gradient(135deg,var(--red-700),#0c0c0e);display:flex;align-items:center;justify-content:center;font-size:80px">📱</div>`}
        </div>
      </div></div>
    `,'#/');
  }

  function locCard(l){
    return `<a href="#/standort/${l.id}" class="card hover loc-card">
      <div class="row"><h3>${l.city}</h3><span class="tag ghost">Standort</span></div>
      <div class="addr">${l.addr}</div>
      <div class="row" style="margin-top:6px"><span class="muted" style="font-size:13px">Jetzt: ${occPill(l.occ)}</span>
        <span class="muted" style="font-size:13px">${l.hours.split('·')[0]}</span></div>
    </a>`;
  }

  function standorte(){
    return siteShell(`<div class="section" style="padding-top:36px"><div class="container">
      <div class="section-head"><div>
        <div class="kicker"><span class="slash sm"><i></i><i></i></span> Standorte</div>
        <h2>10 × NFT Gym</h2>
        <p>Wähle deinen Standort — mit aktueller Auslastung und beliebtesten Kursen.</p></div>
      </div>
      <div class="field" style="max-width:420px"><label for="loc-q">Standort suchen</label>
        <input id="loc-q" placeholder="Stadt eingeben, z. B. Köln…"></div>
      <div class="grid g-3" id="loc-grid">${D.locations.map(locCard).join('')}</div>
      <p class="muted" id="loc-empty" style="display:none">Kein Standort gefunden — versuch es mit einer anderen Stadt.</p>
    </div></div>`,'#/standorte');
  }

  function standortDetail(id){
    const l = D.locations.find(x=>x.id===id) || D.locations[0];
    const sched = D.schedule.map(d=>`<div class="card" style="padding:14px">
      <b style="font-family:var(--ff-head);font-size:18px;text-transform:uppercase">${d.day}</b>
      <div style="margin-top:8px;display:flex;flex-direction:column;gap:8px">
        ${d.items.map(i=>`<div style="display:flex;justify-content:space-between;align-items:center;font-size:14px">
          <span><b>${i.t}</b> · ${i.n}</span> ${occPill(i.occ)}</div>`).join('')}
      </div></div>`).join('');
    return siteShell(`
      <div class="container">
        <div class="hero" style="min-height:380px">${D.standortImg?`<img class="hero-photo" src="${D.standortImg}" alt="" onerror="this.remove()">`:''}<div class="hero-body">
          <a href="#/standorte" class="backlink">← Alle Standorte</a>
          <div class="eyebrow">${l.addr}</div>
          <h1 style="font-size:clamp(32px,5vw,58px)">NFT Gym<br>${l.city}</h1>
          <div style="display:flex;gap:22px;flex-wrap:wrap;margin:14px 0 22px;color:var(--text-dim)">
            <span>🕒 ${l.hours}</span><span>Jetzt: ${occPill(l.occ)}</span></div>
          <div class="hero-cta">
            <a class="btn btn-primary" href="#/probetraining">Kostenloses Probetraining</a>
            <a class="btn btn-ghost" href="#/app/auslastung">Auslastung ansehen</a>
          </div>
        </div></div>
      </div>
      <div class="section"><div class="container">
        <div class="section-head"><div><div class="kicker"><span class="slash sm"><i></i><i></i></span> Beliebteste Kurse</div><h2>${l.city}</h2></div></div>
        <div class="grid g-3" style="margin-bottom:34px">${l.top.map(t=>`<div class="card"><span class="tag">Top</span><h3 style="margin-top:12px">${t}</h3><p class="muted" style="margin:0">Beliebt an diesem Standort.</p></div>`).join('')}</div>
        <div class="section-head"><div><div class="kicker"><span class="slash sm"><i></i><i></i></span> Wochenplan</div><h2>Diese Woche</h2></div></div>
        <div class="grid g-3">${sched}</div>
        <div class="notice">📍 Kartenansicht (Demo-Platzhalter) — ${l.addr}</div>
      </div></div>
    `,'#/standorte');
  }

  function landing(kind){
    const isKids = kind==='kinder';
    const progs = isKids
      ? [{t:"Mini Kids 3–5",d:"Spielerisch Koordination, Regeln & erste Techniken."},
         {t:"Kids 6–9",d:"Kickboxen, BJJ & Ringen — Selbstvertrauen und Disziplin."},
         {t:"Kids 10–14",d:"Technik, Fitness und faires Sparring."}]
      : [{t:"Kickboxen & Boxen",d:"Auspowern, Technik & Fitness nach der Arbeit."},
         {t:"MMA & BJJ",d:"Stand und Boden — für Einsteiger bis Fortgeschrittene."},
         {t:"Frauen-Kurse",d:"Selbstverteidigung & Fitness in geschütztem Rahmen."}];
    const bens = isKids
      ? ["Mehr Selbstvertrauen & Fokus","Sichere, betreute Gruppen","Fortschritt sichtbar in der App","Check-in/out-Push für Eltern"]
      : ["Flexible Kurszeiten","Ruhige Zeiten in der App sehen","Digitale Verwaltung & Zahlung","Vom Einsteiger zum Wettkampf"];
    return siteShell(`
      <div class="container"><div class="hero" style="min-height:420px"><div class="hero-body">
        <div class="eyebrow"><span class="slash sm"><i></i><i></i></span> ${isKids?'Für Kinder ab 3 Jahren':'Für Jugendliche & Erwachsene'}</div>
        <h1>${isKids?'Stark werden.<br>Spaß haben.':'Trainiere wie<br>ein Fighter.'}</h1>
        <p class="lead">${isKids?'Kampfsport gibt Kindern Selbstvertrauen, Disziplin und Bewegung — in altersgerechten, sicher betreuten Gruppen.':'Fitness, Technik und Kopf-frei nach dem Alltag. Vom ersten Probetraining bis zum Wettkampf.'}</p>
        <div class="hero-cta"><a class="btn btn-primary" href="#/probetraining">Probetraining buchen</a>
          <a class="btn btn-ghost" href="#/kursfinder">Passenden Kurs finden</a></div>
      </div></div></div>
      <div class="section"><div class="container">
        <div class="section-head"><div><div class="kicker"><span class="slash sm"><i></i><i></i></span> Programme</div><h2>Das passende Level</h2></div></div>
        <div class="grid g-3">${progs.map(p=>`<div class="card hover"><h3>${p.t}</h3><p class="muted" style="margin:0">${p.d}</p><div style="margin-top:14px"><a class="btn btn-dark btn-sm" href="#/probetraining">Probetraining</a></div></div>`).join('')}</div>
      </div></div>
      <div class="section" style="background:var(--bg-elev)"><div class="container">
        <div class="grid g-2" style="align-items:center">
          <div><div class="kicker"><span class="slash sm"><i></i><i></i></span> Deine Vorteile</div><h2 style="margin-bottom:18px">Warum ${isKids?'Eltern':'Mitglieder'} NFT lieben</h2>
            <div style="display:flex;flex-direction:column;gap:12px">${bens.map(b=>`<div style="display:flex;gap:12px;align-items:center"><span class="slash sm"><i></i><i></i></span><b style="font-weight:600">${b}</b></div>`).join('')}</div>
            <div style="margin-top:22px"><a class="btn btn-primary" href="#/probetraining">Jetzt starten</a></div>
          </div>
          ${(isKids?D.landingKinderImg:D.landingErwachseneImg)
            ?`<img src="${isKids?D.landingKinderImg:D.landingErwachseneImg}" alt="" style="width:100%;height:320px;object-fit:cover;border-radius:16px;border:1px solid var(--line)" onerror="this.remove()">`
            :`<div class="card" style="height:320px;display:flex;align-items:center;justify-content:center;font-size:90px;background:linear-gradient(135deg,#0c0c0e,var(--red-700))">${isKids?'🥋':'🥊'}</div>`}
        </div>
      </div></div>
    `, isKids?'#/kinder':'#/erwachsene');
  }

  /* ---------- Kursfinder (guided) ---------- */
  function kursfinder(){
    const whoOpts=[["Mein Kind","🧒"],["Ich selbst","💪"],["Jugendliche/r","🧑"]];
    const sel=(v,cur)=>v===cur?'sel':'';
    let body;
    if(!finder.searched){
      body = `
      <div class="card" style="max-width:720px;margin:0 auto">
        <div class="field"><label>Wer möchte trainieren?</label>
          <div class="choices">${whoOpts.map(([t,i])=>`<button type="button" class="chip ${sel(t,finder.who)}" data-action="f-who" data-v="${t}">${i} ${t}</button>`).join('')}</div></div>
        <div class="field"><label>Alter</label>
          <div class="choices">${D.ages.map(a=>`<button type="button" class="chip ${sel(a,finder.age)}" data-action="f-age" data-v="${a}">${a}</button>`).join('')}</div></div>
        <div class="field"><label>Ziel</label>
          <div class="choices">${D.goals.map(g=>`<button type="button" class="chip ${sel(g,finder.goal)}" data-action="f-goal" data-v="${g}">${g}</button>`).join('')}</div></div>
        <div class="field"><label>Standort</label>
          <select data-action="f-loc"><option value="">Bitte wählen…</option>${D.locations.map(l=>`<option value="${l.id}" ${finder.loc===l.id?'selected':''}>${l.city}</option>`).join('')}</select></div>
        <div class="field" style="display:flex;justify-content:space-between;align-items:center;background:var(--surface-2);padding:14px 16px;border-radius:10px;border:1px solid var(--line)">
          <div><b>Ist dein Kind eher zurückhaltend?</b><br><small class="muted">Dann empfehlen wir ruhigere Kurse mit kleiner Gruppe.</small></div>
          <button type="button" role="switch" aria-checked="${finder.shy}" class="switch ${finder.shy?'on':''}" data-action="f-shy"><span class="track"></span></button>
        </div>
        <button class="btn btn-primary btn-block" data-action="f-search" style="margin-top:8px">Passende Kurse anzeigen</button>
      </div>`;
    } else {
      const recs = [
        {n:"Kids Kickboxen 6–9",day:"Mittwoch",t:"16:00",occ:"ruhig",cap:"11/20"},
        {n:"Kids BJJ 6–9",day:"Freitag",t:"15:30",occ:"ruhig",cap:"8/18"},
        {n:"Kids Kickboxen 6–9",day:"Dienstag",t:"17:00",occ:"voll",cap:"19/20"},
      ];
      const list = (finder.shy?recs.filter(r=>r.occ!=='voll'):recs);
      body = `<div style="max-width:720px;margin:0 auto">
        ${finder.shy?`<div class="notice">✨ Weil dein Kind zurückhaltend ist, zeigen wir ruhige Kurse mit kleiner Gruppe zuerst — mehr Aufmerksamkeit vom Trainer.</div>`:''}
        <div class="section-head"><div><h2 style="font-size:28px">Empfohlene Kurse</h2><p class="muted" style="margin-top:4px">${finder.who||'Für dich'}${finder.age?' · '+finder.age:''}${finder.loc?' · '+ (D.locations.find(l=>l.id===finder.loc)||{}).city:''}</p></div>
          <button class="btn btn-dark btn-sm" data-action="f-reset">Neu suchen</button></div>
        <div style="display:flex;flex-direction:column;gap:12px">
          ${list.map((r,i)=>`<div class="card" style="display:flex;justify-content:space-between;align-items:center;gap:16px">
            <div><span class="tag ${i===0?'':'ghost'}">${i===0?'Beste Wahl':'Alternative'}</span>
              <h3 style="margin:10px 0 4px">${r.n}</h3>
              <div class="muted" style="font-size:14px">${r.day} · ${r.t} · ${r.cap} Plätze · ${occPill(r.occ)}</div></div>
            <a class="btn btn-primary btn-sm" href="#/probetraining" data-action="f-book">Probetraining</a>
          </div>`).join('')}
        </div>
      </div>`;
    }
    return siteShell(`<div class="section" style="padding-top:36px"><div class="container">
      <div class="center" style="margin-bottom:30px">
        <div class="kicker" style="justify-content:center"><span class="slash sm"><i></i><i></i></span> Kursfinder</div>
        <h2>Finde in 30 Sekunden den passenden Kurs</h2></div>
      ${body}
    </div></div>`,'#/kursfinder');
  }

  /* ---------- Probetraining Wizard ---------- */
  function probetraining(){
    const steps = ["Wer","Alter","Standort","Kurs & Termin","Kontakt"];
    const s = wiz.step;
    const stepper = `<div class="stepper">${steps.map((_,i)=>`<div class="st ${i<s?'done':''} ${i===s?'cur':''}"></div>`).join('')}</div>`;
    const sel=(v,cur)=>v===cur?'sel':'';
    let inner="";
    if(s===0){ inner=`<label class="field-lbl">Wer möchte zum Probetraining?</label>
      <div class="choices">${[["Mein Kind","🧒"],["Ich selbst","💪"],["Jugendliche/r","🧑"]].map(([t,i])=>`<button type="button" class="chip ${sel(t,wiz.who)}" data-action="w-set" data-k="who" data-v="${t}">${i} ${t}</button>`).join('')}</div>`;
    } else if(s===1){ inner=`<label class="field-lbl">Alter</label>
      <div class="choices">${D.ages.map(a=>`<button type="button" class="chip ${sel(a,wiz.age)}" data-action="w-set" data-k="age" data-v="${a}">${a}</button>`).join('')}</div>`;
    } else if(s===2){ inner=`<label class="field-lbl">Standort wählen</label>
      <div class="choices">${D.locations.map(l=>`<button type="button" class="chip ${sel(l.id,wiz.loc)}" data-action="w-set" data-k="loc" data-v="${l.id}">${l.city}</button>`).join('')}</div>`;
    } else if(s===3){ const slots=[["Mi · 16:00 · Kids 6–9","ruhig"],["Fr · 15:30 · Kids BJJ","ruhig"],["Di · 17:00 · Kids 6–9","voll"]];
      inner=`<label class="field-lbl">Wähle einen Termin</label>
      <div style="display:flex;flex-direction:column;gap:10px">${slots.map(([t,o])=>`<button type="button" class="chip ${sel(t,wiz.slot)}" data-action="w-set" data-k="slot" data-v="${t}" style="justify-content:space-between;display:flex;border-radius:12px">${t} ${occPill(o)}</button>`).join('')}</div>
      <p class="muted" style="font-size:13px;margin-top:12px">⚡ Beliebte Zeiten — diese Woche nur noch wenige Plätze frei.</p>`;
    } else if(s===4){ inner=`
      <div class="field"><label for="w-name">Name</label><input id="w-name" data-action="w-input" data-k="name" value="${wiz.name}" placeholder="Vor- und Nachname" autocomplete="name"></div>
      <div class="field"><label for="w-email">E-Mail</label><input id="w-email" type="email" data-action="w-input" data-k="email" value="${wiz.email}" placeholder="name@mail.de" autocomplete="email"></div>
      <p class="muted" style="font-size:13px">Mit dem Absenden stimmst du der Kontaktaufnahme zu. (Demo — es wird nichts gesendet.)</p>`;
    }
    const canNext = [wiz.who,wiz.age,wiz.loc,wiz.slot,true][s];
    return siteShell(`<div class="section" style="padding-top:36px"><div class="container">
      <div class="center" style="margin-bottom:26px">
        <div class="kicker" style="justify-content:center"><span class="slash sm"><i></i><i></i></span> Kostenloses Probetraining</div>
        <h2>In wenigen Schritten gebucht</h2></div>
      <div class="card" style="max-width:640px;margin:0 auto">
        ${stepper}
        <div style="min-height:170px">${inner}</div>
        <div style="display:flex;gap:10px;margin-top:22px">
          ${s>0?`<button class="btn btn-dark" data-action="w-back">Zurück</button>`:''}
          ${s<4?`<button class="btn btn-primary btn-block" data-action="w-next" ${canNext?'':'disabled aria-disabled="true"'}>Weiter</button>`
                :`<button class="btn btn-primary btn-block" data-action="w-finish">Probetraining buchen</button>`}
        </div>
        <p class="reassure">🔒 ${t('reassure_free')}</p>
      </div>
      <style>.field-lbl{display:block;font-weight:600;color:var(--muted);margin-bottom:12px;text-transform:uppercase;letter-spacing:1px;font-size:13px}</style>
    </div></div>`,'#/probetraining');
  }

  function bestaetigung(){
    const loc = D.locations.find(l=>l.id===wiz.loc) || D.locations[1];
    return siteShell(`<div class="section" style="padding-top:36px"><div class="container">
      <div class="card center" style="max-width:600px;margin:0 auto">
        <div style="width:70px;height:70px;border-radius:50%;background:rgba(39,194,102,.15);color:var(--green);display:flex;align-items:center;justify-content:center;font-size:34px;margin:0 auto 18px">✓</div>
        <h2>Dein Probetraining ist gebucht!</h2>
        <p class="muted">Wir haben dir eine Bestätigung geschickt (Demo).</p>
        <div class="card" style="text-align:left;background:var(--surface-2);margin:20px 0">
          <div style="display:flex;justify-content:space-between;padding:6px 0"><span class="muted">Teilnehmer</span><b>${wiz.name||'Emir A.'}</b></div>
          <div style="display:flex;justify-content:space-between;padding:6px 0"><span class="muted">Termin</span><b>${wiz.slot||'Mi · 16:00 · Kids 6–9'}</b></div>
          <div style="display:flex;justify-content:space-between;padding:6px 0"><span class="muted">Standort</span><b>NFT ${loc.city}</b></div>
        </div>
        <div style="text-align:left;background:var(--red-050);border:1px solid var(--red);border-radius:12px;padding:16px">
          <b>Was mitbringen:</b>
          <ul style="margin:8px 0 0;padding-left:18px;color:var(--text-dim)"><li>Bequeme Sportkleidung</li><li>Wasserflasche</li><li>10 Minuten früher da sein</li><li>Gute Laune 💪</li></ul>
        </div>
        <div class="notice" style="text-align:left;margin-top:16px">✓ Bestätigung per SMS &amp; E-Mail gesendet · Bei Fragen antworten wir in unter 1 Stunde.</div>
        <a class="btn btn-dark btn-block" href="#/erstes-training" style="margin-top:12px">▶ So läuft dein erstes Training</a>
        <div style="display:flex;gap:10px;margin-top:10px">
          <button class="btn btn-dark btn-block" data-action="toast" data-msg="Zum Kalender hinzugefügt (Demo)">Zum Kalender</button>
          <a class="btn btn-primary btn-block" href="#/app">App öffnen</a>
        </div>
      </div>
    </div></div>`,'#/probetraining');
  }

  function kuendigen(){
    const done = cancelDone;
    if(saveFlow.done){
      const M={pause:['⏸️','Pause eingerichtet','Dein Vertrag pausiert ab 01.08. für den gewählten Zeitraum — es fallen keine Beiträge an. Wir melden uns vor dem Neustart.'],
               tarif:['🔁','Tarifwechsel angefragt','Wir haben deine Anfrage erhalten. Ein Mitarbeiter bestätigt den günstigeren Tarif innerhalb von 24 Std.'],
               standort:['📍','Standortwechsel angefragt','Super — dein neuer Wunsch-Standort meldet sich mit passenden Kurszeiten. Dein Vertrag läuft nahtlos weiter.'],
               rueckruf:['📞','Rückruf vereinbart','Deine Standortleitung ruft dich innerhalb von 24 Std. an — vielleicht finden wir gemeinsam eine Lösung.']}[saveFlow.offer]||['✓','Erledigt',''];
      return siteShell(`<div class="section" style="padding-top:36px"><div class="container">
        <div class="card center" style="max-width:560px;margin:0 auto">
          <div style="font-size:52px">${M[0]}</div>
          <h2 style="margin:10px 0 8px;color:var(--green)">${M[1]}</h2>
          <p class="muted">${M[2]}</p>
          <a class="btn btn-primary btn-block" href="#/app" style="margin-top:16px">Zur App</a>
          <button class="btn btn-dark btn-block" data-action="save-reset" style="margin-top:10px">Doch kündigen</button>
        </div></div></div>`,'#/kuendigen');
    }
    if(!done && !saveFlow.showForm){
      const offers=[ ['pause','⏸️','Vertrag pausieren','1–3 Monate aussetzen — z. B. bei Verletzung, Schulstress oder Urlaub. Keine Beiträge, Platz bleibt sicher.'],
        ['tarif','🔁','Günstigerer Tarif','Weniger trainieren statt aufhören — wir schlagen den passenden kleineren Tarif vor.'],
        ['standort','📍','Standort wechseln','Umgezogen? Trainiere an einem unserer 10 Standorte weiter — Vertrag läuft nahtlos.'],
        ['rueckruf','📞','Kurz sprechen','Manchmal gibt es eine Lösung, an die man nicht denkt. Wir rufen dich zurück — unverbindlich.'] ];
      return siteShell(`<div class="section" style="padding-top:36px"><div class="container" style="max-width:680px">
        <div class="kicker"><span class="slash sm"><i></i><i></i></span> Bevor du gehst</div>
        <h2 style="margin-bottom:6px">Schade, dass du kündigen möchtest</h2>
        <p class="muted" style="margin-bottom:20px">Vielleicht passt eine dieser Optionen besser — sonst kommst du unten direkt zur Kündigung (dein Recht, ohne Umwege).</p>
        <div class="grid g-2">${offers.map(([id,ic,t,d])=>`<button class="card hover" data-action="save-offer" data-o="${id}" style="text-align:left;color:var(--text);cursor:pointer">
          <div style="font-size:30px">${ic}</div><h3 style="margin:10px 0 6px;font-size:19px">${t}</h3><p class="muted" style="margin:0;font-size:14px">${d}</p></button>`).join('')}</div>
        <div class="center" style="margin-top:22px"><button class="btn btn-dark" data-action="save-skip">Trotzdem kündigen →</button></div>
      </div></div>`,'#/kuendigen');
    }
    return siteShell(`<div class="section" style="padding-top:36px"><div class="container">
      <div class="card" style="max-width:600px;margin:0 auto">
        <div class="kicker"><span class="slash sm"><i></i><i></i></span> § 312k BGB · Ohne Login</div>
        <h2 style="margin-bottom:6px">Vertrag kündigen</h2>
        <p class="muted">Hier kannst du deinen Vertrag jederzeit online kündigen — schnell, ohne Anruf, mit sofortiger Bestätigung in Textform.</p>
        ${done ? `
          <div class="card" style="background:rgba(39,194,102,.1);border-color:var(--green);margin-top:18px">
            <b style="color:var(--green)">✓ Kündigung eingegangen</b>
            <p class="muted" style="margin:8px 0 0">Bestätigung in Textform: heute, 14:32 Uhr. Dein Vertrag endet zum nächstmöglichen Termin. Du erhältst eine E-Mail (Demo).</p>
          </div>
          <a class="btn btn-dark btn-block" href="#/" style="margin-top:16px">Zur Startseite</a>
        ` : `
          <div class="field" style="margin-top:16px"><label for="k-member">Vertrag / Mitglied</label><input id="k-member" placeholder="Name des Mitglieds"></div>
          <div class="field"><label for="k-mail">E-Mail oder Vertragsnummer</label><input id="k-mail" placeholder="name@mail.de"></div>
          <div class="field"><label for="k-art">Kündigungsart</label><select id="k-art"><option>Ordentliche Kündigung</option><option>Außerordentliche Kündigung</option></select></div>
          <div class="field"><label for="k-date">Gewünschtes Vertragsende</label><input id="k-date" type="date"></div>
          <button class="btn btn-primary btn-block" data-action="cancel-submit">Jetzt kündigen</button>
          <p class="muted" style="font-size:12px;margin-top:10px">Demo — es wird kein echter Vertrag gekündigt.</p>
        `}
      </div>
    </div></div>`,'#/kuendigen');
  }

  function faqPage(){
    return siteShell(`<div class="section" style="padding-top:36px"><div class="container" style="max-width:760px">
      <div class="center" style="margin-bottom:26px"><div class="kicker" style="justify-content:center"><span class="slash sm"><i></i><i></i></span> FAQ</div><h2>Häufige Fragen</h2></div>
      ${D.faq.map((f,i)=>`<button type="button" class="card" style="margin-bottom:12px;display:block;width:100%" data-action="faq" data-i="${i}" aria-expanded="${faqOpen===i}">
        <div style="display:flex;justify-content:space-between;align-items:center"><h3 style="font-size:18px;text-transform:none;letter-spacing:0">${f.q}</h3><span style="color:var(--red-ink);font-size:22px" aria-hidden="true">${faqOpen===i?'−':'+'}</span></div>
        ${faqOpen===i?`<p class="muted" style="margin:12px 0 0">${f.a}</p>`:''}
      </button>`).join('')}
    </div></div>`,'#/faq');
  }

  function preise(){
    const card=(feat,name,price,items,cta)=>`<div class="card price-card ${feat?'feat':''}">
      <span class="tag ${feat?'':'ghost'}">${name}</span><div class="amt">${price}<small> ${t('price_mo')}</small></div>
      <ul>${items.map(k=>`<li>${t(k)}</li>`).join('')}</ul>
      <a class="btn ${cta} btn-block" href="#/probetraining" style="margin-top:18px">${t('cta_free')}</a></div>`;
    return siteShell(`<div class="section" style="padding-top:36px"><div class="container">
      <div class="center" style="margin-bottom:8px"><div class="kicker" style="justify-content:center"><span class="slash sm"><i></i><i></i></span> ${t('price_k')}</div>
        <h2>${t('price_t')}</h2><p class="muted" style="max-width:520px;margin:8px auto 0">${t('price_note')}</p></div>
      <div class="grid g-3" style="margin-top:30px">
        ${card(false,t('price_kids'),'49 €',['pk1','pk2','pk3'],'btn-dark')}
        ${card(true,t('price_fam'),'119 €',['pf1','pf2','pf3'],'btn-primary')}
        ${card(false,t('price_ad'),'59 €',['pa1','pa2','pa3'],'btn-dark')}
      </div>
      <div class="notice" style="margin-top:24px">${t('reassure_free')} · Preise inkl. MwSt. (Demo-Werte) — endgültige Tarife je Standort im Anmeldeprozess.</div>
      <div class="center" style="margin-top:16px"><a class="btn btn-dark" href="#/faq">${t('obj_cta')}</a></div>
    </div></div>`,'#/preise');
  }

  /* ===========================================================
     CUSTOMER APP
     =========================================================== */
  function appShell(content, tab){
    const tb=(h,ic,l)=>`<a href="${h}" class="${tab===h?'active':''}"${tab===h?' aria-current="page"':''}><span class="ti">${ICON(ic)}</span>${l}</a>`;
    const unread = unreadCount();
    const cartN = cart.length;
    return `<div class="app-wrap">
      <div class="app-top">
        <div class="who"><div class="avatar">${D.parent.first[0]}</div>
          <div><div class="hi">${t('welcome')}</div><div class="nm">${D.parent.name}</div></div></div>
        <div style="display:flex;gap:8px">
          ${themeToggle()}
          <a class="icon-btn" href="#/app/warenkorb" aria-label="Warenkorb${cartN?` (${cartN})`:''}">${ICON('cart')}${cartN?`<span class="cart-count">${cartN}</span>`:''}</a>
          <a class="icon-btn" href="#/app/nachrichten" aria-label="Nachrichten${unread?` (${unread} ungelesen)`:''}">${ICON('bell')}${unread?`<span class="badge-dot">${unread}</span>`:''}</a>
          <a class="icon-btn" href="#/" aria-label="Zur Website" title="Zur Website">${ICON('x')}</a>
        </div>
      </div>
      <main class="app-body">${langNote()}${content}</main>
      <nav class="tabbar" aria-label="Hauptnavigation">
        ${tb('#/app','home',t('tab_home'))} ${tb('#/app/kurse','calendar',t('tab_courses'))} ${tb('#/app/fortschritt','trending',t('tab_progress'))}
        ${tb('#/app/nachrichten','message',t('tab_msgs'))} ${tb('#/app/konto','user',t('tab_account'))}
      </nav>
    </div>`;
  }

  // Kind-Umschalter (nur bei mehreren Kindern)
  const kidSwitch = (current, base) => D.kids.length < 2 ? '' :
    `<div class="choices" style="margin-bottom:14px">${D.kids.map(k=>`<a class="chip ${k.name===current?'sel':''}" href="${base}/${k.name}">${k.name}</a>`).join('')}</div>`;

  function appHome(){
    const sessions = D.kids.map(k=>{
      const sick = sickset[k.name];
      return `<div class="app-card ${k.name==='Emir'&&!sick?'accent':''}" style="${sick?'opacity:.85':''}">
      <div class="session"><div class="thumb">${sick?'🤒':'🥋'}</div>
        <div class="meta"><b>${k.name} · ${k.program}</b>
          <small>${sick?`Krankgemeldet diese Woche · <span style="color:var(--blue)">❄️ Streak eingefroren</span>`:`${k.next.day}, ${k.next.time} · NFT ${D.parent.location} · ${occPill(k.next.occ)}`}</small></div></div>
      <div class="rowbtns">
        <a class="btn btn-dark" href="#/app/kind/${k.name}">Profil</a>
        ${sick?`<button class="btn btn-dark" disabled style="opacity:.5">Gute Besserung 💛</button>`
              :`<button class="btn btn-dark" data-action="toast" data-msg="Umbuchen (Demo)">Umbuchen</button>
                <button class="btn btn-dark" data-action="app-sick" data-kid="${k.name}">🤒 Krankmelden</button>`}
      </div></div>`; }).join('');
    const openTasks = D.payments.filter(p=>p.status==='offen').map(p=>({i:"💶",t:`Offen: ${p.who.split(' · ')[0]} · ${p.amount}`,h:"#/app/zahlungen"}));
    const ms = D.milestone;
    const msCard = (ms && !ms.claimed) ? `<div class="app-card" style="border-color:var(--gold);background:linear-gradient(135deg,rgba(245,197,24,.08),var(--surface))">
      <div style="display:flex;gap:12px;align-items:center"><div class="thumb" style="background:var(--gold-050);color:var(--gold);font-size:26px">🎉</div>
        <div class="meta" style="flex:1"><b>${ms.kid} hat sein ${ms.label} geschafft!</b><small>Ein echter Meilenstein — feiert ihn zusammen.</small></div></div>
      <div class="rowbtns"><button class="btn btn-primary" data-action="milestone-claim">Urkunde teilen</button>
        <button class="btn btn-dark" data-action="toast" data-msg="Im Studio wird heute gratuliert 🎉">Trainer weiß Bescheid</button></div></div>` : '';
    const examCard = (D.kids[0].examPassed) ? `<div class="app-card" style="border-color:var(--green)">
      <div style="display:flex;gap:12px;align-items:center"><div class="thumb" style="background:rgba(39,194,102,.15);color:var(--green);font-size:26px">🥋</div>
        <div class="meta" style="flex:1"><b>Emir hat die Gelbgurt-Prüfung bestanden!</b><small>Urkunde &amp; neues Abzeichen sind in der App.</small></div></div>
      <div class="rowbtns"><button class="btn btn-primary" data-action="cart-add" data-id="pruefungspaket">Prüfungspaket · 44,90 €</button>
        <a class="btn btn-dark" href="#/app/erfolge/Emir">Urkunde ansehen</a></div></div>` : '';
    const freshReports = (D.weeklyReports||[]).filter(r=>r.status==='freigegeben');
    const wrCard = freshReports.length ? `<a class="app-card" href="#/app/fortschritt" style="display:flex;gap:12px;align-items:center;border-color:var(--red)">
      <div class="thumb" style="font-size:24px">📋</div>
      <div class="meta" style="flex:1"><b>Wochenreport ist da</b><small>${freshReports.map(r=>r.kid).join(' & ')} — was diese Woche gelernt wurde</small></div>
      <span class="muted">›</span></a>` : '';
    const offer = (D.crm && D.crm.upsell || []).find(u=>u.status==='gesendet');
    const offerCard = offer ? `<div class="app-card" style="border-color:var(--amber)">
      <div style="display:flex;gap:12px;align-items:center"><div class="thumb" style="background:rgba(245,165,36,.15);color:var(--amber);font-size:24px">💡</div>
        <div class="meta" style="flex:1"><b>Angebot: ${offer.typ}</b><small>${offer.calc}</small></div></div>
      <div class="rowbtns"><button class="btn btn-primary" data-action="app-up-accept" data-id="${offer.id}">Annehmen — ab nächstem Monat</button>
        <button class="btn btn-dark" data-action="toast" data-msg="Kein Problem — Angebot bleibt 14 Tage gültig">Später</button></div></div>` : '';
    const ferienBanner = ferienOn ? `<div class="notice" style="border-left-color:var(--blue)">🏖️ <b>Ferienmodus aktiv</b> — Kurse abgemeldet, Streaks eingefroren, keine Erinnerungs-Pushes. Willkommen-zurück-Slot wird automatisch vorgeschlagen.</div>` : '';
    const campCard = `<a class="app-card" href="#/events" style="display:flex;gap:12px;align-items:center;border-color:var(--amber)">
      <div class="thumb" style="background:rgba(245,165,36,.15);color:var(--amber);font-size:24px">☀️</div>
      <div class="meta" style="flex:1"><b>In ${((D.crm||{}).ferien||[{inTagen:12}])[0].inTagen} Tagen sind Sommerferien</b><small>Sommer-Kampfsportcamp 28.07.–01.08. — Frühbucher sichern</small></div>
      <span class="muted">›</span></a>`;
    const pulseCard = pulseVoted
      ? `<div class="app-card" style="border-color:var(--green);display:flex;gap:12px;align-items:center">
          <div class="thumb" style="background:rgba(39,194,102,.15);font-size:24px">${['','😞','😐','🙂','🤩'][pulseVoted]}</div>
          <div class="meta" style="flex:1"><b>Danke für dein Feedback!</b><small>Es hilft uns, das Training besser zu machen.</small></div>
          <a class="btn btn-dark btn-sm" href="#/app/mitbestimmen">Mitbestimmen</a></div>`
      : `<div class="app-card accent">
          <b style="font-family:var(--ff-head);text-transform:uppercase;font-size:17px">Wie war Emirs Training heute?</b>
          <div style="display:flex;gap:10px;margin-top:12px">
            ${[1,2,3,4].map(v=>`<button type="button" class="icon-btn" data-action="app-pulse" data-v="${v}" aria-label="Bewertung ${v} von 4" style="flex:1;height:56px;font-size:28px;border-radius:14px">${['','😞','😐','🙂','🤩'][v]}</button>`).join('')}
          </div>
          <p class="muted" style="font-size:12px;margin:10px 0 0">Ein Tap genügt · max. 1× pro Woche · anonym auswertbar</p></div>`;
    const tr = D.transition;
    const transCard = (tr && !tr.confirmed) ? `<div class="app-card" style="border-color:var(--blue)">
      <div style="display:flex;gap:12px;align-items:center"><div class="thumb" style="background:rgba(74,144,255,.15);color:var(--blue);font-size:24px">🎓</div>
        <div class="meta" style="flex:1"><b>${tr.kid} wechselt ${tr.when} in die ${tr.to}</b><small>Neue Trainerin: ${tr.trainer} · Kennenlern-Training: ${tr.meet}</small></div></div>
      <div class="rowbtns"><button class="btn btn-primary" data-action="trans-confirm">Platz im Kennenlern-Training bestätigen</button>
        <a class="btn btn-dark" href="#/app/nachrichten/1">Fragen?</a></div></div>` : '';
    const bk = D.kids.find(k=>k.bday);
    const bdayCard = bk ? `<div class="app-card" style="border-color:var(--gold)">
      <div style="display:flex;gap:12px;align-items:center"><div class="thumb" style="background:var(--gold-050);font-size:24px">🎂</div>
        <div class="meta" style="flex:1"><b>${bk.name} hat ${bk.bday} Geburtstag!</b><small>Im Training gratulieren wir natürlich — und der Geburtstag lässt sich bei uns feiern 🎉</small></div></div>
      <div class="rowbtns"><a class="btn btn-primary" href="#/events">Kampfsport-Party anfragen</a>
        <button class="btn btn-dark" data-action="toast" data-msg="Trainer Lena weiß Bescheid 🎂">Nur gratulieren</button></div></div>` : '';
    const careCard = sickset['Emir'] ? `<div class="app-card" style="border-color:var(--green)">
      <div style="display:flex;gap:12px;align-items:center"><div class="thumb" style="background:rgba(39,194,102,.15);font-size:24px">💛</div>
        <div class="meta" style="flex:1"><b>Gute Besserung von Trainer ${D.kids[0].trainer} &amp; dem ganzen Team!</b><small>Kein Stress — wenn Emir wieder fit ist, ist Mittwoch 16:00 ein sanfter Wiedereinstieg (ruhige Gruppe).</small></div></div>
      <div class="rowbtns"><button class="btn btn-dark" data-action="toast" data-msg="Comeback-Slot vorgemerkt 💪">Comeback-Slot vormerken</button></div></div>` : '';
    const alerts = [bdayCard, careCard, transCard, ferienBanner, msCard, examCard, offerCard, wrCard].filter(Boolean).join('');
    return appShell(`
      <h1 class="app-h">${t('today')}</h1>
      <div class="app-sec">Nächstes Training</div>
      ${sessions}
      ${pulseCard}
      ${alerts ? `<div class="app-sec">Wichtig für dich</div>${alerts}` : ''}
      <div class="app-sec">Standort &amp; Zeiten</div>
      <div class="live">
        <div class="top"><b>NFT ${D.parent.location} · jetzt</b><span class="occ occ-normal"><span class="dot"></span>Normal · 14/20</span></div>
        <div class="bar"><span style="width:70%"></span></div>
        <p class="muted" style="margin:10px 0 0;font-size:13px">In 30 Min. startet der Kids-Kurs — dann wird es voller. <a href="#/app/auslastung" class="red-ink" style="font-weight:600">Ruhige Zeiten →</a></p>
      </div>
      ${campCard}
      <div class="app-sec">Fortschritt &amp; Momente</div>
      <div class="app-card accent" style="display:flex;gap:12px;align-items:center">
        <div class="thumb" style="background:var(--gold-050);color:var(--gold);font-size:24px">🏅</div>
        <div class="meta" style="flex:1"><b>${D.kids[0].name} · ${D.kids[0].streak}-Wochen-Serie 🔥</b><small>${D.kids[0].stripes} von ${D.kids[0].stripesMax} Stripes bis zum nächsten Abzeichen</small></div>
        <a class="btn btn-dark btn-sm" href="#/app/erfolge/${D.kids[0].name}">Erfolge</a>
      </div>
      <a class="app-card" href="#/app/momente" style="display:flex;gap:12px;align-items:center">
        <div class="thumb" style="font-size:24px">📸</div>
        <div class="meta" style="flex:1"><b>${D.moments.filter(m=>m.kid==='Emir').length} neue Trainingsmomente</b><small>Neue Fotos & Videos von Emir</small></div>
        <span class="muted">›</span>
      </a>
      ${openTasks.length ? `<div class="app-sec">Offen</div>
      <div class="app-card">${openTasks.map(o=>`<a class="list-item" href="${o.h}"><span class="li-ico">${o.i}</span><div class="li-main"><b>${o.t}</b></div><span class="muted">›</span></a>`).join('')}</div>` : ''}
      <div class="app-sec">Nachrichten</div>
      <div class="app-card"><div style="display:flex;justify-content:space-between;align-items:center"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:18px">Aktuelles</b><a href="#/app/nachrichten" class="red-ink" style="font-weight:600;font-size:14px">Alle</a></div>
        ${D.messages.slice(0,2).map(m=>`<a class="list-item" href="#/app/nachrichten"><span class="li-ico">${m.ico}</span><div class="li-main"><b>${m.title}</b><small>${m.from} · ${m.time}</small></div>${m.unread?'<span class="unread"></span>':''}</a>`).join('')}</div>
      <a class="app-card" href="#/app/onboarding" style="display:flex;gap:12px;align-items:center;opacity:.9">
        <div class="thumb" style="font-size:22px">🚀</div>
        <div class="meta" style="flex:1"><b>Deine ersten 30 Tage</b><small>Onboarding-Fortschritt ansehen</small></div>
        <span class="muted">›</span>
      </a>
    `,'#/app');
  }

  function appKurse(){
    const filters=["Alle","Mein Kind","Kickboxen","BJJ","Ruhige Kurse"];
    const match=(it)=>{
      if(appKF==='Alle') return true;
      if(appKF==='Mein Kind') return /Kids|Mini|Teens/.test(it.n);
      if(appKF==='Kickboxen') return /Kickbox/i.test(it.n);
      if(appKF==='BJJ') return /BJJ/i.test(it.n);
      if(appKF==='Ruhige Kurse') return it.occ==='ruhig';
      return true;
    };
    const days = D.schedule.map(d=>{
      const items=d.items.filter(match); if(!items.length) return '';
      return `<div style="margin-bottom:16px">
        <div style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px;color:var(--muted);margin-bottom:8px">${d.day}</div>
        ${items.map(i=>{ const key=(d.day+i.t+i.n).replace(/\s/g,''); const voll=i.occ==='voll'||i.occ==='sehr'; const w=waitset[key];
          const btn = voll
            ? (w?`<span class="badge b-amber" style="margin-top:6px">✓ Warteliste</span>`
                :`<button class="btn btn-dark btn-sm" style="margin-top:6px" data-action="app-wait" data-k="${key}">Warteliste</button>`)
            : `<button class="btn btn-dark btn-sm" style="margin-top:6px" data-action="toast" data-msg="Gebucht (Demo)">Buchen</button>`;
          return `<div class="app-card" style="margin-bottom:8px;display:flex;justify-content:space-between;align-items:center">
          <div><b style="font-size:15px">${i.t} · ${i.n}</b>${i.rec?`<br><small style="color:var(--green)">✨ Ruhig — empfohlen</small>`:''}</div>
          <div style="text-align:right">${occPill(i.occ)}<br>${btn}</div>
        </div>`; }).join('')}</div>`;
    }).join('');
    return appShell(`
      <h1 class="app-h">Kursplan</h1>
      <div class="choices" style="margin-bottom:16px;flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px">
        ${filters.map(f=>`<button type="button" class="chip ${appKF===f?'sel':''}" data-action="app-kfilter" data-v="${f}" style="white-space:nowrap">${f}</button>`).join('')}</div>
      ${days || '<p class="muted">Keine Kurse für diesen Filter.</p>'}
    `,'#/app/kurse');
  }

  function appAuslastung(){
    const short={ruhig:"Ruhig",normal:"Normal",voll:"Voll",sehr:"Sehr"};
    const rows = D.heatRows.map(r=>`<tr><td class="t-time">${r.time}</td>${r.cells.map(c=>`<td class="${OCC[c].h}">${short[c]}</td>`).join('')}</tr>`).join('');
    return appShell(`
      <h1 class="app-h">Auslastung</h1>
      <div class="live">
        <div class="top"><b>NFT ${D.parent.location} · jetzt</b><span class="occ occ-normal"><span class="dot"></span>Normal · 14/20</span></div>
        <div class="bar"><span style="width:70%"></span></div>
      </div>
      <div class="app-card">
        <b style="font-family:var(--ff-head);text-transform:uppercase;font-size:18px">Diese Woche</b>
        <p class="muted" style="font-size:13px;margin:4px 0 12px">Wann ist es ruhig? Grün = entspannt, Rot = voll.</p>
        <div class="heat"><table><thead><tr><th></th>${D.heatDays.map(d=>`<th>${d}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>
      </div>
      <div class="rec"><div class="ri">✨</div><div><b>Empfehlung für Emir</b><p class="muted" style="margin:4px 0 0;font-size:14px">Mittwoch 16:00 ist diese Woche <b style="color:var(--text)">35 % ruhiger</b> als Dienstag 17:00 — kleinere Gruppe, mehr Aufmerksamkeit vom Trainer. Passt zu deinem Abholfenster.</p>
        <button class="btn btn-primary btn-sm" style="margin-top:12px" data-action="toast" data-msg="Auf Mi 16:00 umgebucht (Demo)">Auf Mi 16:00 umbuchen</button></div></div>
    `,'#/app');
  }

  function appKind(name){
    const k = D.kids.find(x=>x.name===name) || D.kids[0];
    return appShell(`
      <a class="backlink" href="#/app">← Home</a>
      ${kidSwitch(k.name,'#/app/kind')}
      <div class="app-card accent">
        <div class="session"><div class="thumb" style="background:${k.beltColor}22;color:${k.beltColor}">🥋</div>
          <div class="meta"><b>${k.name}, ${k.age} Jahre</b><small>${k.program} · Trainer ${k.trainer}</small>
            <div style="margin-top:6px"><span class="badge" style="background:${k.beltColor}22;color:${k.beltColor}">${k.belt}</span></div></div></div>
      </div>
      <div class="app-card">
        <b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Nächste Einheit</b>
        <div class="list-item"><span class="li-ico">📅</span><div class="li-main"><b>${k.next.day}, ${k.next.time}</b><small>NFT ${D.parent.location} · ${OCC[k.next.occ].l}</small></div>${occPill(k.next.occ)}</div>
        ${k.buddy?`<div class="list-item"><span class="li-ico">🤝</span><div class="li-main"><b>Trainingsbuddy: ${k.buddy}</b><small>trainiert im selben Kurs — hilft beim Ankommen</small></div></div>`:''}
      </div>
      <div class="app-card">
        <b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Anwesenheit</b>
        <div class="list-item"><span class="li-ico">✅</span><div class="li-main"><b>Check-in 15:58 · Check-out 17:03</b><small>Mittwoch · ${k.program}</small></div></div>
        <div class="list-item"><span class="li-ico">✅</span><div class="li-main"><b>Check-in 16:01 · Check-out 17:00</b><small>letzte Woche</small></div></div>
        <div class="notice" style="margin:12px 0 0">🔔 Du bekommst automatisch eine Push, sobald ${k.name} ankommt und wieder geht.</div>
      </div>
      <div class="rowbtns">
        <a class="btn btn-primary btn-block" href="#/app/fortschritt">Fortschritt</a>
        <a class="btn btn-dark btn-block" href="#/app/erfolge/${k.name}">Erfolge</a>
        <a class="btn btn-dark btn-block" href="#/app/momente">Momente</a>
      </div>
    `,'#/app');
  }

  function appFortschritt(name){
    const k = D.kids.find(x=>x.name===name) || D.kids[0];
    const belts = k.belts.map((b,i)=>`<div class="belt-step ${i<k.beltIdx?'done':''} ${i===k.beltIdx?'cur':''}">
      <div class="bdot"></div><div><b>${b}</b><small>${i<k.beltIdx?'geschafft':i===k.beltIdx?'aktuell':'nächstes Ziel'}</small></div></div>`).join('');
    const skills = k.skills.map(s=>`<div class="skill"><div class="sr"><span>${s.n}</span><span class="muted">${s.v}%</span></div><div class="st"><span style="width:${s.v}%"></span></div></div>`).join('');
    const wr = (D.weeklyReports||[]).find(r=>r.kid===k.name && r.status==='freigegeben');
    return appShell(`
      <a class="backlink" href="#/app/kind/${k.name}">← ${k.name}</a>
      <h1 class="app-h">Fortschritt · ${k.name}</h1>
      ${kidSwitch(k.name,'#/app/fortschritt')}
      ${wr?`<div class="app-card" style="border-color:var(--red)"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">📋 Wochenreport</b>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin:10px 0">${wr.tags.map(t=>`<span class="badge b-gray" style="text-transform:none;letter-spacing:0">${t}</span>`).join('')}</div>
        <p class="muted" style="margin:0;font-size:14px">${wr.text}</p>
        <small class="muted" style="display:block;margin-top:8px">— Trainer ${k.trainer}, diese Woche</small></div>`:''}
      <div class="app-card accent" style="text-align:center">
        <div style="font-size:40px">🎯</div>
        <b style="font-size:17px">Noch ca. ${k.classesToTest} Trainings bis zur nächsten Prüfung</b>
        <p class="muted" style="margin:6px 0 0;font-size:14px">Aktueller Gürtel: ${k.belt}</p>
      </div>
      <div class="app-card"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Gürtelweg</b>
        <div class="belt-path" style="margin-top:8px">${belts}</div></div>
      <div class="app-card"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Skills</b>
        <div style="margin-top:12px">${skills}</div></div>
      <div class="app-card"><div style="display:flex;justify-content:space-between;align-items:center"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Abzeichen</b><a href="#/app/erfolge/${k.name}" style="color:var(--red-ink);font-weight:600;font-size:14px">Alle</a></div>
        <div style="display:flex;gap:12px;margin-top:12px;flex-wrap:wrap">${k.badges.slice(0,5).map(b=>`<div style="text-align:center;width:58px;opacity:${b.got?1:.32}"><div style="font-size:28px">${b.i}</div><div style="font-size:10px;color:var(--muted);line-height:1.15;margin-top:3px">${b.n}</div></div>`).join('')}</div></div>
      <div class="app-card"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Trainer-Feedback</b>
        ${(k.feedbackLog && k.feedbackLog.length)
          ? k.feedbackLog.slice().reverse().map(f=>`<div class="bubble" style="margin-top:10px">${f.text?f.text+'<br>':''}${(f.skills&&f.skills.length)?`<small class="muted">Heute geübt: ${f.skills.join(', ')}</small><br>`:''}<small class="muted">— Trainer ${k.trainer} · ${f.time}</small></div>`).join('')
          : `<p class="muted" style="margin:10px 0 0;font-size:14px">„${k.name} war heute sehr konzentriert und hat seine Kombinationen sauberer ausgeführt. Nächster Fokus: Deckung nach dem Angriff." <br><small>— Trainer ${k.trainer}</small></p>`}</div>
    `,'#/app/fortschritt');
  }

  function appErfolge(name){
    const k = D.kids.find(x=>x.name===name) || D.kids[0];
    const beltMap = k.belts.map((b,i)=>`<div style="display:flex;flex-direction:column;align-items:center;gap:5px;flex:1">
      <div style="width:32px;height:32px;border-radius:50%;border:3px solid ${i<=k.beltIdx?'var(--green)':'var(--line)'};background:${i===k.beltIdx?'var(--red)':i<k.beltIdx?'var(--green)':'var(--surface)'}"></div>
      <small style="font-size:10px;text-align:center;color:${i===k.beltIdx?'var(--text)':'var(--muted)'}">${b}</small></div>`)
      .join('<div style="flex:0 0 14px;height:3px;background:var(--line);margin-top:14px"></div>');
    return appShell(`
      <a class="backlink" href="#/app/kind/${k.name}">← ${k.name}</a>
      <h1 class="app-h">Erfolge · ${k.name}</h1>
      ${kidSwitch(k.name,'#/app/erfolge')}
      <div class="app-card accent" style="text-align:center">
        <div style="font-size:42px">${(sickset[k.name]||ferienOn)?'❄️':'🔥'}</div>
        <b style="font-size:19px">${k.streak}-Wochen-Serie${(sickset[k.name]||ferienOn)?' · eingefroren':''}</b>
        <p class="muted" style="margin:4px 0 0;font-size:14px">${(sickset[k.name]||ferienOn)?'Kein Stress — die Serie wartet, bis ihr zurück seid.':'Weiter so — das nächste Training hält die Serie am Leben!'}</p>
      </div>
      <div class="app-card"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Nächstes Abzeichen</b>
        <div style="display:flex;gap:8px;margin-top:12px">${Array.from({length:k.stripesMax}).map((_,i)=>`<div style="flex:1;height:14px;border-radius:100px;background:${i<k.stripes?'var(--red)':'var(--surface-3)'}"></div>`).join('')}</div>
        <p class="muted" style="font-size:13px;margin:8px 0 0">${k.stripes} von ${k.stripesMax} Stripes</p>
      </div>
      <div class="app-card"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Gürtel-Reise</b>
        <div style="display:flex;align-items:flex-start;margin-top:16px">${beltMap}</div>
      </div>
      <div class="app-card"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Abzeichen-Sammlung</b>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:16px">
          ${k.badges.map(b=>`<div style="text-align:center;opacity:${b.got?1:.32}"><div style="font-size:38px">${b.i}</div><div style="font-size:12px;margin-top:5px">${b.n}</div><div class="badge ${b.got?'b-green':'b-gray'}" style="margin-top:6px">${b.got?'✓':'🔒'}</div></div>`).join('')}
        </div>
      </div>
      <button class="btn btn-primary btn-block" data-action="toast" data-msg="Urkunde geteilt (Demo)">🏆 Urkunde teilen</button>
    `,'#/app');
  }

  function appMomente(){
    const list = D.moments.filter(m=>m.kid==='Emir');
    return appShell(`
      <h1 class="app-h">Trainingsmomente</h1>
      <div class="notice">📸 Trainer teilen kurze Fotos & Videos — nur mit deiner Einwilligung, privat für die Familie.</div>
      ${list.map(m=>`<div class="app-card" style="padding:0;overflow:hidden">
        <div style="height:150px;background:linear-gradient(135deg,#20161b,#0c0c0e);display:flex;align-items:center;justify-content:center;font-size:52px;position:relative">${m.ico}
          <span class="tag" style="position:absolute;top:12px;left:12px">${m.type}</span></div>
        <div style="padding:14px"><b>${m.cap}</b><br><small class="muted">${m.kid} · ${m.time} · Trainer ${m.trainer}</small></div>
      </div>`).join('')}
      <div class="app-card" style="display:flex;gap:12px;align-items:center;opacity:.85">
        <div class="thumb" style="font-size:22px">🔒</div>
        <div class="meta" style="flex:1"><b>Sara · keine Momente</b><small>Foto/Video-Einwilligung nicht erteilt</small></div>
        <a class="btn btn-dark btn-sm" href="#/app/konto">Aktivieren</a>
      </div>
    `,'#/app');
  }

  function appNachrichten(){
    const anyUnread = D.messages.some((m,i)=>m.unread && !readMsgs.has(i));
    return appShell(`
      <h1 class="app-h">Nachrichten</h1>
      ${anyUnread?`<button class="btn btn-dark btn-block" data-action="msg-read-all" style="margin-bottom:12px">Alle als gelesen markieren</button>`:''}
      <div class="app-card" style="padding:4px 16px">
        ${D.messages.map((m,i)=>{ const un=m.unread && !readMsgs.has(i);
          return `<a class="list-item" href="#/app/nachrichten/${i}"><span class="li-ico">${m.ico}</span>
            <div class="li-main"><b>${m.title}</b><small>${m.from} · ${m.time}</small></div>
            ${un?'<span class="unread"></span>':'<span class="muted">›</span>'}</a>`; }).join('')}
      </div>
      <a class="btn btn-dark btn-block" href="#/app/nachrichten/1">Nachricht an Trainer schreiben</a>
    `,'#/app/nachrichten');
  }

  function appZahlungen(){
    const row = p=>{
      const b = p.status==='bezahlt'?'b-green':p.status==='offen'?'b-amber':'b-red';
      return `<div class="pay-row"><div><b>${p.who}</b><br><small>${p.info}</small></div>
        <div style="text-align:right"><b>${p.amount}</b><br><span class="badge ${b}">${p.status}</span></div></div>`;
    };
    return appShell(`
      <h1 class="app-h">Zahlungen & Vertrag</h1>
      <div class="app-card">${D.payments.map(row).join('')}</div>
      ${D.payments.some(p=>p.status==='offen')?`<button class="btn btn-primary btn-block" data-action="toast" data-msg="Zahlungslink geöffnet (Demo)" style="margin-bottom:14px">Offene Zahlung begleichen</button>`:''}
      <div class="app-card">
        <b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Mitgliedschaft</b>
        <div class="list-item"><span class="li-ico">📄</span><div class="li-main"><b>Emir · Kids Premium</b><small>Aktiv seit 01.03.2026 · SEPA-Lastschrift</small></div><span class="badge b-green">aktiv</span></div>
        <div class="list-item"><span class="li-ico">🏦</span><div class="li-main"><b>SEPA-Mandat</b><small>DE•• •••• 4321 · nächste Abbuchung 01.08.</small></div></div>
        <div class="rowbtns" style="margin-top:12px">
          <button class="btn btn-dark" data-action="toast" data-msg="Pausierung beantragt (Demo)">Pausieren</button>
          <a class="btn btn-dark" href="#/kuendigen">Kündigen</a>
        </div>
      </div>
      <div class="app-card" style="border-color:var(--gold)">
        <div style="display:flex;gap:12px;align-items:center"><div class="thumb" style="background:var(--gold-050);color:var(--gold);font-size:24px">🛡️</div>
          <div class="meta" style="flex:1"><b>Mitglied seit ${D.loyalty.since} — danke für eure Treue!</b>
          <small>Ab ${D.loyalty.flexAb} ist dein Vertrag automatisch monatlich kündbar (§ 309 BGB). Als Dankeschön wartet dann: ${D.loyalty.offer}.</small></div></div>
      </div>
    `,'#/app/konto');
  }

  function appKonto(){
    const toggle=(k,label,sub)=>`<div class="consent"><div><b>${label}</b><br><small>${sub}</small></div>
      <button type="button" role="switch" aria-checked="${consent[k]}" class="switch ${consent[k]?'on':''}" data-action="consent" data-k="${k}"><span class="track"></span></button></div>`;
    return appShell(`
      <h1 class="app-h">Konto</h1>
      <div class="app-card">
        <div class="session"><div class="avatar" style="width:52px;height:52px;font-size:22px">${D.parent.first[0]}</div>
          <div class="meta"><b>${D.parent.name}</b><small>Elternkonto · NFT ${D.parent.location}</small></div></div>
      </div>
      <div class="app-card"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Meine Kinder</b>
        ${D.kids.map(k=>`<a class="list-item" href="#/app/kind/${k.name}"><span class="li-ico">🥋</span><div class="li-main"><b>${k.name}, ${k.age}</b><small>${k.program} · ${k.belt}</small></div><span class="muted">›</span></a>`).join('')}
        <a class="list-item" href="#/app/zahlungen"><span class="li-ico">💶</span><div class="li-main"><b>Zahlungen & Vertrag</b><small>SEPA · Rechnungen</small></div><span class="muted">›</span></a>
      </div>
      <div class="app-card"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Einwilligungen</b>
        <p class="muted" style="font-size:13px;margin:4px 0 6px">DSGVO-konform, jederzeit widerrufbar.</p>
        ${toggle('fotoEmir','Foto/Video · Emir','Trainingsmomente in der App teilen')}
        ${toggle('fotoSara','Foto/Video · Sara','Trainingsmomente in der App teilen')}
        ${toggle('marketing','Marketing & News','Angebote & Neuigkeiten per E-Mail')}
        ${toggle('whatsapp','WhatsApp','Kurzinfos via WhatsApp')}
      </div>
      <div class="app-card"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Ferienmodus</b>
        <div class="consent" style="border-bottom:0"><div><b>Wir sind im Urlaub</b><br><small>Kurse abmelden, Streak einfrieren, Pushes pausieren</small></div>
          <button class="switch ${ferienOn?'on':''}" data-action="app-ferien" role="switch" aria-checked="${ferienOn}" aria-label="Ferienmodus"><span class="track"></span></button></div>
      </div>
      <div class="app-card"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Dein Team</b>
        <div class="list-item"><span class="li-ico">${D.team.trainer.ico}</span><div class="li-main"><b>${D.team.trainer.name}</b><small>${D.team.trainer.role}</small></div>
          <a class="btn btn-dark btn-sm" href="#/app/nachrichten/1">Nachricht</a></div>
        <div class="list-item"><span class="li-ico">${D.team.leitung.ico}</span><div class="li-main"><b>${D.team.leitung.name}</b><small>${D.team.leitung.role} · NFT ${D.parent.location}</small></div>
          <a class="btn btn-dark btn-sm" href="#/app/nachrichten/0">Nachricht</a></div>
      </div>
      <div class="app-card"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Konto-Setup</b>
        <p class="muted" style="font-size:13px;margin:4px 0 6px">${Object.values(setup).filter(Boolean).length} von 4 erledigt — so holt ihr alles raus.</p>
        <div class="list-item"><span class="li-ico">${setup.push?'✅':'⬜'}</span><div class="li-main"><b>Push-Benachrichtigungen</b><small>Check-in/out &amp; Wochenreport</small></div></div>
        <div class="list-item"><span class="li-ico">${setup.foto?'✅':'⬜'}</span><div class="li-main"><b>Foto-Einwilligungen entschieden</b><small>je Kind, jederzeit änderbar</small></div></div>
        <div class="list-item"><span class="li-ico">${setup.kalender?'✅':'⬜'}</span><div class="li-main"><b>Familienkalender verbinden</b><small>Trainings automatisch im Kalender</small></div>
          ${setup.kalender?'':'<button class="btn btn-dark btn-sm" data-action="setup-done" data-k="kalender">Verbinden</button>'}</div>
        <div class="list-item"><span class="li-ico">${setup.partner?'✅':'⬜'}</span><div class="li-main"><b>Zweiten Elternteil einladen</b><small>beide informiert = entspannter Alltag</small></div>
          ${setup.partner?'':'<button class="btn btn-primary btn-sm" data-action="setup-done" data-k="partner">Einladen</button>'}</div>
      </div>
      <div class="app-card" style="border-color:var(--green)">
        <b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">🎁 Freunde werben</b>
        <p class="muted" style="font-size:13px;margin:4px 0 10px">${D.referral.status}</p>
        <div style="display:flex;gap:10px;align-items:center">
          <div style="flex:1;font-family:var(--ff-head);font-size:22px;letter-spacing:3px;background:var(--surface-2);border:1px dashed var(--green);border-radius:10px;padding:10px;text-align:center">${D.referral.code}</div>
          <button class="btn btn-primary btn-sm" data-action="toast" data-msg="Code kopiert & Teilen geöffnet (Demo)">Teilen</button>
        </div>
        <p class="muted" style="font-size:12px;margin:8px 0 0">Wird dein Freund Mitglied, bekommt ihr beide einen Gratis-Monat.</p>
      </div>
      <div class="app-card"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">${t('lang_label')} · Dil · اللغة</b>
        <div class="choices" style="margin-top:10px">
          ${Object.keys(T).map(k=>`<button type="button" class="chip ${k===lang?'sel':''}" data-action="lang-chip" data-v="${k}">${T[k].name}</button>`).join('')}
        </div>
      </div>
      <div class="app-card"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Design</b>
        <div class="choices" style="margin-top:10px">
          <button type="button" class="chip ${theme==='dark'?'sel':''}" data-action="theme-set" data-v="dark">🌙 Dunkel</button>
          <button type="button" class="chip ${theme==='light'?'sel':''}" data-action="theme-set" data-v="light">☀️ Hell</button>
        </div>
      </div>
      <div class="app-card"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Dokumente auf Knopfdruck</b>
        <p class="muted" style="font-size:13px;margin:4px 0 6px">Sofort als PDF — z. B. fürs Krankenkassen-Bonusprogramm.</p>
        ${D.documents.map(d=>`<div class="list-item"><span class="li-ico">${d.ico}</span>
          <div class="li-main"><b>${d.name}</b><small>${d.desc}</small></div>
          ${docsDone[d.id]?'<span class="badge b-green">✓ PDF erstellt</span>':`<button class="btn btn-dark btn-sm" data-action="app-doc" data-id="${d.id}">Erstellen</button>`}
        </div>`).join('')}
      </div>
      <div class="app-card"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Community & Mehr</b>
        <a class="list-item" href="#/app/hilfe"><span class="li-ico">🤖</span><div class="li-main"><b>Hilfe & Fragen</b><small>Sofort-Antworten · oder Mensch</small></div><span class="muted">›</span></a>
        <a class="list-item" href="#/app/mitbestimmen"><span class="li-ico">🗳️</span><div class="li-main"><b>Mitbestimmen</b><small>Feature-Voting · Ihr habt gesagt → getan</small></div><span class="muted">›</span></a>
        <a class="list-item" href="#/app/community"><span class="li-ico">🎉</span><div class="li-main"><b>Events, Shop & Videos</b><small>Turniere, Pro-Shop, Technik-Videos, Party</small></div><span class="muted">›</span></a>
        <a class="list-item" href="#/app/onboarding"><span class="li-ico">🚀</span><div class="li-main"><b>Meine ersten 30 Tage</b><small>Onboarding-Fortschritt</small></div><span class="muted">›</span></a>
      </div>
      <div class="app-card"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Rechtliches</b>
        <div style="display:flex;flex-wrap:wrap;gap:16px;margin-top:12px">
          <a href="#/impressum" class="red-ink" style="font-weight:600;font-size:14px">Impressum</a>
          <a href="#/datenschutz" class="red-ink" style="font-weight:600;font-size:14px">Datenschutz</a>
          <a href="#/agb" class="red-ink" style="font-weight:600;font-size:14px">AGB</a>
          <a href="#/kuendigen" class="red-ink" style="font-weight:600;font-size:14px">Vertrag kündigen</a>
        </div></div>
      <a class="btn btn-dark btn-block" href="#/" style="margin-bottom:10px">Zur Website</a>
      <button class="btn btn-danger btn-block" data-action="logout">Abmelden</button>
    `,'#/app/konto');
  }

  /* ---------- Website: Events / Shop / Referral / Legal ---------- */
  const EV_ICO = {Turnier:'🏆',Feriencamp:'⛺',Geburtstag:'🎂',Lehrgang:'🎓'};
  function eventsPage(){
    return siteShell(`<div class="section" style="padding-top:36px"><div class="container">
      <div class="section-head"><div><div class="kicker"><span class="slash sm"><i></i><i></i></span> Events</div>
        <h2>Turniere, Camps & Feiern</h2><p>Mehr als Training — erlebe die NFT-Community.</p></div></div>
      <div class="grid g-2">${D.events.map(e=>`<div class="card hover">
        ${e.img?`<img src="${e.img}" alt="" style="width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:12px;margin-bottom:14px" onerror="this.remove()">`:''}
        <div style="display:flex;justify-content:space-between;align-items:flex-start"><span class="tag">${e.cat}</span><b style="font-size:30px">${EV_ICO[e.cat]||'📅'}</b></div>
        <h3 style="margin:12px 0 6px;text-transform:none;letter-spacing:0">${e.title}</h3>
        <p class="muted" style="margin:0 0 4px">📅 ${e.date} · 📍 ${e.loc}</p>
        <p class="muted" style="margin:0 0 14px">${e.desc}</p>
        <div style="display:flex;justify-content:space-between;align-items:center"><b>${e.price}</b>
          ${e.id==='feriencamp'
            ? `<a class="btn btn-primary btn-sm" href="#/camp">Jetzt buchen</a>`
            : `<button class="btn btn-primary btn-sm" data-action="toast" data-msg="Anmeldung gestartet (Demo)">Anmelden</button>`}</div>
      </div>`).join('')}</div></div></div>`,'#/events');
  }
  function shopPage(){
    return siteShell(`<div class="section" style="padding-top:36px"><div class="container">
      <div class="section-head"><div><div class="kicker"><span class="slash sm"><i></i><i></i></span> Pro-Shop</div>
        <h2>Ausrüstung & Bekleidung</h2><p>Alles fürs Training — online reservieren, am Standort abholen.</p></div>
        <a class="btn btn-dark btn-sm" href="#/app/warenkorb">${ICON('cart')} Warenkorb${cart.length?` (${cart.length})`:''}</a></div>
      <div class="grid g-3">${D.shop.map(s=>`<div class="card hover">
        ${s.img?`<img src="${s.img}" alt="" style="height:120px;width:100%;object-fit:cover;border-radius:12px;margin-bottom:14px" onerror="this.remove()">`:`<div style="height:120px;display:flex;align-items:center;justify-content:center;font-size:56px;background:linear-gradient(135deg,#20161b,#0c0c0e);border-radius:12px;margin-bottom:14px">${s.ico}</div>`}
        <span class="tag ghost">${s.cat}</span><h3 style="margin:10px 0 4px;font-size:19px;text-transform:none;letter-spacing:0">${s.name}</h3>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px"><b>${s.price}</b>
          <button class="btn btn-dark btn-sm" data-action="cart-add" data-id="${s.id}">In den Korb</button></div>
      </div>`).join('')}</div></div></div>`,'#/shop');
  }
  function empfehlenPage(){
    return siteShell(`<div class="section" style="padding-top:36px"><div class="container" style="max-width:900px">
      <div class="center" style="margin-bottom:26px"><div class="kicker" style="justify-content:center"><span class="slash sm"><i></i><i></i></span> Empfehlen</div>
        <h2>Freund werben — Freimonat sichern</h2><p class="muted">Empfiehl NFT weiter: Wird dein Freund Mitglied, bekommt ihr beide einen Gratis-Monat.</p></div>
      <div class="card" style="max-width:560px;margin:0 auto 40px">
        <div class="field"><label for="ref-name">Dein Name</label><input id="ref-name" placeholder="Vor- und Nachname"></div>
        <div class="field"><label for="ref-mail">E-Mail des Freundes</label><input id="ref-mail" type="email" placeholder="freund@mail.de"></div>
        <button class="btn btn-primary btn-block" data-action="toast" data-msg="Einladung gesendet (Demo)">Einladung senden</button>
      </div>
      <div class="section-head"><div><div class="kicker"><span class="slash sm"><i></i><i></i></span> Bewertungen</div><h2>Das sagen Familien</h2></div></div>
      <div class="grid g-3">${D.testimonials.map(t=>`<div class="card"><div style="color:var(--gold);margin-bottom:8px;letter-spacing:2px">${'★'.repeat(t.stars)}</div>
        <p style="margin:0 0 12px">„${t.text}"</p><b>${t.name}</b><br><small class="muted">${t.kid}</small></div>`).join('')}</div>
    </div></div>`,'#/empfehlen');
  }
  function legalPage(kind){
    const T={impressum:['Impressum','Angaben gemäß § 5 TMG'],datenschutz:['Datenschutz','Informationen nach DSGVO'],agb:['AGB','Allgemeine Geschäftsbedingungen']};
    const t=T[kind]||T.impressum;
    return siteShell(`<div class="section" style="padding-top:36px"><div class="container" style="max-width:760px">
      <div class="kicker"><span class="slash sm"><i></i><i></i></span> Rechtliches</div><h2>${t[0]}</h2>
      <p class="muted" style="margin-top:8px">${t[1]}</p>
      <div class="card" style="margin-top:18px">
        <p class="muted">NFT Gym GmbH · Musterstraße 1 · 41065 Mönchengladbach · Geschäftsführer: Max Mustermann · Handelsregister: HRB 00000 · USt-IdNr.: DE000000000</p>
        <p class="muted">Dies ist ein Prototyp — Platzhaltertext. Der finale ${t[0]}-Text wird vom Kunden bereitgestellt.</p></div>
    </div></div>`,'#/'+kind);
  }

  /* ---------- App: Community / Shop / Videos / Onboarding ---------- */
  function appCommunity(){
    return appShell(`
      <h1 class="app-h">Community & Mehr</h1>
      <div class="app-card"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Events & Turniere</b>
        ${D.events.slice(0,3).map(e=>`<div class="list-item"><span class="li-ico">${EV_ICO[e.cat]||'📅'}</span>
          <div class="li-main"><b>${e.title}</b><small>${e.date} · ${e.price}</small></div>
          <button class="btn btn-dark btn-sm" data-action="toast" data-msg="Angemeldet (Demo)">Anmelden</button></div>`).join('')}
      </div>
      <a class="app-card" href="#/app/pt" style="display:flex;gap:12px;align-items:center"><div class="thumb" style="font-size:22px">🧑‍🏫</div><div class="meta" style="flex:1"><b>Personal Training</b><small>1:1 mit deinem Coach — ab 49 €</small></div><span class="muted">›</span></a>
      <a class="app-card" href="#/gutscheine" style="display:flex;gap:12px;align-items:center"><div class="thumb" style="font-size:22px">🎁</div><div class="meta" style="flex:1"><b>Geschenk-Gutscheine</b><small>Von Oma & Opa: Kampfsport-Zeit schenken</small></div><span class="muted">›</span></a>
      <a class="app-card" href="#/app/shop" style="display:flex;gap:12px;align-items:center"><div class="thumb" style="font-size:22px">🛒</div><div class="meta" style="flex:1"><b>Pro-Shop</b><small>Gi, Handschuhe & mehr</small></div><span class="muted">›</span></a>
      <a class="app-card" href="#/app/videos" style="display:flex;gap:12px;align-items:center"><div class="thumb" style="font-size:22px">🎬</div><div class="meta" style="flex:1"><b>Technik-Videos</b><small>Üben zuhause nach Gürtel</small></div><span class="muted">›</span></a>
      <div class="app-card" style="display:flex;gap:12px;align-items:center"><div class="thumb" style="font-size:22px">🎂</div><div class="meta" style="flex:1"><b>Geburtstag im Studio feiern</b><small>2 Std. Action mit Trainer</small></div>
        <button class="btn btn-primary btn-sm" data-action="toast" data-msg="Party-Anfrage gesendet (Demo)">Buchen</button></div>
      <div class="app-card" style="display:flex;gap:12px;align-items:center"><div class="thumb" style="font-size:22px">🎁</div><div class="meta" style="flex:1"><b>Freund werben</b><small>Gratis-Monat für euch beide</small></div>
        <button class="btn btn-dark btn-sm" data-action="toast" data-msg="Einladung geteilt (Demo)">Teilen</button></div>
    `,'#/app/konto');
  }
  function appShop(){
    return appShell(`<a class="backlink" href="#/app/community">← Mehr</a>
      <h1 class="app-h">Pro-Shop</h1>
      ${D.shop.map(s=>`<div class="app-card" style="display:flex;gap:12px;align-items:center">
        ${s.img?`<img src="${s.img}" alt="" style="width:52px;height:52px;border-radius:12px;object-fit:cover;flex-shrink:0">`:`<div class="thumb" style="font-size:24px">${s.ico}</div>`}<div class="meta" style="flex:1"><b>${s.name}</b><small>${s.cat} · ${s.price}</small></div>
        <button class="btn btn-primary btn-sm" data-action="cart-add" data-id="${s.id}" aria-label="${s.name} in den Warenkorb">+</button></div>`).join('')}
    `,'#/app/konto');
  }
  function appVideos(){
    const belts=[...new Set(D.videos.map(v=>v.belt))];
    return appShell(`<a class="backlink" href="#/app/community">← Mehr</a>
      <h1 class="app-h">Technik-Videos</h1>
      <div class="notice">Nach Gürtelstufe sortiert — perfekt zum Üben zuhause.</div>
      ${belts.map(b=>`<div style="margin-bottom:4px"><div style="font-family:var(--ff-head);text-transform:uppercase;color:var(--muted);font-size:15px;margin:10px 0 6px">${b}</div>
        ${D.videos.filter(v=>v.belt===b).map(v=>`<div class="app-card" style="display:flex;gap:12px;align-items:center;margin-bottom:8px">
          <div class="thumb" style="font-size:20px">▶️</div><div class="meta" style="flex:1"><b>${v.title}</b><small>${v.dur} min</small></div>
          <button class="btn btn-dark btn-sm" data-action="toast" data-msg="Video abspielen (Demo)">Ansehen</button></div>`).join('')}</div>`).join('')}
    `,'#/app/konto');
  }
  function appOnboarding(){
    return appShell(`<a class="backlink" href="#/app">← Home</a>
      <h1 class="app-h">Deine ersten 30 Tage</h1>
      <div class="notice">Kinder, die im 1. Monat ≥ 8× trainieren, bleiben langfristig dabei. Wir begleiten euch Schritt für Schritt.</div>
      <div class="app-card"><div class="belt-path">
        ${D.onboarding.map(o=>`<div class="belt-step ${o.done?'done':''} ${o.cur?'cur':''}"><div class="bdot"></div>
          <div><b>${o.day} · ${o.title}</b><small>${o.desc}</small></div></div>`).join('')}
      </div></div>
    `,'#/app');
  }

  /* ---------- Auth / 404 / Warenkorb / Nachrichten-Thread ---------- */
  function loginPage(){
    return siteShell(`<div class="authwrap"><div class="authcard card">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:6px"><span class="slash"><i></i><i></i></span><h2 style="margin:0">Mitglieder-Login</h2></div>
      <p class="muted" style="margin-bottom:18px">Melde dich an, um Kurse, Fortschritt & Zahlungen zu verwalten.</p>
      <div class="field"><label for="lg-mail">E-Mail</label><input id="lg-mail" type="email" value="nicole.a@mail.de" autocomplete="username"></div>
      <div class="field"><label for="lg-pw">Passwort</label><input id="lg-pw" type="password" value="demo1234" autocomplete="current-password"></div>
      <button class="btn btn-primary btn-block" data-action="login">Anmelden</button>
      <div style="display:flex;justify-content:space-between;margin-top:14px;font-size:14px">
        <a href="#/kuendigen" class="muted" style="text-decoration:underline">Passwort vergessen?</a>
        <a href="#/probetraining" style="color:var(--red-ink);font-weight:600">Noch kein Mitglied?</a>
      </div>
      <p class="muted" style="font-size:12px;margin-top:14px">Demo — Zugangsdaten sind vorausgefüllt.</p>
    </div></div>`,'#/login');
  }
  function notFoundSite(){
    return siteShell(`<div class="section" style="padding-top:56px"><div class="container center">
      <div class="slash lg" style="justify-content:center;display:inline-flex;margin-bottom:16px"><i></i><i></i></div>
      <div style="font-family:var(--ff-head);font-size:96px;line-height:1;color:var(--red)">404</div>
      <h2 style="margin-top:8px">Seite nicht gefunden</h2>
      <p class="muted" style="max-width:420px;margin:10px auto 22px">Diese Seite gibt es nicht (mehr). Vielleicht hilft dir eine dieser Optionen:</p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        <a class="btn btn-primary" href="#/">Zur Startseite</a>
        <a class="btn btn-ghost" href="#/kursfinder">Kurs finden</a>
        <a class="btn btn-ghost" href="#/standorte">Standorte</a>
      </div></div></div>`,'');
  }
  function appNotFound(){
    return appShell(`<div class="center" style="padding:40px 0">
      <div style="font-family:var(--ff-head);font-size:72px;color:var(--red)">404</div>
      <h1 class="app-h" style="text-align:center">Nicht gefunden</h1>
      <p class="muted">Diese Ansicht gibt es nicht.</p>
      <a class="btn btn-primary btn-block" href="#/app" style="margin-top:16px">Zur App-Startseite</a>
    </div>`,'#/app');
  }
  function appWarenkorb(){
    if(!cart.length){
      return appShell(`<h1 class="app-h">Warenkorb</h1>
        <div class="app-card center" style="padding:34px">${ICON('cart')}
          <b style="display:block;margin-top:10px">Dein Warenkorb ist leer</b>
          <p class="muted" style="margin:6px 0 0">Stöbere im Pro-Shop nach Ausrüstung.</p>
          <a class="btn btn-primary btn-block" href="#/app/shop" style="margin-top:16px">Zum Pro-Shop</a></div>`,'#/app/konto');
    }
    const items = cart.map((id,idx)=>({ s:D.shop.find(x=>x.id===id), idx })).filter(x=>x.s);
    const total = items.reduce((n,{s})=>n + parseFloat(s.price.replace(/[^0-9,]/g,'').replace(',','.')),0);
    return appShell(`<h1 class="app-h">Warenkorb</h1>
      ${items.map(({s,idx})=>`<div class="app-card" style="display:flex;gap:12px;align-items:center">
        ${s.img?`<img src="${s.img}" alt="" style="width:52px;height:52px;border-radius:12px;object-fit:cover;flex-shrink:0">`:`<div class="thumb" style="font-size:24px">${s.ico}</div>`}<div class="meta" style="flex:1"><b>${s.name}</b><small>${s.price}</small></div>
        <button class="btn btn-danger btn-sm" data-action="cart-remove" data-idx="${idx}">Entfernen</button></div>`).join('')}
      <div class="app-card" style="display:flex;justify-content:space-between;align-items:center"><b>Summe</b><b style="font-size:18px">${total.toFixed(2).replace('.',',')} €</b></div>
      <button class="btn btn-primary btn-block" data-action="cart-checkout">Reservieren &amp; am Standort abholen</button>
      <p class="muted" style="font-size:12px;margin-top:8px">Demo — keine echte Zahlung. Abholung & Bezahlung vor Ort.</p>
    `,'#/app/konto');
  }
  function appNachricht(i){
    const m = D.messages[i]; if(!m) return appNotFound();
    readMsgs.add(i);
    return appShell(`<a class="backlink" href="#/app/nachrichten">← Nachrichten</a>
      <h1 class="app-h">${m.title}</h1>
      <p class="muted" style="margin:-8px 0 14px">${m.from} · ${m.time}</p>
      <div class="app-card">
        <div class="bubble">${m.text}</div>
        ${(replies[i]||[]).map(r=>`<div class="bubble me">${r}</div>`).join('')}
        <div class="reply-bar">
          <input id="reply-input" placeholder="Antwort schreiben…" aria-label="Antwort schreiben">
          <button class="btn btn-primary btn-sm" data-action="msg-reply">Senden</button>
        </div>
      </div>`,'#/app/nachrichten');
  }

  /* ---------- "Dein erstes Training" (Show-Rate-Booster) ---------- */
  function erstesTraining(){
    const steps = [
      ["🚗","10 Min. früher da sein","Parkplätze direkt vorm Studio (Kölner Str. 44). Einfach reinkommen — die Rezeption erwartet euch."],
      ["👋","Begrüßung & Rundgang","Laura zeigt euch Umkleide & Matte. Dein Kind wird dem Trainer persönlich vorgestellt — er kennt den Namen schon."],
      ["🥋","60 Minuten mittrainieren","Aufwärmspiel, erste Techniken, Abschlussspiel. Du kannst beim ersten Mal gern zuschauen."],
      ["🍎","Kurzes Feedback","Der Trainer sagt dir ehrlich, wie es lief und welcher Kurs passt. Kein Verkaufsdruck — versprochen."],
    ];
    return siteShell(`<div class="section" style="padding-top:36px"><div class="container" style="max-width:720px">
      <div class="kicker"><span class="slash sm"><i></i><i></i></span> Gut vorbereitet</div>
      <h2>So läuft dein erstes Training</h2>
      <p class="muted" style="margin-top:6px">90 Sekunden lesen — dann wisst ihr alles. Kein Grund, nervös zu sein. 💪</p>
      <div class="card" style="margin-top:18px"><div class="belt-path">
        ${steps.map(([i,t,d])=>`<div class="belt-step done"><div class="bdot" style="background:var(--red);border-color:var(--red)"></div>
          <div><b>${i} ${t}</b><small>${d}</small></div></div>`).join('')}
      </div></div>
      <div class="card" style="display:flex;gap:14px;align-items:center">
        <div class="avatar" style="width:54px;height:54px;font-size:24px">M</div>
        <div style="flex:1"><b>Trainer Mehmet</b><br><small class="muted">Head-Coach Kids · seit 12 Jahren auf der Matte · „Bei mir traut sich jedes Kind was zu."</small></div>
      </div>
      <div class="card"><b>✔️ Checkliste</b>
        <ul style="margin:10px 0 0;padding-left:20px;color:var(--text-dim)">
          <li>Bequeme Sportkleidung (kein Gi nötig)</li><li>Trinkflasche</li><li>Barfuß oder Stoppersocken auf der Matte</li><li>Gute Laune — den Rest machen wir</li></ul>
      </div>
      <a class="btn btn-primary btn-block" href="#/probetraining">Noch kein Termin? Jetzt buchen</a>
    </div></div>`,'#/probetraining');
  }

  /* ---------- Mitbestimmen: Feature-Voting + Getan-Feed ---------- */
  function appMitbestimmen(){
    const rm = D.feedback.roadmap;
    const maxV = Math.max(...rm.map(r=>r.votes));
    return appShell(`
      <h1 class="app-h">Mitbestimmen</h1>
      <div class="notice">🗳️ Eure Stimme zählt: Wofür sollen wir als Nächstes Zeit und Geld einsetzen? Jede Familie hat 5 Stimmen.</div>
      <div class="app-card"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Abstimmung läuft</b>
        ${rm.map(r=>`<div style="padding:13px 0;border-bottom:1px solid var(--line-soft)">
          <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
            <div style="flex:1"><b>${r.title}</b><br><small class="muted">${r.desc}</small></div>
            ${r.voted?'<span class="badge b-green">✓ Abgestimmt</span>':`<button class="btn btn-primary btn-sm" data-action="app-vote" data-id="${r.id}">Abstimmen</button>`}
          </div>
          <div class="bar" style="margin-top:10px;height:9px"><span style="width:${Math.round(r.votes/maxV*100)}%;background:var(--red)"></span></div>
          <small class="muted">${r.votes} Stimmen</small>
        </div>`).join('')}
        <button class="btn btn-dark btn-block" style="margin-top:12px" data-action="toast" data-msg="Ideen-Formular (Demo)">💡 Eigene Idee einreichen</button>
      </div>
      <div class="app-card" style="border-color:var(--green)"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">✅ Ihr habt gesagt → Wir haben's getan</b>
        ${D.feedback.done.map(d=>`<div class="list-item"><span class="li-ico">✅</span>
          <div class="li-main"><b>${d.what}</b><small>${d.when} · kam aus: ${d.src}</small></div></div>`).join('')}
      </div>
    `,'#/app/konto');
  }

  /* ---------- Paket D: Camp, Gutscheine, PT, FAQ-Bot ---------- */
  function campPage(){
    const c = D.camp; const pct = Math.round(c.taken/c.spots*100);
    return siteShell(`<div class="section" style="padding-top:36px"><div class="container" style="max-width:720px">
      <div class="kicker"><span class="slash sm"><i></i><i></i></span> Feriencamp · auch für Nicht-Mitglieder</div>
      <h2>${c.title}</h2>
      <p class="muted" style="margin-top:6px">📅 ${c.dates} · 📍 NFT ${c.loc} · 👧 ${c.ages}</p>
      ${D.campImg?`<img src="${D.campImg}" alt="" style="width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:16px;margin-top:18px" onerror="this.remove()">`:''}
      ${campBooked ? `
        <div class="card center" style="margin-top:20px;border-color:var(--green)">
          <div style="font-size:48px">⛺</div>
          <h2 style="color:var(--green);font-size:28px;margin:8px 0">Platz reserviert!</h2>
          <p class="muted">Frühbucher-Preis ${c.priceEarly} gesichert. Bestätigung & Packliste kommen per E-Mail (Demo).</p>
          <a class="btn btn-primary btn-block" href="#/app" style="margin-top:12px">Zur App</a>
        </div>` : `
        <div class="card" style="margin-top:20px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <b>${c.taken} von ${c.spots} Plätzen vergeben</b><span class="badge b-amber">nur noch ${c.spots-c.taken} frei</span></div>
          <div class="bar"><span style="width:${pct}%"></span></div>
          <div style="display:flex;gap:16px;align-items:baseline;margin:18px 0 6px">
            <b style="font-family:var(--ff-head);font-size:34px;color:var(--red)">${c.priceEarly}</b>
            <s class="muted">${c.priceNormal}</s>
            <span class="badge">Frühbucher bis ${c.earlyUntil}</span></div>
          <ul style="margin:14px 0;padding-left:20px;color:var(--text-dim)">${c.program.map(p=>`<li style="margin-bottom:6px">${p}</li>`).join('')}</ul>
          <div class="field"><label for="camp-kid">Name des Kindes</label><input id="camp-kid" placeholder="Vor- und Nachname"></div>
          <div class="field"><label for="camp-mail">E-Mail</label><input id="camp-mail" type="email" placeholder="name@mail.de"></div>
          <button class="btn btn-primary btn-block" data-action="camp-book">Platz zum Frühbucher-Preis sichern</button>
          <p class="muted" style="font-size:12px;margin-top:10px">Demo — keine echte Buchung. Nicht-Mitglieder werden automatisch als Lead angelegt (Camp = Funnel).</p>
        </div>`}
    </div></div>`,'#/events');
  }
  function gutscheinePage(){
    return siteShell(`<div class="section" style="padding-top:36px"><div class="container">
      <div class="center" style="margin-bottom:26px"><div class="kicker" style="justify-content:center"><span class="slash sm"><i></i><i></i></span> Geschenk-Gutscheine</div>
        <h2>Verschenke Stärke</h2><p class="muted" style="max-width:460px;margin:8px auto 0">Das Lieblingsgeschenk von Großeltern: Kampfsport-Zeit statt Spielzeug.</p></div>
      ${D.gutscheinImg?`<img src="${D.gutscheinImg}" alt="" style="display:block;width:100%;max-width:720px;margin:0 auto 26px;aspect-ratio:16/9;object-fit:cover;border-radius:16px" onerror="this.remove()">`:''}
      ${voucherCode ? `
        <div class="card center" style="max-width:520px;margin:0 auto;border-color:var(--green)">
          <div style="font-size:44px">🎁</div>
          <h2 style="font-size:26px;margin:8px 0">Gutschein erstellt!</h2>
          <div style="font-family:var(--ff-head);font-size:32px;letter-spacing:4px;background:var(--surface-2);border:1px dashed var(--red);border-radius:12px;padding:14px;margin:14px 0">${voucherCode}</div>
          <p class="muted">Als PDF gestaltet zum Ausdrucken oder direkt per E-Mail verschenken (Demo).</p>
          <div style="display:flex;gap:10px;margin-top:12px">
            <button class="btn btn-dark btn-block" data-action="toast" data-msg="PDF heruntergeladen (Demo)">Als PDF</button>
            <button class="btn btn-primary btn-block" data-action="toast" data-msg="Per E-Mail versendet (Demo)">Per E-Mail</button></div>
        </div>` : `
        <div class="grid g-3">${D.vouchers.map(v=>`<div class="card hover center">
          <div style="font-size:44px">${v.ico}</div>
          <h3 style="margin:10px 0 4px;font-size:20px;text-transform:none;letter-spacing:0">${v.name}</h3>
          <p class="muted" style="margin:0 0 12px">${v.desc}</p>
          <b style="font-size:22px">${v.price}</b><br>
          <button class="btn btn-primary btn-sm" style="margin-top:12px" data-action="voucher-buy" data-id="${v.id}">Verschenken</button>
        </div>`).join('')}</div>`}
    </div></div>`,'#/gutscheine');
  }
  function appPT(){
    return appShell(`
      <a class="backlink" href="#/app/community">← Mehr</a>
      <h1 class="app-h">Personal Training</h1>
      ${ptSel.booked ? `
        <div class="app-card center" style="border-color:var(--green);padding:28px">
          <div style="font-size:44px">🥊</div>
          <b style="font-size:18px">Gebucht: ${ptSel.trainer} · ${ptSel.slot}</b>
          <p class="muted" style="margin:8px 0 0">Zahlung bequem über deinen SEPA-Vertrag. Absagen bis 24 h vorher kostenlos.</p>
          <button class="btn btn-dark btn-block" style="margin-top:14px" data-action="app-pt-reset">Weitere Stunde buchen</button>
        </div>` : `
        <div class="notice">1:1-Training mit deinem Lieblingscoach — Technik-Feinschliff, Prüfungs-Vorbereitung oder einfach mehr Tempo.</div>
        ${D.pt.map(t=>`<div class="app-card">
          <div class="session"><div class="thumb">🧑‍🏫</div>
            <div class="meta"><b>${t.name}</b><small>${t.spec} · ${t.price}</small></div></div>
          <div class="choices" style="margin-top:12px">
            ${t.slots.map(s=>`<button type="button" class="chip ${ptSel.trainer===t.name&&ptSel.slot===s?'sel':''}" data-action="app-pt-slot" data-t="${t.name}" data-s="${s}">${s}</button>`).join('')}
          </div>
        </div>`).join('')}
        <button class="btn btn-primary btn-block" data-action="app-pt-book" ${ptSel.slot?'':'disabled aria-disabled="true"'}>${ptSel.slot?`${ptSel.trainer} · ${ptSel.slot} buchen`:'Erst Termin wählen'}</button>`}
    `,'#/app/konto');
  }
  function appHilfe(){
    return appShell(`
      <h1 class="app-h">Hilfe & Fragen</h1>
      <div class="app-card">
        <div class="msg" style="border-bottom:0;padding-bottom:0"><div class="m-av">🤖</div><div class="m-b">
          <b>NFT-Assistent</b><p>Hallo ${D.parent.first}! Ich beantworte die häufigsten Fragen sofort — für alles andere hole ich einen Menschen dazu. Was möchtest du wissen?</p></div></div>
        ${faqChat.map(i=>`
          <div class="bubble me" style="margin-top:10px">${D.faqBot[i].q}</div>
          <div class="bubble">${D.faqBot[i].a}</div>`).join('')}
      </div>
      <div class="choices" style="margin-bottom:14px">
        ${D.faqBot.map((f,i)=>faqChat.includes(i)?'':`<button type="button" class="chip" data-action="faq-ask" data-i="${i}">${f.q}</button>`).join('')}
      </div>
      <a class="btn btn-dark btn-block" href="#/app/nachrichten/1">💬 Lieber mit einem Menschen sprechen</a>
      <p class="muted" style="font-size:12px;margin-top:8px">Der Assistent spricht nur mit Eltern/Erwachsenen — nie mit Kindern. Sensible Themen gehen immer an das Team.</p>
    `,'#/app/konto');
  }

  /* ===========================================================
     ROUTER
     =========================================================== */
  function pageTitle(seg){
    const sfx = ' — NFT Gym';
    if(seg[0]==='app') return 'Mitglieder-App'+sfx;
    if(seg[0]==='crm') return 'CRM'+sfx;
    if(seg[0]==='trainer') return 'Trainer'+sfx;
    if(seg[0]==='admin') return 'Bild-Studio'+sfx;
    if(seg[0]==='standort'){ const l=D.locations.find(x=>x.id===seg[1]); return 'NFT Gym '+(l?l.city:'Standort')+' — Kampfsport'; }
    const M = { '':'NFT Gym — Kampfsport für die ganze Familie | 10 Standorte in NRW & München',
      standorte:'Standorte', kinder:'Kampfsport für Kinder ab 3', erwachsene:'Kampfsport für Erwachsene',
      kursfinder:'Kursfinder', preise:'Preise & Tarife', probetraining:'Kostenloses Probetraining buchen',
      faq:'Häufige Fragen', events:'Events & Camps', camp:'Feriencamp', gutscheine:'Geschenk-Gutscheine',
      empfehlen:'Freund werben', shop:'Pro-Shop', kuendigen:'Vertrag kündigen', login:'Mitglieder-Login',
      impressum:'Impressum', datenschutz:'Datenschutz', agb:'AGB', 'erstes-training':'Dein erstes Training' };
    const key = seg[0]||'';
    if(key==='') return M[''];
    return (M[key]!==undefined ? M[key] : 'Seite nicht gefunden')+sfx;
  }
  function injectJsonLd(){
    try{
      const loc = D.locations.map(l=>({ "@type":"SportsActivityLocation","@id":"https://nft-gym.de/standort/"+l.id,
        name:"NFT Gym "+l.city, parentOrganization:{"@id":"https://nft-gym.de/#org"},
        address:{"@type":"PostalAddress",streetAddress:l.addr.split(',')[0],addressLocality:l.city,addressCountry:"DE"},
        openingHours:l.hours, sport:l.top }));
      const faq = { "@type":"FAQPage", mainEntity:D.faq.map(f=>({ "@type":"Question", name:f.q, acceptedAnswer:{"@type":"Answer",text:f.a} })) };
      const s = document.createElement('script'); s.type='application/ld+json';
      s.textContent = JSON.stringify({ "@context":"https://schema.org", "@graph":[...loc, faq] });
      document.head.appendChild(s);
    }catch(e){}
  }
  function render(){
    const raw = (location.hash||'#/').replace(/^#/,'');
    const seg = raw.split('/').filter(Boolean); // e.g. ['app','kind','Emir']
    let html;
    if(seg[0]==='app'){
      if(!seg[1]) html=appHome();
      else if(seg[1]==='kurse') html=appKurse();
      else if(seg[1]==='auslastung') html=appAuslastung();
      else if(seg[1]==='kind') html=appKind(decodeURIComponent(seg[2]||'Emir'));
      else if(seg[1]==='fortschritt') html=appFortschritt(decodeURIComponent(seg[2]||D.kids[0].name));
      else if(seg[1]==='nachrichten') html = seg[2]!==undefined ? appNachricht(+seg[2]) : appNachrichten();
      else if(seg[1]==='warenkorb') html=appWarenkorb();
      else if(seg[1]==='zahlungen') html=appZahlungen();
      else if(seg[1]==='konto') html=appKonto();
      else if(seg[1]==='erfolge') html=appErfolge(decodeURIComponent(seg[2]||'Emir'));
      else if(seg[1]==='momente') html=appMomente();
      else if(seg[1]==='community') html=appCommunity();
      else if(seg[1]==='shop') html=appShop();
      else if(seg[1]==='videos') html=appVideos();
      else if(seg[1]==='onboarding') html=appOnboarding();
      else if(seg[1]==='mitbestimmen') html=appMitbestimmen();
      else if(seg[1]==='pt') html=appPT();
      else if(seg[1]==='hilfe') html=appHilfe();
      else html=appNotFound();
    } else if(seg[0]==='crm' || seg[0]==='trainer'){
      html = window.CRM ? window.CRM.route(seg) : home();
    } else if(seg[0]==='admin'){
      html = window.ADMIN ? window.ADMIN.route(seg) : home();
    } else {
      const r=seg[0];
      if(!r) html=home();
      else if(r==='standorte') html=standorte();
      else if(r==='standort') html=standortDetail(seg[1]);
      else if(r==='kinder') html=landing('kinder');
      else if(r==='erwachsene') html=landing('erwachsene');
      else if(r==='kursfinder') html=kursfinder();
      else if(r==='preise') html=preise();
      else if(r==='probetraining') html = seg[1]==='bestaetigung'?bestaetigung():probetraining();
      else if(r==='kuendigen') html=kuendigen();
      else if(r==='faq') html=faqPage();
      else if(r==='events') html=eventsPage();
      else if(r==='shop') html=shopPage();
      else if(r==='empfehlen') html=empfehlenPage();
      else if(r==='impressum'||r==='datenschutz'||r==='agb') html=legalPage(r);
      else if(r==='login') html=loginPage();
      else if(r==='camp') html=campPage();
      else if(r==='gutscheine') html=gutscheinePage();
      else if(r==='erstes-training') html=erstesTraining();
      else html=notFoundSite();
    }
    app.innerHTML=html;
    document.title = pageTitle(seg);
    window.scrollTo(0,0);
  }

  /* ---------- global click actions ---------- */
  document.addEventListener('click', e=>{
    const el = e.target.closest('[data-action]');
    if(!el) return;
    const a = el.dataset.action;
    if(a==='toast'){ toast(el.dataset.msg||'Demo'); return; }
    if(a==='goapp'){ go('#/app'); return; }
    if(a==='menu'){ menuOpen=!menuOpen; render(); return; }
    if(a==='theme'){ setTheme(theme==='light'?'dark':'light'); return; }
    if(a==='theme-set'){ setTheme(el.dataset.v); return; }
    // finder
    if(a==='f-who'){ finder.who=el.dataset.v; render(); return; }
    if(a==='f-age'){ finder.age=el.dataset.v; render(); return; }
    if(a==='f-goal'){ finder.goal=el.dataset.v; render(); return; }
    if(a==='f-shy'){ finder.shy=!finder.shy; render(); return; }
    if(a==='f-search'){ finder.searched=true; render(); return; }
    if(a==='f-reset'){ finder={who:null,age:null,goal:null,loc:null,shy:false,searched:false}; render(); return; }
    if(a==='f-book'){ wiz.who=finder.who; wiz.age=finder.age; wiz.loc=finder.loc; /* let anchor navigate */ return; }
    // wizard
    if(a==='w-set'){ wiz[el.dataset.k]=el.dataset.v; render(); return; }
    if(a==='w-next'){ wiz.step=Math.min(4,wiz.step+1); render(); return; }
    if(a==='w-back'){ wiz.step=Math.max(0,wiz.step-1); render(); return; }
    if(a==='w-finish'){ go('#/probetraining/bestaetigung'); return; }
    // faq
    if(a==='faq'){ const i=+el.dataset.i; faqOpen = faqOpen===i?-1:i; render(); return; }
    // consent
    if(a==='consent'){ const k=el.dataset.k; consent[k]=!consent[k]; render(); toast(consent[k]?'Einwilligung erteilt':'Einwilligung widerrufen'); return; }
    // cancel
    if(a==='cancel-submit'){ cancelDone=true; render(); return; }
    if(a==='app-kfilter'){ appKF=el.dataset.v; render(); return; }
    if(a==='app-wait'){ waitset[el.dataset.k]=true; toast('Auf Warteliste — wir benachrichtigen dich, sobald ein Platz frei wird'); render(); return; }
    if(a==='login'){ toast('Willkommen zurück, '+D.parent.first+'!'); go('#/app'); return; }
    if(a==='logout'){ toast('Abgemeldet'); go('#/'); return; }
    if(a==='cart-add'){ cart.push(el.dataset.id); toast('Zum Warenkorb hinzugefügt'); render(); return; }
    if(a==='cart-remove'){ cart.splice(+el.dataset.idx,1); render(); return; }
    if(a==='cart-checkout'){ const n=cart.length; cart=[]; toast(n+' Artikel reserviert — Abholung am Standort'); go('#/app/konto'); return; }
    if(a==='msg-read-all'){ D.messages.forEach((m,i)=>readMsgs.add(i)); toast('Alle als gelesen markiert'); render(); return; }
    if(a==='msg-reply'){ const inp=document.getElementById('reply-input'); const v=inp&&inp.value.trim(); if(v){ const i=+location.hash.split('/').pop(); (replies[i]=replies[i]||[]).push(v); render(); } return; }
    if(a==='milestone-claim'){ if(D.milestone) D.milestone.claimed=true; toast('Urkunde geteilt 🎉'); render(); return; }
    if(a==='app-sick'){ sickset[el.dataset.kid]=true; toast(el.dataset.kid+' krankgemeldet — Platz freigegeben, Streak eingefroren ❄️ Gute Besserung!'); render(); return; }
    if(a==='app-ferien'){ ferienOn=!ferienOn; toast(ferienOn?'Ferienmodus aktiviert 🏖️':'Willkommen zurück! Empfohlener Wiedereinstieg: Mi 16:00'); render(); return; }
    if(a==='app-up-accept'){ const u=(D.crm&&D.crm.upsell||[]).find(x=>x.id===el.dataset.id); if(u) u.status='angenommen'; toast('Angenommen ✓ — gilt ab dem nächsten Monat'); render(); return; }
    if(a==='save-offer'){ saveFlow.offer=el.dataset.o; saveFlow.done=true; toast('Alles klar — wir kümmern uns!'); render(); return; }
    if(a==='save-skip'){ saveFlow.showForm=true; render(); return; }
    if(a==='save-reset'){ saveFlow={offer:null,done:false,showForm:true}; render(); return; }
    if(a==='app-pulse'){ pulseVoted=+el.dataset.v; if(D.crm&&D.crm.feedback) D.crm.feedback.pulse.n++; toast('Danke für dein Feedback! 🙏'); render(); return; }
    if(a==='app-vote'){ const r=D.feedback.roadmap.find(x=>x.id===el.dataset.id); if(r&&!r.voted){ r.voted=true; r.votes++; toast('Stimme gezählt ✓'); } render(); return; }
    if(a==='app-doc'){ docsDone[el.dataset.id]=true; toast('PDF erstellt — in deinen Downloads (Demo)'); render(); return; }
    if(a==='app-pt-slot'){ ptSel={trainer:el.dataset.t, slot:el.dataset.s, booked:false}; render(); return; }
    if(a==='app-pt-book'){ if(ptSel.slot){ ptSel.booked=true; toast('Personal Training gebucht ✓'); render(); } return; }
    if(a==='app-pt-reset'){ ptSel={trainer:null,slot:null,booked:false}; render(); return; }
    if(a==='faq-ask'){ faqChat.push(+el.dataset.i); render(); return; }
    if(a==='voucher-buy'){ voucherCode='NFT-GIFT-'+['XK42','MB77','RZ19'][cart.length%3]; toast('Gutschein erstellt 🎁'); render(); return; }
    if(a==='camp-book'){ campBooked=true; toast('Platz reserviert — Frühbucher-Preis gesichert ⛺'); render(); return; }
    if(a==='lang-chip'){ setLang(el.dataset.v); return; }
    if(a==='sitebot-toggle'){ siteBotOpen=!siteBotOpen; render(); return; }
    if(a==='sitebot-ask'){ siteBotChat.push(+el.dataset.i); render(); return; }
    if(a==='setup-done'){ setup[el.dataset.k]=true; toast(el.dataset.k==='partner'?'Einladung an mehmet.a@mail.de gesendet ✓':'Kalender verbunden ✓'); render(); return; }
    if(a==='trans-confirm'){ if(D.transition) D.transition.confirmed=true; toast('Platz bestätigt — Lena freut sich auf Emir! 🎓'); render(); return; }
  });

  // live-update select for finder / wizard inputs
  document.addEventListener('change', e=>{
    const el=e.target.closest('[data-action]'); if(!el) return;
    if(el.dataset.action==='lang'){ setLang(el.value); return; }
    if(el.dataset.action==='f-loc'){ finder.loc=el.value; }
  });
  document.addEventListener('input', e=>{
    const q=e.target.closest('#loc-q');
    if(q){
      const v=q.value.toLowerCase(); let hits=0;
      document.querySelectorAll('#loc-grid .loc-card').forEach(c=>{
        const show=!v || c.textContent.toLowerCase().includes(v);
        c.style.display=show?'':'none'; if(show)hits++;
      });
      const emp=document.getElementById('loc-empty'); if(emp) emp.style.display=hits?'none':'';
      return;
    }
    const el=e.target.closest('[data-action="w-input"]'); if(!el) return;
    wiz[el.dataset.k]=el.value;
  });

  /* ===========================================================
     GEFÜHRTE DEMO-TOUR (Overlay außerhalb von #app)
     =========================================================== */
  const TOUR = [
    { h:'#/', t:'Die neue Website', d:'Probetraining, Kursfinder, Auslastung — alles digital, alles in 60 Sekunden buchbar.' },
    { h:'#/kursfinder', t:'Geführter Kursfinder', d:'Wer? Alter? Ziel? — inkl. „Schüchternes Kind"-Modus, der ruhige Kurse empfiehlt.' },
    { h:'#/app', t:'Die Eltern-App', d:'Trainings-Puls, Check-in-Push, Meilensteine — Eltern sehen jederzeit, dass es ihrem Kind gut geht.' },
    { h:'#/app/auslastung', t:'Auslastungs-Heatmap', d:'Wann ist es voll, wann ruhig? Die App empfiehlt den besten Slot fürs Kind.' },
    { h:'#/app/mitbestimmen', t:'Feedback & Mitbestimmen', d:'Familien voten über neue Features — und sehen: „Ihr habt gesagt → wir haben es getan."' },
    { h:'#/crm/dashboard', t:'Das CRM-Cockpit', d:'Eine priorisierte „Heute zuerst"-Liste, 4 Kern-KPIs und rollenscharfe Navigation — der Tag steuert sich von selbst.' },
    { h:'#/crm/leads/L1', t:'KI mit Freigabe', d:'Die KI schreibt Antwortentwürfe, der Mitarbeiter bestätigt nur — Human-in-the-Loop.' },
    { h:'#/crm/retention', t:'Retention-Inbox', d:'Kündigungsrisiken erkennen und handeln, bevor gekündigt wird.' },
    { h:'#/crm/feedback', t:'NFT Puls', d:'Stimmung je Kurs & Uhrzeit, Detraktor-Alarm mit 24h-SLA, Feature-Voting live.' },
    { h:'#/crm/support', t:'Posteingang · alle Kanäle', d:'WhatsApp, Telefon, E-Mail & Website in EINER Inbox — die KI beantwortet FAQ sofort, Sensibles geht mit Entwurf an Menschen.' },
    { h:'#/crm/kunde/A', t:'Kunden-360', d:'Anruf kommt rein — ein Bildschirm zeigt alles: Kinder, Vertrag, Zahlung, Nachrichten, Aufgaben.' },
    { h:'#/crm/zeiten', t:'Zeiten & Kosten', d:'Gesetzeskonforme Zeiterfassung, aus dem Kursplan vorbefüllt — und P&L je Standort in den Reports.' },
    { h:'#/crm/launch', t:'Launch-Cockpit', d:'Standort Nr. 11 eröffnet mit 63 Gründungsmitgliedern statt bei null — so skaliert 10 → 50.' },
  ];
  let tourStep = -1;
  function tourRender(){
    let o = document.getElementById('tour-overlay');
    if(tourStep < 0){ if(o) o.remove(); return; }
    if(!o){ o = document.createElement('div'); o.id='tour-overlay'; o.className='tour-card'; document.body.appendChild(o); }
    const s = TOUR[tourStep];
    o.innerHTML = `<div class="tc-step">Demo-Tour · Schritt ${tourStep+1} / ${TOUR.length}</div>
      <b>${s.t}</b><p>${s.d}</p>
      <div class="tc-btns">
        ${tourStep>0?'<button type="button" data-tour="prev" class="btn btn-dark btn-sm">Zurück</button>':''}
        ${tourStep<TOUR.length-1?'<button type="button" data-tour="next" class="btn btn-primary btn-sm">Weiter</button>':'<button type="button" data-tour="end" class="btn btn-primary btn-sm">Tour beenden ✓</button>'}
        <button type="button" data-tour="end" class="btn btn-dark btn-sm" aria-label="Tour schließen">✕</button>
      </div>`;
    if(location.hash !== s.h) location.hash = s.h;
  }
  document.addEventListener('click', e=>{
    const tb = e.target.closest('[data-tour]');
    if(tb){ const a=tb.dataset.tour;
      if(a==='next') tourStep=Math.min(TOUR.length-1,tourStep+1);
      else if(a==='prev') tourStep=Math.max(0,tourStep-1);
      else tourStep=-1;
      tourRender(); return; }
    if(e.target.closest('#tour-btn')){ tourStep=0; tourRender(); }
  });

  window.__render = render;
  window.__toast = toast;
  applyLangAttrs();
  applyTheme();
  injectJsonLd();
  window.addEventListener('hashchange', ()=>{
    menuOpen=false;
    if(prevHash.startsWith('#/probetraining/bestaetigung') && !location.hash.startsWith('#/probetraining')){
      wiz={step:0,who:null,age:null,loc:null,goal:null,slot:null,name:"",email:""};
    }
    prevHash=location.hash;
    render();
  });
  if(!location.hash) location.hash='#/';
  render();
})();
