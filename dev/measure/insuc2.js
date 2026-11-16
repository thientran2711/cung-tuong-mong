/* two-way-acts: Sức counters (player vs NPC consorts), sampled once per tuần at endTurn. Load as INP2 after inpage5/6. */
(function(){window.__suc2={n:0,me:0,npc:0,npcN:0,low:0,lowN:0,npcPay:0};
 const e0=endTurn;endTurn=function(){try{if(S&&!S.dead){const L=liveRivals(true).filter(v=>v.alive&&!v.out);const Z=window.__suc2;Z.n++;Z.me+=S.suc;
  for(const v of L){Z.npc+=v.suc;Z.npcN++;if(v.suc<30)Z.low++}}}catch(e){}return e0.apply(this,arguments)};
 const x0=window.__bot.extra;window.__bot.extra=()=>{const r=x0();const Z=window.__suc2;r.suc2={tuan:Z.n,meMean:+(Z.me/Math.max(1,Z.n)).toFixed(1),npcMean:+(Z.npc/Math.max(1,Z.npcN)).toFixed(1),npcLow30:Z.low,npcSamples:Z.npcN,npcPaidSuc:window.__actPaidSuc||0};return r}})();
