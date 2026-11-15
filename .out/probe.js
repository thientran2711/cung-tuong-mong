const {chromium}=require('playwright');const fs=require('fs');const [,,BASE,OLD]=process.argv;
(async()=>{const b=await chromium.launch();const out={};
for(const [W,H] of [[1180,820]]){const c=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block'});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kmDiff!=='undefined'||typeof kitLose==='function',null,{timeout:120000});await p.waitForTimeout(2000);
 const r=await p.evaluate(async(old)=>{SLOT=3;document.getElementById('title').hidden=true;start();Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('#kload,#kroul,#dawn,.kmov').forEach(e=>e.remove());render();
  const cells={};for(const k of ['sung','danh','suc','bac','duc','sac','tai','tamco']){const e=document.getElementById('hud-'+k);const r=e&&e.getBoundingClientRect();cells[k]=r?[Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)]:null}
  // fly numbers: fake result card
  const card=document.createElement('div');card.style.cssText='position:fixed;left:40%;top:50%;width:200px;height:100px';document.body.appendChild(card);
  const before={};for(const [k] of RKEYS)before[k]=S[k];S.danh+=3;S.sung+=2;S.bac+=10;S.sac+=1;
  const hits=[];const mo=new MutationObserver(m=>m.forEach(x=>{if(x.target.id&&/^hud-/.test(x.target.id)&&/kfhit/.test(x.target.className))hits.push(x.target.id)}));mo.observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']});
  OPT.fxon=true;kfNumbers(card,before);const n=document.querySelectorAll('.kfnum').length;await new Promise(r=>setTimeout(r,4000));mo.disconnect();
  let oldr=null;
  if(old){const o=JSON.parse(old);const before=(window.KFX&&KFX.loses||[]).length;const g0=document.querySelectorAll('.kmov').length;
   try{localStorage.setItem(SK(2),old);const d=loadSlot(2);SLOT=2;quiet=true;deser(d);quiet=false;deal();showModal();}catch(e){oldr={err:e.message}}
   render();await new Promise(r=>setTimeout(r,2500));oldr=oldr||{name:S.name,inv:S.inv.length,gains:(KFX.gains||[]).length,mov:[...document.querySelectorAll(".kmov")].map(e=>e.textContent.slice(0,60)),modal:!document.getElementById("modal").hidden&&document.getElementById("modal").textContent.slice(0,120),loses:(KFX.loses||[]).length-before,boxes:document.querySelectorAll('.kmov').length-g0}}
  return{cells,flyN:n,hits:[...new Set(hits)],oldr}},OLD?fs.readFileSync(OLD,'utf8'):null);
 out[W+'x'+H]={...r,errs};await c.close()}
console.log(JSON.stringify(out,null,1));await b.close()})();
