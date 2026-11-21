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
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{/* coop-thin G #7 (bot family): a full-screen scene (.kmov, e.g. the mirror reveal of the toilette) sits ON TOP of the game frame; a player can only touch the scene: the bot ends a scene by its own «Tiếp theo» first, and never clicks a frame button covered by a scene (it closed #kg82 under the reveal: kg82ShowRes null at the reveal's end) */{const t=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&getComputedStyle(x).display!=='none'&&getComputedStyle(x).visibility!=='hidden');if(t){const e=[...t.querySelectorAll('.kmend,[data-km-close],.krevok')].find(x=>x.offsetParent!==null&&!x.disabled)||[...t.querySelectorAll('button')].filter(x=>x.offsetParent!==null&&!x.disabled).pop();/* its own end (whole scene family): KIT 81 «Tiếp theo» (.kmend), the reward's «Nhận» ([data-km-close]), the item gain's «Nhận» (.krevok), else the scene's own last button */if(e){e.click();return'x'}/* coop-thin-g-f1 (bot family, as coop-e2e / coop-cyc kv): a scene that shows no end button yet (manual scene: the night card kne-ov in reduced motion, KIT REQUEST filed) — a player taps it once */if(!t.dataset.tsk){t.dataset.tsk=1;t.click();return'x'}}}{const ov=document.getElementById('ov');if(ov&&!ov.hidden&&getComputedStyle(ov).display!=='none'){const vis=e=>{if(!(e&&e.offsetParent!==null&&!e.disabled))return false;const r=e.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;if(x<0||y<0||x>=innerWidth||y>=innerHeight)return true;const h=document.elementFromPoint(x,y);return !h||e.contains(h)||!h.closest('.kmov')};/* coop-thin G #7: never a button a player cannot touch (under a full-screen scene) */const b=[...ov.querySelectorAll('[id$=done]')].filter(vis).pop()||[...ov.querySelectorAll('[id^=toilmoc],[id$=skip]')].filter(vis).filter(e=>e.id!=='mgskip'&&!e.dataset.tsk).pop()||[...ov.querySelectorAll('[id$=skip]')].filter(vis).pop()||[...ov.querySelectorAll('button')].find(b=>/^(Bỏ qua|Xong|Thôi|Đã hiểu|Tiếp|Đóng)/.test(b.textContent.trim())&&vis(b))/* coop-thin-g-f1 (bot family, main kit-dialog; as coop-thin-g mgSkip): a result screen whose «Đã hiểu» is folded into the frame's ✕ (j82: ✕ on a result screen presses #kg82ok / #kg92ok, the result applies) */||((document.getElementById('kg82ok')||document.getElementById('kg92ok'))?[...ov.querySelectorAll('button')].find(x=>x.textContent.trim()==='✕'&&vis(x)):null);if(b){b.dataset.tsk=1;b.click();return'x'}}}/* coop-thin G: a mini game opened on HER phone (F6b dress board, «Hội phối đồ · <đề>» → Tự tay phối đồ): the room waits while she plays (CW.frPz); the bot skips it (her maid picks), as coop-thin-g mgSkip */
   const rs=document.querySelector('#kroul .krskip');if(rs&&rs.offsetParent!==null){rs.click();return'x'}/* bot family (jfocus «Tiếp ▸» dialogue line, e.g. cnvScold on a cung nữ): a player taps the line on */{const kf=[...document.querySelectorAll('.kfoc-next')].find(x=>x.offsetParent!==null);if(kf){kf.click();return'x'}}
   const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||[...m.querySelectorAll('#mr button:not([disabled])')].find(x=>x.offsetParent!==null)/* coop-thin G #4: only a visible button (a kit info card hides #mclose; its close is the ✕) */||(()=>{const O=[...m.querySelectorAll('.opts button:not([disabled]):not([data-kcp])')];if(!O.length)return null;const k=(document.getElementById('mt')||{}).textContent+'|'+O.length;if(window.__clrK===k)window.__clrN=(window.__clrN|0)+1;else{window.__clrK=k;window.__clrN=0}return O[window.__clrN%O.length]})()/* coop-thin G #4: the same card still open after a pick (an option she cannot pay is ignored by chooseM) → the next option */||m.querySelector('.kbk-x,[aria-label="Đóng"]')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'}).catch(()=>'err');
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
 /* both press through the day buổi until both are at tối */
 async function toNight(tag){for(let g=0;g<6;g++){const a=await D(A),c=await D(B);if(a.b>=LAST&&c.b>=LAST&&a.w===c.w)return true;
   const k=await A.p.evaluate(()=>COOPW.tm.myKey());await setTm(A,{buoiMs:120000});await reset(A);await clear(A);await clear(B);await press(A);await press(B);
   await bothPast(A,B,k,30000);for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}}
  const a=await D(A),c=await D(B);return ok(a.b>=LAST&&c.b>=LAST,tag+': both at buổi tối',[a,c])||(a.b>=LAST&&c.b>=LAST)}
 /* wait for the merged week on both, then compare */
 async function merged(tag,w0,ms=60000){const t0=Date.now();while(Date.now()-t0<ms){await clear(A);await clear(B);
   const a=await D(A),c=await D(B);if(a.w>w0&&c.w>w0&&!a.pend&&!c.pend)break;await sleep(400)}
  await sleep(800);const a=await D(A),c=await D(B);ok(a.w===w0+1&&c.w===w0+1,tag+': both in the next week (exactly one step)',[w0,a.w,c.w]);
  if(!(a.w===w0+1&&c.w===w0+1))console.log('dbg '+tag,JSON.stringify(await A.p.evaluate(()=>{const G=COOPW.thin&&COOPW.thin.G;let st=null;try{st=COOPW.thin.seatOf('b')}catch(e){}
   return {gOn:!!(G&&G.on()),done:G&&G.done,stat:G&&G.stat,log:G&&G.log.slice(-6),thq:st&&st.S&&Array.isArray(st.S.thq)?st.S.thq.map(x=>x&&(x.t||x.k||x.kind)):null,frPz:!!(COOPW.frPz&&COOPW.frPz()),
    hold:!!(COOPW.gHold&&COOPW.gHold()),cyHold:COOPW.cyHold,cyNo:COOPW.cyNo,cyA:COOPW.thin&&COOPW.thin.E&&COOPW.thin.E.cyA,cyb:st&&st.S&&st.S.cyb,dlog:COOPW.thin&&COOPW.thin.D&&COOPW.thin.D.log.slice(-14),elog:COOPW.thin&&COOPW.thin.E&&COOPW.thin.E.log&&COOPW.thin.E.log.slice(-10),sent:COOPW.sent,pend:COOPW.pend,ngo:COOPW.ngo,tr:(COOPW.tr||[]).slice(-10)}}).catch(e=>e.message)),
   JSON.stringify(await B.p.evaluate(()=>{const m=document.getElementById('modal');return {Q:Q.length,mt:m&&!m.hidden?(document.getElementById('mt')||{}).textContent:'',btn:m&&!m.hidden?[...m.querySelectorAll('button')].filter(x=>x.offsetParent!==null).map(x=>x.textContent.trim().slice(0,30)):[],ov:!!(document.getElementById('ov')&&!document.getElementById('ov').hidden),ovB:(()=>{const o=document.getElementById('ov');if(!o||o.hidden)return null;return {kids:[...o.children].map(c=>c.id+'.'+(c.className||'').slice(0,30)+(c.hidden?':h':'')),btn:[...o.querySelectorAll('button')].filter(b=>b.offsetParent!==null).slice(0,12).map(b=>{const r=b.getBoundingClientRect(),h=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return [b.id,b.textContent.trim().slice(0,20),b.disabled?1:0,h?(h===b||b.contains(h)?'self':(h.id||'')+'.'+String(h.className||'').slice(0,30)):null]}),km:[...document.querySelectorAll('.kmov')].map(x=>String(x.className).slice(0,50))}})(),mg:!!S.mg,tr:(COOPW.tr||[]).slice(-8)}}).catch(e=>e.message)));
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
 /* 4 time out at tối, guest AFK */
 if(await toNight('4')){const w0=(await D(A)).w;await setTm(A,{buoiMs:9000,pauseCapMs:2000});await reset(A);
  for(let i=0;i<3;i++){await clear(B);await sleep(300)}/* flip-entry: the tablet is turned at the START of buổi tối (jfe/jnf); the guest reads what tối brings (a summons is a real choice, never auto-made) and only then goes AFK */
  
  const t0=Date.now();await clear(A);ok(await isRd(A)||await press(A),'4: host presses, guest AFK');
  let st=-1;while(Date.now()-t0<40000){const c=await D(B);if(c.pend||c.w>w0||c.sent===w0/* coop-thin G (level 13): her phone runs no night; the host's go reaches her as g-go (CW.sent = the week) */){st=Date.now()-t0;break}await sleep(300)}
  ok(st>=5000,'4: the guest night runs only when the clock ends (host commits)',st);await merged('4',w0)}
 for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
 /* 5 guest ready, reloads; host presses */
 if(await toNight('5')){const w0=(await D(A)).w;await setTm(A,{buoiMs:120000});await reset(A);await clear(B);ok(await isRd(B)||await press(B),'5: guest presses');await sleep(1500);
  await B.p.close();await until(A,()=>COOP.frozen,null,60000);await join(B,code);
  ok(await until(B,()=>COOP.seat==='b'&&!COOP.frozen&&!!(window.COOPW&&COOPW.on&&typeof S!=='undefined'&&S),null,60000),'5: guest back');
  for(let i=0;i<3;i++){await clear(B);await sleep(300)}
  const c=await D(B);if(c.b>=LAST&&!c.ready){await clear(B);await press(B)}
  await clear(A);ok(await isRd(A)||await press(A),'5: host presses');await merged('5',w0)}
 if(process.env.NIGHT_UPTO==='5'){const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed (NIGHT_UPTO 5)`);await b.close();process.exit(bad.length?1:0)}
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
