/* medallion rescan r2: every dialog that shows the seal; force the lean-in, rAF-sample the big clone, table per place x device.
   usage: node scan.js WxH PAGE OUT.json */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const ROOT='/home/user/cung-tuong-mong';const MIME={html:'text/html;charset=utf-8',js:'text/javascript;charset=utf-8',json:'application/json',webp:'image/webp',png:'image/png',css:'text/css'};
const [,,SZ,PAGE,OUT,SHOTS]=process.argv;const [W,H]=SZ.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block',reducedMotion:'no-preference'});
 await ctx.route('**/*',async r=>{const u=new URL(r.request().url());if(u.host!=='em.local')return r.continue();const f=path.join(ROOT,decodeURIComponent(u.pathname));if(/assets\.json$/.test(f)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});r.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':MIME[f.split('.').pop()]||'application/octet-stream'}})});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,150)));
 await p.goto('http://em.local/'+PAGE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(4000);
 await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove();SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;render()});
 await p.waitForTimeout(8000);
 await p.evaluate(()=>{window.__M=null;window.__rec=(el)=>{const M={min:1e9,peakW:0,peak:null,n:0};window.__M=M;(function t(){const c=document.querySelector('.kemo-big');if(c){const r=c.getBoundingClientRect();M.n++;if(r.width>M.peakW){M.peakW=r.width;M.peak=[r.left,r.top,r.width,r.height]}}if(!M.stop)requestAnimationFrame(t)})()}});
 const ids=await p.evaluate(()=>Object.keys(PEND));const rows=[];let shot=0;
 const ev=(id)=>p.evaluate(async(id)=>{const Wt=t=>new Promise(r=>setTimeout(r,t));document.querySelectorAll('.krskip').forEach(b=>b.click());
  const md=document.getElementById('modal');const close=()=>{Q.length=0;md.hidden=true;document.querySelectorAll('.kemo-big').forEach(e=>e.remove())};close();
  S.bac=300;S.suc=80;const v=rivals.find(x=>x&&x.id!=null);
  const PP={f:key(v),a:key(v),acc:key(v),t:'v'+v.id,b:'a',o:40,o1:40,o2:50,s:5,q:3,vp:0,dn:'Yến sào',pk:null,e:{k:'yensao',from:key(v)},wn:'thử',al:0};
  let d=null;try{d=mkP(id,Object.assign({},PP))}catch(e){return{id,err:'mkP '+e.message.slice(0,60)}}if(!d||!d.o||!d.o.length)return{id,none:1};
  try{pushDil(d,id);showModal()}catch(e){return{id,err:'show '+e.message.slice(0,60)}}await Wt(900);
  const seals=[...md.querySelectorAll('img.kfseal')].filter(e=>e.getClientRects().length);if(!seals.length){close();return{id,noseal:1}}
  const el=seals[0];const fig=md.querySelector('.kszfig img:not(.kemo):not(.kemofx)')||[...md.querySelectorAll('img')].find(i=>!i.classList.contains('kemo')&&i.getBoundingClientRect().height>250);
  const ttl=md.querySelector('.kptitle,h2');const R=e=>{if(!e)return null;const q=e.getBoundingClientRect();return[q.left,q.top,q.width,q.height]};
  const stillPx=el.getBoundingClientRect().width;
  el.__ln&&clearTimeout(el.__ln);const M={peakW:0,peak:null,frames:0};window.__M=M;let stop=false;(function t(){const c=document.querySelector('.kemo-big');if(c){const r=c.getBoundingClientRect();M.frames++;if(r.width>M.peakW){M.peakW=r.width;M.peak=[r.left,r.top,r.width,r.height]}}if(!stop)requestAnimationFrame(t)})();
  window.kitEmoSeal.lean(el,true);await Wt(3600);stop=true;const hd=window.kitEmoSeal.head(el);
  const out={id,stillPx:Math.round(stillPx),peakPx:Math.round(M.peakW),headPx:Math.round(hd),peak:M.peak&&M.peak.map(Math.round),fig:R(fig)&&R(fig).map(Math.round),ttl:R(ttl)&&R(ttl).map(Math.round),vw:innerWidth,vh:innerHeight};close();return out},id);
 for(const id of ids){try{const r=await ev(id);rows.push(r)}catch(e){rows.push({id,err:'eval '+e.message.slice(0,60)})}}
 fs.writeFileSync(OUT,JSON.stringify({W,H,errs,rows},null,1));await b.close()})();
