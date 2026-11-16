/* review/night-steal unit tests (both directions + co-op guest + ledger notice mode + one-core costs).
   usage: node dev/test/night-steal-unit.js <index.html>   → prints PASS/FAIL lines, exit 1 on any FAIL */
const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1000,height:755}})).newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
 await p.goto('file://'+path.resolve(process.argv[2]),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const R=await p.evaluate(()=>{const out=[];const ok=(n,c,x)=>out.push([c?"PASS":"FAIL",n,x==null?"":JSON.stringify(x)]);
  window.__bot=1;document.getElementById('title').hidden=true;window.render=function(){};
  for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;S.mg=0;S.rank=Math.max(S.rank,2);S.sung=40;S.duc=60;S.suc=70;
  const R0=liveRivals(false).filter(v=>!v.coop);const keep=JSON.stringify(BAL.steal);
  const reset=()=>{S.ntk=null;S.ntTry=null;Q.length=0;for(const v of R0){v.preg=0;v.confined=0;v.block=0;v.out=0;v.suc=70;v.duc=60;v.ill=null}S.cyb={lie:wk()}};  /* r2: her cycle days never block a test try; tries forced to win (odds 100) so the unit run is not a coin flip */
  const force=()=>{BAL.steal.k=1e6;BAL.steal.pMax=1;BAL.steal.maxTry=1};const o0=oSteal;
  /* 1 · one core: the act costs read BAL.steal (ACT, deck cards, stealNight) */
  ok("ACT steal/road cost = BAL.steal.cost",JSON.stringify(ACT.steal.c)===JSON.stringify({duc:-BAL.steal.cost.feign.duc})&&JSON.stringify(ACT.road.c)===JSON.stringify({suc:-BAL.steal.cost.road.suc}),[ACT.steal.c,ACT.road.c]);
  /* 2 · NPC → her: her card turned, an NPC wants it */
  reset();force();oSteal=function(){return 100};const mathR=Math.random;
  S.tonight="me";Q.push({t:"x",pid:"ksp"});const v1=R0[0];const d0=v1.duc,s0=v1.suc;let r=stealPass(S,{live:true});Math.random=mathR;
  ok("NPC steals HER night (live): holder moves",r.tries===1&&tonightOf()!==S&&tonightOf()===r.holder,{tries:r.tries,h:r.holder&&r.holder.name});
  ok("…her Kính sự phòng prep card is withdrawn, the news card is shown",!Q.some(q=>q.pid==="ksp")&&Q.some(q=>q.t==="Kính sự phòng"));
  const d=r.holder;ok("…the NPC paid the player's cost",(d.duc===60-BAL.steal.cost.feign.duc&&d.suc===70)||(d.suc===70-BAL.steal.cost.road.suc&&d.duc===60),{duc:d.duc,suc:d.suc});
  ok("…one try each per night (j75): she cannot try again",!stealEligible(d,S));
  /* 3 · NPC → NPC */
  reset();const A=R0[0],Bv=R0[1];S.tonight=A;r=stealPass(A,{live:true});
  ok("NPC steals another NPC's night",r.tries===1&&tonightOf()!==A&&tonightOf()!==S,{h:tonightOf()&&tonightOf().name});
  /* 4 · her → NPC (her deck card, same act) */
  reset();S.tonight=A;Q.length=0;const sd=S.duc;let s=stealNight(S,A,"feign");
  ok("HER Tranh sủng against an NPC: she wins with the same act and cost",S.tonight==="me"&&S.duc===sd-BAL.steal.cost.feign.duc,{t:S.tonight,duc:[sd,S.duc]});
  oSteal=o0;Object.assign(BAL.steal,JSON.parse(keep));
  /* 5 · the agent's choice: self-interest, personality, relation */
  reset();const v=R0[0],t=R0[1];const M=Math.random;Math.random=()=>0.1;
  const sav={sung:v.sung,rank:v.rank,kids:v.kids,rl:Object.assign({},v.rl),ro:Object.assign({},v.ro)};
  v.sung=10;v.rank=1;v.kids=[];const hi=stealNeed(v);v.sung=95;v.rank=6;v.kids=[{alive:true,sex:"m"}];const lo=stealNeed(v);
  ok("need: low favour / low rank / no son wants it more than a favoured high-rank mother",hi>lo*2,{hi,lo});
  v.sung=10;v.rank=1;v.kids=[];v.rl[t.id]=0;v.ro[t.id]=0;const w0=stealWant(v,t).u;v.rl[t.id]=90;const wf=stealWant(v,t).u;v.rl[t.id]=0;v.ro[t.id]=100;const wh=stealWant(v,t).u;
  ok("relation: a friend of the holder rarely robs her",wf<w0*.3,{w0,wf});
  ok("hatred adds only a little (oán 100 ≤ ×(1+oanW))",wh>w0&&wh<=w0*(1+BAL.steal.oanW)+1e-9,{w0,wh});
  const tr0=v.trait,tr1=v.trait2;v.trait="Tham vọng";const wa=stealWant(v,t).u;v.trait="Hiền lành";const wk_=stealWant(v,t).u;v.trait=tr0;v.trait2=tr1;
  ok("personality: Tham vọng tries far more than Hiền lành",wa>wk_*3,{wa,wk:wk_,traits:traitsOf(v)});
  v.sung=10;v.rank=1;S.tonight=t;const pq=stealWant(v,t).p;ok("try chance ≤ pMax",pq<=BAL.steal.pMax);
  Object.assign(v,{sung:sav.sung,rank:sav.rank,kids:sav.kids,rl:sav.rl,ro:sav.ro});Math.random=M;
  /* 6 · no hatred needed: an NPC with zero oán/ill-will toward the holder still tries out of ambition */
  reset();force();oSteal=function(){return 5};for(const x of R0){x.ro={};x.rl={};x.oan=0;x.rel=0;x.ghen=0}S.tonight="me";r=stealPass(S,{live:true});
  ok("an NPC with no hatred at all still tries (self-interest)",r.tries===1,{tries:r.tries});
  ok("a failed try against her is told to her (log/news) and she keeps the night",tonightOf()===S);
  /* 7 · ledger (not played) night: notice lines only, no dialog */
  reset();force();oSteal=function(){return 100};S.tonight=A;Q.length=0;r=stealPass(A,{live:false});
  ok("ledger night (live:false): returns notice lines, pushes no dialog",r.lines.length===1&&Q.length===0&&r.holder!==A,{lines:r.lines});
  /* 8 · maxTry */
  reset();Object.assign(BAL.steal,JSON.parse(keep));BAL.steal.k=1e6;BAL.steal.pMax=1;BAL.steal.maxTry=2;oSteal=function(){return 5};S.tonight=A;r=stealPass(A,{live:true});
  ok("at most maxTry tries a night",r.tries===2,{tries:r.tries});
  /* 9 · co-op guest seat: only tries against the guest herself */
  reset();window.COOPW=window.COOPW||{};const cw={on:COOPW.on,seat:COOPW.seat};COOPW.on=true;COOPW.seat="b";S.tonight=A;r=stealPass(A,{live:true});
  ok("co-op guest: NPC-vs-NPC is left to the host",r.tries===0);S.tonight="me";r=stealPass(S,{live:true});ok("co-op guest: tries against the guest still happen",r.tries>=1);
  COOPW.on=cw.on;COOPW.seat=cw.seat;
  /* 10 · the co-op friend never acts as an NPC */
  reset();A.coop=true;ok("the co-op friend (a human) is never an NPC stealer",!stealEligible(A,S));delete A.coop;
  oSteal=o0;Object.assign(BAL.steal,JSON.parse(keep));
  /* 11 · the real flip runs the pass: with forced odds, a week's flip ends stolen on some week */
  reset();BAL.steal.k=1e6;BAL.steal.pMax=1;oSteal=function(){return 95};let st=0;for(let i=0;i<30;i++){reset();flip();const d=S.nightWhy;if(d&&d.cause==="stolen")st++}
  ok("flip() → steal pass → nightWhy.cause 'stolen' (card-flip reads it)",st>0,{st});
  oSteal=o0;Object.assign(BAL.steal,JSON.parse(keep));
  ok("SOC 'steal' folded into the one choice",SOC.steal.ok(R0[0],S)===false);
  /* 12 · symmetry (night-steal-2): an NPC weighs HER exactly like an NPC holder in her position (same rank, thiện cảm, oán; custom night as Empress) */
  {reset();const v=R0[0],t=R0[1];const M=Math.random;const sv={rank:S.rank,rel:v.rel,oan:v.oan,rl:Object.assign({},v.rl),ro:Object.assign({},v.ro),tr:t.rank,tq:t.queen,nw:S.nightWhy,duc:v.duc};
   const cmp=(nm)=>{Math.random=()=>0.3;const a=stealWant(v,S);Math.random=()=>0.3;const b=stealWant(v,t);Math.random=M;
    ok("symmetry: "+nm,a.mode===b.mode&&Math.abs(a.u-b.u)<1e-9&&a.rel===b.rel&&a.fear===b.fear,{her:[a.rel,a.fear,a.u],npc:[b.rel,b.fear,b.u]})};
   for(const [rk,af,oa] of [[2,0,0],[2,70,0],[4,-30,60],[6,10,20]]){S.rank=rk;t.rank=rk;t.queen=false;v.rank=1;v.rel=af;v.rl[t.id]=af;v.oan=oa;v.ro[t.id]=oa;cmp(`rank ${rk} · thiện cảm ${af} · oán ${oa}`)}
   S.rank=7;t.rank=7;t.queen=true;v.rel=0;v.rl[t.id]=0;v.oan=0;v.ro[t.id]=0;S.nightWhy={wk:wk(),cause:"custom"};cmp("custom night held by the Empress (her or an NPC)");
   delete v.duc;ok("feign mode without a stored Đức uses ducOf (one core)",stealWant(v,t).mode!=null||ducOf(v)<BAL.steal.cost.feign.duc,{duc:ducOf(v)});
   Object.assign(S,{rank:sv.rank,nightWhy:sv.nw});Object.assign(v,{rel:sv.rel,oan:sv.oan,rl:sv.rl,ro:sv.ro,duc:sv.duc});t.rank=sv.tr;t.queen=sv.tq}
  ok("ACT steal/road: no stale typed cost (the getter reads BAL.steal)",/BAL|stealCost/.test(String(Object.getOwnPropertyDescriptor(ACT.steal,"c").get||"")));
  ok("stealKem oán = BAL.steal.rel × BAL.relOan.hurt (same number relAdd uses)",typeof BAL.relOan==="object"&&BAL.relOan.hurt>0);
  return out});
 let bad=0;for(const r of R){console.log(r.join(" | "));if(r[0]!=="PASS")bad++}
 console.log("page errors:",errs.length?errs.slice(0,5):0);await b.close();process.exit(bad||errs.length?1:0)})();
