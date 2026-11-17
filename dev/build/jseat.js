/* ================= ONE SEAT RULE (review/seatcap, owner OD:L1224 + OD:L1228 + OD:L1267 ONE CORE) =================
   The seat counts are j30 SEATCAP = BAL.seat (copied by jbal; the numbers live only there; Quý nhân and below have no cap). Every road that puts a consort on a rank goes through these three helpers, for her and for every NPC alike:
   - seatHas(p,r): may p sit at rank r (the seat counts everyone else who holds r);
   - seatDown(p,r): a road that DROPS her (demotion, the Hoàng hậu's fall, a pardon out of lãnh cung, co-op merge) lands on the highest rank
     at or under r that has a free seat;
   - seatUp(p,r,why): a road that RAISES her: a free seat = the rank; a full seat = the full-seat compensation (jexam promoFullSeat, OD:L1228:
     no waiting claim, a large one-off reward instead, the next rank through the normal exam).
   seatSettle() is the safety net after every turn and when a save is loaded (old saves that are already over the cap): in a rank with too
   many holders, the NPC who came to the rank last (lastPromo, then the weakest seatPickW) steps down to the highest free rank and gets the
   same full-seat compensation (gain and loss). The player and the co-op friend are never pushed out by the net; on the co-op guest the host
   decides the world (the guest's net does nothing). */
function seatMine(p){return p===S||!!(p&&p.coop)}
function seatHas(p,r){const c=SEATCAP[r];if(c==null)return true;return holders(r).filter(q=>q!==p).length<c}
function seatDown(p,r){r=Math.max(0,Math.min(6,r|0));while(r>0&&!seatHas(p,r))r--;return r}
/* put p on rank r (0–6): leaves the Hoàng hậu seat if she held it */
function seatPut(p,r){if(p===S){S.rank=r;return r}if(p.queen)p.queen=false;p.rank=r;return r}
function seatComp(p){try{if(typeof promoFullSeat==="function"&&rkOf(p)<7)return promoFullSeat(p,"seat",{})||""}catch(e){console.error("seatComp",e)}return""}
function seatUp(p,r,why){if(seatHas(p,r)){if(r>=7){if(p===S){S.rank=7}else{p.rank=6;p.queen=true}}else seatPut(p,r);p.lastPromo=S.turn;return true}
 if(rkOf(p)<r)return seatComp(p)||false;return false}
function seatGuest(){try{return !!(window.COOPW&&COOPW.on&&COOPW.seat!=="a")}catch(e){return false}}
window.__seatN=window.__seatN||{settle:0,down:0};
/* SEATS HALVED (owner 17/11 04:30Z): a save made before BAL.seat was halved keeps every holder on her rank ("nobody is demoted");
   they are stamped once (S.seatKeep = {key: rank}) and the net skips them while they hold that rank; the full rank still takes nobody
   new (seatHas counts them) until seats free up. New games are under the cap, so nothing is stamped. */
function seatKeepStamp(){if(!S||!rivals||S.seatV>=2)return;S.seatV=2;const K={};
 for(const r of [7,6,5,4,3]){const c=SEATCAP[r];if(c==null)continue;const H=holders(r);if(H.length>c)for(const p of H)if(!seatMine(p))K[key(p)]=r}
 if(Object.keys(K).length)S.seatKeep=K}
function seatKept(p){const K=S&&S.seatKeep;if(!K)return false;const k=key(p);if(K[k]==null)return false;if(K[k]===rkOf(p)&&p.alive!==false&&!p.out)return true;delete K[k];return false}
function seatSettle(){if(!S||S.dead||seatGuest())return"";let ev="";
 for(const r of [7,6,5,4,3]){const c=SEATCAP[r];if(c==null)continue;let H=holders(r),g=0;
  while(H.length>c&&g++<12){const N=H.filter(p=>!seatMine(p)&&!seatKept(p));if(!N.length)break;
   N.sort((a,b)=>(b.lastPromo||0)-(a.lastPromo||0)||seatPickW(a)-seatPickW(b));const p=N[0];
   const to=seatDown(p,r-1);seatPut(p,to);p.lastPromo=S.turn;window.__seatN.settle++;
   const t=`${p.name}: ghế ${r>=7?"Hoàng hậu":RANKS[r].n} đã đủ người, lui về ${RANKS[to].n}. `;try{log(t)}catch(e){}ev+=t;
   ev+=seatComp(p);H=holders(r)}}
 return ev}
/* outermost turn hook (this module loads last): the cap holds at the end of every turn, so at every month */
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead)seatSettle()}catch(e){console.error("seatSettle",e)}return r}})();
/* a loaded save (old saves already over the cap) and a new life (origin entry) are settled once */
(function(){if(typeof normAll!=="function")return;const n0=normAll;normAll=function(){const r=n0.apply(this,arguments);try{if(S&&rivals){seatKeepStamp();seatSettle()}}catch(e){console.error("seatSettle load",e)}return r}})();
(function(){const s0=start;start=function(){const r=s0.apply(this,arguments);try{if(S&&rivals){seatKeepStamp();seatSettle()}}catch(e){console.error("seatSettle start",e)}return r}})();
