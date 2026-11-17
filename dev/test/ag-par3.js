/* AG-ALL-2e parity checks (jagacts3.js; report dev/handover/reports/ag-all-parity.md "2e"):
   1 ONE BUILDER: her deck / talk cards (Múa trong yến tiệc, Cài tai mắt, An thai, Kể tội, Xin chữa bệnh) are built by P3C.<k>(S) — the same builder the NPC runs
   2 every cx3 option is offered to an NPC consort when its condition holds, and its key maps to a player button (AGC3BTN label found in the built page)
   3 each NPC deed runs the SAME function as her button (spies: useItem, sellItem, treat, courtGive, charityFx, servDo, restLatEmo, wkMake) and moves her state
   4 NPC choice varies (histogram of picks over the option list by mindPick, never one answer); the maid group gets follow / cut
   5 BAL.ag.par3.on = 0 → no cx3 option; 0 page errors
   usage: node dev/test/ag-par3.js <page URL or file>   → exit 1 on any FAIL or page error */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<40&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 /* 1 */
 const r1=await p.evaluate(()=>{const n={};const W={};for(const k of ["dance","eyes","anthai","tell","treat"]){W[k]=P3C[k];P3C[k]=function(){if(arguments[0]===S)n[k]=(n[k]||0)+1;return W[k].apply(this,arguments)}}
  try{S.preg=3;S.fake=0;const A=pool();const D=A.find(a=>a.n==="Múa trong yến tiệc");const E=A.find(a=>a.n==="Cài tai mắt");
   const v=liveRivals(true).find(x=>!x.out);S.ill={k:Object.keys(ILL)[0],st:1};const th=talkOpts({kind:"th"});const ty=talkOpts({kind:"ty"});deal();
   return{n,dance:!!D,eyes:!!E,danceO:D&&D.o===W.dance(S).o,tell:th.some(a=>/^Kể tội/.test(a.n)),treat:ty.some(a=>a.n==="Xin chữa bệnh")}}
  finally{for(const k in W)P3C[k]=W[k];S.preg=0;S.ill=null}});
 ok(r1.dance&&r1.eyes&&r1.danceO,'deck: Múa trong yến tiệc / Cài tai mắt are the P3C cards (same odds as the NPC builder)',r1);
 ok(r1.n.dance>=1&&r1.n.eyes>=1&&r1.n.tell>=1&&r1.n.treat>=1,'her deck / Thái hậu / Thái y cards call P3C.<k>(S)',r1.n);
 ok(r1.n.anthai>=1,'An thai card (pregnant) = P3C.anthai(S)',r1.n);
 /* 2 + 3 */
 const r2=await p.evaluate(()=>{const v=liveRivals(true).find(x=>!x.out&&!x.queen&&(x.staff||[]).length)||liveRivals(true).find(x=>!x.out);vNorm(v);const t=liveRivals(true).find(x=>x!==v&&!x.out&&!x.queen);
  const out={opt:{},run:{},spy:{}};const spy=(name)=>{const f=window[name];out.spy[name]=0;window[name]=function(){if(arguments[0]===v)out.spy[name]++;return f.apply(this,arguments)};return()=>window[name]=f};
  const U=["useItem","sellItem","treat","courtGive","charityFx","servDo","restLatEmo","wkMake"].map(spy);
  const h0=hostility;hostility=(a,b)=>a===v&&b===t?90:h0(a,b);
  const sk=Object.keys(IT).find(k=>{const it=IT[k];return it.pr>0&&!it.use&&!it.sl&&!it.evi&&!it.keep&&!it.dr&&!it.ant&&!it.fert&&!it.anti&&!it.mat&&!it.gv&&!it.il});
  const setup=()=>{v.preg=3;v.fake=0;v.anthai=0;v.suc=40;v.bac=38;v.charM=-1;v.mat=0;v.ill={k:Object.keys(ILL)[0],st:1};v.evm=v.evm||{};v.evm[key(t)]=3;
   v.inv=[{k:"nhansam",d:S.turn},{k:sk,d:S.turn}];v.arts=v.arts||{};v.arts.cam=Math.max(3,v.arts.cam||0);
   if(!(v.staff||[]).length)v.staff=[{sid:9e6,name:"Thử",role:"maid",loyal:10,af:{}}];for(const s of v.staff){s.loyal=10;s.trouble=wk()}v.staff[0].loyal=40;v.staff[0].af={}};
  try{setup();
   const N=Object.assign({},agNeeds(v),{rest:1,kid:1,spite:1,bac:1,safe:1,danh:1,duc:1,sung:1,ally:1,th:1});
   const O=AGREG.consort.par3(v,N,null);for(const o of O)out.opt[o.k.slice(4)]=o.u>0;
   for(const o of O){setup();const f=AGRUN[o.k];const b0=JSON.stringify([v.suc,v.bac,v.sung,v.danh,v.duc,(v.inv||[]).length,v.anthai,(v.staff||[]).map(s=>s.loyal),t.sung]);let r="";
    try{r=f(v,o.t)}catch(e){r="ERR "+e.message}out.run[o.k.slice(4)]={moved:b0!==JSON.stringify([v.suc,v.bac,v.sung,v.danh,v.duc,(v.inv||[]).length,v.anthai,(v.staff||[]).map(s=>s.loyal),t.sung]),r:String(r).slice(0,70)}}
   const html=document.documentElement.innerHTML;out.btn={};for(const k in AGC3BTN)out.btn[k]=html.indexOf(AGC3BTN[k])>=0||(document.scripts&&[...document.scripts].some(s=>s.text.indexOf(AGC3BTN[k])>=0));
  }finally{hostility=h0;U.forEach(u=>u())}return out});
 const need=["dance","eyes","anthai","tell","treat","restLat","charity","use","sell","tyGift","work"];
 ok(need.every(k=>r2.opt[k]),'NPC consort is offered every cx3 deed when its condition holds',r2.opt);
 ok(Object.keys(r2.opt).filter(k=>/^staff/.test(k)).length>=3,'NPC master is offered her own-staff buttons (Thưởng / Phạt / Đổi người / Che chở / Hỏi chuyện)',Object.keys(r2.opt).filter(k=>/^staff/.test(k)));
 ok(Object.values(r2.btn).every(Boolean),'every cx3 key names a player button present in the built page',r2.btn);
 ok(Object.values(r2.run).every(x=>!/^ERR/.test(x.r)),'every cx3 deed runs without error',r2.run);
 ok(Object.values(r2.run).filter(x=>x.moved).length>=need.length-2,'the deeds move the NPC state (cost / gain / item / servant / target)',r2.run);
 ok(r2.spy.useItem>=1&&r2.spy.sellItem>=1&&r2.spy.treat>=1&&r2.spy.courtGive>=1&&r2.spy.charityFx>=1&&r2.spy.restLatEmo>=1&&r2.spy.wkMake>=1&&r2.spy.servDo>=1,'NPC deeds run her buttons\' own functions',r2.spy);
 /* her own-staff buttons now go through servDo too */
 const r2b=await p.evaluate(()=>{let n=0;const f=servDo;servDo=function(m){if(m===S)n++;return f.apply(this,arguments)};try{const s=(S.staff||[])[0];if(!s)return{skip:1};S.bac=100;const l0=s.loyal;servAct("thuong",s.sid);return{n,up:s.loyal>l0}}finally{servDo=f}});
 ok(r2b.skip||r2b.n===1&&r2b.up,'her Thưởng (servAct) = servDo(S, …)',r2b);
 /* 4 */
 const r4=await p.evaluate(()=>{const v=liveRivals(true).find(x=>!x.out&&!x.queen);v.suc=30;v.bac=200;v.charM=-1;const N=agNeeds(v);const H={};
  for(let i=0;i<300;i++){const O=AGREG.consort.par3(v,N,null);if(!O.length)break;const o=mindPickBy(O,x=>x.u,v);H[o.k]=(H[o.k]||0)+1}
  const m=liveRivals(true).map(x=>(x.staff||[]).find(s=>s.role==="maid")).find(Boolean);const out={H,maid:null};
  if(m){m.loyal=5;const keep=asMisHome;asMisHome=()=>false;try{out.maid={away:asOpts(m).some(o=>o.sk==="follow")}}finally{asMisHome=keep}
   m.manLove=1;const r0=asRisk;asRisk=()=>99;try{out.maid.cut=asOpts(m).some(o=>o.sk==="cut")}finally{asRisk=r0;m.manLove=null}}
  BAL.ag.par3.on=0;out.off=AGREG.consort.par3(v,N,null).length;BAL.ag.par3.on=1;return out});
 ok(Object.keys(r4.H).length>=2,'NPC picks vary (mindPick over the options, never one answer)',r4.H);
 ok(!r4.maid||r4.maid.away&&r4.maid.cut,'maid: Theo hầu chủ (master out) / Cắt đứt are offered',r4.maid);
 ok(r4.off===0,'BAL.ag.par3.on = 0 → no cx3 option',r4.off);
 /* lãnh cung: her cards = coldActsOf(S); an NPC inside picks among the SAME cards (coldMonth), never one answer */
 const r5=await p.evaluate(()=>{const me=coldActs().map(a=>a.n);let n=0;const f=coldActsOf;coldActsOf=function(x){if(x!==S)n++;return f.apply(this,arguments)};
  const v=liveRivals(true).find(x=>!x.queen&&x.alive);const H={};const b0=Object.assign({},AG3.stat.by);
  try{for(let i=0;i<120;i++){v.out=true;v.alive=true;v.suc=20+(i%4)*20;v.bac=(i%3)*40;v.coldBy=null;v.an=(i%5)*20;v.duc=(i%2)*60;p3Cold(v)}}finally{coldActsOf=f;v.out=false;v.alive=true}
  for(const k in AG3.stat.by)if(/^cold:/.test(k))H[k.slice(5)]=AG3.stat.by[k]-(b0[k]||0);return{me,n,H}});
 ok(r5.me.includes("Cầu xin")&&r5.me.includes("Chép kinh, giữ đức")&&r5.me.includes("Xuất gia"),'her lãnh cung cards come from coldActsOf(S)',r5.me);
 ok(r5.n>=100&&Object.keys(r5.H).length>=3,'NPC in lãnh cung chooses among the same cards (histogram, never one answer)',r5.H);
 /* 2e part 3 (AG-ALL-2e2): talk P3T, household, phe phái, thuốc thúc sinh */
 const r6=await p.evaluate(()=>{const out={};const L=liveRivals(true).filter(x=>!x.out&&!x.queen&&x.alive);const v=L[0],t=L[1],u=L[2];vNorm(v);vNorm(t);
  /* her talk: topicOpts builds the four topics through P3T(S, …) */
  const n={};const W={};for(const k of ["health","praise","gossip","secret"]){W[k]=P3T[k];P3T[k]=function(){if(arguments[0]===S)n[k]=(n[k]||0)+1;return W[k].apply(this,arguments)}}
  try{topicOpts(t)}finally{for(const k in W)P3T[k]=W[k]}out.herTalk=n;
  /* NPC↔NPC talk */
  v.rl=v.rl||{};v.rl[t.id]=60;t.rl=t.rl||{};t.rl[u.id]=-40;t.rl[v.id]=0;const N=Object.assign({},agNeeds(v),{ally:1,spite:1,safe:1,danh:1,hh:1,kid:1});
  const O=AGREG.consort.par3talk(v,N,null);out.talkOpt=O.map(o=>o.k);const a0=aff(t,v);const o1=O.find(o=>o.k==="cx3:talkHealth");out.talkRun=o1?AGRUN[o1.k](v,o1.t):"";out.talkMoved=aff(t,v)!==a0;
  /* household */
  const spy={};const sp=nm=>{const f=window[nm];spy[nm]=0;window[nm]=function(){if(arguments[0]===v||arguments[1]===v)spy[nm]++;return f.apply(this,arguments)};return()=>window[nm]=f};
  const U=["itemTest","hireTake","staffTam","recommend","searchMaids","threatServ"].map(sp);
  try{v.bac=500;const k0=Object.keys(IT).find(k=>IT[k].pr>0&&!IT[k].sl);v.inv=[{k:k0,from:key(t),d:S.turn}];
   v.staff=[{sid:9e6+1,name:"Thử A",role:"maid",loyal:20,af:{},rk:3},{sid:9e6+2,name:"Thử B",role:"maid",loyal:90,af:{}}];
   S.npool=S.npool||{maid:[],eunuch:[]};S.npool.eunuch.push({sid:9e6+3,name:"Thử C",role:"eunuch",loyal:50,af:{},age:16,org:"dân",imp:"hiền"});
   const ts=(t.staff||[])[0]||(t.staff=[{sid:9e6+4,name:"Thử D",role:"maid",loyal:50,af:{}}])[0];ts.lover=9e6+5;ts.spyFor=null;v.knowDT=[ts.sid];const h0=hostility;hostility=(a,b)=>a===v&&b===t?90:h0(a,b);
   try{const H=AGREG.consort.par3house(v,N,null);out.house=H.map(o=>o.k);out.houseRun={};for(const o of H)out.houseRun[o.k]=String(AGRUN[o.k](v,o.t)||"").slice(0,60)}finally{hostility=h0}
  }finally{U.forEach(f=>f())}out.spy=spy;
  /* phe phái */
  const F0=(S.facs||[]).slice();try{S.facs=[];v.p3FacM=-1;v.rl[t.id]=60;const F=AGREG.consort.par3fac(v,N,null);out.fac=F.map(o=>o.k);const of=F.find(o=>o.k==="cx3:facFound");out.facRun=of?AGRUN[of.k](v,of.t):"";out.facMade=!!facOf(v)}finally{S.facs=F0}
  /* thuốc thúc sinh: her card = P3C.drug(S); the NPC builder gives the same odds */
  const D=P3C.drug(S),Dv=P3C.drug(v);out.drug={n:D.n,same:D.n===Dv.n&&JSON.stringify(D.c)===JSON.stringify(Dv.c)};
  return out});
 ok(r6.herTalk.health>=1&&r6.herTalk.praise>=1&&r6.herTalk.secret>=1,'her talk topics are P3T.<k>(S, …)',r6.herTalk);
 ok(["cx3:talkHealth","cx3:talkPraise","cx3:talkSecret"].every(k=>r6.talkOpt.includes(k))&&r6.talkMoved,'NPC↔NPC talk: offered, runs the same card, moves the listener’s liking',{opt:r6.talkOpt,run:r6.talkRun});
 ok(["cx3:test","cx3:hire","cx3:staffTam","cx3:staffUp","cx3:search","cx3:threat"].every(k=>r6.house.includes(k)),'household options offered (Nghiệm độc / Thêm người / Tâm sự / Tiến cử / Tra xét / Dọa tố)',r6.house);
 ok(Object.values(r6.spy).every(x=>x>=1),'household deeds run her buttons’ own functions',r6.spy);
 ok(r6.fac.includes("cx3:facFound")&&r6.facMade,'phe phái: NPC founds a faction through found() (the same as Lập phe cùng)',{fac:r6.fac,run:r6.facRun});
 ok(r6.drug.same,'Uống thuốc thúc sinh: one builder P3C.drug for her and the NPC',r6.drug);
 /* 2e3 (AG-ALL-2e3): Mời đến cung ta · Phòng bị · thú nuôi · dạy con · điểm trang answers */
 const r7=await p.evaluate(()=>{const out={};const L=liveRivals(true).filter(x=>!x.out&&!x.queen&&x.alive&&!x.confined);const v=L[0],t=L.find(x=>x!==v&&!sameHouse(v,x));vNorm(v);vNorm(t);
  const N=Object.assign({},agNeeds(v),{ally:1,spite:1,safe:1,kid:1,danh:1});v.rl[t.id]=60;t.rl[v.id]=40;S.invQ=[];
  /* invite: one odds function for her button and the NPC host */
  let n=0;const f0=inviteO;inviteO=function(){n++;return f0.apply(this,arguments)};try{inviteBtn(t)}finally{inviteO=f0}out.herInv=n;
  const I=AGREG.consort.par3inv(v,N,null);out.inv=I.map(o=>o.k);if(I[0]){AGRUN[I[0].k](v,I[0].t);out.q=S.invQ.length;const r0=roll;roll=()=>true;try{S.where=S.where||{};p3InvLand()}finally{roll=r0}out.came=S.where[I[0].t.id]===palaceOf(v)}
  /* defence orders */
  v.staff=(v.staff||[]).filter(s=>!s.spyFor);if(v.staff.length<2)v.staff.push({sid:9e6+21,name:"Thử F",role:"maid",loyal:60,af:{}},{sid:9e6+22,name:"Thử G",role:"eunuch",loyal:60,af:{}});
  v.ord70=[];v.p3DefM=-1;v.bac=500;const h0=hostility;hostility=(a,b)=>a===t&&b===v?90:h0(a,b);
  try{const D=AGREG.consort.par3def(v,N,null);out.def=D.map(o=>o.k);const s0=oSee(v,1);const o1=D.find(o=>o.k==="cx3:def_canh")||D[0];if(o1)AGRUN[o1.k](v,o1.t);out.ord=(v.ord70||[]).length;out.see=[s0,oSee(v,1)];
   const b0=v.bac;ordMonth70npc(v);out.paid=v.bac<=b0}finally{hostility=h0}
  /* pets + teaching */
  v.bac=500;v.mat=3;const sp={petBuyOne:0,runAct:0,ktTeach:0};const W={};for(const k in sp){W[k]=window[k];window[k]=function(){if(arguments[0]===v||arguments[1]===v)sp[k]++;return W[k].apply(this,arguments)}}
  try{t.pets=t.pets||[];if(!tsbPets(t).length)petAdd(t,"meo","test","buy");v.rl[t.id]=60;
   const kid={name:"Thử Nhi",sex:"m",age:7,alive:true,tv:10,td:10,tal:20};(v.kids=v.kids||[]).push(kid);v.suc=80;
   const Lf=AGREG.consort.par3life(v,N,null);out.life=Lf.map(o=>o.k);for(const o of Lf)AGRUN[o.k](v,o.t);v.kids.splice(v.kids.indexOf(kid),1)}finally{for(const k in W)window[k]=W[k]}out.spy=sp;
  /* toilette answers: her Ghi hận / Mách / Tặng lại / Hỏi bí quyết go() and the NPC answer run the same functions */
  const tc={toilRxGrudge:0,toilRxTell:0};const T0={};for(const k in tc){T0[k]=window[k];window[k]=function(){if(arguments[0]===v)tc[k]++;return T0[k].apply(this,arguments)}}
  try{for(let i=0;i<40;i++){const c=tl2AnsPick(v,t);if(c==="grudge"||c==="tell")p3ToilAns(v,t,c)}}finally{for(const k in T0)window[k]=T0[k]}out.toil=tc;
  const H={};for(let i=0;i<200;i++){const c=tl2AnsPick(v,t);H[c]=(H[c]||0)+1}out.toilH=H;
  return out});
 ok(r7.herInv>=1&&r7.inv.includes("cx3:invite2")&&r7.q===1&&r7.came,'Mời đến cung ta: her odds = inviteO; NPC host invites, the guest comes next buổi by the same odds',r7);
 ok(r7.def.length>=3&&r7.ord===1&&r7.see[1]>r7.see[0]&&r7.paid,'Phòng bị: NPC gives the same ORD70 orders; j70 reads them (oSee up, monthly price)',{def:r7.def,see:r7.see});
 ok(r7.life.includes("cx3:petBuy")&&r7.life.includes("cx3:petcare")&&r7.life.includes("cx3:teachV")&&r7.spy.petBuyOne>=1&&r7.spy.runAct>=1&&r7.spy.ktTeach>=1,'pets / dạy con: NPC options run petBuyOne / runAct petcare / ktTeach',{life:r7.life,spy:r7.spy});
 ok(Object.keys(r7.toilH).length>=4&&(r7.toil.toilRxGrudge+r7.toil.toilRxTell)>=1,'toilette slight: NPC picks among 5 answers (mindPick) and runs her toilRx functions',{H:r7.toilH,run:r7.toil});
 ok(errs.length===0,'no page errors',errs.slice(0,3));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL`:'ALL PASS');process.exit(f?1:0)})();
