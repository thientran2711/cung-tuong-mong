/* AG3 checks — maids reach the Emperor by their own deeds (jagmaid + j42 srvNotice / cards + j8/j75 Tiến cử + jmline eye), fresh lives:
   1 one fact: in a maid life S.nt is S.sung (not saved); an old save with nt (data) loads as sung = max(sung, nt)
   2 her deed (Quỳ dâng trà card → srvNotice) raises sung by the card's printed gain and lands in S.emp.met.me; no "hỏi tên" dice while the loop is on
   3 an NPC staff maid who seeks his notice serves tea by her own choice (amDecide), gains regard, lands in S.emp.met["s"+sid]
   4 his pool: a remembered maid is picked (forced pick) → S.amT, nightWhy "cho gọi"; her night: free seat → the SAME person raised Đáp ứng
     (her given name, road "cn", out of her master's staff); seats full → she stays a maid, favoured (fav), and rises at the month with a seat
   5 Tiến cử: NPC choice amSendQ (no flat roll 3 with the loop on); sendMaid: seat → same-name consort; no seat → the maid stays, favoured;
     the player's option text prints no invented odds
   6 the player maid picked → dilemma "Hoàng thượng cho gọi"; go: seat → srvRise; no seat → S.srv.fav; srvRise with no seat → favoured
   7 jmline mlEye: no eye roll with the loop on; BAL.ag.on = 0 → old paths (monthly dice, roll 3)
   8 30 played tuần as a maid and 30 as a consort: 0 throws; co-op guest: amOn false
   usage: node dev/test/agmaid_check.js <page URL or file>   → exit 1 on any FAIL or page error */
const {chromium}=require('playwright');const [,,URL0]=process.argv;const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const fresh=(maid)=>p.evaluate((maid)=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;
  if(maid)srvInit();try{deal()}catch(e){}render();return{srv:isSrv()}},maid);
 /* 1 one fact */
 await fresh(true);
 const r1=await p.evaluate(()=>{S.sung=12;const a=S.nt;S.nt=20;const b=S.sung;const j=JSON.parse(JSON.stringify(S));
  /* old save shape: nt as data */delete S.nt;S.nt=33;S.sung=5;normAll();const c={sung:S.sung,own:Object.getOwnPropertyDescriptor(S,"nt")};return{a,b,inJson:"nt" in j,c:c.sung,getter:!!(c.own&&c.own.get)}});
 ok(r1.a===12&&r1.b===20&&!r1.inJson,'one fact: S.nt reads / writes S.sung, not saved',r1);ok(r1.c===33&&r1.getter,'old save: nt 33 / sung 5 → sung 33, nt is the alias again',r1);
 /* 2 her deed */
 const r2=await p.evaluate(()=>{const m=srvM();S.emp.met={};S.sung=0;S.age=Math.max(S.age,18);const qn=()=>Q.filter(x=>/hỏi tên/i.test(x.t||"")).length;const q0=qn();
  const T=srvTalk({sk:"emp"});const a=T.find(x=>x.n==="Quỳ dâng trà");const x=a.x;const g=amTeaG(S);const r0=roll;roll=o=>true;let out;try{a.run()}finally{roll=r0}
  return{x,g,sung:S.sung,met:(S.emp.met.me||[]).map(e=>e[1]),ask:qn()-q0}});
 ok(r2.sung===r2.g&&new RegExp('để ý \\+'+r2.g).test(r2.x),'deed: Quỳ dâng trà raises his regard (sung) by the printed gain',r2);ok(r2.met.includes("meet"),'deed: it lands in his memory S.emp.met.me',r2);ok(r2.ask===0,'deed: no "hỏi tên" dice with the loop on',r2);
 /* 3 NPC staff maid */
 await fresh(false);
 const r3=await p.evaluate(()=>{const L=amMaids();if(!L.length)return{skip:1};const [s,o]=L[0];S.emp.met={};s.sung=0;s.seek={from:S.turn,until:S.turn+3,used:0};
  const mp=mindPick;mindPick=(O)=>O.find(x=>x[0]==="do")?"do":mp(O);const r0=roll;roll=()=>true;let t="";try{t=amDecide(s,o,false)}finally{mindPick=mp;roll=r0}
  return{sung:s.sung,g:amTeaG(s),met:(S.emp.met["s"+s.sid]||[]).length,t,o:+amTeaO(s).toFixed(1)}});
 ok(r3.skip||r3.sung===r3.g&&r3.met===1,'NPC maid: her own tea deed raises his regard and lands in his memory',r3);
 /* 4 his pool and her night */
 const r4=await p.evaluate(()=>{const L=amMaids().filter(([s,o])=>o!==S);if(!L.length)return{skip:1};const [s,o]=L[0];const nm=s.name;s.sung=40;S.emp.met={};S.emp.met["s"+s.sid]=[[wk(),"tea",1]];
  const C=consorts().filter(p=>nightCh(p)>0);const mp=mindPick;mindPick=(O)=>{const x=O.find(z=>z[0]&&z[0].m===s);return x?x[0]:mp(O)};let t;try{t=empPick(C)}finally{mindPick=mp}
  const amT=S.amT&&S.amT.k;S.nightWhy={wk:wk(),pick:null,emp:Object.assign({},S.empWhy),rows:[]};const why=empWhyTxt(S.nightWhy);
  const rf=roomFor;roomFor=()=>true;const n0=rivals.length;let txt="";const mpk=mindPick;mindPick=(O,p)=>O.some(z=>z[0]==="go")?"go":mpk(O,p);/* r2: she may decline (Cáo bệnh) — this check is the night she accepts, as r4b */try{S.tonight=null;txt=resolveTonight()}finally{roomFor=rf;mindPick=mpk}const n=rivals[rivals.length-1];
  return{t:t===null,amT,why,txt,added:rivals.length-n0,nm,newName:n&&n.name,road:n&&n.ag&&n.ag.o,inStaff:(o.staff||[]).includes(s)}});
 ok(r4.skip||r4.t&&r4.amT&&/cho gọi/.test(r4.why),'pool: a remembered maid is picked from his night pool, nightWhy says he called her',r4);
 ok(r4.skip||r4.added===1&&r4.newName&&r4.newName.endsWith(" "+r4.nm)&&r4.road==="cn"&&!r4.inStaff,'her night with a seat: the same person raised Đáp ứng (her name, road cn)',r4);
 const r4b=await p.evaluate(()=>{const L=amMaids().filter(([s,o])=>o!==S);if(!L.length)return{skip:1};const [s,o]=L[0];const rf=roomFor;roomFor=()=>false;const n0=rivals.length;let a,b;
  try{/* par3 (2e4): she may decline (Cáo bệnh, jagacts3) — this check is about the night she accepts */const mpk=mindPick;mindPick=(O,p)=>O.some(z=>z[0]==="go")?"go":mpk(O,p);try{amNight(s,o,"pick")}finally{mindPick=mpk}a={fav:!!s.fav,added:rivals.length-n0,inStaff:o.staff.includes(s)};roomFor=()=>true;servMonth();b={added:rivals.length-n0,inStaff:o.staff.includes(s)}}finally{roomFor=rf}return{a,b}});
 ok(r4b.skip||r4b.a.fav&&r4b.a.added===0&&r4b.a.inStaff,'seats full: she stays a maid, favoured',r4b);ok(r4b.skip||r4b.b.added===1&&!r4b.b.inStaff,'a free seat at the month goes to the favoured maid',r4b);
 /* 5 Tiến cử */
 const r5=await p.evaluate(()=>{const v=liveRivals(true).find(x=>x.maid);const seen=[];const r0=roll;roll=function(o){seen.push(o);return r0.apply(this,arguments)};let q;try{q=amSendQ(v)}finally{roll=r0}
  const m=v.maid;const nm=m.name;const rf=roomFor;roomFor=()=>false;let a,b;try{sendMaid(v);a={same:v.maid===m,fav:!!m.fav};roomFor=()=>true;const n0=rivals.length;sendMaid(v);const n=rivals[rivals.length-1];b={added:rivals.length-n0,name:n.name,nm,newMaid:v.maid!==m}}finally{roomFor=rf}
  const d=PEND.ksp();const x=d.o[1].x;return{roll3:seen.includes(3),a,b,x}});
 ok(!r5.roll3,'Tiến cử: the NPC consort decides by her need, no flat roll 3',r5);ok(r5.a.same&&r5.a.fav,'Tiến cử, seats full: the maid stays, favoured (no "thả ra cung")',r5.a);
 ok(r5.b.added===1&&r5.b.name.endsWith(" "+r5.b.nm)&&r5.b.newMaid,'Tiến cử with a seat: the same maid raised (her name), a new maid serves',r5.b);ok(!/Năm phần|Khó|Liều/.test(r5.x),'Tiến cử option text: no invented odds (odds cap: a sure choice prints no ladder word)',r5.x);
 /* 6 the player maid picked */
 await fresh(true);
 const r6=await p.evaluate(()=>{S.age=Math.max(S.age,18);S.srv.lau=0;S.emp.met={me:[[wk(),"tea",1]]};S.sung=30;const C=consorts().filter(p=>nightCh(p)>0);const mp=mindPick;mindPick=(O)=>{const x=O.find(z=>z[0]&&z[0].m===S);return x?x[0]:mp(O)};
  Q.length=0;try{empPick(C)}finally{mindPick=mp}const q=Q.find(x=>x.t==="Hoàng thượng cho gọi");if(!q)return{q:0};const rf=roomFor;roomFor=()=>false;let a;try{q.opts[0].go();a={fav:!!S.srv.fav,srv:isSrv()}}finally{roomFor=rf}
  roomFor=()=>false;try{srvRise("x")}finally{roomFor=rf}const still=isSrv();roomFor=()=>true;try{q.opts[0].go()}finally{roomFor=rf}
  return{q:1,opts:q.opts.map(o=>o.n),a,still,risen:!isSrv(),nt:Object.getOwnPropertyDescriptor(S,"nt")?1:0}});
 ok(r6.q,'player maid picked: dilemma "Hoàng thượng cho gọi"',r6);ok(r6.a&&r6.a.fav&&r6.a.srv&&r6.still,'no seat: she stays a maid, favoured; srvRise with no seat keeps her a maid',r6);ok(r6.risen&&!r6.nt,'with a seat: raised (srvRise), the nt alias gone',r6);
 /* 7 eye + off switch */
 await fresh(false);
 const r7=await p.evaluate(()=>{const L=amMaids();const [s,o]=L[0]||[];const n0=window.__amN.eyeOff;const e=s?mlEye(o,s):false;const a={e,off:window.__amN.eyeOff-n0};
  BAL.ag.on=0;const v=liveRivals(true).find(x=>x.maid&&!x.preg);const seen=[];const r0=roll;roll=function(x){seen.push(x);return false};try{rivalNight(v)}finally{roll=r0;BAL.ag.on=1}return{a,off3:seen.includes(3)}});
 ok(r7.a.e===false&&r7.a.off===1,'jmline: no eye roll while the loop is on',r7);ok(!r7.off3,'off switch BAL.ag.on=0: fake illness stays a goal (npcWhy fakeIll, npc-purpose OD 18/11), no blind roll 3',r7);
 /* 8 play */
 const play=(maid)=>p.evaluate(async(maid)=>{const E=[];const ce=console.error;console.error=(...a)=>{E.push(a.map(String).join(" ").slice(0,200));ce.apply(console,a)};
  try{for(let i=0;i<30&&!S.dead;i++){Q.length=0;try{closeAll()}catch(e){}if(typeof agFlush==="function")agFlush();endTurn();Q.length=0;try{closeAll()}catch(e){}}}catch(e){E.push("throw "+e.message)}finally{console.error=ce}
  return{E:E.filter(x=>/jagmaid|throw|TypeError|ReferenceError/.test(x)).slice(0,5),n:Object.assign({},window.__amN),dead:!!S.dead,srv:isSrv()}},maid);
 await fresh(true);const r8a=await play(true);await fresh(false);const r8b=await play(false);
 ok(!r8a.E.length,'30 tuần as a maid: no throw',r8a);ok(!r8b.E.length,'30 tuần as a consort: no throw',r8b);
 const r9=await p.evaluate(()=>{window.COOPW=window.COOPW||{};const o={on:COOPW.on,seat:COOPW.seat};COOPW.on=1;COOPW.seat="b";const g=amOn();COOPW.on=o.on;COOPW.seat=o.seat;return{g}});
 ok(r9.g===false,'co-op guest: amOn() false',r9);
 ok(!errs.length,'no page errors',errs.slice(0,5));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`AGMAID: ${f} FAIL`:`AGMAID: ALL ${res.length} PASS`);process.exit(f||errs.length?1:0)})();
