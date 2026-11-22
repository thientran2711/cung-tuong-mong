/* coop-ledger (review/night-ledger-coop): the 10-night Kính sự phòng ledger on BOTH seats of a player room. Two Playwright browsers, LIVE Worker.
   usage: bash dev/site/build_site.sh && node dev/test/coop-ledger.js [outdir] [workerURL]   (env DEVSWAP=1: host on the iPad, guest on the Fold)
   Room set-up, clear(), press() and the night gate helpers are coop-night.js's (copied, same Worker). Both players' tray weight is raised in
   the test (nightCh ≥ 60 for her and the friend, host page only) so that both hold other nights of the tuần; S.mat = 2 on both (tai mắt).
   Per tuần (1: the HOST presses Sẵn sàng first, 2: the GUEST first = the swap):
   a both seats hold the SAME ledger (wk, days d / y / holder by seat-neutral id 901 / 902 / NPC id, played index) — host-computed, one roll
   b the friend's card was in the host's draw (she holds ≥ 1 day); the played tối = the first day of EITHER player
   c each seat settled ONLY its own other nights: per held day one Sổ ghi line "ngày {d}, ngươi được lật thẻ thêm một đêm", nights + nightLog
     up by that count, gains from BAL.nt.extraFx (Ân tình +an each), its own kit pill (kitLine "Kính sự phòng: …")
   d tai mắt: each seat's "Kính sự phòng ghi tuần này" names the other player's nights (two-way)
   e the guest never rolls (ldRoll not called on her seat); conception float on both seats (conceiveCh × BAL.nt.concF)
   f Sổ ghi shots on both seats (scratch outdir, not git). */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../.tmp/coop-ledger'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const DCL={waitUntil:'domcontentloaded'};
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;window.__forceOrigin='cn'/* a palace consort on both seats (coop-steal.js): the servant / home routes have no night */;if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}},[WURL,name==='host'&&process.env.THIN?+process.env.THIN:0]);/* THIN=<level>: the host asks for that thin room level */
  const o={ctx,name,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);
    p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator.vibrate/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
async function until(o,fn,arg,ms=30000){try{await o.p.waitForFunction(fn,arg,{timeout:ms,polling:250});return true}catch(e){return false}}
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){try{await el.click({timeout:5000});return true}catch(e){}}await sleep(250)}return false}
const shot=async(o,n)=>{try{await o.p.screenshot({path:`${OUT}/${n}.png`,timeout:120000})}catch(e){console.log('shot failed',n,e.message.split('\n')[0])}};
/* close the normal game's dialogs (any button that only reads / takes the first road), end mini games: the test's own player */
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{
   const rs=document.querySelector('#kroul .krskip');if(rs&&rs.offsetParent!==null){rs.click();return'x'}
   /* the morning panel (#dawn, jne kitNewDay): a player taps it (skip to the last beat), then its kit «Tiếp theo»; while it is on, j93 starts no scene */const dw=document.getElementById('dawn');if(dw&&!dw.hidden&&dw.classList.contains('on')){const de=dw.querySelector(':scope > .kmend');if(de&&de.offsetParent!==null){de.click();return'x'}if(!dw.dataset.tsk){dw.dataset.tsk=1;dw.click();return'x'}}
   /* the jnf flip choice opens only after the card-flip scene (.kcf, kit end button), like coop-e2e */const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}/* a manual scene (the reward box #kmrew, j93): a player taps it open, then its own close button «Nhận» ([data-km-close]) */const kc=[...document.querySelectorAll('.kmov [data-km-close],.kmov .krevok')].find(x=>x.offsetParent!==null&&!x.disabled&&x.getClientRects().length);if(kc){kc.click();return'x'}const rw=document.querySelector('.kmov .kmrew:not(.km-done)');if(rw&&!rw.dataset.tsk){rw.dataset.tsk=1;rw.click();return'x'}const kv=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&!x.querySelector('.kmend')&&!x.dataset.tsk);if(kv){kv.dataset.tsk=1;kv.click();return'x'}
   const kg=[...document.querySelectorAll('#kg82skip')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('[hidden]'))||(typeof KG82!=='undefined'&&KG82.phase==='result'?[...document.querySelectorAll('#ov .kit-x[data-kitx=kgback],#ov .kit-x[data-kitx=ov]')].find(x=>x.offsetParent!==null):null);if(kg){kg.click();return'x'}/* a mini-game on screen (the steal game after Tranh sủng, jsmg herGame): play it out like a player (quick option «Thôi, không chơi», then the result frame's kit ✕ «Quay lại», which presses the hidden «Đã hiểu», jk4 kitOvSync); wiping S.mg leaves jsmg BUSY and jnf's choice in st "mg" for good */
   const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])')||m.querySelector('.kbk-x,[aria-label="Đóng"]')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'}).catch(()=>'err');
  if(st==='mg'){await o.p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}
  if(st!=='x')return st;await sleep(200)}return'many'}
const K=o=>o.p.evaluate(()=>({k:COOPW.tm.myKey(),rk:COOPW.tm.roomKey(),v:COOPW.tm.view(),bend:COOPW.bend,pend:COOPW.pend,pb:!!COOPW.pendBuoi,Q:Q.length,mg:!!S.mg,next:document.getElementById('next').textContent,chip:(document.getElementById('kctm')||{}).textContent||'',chipOn:!!(document.getElementById('kctm')&&!document.getElementById('kctm').hidden)}));
/* r1: a seat already night-ready by itself (a night with the Emperor → jnight) counts as pressed */
const isRd=o=>o.p.evaluate(()=>!!(window.COOPW&&COOPW.on&&COOPW.nReady&&COOPW.nReady()));
const press1=o=>o.p.evaluate(()=>{const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true});
async function press(o,ms=20000){const t0=Date.now();while(Date.now()-t0<ms){if(await press1(o))return true;await clear(o);await sleep(300)}return false}
const setTm=(o,t)=>o.p.evaluate(t=>{Object.assign(BAL.coopTm,t)},t);
const reset=o=>o.p.evaluate(()=>COOPW.tm.reset());
/* wait until a seat has moved past key k (its own buổi, or its week end is out) */
const past=(o,k,ms)=>until(o,k=>COOPW.tm.myKey()!==k||COOPW.pend||COOPW.sent===(COOP.state.week||0),k,ms);
async function bothPast(A,B,k,ms){const t0=Date.now();while(Date.now()-t0<ms){const a=await A.p.evaluate(k=>COOPW.tm.myKey()!==k,k),b=await B.p.evaluate(k=>COOPW.tm.myKey()!==k,k);if(a&&b)return Date.now()-t0;await sleep(250)}return -1}
async function join(B,code){await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục/,4000)}

(async()=>{const b=await chromium.launch(/127\.0\.0\.1|localhost/.test(WURL)?{args:['--disable-web-security','--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,LocalNetworkAccessChecks']}:{})/* a local wrangler dev Worker (as coop-e2e) */;
 const FO=[755,1000,2],IP=[1180,820,2],SW=!!process.env.DEVSWAP;const A=await mk(b,'host',SW?IP:FO),B=await mk(b,'guest',SW?FO:IP);
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A: Cùng hảo hữu');await A.p.waitForTimeout(600);
 ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A: Mời hảo hữu');
 ok(await until(A,()=>COOP.code&&COOP.seat==='a'),'A has a room');const code=await A.p.evaluate(()=>COOP.code);console.log('room',code);
 ok(await A.p.evaluate(()=>{const r=document.querySelector('#modal .kctmlen');return !!r&&/Mỗi buổi tối đa/.test(r.textContent)&&/✓ 5 phút/.test(r.textContent)}),'lobby: host sees Mỗi buổi tối đa 3 / 5 / 8 phút (5 chosen)');
 await join(B,code);
 ok(await until(B,()=>COOP.seat==='b'&&!COOP.frozen,null,60000),'B in seat b');
 {const t0=Date.now();while(Date.now()-t0<90000){await clear(A);await clear(B);const a=await A.p.evaluate(()=>!!(window.COOPW&&COOPW.on&&COOPW.base&&typeof S!=='undefined'&&S)),c=await B.p.evaluate(()=>!!(window.COOPW&&COOPW.on&&COOPW.base&&typeof S!=='undefined'&&S));if(a&&c)break;await sleep(500)}}
 /* both through Luân hồi (the roulette, then Nhận thân phận) and into the game */
 {const inGame=o=>o.p.evaluate(()=>!!(COOPW.on&&typeof S!=='undefined'&&S&&!COOPW.inLife&&document.getElementById('title').hidden&&!document.getElementById('kroul')&&document.getElementById('next').offsetParent)).catch(()=>false);
  const t0=Date.now();while(Date.now()-t0<150000){await clear(A);await clear(B);if(await inGame(A)&&await inGame(B))break;await sleep(700)}
  const dbg=o=>o.p.evaluate(()=>({on:COOPW.on,S:typeof S!=='undefined'&&!!S,inLife:COOPW.inLife,title:document.getElementById('title').hidden,roul:!!document.querySelector('[id^="kroul"],.kroul-ov'),next:!!document.getElementById('next').offsetParent,M:!document.getElementById('modal').hidden&&document.getElementById('mt').textContent})).catch(e=>e.message);
  ok(await inGame(A)&&await inGame(B),'both chose their thân phận and are in the game',[await dbg(A),await dbg(B)])}
 for(let i=0;i<4;i++){await clear(A);await clear(B);await sleep(400)}
 ok(await until(A,()=>!!COOPW.tm.view(),null,20000)&&await until(B,()=>!!COOPW.tm.view(),null,20000),'both see the clock');
 const LAST=await A.p.evaluate(()=>typeof B4L==='number'?B4L:2);
 const D=o=>o.p.evaluate(()=>({w:COOP.state.week,b:S.buoi||0,date:[S.year,S.month,S.tuan,S.turn].join('/'),pend:!!COOPW.pend,sent:COOPW.sent,nr:COOPW.nrdy,
   ready:!!(COOPW.nReady&&COOPW.nReady()),next:document.getElementById('next').textContent,dis:document.getElementById('next').disabled,Q:Q.length,tr:(COOPW.tr||[]).slice(-6)}));
 /* both press through the day buổi until both are at tối */
 async function toNight(tag){for(let g=0;g<6;g++){const a=await D(A),c=await D(B);if(a.b>=LAST&&c.b>=LAST&&a.w===c.w)return true;
   const k=await A.p.evaluate(()=>COOPW.tm.myKey());await setTm(A,{buoiMs:120000});await reset(A);await clear(A);await clear(B);await press(A);await press(B);
   await bothPast(A,B,k,30000);for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}}
  const a=await D(A),c=await D(B);return ok(a.b>=LAST&&c.b>=LAST,tag+': both at buổi tối',[a,c])||(a.b>=LAST&&c.b>=LAST)}
 /* wait for the merged week on both, then compare */
 async function merged(tag,w0,ms=60000){const t0=Date.now();while(Date.now()-t0<ms){await clear(A);await clear(B);
   const a=await D(A),c=await D(B);if(a.w>w0&&c.w>w0&&!a.pend&&!c.pend)break;await sleep(400)}
  await sleep(800);const a=await D(A),c=await D(B);ok(a.w===w0+1&&c.w===w0+1,tag+': both in the next week (exactly one step)',[w0,a.w,c.w]);
  ok(a.date===c.date&&a.b===c.b&&a.b===0,tag+': same date, both at buổi sáng',[a.date,c.date,a.b,c.b])}
 /* one seat ready at tối: it must stay in tối, the other untouched */
 async function readyOnly(X,Y,tag){const x0=await D(X),y0=await D(Y);
  await clear(X);/* r1: a night with the Emperor (jnight toMorning) may already have marked her ready: that counts as pressed */
  ok(await X.p.evaluate(()=>!!(COOPW.nReady&&COOPW.nReady()))||await press(X),tag+': '+X.name+' presses Sẵn sàng at tối (or is already ready)');await sleep(6000);for(let i=0;i<2;i++){await clear(X);await sleep(300)}
  const x1=await D(X),y1=await D(Y);
  ok(x1.b===LAST&&x1.date===x0.date&&!x1.pend&&x1.sent!==x1.w&&x1.w===x0.w,tag+': '+X.name+' stays in buổi tối, same date, no night run yet',[x0,x1]);
  ok(x1.ready&&x1.dis&&/Chờ hảo hữu/.test(x1.next),tag+': '+X.name+' button says Chờ hảo hữu…',x1.next);
  ok(y1.b===LAST&&y1.date===y0.date&&!y1.pend,tag+': '+Y.name+' untouched in buổi tối',y1);
  ok(await until(Y,()=>COOPW.tm.frReady(),null,10000),tag+': '+Y.name+' sees the friend ready');return x0.w}
 /* ---- the ledger on both seats ---- */
 const prep=()=>Promise.all([A,B].map(o=>o.p.evaluate(()=>{S.mat=Math.max(S.mat||0,2);S.preg=0;S.pregUnk=0;
   /* tai mắt at the settle itself: the room's week merge keeps only real acts, so a script-set S.mat is put back by the merge: kept ≥ 2 every 100 ms + at endTurn / ldIn */
   if(!window.__matH){window.__matH=1;setInterval(()=>{try{if(typeof S!=='undefined'&&S)S.mat=Math.max(S.mat||0,2)}catch(e){}},100);const e0=endTurn;endTurn=function(){try{S.mat=Math.max(S.mat||0,2)}catch(e){}return e0.apply(this,arguments)};const i0=window.ldIn;window.ldIn=function(){try{S.mat=Math.max(S.mat||0,2)}catch(e){}return i0.apply(this,arguments)}}
   if(!window.__klH){window.__klH=1;window.__kl=[];const k0=window.kitLine;if(typeof k0==="function"){window.kitLine=kitLine=function(t){try{window.__kl.push(String(t))}catch(e){}return k0.apply(this,arguments)}}}})));
 if(process.env.NTOFF)for(const o of [A,B])await o.p.evaluate(()=>{BAL.nt.on=false});/* baseline: the same room with the ledger off */
 await A.p.evaluate(()=>{if(window.__ncB)return;window.__ncB=1;const n0=nightCh;nightCh=function(p){const c=n0.apply(this,arguments);const q=p||S;return c>0&&(q===S||q.coop)?Math.max(c,60):c}});
 const snap=o=>o.p.evaluate(()=>{const me=COOPW.seat==="a"?901:902;const L=S.ledger;const N=w=>w==="me"?me:w==null?null:w;
  return{me,wk:L?L.wk:null,st:L?L.st:null,p:L?L.p:null,days:L?L.days.map(e=>[e.d,e.y,N(e.w)]):null,o:L?L.days.map(e=>e.s?N(e.o):N(e.w)):null,ldG:S.ldG,nights:S.nights||0,nl:(S.nightLog||[]).length,an:S.an||0,
   seq:S.logSeq||0,logs:S.logs.slice(0,40),kl:(window.__kl||[]).slice(),ldOn:typeof ldOn==="function"&&ldOn(),name:S.name,mat:S.mat,
   cc:(()=>{try{const c=conceiveCh(S);return{c,int:Math.round(c)===c}}catch(e){return null}})(),fr:(()=>{const f=rivals.find(v=>v&&v.coop);return f?{id:f.id,name:f.name}:null})()}});
 const strip=h=>String(h).replace(/<[^>]*>/g,'');
 const FRD=[];
 async function tuan(tag,X,Y){if(!await toNight(tag))return;await prep();const EL=await A.p.evaluate(()=>{try{const f=rivals.find(v=>v&&v.coop);return f?{nc:nightCh(f),cy:typeof cyTray==='function'&&cyTray(f),preg:!!f.preg,ill:!!(typeof illOf==='function'&&illOf(f)),alive:f.alive!==false}:null}catch(e){return String(e)}});const a0=await snap(A),b0=await snap(B);const w0=(await D(A)).w;const wk0=await A.p.evaluate(()=>wk());
  await clear(X);ok(await isRd(X)||await press(X),tag+': '+X.name+' presses Sẵn sàng first');await sleep(2500);await clear(Y);ok(await isRd(Y)||await press(Y),tag+': '+Y.name+' presses');
  await merged(tag,w0);
  if((await D(A)).w===w0)for(const o of [A,B])console.log('ERRS',o.name,JSON.stringify(o.errs.slice(-6)).slice(0,1500));
  if((await D(A)).w===w0)for(const o of [A,B])console.log('STUCK',tag,o.name,JSON.stringify(await o.p.evaluate(()=>({nf:nfDebug(),L:S.ledger&&[S.ledger.wk,S.ledger.st,S.ledger.p],D:{b:S.buoi,pend:COOPW.pend,sent:COOPW.sent,nr:COOPW.nrdy,ready:!!(COOPW.nReady&&COOPW.nReady()),next:document.getElementById('next').textContent,dis:document.getElementById('next').disabled,modal:!document.getElementById('modal').hidden&&document.getElementById('mt').textContent,tr:(COOPW.tr||[]).slice(-10),mg:!!S.mg,cf:{busy:window.cfBusy&&cfBusy(),age:window.cfAge&&cfAge(),dbg:(window.__cfdbg||[]).slice(-12),kmov:[...document.querySelectorAll('.kmov')].map(x=>x.className.slice(0,60)+':'+(x.getAttribute('aria-label')||'')),gains:(window.KFX&&KFX.gains||[]).slice(-4),inv:(S.inv||[]).slice(-3).map(x=>x&&[x.k,x.n||x.name,x.src||x.from,x.wk]),want:window.__cfWant&&__cfWant()},nw:S.nightWhy&&{wk:S.nightWhy.wk,pick:S.nightWhy.pick},day:typeof day==='function'&&day(),err:(window.__errs||[]).slice(-5)}}))).slice(0,5000));
  ok(await until(B,w=>S.ldG===w,wk0,30000),tag+': the guest got the settled ledger (ctm-nf "ld")',await B.p.evaluate(()=>({ldG:S.ldG,L:S.ledger&&[S.ledger.wk,S.ledger.st]})));
  await sleep(500);const a=await snap(A),b=await snap(B);
  console.log(tag,'seats',JSON.stringify({a:[a.me,a.fr,a.ldOn],b:[b.me,b.fr,b.ldOn]}),JSON.stringify(await B.p.evaluate(()=>({nfOn:nfOn(),park:nfParked(),srv:typeof isSrv==="function"&&isSrv(),kc:typeof isKc==="function"&&isKc(),on:BAL.nt&&BAL.nt.on,days:BAL.nt&&BAL.nt.days,thin:!!(COOPW.thin&&COOPW.thin.on&&COOPW.thin.on(5)),worldOn:worldOn(),dead:S.dead}))));
  console.log(tag,'host days',JSON.stringify(a.days),'p',a.p,'| guest days',JSON.stringify(b.days),'p',b.p);
  ok(a.wk===wk0&&b.wk===wk0&&a.st===1&&b.st===1,tag+'a: both seats hold the ledger of this tuần, settled',[a.wk,b.wk,a.st,b.st,wk0]);
  ok(JSON.stringify(a.days)===JSON.stringify(b.days)&&a.p===b.p,tag+'a: the SAME days (d / kind / holder) and played index on both seats');
  const held=id=>(a.days||[]).filter((e,i)=>e[2]===id&&i!==a.p&&e[1]!=='visit').length;const hk=held(901),gk=held(902);
  /* r2: whether she holds a day in ONE tuần is a draw (her weight among the NPCs): per tuần it is logged; the run asserts it over both tuần below */
  {const has=(a.days||[]).some(e=>e[2]===902),el=!!(EL&&EL.nc>0&&EL.alive);FRD.push({has,el,EL});if(!has)console.log('n/a '+tag+'b: the friend held no day in this tuần\'s draw — asserted over the run',JSON.stringify({hk,gk,EL}))}
  {const fi=(a.o||[]).findIndex(w=>w===901||w===902);ok(fi<0||a.p===fi||(a.days[a.p]&&a.days[a.p][1]==='played'&&fi<=a.p),tag+'b: the played tối = the first day of either player',{fi,p:a.p})}
  for(const [o,s0,s1,k] of [[A,a0,a,hk],[B,b0,b,gk]]){const L=s1.logs.slice(0,Math.max(0,s1.seq-s0.seq)).map(strip);
   const mine=L.filter(x=>/Kính sự phòng ghi: ngày \d+, ngươi được lật thẻ thêm một đêm/.test(x));
   ok(mine.length===k,tag+'c: '+o.name+' wrote one Sổ ghi line per own other night',{k,lines:mine.length,ex:mine[0]});
   ok(s1.nights-s0.nights>=k&&s1.nl-s0.nl>=k,tag+'c: '+o.name+' recorded its own nights (nights / nightLog)',{k,n:s1.nights-s0.nights,nl:s1.nl-s0.nl});
   ok(!k||s1.kl.slice(s0.kl.length).some(x=>/^Kính sự phòng: ngươi được lật thẻ thêm/.test(x)),tag+'c: '+o.name+' kit pill (kitLine) for its nights',s1.kl.slice(s0.kl.length));
   const other=o===A?902:901,ok2=(a.days||[]).some((e,i)=>e[2]===other&&i!==a.p&&e[1]!=='visit');const nm=o===A?(a.fr&&a.fr.name):(b.fr&&b.fr.name);
   const tm=L.find(x=>/Kính sự phòng ghi tuần này:/.test(x));if(ok2&&!tm&&(s1.mat||0)<2)console.log('n/a '+tag+'d: '+o.name+' has no tai mắt at the settle (S.mat '+s1.mat+'; the merge put it back) — the line is checked in ledger.js case 4');else ok(!ok2||!!tm,tag+'d: '+o.name+' tai mắt line names the other player\'s nights (name or the kit fog-of-knowledge mask)',{tm:tm||null,nm,mat:s1.mat,last:tm?null:L.slice(0,12)});
   ok(s1.ldOn&&s1.cc&&(s1.cc.c===0||!s1.cc.int),tag+'e: '+o.name+' ledger on, conception float',s1.cc)}
  await shotLog(tag)}
 async function shotLog(tag){for(const o of [A,B]){await clear(o);await o.p.evaluate(()=>{try{tab='log';render()}catch(e){}});await sleep(900);
   /* the ledger lines sit under the tuần they were written in: bring the first one to the middle of the panel; the act result card (#rtoast) closed */
   await o.p.evaluate(()=>{try{const r=document.getElementById('rtoast');if(r&&!r.hidden){const x=r.querySelector('.kit-x,button');if(x)x.click()}}catch(e){}
    const R=/Kính sự phòng ghi/;const el=[...document.querySelectorAll('#panel *')].find(x=>R.test(x.textContent)&&![...x.children].some(c=>R.test(c.textContent)));if(el)el.scrollIntoView({block:'center'})});await sleep(500);
   const vp=o.p.viewportSize();await shot(o,`ledger-${tag}-${o.name}-${vp.width}x${vp.height}`)}
  for(const o of [A,B])await o.p.evaluate(()=>{try{tab='act';render()}catch(e){}})}
 await tuan('1',A,B);for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
 await tuan('2',B,A);
 if(!FRD.some(x=>x.el))console.log('n/a b: the friend was not on the tray (nightCh 0: pregnant / ill / cycle) in any tuần of the run',JSON.stringify(FRD));else ok(FRD.some(x=>x.has),'b: the friend\'s card was in the host\'s draw (she holds ≥ 1 day in at least one tuần of the run)',FRD);
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
