/* review/kit-fitfast-r3 (KIT §98.17 K-BARE-GRID own test, MAIN 130 nit): the tier picker (kitOptTier) never chooses 2 columns for §93.7 bare selection cards (title only, kitBareOpts)
   when that leaves a title column narrower than KIT_ODFIT.bare em («one word per line»). INVARIANT test (the fault could not be reproduced on the real card: .kat has a floor of ~11.9 em): kitBareNarrow() exists (§98.17) and a bare card's title column is >= KIT_ODFIT.bare em in lists 95..800 px wide and after a kitOptTier pick of a narrow 2-card list. FAILS on main 502c48c9 (before §98.17).
   usage: node dev/test/kit-bare-grid.js <url file:///…/index.html> <outdir> [WxH,...] */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});let bad=0;
 for(const wh of (SIZES||"755x1000,1180x820").split(",")){const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('console',m=>{if(/^DBG/.test(m.text()))console.log(m.text())});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.kitScene&&window.kitBareOpts&&typeof kitOptTier==='function',null,{timeout:240000});await p.waitForTimeout(2000);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}tab='act';render()});
  await p.waitForTimeout(2500);await p.addStyleTag({content:'#kload,#klife,.modal.kload,#modal.kptitle,#kroulw,.kroul,#curtain{display:none!important}'});
  await p.evaluate(()=>{for(const b of document.querySelectorAll('button'))if(/Vào cung ngay/.test(b.textContent)&&b.offsetParent)b.click()});await p.waitForTimeout(3000);
  const f=[];
  const r=await p.evaluate(async()=>{const out={};out.has=typeof kitBareNarrow==='function';out.bare=typeof KIT_ODFIT!=='undefined'?KIT_ODFIT.bare:null;
   const Sc=kitScene.open({bg:typeof IMG_U==="function"?IMG_U("img/ev-te-le.webp"):"img/ev-te-le.webp",intro:0});window.__Sc=Sc;await Sc.pair({me:S,storyTitle:"Tuyển tú",story:['<div class="kpmain"><p>Tú nữ đứng thành hàng trước điện.</p></div>'],choice:[kitBareOpts([{n:"x"}],()=>{})]});Sc.show();await new Promise(r=>setTimeout(r,800));
   const host=document.querySelector('.kscn .kscn-opts')?.parentElement||document.querySelector('.kscn');
   const mk=(w,n)=>{const g=kitBareOpts(Array.from({length:n||1},()=>({n:'Làm quen với một tú nữ lạ mặt'})),()=>{});g.style.cssText='width:'+w+'px;max-width:none';const c=g.querySelector('button.ka.kbare');host.appendChild(g);return {g,c}};
   if(out.has){out.ems={};for(const w of [95,150,200,300,420,560,800]){const a=mk(w),k=a.c.querySelector('.kat'),fs=parseFloat(getComputedStyle(k).fontSize)||13;out.ems[w]=+(k.getBoundingClientRect().width/fs).toFixed(1);a.g.remove()}
    const g3=mk(200,2);try{kitOptTier(g3.g)}catch(e){}const k3=g3.c.querySelector('.kat'),fs3=parseFloat(getComputedStyle(k3).fontSize)||13;out.pickEm=+(k3.getBoundingClientRect().width/fs3).toFixed(1);out.pickKol=g3.g.dataset.kol;g3.g.remove()}
   try{Sc.close()}catch(e){}return out});
  console.log(wh,JSON.stringify(r));
  if(!r.has)f.push('kitBareNarrow does not exist (no §98.17)');else{Object.entries(r.ems).forEach(([w,em])=>{if(em<(r.bare||9)-.05)f.push('bare card in a '+w+' px list: title column '+em+' em < '+(r.bare||9))});if(r.pickEm<(r.bare||9)-.05)f.push('tier pick leaves a '+r.pickEm+' em title column (cols '+r.pickKol+')')}
  if(errs.length)f.push('page errors '+errs.join(' | '));console.log(wh,f.length?'FAIL\n  '+f.join('\n  '):'ALL PASS');if(f.length)bad++;await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
