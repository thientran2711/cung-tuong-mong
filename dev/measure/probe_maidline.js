// usage: GAME=<page url> MLOFF=0|1 node dev/measure/probe_maidline.js [lives]   (review/servant-system: NPC maid line headcount)
// Bots (inpage6 "sens") play whole lives; every month the palace is counted: consorts alive, servants, maids, maids seeking; window.__mlN counts
// eye tries/hits, rises, seek/punish/use, feuds and hits. MLOFF=1 runs the old rule (srk>=2 at 1.2 %, no seeking / feuds / hits).
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const M=__dirname,N=+process.argv[2]||4;
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(Object.assign({args:['--disable-dev-shm-usage','--blink-settings=imagesEnabled=false']},px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{}));
 const page=await (await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block',ignoreHTTPSErrors:true})).newPage();
 await page.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));const errs=[];page.on('pageerror',e=>errs.push(e.message.slice(0,200)));page.setDefaultTimeout(600000);
 await page.goto(process.env.GAME,{waitUntil:'domcontentloaded',timeout:240000});await page.waitForTimeout(3000);
 await page.evaluate(()=>{try{localStorage.clear()}catch(e){}});await page.reload({waitUntil:'domcontentloaded'});await page.waitForTimeout(3000);
 await page.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b)b.click()});await page.waitForTimeout(1500);
 await page.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await page.waitForTimeout(800);
 await page.evaluate(`window.__mloff=${process.env.MLOFF==='1'?1:0};window.__origO="thd";window.__hhStop=1`);
 await page.evaluate(fs.readFileSync(path.join(M,'inpage6.js'),'utf8'));
 await page.evaluate(()=>{window.__hc=[];const m0=servMonth;servMonth=function(){const r=m0.apply(this,arguments);try{const L=allServ();window.__hc.push({t:S.turn,nr:liveRivals(true).length,ns:L.length,nm:L.filter(s=>s.role==="maid").length,seek:L.filter(s=>s.seek).length,mine:(S.staff||[]).length,cap:(()=>{try{return roomFor("consort")?1:0}catch(e){return -1}})()})}catch(e){}return r}});
 const t0=Date.now();for(let it=0;it<2000;it++){const n=await page.evaluate(()=>window.__bot.step("sens",60));if(n>=N||Date.now()-t0>1500e3)break}
 const out=await page.evaluate(()=>({hc:window.__hc,ml:window.__mlN,lives:window.__res.length}));const H=out.hc;const avg=k=>H.length?+(H.reduce((a,x)=>a+x[k],0)/H.length).toFixed(2):0;
 console.log(JSON.stringify({mloff:process.env.MLOFF==='1',lives:out.lives,months:H.length,avg:{consorts:avg('nr'),servants:avg('ns'),maids:avg('nm'),seeking:avg('seek'),hers:avg('mine'),consortSlotFree:avg('cap')},
  maxConsorts:Math.max(0,...H.map(x=>x.nr)),ml:out.ml,perYear:H.length?Object.fromEntries(Object.entries(out.ml).filter(([k])=>!/eyeP/.test(k)).map(([k,v])=>[k,+(v/H.length*12).toFixed(2)])):{},errs:errs.slice(0,5)}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
