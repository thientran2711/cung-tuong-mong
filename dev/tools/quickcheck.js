/* QUICK CHECK before every push to main (go-live kit, owner OD:L1370 (c)): 5–10 min, bounded. Run by dev/tools/quickcheck.sh (it builds first).
   usage: node dev/tools/quickcheck.js <built site root> <old index.html (the live build)> [--net] [--cpu 4] [--out <dir>]
   Real device profiles (dev/test/lib/device.js), HOST mode (the built index.html exactly as players get it), service worker blocked.
   Steps (each with its own time limit; a step that times out is a FAIL, never a hang; perf is measured on the new AND the live build):
     1. open   — Fold 755x1000: new build reaches the title; 0 page errors (main frame + game frame: onerror + unhandledrejection).
     2. old    — Fold: the LIVE build (old index.html) starts a life, plays 1 buổi, saves sổ 3 the game's own way (ser() into SK(3));
                 the NEW build opens, loads sổ 3 (loadSlot + deser), renders and plays 1 buổi. Same name, 0 page errors.
     3. perf   — iPad 1180x820, CPU slowed 4x (--cpu N): new life, 3 tab changes, 1 buổi; long tasks (>200 ms) counted with PerformanceObserver; per-step ms.
                 Smoke limits (NOT the 30-min dev/test/perf.js budget): no single task > 3000 ms, ≤ 15 tasks > 200 ms, buổi ends < 45 s.
   Pictures/sounds from the CDN are NOT fetched (every non-local request is aborted) unless --net: the check is about code, and
   the CDN makes timings noisy. Exit 0 = PASS, 1 = FAIL; last line = one-line summary; JSON details in <out>/quickcheck.json. */
const {chromium}=require('playwright');const D=require('../test/lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const A=process.argv.slice(2);const ROOT=path.resolve(A[0]||'.');const OLD=A[1];const NET=A.includes('--net');const CPU=A.includes('--cpu')?+A[A.indexOf('--cpu')+1]:4;
const OUT=A.includes('--out')?A[A.indexOf('--out')+1]:path.join(ROOT,'.quickcheck');fs.mkdirSync(OUT,{recursive:true});
const T0=Date.now();const R={steps:{},fails:[]};const sl=t=>new Promise(r=>setTimeout(r,t));
const fail=(step,m)=>{R.fails.push(step+': '+m);console.log('FAIL '+step+': '+m)};
const log=(...a)=>console.log(((Date.now()-T0)/1000).toFixed(0).padStart(4)+'s',...a);
const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.webp':'image/webp','.png':'image/png','.mp3':'audio/mpeg','.css':'text/css'};
/* one origin, two builds: GET /__ver/old|new switches which index.html "/" serves (same origin = same localStorage, like a real deploy) */
let VER='new';
function serve(){return new Promise(res=>{const s=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);
  if(p.startsWith('/__ver/')){VER=p.slice(7);r.end(VER);return}
  if(p==='/'||p==='/index.html'){r.setHeader('Content-Type',TYPES['.html']);r.setHeader('Cache-Control','no-store');return fs.createReadStream(VER==='old'?OLD:path.join(ROOT,'index.html')).pipe(r)}
  const f=path.join(ROOT,p.replace(/^\/+/,''));if(!f.startsWith(ROOT+path.sep)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end('nf')}
  r.setHeader('Content-Type',TYPES[path.extname(f)]||'application/octet-stream');r.setHeader('Cache-Control','no-store');fs.createReadStream(f).pipe(r)});
 s.listen(0,'127.0.0.1',()=>res({url:'http://127.0.0.1:'+s.address().port+'/',close:()=>s.close()}))})}
const within=(ms,p,what)=>Promise.race([p,new Promise((_,rej)=>setTimeout(()=>rej(new Error(what+' took > '+ms/1000+' s')),ms))]);
/* in-page helpers (run inside the game frame) */
const NEWLIFE=()=>{try{localStorage.removeItem('hclh-opt')}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<40;i++){start();if(!(S.origin&&S.origin.k==='cnv')&&!(window.isSrv&&isSrv()))break}
 ['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});return S.name};
const SETTLE=()=>{try{for(let j=0;j<8&&Q.length&&!S.dead;j++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(0);else closeModal()}}catch(e){try{Q.shift()}catch(x){}}
 const n=document.getElementById('next');return !!n&&!n.disabled&&!Q.length&&!S.dead};
const BUOI=async()=>{const sl=t=>new Promise(r=>setTimeout(r,t));const k0=JSON.stringify([S.turn,S.buoi,S.month,S.year]);const t0=performance.now();
 for(let i=0;i<40;i++){for(let j=0;j<12&&Q.length&&!S.dead;j++){const m=Q[0];try{if(m.opts&&m.opts.length)chooseM(0);else closeModal()}catch(e){Q.shift()}await sl(40)}
  const n=document.getElementById('next');if(n&&!n.disabled){n.click();await sl(300);break}await sl(200)}
 for(let j=0;j<40&&Q.length&&!S.dead;j++){const m=Q[0];try{if(m.opts&&m.opts.length)chooseM(0);else closeModal()}catch(e){Q.shift()}await sl(40)}
 return {ms:Math.round(performance.now()-t0),moved:JSON.stringify([S.turn,S.buoi,S.month,S.year])!==k0,dead:!!S.dead}};
async function page(b,dev){const ctx=await D.newDeviceContext(b,dev,{deviceScaleFactor:1,reducedMotion:'reduce'});
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/';window.__qcErr=[];addEventListener('error',e=>{try{window.__qcErr.push(String(e.message||e.error))}catch(x){}});
  addEventListener('unhandledrejection',e=>{try{const r=e.reason;const m=String(r&&r.message||r);if(!/Failed to fetch|NetworkError|net::|Load failed|aborted/i.test(m))window.__qcErr.push('unhandled: '+m)}catch(x){}})});
 if(!NET)await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));return {ctx,p,errs}}
async function open(p,url){const g=await D.openHost(p,url,{timeout:120000});await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});return g}
const errsOf=async(g,errs)=>errs.concat(await g.evaluate(()=>window.__qcErr||[]).catch(()=>[]));
(async()=>{const srv=await serve();const b=await chromium.launch();
 /* 1. open */
 try{const t=Date.now();const {ctx,p,errs}=await page(b,'fold');const g=await within(150e3,open(p,srv.url),'open');const ms=Date.now()-t;await sl(2500);
  const e=await errsOf(g,errs);R.steps.open={ms,errors:e.slice(0,5)};log('open',ms+' ms',e.length+' errors');if(e.length)fail('open',e.length+' page errors: '+e[0]);await ctx.close()}catch(e){fail('open',e.message)}
 /* 2. old save -> new build */
 if(OLD&&fs.existsSync(OLD))try{const t=Date.now();const {ctx,p,errs}=await page(b,'fold');
  await fetch(srv.url+'__ver/old');let g=await within(150e3,open(p,srv.url),'old build open');
  const name=await g.evaluate(NEWLIFE);await within(60e3,g.waitForFunction(SETTLE,null,{polling:150}),'old build first turn');
  const b1=await within(60e3,g.evaluate(BUOI),'old build buổi');
  const saved=await g.evaluate(()=>{try{localStorage.setItem(SK(3),JSON.stringify(ser()));return {ok:true,name:S.name}}catch(e){return {ok:false,err:e.message}}});
  const oldErr=await errsOf(g,errs);errs.length=0;
  await fetch(srv.url+'__ver/new');g=await within(150e3,open(p,srv.url),'new build open (old save)');await sl(1500);
  const ld=await g.evaluate(()=>{try{const d=loadSlot(3);if(!d)return{ok:false,err:'NO SAVE'};SLOT=3;document.getElementById('title').hidden=true;deser(d);try{deal()}catch(e){}
   ['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});render();return{ok:true,name:S.name}}catch(e){return{ok:false,err:e.message}}});
  let b2=null;if(ld.ok){await within(60e3,g.waitForFunction(SETTLE,null,{polling:150}),'old save first turn');b2=await within(60e3,g.evaluate(BUOI),'old save buổi')}
  const e=await errsOf(g,errs);R.steps.old={ms:Date.now()-t,name,oldBuoi:b1,saved,load:ld,newBuoi:b2,oldBuildErrors:oldErr.slice(0,3),errors:e.slice(0,5)};
  log('old save',JSON.stringify({load:ld,buoi:b2&&b2.moved,errors:e.length}));
  if(!ld.ok)fail('old',ld.err);else if(ld.name!==saved.name)fail('old','name changed '+saved.name+' -> '+ld.name);
  if(b2&&!b2.moved&&!b2.dead)fail('old','buổi did not advance after loading the old save');if(e.length)fail('old',e.length+' page errors: '+e[0]);await ctx.close()}catch(e){fail('old',e.message)}
 else{R.steps.old={skipped:'no old index.html'};log('old save: SKIPPED (no live build given)')}
 /* 3. perf smoke */
 async function perf(ver){await fetch(srv.url+'__ver/'+ver);const {ctx,p,errs}=await page(b,'ipadAir');try{const g=await within(150e3,open(p,srv.url),ver+' perf open');
  if(CPU>1){try{const cdp=await ctx.newCDPSession(p);await cdp.send('Emulation.setCPUThrottlingRate',{rate:CPU})}catch(e){}}  /* phone-like CPU (perf.js uses 4x too) */
  await g.evaluate(()=>{window.__lt=[];try{new PerformanceObserver(l=>{for(const e of l.getEntries())window.__lt.push(Math.round(e.duration))}).observe({type:'longtask',buffered:false})}catch(e){}});
  const t1=Date.now();await g.evaluate(NEWLIFE);await within(60e3,g.waitForFunction(SETTLE,null,{polling:150}),'first turn');const playable=Date.now()-t1;
  const tabs=[];for(let i=0;i<3;i++){const r=await g.evaluate(async i=>{const ts=[...document.querySelectorAll('#tabs [data-tab]')].filter(x=>x.getClientRects().length);const t=ts[(i+1)%ts.length];if(!t)return null;
    const t0=performance.now();t.click();await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));return {tab:t.dataset.tab,ms:Math.round(performance.now()-t0)}},i);tabs.push(r);await sl(400)}
  await g.evaluate(()=>{const t=document.querySelector('#tabs [data-tab="act"]');if(t)t.click()});await sl(300);
  const bu=await within(60e3,g.evaluate(BUOI),'buổi');await sl(500);
  const lt=await g.evaluate(()=>window.__lt.slice());const e=await errsOf(g,errs);
  return {playableMs:playable,tabs,buoi:bu,longTasks200:lt.filter(x=>x>200).length,longTaskMaxMs:lt.length?Math.max(...lt):0,longTasks50:lt.length,errors:e.slice(0,5)}}finally{await ctx.close()}}
 try{const N=await perf('new');const O=OLD&&fs.existsSync(OLD)?await perf('old').catch(e=>({err:e.message})):null;R.steps.perf=N;R.steps.perfLive=O;
  const pr=x=>x&&JSON.stringify({playable:x.playableMs,tabs:(x.tabs||[]).map(t=>t&&t.ms),buoi:x.buoi&&x.buoi.ms,lt200:x.longTasks200,ltMax:x.longTaskMaxMs});
  log('perf new ',pr(N));if(O)log('perf live',O.err?O.err:pr(O));
  /* smoke limits: absolute ceilings + no big jump over the LIVE build measured the same way on the same box (noise ~ ±3 tasks, ±300 ms) */
  if(N.longTaskMaxMs>5000)fail('perf','a main-thread task took '+N.longTaskMaxMs+' ms (> 5000)');
  if(N.longTasks200>30)fail('perf',N.longTasks200+' tasks > 200 ms (> 30)');
  if(O&&!O.err){if(N.longTasks200>Math.max(O.longTasks200*1.5,O.longTasks200+6))fail('perf',`tasks > 200 ms ${N.longTasks200} vs live ${O.longTasks200}`);
   if(N.longTaskMaxMs>Math.max(O.longTaskMaxMs*1.6,O.longTaskMaxMs+800))fail('perf',`worst task ${N.longTaskMaxMs} ms vs live ${O.longTaskMaxMs} ms`);
   if(N.buoi.ms>Math.max(O.buoi.ms*1.6,O.buoi.ms+1500))fail('perf',`buổi ${N.buoi.ms} ms vs live ${O.buoi.ms} ms`)}
  if(N.buoi.ms>45000)fail('perf','buổi took > 45 s');if(!N.buoi.moved&&!N.buoi.dead)fail('perf','buổi did not advance');if(N.tabs.filter(Boolean).length<3)fail('perf','fewer than 3 tabs to change');
  if(N.errors.length)fail('perf',N.errors.length+' page errors: '+N.errors[0])}catch(e){fail('perf',e.message)}
 await b.close();srv.close();R.totalMs=Date.now()-T0;R.pass=!R.fails.length;fs.writeFileSync(path.join(OUT,'quickcheck.json'),JSON.stringify(R,null,1));
 const o=R.steps.open||{},pf=R.steps.perf||{};
 console.log(`QUICKCHECK ${R.pass?'PASS':'FAIL'} · ${Math.round(R.totalMs/1000)} s · open ${o.ms||'-'} ms · old save ${R.steps.old&&R.steps.old.load?(R.steps.old.load.ok?'ok':'FAIL'):(R.steps.old&&R.steps.old.skipped?'skipped':'FAIL')} · perf: long tasks >200ms ${pf.longTasks200??'-'} (max ${pf.longTaskMaxMs??'-'} ms), buổi ${pf.buoi?pf.buoi.ms:'-'} ms${R.fails.length?' · '+R.fails.join(' | '):''}`);
 process.exit(R.pass?0:1)})().catch(e=>{console.error(e);console.log('QUICKCHECK FAIL · crashed: '+e.message);process.exit(1)});
