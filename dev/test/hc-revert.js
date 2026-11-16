/* review/hc-portrait-revert: card frame = standard frame. usage: node dev/test/hc-revert.js <url> <WxH> <outdir> [shot=1]
   Per Hậu cung sub-tab: aspect (w/h) of the frame image (img.kfr) in the card cell, header avatar and roster strip (all must be 550/1037 +-2%),
   gap name bottom -> first frame art row (KIT_FRW top, px), roster label (.kpstrip text) top vs pane bar bottom. */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,SZ,OUT,SHOT]=process.argv;const [W,H]=SZ.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:1,reducedMotion:'reduce',userAgent:W<1100?'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1':undefined});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();p.setDefaultTimeout(60000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await p.waitForTimeout(2000);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}
  kn();for(const v of rivals){S.met[v.id]=1};try{for(const v of rivals)k61Meet(v,"gặp",3);k61Meet(S.emp,"gặp",3)}catch(e){};try{menInit();(S.men||[]).slice(0,4).forEach(m=>{try{k61Meet(m,"gặp",3)}catch(e){}})}catch(e){}
  Q.length=0;if(m)m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');try{render()}catch(e){}});
 await p.waitForTimeout(1500);
 const AR=550/1037;const R={};
 for(const [t,n] of [['court','chiton'],['rv','phitan'],['men','namnhan'],['staff','cungnhan']]){
  try{await p.evaluate(t=>{Q.length=0;const mo=document.getElementById('modal');if(mo)mo.hidden=true;document.body.classList.remove('kbk-open');tab=t;try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){}},t)}catch(e){R[n]={err:e.message.slice(0,80)};continue}
  await p.waitForTimeout(2200);await p.waitForFunction(()=>[...document.querySelectorAll('#panel img.kfr,header img.kfr')].every(i=>i.complete),null,{timeout:30000}).catch(()=>{});
  try{R[n]=await p.evaluate(AR=>{const vis=e=>e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden';
   const asp=sel=>[...document.querySelectorAll(sel)].filter(vis).map(i=>{const r=i.getBoundingClientRect();return r.height?+(r.width/r.height/AR).toFixed(3):0});
   const card=asp('#panel .pc>.pcl>.pcp img.kfr'),head=asp('header img.kfr, #me-p img.kfr'),strip=asp('#panel .kpstrip img.kfr, #panel .kpst img.kfr, #panel [class*=strip] img.kfr');
   const pc=document.querySelector('#panel .pc>.pcl'),nm=pc&&pc.querySelector('.pcname'),cell=pc&&pc.querySelector(':scope>.pcp');let gap=null;
   if(nm&&cell){const fr=cell.querySelector('img.kfr');const F=fr&&window.kitFrw&&kitFrw(fr.getAttribute('src'));const r=cell.getBoundingClientRect();const k=cell.querySelector('.kin').getBoundingClientRect();
    gap=Math.round(k.top+(F?F[1][1]:0)*k.height/1037-nm.getBoundingClientRect().bottom)}
   const bar=document.querySelector('.kpane-bar,.kpbar,#kpbar');const lab=[...document.querySelectorAll('#panel .kpstrip *')].find(e=>/cung$/.test((e.textContent||'').trim())&&e.children.length===0);
   return{card,head,strip,gap,bar:bar&&Math.round(bar.getBoundingClientRect().bottom),lab:lab&&Math.round(lab.getBoundingClientRect().top),sw:document.documentElement.scrollWidth<=innerWidth+1,wideSrc:[...document.querySelectorAll('img.kfr')].some(i=>/-w\.webp/.test(i.src))}},AR)}catch(e){R[n]={err:e.message.slice(0,80)}}
  if(SHOT)await p.screenshot({path:`${OUT}/${n}.jpg`,type:'jpeg',quality:55})}
 console.log(JSON.stringify({SZ,R,errs}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
