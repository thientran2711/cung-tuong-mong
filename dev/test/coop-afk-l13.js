/* Co-op AFK at the week end (review/coop-afk-l13, Foreman B brief b-coop-afk-l13.md; found by reports/coop-night-wk6.md «## OPEN» 1).
   usage: python3 dev/build/assemble.py && THIN=13 node dev/test/coop-afk-l13.js [outdir] [workerURL]
   env: THIN=13|0 (room level), AFK=g|h (the seat that goes AFK: guest / host), COOP_SWAP=1 (iPad hosts, Fold joins), NAFMS (bound for the run, ms).
   The AFK seat presses Sẵn sàng at tối, then puts the phone down. Her week end queues a real two-road choice (pid card «afkT») and a notice.
   At level 13 her week end runs on the host (part G) and his `end` waits on her open cards (CW.gHold); before the fix nothing bounded that
   wait (jcooptimer nightAfk armed only while HER buổi ≥ tối) → the room never stepped. The ONE AFK bound (BAL.coopTm.nightMs) must cover it:
   the room steps within nightMs + margin, her choice is CARRIED (kept on her seat, never made for her) and she answers it on her return, once. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../.tmp/coop-afk-l13'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const DCL={waitUntil:'domcontentloaded'};
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}},[WURL,name==='host'&&process.env.THIN?+process.env.THIN:0]);/* THIN=<level>: the host asks for that thin room level */
  const o={ctx,name,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);
    p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator.vibrate/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
async function until(o,fn,arg,ms=30000){try{await o.p.waitForFunction(fn,arg,{timeout:ms,polling:250});return true}catch(e){return false}}
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){try{await el.click({timeout:5000});return true}catch(e){}}await sleep(250)}return false}
const shot=async(o,n)=>{try{await o.p.screenshot({path:`${OUT}/${n}.png`,timeout:120000})}catch(e){console.log('shot failed',n,e.message.split('\n')[0])}};
/* close the normal game's dialogs (any button that only reads / takes the first road), end mini games: the test's own player */
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await require('./lib/coop-clear.js').first(o,()=>{
   
   /* the morning panel (#dawn, jne kitNewDay): a player taps it (skip to the last beat), then its kit «Tiếp theo»; while it is on, j93 starts no scene */const dw=document.getElementById('dawn');if(dw&&!dw.hidden&&dw.classList.contains('on')){const de=dw.querySelector(':scope > .kmend');if(de&&de.offsetParent!==null){de.click();return'x'}if(!dw.dataset.tsk){dw.dataset.tsk=1;dw.click();return'x'}}
   /* the jnf flip choice opens only after the card-flip scene (.kcf, kit end button), like coop-e2e */const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}const rw=document.querySelector('.kmov .kmrew:not(.km-done)');if(rw&&!rw.dataset.tsk){rw.dataset.tsk=1;rw.click();return'x'}const kv=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&!x.querySelector('.kmend')&&!x.dataset.tsk);if(kv){kv.dataset.tsk=1;kv.click();return'x'}
   /* the steal mini-game window: THE helper (lib/coop-clear.js step 5) *//* a mini-game on screen (the steal game after Tranh sủng, jsmg herGame): play it out like a player (quick option «Thôi, không chơi», then the result frame's kit ✕ «Quay lại», which presses the hidden «Đã hiểu», jk4 kitOvSync); wiping S.mg leaves jsmg BUSY and jnf's choice in st "mg" for good */
   const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||[...m.querySelectorAll('#mr button:not([disabled]),.k3foot button:not([disabled])')].find(x=>x.offsetParent!==null)/* coop-thin G #4: only a visible button (a kit info card hides #mclose; its close is the ✕) */||(()=>{const O=[...m.querySelectorAll('.opts button:not([disabled]):not([data-kcp])')];if(!O.length)return null;const k=(document.getElementById('mt')||{}).textContent+'|'+O.length;if(window.__clrK===k)window.__clrN=(window.__clrN|0)+1;else{window.__clrK=k;window.__clrN=0}return O[window.__clrN%O.length]})()/* coop-thin G #4: the same card still open after a pick (an option she cannot pay is ignored by chooseM) → the next option */||m.querySelector('.kbk-x,[aria-label="Đóng"]')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'}).catch(()=>'err');
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
 const FV=[755,1000,2],IV=[1180,820,1];const A=await mk(b,'host',process.env.COOP_SWAP?IV:FV),B=await mk(b,'guest',process.env.COOP_SWAP?FV:IV);/* COOP_SWAP=1: the iPad hosts (seat a), the Fold joins (seat b) */
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
 /* debug (night-ledger-coop-r2): what holds a seat (jnf choice, Q, modal, the night gate, the ledger) */
const DUMP=o=>o.p.evaluate(()=>{try{const m=document.getElementById('modal');return {nf:typeof nfDebug==='function'?nfDebug():null,Q:Q.map(x=>x&&(x.pid||x.t)),modal:m&&!m.hidden?(document.getElementById('mt')||{}).textContent:null,
  mg:!!S.mg,ngoW:COOPW.ngoW,nrdy:COOPW.nrdy,ngo:COOPW.ngo,wk:COOP.state.week,pend:COOPW.pend,sent:COOPW.sent,allowN:COOPW.allowN,buoi:S.buoi,used:typeof used!=='undefined'?used:null,
  ld:S.ledger?{wk:S.ledger.wk,p:S.ledger.p,st:S.ledger.st}:null,ldG:S.ldG,cyHold:COOPW.cyHold,kmov:[...document.querySelectorAll('.kmov')].filter(x=>!x.classList.contains('km-out')).map(x=>x.id||x.className).slice(0,4),
  dawn:!!(document.getElementById('dawn')&&document.getElementById('dawn').classList.contains('on')),tr:(COOPW.tr||[]).slice(-12),cf:{busy:window.cfBusy&&cfBusy(),age:window.cfAge&&cfAge(),dbg:(window.__cfdbg||[]).slice(-12),kmov:[...document.querySelectorAll('.kmov')].map(x=>x.className.slice(0,60)+':'+(x.getAttribute('aria-label')||'')),gains:(window.KFX&&KFX.gains||[]).slice(-4),inv:(S.inv||[]).slice(-3).map(x=>x&&[x.k,x.n||x.name,x.src||x.from,x.wk])},nw:S.nightWhy&&{wk:S.nightWhy.wk,pick:S.nightWhy.pick},day:typeof day==='function'&&day(),DQ:window.DQ&&{st:DQ.stat,mt:!!DQ.mt,want:DQ.want,user:DQ.user},cyH:COOPW.cyHer&&COOPW.cyHer(),rp:Object.keys(COOPW.rpend||{}),cs:[COOP.state.status,COOP.state.peerOnline,!!COOPW.hold,JSON.stringify(COOP.state.ended||{})],pb:COOPW.pendBuoi,wb:COOPW.wantB}}catch(e){return e.message}}).catch(e=>e.message);
 /* both press through the day buổi until both are at tối */
 async function toNight(tag){if(process.env.ONLY&&!process.env.ONLY.split(',').includes(tag))return false;/* debug: ONLY=4,5 runs just those cases */for(let g=0;g<6;g++){const a=await D(A),c=await D(B);if(a.b>=LAST&&c.b>=LAST&&a.w===c.w)return true;
   const k=await A.p.evaluate(()=>COOPW.tm.myKey());await setTm(A,{buoiMs:120000});await reset(A);await clear(A);await clear(B);await press(A);await press(B);
   await bothPast(A,B,k,30000);for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}}
  const a=await D(A),c=await D(B);if(!(a.b>=LAST&&c.b>=LAST))console.log('DUMP toNight '+tag,JSON.stringify([await A.p.evaluate(require('./lib/coop-clear.js').SCR).catch(e=>e.message),await B.p.evaluate(require('./lib/coop-clear.js').SCR).catch(e=>e.message),await A.p.evaluate(()=>window.DQ&&DQ.stat).catch(()=>null),await B.p.evaluate(()=>window.DQ&&DQ.stat).catch(()=>null)]));return ok(a.b>=LAST&&c.b>=LAST,tag+': both at buổi tối',[a,c])||(a.b>=LAST&&c.b>=LAST)}
 /* wait for the merged week on both, then compare */
 async function merged(tag,w0,ms=60000){const t0=Date.now();while(Date.now()-t0<ms){await clear(A);await clear(B);
   const a=await D(A),c=await D(B);if(a.w>w0&&c.w>w0&&!a.pend&&!c.pend)break;await sleep(400)}
  await sleep(800);const a=await D(A),c=await D(B);if(!(a.w===w0+1&&c.w===w0+1)){console.log('DUMP '+tag,JSON.stringify([await DUMP(A),await DUMP(B),await A.p.evaluate(require('./lib/coop-clear.js').SCR).catch(e=>e.message),await B.p.evaluate(require('./lib/coop-clear.js').SCR).catch(e=>e.message)]));
   /* debug: is it only a missing re-check? poke each seat's week-end check once and look again (not counted) */for(const o of [A,B])await o.p.evaluate(()=>{try{COOPW.soonEnd()}catch(e){}});await sleep(4000);console.log('POKE '+tag,JSON.stringify([await D(A),await D(B)].map(x=>[x.w,x.pend,x.sent])))}ok(a.w===w0+1&&c.w===w0+1,tag+': both in the next week (exactly one step)',[w0,a.w,c.w]);
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
 /* ---------- the AFK case ---------- */
 const AFK=process.env.AFK||'g';const X=AFK==='h'?A:B,Y=AFK==='h'?B:A;const NMS=+process.env.NAFMS||8000,MARGIN=45000;
 const lv=await A.p.evaluate(()=>({gW:!!(COOPW.gW&&COOPW.gW()),eW:!!(COOPW.eW&&COOPW.eW()),lv:COOPW.thin&&COOPW.thin.level}));console.log('room level',JSON.stringify(lv),'AFK seat',X.name);
 const RUN=(AFK!=='h'&&lv.gW)?A:X;/* the page that runs the AFK seat's week end: the host at level 13 (part G, her context), else her own phone */
 for(const o of [A,B])await o.p.evaluate(()=>{PEND.afkT=()=>({t:"<p>Một việc cần ngươi tự quyết.</p>",o:[{n:"Nhận lời",fx:{},go:()=>{S.afkT=(S.afkT||0)+1}},{n:"Từ chối",fx:{},go:()=>{S.afkT=(S.afkT||0)+10}}]})});
 await RUN.p.evaluate(([inCtx,seat])=>{window.__afkArm=0;window.__afkHit=0;const f=endTurn;endTurn=function(){const r=f.apply(this,arguments);try{
   const mine=inCtx?!!(COOPW.gWk&&COOPW.ctx):(COOPW.seat===seat&&!COOPW.ctx);if(window.__afkArm&&mine){window.__afkArm=0;window.__afkHit=Date.now();
    Q.push(deserQ([{pid:"afkT",pp:{},t:"Việc khó xử"}])[0]);Q.push({t:"Tin báo",h:"<p>Có tin nhỏ trong cung.</p>"})}}catch(e){window.__afkErr=e.message}return r}},[RUN===A&&X===B,X===A?'a':'b']);
 for(const o of [A,B])await setTm(o,{nightMs:NMS,buoiMs:600000});await reset(A);
 if(await toNight('afk')){const w0=(await D(A)).w;for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
  await RUN.p.evaluate(()=>{window.__afkArm=1});
  ok(await isRd(Y)||await press(Y),'afk: '+Y.name+' presses Sẵn sàng at tối');await clear(X);ok(await isRd(X)||await press(X),'afk: '+X.name+' presses Sẵn sàng at tối, then goes AFK');
  /* from here the AFK seat is never touched; the other plays on like a player */
  const t0=Date.now();let hit=0,st=-1;while(Date.now()-t0<NMS+MARGIN+60000){await clear(Y);if(!hit)hit=await RUN.p.evaluate(()=>window.__afkHit||0);
   const a=await D(A),c=await D(B);if(a.w>w0&&c.w>w0&&!a.pend&&!c.pend){st=Date.now();break}await sleep(400)}
  ok(!!hit,'afk: her week end queued the test choice + notice ('+X.name+' seat)',await RUN.p.evaluate(()=>window.__afkErr||null));
  const dt=st>0&&hit?st-hit:-1;const a=await D(A),c=await D(B);
  if(st<0)console.log('DUMP afk',JSON.stringify([await DUMP(A),await DUMP(B),await A.p.evaluate(()=>({gh:COOPW.gHold&&COOPW.gHold(),G:COOPW.thin&&COOPW.thin.G&&{done:COOPW.thin.G.done,stat:COOPW.thin.G.stat},thq:(()=>{try{return (COOPW.thin.seatOf('b').S.thq||[]).map(x=>[x.pid||x.t,x.cw])}catch(e){return e.message}})(),naf:COOPW.tm.naf&&COOPW.tm.naf()})).catch(e=>e.message)]));
  ok(st>0&&dt<NMS+MARGIN,'afk: the room steps to the next week while '+X.name+' is AFK (within nightMs + margin)',{w0,w:[a.w,c.w],ms:dt,bound:NMS});
  ok(a.date===c.date,'afk: same date on both seats',[a.date,c.date]);
  /* her choice is CARRIED, not made: still on her seat, not answered */
  const xs=await X.p.evaluate(()=>({afkT:S.afkT||0,q:Q.filter(m=>m&&(m.pid==="afkT"||m.thin)).map(m=>m.pid||m.t),cq:(S.cq||[]).map(e=>e.pid||e.t)}));
  ok(!xs.afkT,'afk: her choice was never made for her',xs);
  ok(xs.q.includes('afkT')||xs.cq.includes('afkT'),'afk: her choice is kept on her seat (on her screen / carried)',xs);
  /* she comes back and answers it: it runs once */
  await sleep(1500);const t1=Date.now();while(Date.now()-t1<40000){const r=await X.p.evaluate(()=>{const b=[...document.querySelectorAll('#modal .opts button')].find(x=>/Nhận lời/.test(x.textContent)&&x.offsetParent!==null);if(b){b.click();return 1}return 0});if(r)break;await clear(X,1);await sleep(500)}
  let got=0;const t2=Date.now();while(Date.now()-t2<30000){got=await X.p.evaluate(()=>S.afkT||0);if(got)break;await sleep(500)}await sleep(3000);got=await X.p.evaluate(()=>S.afkT||0);
  ok(got===1,'afk: on her return she answers it and it runs once («Nhận lời»)',got);
  await shot(A,'afk-host-'+(process.env.COOP_SWAP?'1180x820':'755x1000'));await shot(B,'afk-guest-'+(process.env.COOP_SWAP?'755x1000':'1180x820'));
  /* the room goes on: one more week with both playing */
  for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
  if(await toNight('afk2')){const w1=(await D(A)).w;await clear(A);ok(await isRd(A)||await press(A),'afk2: host presses');await clear(B);ok(await isRd(B)||await press(B),'afk2: guest presses');await merged('afk2',w1)}}
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
