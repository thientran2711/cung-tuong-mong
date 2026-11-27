/* net-thresholds instrument (EXTRA for runpers.js): gate pass counts per SOC act, fired acts per nết, danger bands, and samples of
   aff / oán / danger / hostility per holder nết (NPC→NPC and NPC→her) once a week. Data lands in __bot.extra().nt */
(function(){const NT=window.__nt={G:{},fired:{},ba:{},samp:{aff:{},oan:{},dang:{},host:{},affS:{},oanS:{},dangS:{},cmp:{}},wk:-1,n:0};
 const cnt=(k,ok)=>{const c=NT.G[k]=NT.G[k]||[0,0];c[ok?0:1]++};const push=(o,k,v)=>{const a=o[k]=o[k]||[];if(a.length<20000)a.push(Math.round(v))};
 for(const k in SOC){const o=SOC[k].ok,ru=SOC[k].run;SOC[k].ok=function(v,t){const r=o.apply(this,arguments);cnt("SOC."+k,r);return r};
  SOC[k].run=function(v){try{const F=NT.fired[k]=NT.fired[k]||{};F._=(F._||0)+1;for(const t of traitsOf(v))F[t]=(F[t]||0)+1}catch(e){}return ru.apply(this,arguments)}}
 const na0=npcAct;npcAct=function(v,t){try{const b=bandOf(danger(v,t));NT.ba[b]=(NT.ba[b]||0)+1;if(b)for(const tt of traitsOf(v))NT.ba[b+"|"+tt]=(NT.ba[b+"|"+tt]||0)+1}catch(e){}return na0.apply(this,arguments)};
 const take=()=>{if(!S||S.dead)return;const w=wk();if(w===NT.wk)return;NT.wk=w;NT.n++;const L=liveRivals(true);for(const v of L){let n;try{n=traitsOf(v)}catch(e){continue}for(const t of [S,...L]){if(t===v)continue;let a,o,d,h;try{a=aff(v,t);o=oan(v,t);d=danger(v,t);h=hostility(v,t)}catch(e){continue}
   {const C=NT.samp.cmp,sf=t===S?'S':'N';const g=t===S?(v.ghen||0):0;push(C,'g'+sf,g);push(C,'o'+sf,o);push(C,'a'+sf,Math.max(0,-a));push(C,'top'+sf,g>=o&&g>=-a?0:o>=-a?1:2);push(C,'x'+sf,d-Math.max(g,o,-a))}
   for(const tt of n.concat("_")){if(t===S){push(NT.samp.affS,tt,a);push(NT.samp.oanS,tt,o);push(NT.samp.dangS,tt,d)}else{push(NT.samp.aff,tt,a);push(NT.samp.oan,tt,o);push(NT.samp.dang,tt,d)}push(NT.samp.host,tt,h)}}}};
 const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{take()}catch(e){}return r};
 const x0=window.__bot.extra;window.__bot.extra=function(){let r={};try{r=x0?x0.apply(this,arguments):{}}catch(e){}r.nt=NT;return r}})();
