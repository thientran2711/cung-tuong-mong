// staff-cap-table perf (MEASURE ONLY, owner OD 18/11 ~02:34Z / ~02:55Z / ~03:05Z: judge by the WORST CASE, every servant has a brain).
// usage: node dev/measure/staff-cap-table-perf.js [--tables A,B2,D1,D2,D3,LR,E] [--cons 12,16,20] [--buoi 8] [--cpu 4] [--out f.json]
// Built site (repo root index.html), Fold profile 755x1000@2, HOST mode, CPU throttled --cpu x (default 4).
// For each table x palace size: a new life, then the palace is FORCED to the worst rank mix the seats allow
//   (HH, HQP, QP, Phi x2, Tần x3 = the 8 chủ vị of OD 17/11 04:32Z; every other consort = Quý nhân, the low rank with the most servants;
//    she is one of the Phi; Thái hậu alive) and every household is filled to the table (faces ignored = the table's own worst case).
// Measured: buổi advance (nextBuoi + the agent loop flushed + render, ms per buổi, median / worst), room render ms, JS heap MB after GC,
//   DOM nodes, agent decide ms per consort (AG.last), co-op payloads: world JSON (ser rivals + staff, what the weekly world sync carries)
//   raw / gzip KB, toCanon ms. LIVE = table A at today's average palace (11 consorts, no forcing) for the baseline.
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),zlib=require('zlib');
const D=require('../test/lib/device');const PP=require('../test/lib/playperf');
const A=process.argv.slice(2);const opt=(k,d)=>{const i=A.indexOf('--'+k);return i<0?d:A[i+1]};
const T=require('./staff-cap-tables.js');
const TABLES=String(opt('tables','LIVE,A,B2,D1,D2,D3,LR,E')).split(','),CONS=String(opt('cons','12,16,20')).split(',').map(Number);
const NB=+opt('buoi',8),CPU=+opt('cpu',4),OUT=opt('out',null);
const sleep=t=>new Promise(r=>setTimeout(r,t));const L=(...a)=>console.error(new Date().toISOString().slice(11,19),...a);
const BUILD=([cap,capTh,N,force])=>{const out={};
 BAL.promo.cap=cap.map(r=>r.slice());BAL.promo.capTh=capTh.slice();
 if(force){const SEAT=[7,6,5,4,4,3,3,3];/* 7 = queen */const want=[];for(let i=0;i<N;i++)want.push(i<SEAT.length?SEAT[i]:2);
  S.out=0;S.rank=4;want.splice(want.indexOf(4),1);/* she takes one Phi seat */
  let L=rivals.filter(v=>v.alive!==false&&!v.coop);while(L.length<want.length){const v=newRival(2);try{Object.assign(v,drawFace())}catch(e){}rivals.push(v);L.push(v)}
  for(const v of L.slice(want.length)){v.alive=false}L=L.slice(0,want.length);
  L.forEach((v,i)=>{const r=want[i];v.out=false;if(r===7){v.queen=true;v.rank=6}else{v.queen=false;v.rank=r}});
  S.thDead=false;S.thO=S.thO||{}}
 const hh=[S].concat(rivals.filter(v=>v.alive!==false&&!v.coop));if(!S.thDead&&S.thO)hh.push(S.thO);
 let maids=0,eun=0;
 for(const p of hh){p.staff=(p.staff||[]).filter(s=>s.coop);const [cm,ce]=capOf(p);const close=(p===S||p===S.thO)?0:0;
  /* the personal maid (S.maid / v.maid) counts as one maid of the row: staff maids = cm-1 */
  for(let i=0;i<cm-1;i++)p.staff.push(mkServ("maid"));for(let i=0;i<ce;i++)p.staff.push(mkServ("eunuch"));maids+=cm;eun+=ce}
 out.cons=hh.length-((!S.thDead&&S.thO)?1:0);out.th=!S.thDead;out.maids=maids;out.eun=eun;out.total=maids+eun;
 try{palFix()}catch(e){}try{if(typeof j95sync==="function")j95sync()}catch(e){out.err="j95sync "+e}
 try{render()}catch(e){out.err=(out.err||"")+" render "+e}
 if(!window.__decW){window.__decW=1;window.__dec=[];const d0=agDecide;agDecide=function(v){const t=performance.now();try{return d0.apply(this,arguments)}finally{window.__dec.push(performance.now()-t)}}}
 return out};
const STEPB=()=>{try{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true}catch(e){}
 window.__dec=[];const t0=performance.now();nextBuoi();try{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true}catch(e){}
 try{render()}catch(e){}const t1=performance.now();try{if(typeof agFlush==="function")agFlush()}catch(e){}const t2=performance.now();
 const d=window.__dec.slice();
 return{tick:t1-t0,ag:t2-t1,all:t2-t0,dec:d,agMs:window.__agMs||0,agN:window.__agN||0,dead:!!S.dead}};
const RENDER=()=>{const r=[];for(let i=0;i<5;i++){const t=performance.now();render();r.push(performance.now()-t)}r.sort((a,b)=>a-b);return r[2]};
const PAY=()=>{const o={};let t=performance.now();const sr=ser();o.serMs=performance.now()-t;
 const world={R:sr.rivals||rivals,th:sr.thO||S.thO};o.world=JSON.stringify(world);o.save=JSON.stringify(sr).length;
 o.staffN=rivals.reduce((a,v)=>a+(v.alive===false?0:(v.staff||[]).length),0)+(S.staff||[]).length+((S.thO&&S.thO.staff)||[]).length;
 try{if(typeof toCanon==="function"){t=performance.now();const c=toCanon();o.canonMs=performance.now()-t;o.canon=JSON.stringify(c).length}}catch(e){o.canonErr=String(e).slice(0,80)}
 return o};
(async()=>{const srv=await D.serveRoot(path.resolve(__dirname,'../..'));const b=await chromium.launch({args:PP.LAUNCH_ARGS});const R=[];
 const runs=[];for(const t of TABLES){if(t==='LIVE')runs.push({t,N:0,force:0});else for(const N of CONS)runs.push({t,N,force:1})}
 for(const run of runs){const tb=T[run.t==='LIVE'?'A':run.t];L('run',run.t,run.N);
  const ctx=await D.newDeviceContext(b,'fold',{serviceWorkers:'block'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
  const cdp=await ctx.newCDPSession(p);const f=await D.openHost(p,srv.url,{timeout:300000});await sleep(1500);
  await PP.newLife(f);await sleep(1500);await f.evaluate(PP.CLEAR);
  const built=await f.evaluate(BUILD,[tb.cap,tb.capTh,run.N,run.force]);await f.evaluate(PP.CLEAR);
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:CPU});await sleep(500);
  const st=[];for(let i=0;i<NB;i++){const s=await f.evaluate(STEPB).catch(e=>({err:String(e).slice(0,100)}));st.push(s);await sleep(150);if(s.dead)break}
  const rend=await f.evaluate(RENDER).catch(()=>-1);
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});
  await cdp.send('HeapProfiler.enable');await cdp.send('HeapProfiler.collectGarbage');const hu=await cdp.send('Runtime.getHeapUsage').catch(()=>({usedSize:0}));
  const dom=await f.evaluate(()=>document.getElementsByTagName('*').length);
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:CPU});const pay=await f.evaluate(PAY).catch(e=>({err:String(e).slice(0,100)}));await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});
  const gz=pay.world?zlib.gzipSync(pay.world).length:0;const raw=pay.world?pay.world.length:0;delete pay.world;
  const ok=st.filter(s=>s.tick!=null);const srt=a=>a.slice().sort((x,y)=>x-y);const med=a=>{a=srt(a);return a.length?a[a.length>>1]:0};
  const dec=[].concat(...ok.map(s=>s.dec||[]));
  const r={table:run.t,N:run.N,built,buoi:ok.length,tickMed:med(ok.map(s=>s.tick)),tickMax:Math.max(0,...ok.map(s=>s.tick)),allMed:med(ok.map(s=>s.all)),allMax:Math.max(0,...ok.map(s=>s.all)),agMed:med(ok.map(s=>s.ag)),
   renderMed:rend,heapMB:+(hu.usedSize/1048576).toFixed(1),dom,decN:dec.length,decMean:dec.length?dec.reduce((a,x)=>a+x,0)/dec.length:0,decP95:dec.length?srt(dec)[Math.floor(dec.length*.95)]:0,
   agN:ok.length?ok[ok.length-1].agN:0,worldKB:+(raw/1024).toFixed(1),worldGzKB:+(gz/1024).toFixed(1),pay,errs:errs.slice(0,3)};
  L(JSON.stringify(r));R.push(r);await ctx.close()}
 if(OUT)fs.writeFileSync(OUT,JSON.stringify(R,null,1));await b.close();srv.close()})().catch(e=>{console.error(e);process.exit(1)});
