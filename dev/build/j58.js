/* ================= j58: TRANH NỀN THÂN PHẬN (owner 11/14) =================
   While the "Thân phận kiếp này" card (j52) or the life's opening card ("Nhập cung…") is up, the full-screen modal
   backdrop shows img/bg-origin-<origin.k>.webp (like the title key art) under a soft gradient. Every other modal keeps
   the normal dim backdrop. A missing picture leaves the gradient over the usual dark colour. Loads last; only touches
   the #modal element's own background, so card frames from other modules (j57) are untouched. */
(function(){
 const OBG_BAD={},OBG_OK={};
 function obgKey(){try{return S&&S.origin&&S.origin.k?String(S.origin.k):""}catch(e){return ""}}
 function obgWanted(m){if(!m)return false;
  return !!(m.nl||/\bnlcard\b/.test(m.cls||"")||m.t==="Thân phận kiếp này"||/^Nhập cung/.test(String(m.t||"")))}
 function obgClear(M){if(M.dataset.obg){delete M.dataset.obg;M.style.removeProperty("background")}}
 function obgSet(M,k){const grad="linear-gradient(rgba(30,14,8,.30),rgba(30,14,8,.12) 38%,rgba(30,14,8,.18) 62%,rgba(30,14,8,.55))";
  const url=OBG_BAD[k]?"":`url(img/bg-origin-${k}.webp) center 30%/cover no-repeat,`;
  M.dataset.obg=k;M.style.setProperty("background",`${grad},${url}#2a1a12`,"important")}
 function obgApply(){try{const M=$("modal");if(!M)return;const m=Q&&Q[0];const k=obgKey();
  if(M.hidden||!k||!obgWanted(m)){obgClear(M);return}
  if(M.dataset.obg===k)return;
  obgSet(M,k);
  if(!OBG_OK[k]&&!OBG_BAD[k]){const im=new Image();im.onload=()=>{OBG_OK[k]=1};
   im.onerror=()=>{OBG_BAD[k]=1;if(M.dataset.obg===k){delete M.dataset.obg;obgApply()}};im.src=`img/bg-origin-${k}.webp`}
 }catch(e){}}
 if(typeof showModal==="function"){const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);obgApply();return r}}
 /* anything that hides/shows the modal without showModal */
 try{const M=$("modal");if(M&&typeof MutationObserver==="function")new MutationObserver(obgApply).observe(M,{attributes:true,attributeFilter:["hidden","class"]})}catch(e){}
 obgApply();
})();
