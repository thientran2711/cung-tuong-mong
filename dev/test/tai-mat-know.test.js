/* TAI-MAT-KNOW (owner OD 27/11 ~04:16Z, verbatim in dev/OWNER_DECISIONS.md on the handover branch; report dev/handover/reports/tai-mat-know.md).
   A master's oán / thiện cảm toward the one who turned her servant changes ONLY when that master really LEARNS it (jagknow spyLearn), her and NPCs alike.
   1 RECRUIT roads (no knowledge): kỳ ngộ «Giữ nàng ta làm tai mắt» (the owner's case: was «X để bụng oán ngươi»), the defecting maid (j24 / jtsb,
     leak roll missed), the volunteer (tmTake), Mua chuộc taken (cnvBribeOpts take), Cài tai mắt try taken (tmTry), Cài người (plantServ), Dọa tố
     (threatServ), an NPC recruiting from an NPC → the master's aff / oán toward the recruiter unchanged, no log line names the master's oán
   2 LEARN roads → oán +BAL.ag.know.tm.learn.oan: refusal reported (tmRefuse, cnvBribeOpts tell, j29), Tra xét (searchMaids, her and NPC),
     Tra khảo of a found spy (servDo phat), Theo dõi / Hỏi thẳng (spyFound), plant refused at the gate, jtsb leak roll hit
   3 HER OWN turned servant: no notice when an NPC buys him (no Tai mắt of hers in the buyer's palace); with one there → she hears it, he is
     «found» and she resents the buyer; «Tra khảo» / interrogation only after she found him; the one sign line (spyLeak) once a week
   4 old save without S.spyKn / S.leakW loads and plays; no page errors
   usage: node dev/test/tai-mat-know.test.js [dev/index.html] → exit 1 on any FAIL */
const {chromium}=require('playwright');const path=require('path');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;quiet=false;Q.length=0;try{deal()}catch(e){}render();S.bac=900});
 /* shared helpers in the page */
 await p.evaluate(()=>{window.__R0=Math.random;window.TK={
  R:()=>liveRivals(true).filter(v=>v&&v.alive&&!v.out&&(v.staff||[]).length),
  free:v=>{const s=(v.staff||[]).find(x=>x&&x.sid!=null&&x.spyFor==null);return s},
  rel:(m,b)=>({aff:aff(m,b),oan:oan(m,b)}),
  hi:()=>{Math.random=()=>0.999},lo:()=>{Math.random=()=>0.0001},back:()=>{Math.random=window.__R0},
  logsSince:n=>S.logs.slice(0,Math.max(0,S.logs.length-n)),
  day:x=>{if(x){delete x.opz;delete x.opa}},/* a fresh day of the oán pace for that holder (joanpace opz / opa) */
  fresh:x=>{if(x){delete x.opz;delete x.opa;delete x.spc;x.oan=0;x.rel=0}},/* TMK-WARN-3 (cap flake, law 4): a clean relation toward HER before a measured step — oán 0, liking 0, no oán-pace day, no stat-pace carry; else the random rival's
     old oán (stat-pace slows a rise as it climbs, stops it at the rank top) and old dislike (a fall below 0 is paced too) moved the measured numbers ~1 run in 6 */
  ensureMine:()=>{if(!(S.staff||[]).some(x=>x.sid!=null))S.staff=(S.staff||[]).concat([mkServ("maid")]);return (S.staff||[]).find(x=>x.sid!=null)}}});
 /* 1 RECRUIT roads */
 /* lc34-3b-r1: these are the NO-knowledge roads, so the servant-trust witness roll (jsvt svTouch «seen» = the master learns through a real witness,
    its own rule and tests) is held off here; with it on, a random witness made «same» fail ~1 run in 2 on the merged build */
 const r1=await p.evaluate(()=>{window.__svtOff=1;const o={};const L=TK.R();const v=L[0],w=L[1]||L[0];const T=BAL.ag.know.tm;
  const same=(a,b)=>a.aff===b.aff&&a.oan===b.oan;const nameOan=(n0,who)=>TK.logsSince(n0).some(x=>x.includes(who.name)&&/oán/.test(x));
  /* a. kỳ ngộ (the owner's case): every option whose special is a spy carries no oán cost (jky runOpt C.oan → «X để bụng oán»), and the spy special itself leaves the master's feeling alone */
  {const E=BAL.kyngo.E||{};const bad=[];let n=0;for(const id in E){for(const O of (E[id].o||[]).concat(E[id].plain?[E[id].plain]:[])){if(O&&O.s==="spy"){n++;if(O.c&&O.c.oan)bad.push(id)}}}
   const s=TK.free(v);const b0=TK.rel(v,S);let out="";try{out=KY.SPEC.spy({F:S,W:{kind:"sv",ref:s,own:v}})}catch(e){out="ERR "+e.message}const b1=TK.rel(v,S);o.ky={n,bad,spy:s.spyFor,same:same(b0,b1),out,cost:(E.sv_den&&E.sv_den.o[0].c)};s.spyFor=null}
  /* b. the defecting maid: jtsb card go with the leak roll missed */
  {const s=TK.free(v);s.loyal=5;const na=npwAsk;let m=null;try{window.npwAsk=(k)=>k==="svDefect"?[{kind:"svDefect",who:s,tgt:v,s:1}]:[];for(let i=0;i<30&&!(m&&/xin theo ngươi/.test(m.h||""));i++)m=approachOne()}finally{window.npwAsk=na}
   o.defCard=!!(m&&/xin theo ngươi/.test(m.h||""));if(o.defCard){const c=m.opts[0];const b0=TK.rel(v,S),e0=evG(v,S);TK.hi();try{apply(c.fx||{});c.go()}finally{TK.back()}const b1=TK.rel(v,S);
    o.def={spy:s.spyFor,same:same(b0,b1),ev:evG(v,S)-e0,x:c.x,bac:c.fx&&c.fx.bac,want:-T.def.bac}}s.spyFor=null}
  /* c. volunteer tmTake */
  {const s=TK.free(w);const b0=TK.rel(w,S);tmTake(S,s);o.vol={spy:s.spyFor,same:same(b0,TK.rel(w,S))};s.spyFor=null}
  /* d. Mua chuộc taken (the servant's own «Nhận bạc») */
  {const s=TK.free(v);const b0=TK.rel(v,S);const O=cnvBribeOpts(s,S,v,BAL.coopBribe.pay);O.find(x=>x.id==="take").go();o.take={spy:s.spyFor,same:same(b0,TK.rel(v,S))};s.spyFor=null}
  /* e. Cài tai mắt try taken (tmTry, odds forced) */
  {const b0={};for(const x of L)b0[x.id]=TK.rel(x,S);TK.lo();let got=null;try{got=tmTry(S,"t")}finally{TK.back()}o.try={got:!!got,same:L.every(x=>same(b0[x.id],TK.rel(x,S)))};if(got)got.spyFor=null}
  /* f. NPC recruits from an NPC: master w's feeling toward v unchanged */
  if(L.length>1){const s=TK.free(w);const b0=TK.rel(w,v);s.spyFor=null;TK.lo();let got=null;try{got=tmAsk(v,s,0)}finally{TK.back()}o.npc={spy:s.spyFor===key(v),same:same(b0,TK.rel(w,v))};s.spyFor=null}
  /* g. Dọa tố (threatServ) taken */
  {const s=TK.free(v);const b0=TK.rel(v,S);TK.lo();let r="";try{r=threatServ(S,s)}catch(e){r="ERR "+e.message}finally{TK.back()}o.threat={spy:s.spyFor==="me",same:same(b0,TK.rel(v,S)),r};s.spyFor=null}
  window.__svtOff=0;return o});
 ok(r1.ky.n>0&&r1.ky.bad.length===0&&!(r1.ky.cost&&r1.ky.cost.oan)&&r1.ky.spy==="me"&&r1.ky.same&&!/(^|[^A-Za-zÀ-ỹ])oán/.test(r1.ky.out)/* a name like «Hoán Bích» holds the letters «oán» */,'kỳ ngộ «Giữ nàng ta làm tai mắt»: a spy, NO oán of her master, no «để bụng oán» line (the owner\'s case)',r1.ky);
 ok(r1.defCard&&r1.def&&r1.def.spy==="me"&&r1.def.same&&r1.def.ev===0&&r1.def.bac===r1.def.want,'defecting maid «Thu làm tai mắt» (leak missed): spy, master\'s feeling unchanged, price = BAL.ag.know.tm.def.bac',r1.def||r1.defCard);
 ok(r1.vol.spy==="me"&&r1.vol.same,'volunteer «Nhận làm tai mắt»: master\'s feeling unchanged',r1.vol);
 ok(r1.take.spy==="me"&&r1.take.same,'Mua chuộc taken: master\'s feeling unchanged',r1.take);
 ok(r1.try.got&&r1.try.same,'Cài tai mắt try taken: no master\'s feeling changes',r1.try);
 ok(!r1.npc||(r1.npc.spy&&r1.npc.same),'two-way: an NPC turning another NPC\'s servant leaves that master\'s feeling unchanged',r1.npc);
 ok(r1.threat.same,'Dọa tố: master\'s feeling unchanged (only the servant fears / resents)',r1.threat);
 /* 2 LEARN roads */
 const r2=await p.evaluate(()=>{const o={};const L=TK.R();const v=L[0],w=L[1]||L[0];const K=BAL.ag.know.tm.learn.oan;const d=(a,b)=>({aff:b.aff-a.aff,oan:b.oan-a.oan});
  /* a. a refusal reported (tmRefuse with the tell roll forced) */
  {TK.day(v);const s=TK.free(v);const b0=TK.rel(v,S);const nw=npcWhy;window.npcWhy=()=>true;let t="";try{t=tmRefuse(S,s)}finally{window.npcWhy=nw}o.tell={t,d:d(b0,TK.rel(v,S))}}
  /* b. Tra xét by an NPC master finds her spy */
  {const s=TK.free(v);s.spyFor="me";const head=(v.staff||[]).find(x=>x.role==="maid"&&srk(x)>=BAL.srvRk.cs);let made=null;if(!head){made=mkServ("maid");made.rk=BAL.srvRk.cs;v.staff.push(made)}
   const b0=TK.rel(v,S);const r=searchMaids(v);o.npcSearch={r:String(r).slice(0,80),gone:!(v.staff||[]).includes(s),d:d(b0,TK.rel(v,S)),hadHead:!!head||(made&&srk(made)>=BAL.srvRk.cs)}}
  /* c. her own servant bought by w: Hỏi thẳng / Theo dõi (spyFound) */
  {TK.day(S);const s=TK.ensureMine();s.spyFor=key(w);S.tmSold=null;const b0=TK.rel(S,w);const bb=spyFound(s);o.found={who:bb===w,sold:knSoldK(s),d:d(b0,TK.rel(S,w))};s.spyFor=null}
  /* d. plant refused at the gate */
  {TK.fresh(w);const b0=TK.rel(w,S);spyLearn(w,S);o.direct=d(b0,TK.rel(w,S));
   /* oan-pace: each learning is its own cause (lands in the same buổi), the daily cap still holds */const b1=TK.rel(w,S);spyLearn(w,S);spyLearn(w,S);spyLearn(w,S);o.cap={add:TK.rel(w,S).oan-b1.oan,first:o.direct.oan,day:BAL.oanPace&&BAL.oanPace.day,end:oan(w,S),top:typeof spTop==="function"?spTop("oan",spRk(S)):null,nf:typeof persF==="function"?persF(w,"slight",1):1};
   /* an ordinary cause after an own cause in the same buổi is NOT folded under the own cause (e[3] stays the ordinary fold) */TK.day(w);spyLearn(w,S);const b2=TK.rel(w,S);const n0=BAL.ag.know.tm.learn.oan;oanAdd(w,S,n0);o.after={add:TK.rel(w,S).oan-b2.oan,n:n0}}
  /* e. Mua chuộc refused and told (servant's own «Từ chối, bẩm chủ») */
  {TK.day(v);const s=TK.free(v);const b0=TK.rel(v,S);cnvBribeOpts(s,S,v,BAL.coopBribe.pay).find(x=>x.id==="tell").go();o.cnvTell=d(b0,TK.rel(v,S))}
  o.K=K;o.aff=BAL.ag.know.tm.oan;return o});
 ok(r2.tell.t==="tell"&&r2.tell.d.oan>0&&r2.tell.d.aff<0,'refusal reported: the master LEARNS → oán up, thiện cảm down',r2.tell);
 ok(r2.npcSearch.gone&&r2.npcSearch.d.oan>0,'an NPC\'s Tra xét finds her spy → that master resents her',r2.npcSearch);
 ok(r2.found.who&&r2.found.sold&&r2.found.d.oan>0,'her two-faced servant found (spyFound): recorded, she learns who bought him, oán toward him',r2.found);
 ok(r2.direct.oan>0&&r2.direct.aff===-r2.aff,'spyLearn: oán + BAL learn.oan, thiện cảm − BAL tm.oan',Object.assign({},r2.direct,{K:r2.K}));
 /* TMK-WARN-3: a nết-heavy holder (persF up to ×2.1) can reach stat-pace's rank top (spTop) with the first learning — then nothing more lands by canon (one cap per stat, MAIN 163); the own-cause claim is checked below the top */
 ok(r2.cap&&(r2.cap.add>0||(r2.cap.top!=null&&r2.cap.end>=r2.cap.top))&&(r2.cap.day==null||r2.cap.first+r2.cap.add<=r2.cap.day),'oan-pace × spy learning: a second learning in the same buổi still lands (own cause) unless the first reached the rank top, the daily cap holds',r2.cap);
 ok(r2.after&&r2.after.add>0,'oan-pace × spy learning: an ordinary cause later in the same buổi still lands (an own cause does not raise the incident fold)',r2.after);
 ok(r2.cnvTell.oan>0,'Mua chuộc refused and told: the master resents the briber',r2.cnvTell);
 /* 2b svtouch-spylearn (MAIN 187, law 11): a WITNESS (jsvt svTouch «seen») telling the master her servant was turned = the ONE learn rule spyLearn
    (learn oán + m.spyKn); a plain talk seen stays a suspicion (thiện cảm only, no learn oán) */
 const r2b=await p.evaluate(()=>{const o={};const L=TK.R();const v=L[0];if(!v)return {skip:1};const s0=window.svtSeen;window.svtSeen=()=>({how:"near"});window.__svtOff=0;
  try{const run=kind=>{TK.day(v);const s=TK.free(v);s.svtK=null;const b0=TK.rel(v,S),k0=(v.spyKn||{})[key(S)];const n0=(KN.stat.spyLearn||0);const tx=String(svTouch(S,s,kind)||"");const b1=TK.rel(v,S);
    return {d:{aff:b1.aff-b0.aff,oan:b1.oan-b0.oan},learn:(KN.stat.spyLearn||0)-n0,knows:/đã biết chuyện/.test(tx),kn:(v.spyKn||{})[key(S)]!=null&&k0==null||(v.spyKn||{})[key(S)]!==k0}};
   o.tm=run("tm");o.bribe=run("bribe");o.talk=run("talk")}finally{window.svtSeen=s0}return o});
 ok(r2b.skip||(r2b.tm.learn===1&&r2b.tm.d.oan>0&&r2b.tm.d.aff<0&&r2b.bribe.learn===1&&r2b.tm.knows&&r2b.bribe.knows),'svTouch seen on a turn (tm / bribe) = spyLearn: learn oán + thiện cảm down; the after-line says the master KNOWS («đã biết chuyện»)',r2b);
 ok(r2b.skip||(r2b.talk.learn===0&&r2b.talk.d.oan===0&&!r2b.talk.knows),'svTouch seen on a plain talk: suspicion only (no learn, no oán, the line says «sinh nghi», not «đã biết chuyện»)',r2b.talk);
 /* 3 HER OWN turned servant */
 const r3=await p.evaluate(()=>{const o={};const L=TK.R();const v=L[0];const s=TK.ensureMine();s.spyFor=null;S.tmSold=null;
  for(const x of allServ())if(x.spyFor==="me")x.spyFor=null;
  /* a. no Tai mắt of hers in v's palace: v buys s → no line names it, nothing «found» */
  const n0=S.logs.length;const b0=TK.rel(S,v);s.spyFor=key(v);/* the deal itself (bribeServ path needs odds; set as taken) */
  o.noTell={sold:knSoldK(s),logs:TK.logsSince(n0).filter(x=>x.includes(s.name)).length,d:TK.rel(S,v).oan-b0.oan};
  /* b. the Tra khảo button is hidden until found */
  const btn0=(servJudgeBtns(s)||[]).join("").includes("Tra khảo");knSoldFound(s);const btn1=(servJudgeBtns(s)||[]).join("").includes("Tra khảo");o.btn={before:btn0,after:btn1};S.tmSold=null;
  /* c. an unfound spy punished (RV-163F law 1: the same confession roll as an NPC master's servDo phat): keeps silent → plain punishment, nothing told;
     confesses → she learns who (found + oán), like an NPC master */
  const R0=roll;let r;try{roll=()=>false;r=servDo(S,"phat",s)}finally{roll=R0}o.phat={r,still:(S.staff||[]).includes(s),tell:/tai mắt|không khai/.test(r)};
  TK.day(S);const b1=TK.rel(S,v);let r2;try{roll=()=>true;r2=servDo(S,"phat",s)}finally{roll=R0}o.conf={r:r2,gone:!(S.staff||[]).includes(s),named:r2.includes(v.name),d:TK.rel(S,v).oan-b1.oan};
  if(o.conf.gone)(S.staff=S.staff||[]).push(s);
  /* d. the leak sign: once a week */
  S.leakW=null;const a=spyLeak(S,1),bb=spyLeak(S,1);o.leak={a,b:bb};
  s.spyFor=null;return o});
 ok(!r3.noTell.sold&&r3.noTell.logs===0&&r3.noTell.d===0,'her servant bought, no Tai mắt there: no notice, not «found», no oán',r3.noTell);
 ok(!r3.btn.before&&r3.btn.after,'«Tra khảo» shows only once she has found him two-faced',r3.btn);
 ok(r3.phat.still&&!r3.phat.tell,'an unfound spy punished: plain punishment, nothing revealed',r3.phat);
 ok(r3.conf.gone&&r3.conf.named&&r3.conf.d>0,'an unfound spy punished who confesses: named, sent away, she resents the buyer (same road as an NPC master, law 1)',r3.conf);
 ok(r3.leak.a==="Chuyện trong cung ngươi dường như lọt ra ngoài."&&r3.leak.b==="",'leak sign: the one line, once a week',r3.leak);
 /* 3e. a Tai mắt of hers in the buyer's palace sees the deal (j10 servMonth NPC buy) — static: the notice requires a real Tai mắt there */
 const fs=require('fs');const j10=fs.readFileSync(path.join(__dirname,'..','build','j10.js'),'utf8');
 ok(/taiMatRaw\(S\)\.find\(x=>ownerOf\(x\)===p\)/.test(j10)&&!/eyes\(S\)>=3\)ev\+=`Có tin/.test(j10),'NPC buys her servant: she hears it only through a REAL Tai mắt of hers in the buyer\'s palace');
 /* 4 old save: no S.spyKn / S.leakW */
 const r4=await p.evaluate(()=>{try{delete S.spyKn;delete S.leakW;for(const v of rivals||[])if(v)delete v.spyKn;save();const ok1=loadSlot(SLOT)!==false;Q.length=0;try{nextBuoi()}catch(e){return{err:e.message}}return{ok:ok1,alive:!S.dead||true}}catch(e){return{err:e.message}}});
 ok(r4&&!r4.err,'old save without spyKn / leakW loads and plays a buổi',r4);
 ok(errs.length===0,'no page errors',errs.slice(0,3));
 await b.close();const f=res.filter(x=>!x).length;console.log(`tai-mat-know: ${res.length-f}/${res.length} ok`);process.exit(f?1:0)})();
