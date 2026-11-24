/* robot10-lag.js — ROBOT-10 ORDER #7 «LAG» metric set + the «LAG» / «ANIM BUDGET» report sections (test-only, report-only).
   (owner OD 23/11 ~23:00Z + ~23:10Z; PRIORITY #1 CHECK: reuses dev/test/coop-lag.js metrics (via dev/test/lib/coop-lag-hooks.js) and dev/test/play-perf-budget.json; nothing rebuilt)
 USAGE
   (a) inside every robot10.js life (default ON; LAG=0 switches the real-page probe off, LAGCPU=4 = CPU throttle of the probe):
       BOT_INIT  → bot page (render off): long tasks > 50 ms (window.__r10lt)
       REAL_INIT → real-render pages (Fold 755x1000 / iPad 1180x820): long tasks + long-animation-frames with script attribution + Event Timing
       probe()   → at every UI checkpoint, after the scans: CPU ×LAGCPU, taps every tab, one act card and «Sang ngày mới»; tap→screen = click() → 2nd rAF.
                   Saved in life.lag.ui[dev][] = {buoi, year, acts:[{k,ms}], lt:[ms], loaf:[…], probeMs}
   (b) report:  node dev/measure/robot10-lag.js <robot10 result json|folder>… [--coop <coop-lag --out json|folder>…] [--anim <folder>…] [--out dir]
       → lag-<stamp>.md (+ .csv): «LAG» section (solo by device and by game-year, co-op pairs, budget, RECOMMENDATIONS table) and «ANIM BUDGET»
       robot10-agg.js calls section(L, {dirs}) / animSection(dirs) too, so rates-<date>.md carries both.
   Solo tap→screen is measured on the REAL pages (the bot page runs with render off: its numbers are game-logic time per buổi / month, not what she feels).
   Game-year is the game's own S.year (relative to the first sampled year of the life). Heap growth = (last − first sample) of JS heap, DOM nodes, listeners. */
const fs=require('fs'),path=require('path');

const BOT_INIT=`try{window.__r10lt=[];new PerformanceObserver(l=>{for(const e of l.getEntries())window.__r10lt.push([Math.round(e.startTime),Math.round(e.duration)])}).observe({type:'longtask',buffered:true})}catch(e){}`;
const REAL_INIT=`(function(){const P=window.__r10p={lt:[],loaf:[],ev:[]};
 try{new PerformanceObserver(l=>{for(const e of l.getEntries())P.lt.push(Math.round(e.duration))}).observe({type:'longtask',buffered:true})}catch(e){}
 try{new PerformanceObserver(l=>{for(const e of l.getEntries())P.loaf.push({d:Math.round(e.duration),s:(e.scripts||[]).map(s=>({d:Math.round(s.duration),fn:s.sourceFunctionName||'',inv:String(s.invoker||'').slice(0,60),pos:s.sourceCharPosition,src:String(s.sourceURL||'').split('/').pop().slice(0,30)})).sort((a,b)=>b.d-a.d).slice(0,2)})}).observe({type:'long-animation-frame',buffered:true})}catch(e){}
 try{new PerformanceObserver(l=>{for(const e of l.getEntries())if(e.duration>=16)P.ev.push({n:e.name,d:Math.round(e.duration)})}).observe({type:'event',durationThreshold:16,buffered:true})}catch(e){}})();`;

/* ---- the probe (node side; runs in a real-render page that just loaded the bot's save) ---- */
async function probe(p,d,cp,R){
 const cdp=await p.context().newCDPSession(p);const rate=+process.env.LAGCPU||4;
 try{await cdp.send('Emulation.setCPUThrottlingRate',{rate});
  await p.evaluate(()=>{const P=window.__r10p;if(P){P.lt.length=0;P.loaf.length=0;P.ev.length=0}});
  const t0=Date.now();
  const r=await p.evaluate(async()=>{const out=[];const raf2=()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
   const clear=()=>{try{Q.length=0;closeModal();document.getElementById('ov').hidden=true}catch(e){}document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove())};
   const vis=x=>x&&x.offsetParent!==null&&!x.disabled;
   const tap=async(k,el)=>{const t=performance.now();el.click();await raf2();out.push({k,ms:Math.round(performance.now()-t)});clear();await raf2()};
   clear();await raf2();
   for(const b of [...document.querySelectorAll('.bar [data-tab]')].filter(vis)){await tap('tab:'+b.dataset.tab,b)}
   const at=document.querySelector('#tabs [data-tab="act"],.bar [data-tab="act"]');if(vis(at))await tap('tab:act(again)',at);
   const card=[...document.querySelectorAll('button.card.ka:not(:disabled):not(.kdis)')].find(vis);if(card)await tap('act card',card);
   const nx=document.getElementById('next');if(vis(nx))await tap('Sang ngày mới',nx);
   return{acts:out,year:(typeof S!=='undefined'&&S)?S.year:null,age:(typeof S!=='undefined'&&S)?S.age:null}});
  const snap=await p.evaluate(()=>{const P=window.__r10p||{lt:[],loaf:[],ev:[]};return{lt:P.lt.slice(),loaf:P.loaf.slice(0,6),ev:P.ev.slice(0,12)}});
  const L=R.lag=R.lag||{};const U=L.ui=L.ui||{};(U[d]=U[d]||[]).push({buoi:cp.buoi,year:r.year,age:r.age,cpu:rate,acts:r.acts,lt:snap.lt,loaf:snap.loaf,ev:snap.ev,probeMs:Date.now()-t0})
 }finally{await cdp.send('Emulation.setCPUThrottlingRate',{rate:1}).catch(()=>{});await cdp.detach().catch(()=>{})}}

/* ---- report helpers ---- */
const num=x=>typeof x==='number'&&isFinite(x);
const pct=(a,q)=>{a=a.filter(num).sort((x,y)=>x-y);return a.length?a[Math.min(a.length-1,Math.ceil(q/100*a.length)-1)]:null};
const f1=x=>x==null||!isFinite(x)?'—':(Math.round(x*10)/10).toString();
const f0=x=>x==null||!isFinite(x)?'—':Math.round(x).toString();
const tbl=(head,rows)=>['| '+head.join(' | ')+' |','|'+head.map(()=>'---').join('|')+'|',...rows.map(r=>'| '+r.map(x=>String(x==null?'':x).replace(/\|/g,'/')).join(' | ')+' |')].join('\n');
const BUD=(()=>{try{const j=JSON.parse(fs.readFileSync(path.join(__dirname,'..','test','play-perf-budget.json'),'utf8'));return{def:j.default||{},tgt:j._target||{}}}catch(e){return{def:{},tgt:{}}}})();
const bandOf=(y,y0)=>{const k=(y||0)-(y0||0);return k<3?'year 0-2':k<6?'year 3-5':k<10?'year 6-9':'year 10+'};
const BANDS=['year 0-2','year 3-5','year 6-9','year 10+'];
const DEVS=['fold','ipad'];
const lagOf=r=>r.lag||{};

/* ---- the LAG section; L = robot10 lives (result JSON), opts.dirs = folders to scan for coop-lag JSON, opts.coop = parsed coop-lag results ---- */
function section(L,opts){opts=opts||{};const md=[];const rec=[];const csv=[['kind','device','key','n','p50','p95','max']];
 const lives=L.filter(r=>lagOf(r).bot||lagOf(r).ui);
 md.push('## LAG (ORDER #7: tap→screen, turn time, long tasks, memory, crashes; solo + co-op)','');
 if(!lives.length){md.push('No lag data in these lives (older runner, or LAG=0).','')}
 /* ---- tap→screen per action, per device (real pages, CPU ×4) ---- */
 const tap={};/* dev → action → [ms] ; dev|band → [ms] */const lt={},ltMin={},loafs={};
 for(const r of lives){const U=(lagOf(r).ui)||{};for(const d of DEVS)for(const c of (U[d]||[])){const y0=((U[d]||[])[0]||{}).year;
  for(const a of c.acts||[]){const k=a.k.replace(/^tab:.*/,'tab switch');(tap[d+'|'+k]=tap[d+'|'+k]||[]).push(a.ms);(tap[d+'|ALL']=tap[d+'|ALL']||[]).push(a.ms);(tap[d+'|'+bandOf(c.year,y0)]=tap[d+'|'+bandOf(c.year,y0)]||[]).push(a.ms);
   if(/^tab:/.test(a.k))(tap[d+'|'+a.k]=tap[d+'|'+a.k]||[]).push(a.ms)}
  (lt[d]=lt[d]||[]).push(...(c.lt||[]));ltMin[d]=(ltMin[d]||{n:0,ms:0});ltMin[d].n+=(c.lt||[]).length;ltMin[d].ms+=c.probeMs||0;
  for(const f of c.loaf||[])(loafs[d]=loafs[d]||[]).push(f)}}
 md.push('### Solo · tap → screen (real pages, CPU ×'+(process.env.LAGCPU||4)+', one probe per UI checkpoint; ms from the tap to the 2nd painted frame)','');
 const ACTS=['tab switch','act card','Sang ngày mới','ALL'];
 const rowsT=[];for(const d of DEVS)for(const k of ACTS){const a=tap[d+'|'+k];if(!a)continue;rowsT.push([d,k,a.length,f0(pct(a,50)),f0(pct(a,95)),f0(Math.max(...a))]);csv.push(['tap',d,k,a.length,pct(a,50),pct(a,95),Math.max(...a)])}
 md.push(rowsT.length?tbl(['device','action','taps','p50 ms','p95 ms','max ms'],rowsT):'No tap data.','');
 /* by tab: the slowest tabs */
 const tabs=[];for(const d of DEVS)for(const k of Object.keys(tap).filter(x=>x.startsWith(d+'|tab:'))){const a=tap[k];tabs.push([d,k.split('|')[1],a.length,f0(pct(a,50)),f0(pct(a,95)),Math.max(...a)])}
 tabs.sort((a,b)=>b[5]-a[5]);if(tabs.length)md.push('Slowest tabs (max over all probes):','',tbl(['device','tab','taps','p50','p95','max'],tabs.slice(0,8).map(x=>[...x.slice(0,5),f0(x[5])])),'');
 /* by game-year */
 const rowsY=[];for(const d of DEVS)for(const b of BANDS){const a=tap[d+'|'+b];if(!a)continue;rowsY.push([d,b,a.length,f0(pct(a,50)),f0(pct(a,95)),f0(Math.max(...a))]);csv.push(['tap-by-year',d,b,a.length,pct(a,50),pct(a,95),Math.max(...a)])}
 md.push('Tap → screen by game-year (does it slow as the save grows?):','',rowsY.length?tbl(['device','game-year','taps','p50 ms','p95 ms','max ms'],rowsY):'No data.','');
 /* long tasks */
 md.push('### Solo · long tasks > 50 ms','');
 const rowsL=[];for(const d of DEVS){if(!lt[d])continue;const a=lt[d],pm=ltMin[d];rowsL.push([d+' (real page, probe only, CPU ×'+(process.env.LAGCPU||4)+')',a.length,pm.ms?f1(a.length/(pm.ms/6e4)):'—',f0(Math.max(0,...a)),f0(a.reduce((s,x)=>s+x,0))]);csv.push(['longtask-real',d,'probe',a.length,'','',Math.max(0,...a)])}
 {const all=[],mins=[];let nL=0;for(const r of lives){const b=lagOf(r).bot;if(!b)continue;const t=(b.lt||[]).map(x=>x[1]);all.push(...t);mins.push((b.playMs||0)/6e4);nL+=t.length}
  const pm=mins.reduce((s,x)=>s+x,0);if(all.length||pm)rowsL.push(['bot page (render off = game logic only)',nL,pm?f1(nL/pm):'—',f0(Math.max(0,...all)),f0(all.reduce((s,x)=>s+x,0))]);csv.push(['longtask-bot','bot','all',nL,'','',Math.max(0,...all)])}
 md.push(rowsL.length?tbl(['where','long tasks','per min','longest ms','total ms'],rowsL):'No data.','');
 /* who caused the worst frames */
 const worst=[];for(const d of DEVS)for(const f of (loafs[d]||[]))for(const s of f.s||[])worst.push({d,f:f.d,fn:s.fn||'(anon)',src:s.src,pos:s.pos,inv:s.inv,ms:s.d});
 worst.sort((a,b)=>b.ms-a.ms);if(worst.length)md.push('Worst frames, script attribution (long-animation-frame API; src:position is the built index.html, find it with the build\'s char offset):','',tbl(['device','script ms','frame ms','function','invoker','src:char'],worst.slice(0,8).map(w=>[w.d,w.ms,w.f,w.fn,w.inv,w.src+':'+w.pos])),'');
 /* ---- turn time ---- */
 md.push('### Solo · buổi / month turn time (bot page, render off = the game\'s own logic time)','');
 {const nb=[],mo=[],byY={};for(const r of lives){const b=lagOf(r).bot;if(!b||!b.nbY||!b.nbY.length)continue;const y0=b.nbY[0][0];let key=null,sum=0;
   for(const [y,m,ms] of b.nbY){nb.push(ms);(byY[bandOf(y,y0)]=byY[bandOf(y,y0)]||{nb:[],mo:[]}).nb.push(ms);const k=y+':'+m;if(k!==key){if(key!==null){mo.push(sum);(byY[bandOf(+key.split(':')[0],y0)]=byY[bandOf(+key.split(':')[0],y0)]||{nb:[],mo:[]}).mo.push(sum)}key=k;sum=0}sum+=ms}if(key!==null){mo.push(sum);(byY[bandOf(+key.split(':')[0],y0)]=byY[bandOf(+key.split(':')[0],y0)]||{nb:[],mo:[]}).mo.push(sum)}}
  const rows=[['ALL',nb.length,f0(pct(nb,50)),f0(pct(nb,95)),f0(Math.max(0,...nb)),mo.length,f0(pct(mo,50)),f0(pct(mo,95)),f0(Math.max(0,...mo))],...BANDS.filter(b=>byY[b]).map(b=>[b,byY[b].nb.length,f0(pct(byY[b].nb,50)),f0(pct(byY[b].nb,95)),f0(Math.max(0,...byY[b].nb)),byY[b].mo.length,f0(pct(byY[b].mo,50)),f0(pct(byY[b].mo,95)),f0(Math.max(0,...byY[b].mo))])];
  rows.forEach(r=>csv.push(['turn','bot',r[0],r[1],r[2],r[3],r[4]]));
  md.push(nb.length?tbl(['game-year','buổi changes','buổi p50 ms','buổi p95','buổi max','months','month p50 ms','month p95','month max'],rows):'No data.','');
  const slow=pct(nb,95);if(slow!=null&&slow>(BUD.tgt.tapP95||200))rec.push(['buổi change p95 '+f0(slow)+' ms (render off, desktop CPU)','robot10-in.js nextBuoi wrapper = the game\'s nextBuoi(); per-year table above shows if it grows','profile nextBuoi (jnf / j-turn code): keep per-buổi work O(1) in save size; defer journal / NPC upkeep','a turn the player never waits on']);
  const g=BANDS.filter(b=>byY[b]&&byY[b].nb.length>60).map(b=>pct(byY[b].nb,95));if(g.length>=2&&g[g.length-1]>1.6*g[0])rec.push(['buổi p95 grows '+f0(g[0])+' → '+f0(g[g.length-1])+' ms from the first to the last year band','nextBuoi: something scales with the save (journal / log arrays, NPC list, history)','cap or compact the growing array (ring buffer; prune the journal) in the offending function','turn time flat over a whole life']);}
 /* ---- memory ---- */
 md.push('### Solo · memory growth (bot page JS heap / DOM nodes / listeners; real pages) per game-year and per real hour','');
 {const rows=[],per=[];for(const r of lives){const m=(lagOf(r).bot||{}).mem||[];const s=m.slice(1);if(s.length<4)continue;const a=s[0],z=s[s.length-1],hr=(z[0]-a[0])/3600,yr=(z[5]||0)-(a[5]||0);
   per.push({id:r.job.id,hr,yr,dh:z[1]-a[1],dn:z[2]-a[2],dl:z[3]-a[3],h0:a[1],h1:z[1],ny:yr});}
  for(const x of per.sort((p,q)=>q.dh-p.dh).slice(0,10))rows.push([x.id,f1(x.hr*60)+' min',x.yr,f0(x.h0)+' → '+f0(x.h1),x.yr>0?f1(x.dh/x.yr):'—',x.hr>0?f1(x.dh/x.hr):'—',x.hr>0?f0(x.dn/x.hr):'—',x.hr>0?f0(x.dl/x.hr):'—']);
  const hh=per.filter(x=>x.hr>0.05).map(x=>x.dh/x.hr),hy=per.filter(x=>x.yr>0).map(x=>x.dh/x.yr);
  md.push(per.length?tbl(['life','sampled','game years','heap MB','MB / game-year','MB / real hour','nodes / hour','listeners / hour'],rows):'No memory samples (lives shorter than ~2 min).','',
   per.length?`Over ${per.length} lives: heap growth median ${f1(pct(hh,50))} MB/h, p95 ${f1(pct(hh,95))} MB/h; per game-year median ${f1(pct(hy,50))} MB, p95 ${f1(pct(hy,95))} MB (budget heapGrowthMB ${BUD.def.heapGrowthMB} per play window; domGrowth ${BUD.def.domGrowth}).`:'','');
  csv.push(['heap-per-hour','bot','median',hh.length,pct(hh,50),pct(hh,95),Math.max(0,...hh)]);
  if(hh.length&&pct(hh,95)>200)rec.push(['bot-page heap grows p95 '+f0(pct(hh,95))+' MB per real hour (render off)','bot page: ~350k-node DOM bursts while render is off (game finding 23/11); DOM nodes/listeners columns above','find the function that builds the DOM bursts when render is off; skip DOM work while the page is hidden / render is off','heap flat; no tab crash on a long life'])}
 const crash=L.filter(r=>(r.bugs||[]).some(b=>b.type==='crash'&&/tab crashed/i.test(b.msg)));
 md.push(`Tab crashes: **${crash.length} of ${L.length} lives** (${crash.map(r=>r.job.id+' @ '+f0((r.t&&r.t.total||0)/1e3)+' s').slice(0,8).join(', ')||'none'}). Harness runs PAR 2 + page recycle: a crash here is box RAM, see reports/robot10-harness.md Part 2.`,'');
 if(crash.length)rec.push(['tab crashed in '+crash.length+'/'+L.length+' lives','renderer memory over a long life (reports/robot10-harness.md Part 2: save load leaks ~5-6k DOM nodes + 600-800 listeners per load; bot page heap 56 MB → ~1 GB)','fix the load leak (remove listeners / DOM of the previous screen on loadSlot) + the render-off DOM bursts','a whole kiếp fits in a phone\'s RAM']);
 /* ---- budgets: real pages vs play-perf-budget.json ---- */
 {const rows=[];for(const d of DEVS){const a=tap[d+'|ALL'];if(!a)continue;const p95=pct(a,95),mx=Math.max(...a);rows.push([d,'tapP95',f0(p95),BUD.tgt.tapP95,BUD.def.tapP95,p95<=BUD.tgt.tapP95?'target met':p95<=BUD.def.tapP95?'within regression ceiling':'OVER ceiling']);rows.push([d,'tapMax',f0(mx),BUD.tgt.tapMax,BUD.def.tapMax,mx<=BUD.tgt.tapMax?'target met':mx<=BUD.def.tapMax?'within regression ceiling':'OVER ceiling']);
   const w=Math.max(0,...(lt[d]||[0]));rows.push([d,'actLongTaskMax',f0(w),BUD.tgt.actLongTaskMax,BUD.def.actLongTaskMax,w<=BUD.tgt.actLongTaskMax?'target met':w<=BUD.def.actLongTaskMax?'within regression ceiling':'OVER ceiling']);
   if(p95>BUD.tgt.tapP95){const slow=Object.keys(tap).filter(k=>k.startsWith(d+'|')&&!/ALL|year/.test(k)).map(k=>[k.split('|')[1],pct(tap[k],95)]).sort((x,y)=>y[1]-x[1])[0];const w0=worst.find(x=>x.d===d);
    rec.push([`[${d}] tap → screen p95 ${f0(p95)} ms (target ${BUD.tgt.tapP95}); slowest: ${slow?slow[0]+' p95 '+f0(slow[1])+' ms':'—'}`,w0?`${w0.fn} (${w0.inv}) ${w0.src}:${w0.pos}, ${w0.ms} ms in one frame`:'see the tab table above (no LOAF script attribution captured)',slow&&/Sang ngày/.test(slow[0])?'split the night-flip work across frames (rAF chunks); render only the changed panel':'render only the changed panel; build tab content lazily on first open','tap p95 under the target on a phone-class CPU'])}}
  md.push('Budget (dev/test/play-perf-budget.json — _target is the goal, default is the regression ceiling; CPU-throttled ×'+(process.env.LAGCPU||4)+'):','',rows.length?tbl(['device','metric','measured ms','target','ceiling','verdict'],rows):'No data.','')}
 /* ---- co-op pairs ---- */
 const CO=(opts.coop||[]).concat(coopFromDirs(opts.dirs||[]));
 md.push('### Co-op pairs (dev/test/coop-lag.js metrics; same names, budget = the coop* keys of play-perf-budget.json)','');
 if(CO.length){const keys=['coopTurnP95','coopActionP95','coopActionMax','coopSyncKBMax','coopKBPerMin','coopResendPerMin','coopRejoinMs','coopLongTasksPerMin','coopLongTaskMax','pageErrors'];
  md.push(tbl(['run','cpu','turns ok',...keys],CO.map((c,i)=>[c._f||('run '+(i+1)),c.cpu,c.metrics.coopTurnsOk,...keys.map(k=>c.metrics[k])])),'',
   tbl(['key','budget (default)','target','worst measured','verdict'],keys.filter(k=>BUD.def[k]!=null).map(k=>{const w=Math.max(...CO.map(c=>+c.metrics[k]||0));return [k,BUD.def[k],BUD.tgt[k]!=null?BUD.tgt[k]:'—',w,w>BUD.def[k]?'OVER ceiling':(BUD.tgt[k]!=null&&w>BUD.tgt[k]?'within ceiling, over target':'ok')]})),'',
   `Desync / stall count: ${CO.reduce((s,c)=>s+(c.metrics.coopTurnsOk&&c.metrics.coopTurnsOk.split('/')[0]!==c.metrics.coopTurnsOk.split('/')[1]?1:0),0)} runs where a buổi never completed on both screens; page errors: ${CO.reduce((s,c)=>s+(c.metrics.pageErrors||0),0)}.`,'');
  for(const c of CO)for(const k of Object.keys(BUD.def).filter(k=>/^coop/.test(k))){if(c.metrics[k]>BUD.def[k])rec.push([`co-op ${k} ${c.metrics[k]} > ceiling ${BUD.def[k]} (${c._f||''})`,'dev/test/coop-lag.js per-type frame table in the JSON (R.frames) names the heaviest message','shrink / diff that state message (co-op sends state only)','co-op turn and action inside budget'])}}
 else md.push('No co-op lag runs passed in. Foreman B\'s co-op runners record the same metrics through `dev/test/lib/coop-lag-hooks.js` (init(ctx) + metrics(...)) and `node dev/test/coop-lag.js --out <file>`; pass the file(s) with `--coop` / put `coop-lag*.json` in the folder.','');
 /* ---- game findings folded in (report only) ---- */
 md.push('### Known game findings folded into LAG (report only; found by the part-2 harness, 23/11)','',
  '- Real-page save load leaks ~5–6k DOM nodes + 600–800 JS listeners per load (RECYCLE=1 re-opens the pages to keep the box alive).','- Bot page JS heap 56 MB → ~1 GB with ~350k-node DOM bursts while render is off.','');
 md.push('### LAG RECOMMENDATIONS (finding → cause / file:line → proposed fix → expected effect)','');
 rec.push(['Dư đồ («go» tab) on a PLAYED save takes ~12 s at CPU ×1, ~39 s at ×4 (a fresh life: 0.25–0.4 s); the second open costs the same, pictures blocked or not (profile of the tap, 500 µs sampling)','kmSolve (map label / path solver) dev/build/j38.js:19 with its callers hardAt / segR / ovP / costAt / search / geo; called from j38.js:83 up to 5× per open (kmSolve(its,K,W,undefined,vp) then 4 retries); the result cache window.__mapSolC[ck] is not hit on the 2nd open (same cost again)','solve the labels once per save change, not per open: make the cache key stable (ck without volatile fields), cap the first pass by the same performance.now() budget as the retries, pre-solve off the tap (idle / on load), keep the last good layout while a new one is solved','Dư đồ opens in < 400 ms on a played save']);
 rec.push(['real-page save load leaks ~5-6k DOM nodes + 600-800 listeners per load (part 2 finding)','loadSlot / start() re-render path (see reports/robot10-harness.md Part 2 for the measurements)','remove the previous screen\'s nodes + listeners before building the loaded one (one teardown function in the kit)','a long session of loads / Tiếp tục stays flat']);
 md.push(tbl(['finding','cause / file:line','proposed fix','expected effect'],rec.map(r=>r.map(x=>String(x).replace(/\n/g,' ')))),'');
 return{md,csv}}

/* co-op lag JSON files (coop-lag.js --out) in folders */
function coopFromDirs(dirs){const out=[];const walk=f=>{let st;try{st=fs.statSync(f)}catch(e){return}if(st.isDirectory()){for(const x of fs.readdirSync(f))if(x!=='saves'&&x!=='shots')walk(path.join(f,x))}
  else if(/anim-coop.*\.json$/.test(f)){try{const j=JSON.parse(fs.readFileSync(f,'utf8'));if(j&&j.baseline){out.push({metrics:j.baseline,cpu:j.cpu,_f:path.basename(f)+' (baseline, no figures)'})}}catch(e){}}
  else if(/coop-lag.*\.json$/.test(f)){try{const j=JSON.parse(fs.readFileSync(f,'utf8'));if(j&&j.metrics){j._f=path.basename(f);out.push(j)}}catch(e){}}};dirs.forEach(walk);return out}

/* ---- ANIM BUDGET (reads anim-*.json written by robot10-anim.js) ---- */
function animFromDirs(dirs){const out=[];const walk=f=>{let st;try{st=fs.statSync(f)}catch(e){return}if(st.isDirectory()){for(const x of fs.readdirSync(f))if(x!=='saves'&&x!=='shots')walk(path.join(f,x))}
  else if(/(^|\/)anim-.*\.json$/.test(f)){try{const j=JSON.parse(fs.readFileSync(f,'utf8'));if(j&&j.cells){j._f=path.basename(f);out.push(j)}}catch(e){}}};dirs.forEach(walk);return out}
function animSection(dirs,opts){opts=opts||{};const A=(opts.anim||animFromDirs(dirs||[])).slice().sort((x,y)=>String(x._f)<String(y._f)?-1:1);const md=['## ANIM BUDGET (ORDER #8: how many animated figures a screen can hold, per format; synthetic loops of today\'s real figure pictures, no new art)',''];
 if(!A.length){md.push('No anim-stress runs found (`node dev/measure/robot10-anim.js …`, files anim-*.json).','');return{md}}
 const bestAll={};const rec=[];const allSolo=A.filter(a=>a.mode==='solo');
 md.push('Method: fake LIVE figures = today\'s real full-body pictures (img/fig-consort-c01..c12-t1-a18.webp from the image CDN), drawn over the stage as 3 formats — **css** (2 transform layers per figure: whole-body breath + lower-body sleeve sway), **sprite** (12-frame sheet generated in the page, steps()), **webm** (alpha VP9 loop, 3 s, from anim-gen.py) — plus one action clip at a time every 10–20 s. CPU ×'+A[0].cpu+' (like coop-lag), ANGLE SwiftShader (software GL: fps are box-bound, read the DELTA to the game alone). fx lite = «Hiệu ứng: Gọn» (OPT.fxon=false: isolates the figures from the game\'s own weather/particles); fx full = the game as she plays it. GPU Δ = GPU-process RSS (no VRAM counter in CDP). Cells = '+(A[0].secs||20)+' s each.','');
 const PASS=(c,b)=>b?(c.fps50>=.8*b.fps50&&c.fps5>=.6*b.fps5&&c.ltPerMin<=1.3*b.ltPerMin+10):(c.fps5>=24&&c.fps50>=40);
 for(const run of A){const cells=run.cells;
  if(run.mode==='solo'){const tag=`${run.fx||'full'} fx · ${run._f}`;
   md.push(`### Solo, ${tag} — fps p5 / p50 · long tasks per min · heap Δ MB · GPU-process Δ MB`,'');
   md.push(tbl(['device','format','figures','fps p5','fps p50','long tasks/min','longest ms','heap +MB (figures)','heap Δ MB (20 s)','GPU + MB (figures)','GPU Δ MB (20 s)'],cells.map(c=>[c.dev,c.format,c.figs+(c.dialogue?' + 2 dialogue':''),f0(c.fps5),f0(c.fps50),f1(c.ltPerMin),f0(c.ltMax),f1(c.heapAdd),f1(c.heapD),f0(c.gpuAdd),f0(c.gpuD)])),'');
   const FM=[...new Set(cells.filter(c=>c.format!=='none').map(c=>c.format))];const rows=[];
   for(const dev of [...new Set(cells.map(c=>c.dev))]){const mb=dl=>{const B=cells.filter(c=>c.dev===dev&&c.format==='none'&&!!c.dialogue===dl);return B.length?{fps5:B.reduce((s,c)=>s+c.fps5,0)/B.length,fps50:B.reduce((s,c)=>s+c.fps50,0)/B.length,ltPerMin:B.reduce((s,c)=>s+c.ltPerMin,0)/B.length,spread:Math.max(...B.map(c=>c.fps50))-Math.min(...B.map(c=>c.fps50))}:null};const base=mb(false),baseD=mb(true);
    for(const f of FM){const C=cells.filter(c=>c.dev===dev&&c.format===f&&!c.dialogue).sort((x,y)=>x.figs-y.figs);let mx=0;for(const c of C){if(PASS(c,base))mx=c.figs;else break}const dl=cells.find(c=>c.dev===dev&&c.format===f&&c.dialogue);
     const key=(run.fx||'full')+'|'+f;bestAll[key]=Math.min(bestAll[key]==null?99:bestAll[key],mx);
     rows.push([dev,f,mx?mx:'< '+(C[0]?C[0].figs:1),dl?(PASS(dl,baseD||base)?'ok':'too slow'):'—',base?f0(base.fps50)+' fps / p5 '+f0(base.fps5)+' (two baselines differ by '+f0(base.spread)+' fps)':'—'])}}
   md.push(`**Max live figures per screen (${run.fx||'full'} fx; pass = fps p50 ≥ 80 % and p5 ≥ 60 % of the game alone, long tasks ≤ 130 % + 10 per min; every smaller count must pass too; tested up to ${Math.max(...cells.map(c=>c.figs))})**`,'',tbl(['device','format','max live figures (stage)','2 in a dialogue','game alone'],rows),'');}
  else if(run.mode==='coop'){md.push(`### Co-op pair, both clients animating — ${run._f} (fx ${run.fx||"full"}; baseline coopTurnP95 ${run.baseline&&run.baseline.coopTurnP95} ms, coopActionP95 ${run.baseline&&run.baseline.coopActionP95} ms; budget ceilings ${BUD.def.coopTurnP95} / ${BUD.def.coopActionP95})`,'');
   md.push(tbl(['client','format','figures','fps p5','fps p50','long tasks/min','coopTurnP95 ms','coopActionP95 ms','turn Δ vs none','action Δ vs none','buổi done'],cells.filter(c=>c.format!=='none').map(c=>[c.dev,c.format,c.figs,f0(c.fps5),f0(c.fps50),f0(c.ltPerMin),f0(c.coopTurnP95),f0(c.coopActionP95),f0(c.dTurn),f0(c.dAction),c.turnsOk])),'',
    'Co-op caveat: both clients run the whole game with full effects at CPU ×4 in software GL (~2 fps), so turn times are already over the budget ceiling WITHOUT figures and swing by tens of seconds between runs; only a delta far beyond the baseline spread is a signal. Runs where a buổi never finished on both screens (turnsOk < N/N) are stalls, not slow turns.','');
   for(const c of cells.filter(c=>c.format!=='none'&&c.dTurn!=null&&c.dTurn>(run.baseline?run.baseline.coopTurnP95:0)&&c.turnsOk&&c.turnsOk.split('/')[0]!==c.turnsOk.split('/')[1]))rec.push([`co-op with ${c.figs} ${c.format} figures: ${c.turnsOk} buổi completed (stall)`,'two CPU-throttled clients: loops + sync handler contend for the main thread','run co-op in «Gọn» by default or cap live figures at the solo budget minus 2; start loops after state applies','no stalled turn with figures on'])}
 }
 const FMs=[...new Set(Object.keys(bestAll).map(k=>k.split('|')[1]))];const lite=FMs.map(f=>[f,bestAll['lite|'+f]]).filter(x=>x[1]!=null).sort((a,b)=>b[1]-a[1]);
 if(lite.length)md.push(`**Recommended format: ${lite[0][0]}** (fx lite, isolates the figures: max live figures ${lite.map(x=>x[0]+' '+x[1]).join(' · ')} on the weaker device).`,'');
 md.push('### Rules (check against the numbers above before adopting)','',
  '- Pause every loop that is off screen (IntersectionObserver) and every loop while the tab is hidden (visibilitychange): `animation-play-state: paused` / `video.pause()`.',
  '- Stagger loop phases (random negative `animation-delay`, different durations 3.1–4.7 s) so frames never change on the same tick.',
  '- ONE real action clip (video / sprite burst) at a time on a screen; every other figure stays on the cheap idle layer.',
  '- Idle layers: transform + opacity only (compositor), `will-change: transform` on the moving layer; never animate layout or filter.',
  '- «Hiệu ứng: Gọn» (and weak devices) → still pictures; co-op sends state only, loops start after state applies.','');
 for(const [f,m] of lite)if(m<12)rec.push([`${f}: only ${m} live figures fit the budget on the weaker device (fx lite)`,'cost per figure (decode / layer count / texture memory), see the cell rows','cap at '+m+' live figures per screen (rest still); use for 1–2 figures in a dialogue or one action clip','the stage stays at the fps floor']);
 md.push('### ANIM RECOMMENDATIONS (finding → cause → proposed fix → expected effect)','',rec.length?tbl(['finding','cause','proposed fix','expected effect'],rec):'Every tested format and count stayed inside the budget (solo); widen the matrix beyond 12 before drawing art.','');
 return{md}}

module.exports={BOT_INIT,REAL_INIT,probe,section,animSection,animFromDirs,coopFromDirs,BUD};

/* ---- CLI ---- */
if(require.main===module){const a=process.argv.slice(2);let out=path.join(__dirname,'..','handover','robot');const ins=[],coop=[],anim=[];let mode='ins';
 for(let i=0;i<a.length;i++){if(a[i]==='--out')out=a[++i];else if(a[i]==='--coop')mode='coop';else if(a[i]==='--anim')mode='anim';else (mode==='coop'?coop:mode==='anim'?anim:ins).push(a[i])}
 if(!ins.length&&!coop.length&&!anim.length){console.log('usage: node dev/measure/robot10-lag.js <robot10 json|folder>… [--coop <coop-lag json|folder>…] [--anim <folder>…] [--out dir]');process.exit(2)}
 const lives=new Map();const walk=f=>{const st=fs.statSync(f);if(st.isDirectory()){for(const x of fs.readdirSync(f))if(x!=='saves'&&x!=='shots')walk(path.join(f,x))}else if(/\.json$/.test(f)&&!/(coop-lag|anim-|catalog)/.test(path.basename(f))){let d;try{d=JSON.parse(fs.readFileSync(f,'utf8'))}catch(e){return}if(Array.isArray(d))for(const r of d)if(r&&r.job&&r.life)lives.set(r.job.id+'#'+(r.job.seed||''),r)}};ins.forEach(walk);
 const dirs=coop.concat(anim);const s=section([...lives.values()],{dirs:coop.length?coop:ins});const an=animSection(anim.length?anim:ins);
 fs.mkdirSync(out,{recursive:true});const stamp=new Date().toISOString().slice(0,16).replace(/[-:]/g,'').replace('T','-');
 fs.writeFileSync(path.join(out,`lag-${stamp}.md`),['# ROBOT-10 LAG + ANIM BUDGET · '+stamp+' (UTC) · '+lives.size+' lives','',...s.md,...an.md].join('\n'));
 fs.writeFileSync(path.join(out,`lag-${stamp}.csv`),s.csv.map(r=>r.join(',')).join('\n')+'\n');console.log('lag report: '+path.join(out,`lag-${stamp}.md`)+' (+ .csv) · '+lives.size+' lives')}
