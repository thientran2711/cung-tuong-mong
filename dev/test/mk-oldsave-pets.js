/* make an OLD save for dev/test/pets.js with an OLDER build (e.g. main's index.html saved as main.html — main has no pets yet: the old pets-era
   records {t,care,at,src,from} with removed keys "linhquy" (turtle) / "rua" are written straight into S.pets), a started life with a few chest
   items and a queued pet gift card, saved to slot 2.
   usage: node dev/test/mk-oldsave-pets.js <url of the older build page> <out.json>
   Boot (review/pets-fix): service workers blocked, window.__nlInner (no Luân hồi screen), #kload / .krbox removed, proxy from HTTPS_PROXY. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT]=process.argv;
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const ctx=await b.newContext({serviceWorkers:'block',ignoreHTTPSErrors:true});const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.__nlInner=1});await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.querySelectorAll('.krbox').forEach(e=>e.remove());
  SLOT=2;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}
  Q.length=0;S.rank=3;S.inv.push({k:'tramngoc',w:1},{k:'nhansam'});
  if(typeof tsbPetAdd==='function'){tsbPetAdd(S,'cho','Hoàng thượng ban');tsbPetAdd(S,'hoami','nhờ thái giám mua');S.pets[1].care=25}
  else{S.pets=[{t:'cho',care:70,at:0,src:'emp',from:'Hoàng thượng ban'},{t:'hoami',care:25,at:0,src:'buy',from:'nhờ thái giám mua'},{t:'linhquy',care:60,at:0,src:'emp'}];S.petOn=0}
  Q.push({t:'Ngự ban',h:'',opts:[],pid:'tsbPetGift',pp:{src:'emp',t:'tho'}});quiet=false;save();
  let er='';try{localStorage.setItem(SK(2),JSON.stringify(ser()))}catch(e){er=e.message}const k=SK(2);if(er)return{er};return{k,len:k&&(window.slotGet?slotGet(k):localStorage.getItem(k)).length,name:S.name}});
 const d=await p.evaluate(k=>(window.slotGet?slotGet(k):localStorage.getItem(k)),r.k);fs.writeFileSync(OUT,d);console.log(JSON.stringify({r,errs}));await b.close()})();
