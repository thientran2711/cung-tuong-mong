/* balance-final (D ROOT): nights / conceptions / births ledger for her and NPCs (INPX=inbf.js). Read-only hooks.
   x.bf = {hn: her night() calls, hc: her conceptions, hcs: Σ conceiveCh(her) at those nights, nn: NPC night() calls, nc: NPC conceptions,
           ncs: Σ conceiveCh(npc), nb: NPC births (kids added to NPCs), yrs: life years} */
(function(){const Z=()=>({hn:0,hc:0,hcs:0,nn:0,nc:0,ncs:0,pb:0,pl:0,lw:{},ns:{}});window.__bf=Z();
 const R0=window.__res;if(R0&&!R0.__bf){const p0=R0.push;R0.push=function(x){try{x.bf=window.__bf}catch(e){}window.__bf=Z();return p0.apply(this,arguments)};R0.__bf=1}
 const n0=night;night=function(p){p=p||S;const was=!!p.preg;let c=0;try{c=was?0:conceiveCh(p)}catch(e){}const r=n0.apply(this,arguments);
  try{const B=window.__bf;if(!was){if(p===S){B.hn++;B.hcs+=c;if(p.preg)B.hc++}else{B.nn++;B.ncs+=c;if(p.preg)B.nc++}}}catch(e){}return r};
/* NPC Sủng at months 12/24/36/60: ns[m] = [n, mean, share ≥ 95, share ≤ 20] (poison-road finding: NPC Sủng saturates at 100) */
 const NM=[12,24,36,60];const nb2=nextBuoi;nextBuoi=function(){try{if(S&&!S.dead&&NM.includes(S.turn)&&!window.__bf.ns[S.turn]){const L=liveRivals(false).filter(v=>!v.queen);const n=L.length||1;
  window.__bf.ns[S.turn]=[L.length,Math.round(L.reduce((a,v)=>a+(v.sung||0),0)/n),+(L.filter(v=>(v.sung||0)>=95).length/n).toFixed(2),+(L.filter(v=>(v.sung||0)<=20).length/n).toFixed(2)]}}catch(e){}return nb2.apply(this,arguments)};
/* her pregnancy outcomes: pb = births, pl = losses (preg ended with no new child); lw[first words of the newest log lines at the loss] */
 let pv=0,kv=0,sr=null;const nb=nextBuoi;nextBuoi=function(){try{if(S!==sr){sr=S;pv=0;kv=(S&&S.kids||[]).length}if(S&&!S.srv){const B=window.__bf,k=(S.kids||[]).length;if(pv&&!S.preg){if(k>kv)B.pb++;else{B.pl++;const t=(S.logs||[]).slice(0,4).map(x=>String(x).replace(/<[^>]+>/g,'').replace(/\d+/g,'#').slice(0,40)).join(' | ');B.lw[t]=(B.lw[t]||0)+1}}pv=S.preg||0;kv=k}}catch(e){}return nb.apply(this,arguments)};
})();
