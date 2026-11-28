/* TITLE-PARITY (law 1 two-way, MAIN 166 after RV-163C on review/title-bal): every «Danh hiệu» counter her (S) has, an NPC consort has too, under the
   same BAL rule. usage: GAME=<index.html> node dev/test/title-parity.js
   1. law-11 scan: no title in DH_CAT is player-only (no `me` flag) except the ones bound to her own life story (Thiên mệnh «tm», Khuê các «kc»);
   2. «Sớm viếng chiều thăm»: an NPC's Thỉnh an through the ONE deed table (TW thTH / thHH run) builds the same day-streak (same day once, gap restarts);
   3. «Thư hương» / «Dung nhan như ngọc»: an NPC's agent deeds cx:book / cx:face count when they succeed, a failed deed does not;
   4. «Thái hậu ưu ái»: an NPC's months in a row with p.th ≥ netTh("th","than2") (rivalsMonth calls the same dhThMonth);
   5. an NPC reaching the BAL bar earns the step (dhObj) and wears it; 6. no page errors. */
const {chromium}=require('./lib/pw-roulette');const path=require('path');
const GAME=process.env.GAME||path.join(__dirname,'..','..','index.html');let bad=0;const ok=(c,t)=>{console.log((c?'ok   ':'BAD  ')+t);if(!c)bad++};
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1180,height:820}})).newPage();
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+GAME);await p.waitForFunction(()=>typeof start==='function'&&typeof dhSync==='function');await p.waitForTimeout(1200);
 const R=await p.evaluate(()=>{const o={};try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__kcO='cung';
  for(let i=0;i<40;i++){start();if(!isSrv())break}Q.length=0;S.dead=false;const T=BAL.dh.T,NN=k=>(T[k].n||BAL.dh.n0);
  o.meOnly=Object.keys(DH_CAT).filter(k=>DH_CAT[k].me&&!/^(tm|kc)$/.test(DH_CAT[k].g));
  const v=liveRivals(true).find(x=>!x.queen&&!x.coop);v.dh={};v.dhV=2;
  /* 2 */const W=window.wk;let day=W();window.wk=()=>day;const r0=Math.random;Math.random=()=>0.01;/* every roll succeeds */
  try{const run=()=>{v.suc=100;TW.thTH.run(v,null,true)};run();run();day++;TW.thHH.run(v,queenP(),true);day++;run();day+=2;run();o.streak=Object.assign({},v.dh.a_thinh||{});
   TW.thTH.run(v,null,false);o.failSame=(v.dh.a_thinh||{}).n}finally{window.wk=W}
  /* 3 */v.dh.a_nhan={n:0};v.dh.a_doc={n:0};v.bac=999;v.suc=100;let rf="",rb="";try{rf=AGRUN["cx:face"](v,null,{});rb=AGRUN["cx:book"](v,null,{})}catch(e){o.agErr=String(e)}
  o.face=v.dh.a_nhan.n;o.book=v.dh.a_doc.n;o.rf=rf;o.rb=rb;
  Math.random=()=>0.999;const nf0=v.dh.a_nhan.n;let rf2="";try{v.bac=999;rf2=AGRUN["cx:face"](v,null,{})}catch(e){}o.faceFail=[rf2,v.dh.a_nhan.n-nf0];Math.random=r0;
  /* 4 */v.dh.c_th={n:0};S.thDead=false;v.th=netTh("th","than2");dhThMonth(v);dhThMonth(v);v.th=netTh("th","than2")-1;dhThMonth(v);o.th=Object.assign({},v.dh.c_th);
  v.dh.c_th={n:0,cur:0};v.th=100;Q.length=0;try{rivalsMonth()}catch(e){o.rmErr=String(e)}Q.length=0;o.monthHook=((v.dh.c_th||{}).cur===1)||(v.alive===false);/* rivalsMonth (her monthTick) runs the same dhThMonth for every NPC */
  /* 5 */v.dh.a_doc={n:NN('a_doc')[0]-1};dhInc(v,'a_doc');o.npcObj=!!dhObj(v,'a_doc');v.dh.c_th={n:NN('c_th')[0]};dhSync(v);o.npcTh=!!dhObj(v,'c_th');o.worn=v.titleWorn||"";
  return o});
 ok(!R.meOnly.length,`no player-only title outside Thiên mệnh / Khuê các (${R.meOnly.join(',')||'none'})`);
 ok(R.streak.n===3&&R.streak.cur===1&&R.failSame===3,`NPC Thỉnh an streak via TW (same day once, Thái hậu + Hoàng hậu, gap restarts, a failed deed adds nothing): ${JSON.stringify(R.streak)}`);
 ok(!R.agErr&&R.face===1&&R.book===1,`NPC dưỡng nhan / đọc sách count (${R.face}/${R.book} · «${R.rf}» · «${R.rb}» ${R.agErr||''})`);
 ok(R.faceFail[1]===0,`a failed NPC dưỡng nhan does not count («${R.faceFail[0]}»)`);
 ok(R.th.n===2&&R.th.cur===0&&R.monthHook,`NPC «Thái hậu ưu ái» months in a row ${JSON.stringify(R.th)}, rivalsMonth hook ${R.monthHook}`);
 ok(R.npcObj&&R.npcTh&&/^dh-/.test(R.worn),`NPC earns the BAL step and wears a title (${R.worn})`);
 ok(!errs.length,`no page errors (${errs.slice(0,3).join(' | ')})`);
 console.log(bad?`title-parity: ${bad} BAD`:'title-parity: PASS');await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
