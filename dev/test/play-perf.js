/* dev/test/play-perf.js — PLAY-TIME perf budget (owner 16/11 15:05Z: lag is FIRST PRIORITY, in play and in co-op; checked on every build
   without the owner reporting it). Companion of dev/test/perf.js (which measures LOAD); this one measures PLAYING.
   usage: node dev/test/play-perf.js [--devices fold,ipadAir] [--cpu 4] [--root <built site dir>] [--minutes 3] [--out result.json]
                                     [--budget dev/test/play-perf-budget.json] [--loaf]  (--loaf prints the worst frames with their scripts)
   Per device (real profile, dev/test/lib/device.js, HOST mode = the rot.js iframe the player gets, CPU throttled --cpu x):
     tap latency  real taps (CDP input) on the main actions; latency = Event Timing input -> next paint (INP-style) per action:
                  tabs, Hành sự card (+ close), Sang buổi, open/close dialog, Dư đồ, save
     longTasks    tasks > 50 ms during the actions and during the bot session (count / worst)
     fps          frames painted per second during the buổi transition and during an idle room (weather fx)
     soak         a bot plays --minutes of game; heap + DOM nodes + listeners + live intervals at start / end (growth = leak)
   Budget (dev/test/play-perf-budget.json): {default:{metric:max}, <device>:{...}}; min metrics end in "Min". Any miss = FAIL, exit code 1.
   Co-op latency is measured by dev/test/coop-lag.js (same budget file). */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const D=require('./lib/device');const PP=require('./lib/playperf');
const A=process.argv.slice(2);const opt=(k,d)=>{const i=A.indexOf('--'+k);return i<0?d:(A[i+1]===undefined||A[i+1].startsWith('--')?true:A[i+1])};
const DEVS=String(opt('devices','fold,ipadAir')).split(',');const CPU=+opt('cpu',4),MIN=+opt('minutes',3);
const ROOT=path.resolve(opt('root',path.join(__dirname,'../..')));const BUDGET=JSON.parse(fs.readFileSync(opt('budget',path.join(__dirname,'play-perf-budget.json')),'utf8'));
const OUT=opt('out',null);const SHOWLOAF=A.includes('--loaf');
const sleep=t=>new Promise(r=>setTimeout(r,t));const L=(...a)=>console.error(new Date().toISOString().slice(11,19),...a);

const {NEWLIFE,CLEAR,STEP,OPENACT}=PP;
async function findTap(f,fn,arg){const h=await f.evaluateHandle(fn,arg);const el=h.asElement();if(!el)return null;return el}
(async()=>{const srv=await D.serveRoot(ROOT);const b=await chromium.launch({args:require('./lib/playperf').LAUNCH_ARGS});
 const R={cpu:CPU,minutes:MIN,devices:{}};let fail=[];
 for(const dev of DEVS){L('device',dev);const ctx=await D.newDeviceContext(b,dev,{serviceWorkers:'block'});await ctx.addInitScript(PP.INIT);
  await ctx.addInitScript(()=>{window.__bot={pre:1}});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  const cdp=await ctx.newCDPSession(p);await cdp.send('Performance.enable');
  const f=await D.openHost(p,srv.url,{timeout:300000});await sleep(1500);
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:CPU});
  const name=await require('./lib/playperf').newLife(f);L('life',name);await sleep(2500);await f.evaluate(CLEAR);await sleep(800);
  const r={acts:{},loafTop:[]};const allLoaf=[];
  /* one measured tap */
  const RS=async()=>{await PP.reset(f);await PP.reset(p.mainFrame())};const SN=async()=>{const s=await PP.snap(f),t=await PP.snap(p.mainFrame());if(t)s.loaf=s.loaf.concat(t.loaf);return s};
  const tap=async(label,fn,arg,settle)=>{await RS();const el=await findTap(f,fn,arg);if(!el){if(!r.acts[label])r.acts[label]={missing:true};L(label,'missing');return false}
   try{await el.click({timeout:15000})}catch(e){r.acts[label]={err:e.message.slice(0,80)};return false}await sleep(settle||1500);const s=await SN();
   const lat=PP.tapLatency(s.ev);const lt=s.lt.map(x=>x.d);if(!r.acts[label]||!r.acts[label].lat)r.acts[label]={lat:[],lt:[]};r.acts[label].lat.push(lat);r.acts[label].lt.push(lt.length?Math.max(...lt):0);
   s.loaf.forEach(x=>allLoaf.push(Object.assign({a:label},x)));L(label,'lat',lat,'lt',lt.join(','));return true};
  const T=label=>[label,(k)=>{const t=[...document.querySelectorAll('#tabs [data-tab]')].find(x=>x.dataset.tab===k&&x.offsetParent!==null);return t||null}];
  /* 1. tabs, twice round */
  for(let rep=0;rep<2;rep++)for(const k of await f.evaluate(()=>[...document.querySelectorAll('#tabs [data-tab]')].filter(x=>x.offsetParent!==null).map(x=>x.dataset.tab)))
   await tap('tab',(k)=>[...document.querySelectorAll('#tabs [data-tab]')].find(x=>x.dataset.tab===k&&x.offsetParent!==null)||null,k,900);
  await tap('tab',()=>document.querySelector('#tabs [data-tab="act"]'),null,900);
  /* 2. act cards (+ the dialog they open, + closing it) and Sang buổi, for 4 buổi */
  for(let i=0;i<4;i++){await f.evaluate(CLEAR);await sleep(300);if(await f.evaluate(OPENACT))await sleep(1200);
   await tap('actCard',()=>{const c=[...document.querySelectorAll('button.card.ka:not(:disabled):not(.kdis)')].filter(x=>x.offsetParent!==null&&x.getBoundingClientRect().bottom<innerHeight);return c[Math.floor(Math.random()*c.length)]||null},null,1800);
   await tap('dialogChoice',()=>{const m=document.getElementById('modal');if(!m||m.hidden)return null;const o=[...m.querySelectorAll('.opts button:not([disabled])')].filter(x=>x.offsetParent!==null);return o[0]||[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null).pop()||null},null,1500);
   await tap('dialogClose',()=>{const m=document.getElementById('modal');if(!m||m.hidden)return null;return [...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null).pop()||null},null,1200);
   await f.evaluate(CLEAR);await sleep(300);
   /* Sang buổi: tap latency + fps through the transition */
   await RS();const fr0=await f.evaluate(()=>window.__pp.frames);const t0=Date.now();
   const ok=await tap('sangBuoi',()=>{const n=document.getElementById('next');return n&&n.offsetParent!==null&&!n.disabled?n:null},null,2500);
   if(ok){const fr1=await f.evaluate(()=>window.__pp.frames);(r.transFps=r.transFps||[]).push(Math.round((fr1-fr0)/((Date.now()-t0)/1000)*10)/10)}
   for(let k=0;k<12;k++){const s=await f.evaluate(STEP);if(s==='act'||s==='idle'||s==='tab')break;await sleep(400)}await f.evaluate(CLEAR)}
  /* 3. Dư đồ open / close */
  await tap('duDo',()=>[...document.querySelectorAll('button,[role=button]')].find(x=>x.offsetParent!==null&&/Dư đồ/.test(x.textContent)&&!x.disabled)||null,null,2000);
  await tap('duDoClose',()=>[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&(/^(Lui|Đóng|✕)$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')))||null,null,1200);
  await f.evaluate(CLEAR);
  /* 4. save (time of save() itself, ms, measured in page) */
  r.saveMs=await f.evaluate(()=>{const t=performance.now();try{save()}catch(e){}return Math.round(performance.now()-t)});
  /* 5. idle room fps (weather / ambience running) */
  r.idleFps=await PP.fps(f,4000);
  /* 6. soak: the bot plays MIN minutes; heap/DOM/listeners/intervals before and after (after a GC) */
  await cdp.send('HeapProfiler.enable');await cdp.send('HeapProfiler.collectGarbage');const m0=await PP.metrics(cdp);const s0=await PP.snap(f);await RS();
  const tS=Date.now();let steps=0,buoi0=await f.evaluate(()=>window.__buoiN||0),errStep=0;const ltSoak=[];
  while(Date.now()-tS<MIN*60000){try{await f.evaluate(STEP);steps++}catch(e){errStep++}await sleep(250);
   if(steps%40===0){const s=await SN();s.lt.forEach(x=>ltSoak.push(x.d));s.loaf.forEach(x=>allLoaf.push(Object.assign({a:'soak'},x)));await RS()}}
  {const s=await SN();s.lt.forEach(x=>ltSoak.push(x.d));s.loaf.forEach(x=>allLoaf.push(Object.assign({a:'soak'},x)))}
  await f.evaluate(CLEAR);await sleep(1500);await cdp.send('HeapProfiler.collectGarbage');const m1=await PP.metrics(cdp);const s1=await PP.snap(f);
  const buoi=(await f.evaluate(()=>window.__buoiN||0))-buoi0;
  r.soak={steps,buoi,errStep,heap:[m0.heapMB,m1.heapMB],nodes:[m0.nodes,m1.nodes],listeners:[m0.listeners,m1.listeners],dom:[s0.dom,s1.dom],intervals:[s0.ivN,s1.ivN],
   intervalSrc:s1.iv.map(x=>x.ms+'ms '+x.src).slice(0,12),timeoutsLive:[s0.toLive,s1.toLive],lt50:ltSoak.length,ltMax:ltSoak.length?Math.max(...ltSoak):0,ltPerMin:Math.round(ltSoak.length/MIN*10)/10};
  r.errs=errs.slice(0,8);
  /* summary metrics */
  const lat=[].concat(...Object.values(r.acts).filter(x=>x.lat).map(x=>x.lat));const ltA=[].concat(...Object.values(r.acts).filter(x=>x.lt).map(x=>x.lt));
  r.metrics={tapP95:PP.pct(lat,95),tapMax:lat.length?Math.max(...lat):0,actLongTaskMax:ltA.length?Math.max(...ltA):0,transFpsMin:r.transFps&&r.transFps.length?Math.min(...r.transFps):0,idleFpsMin:r.idleFps,
   soakLongTasksPerMin:r.soak.ltPerMin,soakLongTaskMax:r.soak.ltMax,heapGrowthMB:Math.round((m1.heapMB-m0.heapMB)*10)/10,domGrowth:s1.dom-s0.dom,intervalsEnd:s1.ivN,saveMs:r.saveMs,pageErrors:errs.length};
  for(const k in r.acts){const a=r.acts[k];if(a.lat)a.p95=PP.pct(a.lat,95)}
  /* worst frames by function (who to fix) */
  const by={};for(const x of allLoaf)for(const s of x.s){const k=(s.fn||'(anon)')+'@'+s.pos;(by[k]=by[k]||{n:0,ms:0,max:0,lay:0,a:{}});by[k].n++;by[k].ms+=s.d;by[k].max=Math.max(by[k].max,s.d);by[k].lay+=s.lay;by[k].a[x.a]=1}
  r.loafTop=Object.entries(by).sort((a,b)=>b[1].ms-a[1].ms).slice(0,15).map(([k,v])=>({k,n:v.n,ms:v.ms,max:v.max,lay:v.lay,a:Object.keys(v.a).join(',')}));
  if(SHOWLOAF)r.loafWorst=allLoaf.sort((a,b)=>b.d-a.d).slice(0,10);
  const bud=Object.assign({},BUDGET.default,BUDGET[dev]||{});r.over=[];
  for(const [k,v] of Object.entries(bud)){if(k.startsWith('_')||k.startsWith('coop'))continue;const m=r.metrics[k.replace(/Min$/,'Min')];if(m===undefined)continue;
   if(k.endsWith('Min')?m<v:m>v)r.over.push(k+' '+m+(k.endsWith('Min')?' < ':' > ')+v)}
  if(r.over.length)fail.push(dev+': '+r.over.join('; '));
  R.devices[dev]=r;console.log(JSON.stringify({dev,metrics:r.metrics,over:r.over}));await ctx.close()}
 await b.close();srv.close();if(OUT)fs.writeFileSync(OUT,JSON.stringify(R,null,1));
 console.log(fail.length?'FAIL\n'+fail.join('\n'):'PASS play-perf');process.exit(fail.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
