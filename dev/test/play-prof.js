/* dev/test/play-prof.js — WHERE does play-time lag come from: CPU profile (CDP sampling profiler) of the main actions on the built site,
   HOST mode, CPU throttled. Prints self time and total (inclusive) time per function (name @ line of the game document), per action.
   usage: node dev/test/play-prof.js [--device fold] [--cpu 4] [--root <built site>] [--reps 3] [--acts next,card,tab,idle,map] [--top 25]
   Use with dev/test/play-perf.js (the budget): play-perf says IF it is slow, play-prof says WHICH function. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const D=require('./lib/device');
const A=process.argv.slice(2);const opt=(k,d)=>{const i=A.indexOf('--'+k);return i<0?d:(A[i+1]===undefined||A[i+1].startsWith('--')?true:A[i+1])};
const DEV=opt('device','fold'),CPU=+opt('cpu',4),REPS=+opt('reps',3),TOP=+opt('top',25);const ROOT=path.resolve(opt('root',path.join(__dirname,'../..')));
const ACTS=String(opt('acts','next,card,tab,idle,map')).split(',');
const sleep=t=>new Promise(r=>setTimeout(r,t));const {NEWLIFE,CLEAR,OPENACT}=require('./lib/playperf');
function agg(prof){const N={};for(const n of prof.nodes)N[n.id]=n;const dt={};const ts=prof.timeDeltas;for(let i=0;i<prof.samples.length;i++)dt[prof.samples[i]]=(dt[prof.samples[i]]||0)+(ts[i]||0)/1000;
 const parent={};for(const n of prof.nodes)for(const c of n.children||[])parent[c]=n.id;
 const key=n=>{const c=n.callFrame;return (c.functionName||'(anon)')+' @'+(c.url||'').split('/').pop().replace(/\?.*/,'?')+':'+(c.lineNumber+1)+':'+(c.columnNumber+1)};
 const self={},tot={};for(const id in dt){const n=N[id];const k=key(n);self[k]=(self[k]||0)+dt[id];const seen=new Set();let x=+id;while(x!=null){const kk=key(N[x]);if(!seen.has(kk)){seen.add(kk);tot[kk]=(tot[kk]||0)+dt[id]}x=parent[x]}}
 const all=Object.values(dt).reduce((a,b)=>a+b,0);const idle=Object.entries(self).filter(([k])=>/^\((idle|program|garbage collector)\)/.test(k));
 /* top-down tree, merged by key along the path, pruned below --min ms */
 const tree={k:'root',t:0,c:{}};for(const id in dt){const path=[];let x=+id;while(x!=null){path.push(key(N[x]));x=parent[x]}path.reverse();let nd=tree;nd.t+=dt[id];for(const k of path.slice(1)){nd=nd.c[k]=nd.c[k]||{k,t:0,c:{}};nd.t+=dt[id]}}
 return{tree,all,self:Object.entries(self).sort((a,b)=>b[1]-a[1]),tot:Object.entries(tot).sort((a,b)=>b[1]-a[1]),idle}}
(async()=>{const srv=await D.serveRoot(ROOT);const b=await chromium.launch({args:require('./lib/playperf').LAUNCH_ARGS});
 const ctx=await D.newDeviceContext(b,DEV,{serviceWorkers:'block'});await ctx.addInitScript(()=>{window.__bot={pre:1}});const p=await ctx.newPage();
 const cdp=await ctx.newCDPSession(p);const f=await D.openHost(p,srv.url,{timeout:300000});await sleep(1500);
 await f.evaluate(NEWLIFE);await sleep(2500);await f.evaluate(CLEAR);await cdp.send('Emulation.setCPUThrottlingRate',{rate:CPU});
 await cdp.send('Profiler.enable');await cdp.send('Profiler.setSamplingInterval',{interval:500});
 const tapEl=async fn=>{const h=await f.evaluateHandle(fn);const el=h.asElement();if(!el)return false;try{await el.click({timeout:15000});return true}catch(e){return false}};
 const DO={
  next:async()=>{await f.evaluate(CLEAR);await tapEl(()=>{const n=document.getElementById('next');return n&&!n.disabled?n:null});await sleep(3000);await f.evaluate(CLEAR)},
  card:async()=>{await f.evaluate(CLEAR);await f.evaluate(OPENACT);await sleep(800);await tapEl(()=>{const c=[...document.querySelectorAll('button.card.ka:not(:disabled):not(.kdis)')].filter(x=>x.offsetParent!==null&&x.getBoundingClientRect().bottom<innerHeight);return c[Math.floor(Math.random()*c.length)]||null});await sleep(2000);
   await tapEl(()=>{const m=document.getElementById('modal');if(!m||m.hidden)return null;return [...m.querySelectorAll('.opts button:not([disabled])')].filter(x=>x.offsetParent!==null)[0]||null});await sleep(1500);await f.evaluate(CLEAR)},
  tab:async()=>{for(const k of ['court','rel','inv','art','story','act'])await tapEl(new Function(`return [...document.querySelectorAll('#tabs [data-tab="${k}"]')].find(x=>x.offsetParent!==null)||null`));await sleep(800)},
  idle:async()=>{await sleep(5000)},
  soak:async()=>{const t0=Date.now();while(Date.now()-t0<+opt('soakms',60000)){await f.evaluate(require('./lib/playperf').STEP).catch(()=>{});await sleep(250)}},
  map:async()=>{await f.evaluate(CLEAR);await tapEl(()=>[...document.querySelectorAll('#tabs [data-tab="go"]')].find(x=>x.offsetParent!==null)||null);await sleep(2500);await f.evaluate(CLEAR)}};
 for(const a of ACTS){await cdp.send('Profiler.start');const t0=Date.now();for(let i=0;i<REPS;i++)await DO[a]();const {profile}=await cdp.send('Profiler.stop');const g=agg(profile);
  console.log(`\n=== ${a} x${REPS}  wall ${Date.now()-t0} ms  sampled ${Math.round(g.all)} ms  idle/program/gc ${g.idle.map(([k,v])=>k.split(' ')[0]+' '+Math.round(v)).join(', ')}`);
  if(A.includes('--tree')){const MINT=+opt('min',150);const pr=(nd,d)=>{for(const c of Object.values(nd.c).sort((a,b)=>b.t-a.t)){if(c.t<MINT)continue;/* collapse the long render wrapper chain */const chain=/^render @|^call @|^\(anon\) @\?:(35073|31419)/.test(c.k)&&Object.keys(c.c).length===1&&Object.values(c.c)[0].t>c.t*0.9;if(!chain)console.log(' '.repeat(d)+String(Math.round(c.t)).padStart(6)+' '+c.k);pr(c,chain?d:d+1)}};pr(g.tree,0)}
  console.log('-- self'),g.self.filter(([k])=>!/^\((idle|program)\)/.test(k)).slice(0,TOP).forEach(([k,v])=>console.log(String(Math.round(v)).padStart(7),k));
  console.log('-- total'),g.tot.filter(([k])=>!/^\((root|idle|program)\)/.test(k)).slice(0,TOP).forEach(([k,v])=>console.log(String(Math.round(v)).padStart(7),k))}
 await b.close();srv.close()})().catch(e=>{console.error(e);process.exit(2)});
