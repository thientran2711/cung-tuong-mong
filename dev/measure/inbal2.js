/* balance-2 (D8): per-rank pressure + punishment origin counters for the sens/random bot (load after inpage6.js + inx.js; INP2=...,inbal2.js).
   x.b2.rk[rank] = {b: buổi seen, bac: Σ bạc, suc: Σ Sức, kl: Σ khắc left unused when the buổi closes, oc: Σ open Hành sự cards left unused,
                    m: months, net: Σ monthly bạc change, dn: Σ monthly Danh change, sg: Σ monthly Sủng change, dsuc: Σ monthly Sức change}
   x.b2.pun = {"S|why": n, "N|why": n}  every punish() (S = her, N = an NPC).   x.b2.dm = Danh/Sủng/rank at months 6,12,24,36,60.
   Read-only (hooks only count). */
(function(){const Z=()=>({rk:{},pun:{},dm:{}});window.__b2=Z();let lastT=-1,m0=null;
 const R0=window.__res;if(R0&&!R0.__b2){const p0=R0.push;R0.push=function(x){try{x.b2=window.__b2}catch(e){}window.__b2=Z();lastT=-1;m0=null;return p0.apply(this,arguments)};R0.__b2=1}
 const rk=r=>(window.__b2.rk[r]=window.__b2.rk[r]||{b:0,bac:0,suc:0,kl:0,oc:0,m:0,net:0,dn:0,sg:0,dsuc:0});
 const pu=punish;punish=function(p,why,sev){try{let P=p,W=why;if(typeof p==="string"){W=p;P=S}const k=(P===S?"S|":"N|")+String(W).replace(/<[^>]+>/g,"").slice(0,40);window.__b2.pun[k]=(window.__b2.pun[k]||0)+1}catch(e){}return pu.apply(this,arguments)};
 const DM=[6,12,24,36,60];
 const nb=nextBuoi;nextBuoi=function(){try{if(S&&!S.dead&&!S.srv&&!Q.length&&!S.mg){const x=rk(S.rank);x.b++;x.bac+=S.bac;x.suc+=S.suc;x.kl+=Math.max(0,BAL.time.khac-used);
   try{x.oc+=deck.filter(a=>a&&!a.done&&!a.lock&&canPay(a)&&can(cardCost(a))&&!(a.b!=null&&(S.buoi||0)!==a.b)).length}catch(e){}
   if(S.turn!==lastT){if(m0&&S.turn===lastT+1){const y=rk(m0.r);y.m++;y.net+=S.bac-m0.bac;y.dn+=S.danh-m0.d;y.sg+=S.sung-m0.s;y.dsuc+=S.suc-m0.suc}
    lastT=S.turn;m0={r:S.rank,bac:S.bac,d:S.danh,s:S.sung,suc:S.suc};if(DM.includes(S.turn)&&!window.__b2.dm[S.turn])window.__b2.dm[S.turn]=[S.rank,S.sung,S.danh,S.duc]}}}catch(e){}
  return nb.apply(this,arguments)};
})();
