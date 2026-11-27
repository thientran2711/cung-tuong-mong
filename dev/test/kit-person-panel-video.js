/* KIT §6.4b person panel B — short video per device: open Hậu cung → tap a person → switch the 3 tabs → tap an act.
   usage: node dev/test/kit-person-panel-video.js <url> <W>x<H> <outdir> <tag>   → <outdir>/<tag>.webm (convert with ffmpeg) */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,SZ,OUT,TAG]=process.argv;const [W,H]=SZ.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:1,recordVideo:{dir:OUT+'/raw-'+TAG,size:{width:W,height:H}}});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300);window.kitRoulette=function(){}});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:90000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{flip=function(){}}catch(e){}for(let i=0;i<2;i++){try{nextBuoi()}catch(e){}Q.length=0}
  try{kn();for(const v of rivals){S.met[v.id]=1};for(const v of rivals)k61Meet(v,"gặp",3)}catch(e){}
  Q.length=0;if(m)m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');tab='act';try{render()}catch(e){}});
 await p.waitForTimeout(1500);
 const tap=async sel=>{const e=await p.$(sel);if(!e)return 0;const bx=await e.boundingBox();if(!bx)return 0;await p.mouse.move(bx.x+bx.width/2,bx.y+bx.height/2,{steps:8});await p.waitForTimeout(250);await e.click();return 1};
 /* open Hậu cung (bottom bar), Phi tần sub-tab */
 await p.evaluate(()=>{const b=[...document.querySelectorAll('button,.tab,[data-tab]')].find(e=>e.offsetParent&&e.textContent.trim()==='Hậu cung');if(b)b.click();else{tab='court';render()}});await p.waitForTimeout(1500);
 await p.evaluate(()=>{const b=[...document.querySelectorAll('#panel button,#panel .pct,#panel [data-sub]')].find(e=>e.offsetParent&&e.textContent.trim()==='Phi tần');if(b)b.click()});await p.waitForTimeout(1500);
 /* tap a person in the strip */
 await p.evaluate(()=>{const a=[...document.querySelectorAll('#panel [data-pi]')].filter(e=>e.offsetParent&&!e.classList.contains('parr'));if(a[1])a[1].click()});await p.waitForTimeout(1800);
 for(const v of ['info','rel','act']){await tap(`#panel .pc .kppt .pct[data-kppv="${v}"]`);await p.waitForTimeout(1500)}
 /* tap an act (first open one) */
 await tap('#panel .pc .kppv[data-v="act"] .pcb>button.ka:not(.kdis)');await p.waitForTimeout(2500);
 const v=p.video();await ctx.close();const src=await v.path();fs.renameSync(src,`${OUT}/${TAG}.webm`);await b.close()})().catch(e=>{console.error(e);process.exit(1)});
