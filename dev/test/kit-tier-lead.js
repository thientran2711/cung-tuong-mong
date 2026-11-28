/* kit-tier-lead (K-TIER-LEAD, kit keeper KK73 28/11, RV-190 follow-up; laws 2 / 11): a ONE «tier» door group card (jone deckPaint) names a road for
   EVERY tier it has on its lead line — a tier whose way is closed NOW reads «vừa: <way> (chưa làm được)», never a bare «—» (which read as «no dearer road»
   while «Nghỉ ngơi dưỡng sức», 4 khắc, sat in the card's THÀNH). Whole family = every tier lead on the Hành sự + lãnh cung boards, Fold 755x1000 + iPad 1180x820.
   Pinned case: at the start (morning) «Nghỉ ngơi» leads «nhẹ: Nghỉ ngơi một lát · vừa: Nghỉ ngơi dưỡng sức (chưa làm được)» (that way is «Chỉ buổi tối»).
   node dev/test/kit-tier-lead.js [dev/index.html]     KMUT=1 → the old bare «—» is put back on the lead → must FAIL */
const {chromium}=require('playwright');const path=require('path');
const U0=process.argv[2]||'dev/index.html';const URL='file://'+path.resolve(U0);const KMUT=process.env.KMUT==='1';
(async()=>{const b=await chromium.launch();let bad=0,n=0,nghi=0;
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){
  const p=await (await b.newContext({viewport:{width:W,height:H}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
  await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0});await p.waitForTimeout(7000);
  for(const road of ['hs','cold']){
   await p.evaluate(([road])=>{try{kmReset()}catch(e){}Q.length=0;showModal();if(road==='cold')S.out=S.out||{};render()},[road]);
   if(!(await p.evaluate(()=>{const P=document.getElementById('panel');return !!(P&&P.getClientRects().length)})))
    {await p.locator('button',{hasText:/^\s*Hành sự\s*$/}).first().click({timeout:5000}).catch(()=>{});await p.waitForTimeout(1200)}
   await p.waitForTimeout(600);
   const R=await p.evaluate(([KMUT])=>[...document.querySelectorAll('#panel button[data-ddoor]')].map(b=>{const e=b.querySelector('.klead')||b.querySelector('p');/* the kit turns the card's <p> into its lead (.klead) */let t=e?e.textContent.trim():"";
     if(KMUT)t=t.replace(/: [^·]*\(chưa làm được\)/g,": —");
     const tiers=(t.match(/(nhẹ|vừa|nặng): ([^·]*)/g)||[]).map(x=>{const m=x.match(/(nhẹ|vừa|nặng): (.*)/);return{t:m[1],v:m[2].trim()}});
     return{n:b.dataset.ddoor,lead:t,tiers,vis:b.getClientRects().length>0}}).filter(x=>x.tiers.length),[KMUT]);
   if(!R.length)console.log(`INFO ${tag} ${road}: no tier group card on this board`);
   for(const r of R){n++;const ok=r.tiers.every(x=>x.v&&x.v!=="—");if(!ok)bad++;console.log(`${ok?'ok  ':'FAIL'} ${tag} ${road} «${r.n}» lead «${r.lead}»`);
    if(/^Nghỉ ngơi$/.test(r.n)){nghi++;const v=(r.tiers.find(x=>x.t==="vừa")||{}).v||"";const ok2=/Nghỉ ngơi dưỡng sức/.test(v);if(!ok2)bad++;console.log(`${ok2?'ok  ':'FAIL'} ${tag} ${road} «Nghỉ ngơi» vừa names «Nghỉ ngơi dưỡng sức»: «${v}»`)}}}
  if(errs.length){bad++;console.log('FAIL page errors',errs.slice(0,3))}
 }await b.close();if(!nghi){bad++;console.log('FAIL the «Nghỉ ngơi» tier card was not seen')}
 console.log(bad?`KIT-TIER-LEAD FAIL ${bad}/${n}`:`KIT-TIER-LEAD ALL OK ${n} tier leads («Nghỉ ngơi» seen ${nghi}×)`);process.exit(bad?1:0)})();
