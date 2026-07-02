/* ===========================================================
   NFT GYM — CRM (internal ops system) · Prototype
   Desktop-first. Exposes window.CRM.route(seg) to the SPA router.
   =========================================================== */
(function(){
  const D = window.DATA;
  const C = () => D.crm;

  const OCC = { ruhig:["Ruhig","occ-ruhig","h-ruhig"], normal:["Normal","occ-normal","h-normal"],
                voll:["Voll","occ-voll","h-voll"], sehr:["Sehr voll","occ-sehr","h-sehr"] };
  const occ = o => `<span class="occ ${OCC[o][1]}"><span class="dot"></span>${OCC[o][0]}</span>`;
  const payBadge = s => ({bezahlt:["b-green","Bezahlt"],offen:["b-amber","Offen"],rueck:["b-red","Rücklastschrift"]}[s]);
  const riskBadge = r => ({gruen:["b-green","● OK"],gelb:["b-amber","● beobachten"],rot:["b-red","● At-Risk"]}[r]);
  const byLoc = arr => state.standort==='Alle Standorte' ? arr : arr.filter(x => (x.loc||x.city)===state.standort);
  const ageBadge = m => m===undefined ? '' : m>=60
    ? `<span class="badge b-red">⏱ vor ${Math.round(m/60*10)/10} Std</span>`
    : m>=30 ? `<span class="badge b-amber">⏱ vor ${m} Min</span>` : `<span class="badge b-green">⏱ vor ${m} Min</span>`;
  const srcBadge = s => s ? `<span class="badge b-gray" style="text-transform:none;letter-spacing:0">${({Website:'🌐',Instagram:'📸','Google Maps':'📍',WhatsApp:'🟢'}[s]||'☎️')} ${s}</span>` : '';
  const actBtn = label => label==='—' ? '<span class="muted">—</span>'
      : `<button class="btn btn-dark btn-sm" data-action="crm-toast" data-msg="${label} (Demo)">${label}</button>`;

  const state = { role:"Geschäftsführung", standort:"Alle Standorte", leadView:"kanban", inboxSel:0, sideOpen:false, trainerAtt:null, trainerSkills:[],
    courseFilter:"Alle", kioskLast:null, vw:{step:0,kunde:null,standort:null,tarif:null,laufzeit:null,sepa:false},
    supFilter:"Alle", supSel:"S1" };

  /* ---------------- shell ---------------- */
  function shell(content, active){
    const perm = D.crm.permissions, mods = perm.modules, allow = perm.roles[state.role] || [];
    const can = m => { const i = mods.indexOf(m); return i<0 || allow[i]===1; };
    const I = window.ICON || (()=>'');
    const openMsgs = D.crm.inbox.filter(m=>m.status!=='Beantwortet').length;
    const nav = [
      ['#/crm/dashboard','home','Dashboard','Dashboard'],
      ['#/crm/leads','target','Leads & Probetraining','Leads'],
      ['#/crm/mitglieder','users','Mitglieder & Familien','Mitglieder'],
      ['#/crm/retention','activity','Retention','Mitglieder'],
      ['#/crm/upsell','trending','Upsell-Chancen','Mitglieder'],
      ['#/crm/team','shield','Trainer & Team','Verträge'],
      ['#/crm/zeiten','clock','Arbeitszeiten','Verträge'],
      ['#/crm/kurse','calendar','Kurse & Stundenplan','Kurse'],
      ['#/crm/auslastung','trending','Auslastung','Auslastung'],
      ['#/crm/checkins','clock','Check-ins','Check-ins'],
      ['#/crm/kiosk','monitor','Kiosk Check-in','Check-ins'],
      ['#/crm/support','headset','Support-Center','Kommunikation'],
      ['#/crm/kommunikation','mail','Kommunikation','Kommunikation'],
      ['#/crm/aufgaben','file','Aufgaben','Kommunikation'],
      ['#/crm/feedback','message','Feedback & Puls','Kommunikation'],
      ['#/crm/vertraege','file','Verträge','Verträge'],
      ['#/crm/zahlungen','euro','Zahlungen','Zahlungen'],
      ['#/crm/automationen','zap','Automationen','Automationen'],
      ['#/crm/reports','bars','Reports','Reports'],
      ['#/crm/entscheidungen','file','Entscheidungen','Reports'],
      ['#/crm/launch','zap','Launch-Cockpit','Reports'],
      ['#/crm/rollen','shield','Rollen & Rechte','Rollen/Rechte'],
    ].filter(x => can(x[3]));
    return `<div class="crm">
      <aside class="crm-side ${state.sideOpen?'open':''}">
        <div class="brand"><span class="slash sm"><i></i><i></i></span><span class="badge">NFT</span>
          <b style="font-family:var(--ff-head);letter-spacing:1px;font-size:20px">CRM</b></div>
        <nav class="crm-nav" aria-label="CRM-Navigation">${nav.map(([h,i,l])=>`<a href="${h}" class="${active===h?'active':''}"${active===h?' aria-current="page"':''}><span class="ci">${I(i)}</span>${l}</a>`).join('')}</nav>
        <a href="#/trainer" class="crm-nav" style="color:var(--muted);padding:10px 12px;font-size:13px;display:flex;align-items:center;gap:10px"><span class="ci">${I('activity')}</span>Trainer-Ansicht →</a>
        <div class="role-note">Angemeldet als<br><b style="color:#fff">${state.role}</b><br><a href="#/crm" style="color:var(--red)">Rolle wechseln →</a></div>
      </aside>
      <div class="crm-main">
        <div class="crm-top">
          <button class="icon-btn crm-burger" data-action="crm-menu" aria-label="Menü">${I('menu')}</button>
          <select data-action="crm-standort" aria-label="Standort wählen">
            <option${state.standort==='Alle Standorte'?' selected':''}>Alle Standorte</option>
            ${D.locations.map(l=>`<option${state.standort===l.city?' selected':''}>${l.city}</option>`).join('')}
          </select>
          <a class="search" href="#/crm/suche" style="text-decoration:none;display:flex;align-items:center;gap:8px">${I('search')} Mitglieder, Leads, Kurse suchen…</a>
          <div class="spacer"></div>
          <a class="icon-btn" href="#/crm/kommunikation" aria-label="Kommunikation${openMsgs?` (${openMsgs} offen)`:''}">${I('bell')}${openMsgs?`<span class="badge-dot">${openMsgs}</span>`:''}</a>
          <div class="crm-user"><div class="u-meta"><b>${state.role}</b><small>NFT Team</small></div>
            <div class="avatar">${state.role[0]}</div></div>
          <a class="icon-btn" href="#/" aria-label="Zur Website" title="Zur Website">${I('x')}</a>
        </div>
        <main class="crm-body">${content}</main>
      </div>
    </div>`;
  }

  /* ---------------- login / role select ---------------- */
  function login(){
    const roles = [
      ["Geschäftsführung","👑","Alle Standorte · KPIs · Governance"],
      ["Standortleiter","🏢","Eigener Standort · volles Operativ"],
      ["Rezeption / Sales","💬","Leads · Check-in · Zahlungen"],
      ["Trainer","🥋","Kurse · Anwesenheit · Fortschritt"],
    ];
    return `<div class="rolewrap"><div class="rolecard">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:6px"><span class="slash lg"><i></i><i></i></span>
        <h1 style="font-size:44px">NFT CRM</h1></div>
      <p class="muted">Das Betriebssystem für Team, Standortleitung & Geschäftsführung. Wähle eine Rolle für die Demo:</p>
      <div class="roles">${roles.map(([r,i,d])=>`<button class="rolebtn" data-action="crm-role" data-r="${r}"><span class="ri">${i}</span><b>${r}</b><small>${d}</small></button>`).join('')}</div>
      <div style="margin-top:18px"><a class="backlink" href="#/">← Zurück zur Website</a></div>
    </div></div>`;
  }

  /* ---------------- dashboard ---------------- */
  function dashboard(){
    const kpis = C().kpis.map(k=>`<a class="kpi ${k.v}" href="${k.go}"><div class="n">${k.n}</div><div class="l">${k.l}</div></a>`).join('');
    const feed = byLoc(C().checkins).slice(0,5).map(c=>`<tr><td>${c.time}</td><td><b>${c.person}</b></td><td>${c.course}</td><td>${c.loc}</td>
      <td><span class="badge ${c.status==='Check-out'?'b-gray':'b-green'}">${c.status}</span></td></tr>`).join('');
    const tasks = [
      ['🎯 18 neue Leads beantworten','#/crm/leads'],
      ['💶 5 Rücklastschriften bearbeiten','#/crm/zahlungen'],
      ['✉️ 13 KI-Entwürfe prüfen','#/crm/kommunikation'],
      ['📝 8 Verträge offen','#/crm/vertraege'],
    ];
    return shell(`
      <h1 class="crm-h">Dashboard</h1>
      <div class="crm-sub">Heute · ${state.standort} · Standortleitung sieht sofort, was wichtig ist</div>
      <div class="panel" style="border-color:var(--red)"><div class="panel-h"><b>📋 Morgen-Briefing</b><span class="muted" style="font-size:12px">automatisch erstellt · heute 07:00</span></div>
        ${C().briefing_today.map(b=>`<a class="list-item" href="${b.href}"><span class="li-ico">${b.ico}</span><div class="li-main"><b>${b.t}</b></div><span class="muted">›</span></a>`).join('')}
      </div>
      <div class="kpi-grid">${kpis}</div>
      <div class="split" style="grid-template-columns:1.4fr 1fr">
        <div class="panel"><div class="panel-h"><b>Heute im Studio</b><a href="#/crm/checkins" style="color:var(--red);font-size:14px;font-weight:600">Live-Monitor →</a></div>
          <table class="tbl"><thead><tr><th>Zeit</th><th>Person</th><th>Kurs</th><th>Standort</th><th>Status</th></tr></thead><tbody>${feed}</tbody></table></div>
        <div class="panel"><div class="panel-h"><b>Zu erledigen</b></div>
          ${tasks.map(([t,h])=>`<a class="list-item" href="${h}"><div class="li-main"><b>${t}</b></div><span class="muted">›</span></a>`).join('')}</div>
      </div>
      <div class="split">
        <div class="panel"><div class="panel-h"><b>🚨 Anomalie-Radar</b><span class="muted" style="font-size:12px">automatisch erkannt</span></div>
          ${C().anomalies.map(x=>`<div class="list-item"><span class="li-ico" style="${x.sev==='red'?'background:var(--red-050)':''}">${x.ico}</span>
            <div class="li-main"><b>${x.t}</b><small>${x.d}</small></div>
            <span class="badge ${x.sev==='red'?'b-red':'b-amber'}">${x.sev==='red'?'kritisch':'beobachten'}</span></div>`).join('')}
        </div>
        <div class="panel"><div class="panel-h"><b>🎯 Monatsziele · ${C().goals.month}</b></div>
          ${C().goals.items.map(g=>{ const p=Math.round(g.cur/g.goal*100);
            return `<div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:5px"><b>${g.t}</b><span class="muted">${g.cur} / ${g.goal}</span></div>
            <div class="bar" style="height:10px"><span style="width:${Math.min(100,p)}%;background:${p>=70?'var(--green)':p>=45?'var(--amber)':'var(--red)'}"></span></div></div>`; }).join('')}
          <p class="muted" style="font-size:12px;margin:0">Bei Rückstand > 20 % zum Monatsdrittel gibt es automatisch einen Hinweis mit Maßnahmen-Vorschlag.</p>
        </div>
      </div>
      <div class="panel"><div class="panel-h"><b>📞 Verpasste Anrufe heute</b><span class="badge b-red">${byLoc(C().calls).filter(c=>c.status==='offen').length} offen</span></div>
        <table class="tbl"><thead><tr><th>Zeit</th><th>Nummer</th><th>Standort</th><th>Automatik</th><th></th></tr></thead><tbody>
        ${byLoc(C().calls).map(c=>`<tr style="${c.status!=='offen'?'opacity:.5':''}"><td>${c.time}</td><td><b>${c.num}</b></td><td>${c.loc}</td>
          <td><span class="badge ${c.status==='offen'?'b-green':'b-gray'}" style="text-transform:none;letter-spacing:0">${c.auto}</span></td>
          <td>${c.status==='offen'?`<button class="btn btn-dark btn-sm" data-action="crm-call-done" data-id="${c.id}">Rückruf erledigt</button>`:'<span class="badge b-green">✓</span>'}</td></tr>`).join('')}
        </tbody></table>
        <div style="display:flex;gap:10px;align-items:center;margin-top:14px;flex-wrap:wrap">
          <button class="btn btn-primary btn-sm" data-action="crm-call-voice">🎤 Sprachnotiz → Lead anlegen</button>
          <span class="muted" style="font-size:13px">Nach einem Telefonat 20 Sek. einsprechen — die KI legt die Lead-Karte an.</span></div>
      </div>`,'#/crm/dashboard');
  }

  /* ---------------- leads ---------------- */
  function leads(){
    let body;
    if(state.leadView==='kanban'){
      body = `<div class="kanban">${C().pipeline.map(st=>{
        const items = byLoc(C().leads).filter(l=>l.stage===st);
        return `<div class="kcol"><div class="kh"><span>${st}</span><span>${items.length}</span></div>
          ${items.map(l=>`<a class="kcard" href="#/crm/leads/${l.id}"><b>${l.name}</b><small>${l.who}</small><small>${l.interest} · ${l.loc}</small>
            <div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:6px">${ageBadge(l.ageMin)}${srcBadge(l.src)}${l.noshow?'<span class="badge b-amber">No-Show</span>':''}</div></a>`).join('') || '<div class="muted" style="font-size:12px;padding:6px">—</div>'}</div>`;
      }).join('')}</div>`;
    } else {
      body = `<div class="panel"><table class="tbl"><thead><tr><th>Lead</th><th>Wartet seit</th><th>Quelle</th><th>Standort</th><th>Interesse</th><th>Status</th><th>Nächste Aktion</th></tr></thead><tbody>
        ${byLoc(C().leads).map(l=>`<tr onclick="location.hash='#/crm/leads/${l.id}'"><td><a href="#/crm/leads/${l.id}"><b>${l.name}</b></a></td><td>${ageBadge(l.ageMin)}</td><td>${srcBadge(l.src)}</td><td>${l.loc}</td><td>${l.interest}</td><td><span class="badge b-gray">${l.stage}</span></td><td>${l.action}</td></tr>`).join('')}
      </tbody></table></div>`;
    }
    return shell(`
      <div class="panel-h" style="margin-bottom:16px;align-items:flex-end">
        <div><h1 class="crm-h" style="margin:0">Leads & Probetraining</h1><div class="crm-sub" style="margin:4px 0 0">Aktive Pipeline (Demo-Auszug) · franchiseweit diese Woche: 18 neue Anfragen</div></div>
        <div class="seg"><button class="${state.leadView==='kanban'?'on':''}" data-action="crm-leadview" data-v="kanban">Kanban</button><button class="${state.leadView==='table'?'on':''}" data-action="crm-leadview" data-v="table">Tabelle</button></div>
      </div>${body}`,'#/crm/leads');
  }

  function leadDetail(id){
    const l = C().leads.find(x=>x.id===id) || C().leads[0];
    return shell(`
      <a class="backlink" href="#/crm/leads">← Alle Leads</a>
      <h1 class="crm-h">${l.name}</h1>
      <div class="crm-sub" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">${l.who} · ${l.interest} · ${l.loc} · <span class="badge b-gray">${l.stage}</span> ${ageBadge(l.ageMin)} ${srcBadge(l.src)}</div>
      ${l.noshow?`<div class="panel" style="border-color:var(--amber)"><div class="panel-h"><b>⏰ Probetraining verpasst — Rebooking-Automatik läuft</b><span class="badge b-green">SMS gesendet ✓</span></div>
        <p class="dim" style="margin:0 0 10px">Automatische Nachricht: „Kein Problem, das passiert! Sollen wir einen neuen Termin finden? Ein Tippen genügt:" — der Kunde sieht zwei 1-Tap-Slots:</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-primary btn-sm" data-action="crm-rebook" data-slot="Mi 16:00">Mi 16:00 (ruhig) — Kunde tippt ✓</button>
          <button class="btn btn-dark btn-sm" data-action="crm-rebook" data-slot="Fr 15:30">Fr 15:30 — Kunde tippt ✓</button>
        </div>
        <p class="muted" style="font-size:12px;margin:10px 0 0">Ohne Reaktion: sanfte Erinnerung nach 3 Tagen, dann Lead → „Verloren" mit Win-back in 90 Tagen. Rettet typisch 20–30 % der No-Shows.</p></div>`:''}
      ${l.trialTags?`<div class="panel" style="border-color:var(--green)"><div class="panel-h"><b>🥋 Trainer-Eindruck aus dem Probetraining</b><span class="muted" style="font-size:12px">von Trainer Igor, 30-Sek-Tags</span></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">${l.trialTags.map(t=>`<span class="badge b-green" style="text-transform:none;letter-spacing:0">${t}</span>`).join('')}</div>
        <p class="muted" style="font-size:12px;margin:10px 0 0">Diese Tags fließen automatisch in den Angebotsentwurf rechts — das Angebot nennt konkrete Stärken statt Floskeln.</p></div>`:''}
      <div class="split" style="grid-template-columns:1fr 1.15fr">
        <div>
          <div class="panel"><div class="panel-h"><b>Kontakt & Kontext</b></div>
            <div class="list-item"><span class="li-ico">📞</span><div class="li-main"><b>+49 ••• ••• 42</b><small>Telefon</small></div></div>
            <div class="list-item"><span class="li-ico">✉️</span><div class="li-main"><b>kontakt@mail.de</b><small>E-Mail</small></div></div>
            <div class="list-item"><span class="li-ico">🥋</span><div class="li-main"><b>Empfohlen: Kids Kickboxen 6–9</b><small>passend zum Alter</small></div></div>
            <div class="list-item"><span class="li-ico">📅</span><div class="li-main"><b>Freie Slots: Mi 16:00 · Fr 15:30</b><small>ruhige Einstiegskurse</small></div></div>
          </div>
          <div class="panel"><div class="panel-h"><b>Verlauf</b></div>
            <div class="msg"><div class="m-av">🌐</div><div class="m-b"><b>Anfrage über Website</b><small>heute, 09:14</small><p>„Ist mein Sohn (7) zu jung für Kickboxen?"</p></div></div>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn-dark btn-block" data-action="crm-lead-stage" data-id="${l.id}" data-stage="Probe gebucht">Probetraining buchen</button>
            <button class="btn btn-primary btn-block" data-action="crm-lead-stage" data-id="${l.id}" data-stage="Vertrag">Vertrag vorbereiten</button>
          </div>
        </div>
        <div class="panel"><div class="panel-h"><b>✨ KI-Antwortentwurf${l.trialTags?' (personalisiert)':''}</b><span class="badge b-green">Bereit zur Freigabe</span></div>
          <div class="aibox">${l.draft || C().leadDraft}</div>
          <div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">
            <button class="btn btn-primary" data-action="crm-lead-next" data-id="${l.id}">Bestätigen & Senden</button>
            <button class="btn btn-dark" data-action="crm-toast" data-msg="Bearbeiten (Demo)">Bearbeiten</button>
            <button class="btn ${state.arm==='lost:'+l.id?'confirm-armed':'btn-danger'}" data-action="crm-lead-lost" data-id="${l.id}">${state.arm==='lost:'+l.id?'Wirklich verwerfen?':'Verwerfen'}</button>
          </div>
          <p class="muted" style="font-size:12px;margin-top:12px">Sensible Fälle (Kündigung, Beschwerde, Recht) werden eskaliert und nie automatisch versendet.</p>
        </div>
      </div>`,'#/crm/leads');
  }

  /* ---------------- members / family ---------------- */
  function members(){
    const rows = byLoc(C().members).map(m=>{ const p=payBadge(m.pay), r=riskBadge(m.risk);
      return `<tr onclick="location.hash='#/crm/familie/${m.fam}'"><td><a href="#/crm/familie/${m.fam}"><b>${m.name}</b></a></td><td>${m.who}</td><td>${m.loc}</td>
        <td><span class="badge b-gray">${m.contract}</span></td><td><span class="badge ${p[0]}">${p[1]}</span></td><td>${m.act}</td>
        <td><span class="badge ${r[0]}">${r[1]}</span></td></tr>`; }).join('');
    return shell(`
      <h1 class="crm-h">Mitglieder & Familien</h1>
      <div class="crm-sub">Demo-Auszug: ${byLoc(C().members).length} Einträge · ${state.standort} · Franchise gesamt: ${C().fact.mitglieder.toLocaleString("de-DE")} aktive Mitglieder · Zeile öffnet Profil</div>
      <div class="panel"><table class="tbl"><thead><tr><th>Name</th><th>Typ</th><th>Standort</th><th>Vertrag</th><th>Zahlung</th><th>Aktivität</th><th>Retention</th></tr></thead><tbody>${rows}</tbody></table></div>`,'#/crm/mitglieder');
  }

  function family(id){
    if(id && id!=='A'){
      const m = C().members.find(x=>x.fam===id);
      if(m){ const p=payBadge(m.pay), r=riskBadge(m.risk);
        return shell(`
          <a class="backlink" href="#/crm/mitglieder">\u2190 Mitglieder</a>
          <h1 class="crm-h">${m.name}</h1>
          <div class="crm-sub">${m.who} \u00b7 ${m.loc} \u00b7 Vertrag: ${m.contract}</div>
          <div class="split" style="grid-template-columns:1fr 1fr">
            <div class="panel"><div class="panel-h"><b>Status</b></div>
              <div class="list-item"><span class="li-ico">\ud83d\udcc4</span><div class="li-main"><b>Vertrag ${m.contract}</b><small>Tarif laut Vertragsverwaltung</small></div><span class="badge b-gray">${m.contract}</span></div>
              <div class="list-item"><span class="li-ico">\ud83d\udcb6</span><div class="li-main"><b>Zahlungsstatus</b><small>letzter Beitragslauf</small></div><span class="badge ${p[0]}">${p[1]}</span></div>
              <div class="list-item"><span class="li-ico">\ud83d\udcc8</span><div class="li-main"><b>Aktivit\u00e4t ${m.act}</b><small>Check-in-Frequenz</small></div><span class="badge ${r[0]}">${r[1]}</span></div>
            </div>
            <div class="panel"><div class="panel-h"><b>Aktionen</b></div>
              <button class="btn btn-dark btn-block" style="margin-bottom:8px" data-action="crm-toast" data-msg="Nachricht (Demo)">Nachricht senden</button>
              <button class="btn btn-dark btn-block" style="margin-bottom:8px" data-action="crm-toast" data-msg="Notiz (Demo)">Notiz hinzuf\u00fcgen</button>
              <a class="btn btn-dark btn-block" href="#/crm/zahlungen">Zahlungen \u00f6ffnen</a>
            </div>
          </div>`,'#/crm/mitglieder');
      }
    }
    const k = D.kids;
    return shell(`
      <a class="backlink" href="#/crm/mitglieder">← Mitglieder</a>
      <h1 class="crm-h">Familie A.</h1>
      <div class="crm-sub">Krefeld · Familienvertrag · SEPA aktiv</div>
      <div class="split" style="grid-template-columns:1fr 1fr">
        <div class="panel"><div class="panel-h"><b>Eltern</b></div>
          <div class="list-item"><span class="li-ico">👩</span><div class="li-main"><b>Nicole A.</b><small>Hauptkontakt · App + E-Mail</small></div></div>
          <div class="list-item"><span class="li-ico">👨</span><div class="li-main"><b>Mehmet A.</b><small>nur E-Mail</small></div></div>
        </div>
        <div class="panel"><div class="panel-h"><b>Zahlung</b></div>
          <div class="list-item"><span class="li-ico">🏦</span><div class="li-main"><b>SEPA · DE•• •••• 4321</b><small>Nächste Abbuchung 01.08.</small></div><span class="badge b-green">aktiv</span></div>
          <div class="list-item"><span class="li-ico">💶</span><div class="li-main"><b>Sara · 49 € offen</b><small>fällig in 3 Tagen</small></div><span class="badge b-amber">Offen</span></div>
        </div>
      </div>
      <div class="panel"><div class="panel-h"><b>Kinder</b></div>
        ${k.map(kd=>`<div class="list-item"><span class="li-ico">🥋</span><div class="li-main"><b>${kd.name}, ${kd.age} · ${kd.program}</b><small>${kd.belt} · Trainer ${kd.trainer} · ${kd.freq}</small></div><span class="badge ${riskBadge(kd.risk)[0]}">${riskBadge(kd.risk)[1]}</span></div>`).join('')}
      </div>
      <div class="panel"><div class="panel-h"><b>Einwilligungen (DSGVO)</b></div>
        <div style="display:flex;gap:10px;flex-wrap:wrap"><span class="badge b-green">Foto/Video Emir ✓</span><span class="badge b-gray">Foto/Video Sara ✗</span><span class="badge b-green">Marketing ✓</span><span class="badge b-gray">WhatsApp ✗</span></div>
      </div>`,'#/crm/mitglieder');
  }

  /* ---------------- courses ---------------- */
  function courses(){
    const cf = state.courseFilter, filters = ["Alle","Krefeld","Köln","Kids","MMA"];
    const match = c => { if(cf==='Alle') return true; if(cf==='Kids') return /Kids/i.test(c.name); if(cf==='MMA') return /MMA/i.test(c.name); return c.loc===cf; };
    const rows = byLoc(C().courses).filter(match).map(c=>{ const pct=Math.round(c.booked/c.cap*100);
      const col = pct>=95?'var(--red)':pct>=75?'var(--amber)':'var(--green)';
      return `<tr onclick="location.hash='#/crm/kurse/${c.id}'"><td><a href="#/crm/kurse/${c.id}"><b>${c.name}</b></a></td><td>${c.day} ${c.time}</td><td>${c.loc}</td><td>${c.trainer}</td>
        <td>${c.booked}/${c.cap}<div class="capbar"><span style="width:${pct}%;background:${col}"></span></div></td><td>${occ(c.occ)}</td></tr>`; }).join('');
    return shell(`
      <div class="panel-h" style="margin-bottom:16px;align-items:flex-end"><h1 class="crm-h" style="margin:0">Kurse & Stundenplan</h1>
        <div class="choices">${filters.map(f=>`<button type="button" class="chip ${cf===f?'sel':''}" data-action="crm-cf" data-v="${f}">${f}</button>`).join('')}</div></div>
      <div class="panel"><table class="tbl"><thead><tr><th>Kurs</th><th>Zeit</th><th>Standort</th><th>Trainer</th><th>Auslastung</th><th>Status</th></tr></thead><tbody>${rows || '<tr><td colspan="6" class="muted">Keine Kurse für diesen Filter.</td></tr>'}</tbody></table></div>`,'#/crm/kurse');
  }

  function courseDetail(id){
    const c = C().courses.find(x=>x.id===id) || C().courses[0];
    const parts = [['Emir A.','Gelbgurt','✅'],['Sara K.','Weißgurt','✅'],['Leo M.','Probetraining','⏳'],['Milan T.','abgemeldet','❌'],['Nora B.','Orangegurt','✅']];
    return shell(`
      <a class="backlink" href="#/crm/kurse">← Kurse</a>
      <h1 class="crm-h">${c.name}</h1>
      <div class="crm-sub">${c.loc} · ${c.day} ${c.time} · Trainer ${c.trainer} · ${c.booked}/${c.cap} · ${occ(c.occ)}</div>
      ${c.occ==='voll'?`<div class="notice">⚠️ Kurs fast voll. <a href="#/crm/auslastung" style="color:var(--red);font-weight:600">Alternative Slots vorschlagen →</a></div>`:''}
      <div class="panel"><div class="panel-h"><b>Teilnehmer</b><button class="btn btn-dark btn-sm" data-action="crm-toast" data-msg="Nachricht an Teilnehmer (Demo)">Nachricht an alle</button></div>
        ${parts.map(([n,b,s])=>`<div class="list-item"><span class="li-ico">${s}</span><div class="li-main"><b>${n}</b><small>${b}</small></div></div>`).join('')}
      </div>`,'#/crm/kurse');
  }

  /* ---------------- auslastung ---------------- */
  function auslastung(){
    const short = {ruhig:"Ruhig",normal:"Normal",voll:"Voll",sehr:"Sehr"};
    const rows = D.heatRows.map(r=>`<tr><td class="t-time">${r.time}</td>${r.cells.map(c=>`<td class="${OCC[c][2]}">${short[c]}</td>`).join('')}</tr>`).join('');
    const kpis = [["72 %","Ø Auslastung",""],["7","Überfüllte Kurse","amber"],["5","Unterausgelastet",""],["Mi 15:30","Ruhigster Slot","green"]];
    return shell(`
      <h1 class="crm-h">Auslastung</h1>
      <div class="crm-sub">${state.standort==='Alle Standorte'?'Krefeld':state.standort} · aktuelle Woche · datengetriebene Steuerung</div>
      <div class="kpi-grid">${kpis.map(([n,l,v])=>`<div class="kpi ${v}"><div class="n" style="font-size:26px">${n}</div><div class="l">${l}</div></div>`).join('')}</div>
      <div class="panel"><div class="panel-h"><b>Heatmap · Wochentag × Uhrzeit</b></div>
        <div class="heat"><table><thead><tr><th></th>${D.heatDays.map(d=>`<th>${d}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div></div>
      <div class="panel" style="border-color:var(--red)"><div class="panel-h"><b>✨ Empfehlung</b></div>
        <p class="dim" style="margin-bottom:14px">Kids 6–9 Dienstag 17:00 liegt regelmäßig über 90 %. Vorschlag: betroffenen Eltern automatisch Mittwoch 16:00 als ruhigere Alternative anbieten.</p>
        <button class="btn btn-primary" data-action="crm-toast" data-msg="Nachricht an 12 passende Eltern gesendet (Demo)">Nachricht an passende Eltern senden</button></div>`,'#/crm/auslastung');
  }

  /* ---------------- check-in monitor ---------------- */
  function checkins(){
    const rows = byLoc(C().checkins).map(c=>`<tr><td>${c.time}</td><td><b>${c.person}</b></td><td>${c.loc}</td><td>${c.course}</td>
      <td><span class="badge ${c.status==='Check-out'?'b-gray':'b-green'}">${c.status}</span></td></tr>`).join('');
    const actions = ["Chip aktivieren","Chip sperren","Ersatzchip ausgeben","Manuellen Check-in korrigieren","Check-out setzen","Elternbenachrichtigung erneut senden"];
    return shell(`
      <h1 class="crm-h">Check-in-Monitor</h1>
      <div class="crm-sub">Live · Chip / QR / RFID · ${state.standort}</div>
      <div class="split" style="grid-template-columns:1.5fr 1fr">
        <div class="panel"><div class="panel-h"><b>Live-Feed</b><span class="badge b-green">● live</span></div>
          <table class="tbl"><thead><tr><th>Zeit</th><th>Person</th><th>Standort</th><th>Kurs</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>
          <div class="notice" style="margin-top:14px">Jeder Scan speist Auslastung, Retention-Frühwarnung und den Check-in/out-Push an Eltern.</div></div>
        <div class="panel"><div class="panel-h"><b>Aktionen</b></div>
          ${actions.map(a=>`<button class="btn btn-dark btn-block" style="margin-bottom:8px;justify-content:flex-start;text-transform:none;font-family:var(--ff-body);letter-spacing:0;font-size:14px" data-action="crm-toast" data-msg="${a} (Demo)">${a}</button>`).join('')}</div>
      </div>`,'#/crm/checkins');
  }

  /* ---------------- communication ---------------- */
  function kommunikation(){
    const ib = C().inbox, sel = state.inboxSel, m = ib[sel];
    const prioBadge = p => p==='Hoch'?'b-red':p==='Mittel'?'b-amber':'b-gray';
    const list = ib.map((x,i)=>`<button type="button" class="irow ${i===sel?'on':''}" data-action="crm-inbox" data-i="${i}" aria-pressed="${i===sel}">
      <div style="display:flex;justify-content:space-between;gap:8px"><b>${x.customer}</b><span class="badge ${prioBadge(x.prio)}">${x.prio}</span></div>
      <small class="muted">${x.topic} · ${x.channel}</small></button>`).join('');
    const escal = m.status==='Eskalieren';
    return shell(`
      <h1 class="crm-h">Kommunikation</h1>
      <div class="crm-sub">Zentraler Posteingang · KI-Entwürfe zur Freigabe (Human-in-the-Loop)</div>
      <div class="split">
        <div class="panel ilist">${list}</div>
        <div class="panel"><div class="panel-h"><b>${m.customer} · ${m.topic}</b>
          <div style="display:flex;gap:8px;align-items:center"><a class="btn btn-dark btn-sm" href="#/crm/kunde/A">👤 Kunden-360</a><span class="badge ${escal?'b-red':'b-green'}">${m.status}</span></div></div>
          <div style="font-size:13px;color:var(--muted);margin-bottom:10px;display:flex;gap:8px;align-items:center">Kanal: ${m.channel}
            ${m.wa?'<span class="badge b-green" style="text-transform:none">🟢 24h-Antwortfenster aktiv</span>':''}</div>
          ${m.wa?`${(m.chat||[]).map(([dir,txt])=>`<div class="bubble" style="max-width:85%;${dir==='in'?'':'margin-left:auto'}">${txt}</div>`).join('')}
            <div style="font-size:12px;color:var(--muted);margin:8px 0 4px;text-transform:uppercase;letter-spacing:1px">KI-Antwortentwurf</div>`:''}
          <div class="aibox">${m.draft}</div>
          ${m.wa && m.status==='Lead angelegt'?'<div class="notice" style="margin:12px 0 0">✓ Unbekannte Nummer erkannt → Lead-Karte wurde automatisch in der Pipeline angelegt.</div>':''}
          ${escal
            ? `<button class="btn btn-dark" style="margin-top:14px" data-action="crm-toast" data-msg="An Standortleiter eskaliert (Demo)">An Standortleiter eskalieren</button>`
            : m.status==='Beantwortet'
              ? `<div class="badge b-green" style="margin-top:14px">✓ Beantwortet &amp; gesendet</div>`
              : `<div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">
                <button class="btn btn-primary" data-action="crm-msg-answer" data-i="${sel}">Bestätigen & Senden</button>
                <button class="btn btn-dark" data-action="crm-toast" data-msg="Bearbeiten (Demo)">Bearbeiten</button>
                <button class="btn btn-dark" data-action="crm-toast" data-msg="Aufgabe erstellt (Demo)">Aufgabe erstellen</button></div>`}
        </div>
      </div>`,'#/crm/kommunikation');
  }

  /* ---------------- contracts ---------------- */
  function contracts(){
    const rows = [
      ['Emir A.','Kids Premium','Aktiv','24 Mon.','b-green','—'],
      ['Marco S.','MMA Unlimited','Aktiv','24 Mon.','b-green','—'],
      ['Sara A.','Family Add-on','Unterschrift fehlt','12 Mon.','b-amber','Erinnern'],
      ['Lea M.','Kids Standard','Entwurf','12 Mon.','b-gray','Senden'],
      ['Deniz T.','Teens MMA','Entwurf','12 Mon.','b-gray','Senden'],
    ];
    return shell(`
      <div class="panel-h" style="margin-bottom:16px;align-items:flex-end"><h1 class="crm-h" style="margin:0">Verträge</h1>
        <a class="btn btn-primary btn-sm" href="#/crm/vertraege/neu">+ Neuer Vertrag</a></div>
      <div class="crm-sub">Auszug: die 5 aktuellsten · franchiseweit 8 offene Verträge</div>
      <div class="panel"><table class="tbl"><thead><tr><th>Kunde</th><th>Tarif</th><th>Status</th><th>Laufzeit</th><th>Aktion</th></tr></thead><tbody>
        ${rows.map(([k,t,s,l,b,a])=>`<tr><td><b>${k}</b></td><td>${t}</td><td><span class="badge ${b}">${s}</span></td><td>${l}</td><td>${actBtn(a)}</td></tr>`).join('')}
      </tbody></table></div>
      <div class="notice">Rechtlich erzwungen: max. 24 Monate Erstlaufzeit · Verlängerung monatlich kündbar (§ 309 BGB) · digitales SEPA-Mandat · Widerruf · Kündigungsbutton (§ 312k).</div>`,'#/crm/vertraege');
  }

  /* ---------------- payments (flagship) ---------------- */
  function payments(){
    const s = C().paysummary;
    const order = {rueck:0, offen:1, bezahlt:2};
    const ps = byLoc(C().payments).slice().sort((a,b)=>order[a.status]-order[b.status]);
    const rows = ps.map(p=>{ const pb=payBadge(p.status);
      const act = p.status==='rueck'?'Neuer Einzug':p.status==='offen'?'Erinnerung senden':'—';
      const armed = state.arm==='pay:'+p.who;
      const actions = p.status==='bezahlt'
        ? '<span class="muted">—</span>'
        : `<div style="display:flex;gap:6px;justify-content:flex-end;flex-wrap:wrap">
             <button class="btn btn-dark btn-sm" data-action="crm-toast" data-msg="${act} (Demo)">${act}</button>
             <button class="btn ${armed?'confirm-armed':'btn-dark'} btn-sm" data-action="crm-pay-paid" data-who="${p.who}">${armed?'Sicher? '+p.amount+' bestätigen':'✓ Bezahlt'}</button></div>`;
      return `<tr><td><b>${p.who}</b><br><small class="muted">${p.loc}</small></td><td><b>${p.amount}</b></td><td>${p.reason}</td><td>${p.age}</td>
        <td><span class="badge ${pb[0]}">${pb[1]}</span></td><td>${actions}</td></tr>`; }).join('');
    return shell(`
      <h1 class="crm-h">Zahlungen</h1>
      <div class="crm-sub">Zahlungslauf Juli 2026 · KPIs franchiseweit (2.410 Mitglieder) · Tabelle: die dringendsten Fälle</div>
      <div class="kpi-grid">
        <div class="kpi red"><div class="n">${s.rueck}</div><div class="l">Rücklastschriften · franchiseweit</div></div>
        <div class="kpi amber"><div class="n">${s.offen}</div><div class="l">Offene Zahlungen · franchiseweit</div></div>
        <div class="kpi"><div class="n">${s.heute}</div><div class="l">Heute fällig</div></div>
        <div class="kpi green"><div class="n">${s.recovery}</div><div class="l">Recovery-Quote</div></div>
      </div>
      <div class="notice">🔴 Rote Fälle (Rücklastschriften) stehen immer ganz oben. Offener Betrag gesamt: <b style="color:#fff">${s.betrag}</b> · automatische Zahlungserinnerung-Journey aktiv, sensible Mahnstufe eskaliert an Mensch.</div>
      <div class="panel"><table class="tbl"><thead><tr><th>Kunde</th><th>Betrag</th><th>Grund</th><th>Alter</th><th>Status</th><th>Aktion</th></tr></thead><tbody>${rows}</tbody></table></div>`,'#/crm/zahlungen');
  }

  /* ---------------- reports ---------------- */
  function reports(){
    const r = C().reports;
    const ceo = r.ceo.map(x=>`<div class="kpi" style="cursor:default"><div class="n" style="font-size:26px">${x.v}</div><div class="l">${x.l}</div></div>`).join('');
    const rows = r.standorte.map(s=>`<tr><td><b>${s.city}</b></td><td>${s.leads}</td><td>${s.trial}</td><td>${s.close}</td><td>${s.occ}</td><td>${s.offen}</td></tr>`).join('');
    const hCol = s => s>=80?'var(--green)':s>=70?'var(--amber)':'#ff5470';
    const health = C().health.map(h=>`<div class="kpi" style="cursor:default;border-color:${h.score<70?'rgba(228,0,43,.4)':'var(--line)'}">
      <div style="display:flex;justify-content:space-between;align-items:baseline">
        <div class="n" style="font-size:34px;color:${hCol(h.score)}">${h.score}</div>
        <span class="badge ${h.trend.startsWith('+')?'b-green':'b-red'}">${h.trend}</span></div>
      <div class="l"><b style="color:#fff">${h.city}</b> · Health-Score</div>
      <div style="display:flex;gap:4px;margin-top:10px">${Object.entries(h.drivers).map(([k,v])=>`<div title="${k}: ${v}" style="flex:1;height:6px;border-radius:100px;background:${hCol(v)}"></div>`).join('')}</div>
      <div class="muted" style="font-size:10px;margin-top:5px">${Object.entries(h.drivers).map(([k,v])=>k+' '+v).join(' · ')}</div>
    </div>`).join('');
    return shell(`
      <h1 class="crm-h">Reports · Geschäftsführung</h1>
      <div class="crm-sub">Konsolidiert über alle Standorte (Franchise-Cockpit)</div>
      <div class="panel" style="border-color:var(--amber)"><div class="panel-h"><b>🧠 Wochen-Digest (KI) · ${C().digest.week}</b>
          <button class="btn btn-dark btn-sm" data-action="crm-toast" data-msg="Digest als E-Mail versendet (Demo)">Als E-Mail senden</button></div>
        <div class="split" style="grid-template-columns:1fr 1fr 1fr;gap:14px">
          <div><b style="color:var(--green);font-size:13px;text-transform:uppercase;letter-spacing:1px">Highlights</b>
            ${C().digest.highlights.map(h=>`<p class="dim" style="font-size:13px;margin:8px 0 0">• ${h}</p>`).join('')}</div>
          <div><b style="color:#ff5470;font-size:13px;text-transform:uppercase;letter-spacing:1px">Risiken</b>
            ${C().digest.risks.map(h=>`<p class="dim" style="font-size:13px;margin:8px 0 0">• ${h}</p>`).join('')}</div>
          <div><b style="color:var(--amber);font-size:13px;text-transform:uppercase;letter-spacing:1px">Entscheidungsbedarf</b>
            ${C().digest.decisions.map(h=>`<p class="dim" style="font-size:13px;margin:8px 0 0">• ${h}</p>`).join('')}</div>
        </div>
      </div>
      <div class="panel-h" style="margin-bottom:10px"><b>Standort-Health-Score</b><span class="muted" style="font-size:13px">Composite aus Umsatz · Retention · Auslastung · Leads · Zahlungen</span></div>
      <div class="kpi-grid">${health}</div>
      <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr)">${ceo}</div>
      <div class="panel"><div class="panel-h"><b>Standortvergleich</b></div>
        <table class="tbl"><thead><tr><th>Standort</th><th>Leads</th><th>Trial-Rate</th><th>Abschluss</th><th>Auslastung</th><th>Offene Zahlungen</th></tr></thead><tbody>${rows}</tbody></table></div>
      <div class="split">
        <div class="panel"><div class="panel-h"><b>💶 P&amp;L light · Monat</b><span class="muted" style="font-size:12px">4 von 10 Standorten (Auszug) · Franchise-MRR gesamt: ${C().fact.mrr}</span></div>
          <table class="tbl" style="min-width:520px"><thead><tr><th>Standort</th><th>Umsatz</th><th>Personal</th><th>Miete</th><th>Sonstiges</th><th>DB</th></tr></thead><tbody>
            ${C().pnl.map(p=>`<tr><td><b>${p.city}</b></td><td>${p.umsatz}</td><td>${p.personal}</td><td>${p.miete}</td><td>${p.sonst}</td>
              <td><b style="color:${p.ok?'var(--green)':'#ff5470'}">${p.db}</b> <span class="muted">(${p.pct} %)</span></td></tr>`).join('')}
          </tbody></table>
          ${C().pnl.some(p=>!p.ok)?'<div class="notice" style="margin-top:12px">⚠️ München unter Break-even — Personalkosten prüfen (siehe Anomalie-Radar) und Miete/Umsatz-Verhältnis 37 %.</div>':''}
        </div>
        <div class="panel"><div class="panel-h"><b>🤖 Selbstservice-Quote</b><span class="badge ${C().selfservice.quote>=C().selfservice.ziel?'b-green':'b-amber'}">${C().selfservice.quote} % · Ziel ${C().selfservice.ziel} %</span></div>
          <p class="muted" style="font-size:13px;margin:0 0 12px">Anteil aller Vorgänge ohne Mitarbeiter-Beteiligung — DIE Kostenspar-Kennzahl.</p>
          ${C().selfservice.items.map(([n,v])=>`<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:5px"><b>${n}</b><span class="muted">${v} %</span></div>
            <div class="bar" style="height:9px"><span style="width:${v}%;background:${v>=80?'var(--green)':v>=60?'var(--amber)':'var(--red)'}"></span></div></div>`).join('')}
          <p class="muted" style="font-size:12px;margin:0">Hebel: Zahlart-Wechsel &amp; Umbuchungen noch zu oft an der Theke → App-Flows bewerben.</p>
        </div>
      </div>`,'#/crm/reports');
  }

  /* ---------------- trainer view (slim mobile) ---------------- */
  const TRAINER_COURSES = {
    K2:{n:"Kids Kickboxen 6–9",time:"16:00",loc:"Krefeld"},
    K1:{n:"Kids Kickboxen 6–9",time:"17:00",loc:"Krefeld"},
    T1:{n:"Teens Kickboxen",time:"18:30",loc:"Krefeld"},
    T2:{n:"MMA Beginner",time:"20:00",loc:"Krefeld"},
  };
  const TRAINER_PARTS = [
    {name:"Emir A.",belt:"Gelbgurt"},{name:"Sara K.",belt:"Weißgurt"},
    {name:"Leo M.",belt:"Probetraining"},{name:"Milan T.",belt:"Weißgurt"},{name:"Nora B.",belt:"Orangegurt"},
  ];
  const SKILLS = ["Deckung","Jab-Cross","Lowkick","Fallschule","Sparring"];

  function ensureAtt(){ if(!state.trainerAtt){ state.trainerAtt={}; TRAINER_PARTS.forEach(p=>state.trainerAtt[p.name]= p.belt==='Probetraining'?'⏳':'✅'); } }

  function trainerShell(content){
    return `<div class="app-wrap" style="padding-bottom:28px">
      <div class="app-top"><div class="who"><div class="avatar">M</div>
        <div><div class="hi">Trainer-Ansicht</div><div class="nm">Mehmet</div></div></div>
        <a class="icon-btn" href="#/crm" title="Zum CRM / Rollen">✕</a></div>
      <div class="app-body">${content}</div></div>`;
  }
  function trainerHome(){
    const today=[["K2","16:00","Kids Kickboxen 6–9","ruhig"],["K1","17:00","Kids Kickboxen 6–9","voll"],["T1","18:30","Teens Kickboxen","normal"],["T2","20:00","MMA Beginner","normal"]];
    const drafts = (D.weeklyReports||[]).filter(r=>r.status==='entwurf').length;
    const me = C().zeiten.find(z=>z.name.startsWith('Mehmet'));
    const vt = C().vertretung;
    return trainerShell(`
      <h1 class="app-h">Heute</h1>
      <p class="muted" style="margin:-8px 0 14px">4 Kurse · NFT Krefeld</p>
      <div class="app-card"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">📊 Meine Stats</b>
        <div style="display:flex;gap:10px;margin-top:10px;text-align:center">
          <div style="flex:1;background:var(--surface-2);border-radius:10px;padding:10px"><b style="font-family:var(--ff-head);font-size:22px;color:var(--green)">${C().trainerStats.retention}</b><br><small class="muted">Retention meiner Kurse</small></div>
          <div style="flex:1;background:var(--surface-2);border-radius:10px;padding:10px"><b style="font-family:var(--ff-head);font-size:22px;color:var(--green)">${C().trainerStats.puls}</b><br><small class="muted">Puls-Score</small></div>
          <div style="flex:1;background:var(--surface-2);border-radius:10px;padding:10px"><b style="font-family:var(--ff-head);font-size:22px">${C().trainerStats.feedback}</b><br><small class="muted">Feedback-Quote</small></div>
        </div>
        <p class="muted" style="font-size:12px;margin:8px 0 0">${C().trainerStats.vergleich} — starke Woche! 💪</p>
      </div>
      <div class="app-card" style="display:flex;gap:12px;align-items:center">
        <div class="thumb" style="font-size:22px">⏱️</div>
        <div class="meta" style="flex:1"><b>Arbeitszeit</b><small>${me && me.in!=='–' ? 'Eingestempelt um '+me.in+' · Plan '+me.plan : 'Noch nicht eingestempelt · Plan '+((me||{}).plan||'')}</small></div>
        <button class="btn ${me && me.in!=='–' ? 'btn-dark':'btn-primary'} btn-sm" data-action="crm-stamp">${me && me.in!=='–' ? 'Ausstempeln' : 'Einstempeln'}</button>
      </div>
      ${vt && vt.status!=='bestätigt' ? `<div class="app-card" style="border-color:var(--amber)">
        <div style="display:flex;gap:12px;align-items:center"><div class="thumb" style="background:rgba(245,165,36,.15);color:var(--amber);font-size:22px">⚠️</div>
          <div class="meta" style="flex:1"><b>Vertretung gesucht: ${vt.kurs}</b><small>${vt.when} · ${vt.loc} · Grund: ${vt.reason} · angefragt: ${vt.asked.join(', ')}</small></div></div>
        <div class="rowbtns"><button class="btn btn-primary" data-action="crm-vertretung">Ich übernehme</button>
          <button class="btn btn-dark" data-action="crm-toast" data-msg="Weitergeleitet an Trainer-Cluster (Demo)">Kann nicht</button></div></div>`
      : vt ? `<div class="app-card" style="border-color:var(--green);display:flex;gap:12px;align-items:center"><div class="thumb">✅</div>
          <div class="meta" style="flex:1"><b>Vertretung bestätigt: ${vt.kurs}</b><small>${vt.when} · Eltern wurden automatisch informiert</small></div></div>` : ''}
      ${!D.kids[0].buddy ? `<div class="app-card" style="border-color:var(--blue)">
        <b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">🤝 Neues Mitglied ohne Buddy: Emir A.</b>
        <p class="muted" style="font-size:13px;margin:6px 0 10px">Wähle einen Trainingsbuddy aus dem Kurs — die Eltern sehen es sofort in ihrer App.</p>
        <div class="choices">${['Nora B.','Sara K.','Milan T.'].map(n=>`<button type="button" class="chip" data-action="crm-buddy" data-n="${n}">${n}</button>`).join('')}</div>
      </div>` : `<div class="app-card" style="display:flex;gap:12px;align-items:center"><div class="thumb">🤝</div>
        <div class="meta" style="flex:1"><b>Buddy zugewiesen: Emir A. + ${D.kids[0].buddy}</b><small>Eltern-App aktualisiert ✓</small></div></div>`}
      ${drafts?`<a class="app-card accent" href="#/trainer/reports" style="display:flex;align-items:center;gap:14px">
        <div class="thumb">📝</div><div class="meta" style="flex:1"><b>Wochenreports freigeben</b><small>${drafts} KI-Entwürfe warten · Freitag ist Report-Tag</small></div><span class="muted">›</span></a>`:''}
      <a class="app-card" href="#/trainer/pruefung" style="display:flex;align-items:center;gap:14px;border-color:var(--red)">
        <div class="thumb" style="background:var(--red-050);color:var(--red)">🥋</div>
        <div class="meta" style="flex:1"><b>${C().pruefung.title}</b><small>${C().pruefung.when} · ${C().pruefung.candidates.length} Kandidaten</small></div>
        <span class="tag">Prüfung</span></a>
      ${today.map(([id,t,n,o])=>`<a class="app-card" href="#/trainer/kurs/${id}" style="display:flex;align-items:center;gap:14px">
        <div class="thumb">🥋</div><div class="meta" style="flex:1"><b>${t} · ${n}</b><small>${occ(o)}</small></div><span class="muted">›</span></a>`).join('')}
    `);
  }

  /* ---------------- pre-class briefing + exam + weekly reports ---------------- */
  function briefingCard(courseId){
    const items = (C().briefing||{})[courseId]; if(!items) return '';
    const ico = {'Probetraining':'⏳','Rückkehrer':'🔄','Prüfungsnah':'🎯'};
    return `<div class="app-card accent"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">⚡ 60-Sekunden-Briefing</b>
      ${items.map(b=>`<div class="list-item"><span class="li-ico">${ico[b.type]||'ℹ️'}</span>
        <div class="li-main"><b>${b.name} <span class="badge b-gray" style="margin-left:6px">${b.type}</span></b><small>${b.note}</small></div></div>`).join('')}
    </div>`;
  }
  function trainerPruefung(){
    const p = C().pruefung;
    if(!state.exam) state.exam = {};
    const row = c => {
      const marks = state.exam[c.name] || (state.exam[c.name] = {});
      const passed = state.examPassed && state.examPassed[c.name];
      const allChecked = p.criteria.every((_,i)=>marks[i]);
      return `<div class="app-card" style="${passed?'border-color:var(--green)':''}">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <b>${c.name}</b>
          ${passed?'<span class="badge b-green">✓ Bestanden</span>':c.ready?'<span class="badge b-amber">bereit</span>':'<span class="badge b-gray">Zusatzkandidat</span>'}
        </div>
        ${passed?'':`<div class="choices" style="margin-bottom:10px">${p.criteria.map((cr,i)=>`<button type="button" class="chip ${marks[i]?'sel':''}" data-action="crm-exam-toggle" data-name="${c.name}" data-i="${i}">${marks[i]?'✓ ':''}${cr}</button>`).join('')}</div>
        <button class="btn ${allChecked?'btn-primary':'btn-dark'} btn-sm" data-action="crm-exam-pass" data-name="${c.name}" ${allChecked?'':'disabled style="opacity:.45;cursor:not-allowed"'}>Bestanden — Gürtel verleihen</button>`}
      </div>`;
    };
    return trainerShell(`
      <a class="backlink" href="#/trainer">← Heute</a>
      <h1 class="app-h">${p.title}</h1>
      <p class="muted" style="margin:-8px 0 14px">${p.when} · Kriterien je Kind abhaken</p>
      ${p.candidates.map(row).join('')}
      <div class="notice">Bestanden löst automatisch aus: Urkunde + Badge in der Eltern-App, Prüfungspaket-Angebot, Review-Anfrage-Journey.</div>
    `);
  }
  function trainerReports(){
    const reps = D.weeklyReports||[];
    const anyDraft = reps.some(r=>r.status==='entwurf');
    return trainerShell(`
      <a class="backlink" href="#/trainer">← Heute</a>
      <h1 class="app-h">Wochenreports</h1>
      <p class="muted" style="margin:-8px 0 14px">KI hat aus deinen Trainings-Tags je Kind einen 3-Satz-Report erstellt — prüfen &amp; freigeben.</p>
      ${reps.map((r,i)=>`<div class="app-card" style="${r.status!=='entwurf'?'border-color:var(--green)':''}">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <b>${r.kid}</b>${r.status==='entwurf'?'<span class="badge b-amber">Entwurf</span>':'<span class="badge b-green">✓ An Eltern gesendet</span>'}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">${r.tags.map(t=>`<span class="badge b-gray" style="text-transform:none;letter-spacing:0">${t}</span>`).join('')}</div>
        <div class="bubble">${r.text}</div>
        ${r.status==='entwurf'?`<div style="display:flex;gap:8px;margin-top:10px">
          <button class="btn btn-primary btn-sm" data-action="crm-wr-approve" data-i="${i}">Freigeben</button>
          <button class="btn btn-dark btn-sm" data-action="crm-toast" data-msg="Bearbeiten (Demo)">Bearbeiten</button></div>`:''}
      </div>`).join('')}
      ${anyDraft?`<button class="btn btn-primary btn-block" data-action="crm-wr-all">Alle freigeben &amp; an Eltern senden</button>`:'<div class="notice">✓ Alle Reports dieser Woche sind raus. Eltern sehen sie in der App.</div>'}
    `);
  }
  function trainerKurs(id){
    ensureAtt();
    const c=TRAINER_COURSES[id]||TRAINER_COURSES.K2;
    return trainerShell(`
      <a class="backlink" href="#/trainer">← Heute</a>
      <h1 class="app-h">${c.n}</h1>
      <p class="muted" style="margin:-8px 0 14px">${c.time} · NFT ${c.loc}</p>
      ${briefingCard(id)}
      <div class="app-card"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Anwesenheit</b>
        <p class="muted" style="font-size:12px;margin:4px 0 8px">Tippen zum Wechseln: ✅ da · ❌ fehlt · ⏳ Probe</p>
        ${TRAINER_PARTS.map(p=>`<div class="list-item"><button class="icon-btn" data-action="crm-trainer-att" data-name="${p.name}" style="font-size:18px">${state.trainerAtt[p.name]}</button>
          <div class="li-main"><b>${p.name}</b><small>${p.belt}</small></div></div>`).join('')}
      </div>
      <div class="rowbtns" style="flex-wrap:wrap">
        <button class="btn btn-dark" data-action="crm-toast" data-msg="Skill markiert (Demo)">Skill markieren</button>
        <button class="btn btn-dark" data-action="crm-toast" data-msg="Elternnotiz gesendet (Demo)">Elternnotiz</button>
        <button class="btn btn-dark" data-action="crm-toast" data-msg="Als prüfungsbereit markiert (Demo)">Prüfungsbereit</button>
      </div>
      <a class="btn btn-primary btn-block" href="#/trainer/kurs/${id}/abschluss" style="margin-top:12px">Kurs abschließen</a>
    `);
  }
  function trainerAbschluss(id){
    return trainerShell(`
      <a class="backlink" href="#/trainer/kurs/${id}">← Kurs</a>
      <h1 class="app-h">Kurs abschließen</h1>
      <div class="app-card"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Heute geübt</b>
        <div class="choices" style="margin-top:12px">${SKILLS.map(s=>`<button type="button" class="chip ${state.trainerSkills.includes(s)?'sel':''}" data-action="crm-skill" data-s="${s}">${s}</button>`).join('')}</div>
      </div>
      <div class="app-card"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">Feedback (an Eltern)</b>
        <textarea id="tfeedback" placeholder="z. B. Emir: gute Konzentration, sauberere Kombinationen…" style="width:100%;margin-top:10px;min-height:90px;background:var(--surface-2);border:1px solid var(--line);border-radius:10px;color:var(--text);padding:12px;font-family:inherit"></textarea>
      </div>
      <div class="notice">Nach dem Speichern sehen die Eltern Fortschritt & Feedback sofort in ihrer App.</div>
      <button class="btn btn-primary btn-block" data-action="crm-trainer-save">Speichern & abschließen</button>
    `);
  }
  function trainerRoute(seg){
    ensureAtt();
    if(!seg[1]) return trainerHome();
    if(seg[1]==='kurs') return seg[3]==='abschluss' ? trainerAbschluss(seg[2]) : trainerKurs(seg[2]);
    if(seg[1]==='pruefung') return trainerPruefung();
    if(seg[1]==='reports') return trainerReports();
    return trainerHome();
  }

  /* ---------------- retention inbox ---------------- */
  function retention(){
    const items = byLoc(C().retention);
    const open = items.filter(r=>r.status==='offen').length;
    const scoreCol = s => s>=80?'#ff5470':s>=70?'var(--amber)':'var(--text-dim)';
    const card = r => {
      const done = r.status!=='offen';
      const manual = r.draft.startsWith('⚠️');
      return `<div class="panel" style="${done?'opacity:.55':''}${r.score>=80?';border-color:rgba(228,0,43,.4)':''}">
        <div class="panel-h" style="margin-bottom:8px">
          <div><b style="font-size:17px">${r.name}</b> <span class="muted" style="font-size:13px">· ${r.who}</span></div>
          <div style="display:flex;align-items:center;gap:10px">
            <span style="font-family:var(--ff-head);font-size:26px;color:${scoreCol(r.score)}">${r.score}</span>
            <span class="badge ${done?'b-green':'b-red'}">${done?'✓ '+r.status:'Churn-Risiko'}</span>
          </div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">${r.reasons.map(x=>`<span class="badge b-gray" style="text-transform:none;letter-spacing:0">${x}</span>`).join('')}</div>
        <div style="font-size:13px;color:var(--text-dim);margin-bottom:10px"><b style="color:#fff">Next Best Action:</b> ${r.action}</div>
        ${done?'':`<div class="aibox" style="max-height:130px;overflow:auto">${r.draft}</div>
        <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
          ${manual
            ? `<button class="btn btn-dark btn-sm" data-action="crm-ret-task" data-id="${r.id}">Aufgabe für Trainer erstellen</button>`
            : `<button class="btn btn-primary btn-sm" data-action="crm-ret-send" data-id="${r.id}">Bestätigen & Senden</button>
               <button class="btn btn-dark btn-sm" data-action="crm-toast" data-msg="Bearbeiten (Demo)">Bearbeiten</button>
               <button class="btn btn-dark btn-sm" data-action="crm-ret-task" data-id="${r.id}">Als Anruf-Aufgabe</button>`}
          <button class="btn btn-dark btn-sm" data-action="crm-ret-later" data-id="${r.id}">Später</button>
        </div>`}
      </div>`;
    };
    return shell(`
      <h1 class="crm-h">Retention-Inbox</h1>
      <div class="crm-sub">Das System erkennt Kündigungsrisiken und schlägt die nächste Aktion vor — du bestätigst nur.</div>
      <div class="notice">🏖️ <b>Ferien-Engine aktiv:</b> ${C().ferien[0].land}-Sommerferien in ${C().ferien[0].inTagen} Tagen (${C().ferien[0].zeit}) — Anwesenheits-Scores werden automatisch gedämpft, Reaktivierungs-Journeys pausieren, Camp-Cross-Sell läuft.</div>
      <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr)">
        <div class="kpi red"><div class="n">${open}</div><div class="l">Offene Top-Risiken (von ${C().fact.watchlist} auf der Watchlist)</div></div>
        <div class="kpi green"><div class="n">${items.length-open}</div><div class="l">Diese Woche bearbeitet</div></div>
        <div class="kpi"><div class="n">~${open*70} €</div><div class="l">Gefährdeter Monatsumsatz</div></div>
      </div>
      ${items.slice().sort((a,b)=>(a.status==='offen'?0:1)-(b.status==='offen'?0:1)||b.score-a.score).map(card).join('')}
      <div class="notice">Score-Logik (Demo): Anwesenheits-Rückgang, Zahlungsstatus, Pausen-Ende, Plateau &amp; App-Inaktivität. Sensible Fälle werden nie automatisch versendet.</div>
    `,'#/crm/retention');
  }

  /* ---------------- upsell engine + geschwister-radar ---------------- */
  function upsell(){
    const items = byLoc(C().upsell);
    const open = items.filter(u=>u.status==='offen').length;
    const badge = s => s==='offen'?'<span class="badge b-amber">Chance</span>':s==='gesendet'?'<span class="badge b-gray">Angebot gesendet</span>':'<span class="badge b-green">✓ Angenommen</span>';
    const typIco = {'Familien-Bundle':'👨‍👩‍👧‍👦','Tarif-Upgrade':'📈','Geschwister-Radar':'🧒','Add-on':'➕'};
    return shell(`
      <h1 class="crm-h">Upsell-Chancen</h1>
      <div class="crm-sub">Nächtlicher Daten-Scan: Tarif passt nicht zur Nutzung, Geschwister ohne Vertrag, Einzelticket-Muster — du bestätigst nur.</div>
      <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr)">
        <div class="kpi amber"><div class="n">${open}</div><div class="l">Offene Chancen</div></div>
        <div class="kpi green"><div class="n">+78 €</div><div class="l">MRR-Potenzial (Demo)</div></div>
        <div class="kpi"><div class="n">${items.filter(u=>u.status==='angenommen').length}</div><div class="l">Diesen Monat angenommen</div></div>
      </div>
      ${items.map(u=>`<div class="panel" style="${u.status==='angenommen'?'border-color:var(--green)':''}">
        <div class="panel-h" style="margin-bottom:8px">
          <div><span style="font-size:20px;margin-right:8px">${typIco[u.typ]||'💡'}</span><b style="font-size:17px">${u.familie}</b>
            <span class="badge b-gray" style="margin-left:8px;text-transform:none;letter-spacing:0">${u.typ}</span></div>
          ${badge(u.status)}</div>
        <div style="font-size:14px;color:var(--text-dim);margin-bottom:6px"><b style="color:#fff">Erkannt:</b> ${u.insight}</div>
        <div style="font-size:14px;color:var(--text-dim);margin-bottom:10px"><b style="color:#fff">Rechnung:</b> ${u.calc}</div>
        ${u.status==='offen'?`<div class="aibox" style="max-height:120px;overflow:auto">${u.draft}</div>
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="btn btn-primary btn-sm" data-action="crm-up-send" data-id="${u.id}">Bestätigen & Angebot senden</button>
            <button class="btn btn-dark btn-sm" data-action="crm-toast" data-msg="Bearbeiten (Demo)">Bearbeiten</button>
            <button class="btn btn-dark btn-sm" data-action="crm-up-later" data-id="${u.id}">Später</button></div>`
        : u.status==='gesendet'?'<div class="muted" style="font-size:13px">Wartet auf Antwort — das Angebot liegt als Ein-Tap-Karte in der Kunden-App.</div>':''}
      </div>`).join('')}
      <div class="notice">Angebote sind immer Human-in-the-Loop: kein Auto-Versand, jede Karte wird von einem Mitarbeiter bestätigt.</div>
    `,'#/crm/upsell');
  }

  /* ---------------- team / qualification register ---------------- */
  function team(){
    const t = C().trainers;
    const st = s => s==='ok'?'<span class="badge b-green">✓ vollständig</span>':s==='warn'?'<span class="badge b-amber">läuft bald ab</span>':'<span class="badge b-red">GESPERRT für Kinderkurse</span>';
    const doc = d => d.includes('ABGELAUFEN')?`<span style="color:#ff5470;font-weight:600">${d}</span>`:d.includes('08/2026')?`<span style="color:var(--amber)">${d}</span>`:d;
    return shell(`
      <h1 class="crm-h">Trainer & Team · Qualifikations-Register</h1>
      <div class="crm-sub">Harte Regel: Kein Kinderkurs ohne gültige Lizenz + Erste Hilfe + erweitertes Führungszeugnis.</div>
      <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr)">
        <div class="kpi green"><div class="n">${t.filter(x=>x.status==='ok').length}</div><div class="l">Vollständig qualifiziert</div></div>
        <div class="kpi amber"><div class="n">${t.filter(x=>x.status==='warn').length}</div><div class="l">Dokument läuft bald ab</div></div>
        <div class="kpi red"><div class="n">${t.filter(x=>x.status==='block').length}</div><div class="l">Gesperrt (Kinderkurse)</div></div>
      </div>
      <div class="panel"><table class="tbl"><thead><tr><th>Trainer</th><th>Standort · Rolle</th><th>Lizenz</th><th>Erste Hilfe</th><th>Führungszeugnis</th><th>Status</th><th></th></tr></thead><tbody>
        ${t.map(x=>`<tr><td><b>${x.name}</b></td><td>${x.loc} · ${x.rolle}</td><td>${doc(x.lizenz)}</td><td>${doc(x.eh)}</td><td>${doc(x.fz)}</td><td>${st(x.status)}</td>
          <td>${x.status!=='ok'?`<button class="btn btn-dark btn-sm" data-action="crm-toast" data-msg="Erinnerung an ${x.name} gesendet (Demo)">Dokument anfordern</button>`:''}</td></tr>`).join('')}
      </tbody></table></div>
      ${t.filter(x=>x.status!=='ok'&&x.warnNote).map(x=>`<div class="notice">${x.status==='block'?'⛔':'⚠️'} <b>${x.name}:</b> ${x.warnNote}. ${x.status==='block'?'Das System blockiert die Zuweisung zu Kids-Kursen automatisch.':''}</div>`).join('')}
    `,'#/crm/team');
  }

  /* ---------------- feedback dashboard (NFT Puls) ---------------- */
  function feedbackDash(){
    const f = C().feedback;
    const smiley = {gut:['🙂','h-ruhig'], mittel:['😐','h-normal'], schlecht:['😞','h-voll']};
    const heat = f.kioskHeat.rows.map(r=>`<tr><td class="t-time">${r.time}</td>${r.cells.map(c=>`<td class="${smiley[c][1]}">${smiley[c][0]}</td>`).join('')}</tr>`).join('');
    const openDet = f.detractors.filter(d=>d.status==='offen').length;
    return shell(`
      <h1 class="crm-h">Feedback & Puls</h1>
      <div class="crm-sub">NFT Puls: 1-Tap-Votes aus App & Kiosk · Ereignis-NPS · Detraktor-Alarm mit 24h-SLA</div>
      <div class="kpi-grid">
        <div class="kpi green"><div class="n">${f.pulse.score}<span style="font-size:16px;color:var(--muted)">/5</span></div><div class="l">Trainings-Puls (${f.pulse.n} Votes) · ${f.pulse.trend}</div></div>
        <div class="kpi"><div class="n">${f.nps.value}</div><div class="l">NPS · ${f.nps.promoters}% Promoter / ${f.nps.detractors}% Detraktoren</div></div>
        <div class="kpi red"><div class="n">${openDet}</div><div class="l">Offene Detraktor-Fälle (SLA 24h)</div></div>
        <div class="kpi"><div class="n">${D.feedback.roadmap.reduce((n,r)=>n+r.votes,0)}</div><div class="l">Stimmen im Feature-Voting</div></div>
      </div>
      <div class="split">
        <div class="panel"><div class="panel-h"><b>Kiosk-Stimmung · Woche</b><span class="muted" style="font-size:12px">Smiley-Terminal am Ausgang</span></div>
          <div class="heat"><table><thead><tr><th></th>${f.kioskHeat.days.map(d=>`<th>${d}</th>`).join('')}</tr></thead><tbody>${heat}</tbody></table></div>
          <div class="notice" style="margin:12px 0 0">Di 17–18 Uhr fällt ab — korreliert mit der Überfüllung. <a href="#/crm/auslastung" style="color:var(--red);font-weight:600">Slot entzerren →</a></div>
        </div>
        <div class="panel"><div class="panel-h"><b>Feature-Voting (live)</b><a href="#/app/mitbestimmen" style="color:var(--red);font-size:13px;font-weight:600">In der App ansehen →</a></div>
          ${D.feedback.roadmap.map(r=>`<div class="list-item"><div class="li-main"><b>${r.title}</b><small>${r.votes} Stimmen</small></div></div>`).join('')}
          <div class="panel-h" style="margin-top:14px"><b>„Getan"-Feed</b><button class="btn btn-dark btn-sm" data-action="crm-toast" data-msg="Eintrag hinzufügen (Demo)">+ Eintrag</button></div>
          ${D.feedback.done.slice(0,2).map(d=>`<div class="list-item"><span class="li-ico">✅</span><div class="li-main"><b>${d.what}</b><small>${d.when} · ${d.src}</small></div></div>`).join('')}
        </div>
      </div>
      ${f.detractors.map((d,i)=>{ const manual=d.draft.startsWith('⚠️'); const done=d.status!=='offen';
        return `<div class="panel" style="${done?'opacity:.55':'border-color:rgba(228,0,43,.4)'}">
        <div class="panel-h" style="margin-bottom:8px"><div><b>${d.name}</b> <span class="muted" style="font-size:13px">· ${d.loc} · ${d.when}</span></div>
          <span class="badge ${done?'b-green':'b-red'}">${done?'✓ '+d.status:d.signal}</span></div>
        <p class="dim" style="margin:0 0 10px">„${d.text}"</p>
        ${done?'':`<div class="aibox">${d.draft}</div>
        <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
          ${manual
            ? `<a class="btn btn-primary btn-sm" href="#/crm/auslastung" data-action="crm-fb-task" data-i="${i}">Maßnahme: Slot entzerren</a>`
            : `<button class="btn btn-primary btn-sm" data-action="crm-fb-send" data-i="${i}">Bestätigen & antworten</button>
               <button class="btn btn-dark btn-sm" data-action="crm-toast" data-msg="Bearbeiten (Demo)">Bearbeiten</button>`}
        </div>`}
      </div>`; }).join('')}
      <div class="notice">Fairness-Regeln: Trainer-/Kurs-Scores nur aggregiert ab ≥10 Stimmen · Kiosk anonym · Promoter (NPS ≥ 9) bekommen die Google-Review-Bitte, Detraktoren einen Menschen.</div>
    `,'#/crm/feedback');
  }

  /* ---------------- support-center (WhatsApp + Telefon, KI beantwortet) ---------------- */
  function supportCenter(){
    const S = C().support;
    const chips = ["Alle","WhatsApp","Telefon"];
    const match = it => state.supFilter==='Alle' || (state.supFilter==='WhatsApp' ? it.ch==='whatsapp' : it.ch==='phone');
    const items = S.items.filter(match);
    if(!items.some(i=>i.id===state.supSel)) state.supSel = items.length ? items[0].id : null;
    const cur = S.items.find(i=>i.id===state.supSel);
    const chIco = c => c==='whatsapp' ? '🟢' : '☎️';
    const stBadge = s => s==='auto' ? '<span class="badge b-green">✓ KI hat geantwortet</span>'
      : s==='freigabe' ? '<span class="badge b-amber">Wartet auf Freigabe</span>'
      : s==='mensch' ? '<span class="badge b-red">An Mensch eskaliert</span>'
      : s==='done' ? '<span class="badge b-green">✓ Erledigt · Termin gebucht</span>'
      : '<span class="badge b-gray">Gesendet ✓</span>';
    return shell(`
      <div class="panel-h" style="margin-bottom:6px;align-items:flex-end"><h1 class="crm-h" style="margin:0">Support-Center</h1>
        <div class="choices">${chips.map(c=>`<button type="button" class="chip ${state.supFilter===c?'sel':''}" data-action="crm-sup-filter" data-v="${c}">${c}</button>`).join('')}</div></div>
      <div class="crm-sub">WhatsApp Business + Telefon in einer Inbox — die KI beantwortet einfache Anliegen sofort, alles andere geht mit Entwurf an euch.</div>
      <div class="kpi-grid" style="grid-template-columns:repeat(5,1fr)">
        <div class="kpi"><div class="n">${S.stats.heute}</div><div class="l">Eingegangen heute</div></div>
        <div class="kpi green"><div class="n">${S.stats.autoKI}</div><div class="l">Von KI sofort beantwortet (${Math.round(S.stats.autoKI/S.stats.heute*100)} %)</div></div>
        <div class="kpi amber"><div class="n">${S.items.filter(i=>i.status==='freigabe').length}</div><div class="l">Warten auf Freigabe</div></div>
        <div class="kpi red"><div class="n">${S.items.filter(i=>i.status==='mensch').length}</div><div class="l">An Mensch eskaliert</div></div>
        <div class="kpi green"><div class="n">${S.stats.zeit}</div><div class="l">Ø Antwortzeit (KI)</div></div>
      </div>
      <div class="split">
        <div class="panel ilist">
          ${items.map(it=>`<button type="button" class="irow ${it.id===state.supSel?'on':''}" data-action="crm-sup-sel" data-id="${it.id}" aria-pressed="${it.id===state.supSel}">
            <div style="display:flex;justify-content:space-between;gap:8px"><b>${chIco(it.ch)} ${it.who}</b><small class="muted">${it.time}</small></div>
            <small class="muted">${it.topic}</small>
            <div style="margin-top:5px">${stBadge(it.status)}</div>
          </button>`).join('') || '<p class="muted" style="padding:10px">Keine Einträge für diesen Filter.</p>'}
        </div>
        ${cur ? `<div class="panel">
          <div class="panel-h"><b>${chIco(cur.ch)} ${cur.who} · ${cur.topic}</b>
            <div style="display:flex;gap:8px;align-items:center">${cur.who.includes('Nicole')?'<a class="btn btn-dark btn-sm" href="#/crm/kunde/A">👤 Kunden-360</a>':''}${stBadge(cur.status)}</div></div>
          ${cur.ch==='whatsapp'?'<div style="margin-bottom:8px"><span class="badge b-green" style="text-transform:none">🟢 WhatsApp Business · 24h-Fenster aktiv</span></div>':'<div style="margin-bottom:8px"><span class="badge b-gray" style="text-transform:none">☎️ Telefon · KI-Assistent / Transkript</span></div>'}
          ${cur.msgs.map(([dir,txt])=>`<div class="bubble ${dir==='out'?'me':''}" style="max-width:88%">${txt}</div>`).join('')}
          ${cur.ai ? `<div style="font-size:12px;color:var(--muted);margin:10px 0 4px;text-transform:uppercase;letter-spacing:1px">${cur.status==='auto'?'KI-Antwort (automatisch gesendet)':cur.status==='mensch'?'KI-Einordnung':'KI-Antwortentwurf'}</div>
          <div class="aibox" style="${cur.status==='mensch'?'border-left-color:var(--amber)':''}">${cur.ai}</div>` : ''}
          ${cur.status==='freigabe' ? `<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
            <button class="btn btn-primary btn-sm" data-action="crm-sup-approve" data-id="${cur.id}">Bestätigen & Senden</button>
            <button class="btn btn-dark btn-sm" data-action="crm-toast" data-msg="Bearbeiten (Demo)">Bearbeiten</button>
            <button class="btn btn-dark btn-sm" data-action="crm-toast" data-msg="Eskaliert (Demo)">An Mensch eskalieren</button></div>`
          : cur.status==='mensch' ? `<div style="display:flex;gap:8px;margin-top:12px">
            <button class="btn btn-primary btn-sm" data-action="crm-sup-done" data-id="${cur.id}">Rückruf erledigt ✓</button>
            <a class="btn btn-dark btn-sm" href="#/crm/aufgaben">Zur Aufgabe</a></div>` : ''}
          <p class="muted" style="font-size:12px;margin:12px 0 0">${cur.note}</p>
        </div>` : '<div class="panel"><p class="muted">Kein Eintrag ausgewählt.</p></div>'}
      </div>
      <div class="notice">Spielregeln: Die KI beantwortet <b>nur</b> FAQ-Kategorien automatisch (Öffnungszeiten, Preise, Was-mitbringen, Terminbestätigung). Zahlungen, Kündigungen, Beschwerden und alles rund um Kinder gehen <b>immer</b> an einen Menschen. Jede Antwort im Audit-Log · unbekannte Nummern werden automatisch Leads.</div>
    `,'#/crm/support');
  }

  /* ---------------- kunden-360 (rezeption) ---------------- */
  function kunde360(id){
    const isA = !id || id==='A';
    const name = isA ? 'Familie A.' : ((C().members.find(m=>m.fam===id)||{}).name || 'Kunde');
    const kids = isA ? D.kids : [];
    const pays = C().payments.filter(p=>p.who.includes('A.')||p.who.includes('Emir'));
    const msgs = D.messages.slice(0,3);
    const openTasks = C().tasks.filter(t=>t.status!=='done').slice(0,3);
    return shell(`
      <a class="backlink" href="#/crm/mitglieder">← Mitglieder</a>
      <div class="panel-h" style="margin-bottom:14px;align-items:flex-end"><h1 class="crm-h" style="margin:0">📞 Kunden-360: ${name}</h1>
        <span class="muted" style="font-size:13px">Ein Bildschirm für jede Interaktion — Anruf, WhatsApp, Theke</span></div>
      <div class="split" style="grid-template-columns:1fr 1fr 1fr">
        <div class="panel"><div class="panel-h"><b>Familie & Verträge</b></div>
          <div class="list-item"><span class="li-ico">👩</span><div class="li-main"><b>Nicole A.</b><small>Hauptkontakt · App + E-Mail</small></div></div>
          ${kids.map(k=>`<div class="list-item"><span class="li-ico">🥋</span><div class="li-main"><b>${k.name}, ${k.age} · ${k.belt}</b><small>${k.program} · ${k.freq}${k.buddy?' · Buddy: '+k.buddy:''}</small></div><span class="badge b-green">aktiv</span></div>`).join('')}
          <div class="list-item"><span class="li-ico">🏦</span><div class="li-main"><b>SEPA aktiv</b><small>nächste Abbuchung 01.08.</small></div></div>
        </div>
        <div class="panel"><div class="panel-h"><b>Zahlungen</b><a href="#/crm/zahlungen" style="color:var(--red);font-size:12px;font-weight:600">alle →</a></div>
          ${pays.slice(0,3).map(p=>{const pb=payBadge(p.status);return `<div class="list-item"><div class="li-main"><b>${p.who}</b><small>${p.amount}</small></div><span class="badge ${pb[0]}">${pb[1]}</span></div>`;}).join('')||'<p class="muted" style="font-size:13px">Keine offenen Posten.</p>'}
          <div class="panel-h" style="margin-top:12px"><b>Letzte Nachrichten</b></div>
          ${msgs.map(m=>`<div class="list-item"><span class="li-ico">${m.ico}</span><div class="li-main"><b>${m.title}</b><small>${m.time}</small></div></div>`).join('')}
        </div>
        <div class="panel"><div class="panel-h"><b>Offene Aufgaben</b><a href="#/crm/aufgaben" style="color:var(--red);font-size:12px;font-weight:600">Board →</a></div>
          ${openTasks.map(t=>`<div class="list-item"><span class="li-ico">${t.late?'🔴':'📋'}</span><div class="li-main"><b>${t.t}</b><small>${t.src} · ${t.sla}</small></div></div>`).join('')}
          <div class="panel-h" style="margin-top:12px"><b>Quick-Actions</b></div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <button class="btn btn-dark btn-sm" style="justify-content:flex-start" data-action="crm-toast" data-msg="Nachricht-Entwurf geöffnet (Demo)">✉️ Nachricht senden</button>
            <button class="btn btn-dark btn-sm" style="justify-content:flex-start" data-action="crm-toast" data-msg="Zahlungslink gesendet (Demo)">💶 Zahlungslink senden</button>
            <button class="btn btn-dark btn-sm" style="justify-content:flex-start" data-action="crm-toast" data-msg="Pausierung eingerichtet (Demo)">⏸️ Vertrag pausieren</button>
            <button class="btn btn-dark btn-sm" style="justify-content:flex-start" data-action="crm-toast" data-msg="Bescheinigung erstellt (Demo)">📄 Bescheinigung erstellen</button>
          </div>
        </div>
      </div>
      <div class="notice">Ziel: Ø Bearbeitungszeit pro Kundenkontakt < 2 Minuten — alles auf einem Bildschirm statt auf 4 CRM-Seiten.</div>
    `,'#/crm/mitglieder');
  }

  /* ---------------- aufgaben-board mit SLA ---------------- */
  function aufgaben(){
    const cols = [['offen','Offen'],['in','In Arbeit'],['done','Erledigt']];
    const next = {offen:'in', in:'done', done:'offen'};
    return shell(`
      <h1 class="crm-h">Aufgaben</h1>
      <div class="crm-sub">Alles Nicht-Automatisierbare landet hier — mit SLA, Quelle und Schichtübergabe. Klick auf eine Karte = weiterschieben.</div>
      <div class="kanban">${cols.map(([key,label])=>{
        const items = C().tasks.filter(t=>t.status===key);
        return `<div class="kcol" style="flex:1 1 240px"><div class="kh"><span>${label}</span><span>${items.length}</span></div>
          ${items.map(t=>`<button type="button" class="kcard" style="width:100%;text-align:left;${t.late&&t.status!=='done'?'border-color:rgba(228,0,43,.5)':''}" data-action="crm-task" data-id="${t.id}" data-next="${next[key]}">
            <b>${t.t}</b><small>${t.src}</small>
            <div style="margin-top:6px"><span class="badge ${t.status==='done'?'b-green':t.late?'b-red':'b-gray'}" style="text-transform:none;letter-spacing:0">${t.sla}</span></div>
          </button>`).join('')||'<div class="muted" style="font-size:12px;padding:6px">—</div>'}</div>`;
      }).join('')}</div>
      <div class="notice">Quellen füttern das Board automatisch: Detraktor-Alarm, Mahnstufe 4, verpasste Anrufe, Chip-Verlust … SLA-Verstöße erscheinen im Morgen-Briefing.</div>
    `,'#/crm/aufgaben');
  }

  /* ---------------- arbeitszeiterfassung (P0 Compliance) ---------------- */
  function zeiten(){
    return shell(`
      <h1 class="crm-h">Arbeitszeiten</h1>
      <div class="crm-sub">Gesetzeskonforme Zeiterfassung (BAG 1 ABR 22/21) — aus dem Kursplan vorbefüllt, Mitarbeiter stempeln nur.</div>
      <div class="panel"><div class="panel-h"><b>Heute · NFT ${state.standort==='Alle Standorte'?'Krefeld':state.standort}</b><span class="badge b-green">● live</span></div>
        <table class="tbl"><thead><tr><th>Mitarbeiter</th><th>Plan (aus Kursplan)</th><th>Kommen</th><th>Gehen</th><th>Woche</th><th></th></tr></thead><tbody>
          ${C().zeiten.map((z,i)=>`<tr><td><b>${z.name}</b></td><td>${z.plan}</td>
            <td>${z.in!=='–'?`<span class="badge b-green">${z.in}</span>`:'<span class="muted">–</span>'}</td>
            <td>${z.out!=='–'?`<span class="badge b-gray">${z.out}</span>`:'<span class="muted">–</span>'}</td>
            <td>${z.week}</td>
            <td><button class="btn btn-dark btn-sm" data-action="crm-stamp-row" data-i="${i}">${z.in==='–'?'Einstempeln':z.out==='–'?'Ausstempeln':'✓'}</button></td></tr>`).join('')}
        </tbody></table>
      </div>
      <div class="notice">⚖️ <b>Pflicht-Baustein für V1:</b> Arbeitszeiterfassung ist in Deutschland gesetzlich verpflichtend. Hier: Stempel-Demo; real: Chip/App-Stempel + Export für Lohnbuchhaltung + Überstunden-Warnung.</div>
    `,'#/crm/zeiten');
  }

  /* ---------------- decisions inbox (GF) ---------------- */
  function entscheidungen(){
    const items = C().decisions;
    const open = items.filter(d=>d.status==='offen').length;
    return shell(`
      <h1 class="crm-h">Entscheidungs-Inbox</h1>
      <div class="crm-sub">Nur was wirklich GF-Freigabe braucht — alles andere erledigen die Standorte selbst. Jede Entscheidung im Audit-Trail.</div>
      <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr)">
        <div class="kpi amber"><div class="n">${open}</div><div class="l">Warten auf Freigabe</div></div>
        <div class="kpi green"><div class="n">${items.filter(d=>d.status==='freigegeben').length}</div><div class="l">Diese Woche freigegeben</div></div>
        <div class="kpi"><div class="n">${items.filter(d=>d.status==='abgelehnt').length}</div><div class="l">Abgelehnt</div></div>
      </div>
      ${items.map(d=>{ const done=d.status!=='offen';
        return `<div class="panel" style="${done?'opacity:.6':''}">
        <div class="panel-h" style="margin-bottom:8px">
          <div><span style="font-size:20px;margin-right:8px">${d.ico}</span><b style="font-size:17px">${d.title}</b></div>
          <span class="badge ${d.status==='offen'?'b-amber':d.status==='freigegeben'?'b-green':'b-red'}">${d.status}</span></div>
        <p class="dim" style="margin:0 0 6px">${d.detail}</p>
        <small class="muted">Angefragt von: ${d.from}</small>
        ${done?'':`<div style="display:flex;gap:8px;margin-top:12px">
          <button class="btn btn-primary btn-sm" data-action="crm-decide" data-id="${d.id}" data-v="freigegeben">✓ Freigeben</button>
          <button class="btn btn-danger btn-sm" data-action="crm-decide" data-id="${d.id}" data-v="abgelehnt">Ablehnen</button>
          <button class="btn btn-dark btn-sm" data-action="crm-toast" data-msg="Rückfrage gesendet (Demo)">Rückfrage</button></div>`}
      </div>`; }).join('')}
      <div class="notice">Freigabe-Regeln (Demo): Kulanz > 100 €, Preis-/Tarifänderungen und Personal-Budget landen automatisch hier — mit vollständigem Audit-Trail (wer, wann, was).</div>
    `,'#/crm/entscheidungen');
  }

  /* ---------------- launch cockpit (Standort-Eröffnung) ---------------- */
  function launchCockpit(){
    const L = C().launch;
    const all = L.phases.flatMap(p=>p.items), doneN = all.filter(i=>i.done).length;
    const pct = Math.round(doneN/all.length*100);
    const pmPct = Math.round(L.presale.members/L.presale.goal*100);
    return shell(`
      <h1 class="crm-h">Launch-Cockpit · Standort Nr. ${L.nr}: ${L.city}</h1>
      <div class="crm-sub">Eröffnung ${L.open} · standardisiertes Eröffnungs-Playbook — kein Standort startet mehr bei null</div>
      <div class="kpi-grid">
        <div class="kpi"><div class="n">${pct}%</div><div class="l">Playbook-Fortschritt (${doneN}/${all.length})</div></div>
        <div class="kpi green"><div class="n">${L.presale.members}</div><div class="l">Gründungsmitglieder (Ziel ${L.presale.goal})</div></div>
        <div class="kpi"><div class="n">${L.presale.leads}</div><div class="l">Pre-Sale-Leads</div></div>
        <div class="kpi amber"><div class="n">89</div><div class="l">Tage bis Eröffnung</div></div>
      </div>
      <div class="panel"><div class="panel-h"><b>Pre-Sale-Ziel</b><span class="muted" style="font-size:13px">Eröffnen mit ${L.presale.goal} statt 0 Mitgliedern</span></div>
        <div class="bar" style="height:14px"><span style="width:${pmPct}%"></span></div>
        <p class="muted" style="font-size:13px;margin:8px 0 0">${L.presale.members} von ${L.presale.goal} Gründungsverträgen — Landingpage + Gründungsrabatt laufen über die normale Lead-Pipeline.</p></div>
      <div class="grid g-2" style="margin-bottom:16px">
        ${L.phases.map(p=>{ const d=p.items.filter(i=>i.done).length;
          return `<div class="panel" style="margin-bottom:0"><div class="panel-h"><b>${p.name}</b><span class="badge ${d===p.items.length?'b-green':'b-amber'}">${d}/${p.items.length}</span></div>
          ${p.items.map(i=>`<div class="list-item"><span class="li-ico">${i.done?'✅':'⬜'}</span><div class="li-main"><b style="${i.done?'':'color:var(--text-dim)'}">${i.t}</b></div></div>`).join('')}
        </div>`; }).join('')}
      </div>
      <div class="notice">💡 So skaliert 10 → 50: Ein Klick klont Mandant + Konfiguration, das Playbook führt durch jede Phase, der Pre-Sale-Funnel füllt den Standort vor der Eröffnung. Effekt pro Eröffnung: 15–25k €.</div>
    `,'#/crm/launch');
  }

  /* ---------------- contract wizard ---------------- */
  function vertragWizard(){
    const st = state.vw, steps = ["Kunde","Standort","Tarif","Laufzeit","SEPA","Senden"];
    const stepper = `<div class="stepper">${steps.map((_,i)=>`<div class="st ${i<st.step?'done':''} ${i===st.step?'cur':''}"></div>`).join('')}</div>`;
    const chip = (k,v)=>`<button type="button" class="chip ${st[k]===v?'sel':''}" data-action="crm-vw-set" data-k="${k}" data-v="${v}">${v}</button>`;
    let inner='';
    if(st.step===0) inner=`<label class="vwl">Kunde / Familie</label><div class="choices">${['Familie A. (Emir, Sara)','Marco S.','Neuer Kunde…'].map(x=>chip('kunde',x)).join('')}</div>`;
    else if(st.step===1) inner=`<label class="vwl">Standort</label><div class="choices">${D.locations.slice(0,6).map(l=>chip('standort',l.city)).join('')}</div>`;
    else if(st.step===2) inner=`<label class="vwl">Tarif</label><div class="choices">${['Kids Standard · 49 €','Kids Premium · 89 €','Erwachsene Unlimited · 99 €','Family · 149 €'].map(x=>chip('tarif',x)).join('')}</div><p class="muted" style="font-size:12px;margin-top:10px">Familienrabatt wird automatisch berücksichtigt.</p>`;
    else if(st.step===3) inner=`<label class="vwl">Laufzeit</label><div class="choices">${['12 Monate','24 Monate'].map(x=>chip('laufzeit',x)).join('')}</div><p class="muted" style="font-size:12px;margin-top:10px">Max. 24 Monate Erstlaufzeit; danach monatlich kündbar (§ 309 BGB).</p>`;
    else if(st.step===4) inner=`<label class="vwl">SEPA-Lastschriftmandat</label>
      <div class="field"><label>Kontoinhaber</label><input placeholder="Vor- und Nachname"></div>
      <div class="field"><label>IBAN</label><input placeholder="DE.. .... .... .... .... .."></div>
      <div style="display:flex;align-items:center;gap:12px;margin-top:6px"><button type="button" role="switch" aria-checked="${st.sepa}" class="switch ${st.sepa?'on':''}" data-action="crm-vw-sepa"><span class="track"></span></button>
        <span class="muted" style="font-size:13px">Ich ermächtige NFT Gym, Zahlungen per SEPA-Lastschrift einzuziehen (inkl. Vorabankündigung).</span></div>`;
    else inner=`<div class="aibox" style="border-left-color:var(--green)">Kunde:      ${st.kunde||'—'}\nStandort:   ${st.standort||'—'}\nTarif:      ${st.tarif||'—'}\nLaufzeit:   ${st.laufzeit||'—'}\nSEPA-Mandat: ${st.sepa?'erteilt ✓':'offen'}</div>
      <p class="muted" style="font-size:12px;margin-top:10px">Der Kunde erhält den Vertrag digital zur Unterschrift — inkl. Widerrufsbelehrung (14 Tage) und Kündigungsbutton.</p>`;
    const canNext = [st.kunde,st.standort,st.tarif,st.laufzeit,st.sepa,true][st.step];
    return shell(`
      <a class="backlink" href="#/crm/vertraege">← Verträge</a>
      <h1 class="crm-h">Neuer Vertrag</h1>
      <div class="panel" style="max-width:640px">
        ${stepper}
        <div style="min-height:160px">${inner}</div>
        <div style="display:flex;gap:10px;margin-top:20px">
          ${st.step>0?`<button class="btn btn-dark" data-action="crm-vw-back">Zurück</button>`:''}
          ${st.step<5?`<button class="btn btn-primary btn-block" data-action="crm-vw-next" ${canNext?'':'disabled style="opacity:.4;cursor:not-allowed"'}>Weiter</button>`
                     :`<button class="btn btn-primary btn-block" data-action="crm-vw-finish">Vertrag digital senden</button>`}
        </div>
      </div>
      <style>.vwl{display:block;font-weight:600;color:var(--muted);margin-bottom:12px;text-transform:uppercase;letter-spacing:1px;font-size:13px}</style>
    `,'#/crm/vertraege');
  }

  /* ---------------- kiosk self-check-in ---------------- */
  function kiosk(){
    const last = state.kioskLast;
    const people = ["Emir A.","Sara A.","Marco S.","Lena K.","Jonas P.","Nora B."];
    return shell(`
      <h1 class="crm-h">Kiosk · Self-Check-in</h1>
      <div class="crm-sub">Tablet am Eingang · Chip, QR oder Name antippen</div>
      ${last?`<div class="panel" style="border-color:var(--green);text-align:center;padding:28px">
        <div style="font-size:48px">✅</div><h2 style="color:var(--green)">Willkommen, ${last}!</h2>
        <p class="muted">Eingecheckt · viel Spaß beim Training 🥊 — deine Eltern wurden benachrichtigt.</p></div>`:''}
      <div class="panel"><div class="panel-h"><b>Wer trainiert?</b><span class="badge b-green">● Chip / QR bereit</span></div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
          ${people.map(p=>`<button class="rolebtn" data-action="crm-kiosk" data-p="${p}" style="text-align:center"><div class="ri">🥋</div><b style="display:block;margin-top:6px">${p}</b></button>`).join('')}
        </div>
        <p class="muted" style="font-size:12px;margin-top:14px">Demo: Antippen simuliert den Chip-Scan. Real: RFID/NFC am Drehkreuz, Echtzeit-Prüfung von Mitgliedschaft & Zahlung.</p>
      </div>
      <div class="panel" style="text-align:center">
        ${state.kioskSmiley
          ? `<div style="font-size:56px">${state.kioskSmiley}</div><h2 style="color:var(--green);margin:8px 0 4px">Danke!</h2><p class="muted">Dein Feedback hilft uns, besser zu werden.</p>`
          : `<div class="panel-h" style="justify-content:center"><b>Wie war dein Training heute?</b></div>
             <div style="display:flex;gap:14px;justify-content:center;margin-top:6px">
               ${['😞','😐','🙂','🤩'].map((s,i)=>`<button type="button" class="rolebtn" data-action="crm-kiosk-smiley" data-s="${s}" aria-label="Bewertung ${i+1} von 4" style="font-size:44px;text-align:center;padding:18px 26px">${s}</button>`).join('')}
             </div>
             <p class="muted" style="font-size:12px;margin-top:14px">Anonym · auch für Kinder · zählt pro Kurs/Uhrzeit in die Stimmungs-Heatmap</p>`}
      </div>
    `,'#/crm/kiosk');
  }

  /* ---------------- automations / journeys ---------------- */
  function automationen(){
    const rows = C().journeys.map((j,i)=>`<div class="panel" style="display:flex;gap:14px;align-items:center;margin-bottom:10px">
      <div style="flex:1"><b style="font-family:var(--ff-head);text-transform:uppercase;font-size:16px">${j.name}</b>
        <div class="muted" style="font-size:13px;margin-top:4px"><b style="color:var(--text-dim)">Trigger:</b> ${j.trigger} → ${j.action}</div>
        <div class="muted" style="font-size:12px;margin-top:2px">Kanal: ${j.channel}</div></div>
      <div style="text-align:right"><span class="badge ${j.on?'b-green':'b-gray'}">${j.on?'aktiv':'aus'}</span><br>
        <button type="button" role="switch" aria-checked="${j.on}" class="switch ${j.on?'on':''}" data-action="crm-journey" data-i="${i}" style="margin-top:8px"><span class="track"></span></button></div>
    </div>`).join('');
    return shell(`
      <h1 class="crm-h">Automationen</h1>
      <div class="crm-sub">Ereignisbasierte Journeys · ein Workflow, eine Zielgruppe, messen, dann ausrollen</div>
      <div class="panel" style="border-color:var(--amber)"><div class="panel-h"><b>🏖️ Saison-/Ferien-Engine</b><span class="badge b-green">aktiv</span></div>
        ${C().ferien.map(f=>`<div class="list-item"><span class="li-ico">📅</span><div class="li-main"><b>${f.land}: ${f.zeit}</b><small>startet in ${f.inTagen} Tagen</small></div></div>`).join('')}
        <p class="muted" style="font-size:13px;margin:10px 0 0">Während der Ferien: Churn-Scores gedämpft · „Wir vermissen dich"-Journeys pausiert · Camp-Cross-Sell 4 Wochen vorher · „Willkommen zurück"-Slot-Vorschlag danach.</p></div>
      ${rows}
      <div class="notice">Sensible Kommunikation (Mahnstufen, Kündigung) wird immer an einen Mitarbeiter eskaliert — nie automatisch versendet. Werbliche Journeys nur mit Double-Opt-In.</div>
    `,'#/crm/automationen');
  }

  /* ---------------- roles & permissions ---------------- */
  function rollen(){
    const perm = C().permissions, mods = perm.modules, roles = Object.keys(perm.roles);
    const head = `<tr><th>Modul</th>${roles.map(r=>`<th style="text-align:center">${r.split(' ')[0]}</th>`).join('')}</tr>`;
    const rows = mods.map((m,i)=>`<tr><td><b>${m}</b></td>${roles.map(r=>`<td style="text-align:center">${perm.roles[r][i]?'<span style="color:var(--green)">✓</span>':'<span class="muted">–</span>'}</td>`).join('')}</tr>`).join('');
    return shell(`
      <h1 class="crm-h">Rollen & Rechte</h1>
      <div class="crm-sub">Wer sieht was — die Sidebar-Navigation passt sich der Rolle automatisch an</div>
      <div class="panel"><div class="panel-h"><b>Rolle testen</b></div>
        <div class="choices">${roles.map(r=>`<button type="button" class="chip ${state.role===r?'sel':''}" data-action="crm-role-test" data-r="${r}">${r}</button>`).join('')}</div>
        <p class="muted" style="font-size:13px;margin-top:10px">Wechsle die Rolle und beobachte, wie sich die Navigation links verändert. (Trainer landet in der Trainer-Ansicht.)</p></div>
      <div class="panel"><div class="panel-h"><b>Rechte-Matrix</b></div>
        <table class="tbl"><thead>${head}</thead><tbody>${rows}</tbody></table></div>
    `,'#/crm/rollen');
  }

  /* ---------------- search ---------------- */
  function suche(){
    return shell(`
      <h1 class="crm-h">Suche</h1>
      <div class="crm-sub">Mitglieder, Leads und Kurse durchsuchen</div>
      <div class="panel">
        <input data-action="crm-search-input" placeholder="Name, Interesse, Kurs, Trainer…" style="width:100%;background:var(--surface-2);border:1px solid var(--line);color:var(--text);padding:13px 15px;border-radius:10px;font-size:15px">
        <div id="searchResults" style="margin-top:14px"><p class="muted">Tippe, um zu suchen…</p></div>
      </div>
    `,'');
  }

  /* ---------------- router (mit Rollen-Guard) ---------------- */
  const ROUTE_MOD = { dashboard:'Dashboard', leads:'Leads', mitglieder:'Mitglieder', familie:'Mitglieder',
    retention:'Mitglieder', upsell:'Mitglieder', kurse:'Kurse', auslastung:'Auslastung', checkins:'Check-ins',
    kiosk:'Check-ins', kommunikation:'Kommunikation', feedback:'Kommunikation', vertraege:'Vertr\u00e4ge', team:'Vertr\u00e4ge',
    zahlungen:'Zahlungen', automationen:'Automationen', reports:'Reports', rollen:'Rollen/Rechte',
    entscheidungen:'Reports', launch:'Reports', kunde:'Mitglieder', aufgaben:'Kommunikation', zeiten:'Verträge',
    support:'Kommunikation' };
  function noAccess(mod){
    return shell(`
      <div class="panel center" style="max-width:520px;margin:40px auto;padding:40px">
        <div style="font-size:44px">\ud83d\udd12</div>
        <h1 class="crm-h" style="font-size:26px">Kein Zugriff</h1>
        <p class="muted">Die Rolle <b style="color:#fff">${state.role}</b> hat keine Berechtigung f\u00fcr \u201e${mod}\u201c.</p>
        <a class="btn btn-primary" href="#/crm" style="margin-top:12px">Rolle wechseln</a>
      </div>`,'');
  }
  function route(seg){
    if(seg[0]==='trainer') return trainerRoute(seg);
    const r = seg[1];
    if(!r) return login();
    const mod = ROUTE_MOD[r];
    if(mod){ const perm=D.crm.permissions, i=perm.modules.indexOf(mod), allow=perm.roles[state.role]||[];
      if(i>=0 && allow[i]!==1) return noAccess(mod); }
    if(r==='dashboard') return dashboard();
    if(r==='leads') return seg[2] ? leadDetail(seg[2]) : leads();
    if(r==='mitglieder') return members();
    if(r==='familie') return family(seg[2]);
    if(r==='kurse') return seg[2] ? courseDetail(seg[2]) : courses();
    if(r==='auslastung') return auslastung();
    if(r==='checkins') return checkins();
    if(r==='kommunikation') return kommunikation();
    if(r==='vertraege') return seg[2]==='neu' ? vertragWizard() : contracts();
    if(r==='zahlungen') return payments();
    if(r==='reports') return reports();
    if(r==='kiosk') return kiosk();
    if(r==='retention') return retention();
    if(r==='upsell') return upsell();
    if(r==='team') return team();
    if(r==='feedback') return feedbackDash();
    if(r==='entscheidungen') return entscheidungen();
    if(r==='launch') return launchCockpit();
    if(r==='kunde') return kunde360(seg[2]);
    if(r==='support') return supportCenter();
    if(r==='aufgaben') return aufgaben();
    if(r==='zeiten') return zeiten();
    if(r==='automationen') return automationen();
    if(r==='rollen') return rollen();
    if(r==='suche') return suche();
    return dashboard();
  }

  window.CRM = { route };

  /* ---------------- CRM interactions ---------------- */
  document.addEventListener('click', e=>{
    const el = e.target.closest('[data-action]'); if(!el) return;
    const a = el.dataset.action;
    if(a==='crm-role'){ state.role = el.dataset.r; location.hash = (el.dataset.r==='Trainer') ? '#/trainer' : '#/crm/dashboard'; return; }
    if(a==='crm-leadview'){ state.leadView = el.dataset.v; window.__render && window.__render(); return; }
    if(a==='crm-inbox'){ state.inboxSel = +el.dataset.i; window.__render && window.__render(); return; }
    if(a==='crm-menu'){ state.sideOpen = !state.sideOpen; window.__render && window.__render(); return; }
    if(a==='crm-toast'){ (window.__toast || alert)(el.dataset.msg||'Demo'); return; }
    if(a==='crm-lead-next'){ const l=C().leads.find(x=>x.id===el.dataset.id); if(l){ const i=C().pipeline.indexOf(l.stage); l.stage=C().pipeline[Math.min(C().pipeline.length-1,(i<0?0:i)+1)]; (window.__toast||alert)('Gesendet ✓ — '+l.name+' → '+l.stage); } location.hash='#/crm/leads'; return; }
    if(a==='crm-lead-stage'){ const l=C().leads.find(x=>x.id===el.dataset.id); if(l){ l.stage=el.dataset.stage; (window.__toast||alert)(l.name+' → '+l.stage); } location.hash='#/crm/leads'; return; }
    if(a==='crm-lead-lost'){ const id=el.dataset.id; const key='lost:'+id;
      if(state.arm!==key){ state.arm=key; window.__render && window.__render(); return; }
      state.arm=null;
      const l=C().leads.find(x=>x.id===id);
      if(l){ const prev=l.stage; l.stage='Verloren';
        (window.__toast||alert)(l.name+' verworfen', ()=>{ l.stage=prev; window.__render && window.__render(); }); }
      location.hash='#/crm/leads'; return; }
    if(a==='crm-pay-paid'){ const who=el.dataset.who; const key='pay:'+who;
      if(state.arm!==key){ state.arm=key; window.__render && window.__render(); return; }
      state.arm=null;
      const p=C().payments.find(x=>x.who===who);
      if(p && p.status!=='bezahlt'){ const prev=p.status;
        if(prev==='rueck')C().paysummary.rueck--; if(prev==='offen')C().paysummary.offen--; C().paysummary.ok++; p.status='bezahlt';
        (window.__toast||alert)('✓ '+who+' als bezahlt markiert', ()=>{ p.status=prev; if(prev==='rueck')C().paysummary.rueck++; if(prev==='offen')C().paysummary.offen++; C().paysummary.ok--; window.__render && window.__render(); });
      } window.__render && window.__render(); return; }
    if(a==='crm-trainer-att'){ const n=el.dataset.name; const cyc={'✅':'❌','❌':'⏳','⏳':'✅'}; state.trainerAtt[n]=cyc[state.trainerAtt[n]]||'✅'; window.__render && window.__render(); return; }
    if(a==='crm-skill'){ const s=el.dataset.s; const i=state.trainerSkills.indexOf(s); if(i>=0)state.trainerSkills.splice(i,1); else state.trainerSkills.push(s); window.__render && window.__render(); return; }
    if(a==='crm-cf'){ state.courseFilter=el.dataset.v; window.__render && window.__render(); return; }
    if(a==='crm-journey'){ const j=C().journeys[+el.dataset.i]; if(j) j.on=!j.on; window.__render && window.__render(); return; }
    if(a==='crm-role-test'){ state.role=el.dataset.r; if(el.dataset.r==='Trainer'){ location.hash='#/trainer'; } else { window.__render && window.__render(); } return; }
    if(a==='crm-kiosk'){ state.kioskLast=el.dataset.p; (window.__toast||alert)(el.dataset.p+' eingecheckt ✓'); window.__render && window.__render(); return; }
    if(a==='crm-vw-set'){ state.vw[el.dataset.k]=el.dataset.v; window.__render && window.__render(); return; }
    if(a==='crm-vw-sepa'){ state.vw.sepa=!state.vw.sepa; window.__render && window.__render(); return; }
    if(a==='crm-vw-next'){ state.vw.step=Math.min(5,state.vw.step+1); window.__render && window.__render(); return; }
    if(a==='crm-vw-back'){ state.vw.step=Math.max(0,state.vw.step-1); window.__render && window.__render(); return; }
    if(a==='crm-vw-finish'){ state.vw={step:0,kunde:null,standort:null,tarif:null,laufzeit:null,sepa:false}; (window.__toast||alert)('Vertrag digital versendet ✓ (Demo)'); location.hash='#/crm/vertraege'; return; }
    if(a==='crm-msg-answer'){ const m=C().inbox[+el.dataset.i]; if(m) m.status='Beantwortet'; (window.__toast||alert)('Gesendet ✓ — als beantwortet markiert'); window.__render && window.__render(); return; }
    if(a==='crm-ret-send'){ const r=C().retention.find(x=>x.id===el.dataset.id); if(r) r.status='gesendet'; (window.__toast||alert)('Gesendet ✓ — Fall bearbeitet'); window.__render && window.__render(); return; }
    if(a==='crm-ret-task'){ const r=C().retention.find(x=>x.id===el.dataset.id); if(r) r.status='Aufgabe erstellt'; (window.__toast||alert)('Aufgabe erstellt ✓'); window.__render && window.__render(); return; }
    if(a==='crm-ret-later'){ const r=C().retention.find(x=>x.id===el.dataset.id); if(r) r.status='zurückgestellt'; (window.__toast||alert)('Zurückgestellt — Wiedervorlage morgen'); window.__render && window.__render(); return; }
    if(a==='crm-exam-toggle'){ const m=(state.exam[el.dataset.name]=state.exam[el.dataset.name]||{}); const i=+el.dataset.i; m[i]=!m[i]; window.__render && window.__render(); return; }
    if(a==='crm-exam-pass'){ state.examPassed=state.examPassed||{}; state.examPassed[el.dataset.name]=true;
      if(el.dataset.name==='Emir A.'){ const k=D.kids&&D.kids[0]; if(k) k.examPassed=true; }
      (window.__toast||alert)('🎉 '+el.dataset.name+' hat bestanden — Eltern-App aktualisiert'); window.__render && window.__render(); return; }
    if(a==='crm-wr-approve'){ const r=(D.weeklyReports||[])[+el.dataset.i]; if(r) r.status='freigegeben'; (window.__toast||alert)('Report an Eltern gesendet ✓'); window.__render && window.__render(); return; }
    if(a==='crm-wr-all'){ (D.weeklyReports||[]).forEach(r=>r.status='freigegeben'); (window.__toast||alert)('Alle Reports gesendet ✓'); window.__render && window.__render(); return; }
    if(a==='crm-up-send'){ const u=C().upsell.find(x=>x.id===el.dataset.id); if(u) u.status='gesendet'; (window.__toast||alert)('Angebot gesendet ✓ — liegt jetzt als Karte in der Kunden-App'); window.__render && window.__render(); return; }
    if(a==='crm-up-later'){ const u=C().upsell.find(x=>x.id===el.dataset.id); if(u) u.status='zurückgestellt'; (window.__toast||alert)('Zurückgestellt'); window.__render && window.__render(); return; }
    if(a==='crm-call-done'){ const c=C().calls.find(x=>x.id===el.dataset.id); if(c) c.status='erledigt'; (window.__toast||alert)('Rückruf erledigt ✓'); window.__render && window.__render(); return; }
    if(a==='crm-sup-filter'){ state.supFilter=el.dataset.v; window.__render && window.__render(); return; }
    if(a==='crm-sup-sel'){ state.supSel=el.dataset.id; window.__render && window.__render(); return; }
    if(a==='crm-sup-approve'){ const it=C().support.items.find(x=>x.id===el.dataset.id); if(it){ it.status='sent'; it.note='Von Mitarbeiter freigegeben & gesendet · im Audit-Log protokolliert'; } (window.__toast||alert)('Gesendet ✓ — Trainer-Info wurde automatisch erstellt'); window.__render && window.__render(); return; }
    if(a==='crm-sup-done'){ const it=C().support.items.find(x=>x.id===el.dataset.id); if(it){ it.status='sent'; it.note='Rückruf erledigt · Fall geschlossen · im Audit-Log protokolliert'; } (window.__toast||alert)('Rückruf erledigt ✓'); window.__render && window.__render(); return; }
    if(a==='crm-rebook'){ const l=C().leads.find(x=>x.noshow); if(l){ l.noshow=false; l.action='Neuer Termin: '+el.dataset.slot; } (window.__toast||alert)('Neu gebucht ✓ — '+el.dataset.slot+' bestätigt, Reminder-Journey neu gestartet'); window.__render && window.__render(); return; }
    if(a==='crm-buddy'){ if(D.kids&&D.kids[0]) D.kids[0].buddy=el.dataset.n; (window.__toast||alert)('Buddy zugewiesen ✓ — Eltern-App aktualisiert'); window.__render && window.__render(); return; }
    if(a==='crm-vertretung'){ if(C().vertretung){ C().vertretung.status='bestätigt'; } (window.__toast||alert)('Vertretung übernommen ✓ — Eltern werden automatisch informiert'); window.__render && window.__render(); return; }
    if(a==='crm-stamp'){ const z=C().zeiten.find(x=>x.name.startsWith('Mehmet')); if(z){ if(z.in==='–'){ z.in='15:28'; (window.__toast||alert)('Eingestempelt ✓ 15:28'); } else { z.out='20:32'; (window.__toast||alert)('Ausgestempelt ✓ 20:32'); } } window.__render && window.__render(); return; }
    if(a==='crm-stamp-row'){ const z=C().zeiten[+el.dataset.i]; if(z){ if(z.in==='–'){ z.in='jetzt'; } else if(z.out==='–'){ z.out='jetzt'; } (window.__toast||alert)('Stempel gesetzt ✓'); } window.__render && window.__render(); return; }
    if(a==='crm-task'){ const t=C().tasks.find(x=>x.id===el.dataset.id); if(t){ t.status=el.dataset.next; if(t.status==='done'){ t.sla='erledigt gerade eben'; t.late=false; } } window.__render && window.__render(); return; }
    if(a==='crm-decide'){ const d=C().decisions.find(x=>x.id===el.dataset.id); if(d){ d.status=el.dataset.v; (window.__toast||alert)((el.dataset.v==='freigegeben'?'✓ Freigegeben':'Abgelehnt')+' — im Audit-Trail protokolliert'); } window.__render && window.__render(); return; }
    if(a==='crm-kiosk-smiley'){ state.kioskSmiley=el.dataset.s; if(C().feedback) C().feedback.pulse.n++; window.__render && window.__render(); setTimeout(()=>{ state.kioskSmiley=null; window.__render && window.__render(); }, 2200); return; }
    if(a==='crm-fb-send'){ const d=C().feedback.detractors[+el.dataset.i]; if(d) d.status='beantwortet'; (window.__toast||alert)('Antwort gesendet ✓ — Fall im SLA erledigt'); window.__render && window.__render(); return; }
    if(a==='crm-fb-task'){ const d=C().feedback.detractors[+el.dataset.i]; if(d) d.status='Maßnahme erstellt'; (window.__toast||alert)('Maßnahme erstellt ✓ — Auslastung geöffnet'); return; }
    if(a==='crm-call-voice'){ C().leads.unshift({id:'L9',name:'Anruferin 16:42 (Sprachnotiz)',who:'Kind (6)',loc:'Krefeld',interest:'Mini-Kids',stage:'Neu',action:'KI-Mail senden'}); (window.__toast||alert)('🎤 Transkribiert ✓ — Lead-Karte angelegt (Mini-Kids, Krefeld)'); location.hash='#/crm/leads'; return; }
    if(a==='crm-trainer-save'){ const ta=document.getElementById('tfeedback'); const txt=ta?ta.value.trim():''; const k=D.kids&&D.kids[0]; if(k){ k.feedbackLog=k.feedbackLog||[]; k.feedbackLog.push({time:'gerade eben', skills:state.trainerSkills.slice(), text:txt}); } state.trainerSkills=[]; (window.__toast||alert)('Gespeichert ✓ — Eltern sehen das Update'); location.hash='#/trainer'; return; }
  });
  document.addEventListener('change', e=>{
    const el = e.target.closest('[data-action="crm-standort"]'); if(!el) return;
    state.standort = el.value; window.__render && window.__render();
  });
  document.addEventListener('input', e=>{
    const el = e.target.closest('[data-action="crm-search-input"]'); if(!el) return;
    const q = el.value.toLowerCase().trim(); const box = document.getElementById('searchResults'); if(!box) return;
    if(!q){ box.innerHTML = '<p class="muted">Tippe, um zu suchen…</p>'; return; }
    const res = [];
    C().leads.filter(l=>l.name.toLowerCase().includes(q)||l.interest.toLowerCase().includes(q)).forEach(l=>res.push(['🎯',l.name,l.interest+' · Lead','#/crm/leads/'+l.id]));
    C().members.filter(m=>m.name.toLowerCase().includes(q)).forEach(m=>res.push(['👥',m.name,m.loc+' · Mitglied','#/crm/mitglieder']));
    C().courses.filter(c=>c.name.toLowerCase().includes(q)||c.trainer.toLowerCase().includes(q)).forEach(c=>res.push(['📅',c.name,c.day+' '+c.time+' · '+c.trainer,'#/crm/kurse/'+c.id]));
    box.innerHTML = res.length ? res.map(([i,t,s,h])=>`<a class="list-item" href="${h}"><span class="li-ico">${i}</span><div class="li-main"><b>${t}</b><small>${s}</small></div><span class="muted">›</span></a>`).join('') : '<p class="muted">Keine Treffer.</p>';
  });
})();
