/* review/kit-kpb · after-only shots: pgpick, giftpick and a short picker, Fold 755x1000@2 and iPad 1180x820@2 (writes OUT/<name>-<fold|ipad>.jpg; OUT must be OUTSIDE the repo)
   usage: node dev/test/kpb-shots.js <page URL ?khost=0> <outdir> */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 for(const [tag,W,H] of [["fold",755,1000],["ipad",1180,820]]){
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
  await p.addStyleTag({content:'#kroul,#klife{display:none!important}'});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&rivals&&rivals.length>0,null,{timeout:60000});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();Q.length=0;document.getElementById('modal').hidden=true;S.an=35;S.tamco=40;S.inv.push({k:"tramngoc",from:"me"},{k:"hacdinh"},{k:"docngam"},{k:"kimbac"},{k:"yensao"},wkMake(S,"mon",2,80));render()});await p.waitForTimeout(1500);
  for(let i=0;i<8;i++){await p.evaluate(()=>{try{kmReset()}catch(e){}Q.length=0;const M=document.getElementById('modal');M.className='modal';M.hidden=true;document.querySelectorAll('.dawn,#kroul,#klife').forEach(e=>e.remove())});await p.waitForTimeout(700)}
  const shot=async(name,fn)=>{await p.evaluate(()=>{try{kmReset()}catch(e){}Q.length=0;document.querySelectorAll('.dawn,.ktut,#kroul').forEach(e=>e.remove())});await p.evaluate(fn);await p.waitForTimeout(3500);console.log(tag,name,await p.evaluate(()=>{const e=document.elementFromPoint(innerWidth/2,innerHeight/2);const M=document.getElementById('modal');return (e&&(e.id||e.className)+'')+' | modalHidden='+M.hidden+' z='+getComputedStyle(M).zIndex}));await p.screenshot({path:`${OUT}/${name}-${tag}.jpg`,type:'jpeg',quality:80});
   await p.evaluate(()=>{Q.length=0;document.getElementById('modal').className='modal';document.getElementById('modal').hidden=true})};
  await shot('pgpick',()=>{const ix=S.inv.findIndex(e=>pgFood(e));pushDil(mkP("pgpick",{ix}),"Bỏ độc vào quà");showModal()});
  await shot('giftpick',()=>{const ix=S.inv.findIndex(e=>e&&e.k==="tramngoc");pushDil(mkP("giftpick",{ix}),"Tặng quà");showModal()});
  await shot('short',()=>{Q.push({t:"Việc nhỏ",h:"<p>Chọn một trong hai việc.</p>",opts:[{n:"Một",fx:{}},{n:"Hai",fx:{}}]});showModal()});
  await ctx.close()}
 await b.close()})();
