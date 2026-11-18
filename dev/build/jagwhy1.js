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
