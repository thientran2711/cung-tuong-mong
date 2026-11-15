/* First-load timing (cold profile, no service worker yet): page load, title pictures, then a new life's first screen pictures.
   usage: node dev/test/cdn-timing.js <url> <W>x<H>@dpr   → JSON {loadMs, titleMs, gameMs, pics:{n, kb, hosts}} */
const {chromium}=require('playwright');
const [,,URL_,SZ]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(180000);const done=()=>p.waitForFunction(()=>[...document.images].filter(i=>i.offsetParent).every(i=>i.complete),null,{timeout:120000}).catch(()=>{});
 const t0=Date.now();await p.goto(URL_,{waitUntil:'load'});const loadMs=Date.now()-t0;await done();const titleMs=Date.now()-t0;
 const t1=Date.now();await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()});
 await p.waitForTimeout(500);await done();await p.waitForLoadState('networkidle',{timeout:60000}).catch(()=>{});const gameMs=Date.now()-t1;
 const pics=await p.evaluate(()=>{const E=performance.getEntriesByType('resource').filter(e=>/\/img\//.test(e.name));const hosts={};E.forEach(e=>{const h=new URL(e.name).host;hosts[h]=(hosts[h]||0)+1});
  const d=E.map(e=>e.duration).sort((a,b)=>a-b);return{n:E.length,kb:Math.round(E.reduce((a,e)=>a+(e.transferSize||0),0)/1024),medianMs:Math.round(d[d.length>>1]||0),p90Ms:Math.round(d[Math.floor(d.length*.9)]||0),hosts}});
 console.log(JSON.stringify({url:URL_,size:SZ,loadMs,titleMs,gameMs,pics}));await b.close()})();
