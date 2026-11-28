/* KIT §74 buổi transition (jbuoi): plays on every buổi change, 4 buổi + dawn variant, tap skip, Gọn = fade only, never blocks input, cleans up, 0 page errors.
   usage: node dev/test/buoi-transition.js http://localhost:<port>/index.html <outdir> [shots]   (local img/fx/buoi-* served from <worktree>/img/fx when CDN lacks them) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs'),path=require('path');
const [,,URL,OUT,SHOTS]=process.argv;fs.mkdirSync(OUT,{recursive:true});const FX=path.resolve(__dirname,'../../img/fx');
const VP=[[755,1000,2,'fold'],[1000,755,2,'fold-land'],[1180,820,2,'ipad'],[1366,1024,2,'ipad-pro'],[844,390,3,'phone-land'],[390,844,3,'phone']];
const sleep=t=>new Promise(r=>setTimeout(r,t));
const NEWLIFE=()=>{try{localStorage.removeItem('hclh-opt')}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}Q.length=0;
 const m=document.getElementById('modal');if(m)m.hidden=true;['kroul','dawn','kload','kpodov'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.kmov').forEach(e=>e.remove());render();return S.name};
const CLEAR=()=>{document.querySelectorAll('body > *').forEach(e=>{const s=getComputedStyle(e);if(s.position==='fixed'&&+s.zIndex>100)e.remove()});Q.length=0;render()};
(async()=>{const b=await chromium.launch();let fail=0;const R={};
 for(const [W,H,D,tag] of VP.filter(v=>!process.env.VPS||process.env.VPS.split(',').includes(v[3]))){const c=await b.newContext({serviceWorkers:'block',viewport:{width:W,height:H},deviceScaleFactor:D,hasTouch:true,isMobile:W<1100});const p=await c.newPage();const errs=[],net=[];
  if(!process.env.REAL)await p.route(/img\/fx\/buoi-.*\.webp/,r=>{const f=path.join(FX,r.request().url().split('/').pop().split('?')[0]);process.env.MISS?r.fulfill({status:404,body:''}):r.fulfill({body:fs.readFileSync(f),contentType:'image/webp'})});
  p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|net::ERR/.test(m.text()))errs.push('console: '+m.text())});
  p.on('response',q=>{if(/buoi-/.test(q.url()))net.push(q.status()+' '+q.url().split('/').pop()+' '+(q.headers()['content-length']||''))});
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof buoiShift==='function'&&(typeof nlFigsReady!=='function'||nlFigsReady()),null,{timeout:180000});await sleep(1500);
  const r={name:await p.evaluate(NEWLIFE)};await sleep(3000);await p.evaluate(()=>{OPT.fxon=true;OPT.fxpick=1;KFX.ambOK=false});await p.evaluate(CLEAR);
  r.src=await p.evaluate(()=>/buoiShift/.test(String(window.buoiShift))&&/btr/.test(String(window.buoiShift)));
  for(const bb of [1,2,3,0]){await p.evaluate(CLEAR); /* real flow: S.buoi changed by the game, then curtain() */
   await p.evaluate(x=>{window.__btrHold=1;S.buoi=x;curtain();document.querySelectorAll('#buoitr').forEach(e=>e.getAnimations({subtree:true}).forEach(a=>{a.pause();a.currentTime=a.effect.getTiming().duration*0.45}))},bb);await sleep(400);
   const o=await p.evaluate(()=>{const e=document.getElementById('buoitr');return e?{title:e.querySelector('.btr-title b')?.textContent,mist:!!e.querySelector('.btr-mist'),sun:!!e.querySelector('.btr-sun'),imgs:performance.getEntriesByType('resource').filter(x=>/buoi-(wash|hills|orb)/.test(x.name)).length}:null});
   (r['b'+bb]=o);if(!o||o.title!==['Buổi sáng','Buổi trưa','Buổi chiều','Buổi tối'][bb])fail++;
   if(!SHOTS||SHOTS==='1')await p.screenshot({path:`${OUT}/${tag}-b${bb}.jpg`,type:"jpeg",quality:50,timeout:90000});
   await p.evaluate(()=>{window.__btrHold=0;const e=document.getElementById('buoitr');if(e)e.remove()});}
  /* tap skip: gone within ~0.5 s, tap still reaches the page (button click counted) */
  await p.evaluate(()=>{window.__clk=0;document.addEventListener('click',()=>window.__clk++,true);S.buoi=1;curtain()});await sleep(300);
  const t0=Date.now();await p.mouse.click(W/2,H-20);const g=await p.waitForFunction(()=>!document.getElementById('buoitr'),null,{timeout:3000}).then(()=>true,()=>false);r.skip={gone:g,ms:Date.now()-t0,clicked:await p.evaluate(()=>window.__clk>0)};if(!r.skip.gone)fail++;
  /* Gọn: quick fade only */
  await p.evaluate(()=>{OPT.fxon=false;S.buoi=2;curtain()});await sleep(60);r.gon=await p.evaluate(()=>{const e=document.getElementById('buoitr');return e?{layers:e.children.length,title:!!e.querySelector('.btr-title')}:null});
  r.gonGone=await p.waitForFunction(()=>!document.getElementById('buoitr'),null,{timeout:3000}).then(()=>true,()=>false);if(!r.gon||r.gon.layers!==1||!r.gonGone)fail++;
  /* game logic is not delayed: nextBuoi returns synchronously and S already new before the overlay ends */
  await p.evaluate(()=>{OPT.fxon=true});r.sync=await p.evaluate(()=>{S.buoi=0;Q.length=0;S.mg=null;const b0=S.buoi;nextBuoi();return{b0,b1:S.buoi,tr:!!document.getElementById('buoitr')}});
  r.errs=errs;r.net=net.length;r.kb=net.length?net.slice(0,4):[];if(errs.length)fail++;R[tag]=r;console.error(tag,JSON.stringify(r).slice(0,700));await c.close()}
 fs.writeFileSync(OUT+'/result.json',JSON.stringify(R,null,1));await b.close();console.error('FAIL',fail);process.exit(fail?1:0)})();
