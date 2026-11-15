/* ================= BALANCE KNOBS (measured with the sensible / random bots; see the report) ================= */
const BAL={outQ:85,hz:2.0,conc:.3/.7,later:6,hhTh:55,
 /* ONE SOURCE for every promotion threshold the player sees (checks in promoReqP/candOK and every text read these) */
 hhThNoSon:80,hhThNoSonHieu:70,hhDuc:50,hhDucHeir:40,qBlockHh:-40,qBlockTh:50,hiOppHh:-30,hiOppTh:30,hiOppFac:180};
/* what the Hoàng hậu seat asks of p (the same numbers the checks use) */
function hhNeed(p){p=p||S;const sn=sonsOf(p).length>0,hieu=typeof has==="function"&&has("hieuthao");const heir=!!(S.heir&&S.heir.k&&S.heir.k.alive&&S.heir.v===(p===S?null:p));
 return{sons:sn,th:sn?BAL.hhTh:(hieu?BAL.hhThNoSonHieu:BAL.hhThNoSon),duc:heir?BAL.hhDucHeir:BAL.hhDuc,heir}}
/* an empty Hoàng hậu seat: the Thái hậu may bring in a girl of a great house instead of holding a contest (same for every candidate) */
(function(){const c0=contestOpen;contestOpen=function(r){if(r===7&&!ct()&&!queenP()&&S.outQv!==S.vacSince&&consorts().some(p=>candOK(p,7))&&(S.outQv=S.vacSince,true)&&roomFor("consort")&&roll(BAL.outQ)){const n=newRival(7,true);Object.assign(n,drawFace());n.rank=6;n.queen=true;n.dad=80;rivals.unshift(n);S.vacSince=null;
  const t=`<b>Thánh chỉ: Thái hậu chọn ${n.name}, con gái danh môn, vào cung lập làm Hoàng hậu.</b> Ghế trống không mở tranh. `;log(t);return t}return c0.apply(this,arguments)}})();
/* fewer births per life: conception (after the ×0.7) scaled; a woman who has borne before is a little safer in labour (everyone alike) */
(function(){const c0=conceiveCh;conceiveCh=function(p){return Math.round(c0.apply(this,arguments)*BAL.conc)}})();
(function(){const b0=birthRisk;birthRisk=function(p){const r=b0.apply(this,arguments);const n=p===S?(S.kids||[]).length:(p.kids||[]).length;if(n>0&&p===S&&S.birthWhy)S.birthWhy=S.birthWhy.concat([]);return n>0?cl(r-BAL.later,1.5,60):r}})();
/* the Hoàng hậu seat asks more: the Thái hậu's favour 55+ to stand as a candidate (same for every candidate) */
/* (since rules-one-source: promoReqP (j8) and candOK (j34) read BAL.hhTh / hhNeed() directly; no second check here) */
/* every hidden meeting widens the circle that might know: exposure risk grows with the number of trysts (same rule for everyone) */
(function(){const l0=lộRisk;lộRisk=function(k){const n=(S.men||[]).reduce((a,m)=>a+(m.trysts||0),0);return cl(l0.apply(this,arguments)+Math.min(30,n*4),6,92)}})();
