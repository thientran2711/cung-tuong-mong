/* npc-jealousy unit (review/npc-jealousy): one jealousy formula for every pair (owner OD:L1386, HANDOVER:L46).
   usage: node dev/test/npc-jealousy-unit.js <index.html>   → PASS/FAIL lines + page errors; exit 1 on any FAIL */
const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1000,height:755}})).newPage();
 await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(`(function(){let s=12345>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`);
 await p.goto('file://'+path.resolve(process.argv[2]),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const R=await p.evaluate(()=>{const out=[];const T=(n,ok,x)=>out.push([ok?"PASS":"FAIL",n,x==null?"":JSON.stringify(x)]);
  try{document.getElementById('title').hidden=true}catch(e){}window.render=function(){};start();Q.length=0;
  const L=liveRivals(false).filter(v=>!v.queen);const [a,t,c]=L;
  // 1. pure accessors
  for(const v of L){v.ghen=0;delete v.gp}
  T("old save: no gp map reads 0 toward an NPC",ghenOf(a,t)===0&&!a.gp);
  ghenAdd(a,t,40);ghenAdd(a,S,40);T("ghenAdd: same number toward her and toward an NPC",ghenOf(a,t)===40&&ghenOf(a,S)===40&&a.ghen===40,[ghenOf(a,t),a.ghen]);
  ghenAdd(a,t,500);T("clamped 0..100",ghenOf(a,t)===100);ghenAdd(a,t,-500);T("down to 0 removes the key (save stays small)",ghenOf(a,t)===0&&!(t.id in (a.gp||{})));
  ghenAdd(S,a,10);T("her own ghen bar is not invented (player decides herself)",!S.gp&&ghenOf(S,a)===0);
  // 2. danger / hostility: the same formula for a target with the same numbers
  for(const v of L){v.ghen=0;delete v.gp}
  const z=(v,x)=>{affAdd(v,x,-aff(v,x));oanAdd(v,x,-oan(v,x))};z(a,S);z(a,t);
  t.rank=S.rank;ghenAdd(a,t,55);ghenAdd(a,S,55);
  const eo=typeof emoOn==="function"?emoOn:null;if(eo)emoOn=function(){return false};/* a mood aimed at one person (jemo, real state) is not the formula */
  T("danger(v,NPC) = danger(v,her) with equal ghen/aff/oán",danger(a,t)===danger(a,S),[danger(a,t),danger(a,S)]);
  const ht=hostility(a,t),hs=hostility(a,S);if(eo)emoOn=eo;T("hostility jealousy term reads ghenOf for both",Math.abs((ht-hs))<16,[ht,hs]);
  // 3. the same events feed jealousy of an NPC: a night, a promotion, a flaunt
  for(const v of L){v.ghen=0;delete v.gp}
  const bw0=bestow;bestow=function(){};/* the random reward after a night (both sides, j8/j75) is not this test */
  const g0=ghenOf(c,t);rivalNight(t);const g1=ghenOf(c,t);T("an NPC night raises the others jealousy of that NPC (was: no one)",g1>g0,[g0,g1]);
  const s0=ghenOf(c,S);nightFx(0);const s1=ghenOf(c,S);T("her night raises the same amount (ghenAll 8)",s1-s0===g1-g0,[s1-s0,g1-g0]);
  const p0=ghenOf(c,t);ghenAt(t,10);T("ghenAt(NPC) = ghenAll for her (incl. Đa tình)",ghenOf(c,t)-p0===Math.round(10*(has("datinh")?1.5:1)));bestow=bw0;
  // 4. the steal victim is jealous of the THIEF (was: of her, even when an NPC stole)
  for(const v of L){v.ghen=0;delete v.gp}S.tonight=null;S.ntk=null;/* test 3's nights must not block the steal (j75 ntTaken) */
  stealWin(c,t,"tranh");T("NPC steals NPC's night: victim jealous of the thief, not of her",ghenOf(t,c)===BAL.steal.ghen&&(t.ghen||0)===0,[ghenOf(t,c),t.ghen]);S.tonight=null;
  // 5. weekly drift, same for every pair
  for(const v of L){v.ghen=0;delete v.gp}ghenAdd(a,t,10);ghenAdd(a,S,10);affAdd(a,t,-aff(a,t));affAdd(a,S,-aff(a,S));const sac0=[S.sac,t.sac];S.sac=t.sac=50;
  const r0=Math.random,sc0=BAL.ghenW.sac;Math.random=()=>.99;BAL.ghenW.sac=999;/* Sắc can carry a worn bonus: keep the +1 out of a decay test */ghenWeek(a);Math.random=r0;BAL.ghenW.sac=sc0;T("ghenWeek decays her and the NPC the same",ghenOf(a,t)===ghenOf(a,S)&&ghenOf(a,S)===10-BAL.ghenW.decay,[ghenOf(a,t),ghenOf(a,S),aff(a,t),aff(a,S),others(a).includes(S),!!S.dead,!!S.out,a.queen,ghenOf.toString().length]);[S.sac,t.sac]=sac0;
  // 6. leftovers
  const lo=L.slice().sort((x,y)=>rkOf(x)-rkOf(y))[0];const keep=S.rank;S.rank=Math.min(6,rkOf(lo)+3);const f=twFollowT(lo);T("Nương theo can pick her (highest seat above)",!!f&&rkOf(f)>rkOf(lo)+1&&(f===S||rkOf(f)>=S.rank),[f&&(f===S?"me":f.name)]);S.rank=keep;
  // r2-2: nobody starts jealous (newRival seeds no pair, her slot included)
  const nr=newRival(2);T("a newcomer starts jealous of nobody (her included)",(nr.ghen||0)===0&&!Object.keys(nr.gp||{}).length,[nr.ghen,nr.gp]);
  // r2-3: the Queen's reward lowers w's jealousy of the QUEEN, not of her
  {const q=queenP();if(q&&q!==S){const w=a;for(const v of L){v.ghen=0;delete v.gp}ghenAdd(w,q,20);ghenAdd(w,S,20);affAdd(q,w,200);affAdd(q,S,-200);const m0=S.month;S.month=3;
   const bw=bestow;bestow=function(){};try{queenRewards()}catch(e){}bestow=bw;S.month=m0;
   T("queenRewards: w's jealousy of the Queen drops, of her unchanged",ghenOf(w,S)===20&&ghenOf(w,q)===20-BAL.ghenW.qReward,[ghenOf(w,q),ghenOf(w,S)])}else T("queenRewards (no NPC queen in this start: skipped)",true)}
  // r2-4: hậu thưởng instead of a full seat: the same jealousy both ways, no her-only oán
  T("jexam hậu thưởng: no her-only oán line left",!/oanAdd\(S,p,B\.oan\)/.test(document.documentElement.innerHTML));
  // r2-5: a dead NPC target is pruned weekly and never read by ghenMax; a co-op pid key stays
  for(const v of L){v.ghen=0;delete v.gp}ghenAdd(a,t,70);a.gp[901]=5;t.alive=false;T("ghenMax skips a dead target",ghenMax(a)===5,[ghenMax(a)]);
  {const r1=Math.random;Math.random=()=>.99;ghenWeek(a);Math.random=r1}T("ghenWeek prunes the dead target, keeps the pid key",!(t.id in a.gp)&&a.gp[901]===5,[a.gp]);t.alive=true;delete a.gp[901];
  // 7. co-op key shape: an NPC id never collides with a player pid (901/902)
  T("NPC ids < 900 (gp keys shared with co-op pids)",rivals.every(v=>+v.id<900));
  // 8. save round trip keeps gp
  for(const v of L){v.ghen=0;delete v.gp}ghenAdd(a,t,33);const d=ser();const r=d.R.find(x=>x.id===a.id);T("ser() keeps v.gp",r&&r.gp&&r.gp[t.id]===33);
  return out});
 let bad=0;for(const r of R){if(r[0]!=="PASS")bad++;console.log(r.join(" | "))}console.log("page errors: "+errs.length);errs.slice(0,5).forEach(e=>console.log("  "+e));
 await b.close();process.exit(bad||errs.length?1:0)})();
