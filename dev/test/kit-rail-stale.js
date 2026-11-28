const {chromium}=(require('./lib/bigpage'),require('playwright'));
/* review/kit-ring5 (RING-DESIGN-5 c): the stage rail never keeps a stale inline slot (left/right/flex-direction left by the header dock) on a stage: injects a stale slot, repaints, flips tabs.
   usage: node dev/test/kit-rail-stale.js <url> <W> <H> [flips] */
const [,,URL,W,H,N]=process.argv;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:+W,height:+H},deviceScaleFactor:1,hasTouch:true,isMobile:+W<1100,serviceWorkers:'block'});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,150)));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.kitStageRail,null,{timeout:240000});await p.waitForTimeout(2000);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}tab='act';render()});
 await p.waitForTimeout(2500);await p.addStyleTag({content:'#kload,#klife,.modal.kload,#modal.kptitle,#kroulw,.kroul,#curtain{display:none!important}'});
 await p.evaluate(()=>{for(const b of document.querySelectorAll('button'))if(/Vào cung ngay/.test(b.textContent)&&b.offsetParent)b.click()});await p.waitForTimeout(4000);
 const tabs=await p.evaluate(()=>[...document.querySelectorAll('#tabs [data-tab]')].map(x=>x.dataset.tab));console.log('tabs',tabs.join(','));
 let bad=0;const log=[];
 await p.evaluate(()=>{tab='act';render()});await p.waitForTimeout(600);
 const inj=await p.evaluate(()=>{const k=document.getElementById('krail');if(!k)return 'norail';k.style.left='600px';k.style.right='20px';k.style.flexDirection='row';kitStageRail.paint();const st=document.getElementById('stage');const S=st.getBoundingClientRect(),R=k.getBoundingClientRect();return {l:Math.round(R.left-S.left),il:k.style.left,ir:k.style.right,fd:k.style.flexDirection}});console.log('inject',JSON.stringify(inj));if(inj==='norail'||inj.l>20||inj.il||inj.ir||inj.fd){bad++;log.push('stale slot kept '+JSON.stringify(inj))}
 for(let i=0;i<+(N||30);i++){const t=tabs[i%tabs.length];
  await p.evaluate(t=>{try{tab=t;render()}catch(e){}const m=document.getElementById('modal');if(m)m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}},t);
  await p.waitForTimeout(i%3?60:700);
  const r=await p.evaluate(()=>{const k=document.getElementById('krail'),st=document.getElementById('stage');if(!k||!st||st.getBoundingClientRect().height<40||k.parentNode!==st)return null;const R=k.getBoundingClientRect(),S=st.getBoundingClientRect();return {l:Math.round(R.left-S.left),t:Math.round(R.top-S.top),il:k.style.left,it:k.style.top,fd:k.style.flexDirection,cls:k.className}});
  if(r&&(r.l>20||r.il||r.fd)){bad++;log.push(t+' '+JSON.stringify(r))}}
 console.log(+W+'x'+H,bad?'FAIL':'ALL PASS','rail stale:',bad,log.slice(0,5).join(' | '),errs.join('|'));await b.close();process.exit(bad?1:0)})();
