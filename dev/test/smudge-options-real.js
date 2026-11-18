/* review/smudge-code r16 (main s41): grey-run darkness options shot at the REAL places (not a made-up chip).
   usage: node dev/test/smudge-options-real.js <url> <outdir> <A|B>   A = room stage figure, herself (Fold 755x1000, face ~41 px, step 2); B = mirror reveal final frame (big face).
   writes <outdir>/<A|B>-<nhe|vua|nang>-<0|10|20>-raw.png (label added by compose step). 0 = r15 (dark 1), 10 / 20 = BAL.looks.smuFx.tear.dark 1.1 / 1.2. Big-size boost off so only the knob differs. LOCALFIT=1 uses repo mkfit. */
const {chromium}=require('playwright');const [,,URL,OUT,PL]=process.argv;const FINAL=!!process.env.FINAL;/* FINAL=1: the shipped numbers only (tear.dark default, big boost on): <PL>-<lvl>-20-raw.png */
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:3,serviceWorkers:'block',reducedMotion:'no-preference'});const p=await ctx.newPage();p.setDefaultTimeout(60000);
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));require('fs').mkdirSync(OUT,{recursive:true});
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known);await p.waitForTimeout(4000);
 await p.waitForFunction(()=>window.TOIL_FIT&&TOIL_FIT.fit&&window.KIT_VEIL&&KIT_VEIL.fit,null,{timeout:40000}).catch(()=>{});
 if(process.env.LOCALFIT){const fs=require('fs'),mk={};for(const f of fs.readdirSync('dev/art/mkfit'))if(f.endsWith('.json'))mk[f.slice(0,-5)]=JSON.parse(fs.readFileSync('dev/art/mkfit/'+f,'utf8'));await p.evaluate(mk=>{for(const g in mk){MK_FIT.g[g]=mk[g];MK_FIT.ld[g]=1}},mk)}
 await p.evaluate(F=>{window.__final=F},FINAL);await p.evaluate(()=>{const kl=document.querySelectorAll('.kroul,#kload');kl.forEach(e=>e.remove());const c=toilColFix(null);c.seed=5;S.toilette={day:toilWk()*10,wk:toilWk(),score:70,makeup:true,style:'fit',dv:'chinh',F:0,occ:[],look:'dep',col:c};if(!window.__final)BAL.looks.smuFx.big.boost=1});
 for(const [lv,nm] of [[3,'warm'],[1,'nhe'],[2,'vua'],[3,'nang']].filter(x=>x[1]==='warm'||!process.env.LV||String(x[0])===process.env.LV))for(const d of (FINAL?[20]:[0,10,20])){
  await p.evaluate(([lv,d])=>{if(!window.__final)BAL.looks.smuFx.tear.dark=1+d/100;for(const q in TOIL_MKC)delete TOIL_MKC[q];for(const q in LK_SMC)delete LK_SMC[q];S.lk=null;delete S.toilette.lk;lkSmudge(S,lv,'mua');Q.length=0;try{closeModal()}catch(e){}const M=document.getElementById('modal');if(M){M.hidden=true;M.innerHTML=''}document.querySelectorAll('.kmov,.kroul,.kpscene').forEach(e=>e.remove());render()},[lv,d]);
  let clip;
  if(PL==='A'){await p.waitForTimeout(1500);for(let t=0;t<4;t++){const ok=await p.evaluate(()=>{const f=document.querySelector('main.stage img.kfxon');return !!f&&f.getBoundingClientRect().width>100});if(ok)break;await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(e=>e.textContent.trim()==='Hành sự'&&e.offsetParent);if(b)b.click()});await p.waitForTimeout(2500);await p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}const M=document.getElementById('modal');if(M){M.hidden=true;M.innerHTML=''}document.querySelectorAll('.kmov,.kroul,.kpscene').forEach(e=>e.remove())});await p.waitForTimeout(1500)}for(let k=0;k<5;k++){await p.evaluate(()=>toilLodPass());await p.waitForTimeout(500)}
   for(let i=0;i<80;i++){const ok=await p.evaluate(()=>{const l=document.querySelector('main.stage img.klk-smu');return !!l&&l.src.indexOf('data:image/png')===0});if(ok)break;await p.waitForTimeout(200)}await p.waitForTimeout(800);
   clip=await p.evaluate(()=>{const i=document.querySelector('main.stage img.kfxon');if(!i)return null;const r=i.getBoundingClientRect();return{x:Math.max(0,r.left),y:Math.max(0,r.top),width:Math.min(r.width,innerWidth-r.left),height:Math.min(r.height,innerHeight-r.top)}})}
  else{await p.evaluate(()=>{toilReveal({look:'dep',mk:1},()=>{})});
   let ok=false;for(let i=0;i<60&&!ok;i++){await p.waitForTimeout(250);ok=await p.evaluate(()=>{const l=document.querySelector('.ktrv-pw img.klk-smu');if(!l)return false;const w=l.getBoundingClientRect().width;return w>230&&l.src.indexOf('data:image/png')===0})}
   for(let k=0;k<4;k++){await p.evaluate(()=>toilLodPass());await p.waitForTimeout(500)}await p.waitForTimeout(2600);
   clip=await p.evaluate(()=>{const e=document.querySelector('.ktrv-pw')||document.querySelector('.ktrv-fig');const r=e.getBoundingClientRect();return{x:Math.max(0,r.left),y:Math.max(0,r.top),width:Math.min(r.width,innerWidth-Math.max(0,r.left)),height:Math.min(r.height,innerHeight-Math.max(0,r.top))}})}
  if(nm==='warm')continue;/* first pass only lets the page settle onto the stage */
  if(!clip){console.log('noclip',lv,d);continue}
  await p.screenshot({path:`${OUT}/${PL}-${nm}-${d}-raw.png`,clip});
  if(PL==='B'){await p.evaluate(()=>{document.querySelectorAll('.ktrv,.ktrv-fig,.kmov').forEach(e=>e.remove());try{closeModal()}catch(e){}})}}
 console.log(JSON.stringify({done:PL,errs}));await b.close()})();
