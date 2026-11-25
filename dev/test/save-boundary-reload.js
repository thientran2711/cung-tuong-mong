/* save-boundary-reload (review/save-year-rollback, LAW 11): a TRUE page reload right after every step where time moves returns the state on screen.
   Robot M2 (25/11, build 0756a05b, Fold): HUD Year 4 / age 23, page reload → «Tiếp tục kiếp này» → Year 3 / age 22 (weeks lost). Cause: jspread held
   the autosave while a CODE card it had moved to a later buổi waited unseen (Tết / stipend month), so the screen showed the new year with no card
   open while the sổ still held the old one.
   For every case: a new life in Sổ 1 (seeded Math.random, same draws on every build), the calendar set just before the boundary, ONE real tap on
   «Sang buổi / Sang ngày mới» (#next), then every card answered like a player (first enabled option / close, scenes and mini-games closed) until the
   screen is free (no card, no scene, no held turn) — the moment the robot reloads. Then page.reload() → title → «Tiếp tục kiếp này» (Sổ 1) and the
   loaded life must show the same năm / tháng / tuần / buổi / tuổi / name (never an older step).
   Cases: buoi (sáng→trưa), day (tối→sáng, new tuần), month (hạ tuần→tháng mới), year ×SEEDS (tháng chạp→tháng giêng, the robot bug), servant road
   year (cung nữ: srvEndTurn), newlife (death → Luân hồi → the new life), oldsave (a sổ written by the OLD build loads, plays one step, reloads).
   usage: node dev/test/save-boundary-reload.js [newPath=index.html] [oldPath] [devices=fold,ipadAir] [seeds=1,2,3]
          (serves the repo root = the BUILT site; oldPath e.g. a copy of origin/main's index.html in the root; no oldPath = oldsave case skipped)
   exit 0 = every case PASS. */
const {chromium}=require('playwright');const D=require('./lib/device');
const [,,NEW='index.html',OLD='',DEVS='fold,ipadAir',SEEDS='1,2,3']=process.argv;
const sleep=t=>new Promise(r=>setTimeout(r,t));
const seedInit=seed=>{let s=(seed*2654435761>>>0)%2147483646+1;Math.random=()=>{s=(s*16807)%2147483647;return (s-1)/2147483646}};
/* in-page helpers (string, evaluated in the game frame) */
const H=`window.__sbr={
 key(){return S?[S.year,S.month,S.tuan,S.buoi||0,S.age,S.name].join('.'):'none'},
 saved(){try{const k='hclh-save-v2-1';const raw=window.slotGet?slotGet(k):localStorage.getItem(k);const d=JSON.parse(raw);return d&&d.S?[d.S.year,d.S.month,d.S.tuan,d.buoi||0,d.S.age,d.S.name].join('.'):'none'}catch(e){return 'err'}},
 vis(el){return !!(el&&!el.hidden&&el.getBoundingClientRect().width>0&&getComputedStyle(el).display!=='none')},
 dawn(){const d=document.getElementById('dawn');return !!(d&&!d.hidden&&d.classList.contains('on'))},
 busy(){const M=document.getElementById('modal');return Q.length>0||!!S.mg||this.vis(M)||[...document.querySelectorAll('.kmov:not(.km-out),#kmrew,#kpodov,[id^="kroul"],.kroul-ov')].some(x=>this.vis(x))||this.dawn()||this.vis(document.getElementById('ov'))||(typeof DQ!=='undefined'&&!!DQ.want)||(typeof KMQ!=='undefined'&&KMQ.length>0)},
 why(){const M=document.getElementById('modal');return JSON.stringify({dawn:this.dawn(),Q:Q.map(m=>String(m.t||m.pid).slice(0,24)),mg:!!S.mg,modal:this.vis(M),scene:[...document.querySelectorAll('.kmov:not(.km-out),#kmrew,#kpodov,[id^="kroul"],.kroul-ov')].filter(x=>this.vis(x)).map(x=>x.id||x.className).join(),ov:this.vis(document.getElementById('ov')),dq:typeof DQ!=='undefined'?DQ.want:0,kmq:typeof KMQ!=='undefined'?KMQ.length:0,kb:typeof kmBusy!=='undefined'?kmBusy:0})},
 async after(k0){/* the step may run late (a held turn, the auto-advance timer): wait until the calendar moved, then until the screen is free and stays the same */
  const sl=t=>new Promise(r=>setTimeout(r,t));for(let i=0;i<120&&this.key()===k0;i++){await this.settle1();await sl(250)}
  for(let i=0;i<6;i++){const k=this.key();const ok=await this.settle();await sl(1200);if(ok&&this.key()===k&&!this.busy())return true}return false},
 async settle1(){if(!this.busy())return;return this.settle()},
 async settle(){const sl=t=>new Promise(r=>setTimeout(r,t));let free=0;
  for(let i=0;i<400&&!S.dead;i++){
   if(!this.busy()){if(++free>=6)return true;await sl(250);continue}free=0;if(i%20===19)console.log('@@ settle '+i+' '+this.why());
   if(this.dawn()){/* the new-day host (title card / Tuần lục book): close it like a player */const d=document.getElementById('dawn');const bt=[...d.querySelectorAll('button')].filter(x=>this.vis(x));const k=this.dwTry=(this.dwTry||0)+1;
    if(bt.length&&k<8)bt[bt.length-1].click();else{d.classList.remove('on');d.hidden=true;this.dwTry=0}await sl(300);continue}
   {const ro=[...document.querySelectorAll('[id^="kroul"],.kroul-ov')].filter(x=>this.vis(x));if(ro.length){/* the origin roulette of a new life (not under test) */ro.forEach(x=>x.remove());await sl(200);continue}}
   const sc=document.querySelector('.kmov:not(.km-out) button,#kmrew button,#kpodov button');if(sc){sc.click();await sl(250);continue}
   if(S.mg||this.vis(document.getElementById('ov'))){/* a mini-game / its result screen: close it (the step under test is the buổi change, not the game) */const k=this.mgTry=(this.mgTry||0)+1;const sk=k<3&&document.querySelector('#kg82skip,#mgskip,#mgok');if(sk&&this.vis(sk))sk.click();else{S.mg=null;const ov=document.getElementById('ov');if(ov)ov.hidden=true;this.mgTry=0;render()}await sl(250);continue}
   if(Q.length){const m=Q[0];if(m===this.lastM&&++this.sameM>=3){Q.shift();this.sameM=0;try{render()}catch(x){}continue}if(m!==this.lastM){this.lastM=m;this.sameM=0}try{if(m.opts&&m.opts.length){const j=m.opts.findIndex(o=>!o.off&&!o.dis&&!(o.fx&&o.fx.bac&&S.bac+o.fx.bac<0));chooseM(j<0?0:j)}else closeModal()}catch(e){Q.shift();try{render()}catch(x){}}await sl(200);continue}
   if(typeof kmBusy!=='undefined'&&kmBusy&&!document.querySelector('.kmov,#kmrew')&&typeof kmReset==='function'){try{kmReset()}catch(e){}}
   await sl(250)}return !this.busy()},
 newLife(origin){localStorage.removeItem('hclh-save-v2-1');SLOT=1;document.getElementById('title').hidden=true;
  for(let i=0;i<80;i++){window.__forceOrigin=origin;start();const want=origin==='cnv';if(!!(typeof isSrv==='function'&&isSrv())===want)break}window.__forceOrigin=null;
  try{if(typeof nlAccept==='function')nlAccept(false)}catch(e){}
  /* the life's opening cards (prologue, entry) are not under test: cleared, as dev/test/spread-e2e.js does */quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  ['kroul','dawn','kload','kpodov'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});render();return S.name}
};`;
async function play(b,dev,url,seed,fn){const ctx=await D.newDeviceContext(b,dev,{serviceWorkers:'block'});await ctx.addInitScript(seedInit,seed);
 await ctx.route(/\.(webp|png|jpg|jpeg|mp3|ogg|m4a|mp4|webm)(\?|$)/,r=>r.abort());
 const p=await ctx.newPage();p.setDefaultTimeout(180000);const pe=[];p.on('pageerror',e=>pe.push(e.message.slice(0,160)));if(process.env.SBR_DEBUG)p.on('console',m=>{const t=m.text();if(t.startsWith('@@'))console.log(t)});
 const open=async()=>{const g=await D.openDirect(p,url);await p.waitForFunction(()=>typeof deser==='function'&&typeof start==='function');await p.waitForTimeout(1500);await p.evaluate(H);return g};
 try{return await fn(p,open,pe)}finally{await ctx.close()}}
async function reloadLoad(p,open){await p.reload({waitUntil:'domcontentloaded'});await open();
 await p.waitForFunction(()=>document.querySelector('#slots button[data-load="1"]'));
 await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}document.querySelector('#slots button[data-load="1"]').click()});
 await p.waitForTimeout(2500);return p.evaluate(()=>__sbr.key())}
/* the cases: [name, origin, set calendar] (buoi index 3 = tối, the last buổi: B4L) */
const CAL={buoi:'S.buoi=0',day:'S.buoi=B4L',month:'S.tuan=2;S.buoi=B4L',year:'S.month=12;S.tuan=2;S.buoi=B4L'};
async function stepCase(b,dev,url,seed,name,origin,cal){return play(b,dev,url,seed,async(p,open,pe)=>{await open();
  const r=await p.evaluate(async([origin,cal])=>{__sbr.newLife(origin);await __sbr.settle();eval(cal);used=0;render();await __sbr.settle();
   const k0=__sbr.key();used=BAL.time.khac;document.getElementById('next').disabled=false;document.getElementById('next').click();
   const ok=await __sbr.after(k0);return{k0,shown:__sbr.key(),saved:__sbr.saved(),free:ok,held:typeof SP13!=='undefined'?SP13.L.filter(x=>x.code).length:0}},[origin,cal]);
  r.loaded=await reloadLoad(p,open);r.pass=r.free&&r.shown!==r.k0&&r.loaded===r.shown;r.pe=pe.slice(0,3);if(pe.length)r.pass=false;return r})}
async function newLifeCase(b,dev,url,seed){return play(b,dev,url,seed,async(p,open,pe)=>{await open();
  const r=await p.evaluate(async()=>{__sbr.newLife('thd');await __sbr.settle();const old=S,n0=S.name;die('Bệnh nặng không qua khỏi');
   const sl=t=>new Promise(r=>setTimeout(r,t));let picked=[];
   for(let i=0;i<80&&(S===old||S.dead);i++){if(Q.length){const m=Q[0];const o=m.opts||[];let j=o.findIndex(x=>/kiếp mới|luân hồi|đầu thai/i.test(String(x.n||'')));if(j<0)j=o.findIndex(x=>!x.off);picked.push(String(m.t||'').slice(0,30)+'>'+(o[j]?o[j].n:'close'));try{if(o.length)chooseM(j<0?0:j);else closeModal()}catch(e){Q.shift()}}
    else{const bt=[...document.querySelectorAll('#modal button,#title button[data-new="1"]')].find(x=>__sbr.vis(x)&&/kiếp mới|luân hồi|bắt đầu/i.test(x.textContent));if(bt)bt.click();else break}await sl(300)}
   try{if(typeof nlAccept==='function'&&typeof NLP!=='undefined'&&NLP)nlAccept(false)}catch(e){}const ok=await __sbr.settle();
   return{n0,shown:__sbr.key(),saved:__sbr.saved(),free:ok,newLife:S!==old&&!S.dead,picked:picked.slice(0,4)}});
  r.loaded=await reloadLoad(p,open);r.pass=r.free&&r.newLife&&r.loaded===r.shown;r.pe=pe.slice(0,3);if(pe.length)r.pass=false;return r})}
async function oldSaveCase(b,dev,seed){/* a sổ written by the OLD build (plain JSON, its own jspread rules) → loaded by the NEW build, one step, reload */
 let o;await play(b,dev,OLD,seed,async(p,open)=>{await open();o=await p.evaluate(async()=>{__sbr.newLife('thd');await __sbr.settle();for(let i=0;i<5;i++){used=BAL.time.khac;nextBuoi();await __sbr.settle()}save();
  const L={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);L[k]=localStorage.getItem(k)}return{L,k:__sbr.key()}})});
 return play(b,dev,NEW,seed,async(p,open,pe)=>{await open();await p.evaluate(L=>{localStorage.clear();for(const k in L)localStorage.setItem(k,L[k])},o.L);
  const k1=await reloadLoad(p,open);const r=await p.evaluate(async()=>{await __sbr.settle();used=BAL.time.khac;const k0=__sbr.key();document.getElementById('next').click();const ok=await __sbr.after(k0);return{shown:__sbr.key(),free:ok}});
  r.oldKey=o.k;r.loadedOld=k1;r.loaded=await reloadLoad(p,open);r.pass=k1===o.k&&r.free&&r.loaded===r.shown;r.pe=pe.slice(0,3);if(pe.length)r.pass=false;return r})}
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();const url=srv.url+'/'+NEW;let fail=0;const rows=[];
 const seeds=SEEDS.split(',').map(Number);
 for(const dev of DEVS.split(',')){
  const L=[['buoi','thd',CAL.buoi,seeds[0]],['day','thd',CAL.day,seeds[0]],['month','thd',CAL.month,seeds[0]],...seeds.map(s=>['year','thd',CAL.year,s]),['year-srv','cnv',CAL.year,seeds[0]]];
  for(const [name,origin,cal,seed] of L){const r=await stepCase(b,dev,url,seed,name,origin,cal);rows.push([dev,name,seed,r]);if(!r.pass)fail++;
   console.log(`${r.pass?'PASS':'FAIL'} ${dev} ${name} seed ${seed} · before ${r.k0} · on screen ${r.shown} · sổ ${r.saved} · after reload ${r.loaded}${r.held?` · ${r.held} unseen code card(s) waiting`:''}${r.free?'':' · SCREEN NOT FREE'}${r.pe.length?' · pageerror '+r.pe[0]:''}`)}
  {const r=await newLifeCase(b,dev,url,seeds[0]);rows.push([dev,'newlife',seeds[0],r]);if(!r.pass)fail++;
   console.log(`${r.pass?'PASS':'FAIL'} ${dev} newlife · old ${r.n0} · on screen ${r.shown} · sổ ${r.saved} · after reload ${r.loaded}${r.newLife?'':' · NO NEW LIFE '+JSON.stringify(r.picked)}${r.pe.length?' · pageerror '+r.pe[0]:''}`)}
  if(OLD){const r=await oldSaveCase(b,dev,seeds[0]);rows.push([dev,'oldsave',seeds[0],r]);if(!r.pass)fail++;
   console.log(`${r.pass?'PASS':'FAIL'} ${dev} oldsave · old build ${r.oldKey} · loaded ${r.loadedOld} · on screen ${r.shown} · after reload ${r.loaded}${r.pe.length?' · pageerror '+r.pe[0]:''}`)}}
 console.log(fail?`SAVE-BOUNDARY FAIL ${fail}/${rows.length}`:`SAVE-BOUNDARY PASS ${rows.length}/${rows.length}`);await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
