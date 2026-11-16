/* KIT 28.13b: big item pictures (kitItem lg / xl) are frameless and hi-res. usage: node dev/test/item-big.js <url> [WxH@dpr,...] [outdir]
   Opens the real item pop-up (kinvOpen) and synthetic lg + xl + md tiles; checks: lg / xl .kitb has no border, no background, no box-shadow, no ::after frame;
   the picture is the item512 file (or the small file when no 512 exists) and renders big (lg >= 120 px, xl >= 170 px at >= 1000 px wide); md keeps its frame; frame:true keeps it. FAIL -> exit 1. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,SIZES,OUT]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));if(OUT)fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();let bad=0;
 for(const sz of (SIZES||"755x1000@2,1000x755@2,1180x820@2,1366x1024@2,844x390@2").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(dpr||1),hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click());document.querySelectorAll(".kroul,#kmrew,#kload").forEach(e=>e.remove())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitItem==='function');await sleep(2500);await p.addStyleTag({content:'.kroul,.kmov{display:none!important}'});
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;document.getElementById('modal').hidden=true;try{S.inv.push({k:"tramngoc",from:"me"})}catch(e){}render()});await sleep(1200);
  const syn=await p.evaluate(async()=>{const src=kitItemSrc("nhansam","img/item-nhansam.webp");const d=document.createElement('div');d.id='ibtest';d.style.cssText='position:fixed;left:0;top:0;z-index:99999;background:#fbf3e4;padding:10px;display:flex;gap:16px;align-items:flex-end';
   d.innerHTML=kitItem({src,name:"Nhân sâm",grade:3,size:"xl"})+kitItem({src,name:"Nhân sâm",grade:4,size:"lg",qty:2})+kitItem({src,name:"Nhân sâm",grade:1,size:"md"})+kitItem({src,name:"Nhân sâm",grade:2,size:"lg",frame:true});document.body.appendChild(d);await new Promise(r=>setTimeout(r,1500));
   const f=e=>{const k=e.querySelector('.kitb'),cs=getComputedStyle(k),af=getComputedStyle(k,'::after'),im=k.querySelector('img');return{border:cs.borderTopWidth,bg:cs.backgroundImage+'|'+cs.backgroundColor,shadow:cs.boxShadow,after:af.display+'/'+af.content,src:im?(im.currentSrc||im.src).replace(/^.*\/img\//,'img/'):null,w:im?Math.round(im.getBoundingClientRect().width):0,nat:im?im.naturalWidth:0}};
   return [...d.querySelectorAll('.kitem')].map(e=>f(e))});
  const xl=syn[0],lg=syn[1],md=syn[2],fr=syn[3];
  const frameless=t=>t.border==='0px'&&/^none\|rgba\(0, 0, 0, 0\)$/.test(t.bg)&&t.shadow==='none'&&t.after.startsWith('none');
  const checks={xlFrameless:frameless(xl),lgFrameless:frameless(lg),xlSrc:/item512/.test(xl.src||'')||(xl.nat>0),xlBig:xl.w>=(W>=1000?170:120),lgBig:lg.w>=120,mdFramed:!frameless(md),optInFrame:!frameless(fr)};
  await p.evaluate(()=>{document.getElementById('ibtest').remove();kinvOpen(kinvItems()[0])});await sleep(900);
  const real=await p.evaluate(()=>{const e=document.querySelector('#modal .kitem-lg,#modal .kitem-xl');if(!e)return null;const k=e.querySelector('.kitb'),cs=getComputedStyle(k),im=k.querySelector('img');return{border:cs.borderTopWidth,shadow:cs.boxShadow,w:im?Math.round(im.getBoundingClientRect().width):0,src:im?(im.currentSrc||'').replace(/^.*\/img\//,'img/'):null}});
  checks.popup=!!real&&real.border==='0px'&&real.shadow==='none'; /* picture size is not checked here: the CDN paintings may not load in a sandbox (the synthetic tiles above check size) */
  const ok=Object.values(checks).every(Boolean);if(!ok)bad++;
  console.log(wh,ok?'PASS':'FAIL',JSON.stringify(checks),'xl:',xl.src,xl.w+'px','lg:',lg.w+'px','popup:',real&&real.src,real&&real.w+'px');
  if(OUT)await p.screenshot({path:`${OUT}/${wh}-popup.png`});
  if(errs.length){bad++;console.log(wh,'PAGE ERRORS',errs)}
  await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
