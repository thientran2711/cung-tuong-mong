/* ================= joanpace: OÁN PACE — control the NUMBERS, never the NPC (review/oan-pace, owner OD 26/11 ~18:40Z) =================
   Owner (verbatim, short): «tôi không có muốn phải là gò ép lại NPC … cái điểm ghét, điểm oán nó tăng quá nhanh … trong khi nó lại giảm quá chậm …
   tôi mới gì vô game tôi có làm gì đâu mà ai cũng nhắm cho tôi hết trơn … không phải là tôi đang muốn bạn kiểm soát lại cái mật độ xuất hiện trong các
   cái sự kiện … phải kiểm soát các cái điểm số này». No cap on events or choices: every NPC still decides freely; only the oán score moves differently.
   Built on review/pace-all (j28 oanCool = the weekly — i.e. per DAY, one wk() tick — cool-down of every grudge; jmend = the costly mends).
   (b) GAIN (j9 oanAdd base, every holder and target, HER own oán too — law 1): the size of one cause = stat-pace's band (BAL.stp.band, j9 spG after this door — ONE cap per stat, MAIN 163 on RV-163B F1); the same
       incident (same pair, same buổi bq()) never stacks — the biggest cause counts, not the sum; and one person's oán toward one person rises at
       most BAL.oanPace.day in one day (wk()). Fractions carry. Store: holder.opz[key] = [day, gained today, buổi, gained this buổi].
   (c) FADE (j28 ocOne): per day, faster the longer she leaves that person alone (BAL.oanCool.alone), slower for a deep grudge (BAL.oanCool.deep).
   (d) REVENGE SATISFIES: whoever acts against a person (a harm act through runAct — the act groups of j95 H95 —, a lie about her (j95bSeed), or a hostile talk deed through
       twDo — jagent AGHOST: khiêu khích / hạ nhục / lạnh nhạt / rỉ tai) spends BAL.oanPace.vent.share of her oán toward that person (at least
       vent.min). Same for her (law 1).
   (e) NEWCOMER: nobody arrives with oán (j1 newRival keeps oán 0); a lie or a slight is still one bounded step, so a new face has no grudge until
       someone gives her one.
   (f) THRESHOLD: a hostile choice (every j95 H95 kind: schemes, quarrels, lie rumours; jpma spite «Thách đấu» via opHeatOK) toward anyone needs the chooser's grudge heat toward that person —
       max(oán, Ghen × BAL.net.heat.ghenK (her only), dislike × BAL.net.heat.affK) — ≥ BAL.oanPace.act; a recorded outside reason (j95except:
       coerced by proof, a faction leader's order; NOT a rumour she believes — opEx) still opens it. The player chooses for herself (never gated).
   (b') GHÉT: a fall of liking (j9 affAdd n < 0) follows the same pace (BAL.oanPace.ghet: step / day; store holder.opa).
   Every number: BAL.oanPace (jbal.js), BAL.oanCool, BAL.oanLv, BAL.net.heat. Rollback: BAL.oanPace.on = 0.
   ===================================================================================================================================== */
function opOn(){return !!(BAL.oanPace&&BAL.oanPace.on)}
function opKey(y){return y===S?"me":y&&y.id!=null?String(y.id):y&&y.name?"n:"+y.name:null}
function opNow(){try{return[wk(),bq()]}catch(e){return[0,0]}}
/* (b) the bounded rise: n (> 0, after the holder's nết) → what really lands */
function opUp(x,y,n){return opStep(x,y,n,"opz",BAL.oanPace)}
/* the same pace for «ghét»: a fall of liking (thiện cảm, j9 affAdd n < 0) — one bounded step per cause / incident, capped per day (BAL.oanPace.ghet) */
function opDn(x,y,n){return opStep(x,y,n,"opa",BAL.oanPace.ghet)}
function opStep(x,y,n,st,P){if(!opOn()||!(n>0)||!x||typeof x!=="object")return n;try{const k=opKey(y);if(k==null)return n;
 const [w,b]=opNow();const z=x[st]=x[st]&&typeof x[st]==="object"?x[st]:{};
 for(const q in z)if(!Array.isArray(z[q])||z[q][0]<w)delete z[q];
 const e=z[k]||[w,0,b,0];if(e[2]!==b){e[2]=b;e[3]=0}
 const s=P.band?opBand(n,P.band):n;let add=Math.max(0,s-e[3]);add=Math.min(add,Math.max(0,P.day-e[1]));
 e[3]=Math.round((e[3]+add)*100)/100;e[1]=Math.round((e[1]+add)*100)/100;z[k]=e;return add}catch(err){return n}}
/* (f) the grudge heat of a toward t (danger without the trait shift) */
function opHeat(a,t){const H=BAL.net.heat;return Math.max(oan(a,t),t===S?(+a.ghen||0)*H.ghenK:0,Math.max(0,-aff(a,t))*H.affK)}
function opHeatOK(a,t){try{return !opOn()||a===S||opHeat(a,t)>=BAL.oanPace.act||opEx(a,t)}catch(e){return true}}
/* an outside reason that still opens a hostile choice: coerced by proof / a faction leader's order (j95except). A rumour she believes is NOT one here:
   its oán already landed (one bounded step), and letting it open the gate made every believer a new liar (a chain of lies from day one, robot 26/11) */
function opEx(a,t){const r=a.j95rum;try{if(r)a.j95rum=null;return !!j95except(a,t)}catch(e){return false}finally{if(r)a.j95rum=r}}
(function(){const g0=motiveOK;motiveOK=function(a,t,kind){const g=g0.apply(this,arguments);try{if(!opOn()||!g||!g.ok||!a||!t||a===S||a===t||typeof a!=="object"||a.rel==null||!H95.has(kind))return g;
  const h=Math.round(opHeat(a,t));if(h>=BAL.oanPace.act)return g;if(opEx(a,t))return g;
  return{ok:false,why:`chưa đủ oán với ${t===S?"ngươi":t.name} (${h}, cần ${BAL.oanPace.act})`}}catch(e){return g}};window.motiveOK=motiveOK})();
/* (d) revenge spends the oán it vents — and the jealousy (review/oan-pace-ghen: a consort who acts against her spends her Ghen; she, acting against a consort, spends her own jealousy of that consort, law 1) */
function opVent(a,t){try{if(!opOn()||!a||!t||a===t)return 0;let d=opGvent(a,t);const o=oan(a,t);if(!(o>0))return d;const V=BAL.oanPace.vent;const x=Math.min(o,Math.max(V.min,Math.round(o*V.share)));oanAdd(a,t,-x);return d+x}catch(e){return 0}}
function opGvent(a,t){const V=(BAL.oanPace.ghen||{}).vent;if(!V)return 0;const sp=g=>Math.min(g,Math.max(V.min,Math.round(g*V.share)));
 if(t===S&&a!==S&&typeof a==="object"&&(+a.ghen||0)>0){const x=sp(+a.ghen);a.ghen=cl(a.ghen-x,0,100);return x}
 if(a===S&&t&&typeof t==="object"&&(+t.pg||0)>0){const x=sp(+t.pg);t.pg=cl(t.pg-x,0,100);return x}return 0}
(function(){const r0=runAct;runAct=function(a,t,k){const r=r0.apply(this,arguments);try{if(r&&a&&t&&a!==t&&H95.has(k)&&!F95.has(k))opVent(a,t)}catch(e){}return r}})();
(function(){const w0=twDo;twDo=function(a,t,k){const r=w0.apply(this,arguments);try{if(r&&a&&t&&a!==t&&typeof AGHOST!=="undefined"&&AGHOST.has(k))opVent(a,t)}catch(e){}return r}})();
/* (d) a lie spread about her (j95b j95bSeed: x tells y she harmed y) is an act against her too: the teller spends her oán the same way */
(function(){if(typeof j95bSeed!=="function")return;const s0=j95bSeed;j95bSeed=function(x,y){const r=s0.apply(this,arguments);try{if(r&&x&&typeof x==="object")opVent(x,S)}catch(e){}return r}})();
/* ===== GHEN PACE (review/oan-pace-ghen; MAIN 161 scope 18:58Z «GHEN gets the same control» + 19:20Z relative-favour rule; numbers BAL.oanPace.ghen) =====
   v.ghen = a consort's jealousy of HER (j1 ghenUp is the one door; a jealousy caused by another consort already turns into oán between the two).
   RISE (opGhenIn, called by ghenUp before its slow-near-the-top share): × relative favour clamp(1 + (her Sủng − that consort's Sủng) ÷ rel.span, rel.min,
   rel.max) — a consort as favoured as she is, or more, hardly grows jealous; then one bounded step per cause (≤ step), the same incident (same buổi)
   never stacks, at most day a day (opStep, store v.opg). The day of the last cause is v.gLw.
   FADE (opGfK, × the j28 ghenCool of each day): faster the longer nothing new feeds it (BAL.oanCool.quiet / alone, like oán), slower when deep
   (ghen ≥ deep: × BAL.oanCool.deep.k), and × clamp(1 − gap ÷ rel.span, rel.fmin, rel.fmax): her lead in favour keeps it, a closed gap lets it go.
   VENT (opGvent in opVent above): acting against her spends vent.share of that jealousy (≥ vent.min).
   TWO-WAY (law 1): HER jealousy of a consort (v.pg; j1 pgUp, j8 pgCool) — same step / day / rel (gap = that consort's Sủng − hers) / deep / alone / vent;
   her base fade = BAL.oanCool.ghen.base + pct × pg (the NPC base rule; she has no nết). Rollback: BAL.oanPace.on = 0 (old rise; old fade). */
/* the stat-pace style size band of one cause (jstatpace spG: above b[1] only BAL.stp.over of the rest counts, never above b[2]) — used for GHEN only (oán / liking: stat-pace itself) */
function opBand(n,b){if(!(n>b[1]))return n;const o=BAL.stp&&BAL.stp.over!=null?BAL.stp.over:.3;return Math.min(b[2],b[1]+(n-b[1])*o)}
function opRelF(gap){const R=BAL.oanPace.ghen.rel;return Math.max(R.min,Math.min(R.max,1+gap/R.span))}
function opGhenIn(v,n,by){try{const G=BAL.oanPace.ghen;if(!opOn()||!G||!(n>0))return n;const me=by&&typeof by==="object"&&by.coop?by:S;
 n=opStep(v,me,(window.opGBanded?n:opBand(n,G.band))*opRelF((+me.sung||0)-(+v.sung||0)),"opg",{day:G.day});if(!window.opGStand)v.gLw=opNow()[0];return n}catch(e){return n}}
function opPgIn(v,n){try{const G=BAL.oanPace.ghen;if(!opOn()||!G||!(n>0))return n;n=opStep(S,v,opBand(n,G.band)*opRelF((+v.sung||0)-(+S.sung||0)),"opg",{day:G.day});v.pLw=opNow()[0];return n}catch(e){return n}}
function opGfK(lv,gap,lw){try{const G=BAL.oanPace.ghen,C=BAL.oanCool;if(!opOn()||!G)return 1;let k=1;const q=opNow()[0]-(+lw||0)-C.quiet;
 if(q>0)k*=1+C.alone.k*Math.min(q,C.alone.max);if(lv>=G.deep)k*=C.deep.k;const R=G.rel;return k*Math.max(R.fmin,Math.min(R.fmax,1-gap/R.span))}catch(e){return 1}}
/* her own jealousy's daily fade (j8 rivalsTurn; was a flat −1): fractions carry (v.pcc) */
function pgCool(v){try{if(!opOn()||!(BAL.oanCool&&BAL.oanCool.on))return 1;const G=BAL.oanCool.ghen,p=+v.pg||0;const d=(+v.pcc||0)+(G.base+G.pct*p)*BAL.oanCool.me*opGfK(p,(+v.sung||0)-(+S.sung||0),v.pLw),n=Math.floor(d);v.pcc=Math.round((d-n)*1000)/1000;return n}catch(e){return 1}}
