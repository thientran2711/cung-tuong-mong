/* review/stat-fx: kitStatFx (KIT §57.1) — label with name, slow, queued, green/red glow on the cell, scale, Gọn, reduce-motion, skip.
   usage: node dev/test/stat-fx.js http://localhost:<port>/index.html <outdir> */
const {chromium}=require('playwright');const fs=require('fs');const [,,BASE,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const VP0=[[755,1000,2,'fold'],[1000,755,2,'fold-land'],[1180,820,2,'ipad'],[1366,1024,2,'ipad-pro'],[844,390,3,'phone-land']];
const VP=VP0.filter(v=>!process.env.VPS||process.env.VPS.split(',').includes(v[3]));
const clipOf=async(p,id)=>p.evaluate(id=>{const r=document.getElementById(id).getBoundingClientRect();const x=Math.max(0,r.left-120),y=Math.max(0,r.top-20);return{x,y,width:Math.min(innerWidth-x,r.width+240),height:Math.min(innerHeight-y,r.height+70)}},id);
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const R={};let fail=0;
 for(const [W,H,D,tag] of VP){const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100});const p=await c.newPage();const errs=[];
  p.on('pageerror',e=>errs.push(e.message));await p.goto(BASE,{waitUntil:'domcontentloaded'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof kitStatFx==='function'&&(typeof nlFigsReady!=='function'||nlFigsReady()),null,{timeout:120000});
  await p.evaluate(()=>{try{localStorage.removeItem('hclh-opt')}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render();OPT.fxon=true});
  await sleep(800);const r={};
  /* 1: apply() Danh +2 -> label with the NAME, glow green after, pulses ~2.6 s */
  r.one=await p.evaluate(async()=>{const cell=document.getElementById('hud-danh');const t0=performance.now();apply({danh:2});await new Promise(r=>setTimeout(r,150));
   const l=document.querySelector('.ksfl');const o={label:l&&l.textContent,lcls:l&&l.className,glow:cell.classList.contains('ksf-g')};
   await new Promise(r=>setTimeout(r,1500));o.labelAt1600=!!document.querySelector('.ksfl');o.glowAt1600=cell.classList.contains('ksf-g');
   await new Promise(r=>setTimeout(r,1500));o.glowAt3100=cell.classList.contains('ksf-g');o.labelAt3100=!!document.querySelector('.ksfl');
   const sh=getComputedStyle(cell).animationName;o.anim=sh;return o});
  /* 2: loss -> red; stagger: 4 changes queued, one label every ~0.7 s */
  r.queue=await p.evaluate(async()=>{apply({suc:-5,sung:3,bac:-10,tai:2});const seen=[];const t0=performance.now();for(let i=0;i<30;i++){await new Promise(r=>setTimeout(r,100));for(const l of document.querySelectorAll('.ksfl')){if(!seen.find(s=>s.t===l.textContent))seen.push({t:l.textContent,c:l.className.replace('ksfl ',''),at:Math.round(performance.now()-t0)})}}
   return seen});
  await sleep(3500);
  /* 3: Gọn = glow only, no label */
  r.gon=await p.evaluate(async()=>{OPT.fxon=false;const cell=document.getElementById('hud-duc');kitStatFxSkip();KSF.seen={};apply({duc:2});await new Promise(r=>setTimeout(r,200));const o={label:!!document.querySelector('.ksfl'),glow:cell.classList.contains('ksf-g')};OPT.fxon=true;return o});
  await sleep(3000);
  /* 4: tap skips the queue */
  r.skip=await p.evaluate(async()=>{KSF.seen={};apply({sac:1,tai:1,danh:1,sung:1});await new Promise(r=>setTimeout(r,200));const before=KSF.q.length;document.body.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));await new Promise(r=>setTimeout(r,100));return {queuedBefore:before,queuedAfter:KSF.q.length,labels:document.querySelectorAll('.ksfl').length}});
  await sleep(3000);
  /* 5: result card path: flies from the card, label name + delta, lands on cell, glows */
  r.card=await p.evaluate(async()=>{KSF.seen={};const card=document.createElement('div');card.style.cssText='position:fixed;left:30%;top:45%;width:40%;height:80px';document.body.appendChild(card);const bf=Object.assign({},S);S.danh=Math.min(100,S.danh+3);S.suc=Math.max(0,S.suc-4);kfNumbers(card,bf);
   const seen=[],gl={danh:'',suc:''};for(let i=0;i<60;i++){await new Promise(r=>setTimeout(r,100));for(const k in gl)if(/ksf-/.test(document.getElementById('hud-'+k).className))gl[k]=document.getElementById('hud-'+k).className;for(const l of document.querySelectorAll('.ksfl'))if(!seen.includes(l.textContent))seen.push(l.textContent)}
   const g=gl;card.remove();return {seen,g}});
  await sleep(2500);
  /* shot of the glow */
  await p.evaluate(()=>['kroul','kload','curtain','dawn'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()}));
  await p.evaluate(()=>{KSF.seen={};apply({danh:2})});await sleep(450);await p.screenshot({path:`${OUT}/${tag}-glow-green.png`,clip:await clipOf(p,'hud-danh')});await sleep(3200);
  await p.evaluate(()=>{KSF.seen={};apply({sung:-3})});await sleep(450);await p.screenshot({path:`${OUT}/${tag}-glow-red.png`,clip:await clipOf(p,'hud-sung')});await sleep(3200);
  r.overflow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);r.errs=errs;R[tag]=r;
  const ok=r.one.label==='Danh +2'&&r.one.glow&&r.one.labelAt1600&&r.one.glowAt1600&&!r.one.glowAt3100&&!r.one.labelAt3100&&r.queue.length>=4&&r.gon.glow&&!r.gon.label&&r.skip.queuedAfter===0&&r.skip.labels===0&&r.card.seen.length>=2&&/ksf-g/.test(r.card.g.danh)&&!errs.length&&!r.overflow;
  console.log(tag,ok?'PASS':'FAIL');if(!ok){fail++;console.log(JSON.stringify(r))}await c.close()}
 fs.writeFileSync(OUT+'/result.json',JSON.stringify(R,null,1));await b.close();process.exit(fail?1:0)})();
