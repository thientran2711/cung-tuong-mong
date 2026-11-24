/* Co-op night gate (review/coop-night-sync): buổi tối → sáng must never run ahead on one seat. Two Playwright browsers, LIVE Worker.
   usage: python3 dev/build/assemble.py && node dev/test/coop-night.js [outdir] [workerURL]
   Owner bug 16/11: the friend finished buổi tối and was moved to the NEW day while the owner was still in her buổi tối.
   Cases (each at buổi tối, clock long so it never times out unless the case says so):
   1 HOST presses Sẵn sàng first: host stays in tối (same date, no endTurn), guest sees "đã sẵn sàng"; guest presses → both reach the
     same new week, same date.
   2 GUEST presses first: same, roles swapped.
   3 night event: the guest presses with a choice dialog (pushed night event) still open on the host; nobody advances; host chooses,
     presses → both advance once.
   4 time out at tối with the guest AFK: the host commits the night for both (countdown ends), both reach the same new week.
   5 reconnect: guest ready, then her page reloads; the host presses → the guest (re-sent ready / host's end) still gets the night. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../.tmp/coop-night'));fs.mkdirSync(OUT,{recursive:true});
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
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled]),.k3foot button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])')||m.querySelector('.kbk-x,[aria-label="Đóng"]')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'}).catch(()=>'err');
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
 const A=await mk(b,'host',[755,1000,2]),B=await mk(b,'guest',[1180,820,1]);
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
  dawn:!!(document.getElementById('dawn')&&document.getElementById('dawn').classList.contains('on')),tr:(COOPW.tr||[]).slice(-12),cf:{busy:window.cfBusy&&cfBusy(),age:window.cfAge&&cfAge(),dbg:(window.__cfdbg||[]).slice(-12),kmov:[...document.querySelectorAll('.kmov')].map(x=>x.className.slice(0,60)+':'+(x.getAttribute('aria-label')||'')),gains:(window.KFX&&KFX.gains||[]).slice(-4),inv:(S.inv||[]).slice(-3).map(x=>x&&[x.k,x.n||x.name,x.src||x.from,x.wk])},nw:S.nightWhy&&{wk:S.nightWhy.wk,pick:S.nightWhy.pick},day:typeof day==='function'&&day()}}catch(e){return e.message}}).catch(e=>e.message);
 /* both press through the day buổi until both are at tối */
 async function toNight(tag){if(process.env.ONLY&&!process.env.ONLY.split(',').includes(tag))return false;/* debug: ONLY=4,5 runs just those cases */for(let g=0;g<6;g++){const a=await D(A),c=await D(B);if(a.b>=LAST&&c.b>=LAST&&a.w===c.w)return true;
   const k=await A.p.evaluate(()=>COOPW.tm.myKey());await setTm(A,{buoiMs:120000});await reset(A);await clear(A);await clear(B);await press(A);await press(B);
   await bothPast(A,B,k,30000);for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}}
  const a=await D(A),c=await D(B);return ok(a.b>=LAST&&c.b>=LAST,tag+': both at buổi tối',[a,c])||(a.b>=LAST&&c.b>=LAST)}
 /* wait for the merged week on both, then compare */
 async function merged(tag,w0,ms=60000){const t0=Date.now();while(Date.now()-t0<ms){await clear(A);await clear(B);
   const a=await D(A),c=await D(B);if(a.w>w0&&c.w>w0&&!a.pend&&!c.pend)break;await sleep(400)}
  await sleep(800);const a=await D(A),c=await D(B);if(!(a.w===w0+1&&c.w===w0+1))console.log('DUMP '+tag,JSON.stringify([await DUMP(A),await DUMP(B)]));ok(a.w===w0+1&&c.w===w0+1,tag+': both in the next week (exactly one step)',[w0,a.w,c.w]);
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
 /* 1 host first */
 if(await toNight('1')){const w0=await readyOnly(A,B,'1');await shot(A,'cn-hostready-755x1000');
  await clear(B);ok(await isRd(B)||await press(B),'1: guest presses');await merged('1',w0)}
 for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
 /* 2 guest first */
 if(await toNight('2')){const w0=await readyOnly(B,A,'2');await shot(B,'cn-guestready-1180x820');
  await clear(A);ok(await isRd(A)||await press(A),'2: host presses');await merged('2',w0)}
 for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
 /* 3 night event open on the host while the guest is ready */
 if(await toNight('3')&&(await D(A)).ready){/* r1: the host is already night-ready (a night with the Emperor during clear() → jnight): case 3 needs a host that has NOT
   pressed; both ready = a legal commit. Just finish the night for both and say so. */console.log('n/a 3: host already ready (night with the Emperor); case 3 skipped this run');
  const w0=(await D(A)).w;await clear(B);await press(B);await merged('3 n/a',w0)}
 else if((await D(A)).b>=LAST){const w0=(await D(A)).w;
  await A.p.evaluate(()=>{window.__pick=0;pushModal({t:'Biến cố đêm',h:'<p>Có tiếng động ngoài hiên.</p>',opts:[{n:'Ra xem',fx:{},x:'',go:()=>{window.__pick++}},{n:'Mặc kệ',fx:{},x:'',go:()=>{}}]});showModal();render()});
  await clear(B);ok(await isRd(B)||await press(B),'3: guest presses while the host has a night event open');await sleep(6000);
  const a=await D(A),c=await D(B);ok(a.w===w0&&c.w===w0&&c.b===LAST&&!c.pend&&a.b===LAST&&!a.pend&&a.Q===1,'3: nobody advances while the host reads',[a,c]);
  await A.p.evaluate(()=>{const b=[...document.querySelectorAll('#modal .opts button')].find(x=>/Ra xem/.test(x.textContent));b.click()});
  ok(await A.p.evaluate(()=>__pick)===1,'3: host chose');await sleep(1500);
  const a2=await D(A);ok(a2.b===LAST&&a2.w===w0,'3: closing the event does not advance by itself',a2);
  await clear(A);ok(await isRd(A)||await press(A),'3: host presses');await merged('3',w0);ok(await A.p.evaluate(()=>__pick)===1,'3: the choice ran once')}
 for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
 /* 4 time out at tối, guest AFK. FORCE4=g|h (rv night-ledger-coop-r2 FAIL 1, deterministic): the host's ldRoll pins the played tối on the
    guest (g) / on the host (h) before the flip, so the AFK seat is the PLAYED holder: her own summons «Kính sự phòng báo tin» (a real choice)
    sits on her screen; h = mirrored, the HOST is AFK and the guest presses. Bound (jcooptimer nightAfk, BAL.coopTm.nightMs): it closes with
    no answer once her tối is overdue → her night step runs, the room is not frozen. */
 if(await toNight('4')){const w0=(await D(A)).w;const F4=process.env.FORCE4||'';const X=F4==='h'?A:B,Y=F4==='h'?B:A;await setTm(A,{buoiMs:9000,pauseCapMs:2000});await reset(A);
  for(let i=0;i<3;i++){await clear(X);await sleep(300)}/* flip-entry: the tablet is turned at the START of buổi tối (jfe/jnf); the AFK seat reads what tối brings (a summons is a real choice, never auto-made) and only then goes AFK */
  if(F4){const pin=await A.p.evaluate(g=>{try{if(typeof ldRoll!=='function'||!ldOn())return 'no ledger';const f=rivals.find(v=>v&&v.coop&&v.alive!==false);S.ledger=null;ldRoll(g?f:S);const p=ldPin();return p===S?'host':p===f?'guest':String(p&&p.name)}catch(e){return e.message}},F4==='g');
   console.log('4 FORCE4='+F4+' played tối pinned on:',pin);
   /* no ledger in this room (nfOn false: a seat off the palace / a parked room, by her random thân phận): nothing to pin — n/a, not a FAIL */
   if(pin==='no ledger')console.log('n/a  4: the played tối is pinned on the AFK seat ('+F4+'): no ledger in this room');else ok(pin===(F4==='g'?'guest':'host'),'4: the played tối is pinned on the AFK seat ('+F4+')',pin);
   /* the carry rule (coordinator, OD L680): a real non-night choice on top of the AFK seat (like «Một ánh mắt»): two roads, each marks if taken */
   await X.p.evaluate(()=>{window.__c4=0;window.__c4back=0;window.__c4atBack=null;
    /* a card of the save's kind (pid): every co-op week merge rebuilds Q through serQ / deserQ (fromCanon keepQ), which keeps only pid cards */
    PEND.c4test=()=>({t:"<p>Một việc cần ngươi tự quyết.</p>",o:[{n:"Nhận lời",fx:{},go:()=>{window.__c4=1}},{n:"Từ chối",fx:{},go:()=>{window.__c4=2}}]});
    Q.unshift(deserQ([{pid:"c4test",pp:{},t:"Việc khó xử"}])[0]);try{showModal()}catch(e){}
    /* back on top after the merged week: seen on her screen (the harness's clear() may then press it, as she would on her return) */const iv=setInterval(()=>{if((COOPW.nacB||0)>0&&Q[0]&&Q[0].pid==="c4test"&&!document.getElementById('modal').hidden){window.__c4back=1;window.__c4atBack=window.__c4;clearInterval(iv)}},50);
    /* r4 (rv r3 FAIL 1): a REAL non-pid two-road card from a game generator (j24 «Có người đến», apSorry) on a live world consort: carried as data,
       made again after the merged week against the merged world; she answers it on her return («Nhận lời xin lỗi»: her thiện cảm with that consort
       rises) → the effect must land on that consort IN the merged world (rivals), and reach the partner seat at the next week merge (rl[her seat]) */
    window.__nr={};const v=rivals.find(x=>x&&!x.coop&&x.alive&&!x.out&&!x.confined);if(v){const m=AP_MK.apSorry({kind:"apSorry",who:v});window.__nr={id:v.id,rk:m.rk||null,ra:!!m.ra,pid:m.pid||null,n:m.opts.length,obj:v};/* r4 fixer #4 (open 1 of «FIX r4», g3 / cnh2): it is an OPTIONAL card, so the j68 scheduler (evGate, at every showModal) may hold it in EVHOLD (one optional card per buổi, same template / person lately) and it never reaches her screen; pin the scheduler for this one card (as ldRoll is pinned above) so it is really on top of her screen when she goes AFK */try{const sc=evS(),K=evKeys(m);sc.bk=-1;sc.dn=0;sc.last="";delete sc.tpl[K.tpl];delete sc.key[K.key]}catch(e){}Q.unshift(m);try{showModal()}catch(e){}window.__nr.shown=Q[0]===m;/* LAW 11 (the same family, another holder): an optional card the scheduler HELD (EVHOLD, page memory) when the week merges: made again against the merged world */window.__nh={};const v2=rivals.find(x=>x&&x!==v&&!x.coop&&x.alive&&!x.out&&!x.confined);if(v2&&typeof EVHOLD!=="undefined"){const h=AP_MK.apSorry({kind:"apSorry",who:v2});EVHOLD.push({m:h,at:wk(),K:evKeys(h)});window.__nh={id:v2.id,obj:v2,m:h}}
     window.__nrM=m;window.__nrGone=null;const ivg=setInterval(()=>{if(!Q.some(x=>x&&x.rk==='ap.apSorry')&&!(S.cq||[]).some(e=>e.rk==='ap.apSorry')&&!window.__nr.back){window.__nrGone={t:Math.round(performance.now()),top:Q[0]&&(Q[0].pid||Q[0].t),fc:COOPW.inFC||0,wk:COOP.state.week,b:S.buoi,stack:(new Error().stack||'').slice(0,0)};clearInterval(ivg)}if(window.__nr.back)clearInterval(ivg)},5);COOPW.afterCarry=out=>{const q=out.find(x=>x&&x.rk==="ap.apSorry");if(q){COOPW.afterCarry=null;const w=rivals.find(x=>x.id===window.__nr.id);
      window.__nr.back=1;try{const N=window.__nh;if(N&&N.id){const e=EVHOLD.find(x=>x&&x.m&&x.m.rk==="ap.apSorry")||(()=>{const c=Q.find(x=>x&&x!==q&&x.__held&&x.rk==="ap.apSorry");return c?{m:c}:null})();/* or released by evRelease already */const w2=rivals.find(x=>x.id===N.id);let r0=null,r1=null;if(e&&w2&&e.m!==N.m){r0=w2.rel;const o=e.m.opts[0];apply(o.fx||{});if(o.go)o.go();r1=w2.rel}window.__nr.held={kept:!!e,made:!!e&&e.m!==N.m,inWorld:!!w2&&rivals.includes(w2),old:N.obj===w2,r0,r1};delete N.obj;delete N.m}}catch(x){window.__nr.held={err:x.message}}window.__nr.top=Q[0]===q;window.__nr.same=q===window.__nrM;Q.splice(Q.indexOf(q),1);Q.unshift(q);window.__nr.n2=q.opts.length;window.__nr.inWorld=!!w&&rivals.includes(w);window.__nr.oldObj=window.__nr.obj===w;window.__nr.r0=w?w.rel:null;window.__nr.wk=COOP.state.week;
      try{chooseM(0)}catch(e){window.__nr.err=e.message}window.__nr.r1=w?w.rel:null;window.__nr.myId=COOPW.seat==="a"?901:902;delete window.__nr.obj}}}})}
  /* NLC #9: the active seat plays on like a player (scene, morning panel, his choice); the AFK seat never answers. Bound (jnf): every seat's
     choice is in by BAL.steal.choice.waitMs from the flip (a scene queued behind a panel she never closed is dropped at waitMs − choice.ms,
     her 10-second clock then says Thôi; the host stops waiting for her at waitMs) → the night runs within the room clock + waitMs. */
  const wm=await A.p.evaluate(()=>BAL.steal.choice.waitMs),lim=9000+wm+15000;
  const t0=Date.now();await clear(Y);ok(await isRd(Y)||await press(Y),'4: '+Y.name+' presses, '+X.name+' AFK');
  /* r4 (Foreman B ruling 2): RLX=1 — the AFK seat's page reloads right after the carry, before the merged week: the carried card lives in her
     save (S.cq) and must come back (made again from data) after the merged week; the test's own c4test generator dies with the page → it lapses */
  let rlx=null;if(F4&&process.env.RLX){const tc=Date.now();while(Date.now()-tc<lim){const n=await X.p.evaluate(()=>({n:COOPW.nacN||0,cq:(S.cq||[]).map(e=>e.rk||e.pid)})).catch(()=>({n:0}));if(n.n>=1&&n.cq.includes('ap.apSorry')){rlx=n;break}await clear(Y);await sleep(100)}
   console.log('4 RLX carried before reload:',JSON.stringify(rlx));
   if(rlx){if(X===B){await B.p.close();await until(A,()=>COOP.frozen,null,60000);await join(B,code);ok(await until(B,()=>COOP.seat==='b'&&!COOP.frozen&&!!(window.COOPW&&COOPW.on&&typeof S!=='undefined'&&S),null,60000),'4 RLX: guest back')}
    else ok(await rejoinHost(),'4 RLX: host back');
    await X.p.evaluate(()=>{window.__rlxSeen=0;COOPW.afterCarry=out=>{const q=out.find(x=>x&&x.rk==='ap.apSorry');if(q){window.__rlxSeen=1;window.__rlxN=q.opts.length;COOPW.afterCarry=null}}});
    console.log('4 RLX after rejoin:',JSON.stringify(await X.p.evaluate(()=>({Q:Q.map(x=>x&&(x.rk||x.pid||x.t)),cq:(S.cq||[]).map(e=>[e.rk||e.pid,e.cw]),wk:COOP.state.week,b:S.buoi}))));
    for(let i=0;i<3;i++){await clear(Y);await sleep(300)}}}
  let st=-1;while(Date.now()-t0<lim){await clear(Y);const c=await D(X);if(c.pend||c.w>w0){st=Date.now()-t0;break}await sleep(300)}
  const naf=await X.p.evaluate(()=>({n:COOPW.nafN||0,naf:COOPW.naf||null,dbg:COOPW.tm.naf&&COOPW.tm.naf(),Q:Q.map(x=>x&&(x.pid||x.t)),tonight:typeof S.tonight==='string'?S.tonight:S.tonight&&S.tonight.name}));console.log('4 AFK seat:',JSON.stringify(naf));
  if(st<0)console.log('DUMP 4',JSON.stringify([await DUMP(A),await DUMP(B),await A.p.evaluate(require('./lib/coop-clear.js').SCR),await B.p.evaluate(require('./lib/coop-clear.js').SCR)]));
  ok(st>=5000,'4: the AFK night runs only when the clock ends (host commits)',st);ok(st>=0&&st<=lim,'4: the AFK seat holds the night at most the clock + BAL.steal.choice.waitMs',[st,lim]);
  if(F4)ok(naf.n>=1||!naf.Q.some(x=>['ksp','nfsum','amNight','prep','night1','night2'].includes(x)),'4: the AFK holder\'s own summons / night closed with no answer (jcooptimer nightAfk) or never stayed (a one-road dialog is read for her)',naf);await merged('4',w0);
  /* the carry rule (coordinator, OD L680): a real non-night choice she sat on is never answered for her: kept and back on top after the merged week */
  if(rlx){await until(X,()=>window.__rlxSeen===1,null,30000);const q=await X.p.evaluate(()=>({seen:window.__rlxSeen,n:window.__rlxN,cq:(S.cq||[]).length,back:COOPW.nacB||0,lapsed:COOPW.nacL||0,lapLog:(S.logs||[]).filter(x=>/việc đã qua/.test(x)).slice(0,3)}));console.log('4 RLX after merge:',JSON.stringify(q));
   ok(q.seen===1&&q.n===2&&q.cq===0,'4 RLX: a reload between the carry and the merged week keeps the carried non-pid card (her save), back after the merge',q)}
  else{const c=await X.p.evaluate(()=>({carried:COOPW.nacN||0,back:COOPW.nacB||0,cq:COOPW.tm.naf().cq,lapsed:COOPW.tm.naf().lapsed,rcpFail:window.__rcpFail,lap:(S.logs||[]).filter(x=>/việc đã qua/.test(x)).slice(0,4)}));console.log('4 carry:',JSON.stringify(c));
   const tq=await X.p.evaluate(()=>({unansweredAtBack:window.__c4atBack,back:window.__c4back}));
   ok(c.back===c.carried&&c.cq===0,'4: every dialog carried off the AFK seat is back on her screen after the merged week (never answered)',c);
   if(F4)ok(c.carried>=1&&tq.back===1&&tq.unansweredAtBack===0,'4: her real choice («Việc khó xử», two roads) was carried, not answered, and came back on top of her screen after the merged week',[c,tq]);
   if(F4){await until(X,()=>!!(window.__nr&&(window.__nr.back||!window.__nr.id)),null,20000);const nr=await X.p.evaluate(()=>{const o=Object.assign({},window.__nr);delete o.obj;o.gone=window.__nrGone;o.rcpFail=window.__rcpFail;return o});console.log('4 non-pid card:',JSON.stringify(nr));
    if(!nr.id)console.log('n/a  4: no live world consort for the non-pid card');else{
     ok(nr.rk==='ap.apSorry'&&nr.ra&&!nr.pid,'4: the non-pid card carries its generator as data (rk)',nr);
     ok(nr.shown===true,'4: the non-pid card was on top of her screen when she went AFK (j68 scheduler pinned)',nr);
     if(nr.held)ok(nr.held.kept&&nr.held.made&&nr.held.inWorld&&!nr.held.old&&nr.held.r1>nr.held.r0,'4: an optional card the j68 scheduler held (EVHOLD) is made again against the merged world; its road lands on the merged world\'s consort',nr.held);else console.log('n/a  4: no second live world consort for the held card')
     ok(nr.back===1&&!nr.same&&nr.n2===nr.n&&nr.inWorld&&!nr.oldObj,'4: the non-pid card came back after the merged week, made again against the merged world (its consort is the merged world\'s, not the old object)',nr);
     ok(nr.r1>nr.r0,'4: answered on her return, its road lands on that consort in the merged world (thiện cảm up)',nr);
     global.__NR4={X:X.name,Y:Y.name,id:nr.id,myId:nr.myId,r1:nr.r1,y0:null}}}}}
 for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
 /* 4b the guest misses the host's final word of the night (its "fin" lost on the way: a dropped socket, a sleeping phone). The host ended its day
    right after fin and runs ahead while the merged week waits for her: she asks again (jnf ask), the host — already past that day — sends that
    day's fin again as it was (jnf again / S.nfLast) → both reach the next week (NLC #10: before, the host answered only for its CURRENT day = stall) */
 for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
 if(await toNight('4b')){const w0=(await D(A)).w;await setTm(A,{buoiMs:120000});await reset(A);
  await B.p.evaluate(()=>{window.__rx0=COOP.rxWrap;window.__fdrop=0;window.__nfrx=[];COOP.rxWrap=function(go,m){try{if(m&&m.k==="ctm-nf")window.__nfrx.push([m.mode,m.ph,m.fin,m.open,m.d,m.week,!!m.ld])}catch(e){}if(m&&m.k==="ctm-nf"&&m.fin&&!window.__fdrop){window.__fdrop=1;return}return window.__rx0?window.__rx0.apply(this,arguments):go()}});
  /* rv night-ledger-coop-r2 FAIL 3: a fin word exists only when BOTH seats run the jnf night relay that day (nfOn: not parked, not a servant /
     Kính sự phòng road, alive). Her relay off (e.g. a seat off the palace: jnf roomOff) → no fin to drop → n/a with the reason, never a FAIL;
     relay on on both → it must have been dropped once. */
  const NO=o=>o.p.evaluate(()=>{try{return {on:nfOn(),why:{dead:!!S.dead,park:typeof nfParked==='function'?!!nfParked():null,srv:typeof isSrv==='function'?!!isSrv():null,kc:typeof isKc==='function'?!!isKc():null}}}catch(e){return {on:null,why:e.message}}});
  const on0=[await NO(A),await NO(B)];
  for(const o of [A,B]){await clear(o);ok(await isRd(o)||await press(o),'4b: '+o.name+' presses')}
  const on1=[await NO(A),await NO(B)];
  await merged('4b',w0,90000);
  /* r4: the non-pid card's effect (case 4) reached the partner seat through the next week merge: her thiện cảm row rl[her seat] on that consort */
  if(global.__NR4){const N=global.__NR4;global.__NR4=null;const Yo=N.Y===A.name?A:B,Xo=N.X===A.name?A:B;const y1=await Yo.p.evaluate(([id,k])=>{try{const r=(COOPW.base&&COOPW.base.W&&COOPW.base.W.R||[]).find(x=>x.id===id);return r&&r.rl?r.rl[k]:null}catch(e){return 'err '+e.message}},[N.id,N.myId]);
   const x1=await Xo.p.evaluate(id=>{const v=rivals.find(x=>x.id===id);return v?v.rel:null},N.id);console.log('4 non-pid card, partner seat:',JSON.stringify(Object.assign({},N,{y1,x1})));
   ok(y1!=null&&x1!=null&&y1===x1,'4: the non-pid card\'s effect is in the same world on both seats after the next merge (partner rl[her seat] = her thiện cảm)',[N,y1,x1])}{const fd=await B.p.evaluate(()=>window.__fdrop===1);const rel=on0.concat(on1).every(x=>x.on===true);if(!fd)console.log('DUMP 4b rx',JSON.stringify(await B.p.evaluate(()=>({rx:window.__nfrx,tr:(COOPW.tr||[]).slice(-25),nf:nfDebug()}))).slice(0,4000));
   if(!fd&&!rel)console.log('n/a 4b: the night relay was off on a seat that day (no fin word to drop)',JSON.stringify({before:on0,after:on1}));else ok(fd,'4b: the guest really missed the host\'s fin once',{before:on0,after:on1})}
  await B.p.evaluate(()=>{COOP.rxWrap=window.__rx0;delete window.__rx0})}
 /* 5 guest ready, reloads; host presses */
 if(await toNight('5')){const w0=(await D(A)).w;await setTm(A,{buoiMs:120000});await reset(A);await clear(B);ok(await isRd(B)||await press(B),'5: guest presses');await sleep(1500);
  await B.p.close();await until(A,()=>COOP.frozen,null,60000);await join(B,code);
  ok(await until(B,()=>COOP.seat==='b'&&!COOP.frozen&&!!(window.COOPW&&COOPW.on&&typeof S!=='undefined'&&S),null,60000),'5: guest back');
  for(let i=0;i<3;i++){await clear(B);await sleep(300)}
  const c=await D(B);if(c.b>=LAST&&!c.ready){await clear(B);await press(B)}
  await clear(A);ok(await isRd(A)||await press(A),'5: host presses');await merged('5',w0)}
 /* 6-8 reconnect (owner 16/11): one leaves mid-buổi, the other sees the wait; she comes back → the one who stayed recovers by itself */
 const Ok=o=>o.p.evaluate(()=>{const n=document.getElementById('next');const fz=document.getElementById('coopfz');const h=document.getElementById('kctmh');
   return {fz:!!fz,hold:!!h,frozen:!!COOP.frozen,dis:n.disabled,next:n.textContent,k:COOPW.tm.myKey(),rk:COOPW.tm.roomKey(),v:COOPW.tm.view(),Q:Q.length,bend:COOPW.bend,pb:!!COOPW.pendBuoi,wk:COOPW.whereKey,tr:(COOPW.tr||[]).slice(-8)}});
 async function rejoinHost(){await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/);await A.p.waitForTimeout(600);await tapText(A,/^Trở lại phòng/);
   return until(A,()=>COOP.seat==='a'&&!COOP.frozen&&!!(window.COOPW&&COOPW.on&&typeof S!=='undefined'&&S),null,60000)}
 async function leaveBack(X,Y,tag,mid){const k0=await X.p.evaluate(()=>COOPW.tm.myKey());await X.p.close();
  ok(await until(Y,()=>COOP.frozen&&!!document.getElementById('coopfz'),null,60000),tag+': '+Y.name+' sees the wait');if(mid)await mid();
  const back=X===A?await rejoinHost():(await join(B,code),await until(B,()=>COOP.seat==='b'&&!COOP.frozen&&!!(window.COOPW&&COOPW.on&&typeof S!=='undefined'&&S),null,60000));
  ok(back,tag+': '+X.name+' back');if(X===B)await setTm(B,{readMs:2000});else await setTm(A,{readMs:2000});
  for(let i=0;i<3;i++){await clear(X);await sleep(300)}
  const t0=Date.now();let y;while(Date.now()-t0<20000){y=await Ok(Y);if(!y.fz&&!y.frozen&&!y.hold&&y.v&&y.k===y.rk)break;await sleep(400)}
  ok(!y.fz&&!y.frozen&&!y.hold,tag+': '+Y.name+' drops the wait by itself (no reload)',y);
  const x=await Ok(X);ok(y.v&&x.v&&y.v.key===x.v.key&&y.k===x.k,tag+': same buổi + same clock on both',[x.k,y.k,x.v&&x.v.key,y.v&&y.v.key]);return k0}
 async function stepBoth(tag,k){for(let i=0;i<2;i++){await clear(A);await clear(B)}const rd=o=>o.p.evaluate(()=>!!(COOPW.bend||COOPW.nReady()));/* a restored seat may already be ready (its bend survived the rejoin) */
  const a=await rd(A)||await press(A),c=await rd(B)||await press(B);ok(a&&c,tag+': both can press Sẵn sàng',[await Ok(A),await Ok(B)]);
  const ms=await bothPast(A,B,k,30000);ok(ms>=0,tag+': the buổi steps for both',[await Ok(A),await Ok(B)])}
 async function toDay(){for(let g=0;g<6;g++){const a=await D(A);if(a.b<LAST)return;await clear(A);await clear(B);if(a.b>=LAST){await press(A);await press(B);await merged('day',a.w)}}}
 await setTm(A,{buoiMs:120000,pauseCapMs:6000});await reset(A);await toDay();
 /* 6 host leaves mid-buổi */
 {const k=await leaveBack(A,B,'6 host');await stepBoth('6',k)}
 for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
 /* 7 guest leaves mid-buổi */
 {const k=await leaveBack(B,A,'7 guest');await stepBoth('7',k)}
 for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
 /* 8 the host leaves just before its buổi runs out (guest already ready), comes back: the clock runs out → both step by themselves */
 {await toDay();await setTm(A,{buoiMs:9000,pauseCapMs:1000});await reset(A);await clear(B);ok(await press(B),'8: guest ready');await sleep(6000);
  const k=await leaveBack(A,B,'8 host',()=>sleep(12000));
  const ms=await bothPast(A,B,k,40000);ok(ms>=0,'8: the clock ends after her return and both step',[await Ok(A),await Ok(B)]);
  await setTm(A,{buoiMs:120000});await reset(A)}
 /* 10 (robot-coop-fix-4, robot10-coop week-end stuck): the host COMMITS the night (go out, the guest runs hers and sends `end`) while his own night
    waits on a dialog; then his seat re-sends its life (sendMe: a new life / rejoin) — that reset cleared his run flag but kept the commit, so his
    next Sẵn sàng could never commit again: both #next locked at buổi 3 for ever. Now the reset clears the commit too (and nCheck: his commit = his go). */
 if(await toNight('10')){const w0=(await D(A)).w;await clear(A);await clear(B);ok(await isRd(B)||await press(B),'10: guest presses at tối');await sleep(3000);
  ok(await until(A,w=>COOPW.nfr===w,w0,30000),'10: the host has her ready');
  await A.p.evaluate(()=>{pushModal({t:'Biến cố đêm',h:'<p>Có tiếng động ngoài hiên.</p>',opts:[{n:'Ra xem',fx:{},x:'',go:()=>{}}]});showModal();render();COOPW.nightReady()});
  ok(await A.p.evaluate(w=>COOPW.ngo===w,w0),'10: the host committed the night (go out), his own night waits on the dialog');
  for(let i=0;i<20&&!(await A.p.evaluate(()=>!!(COOP.state.ended&&COOP.state.ended.b)));i++){await clear(B);await sleep(1000)}
  console.log('10: guest end out =',await A.p.evaluate(()=>!!(COOP.state.ended&&COOP.state.ended.b)));
  const a1=await D(A);ok(a1.w===w0&&a1.b===LAST&&a1.Q===1,'10: the host still in tối behind his dialog',a1);
  await A.p.evaluate(()=>{COOPW.sendMe(JSON.parse(JSON.stringify(COOPW.base.P[COOPW.seat])))});await sleep(1500);
  await A.p.evaluate(()=>{const b=[...document.querySelectorAll('#modal .opts button')].find(x=>/Ra xem/.test(x.textContent));if(b)b.click()});await sleep(1000);
  await clear(A);ok(await isRd(A)||await press(A),'10: host presses again after the re-send');await merged('10',w0)}
 /* 11 (robot-coop-fix-4, same family): the night gate and thin E's asks are keyed by week only; a NEW room (no reload) starts at week 0 again, so
    the old room's commit / ready / ask would hit the same week of the new room. The room's start (begin) clears them when the room changes and
    keeps them on a reconnect to the same room. Simulated: the seat's last room is named OLD1 with a commit / ask at this very week, then the
    room's start fires (as a new room's would) → cleared; the same start with the room unchanged → kept. */
 if(await toNight('11')){const w0=(await D(A)).w;await clear(A);await clear(B);
  const same=await A.p.evaluate(w=>{COOPW.nfr=w-1;COOP.emit('start',{you:COOP.state.you});return COOPW.nfr===w-1},w0);ok(same,'11: same room start keeps the night gate');
  const a=await A.p.evaluate(w=>{COOPW.nRoom='OLD1';COOPW.ngo=w;COOPW.nfr=w;COOP.emit('start',{you:COOP.state.you});return {ngo:COOPW.ngo,nfr:COOPW.nfr,room:COOPW.nRoom===COOP.state.room}},w0);
  ok(a.ngo===-1&&a.nfr===-1&&a.room,'11: host, new room: the old commit / her old ready are cleared',a);
  const g=await B.p.evaluate(()=>{const E=COOPW.thin.E,k=(COOP.state.week||0)+':'+(S.buoi||0);COOPW.nRoom='OLD1';E.mine=k;COOP.emit('start',{you:COOP.state.you});return {mine:E.mine,room:COOPW.nRoom===COOP.state.room}});
  ok(g.mine===''&&g.room,'11: guest, new room: her old ask is cleared',g);
  for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
  ok(await isRd(B)||await press(B),'11: guest presses');ok(await isRd(A)||await press(A),'11: host presses');await merged('11',w0)}
 for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
 /* 9 at tối: the guest leaves after pressing, comes back; the host (still connected) recovers and the night goes for both */
 {await toNight('9');const w0=(await D(A)).w;await clear(B);await press(B);await sleep(1500);await leaveBack(B,A,'9 guest at tối');
  for(let i=0;i<3;i++){await clear(B);await sleep(300)}const c=await D(B);if(c.b>=LAST&&!c.ready){await clear(B);await press(B)}
  await clear(A);ok(await isRd(A)||await press(A),'9: host presses');await merged('9',w0)}
 /* 10 per-buổi progress survives a reload / rejoin (owner 16/11): 2 acts → reload → khắc + effects kept, not reset, not doubled */
 async function actsReload(X,Y,tag){await toDay();for(let i=0;i<2;i++){await clear(A);await clear(B)}
  const x0=await X.p.evaluate(()=>({u:used,tai:S.tai,k:COOPW.tm.myKey(),n:(S.log||[]).length}));
  await X.p.evaluate(()=>{for(let i=0;i<2;i++){spend(1);S.tai+=2;log('Việc thử '+(i+1)+'.')}render()});await sleep(1800);
  const x1=await X.p.evaluate(()=>({u:used,tai:S.tai}));ok(x1.u===x0.u+2&&x1.tai===x0.tai+4,tag+': 2 acts done',[x0,x1]);
  await leaveBack(X,Y,tag);for(let i=0;i<3;i++){await clear(X);await sleep(300)}
  const x2=await X.p.evaluate(()=>({u:used,tai:S.tai,k:COOPW.tm.myKey()}));
  ok(x2.u===x1.u&&x2.tai===x1.tai&&x2.k===x0.k,tag+': after the reload khắc and the acts\' effects are kept (not reset, not doubled)',[x0,x1,x2]);
  await stepBoth(tag,x0.k)}
 await setTm(A,{buoiMs:120000,pauseCapMs:6000});await reset(A);
 await actsReload(B,A,'10 guest');for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
 await actsReload(A,B,'11 host');
 /* 12 the clock ran out at tối while the host had a choice open; the host reloads (clock restored already "up"): it must not freeze */
 {for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
  if(await toNight('12')){const w0=(await D(A)).w;await setTm(A,{buoiMs:6000,pauseCapMs:1000});await reset(A);
  await A.p.evaluate(()=>{pushModal({t:'Biến cố đêm',h:'<p>Chọn một.</p>',opts:[{n:'Ra xem',fx:{},x:'',go:()=>{}},{n:'Mặc kệ',fx:{},x:'',go:()=>{}}]});showModal();render()});
  await clear(B);await press(B);
  ok(await until(A,()=>{const v=COOPW.tm.view();return v&&v.up},null,30000),'12: the clock runs out (host still in the choice)');await sleep(1500);
  await leaveBack(A,B,'12 host');
  const t0=Date.now();let up=null;while(Date.now()-t0<8000){up=await A.p.evaluate(()=>({v:COOPW.tm.view(),due:COOPW.tm.due()}));if(up.v&&up.v.up&&up.due)break;await sleep(300)}
  ok(up&&((up.v&&up.v.up&&up.due===up.v.key)||up.due===w0+':'+LAST),'12: host clock restored "up" fires its time-up again',up);
  await merged('12',w0,60000)}}
 /* 13 stats raised by acts, then a buổi change, then a reload (owner: "23 shows 10 after rejoining"): newest copy wins */
 for(const [X,Y,tag] of [[B,A,'13 guest'],[A,B,'14 host']]){for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}await toDay();
  const k=await X.p.evaluate(()=>COOPW.tm.myKey());await X.p.evaluate(()=>{spend(1);S.tai+=3;S.sac+=2;render()});
  await stepBoth(tag+' step',k);for(let i=0;i<3;i++){await clear(X);await sleep(300)}await X.p.evaluate(()=>{spend(1);S.tai+=1;render()});await sleep(1800);
  const x1=await X.p.evaluate(()=>({u:used,tai:S.tai,sac:S.sac,k:COOPW.tm.myKey()}));await leaveBack(X,Y,tag);for(let i=0;i<3;i++){await clear(X);await sleep(300)}
  const x2=await X.p.evaluate(()=>({u:used,tai:S.tai,sac:S.sac,k:COOPW.tm.myKey()}));ok(JSON.stringify(x1)===JSON.stringify(x2),tag+': stats + khắc identical after a buổi change and a rejoin',[x1,x2])}
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
