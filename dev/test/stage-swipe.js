/* KIT 33.9 swipe stage test (review/stage-pets): usage node dev/test/stage-swipe.js <page URL> <WxH@dpr> <outdir> [tag]  (env NPEOPLE=1,2,6, SHOTS=0)
   Per people count: people per view, body px (kit height), chips L/R, no arrow buttons, drag + mid-animation frames, frame times of the swipe (rAF), swipe back. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,VP,OUT,TAG]=process.argv;
const m=/^(\d+)x(\d+)@([\d.]+)$/.exec(VP);const W=+m[1],H=+m[2],DPR=+m[3];fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
const prox=process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{};
const CASES0=JSON.parse(process.env.CASES||'[["n1S","vuon",["meomuop"]],["n1M","vuon",["cho"]],["n1L","vuon",["thanhlong"]],["n2SL","vuon",["meo","kylan"]],["n2LL","vuon",["hac","thienma"]],["n3SML","vuon",["tho","cuuvi","bachloc"]],["n3LLL","vuon",["thanhlong","hac","kylan"]],["n3MMM","vuon",["cho","cuuvi","phuong"]]]');
(async()=>{const b=await chromium.launch(prox);const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,hasTouch:true,isMobile:W<1000,serviceWorkers:'block'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.setDefaultTimeout(240000);
 await p.addInitScript(()=>{window.__nlInner=1;addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='#kroul,#kload,.krbox{display:none!important}';document.head.appendChild(s)})});
 await p.route(/ctmload=1/,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});
 await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');const lg=m=>console.error(new Date().toISOString().slice(11,19),m);lg('booted');
 await sleep(1500);
 await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.buoi=0;deal();render();
  const kl=document.getElementById('kload');if(kl)kl.remove();document.querySelectorAll('.krbox,#kroul').forEach(e=>e.remove())});
 
 await sleep(1500);
 await p.addStyleTag({content:'img.figimg,#mefig,#tokens .tok,.kspet{animation:none!important}#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn{display:none!important}'});
 const OUTR={vp:VP,cases:{}};if(process.env.J59DBG){await p.evaluate(()=>{window.__j59dbg=1});p.on('console',m=>{if(/J59TRY/.test(m.text()))console.log(m.text())})}

 const sh=n=>process.env.SHOTS==='0'?null:p.screenshot({path:`${OUT}/${TAG||'sw'}-${W}x${H}-${n}.jpg`,type:'jpeg',quality:70,timeout:240000});

 const NP=(process.env.NPEOPLE||'1,2,6').split(',').map(Number);
 for(const n of NP){const pets=['meomuop','cho','thanhlong','tho','cuuvi','kylan'].slice(0,n);const nr=n-1;lg('case n'+n);
  await p.evaluate(async([k,nr,pets])=>{Q.length=0;window.kmPush=function(){};document.querySelectorAll('.kmov,#dawn,#kpodov,.kmfls').forEach(e=>e.remove());document.body.classList.remove('kbk-open');const md=document.getElementById('modal');if(md)md.hidden=true;S.dead=false;S.confined=0;
   S.where=S.where||{};const Wh=S.where;for(const v of rivals)if(Wh[v.id]===k)Wh[v.id]="r"+v.id;Wh.emp="tn";S.menW={};S.minW={};
   const mk=t=>!t?null:({t,at:0,src:"emp",care:90,full:90,clean:90,joy:90,aff:60,stg:2});
   for(const v of rivals){v.pets=[];v.petOn=-1}S.pets=pets[0]?[mk(pets[0])]:[];S.petOn=pets[0]?0:-1;
   const L=liveRivals(true).slice(0,nr);L.forEach((v,i)=>{Wh[v.id]=k;v.pets=pets[i+1]?[mk(pets[i+1])]:[];v.petOn=pets[i+1]?0:-1});
   S.place="home";used=0;tab="act";goTo(k);await new Promise(r=>setTimeout(r,2500));return L.length},[ 'vuon',nr,pets]).then(l=>lg('rivals placed '+l));
  await p.waitForFunction(n=>{const v=e=>e&&e.offsetParent!==null&&e.getBoundingClientRect().width>2;const f=[...document.querySelectorAll('#mefig,#tokens .tok img.figimg')].filter(v).length;return document.querySelectorAll('#stage .kspet').length>=Math.min(n,f)},n,{timeout:30000}).catch(()=>lg('no pets'));await sleep(3500);
  const info=()=>p.evaluate(()=>{const st=document.getElementById('stage'),R=st.getBoundingClientRect();const vis=e=>e&&e.offsetParent!==null&&getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().width>2;
   const figs=[...document.querySelectorAll('#mefig,#tokens .tok img.figimg')].filter(vis).map(e=>{const q=e.getBoundingClientRect(),b=kitFigBody(e.getAttribute('src'))||{t:0,b:1,ht:0};return{body:Math.round(q.height*(b.b-(b.ht>b.t?b.ht:b.t))),l:Math.round(q.left-R.left),r:Math.round(q.right-R.left)}});
   const chip=s=>{const c=st.querySelector('.j59m'+s);return c?c.textContent:null};
   return{pg:st.dataset.j59pg||'1',n:figs.length,figs,L:chip('l'),R:chip('r'),pets:[...st.querySelectorAll('.kspet')].filter(vis).length,stageH:Math.round(R.height),stageW:Math.round(R.width),arrows:[...st.querySelectorAll('.j59more')].filter(c=>c.tagName==='BUTTON').length}});
  if(process.env.DBGPTR)await p.evaluate(()=>{window.__pe=[];['pointerdown','pointermove','pointerup','pointercancel','click'].forEach(t=>document.addEventListener(t,e=>{window.__pe.push(t+':'+(e.target.id||e.target.className||e.target.tagName)+':'+(e.pointerType||''))},true))});
  const r0=await info();const rec={view1:r0,swipes:[]};await sh('n'+n+'-view1');
  const box=await p.evaluate(()=>{const R=document.getElementById('stage').getBoundingClientRect();return{x:R.left,y:R.top,w:R.width,h:R.height}});
  const pages=+(r0.pg.split(',')[1]||1);
  for(let sw=0;sw<pages-1;sw++){
   await p.evaluate(()=>{window.__fr=[];let t=performance.now();const f=()=>{const n=performance.now();window.__fr.push(n-t);t=n;if(window.__fr.length<200)requestAnimationFrame(f)};requestAnimationFrame(f)});
   const y=box.y+box.h*0.45;await p.mouse.move(box.x+box.w*0.62,y);await p.mouse.down();
   for(let i=1;i<=8;i++){await p.mouse.move(box.x+box.w*(0.62-0.045*i),y);await sleep(16)}
   if(process.env.DBGPTR)console.log('PE',JSON.stringify(await p.evaluate(()=>window.__pe.slice(0,14))));
   const mid=await p.evaluate(()=>document.getElementById('stage').style.getPropertyValue('--j59dx'));await sh('n'+n+'-swipe'+(sw+1)+'-drag');
   await p.mouse.up();await sleep(110);const midA=await p.evaluate(()=>document.getElementById('stage').style.getPropertyValue('--j59dx'));await sh('n'+n+'-swipe'+(sw+1)+'-anim');
   await sleep(700);const r=await info();const fr=await p.evaluate(()=>{const a=window.__fr.slice(2);a.sort((x,y)=>x-y);return{n:a.length,avg:+(a.reduce((s,x)=>s+x,0)/Math.max(1,a.length)).toFixed(1),p95:+(a[Math.floor(a.length*.95)]||0).toFixed(1),max:+(a[a.length-1]||0).toFixed(1)}});
   rec.swipes.push({dragDx:mid,animDx:midA,after:r,frames:fr});await sh('n'+n+'-view'+(sw+2));
  }
  /* swipe back once */
  if(pages>1){await p.mouse.move(box.x+box.w*0.3,box.y+box.h*.45);await p.mouse.down();for(let i=1;i<=8;i++){await p.mouse.move(box.x+box.w*(0.3+0.045*i),box.y+box.h*.45);await sleep(16)}await p.mouse.up();await sleep(800);rec.back=await info()}
  /* tap still opens the pop-up */
  const tap=await p.evaluate(async()=>{const t=document.querySelector('#tokens .tok:not([style*="display: none"]) img.figimg')||document.getElementById('mefig');if(!t)return 'nofig';const q=t.getBoundingClientRect();return q.left+','+q.top+','+q.width+','+q.height});
  rec.tap=tap;OUTR.cases['n'+n]=rec;
  console.log('n'+n,'view1',JSON.stringify({pg:r0.pg,n:r0.n,body:r0.figs.map(f=>f.body),L:r0.L,R:r0.R,pets:r0.pets,arrows:r0.arrows}),'swipes',JSON.stringify(rec.swipes.map(x=>({dx:x.dragDx+'|'+x.animDx,pg:x.after.pg,L:x.after.L,R:x.after.R,frames:x.frames}))),rec.back?'back '+rec.back.pg+' L'+rec.back.L+' R'+rec.back.R:'');
 }
 OUTR.errs=errs;fs.writeFileSync(`${OUT}/${TAG||'sw'}-${W}x${H}.json`,JSON.stringify(OUTR,null,1));console.log('errs',JSON.stringify(errs));await b.close()})();
