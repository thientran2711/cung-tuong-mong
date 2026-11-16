/* balance-after-truth: why childbirth never kills the sensible bot. x.ix.ps = {cause: n} pet rescues (petSave, jpet: a sacred pet takes
   her death), x.ix.bd = childbirth death rolls that came up (before any rescue: same risk, counted in birthRisk's caller). Read-only. */
(function(){if(typeof petSave==="function"){const p0=petSave;petSave=function(p,cause){const r=p0.apply(this,arguments);try{if(r&&p===S&&window.__ix){const P=window.__ix.ps=window.__ix.ps||{};const k=String(cause).slice(0,40);P[k]=(P[k]||0)+1}}catch(e){}return r};window.petSave=petSave}
 const pk=typeof tsbPets==="function"?tsbPets:null;
 const nb=nextBuoi;nextBuoi=function(){try{if(S&&!S.dead&&window.__ix&&pk){const n=pk(S).length,R=typeof petRescuer==="function"&&petRescuer(S)>=0;window.__ix.petMax=Math.max(window.__ix.petMax||0,n);if(R)window.__ix.rescW=(window.__ix.rescW||0)+1}}catch(e){}return nb.apply(this,arguments)};
})();
/* each of her real births: [risk shown, the death roll came up (1/0), she is dead right after (1/0)] → x.ix.bl */
(function(){const b0=birthP;birthP=function(p,fake){if(p!==S||fake||!window.__ix)return b0.apply(this,arguments);
 let hit=0;const r0=roll,risk=birthRisk(S);let first=true;
 roll=function(o){const r=r0.apply(this,arguments);if(first){first=false;hit=r?1:0;try{window.__ix.bfirst=(window.__ix.bfirst||[]).concat([o])}catch(e){}}return r};
 let out;try{out=b0.apply(this,arguments)}finally{roll=r0}
 try{(window.__ix.bl=window.__ix.bl||[]).push([risk,hit,S.dead?1:0])}catch(e){}return out}})();
