/* tinbao-words BOT (owner OD 25/11 ~23:36Z «tùm lum chữ lặp tới lặp lui»; law 11 whole group): plays bot lives on a BUILT root and collects every
   news line she can read — the kitNotice list (Tin báo: text + items), the RENDERED Tin báo rows (after the kit name pass kitRankNamePaint),
   the Sổ ghi log lines — plus forced runs of the family the owner shot: «Nghe ngóng chung» (sent and landed), Tai mắt nghe lén, the closing alert.
   Every line is checked with the pattern set of scan.js (BAD). Writes <out>.json {lines:[{src,t,bad:[…]}], n, badN}.
   usage: node dev/test/tinbao-words/bot.js <builtRootDir> <out.json> [lives=2] [seed=1] [steps=900]   (exit 0; the table is made by table.py) */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const D=require('../lib/device');
const BAD=require('./patterns.js');
const [,,ROOT,OUT,NL,SEED,STEPS]=process.argv;const LIVES=+NL||2,seed=+SEED||1,STEP=+STEPS||900;
const INP=fs.readFileSync(path.join(__dirname,'..','..','measure','inpage4.js'),'utf8');
(async()=>{const srv=await D.serveRoot(ROOT);const b=await chromium.launch({args:['--js-flags=--max-old-space-size=1500']});
 const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'});
 await ctx.addInitScript(([sd])=>{let s=sd*7919+12345;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},[seed]);
 await ctx.route(/\.(webp|png|jpe?g|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());
 const p=await ctx.newPage();p.setDefaultTimeout(0);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(srv.url+'/dev/index.html',{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 const newLife=async()=>{await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let j=0;j<30;j++){try{store.set(NL_KEY,null)}catch(e){}try{start()}catch(e){}if(!(typeof isSrv==='function'&&isSrv()))break}});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.origin,null,{timeout:120000});await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove())})};
 await newLife();await p.evaluate(INP);
 await p.evaluate(()=>{window.__TB={seen:new Set(),L:[]};const add=(src,t)=>{t=String(t==null?'':t).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();if(!t)return;const k=src+'|'+t;if(window.__TB.seen.has(k))return;window.__TB.seen.add(k);window.__TB.L.push({src,t})};window.__tbAdd=add;
  window.__tbHarvest=function(){try{for(const x of (window.NT&&NT.list)||[]){if(x.items&&x.items.length)x.items.forEach(t=>add('notice-item',t));else add('notice',x.text)}}catch(e){}
   try{for(const l of (S.logs||[]).slice(0,30))add('log',typeof plain==='function'?plain(l):l)}catch(e){}};
  /* the RENDERED Tin báo (after every DOM pass: kitRankNamePaint, VP, kitNoUnkDom) */
  window.__tbRender=function(){try{if(!(window.NT&&NT.list.length))return;if(typeof Q!=='undefined'&&Q.length)return;const m=kitNoticeOpen();if(!m)return;
    try{if(typeof kitRankNamePaint==='function')kitRankNamePaint(document.getElementById('modal'))}catch(e){}
    document.querySelectorAll('#modal .kntl li').forEach(li=>add('tinbao-render',li.innerText));
    document.querySelectorAll('#modal .opts > button').forEach(bt=>{const tx=bt.innerText.replace(/\s+/g,' ').trim();if(/TỐN\s*không|Tốn\s*không/i.test(tx)&&/ĐƯỢC\s*không|Được\s*không/i.test(tx))add('tinbao-card',tx)});
    Q.length=0;document.getElementById('modal').hidden=true;try{render()}catch(e){}}catch(e){add('err','render '+e.message)}};
  /* forced family runs: what the owner's shot showed (the sent maid's «Nghe ngóng chung», Tai mắt nghe lén, the closing alert) */
  window.__tbForce=function(){try{const m=S.maid;if(m&&typeof spyNews==='function')add('force-spyNews',spyNews(m));}catch(e){add('err','spyNews '+e.message)}
   try{const m=S.maid;if(m&&typeof spyListen==='function'){const r=spyListen(m);add('force-spyListen',r)}}catch(e){}
   try{const v=liveRivals(true)[0];if(v&&typeof noteAdd==='function'){noteAdd(v.id,`nghe lén được nàng ta rủ người cùng chơi, vì muốn có thêm người thân cận`);if(typeof kitKnowFlush==='function')kitKnowFlush()}}catch(e){}
   try{if(typeof stClose==='function'){const c=stClose();if(c)add('force-close',JSON.stringify(c))}}catch(e){}};
 });
 for(let life=0;life<LIVES;life++){if(life)await newLife();
  for(let i=0;i<STEP;i+=20){const st=await p.evaluate(()=>{for(let j=0;j<20;j++){try{window.__bot.step('sens',1)}catch(e){}if(S&&(S.dead||S.out))return'end'}return'run'});
   await p.evaluate(()=>{__tbHarvest();if(Math.random()<.35)__tbForce();__tbHarvest();__tbRender()});if(st==='end')break}
  /* the errand path for certain: send her maid to «Nghe ngóng chung», jump to the return, read the report */
  await p.evaluate(()=>{try{Q.length=0;if(typeof ptListen==='function'&&S.maid){ptListen(S.maid);if(typeof ptWait==='function')ptWait();if(typeof ptTick==='function')ptTick()}}catch(e){__tbAdd('err','ptListen '+e.message)}__tbHarvest();__tbRender()})}
 const L=await p.evaluate(()=>window.__TB.L);
 for(const x of L){x.bad=BAD.check(x.t)}const badN=L.filter(x=>x.bad.length).length;
 fs.writeFileSync(OUT,JSON.stringify({root:ROOT,seed,lives:LIVES,n:L.length,badN,errs:errs.slice(0,20),lines:L},null,1));
 console.log(`tinbao-words bot: ${L.length} lines · ${badN} with a bad pattern · page errors ${errs.length}`);await b.close();srv.close()})().catch(e=>{console.error(e);process.exit(2)});
