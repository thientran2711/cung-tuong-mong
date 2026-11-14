/* ================= jearn: ĐỒ PHẢI CÓ ĐƯỢC, KHÔNG TỰ RƠI XUỐNG (owner 11/14 19:30Z, review/items-earned) =================
   Audit + rules: dev/ITEMS_EARNED.md. Every item comes from crafting, buying or being given/rewarded; the same for NPCs.
   This module holds the small fixes to the free grants other than the veil (jveil). ================= */
/* review/balance carries jk2b's Tư trang (K2) but not j92cat's collection counter: without it the wardrobe block threw
   "wdColInfo is not defined" and vanished. Minimal stand-in until the wardrobe catalogue (j92cat) lands: count what she holds. */
if(typeof wdColInfo!=="function"){window.wdColInfo=function(){let n=0;try{const w=wdOf(S);const seen={};for(const sl of ["tram","y"])if(w[sl])seen[w[sl].k]=1;(S.inv||[]).forEach(e=>{if(e&&!e.h&&wdItem(e))seen[e.k]=1});n=Object.keys(seen).length}catch(e){}return{n,title:null,next:null}}}
