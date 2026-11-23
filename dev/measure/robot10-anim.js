/* robot10-anim.js — ROBOT-10 ORDER #8 «ANIM-STRESS» (owner OD 23/11 ~23:10Z; TEST-ONLY, DEFAULT-OFF, NO NEW ART, report-only).
   sếp's goal: every figure animated (idle breath + sleeves always, one real action clip every 10-20 s, both figures in dialogues). Measure BEFORE art:
   how many animated figures can a screen hold, in which format. Synthetic loops of today's REAL full-body pictures (dev/test/lib/anim-stress.js):
     css (transform layers) · sprite (a sheet generated in the page, steps()) · webm (alpha VP9 loop made from the same picture by dev/test/lib/anim-gen.py)
 USAGE
   node dev/measure/robot10-anim.js solo [--devs fold,ipad] [--formats css,sprite,webm] [--figs 1,2,4,6,12] [--secs 20] [--cpu 4] [--out dir]
   node dev/measure/robot10-anim.js coop [--formats css,sprite,webm] [--figs 2,6,12] [--buoi 6] [--cpu 4] [--out dir]     (two clients on the LIVE co-op Worker, both animating;
        runs dev/test/coop-lag.js --anim <fmt>:<n> --no-rejoin once WITHOUT anim (baseline) and once per cell → coopTurnP95 / coopActionP95 delta vs no-anim)
   node dev/measure/robot10-anim.js soak <format> <figs> [--devs fold,ipad] [--soak 1800]     30-min soak of one config: heap / DOM / GPU-process growth per 30 s
   --fx full|lite   full (default) = the game as she plays it; lite = «Hiệu ứng: Gọn» (isolates the figures' marginal cost; the software-GL test box runs the full game at only ~15 fps at CPU ×1)
   env GAME=<index.html path | https URL> (default: this checkout's index.html served locally; pictures come from the image CDN) · ANIM_CACHE=<dir> (figures + generated webm, default ../anim-cache)
   OUTPUT <out>/anim-<stamp>.json {dev, cpu, secs, cells:[{mode, dev, format, figs, dialogue, fps5, fps50, ltPerMin, ltMax, heapD, gpuD, heapAdd, gpuAdd, dTurn, dAction, …}]}
          + anim-<stamp>.md (cell table). robot10-agg.js / robot10-lag.js read the JSON → the «ANIM BUDGET» section of rates-<date>.md.
   WHAT IS MEASURED PER CELL (device pages = Fold 755x1000@2 / iPad 1180x820@2, CPU throttled ×4 like coop-lag, ANGLE SwiftShader + GPU raster like a phone GPU):
     fps p5 / p50 / mean of 1-s rAF windows over SECS after a 3 s warm-up · long tasks > 50 ms per minute + the longest · JS heap Δ over the window and
     the heap added by the figures (before inject → after warm-up) · GPU-process RSS Δ (the GPU-memory proxy: Chromium exposes no VRAM counter) and what the figures added
   The baseline cell (format none, 0 figures) is the game alone; the stage also shows the game's own figures: the synthetic ones are ADDED on top. 2 «dialogue» figures = two big
   figures over the open dialogue area. One action clip at a time (every 10-20 s) runs in every cell. */
const fs=require('fs'),path=require('path'),http=require('http');
const {chromium}=require('playwright');
const PP=require('../test/lib/playperf.js'),AS=require('../test/lib/anim-stress.js');
const A=process.argv.slice(2);const MODE=A[0]||'solo';const opt=(k,d)=>{const i=A.indexOf('--'+k);return i<0?d:(A[i+1]===undefined||A[i+1].startsWith('--')?true:A[i+1])};
const REPO=path.join(__dirname,'..','..');const OUT=path.resolve(opt('out',path.join(REPO,'dev','handover','robot')));
const CPU=+opt('cpu',4),SECS=+opt('secs',20),FORMATS=String(opt('formats','css,sprite,webm')).split(','),FIGS=String(opt('figs',MODE==='coop'?'2,6,12':'1,2,4,6,12')).split(',').map(Number);
const DEVS={fold:[755,1000],ipad:[1180,820]};const DV=String(opt('devs','fold,ipad')).split(',').filter(d=>DEVS[d]);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));const L=(...a)=>console.error(new Date().toISOString().slice(11,19),...a);
const FX=String(opt('fx','full'));/* full = the game's own effects on (default, what she plays); lite = «Hiệu ứng: Gọn» (OPT.fxon=false) so the figures' own cost shows above the game's weather / particles */
const GAME=process.env.GAME||path.join(REPO,'index.html');
function serve(file){const root=path.dirname(path.resolve(file)),idx=path.basename(file);const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.css':'text/css','.webmanifest':'application/manifest+json'};
 return new Promise(res=>{const sv=http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(u==='/')u='/'+idx;const f=path.join(root,u);if(!f.startsWith(root)){r.writeHead(403);return r.end()}
  fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'content-type':T[path.extname(f)]||'application/octet-stream'});r.end(d)})});sv.listen(0,'127.0.0.1',()=>{sv.unref();res('http://127.0.0.1:'+sv.address().port+'/'+idx)})})}
const stamp=new Date().toISOString().slice(0,16).replace(/[-:]/g,'').replace('T','-');
const metrics=async cdp=>{const m=(await cdp.send('Performance.getMetrics')).metrics;const g=k=>(m.find(x=>x.name===k)||{}).value||0;return{heap:g('JSHeapUsedSize')/1048576,nodes:g('Nodes'),listeners:g('JSEventListeners')}};
const R1=x=>Math.round(x*10)/10;

/* ---------- solo ---------- */
async function solo(){const pre=await AS.prep({dir:process.env.ANIM_CACHE,formats:FORMATS});const URL=/^https?:/.test(GAME)?GAME:await serve(GAME);
 const cells=[];const b=await chromium.launch({args:PP.LAUNCH_ARGS});
 for(const dev of DV){const [w,h]=DEVS[dev];const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:2,hasTouch:true,isMobile:w<1100});await AS.install(ctx,pre);await ctx.addInitScript(AS.FRAMES);
  const p=await ctx.newPage();p.setDefaultTimeout(60000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:180000});await p.waitForFunction(()=>typeof start==='function',null,{timeout:180000});await sleep(2500);
  await PP.newLife(p);await p.evaluate(PP.CLEAR);if(FX==='lite')await p.evaluate(()=>{try{OPT.fxon=false;OPT.fxpick=true;saveOpt()}catch(e){}});await sleep(1500);
  const cdp=await ctx.newCDPSession(p);await cdp.send('Performance.enable');await cdp.send('HeapProfiler.enable').catch(()=>{});await cdp.send('Emulation.setCPUThrottlingRate',{rate:CPU});
  const cell=async(format,n,dialogue,label)=>{await AS.remove(p).catch(()=>{});await cdp.send('HeapProfiler.collectGarbage').catch(()=>{});await sleep(1500);
   const m0=await metrics(cdp),g0=AS.procMem();
   if(dialogue){/* a dialogue: the game's own card, so the figures sit over a real open dialogue */await p.evaluate(()=>{try{const c=document.querySelector('button.card.ka:not(:disabled)');if(c)c.click()}catch(e){}})}
   if(format!=='none')await AS.inject(p,{format,n,dialogue});await sleep(3000);
   const m1=await metrics(cdp),g1=AS.procMem();await p.evaluate(()=>{const F=window.__r10fps;F.t.length=0;F.lt.length=0;F.on=true});
   await sleep(SECS*1000);const f=await p.evaluate(()=>{const F=window.__r10fps;F.on=false;return{t:F.t.slice(),lt:F.lt.slice()}});
   const m2=await metrics(cdp),g2=AS.procMem();const st=AS.fpsStats(f.t);const stat=format==='none'?{}:await p.evaluate(()=>window.__r10anim.stat());
   const c={mode:'solo',dev,format,figs:n,dialogue:!!dialogue,fps5:st.p5,fps50:st.p50,fpsMean:R1(st.mean),ltPerMin:R1(f.lt.length/(SECS/60)),ltMax:Math.max(0,...f.lt),
    heapAdd:R1(m1.heap-m0.heap),heapD:R1(m2.heap-m1.heap),nodesAdd:m1.nodes-m0.nodes,gpuAdd:g1.gpuMB-g0.gpuMB,gpuD:g2.gpuMB-g1.gpuMB,rendererAdd:g1.rendererMB-g0.rendererMB,acts:stat.acts||0,errors:errs.length};
   cells.push(c);L(dev,format,n,dialogue?'dialogue':'','fps p5/p50',c.fps5,c.fps50,'lt/min',c.ltPerMin,'heap+',c.heapAdd,'gpu+',c.gpuAdd);
   if(dialogue)await p.evaluate(PP.CLEAR);await AS.remove(p).catch(()=>{})};
  await cell('none',0,false);
  for(const fm of FORMATS){for(const n of FIGS)await cell(fm,n,false);await cell(fm,2,true)}
  await ctx.close()}
 await b.close();return{cells,sizes:pre.sizes}}

/* ---------- soak: one config, heap / DOM / GPU-process growth over SOAK seconds ---------- */
async function soak(){const format=A[1]||'css',n=+(A[2]||6),SOAK=+opt('soak',1800);const pre=await AS.prep({dir:process.env.ANIM_CACHE,formats:[format]});const URL=/^https?:/.test(GAME)?GAME:await serve(GAME);const cells=[];const b=await chromium.launch({args:PP.LAUNCH_ARGS});
 for(const dev of DV){const [w,h]=DEVS[dev];const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:2,hasTouch:true,isMobile:w<1100});await AS.install(ctx,pre);await ctx.addInitScript(AS.FRAMES);const p=await ctx.newPage();p.setDefaultTimeout(60000);
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:180000});await p.waitForFunction(()=>typeof start==='function',null,{timeout:180000});await sleep(2500);await PP.newLife(p);await p.evaluate(PP.CLEAR);await sleep(1500);
  const cdp=await ctx.newCDPSession(p);await cdp.send('Performance.enable');await cdp.send('HeapProfiler.enable').catch(()=>{});await cdp.send('Emulation.setCPUThrottlingRate',{rate:CPU});
  await AS.inject(p,{format,n});await sleep(3000);await cdp.send('HeapProfiler.collectGarbage').catch(()=>{});const series=[];const t0=Date.now();let fr=[];await p.evaluate(()=>{const F=window.__r10fps;F.t.length=0;F.lt.length=0;F.on=true});
  while(Date.now()-t0<SOAK*1000){await sleep(30000);const m=await metrics(cdp),g=AS.procMem();const f=await p.evaluate(()=>{const F=window.__r10fps;const o={t:F.t.slice(),lt:F.lt.slice()};F.t.length=0;F.lt.length=0;return o});const st=AS.fpsStats(f.t);fr.push(...f.t);
   series.push({s:Math.round((Date.now()-t0)/1e3),heap:R1(m.heap),nodes:m.nodes,listeners:m.listeners,gpuMB:g.gpuMB,rendererMB:g.rendererMB,fps5:st.p5,fps50:st.p50,lt:f.lt.length});L(dev,'soak',series[series.length-1])}
  const a=series[1]||series[0],z=series[series.length-1],hr=(z.s-a.s)/3600||1/120;const st=AS.fpsStats(fr);
  cells.push({mode:'soak',dev,format,figs:n,dialogue:false,secs:SOAK,fps5:st.p5,fps50:st.p50,ltPerMin:R1(series.reduce((s,x)=>s+x.lt,0)/(SOAK/60)),ltMax:0,heapD:R1(z.heap-a.heap),gpuD:z.gpuMB-a.gpuMB,heapPerHour:R1((z.heap-a.heap)/hr),gpuPerHour:R1((z.gpuMB-a.gpuMB)/hr),nodesD:z.nodes-a.nodes,series});await ctx.close()}
 await b.close();return{cells}}

/* ---------- coop: coop-lag.js --anim, baseline first ---------- */
async function coop(){const cp=require('child_process');const NB=opt('buoi',6);const cells=[];const dir=fs.mkdtempSync(path.join(require('os').tmpdir(),'r10anim-'));
 const run=(tag,extra)=>{const out=path.join(dir,tag+'.json');L('coop-lag',tag);const r=cp.spawnSync('node',[path.join(REPO,'dev','test','coop-lag.js'),'--buoi',String(NB),'--cpu',String(CPU),'--no-rejoin','--out',out,...extra],{cwd:REPO,encoding:'utf8',stdio:['ignore','pipe','inherit']});
  try{return JSON.parse(fs.readFileSync(out,'utf8'))}catch(e){L('coop-lag produced no JSON for',tag,'exit',r.status);return null}};
 const base=run('base',[]);if(!base)throw new Error('coop baseline failed (needs bash dev/site/build_site.sh → dev/index.html, and the LIVE co-op Worker)');
 const bm=base.metrics;cells.push({mode:'coop',dev:'fold+ipad',format:'none',figs:0,coopTurnP95:bm.coopTurnP95,coopActionP95:bm.coopActionP95,coopKBPerMin:bm.coopKBPerMin});
 for(const fm of FORMATS)for(const n of FIGS){const r=run(fm+'-'+n,['--anim',fm+':'+n]);if(!r)continue;const m=r.metrics;
  for(const [dev,key] of [['fold','fold'],['ipad','ipad']]){const a=(r.anim||{})[key]||{};cells.push({mode:'coop',dev,format:fm,figs:n,dialogue:false,fps5:a.fps5,fps50:a.fps50,ltPerMin:R1((a.longTasks||0)/Math.max(.1,(r.turns.length*8)/60)),ltMax:a.longTaskMax,
    coopTurnP95:m.coopTurnP95,coopActionP95:m.coopActionP95,dTurn:m.coopTurnP95-bm.coopTurnP95,dAction:m.coopActionP95-bm.coopActionP95,turnsOk:m.coopTurnsOk,coopKBPerMin:m.coopKBPerMin,pageErrors:m.pageErrors})}}
 return{cells,baseline:bm}}

(async()=>{const t0=Date.now();const r=MODE==='coop'?await coop():MODE==='soak'?await soak():await solo();fs.mkdirSync(OUT,{recursive:true});
 const j=Object.assign({mode:MODE,fx:FX,cpu:CPU,secs:SECS,dev:DV.join('+'),formats:FORMATS,figs:FIGS,game:GAME,wallMin:R1((Date.now()-t0)/6e4)},r);
 fs.writeFileSync(path.join(OUT,`anim-${MODE}-${stamp}.json`),JSON.stringify(j,null,1));
 const md=['# ANIM-STRESS '+MODE+' '+stamp+' (UTC)','',`CPU ×${CPU} · ${SECS} s per cell · wall ${j.wallMin} min · formats ${FORMATS.join(', ')} · figures ${FIGS.join(', ')}`,'',
  '| mode | device | format | figures | fps p5 | fps p50 | long tasks/min | longest ms | heap +MB | heap Δ MB | GPU + MB | GPU Δ MB | turn Δ | action Δ |','|---|---|---|---|---|---|---|---|---|---|---|---|---|---|',
  ...r.cells.map(c=>`| ${c.mode} | ${c.dev} | ${c.format} | ${c.figs}${c.dialogue?' (dialogue)':''} | ${c.fps5??''} | ${c.fps50??''} | ${c.ltPerMin??''} | ${c.ltMax??''} | ${c.heapAdd??''} | ${c.heapD??''} | ${c.gpuAdd??''} | ${c.gpuD??''} | ${c.dTurn??''} | ${c.dAction??''} |`)].join('\n');
 fs.writeFileSync(path.join(OUT,`anim-${MODE}-${stamp}.md`),md);console.log(md);console.log('\nwrote '+path.join(OUT,`anim-${MODE}-${stamp}.json`))})().catch(e=>{console.error(e);process.exit(1)});
