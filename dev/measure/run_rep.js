/* REPRODUCIBLE parallel bot run (danh-p1; same CLI as run_par.js): P pages in ONE browser, pictures/sound blocked.
   Same build + same seed + same pages ⇒ the same lives, byte for byte (checked: dev/handover/reports/danh-p1.md).
   What run_par.js lacked: (1) vclock.js — every game timer / Date / performance.now on a virtual clock pumped by the bot
   (inpage6 step), crypto seeded, stream re-seeded at start(); (2) each page plays its OWN quota of lives (ceil(T/P)), not a shared
   race to T; (3) every request outside the local root is served from one disk cache (dev/../tmp/repcache), never live timing;
   (4) out.json lists pages in fixed order. Pages k get seed seed+k*101 (+att*7001 for a crashed page's replacement).
   usage: node dev/measure/run_rep.js <root/<file>|url> <mode sens|rand> <lives total> <out.json> [inpage file=inpage6.js] [pages=4] [seed=1]
   Each page plays lives until the total is reached; out.json = all lives (an7.py format). Then: python3 dev/measure/an7.py out.json */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,URL,mode,target,OUT,INP,PG,SD]=process.argv;const P=+PG||4,seed0=+SD||1,T=+target,QU=Math.ceil(T/P);
const crypto=require('crypto');const VC=fs.readFileSync(path.join(__dirname,'vclock.js'),'utf8');
const R=path.resolve(__dirname,'../..');
(async()=>{const b=await chromium.launch({args:['--js-flags=--max-old-space-size=1024']});const all={};let done=0;const t0=Date.now();
 const save=()=>fs.writeFileSync(OUT,JSON.stringify(Object.keys(all).sort((a,b)=>{const[x,y]=a.split('_').map(Number),[u,v]=b.split('_').map(Number);return x-u||y-v}).map(k=>all[k]).flat()));
 const CD=path.join(R,'..','tmp','repcache');fs.mkdirSync(CD,{recursive:true});const mine={};
 async function page(k,att){const seed=seed0+k*101+att*7001;const key=k+'_'+att;const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce',serviceWorkers:'block'});try{
  await ctx.addInitScript({content:'var __SEED__='+seed+';\n'+VC});
  await ctx.route(/\.(webp|png|jpe?g|mp3|ogg|m4a)(\?|$)/i,r=>r.abort());
  await ctx.route(u=>!/^http:\/\/ts\.local\//.test(String(u)),async r=>{const u=r.request().url();if(/\.(webp|png|jpe?g|mp3|ogg|m4a)(\?|$)/i.test(u))return r.abort();
   const f=path.join(CD,crypto.createHash('sha1').update(u).digest('hex'));
   if(!fs.existsSync(f)){try{const x=await r.fetch();const b=await x.body();fs.writeFileSync(f+'.tmp',JSON.stringify({s:x.status(),t:x.headers()['content-type']||'',b:b.toString('base64')}));fs.renameSync(f+'.tmp',f)}catch(e){fs.writeFileSync(f,JSON.stringify({s:404,t:'',b:''}))}}
   const c=JSON.parse(fs.readFileSync(f,'utf8'));return r.fulfill({status:c.s,contentType:c.t,body:Buffer.from(c.b,'base64')})});
  let U=URL;if(/^root\//.test(URL)){await ctx.route('http://ts.local/**',r=>{const u=decodeURIComponent(new globalThis.URL(r.request().url()).pathname);const f=R+u;if(!fs.existsSync(f))return r.fulfill({status:404,body:''});r.fulfill({status:200,contentType:/\.html$/.test(f)?'text/html; charset=utf-8':/\.json$/.test(f)?'application/json':'application/octet-stream',body:fs.readFileSync(f)})});U='http://ts.local/'+URL.slice(5)}
  const p=await ctx.newPage();p.setDefaultTimeout(0);if(process.env.DBG)p.on('console',m=>console.error('CON',k,m.text().slice(0,160)));const st=s=>process.env.DBG&&console.error('STEP',k,s,Math.round((Date.now()-t0)/1000));p.on('pageerror',e=>console.error('PAGEERR',k,e.message.slice(0,160)));
  st('goto');await p.goto(U,{waitUntil:'domcontentloaded',timeout:0});st('loaded');await p.waitForFunction(()=>typeof start==='function',null,{timeout:0});await p.waitForTimeout(1500);
  st('wait');{const tq=Date.now();while(Date.now()-tq<15000&&await p.evaluate(()=>window.__vtPending()))await p.waitForTimeout(250)}
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;const t=document.getElementById('title');if(t)t.hidden=true;try{store.set(NL_KEY,null)}catch(e){}window.__vtOn(window.__SEED__);start();try{NLP=null}catch(e){}});
  await p.evaluate(()=>{for(let i=0;i<4000&&!(typeof S!=='undefined'&&S&&S.name);i++)window.__vtPump(10)});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:120000});
  await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());Q.length=0;render()});
  st('started');const IT=fs.readFileSync(path.resolve(__dirname,INP||'inpage6.js'),'utf8');await p.evaluate(IT);
  /* every bot dresses (inty.js) unless the INP file already has it (mkinp.sh) or NOTY=1 */
  if(!process.env.NOTY&&!IT.includes('__tyDress'))await p.evaluate(fs.readFileSync(path.join(__dirname,'inty.js'),'utf8'));
  const base=mine[k]||0;let last=0;while(base+last<QU){const n=await p.evaluate(([m])=>window.__bot.step(m,300),[mode]);
   if(n!==last){const L=(await p.evaluate(()=>window.__res)).slice(0,QU-base);all[key]=L;done+=L.length-last;last=L.length;mine[k]=base+last;save();console.error(`page ${key} lives ${n} total ${done}/${P*QU} ${Math.round((Date.now()-t0)/1000)}s`)}
   if(Date.now()-t0>4*3600e3)break}
  }finally{try{await ctx.close()}catch(e){}}}
 /* a crashed page (memory) is replaced by a fresh one with a new seed; its finished lives are kept */
 async function worker(k){for(let att=0;att<20&&(mine[k]||0)<QU;att++){try{await page(k,att)}catch(e){console.error('PAGE FAIL',k,att,String(e.message).slice(0,200))}}}
 await Promise.all([...Array(P).keys()].map(k=>worker(k)));save();await b.close()})().catch(e=>{console.error(e);process.exit(1)});
