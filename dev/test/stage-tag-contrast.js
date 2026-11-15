/* plain stage tags (no halo, owner 48.1e): contrast of each tag line's colour against the painting under it, every place x buổi.
   usage: node dev/test/stage-tag-contrast.js <url> <outdir> ; python3 dev/test/stage-tag-contrast.py <outdir>/contrast.json  → writes <outdir>/contrast.json + per-shot pngs (tags hidden) for python to sample */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1180,height:820},deviceScaleFactor:1,serviceWorkers:'block',reducedMotion:'reduce'});const p=await ctx.newPage();p.setDefaultTimeout(180000);
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:90000});await p.addStyleTag({content:'#kroul,#kroulw,.kroul{display:none!important} .rvhide #stage .tag{visibility:hidden!important}'});
 const PL=await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;return ['home',...places().map(x=>x.k)].slice(0,14)});
 const res=[];let n=0;
 for(const k of PL)for(const bu of [0,3]){
  const info=await p.evaluate(([k,bu])=>{try{S.place=k;S.buoi=bu;Q.length=0;document.getElementById('modal').hidden=true;render()}catch(e){return{err:e.message}}
   return true},[k,bu]);
  await p.waitForFunction(()=>{const L=[...document.querySelectorAll('#stage img')];return L.length&&L.every(i=>i.complete)},null,{timeout:20000}).catch(()=>{});await p.waitForTimeout(1200);
  const tags=await p.evaluate(()=>[...document.querySelectorAll('#stage .tag')].filter(g=>g.offsetParent||g.getClientRects().length).flatMap(g=>[...g.querySelectorAll('.j59t,.j59n')].map(e=>{const r=e.getBoundingClientRect();const cs=getComputedStyle(e);
    const c=document.createElement('canvas').getContext('2d');c.fillStyle=cs.color;c.fillRect(0,0,1,1);const d=c.getImageData(0,0,1,1).data;
    return{mine:g.classList.contains('j59mine'),line:e.classList.contains('j59t')?'rank':'name',txt:e.textContent,x:r.left,y:r.top,w:r.width,h:r.height,rgb:[d[0],d[1],d[2]],ts:cs.textShadow!=='none'}})).filter(t=>t.w>0));
  await p.evaluate(()=>document.documentElement.classList.add('rvhide'));const f=`${OUT}/c${n}.png`;await p.screenshot({path:f});await p.evaluate(()=>document.documentElement.classList.remove('rvhide'));
  await p.screenshot({path:`${OUT}/v${n}.jpg`,type:'jpeg',quality:55});
  res.push({k,bu,f,tags});n++}
 fs.writeFileSync(`${OUT}/contrast.json`,JSON.stringify({res,errs},null,1));console.log(JSON.stringify({n,errs}));await b.close()})().catch(e=>{console.error(e);process.exit(2)});
