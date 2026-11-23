/* QUICK CHECK before every push to main (go-live kit, owner OD:L1370 (c)): 5–10 min, bounded. Run by dev/tools/quickcheck.sh (it builds first).
   usage: node dev/tools/quickcheck.js <built site root> <old index.html (the live build)> [--net] [--cpu 4] [--out <dir>]
   Real device profiles (dev/test/lib/device.js), HOST mode (the built index.html exactly as players get it), service worker blocked.
   Steps (each with its own time limit; a step that times out is a FAIL, never a hang; perf is measured on the new AND the live build):
     1. open   — Fold 755x1000: new build reaches the title; 0 page errors (main frame + game frame: onerror + unhandledrejection).
     2. old    — Fold: the LIVE build (old index.html) starts a life, plays 1 buổi, saves sổ 3 the game's own way (ser() into SK(3));
                 the NEW build opens, loads sổ 3 (loadSlot + deser), renders and plays 1 buổi. Same name, 0 page errors.
     3. perf   — iPad 1180x820, CPU slowed (perfgate.json cpu, or --cpu N): per run a new life, the first `tabs` tabs visited twice (click -> 2 frames; per tab the
                 faster visit, then the median over tabs), `renderReps` direct render() calls (the fastest counts), 1 buổi; long tasks (>200 ms) counted with PerformanceObserver. `runs` runs of the NEW and the LIVE
                 build, alternating; cold-start outlier runs dropped; MEDIANS compared. Gated: render ms, tab ms, buổi ms, tasks > 200 ms,
                 worst task — each vs the live median (base + max(addMs, base x ratio)) AND absolute ceilings. All numbers: dev/tools/perfgate.json.
                 Self-test: --inject-render-ms N adds an N ms busy-wait to every render() of the NEW build (must FAIL); --runs N.
   Pictures/sounds from the CDN are NOT fetched (every non-local request is aborted) unless --net: the check is about code, and
   the CDN makes timings noisy. Exit 0 = PASS, 1 = FAIL; last line = one-line summary; JSON details in <out>/quickcheck.json. */
const {chromium}=require('playwright');const D=require('../test/lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const A=process.argv.slice(2);const ROOT=path.resolve(A[0]||'.');const OLD=A[1];const NET=A.includes('--net');const CPU=A.includes('--cpu')?+A[A.indexOf('--cpu')+1]:0;
const OUT=A.includes('--out')?A[A.indexOf('--out')+1]:path.join(ROOT,'.quickcheck');fs.mkdirSync(OUT,{recursive:true});
const T0=Date.now();const R={steps:{},fails:[]};const sl=t=>new Promise(r=>setTimeout(r,t));
const PG=JSON.parse(fs.readFileSync(path.join(__dirname,'perfgate.json'),'utf8'));const CPUX=CPU||PG.cpu;if(A.includes('--runs'))PG.runs=+A[A.indexOf('--runs')+1];
const med=a=>{a=a.filter(x=>typeof x==='number').sort((x,y)=>x-y);return a.length?(a.length%2?a[(a.length-1)/2]:Math.round((a[a.length/2-1]+a[a.length/2])/2)):0};
const KEYS=['renderMs','tabMs','buoiMs','longTasks200','longTaskMaxMs','openMs','playableMs'];
const brief=x=>{const o={};for(const k of KEYS)o[k]=x[k];return o};
/* drop cold-start outliers (open or playable > outlierX x median of that build's runs), then the median of every metric */
const robust=rs=>{if(!rs.length)return null;const mo=med(rs.map(x=>x.openMs)),mp=med(rs.map(x=>x.playableMs));
 let k=rs.filter(x=>x.openMs<=mo*PG.outlierX&&x.playableMs<=mp*PG.outlierX);if(!k.length)k=rs;const o={runsUsed:k.length,runsDropped:rs.length-k.length};
 for(const m of KEYS)o[m]=med(k.map(x=>x[m]));o.buoiMoved=rs.every(x=>x.buoi&&(x.buoi.moved||x.buoi.dead));o.tabsOk=Math.min(...rs.map(x=>new Set(x.tabs.filter(Boolean).map(t=>t.tab)).size));return o};
const fail=(step,m)=>{R.fails.push(step+': '+m);console.log('FAIL '+step+': '+m)};
const log=(...a)=>console.log(((Date.now()-T0)/1000).toFixed(0).padStart(4)+'s',...a);
const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.webp':'image/webp','.png':'image/png','.mp3':'audio/mpeg','.css':'text/css'};
/* one origin, two builds: GET /__ver/old|new switches which index.html "/" serves (same origin = same localStorage, like a real deploy) */
let VER='new';const INJ=A.includes('--inject-render-ms')?+A[A.indexOf('--inject-render-ms')+1]:0;
let NEWHTML=null;if(INJ){NEWHTML=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');const k='function render(){if(!S)return;';if(!NEWHTML.includes(k))throw new Error('inject: render() not found');
 NEWHTML=NEWHTML.replace(k,k+'{const __t=performance.now();while(performance.now()-__t<'+INJ+'){}}');console.log('SELF-TEST: +'+INJ+' ms busy-wait injected into every render() of the NEW build')}
function serve(){return new Promise(res=>{const s=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);
  if(p.startsWith('/__ver/')){VER=p.slice(7);r.end(VER);return}
  if(p==='/'||p==='/index.html'){r.setHeader('Content-Type',TYPES['.html']);r.setHeader('Cache-Control','no-store');if(VER!=='old'&&NEWHTML)return r.end(NEWHTML);return fs.createReadStream(VER==='old'?OLD:path.join(ROOT,'index.html')).pipe(r)}
  const f=path.join(ROOT,p.replace(/^\/+/,''));if(!f.startsWith(ROOT+path.sep)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end('nf')}
  r.setHeader('Content-Type',TYPES[path.extname(f)]||'application/octet-stream');r.setHeader('Cache-Control','no-store');fs.createReadStream(f).pipe(r)});
 s.listen(0,'127.0.0.1',()=>res({url:'http://127.0.0.1:'+s.address().port+'/',close:()=>s.close()}))})}
const within=(ms,p,what)=>Promise.race([p,new Promise((_,rej)=>setTimeout(()=>rej(new Error(what+' took > '+ms/1000+' s')),ms))]);
/* in-page helpers (run inside the game frame) */
/* reroll = a NEW pending life: without clearing ctm-nextlife (j52 NL_KEY) start() re-rolls the SAME stored life, so a first life that is a
   cung nữ looped 40 identical start() calls in one task (27–33 s 'long task', seen on new AND live; fix oi-perf 11/17, same idiom as origin-intros/flow.js) */
const NEWLIFE=()=>{try{localStorage.removeItem('hclh-opt')}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<40;i++){if(i)try{store.set(NL_KEY,null)}catch(e){}start();if(!(S.origin&&S.origin.k==='cnv')&&!(window.isSrv&&isSrv()))break}
 ['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});return S.name};
const SETTLE=()=>{try{for(let j=0;j<8&&Q.length&&!S.dead;j++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}}catch(e){try{Q.shift()}catch(x){}}
 const n=document.getElementById('next');return !!n&&!n.disabled&&!Q.length&&!S.dead};
const BUOI=async()=>{const sl=t=>new Promise(r=>setTimeout(r,t));const k0=JSON.stringify([S.turn,S.buoi,S.month,S.year]);const t0=performance.now();
 for(let i=0;i<40;i++){for(let j=0;j<12&&Q.length&&!S.dead;j++){const m=Q[0];try{if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}catch(e){Q.shift()}await sl(40)}
  const n=document.getElementById('next');if(n&&!n.disabled){n.click();await sl(300);break}await sl(200)}
 for(let j=0;j<40&&Q.length&&!S.dead;j++){const m=Q[0];try{if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}catch(e){Q.shift()}await sl(40)}
 return {ms:Math.round(performance.now()-t0),moved:JSON.stringify([S.turn,S.buoi,S.month,S.year])!==k0,dead:!!S.dead}};
async function page(b,dev){const ctx=await D.newDeviceContext(b,dev,{deviceScaleFactor:1,reducedMotion:'reduce'});
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/';window.__qcErr=[];addEventListener('error',e=>{try{window.__qcErr.push(String(e.message||e.error))}catch(x){}});
  addEventListener('unhandledrejection',e=>{try{const r=e.reason;const m=String(r&&r.message||r);if(!/Failed to fetch|NetworkError|net::|Load failed|aborted/i.test(m))window.__qcErr.push('unhandled: '+m)}catch(x){}})});
 if(!NET)await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));return {ctx,p,errs}}
async function open(p,url){const g=await D.openHost(p,url,{timeout:120000});await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});
  return g}
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
  await fetch(srv.url+'__ver/new');g=await within(150e3,open(p,srv.url),'new build open (old save)');await g.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:60000});/* real condition (game script ran to its end), was a 1.5 s timer before loadSlot (review r1) */
  const ld=await g.evaluate(()=>{try{const d=loadSlot(3);if(!d)return{ok:false,err:'NO SAVE'};SLOT=3;document.getElementById('title').hidden=true;deser(d);try{deal()}catch(e){}
   ['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});render();return{ok:true,name:S.name}}catch(e){return{ok:false,err:e.message}}});
  let b2=null;if(ld.ok){await within(60e3,g.waitForFunction(SETTLE,null,{polling:150}),'old save first turn');b2=await within(60e3,g.evaluate(BUOI),'old save buổi')}
  const e=await errsOf(g,errs);R.steps.old={ms:Date.now()-t,name,oldBuoi:b1,saved,load:ld,newBuoi:b2,oldBuildErrors:oldErr.slice(0,3),errors:e.slice(0,5)};
  log('old save',JSON.stringify({load:ld,buoi:b2&&b2.moved,errors:e.length}));
  if(!ld.ok)fail('old',ld.err);else if(ld.name!==saved.name)fail('old','name changed '+saved.name+' -> '+ld.name);
  if(b2&&!b2.moved&&!b2.dead)fail('old','buổi did not advance after loading the old save');if(e.length)fail('old',e.length+' page errors: '+e[0]);await ctx.close()}catch(e){fail('old',e.message)}
 else{R.steps.old={skipped:'no old index.html'};log('old save: SKIPPED (no live build given)')}
 /* 3. perf gate: thresholds in dev/tools/perfgate.json (one place). runs alternate new/live; medians; cold-start outliers dropped */
 async function perf(ver){await fetch(srv.url+'__ver/'+ver);const {ctx,p,errs}=await page(b,'ipadAir');try{const t0=Date.now();const g=await within(150e3,open(p,srv.url),ver+' perf open');const openMs=Date.now()-t0;
  if(CPUX>1){try{const cdp=await ctx.newCDPSession(p);await cdp.send('Emulation.setCPUThrottlingRate',{rate:CPUX})}catch(e){}}  /* phone-like CPU (perf.js uses 4x too) */
  await g.evaluate(()=>{window.__lt=[];try{new PerformanceObserver(l=>{for(const e of l.getEntries())window.__lt.push(Math.round(e.duration))}).observe({type:'longtask',buffered:false})}catch(e){}});
  const t1=Date.now();await g.evaluate(NEWLIFE);await within(60e3,g.waitForFunction(SETTLE,null,{polling:150}),'first turn');const playable=Date.now()-t1;
  const tabs=[];for(let i=0;i<2*PG.tabs;i++){const r=await g.evaluate(async i=>{const ts=[...document.querySelectorAll('#tabs [data-tab]')].filter(x=>x.getClientRects().length);const t=ts[(i+1)%ts.length];if(!t)return null;
    const t0=performance.now();t.click();await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));return {tab:t.dataset.tab,ms:Math.round(performance.now()-t0)}},i%PG.tabs);tabs.push(r);await sl(250)}
  /* tab ms = median over the tabs of each tab's faster of its 2 visits (noise on a shared box only ever adds time) */
  const per={};for(const t of tabs.filter(Boolean))per[t.tab]=Math.min(per[t.tab]??1e9,t.ms);
  await g.evaluate(()=>{const t=document.querySelector('#tabs [data-tab="act"]');if(t)t.click()});await sl(300);
  const bu=await within(60e3,g.evaluate(BUOI),'buổi');await sl(500);
  const lt=await g.evaluate(()=>window.__lt.slice());   /* long tasks counted up to here: the render() repeats below are not part of play */
  const rend=await g.evaluate(async n=>{const o=[];for(let i=0;i<n;i++){const t0=performance.now();render();o.push(Math.round(performance.now()-t0));await new Promise(r=>setTimeout(r,60))}return o},PG.renderReps);
  const e=await errsOf(g,errs);
  return {openMs,playableMs:playable,tabs,tabMs:med(Object.values(per)),render:rend,renderMs:Math.min(...rend),buoi:bu,buoiMs:bu.ms,longTasks200:lt.filter(x=>x>200).length,longTaskMaxMs:lt.length?Math.max(...lt):0,longTasks50:lt.length,errors:e.slice(0,5)}}finally{await ctx.close()}}
 try{const NR=[],OR=[];const haveOld=OLD&&fs.existsSync(OLD);
  for(let i=0;i<PG.runs;i++){NR.push(await perf('new'));if(haveOld)OR.push(await perf('old').catch(e=>({err:e.message})))}
  const N=robust(NR),O=haveOld?robust(OR.filter(x=>!x.err)):null;R.steps.perf=N;R.steps.perfLive=O;R.steps.perfRuns={new:NR.map(brief),live:OR.map(x=>x.err?{err:x.err}:brief(x))};
  log('perf new  runs',JSON.stringify(R.steps.perfRuns.new));if(haveOld)log('perf live runs',JSON.stringify(R.steps.perfRuns.live));
  log('perf new  median',JSON.stringify(brief(N)));if(O)log('perf live median',JSON.stringify(brief(O)));
  const C=PG.ceilings;for(const k of Object.keys(C))if(N[k]>C[k])fail('perf',`${k} ${N[k]} > ceiling ${C[k]}`);
  if(haveOld&&!O)fail('perf','the live build could not be measured ('+(OR[0]&&OR[0].err)+')');
  if(O)for(const [k,g] of Object.entries(PG.gate)){const add=g.addMs??g.add;const lim=O[k]+Math.max(add,O[k]*g.ratio);if(N[k]>lim)fail('perf',`${k} ${N[k]} vs live ${O[k]} (limit ${Math.round(lim)})`)}
  if(!N.buoiMoved)fail('perf','buổi did not advance');if(N.tabsOk<3)fail('perf','fewer than 3 tabs to change');
  const pe=NR.flatMap(x=>x.errors||[]);if(pe.length)fail('perf',pe.length+' page errors: '+pe[0])}catch(e){fail('perf',e.message)}
 await b.close();srv.close();R.totalMs=Date.now()-T0;R.pass=!R.fails.length;fs.writeFileSync(path.join(OUT,'quickcheck.json'),JSON.stringify(R,null,1));
 const o=R.steps.open||{},pf=R.steps.perf||{};
 const pl=R.steps.perfLive||{};console.log(`QUICKCHECK ${R.pass?'PASS':'FAIL'} · ${Math.round(R.totalMs/1000)} s · open ${o.ms||'-'} ms · old save ${R.steps.old&&R.steps.old.load?(R.steps.old.load.ok?'ok':'FAIL'):(R.steps.old&&R.steps.old.skipped?'skipped':'FAIL')} · perf (median of ${PG.runs}, new/live): render ${pf.renderMs??'-'}/${pl.renderMs??'-'} ms, tab ${pf.tabMs??'-'}/${pl.tabMs??'-'} ms, buổi ${pf.buoiMs??'-'}/${pl.buoiMs??'-'} ms, tasks>200ms ${pf.longTasks200??'-'}/${pl.longTasks200??'-'}${R.fails.length?' · '+R.fails.join(' | '):''}`);
 process.exit(R.pass?0:1)})().catch(e=>{console.error(e);console.log('QUICKCHECK FAIL · crashed: '+e.message);process.exit(1)});
