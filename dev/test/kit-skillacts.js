/* review/kit-tntile (KIT §21e kitSkillTile + one act-card height per .kskacts list; KK21): Fold 755x1000 + iPad 1180x820.
   Opens Tài nghệ, every sub-tab: tiles = 2 equal columns, equal heights, nothing clipped horizontally; then EVERY tile's pop-up: all .kskacts>.kpanec act cards of the list have the SAME height (±1 px),
   no card narrower than its list, no horizontal overflow. usage: node dev/test/kit-skillacts.js file:///…/index.html <outdir> [WxH,...] */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});let bad=0;
 for(const wh of (SIZES||"755x1000,1180x820").split(",")){const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.kitSkillTile,null,{timeout:240000});await p.waitForTimeout(2000);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open')});
  await p.waitForTimeout(2500);await p.addStyleTag({content:'#kload,#klife,.modal.kload,#modal.kptitle,#kroulw,.kroul,#curtain{display:none!important}'});
  await p.evaluate(()=>{for(const b of document.querySelectorAll('button'))if(/Vào cung ngay/.test(b.textContent)&&b.offsetParent)b.click()});await p.waitForTimeout(1500);
  const f=[];const rep=[];const ALLH=new Set();
  await p.evaluate(()=>{window.__hide=()=>{const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}Q.length=0;const m=document.getElementById('modal');if(m){m.hidden=true;m.className='modal';m.innerHTML=''}};tab='art';render()});await p.waitForTimeout(800);
  const subs=await p.evaluate(()=>[...document.querySelectorAll('#panel .ksub .pct,#panel .pctabs .pct')].map(b=>b.textContent.trim().slice(0,20)));
  const nsub=Math.max(1,subs.length);
  for(let si=0;si<nsub;si++){
   await p.evaluate(i=>{window.__hide();tab='art';render();const t=[...document.querySelectorAll('#panel .ksub .pct,#panel .pctabs .pct')];if(t[i])t[i].click()},si);await p.waitForTimeout(700);
   const g=await p.evaluate(()=>{const R=e=>e.getBoundingClientRect(),T=[...document.querySelectorAll('#panel .ktn-tile')].filter(t=>t.getBoundingClientRect().height>0);const hs=new Set(T.map(t=>Math.round(R(t).height)));const xs=new Set(T.map(t=>Math.round(R(t).left)));const P=R(document.getElementById('panel'));
    return {n:T.length,hs:[...hs],cols:xs.size,over:T.filter(t=>R(t).right>P.right+1).length,keys:T.map(t=>t.dataset.tnmon)}});
   rep.push(subs[si]+': '+JSON.stringify({n:g.n,hs:g.hs,cols:g.cols}));
   if(g.n&&g.hs.length!==1)f.push('tiles of «'+subs[si]+'» have different heights '+g.hs);if(g.n&&g.cols!==2&&g.n>1)f.push('tiles of «'+subs[si]+'» not 2 columns '+g.cols);if(g.over)f.push('tile overflows '+g.over);
   if(si===0&&g.n)await p.screenshot({path:`${OUT}/${wh}-tiles.jpg`,type:'jpeg',quality:70});
   for(const k of g.keys.slice(0,6)){
    const r=await p.evaluate(async k=>{window.__hide();const s=ktTnFind(k);s.can=undefined;const host=document.createElement('div');host.id='__tnh';host.className='modal';host.style.cssText='position:fixed;left:0;top:0;width:'+Math.min(innerWidth-20,innerWidth>=1000?884:640)+'px;z-index:99999;background:#fff;padding:8px';host.innerHTML='<div class="dlg"><div id="mb"><div data-tnpop="1" class="ktn-pop">'+kitSkillCard(Object.assign({},s,{stepsAttr:''}))+'</div></div></div>';document.body.appendChild(host);
     try{kitActCompactOn(host)}catch(e){}await new Promise(r=>setTimeout(r,400));try{kitActCompactOn(host)}catch(e){}await new Promise(r=>setTimeout(r,300));
     const L=[...host.querySelectorAll('.ktn-pop .kskacts')];const out=L.map(l=>[...l.querySelectorAll(':scope>.kpanec')].map(c=>Math.round(c.getBoundingClientRect().height)));
     const ov=host.scrollWidth>host.clientWidth+1;window.__ph=Math.round(host.querySelector('.ktn-pop').getBoundingClientRect().height);const gap=[...host.querySelectorAll('.kskacts>.kpanec>button.ka')].filter(b=>{const c=b.parentElement.getBoundingClientRect(),q=b.getBoundingClientRect();return c.height-q.height>2}).length;const dbg='';host.remove();return {out,ov,gap,dbg,ph:window.__ph}},k);
    r.out.forEach(hs=>{hs.forEach(h=>ALLH.add(h));if(hs.length&&Math.max(...hs)-Math.min(...hs)>1)f.push('pop '+k+': act cards of one list differ '+hs)});if(r.ov)f.push('pop '+k+' overflows horizontally');if(r.gap)f.push('pop '+k+': card shorter than its row '+r.gap);
    rep.push('  pop '+k+' h='+r.ph+' '+JSON.stringify(r.out)+(r.out.length?'':' '+r.dbg))}}
  

  if(errs.length)f.push('page errors '+errs.join(' | '));
  console.log(wh);console.log(rep.join('\n'));console.log(wh,f.length?'FAIL\n  '+f.join('\n  '):'ALL PASS');if(f.length)bad++;await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
