/* HOST-ABSENT RULE (owner OD L1976, 19/11 ~22:00Z) — bot scenarios.
   node dev/test/invite-host-away.test.js [dev/index.html]
   A invite at khắc 1 → she walks to Ngự hoa viên (khắc 2→3) → the guest arrives khắc 3 at HER palace and WAITS (not gone in the arrival khắc)
   B she is out one near walk from home, walks home paying it (OD L1976: home the next khắc); guest's decision forced STAY → she meets the guest at home
   C same, decision forced LEAVE → nobody at home, relation loss = BAL.invite.wait.loss, one notice «… sang chơi không gặp, đã ra về», roster row "back"
   D host back in time (she is home at the arrival khắc) → no wait, visit as before
   E TWO-WAY: an NPC host invites HER, the host is away when she arrives → she waits; walking off = leaving (loss) AT the khắc she taps, before any khắc of her walk passes; host there = visit
   F NPC ↔ NPC: host away → guest waits, decides per khắc, leaves with loss and walks back
   G same draw on a second run (hash, no Math.random: co-op seats agree); odds read BAL (one core); stayO shown only as ladder word
   H no page errors */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:60000}).catch(()=>{});
 const r=await p.evaluate(()=>{const o={};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;
  /* case B: a place one near walk from her home (a garden, a hall, or a palace she may enter as a guest — not the guest's own) */
  const nearK=v=>places().map(x=>x.k).concat(liveRivals(true).map(x=>palaceOf(x))).filter((k,i,a)=>k&&a.indexOf(k)===i&&k!=="home"&&k!==palaceOf(v)&&!["kn","dtd","tn","thu","lc"].includes(k)&&travel(k,"home")===BAL.walk.near&&accessOf(S,k).ok).sort((a,b)=>(a[0]==="r")-(b[0]==="r"));/* places first, palaces last */
  for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv()&&S.maid&&!S.out)break}
  window.__bot=1;Q.length=0;S.mg=0;BAL.invite.hate=-999;
  const toB0=()=>{for(let i=0;i<12&&(i<1||!((S.buoi||0)===0&&used===0));i++){Q.length=0;S.mg=0;try{nextBuoi()}catch(e){}Q.length=0}S.confined=0;/* a random punishment met on the way is not under test */if(S.place!=="home"){window.__walkFree=1;try{goTo("home")}finally{window.__walkFree=0}}Q.length=0};/* the test reset puts her home at a new buổi (not a walk under test) */
  /* the guest always says yes (her answer is not under test here) */
  const rA=rcvAsk;rcvAsk=function(k,h,g){if(k==="invite"&&g!==S){rcvInvAt(h,g);g.__invC=1;return""}return rA.apply(this,arguments)};
  /* her walk out of her palace asks who follows (j95s entourage card): she goes with the first answer */
  const KC=z=>/tốn[^·]*khắc/.test(z.x||"");
  const walk=k=>{Q.length=0;S.mg=0;window.__tyGo=1;try{goTo(k);for(let n=0;n<4&&Q.length;n++){const q=Q.pop();const O=(q.opts||[]).filter(z=>z&&z.go&&z.n!=="Thôi");const x=O.find(z=>/một mình|Vào thẳng/i.test(z.n||""))||O.find(z=>/Mặc kệ|Bỏ qua|Lờ đi|Để đó|Không/i.test(z.n||"")&&!KC(z))||O.find(z=>!KC(z))||O[0];/* random cards met on the way: an answer that costs no khắc (time is what this test measures; «Không tiếp» says «khắc của ngươi còn nguyên» = free, only «tốn: … khắc» costs) */(window.__wl=window.__wl||[]).push([q.t,x&&x.n,used,S.place]);if(x){/* answers whose walk runs a tick later (j77 «Vào thẳng / Bái kiến rồi vào» → setTimeout(accEtqGo,0)) run now: this sync bot never reaches the next tick (B/C fell back to such a palace when no garden or hall is one near walk from her home → she never left) */const st=window.setTimeout;window.setTimeout=function(f,d){if(!d&&typeof f==="function"){f();return 0}return st.apply(window,arguments)};try{x.go()}finally{window.setTimeout=st}}}}finally{window.__tyGo=0}Q.length=0};/* the trung-y dress card (jty) is not under test: its «Vẫn đi» walks in a setTimeout this sync bot never sees (made C/E random) → __tyGo for the whole walk, as jty itself does *//* the cards on the way (who follows · bow to the palace head) take their first answer */
  const LOSS=[];const rl0=relAdd;relAdd=function(x,y,n){if(n===BAL.invite.wait.loss)LOSS.push([x===S?"me":x&&x.id,y===S?"me":y&&y.id]);return rl0.apply(this,arguments)};
  const W=PTIME_IW;const free=()=>liveRivals(true).filter(x=>x.alive&&!x.out&&!x.confined&&!sameHouse(S,x));
  const relOf=v=>aff(v,S);
  const run=(force,near)=>{toB0();S.invW=[];PT.stat.iwLast=null;LOSS.length=0;const lg0=(S.logs||[]).length;const v=free()[0];const R0={};const a0=relOf(v);
   const dr=W.draw;if(force!=null)PTIME_IW.__f=force;
   invite(v.id);const t1=used;/* khắc 1 → 2 */
   /* near (case B, walk-cost r3): OD L1976 as the owner told it — she is out at a place one near walk from home when the guest comes, and the
      walk home costs that walk (j2 goTo pays travel), so she is home the next khắc */
   let dest="vuon";if(near){for(const k of nearK(v)){dest=k;walk(k);if(S.place===k)break}}else walk(dest);if(near){const ia0=()=>ptZ().find(a=>a.kind==="invite"&&a.a&&a.a.v===v.id);for(let n=0;n<4&&!(ia0()&&ia0().back)&&used<BAL.time.khac-1;n++){Q.length=0;spend(1);Q.length=0}}const t2=used;Q.length=0;/* arrives there (near: waits there until the guest has come) */
   const ia=ptZ().find(a=>a.kind==="invite"&&a.a&&a.a.v===v.id);
   const wz=S.invW.map(w=>Object.assign({},w));const gk=S.roster&&S.roster.P["v"+v.id]?S.roster.P["v"+v.id][j95kh()]:null;
   const r={v:v.id,t1,t2,landed:!!(ia&&ia.back),wait:wz.length,whereAtArr:S.where[v.id],gk};
   /* the guest lands at the due khắc while she is out; the walk home costs travel(place,home) like every walk (walk-cost, OD L1976) */
   r.dest=dest;r.th=travel(S.place,"home");goTo("home");Q.length=0;r.last=PT.stat.iwLast?Object.assign({},PT.stat.iwLast):null;/* the guest's decision (khắc after arrival) may fall on the khắc she walks in */
   r.t3=used;r.left=S.invW.length===0;r.whereHome=S.where[v.id];r.atHome=curPeople().some(p=>p.ref===v);r.dRel=relOf(v)-a0;r.loss=LOSS.slice();
   const e=S.roster&&S.roster.P["v"+v.id];r.row=e?e[Math.min(e.length-1,j95kh())]:null;r.lossMe=LOSS.filter(x=>x[0]==="me"&&x[1]===v.id).length;r.note=(S.logs||[]).slice(0,Math.max(4,(S.logs||[]).length-lg0)).map(x=>String(x).replace(/<[^>]*>/g,"")).join(" | ");return r};
  /* force the khắc-4 draw: 0 → stay, 99 → leave */
  const d0=iwDraw;
  iwDraw=()=>0;BAL.invite.wait.o=100;o.B=run(null,1);
  iwDraw=()=>99;BAL.invite.wait.o=-100;window.__wl=[];o.C=run(null,1);/* C = B's setup (walk-cost: the walk home costs travel(); from a near place it fits this buổi, so she really gets home) */o.wlC=window.__wl.slice();iwDraw=d0;BAL.invite.wait.o=55;
  /* D host home at arrival */
  toB0();S.invW=[];{const v=free()[1]||free()[0];invite(v.id);spend(BAL.ptime.kinds.invite.n-BAL.ptime.kinds.invite.o);o.D={wait:S.invW.length,where:S.where[v.id]}}
  /* E NPC host invites her; host away by roster */
  toB0();S.invW=[];{const h=free().find(x=>!x.queen&&palaceOf(x)!=="home");const k=palaceOf(h);const e=S.roster&&S.roster.P["v"+h.id];const kh=j95kh();if(e)for(let i=kh;i<e.length;i++)e[i]=["vuon","stay",null,"dạo vườn"];
   rcvInvAt(h,S);o.E={reg:S.invW.length,k};walk(k);o.E.there=S.place===k;o.E.wait=S.invW.length;o.E.t=S.invW[0]&&S.invW[0].t;
   /* walking off = leaving AT the tap khắc (OD L1976): she taps home as a player does (walkGo: the walk home costs travel() khắc and runs on into the
      next buổi when it does not fit); the relation is read at the leave itself, before any khắc of the walk passes (the world moves while she walks) */
   const iwH="v"+h.id,tap=ptNow(),a1=aff(h,S);o.E.tap=tap;const lv0=iwLeave;iwLeave=function(w,K){const r=lv0.apply(this,arguments);if(w.g==="me"&&w.h===iwH&&o.E.dRel==null){o.E.dRel=aff(h,S)-a1;o.E.K=K}return r};
   try{walkGo("home")}finally{iwLeave=lv0}window.__walkSpill=null;Q.length=0;o.E.left=!S.invW.some(w=>w.g==="me"&&w.h===iwH);
   /* host there → visit */
   toB0();S.invW=[];LOSS.length=0;const m0=PT.stat.iwMet||0;rcvInvAt(h,S);const e2=S.roster&&S.roster.P["v"+h.id];if(e2)for(let i=j95kh();i<e2.length;i++)e2[i]=[k,"stay",null,"ở cung"];/* unit step: she stands at the host's palace while the host is there (the walk itself is covered above) */const pl0=S.place;S.place=k;iwTick();o.E.meet=S.invW.length===0&&(PT.stat.iwMet||0)===m0+1&&!LOSS.length;S.place=pl0;
   /* she walked off while the host was away; the host comes back during her walk → no meeting (she is no longer there), she left with the loss */
   toB0();S.invW=[];LOSS.length=0;const m1=PT.stat.iwMet||0;rcvInvAt(h,S);const e3=S.roster&&S.roster.P["v"+h.id];const k3=j95kh();if(e3)for(let i=k3;i<e3.length;i++)e3[i]=i===k3?["vuon","stay",null,"dạo vườn"]:[k,"stay",null,"ở cung"];
   S.place=k;S.visit=null;iwTick();const th3=travel(k,"home");o.E.back={arr:S.invW.length===1&&S.invW[0].t!=null,th:th3,fit:walkOk(th3)};goTo("home");Q.length=0;
   o.E.back.met=(PT.stat.iwMet||0)-m1;o.E.back.loss=LOSS.filter(x=>x[0]===h.id&&x[1]==="me").length;o.E.back.home=S.place==="home";o.E.back.hostBack=iwHere(h,k);}
  /* F NPC ↔ NPC */
  toB0();S.invW=[];{const L=free();const h=L[0],g=L[1];const e=S.roster&&S.roster.P["v"+h.id];const kh=j95kh();if(e)for(let i=kh;i<e.length;i++)e[i]=["vuon","stay",null,"dạo vườn"];
   const a0=aff(g,h);rcvInvAt(h,g);o.F={wait:S.invW.length,row:(S.roster.P["v"+g.id]||[])[kh]};const RK=()=>S.roster.key,gid="v"+g.id;o.F.bWait=agBound(gid,kh,RK());const now0=ptNow();iwDraw=()=>99;spend(1);iwDraw=d0;
   o.F.left=S.invW.length===0;o.F.dRel=aff(g,h)-a0;o.F.row2=(S.roster.P["v"+g.id]||[])[j95kh()];o.F.now=[now0,ptNow()];/* review walk-cost r4: bound only while the invitation holds (law 6b): the walk-back khắc yes, the rest of the buổi free again */o.F.bBack=agBound(gid,j95kh(),RK());o.F.bAfter=[];for(let i=j95kh()+1;i<J95.KH;i++)o.F.bAfter.push(agBound(gid,i,RK()))}
  /* I co-op friend seat (rival coop:true): never rolled, never charged, no notice — as guest (her invite) and as host (an NPC comes to her palace) */
  toB0();S.invW=[];{const L=free();const f=L[0],n=L[1];const c0=f.coop;f.coop=true;LOSS.length=0;PT.stat.iwLast=null;
   S.place="vuon";rcvInvAt(S,f);const a1=S.invW.length;iwDraw=()=>99;spend(1);iwDraw=d0;S.place="home";
   const e=S.roster&&S.roster.P["v"+f.id];const kh=j95kh();if(e)for(let i=kh;i<e.length;i++)e[i]=["vuon","stay",null,"dạo vườn"];
   rcvInvAt(f,n);const a2=S.invW.length;iwDraw=()=>99;spend(1);iwDraw=d0;
   o.I={guest:a1,host:a2,loss:LOSS.length,last:PT.stat.iwLast};f.coop=c0}
  /* G determinism + one core */
  {const w={id:"iwX"};o.G={d1:W.draw(w,7),d2:W.draw(w,7)};const v=free()[0];o.G.o=W.stayO(v,S);o.G.word=word(o.G.o);o.G.loss=BAL.invite.wait.loss}
  o.near=BAL.walk.near;o.err=PT.stat.errs.slice();return o});
 const L=r=>JSON.stringify(r);const loss=r.G.loss;const BAL_NEAR=r.near;
 ok(r.B.landed&&r.B.t2>r.B.t1&&r.B.wait===1&&r.B.whereAtArr==="home","A guest arrives at her palace while she is away and WAITS (arrival khắc)",r.B);
 ok(r.B.th===BAL_NEAR&&r.B.t3===r.B.t2+r.B.th&&r.B.left&&r.B.whereHome==="home"&&r.B.atHome,"B she walks home (pays travel, OD L1976: home the next khắc), the guest stayed → they meet",{dest:r.B.dest,th:r.B.th,t2:r.B.t2,t3:r.B.t3,where:r.B.whereHome,atHome:r.B.atHome});
 ok(r.C.left&&r.C.last&&r.C.last.t===r.C.last.K-1&&r.C.th===BAL_NEAR&&r.C.t3===r.C.t2+r.C.th&&r.C.whereHome!=="home"&&!r.C.atHome&&r.C.lossMe===1&&r.C.row&&r.C.row[1]==="back"&&/sang chơi không gặp, đã ra về/.test(r.C.note),"C guest decided LEAVE at khắc 4 → nobody home, loss, notice, walk back row",Object.assign({},r.C,{note:r.C.note,wl:r.wlC}));
 ok(r.D.wait===0&&r.D.where==="home","D host home at the arrival khắc → no wait, visit as before",r.D);
 ok(r.E.reg===1&&r.E.there&&r.E.wait===1&&r.E.t!=null&&r.E.left&&r.E.K===r.E.tap&&r.E.dRel===loss&&r.E.meet&&r.E.back.arr&&r.E.back.fit&&r.E.back.home&&r.E.back.hostBack&&r.E.back.met===0&&r.E.back.loss===1,"E two-way: NPC host away when she comes → she waits; walking off = leaving with loss AT the tap khắc; host there = visit",r.E);
 ok(r.F.wait===1&&r.F.row&&r.F.row[1]==="visit"&&r.F.left&&r.F.dRel===loss&&r.F.row2&&r.F.row2[1]==="back"&&r.F.bWait===true&&r.F.bBack===true&&!r.F.bAfter.some(x=>x),"F NPC ↔ NPC: guest waits (bound), leaves at the next khắc, loss, walks back (bound); rest of the buổi free again",r.F);
 ok(r.G.d1===r.G.d2&&typeof r.G.o==="number"&&!/%/.test(r.G.word),"G hash draw same on every seat, odds from BAL, ladder word",r.G);
 ok(r.I&&r.I.guest===0&&r.I.host===0&&r.I.loss===0&&!r.I.last,"I co-op friend seat as guest and as host: no wait, no roll, no loss, no notice (a player decides by being there)",r.I);
 ok(!errs.length&&!r.err.length,"H no page errors",{errs:errs.slice(0,3),pt:r.err});
 await b.close();const n=res.filter(x=>x).length;console.log(`INVITE-HOST-AWAY ${n}/${res.length} ${n===res.length?'PASS':'FAIL'}`);process.exit(n===res.length?0:1)})();
