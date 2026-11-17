/* AG2 checks — the Emperor as an agent (jagemp + j8 flip core + j75 custom / nightWhy + j55 crisis + j8 vacant seat), one fresh life:
   1 summon odds = BAL.ag.emp.summon: calm 90, busy 65 (ill / Chăm chính sự / court crisis) — the owner's numbers (OD 16/11 18:10Z); with the
     loop on the j55 extra 30 % cancel is gone (one rule), with BAL.ag.on=0 the old path runs (roll 90 / 65 by trait + j55 30 %)
   2 memory: her deck act (runOpt) and an NPC's (npcEffort) land in S.emp.met; a remembered person is picked more often (same tray, 6000 picks)
   3 the shown weights (nightWhy rows) = the weights he picks by (memory included), reason row "còn nhớ"
   4 custom mùng 1: neutral Emperor keeps the lệ ≈ BAL.ag.emp.custom[0] %, an amorous one (Đa tình) less often
   5 nightWhy: the rest reason when he calls no one; the memory reason when he picks a remembered person
   6 vacant seat: his duty to decide grows with the months vacant (empSeat), mourning first
   7 co-op guest: empOn() false; old save without S.emp.met flips fine; 0 page errors over 30 played tuần
   usage: node dev/test/agemp_check.js <page URL or file>   → exit 1 on any FAIL or page error */
const {chromium}=require('playwright');const [,,URL0]=process.argv;const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 /* the tablet waits for buổi tối (jfe): the checks flip at tối */
 const tối=()=>p.evaluate(()=>{S.buoi=typeof B4L==="number"?B4L:2});await tối();
 /* 1 summon */
 const r1=await p.evaluate(()=>{const E=S.emp,tr0=E.traits.slice(),ill0=E.ill;const seen=[];const r0=roll;roll=function(o){seen.push(o);return r0.apply(this,arguments)};
  const T=S.trieu;const t0=T?[T.bien,T.kho]:null;const one=f=>{seen.length=0;f();empSummon();return seen[0]};
  const out={};try{
   out.calm=one(()=>{E.traits=tr0.filter(t=>t!=="chamchinh");E.ill=null;if(T){T.bien=60;T.kho=60}});
   out.duty=one(()=>{E.traits=["chamchinh"]});
   out.ill=one(()=>{E.traits=tr0.filter(t=>t!=="chamchinh");E.ill={k:Object.keys(ILL)[0],m:2}});
   out.court=T?one(()=>{E.ill=null;T.bien=10;out.crisis=tdOn()&&tdCrisis()}):"no trieu";
   /* the j55 30 % does not fire with the loop on: during a crisis, flip() asks roll(30) never */
   seen.length=0;S.nfF=null;S.nightWhy=null;flip();out.j55=seen.includes(30);
   BAL.ag.on=0;seen.length=0;S.nfF=null;S.nightWhy=null;flip();out.offAsk=seen.slice(0,2);BAL.ag.on=1}
  finally{roll=r0;E.traits=tr0;E.ill=ill0;if(T){T.bien=t0[0];T.kho=t0[1]}S.tonight=null}return out});
 ok(r1.calm===90&&r1.duty===65&&r1.ill===65,'summon: calm 90, Chăm chính 65, ill 65 (BAL.ag.emp.summon)',r1);
 ok(r1.court===65||r1.court==="no trieu",'summon: court crisis = busy 65',r1);ok(!r1.j55,'summon: no second j55 roll 30 while the loop is on',r1);
 ok(r1.offAsk&&r1.offAsk.includes(30),'off switch BAL.ag.on=0: the old j55 30 % path again',r1);
 /* 2 memory */
 const r2=await p.evaluate(()=>{S.emp.met={};S.arts.cam=Math.max(S.arts.cam||0,BAL.deck.cam.lv);S.suc=100;const A=artActs();const a=A.find(x=>x.n==="Đàn khúc Phượng cầu hoàng");
  const r=runOpt(a);const me=(S.emp.met.me||[]).slice();const v=liveRivals(true).find(x=>!x.confined&&!x.out&&!illOf(x)&&!x.preg&&nightCh(x)>0);v.bac=Math.max(v.bac||0,100);v.suc=100;
  const K=npcEffortKind(v);npcEffort(v,true);const nv=(S.emp.met[v.id]||[]).slice();
  const C=consorts().filter(x=>nightCh(x)>0);const cnt=(n)=>{let c=0;for(let i=0;i<n;i++)if(empPick(C)===v)c++;return c/n};
  const saveR=roll;roll=()=>false;/* no slip: compare the weights */
  delete S.emp.met[v.id];const base=cnt(3000);S.emp.met[v.id]=[[wk(),K?K.kd:"qf",1],[wk(),K?K.kd:"qf",1]];const mem=cnt(3000);roll=saveR;
  return{played:r,me,nv:nv.length,kd:K&&K.kd,base:+base.toFixed(3),mem:+mem.toFixed(3),F:empMemF(v)}});
 ok(r2.me.length===1&&r2.me[0][1]==="cam",'memory: her zither (runOpt) is in S.emp.met.me',r2);ok(r2.nv>=1,'memory: an NPC deck act (npcEffort) is in S.emp.met',r2);
 ok(r2.mem>r2.base,'memory: a remembered consort is picked more often (same tray)',r2);
 /* 3 shown weights = his weights */
 const r3=await p.evaluate(()=>{const v=liveRivals(true).find(x=>S.emp.met[x.id]);const rows=(function(){const t0=S.tuan;let R=null;for(const tu of [0,1,2]){S.tuan=tu;S.ntk=null;S.tonight=null;S.nfF=null;S.nightWhy=null;flip();if(S.nightWhy){R=S.nightWhy.rows;break}}S.tuan=t0;return R})()||[];
  const row=rows.find(x=>x.id===v.id);return{w:row&&row.w,want:nightCh(v)*empMemF(v),met:row&&row.reasons.some(x=>x.k==="met")}});
 ok(r3.w!=null&&Math.abs(r3.w-r3.want)<1e-9&&r3.met,'nightWhy rows: shown weight = the weight he picks by (memory), reason "còn nhớ"',r3);
 /* 4 custom */
 const r4=await p.evaluate(()=>{const q=queenP();const cur=liveRivals(true).find(x=>x!==q);if(!q||!cur)return{skip:1};const E=S.emp,tr0=E.traits.slice();
  const n=4000;const nc0=nightCh;nightCh=()=>20;/* equal wish */const run=()=>{let k=0;for(let i=0;i<n;i++)if(empCustom(q,cur,BAL.ag.emp.custom[0]))k++;return k/n};
  const sc=cur.sung,sq=q.sung;E.traits=tr0.filter(t=>!BAL.ag.emp.duty[t]);const neu=run();E.traits=["datinh"];const dt=run();E.traits=tr0;nightCh=nc0;
  return{neu:+neu.toFixed(3),dt:+dt.toFixed(3),base:BAL.ag.emp.custom[0]}});
 ok(r4.skip||Math.abs(r4.neu-r4.base/100)<.06,'custom: a neutral Emperor keeps the lệ ≈ BAL.ag.emp.custom % (equal wish)',r4);ok(r4.skip||r4.dt<r4.neu,'custom: an amorous (Đa tình) Emperor breaks it more often',r4);
 /* 5 nightWhy words */
 const r5=await p.evaluate(()=>{S.ntk=null;const r0=roll;let txtR="",txtM="";try{roll=o=>o===BAL.ag.emp.summon[0]||o===BAL.ag.emp.summon[1]?false:r0(o);S.tonight=null;S.nfF=null;S.nightWhy=null;flip();txtR=(nightWhy()||{}).text||""}finally{roll=r0}
  const v=liveRivals(true).find(x=>nightCh(x)>0);S.emp.met={};const ca=window.cyAsk;if(ca)window.cyAsk=()=>false;try{cyAsk=()=>false}catch(e){}S.emp.met[v.id]=[[wk(),"vu",1]];const mp=mindPick;mindPick=(O)=>O.find(o=>o[0]===v)?v:mp(O);
  const rr=roll;roll=o=>o===BAL.ag.emp.summon[0]||o===BAL.ag.emp.summon[1]?true:rr(o);const t0=S.tuan;S.tuan=0;S.ntk=null;const ec=empCustom;empCustom=()=>false;
  try{S.tonight=null;S.nfF=null;S.nightWhy=null;flip();const w=nightWhy()||{};txtM=w.pick===v.id&&w.cause==="tablet"?w.text:"(pick "+w.pick+" cause "+w.cause+") "+w.text}finally{mindPick=mp;roll=rr;S.tuan=t0;empCustom=ec;try{if(ca)cyAsk=ca}catch(e){}}
  return{txtR,txtM,nt:!!S.ntk,eaQ:S.emp.eaQ,nw:!!S.nightWhy}});
 ok(/không lật thẻ bài nào\. (Ngài|Long thể|Triều chính)/.test(r5.txtR),'nightWhy: his reason when he rests',r5);ok(/Ngài còn nhớ điệu múa/.test(r5.txtM)||/stolen|custom/.test(r5.txtM),'nightWhy: his memory reason',r5);
 /* 6 vacant seat */
 const r6=await p.evaluate(()=>{const v0=S.vacSince,t=S.turn;const r0=roll;let o=[];roll=x=>{o.push(x);return false};const L=[];
  for(const m of [1,3,5,8,15]){S.vacSince=t-m;o=[];const d=empSeat();L.push([m,o[0]==null?"mourn":+o[0].toFixed(1)])}roll=r0;S.vacSince=v0;return L});
 ok(r6[0][1]==="mourn"&&r6[1][1]<r6[2][1]&&r6[2][1]<r6[3][1]&&r6[4][1]<=100,'seat: mourning first, then his duty grows with the months vacant',r6);
 /* 8 pillow slander (two-way row 24): one deed both ways, BAL.tw.g.pillow; NPC chooses by her spite need */
 const r8=await p.evaluate(()=>{const G=BAL.tw.g.pillow;const v=liveRivals(true).find(x=>!x.queen)||liveRivals(true)[0];const r0=roll,mp=mindPick;const out={};
  try{roll=()=>true;S.sung=50;const b=S.sung;pillowDo(v,S,100);out.hit=b-S.sung;out.want=G.hit;
   S.an=20;out.o=pillowO(S,4);out.oWant=G.o[0]+20/G.o[1]+4*G.o[2]-(DG()?G.o[3]:0);
   /* no spite → she keeps quiet (no deed) */const h0=hostility;hostility=()=>0;const r1=pillowNpc(v,5);out.quiet=r1===null&&S.sung===b-G.hit;hostility=h0;
   /* a night2 option reads the deed */const m=PEND.night2({s:4,ex:""});const op=m.o.find(o=>/nói xấu/.test(o.n));out.txt=op?op.x:"";
  }finally{roll=r0;mindPick=mp}return out});
 ok(r8.hit===r8.want&&Math.abs(r8.o-r8.oWant)<1e-9,'pillow: one deed (BAL.tw.g.pillow) — gain and odds',r8);ok(r8.quiet,'pillow: no spite → the NPC keeps quiet',r8);
 ok(!r8.txt||new RegExp('Sủng -'+r8.want).test(r8.txt),'pillow: her night option text prints the deed numbers',r8);
 /* 7 guest, old save, 30 tuần */
 const r7=await p.evaluate(()=>{const g=window.COOPW;const was=g&&{on:g.on,seat:g.seat};let guest=null;if(g){g.on=true;g.seat="b";guest=empOn();g.on=was.on;g.seat=was.seat}
  delete S.emp.met;S.empWhy=null;let e=0;try{S.tonight=null;S.nfF=null;S.nightWhy=null;flip()}catch(x){e++}
  for(let i=0;i<30&&!S.dead;i++){try{Q.length=0;endTurn();Q.length=0;agFlush()}catch(x){e++;console.error(x)}}return{guest,e,met:Object.keys((S.emp&&S.emp.met)||{}).length,dead:!!S.dead,errs:AG.errs.slice(-3)}});
 ok(r7.guest===false||r7.guest===null,'co-op guest: empOn() false',r7);ok(r7.e===0,'old save without S.emp.met + 30 played tuần: no throw',r7);
 ok(errs.length===0,'no page errors',errs.slice(0,5));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`AGEMP: ${f} FAIL`:`AGEMP: ALL ${res.length} PASS`);process.exit(f?1:0)})();
