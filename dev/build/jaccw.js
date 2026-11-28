/* ================= jaccw — WARNED BEFORE IT FALLS (WORKLIST row 12, removal ladder; review/row12-leave r2) =================
   Owner OD 25/11 ~23:33Z (L2531, verbatim part): "a punishment never falls without a prior visible warning. Whole family: every forced
   move (giải ra, cấm túc, lãnh cung, đuổi về, triệu kiến)".
   ONE rule, ONE path (law 11). Every punishment core — punish · fall · demote · chPunishX (chPunish / chConfess / chLie / chBack) ·
   deathSentence · cold · punTier · srvAffairCaught · chSrvEnd · srvLaundry · srvKill — is wrapped here (this file is assembled LAST, so this wrapper is the
   outermost one). When a core would land on HER and the road is not her own choice, nothing falls now:
     · «her own choice» = inside her tap on a card option (chooseM: the card already said «hỏng / lộ: bị phạt …») or her own act (runAct a===S);
     · «not hers» = an NPC is the doer (runAct of an NPC, a «by» / ACTX / CHX accuser who is not her), or the world turn (nextBuoi / endTurn:
       the monthly checks, the raid, the servant-life search …), or a witness road inside her own action (menReport / rtReport).
   Then the core is HELD: a record in S.accw (the core's name + its plain arguments) and her kit dialog «Sắp bị trị tội» says WHO brings it,
   WHY, the penalty if it sticks, and WHEN (BAL.accw.due buổi); on that buổi the held core runs exactly as it would have (one core: nothing
   here computes a penalty). Three tiered ways out (law 2 Nhẹ · Vừa · Nặng, cost and result rise together, law 3 every option gains):
     Nhẹ «Nhận tội trước»  — no bạc; the SAME penalty one step lighter falls now; the case closes.
     Vừa «Dàn xếp với A»    — only when an NPC accuser A brought it: bạc BAL.accw.settle to A (paid only if A takes it); A drops the case and hands
                              back the pieces of that charge.
     Nặng «Cầu P che chở»   — a dearer gift BAL.accw.shield (always given: to the Hoàng hậu, or into the Thái hậu's household S.thO — a real owner,
                              law 6c); P shelves the case; an accuser A loses EVERY piece she holds on her, Danh − and bears oán (a bigger kind of
                              result than Vừa: all her cases end, not one). Base odds Nặng > Vừa (BAL.accw.shield.base > settle.base).
     ✕ = wait for the day.
   The accusation acts (Tố giác + its Trình Hoàng hậu road, Tố tội thật, Bóc chuyện tư tình) and the Hoàng hậu's «Xử tội» (judge) are
   prepared at act level (the whole act waits, not only its penalty), for EVERY doer and target (law 1 two-way):
     NPC → her: her dialog «Sắp bị tố giác» (same three ways) · NPC → NPC: the accused answers by its own goals (BAL.accw.npcW, mindPick) ·
     HER → NPC (her Tố giác / Tố tội thật / Bóc chuyện / her Xử tội as Hoàng hậu): the same 2-buổi prepare; the NPC answers the same list —
     confess (lighter now), seek a patron (her pieces burnt, her Danh −), offer HER a settlement (her dialog «Xin dàn xếp»: take the bạc and
     drop it, or refuse) or wait; on the due buổi her act runs by itself.
   Monthly checks warn a month ahead (j30 demoteReview: Sủng under the floor / long illness → kit notice, awPre), so the fall the next month
   is already warned. Already-warned world roads (place-close overstay, its plaque notice) run inside awOk().
   Numbers: BAL.accw (jbal2.js). Words: VANPHONG (no %, odds as words). Dialog: the standard PEND card + j67 line (kit). ================ */
(function(){if(typeof BAL!=="object"||!BAL.accw||typeof ACT!=="object")return;
const W=()=>BAL.accw;
const AWK=["accuse","tocao","expose"];/* «Trình Hoàng hậu» is reached through «Tố giác» (jcharge chTo): wrapped there, not twice */
let AWRUN=0,AWIN=0,AWOKN=0;const AWCTX=[];
function awCtx(){return AWCTX.length?AWCTX[AWCTX.length-1]:""}
function awInCtx(c,f,th,args){AWCTX.push(c);try{return f.apply(th,args)}finally{AWCTX.pop()}}
function awRun(f){AWRUN++;try{return f()}finally{AWRUN--}}
function awOk(f){AWOKN++;try{return f()}finally{AWOKN--}}
/* ---------- shared helpers (the act roads and the core gate run the same code) ---------- */
function awC(k,a,t){try{if(k==="tocao")return chTocao(a,t)||null;if(k==="expose")return "tt";return chReady(a,t)||null}catch(e){return null}}
function awX(k,t,c){try{return c?chTier(t,c):"vua"}catch(e){return "vua"}}
function awPunTxt(t,c,x){const C=chC(c)||{};if(x==="nhe")return C.lite==="bong"?`bị phạt bổng ${BAL.charge.fine} lượng`:`bị cấm túc ${typeof punishMonths==="function"?punishMonths():1} tháng`;return punTierTxt(t,x)}
function awId(a,t){return `${a===S?"me":a.id}>${key(t)}`}
function awRec(a,t){const R=(S.accw||{})[awId(a,t)]||null;if(R&&a!==S&&R.k!=="judge"&&!(a.plan&&a.plan.aw)&&bq()>R.due+W().due){delete S.accw[awId(a,t)];return null}return R}
function awDel(a,t){if(S.accw)delete S.accw[awId(a,t)];if(a&&a!==S&&a.plan&&a.plan.aw)a.plan=null}
function awLive(p){return p===S?!S.dead&&!S.out:!!p&&p.alive!==false&&!p.out}
function awWorld(){try{return !(typeof worldOn==="function"&&!worldOn())}catch(e){return true}}
function awOn(a,t,k){if(window.__awoff/* the penalty-core tests (punish-tier) call the acts' f() directly: the warning step is tested in accw.test.js */||!S||S.dead||!a||!t||a===t||a.coop||t.coop||!AWK.includes(k))return false;if(!awLive(a)||!awLive(t)||!awWorld())return false;
 try{if(typeof isSrv==="function"&&isSrv())return false}catch(e){}try{return !!ACT[k].ok(a,t)}catch(e){return false}}
function awN(a,t,c){try{return c?chHave(a,t,c):0}catch(e){return 0}}
function awAll(a,t){try{return evG(a,t)}catch(e){return 0}}
function awSettle(a,t,c){const B=W().settle;return Math.min(B.cap,B.bac+B.per*awN(a,t,c))}
function awBac(p){return p===S?(S.bac|0):(p.bac|0)}
function awPat(a,t){try{if(!S.thDead&&S.thO)return {k:"th",n:"Thái hậu",to:S.thO}}catch(e){}try{const q=queenP();if(q&&q!==a&&q!==t&&awLive(q))return {k:"hh",n:`Hoàng hậu ${q.name}`,q,to:q}}catch(e){}return null}
function awSettleO(a,t){const B=W().settle;let f=0;try{f=aff(a,t)}catch(e){}return oddsCl(B.base+f/B.affD)}
function awShieldO(a,t,P){const B=W().shield;let f=0;try{f=P.k==="th"?(t===S?(S.th||0):(t.th||0)):aff(P.q,t)}catch(e){}return oddsCl(B.base+f/B.affD)}
function awPay(p,n,to){if(p===S)apply({bac:-n});else p.bac=Math.max(0,(p.bac|0)-n);if(to)ap(to,{bac:n})}
function awNm(p){return p===S?"ngươi":p.name}
/* ---------- the act roads: the three ways out (her card and an NPC's answer run the same code) ---------- */
function awConfess(a,t,c,x){awDel(a,t);const n=awN(a,t,c);if(n&&c)evA(a,t,-n,c);
 awRun(()=>chConfess(t,c,`${t===S?"Ngươi":t.name} tự thú trước khi bị ${NM(a)} tố`,a));
 return `${t===S?"Ngươi":t.name} tự thú trước khi ${NM(a)} kịp tố; tội nhẹ đi một bậc.`}
function awSettleGo(a,t,c,paid){const pr=awSettle(a,t,c),o=awSettleO(a,t);if(!paid&&awBac(t)<pr)return null;
 if(!roll(o)){if(paid)awPay(t,-pr)/* her card took the bạc up front (kit Tốn row): handed back */;try{oanAdd(t,a,W().settle.oan)}catch(e){}return `${NMc(a)} không nhận bạc dàn xếp của ${awNm(t)}; vụ tố vẫn tới.`}
 const n=awN(a,t,c);awDel(a,t);if(paid)ap(a,{bac:pr});else awPay(t,pr,a);if(n&&c)evA(a,t,-n,c);
 return `${NMc(a)} nhận ${pr} lượng bạc, trả lại ${n} chứng cứ tội ${chName(c).toLowerCase()}; vụ tố bỏ.`}
/* Nặng: the gift always goes to the patron (Hoàng hậu, or the Thái hậu's household S.thO); success = the case is shelved AND the accuser loses
   EVERY piece she holds on t (not only this charge's), Danh − and oán — a bigger kind of result than Vừa's one dropped case */
function awShieldGo(a,t,c,P,paid){const B=W().shield;if(!P||(!paid&&awBac(t)<B.bac))return null;if(paid)ap(P.to,{bac:B.bac});else awPay(t,B.bac,P.to);const o=awShieldO(a,t,P);
 if(!roll(o))return `${P.n} nhận lễ của ${awNm(t)} nhưng không ra mặt; vụ tố vẫn tới.`;
 const n=awAll(a,t);awDel(a,t);if(n)evA(a,t,-n);ap(a,{danh:-B.foeDanh});try{oanAdd(a,t,B.oan)}catch(e){}
 return `${P.n} gác vụ tố của ${NM(a)} lại; mọi chứng cứ ${NM(a)} nắm về ${awNm(t)} bị đốt, ${NM(a)} Danh ${balSg(-B.foeDanh)}.`}
/* an NPC's answer: the same list, weighted (BAL.accw.npcW) — «cho» = wait for the verdict; «xep» toward HER = an offer she takes or refuses */
function awNpcPick(a,t,c){const N=W().npcW,P=awPat(a,t),O=[["cho",N.cho]];if(c&&punStep(awX("",t,c),-BAL.charge.conf.down)!==awX("",t,c))O.push(["tu",N.tu]);
 if(c&&awBac(t)>=awSettle(a,t,c))O.push(["xep",N.xep]);if(P&&awBac(t)>=W().shield.bac)O.push(["che",N.che]);
 let k="cho";try{k=mindPick(O,t)||"cho"}catch(e){}return k}
function awNpcDo(a,t,k,c,x){if(k==="tu"&&c)return awConfess(a,t,c,x);if(k==="xep"&&c){if(a===S){pushDil(mkP("accwx",{t:key(t)}),"Xin dàn xếp");return `${t.name} sai người sang xin dàn xếp.`}return awSettleGo(a,t,c)}if(k==="che")return awShieldGo(a,t,c,awPat(a,t));return null}
/* step 1: the accuser prepares the case (her, an NPC, the Hoàng hậu's «Xử tội» — the same record) */
function awStart(a,t,k,c0){const c=c0===undefined?awC(k,a,t):c0;if(!c&&k!=="judge")return false;const x=awX(k,t,c);const due=bq()+W().due;
 S.accw=S.accw||{};S.accw[awId(a,t)]={a:key(a),t:key(t),k,c,x,due};if(k!=="judge"&&a!==S)a.plan={k,t:key(t),due,err:0,aw:1};/* her case and «Xử tội»: the due runner below */
 if(t===S){pushDil(mkP("accw",{a:key(a)}),"Sắp bị tố giác");return true}
 const r=awNpcDo(a,t,awNpcPick(a,t,c),c,x);if(r)try{log(r)}catch(e){}return true}
/* her card (an accuser NPC on her) */
PEND.accw=pp=>{if(pp&&pp.id)return awCoreCard(pp.id);const a=byKey(pp.a);if(!S||!a||a===S||!awLive(a)||!awLive(S))return null;const R=awRec(a,S);if(!R||!R.c)return null;
 const c=R.c,x=R.x,n=Math.max(1,R.due-bq()),pr=awSettle(a,S,c),P=awPat(a,S),Sh=W().shield;const lt=punStep(x,-BAL.charge.conf.down);
 const O=[];
 if(lt!==x)O.push({n:"Nhẹ · Tự thú trước",fx:{},j67:`tốn: chịu phạt ngay · được: ngươi ${awPunTxt(S,c,lt)} thay vì ${awPunTxt(S,c,x)}, vụ tố khép lại`,go:()=>{if(!awRec(a,S))return;const r=awConfess(a,S,c,x);log(r)}});
 if(S.bac>=pr)O.push({n:`Vừa · Dàn xếp với ${a.name}`,fx:{bac:-pr},p:awSettleO(a,S),ton:{bac:-pr},j67:`tốn: Bạc ${balSg(-pr)} · thành: nàng trả lại chứng cứ tội ${chName(c).toLowerCase()}, vụ tố bỏ · hỏng: nàng không nhận, bạc trả lại, vẫn tố`,go:()=>{if(!awRec(a,S)){awPay(S,-pr);return}const r=awSettleGo(a,S,c,true);if(r)log(r)}});
 if(P&&S.bac>=Sh.bac)O.push({n:`Nặng · Cầu ${P.n} che chở`,fx:{bac:-Sh.bac},p:awShieldO(a,S,P),ton:{bac:-Sh.bac},j67:`tốn: Bạc ${balSg(-Sh.bac)} (lễ dâng ${P.n}) · thành: vụ tố bị gác, mọi chứng cứ ${a.name} nắm về ngươi bị đốt, Danh nàng ${balSg(-Sh.foeDanh)} · hỏng: vẫn bị tố`,go:()=>{if(!awRec(a,S)){awPay(S,-Sh.bac);return}const r=awShieldGo(a,S,c,P,true);if(r)log(r)}});
 return {who:pv(a),t:`<p>Cung Chính ti báo tin: ${R.k==="judge"?`Hoàng hậu ${a.name} đã nắm đủ chứng cứ, sắp xử ngươi tội <b>${chName(c).toLowerCase()}</b> (${punTierN(x)})`:`${a.name} đã gom đủ chứng cứ, sắp tố ngươi tội <b>${chName(c).toLowerCase()}</b> (${punTierN(x)}) trước ${judgeName(S)}`}, trong ${n} buổi tới.</p><p>Nếu tố thành, ngươi ${awPunTxt(S,c,x)}. Không làm gì thì chờ ngày xét.</p>`,o:O}};
/* her card when the NPC she accuses offers a settlement (law 1: the same «Dàn xếp» she can offer, now offered to her) */
PEND.accwx=pp=>{const t=byKey(pp.t);if(!S||!t||t===S||!awLive(t)||!awLive(S))return null;const R=awRec(S,t);if(!R||!R.c)return null;const c=R.c,pr=awSettle(S,t,c),n=awN(S,t,c);if(awBac(t)<pr)return null;
 return {who:pv(t),t:`<p>${t.name} biết ngươi sắp tố nàng tội <b>${chName(c).toLowerCase()}</b> (${punTierN(R.x)}), sai người mang ${pr} lượng bạc sang xin ngươi bỏ qua.</p><p>Không trả lời thì vụ tố vẫn tới ngày xét.</p>`,
  o:[{n:"Nhận bạc, bỏ vụ tố",fx:{},j67:`tốn: trả lại ${n} chứng cứ tội ${chName(c).toLowerCase()}, vụ tố bỏ · được: Bạc +${pr}`,go:()=>{if(!awRec(S,t)||awBac(t)<pr)return;awDel(S,t);awPay(t,pr,S);if(n)evA(S,t,-n,c);log(`Ngươi nhận ${pr} lượng bạc của ${t.name}, trả lại ${n} chứng cứ; vụ tố bỏ.`)}},
     {n:"Không nhận, cứ tố",fx:{},j67:`tốn: ${t.name} thêm oán · được: vụ tố vẫn tới ngày xét`,go:()=>{try{oanAdd(t,S,W().settle.oan)}catch(e){}log(`Ngươi không nhận bạc của ${t.name}; vụ tố vẫn tới ngày xét.`)}}]}};
/* the hook sits on the act's own f() (after every gate of runAct: knowing her, motive, a sent servant's road, j70): the act is really
   happening. The first time it PREPARES (no penalty); the j40 plan runner (an NPC) or the due runner below (her) brings it back on its day. */
function awWrap(k){const A=ACT[k];if(!A||A.__aw)return;const f0=A.f;A.__aw=1;
 A.f=function(a,t){if(AWRUN||!awOn(a,t,k))return f0.apply(this,arguments);const th=this,ar=arguments;
  const R=awRec(a,t);if(R){if(bq()<R.due)return "";awDel(a,t);return awRun(()=>f0.apply(th,ar))}
  if(awStart(a,t,k))return a===S?`Ngươi đã gom đủ chứng cứ, đem vụ tố ${t.name} lên ${judgeName(t)}; ${W().due} buổi nữa sẽ xét. `:"";return f0.apply(this,arguments)}}
AWK.forEach(awWrap);
/* the Hoàng hậu's «Xử tội» (j8 judge: an NPC queen's monthly pick, jagacts hhAct; HER «Xử tội» when she is the Hoàng hậu) — the same road */
if(typeof judge==="function"){const j0=judge;judge=function(q,p){if(AWRUN||window.__awoff||!q||!p||q===p||q.coop||p.coop||!awLive(q)||!awLive(p)||!S||S.dead||!awWorld())return j0.apply(this,arguments);const th=this,ar=arguments;
  const R=awRec(q,p);if(R){if(bq()<R.due)return "";awDel(q,p);return awRun(()=>j0.apply(th,ar))}
  let c=null;try{c=chReady(q,p)}catch(e){}if(!c&&q!==S)return j0.apply(this,arguments)/* an NPC queen with no charge: j8 judge() punishes by punish(), which the core gate below holds and warns */;
  awStart(q,p,"judge",c||null);return q===S?`Ngươi truyền Cung Chính ti lập án ${p.name}; ${W().due} buổi nữa sẽ xử. `:""}}
/* ================= THE CORE GATE (every other punishment road) ================= */
/* r3 (rv FAIL 1, law 11 «no penalty split»): chPunish and framed are cores too — they are the OUTERMOST penalty entries (chPunish's jcharge wrap
   pays the Ức hiếp bồi thường / expels the bought servants, framed takes Danh / Sủng) before the inner chPunishX / punish: held at the entry,
   the whole penalty waits and falls together, with its notice rows. srvBeat = the master's trượng (r3 FAIL 2). */
const CORE=["punish","fall","demote","chPunishX","chPunish","framed","deathSentence","cold","punTier","srvAffairCaught","chSrvEnd","srvLaundry","srvKill","srvBeat"];const SRVF=["srvAffairCaught","chSrvEnd","srvLaundry","srvKill","srvBeat"];const CORE0={};
/* the target of a core call (arguments as each core takes them) */
function awTgt(fn,A){if(fn==="punish"||fn==="deathSentence")return typeof A[0]==="string"?S:A[0];if(fn==="cold"||SRVF.includes(fn))return S;return A[0]}
/* the accuser: an explicit «by», the doer of the running act (ACTX), the charge context (CHX) — never her */
function awBy(fn,A){const npc=x=>x&&typeof x==="object"&&x!==S&&x.id!=null&&x.alive!==false&&!x.coop&&(rivals||[]).includes(x)?x:null;let by=null;
 if(fn==="fall")by=A[2];else if(fn==="chPunishX"||fn==="chPunish")by=A[3];else if(fn==="punTier")by=A[3];else if(fn==="cold")by=A[1];
 if(typeof by==="string")by=byKey(by);return npc(by)||(typeof ACTX!=="undefined"&&ACTX?npc(ACTX.a):null)||(typeof CHX!=="undefined"&&CHX&&CHX.t===S?npc(CHX.a):null)}
function awNeed(fn,A){if(window.__awoff||AWRUN||AWIN||AWOKN||!S||S.dead||!awWorld())return false;if(awTgt(fn,A)!==S)return false;
 if(!SRVF.includes(fn)&&fn!=="deathSentence"&&S.out)return false/* already in lãnh cung: the cores refuse it themselves */;
 const c=awCtx();if(c==="her")return false;
 /* framed with a framer named (ACTX.a): jtruth opens her «Bị vu oan» defence card first — that card IS the warning */
 if(fn==="framed"&&typeof ACTX!=="undefined"&&ACTX&&ACTX.a&&ACTX.a!==S&&!window.__truthAuto)return false;
 if(c==="w"||c==="npc")return true;
 if(typeof ACTX!=="undefined"&&ACTX&&ACTX.a===S)return false;return !!awBy(fn,A)}
/* plain arguments for the save (people as keys, a man by id) */
function awSer(x){if(x&&typeof x==="object"){if(x===S)return {__k:"me"};if(x.id!=null&&(rivals||[]).includes(x))return {__k:x.id};if(x.id!=null&&(S.men||[]).includes(x))return {__m:x.id};try{return JSON.parse(JSON.stringify(x))}catch(e){return null}}return x===undefined?null:x}
function awDes(x){if(x&&typeof x==="object"){if(x.__k!=null)return byKey(x.__k);if(x.__m!=null)return (S.men||[]).find(m=>m.id===x.__m)||null}return x===null?undefined:x}
/* the matter in words: «bị …» = what is done to her (said as is), anything else = the offence («sắp bị xét tội …») */
function awPlainWhy(w){w=String(w==null?"":w).replace(/<[^>]+>/g,"").trim();w=w.replace(/^Ngươi\s+/,"").replace(/^Bị (?:ban (?:chết|rượu độc)|đày vào lãnh cung)\s*(?:vì\s+)?/i,"").replace(/\s*\(tội [^)]*\)\s*$/,"");return w?w.charAt(0).toLowerCase()+w.slice(1):"phạm cung quy"}
function awSay(why,n,cn){cn=cn||"";return /^bị /.test(why)?`ngươi ${why}${cn}. Trong ${n} buổi tới Cung Chính ti sẽ xét`:`ngươi sắp bị xét tội <b>${why}</b>${cn}, trong ${n} buổi tới`}
/* r3 (rv FAIL 3): each core's reason argument by its own signature — punTier(p,x,why,by) has it at A[2] (A[1] is the tier key) */
const AWWHY={punish:A=>typeof A[0]==="string"?A[0]:A[1],deathSentence:A=>typeof A[0]==="string"?A[0]:A[1],cold:A=>A[0],chPunishX:A=>A[2],chPunish:A=>A[2],punTier:A=>A[2],fall:A=>A[1],demote:A=>A[1],framed:A=>A[1]};
/* the servant cores say a whole sentence (what the master does to her), not an offence: «Tin dữ: <sentence>.» (rv FAIL 4) */
function awSrvWhy(fn,A){if(fn==="srvAffairCaught")return "chuyện tư tình của ngươi khi đang là cung nữ bị phát giác";if(fn==="chSrvEnd")return "chuyện ngươi nhận bạc mua chuộc, làm tai mắt cho người bị phơi ra";
 return String(A[0]==null?"":A[0]).replace(/<[^>]+>/g,"").trim().replace(/[.;,]+$/,"")}
function awWhy(fn,A){if(SRVF.includes(fn))return awSrvWhy(fn,A);return awPlainWhy((AWWHY[fn]||(X=>X[1]))(A))}
/* the penalty words and the one-step-lighter penalty of a held core (both read the core's own rule texts) */
function awSev(A){const s=typeof A[0]==="string"?A[1]:A[2];return s==null?1:s}
function awPen(fn,A){try{if(fn==="punish")return aaPunishTxt(awSev(A)).replace(/^bị phạt: /,"bị ");if(fn==="fall")return punTierTxt(S,A[3]||"vua");if(fn==="punTier")return punTierTxt(S,A[1]);
 if(fn==="chPunishX")return awPunTxt(S,A[1],A[4]);if(fn==="chPunish")return awChTxt(A[1],A[4]);
 if(fn==="framed")return `${aaPunishTxt(2).replace(/^bị phạt: /,"bị ")}; Danh và Sủng cùng sụt`;
 if(fn==="srvBeat")return `bị đánh ${A[1]|0} trượng; Sức cạn thì mất mạng`;if(fn==="demote")return "bị giáng một bậc";if(fn==="deathSentence")return punTierTxt(S,"tu");if(fn==="cold")return A[2]==="phe"?punTierTxt(S,"tu"):"bị đày vào lãnh cung";
 if(fn==="srvAffairCaught")return "bị trị tội tư tình: đòn roi, có khi bị đuổi khỏi cung";if(fn==="srvLaundry")return `bị đày xuống Tân giả khố ${A[1]|0} tuần`;if(fn==="srvKill")return "mất mạng";if(fn==="chSrvEnd")return "bị đuổi khỏi cung"}catch(e){}return "bị trị tội"}
/* chPunish's penalty words: the weight's words + its extras (bồi bạc / người hầu bị đuổi), as jcharge chPunTxt says them */
function awChTxt(c,x){const r=awPunTxt(S,c,x||chTier(S,c));return c==="uh"?`${r}, bồi bạc cho người bị hại`:c==="mc"?`${r}, người hầu bị mua bị đuổi khỏi cung`:r}
function awLite(fn,A){const st=x=>{const y=punStep(x,-1);return y!==x?y:null};const w=typeof A[0]==="string"?A[0]:A[1];
 if(fn==="punish"){const s=awSev(A);return s>=1?{fn:"punish",A:[S,w,s-1]}:null}
 if(fn==="fall"){const y=st(A[3]||"vua");return y?{fn:"fall",A:[S,A[1],A[2],y]}:null}if(fn==="punTier"){const y=st(A[1]);return y?{fn:"punTier",A:[S,y].concat(A.slice(2))}:null}
 if(fn==="chPunishX"){const y=st(A[4]);return y?{fn:"chPunishX",A:[S,A[1],`${A[2]} (nhận tội trước, giảm một bậc)`,A[3],y,A[5]]}:null}
 if(fn==="chPunish"){const y=st(A[4]||chTier(S,A[1]));return y?{fn:"chPunish",A:[S,A[1],`${A[2]} (nhận tội trước, giảm một bậc)`,A[3],y]}:null}/* extras kept: the lighter weight goes through the same entry */
 if(fn==="framed")return {fn:"punish",A:[S,w,1]};
 if(fn==="srvBeat"){const k=Math.max(1,Math.round((A[1]|0)/W().srvLite));return k<(A[1]|0)?{fn:"srvBeat",A:[A[0],k,A[2]]}:null}
 if(fn==="srvLaundry"){const k=Math.max(1,Math.ceil((A[1]|0)/W().srvLite));return k<(A[1]|0)?{fn:"srvLaundry",A:[A[0],k]}:null}
 if(fn==="demote")return {fn:"punish",A:[S,A[1],1]};if(fn==="deathSentence")return {fn:"fall",A:[S,w,null,"nang"]};
 if(fn==="cold")return {fn:"fall",A:[S,A[0],A[1],A[2]==="phe"?"nang":"vua"]};if(fn==="srvKill")return {fn:"srvLaundry",A:[A[0],BAL.ag.why.srv.pun.lauWk]};return null}
/* punPlus (jpun fallback): the side penalty fx of the core f() calls on p — ONE penalty: held into the core's record with it, or paid just before
   the core when it falls now (order as before), or paid after f() when no core was reached (r3, law 11 «no penalty split»: j8 search / birth omen /
   vượt phẩm, j92 / jdress / jshelf hặc ăn mặc, j13 giả bệnh, j4 story, jmen, jreign wrote Danh / Sủng before the gated core) */
let PFX=null,PFXH=false;
punPlus=function(p,fx,f){const px=PFX,me={p,fx,done:false,held:false};PFX=me;let r;try{r=f()}finally{PFX=px;if(!me.done&&p&&fx)ap(p,fx)}PFXH=me.held;return r};
punHeldLast=function(){return PFXH};
function awPfxPay(t){if(PFX&&!PFX.done&&PFX.p===t){PFX.done=true;if(PFX.fx)ap(t,PFX.fx)}}
function awFxTxt(fx){if(!fx)return "";const W2=[];for(const k in fx){const v=fx[k];if(!v)continue;W2.push(k==="sung"&&typeof sgStat==="function"?sgStat(v):k==="danh"?`Danh ${balSg(v)}`:"")}return W2.filter(Boolean).join(" · ")}
function awCall(fn,A){return awRun(()=>window[fn].apply(null,A))}/* the whole wrapped chain (every module's side of the penalty), the gate passing (AWRUN) */
/* hold: the record + her dialog; the same matter twice (same core + same words) is one record, never two penalties */
function awHold(fn,A){S.accw=S.accw||{};const by=awBy(fn,A);const ser=A.map(awSer);const sig=fn+"|"+JSON.stringify(ser);
 for(const id in S.accw){const R=S.accw[id];if(R&&R.k==="core"&&R.sig===sig){if(PFX&&!PFX.done&&PFX.p===S){PFX.done=true;PFX.held=true}return}}
 const id="core"+(S.awN=(S.awN||0)+1);let cx=null;try{if(typeof CHX!=="undefined"&&CHX&&CHX.t===S)cx={a:CHX.a?key(CHX.a):null,c:CHX.c,n:CHX.n}}catch(e){}let pt=null;try{if(typeof PUNT!=="undefined"&&PUNT)pt=JSON.parse(JSON.stringify(PUNT))}catch(e){}
 let fx=null;if(PFX&&!PFX.done&&PFX.p===S){fx=PFX.fx;PFX.done=true;PFX.held=true}
 S.accw[id]={k:"core",fn,A:ser,sig,a:by?key(by):null,why:awWhy(fn,A),due:bq()+W().due,cx,pt,fx};
 try{pushDil(mkP("accw",{id}),"Sắp bị trị tội")}catch(e){console.error("accw hold",e)}}
function awFire(id){const R=(S.accw||{})[id];if(!R)return "";delete S.accw[id];if(!S||S.dead)return "";const A=R.A.map(awDes);let r="";
 const px=typeof CHX!=="undefined"?CHX:null,pp=typeof PUNT!=="undefined"?PUNT:null;
 try{if(R.cx&&typeof CHX!=="undefined")CHX={a:R.cx.a?byKey(R.cx.a):null,t:S,c:R.cx.c,n:R.cx.n};if(R.pt&&typeof PUNT!=="undefined")PUNT=R.pt;const ta=window.__truthAuto;if(R.fn==="framed")window.__truthAuto=1;try{r=awCall(R.fn,A)}finally{window.__truthAuto=ta}if(R.fx&&!S.dead)ap(S,R.fx)/* its side penalty falls with it */}catch(e){console.error("accw fire",e)}
 finally{try{if(typeof CHX!=="undefined")CHX=px}catch(e){}try{if(typeof PUNT!=="undefined")PUNT=pp}catch(e){}}return typeof r==="string"?r:""}
/* her card for a held core */
function awCoreCard(id){const R=(S.accw||{})[id];if(!S||!R||R.k!=="core"||S.dead)return null;const A=R.A.map(awDes),a=R.a?byKey(R.a):null,al=a&&a!==S&&awLive(a)?a:null;const srv=SRVF.includes(R.fn);
 const n=Math.max(1,R.due-bq()),fxw=awFxTxt(R.fx),pen=awPen(R.fn,A)+(fxw?`; ${fxw}`:""),L=awLite(R.fn,A),c=R.cx&&R.cx.c||(R.fn==="chPunishX"||R.fn==="chPunish"?A[1]:null),pr=al?(c?awSettle(al,S,c):W().settle.bac):0,P=srv?null:awPat(al,S),Sh=W().shield;const O=[];
 if(L)O.push({n:srv?"Nhẹ · Quỳ xin giảm tội":"Nhẹ · Nhận tội trước",fx:{},j67:`tốn: chịu phạt ngay · được: ngươi ${awPen(L.fn,L.A)}${fxw?`; ${fxw}`:""} thay vì ${pen}, việc khép lại`,go:()=>{if(!(S.accw||{})[id])return;delete S.accw[id];const r=awCall(L.fn,L.A);if(R.fx&&!S.dead)ap(S,R.fx);if(typeof r==="string"&&r)log(r)}});
 if(al&&!srv&&S.bac>=pr)O.push({n:`Vừa · Dàn xếp với ${al.name}`,fx:{bac:-pr},p:awSettleO(al,S),ton:{bac:-pr},j67:`tốn: Bạc ${balSg(-pr)} · thành: nàng rút lời tố${c?`, trả lại chứng cứ tội ${chName(c).toLowerCase()}`:""}, việc bỏ · hỏng: nàng không nhận, bạc trả lại, vẫn xét`,
  go:()=>{if(!(S.accw||{})[id]){awPay(S,-pr);return}if(!roll(awSettleO(al,S))){awPay(S,-pr);try{oanAdd(S,al,W().settle.oan)}catch(e){}log(`${al.name} không nhận bạc dàn xếp của ngươi; việc vẫn tới ngày xét.`);return}
   delete S.accw[id];ap(al,{bac:pr});const k=c?awN(al,S,c):0;if(k)evA(al,S,-k,c);log(`${al.name} nhận ${pr} lượng bạc, rút lời tố${k?`, trả lại ${k} chứng cứ`:""}; việc bỏ.`)}});
 if(P&&S.bac>=Sh.bac)O.push({n:`Nặng · Cầu ${P.n} che chở`,fx:{bac:-Sh.bac},p:awShieldO(al,S,P),ton:{bac:-Sh.bac},j67:`tốn: Bạc ${balSg(-Sh.bac)} (lễ dâng ${P.n}) · thành: việc bị gác${al?`, mọi chứng cứ ${al.name} nắm về ngươi bị đốt, Danh nàng ${balSg(-Sh.foeDanh)}`:""} · hỏng: vẫn bị xét`,
  go:()=>{if(!(S.accw||{})[id]){awPay(S,-Sh.bac);return}ap(P.to,{bac:Sh.bac});if(!roll(awShieldO(al,S,P))){log(`${P.n} nhận lễ của ngươi nhưng không ra mặt; việc vẫn tới ngày xét.`);return}
   delete S.accw[id];let k=0;if(al){k=awAll(al,S);if(k)evA(al,S,-k);ap(al,{danh:-Sh.foeDanh});try{oanAdd(al,S,Sh.oan)}catch(e){}}log(`${P.n} gác việc ấy lại${al?`; mọi chứng cứ ${al.name} nắm về ngươi bị đốt, ${al.name} Danh ${balSg(-Sh.foeDanh)}`:""}.`)}});
 /* rv FAIL 4: a held core with no way out gets one plain acknowledge option (the standard dialog's «Cúi đầu …» kind, as j42 cnvName), never the empty fallback */
 if(!O.length)O.push({n:srv?"Cúi đầu chờ ngày ấy":"Cúi đầu chờ ngày xét",fx:{},go:()=>{}});
 if(srv){const w=String(R.why||"");return {who:undefined,t:`<p>Tin dữ: ${w.charAt(0).toUpperCase()+w.slice(1)}.</p><p>Trong ${n} buổi tới, ngươi ${pen}.${L?"":" Không có đường lui; chỉ còn chờ ngày ấy."}</p>`,o:O}}
 const cn=c&&!/tội /.test(R.why)?`, tội <b>${chName(c).toLowerCase()}</b>`:"";
 return {who:al?pv(al):undefined,t:`<p>Cung Chính ti báo tin: ${al?`${al.name} đã đứng ra tố ngươi: `:""}${awSay(R.why,n,cn)}.</p><p>Nếu tội thành, ngươi ${pen}. Không làm gì thì chờ ngày xét.</p>`,o:O}}
/* the wrap: outermost (this file is assembled last); an inner core called by an outer one is part of the same penalty (AWIN) */
/* contexts: her taps / her acts / the world turn / a witness road inside her own action */
const CTXF=[["chooseM","her"],["nextBuoi","w"],["endTurn","w"],["menReport","npc"],["rtReport","npc"],["runAct",null]];
/* (re)wrap: some modules wrap these again from a load timer (j95 stage sync: setTimeout); re-wrapping keeps the gate outermost (an inner
   second gate sees AWIN and lets the outer one decide; a context pushed twice is the same context) */
function awWrapAll(){for(const fn of CORE){const g=window[fn];if(typeof g!=="function"||g.__aw)continue;if(!CORE0[fn])CORE0[fn]=g;const f0=g;
  window[fn]=function(){const A=Array.prototype.slice.call(arguments);if(!AWIN&&awNeed(fn,A)){awHold(fn,A);PFXH=true;return fn==="demote"?"":fn==="framed"?-1/* as jtruth's «card opened»: the caller says «found in her room», no numbers */:undefined}if(!AWIN)try{awPfxPay(awTgt(fn,A))}catch(e){}AWIN++;try{return f0.apply(this,arguments)}finally{AWIN--}};window[fn].__aw=1}
 for(const [fn,c] of CTXF){const g=window[fn];if(typeof g!=="function"||g.__awc)continue;const f0=g;
  window[fn]=c?function(){return awInCtx(c,f0,this,arguments)}:function(a){return awInCtx(a===S?"her":"npc",f0,this,arguments)};window[fn].__awc=c||"act"}}
awWrapAll();setTimeout(awWrapAll,0);setTimeout(awWrapAll,400);
/* the due runner (each buổi): her held cores, her own prepared accusations, the Hoàng hậu's «Xử tội» */
if(typeof rivalsBuoi==="function"){const b0=rivalsBuoi;rivalsBuoi=function(){let ev=b0.apply(this,arguments)||"";try{for(const id of Object.keys(S.accw||{})){if(S.dead)return ev;const R=S.accw[id];if(!R||R.k==="pre"||bq()<R.due)continue;
  if(R.k==="core"){const r=awFire(id);if(r)ev+=r;continue}
  const q=byKey(R.a),p=byKey(R.t);
  if(R.k==="judge"){if(!q||!p||!(q===S?queenP()===S:q.queen)||!awLive(q)||!awLive(p)){delete S.accw[id];continue}let ok=true;if(R.c){try{ok=!!chReady(q,p)}catch(e){ok=false}}if(!ok){delete S.accw[id];continue}
   const r=judge(q,p);if(r)ev+=typeof seenNPC==="function"&&q!==S?seenNPC(q,p,r):r;continue}
  if(q===S&&AWK.includes(R.k)){if(!p||!awLive(p)){delete S.accw[id];continue}let r="";const X0=typeof ACTX!=="undefined"?ACTX:null;
   try{if(typeof actCtx==="function")ACTX=actCtx(S,p,R.k);AWCTX.push("her");r=ACT[R.k].f(S,p)||""}catch(e){console.error("accw her",e)}finally{AWCTX.pop();ACTX=X0||{a:null,pen:0};awDel(S,p)}if(r){ev+=r;try{log(r)}catch(e){}}}}}catch(e){console.error("accw due",e)}return ev}}
/* a monthly check warns a month ahead (j30 demoteReview): the notice + a «pre» mark; the next month's fall runs inside awOk when the mark is there */
function awPre(k,line){if(!S)return;S.accw=S.accw||{};const id="pre:"+k;const was=!!S.accw[id];S.accw[id]={k:"pre",T:S.turn};
 try{if(typeof kitNotice==="function")kitNotice({id:"aw:"+k,line,text:line,tone:"red",sticky:true,again:!was})}catch(e){}try{if(!was)log(`<span class="r">${line}</span>`)}catch(e){}}
function awPreHas(k){return !!(S&&S.accw&&S.accw["pre:"+k])}
function awPreDel(k){if(S&&S.accw)delete S.accw["pre:"+k];try{if(typeof kitNoticeDrop==="function")kitNoticeDrop("aw:"+k)}catch(e){}}
window.awWarnedNow=()=>!!(AWRUN||AWOKN)/* inside a held record firing / its Nhẹ / a prepared act on its day / an already-warned road (accw-fuzz) */;window.AWK=AWK;window.awRec=awRec;window.awOk=awOk;window.awPre=awPre;window.awPreHas=awPreHas;window.awPreDel=awPreDel;window.awCore=CORE;window.awFire=awFire;window.awCtxNow=awCtx;window.awInW=f=>awInCtx("w",f,null,[]);window.awInHer=f=>awInCtx("her",f,null,[]);
})();
