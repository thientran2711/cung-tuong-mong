/* balance-final (D ROOT): nights / conceptions / births ledger for her and NPCs (INPX=inbf.js). Read-only hooks.
   x.bf = {hn: her night() calls, hc: her conceptions, hcs: Σ conceiveCh(her) at those nights, nn: NPC night() calls, nc: NPC conceptions,
           ncs: Σ conceiveCh(npc), nb: NPC births (kids added to NPCs), yrs: life years} */
(function(){const Z=()=>({hn:0,hc:0,hcs:0,nn:0,nc:0,ncs:0});window.__bf=Z();
 const R0=window.__res;if(R0&&!R0.__bf){const p0=R0.push;R0.push=function(x){try{x.bf=window.__bf}catch(e){}window.__bf=Z();return p0.apply(this,arguments)};R0.__bf=1}
 const n0=night;night=function(p){p=p||S;const was=!!p.preg;let c=0;try{c=was?0:conceiveCh(p)}catch(e){}const r=n0.apply(this,arguments);
  try{const B=window.__bf;if(!was){if(p===S){B.hn++;B.hcs+=c;if(p.preg)B.hc++}else{B.nn++;B.ncs+=c;if(p.preg)B.nc++}}}catch(e){}return r};
})();
