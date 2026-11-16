/* ACT SPLIT waves 2 + 3 on the priority viewports (+ phone portrait = rotate prompt): festival day → Dư đồ map + list show the gold "!" at
   the festival place; arriving opens the festival's light acts (kit dialog, inside the screen); night → the locked-place card offers
   "Lẻn vào" with the night line; night "!" at Trường Môn viện → the cold-palace call. No horizontal scroll, 0 page errors.
   usage: node dev/test/act-split-vp.js <url of the SITE index.html (rotate prompt = dev/site/rot.js)> [outdir for small jpg shots] [WxH@dpr,...]  → "FAIL n" */
const {chromium}=require('playwright');const [,,URL,OUT,SIZES]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const VPS=(SIZES||"755x1000@2,1000x755@1,1180x820@2,1366x1024@2,844x390@2,390x844@3").split(",");
(async()=>{const b=await chromium.launch();let fail=0;const ck=(vp,n,ok,info)=>{if(!ok)fail++;console.log((ok?'ok   ':'FAIL ')+vp+' '+n+(info?' · '+JSON.stringify(info).slice(0,300):''))};
 for(const sz0 of VPS){const [sz,dpr]=sz0.split("@");const [W,H]=sz.split("x").map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(dpr||1),hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(3000);
  await p.addStyleTag({content:'#kroul,.kroul,.krbox,.kcf-w,.kmov.kcf{display:none!important}'});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv())&&!S.out)break}});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&rivals&&rivals.length>0,null,{timeout:60000});
  if(W<H&&W<600){const rot=await p.evaluate(()=>{const e=document.querySelector('#krottip,#rot,.rotate,[data-rot]');return !!e&&getComputedStyle(e).display!=="none"});ck(sz,'phone portrait: rotate prompt',rot);if(OUT)await p.screenshot({path:`${OUT}/rot-${sz}.jpg`,type:'jpeg',quality:45});await ctx.close();continue}
  const clr=`Q.length=0;document.getElementById('modal').hidden=true;`;
  /* 1. festival day: the "!" on map + list */
  const m=await p.evaluate(clr0=>{eval(clr0);const F=FEST.nguyentieu;S.month=F.m;S.tuan=F.t[0];S.buoi=0;used=0;S.bac=400;S.adFest={};S.adHap=null;try{goTo("home")}catch(e){}eval(clr0);
   const L=adHapNow();tab="go";window.__mapList=0;render();const sp=document.querySelector('#panel .mspot[data-go="vuon"] .khap,#panel .mspot[data-ak="vuon"] .khap');
   const mk=document.querySelectorAll("#panel .mspot .khap").length;const fest=(document.querySelector("#panel .fest")||{}).textContent||"";
   window.__mapList=1;render();const tl=document.querySelector('#panel .mtile[data-go="vuon"] .khap,#panel .mtile[data-ak="vuon"] .khap');const hs=document.documentElement.scrollWidth>innerWidth+1;window.__mapList=0;render();
   return{hap:L.map(h=>h.k+":"+h.id),spot:!!sp,mk,tile:!!tl,hs,fest}},clr);
  ck(sz,'festival day: gold ! at Ngự hoa viên on map + list, festival banner',m.spot&&m.tile&&!m.hs&&/Nguyên tiêu/.test(m.fest),m);
  if(OUT){try{await p.waitForFunction(()=>{const i=document.querySelector('.mapimg');return i&&i.complete&&i.naturalWidth>0},null,{timeout:30000})}catch(e){}await sleep(1500);await p.screenshot({path:`${OUT}/fmap-${sz}.jpg`,type:'jpeg',quality:45})}
  /* 2. arrive: the light acts in the kit dialog */
  const d=await p.evaluate(clr0=>{used=0;goTo("vuon");render();/* other dialogs of the moment may come first: close them until the festival one is on top */for(let i=0;i<6&&Q.length&&!/Nguyên tiêu/.test(Q[0].t||"");i++)Q.shift();try{showModal()}catch(e){}const md=document.getElementById("modal");if(!md||md.hidden)return{shown:0,Q:Q.map(x=>x.t)};const box=md.querySelector(".dlg,.dbox,.kpanel")||md;const r=box.getBoundingClientRect();
   const O=[...md.querySelectorAll(".opts button,.opt")].map(x=>x.textContent.replace(/\s+/g," ").trim().slice(0,40));return{shown:1,t:(document.getElementById("mt")||{}).textContent,O,in:r.left>=-1&&r.right<=innerWidth+1&&r.top>=-1,hs:document.documentElement.scrollWidth>innerWidth+1}},clr);
  ck(sz,'arrival: festival light acts shown in the kit dialog, inside the screen',d.shown&&d.O.length>=2&&d.in&&!d.hs&&d.O.some(x=>/đố đèn|Dạo đèn/.test(x)),d);
  if(OUT){await sleep(1200);await p.screenshot({path:`${OUT}/fdlg-${sz}.jpg`,type:'jpeg',quality:45})}
  /* 3. night: the locked-place card with "Lẻn vào" + the night line */
  const n=await p.evaluate(clr0=>{eval(clr0);S.month=4;S.tuan=1;S.buoi=BUOI.length-1;used=0;S.adHap=null;try{goTo("home")}catch(e){}eval(clr0);tab="go";render();goTo("dtd");render();try{showModal()}catch(e){}
   const md=document.getElementById("modal");const txt=md&&!md.hidden?md.textContent.replace(/\s+/g," "):"";const ac=[...document.querySelectorAll('[data-acsneak="dtd"]')].map(x=>x.textContent.replace(/\s+/g," ").trim());
   const box=md&&(md.querySelector(".dlg,.dbox,.kpanel")||md);const r=box?box.getBoundingClientRect():{left:0,right:0};return{sneak:/Lẻn vào/.test(txt)||ac.length>0,night:/đêm vắng người|bắt giữa đêm/.test(txt),txt:txt.slice(0,260),ac,in:r.left>=-1&&r.right<=innerWidth+1}},clr);
  ck(sz,'night: locked place offers Lẻn vào with the night line',n.sneak&&n.night&&n.in,n);
  if(OUT){await sleep(800);await p.screenshot({path:`${OUT}/sneak-${sz}.jpg`,type:'jpeg',quality:45})}
  /* 4. night "!" at Trường Môn viện → the cold-palace call */
  const c=await p.evaluate(clr0=>{eval(clr0);const v=liveRivals(false).find(x=>!x.queen);if(v)v.out=true;S.seen=S.seen||{};delete S.seen.coldvisit;S.buoi=BUOI.length-1;used=0;S.adHap=null;try{goTo("home")}catch(e){}eval(clr0);
   const L=adHapNow();tab="go";window.__mapList=0;render();const sp=!!document.querySelector('#panel .mspot[data-go="lc"] .khap,#panel .mspot[data-ak="lc"] .khap');goTo("lc");render();const inQ=Q.some(x=>/Trường Môn viện/.test(x.t||""));for(let i=0;i<6&&Q.length&&!/Trường Môn viện/.test(Q[0].t||"");i++)Q.shift();try{showModal()}catch(e){}
   const md=document.getElementById("modal");return{hap:L.map(h=>h.k+":"+h.id),spot:sp,inQ,t:md&&!md.hidden?(document.getElementById("mt")||{}).textContent:"",hs:document.documentElement.scrollWidth>innerWidth+1}},clr);
  ck(sz,'night: ! at Trường Môn viện → Tiếng khóc ở Trường Môn viện',c.spot&&/Trường Môn viện/.test(c.t||"")&&!c.hs,c);
  if(OUT){await sleep(1200);await p.screenshot({path:`${OUT}/cold-${sz}.jpg`,type:'jpeg',quality:45})}
  ck(sz,'no page errors',errs.length===0,errs);await ctx.close()}
 console.log('FAIL '+fail);await b.close();process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
