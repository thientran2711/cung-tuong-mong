/* save-boundary-reload (review/save-year-rollback, LAW 11): a TRUE page reload right after every step where time moves returns the state on screen.
   Robot M2 (25/11, build 0756a05b, Fold): HUD Year 4 / age 23, page reload → «Tiếp tục kiếp này» → Year 3 / age 22 (weeks lost). Cause: jspread held
   the autosave while a CODE card it had moved to a later buổi waited unseen (Tết / stipend month), so the screen showed the new year with no card
   open while the sổ still held the old one.
   For every case: a new life in Sổ 1 (seeded Math.random, same draws on every build), the calendar set just before the boundary, ONE real tap on
   «Sang buổi / Sang ngày mới» (#next), then every card answered like a player (first enabled option / close, scenes and mini-games closed) until the
   screen is free (no card, no scene, no held turn) — the moment the robot reloads. (two taps, see CAL). Then page.reload() → title → «Tiếp tục kiếp này» (Sổ 1) and the
   loaded life must show the same năm / tháng / tuần / buổi / tuổi / name (never an older step).
   Cases: buoi (sáng→trưa), day (tối→sáng, new tuần), month (hạ tuần→tháng mới), year ×SEEDS (tháng chạp→tháng giêng, the robot bug), servant road
   year (cung nữ: srvEndTurn), robot-y3 (the robot's own Year-3 sổ, STEPS_R taps over the new year), day-0s / month-0s / year-0s (reload the instant the calendar flips), newlife (death → Luân hồi → the new life), oldsave (a sổ written by the OLD build loads, plays one step, reloads).
   env SBR_ONLY=year,year-0s (run only these cases), SBR_STEPS / SBR_STEPS_R (taps), SBR_SAVE (robot sổ file), SBR_ACT=1 (an act after each tap)
   usage: node dev/test/save-boundary-reload.js [newPath=index.html] [oldPath] [devices=fold,ipadAir] [seeds=1,2,3]
          (serves the repo root = the BUILT site; oldPath e.g. a copy of origin/main's index.html in the root; no oldPath = oldsave case skipped)
   exit 0 = every case PASS. */
const {chromium}=require('playwright');const D=require('./lib/device');
const [,,NEW='index.html',OLD='',DEVS='fold,ipadAir',SEEDS='1,2,3']=process.argv;
let BASEURL='';const ONLY=(process.env.SBR_ONLY||'').split(',').filter(Boolean);const want=n=>!ONLY.length||ONLY.includes(n);const sleep=t=>new Promise(r=>setTimeout(r,t));
const seedInit=seed=>{let s=(seed*2654435761>>>0)%2147483646+1;Math.random=()=>{s=(s*16807)%2147483647;return (s-1)/2147483646};
 /* j52 rolls a life from crypto: same seed → same life on every build */try{const c=crypto,g=c.getRandomValues.bind(c);let t=seed>>>0||1;c.getRandomValues=a=>{if(a instanceof Uint32Array&&a.length===1){t=(Math.imul(t,1103515245)+12345)>>>0;a[0]=t||1;return a}return g(a)}}catch(e){}};
/* in-page helpers (string, evaluated in the game frame) */
const H=`window.__sbr={
 key(){return S?[S.year,S.month,S.tuan,S.buoi||0,S.age,S.name].join('.'):'none'},
 full(){return this.key()+' k'+used+' b'+S.bac},
 /* while unseen code cards wait and the screen is free she changes something (any act / purchase ends in render() → save()): one bạc
    lands in her purse, the screen repaints — the sổ must show it (bare LIVE: jspread held this save) */
 probe(){const h=typeof SP13!=='undefined'?SP13.L.filter(x=>x.code).length:0;if(!h||this.busy())return '';S.bac+=1;render();const a=this.full(),sv=this.saved();return a===sv?'ok':'≠ sổ '+sv},
 saved(){try{const k='hclh-save-v2-1';const raw=window.slotGet?slotGet(k):localStorage.getItem(k);const d=JSON.parse(raw);return d&&d.S?[d.S.year,d.S.month,d.S.tuan,d.buoi||0,d.S.age,d.S.name].join('.')+' k'+(d.used||0)+' b'+d.S.bac:'none'}catch(e){return 'err'}},
 vis(el){return !!(el&&!el.hidden&&el.getBoundingClientRect().width>0&&getComputedStyle(el).display!=='none')},
 dawn(){const d=document.getElementById('dawn');return !!(d&&!d.hidden&&d.classList.contains('on'))},
 busy(){const M=document.getElementById('modal');return Q.length>0||!!S.mg||this.vis(M)||[...document.querySelectorAll('.kmov:not(.km-out),#kmrew,#kpodov,[id^="kroul"],.kroul-ov')].some(x=>this.vis(x))||this.dawn()||this.vis(document.getElementById('ov'))||this.vis(document.getElementById('kg82'))||(typeof DQ!=='undefined'&&!!DQ.want)||(typeof KMQ!=='undefined'&&KMQ.length>0)},
 why(){const M=document.getElementById('modal');return JSON.stringify({kg:this.vis(document.getElementById('kg82')),nfX:S.nfX&&S.nfX.st,dawn:this.dawn(),Q:Q.map(m=>String(m.t||m.pid).slice(0,24)),mg:!!S.mg,modal:this.vis(M),scene:[...document.querySelectorAll('.kmov:not(.km-out),#kmrew,#kpodov,[id^="kroul"],.kroul-ov')].filter(x=>this.vis(x)).map(x=>x.id||x.className).join(),ov:this.vis(document.getElementById('ov')),dq:typeof DQ!=='undefined'?DQ.want:0,kmq:typeof KMQ!=='undefined'?KMQ.length:0,kb:typeof kmBusy!=='undefined'?kmBusy:0})},
 async after(k0){/* the step may run late (a held turn, the auto-advance timer): wait until the calendar moved, then until the screen is free and stays the same */
  const sl=t=>new Promise(r=>setTimeout(r,t));for(let i=0;i<240&&this.key()===k0;i++){await this.settle1();await sl(250);
   /* the night of the last buổi (jnf) plays its scene and gives back a khắc: a player taps «Sang ngày mới» again */
   if(i%12===11&&!this.busy()&&this.key()===k0){used=BAL.time.khac;const n=document.getElementById('next');n.disabled=false;n.click()}}
  for(let i=0;i<6;i++){const k=this.key();const ok=await this.settle();await sl(1200);if(ok&&this.key()===k&&!this.busy())return true}return false},
 async settle1(){if(!this.busy())return;return this.settle()},
 async settle(){const sl=t=>new Promise(r=>setTimeout(r,t));let free=0;
  for(let i=0;i<400&&!S.dead;i++){
   if(!this.busy()){if(++free>=6)return true;await sl(250);continue}free=0;if(i%20===19)console.log('@@ settle '+i+' '+this.why());
   if(this.dawn()){/* the new-day host (title card / Tuần lục book): close it like a player */const d=document.getElementById('dawn');const bt=[...d.querySelectorAll('button')].filter(x=>this.vis(x));const k=this.dwTry=(this.dwTry||0)+1;
    if(bt.length&&k<8)bt[bt.length-1].click();else{d.classList.remove('on');d.hidden=true;this.dwTry=0}await sl(300);continue}
   {const ro=[...document.querySelectorAll('[id^="kroul"],.kroul-ov')].filter(x=>this.vis(x));if(ro.length){/* the origin roulette of a new life (not under test) */ro.forEach(x=>x.remove());await sl(200);continue}}
   const sc=document.querySelector('.kmov:not(.km-out) button,#kmrew button,#kpodov button');if(sc){sc.click();await sl(250);continue}
   if(this.vis(document.getElementById('kg82'))&&!S.mg){/* the night steal game (jsmg) — not under test: closed; jnf heal() counts it over */const sk=document.querySelector('#kg82skip');if(sk&&this.vis(sk)&&!this.kgT){this.kgT=1;sk.click()}else{this.kgT=0;try{kg82Close(true)}catch(e){document.getElementById('kg82').remove()}try{if(typeof nfHeal==='function')nfHeal();render()}catch(e){}}await sl(300);continue}
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
 await p.waitForTimeout(2500);return p.evaluate(()=>__sbr.full())}
/* the cases: [name, origin, set calendar] (buoi index 3 = tối, the last buổi: B4L) */
/* each case starts ONE buổi before the step under test and taps twice: the first step's waiting cards are still waiting at the boundary (the robot
   bug was a CHAIN: a save inside the step goes through, the saves after it were held while an unseen code card waited) */
const STEPS=+(process.env.SBR_STEPS||3);
const CAL={buoi:'S.buoi=0',day:'S.buoi=B4L-1',month:'S.tuan=2;S.buoi=B4L-1',year:'S.month=12;S.tuan=2;S.buoi=B4L-1'};
async function stepCase(b,dev,url,seed,name,origin,cal){return play(b,dev,url,seed,async(p,open,pe)=>{await open();
  const r=await p.evaluate(async([origin,cal,STEPS,ACT])=>{if(ACT)process={env:{SBR_ACT:1}};else process={env:{}};__sbr.newLife(origin);await __sbr.settle();eval(cal);used=0;render();await __sbr.settle();
   const tap=async()=>{const k=__sbr.key();used=BAL.time.khac;document.getElementById('next').disabled=false;document.getElementById('next').click();return __sbr.after(k)};
   /* (SBR_ACT=1: also one act card after each tap — her acts answer the moved cards sooner, so the hold shows less) STEPS taps: one buổi before the boundary, the boundary, and the buổi after it; after EVERY tap and after one act in each new buổi the sổ
      must equal the screen (a reload at ANY of these moments would load the sổ). The step just after the boundary is the one the robot lost:
      an unseen code card planned at the boundary held every save after it. */
   const act1=async()=>{const u0=used;for(let i=0;i<(deck||[]).length&&used===u0;i++){const a=deck[i];if(!a||a.done)continue;try{act(i)}catch(e){}/* j6 act(i) = a tap on a Hành sự card */if(used!==u0||Q.length){await __sbr.settle();return String(a.n||'').slice(0,24)}}return ''};
   const L=[];let ok=true,k0='',acted='',mis=0,maxHeld=0;
   for(let t=0;t<STEPS&&ok;t++){const kb=__sbr.key();ok=await tap();if(t===0)k0=__sbr.key();const h=typeof SP13!=='undefined'?SP13.L.filter(x=>x.code).length:0;maxHeld=Math.max(maxHeld,h);
    const a1=__sbr.full(),s1=__sbr.saved();if(a1!==s1)mis++;const pr=__sbr.probe();if(pr&&pr!=='ok')mis++;L.push(`tap→${a1}${a1!==s1?' ≠ sổ '+s1:''}${h?' ['+h+' code]':''}${pr?' · +1 bạc '+pr:''}`);
    if(!ok)break;if(process.env.SBR_ACT){const an=await act1();if(an){acted+=(acted?', ':'')+an;const a2=__sbr.full(),s2=__sbr.saved();if(a2!==s2)mis++;L.push(`act «${an}»→${a2}${a2!==s2?' ≠ sổ '+s2:''}`)}}}
   ok=ok&&await __sbr.settle();return{k0,acted,mis,maxHeld,log:L,shown:__sbr.full(),saved:__sbr.saved(),free:ok,held:typeof SP13!=='undefined'?SP13.L.filter(x=>x.code).length:0}},[origin,cal,STEPS,process.env.SBR_ACT||'']);
  r.loaded=await reloadLoad(p,open);r.pass=r.free&&!r.mis&&r.loaded===r.shown;r.pe=pe.slice(0,3);if(pe.length)r.pass=false;return r})}
/* the robot's own sổ (M2, Year 3 tháng chạp hạ tuần buổi tối, dev/handover/robot/m2/saveloss/save_after_rollback.json on the handover branch):
   loaded through the title, then STEPS_R taps across the new year, the sổ checked against the screen after each one */
const RSAVE=process.env.SBR_SAVE||'';const STEPS_R=+(process.env.SBR_STEPS_R||5);
function robotSave(){const fs=require('fs');if(RSAVE)return fs.readFileSync(RSAVE,'utf8');
 try{return require('child_process').execSync('git show origin/claude/cung-tuong-mong-handover-hj0h8w:dev/handover/robot/m2/saveloss/save_after_rollback.json',{cwd:__dirname,maxBuffer:1<<26}).toString()}catch(e){return ''}}
async function robotCase(b,dev,url,seed,raw){const D0=JSON.parse(raw);const s1=(D0.saves||[]).find(x=>x[0]==='hclh-save-v2-1');if(!s1)return{pass:false,err:'no Sổ 1 in the robot save',pe:[]};
 return play(b,dev,url,seed,async(p,open,pe)=>{await open();await p.evaluate(v=>{localStorage.clear();localStorage.setItem('hclh-save-v2-1',v);localStorage.setItem('hclh-slot','1')},s1[1]);
  const k1=await reloadLoad(p,open);
  const r=await p.evaluate(async N=>{await __sbr.settle();const L=[];let mis=0,maxHeld=0,ok=true;
   for(let t=0;t<N&&ok;t++){const k=__sbr.key();used=BAL.time.khac;const n=document.getElementById('next');n.disabled=false;n.click();ok=await __sbr.after(k);
    const h=typeof SP13!=='undefined'?SP13.L.filter(x=>x.code).length:0;maxHeld=Math.max(maxHeld,h);const a=__sbr.full(),sv=__sbr.saved();if(a!==sv)mis++;const pr=__sbr.probe();if(pr&&pr!=='ok')mis++;L.push(`tap→${a}${a!==sv?' ≠ sổ '+sv:''}${h?' ['+h+' code]':''}${pr?' · +1 bạc '+pr:''}`)}
   return{mis,maxHeld,log:L,shown:__sbr.full(),free:ok}},STEPS_R);
  r.k0=k1;r.loaded=await reloadLoad(p,open);r.pass=r.free&&!r.mis&&r.loaded===r.shown;r.pe=pe.slice(0,3);if(pe.length)r.pass=false;return r})}
/* 0 s cases (robot M4, MAIN 140 ~12:00Z: a reload 0 s after the year flip lost the buổi + the year-end stipend): the tap before the boundary
   settles as usual, then ONE tap on the boundary and the page is reloaded the moment the calendar changes (polled every 20 ms, nothing answered,
   no wait): the sổ must already hold the new buổi (same date / age / name; bạc printed). */
async function zeroCase(b,dev,url,seed,origin,cal){return play(b,dev,url,seed,async(p,open,pe)=>{await open();
  const r=await p.evaluate(async([origin,cal])=>{__sbr.newLife(origin);await __sbr.settle();eval(cal);used=0;render();await __sbr.settle();
   const tapW=async()=>{const k=__sbr.key();used=BAL.time.khac;const n=document.getElementById('next');n.disabled=false;n.click();return __sbr.after(k)};
   const ok=await tapW();const k0=__sbr.key();used=BAL.time.khac;const n=document.getElementById('next');n.disabled=false;n.click();
   /* she keeps answering what the step shows (night scene, cards) in the background; the reload happens the moment the date changes */
   __sbr.after(k0);const sl=t=>new Promise(r=>setTimeout(r,t));let i=0;for(;i<3000&&__sbr.key()===k0;i++)await sl(20);
   return{ok,k0,ms:i*20,shown:__sbr.full(),key:__sbr.key(),saved:__sbr.saved()}},[origin,cal]);
  r.loaded=await reloadLoad(p,open);r.pass=r.ok&&r.key!==r.k0&&r.loaded.startsWith(r.key+' ');r.pe=pe.slice(0,3);if(pe.length)r.pass=false;return r})}
async function newLifeCase(b,dev,url,seed){return play(b,dev,url,seed,async(p,open,pe)=>{await open();
  const r=await p.evaluate(async()=>{__sbr.newLife('thd');await __sbr.settle();const old=S,n0=S.name;die('Bệnh nặng không qua khỏi');
   const sl=t=>new Promise(r=>setTimeout(r,t));let picked=[];
   for(let i=0;i<80&&(S===old||S.dead);i++){if(Q.length){const m=Q[0];const o=m.opts||[];let j=o.findIndex(x=>/kiếp mới|luân hồi|đầu thai/i.test(String(x.n||'')));if(j<0)j=o.findIndex(x=>!x.off);picked.push(String(m.t||'').slice(0,30)+'>'+(o[j]?o[j].n:'close'));try{if(o.length)chooseM(j<0?0:j);else closeModal()}catch(e){Q.shift()}}
    else{const bt=[...document.querySelectorAll('#modal button,#title button[data-new="1"]')].find(x=>__sbr.vis(x)&&/kiếp mới|luân hồi|bắt đầu/i.test(x.textContent));if(bt)bt.click();else break}await sl(300)}
   try{if(typeof nlAccept==='function'&&typeof NLP!=='undefined'&&NLP)nlAccept(false)}catch(e){}const ok=await __sbr.settle();
   return{n0,shown:__sbr.full(),saved:__sbr.saved(),free:ok,newLife:S!==old&&!S.dead,picked:picked.slice(0,4)}});
  r.loaded=await reloadLoad(p,open);r.pass=r.free&&r.newLife&&r.loaded===r.shown;r.pe=pe.slice(0,3);if(pe.length)r.pass=false;return r})}
async function oldSaveCase(b,dev,seed){/* a sổ written by the OLD build (plain JSON, its own jspread rules) → loaded by the NEW build, one step, reload */
 let o;await play(b,dev,BASEURL+OLD,seed,async(p,open)=>{await open();o=await p.evaluate(async()=>{__sbr.newLife('thd');await __sbr.settle();for(let i=0;i<5;i++){used=BAL.time.khac;nextBuoi();await __sbr.settle()}save();
  const L={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);L[k]=localStorage.getItem(k)}return{L,k:__sbr.key()}})});
 return play(b,dev,BASEURL+NEW,seed,async(p,open,pe)=>{await open();await p.evaluate(L=>{localStorage.clear();for(const k in L)localStorage.setItem(k,L[k])},o.L);
  const k1=await reloadLoad(p,open);const r=await p.evaluate(async()=>{await __sbr.settle();used=BAL.time.khac;const k0=__sbr.key();document.getElementById('next').click();const ok=await __sbr.after(k0);return{shown:__sbr.full(),free:ok}});
  r.oldKey=o.k;r.loadedOld=k1;r.loaded=await reloadLoad(p,open);r.pass=k1.startsWith(o.k+' ')&&r.free&&r.loaded===r.shown;r.pe=pe.slice(0,3);if(pe.length)r.pass=false;return r})}
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();BASEURL=srv.url;const url=srv.url+NEW;let fail=0;const rows=[];
 const seeds=SEEDS.split(',').map(Number);
 for(const dev of DEVS.split(',')){
  const L=[['buoi','thd',CAL.buoi,seeds[0]],['day','thd',CAL.day,seeds[0]],['month','thd',CAL.month,seeds[0]],...seeds.map(s=>['year','thd',CAL.year,s]),['year-srv','cnv',CAL.year,seeds[0]]];
  for(const [name,origin,cal,seed] of L){if(!want(name))continue;const r=await stepCase(b,dev,url,seed,name,origin,cal);rows.push([dev,name,seed,r]);if(!r.pass)fail++;
   console.log(`${r.pass?'PASS':'FAIL'} ${dev} ${name} seed ${seed} · ${r.mis} moment(s) sổ ≠ screen (max ${r.maxHeld} unseen code cards) · end on screen ${r.shown} · after reload ${r.loaded}`+('\n    '+r.log.join('\n    '))+`${r.free?'':' · SCREEN NOT FREE'}${r.pe.length?' · pageerror '+r.pe[0]:''}`)}
  for(const [name,cal] of [['day-0s',CAL.day],['month-0s',CAL.month],['year-0s',CAL.year]]){if(!want(name))continue;const r=await zeroCase(b,dev,url,seeds[0],'thd',cal);rows.push([dev,name,seeds[0],r]);if(!r.pass)fail++;
   console.log(`${r.pass?'PASS':'FAIL'} ${dev} ${name} seed ${seeds[0]} · before ${r.k0} · flip seen after ${r.ms} ms: screen ${r.shown} · sổ at that moment ${r.saved} · reload at once → ${r.loaded}${r.pe.length?' · pageerror '+r.pe[0]:''}`)}
  if(want('robot-y3')){const raw=robotSave();if(raw){const r=await robotCase(b,dev,url,seeds[0],raw);rows.push([dev,'robot-y3',seeds[0],r]);if(!r.pass)fail++;
    console.log(`${r.pass?'PASS':'FAIL'} ${dev} robot-y3 (M2 sổ) · loaded ${r.k0} · ${r.mis} moment(s) sổ ≠ screen (max ${r.maxHeld} unseen code cards) · end on screen ${r.shown} · after reload ${r.loaded}`+('\n    '+(r.log||[]).join('\n    '))+(r.err?' · '+r.err:'')+(r.pe&&r.pe.length?' · pageerror '+r.pe[0]:''))}
   else console.log('SKIP robot-y3: no robot save (set SBR_SAVE=<save_after_rollback.json>)')}
  if(want('newlife')){const r=await newLifeCase(b,dev,url,seeds[0]);rows.push([dev,'newlife',seeds[0],r]);if(!r.pass)fail++;
   console.log(`${r.pass?'PASS':'FAIL'} ${dev} newlife · old ${r.n0} · on screen ${r.shown} · sổ ${r.saved} · after reload ${r.loaded}${r.newLife?'':' · NO NEW LIFE '+JSON.stringify(r.picked)}${r.pe.length?' · pageerror '+r.pe[0]:''}`)}
  if(OLD&&want('oldsave')){const r=await oldSaveCase(b,dev,seeds[0]);rows.push([dev,'oldsave',seeds[0],r]);if(!r.pass)fail++;
   console.log(`${r.pass?'PASS':'FAIL'} ${dev} oldsave · old build ${r.oldKey} · loaded ${r.loadedOld} · on screen ${r.shown} · after reload ${r.loaded}${r.pe.length?' · pageerror '+r.pe[0]:''}`)}}
 console.log(fail?`SAVE-BOUNDARY FAIL ${fail}/${rows.length}`:`SAVE-BOUNDARY PASS ${rows.length}/${rows.length}`);await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
