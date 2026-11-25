/* ================= jnolock: NO DEAD CARD — the ONE owner of «a card with no road she can take» (START_CORE laws 2 + 3 + 4 + 9 + 14) =================
   ONE rule, ONE decision point (r3 25/11, law 14 canon overwrite): this module replaces the two side-by-side guards of the same family —
   review/hardlock-choice (j68c-serv-022 «Kẻ hầu» at 46 bạc: every road greyed, no ✕, FIXER #9) and LIVE's jdeadcard net
   (flight-modal-deadlock, arm A co-op 9B2G wk35: j68c-sea-023 at bạc 2). jdeadcard.js is deleted; its «Lui» leave and its robot log live here.
   Authors still keep a road she can take (law 2 data gates: dev/test/j68seeds_validate.py, dev/test/dead-card.js); this is the engine net
   on the ONE choice path every card goes through (j3 showModal renders Q[0], chooseM takes a road; bots, the ✕ closer, the co-op timer
   and the thin guest/host all use them). kitNoLock(m), run before the card is drawn and before a road is taken:
   1. a road she can take (kitLockWhy empty), a cancel road (kitCancelIx) or a gift back road (kgx): nothing changes.
   2. else every road held back by bạc ALONE is offered paid with an equal value of her other means: her whole purse, the rest priced by
      the ONE bạc→Sức rule of the game, altCost(short, S.rank) (jstory: BAL.bacTuan + BAL.altK, capped at altK.sucMax — law 2 OD:L582
      «valued at her rank», law 4 one core); Sức she cannot spare is taken as Danh at the j68c step ratio (BAL.nolock.of). A road is
      offered only if her Sức / Danh after its WHOLE cost (its own Sức / Danh + the swap) stays at BAL.nolock.keep or above (never kills
      her, law 3/6); else it stays closed. All such roads change by the same function, so they stay equal (law 2).
   3. still none: the kit leave «Lui» (the kit close word, KIT_CLOSE_W) is added as the card's cancel road — the kit ✕ on every such card,
      open or forced (kitCancelIx counts it); it leaves the card, nothing paid; logged once in window.__deadCards for the robots.
   It is undone and worked out again on every pass (her purse may change between two draws). Numbers from BAL only (law 4). */
function kitPoor(c){return !!(c&&c.fx&&c.fx.bac&&S.bac+c.fx.bac<0)}
/* why she cannot take this road now ("" = she can): every hold-back the game has — greyed (kitOff), bạc short, gift lock, night taken (j75 lk), temper (jemoact) */
function kitLockWhy(c,m){if(!c)return"none";if(c.off)return c.off.why||"off";if(kitPoor(c))return"bac";if(c.lock)return"lock";
 if(typeof c.lk==="function"){try{const w=c.lk();if(w)return String(w)}catch(e){}}
 if(typeof eaLockWhy==="function"){try{const w=eaLockWhy(c,m);if(w)return String(w)}catch(e){}}return""}
function kitTakeable(c,m){return !kitLockWhy(c,m)}
/* the bạc she lacks (short) on road c paid in her other means at equal value; null when even those do not reach.
   Room in k = what she has − what she always keeps − what road c ALREADY costs in k (never stacked past her floor). */
function kitBacSub(c,short){const N=BAL.nolock;if(!N||!(short>0)||typeof altCost!=="function")return null;
 const own=(c&&c.fx)||{},keep=N.keep||{};const room=k=>Math.max(0,Math.floor((S[k]||0)-(keep[k]||0)-Math.max(0,-(own[k]||0))));
 let left=altCost(short,S.rank,N.floor,0).suc;/* Sức worth of the short bạc at her rank (pen = an odds cut, a card road has no roll) */
 const fx={};for(const k of N.sub){if(left<=0)break;const of=N.of[k];if(!(of>0))continue;
  const want=Math.ceil(left*of),n=Math.min(want,room(k));if(n>0){fx[k]=-n;left-=n/of}}
 return left>1e-9?null:fx}
/* true when road fx leaves every kept stat at or above its floor */
function kitFloorOk(fx){const keep=(BAL.nolock&&BAL.nolock.keep)||{};for(const k in keep)if((fx[k]||0)<0&&(S[k]||0)+fx[k]<keep[k])return false;return true}
const KIT_NOLOCK_LEAVE="Lui";/* the kit close word (KIT_CLOSE_W); shown as the kit ✕ */
function kitNoLock(m){try{if(!m||!m.opts||!m.opts.length||typeof S==="undefined"||!S||!BAL.nolock)return m;
 for(let i=m.opts.length-1;i>=0;i--){const c=m.opts[i];if(!c)continue;if(c.__nlAdd){m.opts.splice(i,1);continue}
  if(c.__nl){c.fx=c.__nl.fx;c.n=c.__nl.n;if(c.__nl.off)c.off=c.__nl.off;delete c.__nl}
  if(c.off&&c.off.k==="bac"&&c.fx&&c.fx.bac<0&&!kitPoor(c))delete c.off}/* a bạc grey of an earlier draw (j3 kitOffBac) she can now pay */
 if(typeof kitCancelIx==="function"&&kitCancelIx(m)>=0)return m;if(m.opts.some(c=>c&&c.kgx))return m;/* a gift card's own back road */
 if(m.opts.some(c=>kitTakeable(c,m)))return m;
 for(const c of m.opts){if(!c||!c.fx||!(c.fx.bac<0))continue;const off=c.off;if(off&&off.k!=="bac")continue;
  if(off)delete c.off;const why=kitLockWhy(c,m);if(why!=="bac"){if(off)c.off=off;continue}/* held back by something more than bạc */
  const sub=kitBacSub(c,-c.fx.bac-Math.max(0,S.bac|0));if(!sub){if(off)c.off=off;continue}
  const fx=Object.assign({},c.fx);if(S.bac>0)fx.bac=-Math.floor(S.bac);else delete fx.bac;for(const k in sub)fx[k]=(fx[k]||0)+sub[k];
  if(!kitFloorOk(fx)){if(off)c.off=off;continue}/* her whole cost would take a kept stat below its floor (Sức 0 = death): stays closed */
  c.__nl={fx:c.fx,n:c.n,off};c.fx=fx;c.n=String(c.n||"")+BAL.nolock.tag}
 if(m.opts.some(c=>kitTakeable(c,m)))return m;
 m.opts.push({n:KIT_NOLOCK_LEAVE,fx:{},x:"",go:()=>{},__nlAdd:1});
 if(!m.__nlLog){m.__nlLog=1;(window.__deadCards=window.__deadCards||[]).push({pid:m.pid||"",t:m.t||"",bac:S.bac,turn:S.turn});console.warn("dead card net:",m.pid||m.t)}}catch(e){console.error("kitNoLock",e)}return m}
/* outermost wrappers (assembled last): every draw and every pick sees the same roads; the added «Lui» is the card's cancel (forced or not),
   so the kit ✕ / Esc / tap-out (kitModalCloser) and a pick of it leave the card like the ✕ (closeModal: the co-op guest sends i:-1) */
(function(){if(typeof kitCancelIx==="function"){const k0=kitCancelIx;kitCancelIx=function(m){const i=k0(m);if(i>=0||!m||!m.opts)return i;return m.opts.findIndex(c=>c&&c.__nlAdd)}}
 if(typeof showModal==="function"){const s0=showModal;showModal=function(){try{if(typeof Q!=="undefined"&&Q.length)kitNoLock(Q[0])}catch(e){}return s0.apply(this,arguments)}}
 if(typeof chooseM==="function"){const c0=chooseM;chooseM=function(i){try{const m=typeof Q!=="undefined"?Q[0]:null;if(m&&m.opts){kitNoLock(m);const c=m.opts[i];if(c&&c.__nlAdd)return closeModal()}}catch(e){console.error(e)}return c0.apply(this,arguments)}}})();
window.kitNoLock=kitNoLock;window.kitCancelIx=kitCancelIx;window.kitLockWhy=kitLockWhy;window.kitTakeable=kitTakeable;window.kitBacSub=kitBacSub;window.kitFloorOk=kitFloorOk;
