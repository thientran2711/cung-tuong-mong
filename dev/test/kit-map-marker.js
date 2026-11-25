/* review/kit-map-marker (owner 24/11 ~22:00Z «Ta đang ở đây» hidden behind the plaque «Vĩnh Hòa»): her marker (.kmmapmk) is the TOP layer on the map:
   elementFromPoint at the marker's centre AND at 4 points of its box lands inside .kmmapmk, with every other plaque forced to overlap it (clones of other spots moved onto the marker, later in the DOM);
   Dư đồ (tab go) at Fold 755x1000 + iPad 1180x820. usage: node dev/test/kit-map-marker.js <url file:///…/index.html> <outdir> [WxH,...]   FAILS on main 502c48c9 */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});let bad=0;
 for(const wh of (SIZES||"755x1000,1180x820").split(",")){const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitMeMapMark==='function',null,{timeout:240000});await p.waitForTimeout(2000);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}});
  await p.waitForTimeout(2500);await p.addStyleTag({content:'#kload,#klife,.modal.kload,#modal.kptitle,#kroulw,.kroul,#curtain{display:none!important}'});
  await p.evaluate(()=>{for(const b of document.querySelectorAll('button'))if(/Vào cung ngay/.test(b.textContent)&&b.offsetParent)b.click()});await p.waitForTimeout(3000);
  const f=[];await p.addStyleTag({content:'#modal,#dawn,#kxcatch,.kmov,#kmrew,[class*=kmrew]{display:none!important}'});/* a random event modal must not cover the map in the shot */
  await p.evaluate(()=>{tab='go';render();const m=document.getElementById('modal');if(m)m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}});await p.waitForTimeout(2500);
  const r=await p.evaluate(async()=>{for(let att=0;att<8;att++){const r=await (async()=>{const mk=document.querySelector('.mspot.here .kmmapmk');if(!mk)return {nomark:1};mk.scrollIntoView({block:'center',inline:'center'});for(let i=0;i<20&&mk.getBoundingClientRect().width<2;i++)await new Promise(r=>setTimeout(r,200));await new Promise(r=>setTimeout(r,300));
   mk.style.setProperty('pointer-events','auto','important');mk.querySelectorAll('img').forEach(i=>i.style.setProperty('pointer-events','auto','important'));/* elementFromPoint skips pointer-events:none */const here=mk.closest('.mspot'),host=here.parentElement,R=mk.getBoundingClientRect();
   /* worst case: every OTHER spot's clone laid over the marker, appended AFTER her spot */
   const others=[...host.querySelectorAll('.mspot:not(.here)')];others.forEach(o=>{const c=o.cloneNode(true);c.dataset.cl='1';c.style.left=(R.left-host.getBoundingClientRect().left-10)+'px';c.style.top=(R.top-host.getBoundingClientRect().top-6)+'px';c.style.width='90px';c.style.height='70px';c.style.right='auto';host.appendChild(c)});
   await new Promise(r=>setTimeout(r,100));const pts=[[.5,.5],[.5,.2],[.5,.8],[.35,.5],[.65,.5]],bad=[];const vis=e=>e.getBoundingClientRect();
   pts.forEach(([x,y])=>{const px=R.left+R.width*x,py=R.top+R.height*y;if(px<0||py<0||px>innerWidth||py>innerHeight){bad.push('offscreen '+x+','+y);return}const el=document.elementFromPoint(px,py);if(!el||!(el.closest('.kmmapmk')))bad.push(x+','+y+' → '+(el?(()=>{let c=[],e=el;for(let i=0;i<5&&e;i++,e=e.parentElement)c.push((e.tagName+(e.id?'#'+e.id:'')+(e.className&&e.className.toString?'.'+e.className.toString().split(' ')[0]:'')).slice(0,24));return c.join('<')})():'null'))});
   const n=others.length;host.querySelectorAll('[data-cl]').forEach(c=>c.remove());if(!mk.isConnected||R.width<2)return {stale:1};/* render() rebuilt the map under the probe: measure again */return {bad,n,box:[Math.round(R.left),Math.round(R.top),Math.round(R.width),Math.round(R.height)]}})();if(!r.stale||r.nomark)return r;await new Promise(r=>setTimeout(r,400))}return {nomark:1}});
  console.log(wh,JSON.stringify(r));if(r.nomark)f.push('no marker on the map');else if(r.bad.length)f.push('marker not topmost at '+r.bad.join(' | '));
  await p.screenshot({path:`${OUT}/${wh}-map.jpg`,type:'jpeg',quality:80});
  if(errs.length)f.push('page errors '+errs.join(' | '));console.log(wh,f.length?'FAIL\n  '+f.join('\n  '):'ALL PASS');if(f.length)bad++;await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
