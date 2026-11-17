/* wx-fx-size (owner 17/11 "hoa đào … hình hoa to quá"): on-screen size + containment of every weather kind and the favour/promote bursts.
   usage: node dev/test/wx-fx-size.js <url> <outdir> <WxH@dpr,...> [shots] -> prints per kind: n, max/median particle px, share outside the stage rect, share over #hud */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES,SHOT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
const KINDS=[["petal",2,0,"hoa đào bay"],["leaf",8,0,"lá rơi"],["wind",8,0,"gió"],["snow",12,0,"tuyết rơi"],["rain",3,0,"mưa phùn"],["storm",3,0,"giông"],["mist",3,0,"sương"],["fly",5,3,"đom đóm"],["gold",2,0,"lễ"]];
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
 for(const sz of SIZES.split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);
  const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:W<1100,isMobile:W<1100,serviceWorkers:'block'});
  const p=await c.newPage();p.setDefaultTimeout(180000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function');await sleep(2500);
  await p.addStyleTag({content:'#kload{display:none!important}'});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){start();if(!isSrv())break}});
  await sleep(6000);let miss=0;
  for(let i=0;i<80&&miss<4;i++){const k=await p.evaluate(()=>{const r=document.querySelector('#kroul,.kroul');if(r){const bs=[...r.querySelectorAll('button')];const b=bs.find(x=>/Bỏ qua/.test(x.textContent))||bs.find(x=>/Tiếp|Vào|Nhập/.test(x.textContent));if(b){b.click();return 1}}return 0});miss=k?0:miss+1;await sleep(500)}
  await p.evaluate(()=>{setInterval(()=>{KFX.q=1;KFX.slow=0},100)});
  for(const [id,month,buoi,nm] of KINDS){
   await p.evaluate(([id,month,buoi,nm])=>{Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('.kmov,#kroul,#kload').forEach(e=>e.remove());S.place="home";S.month=month;S.buoi=buoi;S.wx={n:nm,k:id==="fly"?"dust":id==="gold"?"dust":id,f:0};
    KFX.parts.forEach(s=>{if(s.v)s.v.life=0});render()},[id,month,buoi,nm]);
   await sleep(6500);
   const r=await p.evaluate(()=>{const st=document.getElementById("stage").getBoundingClientRect(),hud=[...document.querySelectorAll("#hud,.hud,#topbar")].map(e=>e.getBoundingClientRect()).filter(r=>r.width);
    const L=KFX.parts.filter(s=>s.v&&s.visible&&s.alpha>.05&&s.texture);const px=L.map(s=>Math.max(Math.abs(s.width),Math.abs(s.height)));px.sort((a,b)=>a-b);
    const out=L.filter(s=>s.x<st.left-2||s.x>st.right+2||s.y<st.top-2||s.y>st.bottom+2).length;
    const hh=L.filter(s=>hud.some(r=>s.x>r.left&&s.x<r.right&&s.y>r.top&&s.y<r.bottom)).length;
    return{n:L.length,stage:[Math.round(st.width),Math.round(st.height)],med:Math.round(px[px.length>>1]||0),max:Math.round(px[px.length-1]||0),outStage:out,overHud:hh,hud:hud.length}},);
   console.log(sz,id,JSON.stringify(r));
   if(SHOT&&(id==="petal"||id==="snow"))await p.screenshot({path:`${OUT}/${id}-${wh}.jpg`,type:'jpeg',quality:78})}
  /* celebration burst: favour (falling petals) */
  await p.evaluate(()=>{S.wx={n:"nắng",k:"sun",f:0};S.month=2;KFX.parts.forEach(s=>{if(s.v)s.v.life=0});render();kitFx("favour",{})});await sleep(1800);
  const r=await p.evaluate(()=>{const st=document.getElementById("stage").getBoundingClientRect();const L=KFX.parts.filter(s=>s.v&&s.visible&&s.alpha>.05);const px=L.map(s=>Math.max(Math.abs(s.width),Math.abs(s.height))).sort((a,b)=>a-b);
   return{n:L.length,med:Math.round(px[px.length>>1]||0),max:Math.round(px[px.length-1]||0),outStage:L.filter(s=>s.y<st.top-2||s.y>st.bottom+2||s.x<st.left-2||s.x>st.right+2).length}});
  console.log(sz,"burst-favour",JSON.stringify(r));
  if(SHOT)await p.screenshot({path:`${OUT}/favour-${wh}.jpg`,type:'jpeg',quality:78});
  console.log(sz,"errs",JSON.stringify(errs.slice(0,3)));await c.close()}
 await b.close()})();
