/* ob-m3ui.js — OB-M3UI (robot M3 life 1, 26/11): the four UI faults, each tested for its whole family with REAL touch taps.
   (1) option card: a tap on the odds meter (the card centre) CHOOSES the card; the «Thang cơ duyên» ladder never opens from a card;
       a ladder opened elsewhere closes on its kit ✕ / a tap outside / Esc / Back.
   (2) full-screen viewers (#kpzoom picture, #kpinfo «!» card): kit ✕ visible; ✕ tap, outside tap, Esc, Back each close; Back never leaves the page.
   (3) irreversible acts: a game option that names death runs at once (no «Kiếp này chưa trọn» re-ask, OD 24/11); «Kiếp mới» over a live sổ
       (old save) opens the ONE kit confirm (kitConfirm «Bỏ ngang kiếp này?»), «Thôi» keeps the life.
   (4) every visible «!» carries a name (aria-label or title on it or its button).
   usage: node dev/test/ob-m3ui.js <index.html> <old-save.json> [shotdir]   env SZ=[[W,H],..] VIDEO=dir   Exit 1 on a FAIL. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,SRC,SAVE,OUT]=process.argv;
const SZ=process.env.SZ?JSON.parse(process.env.SZ):[[755,1000],[1180,820]];
(async()=>{const px=process.env.HTTPS_PROXY;const br=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});const html=fs.readFileSync(SRC);const R=[];
 const save=SAVE?JSON.parse(fs.readFileSync(SAVE,'utf8')):null;
 const ok=(dev,c,res,pass)=>R.push({dev,case:c,res,FAIL:!pass});
 for(const [W,H] of SZ){const dev=W+'x'+H;
  const mk=async(init)=>{const ctx=await br.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',ignoreHTTPSErrors:true,
    recordVideo:process.env.VIDEO?{dir:process.env.VIDEO,size:{width:W,height:H}}:undefined});
   await ctx.addInitScript(()=>{window.__bot=1});if(init)await ctx.addInitScript(init.f,init.a);
   await ctx.route('http://ctm.test/index.html',r=>r.fulfill({status:200,body:html,contentType:'text/html; charset=utf-8'}));
   const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>{if(!/Unexpected token '<'/.test(String(e)))errs.push(String(e))});
   await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded',timeout:120000});
   await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&typeof pushDil==='function',null,{timeout:120000});return {ctx,p,errs}};
  const tapSel=async(p,sel)=>{const b=await p.evaluate(s=>{const e=[...document.querySelectorAll(s)].find(x=>x.getClientRects().length);if(!e)return null;const r=e.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}},sel);if(!b)return false;await p.touchscreen.tap(b.x,b.y);await p.waitForTimeout(500);return true};
  const vis=(p,id)=>p.evaluate(i=>{const z=document.getElementById(i);return !!z&&!z.hidden&&z.getClientRects().length>0},id);
  const shot=async(p,n)=>{if(OUT)await p.screenshot({path:`${OUT}/${dev}-${n}.png`})};
  /* ---------- A: a fresh life ---------- */
  {const {ctx,p,errs}=await mk();
   const fresh=async()=>{await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0});
   await p.waitForFunction(()=>!/Sửa soạn nhập cung/.test(document.body.innerText),null,{timeout:90000}).catch(()=>{});await p.waitForTimeout(2500);
   await p.addStyleTag({content:'#dawn,.kroul,.kmbox,.kne,[class*=kmrew],#kxcatch{display:none!important}'})};await fresh();
   /* Back that LEFT the game (the fault itself): record it, come back, start again */
   const back=async()=>{await p.goBack().catch(()=>{});await p.waitForTimeout(600);const left=!p.url().includes('ctm.test')||!(await p.evaluate(()=>typeof Q!=='undefined').catch(()=>false));
    if(left){await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function'&&typeof pushDil==='function',null,{timeout:120000});await fresh()}return left};
   let LEFT=false;
   const clear=()=>p.evaluate(()=>{try{while(Q.length){const n=Q.length;closeModal();if(Q.length>=n)break}}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;window.__fired=0;for(const i of ['kpop','kpinfo','kpzoom']){const z=document.getElementById(i);if(z)z.hidden=true}});
   /* (1) the meter on an option card chooses it — a plain event card and the robot's own «Kính sự phòng báo tin» */
   for(const [nm,fn] of [['plain-card',()=>{Q.push({ev:1,t:'Tin',who:pMe(),h:'<p>Một việc.</p>',opts:[{n:'Đứng ngoài, giữ mình',fx:{},x:'',go:()=>{window.__fired=1}},{n:'Nhận lỗi, cúi đầu',fx:{},x:'',go:()=>{}}]});showModal()}],
     ['ksp-card',()=>{const d=PEND.ksp();d.o.forEach(o=>{o.go=()=>{window.__fired=1}});pushDil(d,'Kính sự phòng báo tin');showModal()}]]){
    await clear();await p.waitForTimeout(200);const e=await p.evaluate(fn).then(()=>null,x=>String(x));if(e){ok(dev,'1 meter-tap '+nm,'n/a '+e,true);continue}
    await p.waitForTimeout(900);
    const t=await p.evaluate(()=>{const L=[...document.querySelectorAll('#modal:not([hidden]) .dlg button')].filter(x=>x.getClientRects().length&&!x.disabled&&x.querySelector('.kodm'));const b=L[0];const m=b&&b.querySelector('.kodm');if(!m)return null;m.scrollIntoView({block:'center'});const r=m.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}});
    if(!t){ok(dev,'1 meter-tap '+nm,'no meter on the card',false);continue}
    await p.touchscreen.tap(t.x,t.y);await p.waitForTimeout(900);
    const a=await p.evaluate(()=>({fired:!!window.__fired,pop:(()=>{const z=document.getElementById('kpop');return !!z&&!z.hidden})()}));
    ok(dev,'1 meter-tap '+nm,a.pop?'LEGEND OPENED':a.fired?'chose':'NO EFFECT',a.fired&&!a.pop)}
   /* (1b) the ladder opened from a HUD meter (not a card): ✕ / outside / Esc / Back */
   for(const how of ['x','outside','esc','back']){await clear();
    await p.evaluate(()=>{let b=document.getElementById('obtst');if(!b){b=document.createElement('button');b.id='obtst';b.textContent='T';b.style.cssText='position:fixed;left:40%;top:45%;z-index:9;width:40px;height:40px';document.body.appendChild(b)}b.onclick=()=>setTimeout(()=>kpPop(b,kitOddsLadder(3)),0)});
    await tapSel(p,'#obtst');const open=await vis(p,'kpop');const hasX=await p.evaluate(()=>!!document.querySelector('#kpop .kit-x'));if(how==='x')await shot(p,'1b-ladder');
    if(how==='x')await tapSel(p,'#kpop .kit-x');else if(how==='outside')await p.touchscreen.tap(8,H-120);else if(how==='esc')await p.keyboard.press('Escape');else{LEFT=await back()}
    await p.waitForTimeout(300);const still=how==='back'&&LEFT?false:await vis(p,'kpop');const url=LEFT&&how==='back'?'LEFT':p.url();
    LEFT=false;ok(dev,'1b ladder close by '+how,`open ${open} · ✕ ${hasX} · after: ${still?'STILL OPEN':'closed'}${how==='back'?' · page '+(url.includes('ctm.test')?'kept':'LEFT'):''}`,open&&hasX&&!still&&url.includes('ctm.test'))}
   await p.evaluate(()=>{const b=document.getElementById('obtst');if(b)b.remove()});
   /* (2) full-screen viewers: picture and «!» card */
   for(const v of ['kpzoom','kpinfo'])for(const how of ['x','outside','esc','back']){await clear();
    await p.evaluate(v=>{Q.push({ev:1,t:'Tin',who:pMe(),h:'<p>Một việc.</p>',opts:[{n:'Dâng lễ vật',fx:{},x:'thành: được ân',go:()=>{}},{n:'Nhận lỗi',fx:{},x:'',go:()=>{}}]});showModal();
     let b=document.getElementById('obtst');if(!b){b=document.createElement('button');b.id='obtst';b.textContent='T';b.style.cssText='position:fixed;left:40%;top:4px;z-index:200000;width:40px;height:40px';document.body.appendChild(b)}
     b.onclick=()=>setTimeout(()=>{if(v==='kpzoom')kitPicZoom('img/ev-le-xuan.webp');else kitOptInfo(document.querySelector('#modal .opts>button'))},0)},v);
    await p.waitForTimeout(700);await tapSel(p,'#obtst');await p.evaluate(()=>{const b=document.getElementById('obtst');if(b)b.remove()});await p.waitForTimeout(400);
    const open=await vis(p,v);const hasX=await p.evaluate(v=>{const x=document.querySelector('#'+v+' .kit-x');if(!x)return false;const r=x.getBoundingClientRect();return r.width>=24&&r.top>=0&&r.right<=innerWidth},v);if(how==='x')await shot(p,'2-'+v);
    if(how==='x')await tapSel(p,'#'+v+' .kit-x');else if(how==='outside')await p.touchscreen.tap(6,H/2);else if(how==='esc')await p.keyboard.press('Escape');else{LEFT=await back()}
    await p.waitForTimeout(300);const st=LEFT&&how==='back'?{still:false,dlg:false}:await await p.evaluate(v=>({still:(()=>{const z=document.getElementById(v);return !!z&&!z.hidden})(),dlg:!document.getElementById('modal').hidden}),v);const url=LEFT&&how==='back'?'LEFT':p.url();LEFT=false;
    ok(dev,`2 ${v} close by ${how}`,`open ${open} · ✕ ${hasX} · after: ${st.still?'STILL OPEN':'closed'} · dialog under it ${st.dlg?'kept':'gone'}${how==='back'?' · page '+(url.includes('ctm.test')?'kept':'LEFT'):''}`,open&&hasX&&!st.still&&url.includes('ctm.test'))}
   /* (2b) Back on a closable dialog closes it; Back on a FORCED event (no ✕) changes nothing and never leaves the page */
   await clear();await p.evaluate(()=>{kitModal({kind:'info',title:'Thử',sections:[{h:'',html:'<p>Đọc xong thì đóng.</p>'}],btn:'Đã rõ'})});await p.waitForTimeout(400);
   await p.evaluate(()=>{const b=document.createElement('button');b.id='obt2';b.style.cssText='position:fixed;left:0;top:0;width:2px;height:2px;z-index:999999';document.body.appendChild(b)});await tapSel(p,'#obt2');
   const lf=await back();const bk=!lf&&await p.evaluate(()=>document.getElementById('modal').hidden);ok(dev,'2b Back on an info dialog',lf?'LEFT THE GAME':bk?'closed':'STILL OPEN',bk&&!lf);
   /* (2c) RV-OB-M3UI: Back on the BARE room, on a FORCED event, and on a closable card opened by a timer long after the last tap — never leaves */
   await clear();await p.waitForTimeout(1200);{const lf=await back();ok(dev,'2c Back on the bare room',lf?'LEFT THE GAME':'stays in the game',!lf)}
   await clear();await p.evaluate(()=>{Q.push({ev:1,t:'Việc phải chọn',who:pMe(),h:'<p>Phải chọn.</p>',opts:[{n:'Theo',fx:{},x:'',go:()=>{}},{n:'Không theo',fx:{},x:'',go:()=>{}}]});showModal()});await p.waitForTimeout(1500);
   {const lf=await back();const still=!lf&&await p.evaluate(()=>!document.getElementById('modal').hidden&&/Việc phải chọn/.test(document.getElementById('modal').innerText));
    ok(dev,'2c Back on a forced event',lf?'LEFT THE GAME':still?'stays, event still waiting':'EVENT SKIPPED',!lf&&still)}
   await clear();await p.evaluate(()=>{setTimeout(()=>kitModal({kind:'info',title:'Tin muộn',sections:[{h:'',html:'<p>Mở bằng giờ.</p>'}],btn:'Đã rõ'}),1500)});await p.waitForTimeout(2600);
   {const op=await p.evaluate(()=>!document.getElementById('modal').hidden);const lf=await back();const cl=!lf&&await p.evaluate(()=>document.getElementById('modal').hidden);
    ok(dev,'2c Back on a timer-opened card',lf?'LEFT THE GAME':`open ${op} · ${cl?'closed':'STILL OPEN'}`,op&&!lf&&cl)}
   /* (3b) a game option naming death runs at once: no «Kiếp này chưa trọn» re-ask */
   await clear();await p.evaluate(()=>{S.kpWarn=0;Q.push({ev:1,t:'Đường cùng',who:pMe(),h:'<p>Không còn lối.</p>',opts:[{n:'Tự vẫn cho xong',fx:{},x:'',go:()=>{window.__fired=1}},{n:'Sống tiếp',fx:{},x:'',go:()=>{}}]});showModal()});await p.waitForTimeout(900);
   await tapSel(p,'#modal:not([hidden]) .opts>button .kan');await p.waitForTimeout(600);
   const g=await p.evaluate(()=>({fired:!!window.__fired,ask:/Kiếp này chưa trọn/.test((document.getElementById('modal')||{}).innerText||'')}));
   ok(dev,'3b death option, no re-ask',g.ask?'RE-ASK SHOWN':g.fired?'chosen at once':'NO EFFECT',g.fired&&!g.ask);
   /* (4) every visible «!» has a name */
   await clear();await p.evaluate(()=>{kitModal({kind:'info',title:'Bổng lộc tháng giêng',sections:[{h:'',html:kitRows([['Bổng lộc','+20 bạc','g'],['Ghi chú','trả khi làm xong','t']])}],btn:'Đã rõ'})});await p.waitForTimeout(700);await shot(p,'4-bang');
   const bangs=await p.evaluate(()=>{const o=[];for(const e of document.querySelectorAll('body *')){if(e.children.length)continue;if((e.textContent||'').trim()!=='!')continue;if(!e.getClientRects().length)continue;
     let el=e,nm='';for(let i=0;i<3&&el;i++,el=el.parentElement){nm=el.getAttribute('aria-label')||el.getAttribute('title')||'';if(nm)break}o.push({cls:String(e.className).slice(0,30),nm})}return o});
   for(const x of bangs)ok(dev,'4 «!» '+x.cls,x.nm?'name «'+x.nm+'»':'NO NAME',!!x.nm);
   /* (C) MAIN 156 r2: every mini-game shell, one by one (each art's lesson → kind picker → rules screen before «Sẵn sàng» = a FREE back):
      Back must do what Esc does there (close the game, nothing spent), never leave the page; during a live round Back does nothing (never a give-up) */
   const arts=await p.evaluate(()=>[...ARTS.map(a=>a.k+':self'),...ARTS.map(a=>a.k+':free')]);const ESC={};
   for(const km of arts)for(const how of ['esc','back']){const [k,md]=km.split(':');await clear();
    const r0=await p.evaluate(async ([k,md])=>{const W=t=>new Promise(r=>setTimeout(r,t));const ov=document.getElementById('ov');S.suc=100;S.bac=900;S.th=80;S.mg=null;S.arts[k]=Math.min(S.arts[k]||0,3);
     try{lessonMode(k,'self')}catch(e){return {err:String(e)}}await W(400);
     for(let st=0;st<3&&ov.hidden&&!document.getElementById('modal').hidden;st++){const g=[...document.querySelectorAll('#modal button.kshgo')].find(b=>b.offsetParent&&!b.disabled&&/^Làm/.test(b.innerText.trim()));
      if(g)g.click();else if(Q.length&&Q[0].opts&&/làm gì\?|vật liệu gì\?/.test(Q[0].t||''))chooseM(0);else break;await W(400)}
     if(md==='free'&&!ov.hidden&&!KG82.backPre)KG82.backPre=()=>{};/* a paid opener's FREE back before «Sẵn sàng» (kgDefer) */
     return {open:!ov.hidden,x:!!ov.querySelector('[data-kitx="kgback"]'),free:!!(KG82.backPre||KG82.back),bac:S.bac,suc:S.suc}},[k,md]);
    if(r0.err||!r0.open){ok(dev,`C game ${km} ${how}`,'n/a '+(r0.err||'no game opened'),true);continue}
    let lf=false;if(how==='esc')await p.keyboard.press('Escape');else lf=await back();await p.waitForTimeout(500);
    const r1=lf?{}:await p.evaluate(()=>({open:!document.getElementById('ov').hidden,bac:S.bac,suc:S.suc,mg:!!S.mg}));
    if(!lf)await p.evaluate(()=>{try{if(!document.getElementById('ov').hidden&&typeof kg82Close==='function')kg82Close()}catch(e){}document.getElementById('ov').hidden=true;S.mg=null});
    const out=lf?'LEFT':(r1.open?'stays':'closed');if(how==='esc')ESC[km]=out;
    ok(dev,`C game ${km} ${how}`,lf?'LEFT THE GAME':`rules screen (free back ${r0.free}) → ${r1.open?'stays (Esc: nothing; ✕ = give up)':'closed'} · spent ${r0.bac-r1.bac} bạc ${r0.suc-r1.suc} sức${how==='back'?' · same as Esc '+(ESC[km]===out):''}`,!lf&&r0.bac===r1.bac&&r0.suc===r1.suc&&(how==='esc'||ESC[km]===out)&&(r0.free?!r1.open:true))}
   ok(dev,'A page errors',errs.length?errs.slice(0,2).join(' | '):'none',!errs.length);
   await ctx.close()}
  /* ---------- B: the robot's OLD save (Kiếp thứ hai, alive) ---------- */
  if(save){const {ctx,p,errs}=await mk({f:d=>{try{if(!localStorage.getItem('hclh-save-v2-1'))for(const k in d)localStorage.setItem(k,d[k])}catch(e){}},a:save});
   await p.waitForTimeout(3000);
   const ent=await p.evaluate(()=>{try{if(typeof showTitle==='function')showTitle()}catch(e){}return true});await p.waitForTimeout(1200);
   await tapSel(p,'#modal:not([hidden]) button[data-tgo="slots"]');await p.waitForTimeout(1500);
   const live=await p.evaluate(()=>{const b=document.querySelector('#slots button[data-new][data-ask]');if(!b)return null;b.scrollIntoView({block:'center'});const r=b.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2,t:b.closest('.slot,div').innerText.slice(0,80)}});
   if(!live)ok(dev,'3a Kiếp mới over a live sổ','no live sổ button (entry '+ent+')',false);
   else{await p.touchscreen.tap(live.x,live.y);await p.waitForTimeout(900);await shot(p,'3a-confirm');
    const c=await p.evaluate(()=>{const M=document.getElementById('modal');return {cf:!!document.querySelector('#modal:not([hidden]) .kcf [data-kcf-yes]'),t:M&&!M.hidden?(M.querySelector('.kptitle,.kph')||{}).textContent||'':''}});
    let kept=false;if(c.cf){await tapSel(p,'#modal:not([hidden]) #mr button, #modal:not([hidden]) .kit-x');await p.waitForTimeout(600);kept=await p.evaluate(()=>{const s=loadSlot(1);return !!(s&&s.S&&!s.S.dead)})}
    ok(dev,'3a Kiếp mới over a live sổ',c.cf?`kit confirm «${c.t.trim().slice(0,40)}» · Thôi → life ${kept?'kept':'LOST'}`:'NO CONFIRM',c.cf&&kept)}
   /* the old save continues */
   const cont=await tapSel(p,'button[data-load]');await p.waitForTimeout(1500);
   await p.evaluate(()=>{const b=[...document.querySelectorAll('#modal:not([hidden]) .opts>button, #modal:not([hidden]) #mr>button')].find(x=>/Tiếp tục|Vào/.test(x.textContent));if(b)b.click()});
   await p.waitForTimeout(6000);const st=await p.evaluate(()=>({name:S&&S.name,dead:S&&S.dead,title:!document.getElementById('title').hidden}));
   ok(dev,'B old save continues',`${cont?'«Tiếp tục kiếp này»':'no continue button'} → ${st.name||'?'} ${st.title?'(still on title)':'in play'}`,cont&&!!st.name&&!st.title);
   /* (B2) title sub-pages (Thiết lập, Cùng hảo hữu = co-op rooms page): Back = Esc = back to the title home, page kept */
   for(const [nm,sel] of [['Thiết lập','button[data-tgo="opt"]'],['Cùng hảo hữu (co-op)','button[data-cstab="coop"]'],['Sổ luân hồi','button[data-tgo="past"]']]){
    await p.evaluate(()=>{try{showTitle()}catch(e){}});await p.waitForTimeout(900);const t=await tapSel(p,'#modal:not([hidden]) '+sel);await p.waitForTimeout(900);
    const sub0=await p.evaluate(()=>!document.querySelector('#modal:not([hidden]) button[data-tgo="opt"]'));
    await p.goBack().catch(()=>{});await p.waitForTimeout(800);const left=!p.url().includes('ctm.test')||!(await p.evaluate(()=>typeof Q!=='undefined').catch(()=>false));
    const home=!left&&await p.evaluate(()=>!!document.querySelector('#modal:not([hidden]) button[data-tgo="opt"]'));
    ok(dev,'B2 Back on title page '+nm,left?'LEFT THE GAME':`${t&&sub0?'page open':'page not opened'} → ${home?'title home':'NOT HOME'}`,!left&&t&&sub0&&home)}
   /* (3a-yes) the «yes» path of the system confirm: a new life starts in that sổ */
   {await p.evaluate(()=>{try{showTitle()}catch(e){}});await p.waitForTimeout(900);await tapSel(p,'#modal:not([hidden]) button[data-tgo="slots"]');await p.waitForTimeout(1200);
    const n0=await p.evaluate(()=>{const s=loadSlot(1);return s&&s.S&&s.S.name});const L0=await p.evaluate(()=>(lifeLog()||[]).length);
    await tapSel(p,'#slots button[data-new="1"][data-ask]');await p.waitForTimeout(900);const cf=await tapSel(p,'#modal:not([hidden]) [data-kcf-yes]');await p.waitForTimeout(5000);
    const r=await p.evaluate(()=>({title:!document.getElementById('title').hidden,name:S&&S.name,dead:S&&S.dead,id:/Thân phận|thân phận/.test((document.getElementById('modal')||{}).innerText||'')}));const L1=await p.evaluate(()=>(lifeLog()||[]).length);const row=await p.evaluate(()=>(lifeLog()||[])[0]||{});
    ok(dev,'3a-yes «Bắt đầu kiếp mới» / «Bỏ ngang»',cf?`yes tapped → ${r.title?'STILL ON TITLE':'new life ('+(r.id?'identity card':r.name)+')'} · old «${n0}» → Sổ luân hồi +${L1-L0} «${row.n} · ${row.o} · ${row.f}»`:'NO YES BUTTON',cf&&!r.title&&L1-L0===1&&!!row.o&&row.n===n0)}
   ok(dev,'B page errors',errs.length?errs.slice(0,2).join(' | '):'none',!errs.length);
   await ctx.close()}}
 async function clear2(p){await p.evaluate(()=>{try{const M=document.getElementById('modal');if(M&&!M.hidden&&typeof closeModal==='function')closeModal()}catch(e){}})}
 await br.close();console.table(R);const bad=R.filter(r=>r.FAIL);console.log('cases',R.length,'FAIL',bad.length);process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
