/* review/ev-art-fit (owner 15/11 "Mấy cái ảnh minh họa không liên quan gì cả"): which picture EVERY event / dialog shows.
   1) opens every dialog builder it can reach in a fresh life (PEND, E68 events, T72 quests, festivals, feast invitations, news, j24 approaches,
      jts warnings), 2) lets the sensible bot (dev/measure/inpage4.js) play real lives with several seeds and records every dialog it meets.
   Per dialog: title, first sentence, id (kitDlgId), the picture file, its EVENTS.json group, caption, and how it was chosen
   (window.__evFitWhy from jevfit.js: own / fit:<rule> / kbk / placeholder).
   usage: node dev/test/ev-art-fit.js <build url> <out.json> [botSteps=8] [seeds=3]
   FAIL (exit 1) when a dialog shows the visitor picture (khach-den) while its fit rule is not a visit, or shows a placeholder. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,URL,OUT,ST,SD,PH]=process.argv;const N=+ST||8,SEEDS=+SD||3,PHASE=PH||'all';
const INP=fs.readFileSync(path.join(__dirname,'../measure/inpage4.js'),'utf8');
const LOCALEV=process.env.EVJSON?fs.readFileSync(process.env.EVJSON):null;/* EVJSON=img/EVENTS.json: test a manifest before it is on the CDN */
const routeEv=async ctx=>{if(LOCALEV)await ctx.route(/img\/EVENTS\.json/,r=>r.fulfill({status:200,contentType:'application/json',body:LOCALEV}))};
const HOOK=()=>{window.__dlg=window.__dlg||[];const P=s=>String(s||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
 const s0=showModal;showModal=function(){window.__evFitWhy="";const r=s0.apply(this,arguments);try{const m=Q[0];const M=document.getElementById('modal');if(m&&M&&!M.hidden){
   const img=M.querySelector('#mb .kdlgart .ksart > img, #mb .kpsubj .ksart > img, #mb .kpsubj img');const src=img?(img.getAttribute('src')||"").replace(/^.*?(?=img\/)/,"").split('?')[0]:"";
   const fr=M.querySelector('#mb .kdlgart .ksart, #mb .kpsubj .ksart');const cap=fr?P((fr.querySelector('figcaption,.ksart-chip')||{}).textContent||""):"";
   let grp="";try{for(const [k,c] of Object.entries(EVART.categories))if(c.files.includes(src)){grp=k;break}}catch(e){}
   const id=typeof kitDlgId==="function"?kitDlgId(m):(m.pid||"");
   window.__dlg.push({id,t:P(document.getElementById('mt')?document.getElementById('mt').textContent:m.t).slice(0,50),first:(P(m.h).split(/(?<=[.!?…”])\s/)[0]||"").slice(0,140),
    src,grp,cap,why:window.__evFitWhy||"",kind:(M.querySelector('.dlg.kpanel')||{dataset:{}}).dataset.kind||"",look:!!(m.kit&&m.kit.look),shop:!!(m.kit&&(m.kit.shop||m.kit.pick))})}}catch(e){}return r}};
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const all=[];const errs=[];
 /* ---- 1. builders ---- */
 if(PHASE!=='bot'){const ctx=await b.newContext({viewport:{width:1180,height:820},reducedMotion:'reduce',serviceWorkers:'block'});
  await routeEv(ctx);await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  await ctx.route(/\.(webp|png|jpg)(\?|$)/,r=>r.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==','base64')}));
  const p=await ctx.newPage();p.setDefaultTimeout(600000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(3000);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;document.querySelectorAll('.kroul,#kroul,#kroulw').forEach(e=>e.remove());render()});
  await p.waitForFunction(()=>typeof EVART!=='undefined'&&EVART&&typeof KIT_CDNHAVE!=='undefined'&&KIT_CDNHAVE,null,{timeout:60000}).catch(()=>{});
  await p.evaluate(HOOK);
  await p.evaluate(()=>{const close=()=>{Q.length=0;const M=document.getElementById('modal');M.hidden=true};const R=liveRivals(true);const v=R[0];
   for(const id of Object.keys(PEND)){for(const pp of [{v:v&&v.id},{}]){let d=null;try{d=PEND[id](Object.assign({},pp))}catch(e){d=null}if(!d||!(d.o||d.t))continue;close();try{pushDil(mkP(id,pp),id);showModal()}catch(e){}close();break}}
   try{for(const id of Object.keys(E68I||{})){close();try{e68Test(id)}catch(e){}close()}}catch(e){}
   try{for(const id of Object.keys(T72I||{})){close();try{q72Test(id,true)}catch(e){}close()}}catch(e){}
   try{for(const k of Object.keys(FV7||{})){for(let vi=0;vi<(FV7[k]||[]).length;vi++){close();try{j71Fest(k,vi)}catch(e){}close()}close();try{j71Day(k)}catch(e){}close()}}catch(e){}
   try{for(const kk of Object.keys(FX7||{})){close();try{j71FeastInvite(kk)}catch(e){}close()}}catch(e){}
   /* j24 approaches: many draws so every branch shows (a rival with high affection, one with danger, a servant…) */
   try{for(const r of R.slice(0,3)){r.rel=r.rel||{}}S.maid&&(S.maid.loyal=80);S.sung=70;S.th=40;
    for(let i=0;i<60;i++){close();try{const it=approachOne&&approachOne();if(it&&it.t&&!Q.length){Q.push(it);showModal()}else if(Q.length)showModal()}catch(e){}close()}}catch(e){}
  });
  all.push(...(await p.evaluate(()=>window.__dlg)).map(x=>Object.assign(x,{via:"builder"})));await ctx.close();console.error('builders',all.length);fs.writeFileSync(OUT+'.part',JSON.stringify(all))}
 /* ---- 2. bot lives ---- */
 for(let sd=0;sd<(PHASE==='builder'?0:SEEDS);sd++){const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
  await ctx.route(/\.(webp|png|jpg)(\?|$)/,r=>r.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==','base64')}));
  await routeEv(ctx);await ctx.addInitScript(sd=>{let s=4242+sd*977;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};window.__bot={pre:1}},sd);
  const p=await ctx.newPage();p.setDefaultTimeout(0);p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(4000);
  await p.waitForFunction(()=>typeof EVART!=='undefined'&&EVART&&typeof KIT_CDNHAVE!=='undefined'&&KIT_CDNHAVE,null,{timeout:60000}).catch(()=>{});
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;start()});await p.evaluate(HOOK);await p.evaluate(INP);
  await p.evaluate(()=>{const o=openMG;openMG=function(k,l,cb){try{cb(2)}catch(e){}};if(S&&S.mg)S.mg=null});
  for(let i=0;i<N;i++){console.error('seed',sd,'step',i);try{await p.evaluate(()=>{for(let j=0;j<10;j++){if(S&&S.mg){try{resumeMG()}catch(e){S.mg=null}}window.__bot.step('sens',30);if(S&&!S.dead&&!Q.length&&!S.mg){try{nextBuoi()}catch(e){}}}})}catch(e){errs.push(String(e).slice(0,160))}}
  all.push(...(await p.evaluate(()=>window.__dlg)).map(x=>Object.assign(x,{via:"bot"+sd})));await ctx.close();console.error('seed',sd,'dialogs',all.length);fs.writeFileSync(OUT+'.part',JSON.stringify(all))}
 await b.close();
 /* group by (title, picture group, why) */
 const M=new Map();for(const d of all){if(d.look||d.shop)continue;const k=[d.t,d.grp||d.src,d.why,d.kind].join("|");const e=M.get(k)||Object.assign({n:0},d);e.n++;M.set(k,e)}
 const rows=[...M.values()].sort((a,b)=>a.t.localeCompare(b.t));
 const ph=rows.filter(r=>/\/ph-(?:event|[lw]-)/.test(r.src)),vis=rows.filter(r=>r.grp==="khach-den"&&!/visit|gift|khach/.test(r.why));
 fs.writeFileSync(OUT,JSON.stringify({total:all.length,distinct:rows.length,placeholder:ph.length,visitorMismatch:vis.length,rows,errs:[...new Set(errs)].slice(0,10)},null,1));
 console.log(JSON.stringify({total:all.length,distinct:rows.length,placeholder:ph.length,visitorMismatch:vis.length,noPic:rows.filter(r=>!r.src).length,errs:[...new Set(errs)].slice(0,3)}));
 process.exit(ph.length||vis.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
