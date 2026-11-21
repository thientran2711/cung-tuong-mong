/* review/coop-cyhold probe: an AFK GUEST with her maid's Kỳ nguyệt sự card open must not hold the HOST's week end for ever.
   Before (LIVE f3353128): COOPW.cyHold (jcoopworld flip) blocks sendEnd until she answers or ends her week; nothing bounds it.
   After: the hold ends after BAL.coop.cyWaitMs; the host draws with the «no answer» outcome, his week end goes out, her card stays open
   on her phone (never answered for her), she gets the kit notice, and her late answer is still written into her S.cyb (traceable).
   usage: python3 dev/build/assemble.py && node dev/test/coop-cyhold.js [outdir] [workerURL]   (THIN=5: thin room level 5;
   CY_WAIT=<ms> the bound used by the probe, default 20000; CY_RELOAD=1: host-reload case (NLC #10 coop-night 12), use CY_WAIT=120000; CYC_HTML=<file> another build for both seats). A = host 755x1000@2, B = guest 1180x820@2. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const BASE='http://ctm.local/';let HTML=path.join(ROOT,'.tmp/old.html');
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.mp3':'audio/mpeg','.css':'text/css','.webmanifest':'application/manifest+json','.svg':'image/svg+xml'};
async function serve(ctx){ctx.__html=ctx.__html||path.join(ROOT,'dev/index.html');await ctx.route(BASE+'**',async route=>{const u=new URL(route.request().url());let p=decodeURIComponent(u.pathname);
 if(p==='/'||p==='/index.html'){const body='<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></head><body>'+fs.readFileSync(ctx.__html,'utf8')+'</body></html>';return route.fulfill({status:200,contentType:MIME['.html'],body})}
 const f=path.join(ROOT,p);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return route.fulfill({status:404,body:'nf'});route.fulfill({status:200,contentType:MIME[path.extname(f)]||'application/octet-stream',body:fs.readFileSync(f)})})}
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../.tmp/coop-cyhold'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const THIN=+process.env.THIN>=4;/* thin guest (part D cards, her person on the host): the rewrite for the thin model */
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const DCL={waitUntil:'domcontentloaded'};
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}},[WURL,name==='host'&&process.env.THIN?+process.env.THIN:0]);/* THIN=<level>: the host asks for that thin room level (coop-thin-e: 5) */
  const o={ctx,name,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);
    p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator.vibrate/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
async function until(o,fn,arg,ms=30000){try{await o.p.waitForFunction(fn,arg,{timeout:ms,polling:250});return true}catch(e){return false}}
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){try{await el.click({timeout:5000});return true}catch(e){}}await sleep(250)}return false}
const shot=async(o,n)=>{try{await o.p.screenshot({path:`${OUT}/${n}.png`,timeout:120000})}catch(e){console.log('shot failed',n,e.message.split('\n')[0])}};
/* close the normal game's dialogs (any button that only reads / takes the first road), end mini games: the test's own player */
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}const kv=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&!x.querySelector('.kmend')&&!x.dataset.tsk);if(kv){kv.dataset.tsk=1;kv.click();return'x'}
   const rs=document.querySelector('#kroul .krskip');if(rs&&rs.offsetParent!==null){rs.click();return'x'}
   const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(window.__keepCy&&m&&!m.hidden&&/Báo đúng ngày/.test(m.textContent))return'cy';if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])')||m.querySelector('.kbk-x,[aria-label="Đóng"]')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'}).catch(()=>'err');
  if(st==='mg'){await o.p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}
  if(st!=='x')return st;await sleep(200)}return'many'}
const K=o=>o.p.evaluate(()=>({k:COOPW.tm.myKey(),rk:COOPW.tm.roomKey(),v:COOPW.tm.view(),bend:COOPW.bend,pend:COOPW.pend,pb:!!COOPW.pendBuoi,Q:Q.length,mg:!!S.mg,next:document.getElementById('next').textContent,chip:(document.getElementById('kctm')||{}).textContent||'',chipOn:!!(document.getElementById('kctm')&&!document.getElementById('kctm').hidden)}));
/* r1: a seat already night-ready by itself (a night with the Emperor → jnight) counts as pressed */
const isRd=o=>o.p.evaluate(()=>!!(window.COOPW&&COOPW.on&&COOPW.nReady&&COOPW.nReady()));
const press1=o=>o.p.evaluate(()=>{const b=document.getElementById('next');if(!b||b.disabled)return false;const m=document.getElementById('modal');if(m&&!m.hidden&&(/Báo đúng ngày/.test(m.textContent)||window.__keepCy))return false;/* a player cannot reach #next under an open card (the guest: any card) */b.click();return true});
async function press(o,ms=20000){const t0=Date.now();while(Date.now()-t0<ms){if(await press1(o))return true;await clear(o);await sleep(300)}return false}
const setTm=(o,t)=>o.p.evaluate(t=>{Object.assign(BAL.coopTm,t)},t);
const reset=o=>o.p.evaluate(()=>COOPW.tm.reset());
/* wait until a seat has moved past key k (its own buổi, or its week end is out) */
const past=(o,k,ms)=>until(o,k=>COOPW.tm.myKey()!==k||COOPW.pend||COOPW.sent===(COOP.state.week||0),k,ms);
async function bothPast(A,B,k,ms){const t0=Date.now();while(Date.now()-t0<ms){const a=await A.p.evaluate(k=>COOPW.tm.myKey()!==k,k),b=await B.p.evaluate(k=>COOPW.tm.myKey()!==k,k);if(a&&b)return Date.now()-t0;await sleep(250)}return -1}
async function join(B,code){await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục/,4000)}
(async()=>{const b=await chromium.launch(/127\.0\.0\.1|localhost/.test(WURL)?{args:['--disable-web-security','--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,LocalNetworkAccessChecks']}:{})/* a local wrangler dev Worker (as coop-e2e) */;
 /* CYC_SWAP=1: swapped roles (host iPad 1180x820, guest Fold 755x1000) */const SW=!!process.env.CYC_SWAP;const A=await mk(b,'host',SW?[1180,820,2]:[755,1000,2]),B=await mk(b,'guest',SW?[755,1000,2]:[1180,820,2]);
 if(process.env.CYC_HTML){A.ctx.__html=B.ctx.__html=path.resolve(process.env.CYC_HTML)}/* the BEFORE run: an older build for both seats */
 const inGame=o=>o.p.evaluate(()=>!!(COOPW.on&&typeof S!=='undefined'&&S&&!COOPW.inLife&&document.getElementById('title').hidden&&!document.getElementById('kroul')&&document.getElementById('next').offsetParent)).catch(()=>false);
 async function bothIn(lbl){const t0=Date.now();while(Date.now()-t0<150000){await clear(A);await clear(B);if(await inGame(A)&&await inGame(B))break;await sleep(700)}ok(await inGame(A)&&await inGame(B),lbl)}
 const isCy=o=>o.p.evaluate(()=>{const m=document.getElementById('modal');return !!(m&&!m.hidden&&/Báo đúng ngày/.test(m.textContent))});
 /* close everything on B except her maid's cycle card (the test answers that one itself) */
 const clearB=async()=>{await B.p.evaluate(()=>{window.__keepCy=1});for(let i=0;i<25;i++){if(await isCy(B))return 'cy';const s=await clear(B,1);if(s==='cy')return s;if(s!=='x'&&s!=='many'&&s!=='mg')return s}};
 const wkA=()=>A.p.evaluate(()=>COOP.state.week||0),wkB=()=>B.p.evaluate(()=>COOP.state.week||0);
 async function merge(w0,lbl,keepB){for(let i=0;i<60;i++){if(await wkA()>w0&&await wkB()>w0)break;/* thin: her card is asked at the new week's start (the week has merged already) */await clear(A);if(!(keepB&&await wkB()>w0))await clear(B);await press1(A);await press1(B);await sleep(800);if(await wkA()>w0&&await wkB()>w0)break}
  /* keep the guest's dialogs (her "Kính sự phòng báo tin" card): clear() takes its first road, which may decline the night */
  for(let i=0;i<4;i++){await clear(A);if(!keepB)await clear(B);await sleep(300)}ok(await wkA()>w0&&await wkB()>w0,lbl)}
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A: Cùng hảo hữu');await A.p.waitForTimeout(600);
 ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A: Mời hảo hữu');
 ok(await until(A,()=>COOP.code&&COOP.seat==='a'),'A has a room');const code=await A.p.evaluate(()=>COOP.code);console.log('room',code);
 await join(B,code);ok(await until(B,()=>COOP.seat==='b'&&!COOP.frozen,null,60000),'B in seat b');
 await bothIn('both in the game');
 for(const o of [A,B])await setTm(o,{buoiMs:600000});
 {const RK=rk=>{if(S.srv)S.srv.risen=1;S.rank=rk;S.bac=Math.max(S.bac||0,400);S.duc=Math.max(S.duc||0,60);if(!COOPW.ctx)render()};
  await A.p.evaluate(RK,5);
  if(THIN)await A.p.evaluate(src=>{COOPW.thin.withSeat('b',()=>(0,eval)('('+src+')')(3));try{COOPW.thin.flush()}catch(e){}},RK.toString());else await B.p.evaluate(RK,3)}
 if(!(await until(A,()=>!!COOPW.friend(),null,20000)))await merge(await wkA(),'setup: one week (her consort entry comes with the merged week)');
 ok(await until(A,()=>!!COOPW.friend(),null,60000),'the host has the guest as a consort entry');
 const WAIT=+process.env.CY_WAIT||20000;
 /* the bound under test (one core: BAL.coop.cyWaitMs); on a build without it this changes nothing */
 for(const o of [A,B])await o.p.evaluate(w=>{BAL.coop=Object.assign({},BAL.coop||{},{cyWaitMs:w})},WAIT);
 await B.p.evaluate(()=>{window.__kl=[];const f=window.kitLine;if(typeof f==='function')window.kitLine=function(t){try{window.__kl.push(String(t))}catch(e){}return f.apply(this,arguments)}});
 const STG=()=>{if(!S.maid)S.maid=(S.staff||[])[0]||{name:'Thử',loyal:60};S.preg=0;S.hidden=false;S.fake=0;S.cyb={};S.sung=Math.max(S.sung||0,40);S.age=Math.min(S.age||18,30);
  const want=((S.tuan||0)+1)%3,base=window.__nm0||(window.__nm0=S.name);for(let i=0;i<400;i++){S.name=base+(i?' '+i:'');if(cyBase(S).t===want)break}if(!COOPW.ctx)render();return{name:S.name,want,t:cyBase(S).t,age:S.age}};
 const nb=THIN?await A.p.evaluate(src=>{const r=COOPW.thin.withSeat('b',()=>(0,eval)('('+src+')')());try{COOPW.thin.flush()}catch(e){}return r},STG.toString()):await B.p.evaluate(STG);
 if(THIN)await until(B,n=>S.name===n&&!!S.maid&&!S.preg,nb.name,15000);
 if(!THIN)await A.p.evaluate(n=>{const f=COOPW.friend();if(f){f.name=n.name;f.age=n.age;f.preg=0;f.fake=0}},nb);
 const w0=await wkA();let held=null,asked=false;
 /* her card comes with her own flip/tuần: drive both seats until it is on her screen; then she stops (AFK) */
 for(let i=0;i<60&&!asked;i++){await clear(A);if((await clearB())==='cy'){asked=true;break}await press1(A);await press1(B);await sleep(700)}
 ok(asked,'B (guest) gets her maid\'s Kỳ nguyệt sự card',nb);
 if(process.env.CY_RELOAD){/* NLC #10 coop-night case 12: she answers, then the HOST reloads (CW.fcy is memory only): his hold must free from
   her answer said again (cyq), not wait for the bound (CY_WAIT large here) */
  const t1=await B.p.evaluate(()=>{const x=[...document.querySelectorAll('#modal button')].find(b=>b.offsetParent!==null&&/^Báo đúng/.test(b.textContent.trim()));if(x){x.click();return true}return false});
  for(let i=0;i<30&&!(await B.p.evaluate(()=>!!(S.cyb&&S.cyb.rv)));i++){await sleep(400);await B.p.evaluate(()=>{const x=[...document.querySelectorAll('#modal button')].find(b=>b.offsetParent!==null&&!b.disabled&&/^(Chọn|Đồng ý|Quyết|Xác nhận|Báo đúng)/.test(b.textContent.trim()));if(x)x.click()})}
  ok(t1&&await B.p.evaluate(()=>!!(S.cyb&&S.cyb.rv)),'reload: she answered her card before the host left',await B.p.evaluate(()=>S.cyb));
  await sleep(1500);await A.p.goto(BASE+'?room='+code,DCL);await A.p.waitForTimeout(3000);await tapText(A,/^Vào phòng|^Tiếp tục|^Trở lại phòng/,6000);
  ok(await until(A,()=>typeof COOPW==='object'&&COOPW.on&&COOP.seat==='a',null,60000),'reload: the host is back in the room');
  for(const o of [A,B])await setTm(o,{buoiMs:15000,pauseCapMs:10000});await reset(A);await reset(B);
  console.log('reload state',JSON.stringify(await A.p.evaluate(w=>({w,hold:COOPW.cyHold,sent:COOPW.sent,pend:COOPW.pend,week:COOP.state.week,ended:COOP.state.ended,b:S.buoi,fcy:COOPW.fcy||null}),w0)));
  const wR=await A.p.evaluate(()=>COOP.state.week||0);
  const t0=Date.now();let out=-1;
  while(Date.now()-t0<120000){await clear(A);await clear(B);await press1(A);await press1(B);
   const s=await A.p.evaluate(()=>({hold:COOPW.cyHold,sent:COOPW.sent,week:COOP.state.week||0,end:!!(COOP.state.ended||{}).a}));
   if(s.hold==null&&(s.sent===wR||s.end||s.week>wR)){out=Date.now()-t0;break}await sleep(1000)}
  const trR=await A.p.evaluate(()=>(COOPW.tr||[]).filter(x=>/cy/.test(x)).slice(-6));
  ok(out>=0&&out<WAIT-5000&&!trR.some(x=>/cyTimeout/.test(x)),'reload: the host\'s week end goes out from her answer said again (not the bound, no stall)',{out,WAIT,trR});
  await merge(wR,'reload: the week merges');
  ok(await A.p.evaluate(()=>COOPW.cyHold==null),'reload: no hold left on the host');
  ok(!A.errs.length,'host: no page errors',A.errs.slice(0,5));ok(!B.errs.length,'guest: no page errors',B.errs.slice(0,5));
  await b.close();const f=res.filter(x=>!x[0]).length;console.log('RESULT',res.length-f,'/',res.length);process.exit(f?1:0)}
 /* the room clock is the only thing that moves an AFK room: a short buổi so tối times out and the host commits the night (forceNight) */
 for(const o of [A,B])await setTm(o,{buoiMs:15000,pauseCapMs:10000});await reset(A);await reset(B);
 let tH=0;const t00=Date.now();
 while(Date.now()-t00<240000){await clear(A);await press1(A);
  held=await A.p.evaluate(()=>COOPW.cyHold!=null&&(COOPW.thin.lvl>=5||COOPW.sent!==(COOP.state.week||0))?{hold:COOPW.cyHold,week:COOP.state.week||0,pend:COOPW.pend}:null);if(held){tH=Date.now();break}await sleep(700)}
 console.log('dbg',JSON.stringify(await A.p.evaluate(()=>({lvl:COOPW.thin&&COOPW.thin.lvl,tr:(COOPW.tr||[]).slice(-10),ended:COOP.state.ended,week:COOP.state.week,sent:COOPW.sent,pend:COOPW.pend,fcy:COOPW.fcy}))));
 ok(!!held||!THIN,(held?'':'N/A level 0 (no cyHold in this flow): ')+'the host\'s week end is held for her answer (cyHold) after the room clock forced the night',held);
 /* she stays AFK: her card stays open, she never presses; the host keeps playing (clears his own dialogs, presses Sẵn sàng) */
 let freed=-1;const hw=held?held.week:-9;
 while(held&&Date.now()-tH<WAIT+45000){await clear(A);await press1(A);
  const s=await A.p.evaluate(w=>({hold:COOPW.cyHold,sent:COOPW.sent,week:COOP.state.week||0,end:!!(COOP.state.ended||{}).a}),hw);
  if(process.env.CY_DBG)console.log('t',Date.now()-tH,JSON.stringify(await A.p.evaluate(()=>{const v=COOPW.tm.view();return [v.left,v.run,v.pz,v.hold,COOPW.tm.myKey(),COOPW.cyHold,COOPW.ngo]})));
  if(s.hold==null&&(s.sent===hw||s.end||s.week>hw)){freed=Date.now()-tH;break}await sleep(1000)}
 const tr=await A.p.evaluate(()=>(COOPW.tr||[]).filter(x=>/cy/.test(x)).slice(-6));
 if(freed>=0){await shot(A,'cyhold-note-host-755x1000');await shot(B,'cyhold-note-guest-1180x820')}/* reviewer: the kit notice on both seats, right when the wait runs out */
 if(freed>=0)for(const o of [A,B]){await sleep(1500);const nl=await o.p.evaluate(()=>(typeof kitNoticeList==='function'?kitNoticeList():[]).map(x=>x.line||x.t||'').filter(t=>/Quá giờ chờ/.test(t)));ok(nl.length>=1,o.name+': the «no answer» line is in her kit notice box (§42.2 «!»)',nl)}
 if(process.env.CY_DBG)console.log('dbg2',JSON.stringify(await A.p.evaluate(()=>({tr:(COOPW.tr||[]).slice(-12),ended:COOP.state.ended,week:COOP.state.week,sent:COOPW.sent,pend:COOPW.pend,inTurn:COOPW.inTurn,b:S.buoi,tn:S.tn,Q:Q.length,tm:COOPW.tm.view(),mk:COOPW.tm.myKey(),rk:COOPW.tm.roomKey(),next:document.getElementById('next').textContent,E:COOPW.thin.E&&COOPW.thin.E.log.slice(-8)}))),JSON.stringify(await B.p.evaluate(()=>({b:S.buoi,pend:COOPW.pend,next:document.getElementById('next').textContent,ended:COOP.state.ended}))));
 ok(freed>=0||(!held&&!THIN),'AFK guest: the host\'s week end goes out within the bound (+45 s slack)',{freed,WAIT,tr});
 ok(freed>=WAIT-8000||(!held&&!THIN),'the host waited about the bound before going on (not at once)',{freed,WAIT});
 ok(await isCy(B),'her card is still open on her phone (a real choice is never made for her)');
 const kl=await B.p.evaluate(()=>window.__kl||[]);
 ok((!held&&!THIN)||kl.some(t=>/Kính sự phòng|không đợi|lật thẻ|nguyệt/i.test(t)),'the guest gets the kit notice',kl.slice(-4));
 /* she comes back and answers late: her answer is still hers and kept (traceable), the week still merges */
 const tapped=await B.p.evaluate(()=>{const x=[...document.querySelectorAll('#modal button')].find(b=>b.offsetParent!==null&&/^Báo đúng/.test(b.textContent.trim()));if(x){x.click();return true}return false});
 for(let i=0;i<30&&!(await B.p.evaluate(()=>!!(S.cyb&&S.cyb.rv)));i++){await sleep(400);await B.p.evaluate(()=>{const x=[...document.querySelectorAll('#modal button')].find(b=>b.offsetParent!==null&&!b.disabled&&/^(Chọn|Đồng ý|Quyết|Xác nhận|Báo đúng)/.test(b.textContent.trim()));if(x)x.click()})}
 const cb=await B.p.evaluate(()=>S.cyb||{});
 ok(tapped,'she taps her late answer',cb);
 if(process.env.CY_DBG)console.log('dbg3',JSON.stringify(await A.p.evaluate(()=>{const T=COOPW.thin;let q=null;try{q=T.withSeat('b',()=>(S.thq||[]).map(c=>c&&c.pid))}catch(e){q=String(e)}return{E:T.E&&T.E.log.slice(-8),bad:(T.D.bad||[]).slice(-4),log:(T.D.log||[]).slice(-6),thq:q,pend:COOPW.pend,sent:COOPW.sent,wk:wk()}})).slice(0,1800),JSON.stringify(await B.p.evaluate(()=>({modal:!document.getElementById('modal').hidden&&document.getElementById('modal').textContent.slice(0,80),ds:window.__ds}))));
 await merge(w0,'the week merges after she is back');
 {const cb2=await B.p.evaluate(()=>Object.assign({},S.cyb||{})),ch=await A.p.evaluate(()=>{try{return Object.assign({},COOPW.fcyb())}catch(e){return null}});
  const hw2=held?held.week:-9;ok((!held&&!THIN)||cb2.to===hw2&&(cb2.rv==='dung'||(THIN&&cb2.rk!==hw2))&&(!THIN||(ch&&ch.to===hw2)),'her cycle state is traceable: «no answer in time» for that week (S.cyb.to), her late answer kept while her week lasts (level 0) / the card past at thin',{before:cb,after:cb2,host:ch})}
 ok(await A.p.evaluate(()=>COOPW.cyHold==null),'no hold left on the host');
 await shot(A,'cyhold-host-755x1000');await shot(B,'cyhold-guest-1180x820');
 ok(!A.errs.length,'host: no page errors',A.errs.slice(0,5));ok(!B.errs.length,'guest: no page errors',B.errs.slice(0,5));
 await b.close();const f=res.filter(x=>!x[0]).length;console.log('RESULT',res.length-f,'/',res.length);process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
