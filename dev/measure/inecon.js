/* economy probe (INP2=inecon.js): per life, at each stipend of HER: [rank, bạc before, net change of the stipend (pay − wages + nhà gửi + việc vặt), staff, lãnh cung,
   lễ nghĩa paid (filled when she answers the month card), skipped]; plus her bạc spent / earned through apply(). Written into the life's record as .econ */
(function(){window.__econ={pay:[],inc:0,out:0,buy:0};
 const s0=stipend;stipend=function(p){if(p!==S)return s0.apply(this,arguments);const b=S.bac,r=rkOf(S),st=(S.staff||[]).length;const res=s0.apply(this,arguments);
  window.__econ.pay.push([r,b,S.bac-b,st,S.out?1:0,0,0]);return res};
 if(typeof econDoDuty==="function"){const d0=econDoDuty;econDoDuty=function(p,pay){const x=d0.apply(this,arguments);try{if(p===S){const L=window.__econ.pay;const e=L[L.length-1];if(e){e[5]=x.paid?(x.d+x.b):0;e[6]=x.paid?0:1}}}catch(e){}return x}}
 const a0=apply;apply=function(f){try{if(f&&f.bac){if(f.bac>0)window.__econ.inc+=f.bac;else window.__econ.out-=f.bac}}catch(e){}return a0.apply(this,arguments)};
 const o0=over;over=function(){try{const R=window.__res;const n0=R.length;const r=o0.apply(this,arguments);if(R[n0])R[n0].econ=window.__econ;window.__econ={pay:[],inc:0,out:0,buy:0};return r}catch(e){window.__econ={pay:[],inc:0,out:0,buy:0};throw e}}})();
