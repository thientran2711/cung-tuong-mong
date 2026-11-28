/* kit-stage-r3-video.js — KIT-STAGE-R3 owner look videos (OD 26/11 ~18:55Z / ~19:00Z): REAL taps (touch on Fold, mouse on iPad), ≤ 30 s each.
   A «banbai»: an event choice (rg c1b, speaker + one figure §102.7) as Bàn bài — tap a card (lift + plate), ✕ (put back), tap another, ✓ (choose) → result.
   B «thego»: Dư đồ → tap a place → the place card as THẺ GỖ on the stage (§102.3) → tap a plaque (lift) → ✓ → she walks there → tap a person → the focus view's
   acts as THẺ GỖ on her right (§98.11) → tap a plaque → ✓.  Setup only (start, fire the event) runs in page code; every step the owner sees is a real tap.
   usage: node dev/test/kit-stage-r3-video.js <index.html> <outdir>   → <outdir>/{fold,ipad}-{banbai,thego}.webm + step shots. Never in git. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const [,,SRC,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const DEV=[["fold",755,1000],["ipad",1180,820]];
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});const html=fs.readFileSync(SRC);const R={};
 for(const [dn,W,H] of DEV)for(const vid of (process.env.ONLY||'banbai,thego').split(',')){const touch=W<1100;
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:touch,isMobile:touch,serviceWorkers:'block',ignoreHTTPSErrors:true,recordVideo:{dir:OUT,size:{width:W,height:H}}});
  await ctx.addInitScript(()=>{window.__bot=1;let s=777;Math.random=()=>{s=(s*1664525+1013904223)%4294967296;return s/4294967296}});
  await ctx.route('http://ctm.test/**',r=>r.fulfill({status:200,body:html,contentType:'text/html; charset=utf-8'}));
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>{if(!/Unexpected token '<'/.test(String(e)))errs.push(String(e).slice(0,160))});const L=[];
  const shot=async n=>{L.push(n);await p.screenshot({path:path.join(OUT,`${dn}-${vid}-${String(L.length).padStart(2,'0')}.png`)})};
  const tapEl=async(sel,i=0)=>{const r=await p.evaluate(([s,i])=>{const e=[...document.querySelectorAll(s)].filter(x=>x.getClientRects().length&&!x.disabled)[i];if(!e)return null;const q=e.getBoundingClientRect();return {x:q.left+q.width/2,y:q.top+Math.min(q.height/2,40)}},[sel,i]);if(!r)return false;if(touch)await p.touchscreen.tap(r.x,r.y);else await p.mouse.click(r.x,r.y);return true};
  await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded',timeout:120000});
  await p.waitForFunction(()=>typeof start==='function'&&typeof kstgPlace==='function',null,{timeout:120000});
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi/.test(e.textContent||''))e.remove()}document.getElementById('modal').hidden=true});
  await p.waitForFunction(()=>!/Sửa soạn nhập cung/.test(document.body.innerText),null,{timeout:90000}).catch(()=>{});await p.waitForTimeout(2000);
  await p.addStyleTag({content:'#dawn,.kroul,.kmbox,.kne,[class*=kmrew],#kxcatch,.kmov,#kroulw,#kdaytc,#klife{display:none!important}'});
  const o={};
  if(vid==='banbai'){o.fired=await p.evaluate(()=>{for(let k=0;k<4;k++){Q.length=0;document.getElementById('modal').hidden=true;if((()=>{try{S.evc=null;EVCW.length=0}catch(e){}/* clean day: LIVE jevc daily cap */return rgFire('c1b')})()){Q.length=1;showModal();return true}}return false});
   await p.waitForTimeout(2600);await shot('dealt');o.figs=await p.evaluate(()=>[...document.querySelectorAll('#modal .kstg-fig')].map(f=>f.className.replace('kstg-fig ','')).join('+'));
   await tapEl('#modal .opts.khand>button.kopt',0);await p.waitForTimeout(1600);await shot('lift 1');o.lift1=await p.evaluate(()=>!!document.querySelector('#modal .opts.khand>button.klift'));
   await tapEl('#modal .dlg>.khconf>.khx');await p.waitForTimeout(1000);await shot('put back');
   await tapEl('#modal .opts.khand>button.kopt',1);await p.waitForTimeout(1500);await shot('lift 2');
   const q0=await p.evaluate(()=>Q[0]);await tapEl('#modal .dlg>.khconf>.khok');await p.waitForTimeout(2800);await shot('chosen');o.chose=await p.evaluate(()=>!Q.length||!Q[0]||Q[0].pid!=='rg');}
  else{o.tab=await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.getClientRects().length&&x.textContent.trim()==='Dư đồ');if(!b)return null;const r=b.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2}});
   if(o.tab){if(touch)await p.touchscreen.tap(o.tab.x,o.tab.y);else await p.mouse.click(o.tab.x,o.tab.y)}await p.waitForTimeout(2000);await shot('map');
   /* setup: the place card of a closed / guarded place (the map tap on such a place opens exactly this card, j77Tap → j77Card) */
   o.place=await p.evaluate(()=>{const ks=places().map(x=>x.k).filter(x=>x!==S.place);for(const k of ['dtd','thu','tn','kn',...ks]){Q.length=0;try{j77Card(k)}catch(e){}if(Q[0]&&Q[0].opts&&Q[0].opts.filter(o=>!/^Thôi$/.test(o.n)).length>=2)return {k,t:Q[0].t,kind:kitKind(Q[0]),opts:Q[0].opts.map(o=>o.n)}}return null});
   await p.waitForTimeout(2600);await shot('place card');o.plaques=await p.evaluate(()=>[...document.querySelectorAll('.kpk .kfoc-b')].map(b=>b.textContent.replace(/\s+/g,' ').trim().slice(0,24)));
   await tapEl('.kpk .kfoc-b',0);await p.waitForTimeout(1600);await shot('plaque 1 lift');await tapEl('.kpk .khconf:not([hidden]) .khx');await p.waitForTimeout(1000);await shot('put back');
   await tapEl('.kpk .kfoc-b',1);await p.waitForTimeout(1600);await shot('plaque 2 lift');const t0=await p.evaluate(()=>Q[0]&&Q[0].t);await tapEl('.kpk .khconf:not([hidden]) .khok');await p.waitForTimeout(3000);await shot('chosen');o.chose=await p.evaluate(t0=>!Q[0]||Q[0].t!==t0,t0)}
  o.errs=errs;R[dn+'-'+vid]=o;await p.waitForTimeout(600);await ctx.close();const v=await p.video().path();fs.renameSync(v,path.join(OUT,`${dn}-${vid}.webm`))}
 console.log(JSON.stringify(R,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
