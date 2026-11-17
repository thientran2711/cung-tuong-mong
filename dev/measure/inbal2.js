/* balance-2 (D8): per-rank pressure + punishment origin counters for the sens/random bot (load after inpage6.js + inx.js; INP2=...,inbal2.js).
   x.b2.rk[rank] = {b: buổi seen, bac: Σ bạc, suc: Σ Sức, kl: Σ khắc left unused when the buổi closes, oc: Σ open Hành sự cards left unused, dk: Σ cards on the deck, bb: Σ cards blocked by bạc only (price > purse), sb: Σ cards blocked by Sức,
                    m: months, net: Σ monthly bạc change, dn: Σ monthly Danh change, sg: Σ monthly Sủng change, dsuc: Σ monthly Sức change}
   x.b2.pun = {"S|why": n, "N|why": n}  every punish() (S = her, N = an NPC).   x.b2.dm = Danh/Sủng/rank at months 6,12,24,36,60.
   Read-only (hooks only count). */
(function(){const Z=()=>({rk:{},pun:{},dm:{}});window.__b2=Z();let lastT=-1,m0=null;
 const R0=window.__res;if(R0&&!R0.__b2){const p0=R0.push;R0.push=function(x){try{x.b2=window.__b2}catch(e){}window.__b2=Z();lastT=-1;m0=null;return p0.apply(this,arguments)};R0.__b2=1}
 const rk=r=>(window.__b2.rk[r]=window.__b2.rk[r]||{b:0,bac:0,suc:0,kl:0,oc:0,m:0,net:0,dn:0,sg:0,dsuc:0});
 const pu=punish;punish=function(p,why,sev){try{let P=p,W=why;if(typeof p==="string"){W=p;P=S}const k=(P===S?"S|":"N|")+String(W).replace(/<[^>]+>/g,"").slice(0,40);window.__b2.pun[k]=(window.__b2.pun[k]||0)+1}catch(e){}return pu.apply(this,arguments)};
 /* double-apply family check (balance-2): an option whose real change is exactly twice its shown fx (x.b2.dbl["title|option|key"]) */
 {const c0=chooseM;chooseM=function(i){let m,c,b;try{m=Q[0];c=m&&m.opts&&m.opts[i];if(c&&c.fx&&!c.off)b={bac:S.bac,danh:S.danh,sung:S.sung,suc:S.suc,duc:S.duc}}catch(e){}
  const r=c0.apply(this,arguments);try{if(b&&Q[0]!==m)for(const k in b){const f=c.fx[k];if(f&&S[k]-b[k]===2*f&&Math.abs(S[k]-b[k])<100){const K=String(m.t||m.pid||"").replace(/<[^>]+>/g,"").replace(/\d+/g,"#").slice(0,30)+"|"+String(c.n).slice(0,30)+"|"+k;window.__b2.dbl=window.__b2.dbl||{};window.__b2.dbl[K]=(window.__b2.dbl[K]||0)+1}}}catch(e){}return r}}
 const DM=[6,12,24,36,60];
 const nb=nextBuoi;nextBuoi=function(){try{if(S&&!S.dead&&!S.srv&&!Q.length&&!S.mg){const x=rk(S.rank);x.b++;x.bac+=S.bac;x.suc+=S.suc;x.kl+=Math.max(0,BAL.time.khac-used);
   try{for(const a of deck){if(!a||a.done||a.lock)continue;x.dk=(x.dk||0)+1;const c=cardCost(a)||{};const cc=a.c||{};if(cc.bac<0&&S.bac<-cc.bac)x.bb=(x.bb||0)+1;if((cc.suc<0&&S.suc+cc.suc<=0)||(c>1&&S.suc<BAL.time.sucMin))x.sb=(x.sb||0)+1}}catch(e){}
   try{x.oc+=deck.filter(a=>a&&!a.done&&!a.lock&&canPay(a)&&can(cardCost(a))&&!(a.b!=null&&(S.buoi||0)!==a.b)).length}catch(e){}
   if(S.turn!==lastT){if(m0&&S.turn===lastT+1){const y=rk(m0.r);y.m++;y.net+=S.bac-m0.bac;y.dn+=S.danh-m0.d;y.sg+=S.sung-m0.s;y.dsuc+=S.suc-m0.suc}
    lastT=S.turn;m0={r:S.rank,bac:S.bac,d:S.danh,s:S.sung,suc:S.suc};if(DM.includes(S.turn)&&!window.__b2.dm[S.turn])window.__b2.dm[S.turn]=[S.rank,S.sung,S.danh,S.duc];
    /* months at each rank: which «Muốn lên …» rows are not met (x.b2.hq["rank|label"] months, x.b2.hq["rank|_m"] months at that rank) */
    if(S.rank<7&&!S.out){const H=window.__b2.hq=window.__b2.hq||{};H[S.rank+"|_m"]=(H[S.rank+"|_m"]||0)+1;try{for(const r of promoReqP(S))if(!r[0]){const k=S.rank+"|"+String(r[1]).replace(/-?\d+/g,"#").replace(/\(.*\)/,"").trim().slice(0,40);H[k]=(H[k]||0)+1}}catch(e){}}}}}catch(e){}
  return nb.apply(this,arguments)};
})();
