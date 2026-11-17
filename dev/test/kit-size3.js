/* kit-size3.js — kit-size #3 sheets: every frame kind at S / M / L / XL (jksize.js kszSheet3) + BEFORE (#2 sample, review/kit-size 242800da).
   usage: node dev/test/kit-size3.js <url/index.html> <W>x<H> <outdir> <before jksize.js> <after jksize.js> [kinds=all]
   TAGSZ / DPR env as kit-size-ba.js (Fold: 590x820 DPR 2.4390 TAGSZ=755x1000). Writes <outdir>/k3-<tag>-<kind>-{b,a}.png and prints metrics:
   per size: frame w/h, empty px under the right column and around the left column, what the content picks, button grid, picture crop. */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,SZ,OUT,BEF,AFT,KS='news,rule,notice,choice,result,info,night,intel,evidence,reward,week,threat,person,end']=process.argv;const [W,H]=SZ.split('x').map(Number);const TAG=process.env.TAGSZ||SZ;
async function boot(){const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(process.env.DPR||2),reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL+(URL.includes('?')?'&':'?')+'khost=0',{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
 for(let i=0;i<40;i++){const st=await p.evaluate(()=>{const k=document.getElementById('kroul');if(k){const b=[...k.querySelectorAll('button')].find(b=>/Bỏ qua/.test(b.textContent));if(b)b.click();return 'r'}return document.getElementById('kroulw')?'w':'n'});if(st==='n'&&i>4)break;await p.waitForTimeout(700)}
 await p.evaluate(()=>{try{nlAccept(true)}catch(e){}});await p.waitForTimeout(2500);
 await p.addStyleTag({content:'#krottip{display:none!important}body>*:not(#kszsheet){visibility:hidden!important}#kszsheet .kszn{max-width:560px}#kszsheet{position:absolute!important;inset:0 auto auto 0!important;height:auto!important;min-height:100%;overflow:visible!important;width:100%}'});
 await p.evaluate(()=>{window.kitKnown=()=>true;window.isKnown61=()=>true;window.k61Named=()=>true;window.met61=()=>true;window.kitKnownName=()=>true});
 if(W<H)await p.evaluate(()=>{document.documentElement.classList.remove('kv2');document.documentElement.classList.add('kv1')});return{b,p,errs}}
async function settle(p){await p.waitForTimeout(1500);await p.waitForFunction(()=>[...document.querySelectorAll('#kszsheet img')].every(i=>i.complete),null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(1200)}
async function shot(p,sel,path){await p.evaluate(()=>{const s=document.getElementById('kszsheet');s.style.position='absolute';s.style.inset='0 auto auto 0';s.style.width='max-content';s.style.minWidth='100%';s.style.height='auto';s.style.overflow='visible'});
 const d=await p.evaluate(()=>{const s=document.getElementById('kszsheet').getBoundingClientRect();return{w:s.width,h:s.height}});
 await p.setViewportSize({width:Math.min(Math.max(W,Math.ceil(d.w)+20),6000),height:Math.min(Math.max(H,Math.ceil(d.h)+20),6000)});await p.waitForTimeout(900);
 await p.locator(sel).first().screenshot({path});await p.setViewportSize({width:W,height:H})}
(async()=>{const res={TAG,after:{},before_errs:null,after_errs:null};
 /* AFTER */
 {const {b,p,errs}=await boot();await p.addScriptTag({content:fs.readFileSync(AFT,'utf8')});
  for(const k of KS.split(',')){await p.evaluate(k=>{document.querySelectorAll('.kmov,#kroul,#kroulw,#krottip').forEach(e=>e.remove());kszSheet3(k)},k);await settle(p);await p.evaluate(k=>kszSheet3(k),k);await settle(p);
   await p.evaluate(()=>document.querySelectorAll('#kszsheet .ksz3').forEach(kitFrameApply3));await p.waitForTimeout(500);
   const pick=await p.evaluate(k=>kszPick3Report(k),k);await p.evaluate(()=>document.querySelectorAll('#kszsheet .ksz3').forEach(kitFrameApply3));await p.waitForTimeout(400);
   await p.evaluate(pk=>document.querySelectorAll('#kszsheet [data-k3]').forEach(c=>{const K=c.dataset.k3;c.querySelector('.k3pick').textContent=`this content picks → ${pk[K]}${pk[K]===K?" ✓":" ✗"}`}),pick);
   res.after[k]={pick,frames:await p.evaluate(()=>[...document.querySelectorAll('#kszsheet .ksz3')].map(f=>{const q=f.getBoundingClientRect(),Bd=f.querySelector('.k3body').getBoundingClientRect(),R=f.querySelector('.k3right'),L=f.querySelector('.k3body>.kszfig,.k3body>.k3mpor,.k3body>.k3mpic');
    const rb=Math.max(...[...R.children].map(c=>c.getBoundingClientRect().bottom));const lr=L?L.getBoundingClientRect():null;const ev=f.querySelector('.k3ev,.k3mpic');const evr=ev?ev.getBoundingClientRect():null;const im=ev&&ev.querySelector('img');
    const g=f.querySelector('.k3btns');return{K:f.dataset.ksz,w:q.width|0,h:q.height|0,emptyRight:Math.max(0,(Bd.bottom-12-rb)|0),leftGapTop:lr?Math.max(0,(lr.top-Bd.top-10)|0):null,leftGapBot:lr?Math.max(0,(Bd.bottom-12-lr.bottom)|0):null,
     ev:evr?{w:evr.width|0,h:evr.height|0,src:(im&&im.src||'').replace(/^.*\//,''),pos:im&&im.style.objectPosition}:null,rightScrolls:R.scrollHeight>R.clientHeight+1,
     grid:g?{cols:getComputedStyle(g).getPropertyValue('--k3c'),btns:[...g.children].map(b=>b.dataset.kbs+':'+b.style.getPropertyValue('--k3s')+':'+(b.getBoundingClientRect().width|0))}:null,hasDaHieu:/Đã hiểu|Đã rõ/.test(f.innerText),hasX:!!f.querySelector('.kit-x'),tag:(f.querySelector('.kt3')||{}).innerText||null}}))};
   for(const K of ['S','M','L','XL'])await p.locator(`#kszsheet [data-k3="${K}"]`).screenshot({path:`${OUT}/k3-${TAG}-${k}-${K}.png`})}
  res.after_errs=errs;await b.close()}
 /* BEFORE = the #2 builder on the M content (what the owner reviewed) */
 if(BEF!=='-'){const {b,p,errs}=await boot();await p.addScriptTag({content:fs.readFileSync(AFT,'utf8')});
  await p.evaluate(()=>{window.__sp3=kszSpecs3;window.__ev3=kszEvSrc3;window.__who3=kszWho3;['k-size','k-size-items','k-size3'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()})});
  await p.addScriptTag({content:'{'+fs.readFileSync(BEF,'utf8')+'\n}'});
  for(const k of KS.split(',')){await p.evaluate(k=>{document.querySelectorAll('.kmov,#kroul,#kroulw,#krottip,#kszsheet').forEach(e=>e.remove());const kk=window.kitKnown;window.kitKnown=()=>true;
    const sp=Object.assign({},__sp3()[k].M);const ev=sp.pic||(sp.who?"":(__ev3(sp)||"").replace(/^https?:\/\/[^\/]+\//,""));if(sp.who&&sp.pic)sp.ban=sp.pic;if(sp.who)delete sp.pic;else sp.pic=ev;
    const d=document.createElement('div');d.id='kszsheet';d.innerHTML=`<h2>BEFORE (#2) · ${k}</h2><div data-want="M">${kszFrame(sp)}</div>`.replace(/ loading="lazy"/g,'');document.body.appendChild(d);window.kitKnown=kk},k);
   await settle(p);await p.evaluate(()=>{kszFigFit(document.getElementById('kszsheet'));document.querySelectorAll('#kszsheet .kszf.kpanel').forEach(f=>kitFrameApply(f))});await p.waitForTimeout(600);
   await p.locator('#kszsheet [data-want]').screenshot({path:`${OUT}/k3-${TAG}-${k}-b.png`})}
  res.before_errs=errs;await b.close()}
 console.log(JSON.stringify(res))})().catch(e=>{console.error(e);process.exit(1)});
