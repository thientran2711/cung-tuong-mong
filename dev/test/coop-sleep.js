/* Co-op: a phone that sleeps / switches apps (owner 16/11 "Tôi và bạn xong buổi sáng, rồi không thấy sang buổi luôn"), against the LIVE Worker.
   The guest's socket goes SILENT (frames dropped both ways, never closed: what iOS leaves after a sleep), the page is hidden, then visible again.
   usage: python3 dev/build/assemble.py && node dev/test/coop-sleep.js [outdir] [workerURL]
   1 her `bend` is lost in the dead socket → on return she reconnects at once (not after 45–70 s) and the buổi steps for both.
   2 the room steps while she is away and she comes back with a dialog open → the step waits for the dialog, then runs (was: stuck for good).
   3 the friend's chip on the host shows "đang vắng" / the lock word "Hảo hữu đang vắng" when she is gone; "Chờ hảo hữu…" while she waits. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../.tmp/coop-sleep'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const DCL={waitUntil:'domcontentloaded'};
const DEAD=new Set();let CONN=0;
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);await ctx.addInitScript(u=>{window.COOP_URL=u;
    /* the page's visibility is driven by the test */
    window.__vis='visible';Object.defineProperty(document,'visibilityState',{get:()=>window.__vis,configurable:true});Object.defineProperty(document,'hidden',{get:()=>window.__vis!=='visible',configurable:true})},WURL);
  const o={ctx,name,errs:[],conns:[]};
  await ctx.routeWebSocket(/\/api\/room\/[A-Za-z0-9]{4}\/ws/,ws=>{const id=++CONN;o.conns.push(id);const srv=ws.connectToServer();
    ws.onMessage(m=>{if(!DEAD.has(id))try{srv.send(m)}catch(e){}});srv.onMessage(m=>{if(!DEAD.has(id))try{ws.send(m)}catch(e){}});
    ws.onClose((c,r)=>{try{srv.close({code:c,reason:r})}catch(e){}});srv.onClose((c,r)=>{if(!DEAD.has(id))try{ws.close({code:c,reason:r})}catch(e){}})});
  o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);
    p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|WebSocket/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
async function until(o,fn,arg,ms=30000){try{await o.p.waitForFunction(fn,arg,{timeout:ms,polling:250});return true}catch(e){return false}}
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){try{await el.click({timeout:5000});return true}catch(e){}}await sleep(250)}return false}
const shot=async(o,n)=>{try{await o.p.screenshot({path:`${OUT}/${n}.png`,timeout:120000})}catch(e){console.log('shot failed',n,e.message.split('\n')[0])}};
/* close the normal game's dialogs (any button that only reads / takes the first road), end mini games: the test's own player */
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{
   const rs=document.querySelector('#kroul .krskip');if(rs&&rs.offsetParent!==null){rs.click();return'x'}/* bot family (jfocus «Tiếp ▸» dialogue line, e.g. cnvScold on a cung nữ): a player taps the line on */{const kf=[...document.querySelectorAll('.kfoc-next')].find(x=>x.offsetParent!==null);if(kf){kf.click();return'x'}}
   const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])')||m.querySelector('.kbk-x,[aria-label="Đóng"]')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'}).catch(()=>'err');
  if(st==='mg'){await o.p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}
  if(st!=='x')return st;await sleep(200)}return'many'}
const K=o=>o.p.evaluate(()=>({k:COOPW.tm.myKey(),rk:COOPW.tm.roomKey(),v:COOPW.tm.view(),bend:COOPW.bend,pend:COOPW.pend,pb:!!COOPW.pendBuoi,Q:Q.length,mg:!!S.mg,next:document.getElementById('next').textContent,chip:(document.getElementById('kctm')||{}).textContent||'',chipOn:!!(document.getElementById('kctm')&&!document.getElementById('kctm').hidden)}));
const press1=o=>o.p.evaluate(()=>{const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true});
async function press(o,ms=20000){const t0=Date.now();while(Date.now()-t0<ms){if(await press1(o))return true;await clear(o);await sleep(300)}return false}
const setTm=(o,t)=>o.p.evaluate(t=>{Object.assign(BAL.coopTm,t)},t);
const reset=o=>o.p.evaluate(()=>COOPW.tm.reset());
/* wait until a seat has moved past key k (its own buổi, or its week end is out) */
const past=(o,k,ms)=>until(o,k=>COOPW.tm.myKey()!==k||COOPW.pend||COOPW.sent===(COOP.state.week||0),k,ms);
async function bothPast(A,B,k,ms){const t0=Date.now();while(Date.now()-t0<ms){const a=await A.p.evaluate(k=>COOPW.tm.myKey()!==k,k),b=await B.p.evaluate(k=>COOPW.tm.myKey()!==k,k);if(a&&b)return Date.now()-t0;await sleep(250)}return -1}
async function join(B,code){await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục/,4000)}

(async()=>{const b=await chromium.launch();
 const A=await mk(b,'host',[755,1000,2]),B=await mk(b,'guest',[1180,820,1]);
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A: Cùng hảo hữu');await A.p.waitForTimeout(600);
 ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A: Mời hảo hữu');
 ok(await until(A,()=>COOP.code&&COOP.seat==='a'),'A has a room');const code=await A.p.evaluate(()=>COOP.code);console.log('room',code);
 ok(await A.p.evaluate(()=>{const r=document.querySelector('#modal .kctmlen');return !!r&&/Mỗi buổi tối đa/.test(r.textContent)&&/✓ 5 phút/.test(r.textContent)}),'lobby: host sees Mỗi buổi tối đa 3 / 5 / 8 phút (5 chosen)');
 await shot(A,'tm-lobby-755x1000');
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
 const sleepB=async()=>{DEAD.add(B.conns[B.conns.length-1]);await B.p.evaluate(()=>{window.__vis='hidden';document.dispatchEvent(new Event('visibilitychange'))})};
 const wakeB=()=>B.p.evaluate(()=>{window.__vis='visible';document.dispatchEvent(new Event('visibilitychange'))});
 for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
 /* 1 her bend is lost in a dead socket */
 {const k=(await K(A)).k;ok(k===(await K(B)).k,'1: same buổi',k);const n0=B.conns.length;
  await sleepB();ok(await press(B),'1: B presses Sẵn sàng (into the dead socket)');
  ok(await until(B,()=>document.getElementById('next').textContent==='Chờ hảo hữu…',null,5000),'1: B #next says "Chờ hảo hữu…"',await K(B));
  await clear(A);ok(await press(A),'1: A presses Sẵn sàng');
  ok(await until(A,()=>document.getElementById('next').textContent==='Chờ hảo hữu…'&&/Trong lúc đợi/.test((document.getElementById('kctm')||{}).textContent||''),null,8000),'1: A waits: "Chờ hảo hữu…" + "Trong lúc đợi…" chip',await K(A));
  await shot(A,'sl-wait-755x1000');
  await sleep(5000);const t0=Date.now();await wakeB();
  ok(await (async()=>{const t=Date.now();while(Date.now()-t<6000){if(B.conns.length>n0)return true;await sleep(200)}return false})(),'1: B reconnects at once on return',B.conns.length-n0);
  const ms=await bothPast(A,B,k,20000);ok(ms>=0&&ms<12000,'1: the lost bend is resent → both step',ms)}
 for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
 /* 2 the room steps while she is away, she returns with a dialog open */
 {const k=(await K(A)).k;ok(k===(await K(B)).k,'2: same buổi',k);
  if(+k.split(':')[1]>=(await A.p.evaluate(()=>typeof B4L==='number'?B4L:2))){ok(true,'2: skipped (already tối)')}else{
  await clear(B);ok(await press(B),'2: B presses Sẵn sàng (delivered)');await sleep(1500);
  await sleepB();await clear(A);ok(await press(A),'2: A presses Sẵn sàng → the room steps (B does not hear it)');
  ok(await until(A,k=>COOPW.tm.myKey()!==k,k,15000),'2: A stepped');
  await B.p.evaluate(()=>{Q.push({t:'Thư nhà',b:'Một lá thư nhà.'});showModal()});
  await sleep(3000);await wakeB();await sleep(4000);
  ok((await K(B)).k===k,'2: B still on the old buổi while the dialog is open',await K(B));
  await clear(B);ok(await until(B,k=>COOPW.tm.myKey()!==k,k,15000),'2: B steps once the dialog is closed',await K(B));
  const a=await K(A),bb=await K(B);ok(a.k===bb.k,'2: same buổi again',[a.k,bb.k])}}
 /* 4 the friend chip at the top in every state (shots 755x1000 = host A, 1180x820 = guest B) */
 for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
 {const fr=o=>o.p.evaluate(()=>{const e=document.getElementById('kctmf');return e&&!e.hidden?e.textContent:''});
  const box=o=>o.p.evaluate(()=>{const e=document.getElementById('kctmf'),h=document.querySelector('header.hud');if(!e||e.hidden)return null;const r=e.getBoundingClientRect();return{l:r.left,r:r.right,t:r.top,b:r.bottom,hb:h.getBoundingClientRect().bottom,w:innerWidth}});
  ok(await until(A,()=>/Đang làm việc/.test((document.getElementById('kctmf')||{}).textContent||''),null,8000),'4: A top chip: "… Đang làm việc"',await fr(A));
  ok(await until(B,()=>/Đang làm việc/.test((document.getElementById('kctmf')||{}).textContent||''),null,8000),'4: B top chip: "… Đang làm việc"',await fr(B));
  const ba=await box(A),bb=await box(B);ok(ba&&ba.r<=ba.w&&ba.l>=0&&bb&&bb.r<=bb.w,'4: chip inside the screen',[ba,bb]);
  await shot(A,'f-work-755x1000');await shot(B,'f-work-1180x820');
  for(const [w,h] of [[1366,1024],[1000,755],[844,390],[390,844]]){await B.p.setViewportSize({width:w,height:h});await sleep(4000);await shot(B,`f-work-${w}x${h}`);
   const bx=await box(B);const ov=await B.p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);ok(!ov&&(w<h||bx&&bx.r<=bx.w+1&&bx.l>=0),`4: ${w}x${h} chip inside the screen, no overflow`,bx)}
  await B.p.setViewportSize({width:1180,height:820});await sleep(1500);
  await B.p.evaluate(()=>{Q.push({t:'Thư nhà',b:'Một lá thư nhà.'});showModal()});
  ok(await until(A,()=>/Đang bận/.test((document.getElementById('kctmf')||{}).textContent||''),null,5000),'4: B reads a dialog → A sees "! Đang bận" (pushed at once)',await fr(A));
  await shot(A,'f-busy-755x1000');await clear(B);
  await A.p.evaluate(()=>{Q.push({t:'Thư nhà',b:'Một lá thư nhà.'});showModal()});
  ok(await until(B,()=>/Đang bận/.test((document.getElementById('kctmf')||{}).textContent||''),null,5000),'4: A in a dialog → B sees "Đang bận"',await fr(B));
  await shot(B,'f-busy-1180x820');await clear(A);
  const k=(await K(A)).k;
  if(+k.split(':')[1]<(await A.p.evaluate(()=>typeof B4L==='number'?B4L:2))){
   await A.p.evaluate(()=>{const b=document.getElementById('next');b.click()});
   ok(await until(B,()=>/Đã sẵn sàng/.test((document.getElementById('kctmf')||{}).textContent||''),null,6000),'4: A ready → B sees "✓ Đã sẵn sàng"',await fr(B));
   await shot(B,'f-ready-1180x820');await shot(A,'f-mewait-755x1000');
   await B.p.click('#kctmf .kctmf');ok(await until(B,()=>{const M=document.getElementById('modal');return !M.hidden&&!!M.querySelector('.dlg.kpanel')},null,3000),'4: tap the «Hảo hữu» icon → partner sheet (KIT §69.2, owner 21/11 ~06:30Z)');
   await shot(B,'f-panel-1180x820');await B.p.click('#modal .kph .kit-x');
   await A.p.click('#kctmf .kctmf');await sleep(500);await shot(A,'f-panel-755x1000');await A.p.click('#modal .kph .kit-x');
   await B.p.evaluate(()=>document.querySelector('[data-ctm=hold]')&&document.querySelector('[data-ctm=hold]').click());await sleep(1500);await shot(A,'f-hold-755x1000');
   await B.p.evaluate(()=>{const g=document.querySelector('[data-ctm=go]');if(g)g.click()});await sleep(800);
   await press(B);await bothPast(A,B,k,15000)}}
 /* 3 friend away (the server drops a silent seat after 45 s) */
 for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
 {await sleepB();ok(await until(A,()=>!COOP.state.peerOnline,null,90000),'3: host sees the friend gone (server STALE)');
  ok(await until(A,()=>/Hảo hữu mở lại trò chơi là tự vào lại/.test((document.getElementById('coopfz')||{}).textContent||''),null,8000),'3: freeze panel tells what to do');
  await shot(A,'sl-away-755x1000');
  await wakeB();ok(await until(A,()=>COOP.state.peerOnline&&!document.getElementById('coopfz'),null,20000),'3: friend back, panel gone')}
 const errs=[...A.errs,...B.errs];ok(!errs.length,'no page errors',errs.slice(0,5));
 const f=res.filter(r=>!r[0]);console.log(`\n${res.length-f.length}/${res.length} ok`);await b.close();process.exit(f.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
