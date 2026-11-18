/* KIT §74 buổi banner (jbuoi): every buổi change shows ONLY the buổi title in a rectangle plaque just under the top bar; no veil / scene / sky band; tap skips (and reaches the game); Gọn = shorter; sync not delayed; 0 page errors.
   usage: node dev/test/buoi-transition.js http://localhost:<port>/index.html <outdir> [shots]   (shots: 1 = one shot per buổi at op 0.8; ladder = 70/80/85 shots of buổi trưa; env VPS=fold,ipad to pick viewports) */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,OUT,SHOTS]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const VP=[[755,1000,2,'fold'],[1000,755,2,'fold-land'],[1180,820,2,'ipad'],[1366,1024,2,'ipad-pro'],[844,390,3,'phone-land'],[390,844,3,'phone']];
const sleep=t=>new Promise(r=>setTimeout(r,t));
const NEWLIFE=()=>{try{localStorage.removeItem('hclh-opt')}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;
 const m=document.getElementById('modal');if(m)m.hidden=true;['kroul','dawn','kload','kpodov'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.kmov').forEach(e=>e.remove());render();return S.name};
const CLEAR=()=>{document.querySelectorAll('body > *').forEach(e=>{const s=getComputedStyle(e);if(s.position==='fixed'&&+s.zIndex>100)e.remove()});Q.length=0;render()};
(async()=>{const b=await chromium.launch();let fail=0;const R={};
 for(const [W,H,D,tag] of VP.filter(v=>!process.env.VPS||process.env.VPS.split(',').includes(v[3]))){const c=await b.newContext({serviceWorkers:'block',viewport:{width:W,height:H},deviceScaleFactor:D,hasTouch:true,isMobile:W<1100});const p=await c.newPage();const errs=[];
  p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|net::ERR/.test(m.text()))errs.push('console: '+m.text())});
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof buoiShift==='function'&&(typeof nlFigsReady!=='function'||nlFigsReady()),null,{timeout:180000});await sleep(1500);
  const r={name:await p.evaluate(NEWLIFE)};await sleep(3000);await p.evaluate(()=>{OPT.fxon=true;OPT.fxpick=1;KFX.ambOK=false});await p.evaluate(CLEAR);
  const probe=()=>p.evaluate(()=>{const e=document.getElementById('buoitr'),h=document.querySelector('header.hud');if(!e)return null;const t=e.querySelector('.btr-t'),a=t.getBoundingClientRect(),hb=h.getBoundingClientRect(),cs=getComputedStyle(t);
   return{title:t.textContent,kids:e.children.length,top:Math.round(a.top),hudBottom:Math.round(hb.bottom),left:Math.round(a.left),right:Math.round(a.right),vw:innerWidth,op:+e.style.opacity||+getComputedStyle(e).opacity,radius:cs.borderRadius,bg:cs.backgroundColor,veil:[...document.body.children].filter(x=>x!==e&&getComputedStyle(x).position==='fixed'&&x.getBoundingClientRect().width>=innerWidth*.95&&x.getBoundingClientRect().height>=innerHeight*.95&&getComputedStyle(x).pointerEvents==='none'&&+getComputedStyle(x).opacity>.05&&/^(buoitr|dawn|curtain)$/.test(x.id)).length}});
  const hold=async(bb,op)=>{await p.evaluate(CLEAR);await p.evaluate(([x,o])=>{window.__btrHold=1;window.__btrOp=o;S.buoi=x;curtain();document.querySelectorAll('#buoitr').forEach(e=>e.getAnimations().forEach(a=>{a.pause();a.currentTime=a.effect.getTiming().duration*0.4}))},[bb,op]);await sleep(80)};
  for(const bb of [1,2,3,0]){await hold(bb,.8);const o=await probe();r['b'+bb]=o;
   if(!o||o.title!==['Buổi sáng','Buổi trưa','Buổi chiều','Buổi tối'][bb]||o.kids!==1||o.top<o.hudBottom||o.left<0||o.right>o.vw||Math.abs(o.op-.8)>.02||o.veil)fail++;
   if(!SHOTS||SHOTS==='1')await p.screenshot({path:`${OUT}/${tag}-b${bb}.jpg`,type:"jpeg",quality:60,timeout:90000});
   await p.evaluate(()=>{window.__btrHold=0;const e=document.getElementById('buoitr');if(e)e.remove()})}
  if(SHOTS==='ladder')for(const op of [.7,.8,.85]){await hold(1,op);await p.screenshot({path:`${OUT}/${tag}-trua-${Math.round(op*100)}.png`,timeout:90000});await p.evaluate(()=>{window.__btrHold=0;const e=document.getElementById('buoitr');if(e)e.remove()})}
  await p.evaluate(()=>{window.__btrHold=0;window.__btrOp=null});await p.evaluate(CLEAR);
  /* tap skip: gone fast, the tap still reaches the page */
  await p.evaluate(()=>{window.__clk=0;document.addEventListener('click',()=>window.__clk++,true);S.buoi=1;curtain()});await sleep(300);
  const t0=Date.now();await p.mouse.click(W/2,H-20);const g=await p.waitForFunction(()=>!document.getElementById('buoitr'),null,{timeout:3000}).then(()=>true,()=>false);r.skip={gone:g,ms:Date.now()-t0,clicked:await p.evaluate(()=>window.__clk)};if(!g||r.skip.ms>600||!r.skip.clicked)fail++;
  /* full length (~1.5 s x pace), self-removing */
  await p.evaluate(()=>{S.buoi=2;curtain()});const t1=Date.now();const g2=await p.waitForFunction(()=>!document.getElementById('buoitr'),null,{timeout:6000}).then(()=>true,()=>false);r.len=Date.now()-t1;if(!g2||r.len<1200||r.len>1900)fail++;
  /* Gọn: still one plaque, shorter */
  await p.evaluate(()=>{OPT.fxon=false;S.buoi=2;curtain()});await sleep(60);r.gon=await p.evaluate(()=>{const e=document.getElementById('buoitr');return e?{kids:e.children.length}:null});const t2=Date.now();r.gonGone=await p.waitForFunction(()=>!document.getElementById('buoitr'),null,{timeout:3000}).then(()=>true,()=>false);r.gonMs=Date.now()-t2+60;if(!r.gon||r.gon.kids!==1||!r.gonGone||r.gonMs>=r.len)fail++;
  /* game logic not delayed: nextBuoi returns synchronously, S already new; bots / quiet = nothing */
  await p.evaluate(()=>{OPT.fxon=true});r.sync=await p.evaluate(()=>{S.buoi=0;Q.length=0;S.mg=null;const b0=S.buoi;nextBuoi();return{b0,b1:S.buoi,tr:!!document.getElementById('buoitr')}});
  await p.evaluate(CLEAR);await p.evaluate(()=>document.querySelectorAll('#buoitr').forEach(e=>e.remove()));r.bot=await p.evaluate(()=>{window.__bot=1;S.buoi=1;buoiShift();const x=!!document.getElementById('buoitr');window.__bot=0;return x});if(r.bot)fail++;
  r.errs=errs;if(errs.length)fail++;R[tag]=r;console.error(tag,JSON.stringify(r).slice(0,900));await c.close()}
 fs.writeFileSync(OUT+'/result.json',JSON.stringify(R,null,1));await b.close();console.error('FAIL',fail);process.exit(fail?1:0)})();
