/* lc-stills (OWNER-UI-C, 27/11): REAL game stills of lãnh cung (kit lãnh cung frame, image pale) + dead (rank frame b/w): thumb row + card, Fold + iPad, full screen. The old kst-strip.js clones an alive rank-frame card (NOT the game) — do not send its output.
   usage: node dev/test/lc-stills.js <outdir>  → <outdir>/lc-{fold,ipad}-{lc,dead}.png + thumbs-{dev}.png (dsf 2 crop of the strip) */
const path=require('path');const {chromium}=require('playwright');const OUT=process.argv[2];
require('./lib/fresh-build')();
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost'}}:{});
for(const [n,w,h] of [["fold",755,1000],["ipad",1180,820]]){const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:2});
 await p.goto('file://'+path.resolve('dev/index.html'));await p.waitForTimeout(2500);
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false;Q.length=0;try{$("modal").hidden=true}catch(e){}
  const R=liveRivals(true).filter(x=>!x.queen).slice(0,6);R.forEach(x=>{try{k61Meet(x,'x',3)}catch(e){}});R[0].out=true;R[3].alive=false;tab="rv";PG.rv=0;render()});
 for(const k of ["lc","dead"]){const sel=k==="lc"?".kst-lc":".kst-dead";await p.evaluate(()=>{tab="rv";PG.rv=0;render()});await p.waitForTimeout(500);
  /* page the strip until the lc / dead face exists (it may sit on a later page), click it, then ASSERT the open card really is that person's (state on its portrait) — never shoot the wrong card (RV-172 FAIL-4) */
  for(let i=0;i<40&&!(await p.evaluate(s=>[...document.querySelectorAll(".pface "+s)].some(e=>e.getBoundingClientRect().width>4),sel));i++){await p.evaluate(()=>{const b=[...document.querySelectorAll("button")].filter(x=>/^[›»>]$/.test(x.textContent.trim())&&x.getBoundingClientRect().width>0);if(b.length)b[b.length-1].click()});await p.waitForTimeout(250)}
  await p.evaluate(s=>{const e=[...document.querySelectorAll(".pface")].find(x=>x.querySelector(s));if(e)e.click()},sel);await p.waitForTimeout(1200);
  if(!(await p.evaluate(s=>!!document.querySelector(".pc .pcp"+s),sel))){console.error("lc-stills: the open card is NOT the "+k+" person's ("+n+")");process.exit(1)}
  await p.screenshot({path:`${OUT}/lc-${n}-${k}.png`});
  if(k==="lc"){const bb=await p.evaluate(()=>{const e=document.querySelector(".pface");const r=e.closest(".pgwrap,.pager,div").getBoundingClientRect();const a=[...document.querySelectorAll(".pface")].map(x=>x.getBoundingClientRect());const t=Math.min(...a.map(x=>x.top))-24,bt=Math.max(...a.map(x=>x.bottom))+26;return{x:Math.min(...a.map(x=>x.left))-30,y:t,w:Math.max(...a.map(x=>x.right))-Math.min(...a.map(x=>x.left))+240,h:bt-t}});
   await p.screenshot({path:`${OUT}/thumbs-${n}.png`,clip:{x:Math.max(0,bb.x),y:Math.max(0,bb.y),width:Math.min(w-Math.max(0,bb.x),bb.w),height:bb.h}})}}
 await p.close()}await b.close()})();
