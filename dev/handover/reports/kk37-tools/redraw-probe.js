/* who re-draws the Tài nghệ panel while she is idle? counts [data-ktsv] node replacements and the caller of each render() / panel write for 25 s.
   usage: node redraw-probe.js <index.html> WxH */
const {chromium}=require('playwright');const path=require('path');const [,,SRC,WH]=process.argv;const [W,H]=(WH||'755x1000').split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click())},300)});
 const p=await ctx.newPage();await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto('file://'+path.resolve(SRC),{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(2000);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;document.getElementById('modal').hidden=true;
  const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');tab='art';try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){}});
 await p.waitForTimeout(1500);await p.evaluate(()=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn,#kmrew,.km-reward').forEach(e=>e.remove());if(Q.length){Q.length=0;document.getElementById('modal').hidden=true}if(tab!=='art'){tab='art';render()}});
 await p.evaluate(()=>{window.__R=[];window.__T0=performance.now();const st=()=>(new Error().stack||'').split('\n').slice(2,7).map(s=>s.trim().replace(/\(.*index\.html/,'(').replace(/^at /,'')).join(' < ');
  const r0=window.render;window.render=function(){__R.push({t:Math.round(performance.now()-__T0),k:'render',s:st()});return r0.apply(this,arguments)};
  const mo=new MutationObserver(ms=>{for(const m of ms)for(const n of m.removedNodes)if(n.nodeType===1&&(n.matches&&n.matches('[data-ktsv]')||n.querySelector&&n.querySelector('[data-ktsv]'))){__R.push({t:Math.round(performance.now()-__T0),k:'ktsv removed',s:st()});return}});mo.observe(document.body,{subtree:true,childList:true})});
 /* idle 12 s, then open + close one info popup (real tap on the first .kskn of the first sub-tab), idle 12 s */
 await p.waitForTimeout(12000);
 const q=await p.evaluate(()=>{const e=[...document.querySelectorAll('#panel .kskn,#panel .kgl')].find(e=>e.getClientRects().length);if(!e)return null;e.scrollIntoView({block:'center'});const r=e.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]});
 if(q){await p.evaluate(()=>__R.push({t:Math.round(performance.now()-__T0),k:'--- info tap'}));await p.touchscreen.tap(q[0],q[1]);await p.waitForTimeout(1500);
  const x=await p.evaluate(()=>{const e=[...document.querySelectorAll('#modal .kx,#modal [aria-label="Đóng"],#modal .kclose,#modal button')].find(e=>/✕|×/.test(e.textContent)&&e.getClientRects().length);if(!e)return null;const r=e.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]});
  await p.evaluate(()=>__R.push({t:Math.round(performance.now()-__T0),k:'--- close tap'}));if(x)await p.touchscreen.tap(x[0],x[1]);}
 await p.waitForTimeout(12000);
 const R=await p.evaluate(()=>__R);const agg={};for(const r of R){const k=r.k+' :: '+(r.s||'');agg[k]=(agg[k]||[]);agg[k].push(r.t)}
 for(const [k,ts] of Object.entries(agg))console.log(ts.length+'x',k.slice(0,400),' @',ts.slice(0,12).join(','));await b.close()})();
