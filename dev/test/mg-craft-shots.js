/* mg-craft shots — node dev/test/mg-craft-shots.js <outDir OUTSIDE the repo> [dev/index.html] [--kinds=td_cong,theu,kim]
   For each craft kind on its new engine, on Fold 755x1000@2 and iPad 1180x820@2: 1 rules screen (kgReady), 2 guided round (ghost hand), 3 play mid-board,
   4 result. Shots never go in git (OD 16/11 18:50Z): write them to scratch, look at them, upload to CDN img/_review/mg-craft/ for the reviewer. */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const A=process.argv.slice(2);const pos=A.filter(a=>!a.startsWith('--'));const out=pos[0];if(!out){console.error('outDir needed');process.exit(2)}fs.mkdirSync(out,{recursive:true});
const URL0=pos[1]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const kk=(A.find(a=>a.startsWith('--kinds='))||'').split('=')[1];
const DEV=[['fold',755,1000],['ipad',1180,820]];
const SRC0=k=>k==='td_cong'?`(TDS.busy=false,tdPlay("cong","self"))`:k==='hoa'?`startContest({art:"hoa",title:"Hội thi",onDone:()=>{}})`:`playArt({art:${JSON.stringify(k)},onDone:()=>{}})`;
(async()=>{const b=await chromium.launch();
 for(const [dn,w,h] of DEV){const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.suc=100;S.bac=999;try{render()}catch(e){}});
  await p.waitForTimeout(2500);
  /* the welcome chest / reward stage of a new game is not part of these shots */
  await p.evaluate(()=>{try{kitReward=()=>{};kmPush=()=>{}}catch(e){}document.querySelectorAll('#kmrew').forEach(e=>{const o=e.closest('.kmstage')||e;o.remove()});document.querySelectorAll('.kmstage,.km-stage').forEach(e=>e.remove())});
  const kinds=await p.evaluate(()=>Object.keys(KG82_CRAFT).filter(k=>crOn(k)).concat(['theu']));/* + Thêu «Nhớ mẫu thêu» (j82 pattern, kept by the owner 21/11 ~01:05Z) */
  for(const k of kinds){if(kk&&!kk.split(',').includes(k))continue;
   const shot=async n=>{await p.screenshot({path:`${out}/${k}-${dn}-${n}.png`});console.log(`${out}/${k}-${dn}-${n}.png`)};
   await p.evaluate(s=>{try{kg82Close()}catch(e){}Q.length=0;(0,eval)(s)},SRC0(k));await p.waitForTimeout(1200);await shot('1rules');
   await p.evaluate(()=>{const t=document.getElementById('kgrtut');if(t)t.click()});await p.waitForTimeout(3200);await shot('2guide');
   await p.evaluate(()=>{const b=document.getElementById('kgtback');if(b)b.click()});await p.waitForTimeout(500);
   await p.evaluate(()=>{const g=document.querySelector('.kgr-go');if(g)g.click()});await p.waitForTimeout(2500);
   /* play a little by the oracle so the board is mid-way */
   await p.evaluate(async()=>{const sl=t=>new Promise(r=>setTimeout(r,t));const end=performance.now()+5000;
    const fire=(ty,x,y)=>{const cv=document.querySelector('#kg82box canvas');if(cv)cv.dispatchEvent(new PointerEvent(ty,{clientX:x,clientY:y,pointerId:1,pointerType:'touch',isPrimary:true,bubbles:true}))};
    while(performance.now()<end){await sl(10);const pk=KG82.peek&&KG82.peek();if(!pk)continue;if(pk.sel)continue;
     if(pk.drag){const L=pk.drag,Z=L[L.length-1];/* a cut is a 2-point drag */fire('pointerdown',L[0][0],L[0][1]);for(let i=1;i<=6;i++){fire('pointermove',L[0][0]+(Z[0]-L[0][0])*i/6,L[0][1]+(Z[1]-L[0][1])*i/6);await sl(15)}fire('pointerup',Z[0],Z[1]);await sl(250)}
     else if(pk.x!=null){if(pk.at!=null){const t=crNow()+pk.at;while(crNow()<t)await sl(2)}fire('pointerdown',pk.x,pk.y);await sl(80)}}});
   await shot('3play');
   /* to the end quickly: the bot at high speed */
   await p.evaluate(async()=>{CRAFT.speed=3;const sl=t=>new Promise(r=>setTimeout(r,t));const end=performance.now()+60000;
    const fire=(ty,x,y)=>{const cv=document.querySelector('#kg82box canvas');if(cv)cv.dispatchEvent(new PointerEvent(ty,{clientX:x,clientY:y,pointerId:1,pointerType:'touch',isPrimary:true,bubbles:true}))};
    while(performance.now()<end&&KG82.phase==='play'&&KG82.run){await sl(6);const pk=KG82.peek&&KG82.peek();if(!pk)continue;
     if(pk.sel){const e=document.querySelector(pk.sel);if(e&&!e.disabled)e.click();await sl(200)}
     else if(pk.drag){const L=pk.drag,Z=L[L.length-1];/* a cut is a 2-point drag */fire('pointerdown',L[0][0],L[0][1]);fire('pointermove',Z[0],Z[1]);fire('pointerup',Z[0],Z[1]);await sl(120)}
     else if(pk.x!=null){if(pk.at!=null){const t=crNow()+pk.at;while(crNow()<t)await sl(1)}fire('pointerdown',pk.x,pk.y);await sl(30)}}CRAFT.speed=1});
   await p.waitForTimeout(1500);await shot('4result');await p.evaluate(()=>{try{kg82Close()}catch(e){}})}
  if(errs.length)console.log(dn,'page errors',errs.slice(0,3));await p.close()}
 await b.close()})();
