/* ACT DEDUPE wave 1 on the 5 priority viewports (+ phone portrait): Hành sự deck (grey tap → reason popover), Dư đồ map + list
   (icons, gold "!", nothing clipped / no horizontal scroll), Nội vụ phủ shop with the weekly rare item.
   usage: node dev/test/act-dedupe-vp.js <url> [outdir for small jpg shots] [WxH,...]  → "FAIL n" */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const VPS=(SIZES||"755x1000,1000x755,1180x820,1366x1024,844x390,390x844").split(",");
(async()=>{const b=await chromium.launch();let fail=0;const ck=(vp,n,ok,info)=>{if(!ok)fail++;console.log((ok?'ok   ':'FAIL ')+vp+' '+n+(info?' · '+JSON.stringify(info).slice(0,240):''))};
 for(const sz of VPS){const [W,H]=sz.split("x").map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(3000);
  await p.addStyleTag({content:'#kroul,.kroul,.krbox,.kcf-w,.kmov.kcf{display:none!important}'});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&rivals&&rivals.length>0,null,{timeout:60000});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();Q.length=0;document.getElementById('modal').hidden=true;S.buoi=1;used=0;S.bac=400;deal();tab="act";render()});await sleep(1200);
  if(W<H&&W<600){/* phone portrait = rotate prompt (KIT §0); nothing else to check */const rot=await p.evaluate(()=>!!document.querySelector('#rot,.rotate,[data-rot]'));console.log('info '+sz+' portrait phone (rotate prompt present: '+rot+')');await ctx.close();continue}
  /* Hành sự: open it the way she does (the bottom tab) */
  await p.evaluate(()=>{const b=[...document.querySelectorAll("button")].find(x=>x.textContent.trim()==="Hành sự"&&x.getBoundingClientRect().width>0);if(b)b.click()});await sleep(900);
  const a=await p.evaluate(()=>{const L=[...document.querySelectorAll("#panel .kcard")].filter(x=>x.getBoundingClientRect().width>0);const pn=document.getElementById("panel");
   const names=L.map(x=>(x.querySelector("h4")||x).textContent);return{n:L.length,grey:L.filter(x=>x.disabled).length,study:names.filter(n=>/Tự học|Tự luyện/.test(n)).length,hs:document.documentElement.scrollWidth>innerWidth+1,clip:L.filter(x=>{const r=x.getBoundingClientRect();return r.right>innerWidth+1||r.left<-1}).length}});
  ck(sz,'Hành sự cards visible, no study, nothing clipped',a.n>=10&&a.study===0&&!a.hs&&a.clip===0,a);
  await p.evaluate(()=>{const b=[...document.querySelectorAll("#panel .kcard[disabled]")].find(x=>x.getBoundingClientRect().width>0);if(b){window.__adgi=b.dataset.i;b.scrollIntoView({block:"center"})}});await sleep(700);
  const g=await p.evaluate(()=>{const b=document.querySelector(`#panel .kcard[data-i="${window.__adgi}"]`);if(!b)return null;const r=b.getBoundingClientRect();let X=r.x+r.width/2,Y=r.y+Math.min(r.height/2,20);for(let yy=r.top+4;yy<r.bottom-2;yy+=8){const e=document.elementFromPoint(X,yy);if(e&&e.closest(".kcard")===b){Y=yy;break}}const e=document.elementFromPoint(X,Y);return{x:X,y:Y,n:b.dataset.i,hit:e&&(e.closest(".kcard")===b?"card":(e.className||e.tagName)+"")}});
  if(g){if(W<1100)await p.touchscreen.tap(g.x,g.y);else await p.mouse.click(g.x,g.y);await sleep(300);const pop=await p.evaluate(()=>{const k=document.getElementById("kpop");if(!k||k.hidden)return{t0:window.__adGreyT||0,hit:(()=>{const e=document.elementFromPoint(innerWidth/2,innerHeight/2);return e&&e.className})()};const r=k.getBoundingClientRect();return{t:k.textContent.slice(0,80),in:r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight}});
   ck(sz,'grey card tap → reason popover',!!pop&&pop.in,Object.assign({at:g},pop));if(OUT)await p.screenshot({path:`${OUT}/act-${sz}.jpg`,type:'jpeg',quality:45})}
  else ck(sz,'a grey card exists to tap',false);
  /* Dư đồ map + list */
  const m=await p.evaluate(()=>{const kp=document.getElementById("kpop");if(kp)kp.hidden=true;S.adHap=null;let L=adHapNow();for(let t=0;t<40&&!L.length;t++){S.adHap=null;L=adHapNow()}tab="go";window.__mapList=0;render();
   const sp=[...document.querySelectorAll("#panel .mspot")];const ic=document.querySelectorAll("#panel .mspot .kplic").length,mk=document.querySelectorAll("#panel .mspot .khap").length;
   const labs=[...document.querySelectorAll("#panel .mspot .mlab")].filter(x=>x.scrollWidth>x.clientWidth+2).length;
   window.__mapList=1;render();const ti=document.querySelectorAll("#panel .mtile .kplic").length,tm=document.querySelectorAll("#panel .mtile .khap").length;const hs=document.documentElement.scrollWidth>innerWidth+1;
   const tclip=[...document.querySelectorAll("#panel .mtile")].filter(x=>{const r=x.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left<-1)}).length;
   return{spots:sp.length,ic,mk,hap:L.length,labs,ti,tm,hs,tclip}});
  ck(sz,'map: icons + gold ! on the marked places',m.ic>=7&&m.mk===m.hap&&m.hap>=1,m);
  ck(sz,'list: icons + gold !, nothing clipped',m.ti>=6&&m.tm===m.hap&&!m.hs&&m.tclip===0,m);
  if(OUT){await p.evaluate(()=>{window.__mapList=1;render()});await sleep(2500);await p.screenshot({path:`${OUT}/list-${sz}.jpg`,type:'jpeg',quality:45});await p.evaluate(()=>{window.__mapList=0;render()});try{await p.waitForFunction(()=>{const i=document.querySelector('.mapimg');return i&&i.complete&&i.naturalWidth>0},null,{timeout:30000})}catch(e){console.log('info '+sz+' map picture did not load in 30 s')}await sleep(2500);await p.screenshot({path:`${OUT}/map-${sz}.jpg`,type:'jpeg',quality:45})}
  /* Nội vụ phủ */
  const n=await p.evaluate(()=>{window.__mapList=0;used=0;S.buoi=1;S.adHap={b:bkey(),L:[]};const st0=JSON.stringify(accState("nvp"))+" Q"+Q.length+" "+(Q[0]&&Q[0].t);goTo("nvp");tab="go";render();const pi=curPeople().findIndex(x=>x.kind==="peddler");if(pi<0)return{pi,place:S.place,srv:adSrv(),out:S.out,conf:S.confined,pl:places().map(x=>x.k).join(","),msg:S.visit&&S.visit.msg,st0,Q:Q.map(m=>m.t)};popIdx=pi;Q.length=0;document.getElementById("modal").hidden=true;talk(0);render();
   const k=document.querySelector('.kshop[data-kshop="nvp"]');if(!k)return{pi,shop:0};const r=(k.closest(".dlg,.kpanel,#ov .mg")||k).getBoundingClientRect();const R=adRare();
   return{pi,shop:1,rare:R&&IT[R.k].n,has:R?k.innerHTML.includes(IT[R.k].n):false,in:r.left>=-1&&r.right<=innerWidth+1}});
  ck(sz,'Nội vụ phủ shop opens with the weekly rare item',n.shop&&n.has&&n.in,n);
  if(OUT)await p.screenshot({path:`${OUT}/nvp-${sz}.jpg`,type:'jpeg',quality:45});
  ck(sz,'no page errors',errs.length===0,errs);await ctx.close()}
 console.log('FAIL '+fail);await b.close();process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
