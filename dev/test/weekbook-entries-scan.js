const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,OUT,NS,CHS]=process.argv;const N=+NS||4,CH=+CHS||14;
const INP=fs.readFileSync(__dirname+'/../measure/inpage4.js','utf8');
const RUNS=[[777,'cn'],[4242,'dtq'],[99,'tt'],[5,'muoi']];
(async()=>{const res=[];const b=await chromium.launch();
 for(const [seed,ori] of RUNS){const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'});
 await ctx.addInitScript(sd=>{let s=sd;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};Date.now=(()=>{let d=1.7e12;return()=>d+=1000})();window.__bot={pre:1}},seed);
 const p=await ctx.newPage();p.setDefaultTimeout(0);p.on('pageerror',e=>console.log('ERR',e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(o=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__forceOrigin=o;start()},ori);await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:0});await p.evaluate(()=>document.querySelectorAll('.kroul').forEach(e=>e.remove()));
 await p.evaluate(INP);await p.evaluate(()=>{const n0=nextBuoi;nextBuoi=function(){if(S&&S.mg){S.mg=null;try{kg82Close(true)}catch(e){}}return n0.apply(this,arguments)}});
 for(let i=0;i<N;i++){await p.evaluate(()=>{S.wkSnap=wkSnap()});await p.evaluate(([m,CH])=>window.__bot.step(m,CH),["sens",CH]);
  const r=await p.evaluate(()=>{try{const bp=wkBookPages();const txt=f=>(f||[]).map(x=>(typeof x==='string'?x:x.text)).map(h=>kpPlain(h));const out=[];
   for(const pg of bp.pages){if(pg.kind==='cover'||pg.kind==='end')continue;const facts=[];for(const bl of (pg.blocks||[])){if(bl.facts)facts.push(...txt(bl.facts))}
    const k=pg.kind==='person'?(pg.who===S.emp?'emp':(pg.who===S.thO||pg.who.kind==='th')?'th':(typeof rivals!=='undefined'&&rivals.includes(pg.who))?(pg.who.queen?'hh':'rv'):'sv'):'text';
    out.push({title:pg.title||(pg.who&&plain(kitName(pg.who))),kind:pg.kind,k,name:pg.who&&pg.who.name||'',rel:(pg.rel||[]).map(r=>({l:r.label,d:r.d,n:r.now})),facts})}return out}catch(e){return [{title:'EXC '+e.message,facts:[],rel:[],kind:'x'}]}});
  res.push({seed,ori,week:i,pages:r});}
 await ctx.close()}
 await b.close();fs.writeFileSync(OUT,JSON.stringify(res))})();
