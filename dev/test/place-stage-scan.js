/* review/place-banner: scan every place x device: count icon shown? chip-on-chip? banner overlap with figure head (px)? + shots.
   usage: DEV=fold|ipadAir [PLACES=k1,k2|all] [SHOTS=outdir] [TAG=x] node dev/test/place-banner-scan.js   (HOST mode, built root) → JSON rows */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const dev=process.env.DEV||'fold';const out=process.env.SHOTS||'';if(out)fs.mkdirSync(out,{recursive:true});const tag=(process.env.TAG||'');
 const srv=await D.serveRoot();const prox=process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{};
 const b=await chromium.launch(prox);const ctx=await D.newDeviceContext(b,dev);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.setDefaultTimeout(240000);
 await p.addInitScript(()=>{window.__nlInner=1;window.__toastKeep=1;let a=123456789;window.__rs=()=>{a=123456789};Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});
 const g=await D.openHost(p,srv.url);
 await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(1500);
 await g.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;window.__toasts=[];{const o=window.kitLineToast;if(o)window.kitLineToast=function(t){window.__toasts.push(t);return o.apply(this,arguments)}}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.buoi=0;deal();render();
  document.querySelectorAll('#kload,.krbox,#kroul').forEach(e=>e.remove());
  const s=document.createElement('style');s.textContent='#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn{display:none!important}img.figimg,#mefig,#tokens .tok,.kspet{animation:none!important}';document.head.appendChild(s)});
 await sleep(1500);
 const keys=process.env.PLACES&&process.env.PLACES!=='all'?process.env.PLACES.split(','):await g.evaluate(()=>places().map(p=>p.k));
 const rows=[];
 for(const k of keys){
  await g.evaluate(async k=>{window.__rs&&window.__rs();window.__toasts=[];Q.length=0;window.kmPush=function(){};document.querySelectorAll('.kmov,#dawn,#kpodov,.kmfls').forEach(e=>e.remove());const md=document.getElementById('modal');if(md)md.hidden=true;S.dead=false;S.confined=0;S.place="home";used=0;tab="act";S.sung=60;S.suc=100;S.visit=null;try{goTo(k)}catch(e){}Q.length=0;await new Promise(r=>setTimeout(r,1800))},k);
  await sleep(1200);await g.evaluate(()=>Promise.race([Promise.all([...document.querySelectorAll('#stage img,#sc-t img')].map(i=>i.complete?1:new Promise(r=>{i.onload=i.onerror=r}))),new Promise(r=>setTimeout(r,9000))]));await sleep(1500);
  const bounce=await g.evaluate(()=>new Promise(res=>{const st=document.getElementById('stage');const R=st.getBoundingClientRect();let min=1e9,n=0;const t0=performance.now();(function f(){const im=document.querySelector('.kmemark>img');if(im&&im.getClientRects().length){min=Math.min(min,im.getBoundingClientRect().top-R.top)}n++;if(performance.now()-t0<2800)requestAnimationFrame(f);else res(min===1e9?null:Math.round(min*10)/10)})()}));
  const r=await g.evaluate(k=>{const st=document.getElementById('stage');if(!st)return{k,err:'no stage'};const vis=e=>e&&e.offsetParent!==null&&getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().width>2;
   const R=st.getBoundingClientRect();const rel=q=>q?{l:Math.round(q.left-R.left),t:Math.round(q.top-R.top),r:Math.round(q.right-R.left),b:Math.round(q.bottom-R.top)}:null;
   const t=document.getElementById('sc-t');const plaque=!!(t&&vis(t));
   const rail=document.getElementById('krail');const cc=rail&&rail.querySelector('.krailc .j59hchip');const first=rail&&rail.firstElementChild;
   const nm=document.getElementById('kpname');const en=document.getElementById('kpent');const kR=document.getElementById('kshR');
   const figs=[...document.querySelectorAll('#mefig,#tokens .tok img.figimg')].filter(vis).map(e=>e.getBoundingClientRect());
   const ent=en&&vis(en)?en.querySelector('.kchip').getBoundingClientRect():null;
   const hit=ent?figs.filter(f=>f.right>ent.left&&f.left<ent.right&&f.top<ent.bottom).length:0;
   const mk=document.querySelector('.kmemark');const mkr=mk&&vis(mk)?mk.getBoundingClientRect():null;
   const mhit=mkr&&ent?(mkr.right>ent.left&&mkr.left<ent.right&&mkr.top<ent.bottom&&mkr.bottom>ent.top):false;
   const nmq=nm&&vis(nm)?nm.getBoundingClientRect():null;const kq=kR&&vis(kR)?kR.getBoundingClientRect():null;
   return{k,plaque,countChip:!!(cc&&vis(cc)&&cc.querySelector('img')&&cc.querySelector('img').naturalWidth>0),countFirstInLeftCol:!!(cc&&first===cc.parentNode),count:cc?cc.textContent.trim():'',
    rail:rel(rail&&rail.getBoundingClientRect()),name:nm&&vis(nm)?nm.textContent:null,nameBox:rel(nmq),nameFont:nm?getComputedStyle(nm).fontSize:null,colTopBelowName:!!(nmq&&kq&&kq.top>=nmq.bottom-1),
    toasts:(window.__toasts||[]).slice(),toastEl:(document.getElementById('ktbtoast')||{}).textContent||null,line:en&&vis(en)?en.textContent.trim().slice(0,60):null,entBox:rel(ent),entHitsHead:hit,entHitsMarker:mhit,meTop:(()=>{const m=document.getElementById('mefig');return m?Math.round(m.getBoundingClientRect().top-R.top):null})(),meH:(()=>{const m=document.getElementById('mefig');return m?Math.round(m.getBoundingClientRect().height):null})(),markH:mkr?Math.round(mkr.height):null,markTop:mkr?Math.round(mkr.top-R.top):null,figs:figs.length,figTopMin:figs.length?Math.round(Math.min(...figs.map(f=>f.top))-R.top):null,tagBottomGap:(()=>{const g=[...document.querySelectorAll('#mefig ~ .tag, #j59metag .tag, #tokens .tok .tag')].filter(vis).map(e=>e.getBoundingClientRect().bottom);return g.length?Math.round(R.bottom-Math.max(...g)):null})(),headTopMin:Math.round(Math.min(...figs.map(f=>f.top),mkr?mkr.top:1e9)-R.top),figH:figs.length?Math.round(Math.max(...figs.map(f=>f.height))):null,markerVisible:!!mkr,stageH:Math.round(R.height),stageW:Math.round(R.width)}},k);r.markBounceTop=bounce;
  r.markBounceTop=bounce;rows.push(r);
  if(out)await p.screenshot({path:`${out}/${tag}${dev}-${k}.jpg`,type:'jpeg',quality:80,timeout:240000});
 }
 console.log(JSON.stringify({dev,rows,errs},null,0));await b.close();srv.close()})();
