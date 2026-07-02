/* ===========================================================
   NFT GYM — Admin · Bild-Studio (Prototype)
   Generiert alle Website-Bilder per Gemini, komprimiert sie
   clientseitig (Canvas) und speichert sie in localStorage.
   Exposes window.ADMIN.route(seg) to the SPA router.
   =========================================================== */
(function(){
  const D = window.DATA;
  const LS_KEY = 'nft_gemini_key';
  const LS_META = 'nft_img_meta';
  const LS_PROMPTS = 'nft_img_prompts';
  const LS_TOKEN = 'nft_admin_token';
  const IMG_PREFIX = 'nft_img_';
  const cloud = {};                              // id -> DB record (when API on)
  const API = { on:false, checked:false, db:false };
  const token = () => { try{ return (localStorage.getItem(LS_TOKEN)||'').trim(); }catch(e){ return ''; } };

  /* ---------- Bild-Register: alle Bilder der Website ---------- */
  const SHOP_PROMPTS = {
    gi:'Product photo of a neatly folded white kids martial arts gi (kimono) with a white belt on top, dark charcoal background, soft studio lighting, e-commerce product photography, no text, no logos',
    handschuhe:'Product photo of a pair of red 10oz boxing gloves standing upright, dark charcoal background, soft studio lighting, e-commerce product photography, no logos',
    schienbein:'Product photo of a pair of black and red martial arts shin guards, dark charcoal background, soft studio lighting, e-commerce product photography, no logos',
    shirt:'Product photo of a plain black athletic team t-shirt with subtle red trim laid flat, dark charcoal background, soft studio lighting, e-commerce product photography, no text, no logos',
    bandagen:'Product photo of a pair of rolled red boxing hand wraps, dark charcoal background, soft studio lighting, e-commerce product photography, no logos',
    flasche:'Product photo of a black sports water bottle with a red cap, dark charcoal background, soft studio lighting, e-commerce product photography, no text, no logos',
    pruefungspaket:'Product photo of a martial arts exam set: a yellow belt, a rolled certificate with red ribbon and a small dark picture frame arranged together, dark charcoal background, soft studio lighting, e-commerce product photography, no text',
  };
  const SLOTS = [
    { id:'hero', group:'Startseite', name:'Hero — Startseite', where:'Startseite · großes Titelbild', ratio:'16:9', maxW:1600,
      get:()=>D.heroImg, set:v=>{ D.heroImg=v; },
      prompt:'Wide cinematic photo inside a modern martial arts gym: a diverse group of kids and adults training kickboxing on dark mats, dramatic rim lighting, black background with deep red accent lights, energetic and motivating, professional sports photography, no text, no logos' },
    ...D.sports.map((s,i)=>({
      id:'sport-'+i, group:'Startseite', name:'Disziplin — '+s.name, where:'Startseite · Karte „'+s.name+'“', ratio:'4:3', maxW:900,
      get:()=>D.sports[i].img, set:v=>{ D.sports[i].img=v; },
      prompt:({
        'Kickboxen':'Dynamic action photo of a kickboxer striking pads, mid-kick, dark gym with red accent lighting, sweat and motion, shallow depth of field, professional sports photography, no text',
        'Boxen':'Classic boxing photo: athlete with red gloves working the heavy bag, dark moody gym, dramatic side lighting with red accents, professional sports photography, no text',
        'MMA':'MMA training photo: two athletes sparring in a cage, stand-up exchange, dark gym with red accent lighting, intense and athletic, professional sports photography, no text',
        'Jiu-Jitsu (BJJ)':'Brazilian jiu-jitsu photo: two athletes in gis grappling on dark mats, guard position, focused technique, dark gym with red accent lighting, professional sports photography, no text',
        'Ringen':'Wrestling training photo: two youth athletes in a takedown drill on dark mats, athletic and controlled, dark gym with red accent lighting, professional sports photography, no text',
        'Luta Livre':'No-gi submission grappling photo: two athletes in rashguards rolling on dark mats, dynamic scramble, dark gym with red accent lighting, professional sports photography, no text',
      })[s.name] || ('Professional sports photography of '+s.name+' training in a dark martial arts gym with red accent lighting, no text'),
    })),
    { id:'app-teaser', group:'Startseite', name:'App-Teaser — „Dein Studio in der Tasche“', where:'Startseite · Mitglieder-App-Box (aktuell 📱-Platzhalter)', ratio:'4:3', maxW:900,
      get:()=>D.appTeaserImg, set:v=>{ D.appTeaserImg=v; },
      prompt:'Over-the-shoulder photo of a parent holding a smartphone in a modern martial arts gym, kids training softly blurred in the dark background with red accent lights, warm and reassuring, professional photography, blank phone screen, no text, no logos' },
    { id:'landing-kinder', group:'Landingpages', name:'Landingpage — Kinder', where:'Seite „Kinder“ · Vorteils-Karte (aktuell 🥋-Platzhalter)', ratio:'4:3', maxW:900,
      get:()=>D.landingKinderImg, set:v=>{ D.landingKinderImg=v; },
      prompt:'Joyful photo of children aged 6 to 9 in a martial arts class doing a fun warm-up game with their coach on dark mats, laughing, safe and supervised, dark gym with red accent lighting, professional sports photography, no text' },
    { id:'landing-erwachsene', group:'Landingpages', name:'Landingpage — Erwachsene', where:'Seite „Erwachsene“ · Vorteils-Karte (aktuell 🥊-Platzhalter)', ratio:'4:3', maxW:900,
      get:()=>D.landingErwachseneImg, set:v=>{ D.landingErwachseneImg=v; },
      prompt:'Photo of an evening adults kickboxing class: men and women hitting pads in pairs, focused energy after work, dark gym with red accent lighting, professional sports photography, no text' },
    { id:'standort', group:'Standorte', name:'Studio innen — Standort-Seiten', where:'Alle Standort-Detailseiten · Hero-Hintergrund', ratio:'16:9', maxW:1600,
      get:()=>D.standortImg, set:v=>{ D.standortImg=v; },
      prompt:'Wide interior photo of a modern premium martial arts studio: clean black training mats, a row of heavy bags, red and black wall accents, dramatic ambient lighting, empty and tidy, professional architecture photography, no text, no logos' },
    { id:'camp', group:'Events & Camp', name:'Feriencamp', where:'Camp-Seite · Banner + Events-Karte „Feriencamp“', ratio:'16:9', maxW:1200,
      get:()=>D.campImg, set:v=>{ D.campImg=v; const ev=D.events.find(e=>e.id==='feriencamp'); if(ev) ev.img=v; },
      prompt:'Group photo of happy kids aged 6 to 14 at a summer martial arts camp: pad games and training in front of a gym on a sunny day, high fives and big smiles, camp atmosphere, professional photography, no text' },
    { id:'event-turnier', group:'Events & Camp', name:'Event — Turnier', where:'Events-Seite · Karte „NFT Open NRW“', ratio:'4:3', maxW:900,
      get:()=>(D.events.find(e=>e.id==='turnier-nrw')||{}).img, set:v=>{ const ev=D.events.find(e=>e.id==='turnier-nrw'); if(ev) ev.img=v; },
      prompt:'Martial arts tournament photo: young athlete on the podium receiving a medal, coaches applauding, sports hall with mats and red banners, celebratory moment, professional sports photography, no text' },
    { id:'event-geburtstag', group:'Events & Camp', name:'Event — Kindergeburtstag', where:'Events-Seite · Karte „Kampfsport-Geburtstag“', ratio:'4:3', maxW:900,
      get:()=>(D.events.find(e=>e.id==='geburtstag')||{}).img, set:v=>{ const ev=D.events.find(e=>e.id==='geburtstag'); if(ev) ev.img=v; },
      prompt:'Kids birthday party in a martial arts gym: children playing an action game with a coach on dark mats, black and red balloons, joyful and energetic, professional photography, no text' },
    { id:'event-lehrgang', group:'Events & Camp', name:'Event — Lehrgang', where:'Events-Seite · Karte „BJJ-Lehrgang“', ratio:'4:3', maxW:900,
      get:()=>(D.events.find(e=>e.id==='lehrgang')||{}).img, set:v=>{ const ev=D.events.find(e=>e.id==='lehrgang'); if(ev) ev.img=v; },
      prompt:'Martial arts seminar photo: a guest coach demonstrating a BJJ technique in front of adult students seated on dark mats, attentive atmosphere, dark gym with red accent lighting, professional sports photography, no text' },
    ...D.shop.map((s,i)=>({
      id:'shop-'+s.id, group:'Pro-Shop', name:'Produkt — '+s.name, where:'Shop-Seite + App-Shop · Produktbild (aktuell '+s.ico+'-Platzhalter)', ratio:'1:1', maxW:600,
      get:()=>D.shop[i].img, set:v=>{ D.shop[i].img=v; },
      prompt: SHOP_PROMPTS[s.id] || ('Product photo of '+s.name+' for martial arts, dark charcoal background, soft studio lighting, e-commerce product photography, no text, no logos'),
    })),
    { id:'gutschein', group:'Gutscheine', name:'Gutschein-Motiv', where:'Gutschein-Seite · Banner „Verschenke Stärke“', ratio:'16:9', maxW:1200,
      get:()=>D.gutscheinImg, set:v=>{ D.gutscheinImg=v; },
      prompt:'Elegant gift concept photo: a blank black gift voucher card with a red ribbon lying next to a pair of small red boxing gloves, dark background, soft festive studio lighting, sporty and premium, no text' },
  ];
  SLOTS.forEach(s=>{ s.def = s.get(); });

  /* ---------- gespeicherte Bilder beim Laden anwenden ---------- */
  SLOTS.forEach(s=>{
    const v = localStorage.getItem(IMG_PREFIX+s.id);
    if(v) s.set(v);
  });

  /* ---------- state ---------- */
  const savedPrompts = (()=>{ try{ return JSON.parse(localStorage.getItem(LS_PROMPTS)||'{}'); }catch(e){ return {}; } })();
  const st = {
    model:'gemini-2.5-flash-image',
    quality:0.82, format:'image/jpeg',
    showKey:false, busy:{}, err:{}, raw:{}, busyAll:false,
    prompts: Object.fromEntries(SLOTS.map(s=>[s.id, savedPrompts[s.id]||s.prompt])),
  };
  const toast = m => (window.__toast||alert)(m);
  const render = () => window.__render && window.__render();

  /* ---------- helpers ---------- */
  const readMeta = () => { try{ return JSON.parse(localStorage.getItem(LS_META)||'{}'); }catch(e){ return {}; } };
  const metaFor = id => { const m=readMeta()[id]; if(m) return m;
    if(API.on && cloud[id]){ const c=cloud[id]; return {raw:c.bytes,comp:c.bytes,w:c.width,h:c.height,model:c.model}; } return {}; };
  const dataSize = d => Math.round((d.length - d.indexOf(',') - 1) * 3/4); // Bytes aus Base64-Länge
  const fmtSize = b => b >= 1048576 ? (b/1048576).toFixed(1).replace('.',',')+' MB' : Math.max(1,Math.round(b/1024))+' KB';
  const hasOverride = id => API.on ? !!cloud[id] : !!localStorage.getItem(IMG_PREFIX+id);
  const storageUsed = () => SLOTS.reduce((n,s)=>n+(localStorage.getItem(IMG_PREFIX+s.id)||'').length,0);

  function compressImg(dataURL, maxW, quality, format){
    return new Promise((resolve,reject)=>{
      const img = new Image();
      img.onload = ()=>{
        const scale = Math.min(1, maxW/img.width);
        const w = Math.round(img.width*scale), h = Math.round(img.height*scale);
        const c = document.createElement('canvas'); c.width=w; c.height=h;
        c.getContext('2d').drawImage(img,0,0,w,h);
        resolve({ url:c.toDataURL(format,quality), w, h });
      };
      img.onerror = ()=>reject(new Error('Bild konnte nicht gelesen werden.'));
      img.src = dataURL;
    });
  }

  async function geminiGenerate(prompt, ratio, key){
    const call = async body => {
      const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+st.model+':generateContent',{
        method:'POST', headers:{ 'Content-Type':'application/json', 'x-goog-api-key':key },
        body: JSON.stringify(body) });
      const j = await r.json().catch(()=>({}));
      if(!r.ok){ const e = new Error((j.error&&j.error.message)||('HTTP '+r.status)); e.status=r.status; throw e; }
      return j;
    };
    const base = { contents:[{ parts:[{ text:prompt }] }] };
    let j;
    try{ j = await call({ ...base, generationConfig:{ responseModalities:['IMAGE'], imageConfig:{ aspectRatio:ratio } } }); }
    catch(e){ if(e.status===400) j = await call(base); else throw e; } // ältere API-Version ohne imageConfig
    const parts = (((j.candidates||[])[0]||{}).content||{}).parts||[];
    const p = parts.find(x=>x.inlineData && x.inlineData.data);
    if(!p){
      const t = parts.find(x=>x.text);
      throw new Error(t ? 'Kein Bild erhalten: '+t.text.slice(0,160) : 'Kein Bild in der Antwort erhalten.');
    }
    return 'data:'+(p.inlineData.mimeType||'image/png')+';base64,'+p.inlineData.data;
  }

  // Speichert ein Bild: lokal (Cache, best effort) und — wenn API aktiv — in Postgres.
  async function persist(id, url, meta){
    try{ localStorage.setItem(IMG_PREFIX+id, url); const m=readMeta(); m[id]=meta; localStorage.setItem(LS_META, JSON.stringify(m)); }
    catch(e){ if(!API.on) throw new Error('Browser-Speicher voll — Qualität reduzieren und „Neu komprimieren“ nutzen.'); }
    if(API.on){
      cloud[id] = { data_url:url, bytes:meta.comp, width:meta.w, height:meta.h, model:meta.model };
      const r = await fetch('/api/images/'+encodeURIComponent(id), { method:'PUT',
        headers: Object.assign({'Content-Type':'application/json'}, token()?{'x-admin-token':token()}:{}),
        body: JSON.stringify({ data_url:url, mime:st.format, width:meta.w, height:meta.h, bytes:meta.comp, prompt:st.prompts[id], model:meta.model }) });
      if(!r.ok){ const e = await r.json().catch(()=>({})); throw new Error(e.error || ('Speichern in der Datenbank fehlgeschlagen (HTTP '+r.status+')')); }
    }
  }

  // Beim Laden: Backend erkennen und gespeicherte Bilder anwenden (sonst localStorage-Modus).
  async function apiInit(){
    try{
      const h = await fetch('/api/health', {cache:'no-store'}).then(r=> r.ok ? r.json() : Promise.reject());
      API.checked = true; API.db = !!(h && h.db);
      if(h && h.db){
        const data = await fetch('/api/images', {cache:'no-store'}).then(r=>r.json());
        API.on = true;
        Object.entries(data.images||{}).forEach(([id,rec])=>{
          const slot = SLOTS.find(s=>s.id===id);
          if(slot && rec && rec.data_url){ cloud[id]=rec; slot.set(rec.data_url); }
        });
      }
    }catch(e){ API.checked = true; /* kein Backend → localStorage-Modus */ }
    render();
  }

  async function doGenerate(id){
    const slot = SLOTS.find(s=>s.id===id); if(!slot) return;
    const key = (localStorage.getItem(LS_KEY)||'').trim();
    if(!key){ st.err[id]='Bitte zuerst oben einen Gemini API-Key eintragen.'; render(); return; }
    st.busy[id]=true; st.err[id]=null; render();
    try{
      const raw = await geminiGenerate(st.prompts[id], slot.ratio, key);
      st.raw[id]=raw;
      const c = await compressImg(raw, slot.maxW, st.quality, st.format);
      slot.set(c.url);
      await persist(id, c.url, { raw:dataSize(raw), comp:dataSize(c.url), w:c.w, h:c.h, model:st.model });
      toast(API.on ? 'Bild generiert & in der Datenbank gespeichert ✓' : 'Bild generiert & komprimiert ✓');
    }catch(err){ st.err[id]=String(err.message||err); }
    st.busy[id]=false; render();
  }

  async function doRecompress(id){
    const slot = SLOTS.find(s=>s.id===id); if(!slot) return;
    const src = st.raw[id] || (cloud[id]&&cloud[id].data_url) || localStorage.getItem(IMG_PREFIX+id);
    if(!src) return;
    st.busy[id]=true; st.err[id]=null; render();
    try{
      const c = await compressImg(src, slot.maxW, st.quality, st.format);
      const meta = metaFor(id);
      slot.set(c.url);
      await persist(id, c.url, { ...meta, raw:meta.raw||dataSize(src), comp:dataSize(c.url), w:c.w, h:c.h, model:meta.model||st.model });
      toast('Neu komprimiert ✓ — '+fmtSize(dataSize(c.url)));
    }catch(err){ st.err[id]=String(err.message||err); }
    st.busy[id]=false; render();
  }

  async function doReset(id){
    const slot = SLOTS.find(s=>s.id===id); if(!slot) return;
    localStorage.removeItem(IMG_PREFIX+id);
    const m = readMeta(); delete m[id];
    try{ localStorage.setItem(LS_META, JSON.stringify(m)); }catch(e){}
    delete st.raw[id]; st.err[id]=null; delete cloud[id];
    if(API.on){ try{ await fetch('/api/images/'+encodeURIComponent(id), { method:'DELETE', headers: token()?{'x-admin-token':token()}:{} }); }catch(e){} }
    slot.set(slot.def);
    toast('Standard-Bild wiederhergestellt');
    render();
  }

  async function doGenerateAll(){
    const key = (localStorage.getItem(LS_KEY)||'').trim();
    if(!key){ toast('Bitte zuerst einen Gemini API-Key eintragen'); return; }
    st.busyAll=true; render();
    for(const s of SLOTS){ await doGenerate(s.id); }
    st.busyAll=false; render();
    const fails = SLOTS.filter(s=>st.err[s.id]).length;
    toast(fails ? (SLOTS.length-fails)+' von '+SLOTS.length+' Bildern generiert — Fehler siehe Karten' : 'Alle '+SLOTS.length+' Bilder generiert ✓');
  }

  /* ---------- views ---------- */
  function slotCard(s){
    const meta = metaFor(s.id);
    const over = hasOverride(s.id);
    const busy = st.busy[s.id];
    const cur = s.get();
    const sizes = over && meta.comp
      ? `<span>Roh: <b>${meta.raw?fmtSize(meta.raw):'–'}</b></span><span>→</span>
         <span>Gespeichert: <b style="color:var(--green)">${fmtSize(meta.comp)}</b></span>
         ${meta.raw?`<span class="tag ghost" style="text-transform:none;letter-spacing:0">−${Math.max(0,Math.round((1-meta.comp/meta.raw)*100))} %</span>`:''}
         ${meta.w?`<span class="muted">${meta.w}×${meta.h} px</span>`:''}`
      : `<span class="muted">Noch nicht generiert — aktuell ${s.def?'Standard-Bild (extern, Unsplash)':'Emoji/Gradient-Platzhalter'}</span>`;
    return `<div class="card adm-card">
      ${cur
        ? `<img class="adm-prev" src="${cur}" alt="" loading="lazy" onerror="this.style.opacity=.2">`
        : `<div class="adm-prev" style="display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:13px">Noch kein Bild — Website zeigt Platzhalter</div>`}
      <div class="row" style="margin-top:12px">
        <h3 style="font-size:17px;margin:0">${s.name}</h3>
        ${over?'<span class="tag">KI-generiert</span>':s.def?'<span class="tag ghost">Standard</span>':'<span class="tag ghost">Platzhalter</span>'}
      </div>
      <p class="muted" style="font-size:13px;margin:4px 0 10px">${s.where} · Format ${s.ratio} · max. ${s.maxW} px</p>
      <div class="adm-size">${sizes}</div>
      <div class="field" style="margin:12px 0 10px"><label for="prompt-${s.id}">Prompt</label>
        <textarea id="prompt-${s.id}" rows="3" data-admin="adm-prompt" data-id="${s.id}">${st.prompts[s.id]}</textarea></div>
      ${st.err[s.id]?`<p style="color:var(--red-ink);font-size:13px;margin:0 0 10px">⚠ ${st.err[s.id]}</p>`:''}
      <div class="rowbtns" style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-primary btn-sm" data-admin="adm-generate" data-id="${s.id}" ${busy||st.busyAll?'disabled':''}>${busy?'⏳ Generiere…':'✨ Generieren'}</button>
        ${(st.raw[s.id]||over)?`<button class="btn btn-dark btn-sm" data-admin="adm-recompress" data-id="${s.id}" ${busy?'disabled':''}>Neu komprimieren</button>`:''}
        ${over?`<a class="btn btn-dark btn-sm" href="${cur}" download="nft-${s.id}.${cur.startsWith('data:image/webp')?'webp':cur.startsWith('data:image/png')?'png':'jpg'}">⬇ Download</a>`:''}
        ${over?`<button class="btn btn-dark btn-sm" data-admin="adm-reset" data-id="${s.id}" ${busy?'disabled':''}>Zurücksetzen</button>`:''}
      </div>
    </div>`;
  }

  function adminPage(){
    const key = localStorage.getItem(LS_KEY)||'';
    const used = storageUsed();
    const genCount = SLOTS.filter(s=>hasOverride(s.id)).length;
    return `<div class="site">
      <div class="nav"><div class="container nav-inner">
        <a class="logo" href="#/"><span class="slash sm"><i></i><i></i></span> <span class="badge">NFT</span>
          <span style="display:flex;flex-direction:column;line-height:1"><span>ADMIN</span><small>BILD-STUDIO</small></span></a>
        <div class="spacer" style="flex:1"></div>
        <div class="nav-cta"><a class="btn btn-dark btn-sm" href="#/crm">Zum CRM</a><a class="btn btn-primary btn-sm" href="#/">Zur Website →</a></div>
      </div></div>
      <main id="main"><div class="section" style="padding-top:36px"><div class="container">
        <div class="kicker"><span class="slash sm"><i></i><i></i></span> Admin</div>
        <h2 style="margin-bottom:6px">Bild-Studio</h2>
        <p class="muted" style="max-width:720px;margin-bottom:22px">Alle Bilder der Website an einem Ort — per Gemini generieren, automatisch komprimieren und direkt live sehen. Die Bilder werden lokal im Browser gespeichert (Prototyp, kein Backend).</p>

        <div class="grid g-2" style="align-items:start;margin-bottom:22px">
          <div class="card">
            <h3 style="font-size:17px;margin-bottom:12px">🔑 Gemini API</h3>
            <div class="field"><label for="adm-key">API-Key</label>
              <div style="display:flex;gap:8px">
                <input id="adm-key" type="${st.showKey?'text':'password'}" value="${key.replace(/"/g,'&quot;')}" placeholder="AIza…" autocomplete="off" data-admin="adm-key" style="flex:1">
                <button class="btn btn-dark btn-sm" data-admin="adm-key-toggle" aria-label="Key anzeigen/verbergen">${st.showKey?'🙈':'👁'}</button>
              </div></div>
            <div class="field" style="margin-bottom:8px"><label for="adm-model">Modell</label>
              <select id="adm-model" data-admin="adm-model">
                <option value="gemini-2.5-flash-image" ${st.model==='gemini-2.5-flash-image'?'selected':''}>Gemini 2.5 Flash Image — schnell & günstig</option>
                <option value="gemini-3-pro-image-preview" ${st.model==='gemini-3-pro-image-preview'?'selected':''}>Gemini 3 Pro Image — höchste Qualität</option>
              </select></div>
            <div class="field" style="margin-bottom:8px"><label for="adm-token">Admin-Token <span class="muted" style="text-transform:none;letter-spacing:0">(optional — nur wenn der Server ADMIN_TOKEN gesetzt hat)</span></label>
              <input id="adm-token" type="password" value="${token().replace(/"/g,'&quot;')}" placeholder="für DB-Schreibzugriff" autocomplete="off" data-admin="adm-token"></div>
            <p class="muted" style="font-size:12px;margin:0">Key & Token bleiben nur lokal in diesem Browser. Der Gemini-Key geht direkt an Google. Key erstellen: <b>aistudio.google.com</b> → „Get API key“.</p>
          </div>
          <div class="card">
            <h3 style="font-size:17px;margin-bottom:12px">🗜️ Komprimierung</h3>
            <div class="field"><label for="adm-quality">Qualität: <span id="adm-q-val">${Math.round(st.quality*100)} %</span></label>
              <input id="adm-quality" type="range" min="50" max="95" step="1" value="${Math.round(st.quality*100)}" data-admin="adm-quality" style="padding:0;height:32px"></div>
            <div class="field" style="margin-bottom:8px"><label for="adm-format">Format</label>
              <select id="adm-format" data-admin="adm-format">
                <option value="image/jpeg" ${st.format==='image/jpeg'?'selected':''}>JPEG — kompatibel</option>
                <option value="image/webp" ${st.format==='image/webp'?'selected':''}>WebP — kleiner</option>
              </select></div>
            <p class="muted" style="font-size:12px;margin:0">Wird nach jeder Generierung automatisch angewendet (inkl. Verkleinern auf die Ziel-Breite). Einstellungen ändern → „Neu komprimieren“ am Bild.</p>
          </div>
        </div>

        <div class="section-head" style="margin-bottom:16px"><div>
          <h2 style="font-size:24px">Bilder der Website</h2>
          <p class="muted" style="margin-top:4px">${genCount} von ${SLOTS.length} generiert · ${API.on ? '☁️ <b style="color:var(--green)">Postgres verbunden</b> — geteilt & persistent' : (API.checked ? '💾 Lokal (localStorage): '+fmtSize(used)+' / ~5 MB' : '… Speicher wird geprüft')}</p></div>
          <button class="btn btn-primary btn-sm" data-admin="adm-generate-all" ${st.busyAll?'disabled':''}>${st.busyAll?'⏳ Generiere alle…':'✨ Alle '+SLOTS.length+' Bilder generieren'}</button>
        </div>
        ${(()=>{ const groups=[]; SLOTS.forEach(s=>{ let g=groups.find(x=>x.name===s.group); if(!g){ g={name:s.group,slots:[]}; groups.push(g); } g.slots.push(s); });
          return groups.map(g=>`<div style="font-family:var(--ff-head);text-transform:uppercase;font-size:18px;letter-spacing:1px;margin:26px 0 12px;display:flex;align-items:baseline;gap:10px">${g.name}
              <span class="muted" style="font-size:13px;font-family:var(--ff-body,inherit);text-transform:none;letter-spacing:0">${g.slots.filter(x=>hasOverride(x.id)).length} von ${g.slots.length} generiert</span></div>
            <div class="adm-grid">${g.slots.map(slotCard).join('')}</div>`).join(''); })()}
      </div></div></main>
      <style>
        .adm-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:18px}
        .adm-prev{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:10px;border:1px solid var(--line);background:#101014;display:block}
        .adm-size{display:flex;gap:10px;align-items:center;flex-wrap:wrap;font-size:13px;color:var(--text-dim)}
        .adm-card .row{display:flex;justify-content:space-between;align-items:center;gap:10px}
        #adm-quality{accent-color:var(--red)}
      </style>
    </div>`;
  }

  /* ---------- events (eigener Namespace: data-admin) ---------- */
  document.addEventListener('click', e=>{
    const el = e.target.closest('[data-admin]'); if(!el) return;
    const a = el.dataset.admin;
    if(a==='adm-generate'){ doGenerate(el.dataset.id); return; }
    if(a==='adm-recompress'){ doRecompress(el.dataset.id); return; }
    if(a==='adm-reset'){ doReset(el.dataset.id); return; }
    if(a==='adm-generate-all'){ doGenerateAll(); return; }
    if(a==='adm-key-toggle'){ st.showKey=!st.showKey; render(); return; }
  });
  document.addEventListener('input', e=>{
    const el = e.target.closest('[data-admin]'); if(!el) return;
    const a = el.dataset.admin;
    if(a==='adm-key'){ localStorage.setItem(LS_KEY, el.value.trim()); return; }
    if(a==='adm-token'){ try{ localStorage.setItem(LS_TOKEN, el.value.trim()); }catch(err){} return; }
    if(a==='adm-quality'){ st.quality=(+el.value)/100; const v=document.getElementById('adm-q-val'); if(v) v.textContent=el.value+' %'; return; }
    if(a==='adm-prompt'){ st.prompts[el.dataset.id]=el.value; try{ localStorage.setItem(LS_PROMPTS, JSON.stringify(st.prompts)); }catch(err){} return; }
  });
  document.addEventListener('change', e=>{
    const el = e.target.closest('[data-admin]'); if(!el) return;
    const a = el.dataset.admin;
    if(a==='adm-model'){ st.model=el.value; return; }
    if(a==='adm-format'){ st.format=el.value; return; }
  });

  window.ADMIN = { route: () => adminPage() };
  apiInit(); // Backend erkennen + gespeicherte Bilder laden (fällt sonst auf localStorage zurück)
})();
