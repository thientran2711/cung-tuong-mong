/* kit-group-cost (K-GROUP-COST, RV-188 note a, laws 2/4): a door group card (jdoor DOOR.deck fold, drawn by cardH) prints its members' khắc SPAN
   «k–kHi khắc» (k = cheapest usable way, kHi = dearest way it lists), never only the cheapest way while a dearer one sits inside («Nghỉ ngơi» said 1 khắc, holds 4).
   node dev/test/kit-group-cost.js [dev/index.html]
   Whole family = every door group card on the board: Hành sự (consort) + lãnh cung (S.out) × Fold 755x1000 + iPad 1180x820.
   PASS per card (Hành sự tab open, card visible): its visible TỐN khắc == span of its members' cardCost (j2, what act() spends); the time line is not clipped; ≥1 card with a real span seen.
   KMUT=1 → the old line (cheapest only) is expected → FAIL. (Phận sự / khuê các boards need their own start: not covered here.) */
const {chromium}=require('playwright');const path=require('path');
const U0=process.argv[2]||'dev/index.html';const URL='file://'+path.resolve(U0);const KMUT=process.env.KMUT==='1';
(async()=>{const b=await chromium.launch();let bad=0,span=0,n=0;
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){
  const p=await (await b.newContext({viewport:{width:W,height:H}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
  await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0});await p.waitForTimeout(7000);
  for(const road of ['hs','cold']){
   await p.evaluate(([road,KMUT])=>{try{kmReset()}catch(e){}Q.length=0;showModal();if(road==='cold')S.out=S.out||{};if(KMUT)window.cardCostW=a=>String(cardCost(a));render()},[road,KMUT]);
   if(!(await p.evaluate(()=>{const P=document.getElementById('panel');return !!(P&&P.getClientRects().length)})))/* open Hành sự only when the board is closed (a 2nd tap closes it) */
    {await p.locator('button',{hasText:/^\s*Hành sự\s*$/}).first().click({timeout:5000}).catch(()=>{});await p.waitForTimeout(1200)}
   const R=await p.evaluate(([road,KMUT])=>{
    return [...document.querySelectorAll('#panel button[data-ddoor]')].map(b=>{const I=b.dataset.ddi.split(",").map(Number),X=b.dataset.ddx.split(",").map(Number);
     const ks=I.map(i=>cardCost(deck[i])),ok=ks.filter((k,j)=>X[j]),lo=Math.min(...(ok.length?ok:ks)),hi=Math.max(...ks);const vis=b.getClientRects().length>0;
     const M=[...new Set((b.innerText||'').match(/\d+(?:–\d+)? khắc(?! \(còn)/g)||[])];/* the visible TỐN line (the «Cần … (còn N)» chip keeps the cheapest way: what she needs to start) */
     const clip=[...b.querySelectorAll('*')].some(e=>e.children.length===0&&/khắc/.test(e.textContent)&&e.getClientRects().length&&e.scrollWidth>e.clientWidth+1);
     return{n:b.dataset.ddoor,want:hi>lo?`${lo}–${hi} khắc`:`${lo} khắc`,got:vis?M.join(" | "):"(card not visible)",clip,ks}})},[road,KMUT]);
   if(!R.length)console.log(`INFO ${tag} ${road}: no door group card on this board`);
   for(const r of R){n++;if(r.want.includes('–'))span++;const ok=r.got===r.want&&!r.clip;if(!ok)bad++;console.log((ok?'ok  ':'FAIL')+` ${tag} ${road} «${r.n}» got «${r.got}» want «${r.want}»${r.clip?' CLIPPED':''} members ${r.ks}`)}}
  if(errs.length){bad++;console.log('FAIL page errors',errs.slice(0,3))}
 }await b.close();if(!span){bad++;console.log('FAIL no group card with a real span seen')}
 console.log(bad?`KIT-GROUP-COST FAIL ${bad}/${n}`:`KIT-GROUP-COST ALL OK ${n} (${span} with a span)`);process.exit(bad?1:0)})();
