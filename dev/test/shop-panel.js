/* review/shop-panel: every buy/sell panel = seller figure LEFT, RIGHT = tabs «Mua» | «Bán» + a 3-COLUMN grid that scrolls down.
   usage: node dev/test/shop-panel.js <url of a build page> <outdir> [WxH@dpr,...]  (default 755x1000@2,1180x820@2)
   Per size, for the Nội vụ phủ shop (opened from the eunuch's «Để ta xem»), Tư trang button and the pet shop:
   exactly 3 grid columns, tiles one row-aligned, only the grid scrolls (no dialog overflow), figure left of the grid, no horizontal
   overflow; Mua tab: + → buy → chest +N, bạc -N·price; Bán tab: sell → chest -1, bạc +price; 0 page errors. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));let bad=0;const ck=(n,ok,d)=>{console.log((ok?'PASS ':'FAIL ')+n+(d!==undefined?' '+JSON.stringify(d):''));if(!ok)bad++};
(async()=>{const b=await chromium.launch();
 for(const sz of (SIZES||"755x1000@2,1180x820@2").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.on('console',m=>{if(m.type()==='error')console.log('  console.error:',m.text().slice(0,300))});
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   for(let i=0;i<400;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;try{NLP=null}catch(e){}render()});
  await sleep(1200);await p.addStyleTag({content:'#kroul,#kboot,#kbootw,#kload{display:none!important}'});
  const imgs=()=>p.evaluate(()=>Promise.all([...document.querySelectorAll('#modal img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)}))));
  const shot=async n=>{await imgs();await sleep(700);for(let t=0;t<3;t++){try{await p.screenshot({path:`${OUT}/${n}-${wh}.jpg`,type:'jpeg',quality:80,timeout:120000});break}catch(e){await sleep(2000)}}};
  const geo=()=>p.evaluate(()=>{const M=document.getElementById('modal'),d=M&&M.querySelector('.dlg'),g=M&&M.querySelector('.kshg');if(!d||!g)return null;const R=e=>e.getBoundingClientRect();
   const cols=new Set([...g.querySelectorAll('.kshc')].map(t=>Math.round(R(t).left))).size;const fig=M.querySelector('#mb .kpsubj.kes .kesimg')||M.querySelector('#mb .kpsubj img');
   const tiles=[...g.querySelectorAll('.kshc')];const gr=R(g),dr=R(d);
   const cut=[...g.querySelectorAll('.kshgo,.kshn,.kshp')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.textContent.slice(0,20));
   return{cols,n:tiles.length,figLeft:fig?R(fig).right<=gr.left+2:null,hOver:document.documentElement.scrollWidth>innerWidth+1,dlgIn:dr.left>=-1&&dr.right<=innerWidth+1&&dr.top>=-1&&dr.bottom<=innerHeight+1,
    tabs:[...M.querySelectorAll('.kshtabs [data-kshtab]')].map(t=>t.textContent.trim()),kinds:[...M.querySelectorAll('.kshkinds [data-kshkind]')].map(t=>t.dataset.kshkind),kindOn:(M.querySelector('.kshkinds .pct.on')||{dataset:{}}).dataset.kshkind||null,scroll:g.scrollHeight>g.clientHeight,cut}});
  /* r3: sub-tab row by item kind: shown only with >1 kind, first = Tất cả, a kind filters the grid to exactly its items (buy + sell) */
  const kindCheck=async(key,mode,tag)=>{const k0=await geo();ck(`${wh} ${tag}: kind row under Mua|Bán, first «Tất cả», ≥2 kinds`,!!k0&&k0.kinds[0]==='all'&&k0.kinds.length>=3&&k0.kindOn==='all',k0&&k0.kinds);
   const all=await p.evaluate(k=>KSHOP.reg[k].list.length,key);const picks=k0?k0.kinds.slice(1):[];let lastN=0;
   for(const [i,kd] of picks.slice(0,2).entries()){await p.click(`.kshop[data-kshop="${key}"] [data-kshkind="${kd}"]`,{force:true});await sleep(1800);
    const r=await p.evaluate(k=>{const o=KSHOP.reg[k];return{n:o.list.length,cats:[...new Set(o.list.map(x=>x.cat||'tap'))],cur:o.cat[o.mode],tiles:document.querySelectorAll('.kshop[data-kshop="'+k+'"] .kshc').length}},key);
    ck(`${wh} ${tag} kind «${kd}»: grid = only that kind`,r.cats.length===1&&r.cats[0]===kd&&r.cur===kd&&r.n===r.tiles&&r.n<all,{r,all});await shot(`${tag}-kind${i+1}`);lastN=r.n}
   await p.click(`.kshop[data-kshop="${key}"] [data-kshkind="all"]`,{force:true});await sleep(1800)};
  const closeAll=()=>p.evaluate(()=>{Q.length=0;KSHOP.reg={};const m=document.getElementById('modal');m.hidden=true;try{closeModal()}catch(e){}});
  /* 1. eunuch's outside option «Để ta xem» */
  await p.evaluate(()=>{window.SHOPKEYS=()=>{const L=Object.keys(IT).filter(k=>IT[k].pr>0&&IT[k].pr<200&&!IT[k].il);const plain=L.filter(k=>!(window.WD_ITEMS&&WD_ITEMS[k])&&!IT[k].keep);const seen={},var3=plain.filter(k=>{const d=IT[k].kd+'|'+(IT[k].sl||'');return seen[d]?0:(seen[d]=1)}).slice(0,6);return var3.concat(plain.filter(k=>!var3.includes(k))).slice(0,9)||plain.slice(0,3).concat(L.filter(k=>!plain.slice(0,3).includes(k))).slice(0,9)}});
  const outs=await p.evaluate(()=>{S.shop=SHOPKEYS();S.bac=500;S.inv=S.inv.filter(e=>e.h||e.w);
   const o=talkOpts({kind:"peddler",name:"x",info:"Thái giám Nội vụ phủ"});return o.map(a=>a.n)});
  ck(`${wh} peddler option = «Để ta xem»`,outs.includes('Để ta xem')&&!outs.some(n=>/Xem hàng|Mua|Bán/.test(n)),outs);
  await p.evaluate(()=>{const o=talkOpts({kind:"peddler",name:"x",info:"Thái giám Nội vụ phủ"});const a=o.find(x=>x.adShop);a&&kitShopNvp();render()});await sleep(1500);await imgs();
  let g=await geo();ck(`${wh} nvp: panel open, 3 columns, tabs Mua|Bán, figure left, no overflow`,!!g&&g.cols===3&&g.tabs.join('|')==='Mua|Bán'&&g.figLeft!==false&&!g.hOver&&g.dlgIn&&!g.cut.length,g);await shot('nvp-buy');await kindCheck('nvp','buy','nvp-buy');
  const n0=await p.evaluate(()=>({inv:S.inv.filter(e=>!e.h&&!e.w).length,bac:S.bac,k:KSHOP.reg.nvp.list[0].k,pr:KSHOP.reg.nvp.list[0].price}));
  await p.click('.kshop[data-kshop="nvp"] .kshc[data-kshi="0"] .kshgo',{force:true});await sleep(2500);
  const n1=await p.evaluate(()=>({inv:S.inv.filter(e=>!e.h&&!e.w).length,bac:S.bac}));
  ck(`${wh} nvp buy: chest +1, bạc -price`,n1.inv===n0.inv+1&&n1.bac===n0.bac-n0.pr,{n0,n1});
  await p.evaluate(()=>{const seen={};Object.keys(IT).filter(k=>IT[k].pr>0&&!IT[k].keep&&!IT[k].il&&!(window.WD_ITEMS&&WD_ITEMS[k])).forEach(k=>{const d=IT[k].kd+'|'+(IT[k].sl||'');if(!seen[d]&&Object.keys(seen).length<5){seen[d]=1;S.inv.push({k})}});});
  await p.click('.kshop[data-kshop="nvp"] [data-kshtab="sell"]',{force:true});await sleep(2500);g=await geo();await shot('nvp-sell');if(g&&g.kinds.length)await kindCheck('nvp','sell','nvp-sell');
  ck(`${wh} nvp sell tab: 3 columns, ≥1 sellable (bought item)`,!!g&&g.cols===Math.min(3,g.n)&&g.n>=1&&!g.hOver,g);
  const s0=await p.evaluate(()=>({inv:S.inv.filter(e=>!e.h&&!e.w).length,bac:S.bac,t:KSHOP.reg.nvp.list[0].price}));
  await p.click('.kshop[data-kshop="nvp"] .kshc[data-kshi="0"] .kshgo',{force:true});await sleep(2500);
  const s1=await p.evaluate(()=>({inv:S.inv.filter(e=>!e.h&&!e.w).length,bac:S.bac}));
  ck(`${wh} nvp sell: chest -1, bạc +price`,s1.inv===s0.inv-1&&s1.bac===s0.bac+s0.t,{s0,s1});
  await closeAll();
  /* 2. Tư trang button */
  await p.evaluate(()=>{S.shop=SHOPKEYS();tab="inv";render();invAct("shop")});await sleep(1500);await imgs();
  g=await geo();ck(`${wh} Tư trang → same panel, 3 columns`,!!g&&g.cols===3&&g.tabs.join('|')==='Mua|Bán'&&!g.hOver&&g.dlgIn,g);await closeAll();
  /* 3. pet shop (buy only) */
  await p.evaluate(()=>{S.pets=[];S.rank=Math.max(S.rank,3);S.bac=900;petShop()});await sleep(1500);await imgs();
  g=await geo();ck(`${wh} pet shop: 3 columns, no overflow, no kind row (one kind)`,!!g&&g.cols===3&&!g.hOver&&g.dlgIn&&!g.cut.length&&g.kinds.length===0,g);await shot('pet');await closeAll();
  ck(`${wh} 0 page errors`,errs.length===0,errs);await ctx.close()}
 await b.close();console.log(bad?`FAILED ${bad}`:'ALL PASS');process.exit(bad?1:0)})();
