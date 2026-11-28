/* ================= jearn: ĐỒ PHẢI CÓ ĐƯỢC, KHÔNG TỰ RƠI XUỐNG (owner 11/14 19:30Z, review/items-earned) =================
   Audit + rules: dev/ITEMS_EARNED.md. Every item comes from crafting, buying or being given/rewarded; the same for NPCs.
   This module holds the small fixes to the free grants other than the veil (jveil). ================= */
/* wdColInfo (collection counter) now lives in jcol.js (D49); the old stand-in is gone. */

/* ---------- 1. Trang phục: no phantom "phẩm phục được cấp" that is always at hand ----------
   Before (j92): everyone wore a free {from:"base"} outfit of her CURRENT phẩm, re-issued out of nothing after a promotion,
   a demotion, a confiscation or taking the y phục off, and Tự chọn đồ / Chải chuốt could always pick it.
   Now: what she wears on entering the palace is a real starting kit (Nội vụ phủ issue: one trâm + one y phục of her phẩm,
   plus one spare plain y phục for the player), kept like any other item; new phẩm phục come only from the existing
   promotion issue (j92 nvp), purchases, gifts and rewards. Nobody is left without clothes: if a confiscated / lost y phục
   cannot be replaced from her own chest, Nội vụ phủ issues a plain one of her phẩm (an issue, recorded as such).
   Mourning clothes in quốc tang stay a Nội vụ phủ issue to everyone. Old saves: worn base items become real starting-kit
   items (same item, nothing visible changes). */
function earnK(p,k){if(!k)return;if(p===S){S.wdk=S.wdk||{};S.wdk[k]=1}else{p.wdk=p.wdk||{};p.wdk[k]=1}}
function earnPlainY(p){const P=Math.min(8,wdPOf(p));let L=WD_LIST.filter(r=>r[1]==="y"&&r[3]===P&&r[4]===0&&!WD_SRVONLY.includes(r[0])).map(r=>r[0]);if(!L.length)L=wdPool("y",P,true);
 /* DRESS-FIX (owner OD 26/11 ~18:50Z (5) «4–5 bộ giống nhau»): never a copy of a robe she already owns (chest or worn); only when she owns them all, the stable pick */
 try{const own=new Set((p.inv||[]).filter(e=>e&&!e.h).map(e=>e.k));const w=p.wd||{};if(w.y)own.add(w.y.k);const F=L.filter(k=>!own.has(k));if(F.length)L=F;
  else{const G=wdPool("y",P,true).filter(k=>!own.has(k)&&!WD_SRVONLY.includes(k));if(G.length)L=G;else if((p.inv||[]).some(e=>e&&!e.h&&WD_ITEMS[e.k]&&WD_ITEMS[e.k].sl==="y"))return null/* every robe of her phẩm is already hers and one sits in her chest: nothing to issue, she wears her own */}}catch(e){}
 return L.length?L[wdHash(wdKey(p)+"y0"+((p.tyRobbed|0)||""))%L.length]:null}
function earnFromChest(p,sl){const P=Math.min(8,wdPOf(p));const L=(p.inv||[]).filter(e=>e&&!e.h&&wdItem(e)&&wdItem(e).sl===sl&&e.k!=="y_tang"&&wdBelPE(p,e,p)<=P);
 if(!L.length)return null;L.sort((a,b)=>wdBelPE(p,b,p)-wdBelPE(p,a,p));const e=L[0];p.inv.splice(p.inv.indexOf(e),1);return e}
(function(){if(typeof wdOf!=="function")return;const o0=wdOf;wdOf=function(p){const w=o0.apply(this,arguments);if(!w||!p)return w;try{
  if(!p.wdK0){p.wdK0=1;for(const sl of ["tram","y"]){const e=w[sl];if(e&&e.from==="base"){w[sl]={k:e.k,src:"cap",nvp:1};earnK(p,e.k)}}
   if(p===S&&(S.turn||0)<=1){const P=Math.min(8,wdPOf(S)),wk0=w.y&&w.y.k;let k=null;for(const q of [P,P-1,P-2]){const L=WD_LIST.filter(r=>r[1]==="y"&&r[3]===q&&r[4]===0&&r[0]!==wk0&&r[0]!=="y_tang"&&!WD_SRVONLY.includes(r[0])).map(r=>r[0]);if(L.length){k=L[wdHash(wdKey(S)+"y1")%L.length];break}}if(k){S.inv=S.inv||[];invAdd(S,{k,src:"cap",nvp:1});earnK(S,k)}}}
  else for(const sl of ["tram","y"]){const e=w[sl];if(!e||e.from!=="base")continue;
   if(e.k==="y_tang"){w[sl]={k:"y_tang",src:"nvp",nvp:1,giver:"Nội vụ phủ"};continue}
   /* trung y (jty, sếp 15/11): the player's lost robe leaves the slot EMPTY until she wears another from Tư trang
      (Nội vụ phủ issues one after BAL.ty.reissueWk weeks); an NPC first wears one from her own chest */
   if(sl==="y"&&p===S){w.y=null;if(typeof tyLost==="function")tyLost(p,"thu");continue}
   const c=earnFromChest(p,sl);if(c){w[sl]=c;continue}
   if(sl==="y"){w.y=null;if(typeof tyLost==="function")tyLost(p,"thu")}else w.tram=null}}catch(x){console.error(x)}return w}})();
/* Tự chọn đồ / Chải chuốt choose only among things she really has (+ the mourning issue in quốc tang) */
(function(){if(typeof wdCands!=="function")return;const c0=wdCands;wdCands=function(p){const C=c0.apply(this,arguments);try{for(const sl of ["tram","y"]){const L=C[sl].filter(x=>!x||x.src!=="base");if(sl==="tram"||L.some(Boolean))C[sl]=L}}catch(e){}return C}})();
/* taking the y phục off without another to put on is no longer possible (only changing into another one) */
(function(){if(typeof wdOffUI!=="function")return;const f0=wdOffUI;wdOffUI=function(sl){if(sl==="y"){try{log("Muốn thay y phục, chọn bộ khác trong Rương đồ rồi Mặc.")}catch(e){}return}return f0.apply(this,arguments)};window.wdOffUI=wdOffUI})();
(function(){if(typeof wdInvHTML!=="function")return;const h0=wdInvHTML;wdInvHTML=function(){const h=h0.apply(this,arguments);return h.replace(/<button data-wd="off" data-sl="y"[\s\S]*?<\/button>/g,"")}})();
(function(){if(typeof wdSrcTxt!=="function")return;const s0=wdSrcTxt;wdSrcTxt=function(e){if(e&&e.src==="cap")return"Nội vụ phủ cấp khi nhập cung";if(e&&e.src==="nvp")return`Nội vụ phủ cấp${e.d?", "+e.d:""}`;return s0.apply(this,arguments)}})();
