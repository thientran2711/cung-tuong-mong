/* review/balance-pace (owner OD 25/11 ~23:52Z): lesson points and course pace. usage: GAME=<index.html> node dev/test/balance-pace.js
   Checks (1) ONE lesson rule lesG (self / teacher / Thái hậu) from BAL.art.les + BAL.tchMin; (2) Tứ đức tdPoints from BAL.td.pts by the raw bands
   BAL.mgTier.lessonPts; (3) the games a player needs per bậc (crsPush on a fresh course) — good (raw ≥ lessonPts[2]) self-study reaches Nhập môn in ≤ 2
   games and Tông sư in ≤ 40; a poor game gives less than a good one; (4) the Tài nghệ tab: course bars show points inside the bậc (never «/100»),
   button words read the BAL range (crsGainW); (5) an NPC's art lesson goes through the same lesG; (6) no page errors. Prints the pace table. */
const {chromium}=require('playwright');const path=require('path');
const GAME=process.env.GAME||path.join(__dirname,'..','..','index.html');let bad=0;const ok=(c,t)=>{console.log((c?'ok   ':'BAD  ')+t);if(!c)bad++};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1180,height:820}});
 await ctx.addInitScript(`window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};HTMLElement.prototype.focus=function(){};`);
 const page=await ctx.newPage();await page.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());const errs=[];page.on('pageerror',e=>errs.push(e.message));
 await page.goto('file://'+GAME);await page.waitForTimeout(800);
 await page.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv())&&S.ps)break}Q.length=0});
 const R=await page.evaluate(()=>{const o={};
  o.les=[0,1,2,3].map(p=>[lesG("self",p),lesG("teacher",p),lesG("th",p)]);
  o.td=[0,3,5,8,10].map(r=>[tdPoints("self",r),tdPoints("master",r)]);
  /* games per bậc: a fresh course, g lesson points per game */
  const games=g=>{const lv={x:0},pt={x:0};const at=[];let n=0;while(lv.x<5&&n<500){crsPush(lv,pt,"x",g);n++;while(at.length<lv.x)at.push(n)}return at};
  o.pace={good:games(lesG("self",3)),avg:games(lesG("self",2)),poor:games(lesG("self",1)),tGood:games(lesG("teacher",3)),tAvg:games(lesG("teacher",2)),
   vGood:games(tdPoints("self",9)),vAvg:games(tdPoints("self",6)),vmGood:games(tdPoints("master",9))};
  /* the tab html */
  let h="";try{h=ktArtSkills().map(c=>kitSkillCard(c)).join("")}catch(e){o.tabErr=String(e)}
  o.has100=/>\s*\d+\/100\s*</.test(h);o.bars=(h.match(/<b>\d+\/\d+<\/b>/g)||[]).slice(0,4);
  o.words=(h.match(/tiến bộ [^<,·]+phần/g)||[]).slice(0,6);
  o.typedRange=/tiến bộ \+\d/.test(h);
  /* NPC lesson through the same rule */
  const v=(rivals||[]).find(x=>x&&x.alive&&!x.out);if(v){vNorm(v);const s0=JSON.stringify([v.arts,v.artp,v.vir,v.virp]);for(let i=0;i<10;i++)npcStudyDo(v);o.npcMoved=JSON.stringify([v.arts,v.artp,v.vir,v.virp])!==s0}
  o.src=String(npcStudyDo).includes('lesG(');return o});
 console.log('lesG [self,teacher,th] by game points 0..3:',JSON.stringify(R.les));
 console.log('tdPoints [self,master] at raw 0/3/5/8/10:',JSON.stringify(R.td));
 console.log('games to reach bậc 1..5 (one course):');for(const k in R.pace)console.log('  '+k.padEnd(7),R.pace[k].join(' / '));
 ok(R.les[3][0]>R.les[1][0],`self-study: a good game (${R.les[3][0]}) gives more than a poor one (${R.les[1][0]})`);
 ok(R.les.every(r=>r[1]>=r[0]+1),'teacher always ≥ self-study + 1');
 ok(R.td[4][0]>R.td[1][0]&&R.td[4][1]>R.td[1][1],'Tứ đức: a good game gives more than a poor one (self and ma ma)');
 ok(R.pace.good[0]<=2,`good self-study: Nhập môn in ${R.pace.good[0]} games (≤ 2)`);
 ok(R.pace.good[4]<=40,`good self-study: Tông sư in ${R.pace.good[4]} games (≤ 40)`);
 ok(R.pace.poor[4]>R.pace.good[4]*2,`poor play is much slower (${R.pace.poor[4]} vs ${R.pace.good[4]})`);
 ok(!R.tabErr,`Tài nghệ cards build (${R.tabErr||''})`);
 ok(!R.has100,`no course bar «/100» (bars: ${R.bars.join(' ')})`);
 ok(!R.typedRange&&R.words.length>0,`button words from BAL: ${R.words.join(' | ')}`);
 ok(R.src&&R.npcMoved,`NPC lesson uses lesG and moves her courses (${R.src}/${R.npcMoved})`);
 ok(!errs.length,`no page errors (${errs.slice(0,3).join(' | ')})`);
 console.log(bad?`balance-pace: ${bad} BAD`:'balance-pace: PASS');await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
