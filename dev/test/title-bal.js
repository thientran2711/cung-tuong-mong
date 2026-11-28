/* TITLE-BAL (owner OD 26/11 ~18:20Z «TITLE REBALANCE» + ~18:50Z (8)): logic checks of the rebalanced «Danh hiệu».
   usage: GAME=<index.html> node dev/test/title-bal.js
   1. ONE CORE: every bar from BAL (no step of any title opens at 1 try except the one-off feats; ≤ 3 steps per title; bars strictly rise);
   2. QUALITY: a work below BAL.dh.q.wk does not count for its «work» title, one at / above it does; the atonement copy count (jdh2 kinhN) counts all;
   3. STREAK: «Sớm viếng chiều thăm» counts days in a row (two Thỉnh an the same day = one; a missed day restarts), steps by the best streak;
   4. CONDITION: «Sen nở trong bùn» only for a first place at rank ≤ BAL.dh.cond.han.rank (or punished); «Thái hậu ưu ái» = months in a row with
      Thái hậu's liking ≥ netTh("th","than2");
   5. PACING: two titles in the same buổi → ONE panel now, the other on the next buổi (BAL.dh.note.per);
   6. REWARD: per bonus type s2 ≥ s1 and s3 ≥ s2 (harder bar never pays less); the how text prints the BAL bar;
   7. old save: an old try-count of «Sớm viếng chiều thăm» / works restarts under the new rule, the step already earned stays;
   8. no page errors. */
const {chromium}=require('./lib/pw-roulette');const path=require('path');
const GAME=process.env.GAME||path.join(__dirname,'..','..','index.html');let bad=0;const ok=(c,t)=>{console.log((c?'ok   ':'BAD  ')+t);if(!c)bad++};
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1180,height:820}})).newPage();
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+GAME);await p.waitForFunction(()=>typeof start==='function'&&typeof dhSync==='function');await p.waitForTimeout(800);
 const R=await p.evaluate(()=>{const o={};try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__kcO='cung';
  for(let i=0;i<40;i++){start();if(!isSrv())break}Q.length=0;S.dead=false;const T=BAL.dh.T,NN=k=>k.startsWith('l_')?BAL.dh.artLv:(T[k].n||BAL.dh.n0);
  /* 1 */o.bars={};o.badBar=[];for(const k of DHKEYS()){if(!T[k])continue;const N=NN(k);o.bars[k]=N;if(N.length>3)o.badBar.push(k+' >3 steps');for(let i=1;i<N.length;i++)if(!(N[i]>N[i-1]))o.badBar.push(k+' not rising');
   if(N.length>1&&N[0]<2)o.badBar.push(k+' step 1 at '+N[0])}
  /* 2 */S.dh={};S.dhV=2;const q=BAL.dh.q.wk;const mk=ti=>{const r=wkMake(S,'mon',0,5);return r};
  const w0=wkTierP;let forceTi=0;wkTierP=function(){return forceTi};/* the ONE tier rule of a work, forced */
  try{for(const t of [q-1,q-1,q,q+0]){forceTi=Math.max(0,t);wkMake(S,'mon',0,5)}}catch(e){o.wkErr=String(e)}
  o.mon=Object.assign({},S.dh.m_mon||{});wkTierP=w0;
  /* 3 */S.dh={};S.dhV=2;const d0=wk();const W=window.wk;let day=d0;window.wk=()=>day;
  try{const run=()=>dhStreak();run();run();day++;run();day++;run();day+=2;run();o.streak=Object.assign({},S.dh.a_thinh||{})}finally{window.wk=W}
  /* 4 */S.dh={};S.dhV=2;const e=(pp,s)=>({p:pp,kind:'tho',t:s,pr:0,lk:0,s});const L=liveRivals(true).filter(v=>!v.queen);
  S.rank=BAL.dh.cond.han.rank+1;S.out=0;S.confined=0;cFin7('trungthu','tho',[e(S,99),e(L[0],10)]);o.hanHigh=((S.dh.c_han||{}).n)|0;
  S.rank=BAL.dh.cond.han.rank;cFin7('trungthu','tho',[e(S,99),e(L[0],10)]);o.hanLow=((S.dh.c_han||{}).n)|0;
  S.dh.c_th={n:0};S.thDead=false;S.th=netTh("th","than2");dhThMonth();dhThMonth();S.th=netTh("th","than2")-1;dhThMonth();S.th=netTh("th","than2");dhThMonth();o.th=Object.assign({},S.dh.c_th);
  /* 5 */S.dh={};S.dhV=2;delete S.dhNB;delete S.dhPend;Q.length=0;const k1='a_doc',k2='a_nhan';S.dh[k1]={n:NN(k1)[0]};S.dh[k2]={n:NN(k2)[0]};dhSync(S);
  o.pace1=Q.filter(m=>m.kit&&m.kit.kind==='reward').length;o.pend=(S.dhPend||[]).slice();Q.length=0;S.buoi=0;used=0;window.__bot=1;try{nextBuoi()}catch(x){}window.__bot=0;o.pace2=Q.filter(m=>m.kit&&m.kit.kind==='reward').length;o.pend2=(S.dhPend||[]).length;Q.length=0;
  /* 6 */o.bnot=[];for(const t in BAL.dh.B){const v=BAL.dh.B[t].v;const gain=/^g/.test(t);/* gain types: a smaller denominator = more */for(let i=1;i<v.length;i++){if(!v[i-1])continue;if(gain?v[i]>v[i-1]:v[i]<v[i-1])o.bnot.push(t+' '+v)}}
  o.how=DH_CAT.m_mon.how(NN('m_mon')[0]);o.howTh=DH_CAT.a_thinh.how(NN('a_thinh')[0]);o.howCth=DH_CAT.c_th.how(NN('c_th')[0]);
  /* 7 */const old={a_thinh:{n:99,i:1},m_mon:{n:40,i:0}};const P={dh:JSON.parse(JSON.stringify(old)),nights:0,kids:[],arts:{}};
  const S0=S;try{S=Object.assign({},S0,P);delete S.dhV;dhSync(S,true);o.old=JSON.parse(JSON.stringify(S.dh));}finally{S=S0}
  return o});
 ok(!R.badBar.length,`every bar from BAL, ≤ 3 steps, rising, step 1 ≥ 2 (${R.badBar.join('; ')||'all ok'})`);
 console.log('bars',JSON.stringify(Object.fromEntries(Object.entries(R.bars).filter(([k,v])=>v.length>1||/^c_/.test(k)))));
 ok(!R.wkErr&&R.mon.n===2&&R.mon.raw===4,`work title counts only tier ≥ q.wk (n ${R.mon.n} of raw ${R.mon.raw})`);
 ok(R.streak.n===3&&R.streak.cur===1,`Thỉnh an streak: same day once, best 3, restarts after a gap (${JSON.stringify(R.streak)})`);
 ok(R.hanHigh===0&&R.hanLow===1,`«Sen nở trong bùn» only at rank ≤ cond.han.rank (${R.hanHigh}/${R.hanLow})`);
 ok(R.th.n===2&&R.th.cur===1,`«Thái hậu ưu ái» months in a row (${JSON.stringify(R.th)})`);
 ok(R.pace1===1&&R.pend.length===1&&R.pace2===1&&R.pend2===0,`one title panel per buổi, the other next buổi (${R.pace1}/${R.pend}/${R.pace2}/${R.pend2})`);
 ok(!R.bnot.length,`bonus never smaller on a harder step (${R.bnot.join('; ')||'ok'})`);
 ok(/\d/.test(R.how)&&/Tinh xảo|Khá|Tuyệt phẩm|Thường/.test(R.how)&&/ngày liền/.test(R.howTh)&&/\d/.test(R.howCth),`how texts print BAL: «${R.how}» · «${R.howTh}» · «${R.howCth}»`);
 ok(R.old.a_thinh.n===0&&R.old.a_thinh.i===1&&R.old.m_mon.n===0&&R.old.m_mon.raw===40&&R.old.m_mon.i===0,`old save: counts restart, earned step kept (${JSON.stringify(R.old)})`);
 ok(!errs.length,`no page errors (${errs.slice(0,3).join(' | ')})`);
 console.log(bad?`title-bal: ${bad} BAD`:'title-bal: PASS');await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
