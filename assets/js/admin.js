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
  const IMG_PREFIX = 'nft_img_';

  /* ---------- Bild-Register: alle Bilder der Website ---------- */
  const SLOTS = [
    { id:'hero', name:'Hero — Startseite', where:'Startseite · großes Titelbild', ratio:'16:9', maxW:1600,
      get:()=>D.heroImg, set:v=>{ D.heroImg=v; },
      prompt:'Wide cinematic photo inside a modern martial arts gym: a diverse group of kids and adults training kickboxing on dark mats, dramatic rim lighting, black background with deep red accent lights, energetic and motivating, professional sports photography, no text, no logos' },
    ...D.sports.map((s,i)=>({
      id:'sport-'+i, name:'Disziplin — '+s.name, where:'Startseite · Karte „'+s.name+'“', ratio:'4:3', maxW:900,
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
  const dataSize = d => Math.round((d.length - d.indexOf(',') - 1) * 3/4); // Bytes aus Base64-Länge
  const fmtSize = b => b >= 1048576 ? (b/1048576).toFixed(1).replace('.',',')+' MB' : Math.max(1,Math.round(b/1024))+' KB';
  const hasOverride = id => !!localStorage.getItem(IMG_PREFIX+id);
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

  function saveImage(id, url, meta){
    try{ localStorage.setItem(IMG_PREFIX+id, url); }
    catch(e){ throw new Error('Browser-Speicher voll — Qualität reduzieren und „Neu komprimieren“ nutzen.'); }
    const m = readMeta(); m[id] = meta;
    try{ localStorage.setItem(LS_META, JSON.stringify(m)); }catch(e){}
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
      saveImage(id, c.url, { raw:dataSize(raw), comp:dataSize(c.url), w:c.w, h:c.h, model:st.model });
      slot.set(c.url);
      toast('Bild generiert & komprimiert ✓');
    }catch(err){ st.err[id]=String(err.message||err); }
    st.busy[id]=false; render();
  }

  async function doRecompress(id){
    const slot = SLOTS.find(s=>s.id===id); if(!slot) return;
    const src = st.raw[id] || localStorage.getItem(IMG_PREFIX+id);
    if(!src) return;
    st.busy[id]=true; st.err[id]=null; render();
    try{
      const c = await compressImg(src, slot.maxW, st.quality, st.format);
      const meta = readMeta()[id]||{};
      saveImage(id, c.url, { ...meta, raw:meta.raw||dataSize(src), comp:dataSize(c.url), w:c.w, h:c.h });
      slot.set(c.url);
      toast('Neu komprimiert ✓ — '+fmtSize(dataSize(c.url)));
    }catch(err){ st.err[id]=String(err.message||err); }
    st.busy[id]=false; render();
  }

  function doReset(id){
    const slot = SLOTS.find(s=>s.id===id); if(!slot) return;
    localStorage.removeItem(IMG_PREFIX+id);
    const m = readMeta(); delete m[id];
    try{ localStorage.setItem(LS_META, JSON.stringify(m)); }catch(e){}
    delete st.raw[id]; st.err[id]=null;
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
    const meta = readMeta()[s.id]||{};
    const over = hasOverride(s.id);
    const busy = st.busy[s.id];
    const cur = s.get();
    const sizes = over && meta.comp
      ? `<span>Roh: <b>${meta.raw?fmtSize(meta.raw):'–'}</b></span><span>→</span>
         <span>Gespeichert: <b style="color:var(--green)">${fmtSize(meta.comp)}</b></span>
         ${meta.raw?`<span class="tag ghost" style="text-transform:none;letter-spacing:0">−${Math.max(0,Math.round((1-meta.comp/meta.raw)*100))} %</span>`:''}
         ${meta.w?`<span class="muted">${meta.w}×${meta.h} px</span>`:''}`
      : `<span class="muted">Noch nicht generiert — aktuell Standard-Bild (extern, Unsplash)</span>`;
    return `<div class="card adm-card">
      <img class="adm-prev" src="${cur}" alt="" loading="lazy" onerror="this.style.opacity=.2">
      <div class="row" style="margin-top:12px">
        <h3 style="font-size:17px;margin:0">${s.name}</h3>
        ${over?'<span class="tag">KI-generiert</span>':'<span class="tag ghost">Standard</span>'}
      </div>
      <p class="muted" style="font-size:13px;margin:4px 0 10px">${s.where} · Format ${s.ratio} · max. ${s.maxW} px</p>
      <div class="adm-size">${sizes}</div>
      <div class="field" style="margin:12px 0 10px"><label for="prompt-${s.id}">Prompt</label>
        <textarea id="prompt-${s.id}" rows="3" data-admin="adm-prompt" data-id="${s.id}">${st.prompts[s.id]}</textarea></div>
      ${st.err[s.id]?`<p style="color:var(--red);font-size:13px;margin:0 0 10px">⚠ ${st.err[s.id]}</p>`:''}
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
            <p class="muted" style="font-size:12px;margin:0">Der Key wird nur lokal in diesem Browser gespeichert und direkt an Google gesendet. Key erstellen: <b>aistudio.google.com</b> → „Get API key“.</p>
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
          <p class="muted" style="margin-top:4px">${genCount} von ${SLOTS.length} generiert · Speicher: ${fmtSize(used)} von ~5 MB belegt</p></div>
          <button class="btn btn-primary btn-sm" data-admin="adm-generate-all" ${st.busyAll?'disabled':''}>${st.busyAll?'⏳ Generiere alle…':'✨ Alle '+SLOTS.length+' Bilder generieren'}</button>
        </div>
        <div class="adm-grid">${SLOTS.map(slotCard).join('')}</div>
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
})();
