/* New builds while playing (owner 11/15: phone / home-screen app stuck on an old build; 03:10Z "I am playing, what then?").
   usage: bash dev/site/build_site.sh && bash dev/test/sw-overlays.sh <ov> && node dev/test/sw-serve.js 8790 . A=<ov>/A B=<ov>/B main=<ov>/main &
          node dev/test/sw-update.js http://localhost:8790/ <outdir> <scenario>
   Overlays: A (this build), B (the same build deployed again: window.__CTM_MARK="B", its own CTM_BUILD + sw.js), main (origin/main).
   scenario "play" : Fold 755x1000@2. A sổ in the middle of a buổi (1 khắc spent, tab Phi tần). Deploy B; the app goes to the background
                     and back → NO reload, only the chip "Có bản mới" on the top bar. Chip → card → Để sau → still A, chip stays.
                     Qua buổi → the new buổi is written → B opens by itself, back in the SAME sổ, the next buổi, same tab, line
                     "Đã mở bản mới"; the sổ written right before the reload == the sổ after it (0 lost). Then deploy A: chip → card →
                     Mở bản mới → A, same buổi, same khắc. Last: on the title screen a new build opens at once (no resume).
   scenario "away" : iPad 1180x820@2. Mid-buổi, B deployed: a short trip to the background → no reload; back after ≥ 10 min
                     (KSW.hidAt moved back 11 min) → B opens by itself at the same buổi and khắc.
   scenario "main" : iPad 1180x820@2. The old main build (old worker 'ctm-<ts>', old swreg) with a sổ; deploy A; open the app again ONCE
                     → old page reloads on the new worker → build A; sổ unchanged and loads; old cache migrated. STALE=1: stale index first.
   scenario "coop" : two browsers (host Fold 755x1000@2, guest iPad 1180x820@2) in one room on the LIVE co-op Worker (COOP_URL, default
                     ctm-coop.victoria-tntt.workers.dev). Deploy B mid-buổi → both: no reload, chip. Both press Qua buổi (the room's sync
                     point) → both reopen on B and rejoin by themselves: same room, same seat, same week / buổi, same lives, each still
                     sees the other. Then deploy A: host chip → Mở bản mới → guest card → Cùng mở → both on A, same room and buổi. */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,OUT,SC]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
const R={scenario:SC},errs=[],res=[];
const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined&&!c?' '+JSON.stringify(x):''))};
function watch(p,tag){p.on('pageerror',e=>errs.push((tag||'')+e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|net::ERR|favicon/.test(m.text()))errs.push((tag||'')+'console: '+m.text())})}
async function ev(p,f,a){for(let i=0;i<60;i++){try{return await p.evaluate(f,a)}catch(e){if(!/context|navigat|Target closed/i.test(e.message))throw e;await sleep(500)}}}
async function until(p,f,ms,a){const t=Date.now();while(Date.now()-t<ms){const v=await ev(p,f,a).catch(()=>null);if(v)return v;await sleep(400)}return null}
const swV=p=>ev(p,()=>new Promise(ok=>{const c=navigator.serviceWorker.controller;if(!c)return ok(null);const h=e=>{if(e.data&&e.data.ctm==='v'){navigator.serviceWorker.removeEventListener('message',h);ok(e.data.v)}};
 navigator.serviceWorker.addEventListener('message',h);c.postMessage({ctm:'v'});setTimeout(()=>ok('no-answer'),3000)}));
/* the sổ keys; 'at' (time written) is dropped: the game writes the same sổ again on every render */
const saves=p=>ev(p,()=>{const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(/^hclh-(slot|save-v2-)/.test(k)){let v=localStorage.getItem(k);try{const d=JSON.parse(v);if(d&&typeof d==='object'){delete d.at;v=JSON.stringify(d)}}catch(e){}o[k]=v}}return o});
function box(p,sel){return ev(p,s=>{const vw=innerWidth,vh=innerHeight,bad=[];const r=document.querySelector(s);if(!r)return{none:true};
 const all=[r,...r.querySelectorAll('.kptitle,.kpsub,.kpst,.kprog-n,.kprog-s,.kpnote,.kbtn,.kpseal')];
 all.forEach(e=>{const q=e.getBoundingClientRect();if(!q.width)return;
  if(q.left<-1||q.right>vw+1||q.top<-1||q.bottom>vh+1)bad.push('out:'+e.className);if(e.scrollWidth>e.clientWidth+1||e.scrollHeight>e.clientHeight+2)bad.push('clip:'+e.className)});
 return{overflowX:document.documentElement.scrollWidth>vw,bad,pct:/%/.test(r.innerText),text:r.innerText.replace(/\s+/g,' ')}},sel)}
/* a full-page shot at @2 takes longer than the 4.5 s line lives: the shots redraw the same line (KSW.line) first */
/* the chip sits on the top bar and covers no other part of it */
const chipBox=p=>ev(p,()=>{const c=document.querySelector('#krail [data-rail="st-upd"]');if(!c)return{shown:false};const q=c.getBoundingClientRect(),st=document.getElementById('stage').getBoundingClientRect();
 return{shown:true,text:(c.getAttribute('aria-label')||'').replace(/ \(có mới\)$/,''),inHud:q.width===44&&q.top>=0&&q.bottom<=innerHeight&&q.left>=0&&q.right<=innerWidth,/* in the stage rail, or in the corner dock above the tab bar on tabs that hide the stage */covers:[],box:[q.left,q.top,q.width,q.height].map(Math.round)}});
const mark=p=>ev(p,()=>window.__CTM_MARK||'A');
const where=p=>ev(p,()=>typeof S!=='undefined'&&S?{name:S.name,k:[S.year,S.month,S.tuan,S.buoi||0].join(':'),used,tab,title:!document.getElementById('title').hidden}:null);
/* a fresh life in sổ 1, no Luân hồi, no opening dialogs */
async function newLife(p){await ev(p,()=>{SLOT=1;document.getElementById('title').hidden=true;window.__nlInner=1;try{start()}finally{window.__nlInner=0}quiet=false;try{NLP=null}catch(e){}Q.length=0;
 const m=document.getElementById('modal');if(m){m.hidden=true;m.classList.remove('kptitle','kpthome','kpscene')}document.querySelectorAll('.kmov,.kroul').forEach(e=>e.remove());render();save()});await sleep(800)}
async function settle(p){for(let i=0;i<20;i++){const st=await ev(p,()=>{document.querySelectorAll('.kmov').forEach(e=>e.click());
  const bk=[...document.querySelectorAll('.kbk-bar button')].find(x=>x.offsetParent!==null&&/^Lui$/.test(x.textContent.trim()));if(bk){bk.click();return'x'}
  const m=document.getElementById('modal');if(typeof S!=='undefined'&&S&&S.mg){S.mg=null;document.getElementById('ov').hidden=true;render();return'x'}
  if(!m||m.hidden)return'';const b=m.querySelector('#mr button:not([disabled]),.k3foot button:not([disabled])')||m.querySelector('.opts button:not([disabled])')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'});if(st!=='x')return st;await sleep(250)}}
const flip=(p,s)=>ev(p,s=>{Object.defineProperty(document,'visibilityState',{configurable:true,get:()=>s});Object.defineProperty(document,'hidden',{configurable:true,get:()=>s==='hidden'});document.dispatchEvent(new Event('visibilitychange'))},s);
async function bgShort(p){await flip(p,'hidden');await sleep(300);await flip(p,'visible')}
/* every sổ written right before the page left (beforeunload) is kept in sessionStorage to compare after the reload */
const keepPre=p=>ev(p,()=>{addEventListener('beforeunload',()=>{try{const d=JSON.parse(localStorage.getItem('hclh-save-v2-'+SLOT));delete d.at;sessionStorage.setItem('t-pre',JSON.stringify(d))}catch(e){}})});
/* the game's own "Tiếp tục" (no new build: dev/test baseline) rebuilds two derived fields on every load: S.visit.tk (who she talked to
   at this place, an empty {} after loading) and the rivals' relations to EACH OTHER (rl, normalised on load). They are left out. */
const samePre=p=>ev(p,()=>{try{const st=d=>{d=JSON.parse(JSON.stringify(d));delete d.at;if(d.S&&d.S.visit)delete d.S.visit.tk;(d.R||[]).forEach(r=>delete r.rl);return d};
 const A=st(JSON.parse(sessionStorage.getItem('t-pre'))),B=st(JSON.parse(localStorage.getItem('hclh-save-v2-'+SLOT)));const a=JSON.stringify(A),b=JSON.stringify(B);const diff=Object.keys(Object.assign({},A.S,B.S)).filter(k=>JSON.stringify(A.S[k])!==JSON.stringify(B.S[k]));
 const rd=[];(A.R||[]).forEach((r,i)=>{const q=(B.R||[])[i]||{};for(const k of Object.keys(Object.assign({},r,q)))if(JSON.stringify(r[k])!==JSON.stringify(q[k]))rd.push(r.id+'.'+k+':'+JSON.stringify(r[k]).slice(0,80)+'→'+JSON.stringify(q[k]).slice(0,80))});
 return{same:a===b,len:[a&&a.length,b.length],diffS:diff.slice(0,8),visit:diff.includes('visit')?[JSON.stringify(A.S.visit).slice(0,300),JSON.stringify(B.S.visit).slice(0,300)]:null,rd:rd.slice(0,6),top:Object.keys(Object.assign({},A,B)).filter(k=>k!=='S'&&JSON.stringify(A[k])!==JSON.stringify(B[k]))}}catch(e){return{err:e.message}}});
const loaded=p=>until(p,()=>window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')&&navigator.serviceWorker.controller&&document.readyState==='complete',600000);
async function setVer(v){await fetch(BASE+'__ver/'+v)}
async function ctxOf(b,W,H){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<1100,serviceWorkers:'allow',reducedMotion:'reduce'});
 await ctx.addInitScript(u=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}if(u)window.COOP_URL=u},process.env.COOP_URL||null);  /* keep the 600 MB figure set out of the test */
 return ctx}
/* tap a visible button (waits up to 5 s for it) */
const tapIn=(p,sel,re)=>until(p,([s,r])=>{const b=[...document.querySelectorAll(s)].find(x=>x.getClientRects().length&&new RegExp(r).test(x.textContent.trim()));if(b){b.click();return true}return false},5000,[sel,typeof re==='string'?re:re.source]);

(async()=>{const b=await chromium.launch();
 const [W,H]=SC==='play'?[755,1000]:[1180,820];const tag=SC==='play'?'fold-755x1000':'ipad-1180x820';
 let ctx,p;if(SC!=='coop'){ctx=await ctxOf(b,W,H);p=ctx.pages()[0]||await ctx.newPage();watch(p)}
 if(SC==='play'||SC==='away'){await setVer('A');await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:180000});
  ok(await loaded(p),'A loaded, worker in control');R.build=await ev(p,()=>window.CTM_BUILD);
  await newLife(p);await settle(p);
  await ev(p,()=>{used=1;const t=document.querySelector('#tabs [data-tab="rv"]');if(t)t.click();else{tab='rv'}render();save()});await sleep(500);
  const w0=await where(p);R.before=w0;
  await setVer('B');const t0=Date.now();await bgShort(p);
  ok(await until(p,()=>window.KSW&&KSW.pending,60000),'new build found after a return to the foreground',Date.now()-t0);
  await sleep(7000);ok(await mark(p)==='A'&&!await ev(p,()=>!!document.getElementById('kupd')),'mid-buổi: no reload, no card over the game');
  /* a finished card-flip overlay (.kmov, review/tham-flip-ui) is a motion moment: the icon waits behind it by design — dismiss it like she would */
  await ev(p,()=>document.querySelectorAll('.kmov').forEach(e=>e.remove()));await sleep(1600);
  const c0=await chipBox(p);R.chip=c0;ok(c0.shown&&c0.inHud&&!c0.covers.length&&c0.text==='Có bản mới','status icon "Có bản mới" in the stage rail',c0);
  await p.screenshot({path:`${OUT}/${SC}-1-chip-${tag}.png`});
  if(SC==='play'){
   await ev(p,()=>document.querySelector('#krail [data-rail="st-upd"]').click());await sleep(500);R.card=await box(p,'#kupd');
   ok(!R.card.none&&!R.card.bad.length&&!R.card.overflowX&&/Mở bản mới ngay\?/.test(R.card.text)&&/Để sau/.test(R.card.text),'chip → card "Mở bản mới ngay?" Để sau / Mở bản mới, fits',R.card);
   await p.screenshot({path:`${OUT}/play-2-card-${tag}.png`});
   await tapIn(p,'#kupd .kbtn','^Để sau$');await sleep(3500);
   ok(await mark(p)==='A'&&!await ev(p,()=>!!document.getElementById('kupd'))&&(await chipBox(p)).shown,'Để sau: card gone, still this build, chip stays');
   ok(JSON.stringify(await where(p))===JSON.stringify(w0),'Để sau: nothing changed in the game');
   /* Qua buổi */
   await keepPre(p);const nx=await ev(p,()=>{const n=document.getElementById('next');const t=n.textContent;n.click();return t});R.pressed=nx;
   const mB=await until(p,()=>window.__CTM_MARK==='B'&&document.readyState==='complete'&&window.KSW&&KSW.resumed?'B':null,90000);
   ok(mB==='B','Qua buổi → the new build opened by itself');
   await ev(p,()=>KSW.line('Đã mở bản mới',0));await p.screenshot({path:`${OUT}/play-3-after-qua-buoi-${tag}.png`});await ev(p,()=>KSW.line('Đã mở bản mới',300));
   const w1=await where(p);R.after=w1;R.resumed=await ev(p,()=>KSW.resumed);
   ok(w1&&!w1.title&&w1.name===w0.name&&w1.k!==w0.k&&w1.used===0,'back in the same sổ, next buổi, no title screen, no Nạp sổ',[w0,w1]);
   ok(w1&&w1.tab===w0.tab,'same tab',[w0.tab,w1&&w1.tab]);
   const sp=await samePre(p);R.samePre=sp;ok(sp.same,'sổ written before the reload == sổ after it (0 lost)',sp);
   R.lineQB=await ev(p,()=>(KSW.lines.find(l=>l[0]==='Đã mở bản mới')||[])[0]);ok(R.lineQB==='Đã mở bản mới','line "Đã mở bản mới"',R.lineQB);
   ok(!(await chipBox(p)).shown,'no chip on the new build');
   await sleep(1500);ok(!await ev(p,()=>{const l=document.getElementById('kupdline');return l&&!l.classList.contains('out')}),'the line goes by itself');
   /* chip → Mở bản mới (mid-buổi, 2 khắc) */
   await settle(p);await ev(p,()=>{used=2;render();save()});const w2=await where(p);
   await setVer('A');await bgShort(p);ok(await until(p,()=>KSW.pending&&!!document.querySelector('#krail [data-rail="st-upd"]'),60000),'B → A: chip again');
   await ev(p,()=>document.querySelector('#krail [data-rail="st-upd"]').click());ok(await until(p,()=>!!document.getElementById('kupd'),5000),'chip → card');await keepPre(p);
   ok(await until(p,()=>{const b=[...document.querySelectorAll('#kupd .kbtn')].find(x=>x.textContent.trim()==='Mở bản mới');if(b){b.click();return true}return false},5000),'tap Mở bản mới');
   ok(await until(p,()=>!window.__CTM_MARK&&document.readyState==='complete'&&window.KSW&&KSW.resumed,90000),'Mở bản mới → A opened at once',await ev(p,()=>({m:window.__CTM_MARK,k:window.KSW,rec:localStorage.getItem('ctm-upd-resume')&&1})));
   const w3=await where(p);ok(w3&&!w3.title&&JSON.stringify(w3)===JSON.stringify(w2),'same sổ, same buổi, same khắc, same tab',[w2,w3]);
   const sp2=await samePre(p);ok(sp2.same,'Mở bản mới: 0 lost',sp2);
   /* title screen: a new build opens at once, no resume */
   await ev(p,()=>showTitle());await sleep(800);await setVer('B');await bgShort(p);
   ok(await until(p,()=>window.__CTM_MARK==='B'&&document.readyState==='complete',90000),'title screen: the new build opens at once');
   await sleep(1500);ok(await ev(p,()=>!document.getElementById('title').hidden&&!(KSW.resumed)),'title screen stays the title screen');
   await p.screenshot({path:`${OUT}/play-4-title-${tag}.png`})}
  if(SC==='away'){
   await flip(p,'hidden');await ev(p,()=>{KSW.hidAt=Date.now()-11*60e3});await keepPre(p);await flip(p,'visible');
   ok(await until(p,()=>window.__CTM_MARK==='B'&&document.readyState==='complete'&&window.KSW&&KSW.resumed,90000),'back after 11 min → the new build opened by itself');await ev(p,()=>KSW.line('Đã mở bản mới',0));await p.screenshot({path:`${OUT}/away-2-after-${tag}.png`});await ev(p,()=>KSW.line('Đã mở bản mới',300));
   const w1=await where(p);R.after=w1;ok(w1&&!w1.title&&JSON.stringify(w1)===JSON.stringify(w0),'same sổ, same buổi, same khắc, same tab',[w0,w1]);
   const sp=await samePre(p);ok(sp.same,'0 lost',sp);R.line=await ev(p,()=>(KSW.lines.find(l=>l[0]==='Đã mở bản mới')||[])[0]);
   ok(R.line==='Đã mở bản mới','line "Đã mở bản mới"',R.line)}
  R.overflowX=await ev(p,()=>document.documentElement.scrollWidth>innerWidth);ok(!R.overflowX,'no horizontal overflow')}
 if(SC==='main'){await setVer('main');
  await p.goto(BASE,{waitUntil:'load'});
  R.oldCtl=!!await until(p,async()=>navigator.serviceWorker.controller&&(await caches.keys()).some(k=>/^ctm-/.test(k)),300000);
  await sleep(1500);R.oldCaches=await ev(p,()=>caches.keys());
  await newLife(p);await sleep(3000);R.savesOld=await saves(p);
  await setVer('A');if(process.env.STALE)await fetch(BASE+'__stale/main');await p.close();const t0=Date.now();p=await ctx.newPage();watch(p);
  let navs=0;p.on('framenavigated',f=>{if(f===p.mainFrame())navs++});
  await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:180000});
  ok(!!await until(p,()=>window.CTM_BUILD&&document.readyState==='complete',90000),'the old build reopened on this build');R.switchMs=Date.now()-t0;R.navigations=navs;
  ok(await loaded(p),'loaded');
  R.vNew=await swV(p);R.caches=await ev(p,()=>caches.keys());R.core=await ev(p,()=>KLOAD.core);
  R.savesNew=await saves(p);ok(JSON.stringify(R.savesOld)===JSON.stringify(R.savesNew),'old sổ unchanged');
  for(const k of ['savesOld','savesNew'])R[k]=Object.fromEntries(Object.entries(R[k]||{}).map(([a,v])=>[a,v.length]));
  await ev(p,()=>{const b=document.querySelector('#modal.kpthome .kpmenu [data-tgo="slots"]');if(b)b.click()});await p.waitForSelector('#modal [data-load]',{timeout:15000}).catch(()=>0);
  ok(await ev(p,()=>{const b=document.querySelector('#modal [data-load]');if(b)b.click();return !!S&&document.getElementById('title').hidden}),'old sổ loads (Tiếp tục -> sổ list -> data-load)');
  await sleep(1500);await p.screenshot({path:`${OUT}/main-2-after-${tag}.png`})}
 if(SC==='coop')await coop(b);
 R.errs=errs;ok(!errs.length,'0 page errors',errs.slice(0,6));
 if(ctx)await ctx.close();await b.close();
 fs.writeFileSync(`${OUT}/${SC}-result.json`,JSON.stringify(R,null,1));const bad=res.filter(r=>!r[0]);console.log(`\n${SC}: ${res.length-bad.length}/${res.length} passed`);
 process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});

/* ---------- co-op ---------- */
const co=p=>ev(p,()=>{const c=window.COOP,s=c&&c.state||{},W=window.COOPW||{};const f=typeof rivals!=='undefined'&&rivals?(rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null):null;
 return{room:s.room,you:s.you,status:s.status,peer:!!s.peerOnline,on:!!W.on,week:s.week||0,hold:!!W.hold,name:typeof S!=='undefined'&&S&&S.name,k:typeof S!=='undefined'&&S?[S.year,S.month,S.tuan,S.buoi||0].join(':'):'',used:typeof used!=='undefined'?used:0,deck:typeof deck!=='undefined'&&deck?deck.length:0,friend:f&&f.name,mark:window.__CTM_MARK||'A',build:window.CTM_BUILD}});
async function clearC(p){return ev(p,()=>{const W=window.COOPW||{};if(!W.on||typeof S==='undefined'||!S)return'';const fz=document.getElementById('coopfz');if(fz&&!fz.hidden)return'coop';
 document.querySelectorAll('.kmov').forEach(e=>e.click());if(S.mg){S.mg=null;document.getElementById('ov').hidden=true;render();return'x'}
 const m=document.getElementById('modal');if(!m||m.hidden)return'';const b=m.querySelector('#mr button:not([disabled]),.k3foot button:not([disabled])')||m.querySelector('.opts button:not([disabled])')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'})}
/* press Qua buổi once it is enabled (dialogs read first) */
async function press(p){for(let t=0;t<80;t++){for(let i=0;i<4;i++)if(await clearC(p)!=='x')break;if(await ev(p,()=>{const n=document.getElementById('next');if(!n||n.disabled)return false;n.click();return true}))return true;await sleep(250)}return false}
const clearAll=async(...L)=>{for(const p of L)for(let i=0;i<6;i++)if(await clearC(p)!=='x')break};
async function coop(b){const A={n:'host'},B={n:'guest'};
 A.ctx=await ctxOf(b,755,1000);B.ctx=await ctxOf(b,1180,820);
 for(const o of [A,B]){o.p=await o.ctx.newPage();watch(o.p,o.n+': ')}
 await setVer('A');
 await A.p.goto(BASE,{waitUntil:'domcontentloaded',timeout:180000});ok(await loaded(A.p),'host: A loaded');
 await until(A.p,()=>document.querySelector('#modal.kpthome [data-coop="co"]'),30000);
 await ev(A.p,()=>document.querySelector('#modal.kpthome [data-coop="co"]').click());await sleep(500);
 await ev(A.p,()=>document.querySelector('#modal [data-coop="make"]').click());
 const code=await until(A.p,()=>COOP.state.room&&COOP.state.you==='a'&&COOP.state.room,40000);ok(!!code,'host made a room',code);R.room=code;
 await B.p.goto(BASE+'?room='+code,{waitUntil:'domcontentloaded',timeout:180000});ok(await loaded(B.p),'guest: A loaded');
 await sleep(1500);await tapIn(B.p,'#modal button','^Vào phòng');
 const both=async(f,ms=60000)=>{const t=Date.now();while(Date.now()-t<ms){for(const o of [A,B])for(let i=0;i<4;i++)if(await clearC(o.p)!=='x')break;const a=await co(A.p),c=await co(B.p);if(f(a,c))return[a,c];await sleep(500)}return[await co(A.p),await co(B.p)]};
 let [a,c]=await both((a,c)=>a.on&&c.on&&a.name&&c.name&&a.friend&&c.friend&&a.peer&&c.peer,120000);
 ok(a.on&&c.on&&a.friend===c.name&&c.friend===a.name,'both in the shared world, each sees the other',[a,c]);
 /* mid-buổi: one khắc spent on each side */
 await clearAll(A.p,B.p);for(const o of [A,B])await ev(o.p,()=>{used=1;render()});await sleep(800);
 [a,c]=[await co(A.p),await co(B.p)];R.coBefore=[a,c];
 await setVer('B');for(const o of [A,B])await bgShort(o.p);
 ok(await until(A.p,()=>KSW.pending,60000)&&await until(B.p,()=>KSW.pending,60000),'both found the new build');
 await sleep(7000);await clearAll(A.p,B.p);await sleep(1200);const a1=await co(A.p),c1=await co(B.p);
 ok(a1.mark==='A'&&c1.mark==='A'&&a1.room===code&&c1.room===code&&a1.peer&&c1.peer,'co-op mid-buổi: no reload, nobody dropped',[a1,c1]);
 for(const o of [A,B]){const cb=await chipBox(o.p);ok(cb.shown&&cb.inHud&&!cb.covers.length,o.n+': chip on the top bar',cb)}
 await A.p.screenshot({path:`${OUT}/coop-1-chip-host-fold-755x1000.png`});await B.p.screenshot({path:`${OUT}/coop-1-chip-guest-ipad-1180x820.png`});
 ok(JSON.stringify(a1)===JSON.stringify(a)&&JSON.stringify(c1)===JSON.stringify(c),'nothing changed in either game',[a,a1,c,c1]);
 /* both press Qua buổi */
 const k0=a.k;
 ok(await press(A.p)&&await press(B.p),'both press Qua buổi');
 const ra=await until(A.p,()=>window.__CTM_MARK==='B'&&window.KSW&&KSW.resumed,120000),rb=await until(B.p,()=>window.__CTM_MARK==='B'&&window.KSW&&KSW.resumed,120000);
 ok(ra&&rb,'Qua buổi → both reopened on B by themselves',[ra,rb]);
 [a,c]=await both((a,c)=>a.on&&c.on&&a.peer&&c.peer&&a.friend&&c.friend,60000);R.coAfter=[a,c];R.resumed=[await ev(A.p,()=>KSW.resumed),await ev(B.p,()=>KSW.resumed)];
 ok(a.room===code&&c.room===code&&a.you==='a'&&c.you==='b','same room, same seats',[a.room,c.room,a.you,c.you]);
 ok(a.name===R.coBefore[0].name&&c.name===R.coBefore[1].name&&a.k===c.k&&a.k!==k0&&a.week===c.week&&a.week===R.coBefore[0].week,'same lives, same week, both on the next buổi',[R.coBefore,a,c]);
 ok(a.friend===c.name&&c.friend===a.name&&!a.hold&&!c.hold,'each still sees the other, same build, room not held',[a,c]);
 ok(a.deck>0&&c.deck>0,'both have their acts (Hành sự) after the rejoin',[a.deck,c.deck]);
 ok(R.resumed[0]&&R.resumed[0].ok&&R.resumed[1]&&R.resumed[1].ok,'the local week was put back on both',R.resumed);
 await sleep(300);await A.p.screenshot({path:`${OUT}/coop-2-after-host-fold-755x1000.png`});await B.p.screenshot({path:`${OUT}/coop-2-after-guest-ipad-1180x820.png`});
 /* the week goes on: one more buổi together */
 const k1=a.k;await press(A.p);await press(B.p);
 [a,c]=await both((a,c)=>a.k===c.k&&a.k!==k1,60000);ok(a.k===c.k&&a.k!==k1,'the next buổi advances for both',[k1,a.k,c.k]);
 /* host: chip → Mở bản mới → guest: Cùng mở */
 await clearAll(A.p,B.p);for(const o of [A,B])await ev(o.p,()=>{used=1;render()});await sleep(800);const pre=[await co(A.p),await co(B.p)];
 await setVer('A');for(const o of [A,B])await bgShort(o.p);
 ok(await until(A.p,()=>KSW.pending&&!!document.querySelector('#krail [data-rail="st-upd"]'),60000),'B → A: host chip');
 await ev(A.p,()=>document.querySelector('#krail [data-rail="st-upd"]').click());await sleep(400);R.coCard=await box(A.p,'#kupd');ok(/Bạn chơi cùng sẽ được hỏi/.test(R.coCard.text)&&!R.coCard.bad.length,'host card asks the friend',R.coCard);
 await A.p.screenshot({path:`${OUT}/coop-3-card-host-fold-755x1000.png`});
 ok(await tapIn(A.p,'#kupd .kbtn','^Mở bản mới$'),'host taps Mở bản mới');
 ok(await until(B.p,()=>{const k=document.getElementById('kupd');return k&&/Cùng mở/.test(k.innerText)},20000),'guest gets the card Cùng mở / Để sau',{g:await ev(B.p,()=>({k:window.KSW,card:document.getElementById('kupd')&&document.getElementById('kupd').innerText,tr:(window.COOPW&&COOPW.tr||[]).slice(-6)})),h:await ev(A.p,()=>({k:window.KSW}))});
 R.coPeerCard=await box(B.p,'#kupd');await B.p.screenshot({path:`${OUT}/coop-4-ask-guest-ipad-1180x820.png`});
 ok(await tapIn(B.p,'#kupd .kbtn','^Cùng mở$'),'guest taps Cùng mở');
 const r2a=await until(A.p,()=>!window.__CTM_MARK&&window.KSW&&KSW.resumed,120000),r2b=await until(B.p,()=>!window.__CTM_MARK&&window.KSW&&KSW.resumed,120000);
 ok(r2a&&r2b,'Cùng mở → both on A');
 [a,c]=await both((a,c)=>a.on&&c.on&&a.peer&&c.peer&&a.friend&&c.friend,60000);
 ok(a.room===code&&c.room===code&&a.k===pre[0].k&&c.k===pre[1].k&&a.used===pre[0].used&&c.used===pre[1].used&&a.friend===c.name,'same room, same buổi and khắc on both',[pre,a,c]);
 await sleep(300);await A.p.screenshot({path:`${OUT}/coop-5-together-host-fold-755x1000.png`});
 for(const o of [A,B])await o.ctx.close()}
