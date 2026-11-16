/* review/servant-system: palace headcount over YEARS months of world time, old rule (window.__mloff=1) vs the maid line.
   Evaluated inside a started game (dev/test/tmp/probe_noimg.js style boot); the player only ends her weeks (no acts). Returns one JSON. */
(async()=>{const YEARS=window.__years||10;const R={};
 for(const off of [1,0]){window.__mloff=off;window.__mlN={};
  quiet=true;window.__nlInner=1;window.__forceOrigin='thd';start();window.__nlInner=0;quiet=true;Q.length=0;
  const render0=render,die0=die,over0=over;render=()=>{};die=()=>{};over=()=>{};/* she stays alive: the run measures the palace, not her */const H=[];const m0=servMonth;servMonth=function(){const r=m0.apply(this,arguments);try{const L=allServ();H.push({nr:liveRivals(true).length,ns:L.length,nm:L.filter(s=>s.role==="maid").length,seek:L.filter(s=>s.seek).length,mine:(S.staff||[]).length,slot:roomFor("consort")?1:0})}catch(e){}return r};
  let guard=0;const t0=performance.now();
  while(H.length<YEARS*12&&guard++<YEARS*12*6){if(S.dead)S.dead=false;S.suc=Math.max(S.suc||0,60);Q.length=0;try{const md=document.getElementById('modal');if(md)md.hidden=true}catch(e){}S.mg=null;try{endTurn()}catch(e){R.err=String(e).slice(0,200);break}}
  servMonth=m0;render=render0;die=die0;over=over0;const avg=k=>H.length?+(H.reduce((a,x)=>a+x[k],0)/H.length).toFixed(2):0;const N=window.__mlN;
  R[off?"old":"line"]={months:H.length,dead:!!S.dead,ms:Math.round(performance.now()-t0),avg:{consorts:avg('nr'),servants:avg('ns'),maids:avg('nm'),seeking:avg('seek'),hers:avg('mine'),freeSlot:avg('slot')},end:H[H.length-1],
   perYear:Object.fromEntries(Object.entries(N).filter(([k])=>k!=="eyeP").map(([k,v])=>[k,+(v/Math.max(1,H.length)*12).toFixed(2)])),eyeChancePerMaidMonth:N.eyeTry?+((N.eyeP||0)/N.eyeTry).toFixed(3):null}}
 return R})()
