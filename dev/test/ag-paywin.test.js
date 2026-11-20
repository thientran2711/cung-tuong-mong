/* AG-ALL-2d4 — BẠC ONLY ON SUCCESS, whole family (owner OD 17/11 ~17:10Z (1): "thành công á thì tốn 30 bạc, còn nếu mà không thành công á thì sao tốn 30 bạc được").
   node dev/test/ag-paywin.test.js [dev/index.html]
   Every act whose bạc BUYS a person pays only when that person takes it — her and every NPC, same code:
   1 ACT "Rút thẻ bài" (bribe Kính sự phòng): refused → 0 bạc; caught before the offer → 0 bạc; taken → its price
   2 ACT "Xin Hoàng hậu giáng" (the gift to the Empress): refused → 0 bạc (gift returned); agreed → its price
   3 ACT "Mua chuộc cung nữ" still the same (2f3)
   4 j70 scheme route with an accomplice servant (acc "tsv"): she refuses → 0 bạc; she takes it → the route bạc (her plot and an NPC plot)
   5 j70 "Mua người trong cung nàng" (and "Rút thẻ bài" scheme) route: nothing at the start; the strike fails → 0; lands → route bạc
   6 her plot card: a pay-on-success route has no up-front cost (fx) but greys when she lacks the bạc, and says "chỉ khi người ấy nhận"
   7 a preparation route (materials) still pays at the start (unchanged) · no page errors */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{const o={};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv())break}
  window.__bot=1;Q.length=0;const R0=Math.random,C0=caught;try{motiveOK=()=>({ok:true})}catch(e){}/* the j95 motive gate is not under test */const L=liveRivals(true).filter(v=>v.alive&&!v.out&&!v.confined);const A=L[0],B=L[1];
  const win=()=>{Math.random=()=>0},lose=()=>{Math.random=()=>0.99999};const cost=(a,f)=>{a.bac=500;const b0=a.bac;try{f()}finally{Math.random=R0;caught=C0}return b0-a.bac};
  caught=()=>"";
  /* 1 block */
  o.blk={meNo:cost(S,()=>{caught=()=>"";lose();ACT.block.f(S,A)}),meYes:cost(S,()=>{caught=()=>"";win();A.block=0;ACT.block.f(S,A)}),npcNo:cost(A,()=>{caught=()=>"";lose();ACT.block.f(A,B)}),npcYes:cost(A,()=>{caught=()=>"";win();B.block=0;ACT.block.f(A,B)}),
   caught:cost(S,()=>{caught=()=>"bị bắt quả tang";win();ACT.block.f(S,A)}),price:econSchemePrice("block",S,A)};
  /* 2 xinhh (needs an Empress who is neither side) */
  const q=queenP();o.xq=!!q;if(q){const X=L.find(v=>v!==q&&v!==A)||B;const Y=L.find(v=>v!==q&&v!==X&&v!==A)||A;
   o.xin={no:cost(X,()=>{lose();ACT.xinhh.f(X,Y)}),yes:cost(X,()=>{win();ACT.xinhh.f(X,Y)}),price:econSchemePrice("xinhh",X,Y)}}
  /* 3 bribe */
  if(!A.maid)A.maid={name:"Thử",loyal:50};o.brb={no:cost(S,()=>{lose();ACT.bribe.f(S,A)}),yes:cost(S,()=>{win();ACT.bribe.f(S,A)})};
  /* 4 tsv route (poison family has acc tsv) */
  const z=j70();const mT=Object.keys(M70).find(m=>M70[m].R.some(r=>r.acc==="tsv"));const rT=M70[mT].R.find(r=>r.acc==="tsv");o.tsvRoute=[mT,rT.id,rT.bac];
  const T=L.find(v=>(v.staff||[]).length)||A;const N=L.find(v=>v!==T)||B;
  const plot=(a,t,m,rid,mode)=>{const n0=z.pl.length;let pp=null;const c=cost(a,()=>{if(mode)mode();if(typeof tmOdds==="function"){const t0=tmOdds;tmOdds=()=>mode===win?100:0;try{pp=newPlot70(a,t,m,rid,"own")}finally{tmOdds=t0}}else pp=newPlot70(a,t,m,rid,"own")});if(pp){const i=z.pl.indexOf(pp);if(i>=0)z.pl.splice(i,1)}if(a!==S&&a.plan)a.plan=null;return{c,end:pp&&pp.end||null}};
  o.tsv={meNo:plot(S,T,mT,rT.id,lose),meYes:plot(S,T,mT,rT.id,win),npcNo:plot(N,T,mT,rT.id,lose),npcYes:plot(N,T,mT,rT.id,win)};
  /* 5 bribe scheme route */
  const mB=Object.keys(M70).find(m=>M70[m].k==="bribe");const rB=M70[mB].R.find(r=>r.bac>0);o.bRoute=[mB,rB.id,rB.bac];
  const ex=(a,t,won)=>{let pp=null;const c0=cost(a,()=>{pp=newPlot70(a,t,mB,rB.id,"own")});const ra=runAct,mr=window.mindRun;const fake=(x)=>{if(won)x.__won=1;return "thử"};runAct=(x)=>fake(x);if(mr)window.mindRun=(x)=>fake(x);
   let c1=0;try{const t0=okAct70;okAct70=()=>true;try{c1=cost(a,()=>{exec70(pp,"night")})}finally{okAct70=t0}}finally{runAct=ra;if(mr)window.mindRun=mr;const i=z.pl.indexOf(pp);if(i>=0)z.pl.splice(i,1);if(a!==S&&a.plan)a.plan=null}return{start:c0,strike:c1}};
  o.bs={meNo:ex(S,A,false),meYes:ex(S,A,true),npcNo:ex(A,B,false),npcYes:ex(A,B,true)};
  /* 6 her card */
  S.bac=500;const d=PEND.j70start({v:T.id,k:M70[mT].k});const cT=d&&d.o.find(x=>x.n.toLowerCase().includes(rT.n.toLowerCase()));o.card=cT?{fx:cT.fx,x:cT.x,off:!!cT.off}:null;
  S.bac=0;const d2=PEND.j70start({v:T.id,k:M70[mT].k});const c2=d2&&d2.o.find(x=>x.n.toLowerCase().includes(rT.n.toLowerCase()));o.card0=c2?{off:!!(c2.off||c2.dis||c2.no),keys:Object.keys(c2)}:null;S.bac=500;
  /* 7 a preparation route still pays at the start */
  const mP=Object.keys(M70).find(m=>M70[m].k!=="bribe"&&M70[m].k!=="block"&&M70[m].R.some(r=>r.bac>0&&!r.acc));const rP=M70[mP].R.find(r=>r.bac>0&&!r.acc);
  o.prep={route:[mP,rP.id,rP.bac],npc:plot(N,T,mP,rP.id,null).c};
  Math.random=R0;caught=C0;return o});
 console.log(JSON.stringify(r));
 ok(r.blk.meNo===0&&r.blk.npcNo===0&&r.blk.caught===0&&r.blk.meYes===r.blk.price&&r.blk.npcYes>0,'1 Rút thẻ bài: refused / caught → 0 bạc; taken → its price (her and NPC)',r.blk);
 ok(!r.xq||(r.xin.no===0&&r.xin.yes===r.xin.price&&r.xin.price>0),'2 Xin Hoàng hậu giáng: refused → 0 bạc; agreed → its price',r.xin||'no Empress');
 ok(r.brb.no===0&&r.brb.yes>0,'3 Mua chuộc cung nữ: refused 0, taken = price (unchanged)',r.brb);
 ok(r.tsv.meNo.c===0&&r.tsv.meNo.end==="refused"&&r.tsv.npcNo.c===0&&r.tsv.meYes.c===r.tsvRoute[2]&&r.tsv.npcYes.c===r.tsvRoute[2]&&!r.tsv.meYes.end,'4 accomplice route: she refuses → 0 bạc; she takes it → route bạc (her + NPC)',r.tsv);
 ok(r.bs.meNo.start===0&&r.bs.meNo.strike===0&&r.bs.npcNo.start===0&&r.bs.npcNo.strike===0&&r.bs.meYes.strike===r.bRoute[2]&&r.bs.npcYes.strike===r.bRoute[2],'5 "Mua người trong cung nàng" route: 0 at the start; fails → 0; lands → route bạc (her + NPC)',r.bs);
 ok(r.card&&!(r.card.fx&&r.card.fx.bac)&&/chỉ khi người ấy nhận/.test(r.card.x||''),'6 her card: no up-front bạc, "chỉ khi người ấy nhận"',r.card);
 ok(r.card0&&r.card0.off,'6 her card greys when she lacks the bạc',r.card0);
 ok(r.prep.npc===r.prep.route[2],'7 a preparation route still pays at the start',r.prep);
 ok(!errs.length,'no page errors',errs.slice(0,3));
 await b.close();const n=res.filter(x=>!x).length;console.log(n?`${n} FAIL`:`AG-PAYWIN: ALL ${res.length} PASS`);process.exit(n?1:0)})().catch(e=>{console.error(e);process.exit(1)});
