/* LOCAL TEST ONLY (E7b): stand-in for the q1a engine hook until review/questline-q1a lands. Not pushed. */
(function(){const NR=window.NRASK||{};const idA=new Map();for(const r in ROAD14)for(const n in ROAD14[r]){const id=ROAD14[r][n];if(ARC67[id])idA.set(ARC67[id],id)}
 const idOf=X=>{const N=X&&X.A&&X.A.o&&X.A.o.nr;const r=X&&X.p&&X.p.nr||N&&N.r;const n=X&&X.p&&X.p.nn||N&&N.n;const R0=ROAD14[r];return R0&&R0[n]};
 const cap=t=>t.charAt(0).toUpperCase()+t.slice(1);
 const voice=X=>{const v=X.A&&X.A.o;const m=typeof nrVoice==="function"?nrVoice(X):null;if(m)return{me:m.me,call:m.call};const hi=!!(v&&(v.queen||v.rank>S.rank));return{me:v&&v.queen?"bổn cung":hi?"tỷ":"muội",call:hi?"muội muội":"tỷ tỷ"}};
 window.nrAskFill=(s,X)=>{const V=voice(X);const he=nrHe(X.A&&X.A.o);const W={me:V.me,call:V.call,he,b:X.B?X.B.n:"kẻ kia"};
  return String(s).replace(/\{(\w+)\}/g,(m,k,i,str)=>{let w=W[k.toLowerCase()];if(w==null)return m;const pre=str.slice(0,i);if(k==="Me"||/^[“"]?$/.test(pre)||/[.!?]["”]?\s*[“"]?$/.test(pre))w=cap(w);return w})};
 const E=(X,k)=>{const e=NR[idOf(X)];return e&&e.k===k?e:null};
 for(const k of ["emp","th","hh","thu","do","y","che"]){const T=T72I["nr_"+k];if(!T)continue;const h0=T.h;T.h=X=>{const e=E(X,k);return e?nrAskFill(e.h,X):typeof h0==="function"?h0(X):h0};
  const ch=T.s[0].ch;for(let i=0;i<2;i++){const o=ch[i],n0=o.n,l0=o.lx;o.n=X=>{const e=E(X,k);return e?nrAskFill(e.o[i][0],X):typeof n0==="function"?n0(X):n0};o.lx=X=>{const e=E(X,k);return e?nrAskFill(e.o[i][1],X):typeof l0==="function"?l0(X):l0}}}
 const k0=nrKind;nrKind=function(A){const e=NR[idA.get(A)];return e&&e.k?e.k:k0.apply(this,arguments)}})();
