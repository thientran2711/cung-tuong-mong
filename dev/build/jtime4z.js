/* ================= jtime4z: bốn buổi — the late part (after every module that defines what it wraps) =================
   - map images: trưa uses the sáng painting until noon paintings exist (review/scene-seasons may set window.B4_TRUA_IMG=1 to use img/map-*-trua.webp)
   - CSS: body[data-buoi] and the buổi curtain were drawn for 0 sáng / 1 chiều / 2 tối; re-keyed for 0 sáng / 1 trưa / 2 chiều / 3 tối
   - old saves (3 buổi, no b4 mark): buổi 1 (chiều) -> 2, 2 (tối) -> 3; buổi ids counted as wk*3+b (cung nữ errands) are re-counted as wk*4+b */
if(typeof BUK!=="undefined"&&BUK.length===3)BUK.splice(1,0,window.B4_TRUA_IMG?"trua":"sang");
(function(){try{const st=document.createElement("style");st.id="b4css";st.textContent=
 `body[data-buoi="1"] .panel{background:var(--panel)}body[data-buoi="2"] .panel{background:color-mix(in srgb,var(--panel) 95%,#ffb050)}body[data-buoi="3"] .panel{background:color-mix(in srgb,var(--panel) 92%,#1a2a5a)}
 .curtain.shift.b1{background:linear-gradient(#fff3d655,#f5ecdc00)}.curtain.shift.b2{background:linear-gradient(#f6c98a55,#f5ecdc00)}.curtain.shift.b3{background:linear-gradient(#2a2050aa,#5a3a6044)}`;
 document.head.appendChild(st)}catch(e){}})();
(function(){const d0=deser;deser=function(d){const r=d0.apply(this,arguments);
 try{if(d&&!d.b4&&S){const m=b=>b>=2?3:b>=1?2:0;S.buoi=m(S.buoi||0);const cv=x=>typeof x==="number"&&x>=0?Math.floor(x/3)*B4N+m(x%3):x;
  /* jmen plans (b = buổi) and the jstory pledge clock (wk*3+b -> wk*4+b) */(S.menPlans||[]).forEach(P=>{if(typeof P.b==='number')P.b=m(P.b)});if(S.pl67){S.pl67.due=cv(S.pl67.due);S.pl67.t0=cv(S.pl67.t0)}
  if(S.srv){if(S.srv.sent&&S.srv.sent.until!=null)S.srv.sent.until=cv(S.srv.sent.until);for(const k in (S.srv.once||{})){const v=S.srv.once[k];if(v&&v.b!=null)v.b=cv(v.b)}}}}catch(e){console.error(e)}
 return r}})();
