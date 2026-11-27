/* arrive-walk robot (review/arrive-walk-fix; RV-171 §5 LIVE bug): entering a place / hall must leave her THERE with the khắc of that one walk.
   Bug: jpm.js «arriving in a hall shows the ROOM» auto-clicked the top-bar #k3room («Về phòng» = k3RoomTap → homeGo) → she arrived, then was
   walked straight home (goTo("home"), khắc spent). Fix: the arrival switches the view directly (k3Home).
   Each round: home, Dư đồ tab, REAL tap on a place spot (rotating over every walkable place / palace hall on the plan) → «Chọn người theo hầu»
   («Đi một mình» → «Lên đường») → arrival; then waits past the arrival timers and asserts:
     place === the target · no goTo("home") / goTo(other) after the arrival · khắc (used) unchanged since the arrival · 0 page errors.
   With the goal links build (jglink: kitGoalDetail + [data-kglink] «Đi tới»), every 3rd round enters Nội vụ phủ by the goal «Đi tới» instead.
   usage: node dev/test/arrive-walk.js <index.html|url> [WxH,...] [rounds=20]   (exit 1 on a FAIL; run several copies at once for the load race) */
const {chromium}=require('playwright');const path=require('path');const {autoDismissRoulette,dismissRoulette}=require('./lib/roulette');
const [,,ARG,SIZES,RN]=process.argv;const URL=/^(file|https?):/.test(ARG||'')?ARG:'file://'+path.resolve(ARG||path.join(__dirname,'../index.html'));const ROUNDS=+(RN||20);
(async()=>{const b=await chromium.launch();let bad=0;
 for(const wh of (SIZES||'755x1000,1180x820').split(',')){const [W,H]=wh.split('x').map(Number);const fails=[];const F=m=>{if(fails.length<40)fails.push(m)};
  const ctx=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block',hasTouch:true,isMobile:W<1100,deviceScaleFactor:1});await autoDismissRoulette(ctx);
  const p=await ctx.newPage();p.setDefaultTimeout(60000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL+(URL.includes('?')?'&':'?')+'khost=0',{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(800);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear();localStorage.setItem('ctm-bgpause','1')}catch(e){}document.getElementById('title').hidden=true;window.__forceOrigin='tt';start()});
  await dismissRoulette(p);await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.st&&!document.querySelector('.kroul,#kroul,#kroulw'),null,{timeout:90000});
  /* trace every goTo: [k, used after the call] */
  const info=await p.evaluate(()=>{Q.length=0;showModal();try{msStart67('sung14');Q.length=0;showModal()}catch(e){}
   window.__awT=[];const g0=goTo;goTo=function(k){const r=g0.apply(this,arguments);try{window.__awT.push([k,used,S.place])}catch(e){}return r};
   return {goal:typeof kitGoalDetail==='function'&&typeof glShopKeys==='function'}});
  const tally={rounds:0,ok:0,map:0,goal:0,kpm:0,miss:0,places:{}};
  for(let r=0;r<ROUNDS;r++){
   const useGoal=info.goal&&r%3===2;
   /* reset: home, a fresh buổi budget, no open card, Dư đồ tab */
   const tgt=await p.evaluate(([r,useGoal])=>{Q.length=0;showModal();S.place='home';S.hall=null;popIdx=null;window.__kpm=null;window.__kpmArrive=0;used=0;S.confined=0;S.buoi=0;
    try{K3SH.home=false}catch(e){}tab=useGoal?'act':'go';render();window.__awT=[];
    if(useGoal)return {k:'nvp',how:'goal'};
    const L=[...document.querySelectorAll('#panel .mspot[data-go]')].map(e=>e.dataset.go).filter((k,i,a)=>k&&k!=='home'&&!/^kpm:/.test(k)&&a.indexOf(k)===i);
    const ok=L.filter(k=>{try{return !(typeof walkWhy==='function'&&walkWhy(k))}catch(e){return true}});const A=ok.length?ok:L;if(!A.length)return null;
    const k=A[r%A.length];return {k,how:'map',kpm:typeof kpmSlotOf==='function'&&kpmSlotOf(k)!=null,n:A.length}},[r,useGoal]);
   if(!tgt){F('round '+r+': no place spot on Dư đồ');continue}
   if(tgt.how==='goal'){await p.evaluate(()=>kitGoalDetail());await p.waitForTimeout(500);
    const has=await p.evaluate(()=>{const e=[...document.querySelectorAll('#modal [data-kglink]')].find(x=>/Nội vụ phủ/.test(x.textContent));if(e)e.click();return !!e});await p.waitForTimeout(500);
    if(!has){F('round '+r+': no goal link to Nội vụ phủ');continue}
    await p.evaluate(()=>{const o=[...document.querySelectorAll('#modal .opt,#modal button')].find(e=>e.offsetParent&&/^Đi tới/.test(e.innerText.trim()));if(o)o.click()});tally.goal++}
   else{/* a real tap on the spot (Playwright pointer), fall back to a DOM click when the spot sits under a zone label */
    const loc=p.locator(`#panel .mspot[data-go="${tgt.k}"]`).first();let tapped=false;try{await loc.scrollIntoViewIfNeeded({timeout:2000});await loc.click({timeout:3000});tapped=true}catch(e){}
    if(!tapped)await p.evaluate(k=>{const e=document.querySelector(`#panel .mspot[data-go="${k}"]`);if(e)e.click()},tgt.k);tally.map++;if(tgt.kpm)tally.kpm++}
   await p.waitForTimeout(600);
   /* companion list / courtyard rows: «Đi một mình» → «Lên đường»; a palace courtyard map: tap its main hall row */
   await p.evaluate(async()=>{const bt=re=>[...document.querySelectorAll('#modal button')].find(e=>e.offsetParent&&!e.disabled&&re.test(e.innerText.trim()));
    for(let n=0;n<30;n++){if(Q[0]&&Q[0].t==='Chọn người theo hầu'){const g=bt(/^Lên đường/);if(g)g.click();else{const b=bt(/^Đi một mình/);if(b)b.click()}}
     else if(!Q.length&&window.__kpm){const row=document.querySelector('#panel .kpm-row[data-kpmpart="chinh"]')||document.querySelector('#panel .kpm-row');if(row)row.click();else break}
     else break;await new Promise(r=>setTimeout(r,300))}});
   /* a random arrival happening may come first: clear it (the companion card is gone) */
   await p.evaluate(()=>{if(Q[0]&&Q[0].t!=='Chọn người theo hầu'){Q.length=0;showModal();render()}});
   await p.waitForTimeout(1500);
   const res=await p.evaluate(k=>{const T=window.__awT||[];const i=T.findIndex(x=>x[0]===k&&x[2]===k);const after=i>=0?T.slice(i+1).filter(x=>x[2]!==k||x[0]!==k):[];
    return {place:S.place,arr:i>=0?T[i]:null,after,usedNow:used,trace:T.map(x=>x.join('/')),q:Q.map(m=>m.t||'').slice(0,2),tab,home:document.querySelector('.game.k3home')?1:0}},tgt.k);
   tally.rounds++;tally.places[tgt.k]=(tally.places[tgt.k]||0)+1;
   if(!res.arr){/* never arrived: a closed gate / a refused walk is not this bug, but say it */if(res.trace.some(x=>/^home\//.test(x)))F(`round ${r} ${tgt.how}:${tgt.k}: walked home without arriving ${JSON.stringify(res)}`);else{tally.miss++}continue}
   const walkedOff=res.after.length>0,spent=res.usedNow!==res.arr[1];
   if(res.place!==tgt.k||walkedOff||spent)F(`round ${r} ${tgt.how}:${tgt.k}: place=${res.place} used ${res.arr[1]}→${res.usedNow} after=${JSON.stringify(res.after)} trace=${res.trace.join(',')}`);
   else tally.ok++}
  if(errs.length)F('page errors '+[...new Set(errs)].slice(0,5).join(' | '));if(fails.length)bad++;
  console.log(wh,fails.length?'FAIL '+fails.join(' ;; '):'PASS',JSON.stringify(tally));await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
