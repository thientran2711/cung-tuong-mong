/* ================= jage: mọi người lớn từ 18 tuổi trở lên (luật của sếp) =================
   Cung nữ (servAge 16+, newMaid 16+, j17 sửa mặt 16+), tú nữ tuyển mới (15+R4) từng có thể dưới 18. Nay mọi chỗ sinh tuổi cho
   người lớn đều từ 18; con cái hoàng tự giữ tuổi con (không bị nâng). Save cũ: ai dưới 18 (không phải con) được nâng lên 18. */
const AGE_MIN=BAL.age.adult;
(function(){const s0=servAge;servAge=function(role){const r=s0.apply(this,arguments);if(r&&r.age<AGE_MIN){r.age=AGE_MIN+Math.max(0,r.age-16);if(r.age>AGE_MIN+9)r.age=AGE_MIN+9;if(role!=="maid"&&typeof eunBand==="function")r.fe=eunBand(r.age)}return r}})();
(function(){const m0=newMaid;newMaid=function(name,loyal,age){const m=m0.apply(this,arguments);if(m&&!(m.age>=AGE_MIN))m.age=AGE_MIN+R(5);return m}})();
function ageKids(){const K=new Set();try{allKids().forEach(([k])=>K.add(k))}catch(e){}try{(S.kids||[]).forEach(k=>K.add(k));(rivals||[]).forEach(v=>(v.kids||[]).forEach(k=>K.add(k)))}catch(e){}return K}
function ageFloor(){if(!S)return;const K=ageKids();const H=[S,S.maid,S.emp,S.thO];try{const C=S.court||{};for(const k in C)H.push(C[k])}catch(e){}
 try{allServ().forEach(x=>H.push(x))}catch(e){}(rivals||[]).forEach(v=>H.push(v));(S.men||[]).forEach(m=>H.push(m));try{if(S.srv&&typeof srvColleagues==="function")srvColleagues().forEach(x=>H.push(x))}catch(e){}
 for(const o of H){if(!o||typeof o!=="object"||K.has(o))continue;if(typeof o.age==="number"&&o.age<AGE_MIN)o.age=AGE_MIN}}
(function(){const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{ageFloor()}catch(e){}return r}})();
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{ageFloor()}catch(e){}return r}})();
(function(){const p0=palFix;palFix=function(){const r=p0.apply(this,arguments);try{ageFloor()}catch(e){}return r}})();
(function(){const s0=start;start=function(){const r=s0.apply(this,arguments);try{ageFloor()}catch(e){}return r}})();
(function(){const a0=nlAccept;nlAccept=function(){const r=a0.apply(this,arguments);try{ageFloor()}catch(e){}return r}})();
