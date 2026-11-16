/* Parallel bot balance run: P pages in ONE browser, pictures/sound blocked, seeded Math.random per page (reproducible).
   usage: node dev/measure/run_par.js <root/<file>|url> <mode sens|rand> <lives total> <out.json> [inpage file=inpage6.js] [pages=4] [seed=1]
   Each page plays lives until the total is reached; out.json = all lives (an7.py format). Then: python3 dev/measure/an7.py out.json */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,URL,mode,target,OUT,INP,PG,SD]=process.argv;const P=+PG||4,seed0=+SD||1,T=+target;
const R=path.resolve(__dirname,'../..');
(async()=>{const b=await chromium.launch({args:['--js-flags=--max-old-space-size=1024']});const all={};let done=0;const t0=Date.now();
 const save=()=>fs.writeFileSync(OUT,JSON.stringify(Object.values(all).flat()));
 async function page(k,att){const seed=seed0+k*101+att*7001;const key=k+'_'+att;const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce',serviceWorkers:'block'});try{
  await ctx.addInitScript(([sd])=>{let s=sd*7919+12345;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},[seed]);
  await ctx.route(/\.(webp|png|jpe?g|mp3|ogg|m4a)(\?|$)/i,r=>r.abort());
  let U=URL;if(/^root\//.test(URL)){await ctx.route('http://ts.local/**',r=>{const u=decodeURIComponent(new globalThis.URL(r.request().url()).pathname);const f=R+u;if(!fs.existsSync(f))return r.fulfill({status:404,body:''});r.fulfill({status:200,contentType:/\.html$/.test(f)?'text/html; charset=utf-8':/\.json$/.test(f)?'application/json':'application/octet-stream',body:fs.readFileSync(f)})});U='http://ts.local/'+URL.slice(5)}
  const p=await ctx.newPage();p.setDefaultTimeout(0);p.on('pageerror',e=>console.error('PAGEERR',k,e.message.slice(0,160)));
  await p.goto(U,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function',null,{timeout:0});await p.waitForTimeout(1500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;const t=document.getElementById('title');if(t)t.hidden=true;try{store.set(NL_KEY,null)}catch(e){}start();try{NLP=null}catch(e){}});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:120000});
  await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());Q.length=0;render()});
  const IT=fs.readFileSync(path.join(__dirname,INP||'inpage6.js'),'utf8');await p.evaluate(IT);
  /* every bot dresses (inty.js) unless the INP file already has it (mkinp.sh) or NOTY=1 */
  if(!process.env.NOTY&&!IT.includes('__tyDress'))await p.evaluate(fs.readFileSync(path.join(__dirname,'inty.js'),'utf8'));
  let last=0;while(done<T){const n=await p.evaluate(([m])=>window.__bot.step(m,300),[mode]);
   if(n!==last){all[key]=await p.evaluate(()=>window.__res);done+=n-last;last=n;save();console.error(`page ${key} lives ${n} total ${done}/${T} ${Math.round((Date.now()-t0)/1000)}s`)}
   if(Date.now()-t0>4*3600e3)break}
  }finally{try{await ctx.close()}catch(e){}}}
 /* a crashed page (memory) is replaced by a fresh one with a new seed; its finished lives are kept */
 async function worker(k){for(let att=0;att<20&&done<T;att++){try{await page(k,att)}catch(e){console.error('PAGE FAIL',k,att,String(e.message).slice(0,200))}}}
 await Promise.all([...Array(P).keys()].map(k=>worker(k)));save();await b.close()})().catch(e=>{console.error(e);process.exit(1)});
