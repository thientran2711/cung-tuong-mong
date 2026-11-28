/* ================= jbac: BẠC ↔ ROAD WITHOUT SILVER in the common events (owner 15/11 20:30Z, balance-pass) =================
   Rule: every choice that costs bạc has another road whose cost is EQUIVALENT in value, bạc valued by how hard it is to earn at HER rank;
   neither road the obvious pick. The common events (j68e–h, EV6) were written with flat prices: dev/measure/bacroad.js found 28 of 35
   silver options at rank 1 dominated by a free option of the same card (20 bạc for Sức +10 …) and a few the other way.
   Fix, for the whole group, when a card is built: each option is valued in KHẮC (her real limit, 16 a tuần) with the same table the scan
   uses — 1 bạc = 16 / BAL.bacTuan[rank] (jstory), 1 Sức = BAL.restLatK / BAL.restLatSuc, Danh / Đức / Sủng / a relation point / a stat
   point = BAL.bacVal — E = p·gains − (1−p)·losses − costs. A silver option's price is moved toward the price at which its E equals the
   best free option of the same card (rounded, between BAL.bacFair.lo and .hi × the written price); if even the lowest price leaves it
   behind, its gains (w, relation r) are raised up to BAL.bacFair.gMax ×. Options whose gains are only words keep the written price.
   The card shows the real numbers (c6 builds the text from the spec), the outcome uses them. dev/measure/bacroad.js → dev/review/bacroad-*.md */
BAL.bacVal={danh:4.2,duc:8,sung:4,rel:.33,stat:2,an:.33,tok:3};
BAL.bacFair={lo:.5,hi:3,gMax:3,band:.15};
/* a gain or cost written only in words (wt / lt / k tokens: "biết sự thật", "lộ ra bị trách trái lệnh") = BAL.bacVal.tok khắc each */
function bacTok(L,cls){return (L||[]).filter(t=>typeof t==="string"&&t.indexOf(`class="${cls}"`)>=0).length*BAL.bacVal.tok}
function bacV1(k){const V=BAL.bacVal;if(k==="suc")return (BAL.restLatK)/(BAL.restLatSuc);if(k==="bac")return 16/BAL.bacTuan[Math.max(0,Math.min(7,(S&&S.rank)|0))];
 if(k==="danh"||k==="duc"||k==="sung"||k==="an")return V[k];if(/^(sac|tai|tamco|mat)$/.test(k))return V.stat;if(/^(th|hh|maid|loyal|tin)$/.test(k))return V.rel;return 0}
function bacFx(o){let v=0;for(const [k,x] of Object.entries(o||{}))if(typeof x==="number")v+=x*bacV1(k);return v}
function bacRel(L){let v=0;for(const [a,x] of (L||[]))v+=x*(a&&a.k==="emp"?BAL.bacVal.sung:BAL.bacVal.rel);return v}
/* E of one c6 spec (khắc), and its parts */
function bacE(s){const c=s.c||{};const p=s.p==null?1:oddsCl(Math.round(s.p))/100;
 const gain=bacFx(s.w)+bacRel(s.r)+(c.suc>0?c.suc*bacV1("suc"):0)+bacTok(s.wt,"g")+bacTok(s.k,"g"),loss=-(bacFx(s.l)+bacRel(s.lr))+bacTok(s.lt,"r");
 let cost=bacTok(s.k,"r");for(const [k,x] of Object.entries(c))if(typeof x==="number"&&x<0)cost-=x*bacV1(k);return{p,gain,loss,cost,e:p*gain-(1-p)*loss-cost}}
function bacRound(b){return b>=10?Math.round(b/5)*5:Math.max(1,Math.round(b))}
/* one card's specs [n,s] → the same list with fair silver options */
function bacFairList(L){const F=BAL.bacFair,vb=bacV1("bac");const free=L.filter(([,s])=>!(s&&s.c&&s.c.bac<0));if(!free.length)return L;
 /* target = the best free option, but never below 0: when every free road is a loss (rumorEmpLove "Lan thêm lời đồn" E −20 khắc, stormNight,
    proudVisit) matching it would charge more silver than the gain is worth (review r1: 45 bạc for Tai mắt +1); price it at its worth instead */
 const ea=Math.max(0,...free.map(([,s])=>bacE(s||{}).e));
 return L.map(([n,s])=>{if(!s||!s.c||!(s.c.bac<0))return[n,s];const b0=-s.c.bac,E0=bacE(s);if(!(E0.gain>0))return[n,s];
  const lo=Math.max(1,Math.ceil(b0*F.lo)),hi=Math.round(b0*F.hi);
  /* price at which E(silver) = E(best free): b* = (E without the silver − ea) / value of 1 bạc */
  const eNoB=E0.e+b0*vb;let b=bacRound(Math.max(lo,Math.min(hi,(eNoB-ea)/vb)));
  const s2=Object.assign({},s,{c:Object.assign({},s.c,{bac:-b}),bac0:b0});
  const e2=eNoB-b*vb;if(e2<ea-F.band*b*vb&&E0.p*E0.gain>0){/* still behind at the lowest price: raise its gains */
   const f=Math.min(F.gMax,1+(ea-e2)/(E0.p*E0.gain));if(f>1.05){const up=o=>{const r={};for(const [k,x] of Object.entries(o||{}))r[k]=typeof x==="number"&&x>0&&k!=="bac"?Math.max(x+1,Math.round(x*f)):x;return r};
    s2.w=up(s.w);if(s.r)s2.r=s.r.map(([a,x])=>[a,x>0?Math.max(x+1,Math.round(x*f)):x])}}
  return[n,s2]})}
(function(){if(typeof E68==="undefined"||typeof c6!=="function")return;
 for(const ev of E68){const o0=ev.o;if(typeof o0!=="function")continue;
  /* E-TIER-B14 (Foreman E C11 ruling Q2): composed j68c cards (ev.cs) are TIERED (law 2 NHẸ · VỪA · NẶNG, BAL.j68c.tier) — the old 15/11 equal-value
     re-pricing would pull a bạc tier back to equal; it stays only on the 90 hand-written cards (row 42 backlog: tier review of those). */
  if(ev.cs)continue;
  ev.o=function(X){if(window.__bacFairOff)return o0.apply(this,arguments);const real=c6;let L=null;
   try{c6=(n,s)=>({__bac6:1,n,s});L=o0.apply(this,arguments)}catch(e){c6=real;return o0.apply(this,arguments)}finally{c6=real}
   if(!Array.isArray(L))return L;try{const P=L.filter(x=>x&&x.__bac6).map(x=>[x.n,x.s]);const F=bacFairList(P);let i=0;
    return L.map(x=>{if(!x||!x.__bac6)return x;const [n,s]=F[i++];return c6(n,s)})}catch(e){console.error("jbac",e);return L.map(x=>x&&x.__bac6?c6(x.n,x.s):x)}}}})();
/* Dưỡng sức (jrest): the silver for the tonic is priced at her rank too (BAL.restDsBac0 at the middle rank, BAL.bacTuan[3]):
   6 bạc at rank 1 cost more than four "Nghỉ ngơi một lát" (scan: other road obvious) */
(function(){if(BAL.restDsBac==null)return;const b0=BAL.restDsBac;BAL.restDsBac0=b0;
 try{Object.defineProperty(BAL,"restDsBac",{get:()=>Math.max(2,Math.round(BAL.restDsBac0*BAL.bacTuan[Math.max(0,Math.min(7,(typeof S!=="undefined"&&S?S.rank|0:3)))]/BAL.bacTuan[3])),
  set:v=>{BAL.restDsBac0=v},enumerable:true,configurable:true})}catch(e){console.error("jbac rest",e)}})();
