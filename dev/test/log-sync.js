/* log-sync audit runner: node dev/test/log-sync.js <url> [steps] [mode] [seed]
   Bots play (dev/measure/inpage4.js) with dev/test/log-sync-inpage.js checking after every action that replaying the
   Sổ ghi gives the header value for every stat. Prints every code path that changed a stat without a matching log line,
   mapped to dev/build/j*.js file:line. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,URL,NS,MODE,SEED]=process.argv;const N=+NS||10,mode=MODE||"sens",seed=+SEED||12345,CH=+process.env.CH||100;
const INP=fs.readFileSync(path.join(__dirname,'../measure/inpage4.js'),'utf8');
const AUD=fs.readFileSync(path.join(__dirname,'log-sync-inpage.js'),'utf8');
/* map index.html line -> dev/build file:line */
const html=fs.readFileSync(process.env.IDX||path.join(__dirname,'../index.html'),'utf8').split('\n');
const order=(fs.readFileSync(process.env.ASM||path.join(__dirname,'../build/assemble.py'),'utf8').match(/for f in \[([^\]]*)\]/)[1]).match(/'[^']+'/g).map(s=>s.slice(1,-1));
const first=fs.readFileSync(path.join(process.env.BLD||path.join(__dirname,'../build'),order[0]),'utf8').split('\n')[0];
const base=html.findIndex(l=>l===first);const spans=[];let ln=base+1;
for(const f of order){const n=fs.readFileSync(path.join(process.env.BLD||path.join(__dirname,'../build'),f),'utf8').split('\n').length-1;spans.push([ln,ln+n,f]);ln+=n}
function where(l){for(const [a,b,f] of spans)if(l>=a&&l<b)return f+':'+(l-a+1);return 'index.html:'+l}
const mapSt=s=>s.replace(/\(?https?:\/\/[^)\s]*\.html:(\d+):\d+\)?/g,(m,l)=>where(+l));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
 await ctx.addInitScript(sd=>{let s=sd;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};Date.now=(()=>{let d=1.7e12;return()=>d+=1000})();window.__bot={pre:1}},seed);
 const p=await ctx.newPage();p.setDefaultTimeout(0);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:0});await p.evaluate(()=>document.querySelectorAll('.kroul').forEach(e=>e.remove()));
 await p.evaluate(INP);
 await p.evaluate(()=>{const n0=nextBuoi;nextBuoi=function(){if(S&&S.mg){S.mg=null;try{if(typeof kg82Close==='function')kg82Close(true)}catch(e){}}return n0.apply(this,arguments)};for(const f of ['act','lesson','talk']){const o=window[f];if(typeof o!=='function')continue;window[f]=function(){const r=o.apply(this,arguments);if(S&&S.mg){S.mg=null;try{kg82Close(true)}catch(e){}const ov=document.getElementById('ov');if(ov)ov.hidden=true}return r}}});
 await p.evaluate(AUD);
 const t0=Date.now();for(let i=0;i<N;i++){await p.evaluate(([m,CH])=>window.__bot.step(m,CH),[mode,CH]);console.error("step",i+1,"x"+CH,Math.round((Date.now()-t0)/1000)+'s')}
 const A=await p.evaluate(()=>({bookK:__aud.bookK||{},book:__aud.book||0,bookC:__aud.bookC||0,noWhy:__aud.noWhy||0,noWhyEx:__aud.noWhyEx||[],drift:__aud.drift||0,driftEx:__aud.driftEx||[],checks:__aud.checks,lines:__aud.lines,mis:__aud.mis.length,stale:__aud.stale,paths:__aud.paths,turn:S&&S.turn,lives:__res.length}));
 await b.close();
 const P=Object.values(A.paths).map(x=>x).sort((a,b)=>b.n-a.n);
 const out={seed,mode,bookK:Object.entries(A.bookK).sort((a,b)=>b[1]-a[1]).slice(0,25),book:A.book,bookC:A.bookC,noWhy:A.noWhy,noWhyEx:A.noWhyEx,drift:A.drift,driftEx:A.driftEx,checks:A.checks,logLines:A.lines,misses:A.mis,lives:A.lives,stale:A.stale.length,errs:errs.slice(0,5),paths:Object.entries(A.paths).sort((a,b)=>b[1].n-a[1].n).map(([k,v])=>({path:mapSt(k),n:v.n,ex:v.ex.map(e=>Object.assign({},e))})),staleEx:A.stale.slice(0,40)};
 console.log(JSON.stringify(out,null,1))})().catch(e=>{console.error(e);process.exit(1)});
