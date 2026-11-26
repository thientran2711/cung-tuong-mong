/* promo-root (25/11): the «Bị bỏ quên» lãnh cung trap. usage: GAME=<index.html> node dev/test/promo-root.js
   Robot lives s8 / s9b (thầy đồ / buôn muối, rank 0, Sủng 0, Danh ≤ BAL.danhG.forget) were sent to lãnh cung by «Bị bỏ quên» (j3 monthTick)
   in month 1–3, and every release (đại xá, cầu xin, Thái hậu…) was undone by the same rule in the same monthTick → rank 0 for 11–12 years.
   Checks, each through the real monthTick: (1) đại xá in coldMonth frees her and she is STILL free after the month; (2) a release by restore()
   (cầu xin) survives the next BAL.danhG.forgetGrace months; (3) a newcomer with Sủng 0 / Danh 0 is not forgotten in her first forgetGrace months;
   (4) the rule still works: after the grace a forgotten girl is sent to lãnh cung.
   PROMO-ROOT2 (whole family, one helper forgetSafe j14): (5) the Empress pardon's fallback (jagacts hhAct, restore throws) starts the grace;
   (6) the kỳ tuyển palace entry kcEnter (jkc) and (7) kc2Enter (jkc2) start it even when the home life left S.forgetAt in the past;
   (8) a maid raised to Đáp ứng (j42 srvRise) starts it. Each: forgetAt = turn+1+forgetGrace, then free for every grace month. */
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
  /* LC20 (26/11, MAIN 153): the «after the grace → forgotten» checks run ONE real monthTick; a random month event (rival, story, servant, kid…) could
     give her Sủng/Danh that month and rightly keep her out of lãnh cung (8446da67: 2/12 BAD, game correct). quiet() runs those ticks (the grace months
     too: a random release in a grace month restarts S.forgetAt) with the month's random event steps stubbed to nothing, and her poetry (j3: thi ≥ BAL.tho.lv adds Sủng every month — the bot's earlier steps sometimes trained it) set to 0 for those ticks, so only the «Bị bỏ quên» rule decides. */
  const QUIET=['maidMonth','pregMonth','itemMonth','anMonth','oanMonth','illMonth','servRanks','servMonth','facMonth','kidsMonth','rivalsMonth','storyMonth','heirMonth'];
  const quiet=()=>{const keep={},thi=S.arts&&S.arts.thi;for(const f of QUIET)if(typeof window[f]==='function'){keep[f]=window[f];window[f]=()=>''}if(S.arts)S.arts.thi=0;try{tick(false)}finally{for(const f in keep)window[f]=keep[f];if(S.arts)S.arts.thi=thi}};
  const snap=JSON.stringify(S);
  /* (1) đại xá inside the real monthTick */
  low();S.out=0;cold("Bị bỏ quên, đưa vào lãnh cung");tick(true);o.amnestyFree=!S.out;
  /* (2) a restore survives the grace months */
  low();if(!S.out)cold("Bị bỏ quên, đưa vào lãnh cung");restore(false,"Hoàng thượng đọc thư, động lòng");let free=0;for(let k=0;k<G;k++){quiet();if(!S.out)free++}o.graceFree=free;
  /* (4) after the grace she can be forgotten again */
  quiet();o.afterGraceOut=!!S.out;
  /* (3) a newcomer (no forgetAt yet) */
  if(S.out)restore(false,"x");S.forgetAt=undefined;let n=0;for(let k=0;k<G;k++){quiet();if(!S.out)n++}o.newFree=n;quiet();o.newAfterOut=!!S.out;
  o.dead=!!S.dead;return o});
 ok(R.amnestyFree,`đại xá in monthTick: free after the month (${R.amnestyFree})`);
 ok(R.graceFree===R.G,`restore: free ${R.graceFree}/${R.G} grace months`);
 ok(R.afterGraceOut,`after the grace, Sủng 0 + Danh 0 at rank 0 → «Bị bỏ quên» still fires (${R.afterGraceOut})`);
 ok(R.newFree===R.G,`newcomer: free ${R.newFree}/${R.G} first months`);
 ok(R.newAfterOut,`newcomer after the grace → forgotten (${R.newAfterOut})`);

 /* PROMO-ROOT2: every other exit / entry path, through the real code, then the real monthTick */
 const fam=async(tag,setup)=>{const o=await page.evaluate(`(()=>{const G=BAL.danhG.forgetGrace,o={G};
  const low=()=>{S.rank=0;S.sung=0;S.danh=0;S.bac=0;S.an=0;S.confined=0;S.preg=0;S.dead=false;S.suc=100};
  try{${setup}}catch(e){o.err=String(e&&e.message||e);return o}Q.length=0;
  o.out=!!S.out;o.at=S.forgetAt;o.want=S.turn+1+G;let n=0;for(let k=0;k<G;k++){low();S.month=1;try{monthTick()}catch(e){o.err=String(e.message);break}Q.length=0;if(!S.out)n++}o.free=n;return o})()`);
  ok(!o.err&&!o.out&&o.at===o.want&&o.free===o.G,`${tag}: forgetAt ${o.at}=${o.want}, free ${o.free}/${o.G} grace months${o.err?' ERR '+o.err:''}`)};
 const fresh=`quiet=true;localStorage.clear();window.__forceOrigin='tt';start();quiet=false;Q.length=0;`;
 await fam('(5) pardon fallback (restore throws)',`${fresh}S.out=0;cold("x");S.forgetAt=S.turn-9;const a=liveRivals(true)[0]||rivals[0];const r0=restore;restore=()=>{throw new Error("stub")};try{hhAct(a,S,"pardon")}finally{restore=r0}`);
 await fam('(6) kỳ tuyển entry kcEnter',`quiet=true;localStorage.clear();window.__forceOrigin='tt';start();if(!S.kc&&kcOk(S.origin.k))kcInit();quiet=false;Q.length=0;S.turn+=20;S.forgetAt=S.turn-9;kcEnter(0)`);
 await fam('(7) kỳ tuyển entry kc2Enter',`quiet=true;localStorage.clear();window.__forceOrigin='tt';start();if(!S.kc&&kcOk(S.origin.k))kcInit();quiet=false;Q.length=0;S.turn+=20;S.forgetAt=S.turn-9;S.kc.ex=S.kc.ex||{art:""};kc2Enter(5)`);
 await fam('(8) maid raised to Đáp ứng srvRise',`${fresh}srvInit();S.age=Math.max(S.age||0,BAL.ageMin);S.forgetAt=S.turn-9;const rf=roomFor;roomFor=()=>true;try{srvRise("x")}finally{roomFor=rf}if(isSrv())throw new Error("still a maid")`);
 ok(!errs.length,`no page errors (${errs.slice(0,3).join(' | ')})`);
 console.log(bad?`promo-root: ${bad} BAD`:'promo-root: PASS');await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
