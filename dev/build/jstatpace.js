/* ================= jstatpace: STAT PACE — the ONE rule for every RISE of Danh / Đức / Sủng / thiện cảm / oán (owner OD 26/11 ~04:20Z;
   numbers BAL.sp in jbalsp.js; law 4 one core, law 5 harder as she climbs, law 1 the same rule for her and every NPC, law 11 whole family:
   the funnels apply (j1) / ap (j8) / affAdd / oanAdd (j9) call spG; raw writes go through spAdd; dev/measure/statpace-scan.py lists every site).
   spG(k, holder, now, rise, rank) → the rise really added: size band (one change never passes the «big» band), diminishing returns near the
   rank ceiling, the ceiling itself. Integer result; the fraction carries over in holder.spc[key] (saved with the person), so many small rises
   still add up the same way for everyone. A fall of Danh / Đức / Sủng / oán is returned unchanged; thiện cảm (th, hh, rel: −100..100) is paced on BOTH sides of 0 (dislike growing below 0 the same way as liking above it; a fall back toward 0 is not). No player-visible text, no random draw (co-op safe). */
const SP_K={sung:1,danh:1,duc:1,th:1,hh:1,rel:1,oan:1};
function spRk(p){try{return p===S?(S.rank|0):(p&&p.queen?7:(p&&p.rank|0)||0)}catch(e){return 0}}
function spCeil(rk){const C=BAL.sp.ceil;return C[Math.max(0,Math.min(C.length-1,rk|0))]}
const SP_SIGN={th:1,hh:1,rel:1};/* thiện cảm runs −100..100: dislike growing (below 0) is paced the same way as liking; a fall back toward 0 is not */
function spG(k,h,now,n,rk,ck,peek){const B=typeof BAL==="object"&&BAL.sp;if(!B||!B.on||!n||!SP_K[k])return n;
 if(n<0){if(!SP_SIGN[k])return n;const c=+now||0,z=Math.min(-n,Math.max(0,c)),rest=-n-z;return -(z+(rest>0?spG(k,h,Math.max(0,-Math.min(0,c)),rest,rk,(ck||k)+"-",peek):0))}
 const bd=B.band[k];if(bd&&n>bd[1])n=Math.min(bd[2],bd[1]+(n-bd[1])*B.over);
 const ce=spCeil(rk),c0=Math.max(0,+now||0);if(c0>=ce)return 0;
 let g=n*Math.max(B.dm.min,1-Math.pow(c0/ce,B.dm.pow));
 const cc=h&&typeof h==="object"?(h.spc||(h.spc={})):null,key=ck||k;
 if(cc){g+=+cc[key]||0;const gi=Math.round(g);if(!peek)cc[key]=Math.round((g-gi)*1000)/1000;g=gi}else g=Math.round(g);
 return Math.max(0,Math.min(g,Math.ceil(ce-c0)))}
/* a raw write of one stat of a person (x.sung = …, v.rel += …) that RISES goes through the same rule; returns the new value (clamped as statSet) */
function spAdd(p,k,n,tgt){if(!p)return 0;if(!n||(n<0&&!SP_SIGN[k])){p[k]=(p[k]||0)+(n||0);return typeof statSet==="function"&&k!=="rel"&&k!=="oan"?statSet(p,k,p[k]):cl(p[k],k==="rel"?-100:0,100)}
 const now=p[k]||0,rk=(k==="rel"||k==="oan")?spRk(tgt||S):spRk(p);
 p[k]=(p[k]||0)+spG(k,p,now,n,rk,(k==="rel"||k==="oan")?k+":"+((tgt||S).id||"me"):k);
 if(k==="rel")p[k]=cl(p[k],-100,100);else if(k==="oan")p[k]=cl(p[k],0,100);else if(typeof statSet==="function")statSet(p,k,p[k]);return p[k]}
/* what a rise of n would REALLY add now (no carry change) — every preview that prints a rise reads this, so the button and the result chip
   say the same number (law 4): her own stats (k = sung / danh / duc / th / hh), or a person's thiện cảm / oán toward her (who = that person) */
function spSee(k,n,who){try{if(!n||typeof BAL!=="object"||!BAL.sp||!BAL.sp.on)return n;if(k==="rel"||k==="oan"){const x=who&&who!==S?who:null;
  return spG(k,x,x?(x[k]||0):0,n,spRk(S),k+":me",1)}return spG(k,S,S[k],n,spRk(S),k,1)}catch(e){return n}}
