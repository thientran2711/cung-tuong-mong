/* review/shop-fix: Nội vụ phủ shop = the KIT 32.7 person dialog + aligned tile grid with buying on the tile (KIT 28.13d/e, 32.10 kit-x).
   usage: node dev/test/shop-fix.js <url of a build page> <outdir> [WxH@dpr,...]   (default 755x1000@2,1000x755@2,1180x820@2,844x390@3)
   Checks per size: dialog box == a plain person dialog with the same seller (±1 px) and vs. a one-woman visitor dialog; seller column =
   kit person column (figure height / column height); every row of tiles: picture top, name top, use-line top, price bottom, stepper top,
   button top equal (≤1 px), all tiles same height; no cut text; only the grid scrolls; no "Thôi"; header ✕ closes; "Ta có N bạc";
   + + → "Mua · 60 bạc" and badge ×2 → buy → Tư trang ×2; unaffordable → "Thiếu bạc"; picture tap → floating item card with ✕;
   Bán tab: + → "Bán · N bạc" → sells. 0 page errors, no horizontal overflow. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const R=[];
 for(const sz of (SIZES||"755x1000@2,1000x755@2,1180x820@2,844x390@3").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;try{NLP=null}catch(e){}render();const kr=document.getElementById("kroul");if(kr)kr.remove()});
  await sleep(1200);await p.addStyleTag({content:'#kroul{display:none!important}'});
  const imgs=()=>p.evaluate(()=>Promise.all([...document.querySelectorAll('#modal img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)}))));
  const shot=async n=>{await imgs();await sleep(700);for(let t=0;t<3;t++){try{await p.screenshot({path:`${OUT}/${n}-${wh}.jpg`,type:'jpeg',quality:82,timeout:120000});break}catch(e){await sleep(2000)}}};
  const box=()=>p.evaluate(()=>{const d=document.querySelector('#modal .dlg');const q=d.getBoundingClientRect();return [Math.round(q.left),Math.round(q.top),Math.round(q.width),Math.round(q.height)]});
  const closeAll=()=>p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');m.hidden=true});
  /* reference 2: a one-woman visitor (the usual 32.7 card) */
  await p.evaluate(()=>{const v=liveRivals(true)[0];Q.push({t:"Có người đến",who:pv(v),h:`<p>${v.name} sang chơi.</p>`,opts:[{n:"Tiếp",fx:{},x:"thân +3",go:()=>{}},{n:"Từ chối",fx:{},x:"thân -3",go:()=>{}}]});showModal()});
  await imgs();await sleep(1500);const refWoman=await box();await closeAll();
  /* the shop */
  await p.evaluate(()=>{S.shop=Object.keys(IT).filter(k=>IT[k].pr>0&&IT[k].pr<200).slice(0,8);S.bac=70;S.inv=S.inv.filter(e=>e.h||e.w);tab="inv";render();invAct("shop")});
  await imgs();await sleep(1800);const shopBox=await box();await shot('shop');
  const geo=await p.evaluate(()=>{const M=document.getElementById('modal'),d=M.querySelector('.dlg');const R=e=>e.getBoundingClientRect();
   const col=M.querySelector('#mb .kpsubj.kes'),fig=M.querySelector('#mb .kpsubj.kes .kesimg'),cap=M.querySelector('#mb .kpsubj.kes .kpsn');
   const tiles=[...M.querySelectorAll('.kshc')];const rows={};tiles.forEach(t=>{const y=Math.round(R(t).top);(rows[y]=rows[y]||[]).push(t)});
   const part=(t,s,edge)=>{const e=t.querySelector(s);return e?R(e)[edge]:NaN};const spread=a=>a.length?+(Math.max(...a)-Math.min(...a)).toFixed(2):0;
   const rowsOut=Object.values(rows).map(ts=>({n:ts.length,pic:spread(ts.map(t=>part(t,'.kshpic','top'))),name:spread(ts.map(t=>part(t,'.kshn','top'))),use:spread(ts.map(t=>part(t,'.kshe','top'))),
    priceBottom:spread(ts.map(t=>part(t,'.kshp','bottom'))),stepper:spread(ts.map(t=>part(t,'.kshst','top'))),btn:spread(ts.map(t=>part(t,'.kshgo','top'))),btnBottom:spread(ts.map(t=>part(t,'.kshgo','bottom'))),h:spread(ts.map(t=>R(t).height))}));
   const vis=e=>e&&e.offsetParent;const cut=[...M.querySelectorAll('.kshp,.kshgo,.kpsn,.kshm,.kshtabs button')].filter(e=>vis(e)&&(e.scrollWidth>e.clientWidth+1)).map(e=>e.textContent.slice(0,30));
   const clamp=[...M.querySelectorAll('.kshn,.kshe')].filter(e=>vis(e)&&e.scrollHeight>e.clientHeight+2).map(e=>e.textContent.slice(0,30));
   const scr=[...M.querySelectorAll('*')].concat([d]).filter(e=>vis(e)&&e.scrollHeight>e.clientHeight+2&&/auto|scroll/.test(getComputedStyle(e).overflowY)).map(e=>e.className.split(' ')[0]||e.id);
   const btns=[...M.querySelectorAll('button')].filter(vis).map(b=>b.textContent.trim());
   const cr=R(col),fr=R(fig),dr=R(d),mb=R(M.querySelector('#mb'));
   return{mode:d.className,figSrc:fig&&fig.getAttribute('src'),colH:Math.round(cr.height),figH:Math.round(fr.height),figOfCol:+(fr.height/cr.height).toFixed(3),figTopGap:Math.round(fr.top-cr.top),figBottomToCol:Math.round(cr.bottom-fr.bottom),
    capInCol:cap?R(cap).bottom<=cr.bottom+1&&R(cap).left>=cr.left-1:null,figOfBody:+(fr.height/mb.height).toFixed(3),cols:getComputedStyle(M.querySelector('.kshg')).gridTemplateColumns.split(' ').length,
    tiles:tiles.length,rows:rowsOut,cut,clamp,scr,thoi:btns.filter(t=>/^Thôi$/.test(t)).length,x:!!d.querySelector('.kph > .kit-x'),money:M.querySelector('.kshm').textContent,
    greyBtns:[...M.querySelectorAll('.kshgo:disabled')].map(b=>b.textContent),hovf:document.documentElement.scrollWidth>innerWidth+1}});
  await closeAll();
  /* reference 1: a plain person dialog with the SAME seller (32.7) */
  await p.evaluate(()=>{Q.push({t:"Có người đến",stage:[{__fig:"img/fig-eunuch-ndp-tray.webp",__cap:(S.court&&S.court.ped&&S.court.ped.name)||"",__role:"Thái giám Nội vụ phủ",age:28,sex:"m"}],h:`<p>Thái giám Nội vụ phủ đến bẩm việc.</p>`,opts:[{n:"Cho vào",fx:{},x:"không đổi gì",go:()=>{}},{n:"Bảo lui",fx:{},x:"không đổi gì",go:()=>{}}]});showModal()});
  await imgs();await sleep(1500);const refSame=await box();await shot('ref-seller');await closeAll();
  await p.evaluate(()=>invAct("shop"));await imgs();await sleep(1500);
  /* buy 2 of the first affordable tile: + → label + badge; then buy */
  const buy=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const t0=[...document.querySelectorAll('#modal .kshc')].find(c=>!c.classList.contains('kshno'));if(!t0)return'none';
   const i=t0.dataset.kshi;const q=s=>document.querySelector(`#modal .kshc[data-kshi="${i}"] ${s}`);const lab1=q('.kshgo').textContent;q('[data-kshq="+"]').click();await W(300);
   const lab2=q('.kshgo').textContent,badge=(q('.kitq')||{}).textContent||'',plusDis=q('[data-kshq="+"]').disabled;
   const name=q('.kshn').textContent;const b0=S.bac;q('.kshgo').click();await W(500);
   const grp=(typeof kinvItems==='function'?kinvItems():[]).find(x=>x.name===name);
   return{name,lab1,lab2,badge,plusDisabledAtMax:plusDis,bac:[b0,S.bac],bagQty:grp?grp.qty:null,open:!document.getElementById('modal').hidden,log:kpPlain(S.logs[0]),greyAfter:[...document.querySelectorAll('#modal .kshgo:disabled')].map(b=>b.textContent)}});
  await shot('shop-after-buy');
  /* picture tap → floating item card with ✕ */
  const det=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));document.querySelector('#modal .kshc .kshpic').click();await W(400);const c=document.querySelector('#modal .kshdc');
   if(!c)return'no card';const r=c.getBoundingClientRect(),d=document.querySelector('#modal .dlg').getBoundingClientRect();return{text:c.innerText.replace(/\s+/g,' ').slice(0,160),x:!!c.querySelector('.kit-x'),inside:r.left>=d.left&&r.right<=d.right&&r.top>=d.top&&r.bottom<=d.bottom+1}});
  await shot('shop-item-card');
  const detClosed=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const x=document.querySelector('#modal .kshdc .kit-x');if(x)x.click();await W(300);return!document.querySelector('#modal .kshdc')&&!document.getElementById('modal').hidden});
  /* Bán: the bought item, + → "Bán · N bạc", sell 2 */
  const sell=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));document.querySelector('#modal [data-kshtab="sell"]').click();await W(400);
   const c=document.querySelector('#modal .kshc');if(!c)return'no tile';const tile=c.innerText.replace(/\s+/g,' ');const lab1=c.querySelector('.kshgo').textContent;c.querySelector('[data-kshq="+"]').click();await W(300);
   const c2=document.querySelector('#modal .kshc');const lab2=c2.querySelector('.kshgo').textContent;const badge=(c2.querySelector('.kitq')||{}).textContent||'';const b0=S.bac,n0=S.inv.length;c2.querySelector('.kshgo').click();await W(500);
   return{tile,lab1,lab2,badge,bac:[b0,S.bac],inv:[n0,S.inv.length],log:kpPlain(S.logs[0]),after:(document.querySelector('#modal .kshempty')||{}).textContent||document.querySelectorAll('#modal .kshc').length+' tiles'}});
  await shot('shop-sell');
  const xClose=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));document.querySelector('#modal .kph > .kit-x').click();await W(400);return document.getElementById('modal').hidden});
  R.push({sz,refSame,refWoman,shopBox,sameAsSeller:refSame.every((v,i)=>Math.abs(v-shopBox[i])<=1),geo,buy,det,detClosed,sell,xClose,errs});await ctx.close()}
 console.log(JSON.stringify(R,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
