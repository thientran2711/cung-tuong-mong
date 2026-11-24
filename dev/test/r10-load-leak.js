/* robot-fix-cnv F4: does a load (deser) keep the previous game alive? Load a save in a real page, then N times: keep a WeakRef to the old S and to
   the old rivals[0], deser(ser()) in place, force GC (CDP). Prints heap after GC and how many OLD S graphs are still reachable (should be 0-1).
   usage: node dev/test/r10-load-leak.js <save.json> [N]   exit 1 = old games stay reachable (a load leaks the previous state) */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs');
const [F,N]=process.argv.slice(2);
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce'});await serve(ctx);
 await ctx.route(/\.(webp|png|jpe?g|gif|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
 await ctx.addInitScript(t=>{try{localStorage.setItem('hclh-save-v2-1',t)}catch(e){}},fs.readFileSync(F,'utf8'));
 const p=await ctx.newPage();await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof deser==='function'&&document.querySelector('#modal.kpthome'),null,{timeout:90000});
 await p.evaluate(()=>{$("title").hidden=false;showTitle();document.querySelector('#slots [data-load="1"]').click();window.__W=[]});
 const cdp=await ctx.newCDPSession(p);await cdp.send('Performance.enable');const gc=()=>cdp.send('HeapProfiler.collectGarbage');
 const heap=async()=>{await gc();await gc();const m=(await cdp.send('Performance.getMetrics')).metrics;return Math.round((m.find(x=>x.name==='JSHeapUsedSize')||{}).value/1048576)};
 const n=+N||40;const h0=await heap();
 for(let i=0;i<n;i++)await p.evaluate(()=>{window.__W.push([new WeakRef(S),new WeakRef(rivals[0])]);const s=JSON.stringify(ser());quiet=true;deser(JSON.parse(s));quiet=false;try{render()}catch(e){}});
 const h1=await heap();const alive=await p.evaluate(()=>({S:window.__W.filter(w=>w[0].deref()).length,R:window.__W.filter(w=>w[1].deref()).length}));
 console.log(`${F.split('/').pop()}: ${n} loads · heap after GC ${h0} → ${h1} MB (${((h1-h0)/n).toFixed(2)} MB per load) · old S still reachable ${alive.S}/${n} · old rivals[0] reachable ${alive.R}/${n}`);
 await b.close();process.exit(alive.S>1?1:0)})();
