/* ================= joanpace: OÁN PACE — control the NUMBERS, never the NPC (review/oan-pace, owner OD 26/11 ~18:40Z) =================
   Owner (verbatim, short): «tôi không có muốn phải là gò ép lại NPC … cái điểm ghét, điểm oán nó tăng quá nhanh … trong khi nó lại giảm quá chậm …
   tôi mới gì vô game tôi có làm gì đâu mà ai cũng nhắm cho tôi hết trơn … không phải là tôi đang muốn bạn kiểm soát lại cái mật độ xuất hiện trong các
   cái sự kiện … phải kiểm soát các cái điểm số này». No cap on events or choices: every NPC still decides freely; only the oán score moves differently.
   Built on review/pace-all (j28 oanCool = the weekly — i.e. per DAY, one wk() tick — cool-down of every grudge; jmend = the costly mends).
   (b) GAIN (j9 oanAdd base, every holder and target, HER own oán too — law 1): one cause = one bounded step (≤ BAL.oanPace.step); the same
       incident (same pair, same buổi bq()) never stacks — the biggest cause counts, not the sum; and one person's oán toward one person rises at
       most BAL.oanPace.day in one day (wk()). Fractions carry. Store: holder.opz[key] = [day, gained today, buổi, gained this buổi].
   (c) FADE (j28 ocOne): per day, faster the longer she leaves that person alone (BAL.oanCool.alone), slower for a deep grudge (BAL.oanCool.deep).
   (d) REVENGE SATISFIES: whoever acts against a person (a harm act through runAct — the act groups of j95 H95 — or a hostile talk deed through
       twDo — jagent AGHOST: khiêu khích / hạ nhục / lạnh nhạt / rỉ tai) spends BAL.oanPace.vent.share of her oán toward that person (at least
       vent.min). Same for her (law 1).
   (e) NEWCOMER: nobody arrives with oán (j1 newRival keeps oán 0); a lie or a slight is still one bounded step, so a new face has no grudge until
       someone gives her one.
   (f) THRESHOLD: a hostile choice (every j95 H95 kind: schemes, quarrels) toward anyone needs the chooser's grudge heat toward that person —
       max(oán, Ghen × BAL.net.heat.ghenK (her only), dislike × BAL.net.heat.affK) — ≥ BAL.oanPace.act; a recorded outside reason (j95except:
       coerced by proof, a faction leader's order, a rumour she believes) still opens it. The player chooses for herself (never gated).
   Every number: BAL.oanPace (jbal.js), BAL.oanCool, BAL.oanLv, BAL.net.heat. Rollback: BAL.oanPace.on = 0.
   ===================================================================================================================================== */
function opOn(){return !!(BAL.oanPace&&BAL.oanPace.on)}
function opKey(y){return y===S?"me":y&&y.id!=null?String(y.id):y&&y.name?"n:"+y.name:null}
function opNow(){try{return[wk(),bq()]}catch(e){return[0,0]}}
/* (b) the bounded rise: n (> 0, after the holder's nết) → what really lands */
function opUp(x,y,n){if(!opOn()||!(n>0)||!x||typeof x!=="object")return n;try{const P=BAL.oanPace,k=opKey(y);if(k==null)return n;
 const [w,b]=opNow();const z=x.opz=x.opz&&typeof x.opz==="object"?x.opz:{};
 for(const q in z)if(!Array.isArray(z[q])||z[q][0]<w)delete z[q];
 const e=z[k]||[w,0,b,0];if(e[2]!==b){e[2]=b;e[3]=0}
 const s=Math.min(n,P.step);let add=Math.max(0,s-e[3]);add=Math.min(add,Math.max(0,P.day-e[1]));
 e[3]=Math.round((e[3]+add)*100)/100;e[1]=Math.round((e[1]+add)*100)/100;z[k]=e;return add}catch(err){return n}}
/* (f) the grudge heat of a toward t (danger without the trait shift) */
function opHeat(a,t){const H=BAL.net.heat;return Math.max(oan(a,t),t===S?(+a.ghen||0)*H.ghenK:0,Math.max(0,-aff(a,t))*H.affK)}
(function(){const g0=motiveOK;motiveOK=function(a,t,kind){const g=g0.apply(this,arguments);try{if(!opOn()||!g||!g.ok||g.ex||!a||!t||a===S||a===t||typeof a!=="object"||a.rel==null||!H95.has(kind))return g;
  const h=Math.round(opHeat(a,t));if(h>=BAL.oanPace.act)return g;if(j95except(a,t))return g;
  return{ok:false,why:`chưa đủ oán với ${t===S?"ngươi":t.name} (${h}, cần ${BAL.oanPace.act})`}}catch(e){return g}};window.motiveOK=motiveOK})();
/* (d) revenge spends the oán it vents */
function opVent(a,t){try{if(!opOn()||!a||!t||a===t)return 0;const o=oan(a,t);if(!(o>0))return 0;const V=BAL.oanPace.vent;const d=Math.min(o,Math.max(V.min,Math.round(o*V.share)));oanAdd(a,t,-d);return d}catch(e){return 0}}
(function(){const r0=runAct;runAct=function(a,t,k){const r=r0.apply(this,arguments);try{if(r&&a&&t&&a!==t&&H95.has(k)&&!F95.has(k))opVent(a,t)}catch(e){}return r}})();
(function(){const w0=twDo;twDo=function(a,t,k){const r=w0.apply(this,arguments);try{if(r&&a&&t&&a!==t&&typeof AGHOST!=="undefined"&&AGHOST.has(k))opVent(a,t)}catch(e){}return r}})();
