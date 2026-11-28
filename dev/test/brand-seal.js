/* review/brand: the Trân nữ seal (kitSeal) in the top bar. Pages served by routing from the repo root (http://br.local/<file>).
   usage: node dev/test/brand-seal.js <page: index.html> <W>x<H>@dpr <outdir> <tag> [chip]
   Starts a life, shows the top bar, optionally the "Có bản mới" chip, shoots the bar and prints JSON: the seal's box, the gaps (px) to the
   quẻ line, the chip and every other part of the bar (negative = overlap), page errors, horizontal overflow. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');
const [,,PAGE,SZ,OUT,TAG,CHIP]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
const ROOT=path.resolve(__dirname,'../..');
const MIME={html:'text/html',js:'text/javascript',json:'application/json',webp:'image/webp',png:'image/png',jpg:'image/jpeg',css:'text/css',webmanifest:'application/manifest+json'};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 await ctx.route('**/*',r=>{const u=new URL(r.request().url());if(u.host!=='br.local')return r.continue();
  const f=path.join(ROOT,decodeURIComponent(u.pathname));if(/assets\.json$/.test(f)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  r.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':MIME[f.split('.').pop()]||'application/octet-stream'}})});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://br.local/'+PAGE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(4000);
 await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove();SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;for(let i=0;i<2;i++){try{nextBuoi()}catch(e){}Q.length=0}render()});
 await p.waitForTimeout(9000);
 await p.evaluate(()=>{document.querySelectorAll('.krbox').forEach(e=>{const w=e.parentElement;if(w&&w!==document.body)w.remove()});for(let i=0;i<4;i++)document.querySelectorAll('[data-km-close]').forEach(b=>b.click());Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;const w=document.getElementById('dawn');if(w)w.hidden=true;render()});
 await p.waitForTimeout(800);
 await p.waitForTimeout(800);
 /* worst case: the longest quẻ line the game writes */
 await p.evaluate(()=>{const l=document.querySelector('.k3lot .k3l');if(l)l.textContent='Quẻ Thượng thượng (Giao thiệp)';try{kitSealHud()}catch(e){}});
 if(process.env.NOSEAL)await p.evaluate(()=>{const h=document.querySelector('header.hud');h.classList.remove('has-kseal','kseal-pad');const s=h.querySelector('.kseal-hud');if(s)s.style.visibility='hidden'});
 if(CHIP)await p.evaluate(()=>{try{KSW.showChip()}catch(e){}});
 await p.waitForTimeout(300);
 const R=await p.evaluate(()=>{const hud=document.querySelector('header.hud');const s=document.querySelector('.kseal-hud');const rb=e=>{const r=e.getBoundingClientRect();return{l:+r.left.toFixed(1),t:+r.top.toFixed(1),r:+r.right.toFixed(1),b:+r.bottom.toFixed(1),w:+r.width.toFixed(1),h:+r.height.toFixed(1)}};
  if(!s)return{seal:null};const S=s.getBoundingClientRect();
  const gap=q=>{const dx=Math.max(q.left-S.right,S.left-q.right),dy=Math.max(q.top-S.bottom,S.top-q.bottom);return +(Math.max(dx,dy)).toFixed(1)};
  /* every visible leaf box in the bar (text, chips, buttons, pictures) except the seal itself */
  const L=[...hud.querySelectorAll('*'),...document.querySelectorAll('#kupdchip')].filter(e=>!s.contains(e)&&e!==s&&e.getClientRects().length&&(e.children.length===0||e.matches('button,.kchip,.k3r')))
   .map(e=>({e,r:e.getBoundingClientRect()})).filter(o=>o.r.width>0&&o.r.height>0);
  const near=L.map(o=>({n:(o.e.id?'#'+o.e.id:'')+'.'+String(o.e.className||o.e.tagName).split(' ')[0],txt:(o.e.textContent||'').trim().slice(0,30),gap:gap(o.r)})).sort((a,b)=>a.gap-b.gap).slice(0,4);
  /* the time block (buổi, weather, quẻ) must not run into the stat cells either (one-row layout) */
  const tcLeaves=[...document.querySelectorAll('#k3tc *')].filter(e=>e.children.length===0&&e.getClientRects().length).map(e=>e.getBoundingClientRect());
  const tcR=Math.max(...tcLeaves.map(r=>r.right)),tcL=Math.min(...tcLeaves.map(r=>r.left));
  /* the "Có bản mới" chip and the time block (they share the first row on wide screens) */
  const chipE=document.getElementById('kupdchip');let chipTc=null;if(chipE&&!chipE.hidden&&chipE.getClientRects().length){const c=chipE.getBoundingClientRect();
   const all=[...hud.querySelectorAll('*')].filter(e=>e.children.length===0&&e.getClientRects().length&&!s.contains(e)).map(e=>e.getBoundingClientRect()).filter(r=>r.width&&r.height);
   chipTc=Math.min(...all.map(r=>Math.max(r.left-c.right,c.left-r.right,r.top-c.bottom,c.top-r.bottom)));chipTc=+chipTc.toFixed(1)}
  const st=document.getElementById('kstrow').getBoundingClientRect(),tcB=document.getElementById('k3tc').getBoundingClientRect();
  const tcGap=st.top<tcB.bottom-2&&st.left>tcB.left?+(st.left-tcR).toFixed(1):null;
  const lot=document.querySelector('.k3lot');const chip=document.getElementById('kupdchip');
  return{seal:rb(s),hud:rb(hud),lot:lot?{txt:lot.textContent.trim(),gap:gap(lot.getBoundingClientRect())}:null,chip:chip&&!chip.hidden&&chip.getClientRects().length?{gap:gap(chip.getBoundingClientRect()),box:rb(chip)}:null,
   near,tcGap,chipTc,tcBox:[+tcB.left.toFixed(1),+tcB.right.toFixed(1)],tcInk:[+tcL.toFixed(1),+tcR.toFixed(1)],overlap:near.filter(o=>o.gap<0),pe:getComputedStyle(s).pointerEvents,ovf:document.documentElement.scrollWidth>innerWidth+1}});
 const hb=await p.evaluate(()=>{const r=document.querySelector('header.hud').getBoundingClientRect();return{x:0,y:0,width:innerWidth,height:Math.ceil(r.bottom+6)}});
 await p.screenshot({path:`${OUT}/${TAG}-bar.png`,clip:hb});await p.screenshot({path:`${OUT}/${TAG}.jpg`,quality:70,type:'jpeg'});
 console.log(JSON.stringify({tag:TAG,W,H,...R,errs}));await b.close()})();
