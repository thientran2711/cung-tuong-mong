/* review/place-banner: scan every place x device: count icon shown? chip-on-chip? banner overlap with figure head (px)? + shots.
   usage: DEV=fold|ipadAir [PLACES=k1,k2|all] [SHOTS=outdir] [TAG=x] node dev/test/place-banner-scan.js   (HOST mode, built root) → JSON rows */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const dev=process.env.DEV||'fold';const out=process.env.SHOTS||'';if(out)fs.mkdirSync(out,{recursive:true});const tag=(process.env.TAG||'')+(process.env.OPT||'');
 const srv=await D.serveRoot();const prox=process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{};
 const b=await chromium.launch(prox);const ctx=await D.newDeviceContext(b,dev);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.setDefaultTimeout(240000);
 await p.addInitScript(()=>{window.__nlInner=1});
 const g=await D.openHost(p,srv.url);
 await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(1500);
 await g.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.buoi=0;deal();render();
  document.querySelectorAll('#kload,.krbox,#kroul').forEach(e=>e.remove());
  const s=document.createElement('style');s.textContent='#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn{display:none!important}img.figimg,#mefig,#tokens .tok,.kspet{animation:none!important}';document.head.appendChild(s)});
 await sleep(1500);
 const keys=process.env.PLACES&&process.env.PLACES!=='all'?process.env.PLACES.split(','):await g.evaluate(()=>places().map(p=>p.k));
 const rows=[];const OPT=process.env.OPT||'';await g.evaluate(o=>{document.documentElement.dataset.pb=o},OPT);
 for(const k of keys){
  await g.evaluate(async k=>{Q.length=0;window.kmPush=function(){};document.querySelectorAll('.kmov,#dawn,#kpodov,.kmfls').forEach(e=>e.remove());const md=document.getElementById('modal');if(md)md.hidden=true;S.dead=false;S.confined=0;S.place="home";used=0;tab="act";S.sung=60;S.suc=100;S.visit=null;try{goTo(k)}catch(e){}Q.length=0;await new Promise(r=>setTimeout(r,1800))},k);
  await sleep(1200);await g.evaluate(()=>Promise.race([Promise.all([...document.querySelectorAll('#stage img,#sc-t img')].map(i=>i.complete?1:new Promise(r=>{i.onload=i.onerror=r}))),new Promise(r=>setTimeout(r,9000))]));await sleep(300);
  const r=await g.evaluate(k=>{const st=document.getElementById('stage');if(!st)return{k,err:'no stage'};const vis=e=>e&&e.offsetParent!==null&&getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().width>2;
   const R=st.getBoundingClientRect();const t=document.getElementById('sc-t');const tq=t&&vis(t)?t.getBoundingClientRect():null;
   const rt1=t&&t.querySelector('.rt1');const hchip=t&&t.querySelector('.j59hchip');const rm=t&&t.querySelector('.rmsg');
   const figs=[...document.querySelectorAll('#mefig,#tokens .tok img.figimg')].filter(vis).map(e=>e.getBoundingClientRect());
   let hd=null;if(figs.length&&tq){/* head top = figure img top (kit cutouts: head at top); overlap = banner bottom below figure top inside its x-span */
     hd=Math.max(...figs.map(f=>(f.right>tq.left&&f.left<tq.right)?Math.max(0,tq.bottom-f.top):0))}
   const orn=[...st.querySelectorAll('.kdeco,.kfl,.kflower,[class*=orn],[class*=huadian]')].filter(vis).map(e=>e.getBoundingClientRect());
   const ornHit=tq?orn.filter(o=>o.left<tq.right&&o.right>tq.left&&o.top<tq.bottom&&o.bottom>tq.top).length:0;
   return{k,title:t?t.textContent.trim().slice(0,70):null,bannerH:tq?Math.round(tq.height):0,bannerW:tq?Math.round(tq.width):0,bannerBottom:tq?Math.round(tq.bottom-R.top):0,
    countIcon:!!(hchip&&vis(hchip)&&hchip.querySelector('img')&&hchip.querySelector('img').naturalWidth>0),countChip:!!(hchip&&vis(hchip)),rawText:rm?rm.textContent.trim().slice(0,50):null,chipOnChip:!!(rt1&&getComputedStyle(rt1).borderTopWidth!=='0px'&&tq),figs:figs.length,figTopMin:figs.length?Math.round(Math.min(...figs.map(f=>f.top))-R.top):null,headOverlapPx:hd==null?null:Math.round(hd),ornOverlap:ornHit,markH:(()=>{const m=st.querySelector('.kmemark');return m&&getComputedStyle(m).visibility!=='hidden'&&m.style.display!=='none'?Math.round(m.getBoundingClientRect().height):0})(),stageH:Math.round(R.height),stageW:Math.round(R.width)}},k);
  rows.push(r);
  if(out)await p.screenshot({path:`${out}/${tag}${dev}-${k}.jpg`,type:'jpeg',quality:80,timeout:240000});
 }
 console.log(JSON.stringify({dev,rows,errs},null,0));await b.close();srv.close()})();
