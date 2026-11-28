/* ================= jaccw — WARNED BEFORE THE ACCUSATION (WORKLIST row 12, removal ladder; review/row12-leave) =================
   Owner OD 25/11 ~23:33Z (L2531, verbatim part): "a punishment never falls without a prior visible warning. Whole family: every forced
   move (giải ra, cấm túc, lãnh cung, đuổi về, triệu kiến)". Before this file an NPC who held enough chứng cứ on her ran «Tố giác» /
   «Tố tội thật» / «Bóc chuyện tư tình» / «Trình Hoàng hậu» in one step: the PUNISH-TIER penalty (jpun punTier: giáng · giáng + lãnh cung ·
   ban chết) fell the same buổi, with no word before it (only a Tai mắt roll, mindTell, could catch a BIG scheme; these acts are not BIG).
   Now (one rule, law 1 two-way):
   1. An NPC accuser A whose act really starts (its f(), after every runAct gate) on a consort T first PREPARES it (A.plan, BAL.accw.due buổi; the j40 plan runner fires it).
      T === her: a kit dialog «Sắp bị tố giác» tells her WHO, WHICH charge and weight, the penalty if it sticks, and WHEN (always shown: the
      accuser has to bring the case to the judge, Cung Chính ti sends word — the real-world summons «triệu kiến»).
   2. Three tiered ways out (law 2 Nhẹ · Vừa · Nặng, cost and result rise together; law 3 every option gains):
      Nhẹ «Tự thú trước»     — no bạc; the penalty falls now ONE tier lighter (PUNISH-TIER rec 4 tự thú, BAL.charge.conf.down); the case closes.
      Vừa «Dàn xếp với A»     — bạc BAL.accw.settle (paid only when A takes it, like «Mua chuộc»); A hands back the pieces of that charge, the case drops.
      Nặng «Cầu <patron> che chở» — more bạc (BAL.accw.shield, the gifts go whether or not); Thái hậu / Hoàng hậu shelves the case, A's pieces of
                                  that charge are burnt and A loses Danh.
      Not choosing (✕) = she waits: the accusation comes on its day with its own odds (today's road).
   3. An NPC T answers the SAME three ways + waiting (BAL.accw.npcW weights, mindPick slip; bạc checks the same). When SHE accuses T, her
      tap is her answer to any settlement: T may still confess or seek a patron at once (no plan: her act is hers to run now).
   Numbers: BAL.accw (jbal2.js). Nothing here changes a penalty: punTier / the act's own f() decide it (one core). ================ */
(function(){if(typeof BAL!=="object"||!BAL.accw||typeof ACT!=="object")return;
const W=()=>BAL.accw;
const AWK=["accuse","tocao","expose"];/* «Trình Hoàng hậu» is reached through «Tố giác» (jcharge chTo): wrapped there, not twice */
let AWRUN=0;
/* the charge the act would bring on t, and its weight (jcharge: Tố giác / Trình Hoàng hậu / Tố tội thật / Bóc chuyện tư tình all punish by chTier) */
function awC(k,a,t){try{if(k==="tocao")return chTocao(a,t)||null;if(k==="expose")return "tt";return chReady(a,t)||null}catch(e){return null}}
function awX(k,t,c){try{return c?chTier(t,c):"vua"}catch(e){return "vua"}}
/* the words of the penalty of weight x for charge c (the same as chPunTxt / chPunishX: a nhẹ charge of kind «bổng» is a fine) */
function awPunTxt(t,c,x){const C=chC(c)||{};if(x==="nhe")return C.lite==="bong"?`bị phạt bổng ${BAL.charge.fine} lượng`:`bị cấm túc ${typeof punishMonths==="function"?punishMonths():1} tháng`;return punTierTxt(t,x)}
function awId(a,t){return `${a===S?"me":a.id}>${key(t)}`}
function awRec(a,t){const R=(S.accw||{})[awId(a,t)]||null;if(R&&a!==S&&R.k!=="judge"&&!(a.plan&&a.plan.aw)&&bq()>R.due+W().due){delete S.accw[awId(a,t)];return null}return R}
function awDel(a,t){if(S.accw)delete S.accw[awId(a,t)];if(a&&a!==S&&a.plan&&a.plan.aw)a.plan=null}
function awLive(p){return p===S?!S.dead&&!S.out:!!p&&p.alive!==false&&!p.out}
function awOn(a,t,k){if(window.__awoff/* the penalty-core tests (punish-tier) call the acts' f() directly: the warning step is tested in accw.test.js */||!S||S.dead||!a||!t||a===t||a.coop||t.coop||!AWK.includes(k))return false;if(!awLive(a)||!awLive(t))return false;
 try{if(typeof isSrv==="function"&&isSrv())return false}catch(e){}try{return !!ACT[k].ok(a,t)}catch(e){return false}}
/* prices (her and an NPC the same): settle = base + per piece, capped; shield = a fixed gift */
function awN(a,t,c){try{return c?chHave(a,t,c):0}catch(e){return 0}}
function awSettle(a,t,c){const B=W().settle;return Math.min(B.cap,B.bac+B.per*awN(a,t,c))}
function awBac(p){return p===S?(S.bac|0):(p.bac|0)}
function awPat(a,t){try{if(!S.thDead&&S.thO)return {k:"th",n:"Thái hậu"}}catch(e){}try{const q=queenP();if(q&&q!==a&&q!==t&&awLive(q))return {k:"hh",n:`Hoàng hậu ${q.name}`,q}}catch(e){}return null}
function awSettleO(a,t){const B=W().settle;let f=0;try{f=aff(a,t)}catch(e){}return oddsCl(B.base+f/B.affD)}
function awShieldO(a,t,P){const B=W().shield;let f=0;try{f=P.k==="th"?(t===S?(S.th||0):(t.th||0)):aff(P.q,t)}catch(e){}return oddsCl(B.base+f/B.affD)}
function awPay(p,n,to){if(p===S)apply({bac:-n});else p.bac=Math.max(0,(p.bac|0)-n);if(to)ap(to,{bac:n})}
/* the three ways out, applied (her card and an NPC's answer run the same code) */
function awConfess(a,t,c,x){awDel(a,t);const n=awN(a,t,c);if(n&&c)evA(a,t,-n,c);
 chConfess(t,c,`${t===S?"Ngươi":t.name} tự thú trước khi bị ${NM(a)} tố`,a);
 return `${t===S?"Ngươi":t.name} tự thú trước khi ${NM(a)} kịp tố; tội nhẹ đi một bậc.`}
function awSettleGo(a,t,c,paid){const pr=awSettle(a,t,c),o=awSettleO(a,t);if(!paid&&awBac(t)<pr)return null;
 if(!roll(o)){if(paid)awPay(t,-pr)/* her card took the bạc up front (kit Tốn row): handed back */;try{oanAdd(t,a,W().settle.oan)}catch(e){}return `${NMc(a)} không nhận bạc dàn xếp của ${t===S?"ngươi":t.name}; vụ tố vẫn tới.`}
 const n=awN(a,t,c);awDel(a,t);if(paid)ap(a,{bac:pr});else awPay(t,pr,a);if(n&&c)evA(a,t,-n,c);
 return `${NMc(a)} nhận ${pr} lượng bạc, trả lại ${n} chứng cứ tội ${chName(c).toLowerCase()}; vụ tố bỏ.`}
function awShieldGo(a,t,c,P,paid){const B=W().shield;if(!P||(!paid&&awBac(t)<B.bac))return null;if(paid){if(P.q)ap(P.q,{bac:B.bac})}else awPay(t,B.bac,P.q||null);const o=awShieldO(a,t,P);
 if(!roll(o))return `${P.n} nhận lễ của ${t===S?"ngươi":t.name} nhưng không ra mặt; vụ tố vẫn tới.`;
 const n=awN(a,t,c);awDel(a,t);if(n&&c)evA(a,t,-n,c);ap(a,{danh:-B.foeDanh});try{oanAdd(a,t,B.oan)}catch(e){}
 return `${P.n} gác vụ tố của ${NM(a)} lại; chứng cứ tội ${chName(c).toLowerCase()} bị đốt, ${NM(a)} Danh ${balSg(-B.foeDanh)}.`}
/* an NPC's answer: the same list, weighted (BAL.accw.npcW) — «cho» = wait for the verdict */
function awNpcPick(a,t,c,mine){const N=W().npcW,P=awPat(a,t),O=[["cho",N.cho]];if(punStep(awX("",t,c),-BAL.charge.conf.down)!==awX("",t,c))O.push(["tu",N.tu]);
 if(!mine&&awBac(t)>=awSettle(a,t,c))O.push(["xep",N.xep]);if(P&&awBac(t)>=W().shield.bac)O.push(["che",N.che]);
 let k="cho";try{k=mindPick(O,t)||"cho"}catch(e){}return k}
function awNpcDo(a,t,k,c,x){if(k==="tu")return awConfess(a,t,c,x);if(k==="xep")return awSettleGo(a,t,c);if(k==="che")return awShieldGo(a,t,c,awPat(a,t));return null}
/* step 1: the accuser prepares the case */
function awStart(a,t,k,c0){const c=c0||awC(k,a,t);if(!c)return false;const x=awX(k,t,c);const due=bq()+W().due;
 S.accw=S.accw||{};S.accw[awId(a,t)]={a:key(a),t:key(t),k,c,x,due};if(k!=="judge")a.plan={k,t:key(t),due,err:0,aw:1};/* «Xử tội» is not an ACT: its own due runner below */
 if(t===S){pushDil(mkP("accw",{a:key(a)}),"Sắp bị tố giác");return true}
 const r=awNpcDo(a,t,awNpcPick(a,t,c,false),c,x);if(r)try{log(r)}catch(e){}return true}
/* her card */
PEND.accw=pp=>{const a=byKey(pp.a);if(!S||!a||a===S||!awLive(a)||!awLive(S))return null;const R=awRec(a,S);if(!R)return null;
 const c=R.c,x=R.x,n=Math.max(1,R.due-bq()),pr=awSettle(a,S,c),P=awPat(a,S),Sh=W().shield;const lt=punStep(x,-BAL.charge.conf.down);
 const O=[];
 if(lt!==x)O.push({n:"Nhẹ · Tự thú trước",fx:{},j67:`tốn: chịu phạt ngay · được: ngươi ${awPunTxt(S,c,lt)} thay vì ${awPunTxt(S,c,x)}, vụ tố khép lại`,go:()=>{const r=awConfess(a,S,c,x);log(r)}});
 if(S.bac>=pr)O.push({n:`Vừa · Dàn xếp với ${a.name}`,fx:{bac:-pr},p:awSettleO(a,S),ton:{bac:-pr},j67:`tốn: Bạc ${balSg(-pr)} · thành: nàng trả lại chứng cứ tội ${chName(c).toLowerCase()}, vụ tố bỏ · hỏng: nàng không nhận, bạc trả lại, vẫn tố`,go:()=>{const r=awSettleGo(a,S,c,true);if(r)log(r)}});
 if(P&&S.bac>=Sh.bac)O.push({n:`Nặng · Cầu ${P.n} che chở`,fx:{bac:-Sh.bac},p:awShieldO(a,S,P),ton:{bac:-Sh.bac},j67:`tốn: Bạc ${balSg(-Sh.bac)} (lễ dâng) · thành: vụ tố bị gác, chứng cứ tội ấy bị đốt, Danh nàng ${balSg(-Sh.foeDanh)} · hỏng: vẫn bị tố`,go:()=>{const r=awShieldGo(a,S,c,P,true);if(r)log(r)}});
 return {who:pv(a),t:`<p>Cung Chính ti báo tin: ${R.k==="judge"?`Hoàng hậu ${a.name} đã nắm đủ chứng cứ, sắp xử ngươi tội <b>${chName(c).toLowerCase()}</b> (${punTierN(x)})`:`${a.name} đã gom đủ chứng cứ, sắp tố ngươi tội <b>${chName(c).toLowerCase()}</b> (${punTierN(x)}) trước ${judgeName(S)}`}, trong ${n} buổi tới.</p><p>Nếu tố thành, ngươi ${awPunTxt(S,c,x)}. Không làm gì thì chờ ngày xét.</p>`,o:O}};
/* the hook sits on the act's own f() (after every gate of runAct: knowing her, motive, a sent servant's road, j70): the act is really
   happening. The first time it PREPARES (no penalty); the j40 plan runner brings the accuser back on the due buổi and f() runs for real. */
function awWrap(k){const A=ACT[k];if(!A||A.__aw)return;const f0=A.f;A.__aw=1;
 A.f=function(a,t){if(AWRUN||!awOn(a,t,k))return f0.apply(this,arguments);
  if(a!==S){const R=awRec(a,t);if(R){if(bq()<R.due)return "";awDel(a,t);AWRUN=1;try{return f0.apply(this,arguments)}finally{AWRUN=0}}
   if(awStart(a,t,k))return "";return f0.apply(this,arguments)}
  /* her act on an NPC: the accused answers at once (confess / patron), never a settlement she did not ask for */
  const c=awC(k,a,t);if(c){const kk=awNpcPick(a,t,c,true);if(kk==="tu"||kk==="che"){const r=awNpcDo(a,t,kk,c,awX(k,t,c));if(r)return r}}
  AWRUN=1;try{return f0.apply(this,arguments)}finally{AWRUN=0}}}
AWK.forEach(awWrap);
/* the NPC Hoàng hậu's «Xử tội» (j8 judge: her monthly pick, jagacts hhAct) is the same punishment road: prepared first, run on its day */
if(typeof judge==="function"){const j0=judge;judge=function(q,p){if(AWRUN||window.__awoff||!q||!p||q===p||q===S||q.coop||p.coop||!awLive(q)||!awLive(p)||!S||S.dead)return j0.apply(this,arguments);
  const R=awRec(q,p);if(R){if(bq()<R.due)return "";awDel(q,p);AWRUN=1;try{return j0.apply(this,arguments)}finally{AWRUN=0}}
  let c=null;try{c=chReady(q,p)}catch(e){}if(!c)return j0.apply(this,arguments);awStart(q,p,"judge",c);return ""};
 if(typeof rivalsBuoi==="function"){const b0=rivalsBuoi;rivalsBuoi=function(){let ev=b0.apply(this,arguments)||"";try{for(const id of Object.keys(S.accw||{})){const R=S.accw[id];if(!R||R.k!=="judge"||bq()<R.due)continue;
   const q=byKey(R.a),p=byKey(R.t);if(!q||!p||!q.queen||!awLive(q)||!awLive(p)){delete S.accw[id];continue}let ok=false;try{ok=!!chReady(q,p)}catch(e){}if(!ok){delete S.accw[id];continue}
   const r=judge(q,p);if(r)ev+=typeof seenNPC==="function"?seenNPC(q,p,r):r;if(S.dead)return ev}}catch(e){console.error("accw judge",e)}return ev}}}
window.AWK=AWK;window.awRec=awRec;
})();
