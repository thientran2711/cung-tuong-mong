/* ================= jstatpace: STAT PACE — the ONE rule for every RISE of Danh / Đức / Sủng / thiện cảm / oán (owner OD 26/11 ~04:20Z;
   numbers BAL.stp in jbalsp.js; law 4 one core, law 5 harder as she climbs, law 1 the same rule for her and every NPC, law 11 whole family:
   the funnels apply (j1) / ap (j8) / affAdd / oanAdd (j9) call spG; raw writes go through spAdd; dev/measure/statpace-scan.py lists every site).
   spG(k, holder, now, rise, rank) → the rise really added: size band (one change never passes the «big» band), diminishing returns near the
   rank ceiling, the ceiling itself. Integer result; the fraction carries over in holder.spc[key] (saved with the person), so many small rises
   still add up the same way for everyone. A fall of Danh / Đức / Sủng / oán is returned unchanged; thiện cảm (th, hh, rel: −100..100) is paced on BOTH sides of 0 (dislike growing below 0 the same way as liking above it; a fall back toward 0 is not). No player-visible text, no random draw (co-op safe). */
const SP_K=Object.fromEntries(["sung","danh","duc","th","hh","rel","oan","sac","tai","tamco"].map(k=>[k,true]));/* the paced stats (flags, not numbers); sac / tai / tamco: PACE-SPEED, BAL.stp.abs */
function spRk(p){try{return p===S?(S.rank|0):(p&&p.queen?RANKS.length-1:(p&&p.rank|0)||0)}catch(e){return 0}}
/* PACE-SPEED (owner OD 26/11 ~19:10Z (A) «điểm của mình ở ngay đó thôi … không vút lên cao quá nhiều so với điểm chuẩn»): a stat tied to the rank
   bars (BAL.stp.bar: Sủng → RANKS.s, Danh → RANKS.d) has its OWN ceiling = the NEXT rank's bar + BAL.stp.bar[k].m (a small margin); at the top
   rank BAL.stp.bar[k].top. Every other stat keeps the shared rank list BAL.stp.ceil. */
function spBar(k){const T=BAL.stp.bar;return T&&k&&T[k]||null}
/* PACE-SPEED (sếp FINAL 26/11 ~23:24Z via MAIN 164): Sắc / Tài / Tâm cơ = her own qualities, no rank link and no hard ceiling: they take the same slowdown
   with their OWN curve BAL.stp.abs[k] {pow, min} against 100 (every rise × max(min, 1 − (now/100)^pow), band cap per change); nothing is ever taken away. */
function spAbs(k){const A=BAL.stp.abs;return A&&k&&A[k]||null}
function spCeil(rk,k){rk=Math.max(0,rk|0);if(spAbs(k))return 100;const b=spBar(k);if(b&&typeof RANKS==="object"){const n=Math.min(RANKS.length-1,rk+1);return rk>=RANKS.length-1?b.top:Math.min(b.top,RANKS[n][b.f]+b.m)}
 const C=BAL.stp.ceil,c=C[Math.min(C.length-1,rk)];return spSoft(k)?Math.max(c,BAL.stp.floor&&BAL.stp.floor[k]||0):c}
/* ONE SOFT CEILING for the six palace stats (owner OD 26/11 ~23:55Z, confirmed «Ok làm chỉ số như khuyến nghị»; CANON OVERWRITE of the hard stop):
   near / above its ceiling a stat still rises, only at the slow share dm.min (≈ 15 %), never a hard stop below 100. Ceilings: Sủng · Danh = the NEXT
   rank's bar + BAL.stp.bar[k].m; Đức (no rank bar) = the rank ceiling BAL.stp.ceil but never below the hiền đức floor BAL.stp.floor.duc 80;
   Sắc · Tài · Tâm cơ = 100. Same rule for every NPC (law 1). BAL.stp.soft lists the six. */
function spSoft(k){const L=BAL.stp.soft;return !!(L&&k&&L.indexOf(k)>=0)}
/* the hard stop of a rise = the rank ceiling, but never below BAL.stp.floor[k] (the highest stat gate the game asks at any rank, BIG review 1:
   above the rank ceiling a rise still counts at the slow share dm.min, so every gate stays reachable at every rank; law 16) */
/* a bar-tied stat (BAL.stp.bar) stops at its ceiling + bar[k].x (above the ceiling only the slow share dm.min counts; owner (A): no overshoot far above it) */
function spTop(k,rk){if(spAbs(k)||spSoft(k))return 100;const b=spBar(k);if(b)return Math.min(b.top,spCeil(rk,k)+(b.x||0));const f=BAL.stp.floor;return Math.max(spCeil(rk,k),f&&f[k]||0)}
const SP_SIGN=Object.fromEntries(["th","hh","rel"].map(k=>[k,true]));/* thiện cảm runs −100..100: dislike growing (below 0) is paced the same way as liking; a fall back toward 0 is not */
function spG(k,h,now,n,rk,ck,peek){const B=typeof BAL==="object"&&BAL.stp;if(!B||!B.on||SP_OFF||!n||!SP_K[k])return n;
 if(n<0){if(!SP_SIGN[k])return n;const c=+now||0,z=Math.min(-n,Math.max(0,c)),rest=-n-z;return -(z+(rest>0?spG(k,h,Math.max(0,-Math.min(0,c)),rest,rk,(ck||k)+"-",peek):0))}
 const ab0=spAbs(k);if(ab0&&ab0.k)n*=ab0.k;/* abs[k].k = the share of a raw rise that counts (Tâm cơ: card options feed it ~2–3 times a month, robot tally 27/11) */
 const bd=B.band[k];if(bd&&n>bd[1])n=Math.min(bd[2],bd[1]+(n-bd[1])*B.over);
 const ce=spCeil(rk,k),top=spTop(k,rk),c0=Math.max(0,+now||0);if(c0>=top)return 0;
 const ab=spAbs(k),pw=ab?ab.pow:B.dm.pow,mn=ab?ab.min:B.dm.min;let g=n*Math.max(mn,1-Math.pow(c0/ce,pw));
 const cc=h&&typeof h==="object"?(h.spc||(h.spc={})):null,key=ck||k;
 if(cc){g+=+cc[key]||0;const gi=Math.round(g);if(!peek)cc[key]=Math.round((g-gi)*1000)/1000;g=gi}else g=Math.round(g);
 return Math.max(0,Math.min(g,Math.ceil(top-c0)))}
/* a raw write of one stat of a person (x.sung = …, v.rel += …) that RISES goes through the same rule; returns the new value (clamped as statSet) */
function spAdd(p,k,n,tgt){if(!p)return 0;if(!n||(n<0&&!SP_SIGN[k])){p[k]=(p[k]||0)+(n||0);return typeof statSet==="function"&&k!=="rel"&&k!=="oan"?statSet(p,k,p[k]):cl(p[k],k==="rel"?-100:0,100)}
 const now=p[k]||0,rk=(k==="rel"||k==="oan")?spRk(tgt||S):spRk(p);
 p[k]=(p[k]||0)+spG(k,p,now,n,rk,(k==="rel"||k==="oan")?k+":"+((tgt||S).id||"me"):k);
 if(k==="rel")p[k]=cl(p[k],-100,100);else if(k==="oan")p[k]=cl(p[k],0,100);else if(typeof statSet==="function")statSet(p,k,p[k]);return p[k]}
/* what a rise of n would REALLY add now (no carry change) — every preview that prints a rise reads this, so the button and the result chip
   say the same number (law 4): her own stats (k = sung / danh / duc / th / hh), or a person's thiện cảm / oán toward her (who = that person) */
function spSee(k,n,who){try{if(!n||typeof BAL!=="object"||!BAL.stp||!BAL.stp.on)return n;if(k==="rel"||k==="oan"){const x=who&&who!==S?who:null;
  return spG(k,x,x?(x[k]||0):0,n,spRk(S),k+":me",1)}return spG(k,S,S[k],n,spRk(S),k,1)}catch(e){return n}}
/* a regard / grudge ROW of a map (h.rl[id] thiện cảm, h.ro[id] oán — e.g. her row for the co-op friend, keyed by pid) goes through the same rule:
   rk = rank of the one the row is about (affAdd / oanAdd: the one liked). Returns the new value (clamped as BAL.linkRange). BIG review 3. */
function spRow(h,map,id,n,rk){if(!h||!n)return h&&h[map]?h[map][id]||0:0;const M=h[map]=h[map]||{},k=map==="ro"?"oan":"rel",now=M[id]||0,
 R=(typeof BAL==="object"&&BAL.linkRange&&BAL.linkRange[map])||(k==="oan"?[0,100]:[-100,100]);
 M[id]=cl(now+spG(k,h,now,n,rk|0,k+":"+id),R[0],R[1]);return M[id]}
/* START VALUES are not rises (balance-core: «LIVE start = base + origin o»): while a life is made (start: j2 apply(origin o), the first NPCs …)
   the rule is off, so a new life starts exactly as on LIVE; every rise after that is paced */
var SP_OFF=0;
(function(){if(typeof start!=="function")return;const s0=start;start=function(){SP_OFF++;try{return s0.apply(this,arguments)}finally{SP_OFF--}}})();
/* FADE BY ITSELF (owner OD 26/11 ~23:47Z rec, kept ~23:55Z; numbers BAL.fade; law 1 her and every NPC; co-op: NPCs on the host only, worldOn):
   at each month end — Sủng: a month without Hoàng thượng (no night in p.nightLog this month, nor p.empSeenW) → −first, −step more each further month,
   at most −max a month (p.ngM = months in a row); seen → p.ngM 0, no fade. Never demotes by itself (a stat only). Sắc: each new year, from age BAL.fade.sac.from,
   −per. Her own fade = one Sổ ghi line with the exact old → new (the result card's kitWhy reads it, j63 kaWhyStat «<stat> N →»). */
function spFadeSeen(p,w0){return (p.nightLog||[]).some(w=>w>=w0)||(p.empSeenW!=null&&p.empSeenW>=w0)}
function spFadeMonth(w0,y0){const F=BAL.fade;if(!F||!S||S.dead)return;const host=typeof worldOn!=="function"||worldOn();const L=[];
 for(const p of consorts()){if(!p||p.alive===false||(p!==S&&!host))continue;const me=p===S;
  if(F.sung&&!p.out&&!((me?S.rank:rkOf(p))>=7)){if(spFadeSeen(p,w0))p.ngM=0;else{p.ngM=(p.ngM||0)+1;const d=Math.min(F.sung.max,F.sung.first+(p.ngM-1)*F.sung.step),a=+p.sung||0,b=Math.max(0,a-d);
    if(b!==a){p.sung=b;if(typeof statSet==="function")statSet(p,"sung",b);if(me)L.push(`Lâu không được gặp Hoàng thượng (${p.ngM} tháng): Sủng ${a} → ${b}.`)}}}
  if(F.sac&&S.year!==y0&&(+p.age||0)>=F.sac.from){const a=+p.sac||0,b=Math.max(0,a-F.sac.per);if(b!==a){p.sac=b;if(typeof statSet==="function")statSet(p,"sac",b);if(me)L.push(`Tuổi ${p.age}, nhan sắc phai dần: Sắc ${a} → ${b}.`)}}}
 for(const t of L)log(t)}
(function(){if(typeof monthTick!=="function")return;const m0=monthTick;monthTick=function(){const w0=S.turn*3,y0=S.year;const r=m0.apply(this,arguments);try{spFadeMonth(w0,y0)}catch(e){console.error(e)}return r}})();
/* the player-facing rule in ONE line (owner OD 26/11 ~23:55Z (5), wording verbatim): it joins the kit glossary meaning of the six stats (j79 kitGlossText →
   every kitGloss word, stat row, header help), consort road only (kitRoad() ""); data only, no new UI part. */
const SP_RULE_LINE="Chỉ số nào cũng càng cao càng khó lên; Danh, Đức, Sủng chậm hẳn khi vượt mức phẩm kế; Sủng phai khi lâu không gặp Hoàng thượng, Sắc phai theo tuổi.";
(function(){if(typeof kitGlossText!=="function")return;const g0=kitGlossText,K=["Sủng","Danh","Đức","Sắc","Tài","Tâm cơ"];
 kitGlossText=function(term){const t=g0.apply(this,arguments);try{if(K.indexOf(term)>=0&&!(typeof kitRoad==="function"&&kitRoad())&&t&&t.indexOf(SP_RULE_LINE)<0)return t+" "+SP_RULE_LINE}catch(e){}return t}})();
