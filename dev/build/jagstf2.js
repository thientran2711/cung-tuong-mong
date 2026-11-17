/* ================= jagstf2: AG-ALL-2 part 2b — G5 / G6 / G10 for the household staff (reports/ag-all-timing.md GAP LIST; owner OD 17/11 ~14:50Z:
   every act an NPC can do, the player of that group has too; the same costs, gains and consequences; when a consequence offers choices the NPC
   picks by her own needs / nết / odds with jmind's slip, never always-best). HOST ONLY (asOn → agOn: a co-op guest never decides). Loop off → old paths.
   G5  Bỏ độc (a hostile palace's maid): one row SRVA.poison (j42), one act jmline mlPoisonDo; the maid player's Đồng liêu button and the NPC
       maid's option below (aimed at the colleague of a hostile palace she dislikes most). Consort Bắt quỳ / Vu tội on another palace's maid:
       jmline mlHitDo + the player consort's buttons (mlHitBtns, j15).
   G6  Lén giữ đồ (jeitem eitPilTake / eitPilJudge), Xin chủ cho đi (jpromsv spAsk / spLeaveOpts): the maid player's cards (j42) and the NPC staff's
       option below; the master's answer is ONE option list for the player consort's card and an NPC master's choice.
   G10 the servant's dilemmas — ordered (j29 runAct → stf2Ord over j42 cnvOrdOpts), bribed (j29 bribeServ → stf2Bribe over cnvBribeOpts), framed
       (jagstaff AS_DO.frame / j42 srvStaffAct → stf2Framed over cnvFrameOpts): the same options as the maid player's PEND cards.
   Numbers: BAL.ag.stf2 (jbal2 end). Counters: window.__stf2N (histogram "kind_id"). ================= */
function stf2On(){try{return typeof asOn==="function"&&asOn()}catch(e){return false}}
function stf2C(k){const N=window.__stf2N=window.__stf2N||{};N[k]=(N[k]||0)+1}
/* her leaning by nết on an option's tag (BAL.ag.stf2.net: servant quality codes read by qv) */
function stf2Tr(s,tag){try{return qv(BAL.ag.stf2.net[tag]||{},s,1)}catch(e){return 1}}
/* weigh a dilemma's options for an NPC staff: base + her valued outcome (asNeeds × asG, the jagstaff valuation of the act's sure / win / lose effects),
   × her nết on the option's tag; mindPick (jmind slip) */
function stf2Pick(a,O,kind){O=(O||[]).filter(o=>o&&!o.lock);if(!O.length)return null;const K=BAL.ag.stf2;let N={};try{N=asNeeds(a)}catch(e){}
 const W=O.map(o=>{let u=asG(N,o.fx||{});if(o.o!=null){const p=Math.min(100,o.o)/100;u+=p*asG(N,o.w||{})+(1-p)*asG(N,o.l||{})}
  return [o,Math.max(BAL.mind.pickMin,(K.base+u/BAL.ag.unit)*stf2Tr(a,o.tag))]});
 const c=mindPick(W,a)||O[0];stf2C((kind||"pick")+"_"+c.id);return c}
function stf2Do(a,c){if(!c)return{ok:true,r:""};stfAp(a,c.fx);let ok=true;if(c.o!=null){ok=roll(c.o);stfAp(a,ok?c.w:c.l)}const r=c.go?c.go(ok)||"":"";return{ok,r}}
/* framed: x = the framed staff, acc = the accuser (an NPC staff, or S on the maid road), m = their master → {id, ok, stands, r} */
function stf2Framed(x,acc,m){if(!stf2On()||!x||x===S||!m)return null;const O=cnvFrameOpts(x,acc,m);const c=stf2Pick(x,O,"frame");const d=stf2Do(x,c);
 if(c.id==="pay")stfAp(acc,{bac:-(c.fx.bac||0)});/* the bạc goes to the accuser */
 return{id:c.id,ok:d.ok,stands:!(c.id==="pay"||(c.id==="clear"&&d.ok)),r:d.r||(c.id==="pay"?`${x.name} đút bạc, ${stfNm(acc)} rút lời.`:c.id==="confess"?`${x.name} nhận tội, xin tha.`:"")}}
/* bribed (j29 bribeServ, after the briber paid): take weighs as the bribe's odds; the refusal splits by her lòng (tell) against keeping quiet */
function stf2Bribe(a,s,o,odds,cost){if(!stf2On()||!s||s===S||s.sid==null||!o)return null;const K=BAL.ag.stf2.bribe;const t=K.tell*(s.loyal||0)/100,q=K.quiet,ref=100-odds;
 const O=cnvBribeOpts(s,a,o,cost);const W={take:odds,tell:ref*t/Math.max(.001,t+q),quiet:ref*q/Math.max(.001,t+q)};
 const c=mindPick(O.map(x=>[x,W[x.id]*stf2Tr(s,x.tag)]),s)||O[0];stf2C("bribe_"+c.id);stf2Do(s,c);
 return c.id==="take"?`${s.name} (người hầu của ${NM(o)}) nhận bạc của ${NM(a)}, thành tai mắt. `:c.id==="tell"?`${s.name} từ chối bạc của ${NM(a)} và mách chủ. `:`${s.name} từ chối bạc của ${NM(a)}. `}
/* ordered to do a dishonourable deed (j29 runAct, sent servant sv of master a, target t) → "obey" | "refuse" | "tell" (the deed is not done) */
function stf2Ord(a,sv,t,k){if(!stf2On()||!sv||sv===S||!a)return null;const K=BAL.ag.stf2.ord,lo=(sv.loyal||0)/100;
 const O=cnvOrdOpts(sv,a,t||a,null);const W={obey:K.obey*lo,refuse:K.refuse+(typeof netIs==="function"&&netIs(sv,"loyal")?K.loyalTr:0),tell:K.tell*(1-lo)*(sv.spyFor?K.spy:1)};
 const c=mindPick(O.map(x=>[x,W[x.id]*stf2Tr(sv,x.tag)]),sv)||O[0];stf2C("ord_"+c.id);if(c.id==="obey")return"obey";const d=stf2Do(sv,c);if(d.r)try{log(d.r)}catch(e){}return c.id}
/* ---------- the NPC staff's new options (the maid player's new cards) ---------- */
(function(){if(typeof asOpts!=="function"||typeof AS_DO!=="object")return;const ao=asOpts;
 asOpts=function(s,N){const L=ao.apply(this,arguments);try{if(!stf2On())return L;const m=ownerOf(s);if(!m)return L;N=N||asNeeds(s);const K=BAL.ag.stf2,B=asB();
  /* Bỏ độc: the colleague of a hostile palace she dislikes most */
  if(s.role==="maid"){let foe=null,fa=0;for(const k in s.af||{}){const v=s.af[k];if(v<fa){const x=servById(+k);if(x&&stfPoisonOk(s,m,x)){fa=v;foe=x}}}
   if(foe){const o=asOpt(s,"poison",SRVA.poison.o(s,m),{t:foe,at:palaceOf(ownerOf(foe)),w:{spite:-fa*K.poison.u},l:{tin:-B.caughtTin,suc:-B.caughtSuc}});o.u=asU(N,o)*B.uMul;if(o.u>0)L.push(o)}}
  /* Xin chủ cho đi: under BAL.sp.leaveLoyal, not again before her cooldown */
  const LL=BAL.sp.leaveLoyal;if(!s.coop&&(s.loyal||0)<LL&&!((s.lvCd||0)>S.turn)){const o=asOpt(s,"leave",SRVA.leave.o(s,m));o.u=K.leave.u*(LL-(s.loyal||0))/LL*B.uMul;if(o.u>0)L.push(o)}
 }catch(e){console.error("jagstf2 opts",e)}return L};
 AS_DO.poison=(s,m,o,ok)=>{const x=o.t,t=x&&ownerOf(x);if(!x||!t||t===m)return"";return mlPoisonDo(m,s,t,x,!ok,1)||""};
 AS_DO.leave=(s,m)=>spAsk(m,s)||"";})();
window.stf2Pick=stf2Pick;window.stf2Framed=stf2Framed;window.stf2Bribe=stf2Bribe;window.stf2Ord=stf2Ord;
