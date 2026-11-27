/* map-portrait: Dư đồ portrait layout (KIT §85.8, owner 17/11 ~13:12Z, review/map-portrait).
   kv1 (portrait): NO people cards / group bars above the map (owner OD 18/11 ~21:40Z OD:L1921, canon overwrite of the 17/11 «4 cards one row above»: «Cung nhân» /
   «Chí tôn» = TWO small kit rail buttons in the left icon rail, the list drops down under them, jk3 kgfRail/kgfDrop); Ân sủng + Nguy hiểm chung = ONE ROW below (same height),
   nothing of them over the map; the map spans the full page width and is zoomed to the free height (its bottom = 6 px above that row); her place (+ every visible "!" place
   when they fit) is inside the view at open — her place = the .here spot = mapHereK (jres: housed in a chủ vị's phối điện = that palace; map-fix-2); the sky (data-sky) is set
   per weather; 0 label overlaps.
   kv2 (iPad landscape): UNCHANGED - the side column is still a narrow column (#kshR not a grid), map margins 56 / column+8.
   usage: node dev/test/map-portrait.js <page URL> <shotdir|-> [WxH,..] */
const {chromium}=require('playwright');const fs=require('fs');const CDN='https://ctm-img.victoria-tntt.workers.dev/';const CACHE=(process.env.MFK_CACHE||'/home/user/wt/mfk-cache')+'/';fs.mkdirSync(CACHE,{recursive:true});
const [,,PAGEURL,DIR,SIZES]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const WX=[['rain',{n:'mưa phùn',k:'rain',f:1},0],['sun',{n:'nắng vàng',k:'sun',f:0},0],['snowh',{n:'tuyết dày',k:'snowh',f:4},0],['dust night',{n:'trời quang',k:'dust',f:0},3]];
(async()=>{const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});let bad=0;
 for(const sz of (SIZES||'755x1000,412x1058,390x844,1180x820,1366x1024').split(',')){const [W,H]=sz.split('x').map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:true});
  await ctx.route(u=>u.href.startsWith(CDN),async r=>{const u=new URL(r.request().url()),c=CACHE+u.pathname.slice(1).replace(/\//g,'__');const ct=u.pathname.endsWith('.json')?'application/json':u.pathname.endsWith('.webp')?'image/webp':'application/octet-stream';
   if(!u.pathname.endsWith('.json')&&fs.existsSync(c))return r.fulfill({status:200,body:fs.readFileSync(c),contentType:ct});
   for(let i=0;i<4;i++){try{const res=await r.fetch();const body=await res.body();if(res.status()===200&&!u.pathname.endsWith('.json'))fs.writeFileSync(c,body);return r.fulfill({status:res.status(),body,contentType:ct})}catch(e){}}return r.abort()});
  const p=await ctx.newPage();p.setDefaultTimeout(90000);p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(PAGEURL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf,#krottip{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:180000});await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await sleep(400);const srv=await p.evaluate(()=>{const s=isSrv();if(s)try{nlNew()}catch(e){}start();return s});if(!srv)break}
  const res={};
  const scan=()=>p.evaluate(()=>{const R=x=>{const e=document.querySelector(x);if(!e)return null;const r=e.getBoundingClientRect();return{l:r.left,t:r.top,r:r.right,b:r.bottom,w:r.width,h:r.height}};
   const sc=R('.game.maptab .mapsc'),w=R('.mapw'),kR=document.getElementById('kshR'),one=kitView().pages===1;if(!sc||!w)return{nomap:1};
   const cards=[...document.querySelectorAll('#kshR>.k3cs>.k3c')].map(e=>e.getBoundingClientRect()),as=document.querySelector('#kshR>.kas'),py=document.querySelector('#kshR>.k3py'),ra=as&&as.getBoundingClientRect(),rp=py&&py.getBoundingClientRect();
   const here=document.querySelector('.mapw .mspot.here'),hr=here&&here.getBoundingClientRect();
   const B=[...document.querySelectorAll('.mapw .mspot:not(.kmhide)')].map(s=>{const P=[...s.querySelectorAll('.mlab,.mmeta')].map(e=>e.getBoundingClientRect()).filter(r=>r.width>0);return P.length?{L:Math.min(...P.map(r=>r.left)),R:Math.max(...P.map(r=>r.right)),T:Math.min(...P.map(r=>r.top)),Bt:Math.max(...P.map(r=>r.bottom))}:null}).filter(Boolean);
   let ov=0;for(let i=0;i<B.length;i++)for(let j=i+1;j<B.length;j++){const a=B[i],c=B[j];if(Math.min(a.R,c.R)-Math.max(a.L,c.L)>0&&Math.min(a.Bt,c.Bt)-Math.max(a.T,c.T)>0)ov++}
   const o={one,sc,w,ov,vis:B.length,tot:document.querySelectorAll('.mapw .mspot').length,sky:document.querySelector('.mapv').dataset.sky,z:window.__mapFit,mls:window.__mapMls,grid:kR&&getComputedStyle(kR).display==='grid',kRw:kR&&kR.getBoundingClientRect().width,mw:w.w};
   if(one){const mb=w.b;o.cards=cards.length;o.bars=document.querySelectorAll('#kshR .kgf').length;/* OD:L1921: no cards row, no full-width group bars on the phone/Fold map */
    o.rail=[...document.querySelectorAll('#krail [data-rail^="kgf-"]')].filter(e=>e.offsetParent).map(e=>e.dataset.rail);o.railNeed=typeof kitStageRail==='object'?kitStageRail.items().filter(x=>/^kgf-/.test(x.id)&&x.when&&x.when()).length:-1;
    o.bottomBelow=!!ra&&!!rp&&ra.top>=mb-2&&rp.top>=mb-2;o.bottomSame=!!ra&&!!rp&&Math.abs(ra.height-rp.height)<1.5;o.fullW=w.w>=sc.w-1;o.fitH=!!ra&&Math.abs(w.b-(ra.top-6))<4&&w.t>=sc.t-1;
    o.here=here?here.dataset.go:null;o.hereK=typeof mapHereK==='function'?mapHereK():S.place;o.hr=hr?[Math.round(hr.left),Math.round(hr.right)]:null;o.scl=document.querySelector(".game.maptab .mapsc").scrollLeft;o.hereIn=!!hr&&hr.left>=sc.l&&hr.right<=sc.r;o.hint=null}
   else{o.colNarrow=kR&&kR.getBoundingClientRect().width<200;o.mapLeft=Math.round(w.l-sc.l)}
   return o});
  const wxs=[['',null,null],...WX];
  for(const [n,wx,bu] of wxs){await p.evaluate(([wx,bu])=>{Q.length=0;document.getElementById('modal').hidden=true;window.__mapZ=0;window.__mapKey2=null;if(wx){S.wx=wx;S.buoi=bu}tab='go';render()},[wx,bu]);await sleep(2200);
   const r=await scan();res[n||'def']=r;if(!n&&DIR!=='-')await p.screenshot({path:`${DIR}/portrait-${sz}.png`})}
  const d=res.def;let ok=!d.nomap&&d.ov===0&&errs.length===0;
  if(d.one){ok=ok&&d.cards===0&&d.bars===0&&d.rail.length===d.railNeed&&d.here===d.hereK&&d.bottomBelow&&d.bottomSame&&d.fullW&&d.fitH&&d.hereIn&&d.grid;
   for(const k of Object.keys(res)){if(k==='def')continue;ok=ok&&res[k].sky&&res[k].sky.indexOf(k.split(' ')[0])>=0&&(k.indexOf('night')<0||/night/.test(res[k].sky))&&res[k].ov===0}}
  else ok=ok&&!d.grid&&d.colNarrow&&Math.abs(d.mapLeft-56)<=2&&d.w.l!=null;
  console.log(sz,ok?'PASS':'FAIL',JSON.stringify(d),errs.join('|'));if(!ok)bad++;await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
