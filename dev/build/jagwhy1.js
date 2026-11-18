/* ================= jagwhy1: NPC-PURPOSE G1 kinds — the stray man in the hậu cung (j22 affairs + jmen plans) =================
   Owner OD 18/11 ~04:08Z (no luck: the stray man must come from a real goal: a lover meeting, a secret letter, an admirer…) + OD:L188 (men's
   intrusions are plan-driven). Uses ONLY the jagwhy helper (npwReg / npcWhy / npwPick); numbers BAL.ag.why.{affair,affairOut,tryst,letter,seek,menGrudge}.
   affair     j22 affairMonth: a consort takes a lover only when a man already fancies her (jmen likeV = the one he has seen and admires) and she is
              lonely enough: (affair.sung − Sủng) × sungK − Đức × ducK (+ kin for Kín đáo: she believes she can hide it). No admirer → no affair.
   affairOut  j22: an affair is exposed only by a person who holds proof against her (evG ≥ affairOut.ev) and bears her a grudge
              (hostility ≥ affairOut.host); she is named. Witnesses of a stray in the act are jmen menNpcSee (unchanged).
   tryst      jmen plan 1: the pair meet when their longing is strong enough: tryst.base + rove for a roving man − fear (Kín đáo); the gap between
              meetings is the old cadence, now BAL (tryst.cd = [roving, other] tuần).
   letter     jmen plan 2: the consort with the most urgent reason writes (letter.w per reason); once a season per consort (cd.letter).
   seek       jmen plan 4: an admirer goes in when his fancy is strong (seek.base + her looks above seek.sac); his gap = nv(m,"menGap") (BAL.net).
   menGrudge  jmen month: a spurned man spreads his rumour while his grudge lasts; gap = cd.menGrudge.
   ======================================================================================================================================= */
function npw1B(k){return BAL.ag.why[k]}
npwReg("affair",{grp:"consort",who:()=>liveRivals(false).filter(v=>v&&v.alive&&!v.out&&!v.queen&&!v.affair&&(v.age||20)>=18),
 why(v){const A=npw1B("affair");const m=(S.men||[]).find(x=>x.alive&&x.likeV===v.id&&!(typeof menBanned==="function"&&menBanned(x)));if(!m)return null;
  const s=Math.max(0,A.sung-(v.sung||0))*A.sungK-(v.duc||0)*A.ducK+(hasT(v,"Kín đáo")?A.kin:0);
  return {s,t:m,r:`lâu không được Hoàng thượng đoái hoài, lại có ${m.name} đem lòng để ý`}}});
npwReg("affairOut",{grp:"consort",who:c=>liveRivals(true).filter(w=>w&&w!==c.v&&w.alive&&!w.out),
 why(w,c){const A=npw1B("affairOut");if(evG(w,c.v)<A.ev)return null;const h=hostility(w,c.v);if(h<A.host)return null;return {s:h,t:c.v,r:"nắm chứng cứ trong tay, lại sẵn lòng oán nàng"}}});
npwReg("tryst",{grp:"pair",cdOf:m=>{const C=npw1B("tryst").cd;return MEN_ROVE.some(t=>hasT(m,t))?C[0]:C[1]},who:c=>[c.m],
 why(m,c){const A=npw1B("tryst");const s=A.base+(MEN_ROVE.some(t=>hasT(m,t))?A.rove:0)-((hasT(c.v,"Kín đáo")||hasT(m,"Kín đáo"))?A.fear:0);return {s,t:c.v,r:`hẹn hò với ${npwNm(c.v)}`}}});
npwReg("letter",{grp:"consort",who:c=>c.C,why(v){const W=npw1B("letter").w;const why=v.confined?"confined":v.plan?"plan":(v.preg&&v.hidden)?"preg":((v.sung||0)<25&&(v.ghen||0)>=50)?"jealous":"";
  if(!why)return null;return {s:W[why],r:why}}});
npwReg("seek",{grp:"man",cdOf:m=>nv(m,"menGap"),who:c=>[c.m],why(m,c){const A=npw1B("seek");const v=c.v;if(!v)return null;const sac=typeof effSac==="function"?effSac(v):(v.sac||0);
  return {s:A.base+Math.max(0,sac-A.sac),t:v,r:`mê ${npwNm(v)}`}}});
npwReg("menGrudge",{grp:"man",who:()=>(S.men||[]).filter(m=>m.alive&&m.grudge==="me"&&m.grudgeN>0&&!(typeof menBanned==="function"&&menBanned(m))),
 why(m){return {s:npw1B("menGrudge").s,t:S,r:"ôm hận ngươi"}}});
/* ---- G1 part 2: weekly cards j3/j7 (makeDil, j3). Each card's actor = the person whose goal drives it; numbers BAL.ag.why.dil ----
   The gate is the game's ONE motive gate motiveOK (j95, OD:L35: grudge / jealousy / dislike ≥ 30, not fond of the target) with the act's own
   kind (DIL_K h = the P95B role of the card); s = BAL.ag.why.min + hostility (who hates most acts first). The j95b card check then passes them.
   meHarm    doll, poisongift, guardrumour, ghost, maidhostage, taster: a consort with a motive against her
   meAlly    pact: a consort with a reason to ally with her AND a motive against the Empress
   hhCane    caning: the Empress punishes the consort she has a motive against · hhMe vase: the Empress wants a pretext against her
   hhGreed   embezzle: only a greedy Empress (greedT nết) · empAsk tuyen: the Emperor, when the palace is thin
   coldAsk   coldletter, coldvisit: a fallen consort who trusts her · loveFound loveletter: a consort with a real lover (j22 affair), her tai mắt
   arson     fire / omen comet: a motive AND hostility ≥ arsonBar / omenBar (the heaviest deeds) · rvHarm rvframe/rvmusk/rvbribe, rvFeud rvquarrel */
function npw1Gr(v,t){const o=oan(v,t),a=Math.max(0,-aff(v,t))/2,g=t===S?(v.ghen||0)/2:Math.max(0,((t.sung||0)-(v.sung||0))/3);const n=t===S?"ngươi":"nàng";
 if(o>=a&&o>=g&&o>0)return `ôm hận ${n}`;if(g>=a&&g>0)return t===S?"ghen với ân sủng của ngươi":"ghen vì nàng được sủng hơn";return `coi ${n} là cái gai trong mắt`}
function npw1Mot(v,t,h,bar){if(!v||!t||v===t||!motiveOK(v,t,h||"harm").ok)return null;const x=hostility(v,t);if(bar&&x<bar)return null;return {s:npwB().min+x,t,r:npw1Gr(v,t)}}
function npw1Best(v,L,h,bar){let b=null;for(const t of L){const o=npw1Mot(v,t,h,bar);if(o&&(!b||o.s>b.s))b=o}return b}
const DIL_K={doll:["meHarm","frame"],poisongift:["meHarm","harm"],guardrumour:["meHarm","rumor"],ghost:["meHarm","rumor"],maidhostage:["meHarm","uyhiep"],taster:["meHarm","poison"],
 pact:["meAlly","ally"],caning:["hhCane","harm"],coldvisit:["coldAsk"],fire:["arson","harm"],rvframe:["rvHarm","frame"],rvmusk:["rvHarm","musk"],rvbribe:["rvHarm","bribe"],
 rvquarrel:["rvFeud","provoke"],comet:["omen","harm"]};
const npw1Q=()=>qOn()?[rivals[0]]:[];
npwReg("meHarm",{grp:"consort",who:()=>liveRivals(false),why(v,c){return npw1Mot(v,S,c.h)}});
npwReg("meAlly",{grp:"consort",who:()=>qOn()?liveRivals(false):[],why(v){const q=rivals[0];if(!motiveOK(v,S,"ally").ok||!motiveOK(v,q,"plot").ok||aff(v,S)<npw1B("dil").allyAff)return null;
 return {s:npwB().min+(aff(v,S)+hostility(v,q))/2,t:S,r:"ghét Hoàng hậu mà tin ngươi"}}});
npwReg("hhCane",{grp:"queen",who:npw1Q,why(q,c){return npw1Best(q,liveRivals(false),c.h)}});
npwReg("hhMe",{grp:"queen",who:npw1Q,why(q){return npw1Mot(q,S,"harm")}});
npwReg("hhGreed",{grp:"queen",who:npw1Q,why(q){const D=npw1B("dil");const T=typeof traitsOf==="function"?traitsOf(q):[];return T.some(x=>D.greedT.includes(x))?{s:D.greed,r:"vốn tham của"}:null}});
npwReg("empAsk",{grp:"emp",who:()=>S.emp&&!S.empDead?[S.emp]:[],why(){const D=npw1B("dil").emp;if(typeof roomFor==="function"&&!roomFor("consort"))return null;
 return {s:(D.want-liveRivals(true).length)*D.k,r:"hậu cung còn thưa người"}}});
npwReg("coldAsk",{grp:"consort",who:()=>rivals.filter(v=>v.alive&&v.out),why(f){const C=npw1B("dil").cold;if(!motiveOK(f,S,"visit").ok)return null;
 return {s:C.base+Math.max(0,aff(f,S))*C.aff+(S.duc||0)*C.duc,t:S,r:"cùng đường, tin ngươi còn lòng thương"}}});
npwReg("loveFound",{grp:"consort",who:()=>liveRivals(false).filter(v=>v.affair&&manById(v.affair)),why(v){const L=npw1B("dil").love;return {s:L.base+eyes(S)*L.eye,t:manById(v.affair),r:"tư thông"}}});
npwReg("arson",{grp:"consort",who:()=>liveRivals(true),why(a,c){return npw1Best(a,liveRivals(false),c.h,npw1B("dil").arsonBar)}});
npwReg("rvHarm",{grp:"consort",who:()=>liveRivals(false),why(a,c){return npw1Best(a,liveRivals(false),c.h)}});
npwReg("rvFeud",{grp:"consort",who:()=>liveRivals(false),why(a,c){const x=npw1Best(a,liveRivals(false),c.h);if(!x)return null;x.s=(x.s+npwB().min+hostility(x.t,a))/2;return x}});
npwReg("omen",{grp:"consort",who:()=>liveRivals(true),why(a,c){return npw1Best(a,liveRivals(false).concat([S]),c.h,npw1B("dil").omenBar)}});
