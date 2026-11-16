/* dev/test/play-trace.js — main-thread breakdown (style / layout / paint / script / layer tree) of one play action, from a Chromium trace.
   usage: node dev/test/play-trace.js [--device fold] [--cpu 4] [--root <built site>] [--act next|tab|idle|card] [--reps 2]
   Complements play-prof.js (JS functions): this one shows the browser's own work (the "(program)" bucket of a CPU profile). */
const {chromium}=require('playwright');const path=require('path');const D=require('./lib/device');
const A=process.argv.slice(2);const opt=(k,d)=>{const i=A.indexOf('--'+k);return i<0?d:(A[i+1]===undefined||A[i+1].startsWith('--')?true:A[i+1])};
const DEV=opt('device','fold'),CPU=+opt('cpu',4),ACT=opt('act','next'),REPS=+opt('reps',2);const ROOT=path.resolve(opt('root',path.join(__dirname,'../..')));
const sleep=t=>new Promise(r=>setTimeout(r,t));const {NEWLIFE,CLEAR,OPENACT}=require('./lib/playperf');
(async()=>{const srv=await D.serveRoot(ROOT);const b=await chromium.launch({args:require('./lib/playperf').LAUNCH_ARGS});
 const ctx=await D.newDeviceContext(b,DEV,{serviceWorkers:'block'});await ctx.addInitScript(()=>{window.__bot={pre:1}});const p=await ctx.newPage();
 const cdp=await ctx.newCDPSession(p);const f=await D.openHost(p,srv.url,{timeout:300000});await sleep(1500);await f.evaluate(NEWLIFE);await sleep(3000);await f.evaluate(CLEAR);
 if(opt('hide',null))await f.evaluate(sel=>{const st=document.createElement('style');st.textContent=sel+'{display:none!important}';document.head.appendChild(st)},opt('hide'));
 if(opt('eval',null))console.log('eval',await f.evaluate(opt('eval')));
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:CPU});
 const tapEl=async fn=>{const h=await f.evaluateHandle(fn);const el=h.asElement();if(el)try{await el.click({timeout:15000})}catch(e){}};
 const evs=[];cdp.on('Tracing.dataCollected',d=>evs.push(...d.value));const done=new Promise(r=>cdp.once('Tracing.tracingComplete',r));
 await cdp.send('Tracing.start',{traceConfig:{includedCategories:['devtools.timeline','disabled-by-default-devtools.timeline','blink','cc','v8.execute']},transferMode:'ReportEvents'});
 for(let i=0;i<REPS;i++){if(ACT==='next'){await tapEl(()=>document.getElementById('next'));await sleep(3500);await f.evaluate(CLEAR)}
  else if(ACT==='tab'){for(const k of ['court','rel','inv','act'])await tapEl(new Function(`return [...document.querySelectorAll('#tabs [data-tab="${k}"]')].find(x=>x.offsetParent!==null)`));await sleep(1000)}
  else await sleep(4000)}
 await cdp.send('Tracing.end');await done;
 /* renderer main thread = the thread with the most RunTask in the renderer process that has 'CrRendererMain' */
 const tn={};for(const e of evs)if(e.ph==='M'&&e.name==='thread_name')tn[e.pid+':'+e.tid]=e.args.name;
 const main=Object.keys(tn).filter(k=>tn[k]==='CrRendererMain');const by={},cnt={},big={};let n=0;
 for(const e of evs){if(e.ph!=='X'||!main.includes(e.pid+':'+e.tid))continue;const d=(e.dur||0)/1000;by[e.name]=(by[e.name]||0)+d;cnt[e.name]=(cnt[e.name]||0)+1;
  if(['Layout','UpdateLayoutTree','Paint','PrePaint','Layerize','UpdateLayer','CompositeLayers','RecalcStyle','ScheduleStyleRecalculation','Commit','HitTest','IntersectionObserverController::computeIntersections'].includes(e.name)){(big[e.name]=big[e.name]||[]).push([Math.round(d),e.args&&e.args.beginData?JSON.stringify(e.args.beginData).slice(0,120):(e.args&&e.args.elementCount!=null?'elements '+e.args.elementCount:'')])}}
 console.log(`act ${ACT} x${REPS} on ${DEV} cpu ${CPU}x — renderer main thread totals (ms, nested events overlap):`);
 Object.entries(by).sort((a,b)=>b[1]-a[1]).slice(0,28).forEach(([k,v])=>console.log(String(Math.round(v)).padStart(7),String(cnt[k]).padStart(6),k));
 for(const k of ['UpdateLayoutTree','Layout','PrePaint','Paint','Layerize','Commit']){const L=(big[k]||[]).sort((a,b)=>b[0]-a[0]).slice(0,4);if(L.length)console.log(k,'worst',JSON.stringify(L))}
 await b.close();srv.close()})().catch(e=>{console.error(e);process.exit(2)});
