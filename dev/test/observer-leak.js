/* observer-leak (B FIXER coop-freeze-kmrew, 26/11): a page that runs ~1 h froze for good (co-op rooms G93J, Q4XY, KJ2Z, 9FVJ, DUMQ, UVVH, seed-56
   repro at buổi 61 twice): the renderer main thread stuck in native code with ~300 000 Blink nodes held OFF the page (only ~2 000 attached).
   Root (heap snapshot): jinv kitInvFit gave every rendered bag grid (.kinvg) its own ResizeObserver that ALSO observed the long-lived #panel →
   #panel kept the observer, the observer's callback kept the old grid (+ its items, pictures, listeners): one leaked grid per render.
   ONE RULE (jinv KINV_RO): an observer made for one rendered element observes only that element's own subtree; a size outside it (#panel) is
   watched by ONE shared observer made once. This test renders the bag tab N times and checks the Blink node count after a forced GC stays flat.
   usage: node dev/test/observer-leak.js [dev/index.html] [WxH] [N]   exit 1 on FAIL (bounded: N renders, every wait has a timeout) */
const {chromium}=require('playwright');const path=require('path');const [,,U0,VP,N0]=process.argv;const [W,H]=(VP||'755x1000').split('x').map(Number);const N=+N0||40;
const URL=/^(https?|file):/.test(U0||'')?U0:'file://'+path.resolve(U0||'dev/index.html');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitInvFit==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{localStorage.clear();document.getElementById('title').hidden=true;window.__nlInner=1;for(let k=0;k<400;k++){start();if(!(typeof isSrv==="function"&&isSrv())&&!S.out)break}});
 await p.waitForTimeout(3000);const cdp=await ctx.newCDPSession(p);
 const nodes=async()=>{await cdp.send('HeapProfiler.collectGarbage');await cdp.send('HeapProfiler.collectGarbage');return (await cdp.send('Memory.getDOMCounters')).nodes};
 const flip=async k=>{for(let i=0;i<k;i++){await p.evaluate(()=>{try{tab="inv";render()}catch(e){}});await p.waitForTimeout(60);await p.evaluate(()=>{try{tab="act";render()}catch(e){}});await p.waitForTimeout(60)}};
 await flip(3);const grids=await p.evaluate(()=>{tab="inv";render();return document.querySelectorAll('.kinv .kinvg').length});await p.waitForTimeout(300);
 const n0=await nodes();await flip(N);await p.waitForTimeout(500);const n1=await nodes();
 /* the refit still follows the panel: shrink #panel once, the bag refits (its row count is re-measured) */
 const refit=await p.evaluate(async()=>{tab="inv";render();await new Promise(r=>setTimeout(r,300));const P=document.getElementById('panel');let n=0;const f=window.kitInvFit;window.kitInvFit=function(){n++;return f.apply(this,arguments)};
  const h0=P.style.height;P.style.height=(P.clientHeight-120)+'px';await new Promise(r=>setTimeout(r,400));P.style.height=h0;await new Promise(r=>setTimeout(r,400));window.kitInvFit=f;return n});
 const per=(n1-n0)/N;const ok=grids>0&&per<60&&refit>0&&!errs.length;
 console.log(JSON.stringify({vp:VP||'755x1000',N,grids,nodesBefore:n0,nodesAfter:n1,leakedPerRender:Math.round(per),refitCalls:refit,errs:errs.slice(0,3)}));
 console.log(ok?'PASS':'FAIL');await b.close();process.exit(ok?0:1)})();
