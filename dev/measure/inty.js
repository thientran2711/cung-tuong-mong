/* balance-pass: bots and the trung y rule (jty). Before this the bots never dressed: once robbed (or with no robe) they walked out in
   trung y, every place showed the card "Ra ngoài khi mặc trung y?", and inpage4 retried the same place forever (a life stuck in one buổi).
   1) a sensible player dresses: in trung y with a robe of her rank in the chest, she puts it on with the player's own act (wdWearUI, 1 khắc),
      choosing the robe the NPC rule (earnFromChest) would choose;
   2) a place whose walk-out card was shown is not tried again in the same buổi (the inpage4 refused-place list window.__gof). */
(function(){if(typeof goTo!=="function"||typeof tyOn!=="function")return;
 const bk=()=>S.turn+"_"+S.tuan+"_"+(S.buoi||0);
 const dress=()=>{try{if(!S||S.dead||!tyOn(S)||Q.length||typeof wdWearUI!=="function")return;const P=Math.min(8,wdPOf(S));
   const L=(S.inv||[]).map((e,i)=>[e,i]).filter(([e])=>e&&!e.h&&wdItem(e)&&wdItem(e).sl==="y"&&e.k!=="y_tang"&&wdBelPE(S,e,S)<=P);if(!L.length)return;
   L.sort((a,b)=>wdBelPE(S,b[0],S)-wdBelPE(S,a[0],S));wdWearUI(L[0][1]);window.__tyDress=(window.__tyDress||0)+1}catch(e){}};
 const g0=goTo;goTo=function(k){dress();const q=Q.length;const r=g0.apply(this,arguments);
  try{if(Q.length>q&&/mặc trung y/.test(String(Q[Q.length-1].t||""))){window.__gof=window.__gof||{};window.__gof[k]=bk()}}catch(e){}return r};window.goTo=goTo;
})();
