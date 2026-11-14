/* j72 Việc nhờ: let the bots work their open quests like a player would (evaluated after inpage5.js by runq.js).
   a careful player: not while pregnant or Sức < 50; sensible bot on 40% of its moves, random bot 30%. Env Q72OFF=1 (window.__q72off) = quests off, for a baseline. */
(function(){window.__q72n=0;const st0=window.__bot.step,x0=window.__bot.extra;
 window.__bot.step=function(mode,n){let r=0;for(let i=0;i<n;i++){let did=false;try{if(typeof q72Bot==="function"&&!window.__q72off&&S&&!S.dead&&!Q.length&&!S.preg&&S.suc>=50&&Math.random()<(mode==="rand"?.3:.4))did=q72Bot()}catch(e){}if(did){window.__q72n++;continue}r=st0(mode,1)}return r||window.__res.length};
 window.__bot.extra=function(){const o=x0();o.q72steps=window.__q72n;return o}})();
