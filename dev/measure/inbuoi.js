/* per-buổi limit probe (INP2=inbuoi.js): at every nextBuoi of HER life: khắc used (0..4) and Sức. A buổi is
   "khắc" limited when all 4 khắc were used, "sức" limited when it ended with khắc left and Sức < 20 (most acts need Sức 20),
   "free" otherwise (nothing worth doing). Also the first tuần she reached Thái hậu / Hoàng thái hậu / Nữ đế (title or rank text). Into .bu */
(function(){const Z=()=>({k:0,s:0,f:0,n:0,usedSum:0,sucSum:0,th:null,htt:null,nd:null});window.__bu=Z();
 const nb0=nextBuoi;nextBuoi=function(){try{if(S&&!S.dead){const b=window.__bu;b.n++;b.usedSum+=used;b.sucSum+=S.suc||0;if(used>=4)b.k++;else if((S.suc||0)<20)b.s++;else b.f++;
   const t=(S.title||"")+" "+(typeof rkName==="function"?rkName(S):"");const w=typeof wk==="function"?wk():0;
   if(b.th==null&&/Thái hậu/.test(t)&&!/Hoàng thái hậu/.test(t))b.th=w;if(b.htt==null&&/Hoàng thái hậu/.test(t))b.htt=w;if(b.nd==null&&/Nữ đế/.test(t))b.nd=w}}catch(e){}return nb0.apply(this,arguments)};
 const o0=over;over=function(){const R=window.__res;const n0=R.length;const r=o0.apply(this,arguments);try{if(R[n0])R[n0].bu=window.__bu}catch(e){}window.__bu=Z();return r}})();
