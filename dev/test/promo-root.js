/* promo-root (25/11): the «Bị bỏ quên» lãnh cung trap. usage: GAME=<index.html> node dev/test/promo-root.js
   Robot lives s8 / s9b (thầy đồ / buôn muối, rank 0, Sủng 0, Danh ≤ BAL.danhG.forget) were sent to lãnh cung by «Bị bỏ quên» (j3 monthTick)
   in month 1–3, and every release (đại xá, cầu xin, Thái hậu…) was undone by the same rule in the same monthTick → rank 0 for 11–12 years.
   Checks, each through the real monthTick: (1) đại xá in coldMonth frees her and she is STILL free after the month; (2) a release by restore()
   (cầu xin) survives the next BAL.danhG.forgetGrace months; (3) a newcomer with Sủng 0 / Danh 0 is not forgotten in her first forgetGrace months;
   (4) the rule still works: after the grace a forgotten girl is sent to lãnh cung. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const GAME=process.env.GAME||path.join(__dirname,'..','..','index.html');let bad=0;const ok=(c,t)=>{console.log((c?'ok   ':'BAD  ')+t);if(!c)bad++};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844}});
 await ctx.addInitScript(`window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};HTMLElement.prototype.focus=function(){};`);
 const page=await ctx.newPage();await page.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());const errs=[];page.on('pageerror',e=>errs.push(e.message));
 await page.goto('file://'+GAME);await page.waitForTimeout(500);await page.evaluate(()=>localStorage.clear());await page.reload();await page.waitForTimeout(500);
 await page.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await page.waitForTimeout(800);
 await page.evaluate(`window.__hhStop=1;window.__origO="muoi"`);
 await page.evaluate(fs.readFileSync(path.join(__dirname,'..','measure','inpage6.js'),'utf8'));
 for(let i=0;i<60;i++){const t=await page.evaluate(()=>{window.__bot.step("sens",40);return S&&!S.dead&&!(typeof isSrv==="function"&&isSrv())&&!Q.length?S.turn:-1});if(t>=1)break}
 const R=await page.evaluate(()=>{const G=BAL.danhG.forgetGrace,o={G};
  const low=()=>{S.rank=0;S.sung=0;S.danh=0;S.bac=0;S.an=0;S.confined=0;S.preg=0;S.dead=false;S.suc=100};
  const tick=(forceRoll)=>{const rr=roll,cm=coldMonth;if(forceRoll){coldMonth=function(){roll=()=>true;try{return cm.apply(this,arguments)}finally{roll=rr}}}
   try{low();S.month=1;monthTick()}finally{coldMonth=cm;roll=rr}low()};
  const snap=JSON.stringify(S);
  /* (1) đại xá inside the real monthTick */
  low();S.out=0;cold("Bị bỏ quên, đưa vào lãnh cung");tick(true);o.amnestyFree=!S.out;
  /* (2) a restore survives the grace months */
  low();if(!S.out)cold("Bị bỏ quên, đưa vào lãnh cung");restore(false,"Hoàng thượng đọc thư, động lòng");let free=0;for(let k=0;k<G;k++){tick(false);if(!S.out)free++}o.graceFree=free;
  /* (4) after the grace she can be forgotten again */
  tick(false);o.afterGraceOut=!!S.out;
  /* (3) a newcomer (no forgetAt yet) */
  if(S.out)restore(false,"x");S.forgetAt=undefined;let n=0;for(let k=0;k<G;k++){tick(false);if(!S.out)n++}o.newFree=n;tick(false);o.newAfterOut=!!S.out;
  o.dead=!!S.dead;return o});
 ok(R.amnestyFree,`đại xá in monthTick: free after the month (${R.amnestyFree})`);
 ok(R.graceFree===R.G,`restore: free ${R.graceFree}/${R.G} grace months`);
 ok(R.afterGraceOut,`after the grace, Sủng 0 + Danh 0 at rank 0 → «Bị bỏ quên» still fires (${R.afterGraceOut})`);
 ok(R.newFree===R.G,`newcomer: free ${R.newFree}/${R.G} first months`);
 ok(R.newAfterOut,`newcomer after the grace → forgotten (${R.newAfterOut})`);
 ok(!errs.length,`no page errors (${errs.slice(0,3).join(' | ')})`);
 console.log(bad?`promo-root: ${bad} BAD`:'promo-root: PASS');await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
