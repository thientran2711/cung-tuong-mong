/* review/rel-picker-r2: picker-block scan. usage: node dev/test/relpick-scan.js <url> <outdir> <tag> [WxH@dpr,...]
   Giao tình › Ân oán default + after picking another person: picker block height (label row 1 + row 2), empty area, card in view without scroll. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,TAG,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const R=[];
 for(const sz of (SIZES||"755x1000@2,1180x820@2,1366x1024@2,412x1058@2,390x844@3").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function');await sleep(2500);
  await p.addStyleTag({content:'#kroul,#kboot{display:none!important}'});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   for(let i=0;i<400;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;try{NLP=null}catch(e){}
   const L=liveRivals(true);S.met=S.met||{};tmPlace(S,0);L.forEach(v=>{S.met[v.id]=1;try{S.known[kOf61(v)]=3}catch(e){}});
   tab="rel";relSel="me";PG.rel=null;PG.relY=null;render()});
  await sleep(1500);
  const meas=()=>p.evaluate(()=>{const P=document.getElementById('panel');const R=e=>e.getBoundingClientRect();const k=[...P.querySelectorAll('.krelpk')].filter(e=>e.offsetParent);
   const card=P.querySelector('.krpair')||P.querySelector('.krelpair');const pr=R(P);
   const pick=k.length?{top:R(k[0]).top,bottom:R(k[k.length-1]).bottom}:null;
   const faces=[...P.querySelectorAll('.krelpk .pface')].filter(e=>e.offsetParent);
   return{pickerH:pick?+(pick.bottom-pick.top).toFixed(0):null,rowsH:k.map(e=>+R(e).height.toFixed(0)),faceH:faces[0]?+R(faces[0]).height.toFixed(0):null,
    cardBottom:card?+R(card).bottom.toFixed(0):null,panelBottom:+pr.bottom.toFixed(0),vh:innerHeight,
    cardInView:card?R(card).bottom<=Math.min(pr.bottom,innerHeight)+1:null,hovf:document.documentElement.scrollWidth>innerWidth+1,
    panelScroll:P.scrollHeight>P.clientHeight+1}});
  const shot=async n=>{await p.evaluate(()=>Promise.all([...document.querySelectorAll('#panel img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,6000)}))));await sleep(400);
   await p.screenshot({path:`${OUT}/rp-${TAG}-${n}-${wh}.jpg`,type:'jpeg',quality:72,timeout:120000})};
  const res={sz,errs};await sleep(3000);await p.evaluate(()=>{tab="rel";relSel="me";PG.rel=null;PG.relY=null;render()});await sleep(1500);res.def=await meas();await shot('ta');
  await p.evaluate(()=>{const f=[...document.querySelectorAll('#panel .krelpk .pface')];const q=f.find(x=>/Hoàng thượng/.test(x.textContent));if(q)q.click()});await sleep(500);
  await p.evaluate(()=>{tab="rel";relSel=(liveRivals(true).find(v=>!v.queen)||{}).id;PG.rel=null;PG.relY=null;render()});await sleep(900);
  res.pick=await meas();await shot('pick');
  R.push(res);await ctx.close()}
 console.log(JSON.stringify(R,null,1));await b.close()})();
