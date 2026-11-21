/* review/bundle-nfstall: 2-seat drive (real Worker), both seats play on (no AFK), the test answers every dialog / scene as a player would.
   Checks the room keeps moving week after week on the night-final (jnf) flow and that the GUEST's flip (jnf guest branch → jcycle cyAsk)
   fires in every week. On no progress for STALL steps it prints both seats' state (Q, modal, on-screen kit scenes + their buttons, S.nfX,
   cfBusy/cfAge) and fails. usage: python3 dev/build/assemble.py && node dev/test/coop-nf-stall.js [outdir] [workerURL]
   env: FW_N weeks (default 8) · THIN=<level> · STALL steps without a new week before the dump (default 60). */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const BASE='http://ctm.local/';let HTML=path.join(ROOT,'.tmp/old.html');
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.mp3':'audio/mpeg','.css':'text/css','.webmanifest':'application/manifest+json','.svg':'image/svg+xml'};
async function serve(ctx){ctx.__html=ctx.__html||path.join(ROOT,'dev/index.html');await ctx.route(BASE+'**',async route=>{const u=new URL(route.request().url());let p=decodeURIComponent(u.pathname);
 if(p==='/'||p==='/index.html'){const body='<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></head><body>'+fs.readFileSync(ctx.__html,'utf8')+'</body></html>';return route.fulfill({status:200,contentType:MIME['.html'],body})}
 const f=path.join(ROOT,p);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return route.fulfill({status:404,body:'nf'});route.fulfill({status:200,contentType:MIME[path.extname(f)]||'application/octet-stream',body:fs.readFileSync(f)})})}
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../.tmp/coop-nf-stall'));fs.mkdirSync(OUT,{recursive:true});
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
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}const kc=[...document.querySelectorAll('.kmov [data-km-close]')].find(x=>x.offsetParent!==null&&!x.disabled&&x.getClientRects().length);if(kc){kc.click();return'x'}const rw=document.querySelector('.kmov .kmrew:not(.km-done)');if(rw&&!rw.dataset.tsk){rw.dataset.tsk=1;rw.click();return'x'}/* a mini-game window (#kg82 in #ov, j82 playArt: the jsmg steal game of the night choice): the player takes its quick road «Thôi, không chơi» on the intro, the result card's ✕ (= its hidden «Đã hiểu», jk4 kitOvBtn) on the result */const g8=document.getElementById('kg82');if(g8&&g8.getClientRects().length){const gb=document.getElementById('kg82ok')||document.getElementById('kg82skip');if(gb&&!gb.disabled){gb.click();return'x'}/* «Đã hiểu» is hidden by the kit on the result card (jk4 kitOvBtn: ✕ / tap outside / Esc press it) */}const kv=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&!x.querySelector('.kmend')&&!x.dataset.tsk);if(kv){kv.dataset.tsk=1;kv.click();return'x'}
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

 /* flip-per-week drive: no AFK, B clears everything (answers cards); record each guest flip() and window.cyAsk() call */
 await B.p.evaluate(()=>{window.__fl=[];const f=flip;flip=function(){const w=COOP.state.week,t=S&&S.tuan,on=typeof cycOn==='function'&&S?cycOn(S):'?';let r;try{r=f.apply(this,arguments)}finally{window.__fl.push(['flip',w,t,S&&S.buoi,on])}return r};
  const a=window.cyAsk;window.cyAsk=function(){let r;try{r=a.apply(this,arguments)}finally{window.__fl.push(['ask',COOP.state.week,S&&S.tuan,r])}return r}});
 const W0=await wkA();const N=+process.env.FW_N||8;let it=0;
 const DUMP=o=>o.p.evaluate(()=>({wk:COOP.state.week,buoi:S.buoi,pend:COOPW.pend,sent:COOPW.sent,cyHold:COOPW.cyHold,Q:Q.map(m=>m.pid||m.t).slice(0,6),modal:(()=>{const m=document.getElementById('modal');return m&&!m.hidden?m.textContent.slice(0,100):''})(),next:(document.getElementById('next')||{}).textContent,nfX:S.nfX||null,mg:!!S.mg,busy:window.cfBusy?window.cfBusy():'?',age:window.cfAge?window.cfAge():'?',kmov:[...document.querySelectorAll('.kmov:not(.km-out)')].map(e=>[e.id,e.className,getComputedStyle(e).display,[...e.querySelectorAll('button')].map(b=>b.textContent.trim().slice(0,24)+(b.getClientRects().length?'':'(h)')).slice(0,4)]).slice(0,4),body:document.body.className,kg82:(()=>{const k=document.getElementById('kg82'),ov=document.getElementById('ov');return k?{ovHidden:ov&&ov.hidden,disp:getComputedStyle(k).display,phase:typeof KG82==='object'?KG82.phase:'?',btns:[...k.querySelectorAll('button')].map(b=>b.textContent.trim().slice(0,20)+(b.getClientRects().length?'':'(h)')).slice(0,6)}:null})(),ov:(()=>{const ov=document.getElementById('ov');return ov?{hidden:ov.hidden,kids:[...ov.children].map(c=>c.id+(c.hidden?'(h)':'')).slice(0,6)}:null})(),mdl:(()=>{const m=document.getElementById('modal');return m?{hidden:m.hidden,cls:m.className}:null})()}));
 const STALL=+process.env.STALL||60;let lastW=-1,lastIt=0,stuck=null;
 while(it<N*40&&(await wkA())<W0+N){await clear(A);await clear(B);await press1(A);await press1(B);await sleep(600);it++;const w=await wkA();if(w!==lastW){lastW=w;lastIt=it}
  if(it-lastIt>=STALL){stuck={A:await DUMP(A),B:await DUMP(B)};console.log('STALL A',JSON.stringify(stuck.A));console.log('STALL B',JSON.stringify(stuck.B));break}}
 ok(!stuck,'the room never waits '+STALL+' steps without a new week',stuck&&{wkA:stuck.A.wk});
 const L=await B.p.evaluate(()=>window.__fl);const wks={};for(const x of L){const k=x[1];wks[k]=wks[k]||{flip:0,ask:0,on:false};if(x[0]==='flip'){wks[k].flip++;if(x[4]===true)wks[k].on=true}else{wks[k].ask++}}
 console.log('ITER',it,'weeks',W0,'->',await wkA());
 for(let w=W0;w<W0+N;w++)console.log('WK',w,JSON.stringify(wks[w]||{flip:0,ask:0}));
 console.log('RAW',JSON.stringify(L).slice(0,1500));
 for(let w=W0;w<W0+N;w++)ok(!!(wks[w]&&wks[w].flip),'guest flip fired in week '+w,wks[w]);
 console.log('RESULT '+res.filter(r=>r[0]).length+' / '+res.length);await b.close();process.exit(0)})();
