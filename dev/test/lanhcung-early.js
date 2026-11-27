/* lanhcung-early (Foreman B ROOT 3, brief b-lanhcung-early): a forgotten low consort is NOT thrown into lãnh cung (no fault ⇒ no punishment).
   usage: GAME=<index.html> node dev/test/lanhcung-early.js      (MUTATE=1 puts back the LIVE 772bee4f rule on top of the page → must FAIL)
   FINDING: robot lives (F flight2-s18d rank 1→0 at the month tick of turn 14, E-S4 speed-4 turn 13, E-S5 cautious-4 turns 28/40, E-S7 greedy-2
   turn 6 = the end of BAL.danhG.forgetGrace) and the headless sim (dev/measure/lanhcung-sim.js) were sent to lãnh cung by «Bị bỏ quên»
   (LIVE j3 monthTick: Sủng ≤ 0, Danh ≤ BAL.danhG.forget, rank ≤ 1, after the grace) — no crime, no evidence, no warning, her only (no NPC rule):
   against law 5, law 6a, law 1 and the rulings OD 24/11 ~07:55Z + MAIN 118 P3 («bị bỏ quên» = thất sủng, no lãnh cung) and the punishment
   canon OD 26/11 ~20:35Z (lãnh cung only for a proven NẶNG charge). The fix EXISTS on review/punish-stack-live-3 (PUNISH-TIER, j8 tsMonth /
   tsMonthAll, BAL.thatS); this test guards it. Checks through the REAL monthTick (random month steps stubbed, as promo-root LC20):
   (1) rank 0, Sủng 0, Danh 0 after the grace → NOT in lãnh cung, rank kept, thất sủng (S.thatS); (2) the same at rank 1 (Thường tại);
   (3) the next month: still not in lãnh cung; (4) a newcomer's first BAL.danhG.forgetGrace months: nothing; (5) above BAL.thatS.rank: never;
   (6) LAW 1: an NPC at rank 0 / Sủng 0 / Danh 0 → thất sủng too, no lãnh cung, rank kept; (7) her way back (law 6a: a defence that can work):
   Sủng ≥ BAL.thatS.back → the tablet returns (thatS cleared); (8) the numbers are BAL's (BAL.thatS.sung / rank / back / decay). */
const {chromium}=require('playwright');const path=require('path');
const GAME=process.env.GAME||path.join(__dirname,'..','..','index.html');let bad=0;const ok=(c,t)=>{console.log((c?'ok   ':'BAD  ')+t);if(!c)bad++};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844}});
 await ctx.addInitScript(`window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};HTMLElement.prototype.focus=function(){};`);
 const page=await ctx.newPage();await page.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());const errs=[];page.on('pageerror',e=>errs.push(e.message));
 await page.goto('file://'+path.resolve(GAME));await page.waitForTimeout(800);await page.evaluate(()=>localStorage.clear());await page.reload();await page.waitForTimeout(800);
 const R=await page.evaluate(MUT=>{const o={};
  quiet=true;window.__forceOrigin='tt';start();quiet=false;Q.length=0;
  if(MUT){/* the LIVE 772bee4f rule, put back on top of monthTick */const mt=monthTick;monthTick=function(){if(!S.out&&S.forgetAt!=null&&S.turn>=S.forgetAt&&S.sung<=0&&S.danh<=BAL.danhG.forget&&S.rank<=1){cold("Bị bỏ quên, đưa vào lãnh cung");return""}return mt.apply(this,arguments)}}
  const T=BAL.thatS||null;o.T=T&&{sung:T.sung,rank:T.rank,back:T.back,decay:T.decay};const G=BAL.danhG.forgetGrace;o.G=G;const TR=T?T.rank:1;
  const QUIET=['maidMonth','pregMonth','itemMonth','anMonth','oanMonth','illMonth','servRanks','servMonth','facMonth','kidsMonth','rivalsMonth','storyMonth','heirMonth','coldMonth','promote','moodMonth','demoteReview'];
  const low=r=>{S.rank=r;S.sung=0;S.danh=0;S.bac=500;S.an=0;S.confined=0;S.preg=0;S.dead=false;S.suc=100;S.out=0;S.thatS=0;S.punWk=null;if(S.arts)S.arts.thi=0};
  const tick=()=>{const keep={};for(const f of QUIET)if(typeof window[f]==='function'){keep[f]=window[f];window[f]=()=>''}const md=typeof mortEmpDue==='function'?mortEmpDue:null;if(md)mortEmpDue=()=>false;
   const rr=roll;roll=()=>false;/* no «chợt nhớ» recall roll in the checked month */
   try{S.month=2;S.age=20;monthTick();Q.length=0}catch(e){o.err=String(e&&e.message||e)}finally{roll=rr;for(const f in keep)window[f]=keep[f];if(md)mortEmpDue=md}};
  /* (1) rank 0 after the grace */
  low(0);S.forgetAt=S.turn;tick();o.r0={out:!!S.out,rank:S.rank,ts:!!S.thatS};
  /* (3) the next month */
  {const ts=S.thatS;low(0);S.thatS=ts;tick();o.again={out:!!S.out,rank:S.rank}}
  /* (7) her way back */
  if(S.thatS&&!S.out&&T){S.sung=T.back;tick();o.back=!S.thatS}
  /* (2) rank 1 */
  low(1);S.forgetAt=S.turn;tick();o.r1={out:!!S.out,rank:S.rank,ts:!!S.thatS};
  /* (4) newcomer */
  let n=0;for(let k=0;k<G;k++){low(0);if(k===0)S.forgetAt=undefined;else S.forgetAt=o.fa;tick();o.fa=S.forgetAt;if(!S.thatS&&!S.out)n++}o.newFree=n;
  /* (5) above the thất sủng ranks */
  low(TR+1);S.forgetAt=S.turn;tick();o.hi={out:!!S.out,rank:S.rank,ts:!!S.thatS};
  /* (6) an NPC at rank 0 (law 1) */
  const v=liveRivals(true).find(x=>x&&x!==S&&!x.out&&x.alive!==false&&!x.queen&&!x.coop&&rkOf(x)<7);if(v){low(TR+1);S.sung=50;S.danh=50;const r0=v.rank;v.rank=0;v.sung=0;v.danh=0;v.out=false;v.thatS=0;v.forgetAt=S.turn;
   tick();o.npc={out:!!v.out,rank:v.rank,ts:!!v.thatS};v.rank=r0;v.thatS=0}
  return o},!!process.env.MUTATE);
 console.log(JSON.stringify(R));
 ok(!R.err,`real monthTick ran (${R.err||'ok'})`);
 ok(R.T&&R.T.sung!=null&&R.T.rank!=null&&R.T.back!=null&&R.T.decay!=null,`(8) BAL.thatS holds the numbers (${JSON.stringify(R.T)})`);
 ok(R.r0&&!R.r0.out&&R.r0.rank===0&&R.r0.ts,`(1) rank 0 forgotten after the grace: thất sủng, no lãnh cung, rank kept (${JSON.stringify(R.r0)})`);
 ok(R.again&&!R.again.out&&R.again.rank===0,`(3) the next month: still no lãnh cung (${JSON.stringify(R.again)})`);
 ok(R.back===true,`(7) her way back: Sủng ≥ BAL.thatS.back → thẻ bài trở lại (${R.back})`);
 ok(R.r1&&!R.r1.out&&R.r1.rank===1&&R.r1.ts,`(2) rank 1 forgotten: thất sủng, no lãnh cung, Thường tại kept (${JSON.stringify(R.r1)})`);
 ok(R.newFree===R.G,`(4) newcomer: ${R.newFree}/${R.G} first months free`);
 ok(R.hi&&!R.hi.out&&!R.hi.ts,`(5) above BAL.thatS.rank: never forgotten (${JSON.stringify(R.hi)})`);
 ok(R.npc&&!R.npc.out&&R.npc.rank===0&&R.npc.ts,`(6) law 1: an NPC at rank 0 / Sủng 0 / Danh 0 → thất sủng too, no lãnh cung (${JSON.stringify(R.npc)})`);
 ok(!errs.length,`no page errors (${errs.slice(0,3).join(' | ')})`);
 console.log(bad?`lanhcung-early: ${bad} BAD`:'lanhcung-early: PASS');await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
