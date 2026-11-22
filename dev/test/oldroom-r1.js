/* Co-op B1 (review/coop-b1b5): steal / burn / extort the FRIEND's items, harm / take her children, miscarriage — 2 browsers, LIVE Worker.
   usage: python3 dev/build/assemble.py && node dev/test/coop-b1.js [outdir] [workerURL]
   A = host 755x1000@2, B = guest 1180x820@2. Dice forced (success, undetected) where the case needs it.
   Checks per act: the act is OFFERED on her entry (ACT.ok), my gain lands on my side, her loss lands on HER own S through `res.fam`,
   her note / Đồ thất lạc case, and after the week merge her entry on my side == her own S (bag keys, children). */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const BASE='http://ctm.local/';let HTML=path.join(ROOT,'.tmp/old.html');
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.mp3':'audio/mpeg','.css':'text/css','.webmanifest':'application/manifest+json','.svg':'image/svg+xml'};
async function serve(ctx){await ctx.route(BASE+'**',async route=>{const u=new URL(route.request().url());let p=decodeURIComponent(u.pathname);
 if(p==='/'||p==='/index.html'){const body='<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></head><body>'+fs.readFileSync(HTML,'utf8')+'</body></html>';return route.fulfill({status:200,contentType:MIME['.html'],body})}
 const f=path.join(ROOT,p);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return route.fulfill({status:404,body:'nf'});route.fulfill({status:200,contentType:MIME[path.extname(f)]||'application/octet-stream',body:fs.readFileSync(f)})})}
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../.tmp/oldroom'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const DCL={waitUntil:'domcontentloaded'};
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);await ctx.addInitScript(u=>{window.COOP_URL=u},WURL);
  const o={ctx,name,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);
    p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator.vibrate/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
async function until(o,fn,arg,ms=30000){try{await o.p.waitForFunction(fn,arg,{timeout:ms,polling:250});return true}catch(e){return false}}
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){try{await el.click({timeout:5000});return true}catch(e){}}await sleep(250)}return false}
const shot=async(o,n)=>{try{await o.p.screenshot({path:`${OUT}/${n}.png`,timeout:120000})}catch(e){console.log('shot failed',n,e.message.split('\n')[0])}};
/* close the normal game's dialogs (any button that only reads / takes the first road), end mini games: the test's own player */
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await require('./lib/coop-clear.js').first(o,()=>{
   
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

const pickIt=(o,kind)=>o.p.evaluate(kind=>{const L=Object.keys(IT).filter(k=>{const e={k};if(!loOk(e))return false;if(kind==='burn')return typeof tsbBurnable==='function'&&tsbBurnable({inv:[e]}).length>0;return true});return L[0]||null},kind);
const give=(o,k)=>o.p.evaluate(k=>{S.inv=S.inv||[];S.inv.push({k});render();return S.inv.length},k);
const cnt=(o,k)=>o.p.evaluate(k=>(S.inv||[]).filter(e=>(k?e.k===k:loOk(e)||e.lo)&&!e.h).length,k);
const nOk=o=>o.p.evaluate(()=>(S.inv||[]).filter(e=>loOk(e)).length);
const fr=o=>o.p.evaluate(()=>{const f=COOPW.friend();return f?{inv:(f.inv||[]).map(e=>e.k).sort(),kids:(f.kids||[]).filter(k=>k.alive!==false).map(k=>k.name).sort(),preg:f.preg||0}:null});
const own=o=>o.p.evaluate(()=>({inv:(S.inv||[]).map(e=>e.k).sort(),kids:(S.kids||[]).filter(k=>k.alive!==false).map(k=>k.name).sort(),preg:S.hidden?0:(S.preg||0)}));
const act=(o,k,extra)=>o.p.evaluate(([k,extra])=>{const r0=roll,c0=caught;roll=()=>true;caught=()=>"";try{const f=COOPW.friend();
  const okk=!!(f&&ACT[k]&&ACT[k].ok(S,f));const r=okk?runAct(S,f,k,extra):"";return{okk,r:String(r).replace(/<[^>]+>/g,'').slice(0,240)}}finally{roll=r0;caught=c0}},[k,extra]);
async function waitFr(o,fn,arg,ms=15000){return until(o,fn,arg,ms)}
const seenTxt=o=>o.p.evaluate(()=>JSON.stringify(Q.map(q=>q.t+' '+(q.h||'')))+((document.getElementById('modal')||{}).textContent||''));

(async()=>{const b=await chromium.launch();
 const A=await mk(b,'host',[755,1000,2]),B=await mk(b,'guest',[1180,820,2]);
 const inGame=o=>o.p.evaluate(()=>!!(COOPW.on&&typeof S!=='undefined'&&S&&!COOPW.inLife&&document.getElementById('title').hidden&&!document.getElementById('kroul')&&document.getElementById('next').offsetParent)).catch(()=>false);
 async function bothIn(lbl){const t0=Date.now();while(Date.now()-t0<150000){await clear(A);await clear(B);if(await inGame(A)&&await inGame(B))break;await sleep(700)}ok(await inGame(A)&&await inGame(B),lbl)}
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'OLD A: Cùng hảo hữu');await A.p.waitForTimeout(600);
 ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'OLD A: Mời hảo hữu');
 ok(await until(A,()=>COOP.code&&COOP.seat==='a'),'OLD A has a room');const code=await A.p.evaluate(()=>COOP.code);console.log('room',code);
 await join(B,code);ok(await until(B,()=>COOP.seat==='b'&&!COOP.frozen,null,60000),'OLD B in seat b');
 await bothIn('OLD both in the game');
 for(const o of [A,B])await setTm(o,{buoiMs:600000});
 for(const [o,rk] of [[A,5],[B,1]])await o.p.evaluate(rk=>{if(S.srv)S.srv.risen=1;S.rank=rk;S.bac=Math.max(S.bac||0,400);render()},rk);
 /* B gets items + a child (old blob shape), then one old week */
 await B.p.evaluate(()=>{S.inv=S.inv||[];for(const k of Object.keys(IT).slice(0,6))S.inv.push({k});render()});
 const wk0=await A.p.evaluate(()=>COOP.state.week||0);
 for(let i=0;i<40;i++){await clear(A);await clear(B);await press1(A);await press1(B);await sleep(800);
  const w=await A.p.evaluate(()=>COOP.state.week||0);const w2=await B.p.evaluate(()=>COOP.state.week||0);if(w>wk0&&w2>wk0)break}
 ok((await A.p.evaluate(()=>COOP.state.week||0))>wk0,'OLD a week merged');
 /* switch both to the NEW build, reload (rejoin) */
 HTML=path.join(ROOT,'dev/index.html');
 const wk1=await A.p.evaluate(()=>COOP.state.week||0);
 for(const o of [A,B]){await o.p.goto(BASE+'?room='+code,DCL);await o.p.waitForTimeout(3000);await tapText(o,/^Vào phòng|^Tiếp tục|^Trở lại phòng/,4000)}
 ok(await until(A,()=>typeof COOPW==='object'&&COOPW.on&&COOP.seat==='a',null,60000)&&await until(B,()=>typeof COOPW==='object'&&COOPW.on&&COOP.seat==='b',null,60000),'NEW both back in their seats');
 await bothIn('NEW both in the game');
 ok(await until(A,()=>!!COOPW.friend(),null,30000)&&await until(B,()=>!!COOPW.friend(),null,30000),'NEW each has the other as a consort entry');
 ok(await A.p.evaluate(()=>COOP.state.week||0)===wk1,'NEW same week after reload',[wk1]);
 ok(await until(A,()=>{const f=COOPW.friend();return f&&(f.inv||[]).length>=6},null,20000),'NEW A sees B\'s bag on her entry (old blob)',await fr(A));
 const r=await act(A,'laydo');ok(r.okk,'NEW laydo on friend from an old room',r);
 const wk2=await A.p.evaluate(()=>COOP.state.week||0);
 for(let i=0;i<40;i++){await clear(A);await clear(B);await press1(A);await press1(B);await sleep(800);
  const w=await A.p.evaluate(()=>COOP.state.week||0);const w2=await B.p.evaluate(()=>COOP.state.week||0);if(w>wk2&&w2>wk2)break}
 ok((await A.p.evaluate(()=>COOP.state.week||0))>wk2&&(await B.p.evaluate(()=>COOP.state.week||0))>wk2,'NEW a week merged after the old room');
 const tn=await A.p.evaluate(()=>JSON.stringify(S.tn||null)),tnB=await B.p.evaluate(()=>JSON.stringify(S.tn||null));ok(tn===tnB,'NEW tn same on both',[tn,tnB]);
 await shot(A,'oldroom-host-755x1000');await shot(B,'oldroom-guest-1180x820');
 ok(!A.errs.length,'host: no page errors',A.errs.slice(0,5));ok(!B.errs.length,'guest: no page errors',B.errs.slice(0,5));
 await b.close();const f=res.filter(x=>!x[0]).length;console.log('RESULT',res.length-f,'/',res.length);process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
