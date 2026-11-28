/* KIT §6.4b person INFO panel — short video per device: open Hậu cung → Phi tần → tap a person → Thông tin → Giao tình → tap «Tìm gặp» (result / walk) → back → tap «Ghé cung» (walk to her palace on Dư đồ).
   usage: node dev/test/kit-person-panel-video.js <url> <W>x<H> <outdir> <tag>   → <outdir>/<tag>.webm (convert with ffmpeg) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');
const [,,BASE,SZ,OUT,TAG]=process.argv;const [W,H]=SZ.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:1,recordVideo:{dir:OUT+'/raw-'+TAG,size:{width:W,height:H}}});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300);window.kitRoulette=function(){}});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:90000});await p.waitForTimeout(+(process.env.BOOTW||6000));
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{flip=function(){}}catch(e){}for(let i=0;i<2;i++){try{nextBuoi()}catch(e){}Q.length=0}
  try{kn();for(const v of rivals){S.met[v.id]=1};for(const v of rivals)k61Meet(v,"gặp",3)}catch(e){}
  Q.length=0;if(m)m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');tab='act';try{render()}catch(e){}});
 await p.waitForTimeout(1500);
 const tap=async sel=>{const l=p.locator(sel).first();if(!await l.count())return 0;const bx=await l.boundingBox().catch(()=>null);if(!bx)return 0;await p.mouse.move(bx.x+bx.width/2,bx.y+bx.height/2,{steps:8});await p.waitForTimeout(250);await p.locator(sel).first().click({timeout:5000}).catch(()=>{});return 1};
 /* open Hậu cung (bottom bar), Phi tần sub-tab */
 await p.evaluate(()=>{const b=[...document.querySelectorAll('button,.tab,[data-tab]')].find(e=>e.offsetParent&&e.textContent.trim()==='Hậu cung');if(b)b.click();else{tab='court';render()}});await p.waitForTimeout(1500);
 await p.evaluate(()=>{const b=[...document.querySelectorAll('#panel button,#panel .pct,#panel [data-sub]')].find(e=>e.offsetParent&&e.textContent.trim()==='Phi tần');if(b)b.click()});await p.waitForTimeout(1500);
 /* tap a person in the strip */
 await p.evaluate(()=>{const a=[...document.querySelectorAll('#panel [data-pi]')].filter(e=>e.offsetParent&&!e.classList.contains('parr'));if(a[1])a[1].click()});await p.waitForTimeout(1800);
 for(const v of ['info','rel']){await tap(`#panel .pc .kppt .pct[data-kppv="${v}"]`);await p.waitForTimeout(1600)}
 await tap('#panel .pc .kppbtns>button:not([disabled])');await p.waitForTimeout(3000);
 await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;document.querySelectorAll('#rtoast').forEach(e=>e.classList.remove('on'));const b=[...document.querySelectorAll('button,.tab,[data-tab]')].find(e=>e.offsetParent&&e.textContent.trim()==='Hậu cung');if(b)b.click();else{tab='rv';render()}});await p.waitForTimeout(1800);
 await tap('#panel .pc .kppbtns>button.alt:not([disabled])');await p.waitForTimeout(3000);
 const v=p.video();await ctx.close();const src=await v.path();fs.renameSync(src,`${OUT}/${TAG}.webm`);await b.close()})().catch(e=>{console.error(e);process.exit(1)});
