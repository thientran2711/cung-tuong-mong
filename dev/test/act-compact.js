/* review/kit-fig2: KIT 43 kitActCompact — act cards inside a person card's right pane (Hậu cung › Thánh thượng "Việc hôm nay").
   usage: node dev/test/act-compact.js <build url> <outdir> <tag> [WxH@dpr,...]
   Injects two Emperor acts into today's deck (one locked to the evening so it shows "Buổi tối (đang …)"), opens the Thánh thượng card and
   measures every act card in the pane: thumbnail PORTRAIT 3:4 (72x96 or 84x112 px, ratio field ~0.75; was a square before review/actcard-small), text column ≥ 60 % of the card, title + odds on one line, description one
   line, every value chip on one line (no chip split), cards stacked (one per row). */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,TAG,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const R=[];
 for(const sz of (SIZES||"755x1000@2,1000x755@2,1180x820@2,844x390@3,1366x1024@2").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function');await sleep(2500);
  await p.addStyleTag({content:'#kroul{display:none!important}'});
  const inj=await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;
   for(let i=0;i<400;i++){start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;
   const base=(deck||[]).find(a=>a&&!a.done&&a.c)||(deck||[])[0];if(!base)return 'no deck';
   deck.push(Object.assign({},base,{n:"Tranh sủng",x:"Tối nay thẻ bài của một phi tần được lật. Sai cung nữ giả cớ ngươi đau tim, mời Hoàng thượng sang.",b:3,done:false,lock:false}));
   deck.push(Object.assign({},base,{n:"Dâng canh lên ngự thư phòng",x:"Tự tay nấu canh, mang tới ngự thư phòng dâng Hoàng thượng.",done:false,lock:false}));
   tab='court';PG.court=0;render();return deck.length});
  await sleep(1500);await p.evaluate(()=>Promise.all([...document.querySelectorAll('#panel img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,6000)}))));
  const measF=()=>p.evaluate(()=>{const P=document.getElementById('panel');const R=e=>e.getBoundingClientRect();const lh=e=>parseFloat(getComputedStyle(e).lineHeight)||parseFloat(getComputedStyle(e).fontSize)*1.3;
   const pane=P.querySelector('.pc>.pcr');const cards=[...P.querySelectorAll('.pc>.pcr button.ka.kart')].filter(c=>c.offsetParent);
   const rows=cards.map(c=>{const cr=R(c),a=R(c.querySelector('.kaart')),bd=R(c.querySelector('.kabody'));const kat=c.querySelector('.kat'),kan=c.querySelector('.kan'),od=[...kat.children].find(x=>x!==kan);
    const lead=c.querySelector('.klead');const chips=[...c.querySelectorAll('small.kb>.kr>.krv>*:not(.ksep)')].filter(x=>x.offsetParent);
    return{title:kan.textContent.trim().slice(0,30),cardW:Math.round(cr.width),thumb:[Math.round(a.width),Math.round(a.height)],ratio:+(a.width/a.height).toFixed(2),textShare:+(bd.width/cr.width).toFixed(2),
     oddsSameLine:od?Math.abs(R(od).top-R(kan).top)<=4:true,leadOneLine:lead?R(lead).height<=lh(lead)*1.3:true,
     chipsSplit:chips.filter(x=>R(x).height>lh(x)*1.5&&R(x).width<R(x.parentElement).width*.9).map(x=>x.textContent.trim().slice(0,24)),left:Math.round(cr.left)}});
   const lefts=[...new Set(rows.map(r=>r.left))];
   return{pane:pane?Math.round(R(pane).width):0,n:rows.length,stacked:lefts.length<=1,noPic:[...P.querySelectorAll('.pc>.pcr button.ka:not(.kanoart)')].filter(c=>c.offsetParent&&!c.querySelector('.kaart img')).length,noArtFull:[...P.querySelectorAll('.pc>.pcr button.ka.kanoart')].filter(c=>c.offsetParent).length,rows,hovf:document.documentElement.scrollWidth>innerWidth+1}});
  const m=await measF();
  const card=await p.$('#panel .pc');if(card){await card.scrollIntoViewIfNeeded().catch(()=>{})}
  const first=await p.$('#panel .pc>.pcr button.ka.kart');if(first)await first.scrollIntoViewIfNeeded().catch(()=>{});await sleep(300);
  for(let t=0;t<3;t++){try{await p.screenshot({path:`${OUT}/act-${TAG}-${wh}.jpg`,type:'jpeg',quality:72,timeout:120000});break}catch(e){await sleep(2000)}}
  /* Phi tần person card: the acts with another consort (Gặp mặt / Giao thiệp / Hại nhỏ …) — thumbnails, compact; and the act names with no own picture */
  const miss=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));tab='rv';const out={};kn();
   for(let i=0;i<Math.min(rivals.length,4);i++){PG.rv=i;S.met[rivals[i].id]=1;render();await W(150);
    const tabsB=[...document.querySelectorAll('#panel .pc .pctabs .pct')];for(let t=0;t<Math.max(1,tabsB.length);t++){const tb=[...document.querySelectorAll('#panel .pc .pctabs .pct')][t];if(tb){tb.click();await W(120)}
     document.querySelectorAll('#panel .pc>.pcr button.ka').forEach(b=>{const kan=b.querySelector('.kan');if(!kan)return;const n=typeof kpActName==='function'?kpActName(kan):kan.textContent.trim();const key=typeof kitActKey==='function'?kitActKey(n):'';
      if(!key)out[n.replace(/\s+/g,' ').trim()]=b.dataset.kart||''})}}
   PG.rv=1;render();await W(200);return out});
  await sleep(600);await p.evaluate(()=>Promise.all([...document.querySelectorAll('#panel img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,6000)}))));
  const mrv=await measF();const f2=await p.$('#panel .pc>.pcr button.ka.kart');if(f2)await f2.scrollIntoViewIfNeeded().catch(()=>{});await sleep(300);
  for(let t=0;t<3;t++){try{await p.screenshot({path:`${OUT}/act-${TAG}-rv-${wh}.jpg`,type:'jpeg',quality:72,timeout:120000});break}catch(e){await sleep(2000)}}
  R.push({sz,inj,m,mrv,miss,errs});await ctx.close()}
 console.log(JSON.stringify(R,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
